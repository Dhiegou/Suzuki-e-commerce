---
trigger: model_decision
description: When creating or structuring components, to ensure proper MCP modularization, separation of UI, logic, and types, and avoidance of monolithic components.
---

# Rule Module — MCP Architecture

This document defines the structural architecture rules based on the Modular Component Pattern (MCP).

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

Ensure a scalable, maintainable, and modular frontend architecture by enforcing strict separation of concerns.

---

# 🧱 Core Principles

All components MUST follow:

- Modularity
- Separation of concerns
- Reusability
- Predictability

---

# 📁 Component Structure (MANDATORY)

Each component MUST be isolated in its own folder:

/ComponentName  
  ComponentName.tsx  
  ComponentName.types.ts  
  useComponentName.ts (if needed)

---

# 🧩 Layer Responsibilities

## 1. UI Layer (`ComponentName.tsx`)

Responsible ONLY for:

- Rendering JSX
- Receiving props
- Triggering actions (callbacks)

MUST NOT contain:

- Business logic
- Data transformation
- Complex state logic

---

## 2. Logic Layer (`useComponentName.ts`)

Responsible for:

- Business logic
- State management
- Side effects
- Data transformation

MUST be extracted when:

- Logic exceeds simple state handling
- Reused behavior exists
- Side effects are present

---

## 3. Types Layer (`ComponentName.types.ts`)

Responsible for:

- Props typing
- Domain interfaces
- Reusable types

MUST NOT contain logic.

---

# 🚫 Forbidden Patterns

The following are STRICTLY forbidden:

### 1. Monolithic Components
- Large files mixing UI + logic + state + side effects
- Components exceeding a single clear responsibility

---

### 2. Inline Business Logic in UI
- Conditional flows tied to domain behavior
- Data manipulation inside JSX components

---

### 3. Logic Duplication
- Repeating logic across components instead of extracting hooks

---

### 4. Cross-Layer Leakage
- UI accessing data sources directly
- Types mixed with logic

---

# ⚠️ Hook Usage Rules

Custom hooks MUST be used when:

- Business logic exists
- Side effects are present (`useEffect`)
- State is shared or complex

Hooks MUST NOT:

- Return JSX
- Contain UI rendering logic

---

# 🧱 Scalability Rules

As the project grows:

- Components MUST remain small and focused
- Logic MUST be extracted into hooks
- Shared logic MUST be centralized

---

# 🚨 Violation Handling

If MCP rules are violated:

→ The component MUST be refactored  
→ Logic MUST be extracted into hooks  
→ Structure MUST be reorganized  

No exceptions allowed.