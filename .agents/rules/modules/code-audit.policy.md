---
trigger: model_decision
description: When generating, modifying, or reviewing code, especially before final output, to ensure MCP compliance, correct structure, naming, and documentation alignment.
---

# Rule Module — Code Audit

This document defines the internal code audit process that MUST be performed before delivering any response.

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

Ensure that all generated code is structurally correct, compliant with MCP, and production-ready.

---

# 🔍 Audit Scope (MANDATORY)

Before final output, the agent MUST validate all areas below.

---

## 1. MCP Compliance

Verify:

- Each component is properly modularized
- Folder structure follows MCP
- UI, logic, and types are separated

FAIL if:

- Monolithic components exist
- Logic is inside UI components
- Missing hooks when required

---

## 2. Separation of Concerns

Verify:

- UI handles rendering only
- Logic is inside hooks
- Types are isolated

FAIL if:

- Business logic exists inside components
- Side effects exist in UI layer

---

## 3. App.tsx Compliance

Verify:

- Contains ONLY routing and layout composition

FAIL if:

- Business logic exists
- API calls are present
- useEffect contains domain logic
- Complex state is used

---

## 4. Naming Conventions

Verify:

- Components: PascalCase
- Hooks: camelCase with `use` prefix
- Constants: UPPER_SNAKE_CASE
- Types: PascalCase

FAIL if:

- Naming is inconsistent
- Patterns are not followed

---

## 5. Documentation Compliance

Verify:

- Code follows patterns defined in `/docs`
- No reinvention of structure

FAIL if:

- Existing patterns are ignored
- Structure deviates from documentation

---

## 6. README Consistency

Verify:

- Changes are reflected in README.md
- New components/features are documented

FAIL if:

- README is outdated
- Changes are missing

---

## 7. Output Structure Compliance

Verify:

- All required sections are present
- Order is correct
- No extra sections exist

FAIL if:

- Any section is missing
- Structure is altered

---

# 🚨 Blocking Rule

If ANY validation fails:

→ The agent MUST fix the issue BEFORE responding  
→ The agent MUST NOT output invalid or partial code  

---

# 🧠 Expected Behavior

This audit MUST:

- Be strict
- Be deterministic
- Prevent invalid outputs

The agent MUST behave as a quality gate before delivery.