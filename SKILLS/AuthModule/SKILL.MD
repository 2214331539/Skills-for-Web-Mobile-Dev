---
name: reusable-auth-module
description: Build a reusable, secure, project-decoupled Web authentication module with login, registration, password reset, token/session management, verification code providers, OAuth placeholders, frontend components, backend APIs, database schema, centralized configuration, and integration documentation.
---

# Reusable Auth Module Skill

## 1. Purpose

Use this skill to add a reusable, secure, and project-decoupled authentication module to an existing Web project.

The goal is not to create a one-off login page. The goal is to create a self-contained authentication module that can be reused across multiple projects with minimal modification.

The module should support:

- User registration
- User login
- User logout
- Current user query
- Access Token and Refresh Token
- Refresh Token revocation
- Password reset
- Password change
- Email verification code
- SMS verification code abstraction
- Captcha abstraction
- OAuth login abstraction
- Multi-device session management
- Login logs
- Security event logs
- Frontend login/register pages
- Frontend auth state management
- Protected routes
- Centralized configuration
- Local development fallback behavior
- Integration documentation

---

## 2. Core Principles

Follow these principles strictly.

### 2.1 Decoupled by Default

The authentication module must be separated from business logic.

Do not scatter authentication logic across unrelated business files.

Recommended module naming:

```text
auth
user
session
security
verification
oauth
```

The module should expose clear APIs, reusable services, middleware, hooks, and components.

### 2.2 Centralized Configuration

All third-party providers and sensitive options must be controlled through centralized configuration.

Do not hard-code:

* JWT secrets
* Token expiration time
* Cookie name
* Cookie domain
* SMTP config
* SMS provider keys
* OAuth client ID
* OAuth client secret
* Captcha keys
* Verification code expiration time
* Rate-limit thresholds
* Redirect URLs

The module must include or update:

```text
.env.example
auth.config.*
```

Choose the config file style according to the detected project stack.

### 2.3 Security First

The generated module must include secure defaults:

* Password hashing
* Access Token with short expiration
* Refresh Token with server-side revocation
* Refresh Token hashing in database
* Verification code expiration
* Verification code one-time usage
* Login failure tracking
* Rate limiting
* Generic login error message
* No plaintext password logs
* No plaintext token logs
* No sensitive data in JWT payload
* Safe local development fallback

### 2.4 Minimal Integration Cost

After implementation, the user should only need to:

1. Copy `.env.example` to `.env`
2. Fill required secrets
3. Run database migration
4. Start backend
5. Start frontend
6. Visit `/login` or `/register`
7. Protect private routes with the generated guard/component

### 2.5 Stack-Aware Implementation

Before implementation, inspect the project and follow its current stack.

Examples:

* React + Express
* React + NestJS
* React + Django
* React + FastAPI
* React + Spring Boot
* Vue + Spring Boot
* Next.js
* Nuxt
* Flask
* Django
* Java Spring Boot
* Node.js + Prisma
* Node.js + Sequelize
* Node.js + TypeORM

Do not introduce a new framework unless necessary.

---

## 3. When to Use This Skill

Use this skill when the user asks for:

* Login/register module
* Authentication system
* JWT login
* User registration
* Password reset
* Email verification
* SMS verification
* OAuth login
* Protected routes
* Reusable auth module
* Auth component abstraction
* Auth database schema
* Auth API design
* Auth module integration into an existing project

---

## 4. Required Initial Project Inspection

Before writing code, inspect the project structure.

Check for:

```text
package.json
pnpm-lock.yaml
yarn.lock
package-lock.json
vite.config.*
next.config.*
nuxt.config.*
src/
app/
pages/
server/
backend/
api/
prisma/
migrations/
requirements.txt
pyproject.toml
manage.py
pom.xml
build.gradle
settings.gradle
docker-compose.yml
.env
.env.example
README.md
```

Determine:

1. Frontend framework
2. Backend framework
3. Database type
4. ORM or migration tool
5. Existing user model
6. Existing auth logic
7. Existing API response format
8. Existing routing style
9. Existing environment config style
10. Existing UI component library
11. Existing request client
12. Existing state management solution
13. Existing lint/build/test commands

Do not overwrite existing auth code blindly.

If auth code already exists, extend it carefully or create a migration plan.

---

## 5. Integration Strategy

After inspection, choose one of these strategies:

```text
A. Full frontend + backend auth module
B. Backend-only auth module
C. Frontend-only auth module
D. Extend existing auth module
E. Refactor incomplete auth module into reusable module
```

Default choice:

```text
A. Full frontend + backend auth module
```

Unless the project clearly has only frontend or only backend.

---

## 6. Module Architecture

Use this architecture as the target structure.

```text
Reusable Auth Module
├── Config Layer
│   ├── auth.config.*
│   ├── env parser
│   └── provider configs
│
├── Database Layer
│   ├── users
│   ├── user_credentials
│   ├── verification_codes
│   ├── user_sessions
│   ├── login_logs
│   └── security_events
│
├── Provider Layer
│   ├── EmailProvider
│   ├── SmsProvider
│   ├── CaptchaProvider
│   └── OAuthProvider
│
├── Backend Service Layer
│   ├── AuthService
│   ├── RegisterService
│   ├── LoginService
│   ├── PasswordService
│   ├── TokenService
│   ├── VerificationCodeService
│   ├── SessionService
│   ├── OAuthService
│   └── SecurityLogService
│
├── Backend API Layer
│   ├── register
│   ├── login
│   ├── logout
│   ├── current user
│   ├── refresh token
│   ├── password reset
│   ├── password change
│   ├── verification code
│   ├── sessions
│   └── oauth
│
├── Frontend Layer
│   ├── LoginPage
│   ├── RegisterPage
│   ├── ForgotPasswordPage
│   ├── ResetPasswordPage
│   ├── AuthProvider/AuthStore
│   ├── useAuth
│   ├── ProtectedRoute
│   └── authApi client
│
└── Documentation Layer
    ├── AUTH_MODULE_README.md
    ├── API docs
    ├── ENV docs
    ├── migration docs
    └── security notes
```

---

## 7. Required Features

### 7.1 MVP Features

Implement these first if the user does not explicitly ask for the full version:

```text
Email or username + password registration
Email or username + password login
Logout
Current user query
Access Token
Refresh Token
Refresh Token revocation
Password hashing
Local email-code log provider
Basic protected route
Login page
Register page
Centralized auth config
.env.example
AUTH_MODULE_README.md
```

### 7.2 Full Features

Implement these if the user asks for a complete auth module:

```text
Email registration
Phone registration
Username login
Email login
Phone login
Password reset
Password change
Email verification
SMS provider abstraction
Captcha provider abstraction
OAuth provider abstraction
Multi-session management
Security event logging
Login failure limit
Device management
Account status management
Token rotation
Account security page
OAuth callback page
```

---

## 8. Required Database Tables

Create migrations or ORM models according to the project stack.

Required tables:

```text
users
user_credentials
verification_codes
user_sessions
login_logs
security_events
```

Optional tables:

```text
user_oauth_accounts
captcha_challenges
user_agreements
mfa_factors
```

If the project already has a `users` table, do not replace it directly. Extend it safely or create companion tables.

---

## 9. Database Schema Specification

### 9.1 users

Purpose: store core user profile and account status.

Required fields:

```text
id
username
nickname
avatar_url
email
email_verified
phone
phone_verified
status
register_source
register_ip
last_login_at
last_login_ip
password_updated_at
created_at
updated_at
deleted_at
```

Recommended status values:

```text
active
pending
locked
disabled
deleted
banned
```

### 9.2 user_credentials

Purpose: store password credentials and login failure state.

Required fields:

```text
id
user_id
password_hash
password_algo
password_version
failed_login_count
locked_until
created_at
updated_at
```

Password must never be stored in plaintext.

Recommended password algorithms:

```text
bcrypt
argon2
```

Do not use:

```text
md5
sha1
plain sha256 without salt
reversible encryption
```

### 9.3 verification_codes

Purpose: store email/SMS verification codes.

Required fields:

```text
id
target
target_type
scene
code_hash
expires_at
used_at
send_ip
verify_attempts
created_at
```

Supported scenes:

```text
register
login
reset_password
change_password
bind_email
bind_phone
oauth_bind
```

Verification code rules:

```text
Expire after configured time
Single-use
Limited verification attempts
Limited sending frequency
Stored as hash if enabled
Never logged in production
```

### 9.4 user_sessions

Purpose: manage Refresh Tokens and devices.

Required fields:

```text
id
user_id
refresh_token_hash
access_token_jti
device_id
device_name
user_agent
os
browser
ip
location
is_trusted
expires_at
revoked_at
revoke_reason
last_active_at
created_at
```

This table must support:

```text
Current device logout
Logout all devices
Revoke specific session
Refresh Token rotation
Multi-device display
Suspicious session detection
```

### 9.5 login_logs

Purpose: record login success/failure.

Required fields:

```text
id
user_id
account_input
login_type
success
failure_reason
ip
location
user_agent
device_id
created_at
```

Mask account input if enabled.

### 9.6 security_events

Purpose: record sensitive security operations.

Required fields:

```text
id
user_id
event_type
event_detail
ip
user_agent
risk_level
created_at
```

Recommended event types:

```text
REGISTER
LOGIN_SUCCESS
LOGIN_FAILED
LOGOUT
LOGOUT_ALL_DEVICES
PASSWORD_CHANGED
PASSWORD_RESET
EMAIL_BOUND
PHONE_BOUND
OAUTH_BOUND
OAUTH_UNBOUND
ACCOUNT_LOCKED
ACCOUNT_DISABLED
TOKEN_REFRESHED
SESSION_REVOKED
```

### 9.7 user_oauth_accounts Optional

Purpose: bind third-party accounts.

Required fields:

```text
id
user_id
provider
provider_user_id
provider_username
provider_avatar
access_token_encrypted
refresh_token_encrypted
token_expires_at
created_at
updated_at
```

If the business does not need to call third-party APIs after login, do not store third-party access tokens.

---

## 10. Required API Endpoints

Use `/api/auth` as the default prefix unless the project uses a different convention.

### 10.1 Register

```http
POST /api/auth/register
```

Request:

```json
{
  "registerType": "email",
  "username": "test_user",
  "email": "user@example.com",
  "phone": null,
  "password": "Password123",
  "confirmPassword": "Password123",
  "verificationCode": "123456",
  "inviteCode": null,
  "agreeTerms": true,
  "agreementVersion": "v1.0"
}
```

### 10.2 Login

```http
POST /api/auth/login
```

Request:

```json
{
  "account": "user@example.com",
  "password": "Password123",
  "rememberMe": true,
  "captchaKey": null,
  "captchaCode": null,
  "deviceId": "device_xxx"
}
```

### 10.3 Verification Code Login

```http
POST /api/auth/login/code
```

Request:

```json
{
  "targetType": "email",
  "target": "user@example.com",
  "code": "123456",
  "deviceId": "device_xxx"
}
```

### 10.4 Current User

```http
GET /api/auth/me
```

### 10.5 Refresh Token

```http
POST /api/auth/token/refresh
```

### 10.6 Logout Current Device

```http
POST /api/auth/logout
```

### 10.7 Logout All Devices

```http
POST /api/auth/logout-all
```

### 10.8 Send Email Code

```http
POST /api/auth/email-code/send
```

Request:

```json
{
  "email": "user@example.com",
  "scene": "register",
  "captchaKey": "captcha_xxx",
  "captchaCode": "abcd"
}
```

### 10.9 Send SMS Code

```http
POST /api/auth/sms-code/send
```

Request:

```json
{
  "phone": "13800138000",
  "scene": "register",
  "captchaKey": "captcha_xxx",
  "captchaCode": "abcd"
}
```

### 10.10 Request Password Reset Code

```http
POST /api/auth/password/reset-code
```

### 10.11 Reset Password

```http
POST /api/auth/password/reset
```

Request:

```json
{
  "targetType": "email",
  "target": "user@example.com",
  "code": "123456",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

### 10.12 Change Password

```http
POST /api/auth/password/change
```

Request:

```json
{
  "oldPassword": "OldPassword123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123",
  "logoutOtherDevices": true
}
```

### 10.13 Session List

```http
GET /api/auth/sessions
```

### 10.14 Revoke Session

```http
DELETE /api/auth/sessions/:sessionId
```

### 10.15 OAuth Authorize

```http
GET /api/auth/oauth/:provider/authorize
```

### 10.16 OAuth Callback

```http
GET /api/auth/oauth/:provider/callback
```

---

## 11. API Response Format

If the project already has a response wrapper, follow it.

Otherwise use:

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

Error response:

```json
{
  "code": 40105,
  "message": "Invalid account or password",
  "data": null
}
```

Do not expose whether an account exists during login.

Do not return:

```text
Email does not exist.
Password is wrong.
```

Return:

```text
Invalid account or password.
```

---

## 12. Standard Error Codes

Use or adapt these error codes.

```text
0       Success

40001   Invalid parameters
40002   Invalid verification code
40003   Verification code expired
40004   Verification code sent too frequently
40005   Password does not meet security requirements

40101   Unauthorized
40102   Invalid token
40103   Token expired
40104   Invalid refresh token
40105   Invalid account or password
40106   Account locked
40107   Account disabled
40108   Account not verified

40301   Forbidden

40901   Email already used
40902   Phone already used
40903   Username already used
40904   OAuth account already bound

42901   Too many requests

50001   Internal server error
50101   SMS provider is not configured
50102   Email provider is not configured
50103   OAuth provider is not configured
50104   Captcha provider is not configured
```

---

## 13. Centralized Configuration

Create or update `.env.example`.

### 13.1 Base Auth Config

```env
AUTH_MODULE_ENABLED=true
AUTH_API_PREFIX=/api/auth
AUTH_FRONTEND_LOGIN_PATH=/login
AUTH_FRONTEND_REGISTER_PATH=/register
AUTH_FRONTEND_AFTER_LOGIN_PATH=/
AUTH_FRONTEND_AFTER_LOGOUT_PATH=/login
```

### 13.2 JWT Config

```env
JWT_ACCESS_TOKEN_SECRET=replace_with_strong_access_secret
JWT_REFRESH_TOKEN_SECRET=replace_with_strong_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=2h
JWT_REFRESH_TOKEN_EXPIRES_IN=30d
JWT_ISSUER=your-app-name
```

### 13.3 Cookie Config

```env
AUTH_COOKIE_ENABLED=true
AUTH_COOKIE_NAME=refresh_token
AUTH_COOKIE_DOMAIN=
AUTH_COOKIE_SECURE=false
AUTH_COOKIE_HTTP_ONLY=true
AUTH_COOKIE_SAME_SITE=lax
```

Production must use:

```env
AUTH_COOKIE_SECURE=true
AUTH_COOKIE_HTTP_ONLY=true
```

### 13.4 Password Config

```env
PASSWORD_HASH_ALGORITHM=bcrypt
PASSWORD_BCRYPT_ROUNDS=12
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_LOWERCASE=true
PASSWORD_REQUIRE_NUMBER=true
PASSWORD_REQUIRE_SPECIAL=false
```

### 13.5 Verification Code Config

```env
VERIFICATION_CODE_LENGTH=6
VERIFICATION_CODE_EXPIRES_MINUTES=5
VERIFICATION_CODE_RESEND_COOLDOWN_SECONDS=60
VERIFICATION_CODE_MAX_ATTEMPTS=5
VERIFICATION_CODE_STORE_HASH=true
```

### 13.6 Email Provider Config

```env
EMAIL_PROVIDER=log
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password
SMTP_FROM_NAME=Your App
SMTP_FROM_ADDRESS=no-reply@example.com
```

Supported providers:

```text
log
smtp
disabled
```

In local development, default to:

```env
EMAIL_PROVIDER=log
```

In production, do not use:

```env
EMAIL_PROVIDER=log
```

### 13.7 SMS Provider Config

```env
SMS_PROVIDER=disabled
SMS_CODE_EXPIRE_MINUTES=5
SMS_RESEND_COOLDOWN_SECONDS=60
```

Aliyun SMS placeholder:

```env
SMS_PROVIDER=aliyun
ALIYUN_ACCESS_KEY_ID=
ALIYUN_ACCESS_KEY_SECRET=
ALIYUN_SMS_ENDPOINT=dysmsapi.aliyuncs.com
ALIYUN_SMS_SIGN_NAME=
ALIYUN_SMS_TEMPLATE_CODE=
ALIYUN_SMS_TEMPLATE_CODE_KEY=code
```

Tencent Cloud SMS placeholder:

```env
SMS_PROVIDER=tencent
TENCENT_SECRET_ID=
TENCENT_SECRET_KEY=
TENCENT_SMS_SDK_APP_ID=
TENCENT_SMS_SIGN_NAME=
TENCENT_SMS_TEMPLATE_ID=
```

If SMS is not configured, return:

```json
{
  "code": 50101,
  "message": "SMS provider is not configured",
  "data": null
}
```

### 13.8 Captcha Config

```env
CAPTCHA_PROVIDER=disabled
CAPTCHA_EXPIRES_MINUTES=5
```

Supported providers:

```text
disabled
local
turnstile
recaptcha
```

Cloudflare Turnstile placeholder:

```env
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Google reCAPTCHA placeholder:

```env
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### 13.9 OAuth Config

```env
OAUTH_ENABLED=false
```

GitHub:

```env
GITHUB_OAUTH_ENABLED=false
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/oauth/github/callback
```

Google:

```env
GOOGLE_OAUTH_ENABLED=false
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/oauth/google/callback
```

WeChat:

```env
WECHAT_OAUTH_ENABLED=false
WECHAT_APP_ID=
WECHAT_APP_SECRET=
WECHAT_CALLBACK_URL=
```

### 13.10 Rate Limit Config

```env
AUTH_RATE_LIMIT_ENABLED=true
AUTH_LOGIN_MAX_ATTEMPTS_PER_ACCOUNT=5
AUTH_LOGIN_LOCK_MINUTES=15
AUTH_LOGIN_MAX_ATTEMPTS_PER_IP=20
AUTH_CODE_SEND_MAX_PER_TARGET_PER_DAY=10
AUTH_CODE_SEND_MAX_PER_IP_PER_HOUR=30
```

### 13.11 Security Log Config

```env
AUTH_SECURITY_LOG_ENABLED=true
AUTH_LOGIN_LOG_ENABLED=true
AUTH_MASK_ACCOUNT_IN_LOG=true
```

---

## 14. TypeScript Config Template

For TypeScript projects, create:

```text
src/config/auth.config.ts
```

or backend-specific:

```text
server/config/auth.config.ts
```

Template:

```ts
export const authConfig = {
  enabled: process.env.AUTH_MODULE_ENABLED !== 'false',

  apiPrefix: process.env.AUTH_API_PREFIX || '/api/auth',

  frontend: {
    loginPath: process.env.AUTH_FRONTEND_LOGIN_PATH || '/login',
    registerPath: process.env.AUTH_FRONTEND_REGISTER_PATH || '/register',
    afterLoginPath: process.env.AUTH_FRONTEND_AFTER_LOGIN_PATH || '/',
    afterLogoutPath: process.env.AUTH_FRONTEND_AFTER_LOGOUT_PATH || '/login',
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '2h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d',
    issuer: process.env.JWT_ISSUER || 'web-app',
  },

  cookie: {
    enabled: process.env.AUTH_COOKIE_ENABLED !== 'false',
    name: process.env.AUTH_COOKIE_NAME || 'refresh_token',
    domain: process.env.AUTH_COOKIE_DOMAIN || undefined,
    secure: process.env.AUTH_COOKIE_SECURE === 'true',
    httpOnly: process.env.AUTH_COOKIE_HTTP_ONLY !== 'false',
    sameSite: (process.env.AUTH_COOKIE_SAME_SITE || 'lax') as 'lax' | 'strict' | 'none',
  },

  password: {
    algorithm: process.env.PASSWORD_HASH_ALGORITHM || 'bcrypt',
    bcryptRounds: Number(process.env.PASSWORD_BCRYPT_ROUNDS || 12),
    minLength: Number(process.env.PASSWORD_MIN_LENGTH || 8),
    requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
    requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false',
    requireNumber: process.env.PASSWORD_REQUIRE_NUMBER !== 'false',
    requireSpecial: process.env.PASSWORD_REQUIRE_SPECIAL === 'true',
  },

  verificationCode: {
    length: Number(process.env.VERIFICATION_CODE_LENGTH || 6),
    expiresMinutes: Number(process.env.VERIFICATION_CODE_EXPIRES_MINUTES || 5),
    resendCooldownSeconds: Number(process.env.VERIFICATION_CODE_RESEND_COOLDOWN_SECONDS || 60),
    maxAttempts: Number(process.env.VERIFICATION_CODE_MAX_ATTEMPTS || 5),
    storeHash: process.env.VERIFICATION_CODE_STORE_HASH !== 'false',
  },

  email: {
    provider: process.env.EMAIL_PROVIDER || 'log',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
      fromName: process.env.SMTP_FROM_NAME || 'Your App',
      fromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@example.com',
    },
  },

  sms: {
    provider: process.env.SMS_PROVIDER || 'disabled',
    aliyun: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || '',
      endpoint: process.env.ALIYUN_SMS_ENDPOINT || 'dysmsapi.aliyuncs.com',
      signName: process.env.ALIYUN_SMS_SIGN_NAME || '',
      templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE || '',
      templateCodeKey: process.env.ALIYUN_SMS_TEMPLATE_CODE_KEY || 'code',
    },
    tencent: {
      secretId: process.env.TENCENT_SECRET_ID || '',
      secretKey: process.env.TENCENT_SECRET_KEY || '',
      sdkAppId: process.env.TENCENT_SMS_SDK_APP_ID || '',
      signName: process.env.TENCENT_SMS_SIGN_NAME || '',
      templateId: process.env.TENCENT_SMS_TEMPLATE_ID || '',
    },
  },

  captcha: {
    provider: process.env.CAPTCHA_PROVIDER || 'disabled',
    expiresMinutes: Number(process.env.CAPTCHA_EXPIRES_MINUTES || 5),
    turnstile: {
      siteKey: process.env.TURNSTILE_SITE_KEY || '',
      secretKey: process.env.TURNSTILE_SECRET_KEY || '',
    },
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY || '',
      secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    },
  },

  oauth: {
    enabled: process.env.OAUTH_ENABLED === 'true',
    github: {
      enabled: process.env.GITHUB_OAUTH_ENABLED === 'true',
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackUrl: process.env.GITHUB_CALLBACK_URL || '',
    },
    google: {
      enabled: process.env.GOOGLE_OAUTH_ENABLED === 'true',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || '',
    },
    wechat: {
      enabled: process.env.WECHAT_OAUTH_ENABLED === 'true',
      appId: process.env.WECHAT_APP_ID || '',
      appSecret: process.env.WECHAT_APP_SECRET || '',
      callbackUrl: process.env.WECHAT_CALLBACK_URL || '',
    },
  },

  rateLimit: {
    enabled: process.env.AUTH_RATE_LIMIT_ENABLED !== 'false',
    loginMaxAttemptsPerAccount: Number(process.env.AUTH_LOGIN_MAX_ATTEMPTS_PER_ACCOUNT || 5),
    loginLockMinutes: Number(process.env.AUTH_LOGIN_LOCK_MINUTES || 15),
    loginMaxAttemptsPerIp: Number(process.env.AUTH_LOGIN_MAX_ATTEMPTS_PER_IP || 20),
    codeSendMaxPerTargetPerDay: Number(process.env.AUTH_CODE_SEND_MAX_PER_TARGET_PER_DAY || 10),
    codeSendMaxPerIpPerHour: Number(process.env.AUTH_CODE_SEND_MAX_PER_IP_PER_HOUR || 30),
  },

  logs: {
    securityLogEnabled: process.env.AUTH_SECURITY_LOG_ENABLED !== 'false',
    loginLogEnabled: process.env.AUTH_LOGIN_LOG_ENABLED !== 'false',
    maskAccountInLog: process.env.AUTH_MASK_ACCOUNT_IN_LOG !== 'false',
  },
};
```

---

## 15. Provider Abstractions

Third-party features must be implemented through provider interfaces.

### 15.1 EmailProvider

```ts
interface EmailProvider {
  sendVerificationCode(params: {
    to: string;
    code: string;
    scene: string;
  }): Promise<void>;
}
```

Implement:

```text
LogEmailProvider
SmtpEmailProvider
DisabledEmailProvider
```

Rules:

```text
LogEmailProvider is for local development only.
SmtpEmailProvider uses SMTP config.
DisabledEmailProvider returns a clear not-configured error.
```

### 15.2 SmsProvider

```ts
interface SmsProvider {
  sendVerificationCode(params: {
    phone: string;
    code: string;
    scene: string;
  }): Promise<void>;
}
```

Implement:

```text
DisabledSmsProvider
LogSmsProvider
AliyunSmsProvider placeholder
TencentSmsProvider placeholder
```

Rules:

```text
SMS disabled should not break email/password registration.
Missing SMS keys should fail gracefully.
Do not hard-code provider credentials.
```

### 15.3 CaptchaProvider

```ts
interface CaptchaProvider {
  verify(params: {
    captchaKey?: string;
    captchaCode?: string;
    token?: string;
    ip?: string;
  }): Promise<boolean>;
}
```

Implement:

```text
DisabledCaptchaProvider
LocalCaptchaProvider placeholder
TurnstileCaptchaProvider placeholder
RecaptchaProvider placeholder
```

### 15.4 OAuthProvider

```ts
interface OAuthProvider {
  getAuthorizeUrl(state: string): string;

  handleCallback(params: {
    code: string;
    state: string;
  }): Promise<OAuthUserInfo>;
}
```

Required type:

```ts
interface OAuthUserInfo {
  provider: string;
  providerUserId: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
}
```

Implement placeholders:

```text
GitHubOAuthProvider
GoogleOAuthProvider
WeChatOAuthProvider
```

If OAuth is disabled, hide frontend OAuth buttons.

---

## 16. Backend Implementation Requirements

### 16.1 AuthService

Responsible for high-level orchestration:

```text
register
login
logout
refreshToken
getCurrentUser
```

### 16.2 PasswordService

Responsible for:

```text
hashPassword
verifyPassword
validatePasswordStrength
changePassword
resetPassword
```

### 16.3 TokenService

Responsible for:

```text
generateAccessToken
generateRefreshToken
hashRefreshToken
verifyAccessToken
verifyRefreshToken
rotateRefreshToken
revokeRefreshToken
```

### 16.4 VerificationCodeService

Responsible for:

```text
generateCode
hashCode
sendEmailCode
sendSmsCode
verifyCode
markCodeAsUsed
enforceCooldown
enforceMaxAttempts
```

### 16.5 SessionService

Responsible for:

```text
createSession
getSessions
revokeSession
revokeAllSessions
updateLastActiveAt
```

### 16.6 SecurityLogService

Responsible for:

```text
logLoginSuccess
logLoginFailure
logSecurityEvent
maskSensitiveData
```

### 16.7 Auth Middleware

Implement at least:

```text
requireAuth
optionalAuth
```

Optional:

```text
requireRole
requirePermission
```

`requireAuth` must:

1. Read Access Token.
2. Verify Access Token.
3. Attach user identity to request context.
4. Reject invalid or expired token.
5. Return standard unauthorized response.

---

## 17. Token Rules

Use:

```text
Access Token + Refresh Token
```

### 17.1 Access Token

Rules:

```text
Short expiration
Sent through Authorization header
Contains user id and basic role info only
Does not contain sensitive data
```

Allowed JWT payload example:

```json
{
  "sub": "10001",
  "roles": ["user"],
  "iat": 1710000000,
  "exp": 1710007200,
  "jti": "access_token_unique_id"
}
```

Do not include:

```text
password
phone
full email if unnecessary
id card
refresh token
private profile data
```

### 17.2 Refresh Token

Rules:

```text
Longer expiration
Stored as HttpOnly cookie if possible
Stored as hash in database
Revocable from server side
Rotated after refresh
Invalidated on logout
Invalidated on password reset
```

### 17.3 Refresh Token Rotation

When `/api/auth/token/refresh` is called:

```text
Read refresh token
Hash refresh token
Find matching valid session
Reject if revoked or expired
Generate new access token
Generate new refresh token
Revoke old session token or update session token hash
Store new refresh token hash
Set new refresh token cookie
Return new access token
```

If an old refresh token is reused after rotation, treat it as suspicious and revoke related sessions if possible.

---

## 18. Frontend Implementation Requirements

If the project has a frontend, generate reusable pages and components.

### 18.1 Required Pages

```text
LoginPage
RegisterPage
ForgotPasswordPage
ResetPasswordPage
```

Optional:

```text
AccountSecurityPage
SessionManagementPage
OAuthCallbackPage
```

### 18.2 Required Components

```text
AuthLayout
PasswordLoginForm
CodeLoginForm
RegisterForm
VerificationCodeInput
PasswordStrengthMeter
CaptchaInput
OAuthLoginButtons
ProtectedRoute
```

### 18.3 Auth Store

Use the existing project state management tool when possible.

Examples:

```text
React Context
Zustand
Redux
Pinia
Vue reactive store
Next.js server/client auth helper
```

Required state:

```ts
interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

Required actions:

```ts
login()
register()
logout()
refreshToken()
fetchCurrentUser()
sendEmailCode()
sendSmsCode()
resetPassword()
changePassword()
```

### 18.4 Protected Route

Create a route guard.

React example:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### 18.5 Frontend Validation

Include validation for:

```text
Required fields
Email format
Phone format
Password length
Password confirmation
Verification code length
Agreement checkbox
```

Frontend validation is not a security boundary. Backend validation is still required.

### 18.6 Token Storage

Recommended strategy:

```text
Access Token: memory or short-lived app state
Refresh Token: HttpOnly Cookie
```

Avoid storing Refresh Token in localStorage.

If localStorage is used due to project constraints, document the security tradeoff clearly.

---

## 19. Recommended File Structure

Adapt to existing project conventions.

### 19.1 React Frontend

```text
src/
└── modules/
    └── auth/
        ├── api/
        │   └── authApi.ts
        ├── components/
        │   ├── AuthLayout.tsx
        │   ├── PasswordLoginForm.tsx
        │   ├── CodeLoginForm.tsx
        │   ├── RegisterForm.tsx
        │   ├── VerificationCodeInput.tsx
        │   ├── PasswordStrengthMeter.tsx
        │   ├── CaptchaInput.tsx
        │   ├── OAuthLoginButtons.tsx
        │   └── ProtectedRoute.tsx
        ├── pages/
        │   ├── LoginPage.tsx
        │   ├── RegisterPage.tsx
        │   ├── ForgotPasswordPage.tsx
        │   ├── ResetPasswordPage.tsx
        │   └── AccountSecurityPage.tsx
        ├── store/
        │   └── authStore.ts
        ├── hooks/
        │   ├── useAuth.ts
        │   └── useRequireAuth.ts
        ├── types/
        │   └── auth.types.ts
        └── utils/
            ├── passwordRules.ts
            ├── tokenStorage.ts
            └── authGuards.ts
```

### 19.2 Node.js Backend

```text
server/
└── modules/
    └── auth/
        ├── auth.routes.ts
        ├── auth.controller.ts
        ├── auth.service.ts
        ├── register.service.ts
        ├── login.service.ts
        ├── password.service.ts
        ├── token.service.ts
        ├── verification-code.service.ts
        ├── session.service.ts
        ├── oauth.service.ts
        ├── security-log.service.ts
        ├── auth.middleware.ts
        ├── auth.types.ts
        └── providers/
            ├── email.provider.ts
            ├── sms.provider.ts
            ├── captcha.provider.ts
            └── oauth.provider.ts
```

### 19.3 Spring Boot Backend

```text
src/main/java/.../
└── auth/
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── dto/
    ├── config/
    ├── security/
    └── provider/
```

### 19.4 Django Backend

```text
backend/
└── auth_module/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    ├── services/
    ├── providers/
    ├── permissions.py
    └── config.py
```

---

## 20. Security Requirements

Before finishing, verify this checklist.

```text
[ ] Passwords are hashed.
[ ] Plaintext passwords are never logged.
[ ] Verification codes expire.
[ ] Verification codes are single-use.
[ ] Verification code verification attempts are limited.
[ ] Verification code sending is rate-limited.
[ ] Login attempts are rate-limited.
[ ] Refresh tokens are stored as hashes in database.
[ ] Refresh tokens can be revoked.
[ ] Logout invalidates current refresh token/session.
[ ] Logout all devices invalidates all user sessions.
[ ] Password reset invalidates old sessions.
[ ] Access token does not contain sensitive data.
[ ] Sensitive config values are read from environment variables.
[ ] `.env.example` is provided.
[ ] Production cookie config supports HttpOnly and Secure.
[ ] Login failure messages do not reveal whether the account exists.
[ ] Auth middleware protects private APIs.
[ ] Frontend protected route is included.
[ ] API response format is consistent.
[ ] Documentation explains integration steps.
```

---

## 21. Local Development Behavior

The module must work locally without real third-party services.

Default local configuration:

```env
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```

Behavior:

```text
Email verification code is printed to backend console in development.
SMS API returns a clear not-configured error.
Captcha is skipped unless enabled.
OAuth buttons are hidden unless enabled.
Email/password registration and login still work.
```

Do not require real SMS, OAuth, or Captcha provider keys for local development.

---

## 22. Production Readiness

Before production, remind the user to configure:

```text
Strong JWT secrets
HTTPS
Secure cookies
SMTP provider
SMS provider if needed
Captcha provider if needed
OAuth app credentials if needed
Rate limit storage
Database backups
Security logging
CORS whitelist
CSRF policy
```

Production must not use:

```env
EMAIL_PROVIDER=log
JWT_ACCESS_TOKEN_SECRET=replace_with_strong_access_secret
JWT_REFRESH_TOKEN_SECRET=replace_with_strong_refresh_secret
AUTH_COOKIE_SECURE=false
```

---

## 23. Implementation Procedure

Follow this procedure.

### Step 1: Inspect Project

Identify:

```text
frontend framework
backend framework
database
ORM
existing user model
existing API format
existing routing
existing styling system
existing environment config
```

### Step 2: Choose Integration Strategy

Choose one:

```text
Full frontend + backend auth module
Backend-only auth module
Frontend-only auth module
Extend existing auth module
```

### Step 3: Create Centralized Config

Create or update:

```text
.env.example
auth.config.*
```

All third-party provider/API options must be centralized.

### Step 4: Add Database Schema

Create migrations or ORM models.

Do not destroy existing user data.

If a users table already exists, extend it carefully.

### Step 5: Add Backend Services

Implement:

```text
AuthService
TokenService
PasswordService
VerificationCodeService
SessionService
SecurityLogService
```

### Step 6: Add Provider Abstractions

Implement provider interfaces for:

```text
Email
SMS
Captcha
OAuth
```

Use placeholders or disabled providers when credentials are missing.

### Step 7: Add Backend APIs

Implement `/api/auth/*` endpoints.

### Step 8: Add Auth Middleware

Implement request authentication middleware.

### Step 9: Add Frontend API Client

Create frontend auth request functions.

### Step 10: Add Frontend Pages and Components

Create login, register, forgot password, and reset password pages.

### Step 11: Add Protected Routes

Create protected route support.

### Step 12: Add Documentation

Create:

```text
AUTH_MODULE_README.md
```

### Step 13: Run Validation

Run available project commands:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

or equivalent commands.

If some commands do not exist, document that.

---

## 24. Required Documentation

Create `AUTH_MODULE_README.md`.

It must include:

```text
1. Overview
2. Features
3. File structure
4. Environment variables
5. Database migration instructions
6. API endpoint list
7. Frontend route list
8. How to protect routes
9. How to configure email
10. How to configure SMS
11. How to configure OAuth
12. How to configure captcha
13. Local development behavior
14. Production checklist
15. Security notes
16. Common errors
17. Customization guide
```

---

## 25. Acceptance Criteria

The task is complete only when:

```text
[ ] User can register.
[ ] User can login.
[ ] User can logout.
[ ] User can query current user.
[ ] Protected route rejects unauthenticated users.
[ ] Password is stored as hash.
[ ] Access Token generation works.
[ ] Refresh Token refresh works.
[ ] Refresh Token/session can be revoked.
[ ] Verification code flow works in local development.
[ ] Third-party provider settings are centralized.
[ ] Missing third-party configs fail gracefully.
[ ] Database migration/model files are provided.
[ ] Frontend pages are usable.
[ ] Documentation is provided.
[ ] Existing project code is not broken.
```

---

## 26. Do Not Do

Do not:

```text
Store plaintext passwords.
Hard-code secrets.
Expose refresh tokens to frontend JavaScript if HttpOnly Cookie is available.
Put sensitive data into JWT payload.
Leak whether an account exists during login.
Overwrite existing user tables without migration strategy.
Remove existing business logic.
Introduce unnecessary framework changes.
Require real SMS/OAuth/email provider keys for local development.
Block local development when third-party providers are not configured.
```

---

## 27. Suggested User Prompt

The user may invoke this skill with:

```text
Use the reusable-auth-module skill to add a complete login/register authentication module to this project.

Requirements:
1. Keep the auth module decoupled from business logic.
2. Use centralized auth configuration.
3. Support email/password registration and login first.
4. Add password hashing.
5. Add Access Token + Refresh Token.
6. Store Refresh Token in HttpOnly Cookie if possible.
7. Add local development email-code log provider.
8. Add placeholders for SMS, captcha, and OAuth providers.
9. Add login/register frontend pages.
10. Add protected route support.
11. Add database migrations.
12. Add AUTH_MODULE_README.md explaining how to configure and use the module.

Do not hard-code secrets. Do not overwrite existing user data. Follow the current project stack and coding style.
```

Compact version:

```text
Use the reusable-auth-module skill to implement a secure, reusable, decoupled login/register module for this project. Include backend APIs, database schema, frontend pages/components, auth state management, token/session handling, centralized provider config, .env.example, and documentation. Third-party email/SMS/captcha/OAuth services must be controlled through config and must degrade gracefully when disabled.
```

---

## 28. Final Output Format

At the end of implementation, summarize:

```text
Implemented files
Modified files
New environment variables
Database migration steps
How to run locally
How to test login/register
Which features are enabled
Which features are placeholders
Security notes
Known limitations
```

Example:

```text
Auth module added successfully.

New features:
- Email/password registration
- Password login
- Logout
- Current user query
- Token refresh
- Local email-code provider
- Protected routes
- Centralized auth config

Run:
1. Copy .env.example to .env.
2. Fill JWT secrets.
3. Run database migration.
4. Start backend.
5. Start frontend.
6. Visit /login or /register.

Notes:
- SMS is disabled by default.
- OAuth is disabled by default.
- Email provider uses log mode in development.
```

