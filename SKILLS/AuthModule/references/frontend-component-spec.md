# Frontend Component Specification

## Required Pages

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

## Required Components

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

## Auth State

Use the existing project state management style.

Common options:

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

## Auth API Client

Required functions:

```ts
register(payload)
login(payload)
codeLogin(payload)
logout()
logoutAll()
me()
refreshToken()
sendEmailCode(payload)
sendSmsCode(payload)
requestPasswordResetCode(payload)
resetPassword(payload)
changePassword(payload)
getSessions()
revokeSession(sessionId)
```

## PasswordLoginForm

Fields:

```ts
interface PasswordLoginFormValues {
  account: string;
  password: string;
  rememberMe: boolean;
  captchaKey?: string;
  captchaCode?: string;
}
```

Required behaviors:

- Validate required fields
- Show generic login error
- Show captcha after backend indicates it is required
- Redirect after success

## RegisterForm

Fields:

```ts
interface RegisterFormValues {
  registerType: 'email' | 'phone' | 'username';
  username?: string;
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  verificationCode?: string;
  inviteCode?: string;
  agreeTerms: boolean;
}
```

Required behaviors:

- Validate email/phone format
- Validate password confirmation
- Validate agreement checkbox
- Request verification code if email/phone registration is used
- Redirect after success

## VerificationCodeInput

Props:

```ts
interface VerificationCodeInputProps {
  target: string;
  scene: 'register' | 'login' | 'reset_password' | 'bind_email' | 'bind_phone';
  targetType: 'email' | 'phone';
  onSendCode: () => Promise<void>;
  countdownSeconds?: number;
}
```

Required behaviors:

- Cooldown countdown
- Disable repeated sending
- Show send result
- Do not expose code in UI except development-only log provider output in backend console

## PasswordStrengthMeter

Recommended rules:

```text
Minimum length
Uppercase
Lowercase
Number
Special character if configured
Not similar to username/email
Not common weak password
```

## ProtectedRoute

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

## Token Storage

Recommended:

```text
Access Token: memory/app state
Refresh Token: HttpOnly Cookie
```

Avoid storing Refresh Token in localStorage.

If localStorage must be used, document the risk.
