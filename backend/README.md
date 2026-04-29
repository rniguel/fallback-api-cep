# Backend - Fallback API CEP

API Node.js construída com Express e TypeScript para busca de CEP com lógica de fallback.

## Funcionalidades

- **Lógica de Fallback:** Tenta buscar na API AwesomeCEP e, em caso de falha, faz fallback para ViaCEP.
- **Segurança:** 
  - **Helmet:** Headers de segurança.
  - **CORS:** Restrição de origem para o frontend.
  - **Rate Limit:** Máximo de 30 requisições por minuto por IP.
- **Validação:** Middleware para validar formato de CEP (8 dígitos numéricos).
- **Normalização:** Respostas padronizadas independente da API de origem.

## Como rodar

### 1. Instalação
```bash
npm install
```

### 2. Configuração
Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```
Preencha as variáveis:
- `PORT`: Porta do servidor (padrão 3333).
- `FRONTEND_URL`: URL onde seu frontend está rodando.
- `AWESOME_API_TOKEN`: Seu token da AwesomeAPI (opcional para testes).

### 3. Desenvolvimento
```bash
npm run dev
```

### 4. Build e Produção
```bash
npm run build
npm start
```

## API Endpoints

### `GET /cep/:cep`
Busca informações de endereço para um determinado CEP.
- **Resposta Sucesso (200):**
  ```json
  {
    "logradouro": "Praça da Sé",
    "bairro": "Sé",
    "cidade": "São Paulo",
    "estado": "SP"
  }
  ```
- **Erros:**
  - `400`: CEP inválido.
  - `429`: Limite de requisições excedido.
  - `502`: Falha em todas as APIs de CEP.
