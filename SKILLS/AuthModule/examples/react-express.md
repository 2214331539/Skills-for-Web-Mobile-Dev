# Example: React + Express

Recommended structure:

```text
src/modules/auth/
server/modules/auth/
```

Backend:

- Add Express routes under `/api/auth`.
- Use `bcrypt` or `argon2`.
- Use `jsonwebtoken` or equivalent JWT library.
- Store Refresh Token hash in `user_sessions`.
- Use HttpOnly cookie for refresh token.

Frontend:

- Create `src/modules/auth/api/authApi.ts`.
- Create `AuthProvider` or Zustand auth store.
- Add `/login`, `/register`, `/forgot-password`, `/reset-password`.
- Add `ProtectedRoute`.

Local defaults:

```env
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```
