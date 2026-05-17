# Provider Configuration Guide

## Design Goal

All third-party services must be controlled through centralized configuration.

Do not hard-code provider keys or secrets.

## Email Provider

Interface:

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

### log

Use in local development only.

Behavior:

- Print verification code to backend console.
- Warn if used in production.

### smtp

Use SMTP config:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_NAME=
SMTP_FROM_ADDRESS=
```

### disabled

Return:

```json
{
  "code": 50102,
  "message": "Email provider is not configured",
  "data": null
}
```

## SMS Provider

Interface:

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
AliyunSmsProvider
TencentSmsProvider
```

If SMS is disabled, email/password auth should still work.

## Captcha Provider

Interface:

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
LocalCaptchaProvider
TurnstileCaptchaProvider
RecaptchaProvider
```

If disabled, skip captcha verification.

## OAuth Provider

Interface:

```ts
interface OAuthProvider {
  getAuthorizeUrl(state: string): string;
  handleCallback(params: {
    code: string;
    state: string;
  }): Promise<OAuthUserInfo>;
}
```

OAuth result:

```ts
interface OAuthUserInfo {
  provider: string;
  providerUserId: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
}
```

Implement:

```text
GitHubOAuthProvider
GoogleOAuthProvider
WeChatOAuthProvider
```

OAuth requirements:

```text
Verify state.
Never expose client secret to frontend.
Create local user if no binding exists.
Bind provider account to local user.
Do not store provider access token unless business needs it.
Encrypt provider tokens if stored.
```

## Graceful Degradation

Disabled or missing providers must not break the entire auth module.

Expected behavior:

```text
EMAIL_PROVIDER=log: works locally.
SMS_PROVIDER=disabled: SMS endpoint returns clear error.
CAPTCHA_PROVIDER=disabled: captcha skipped.
OAUTH_ENABLED=false: OAuth buttons hidden.
```
