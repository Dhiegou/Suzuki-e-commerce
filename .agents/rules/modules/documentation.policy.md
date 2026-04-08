---
trigger: model_decision
description: When generating or modifying code, to ensure alignment with project documentation, reuse of existing patterns, and avoidance of undocumented structures.
---

# Rule Module — Documentation Compliance

This document defines how project documentation must be used and enforced.

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

Ensure consistency, predictability, and alignment across the entire codebase by strictly following documented patterns.

---

# 📚 Source of Truth (MANDATORY)

The agent MUST follow documentation located in `/docs`:

- Rules.md
- Architecture.md
- Components.md
- Checklist.md

---

# 🧠 Core Principle

Documentation is the **single source of truth**.

It MUST override:

- Assumptions
- Personal interpretation
- Generated patterns

---

# ✅ Required Behavior

The agent MUST:

- Reuse existing patterns defined in documentation
- Follow established component structures
- Respect naming and architectural decisions
- Align with documented flows and conventions

---

# ❌ Forbidden Behavior

The agent MUST NOT:

- Invent new patterns when one already exists
- Modify architecture without documented justification
- Ignore documented structures
- Create inconsistent implementations

---

# ⚠️ Pattern Reuse Rule

Before creating any new structure, the agent MUST:

1. Check if a similar pattern already exists
2. Reuse or adapt it
3. Maintain consistency across the codebase

---

# 🚨 Violation Handling

FAIL if:

- Implementation deviates from documented patterns
- New structures are introduced without necessity
- Existing conventions are ignored

If a violation is detected:

→ The implementation MUST be corrected  
→ The agent MUST align with documentation BEFORE output  

---

# 🧱 Consistency Enforcement

All parts of the system MUST:

- Look consistent
- Behave consistently
- Follow the same architectural logic

No divergence is allowed.

---

# Documentation Governance (EXPANDED)

You MUST ensure consistency across ALL documentation files:

- Architecture.md
- Components.md
- Checklist.md
- LGPD.md
- Routes.md
- Rules.md

---

## Rule

If implementation affects any of these:

→ Update the corresponding file

---

## Failure

The response is INVALID if:

- Documentation is outdated
- Implementation diverges from documentation