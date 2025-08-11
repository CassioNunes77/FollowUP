#!/bin/bash

# 🔥 Script para Deploy das Regras do Firebase - FollowUP
# Este script aplica as regras de segurança do Firestore

echo "🔥 Iniciando deploy das regras do Firebase..."

# Verificar se o Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI não encontrado!"
    echo "📦 Instale o Firebase CLI com: npm install -g firebase-tools"
    exit 1
fi

# Verificar se está logado no Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Faça login no Firebase primeiro:"
    firebase login
fi

# Verificar se está no projeto correto
CURRENT_PROJECT=$(firebase use --only)
if [[ "$CURRENT_PROJECT" != *"followup-8772b"* ]]; then
    echo "🔄 Mudando para o projeto followup-8772b..."
    firebase use followup-8772b
fi

# Aplicar as regras
echo "📝 Aplicando regras do Firestore..."
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo "✅ Regras aplicadas com sucesso!"
    echo "🔍 Verifique no Firebase Console: https://console.firebase.google.com/project/followup-8772b/firestore/rules"
else
    echo "❌ Erro ao aplicar as regras!"
    exit 1
fi

echo "🎉 Deploy concluído!"
