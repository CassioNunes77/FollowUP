# 🔧 Obter Configuração Real do Firebase

## ❌ **Problema Atual:**
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## ✅ **Solução: Obter Configuração Real**

### **Passo 1: Acessar Firebase Console**
1. Vá para [console.firebase.google.com](https://console.firebase.google.com/)
2. Selecione seu projeto `followUP`

### **Passo 2: Obter Configuração do App Web**
1. No menu lateral, clique em **"Project settings"** (ícone de engrenagem)
2. Role até a seção **"Your apps"**
3. Se você já tem um app web, clique nele
4. Se não tem, clique em **"Add app"** → **"Web"** (</>) 
5. Digite um nome: `FollowUP Web`
6. Clique em **"Register app"**

### **Passo 3: Copiar Configuração**
1. Após registrar o app, você verá um código como este:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // ← SUA API KEY REAL
  authDomain: "followup-XXXXX.firebaseapp.com",
  projectId: "followup-XXXXX",
  storageBucket: "followup-XXXXX.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### **Passo 4: Atualizar firebase-auth.js**
1. Abra o arquivo `firebase-auth.js`
2. Substitua a configuração atual pela sua configuração real
3. Salve o arquivo

### **Passo 5: Testar Novamente**
1. Acesse: `http://localhost:8000/test-auth.html`
2. Teste o login Google
3. Deve funcionar agora!

## 🔍 **Verificação Rápida:**

### **Se você já tem app web configurado:**
1. **Project settings** → **"Your apps"**
2. Clique no app web existente
3. Role até **"SDK setup and configuration"**
4. Copie a configuração

### **Se você não tem app web:**
1. **Project settings** → **"Your apps"**
2. **"Add app"** → **"Web"**
3. Nome: `FollowUP Web`
4. **"Register app"**
5. Copie a configuração

## ⚠️ **Importante:**
- ✅ A API key é pública e segura para usar no frontend
- ✅ O Firebase Console controla o acesso
- ✅ Domínios autorizados protegem contra uso indevido
- ✅ Nunca compartilhe suas chaves privadas (service account)

## 🚀 **Próximo Passo:**
Após atualizar a configuração, teste novamente em `test-auth.html`!

---

**Status**: ⏳ Aguardando configuração real
**Ação**: Obter configuração do Firebase Console
