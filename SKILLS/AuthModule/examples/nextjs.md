# Example: Next.js

Possible strategies:

1. Full Next.js app router route handlers under `app/api/auth/*`.
2. Separate backend if the project already has one.
3. Frontend-only integration with external auth backend.

Recommended:

- Use route handlers for backend endpoints if there is no separate backend.
- Use server-side cookie handling for Refresh Token.
- Use client components for login/register forms.
- Use middleware or layout checks for protected routes.

Notes:

- Never expose OAuth client secrets to client components.
- Keep Access Token out of persistent browser storage when possible.
