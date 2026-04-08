# Component Catalog — Nova Suzuki

This document defines all components and their responsibilities.

It is the source of truth for:

- Component structure
- Responsibilities
- MCP compliance
- Reusability rules

---

# 🎯 1. Core Rule (MCP Enforcement)

ALL components MUST follow MCP:

- UI (Component.tsx)
- Logic (useComponent.ts)
- Types (Component.types.ts)

---

## Exceptions

- Pure visual components MAY skip hooks
- But MUST remain stateless

---

# 🧱 2. Component Contract

Each component MUST:

- Be isolated in its own folder
- Not contain business logic in UI
- Delegate logic to hooks
- Use typed props

---

# 🧩 3. Components

---

## 🟥 SuzukiLogo

**Type:** UI Only (Stateless)

- Pure visual component
- No hooks
- No state

---

## 🟥 Header

**Type:** MCP Component

**Responsibilities:**

- Navigation UI
- Trigger actions (no business logic)

**Rules:**

- Navigation logic MUST be abstracted
- Props MUST be typed
- Complex logic MUST live in a hook

---

## 🟥 HeroSection

**Type:** MCP Component

**Responsibilities:**

- Visual presentation
- Trigger animations

**Rules:**

- Animation logic MUST be inside hooks
- UI must remain declarative

---

## 🟥 ProductGrid

**Type:** MCP Component

**Responsibilities:**

- Render product list
- Handle UI interactions

**Rules:**

- Data MUST NOT be hardcoded in UI
- Logic MUST be in hook
- Filters MUST be controlled via state in hook

---

## 🟥 GarageSidebar

**Type:** MCP Component

**Responsibilities:**

- Display selected items
- Trigger actions (remove, update)

**Rules:**

- Business logic MUST be outside UI
- State must come from Context or hook

---

## 🟥 LeadForm (MCP — Reference Implementation)

**Type:** Full MCP

**Structure:**

- `LeadForm.tsx` → UI
- `useLeadForm.ts` → Logic
- `LeadForm.types.ts` → Types

**Rules:**

- UI must be fully declarative
- Validation must be pure
- LGPD consent is mandatory
- No sensitive data persistence

---

## 🟥 EngineSoundButton

**Type:** MCP Component

**Responsibilities:**

- Trigger audio playback

**Rules:**

- Audio logic MUST be inside hook
- UI must not manage state directly

---

# 📦 4. Layout Sections

These components:

- Are composition-only
- Must NOT contain business logic

Examples:

- ConsorcioSection
- LaunchesSection
- StatsBar
- BrandsMarquee
- ServicesSection
- AdventuresSection
- Footer

---

# ⚠️ 5. Forbidden Patterns

Components MUST NOT:

- Fetch data directly in UI
- Contain complex state logic in UI
- Mix responsibilities
- Bypass hooks for logic

---

# 🔄 6. Evolution Rule

When a new component is created:

- It MUST be added to this document
- It MUST follow MCP
- It MUST define responsibilities clearly

---

# 🔒 7. Source of Truth

If implementation differs from this document:

→ The code MUST be refactored