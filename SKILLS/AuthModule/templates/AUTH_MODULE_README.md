# Auth Module Integration Guide

## Overview

This project includes a reusable authentication module generated from the `reusable-auth-module` skill.

The module provides:

- User registration
- User login
- Logout
- Current user query
- Access Token + Refresh Token
- Refresh Token session management
- Password hashing
- Verification code provider abstraction
- Email/SMS/Captcha/OAuth configuration
- Frontend auth pages/components
- Protected routes

## File Structure

Document the final generated files here.

```text
TODO: agent should replace this section with actual generated files.
```

## Environment Variables

Copy:

```bash
cp .env.example .env
```

Then configure at least:

```env
JWT_ACCESS_TOKEN_SECRET=your_strong_secret
JWT_REFRESH_TOKEN_SECRET=your_strong_secret
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```

For production, configure:

```env
AUTH_COOKIE_SECURE=true
EMAIL_PROVIDER=smtp
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

## Database Migration

Run the migration command used by this project.

Examples:

```bash
npx prisma migrate dev --name add_auth_module
npm run migration:run
python manage.py migrate
mvn spring-boot:run
```

Replace this with the actual command.

## API Endpoints

Default prefix:

```text
/api/auth
```

Required endpoints:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/logout-all
GET  /api/auth/me
POST /api/auth/token/refresh
POST /api/auth/email-code/send
POST /api/auth/sms-code/send
POST /api/auth/password/reset-code
POST /api/auth/password/reset
POST /api/auth/password/change
GET  /api/auth/sessions
DELETE /api/auth/sessions/:sessionId
```

## Frontend Routes

Default routes:

```text
/login
/register
/forgot-password
/reset-password
```

## Protected Routes

Use the generated route guard or middleware.

React example:

```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## Local Development

Default local behavior:

```env
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```

Email verification codes are printed to the backend console in development mode.

## Provider Configuration

### Email

Supported modes:

```text
log
smtp
disabled
```

### SMS

Supported modes:

```text
disabled
log
aliyun
tencent
```

### Captcha

Supported modes:

```text
disabled
local
turnstile
recaptcha
```

### OAuth

Supported providers:

```text
github
google
wechat
```

OAuth buttons should be hidden unless the provider is enabled.

## Security Notes

- Passwords are hashed.
- Refresh Tokens are stored as hashes in the database.
- Refresh Tokens are revoked on logout.
- Verification codes expire and are single-use.
- Login failure messages do not reveal whether the account exists.
- Production must use HTTPS and secure cookies.
- Do not use `EMAIL_PROVIDER=log` in production.

## Common Errors

### `401 Invalid token`

The Access Token is expired or invalid. Try refreshing the token.

### `50101 SMS provider is not configured`

Set `SMS_PROVIDER` to a real provider or disable SMS features in the UI.

### Verification code not received

If `EMAIL_PROVIDER=log`, check backend console output.

## Customization Guide

You can customize:

- Password rules in auth config
- Token expiration time
- Login/register page style
- Provider implementations
- Session expiration policy
- Rate limit thresholds
