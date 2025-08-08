// Firebase Configuration for FollowUP
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// ⚠️ SUBSTITUA ESTA CONFIGURAÇÃO PELA SUA CONFIGURAÇÃO REAL DO FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "followup-XXXXX.firebaseapp.com",
  projectId: "followup-XXXXX",
  storageBucket: "followup-XXXXX.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase Collections
const COLLECTIONS = {
  FICHAS: 'fichas',
  CONFIG: 'config',
  CATEGORIAS: 'categorias',
  CLUSTERS: 'clusters'
};

// Authentication
async function initializeAuth() {
  try {
    await signInAnonymously(auth);
    console.log('✅ Firebase Auth inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase Auth:', error);
  }
}

// Firestore Functions
async function addFicha(ficha) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.FICHAS), {
      ...ficha,
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
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.FICHAS));
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
  try {
    await deleteDoc(doc(db, COLLECTIONS.FICHAS, fichaId));
    console.log('✅ Ficha deletada:', fichaId);
  } catch (error) {
    console.error('❌ Erro ao deletar ficha:', error);
    throw error;
  }
}

async function saveConfig(config) {
  try {
    // Delete existing config documents
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONFIG));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new config
    await addDoc(collection(db, COLLECTIONS.CONFIG), {
      ...config,
      updatedAt: new Date()
    });
    console.log('✅ Configuração salva');
  } catch (error) {
    console.error('❌ Erro ao salvar configuração:', error);
    throw error;
  }
}

async function getConfig() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONFIG));
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
  try {
    // Delete existing categorias
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIAS));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new categorias
    const addPromises = categorias.map(categoria => 
      addDoc(collection(db, COLLECTIONS.CATEGORIAS), {
        nome: categoria,
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
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIAS));
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
  try {
    // Delete existing clusters
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CLUSTERS));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Add new clusters
    const addPromises = clusters.map(cluster => 
      addDoc(collection(db, COLLECTIONS.CLUSTERS), {
        nome: cluster,
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
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CLUSTERS));
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

// Export functions
window.FirebaseService = {
  initializeAuth,
  addFicha,
  getFichas,
  updateFicha,
  deleteFicha,
  saveConfig,
  getConfig,
  saveCategorias,
  getCategorias,
  saveClusters,
  getClusters
};

console.log('🚀 Firebase configurado para FollowUP');
