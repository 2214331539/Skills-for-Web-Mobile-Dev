# Example: React + Django

Backend:

- Create app `auth_module`.
- Use Django migrations for tables.
- Use Django password hashing or argon2/bcrypt.
- Use DRF views/serializers if DRF is installed.
- Use middleware/permission classes for auth.
- Store Refresh Token hash in DB.

Frontend:

- Create React auth module under `src/modules/auth`.
- Use existing request client.
- Use `credentials: 'include'` if Refresh Token is stored in HttpOnly Cookie.

Notes:

- If Django already has a User model, extend with companion tables instead of replacing it.
- Use Django settings for centralized config, based on `templates/auth_config.py`.
