# Frontend - Fallback API CEP

Esta é a aplicação cliente construída com React e Vite.

## Tecnologias

- **React 19** com **TypeScript**
- **Vite** para build e desenvolvimento
- **TailwindCSS v3** para estilização
- **shadcn/ui** para componentes de interface
- **React Hook Form** + **Zod** para gestão de formulários
- **Axios** para consumo da API
- **Lucide React** para ícones

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
Certifique-se de que `VITE_API_URL` aponta para o seu backend (padrão: `http://localhost:3333`).

### 3. Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`.

## Estrutura de Pastas

- `src/components`: Componentes reutilizáveis e UI (shadcn).
- `src/pages`: Páginas da aplicação (Formulário e Techs).
- `src/services`: Configuração do Axios e chamadas à API.
- `src/lib`: Utilitários (como o `cn` para Tailwind).
