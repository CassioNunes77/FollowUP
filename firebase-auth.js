// 🔐 Firebase Authentication - FollowUP
// Sistema de autenticação com Google

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ CONFIGURAÇÃO REAL DO FIREBASE - FollowUP
const firebaseConfig = {
  apiKey: "AIzaSyA49KE7EtC3pPxNt_qcVcCzxJx6XZ2Q2H0",
  authDomain: "followup-8772b.firebaseapp.com",
  projectId: "followup-8772b",
  storageBucket: "followup-8772b.firebasestorage.app",
  messagingSenderId: "809401173456",
  appId: "1:809401173456:web:35eeb177496db4044de5d5",
  measurementId: "G-NHSHXV6LLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firebase Collections
const COLLECTIONS = {
  FICHAS: 'fichas',
  CONFIG: 'config',
  CATEGORIAS: 'categorias',
  CLUSTERS: 'clusters',
  USUARIOS: 'usuarios',
  EMPRESA: 'empresa'
};

// Authentication Functions
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Salvar dados do usuário no Firestore
    await saveUserData(user);
    
    console.log('✅ Login com Google realizado com sucesso:', user.email);
    return user;
  } catch (error) {
    console.error('❌ Erro no login com Google:', error);
    throw error;
  }
}

async function signOutUser() {
  try {
    await signOut(auth);
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ Erro no logout:', error);
    throw error;
  }
}

async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function saveUserData(user) {
  try {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date(),
      createdAt: new Date()
    };

    // Verificar se usuário já existe
    const userQuery = query(collection(db, COLLECTIONS.USUARIOS), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      // Criar novo usuário
      await addDoc(collection(db, COLLECTIONS.USUARIOS), userData);
      console.log('✅ Novo usuário criado:', user.email);
    } else {
      // Atualizar último login
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        lastLogin: new Date(),
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      console.log('✅ Usuário atualizado:', user.email);
    }
  } catch (error) {
    console.error('❌ Erro ao salvar dados do usuário:', error);
    throw error;
  }
}

// Firestore Functions com autenticação de usuário
async function addFicha(ficha) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.FICHAS), {
      ...ficha,
      userId: user.uid,
      userEmail: user.email,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Ficha adicionada com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar ficha:', error);
    throw error;
  }
}

async function getFichas() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userQuery = query(
      collection(db, COLLECTIONS.FICHAS), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const fichas = [];
    querySnapshot.forEach((doc) => {
      fichas.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log('✅ Fichas carregadas:', fichas.length);
    return fichas;
  } catch (error) {
    console.error('❌ Erro ao carregar fichas:', error);
    throw error;
  }
}

async function updateFicha(fichaId, fichaData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const fichaRef = doc(db, COLLECTIONS.FICHAS, fichaId);
    await updateDoc(fichaRef, {
      ...fichaData,
      updatedAt: new Date()
    });
    console.log('✅ Ficha atualizada:', fichaId);
  } catch (error) {
    console.error('❌ Erro ao atualizar ficha:', error);
    throw error;
  }
}

async function deleteFicha(fichaId) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    await deleteDoc(doc(db, COLLECTIONS.FICHAS, fichaId));
    console.log('✅ Ficha deletada:', fichaId);
  } catch (error) {
    console.error('❌ Erro ao deletar ficha:', error);
    throw error;
  }
}

async function saveConfig(config) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Delete existing config documents for this user
    const userQuery = query(
      collection(db, COLLECTIONS.CONFIG), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new config
    await addDoc(collection(db, COLLECTIONS.CONFIG), {
      ...config,
      userId: user.uid,
      userEmail: user.email,
      updatedAt: new Date()
    });
    console.log('✅ Configuração salva');
  } catch (error) {
    console.error('❌ Erro ao salvar configuração:', error);
    throw error;
  }
}

async function getConfig() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userQuery = query(
      collection(db, COLLECTIONS.CONFIG), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      const configDoc = querySnapshot.docs[0];
      console.log('✅ Configuração carregada');
      return configDoc.data();
    }
    return null;
  } catch (error) {
    console.error('❌ Erro ao carregar configuração:', error);
    throw error;
  }
}

async function saveCategorias(categorias) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Delete existing categorias for this user
    const userQuery = query(
      collection(db, COLLECTIONS.CATEGORIAS), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new categorias
    const addPromises = categorias.map(categoria => 
      addDoc(collection(db, COLLECTIONS.CATEGORIAS), {
        nome: categoria,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date()
      })
    );
    await Promise.all(addPromises);
    console.log('✅ Categorias salvas:', categorias.length);
  } catch (error) {
    console.error('❌ Erro ao salvar categorias:', error);
    throw error;
  }
}

async function getCategorias() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userQuery = query(
      collection(db, COLLECTIONS.CATEGORIAS), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const categorias = [];
    querySnapshot.forEach((doc) => {
      categorias.push(doc.data().nome);
    });
    console.log('✅ Categorias carregadas:', categorias.length);
    return categorias;
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error);
    throw error;
  }
}

async function saveClusters(clusters) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Delete existing clusters for this user
    const userQuery = query(
      collection(db, COLLECTIONS.CLUSTERS), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new clusters
    const addPromises = clusters.map(cluster => 
      addDoc(collection(db, COLLECTIONS.CLUSTERS), {
        nome: cluster,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date()
      })
    );
    await Promise.all(addPromises);
    console.log('✅ Clusters salvos:', clusters.length);
  } catch (error) {
    console.error('❌ Erro ao salvar clusters:', error);
    throw error;
  }
}

async function getClusters() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userQuery = query(
      collection(db, COLLECTIONS.CLUSTERS), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const clusters = [];
    querySnapshot.forEach((doc) => {
      clusters.push(doc.data().nome);
    });
    console.log('✅ Clusters carregados:', clusters.length);
    return clusters;
  } catch (error) {
    console.error('❌ Erro ao carregar clusters:', error);
    throw error;
  }
}

// Funções específicas para configurações da empresa
async function saveEmpresaConfig(empresaData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Delete existing empresa config documents for this user
    const userQuery = query(
      collection(db, COLLECTIONS.EMPRESA), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new empresa config
    await addDoc(collection(db, COLLECTIONS.EMPRESA), {
      ...empresaData,
      userId: user.uid,
      userEmail: user.email,
      updatedAt: new Date()
    });
    console.log('✅ Configuração da empresa salva');
  } catch (error) {
    console.error('❌ Erro ao salvar configuração da empresa:', error);
    throw error;
  }
}

async function getEmpresaConfig() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userQuery = query(
      collection(db, COLLECTIONS.EMPRESA), 
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      const empresaDoc = querySnapshot.docs[0];
      console.log('✅ Configuração da empresa carregada');
      return empresaDoc.data();
    }
    return null;
  } catch (error) {
    console.error('❌ Erro ao carregar configuração da empresa:', error);
    throw error;
  }
}

// Export functions
window.FirebaseAuth = {
  signInWithGoogle,
  signOutUser,
  getCurrentUser,
  addFicha,
  getFichas,
  updateFicha,
  deleteFicha,
  saveConfig,
  getConfig,
  saveCategorias,
  getCategorias,
  saveClusters,
  getClusters,
  saveEmpresaConfig,
  getEmpresaConfig
};

console.log('🔐 Firebase Auth configurado para FollowUP - Sistema de Login Google');
