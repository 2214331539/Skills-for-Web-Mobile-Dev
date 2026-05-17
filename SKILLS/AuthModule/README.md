# Reusable Auth Module Skill

A reusable skill for coding agents such as Codex, Claude Code, Cursor Agent, and other agentic coding tools.

This skill helps an agent implement a secure, decoupled, configurable Web authentication module in an existing project.

## What it generates

- Login/register module
- Backend auth APIs
- Database schema or ORM models
- Access Token + Refresh Token flow
- Refresh Token session table
- Password hashing
- Email verification code provider
- SMS provider abstraction
- Captcha provider abstraction
- OAuth provider abstraction
- Frontend auth pages/components
- Protected route support
- Centralized configuration
- `.env.example`
- Integration documentation

## Directory structure

```text
reusable-auth-module/
├── SKILL.md
├── README.md
├── templates/
│   ├── env.example
│   ├── auth.config.ts
│   ├── auth_config.py
│   ├── application-auth.yml
│   ├── AUTH_MODULE_README.md
│   ├── api-contract.openapi.yaml
│   └── sql/
│       ├── mysql-auth-schema.sql
│       └── postgres-auth-schema.sql
├── references/
│   ├── database-schema.md
│   ├── api-contract.md
│   ├── security-checklist.md
│   ├── frontend-component-spec.md
│   ├── provider-config-guide.md
│   ├── integration-playbook.md
│   └── acceptance-tests.md
├── scripts/
│   ├── detect-stack.js
│   ├── check-auth-env.js
│   └── generate-env-example.js
└── examples/
    ├── react-express.md
    ├── react-django.md
    ├── springboot-vue.md
    └── nextjs.md
```

## Usage prompt

```text
Use the reusable-auth-module skill to implement a secure, reusable, decoupled login/register module for this project.

Include backend APIs, database schema, frontend pages/components, auth state management, token/session handling, centralized provider config, .env.example, and documentation.

Third-party email/SMS/captcha/OAuth services must be controlled through config and must degrade gracefully when disabled.
```

## Local development defaults

```env
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```

## Production warning

Before production, configure strong JWT secrets, HTTPS, secure cookies, real email/SMS providers if needed, rate limits, CORS, CSRF, and audit logging.
