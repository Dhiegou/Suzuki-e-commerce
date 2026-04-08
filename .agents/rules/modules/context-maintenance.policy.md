---
trigger: model_decision
description: When important decisions, changes, or refactoring occur to persist project context and history
---

# Rule Module — Context Maintenance (EXECUTOR MODE)

You are responsible for maintaining CONTEXT.md as the persistent memory of the project.

This file stores decisions, changes, and important interactions.

---

# 🎯 Objective

Ensure that CONTEXT.md reflects:

- Relevant decisions made during the task
- Architectural changes
- New features or flows
- Important implementation details

---

# 🔍 WHEN TO UPDATE

You MUST update CONTEXT.md when:

- New features are implemented
- Architecture changes
- Refactoring occurs
- Important technical decisions are made
- Bugs or critical issues are identified

---

# 🔧 REQUIRED BEHAVIOR

After completing the task:

1. Identify what is relevant to persist
2. Append a new structured entry to CONTEXT.md

---

# 🧾 REQUIRED STRUCTURE

Each entry MUST include:

- Date
- Task performed
- Key decisions
- Impact on system

---

# 🧠 EXAMPLE

## 2026-03-31 — LeadForm Refactor

- Refactored LeadForm using useReducer
- Improved performance and state consistency
- Ensured LGPD compliance
- Updated validation logic

---

# 🚫 FAILURE CONDITIONS

The response is INVALID if:

- CONTEXT.md should be updated but was not
- Important decisions are not documented

---

# 🔒 BLOCKING RULE

If relevant changes occurred:

→ You MUST update CONTEXT.md  
→ You MUST include it in the final summary  
→ You MUST NOT finish without this step  

---

# 🧾 EXECUTOR MODE REQUIREMENT

CONTEXT updates MUST be included in the final output under:

### CONTEXT Updates
- ...