# ✅ Checklist: Ativar Autenticação Google

## 🔥 Firebase Console - Passo a Passo

### 1. Acessar Authentication
- [ ] Abrir [Firebase Console](https://console.firebase.google.com/)
- [ ] Selecionar projeto `followUP`
- [ ] Clicar em **"Authentication"** no menu lateral

### 2. Iniciar Authentication
- [ ] Clicar em **"Get started"** (se for primeira vez)
- [ ] Aguardar carregamento da página

### 3. Habilitar Google
- [ ] Ir para aba **"Sign-in method"**
- [ ] Procurar por **"Google"** na lista
- [ ] Clicar em **"Google"**
- [ ] Clicar em **"Enable"** (toggle)

### 4. Configurar Google
- [ ] **Project support email**: Digitar seu email
- [ ] **Project public-facing name**: `FollowUP`
- [ ] Clicar em **"Save"**

### 5. Configurar Domínios
- [ ] Ir para aba **"Settings"**
- [ ] Role até **"Authorized domains"**
- [ ] Clicar em **"Add domain"**
- [ ] Adicionar: `localhost`
- [ ] Clicar em **"Add"**

### 6. Verificar Configuração
- [ ] Voltar para aba **"Sign-in method"**
- [ ] Verificar se **"Google"** está **"Enabled"**
- [ ] Status deve mostrar **"Enabled"**

## 🧪 Testar Configuração

### 1. Abrir Página de Teste
- [ ] Acessar: `http://localhost:8000/test-auth.html`
- [ ] Abrir console do navegador (F12)

### 2. Testar Login
- [ ] Clicar em **"🔐 Testar Login Google"**
- [ ] Deve abrir popup do Google
- [ ] Fazer login com sua conta Google
- [ ] Verificar se aparece **"✅ Login bem-sucedido"**

### 3. Verificar Informações
- [ ] Deve aparecer seção **"Informações do Usuário"**
- [ ] Verificar se nome, email e UID estão preenchidos
- [ ] Testar botão **"🚪 Testar Logout"**

## ❌ Possíveis Erros e Soluções

### Erro: "auth/unauthorized-domain"
**Causa**: Domínio não autorizado
**Solução**:
- [ ] Verificar se `localhost` está em **"Authorized domains"**
- [ ] Adicionar domínio se necessário

### Erro: "auth/popup-blocked"
**Causa**: Popup bloqueado pelo navegador
**Solução**:
- [ ] Permitir popups para `localhost`
- [ ] Tentar em aba privada/incógnito

### Erro: "auth/operation-not-allowed"
**Causa**: Google Auth não habilitado
**Solução**:
- [ ] Verificar se Google está **"Enabled"** em Sign-in methods
- [ ] Salvar configuração novamente

### Erro: "auth/network-request-failed"
**Causa**: Problema de conexão
**Solução**:
- [ ] Verificar conexão com internet
- [ ] Tentar novamente

## ✅ Verificação Final

### Se tudo funcionou:
- [ ] Login Google abre popup
- [ ] Login é realizado com sucesso
- [ ] Informações do usuário são exibidas
- [ ] Logout funciona corretamente
- [ ] Console mostra mensagens de sucesso

### Próximo passo:
- [ ] Testar `login.html` (página principal de login)
- [ ] Integrar com `dashboard.html`

## 📞 Se Ainda Não Funcionar

1. **Verificar Console do Navegador**
   - Abrir F12 → Console
   - Procurar por erros em vermelho

2. **Verificar Firebase Console**
   - Authentication → Sign-in method
   - Verificar se Google está habilitado

3. **Verificar Configuração**
   - Project settings → General
   - Verificar se app web está configurado

4. **Testar em Navegador Diferente**
   - Chrome, Firefox, Safari
   - Modo incógnito

---

**Status**: ⏳ Aguardando configuração
**Próximo**: Testar após configuração
