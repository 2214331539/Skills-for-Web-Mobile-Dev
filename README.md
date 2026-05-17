
<p align="center">
  English | <a href="./README-CN.md">中文</a>
</p>

# Skills for Web & Mobile AI Development


## Overview

The goal of this repository is to abstract common and repetitive engineering modules from traditional software development into reusable skills that coding agents can directly use.

Instead of repeatedly rebuilding the same infrastructure, developers and coding agents can install a skill and quickly generate stable, configurable, and production-oriented modules.

This repository focuses on turning real-world engineering workflows into reusable AI-agent capabilities.


## Purpose

This repository focuses on abstracting reusable engineering workflows and infrastructure modules such as:

- Authentication systems
- Admin dashboards
- Upload systems
- Payment modules
- Notification systems
- RBAC permission systems
- CRUD scaffolding
- Deployment workflows
- AI infrastructure modules
- Database initialization
- API integration workflows
- Frontend architecture patterns
- And other reusable engineering components

These skills are designed for coding agents such as:

- Codex
- Claude Code
- Cursor Agent
- Roo Code
- Continue
- Cline
- OpenHands
- Gemini CLI
- Other agentic coding environments


## Repository Structure

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
```

Each folder under `skills/` is an independent reusable skill.


## Install a Skill

You can install a skill directly from GitHub using the `skills` CLI.

Example:

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

Global install:

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --global
```


## How Skills Work

A skill is not just a prompt.

Each skill is a reusable capability package that may include:

- Instructions (`SKILL.md`)
- Templates
- References
- Scripts
- Examples
- Validation logic

When invoked, the coding agent will:

1. Load the skill instructions
2. Inspect the current project stack
3. Read templates and references
4. Execute scripts if needed
5. Generate or modify code
6. Validate outputs against the skill workflow


## Design Philosophy

All skills in this repository follow several principles:

- Reusable by default
- Decoupled from business logic
- Config-driven
- Local-development friendly
- Security-aware
- Agent-oriented
- Stack-adaptive
- Production-oriented


## Contributing

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


## License

MIT
