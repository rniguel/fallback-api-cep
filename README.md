# Fallback API CEP

Este projeto demonstra uma implementação de busca de CEP com lógica de fallback entre múltiplas APIs (AwesomeCEP e ViaCEP), garantindo maior disponibilidade do serviço.

## Estrutura do Projeto

- `frontend/`: Aplicação React + Vite + TailwindCSS + shadcn/ui.
- `backend/`: API Node.js + Express + TypeScript com lógica de fallback e segurança.

## Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Backend

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Adicione seu token da AwesomeAPI se necessário (opcional para testes locais).
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   O backend estará disponível em `http://localhost:3333`.

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:5173`.

## Funcionalidades de Segurança (Backend)

- **Helmet**: Adição de headers de segurança para proteção contra ataques comuns.
- **CORS**: Configurado para aceitar requisições apenas da URL do frontend.
- **Rate Limit**: Limite de 30 requisições por minuto por IP para evitar abusos na rota de CEP.
- **Validação**: Middleware para validar o formato do CEP antes de processar a busca.

## Créditos

Criado por [Miguel](https://miguelito.dev).
