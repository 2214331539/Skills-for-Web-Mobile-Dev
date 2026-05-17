# Auth Module API Contract

## Response Format

If the project has an existing wrapper, use it. Otherwise use:

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

Error:

```json
{
  "code": 40105,
  "message": "Invalid account or password",
  "data": null
}
```

## Security Rule

Login-related errors must not reveal whether the account exists.

Return:

```text
Invalid account or password.
```

Do not return:

```text
Email does not exist.
Password is wrong.
```

## Endpoints

### POST /api/auth/register

Register a user.

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

### POST /api/auth/login

Password login.

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

### POST /api/auth/login/code

Email/SMS verification code login.

Request:

```json
{
  "targetType": "email",
  "target": "user@example.com",
  "code": "123456",
  "deviceId": "device_xxx"
}
```

### GET /api/auth/me

Return current user.

Requires Access Token.

### POST /api/auth/token/refresh

Refresh Access Token using Refresh Token.

Recommended:

- Refresh Token in HttpOnly Cookie
- Rotate Refresh Token on each refresh
- Store Refresh Token hash in `user_sessions`

### POST /api/auth/logout

Logout current device.

Must revoke current session/refresh token.

### POST /api/auth/logout-all

Logout all devices.

Must revoke all valid sessions for current user.

### POST /api/auth/email-code/send

Send email verification code.

Request:

```json
{
  "email": "user@example.com",
  "scene": "register",
  "captchaKey": "captcha_xxx",
  "captchaCode": "abcd"
}
```

### POST /api/auth/sms-code/send

Send SMS verification code.

Request:

```json
{
  "phone": "13800138000",
  "scene": "register",
  "captchaKey": "captcha_xxx",
  "captchaCode": "abcd"
}
```

If SMS is disabled:

```json
{
  "code": 50101,
  "message": "SMS provider is not configured",
  "data": null
}
```

### POST /api/auth/password/reset-code

Send password reset code.

### POST /api/auth/password/reset

Reset password.

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

Must revoke previous sessions after successful reset.

### POST /api/auth/password/change

Change password for logged-in user.

Request:

```json
{
  "oldPassword": "OldPassword123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123",
  "logoutOtherDevices": true
}
```

### GET /api/auth/sessions

Return current user's sessions.

### DELETE /api/auth/sessions/:sessionId

Revoke one session.

### GET /api/auth/oauth/:provider/authorize

Return third-party authorization URL.

### GET /api/auth/oauth/:provider/callback

Handle OAuth callback.

## Error Codes

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
