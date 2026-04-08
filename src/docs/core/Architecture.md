# System Architecture — Nova Suzuki

This document defines the CURRENT architecture of the system.

It is the source of truth for:

- Frontend structure
- Backend structure
- Data flow
- Technology usage
- Architectural constraints

---

# 🎯 1. Architecture Scope

This document describes ONLY what is currently implemented.

Planned features are explicitly marked.

---

# 🧱 2. Frontend Architecture (CURRENT)

The system follows:

- SPA (Single Page Application)
- Component-Driven Architecture
- MCP (Model Component Pattern)

---

## MCP Enforcement

All components MUST:

- Separate UI, logic, and types
- Use custom hooks for business logic
- Avoid monolithic structures

---

# ⚙️ 3. Tech Stack (CURRENT)

## Frontend

- React (v19)
- TypeScript (v5+)
- Vite
- Tailwind CSS
- GSAP (primary animation engine)
- Lenis (scroll engine)
- Swup (page transitions)

## Backend

- Node.js + Express 4
- TypeScript (strict mode)
- Microsoft SQL Server (relational database)
- Layered Architecture (routes → controllers → services → repositories)

---

## Animation Rule

- GSAP is the primary animation system
- Framer Motion is OPTIONAL and limited to simple transitions

---

# 🔄 4. Application Flow

## Frontend

```text
App → Pages → Components → Hooks
```

- `App.tsx` handles routing and layout only
- Pages orchestrate components
- Components delegate logic to hooks

## Backend

```text
Request → Middleware → Route → Controller → Service → Repository → Oracle
```

- Routes define endpoints (thin, no logic)
- Controllers handle request/response (validation formatting)
- Services contain ALL business logic
- Repositories handle database access (SQL only)
- Middlewares handle cross-cutting concerns (CORS, auth, rate limiting)

---

# 🏗️ 5. Backend Architecture (CURRENT)

## Layered Design

```
backend/src/
├── routes/          ← Express route definitions (thin)
├── controllers/     ← Request/Response handling
├── services/        ← Business logic (pure, testable)
├── repositories/    ← Database access (SQL)
├── database/        ← Connection pool + migrations
├── middlewares/     ← CORS, Rate Limit, Sanitizer, Error Handler
├── types/           ← Shared TypeScript interfaces
├── utils/           ← Helpers (crypto, validators)
└── server.ts        ← Entry point
```

## Security Middlewares

| Middleware | Purpose |
|-----------|---------|
| CORS | Restricts origins to frontend |
| Rate Limiter | General: 100/15min, Leads: 10/hour |
| Sanitizer | Strips HTML entities (XSS prevention) |
| Error Handler | Catches unhandled errors, hides stack traces |

## Database

- **Engine:** Oracle Database
- **Tables:** leads, newsletter_subscribers, motorcycles
- **LGPD:** CPF hashed (SHA-256+salt), IP masked, consent tracked

---

# 🔐 6. LGPD Architecture

- CPF is NEVER stored in plain text (hashed with SHA-256 + salt)
- Every data collection requires `lgpd_consent = true` + `lgpd_consent_at` timestamp
- IP addresses are masked (last octet zeroed)
- No sensitive data in error responses or logs (production)
- Data retention: leads > 5 years must be deleted/anonymized

---

# 🔗 7. Frontend–Backend Integration

- Vite proxy forwards `/api` requests to Express (port 3001) in development
- All API responses use a standard envelope: `{ success, data?, error? }`
- Frontend API calls are routed through a dedicated service abstraction (`src/services/api.ts`) using native `fetch` with standard standardized ApiError handling.
- React components delegate complex interactions to custom hooks (e.g., `useLeadForm.ts`) which, in turn, consume the API service layer.

---

# 🔒 8. Source of Truth

If implementation differs from this document:

→ The implementation MUST be refactored