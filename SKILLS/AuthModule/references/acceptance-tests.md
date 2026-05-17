# Acceptance Tests

Use these tests to verify the auth module.

## Manual Test Cases

### 1. Register

Input:

```text
email: test@example.com
password: Password123
confirmPassword: Password123
verificationCode: code from log provider
```

Expected:

```text
User is created.
Password hash is stored.
No plaintext password is stored.
Access Token is returned or user can login after registration.
```

### 2. Login

Input:

```text
account: test@example.com
password: Password123
```

Expected:

```text
Login succeeds.
Access Token is returned.
Refresh Token cookie/session is created.
Login log is recorded.
```

### 3. Login Failure

Input:

```text
account: test@example.com
password: wrong
```

Expected:

```text
Login fails.
Generic error message returned.
Failure count increases.
Login log is recorded.
No account enumeration leak.
```

### 4. Current User

Request:

```text
GET /api/auth/me
Authorization: Bearer <accessToken>
```

Expected:

```text
Current user profile is returned.
Sensitive fields are not returned.
```

### 5. Refresh Token

Request:

```text
POST /api/auth/token/refresh
```

Expected:

```text
New Access Token is returned.
Refresh Token rotates if implemented.
Old/revoked token cannot be reused.
```

### 6. Logout

Request:

```text
POST /api/auth/logout
```

Expected:

```text
Current session is revoked.
Refresh endpoint no longer works with old session.
```

### 7. Password Reset

Expected:

```text
Reset code is sent.
Password can be reset.
Old sessions are revoked.
Old password no longer works.
New password works.
```

### 8. Protected Route

Expected:

```text
Unauthenticated user is redirected to login.
Authenticated user can access private page.
```

### 9. Disabled SMS

Request:

```text
POST /api/auth/sms-code/send
```

Expected when `SMS_PROVIDER=disabled`:

```json
{
  "code": 50101,
  "message": "SMS provider is not configured",
  "data": null
}
```

### 10. Production Config Guard

Expected in production:

```text
Default JWT secrets are rejected.
AUTH_COOKIE_SECURE=false is rejected or warned.
EMAIL_PROVIDER=log is rejected or warned.
```

## Automated Test Suggestions

Backend:

```text
Register success
Register duplicate email
Login success
Login wrong password
Refresh token success
Refresh token revoked
Logout success
Password reset success
Verification code expired
Verification code used twice
```

Frontend:

```text
Login form validation
Register form validation
Verification code countdown
Protected route redirect
Auth store fetchCurrentUser
Logout clears auth state
```
