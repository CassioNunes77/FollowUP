# 🔑 Configurar API Key do Firebase

## ❌ **Erro Atual:**
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## ✅ **Solução: Obter Configuração Real**

### **Passo 1: Acessar Firebase Console**
1. Abra [console.firebase.google.com](https://console.firebase.google.com/)
2. Faça login com sua conta Google
3. Selecione o projeto `followUP` (ou crie um se não existir)

### **Passo 2: Verificar/Criar App Web**
1. No menu lateral, clique em **"Project settings"** (ícone de engrenagem ⚙️)
2. Role até a seção **"Your apps"**
3. **Se você já tem um app web:**
   - Clique no app existente
   - Role até **"SDK setup and configuration"**
4. **Se você não tem app web:**
   - Clique em **"Add app"** (</>)
   - Selecione **"Web"**
   - Digite nome: `FollowUP Web`
   - Clique em **"Register app"**

### **Passo 3: Copiar Configuração**
Após registrar/criar o app, você verá algo como:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "followup-12345.firebaseapp.com",
  projectId: "followup-12345",
  storageBucket: "followup-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### **Passo 4: Atualizar firebase-auth.js**
1. Abra o arquivo `firebase-auth.js`
2. Localize as linhas 9-16 (configuração atual)
3. Substitua pelos seus valores reais:
```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL_AQUI",
  authDomain: "SEU_AUTH_DOMAIN_AQUI",
  projectId: "SEU_PROJECT_ID_AQUI",
  storageBucket: "SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "SEU_APP_ID_AQUI"
};
```

### **Passo 5: Testar Configuração**
1. Salve o arquivo `firebase-auth.js`
2. Acesse: `http://localhost:8000/test-simple.html`
3. Verifique se aparece **"✅ Firebase carregado com sucesso!"**
4. Se OK, teste: `http://localhost:8000/test-auth.html`

## 🔍 **Verificação Rápida:**

### **Se você já tem projeto Firebase:**
1. **Project settings** → **"Your apps"**
2. Clique no app web existente
3. Copie a configuração

### **Se você não tem projeto:**
1. **Criar projeto** → Nome: `followUP`
2. **Add app** → **Web**
3. **Register app**
4. Copie a configuração

## ⚠️ **Importante:**
- ✅ A API key é pública e segura para frontend
- ✅ O Firebase Console controla o acesso
- ✅ Domínios autorizados protegem contra uso indevido
- ✅ Nunca compartilhe chaves privadas (service account)

## 🚀 **Próximo Passo:**
Após atualizar a configuração, teste novamente em `test-simple.html`!

---

**Status**: ⏳ Aguardando configuração real
**Ação**: Obter configuração do Firebase Console
