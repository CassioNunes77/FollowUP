// 🔧 TEMPLATE: Como deve ficar sua configuração Firebase
// Copie este arquivo e substitua pelos seus valores reais do Firebase Console

// ⚠️ SUBSTITUA ESTES VALORES PELOS SEUS VALORES REAIS DO FIREBASE CONSOLE
const firebaseConfig = {
  // 🔑 API Key (obrigatório)
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz", // ← SUA API KEY REAL
  
  // 🌐 Auth Domain (obrigatório)
  authDomain: "followup-12345.firebaseapp.com", // ← SEU AUTH DOMAIN
  
  // 📁 Project ID (obrigatório)
  projectId: "followup-12345", // ← SEU PROJECT ID
  
  // 🗄️ Storage Bucket (obrigatório)
  storageBucket: "followup-12345.appspot.com", // ← SEU STORAGE BUCKET
  
  // 📱 Messaging Sender ID (obrigatório)
  messagingSenderId: "123456789012", // ← SEU MESSAGING SENDER ID
  
  // 🆔 App ID (obrigatório)
  appId: "1:123456789012:web:abcdefghijklmnop" // ← SEU APP ID
};

// ✅ COMO OBTER ESTES VALORES:
// 1. Firebase Console → console.firebase.google.com
// 2. Selecione seu projeto followUP
// 3. Project settings (ícone de engrenagem)
// 4. Seção "Your apps"
// 5. Clique no app web ou crie um novo
// 6. Copie a configuração que aparece

// ✅ ONDE COLOCAR:
// 1. Abra firebase-auth.js
// 2. Substitua as linhas 9-16 pela sua configuração real
// 3. Salve o arquivo
// 4. Teste em test-simple.html

// ✅ EXEMPLO DE CONFIGURAÇÃO REAL:
// const firebaseConfig = {
//   apiKey: "AIzaSyA49KE7EtC3pPxNt_qcVcCzxJx6XZ2Q2H0",
//   authDomain: "followup-8772b.firebaseapp.com",
//   projectId: "followup-8772b",
//   storageBucket: "followup-8772b.firebasestorage.app",
//   messagingSenderId: "809401173456",
//   appId: "1:809401173456:web:35eeb177496db4044de5d5"
// };

export { firebaseConfig };
