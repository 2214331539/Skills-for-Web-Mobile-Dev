# Integration Playbook

## Step 1: Inspect Project

Check:

```text
frontend framework
backend framework
database
ORM
existing user model
existing API response format
existing routes
existing state management
existing environment config
```

Run if possible:

```bash
node scripts/detect-stack.js
```

## Step 2: Choose Integration Strategy

Choose:

```text
Full frontend + backend
Backend-only
Frontend-only
Extend existing auth
Refactor existing auth
```

## Step 3: Add Config

Create or merge:

```text
.env.example
auth.config.*
```

Use templates from:

```text
templates/env.example
templates/auth.config.ts
templates/auth_config.py
templates/application-auth.yml
```

## Step 4: Add Database

Use the project ORM/migration tool.

Fallback SQL templates:

```text
templates/sql/mysql-auth-schema.sql
templates/sql/postgres-auth-schema.sql
```

If a users table already exists:

1. Do not replace it.
2. Add missing columns if safe.
3. Add companion tables.
4. Document migration impact.

## Step 5: Add Backend Module

Implement services:

```text
AuthService
RegisterService
LoginService
PasswordService
TokenService
VerificationCodeService
SessionService
SecurityLogService
```

Implement providers:

```text
EmailProvider
SmsProvider
CaptchaProvider
OAuthProvider
```

Implement middleware:

```text
requireAuth
optionalAuth
```

## Step 6: Add APIs

Implement `/api/auth/*` endpoints.

Use `references/api-contract.md`.

## Step 7: Add Frontend

Implement:

```text
LoginPage
RegisterPage
ForgotPasswordPage
ResetPasswordPage
AuthStore/AuthProvider
ProtectedRoute
authApi client
```

Use `references/frontend-component-spec.md`.

## Step 8: Add Documentation

Create:

```text
AUTH_MODULE_README.md
```

Use template:

```text
templates/AUTH_MODULE_README.md
```

Replace TODO sections with real project details.

## Step 9: Validate

Run available commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
python manage.py test
mvn test
gradle test
```

If scripts do not exist, document that.

## Step 10: Manual Test

Verify:

```text
Register user
Login
Query current user
Refresh token
Logout
Protected route
Email code local log provider
Missing SMS provider returns clear error
```
