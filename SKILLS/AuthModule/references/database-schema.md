# Auth Module Database Schema Reference

## Required Tables

```text
users
user_credentials
verification_codes
user_sessions
login_logs
security_events
```

## Optional Tables

```text
user_oauth_accounts
captcha_challenges
user_agreements
mfa_factors
```

## Schema Design Rules

1. Keep `users` as the identity/profile table.
2. Store password credentials in `user_credentials`.
3. Store Refresh Token sessions in `user_sessions`.
4. Store email/SMS codes in `verification_codes`.
5. Store login attempts in `login_logs`.
6. Store sensitive actions in `security_events`.
7. Never store plaintext passwords.
8. Prefer hashing verification codes.
9. Store Refresh Token hashes, not raw tokens.
10. Do not replace an existing `users` table without a migration plan.

## users

Purpose: user identity, contact info, account state.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| username | varchar | Unique if present |
| nickname | varchar | Display name |
| avatar_url | varchar | Optional |
| email | varchar | Unique if present |
| email_verified | boolean | Default false |
| phone | varchar | Unique if present |
| phone_verified | boolean | Default false |
| status | varchar | active/pending/locked/disabled/deleted/banned |
| register_source | varchar | web/mobile/github/google/wechat |
| register_ip | varchar | Store IP |
| last_login_at | datetime | Latest successful login |
| last_login_ip | varchar | Latest successful login IP |
| password_updated_at | datetime | For session invalidation |
| created_at | datetime | Required |
| updated_at | datetime | Required |
| deleted_at | datetime | Soft delete |

## user_credentials

Purpose: password credentials and login lock state.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| user_id | bigint/uuid | Unique FK |
| password_hash | varchar | Required |
| password_algo | varchar | bcrypt/argon2 |
| password_version | int | For future upgrades |
| failed_login_count | int | Default 0 |
| locked_until | datetime | Nullable |
| created_at | datetime | Required |
| updated_at | datetime | Required |

## verification_codes

Purpose: email/SMS verification code lifecycle.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| target | varchar | email or phone |
| target_type | varchar | email/phone |
| scene | varchar | register/login/reset_password/etc |
| code_hash | varchar | Hashed code |
| expires_at | datetime | Required |
| used_at | datetime | Nullable |
| send_ip | varchar | Optional |
| verify_attempts | int | Default 0 |
| created_at | datetime | Required |

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

## user_sessions

Purpose: Refresh Token/session/device control.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| user_id | bigint/uuid | FK |
| refresh_token_hash | varchar | Unique |
| access_token_jti | varchar | Optional |
| device_id | varchar | Optional |
| device_name | varchar | Optional |
| user_agent | text | Optional |
| os | varchar | Optional |
| browser | varchar | Optional |
| ip | varchar | Optional |
| location | varchar | Optional |
| is_trusted | boolean | Default false |
| expires_at | datetime | Required |
| revoked_at | datetime | Nullable |
| revoke_reason | varchar | Nullable |
| last_active_at | datetime | Optional |
| created_at | datetime | Required |

## login_logs

Purpose: audit login success/failure.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| user_id | bigint/uuid | Nullable for failed login |
| account_input | varchar | Mask if enabled |
| login_type | varchar | password/sms/email/oauth |
| success | boolean | Required |
| failure_reason | varchar | Optional |
| ip | varchar | Optional |
| location | varchar | Optional |
| user_agent | text | Optional |
| device_id | varchar | Optional |
| created_at | datetime | Required |

## security_events

Purpose: sensitive operation audit.

Required columns:

| Column | Type | Notes |
|---|---|---|
| id | bigint/uuid | Primary key |
| user_id | bigint/uuid | Required |
| event_type | varchar | Required |
| event_detail | text/json | Optional |
| ip | varchar | Optional |
| user_agent | text | Optional |
| risk_level | varchar | low/medium/high |
| created_at | datetime | Required |

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
