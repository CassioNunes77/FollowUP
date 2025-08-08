# 🔐 Configuração de Autenticação Google - FollowUP

## 📋 Pré-requisitos
- Projeto Firebase criado
- Firestore Database configurado
- App Web adicionado

## 🚀 Configuração da Autenticação Google

### 1. Habilitar Autenticação Google no Firebase

1. **Acesse o Firebase Console**
   - Vá para [console.firebase.google.com](https://console.firebase.google.com/)
   - Selecione seu projeto `followUP`

2. **Configurar Authentication**
   - No menu lateral, clique em **"Authentication"**
   - Clique em **"Get started"** (se for a primeira vez)

3. **Adicionar Provedor Google**
   - Na aba **"Sign-in method"**
   - Clique em **"Google"**
   - Clique em **"Enable"**
   - Digite um **"Project support email"** (seu email)
   - Clique em **"Save"**

### 2. Configurar Domínios Autorizados

1. **Na aba "Settings" do Authentication**
   - Role até **"Authorized domains"**
   - Adicione seu domínio (ex: `localhost` para desenvolvimento)
   - Para produção, adicione seu domínio real

### 3. Atualizar Configuração

1. **Copiar configuração do Firebase**
   - Vá em **"Project settings"** (ícone ⚙️)
   - Na aba **"General"**, role até **"Your apps"**
   - Clique no seu app web
   - Copie a configuração

2. **Atualizar firebase-auth.js**
   - Abra o arquivo `firebase-auth.js`
   - Substitua a configuração placeholder pela real
   - Salve o arquivo

### 4. Testar Autenticação

1. **Abrir login.html**
   - Acesse `http://localhost:8000/login.html`
   - Clique em **"Entrar com Google"**
   - Faça login com sua conta Google

2. **Verificar no Console**
   - Abra o console do navegador (F12)
   - Você deve ver: `🔐 Firebase Auth configurado para FollowUP - Sistema de Login Google`
   - Após login: `✅ Login com Google realizado com sucesso`

## 📁 Estrutura de Dados por Usuário

### Collections com Isolamento de Usuário

```
usuarios/
├── {userId}/
│   ├── uid: string
│   ├── email: string
│   ├── displayName: string
│   ├── photoURL: string
│   ├── lastLogin: timestamp
│   └── createdAt: timestamp

fichas/
├── {fichaId}/
│   ├── userId: string (ID do usuário)
│   ├── userEmail: string (Email do usuário)
│   ├── cluster: string
│   ├── categoria: string
│   ├── referencia: string
│   ├── quantidade: number
│   ├── valorUnitario: number
│   ├── valorTotal: number
│   ├── pilotagem: string
│   ├── saida: string
│   ├── pagamento: string
│   ├── entrada: string
│   ├── observacoes: string
│   ├── cores: array
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

config/
├── {configId}/
│   ├── userId: string
│   ├── userEmail: string
│   ├── empresaNome: string
│   ├── empresaCnpj: string
│   ├── empresaEndereco: string
│   ├── empresaTelefone: string
│   └── updatedAt: timestamp

categorias/
├── {categoriaId}/
│   ├── userId: string
│   ├── userEmail: string
│   ├── nome: string
│   └── createdAt: timestamp

clusters/
├── {clusterId}/
│   ├── userId: string
│   ├── userEmail: string
│   ├── nome: string
│   └── createdAt: timestamp
```

## 🔧 Funcionalidades Implementadas

### Autenticação
- ✅ **Login com Google** via popup
- ✅ **Logout** seguro
- ✅ **Verificação de usuário** atual
- ✅ **Persistência** de sessão

### Isolamento de Dados
- ✅ **Dados por usuário** (cada usuário vê apenas seus dados)
- ✅ **Segurança** no Firestore
- ✅ **Filtros automáticos** por userId

### Interface
- ✅ **Página de login** moderna
- ✅ **Loading states** durante autenticação
- ✅ **Feedback visual** de sucesso/erro
- ✅ **Informações do usuário** logado

## 🔒 Segurança

### Regras do Firestore (Atualizadas)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /fichas/{fichaId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    match /config/{configId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    match /categorias/{categoriaId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    match /clusters/{clusterId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🚨 Troubleshooting

### Erro: "popup_closed_by_user"
- **Causa**: Usuário fechou a janela de login
- **Solução**: Tentar novamente

### Erro: "auth/unauthorized-domain"
- **Causa**: Domínio não autorizado
- **Solução**: Adicionar domínio em Authentication > Settings

### Erro: "auth/popup-blocked"
- **Causa**: Popup bloqueado pelo navegador
- **Solução**: Permitir popups para o site

### Erro: "permission-denied"
- **Causa**: Regras de segurança muito restritivas
- **Solução**: Verificar regras do Firestore

## 🔄 Próximos Passos

### Integração Completa
1. **Atualizar dashboard.html** para usar autenticação
2. **Migrar localStorage** para Firebase
3. **Implementar verificação** de usuário em todas as páginas
4. **Adicionar logout** no dashboard

### Melhorias
1. **Perfil do usuário** com foto e informações
2. **Configurações por usuário**
3. **Histórico de login**
4. **Notificações** de novas fichas

## 📞 Suporte

Para problemas com autenticação:
1. Verifique o console do navegador
2. Confirme se o Google Auth está habilitado
3. Verifique os domínios autorizados
4. Teste com `login.html`

---

**Status**: ✅ Sistema de autenticação Google configurado
**Versão**: 1.0.0
**Última atualização**: Janeiro 2024
