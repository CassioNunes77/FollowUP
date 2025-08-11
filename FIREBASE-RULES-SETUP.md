# 🔥 Configuração das Regras do Firebase - FollowUP

## 📋 Visão Geral

Este documento explica como configurar as regras de segurança do Firestore para permitir o funcionamento correto das configurações da empresa.

## 🚨 Problema Identificado

As configurações da empresa não estão sendo salvas no Firebase devido às regras de segurança que bloqueiam o acesso à nova coleção `empresa`.

## 🔧 Solução

### 1. Acessar o Firebase Console

1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto **followup-8772b**
3. No menu lateral, clique em **Firestore Database**
4. Clique na aba **Regras**

### 2. Aplicar as Regras

Substitua o conteúdo atual das regras pelo seguinte:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção 'empresa'
    match /empresa/{document} {
      // Permitir leitura e escrita apenas para usuários autenticados
      // e apenas para documentos onde o userId corresponde ao usuário logado
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      
      // Permitir criação de novos documentos para usuários autenticados
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId;
    }
    
    // Regras para a coleção 'config'
    match /config/{document} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId;
    }
    
    // Regras para a coleção 'fichas'
    match /fichas/{document} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId;
    }
    
    // Regras para a coleção 'categorias'
    match /categorias/{document} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId;
    }
    
    // Regras para a coleção 'clusters'
    match /clusters/{document} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId;
    }
    
    // Regras para a coleção 'usuarios'
    match /usuarios/{document} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.uid;
    }
    
    // Regra padrão: negar acesso a todas as outras coleções
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. Publicar as Regras

1. Clique em **Publicar** para aplicar as novas regras
2. Aguarde a confirmação de que as regras foram publicadas

## 🔍 Explicação das Regras

### Regras para Coleção `empresa`

```javascript
match /empresa/{document} {
  // Permitir leitura e escrita apenas para usuários autenticados
  // e apenas para documentos onde o userId corresponde ao usuário logado
  allow read, write: if request.auth != null && 
                      request.auth.uid == resource.data.userId;
  
  // Permitir criação de novos documentos para usuários autenticados
  allow create: if request.auth != null && 
                 request.auth.uid == request.resource.data.userId;
}
```

**O que essas regras fazem:**
- ✅ **Autenticação obrigatória**: Apenas usuários logados podem acessar
- ✅ **Isolamento por usuário**: Cada usuário só acessa seus próprios dados
- ✅ **Criação permitida**: Usuários podem criar novos documentos
- ✅ **Edição permitida**: Usuários podem editar seus documentos existentes

## 🧪 Teste das Regras

### 1. Teste Básico
1. Acesse `test-firebase-empresa.html`
2. Faça login com Google
3. Execute o teste de salvamento
4. Verifique se não há erros de permissão

### 2. Teste no Dashboard
1. Acesse o dashboard
2. Vá para Configurações do Sistema
3. Adicione configurações da empresa
4. Verifique se são salvas no Firebase

## 🚨 Regras Temporárias (Apenas para Desenvolvimento)

Se você quiser permitir acesso total temporariamente (NÃO RECOMENDADO para produção):

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

⚠️ **ATENÇÃO**: Esta regra permite acesso total a todos os dados. Use apenas para testes e remova imediatamente após os testes.

## 🔒 Segurança

As regras implementadas garantem:

- **Autenticação obrigatória** para todas as operações
- **Isolamento de dados** por usuário
- **Proteção contra acesso não autorizado**
- **Validação de propriedade** dos documentos

## 📞 Suporte

Se ainda houver problemas após aplicar as regras:

1. Verifique se o usuário está autenticado
2. Confirme que o `userId` está sendo salvo corretamente
3. Verifique os logs no console do Firebase
4. Use a página de teste para diagnóstico

## 🔄 Atualização das Regras

Para atualizar as regras no futuro:

1. Acesse o Firebase Console
2. Vá para Firestore Database > Regras
3. Edite as regras conforme necessário
4. Clique em **Publicar**

---

**Data de Criação**: $(date)
**Versão**: 1.0
**Projeto**: FollowUP
