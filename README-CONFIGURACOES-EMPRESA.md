# 🏢 Configurações da Empresa - FollowUP

## 📋 Visão Geral

O sistema FollowUP agora inclui funcionalidades completas para cadastro e gerenciamento das informações da empresa, incluindo:

- **Nome da Empresa**
- **CNPJ**
- **Endereço**
- **Telefone**
- **Logo/Foto da Empresa**

## 🚀 Funcionalidades Implementadas

### 1. Formulário de Configurações
- Interface moderna e responsiva
- Validação de campos
- Formatação automática para CNPJ e telefone
- Upload de imagem com preview

### 2. Integração com Firebase
- Salvamento automático no banco de dados
- Sincronização entre dispositivos
- Backup em localStorage como fallback
- Autenticação de usuário obrigatória

### 3. Upload de Imagem
- Suporte para formatos: JPG, PNG, GIF
- Limite de tamanho: 2MB
- Preview em tempo real
- Botão para limpar imagem

## 📁 Arquivos Modificados

### `dashboard.html`
- Adicionado campo de upload de imagem
- Atualizado formulário de configurações
- Implementada integração com Firebase
- Adicionados estilos CSS para o campo de foto

### `firebase-auth.js`
- Nova coleção `empresa` no Firebase
- Funções `saveEmpresaConfig()` e `getEmpresaConfig()`
- Exportação das novas funções

### `test-empresa-config.html` (Novo)
- Página de teste para verificar funcionalidades
- Formulário completo de teste
- Logs detalhados de operações

## 🔧 Como Usar

### 1. Acessar Configurações
1. Faça login no sistema
2. Vá para **Configurações do Sistema**
3. Seção **Configurações Gerais**

### 2. Preencher Dados da Empresa
1. **Nome da Empresa**: Digite o nome completo
2. **CNPJ**: Formato automático XX.XXX.XXX/XXXX-XX
3. **Endereço**: Endereço completo
4. **Telefone**: Formato automático (XX) XXXXX-XXXX
5. **Logo/Foto**: Clique em "Escolher Imagem" ou arraste uma imagem

### 3. Salvar Configurações
- Clique em **"Salvar Configurações"**
- Os dados serão salvos no Firebase e localStorage
- Confirmação visual será exibida

## 🗄️ Estrutura do Banco de Dados

### Coleção: `empresa`
```javascript
{
  nome: "Nome da Empresa",
  cnpj: "00.000.000/0000-00",
  endereco: "Endereço completo",
  telefone: "(00) 00000-0000",
  fotoUrl: "data:image/jpeg;base64,...",
  userId: "user_uid",
  userEmail: "user@email.com",
  updatedAt: Timestamp
}
```

## 🧪 Testes

### Página de Teste
Acesse `test-empresa-config.html` para:
- Testar salvamento no Firebase
- Verificar carregamento de dados
- Validar upload de imagens
- Ver logs detalhados

### Comandos de Teste
```javascript
// Testar configurações
await window.FirebaseAuth.saveEmpresaConfig(dadosEmpresa);

// Carregar configurações
const config = await window.FirebaseAuth.getEmpresaConfig();
```

## 🔒 Segurança

- **Autenticação obrigatória**: Apenas usuários logados podem acessar
- **Isolamento por usuário**: Cada usuário vê apenas suas configurações
- **Validação de arquivos**: Apenas imagens até 2MB são aceitas
- **Sanitização de dados**: Campos são validados antes do salvamento

## 🎨 Interface

### Design System
- Cores consistentes com o tema do sistema
- Ícones Material Design
- Animações suaves
- Layout responsivo

### Componentes
- **Campo de Upload**: Área drag-and-drop com preview
- **Botões**: Ações primárias e secundárias
- **Formulário**: Validação em tempo real
- **Feedback**: Mensagens de sucesso e erro

## 🔄 Fluxo de Dados

1. **Carregamento**: Firebase → localStorage (fallback)
2. **Salvamento**: Formulário → Firebase + localStorage
3. **Sincronização**: Automática entre dispositivos
4. **Cache**: localStorage para acesso offline

## 🐛 Solução de Problemas

### Erro de Upload
- Verificar tamanho do arquivo (máx. 2MB)
- Confirmar formato (JPG, PNG, GIF)
- Verificar conexão com internet

### Erro de Salvamento
- Verificar autenticação do usuário
- Confirmar conexão com Firebase
- Verificar console para logs detalhados

### Dados Não Carregam
- Verificar se usuário está logado
- Confirmar permissões do Firebase
- Testar com página de teste

## 📈 Próximas Melhorias

- [ ] Upload para Firebase Storage
- [ ] Múltiplas imagens
- [ ] Edição de imagem (crop, resize)
- [ ] Histórico de alterações
- [ ] Backup automático
- [ ] Sincronização em tempo real

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs no console do navegador
2. Use a página de teste para diagnóstico
3. Consulte a documentação do Firebase
4. Entre em contato com o suporte técnico
