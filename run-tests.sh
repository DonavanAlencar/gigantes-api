#!/usr/bin/env bash
set -e

# Script para rodar testes unitários uma única vez (sem watch mode)
# Uso: ./run-tests.sh

echo "🔍 Verificando gerenciador de pacotes..."

if [ -f "yarn.lock" ]; then
    echo "Using yarn..."
    yarn test --watchAll=false
elif [ -f "pnpm-lock.yaml" ]; then
    echo "Using pnpm..."
    pnpm test --watchAll=false
else
    echo "Using npm..."
    # -- passa argumentos para o script subjacente (jest)
    npm test -- --watchAll=false
fi

echo "✅ Testes finalizados com sucesso!"
