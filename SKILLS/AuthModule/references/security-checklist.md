# Auth Module Security Checklist

## Password Security

```text
[ ] Passwords are never stored in plaintext.
[ ] Passwords are hashed with bcrypt or argon2.
[ ] Password hash cost is configurable.
[ ] Passwords are never printed in logs.
[ ] Password strength is validated on backend.
[ ] New password cannot be equal to old password.
[ ] Password reset revokes old sessions.
```

## Token Security

```text
[ ] Access Token has short expiration.
[ ] Refresh Token has longer expiration.
[ ] Refresh Token is stored as hash in database.
[ ] Refresh Token is revocable.
[ ] Refresh Token rotates on refresh.
[ ] Refresh Token is stored in HttpOnly Cookie if possible.
[ ] JWT payload does not contain sensitive data.
[ ] JWT secrets are loaded from env/config.
[ ] Production secrets are not default placeholder values.
```

## Verification Code Security

```text
[ ] Verification code expires.
[ ] Verification code is single-use.
[ ] Verification code verification attempts are limited.
[ ] Verification code sending is rate-limited.
[ ] Verification code is stored as hash if configured.
[ ] Verification code is not printed in production logs.
```

## Login Security

```text
[ ] Login failures are tracked.
[ ] Login failure messages do not reveal whether account exists.
[ ] Too many failures require captcha or lock account.
[ ] Account status is checked before login.
[ ] Login success and failure are logged.
```

## Session Security

```text
[ ] Current device logout revokes current session.
[ ] Logout-all revokes all sessions.
[ ] Session expiration is enforced.
[ ] Revoked sessions cannot refresh tokens.
[ ] Password reset can revoke all sessions.
[ ] Device metadata is recorded when possible.
```

## Provider Security

```text
[ ] Third-party provider keys are not hard-coded.
[ ] Provider config is centralized.
[ ] Disabled providers fail gracefully.
[ ] OAuth state is verified.
[ ] OAuth secrets are not sent to frontend.
[ ] SMS provider missing config does not break email/password auth.
```

## Web Security

```text
[ ] HTTPS is required in production.
[ ] Secure cookies are enabled in production.
[ ] HttpOnly cookies are enabled for refresh token.
[ ] SameSite cookie policy is configured.
[ ] CORS whitelist is configured.
[ ] CSRF is considered if cookies are used.
[ ] User input is validated and sanitized.
```

## Logging

```text
[ ] Passwords are never logged.
[ ] Tokens are never logged.
[ ] Verification codes are not logged in production.
[ ] Account input is masked if configured.
[ ] Security events are recorded.
```
