Explicacao chat que nao tenho pachorra de quando testarem para ser mais facil .

# Fit & Sabor - Guia de Inicialização

Este guia explica como iniciar o projeto Fit & Sabor usando o arquivo `start-dev.bat`.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Python 3.13 ou superior
- Node.js 18 ou superior
- npm (geralmente vem com Node.js)
- Git

## Estrutura do Projeto

O projeto está dividido em duas partes:
- Backend (Django)
- Frontend (React)

## Como Usar o start-dev.bat

O arquivo `start-dev.bat` foi criado para facilitar a inicialização do ambiente de desenvolvimento. Ele automatiza o processo de ativação do ambiente virtual Python e inicia tanto o servidor Django quanto o servidor React.

### Passos para Execução:

1. Abra o terminal no diretório raiz do projeto
2. Execute o arquivo start-dev.bat:
   ```
   .\start-dev.bat
   ```

O script irá:
- Ativar o ambiente virtual Python
- Instalar as dependências do Python (se necessário)
- Iniciar o servidor Django na porta 8000
- Instalar as dependências do Node.js (se necessário)
- Iniciar o servidor React na porta 3000

### Portas Utilizadas

- Frontend (React): http://localhost:3000
- Backend (Django): http://localhost:8000

## Solução de Problemas

Se encontrar algum erro:

1. Certifique-se de que todas as dependências estão instaladas:
   ```
   pip install -r requirements.txt
   cd sitepr/fit-frontend
   npm install
   ```

2. Verifique se as portas 3000 e 8000 não estão em uso
3. Certifique-se de que o ambiente virtual está ativado antes de executar o Django

## Observações

- O servidor Django deve estar rodando para que o frontend funcione corretamente
- Mantenha ambos os servidores (Django e React) rodando durante o desenvolvimento
- Para parar os servidores, pressione Ctrl+C em cada terminal
