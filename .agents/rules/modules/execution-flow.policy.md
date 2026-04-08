---
trigger: model_decision
description: When implementing features or components, to enforce proper planning, architecture definition, and MCP alignment before coding begins.
---

# Rule Module — Execution Flow

This document defines the mandatory execution sequence for any implementation.

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

Ensure that all implementations are planned, structured, and aligned with MCP before coding begins.

---

# 🧠 Core Principle

No code should be written before a clear architectural plan is defined.

---

# 🔄 Mandatory Execution Sequence

The agent MUST follow this exact order:

---

## 1. Architecture Definition

Before coding, the agent MUST:

- Define the overall structure
- Identify required components
- Determine data flow and responsibilities

---

## 2. Component Breakdown

The agent MUST:

- List all components involved
- Define responsibilities for each component
- Identify which components require hooks

---

## 3. MCP Alignment Check

Before implementation, the agent MUST verify:

- Components follow MCP structure
- Logic is properly separated from UI
- Hooks are planned where needed

FAIL if:

- Structure is unclear
- Responsibilities are mixed
- MCP is not respected

---

## 4. Implementation Phase

Only AFTER all previous steps are valid:

→ The agent MAY implement the solution

Implementation MUST:

- Follow MCP architecture
- Respect all policy modules
- Maintain separation of concerns

---

# 🚫 Forbidden Behavior

The agent MUST NOT:

- Start coding without defining architecture
- Skip component breakdown
- Implement without MCP validation
- Mix planning and coding simultaneously

---

# 🚨 Violation Handling

If execution flow is violated:

→ The agent MUST stop  
→ The agent MUST restructure the plan  
→ The agent MUST restart following the correct sequence  

No shortcuts allowed.