# 🔥 Firebase Setup para FollowUP

## 📋 Pré-requisitos
- Conta Google
- Projeto Firebase criado

## 🚀 Passo a Passo

### 1. Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Digite o nome: `followUP`
4. Aceite os termos e continue
5. Desative Google Analytics (opcional)
6. Clique em "Criar projeto"

### 2. Configurar Firestore Database
1. No console Firebase, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste"
4. Selecione a localização mais próxima (ex: us-central1)
5. Clique em "Concluir"

### 3. Configurar Regras de Segurança
1. Na aba "Regras", substitua por:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
2. Clique em "Publicar"

### 4. Adicionar App Web
1. Clique no ícone de engrenagem ⚙️
2. Selecione "Configurações do projeto"
3. Na aba "Geral", clique em "Adicionar app"
4. Escolha o ícone da web (</>)
5. Digite o nome: `FollowUP Web`
6. Clique em "Registrar app"

### 5. Copiar Configuração
1. Após registrar o app, copie a configuração:
```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "followup-XXXXX.firebaseapp.com",
  projectId: "followup-XXXXX",
  storageBucket: "followup-XXXXX.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### 6. Atualizar firebase-config.js
1. Abra o arquivo `firebase-config.js`
2. Substitua a configuração placeholder pela sua configuração real
3. Salve o arquivo

### 7. Adicionar Script no HTML
1. Abra `dashboard.html`
2. Adicione antes do fechamento do `</head>`:
```html
<script type="module" src="firebase-config.js"></script>
```

## 📁 Estrutura do Banco

### Collections
- **fichas**: Dados das fichas de produção
- **config**: Configurações da empresa
- **categorias**: Lista de categorias
- **clusters**: Lista de clusters

### Documentos
Cada documento terá:
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização
- Dados específicos da coleção

## 🔧 Teste da Conexão

1. Abra o console do navegador (F12)
2. Recarregue a página
3. Você deve ver: `🚀 Firebase configurado para FollowUP`
4. Se houver erros, verifique:
   - Configuração correta
   - Regras de segurança
   - Conexão com internet

## 🛠️ Próximos Passos

Após configurar o Firebase:
1. Atualizar as funções do dashboard para usar Firebase
2. Implementar sincronização em tempo real
3. Adicionar backup automático
4. Configurar autenticação (opcional)

## ❓ Suporte

Se encontrar problemas:
1. Verifique o console do navegador
2. Confirme as regras de segurança
3. Teste a conexão com o Firebase
4. Verifique se todas as dependências estão carregadas
