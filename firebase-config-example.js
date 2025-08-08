// 🔧 EXEMPLO: Como deve ficar sua configuração Firebase
// Copie este arquivo e substitua pelos seus valores reais

const firebaseConfig = {
  // ⚠️ SUBSTITUA ESTES VALORES PELOS SEUS VALORES REAIS DO FIREBASE CONSOLE
  
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz", // ← SUA API KEY REAL
  authDomain: "followup-12345.firebaseapp.com", // ← SEU AUTH DOMAIN
  projectId: "followup-12345", // ← SEU PROJECT ID
  storageBucket: "followup-12345.appspot.com", // ← SEU STORAGE BUCKET
  messagingSenderId: "123456789012", // ← SEU MESSAGING SENDER ID
  appId: "1:123456789012:web:abcdefghijklmnop" // ← SEU APP ID
};

// ✅ COMO OBTER ESTES VALORES:
// 1. Firebase Console → Project settings
// 2. Seção "Your apps" 
// 3. Clique no app web ou crie um novo
// 4. Copie a configuração que aparece

// ✅ ONDE COLOCAR:
// 1. Abra firebase-auth.js
// 2. Substitua a configuração atual (linhas 9-16)
// 3. Salve o arquivo
// 4. Teste em test-auth.html

export { firebaseConfig };
