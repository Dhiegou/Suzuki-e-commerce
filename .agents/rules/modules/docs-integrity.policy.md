---
trigger: model_decision
description: When interacting with project documentation, file system, or performing file operations that may affect docs integrity
---

# Documentation Integrity Policy (CRITICAL)

## Source of Truth

All documentation files are located in:

/docs

This includes:

- Architecture.md
- Rules.md
- Routes.md
- Components.md
- LGPD.md
- Checklist.md

---

## Forbidden Actions

The agent is STRICTLY FORBIDDEN to:

- Delete any file inside /docs
- Move documentation files
- Rename documentation files

---

## If Documentation Is Missing

The agent MUST:

1. Search inside /docs
2. If not found:
   - Assume path issue
   - NEVER assume deletion
3. Ask for clarification OR continue safely

---

## Path Resolution Rule

The agent MUST ALWAYS prioritize:

/docs

It MUST NOT assume:

- /src/docs
- root-level scattered docs

---

## Modification Rules

The agent MAY:

- Update documentation
- Append content
- Improve clarity

BUT MUST NOT:

- Remove existing sections without reason
- Break structure consistency

---

## Critical Behavior

Documentation is considered:

→ SYSTEM STATE
→ NOT OPTIONAL FILES

Breaking this rule = INVALID execution