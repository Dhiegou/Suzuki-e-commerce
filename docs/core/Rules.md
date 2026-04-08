# Project Rules — Nova Suzuki

This document defines the global rules for the project.

It is the highest-level source of truth for:

- Technology stack
- Code standards
- Architecture constraints
- Agent behavior

---

# 🎯 1. Governance System (CRITICAL)

The project uses a multi-layer AI governance system.

All implementations MUST follow:

- MCP Architecture
- Policy Modules (.rules)
- Supervisor enforcement

---

## Rule

Agents MUST:

- Follow all policy modules
- Respect documentation in `/docs`
- Never bypass MCP or governance rules

---

# ⚙️ 2. Mandatory Technologies

- React (v19+) with Vite
- TypeScript (strict mode)
- Tailwind CSS
- GSAP (primary animation engine)
- Lenis (scroll)
- Swup (transitions)
- Lucide React

---

## Backend (Planned)

- Node.js / Next.js
- MariaDB

---

# 🧱 3. Code Standards

---

## Functional Components

- Only functional components are allowed
- Hooks MUST be used for logic

---

## Naming Conventions

- Components → PascalCase
- Variables/Functions → camelCase
- Constants → UPPER_SNAKE_CASE
- Types → PascalCase

---

## Exports

- Default export → pages/components
- Named exports → hooks/data

---

# 📁 4. Project Structure

```text
src/
├── components/
├── data/
├── hooks/
├── pages/
├── types/
├── App.tsx
└── main.tsx

docs/
.rules/

---

# Project Rules — Nova Suzuki

This document defines the global rules for the project.

It is the highest-level source of truth for:

- Technology stack
- Code standards
- Architecture constraints
- Agent behavior

---

# 🎯 1. Governance System (CRITICAL)

The project uses a multi-layer AI governance system.

All implementations MUST follow:

- MCP Architecture
- Policy Modules (.rules)
- Supervisor enforcement

---

## Rule

Agents MUST:

- Follow all policy modules
- Respect documentation in `/docs`
- Never bypass MCP or governance rules

---

# ⚙️ 2. Mandatory Technologies

- React (v19+) with Vite
- TypeScript (strict mode)
- Tailwind CSS
- GSAP (primary animation engine)
- Lenis (scroll)
- Swup (transitions)
- Lucide React

---

## Backend (Planned)

- Node.js / Next.js
- MariaDB

---

# 🧱 3. Code Standards

---

## Functional Components

- Only functional components are allowed
- Hooks MUST be used for logic

---

## Naming Conventions

- Components → PascalCase
- Variables/Functions → camelCase
- Constants → UPPER_SNAKE_CASE
- Types → PascalCase

---

## Exports

- Default export → pages/components
- Named exports → hooks/data

---

# 📁 4. Project Structure

```text
src/
├── components/
├── data/
├── hooks/
├── pages/
├── types/
├── App.tsx
└── main.tsx

docs/
.rules/