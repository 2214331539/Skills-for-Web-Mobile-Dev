
# Modular Development Skills

A collection of reusable coding-agent skills for modern Web / App / Mini Program development.

The goal of this repository is to abstract common and repetitive engineering modules from traditional software development into reusable skills that coding agents can directly use.

Instead of repeatedly rebuilding the same infrastructure, developers and coding agents can install a skill and quickly generate stable, configurable, and production-oriented modules.

---

# Purpose

This repository focuses on abstracting fixed development workflows and infrastructure modules such as:

- Authentication systems
- Admin dashboards
- Upload systems
- Payment modules
- Notification systems
- RBAC permission systems
- CRUD scaffolding
- Deployment workflows
- AI infrastructure modules
- And other reusable engineering components

These skills are designed for coding agents such as:

- Codex
- Claude Code
- Cursor Agent
- Roo Code
- Continue
- Cline
- OpenHands
- Other agentic coding environments

---

# Repository Structure

```text
skills/
├── reusable-auth-module/
│   ├── SKILL.md
│   ├── templates/
│   ├── references/
│   ├── scripts/
│   └── examples/
│
├── another-skill/
│   └── ...
````

Each folder under `skills/` is an independent reusable skill.

---

# Install a Skill

You can install a skill directly from GitHub using the `skills` CLI.

Example:

```bash
npx skills add https://github.com/YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

or:

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

---

# Install to Specific Agents

## Codex

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --agent codex
```

## Claude Code

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --agent claude-code
```

## Global Install

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --global
```

---

# How to Use a Skill

After installation, simply reference the skill in your prompt.

Example:

```text
Use the reusable-auth-module skill to implement a reusable login/register module for this project.
```

The coding agent will:

1. Read the skill instructions
2. Inspect the current project stack
3. Use the provided templates and references
4. Generate or modify code accordingly

---

# Design Philosophy

All skills in this repository follow several principles:

* Reusable by default
* Decoupled from business logic
* Config-driven
* Local-development friendly
* Security-aware
* Agent-oriented
* Stack-adaptive

---

# Contributing

New reusable development modules are welcome.

Recommended structure for every skill:

```text
your-skill/
├── SKILL.md
├── templates/
├── references/
├── scripts/
└── examples/
```

---

# License

MIT

