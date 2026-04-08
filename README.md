<div align="center">

# 🏍️ Nova Suzuki

### Estilo de Vida em Duas Rodas

**E-commerce moderno de motocicletas Suzuki** — Construído com React 19, GSAP, Tailwind CSS e Framer Motion.

![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.1-06b6d4?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88ce02?style=flat-square&logo=greensock)

</div>

---

## ✨ Features

- 🎬 **Hero Cinematic & Immersive** — Vídeo em loop com sistema de **Ignicão Sonora** (Engine Sound) e feedback visual de vibração.
- 🏍️ **Catálogo de Motos Premium** — Grid dinâmico com modelos Suzuki (Hayabusa, V-Strom, GSX-S, etc).
- 🏠 **Minha Garagem (Wishlist)** — Sistema de garagem persistente (LocalStorage) para salvar modelos favoritos e enviar interesse em lote.
- 📋 **Lead Capture & Interesse Oficial** — Rota `/interesse` com formulário completo (nome, e-mail, telefone, CPF, CEP), máscaras inteligentes, validação CPF modulo-11, estados de sucesso/erro, e conformidade **LGPD** (consentimento obrigatório, sem dados sensíveis em localStorage).
- 🏔️ **Seções Lifestyle & UX** — Banners parallax, Mega Menu interativo e scroll suave (Lenis).
- 🎨 **Design System Suzuki** — Fidelidade visual máxima às cores, tipografia (Space Grotesk) e estética da marca.

## 🛠️ Stack

| Tecnologia               | Uso                       |
| ------------------------ | ------------------------- |
| **React 19**             | Framework UI              |
| **Vite 6**               | Build tool e dev server   |
| **React Router 7**       | Navegação e roteamento    |
| **TypeScript**           | Tipagem estática          |
| **Tailwind CSS 4**       | Estilização utilitária    |
| **GSAP + ScrollTrigger** | Animações de scroll       |
| **Framer Motion**        | Transições e micro-interações |
| **Lucide React**         | Ícones SVG                |

## 🚀 Como Rodar

**Pré-requisitos:** Node.js 18+

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

O site estará disponível em **http://localhost:3000**

## 📦 Scripts Disponíveis

| Comando           | Descrição                                          |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento na porta 3000 |
| `npm run build`   | Gera o build de produção em `dist/`                |
| `npm run preview` | Preview do build de produção                       |
| `npm run lint`    | Verificação de tipos TypeScript                    |

## 📁 Estrutura do Projeto (MCP)

O projeto segue o **Modular Component Pattern (MCP)**:

```
├── src/
│   ├── components/         # Componentes isolados (UI, Hook, Types)
│   │   ├── GarageSidebar/  # Sistema de Garagem/Wishlist
│   │   ├── LeadForm/       # Formulário de interesse LGPD
│   │   ├── EngineSoundButton/ # Botão de ignição imersiva
│   │   └── ...
│   ├── pages/              # Páginas da aplicação (Home, Interesse)
│   ├── contexts/           # Contextos globais (GarageContext)
│   ├── hooks/              # Hooks de animação e lógica
│   ├── data/               # Dados estáticos (Navigation)
│   ├── constants.ts        # Catálogo de Veículos
│   └── main.tsx            # Entry point com Providers
```

## 🎨 Design System

- **Azul Suzuki** `#004b90` — Cor primária
- **Vermelho Suzuki** `#e60012` — Cor de destaque
- **Ghost White** `#f8f9fa` — Fundo claro
- **Fontes** — Space Grotesk (headings) + Inter (body)

## 🔧 Backend API

### Stack

| Tecnologia | Uso |
|------------|-----|
| **Express 4** | Framework HTTP |
| **Oracle Database** | Banco relacional (LGPD compliant) |
| **Redis** | Rate-limiting horizontal e estresse preventivo |
| **Zod** | Validação de input com tipagem rigorosa |
| **TypeScript** | Tipagem estrita |
| **Pino** | Logger estruturado (JSON/Async) |
| **tsx** | Runtime dev com hot-reload |

### Setup

```bash
# 1. Entrar na pasta do backend
cd backend

# 2. Instalar dependências
npm install

# 3. Configurar .env (copiar de .env.example)
cp .env.example .env

# 4. Configurar banco de dados (auto-detecta e executa migration)
node setup-db.mjs

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

Backend disponível em **http://localhost:3001/api/v1**

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/v1/health` | Health check |
| `GET` | `/api/v1/motorcycles` | Listar motos |
| `GET` | `/api/v1/motorcycles/:id` | Detalhe da moto |
| `POST` | `/api/v1/leads/contact` | Enviar interesse |
| `POST` | `/api/v1/leads/newsletter` | Inscrever newsletter |

### Arquitetura

```
backend/src/
├── routes/          ← Definição de rotas (thin)
├── controllers/     ← Request/Response handling
├── services/        ← Lógica de negócio
├── repositories/    ← Acesso ao banco (SQL)
├── database/        ← Pool de conexões + migrações
├── middlewares/     ← CORS, Rate Limit, Sanitizer, Error Handler
├── types/           ← Interfaces TypeScript
├── utils/           ← Crypto (hash CPF), Validators
└── server.ts        ← Entry point
```

## 📄 Licença

Este projeto é um protótipo educacional/demonstrativo para a Suzuki JTZ Motors Brasil.

---

<div align="center">

**Way of Life** 🏍️

</div>
