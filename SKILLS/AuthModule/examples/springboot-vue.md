# Example: Spring Boot + Vue

Backend:

- Add `auth` package with controller/service/repository/entity/dto/config/security/provider.
- Use `application-auth.yml` as config template.
- Use Spring Security filter or interceptor for `requireAuth`.
- Use BCryptPasswordEncoder.
- Store Refresh Token hash in `user_sessions`.

Frontend:

- Create Vue auth module.
- Use Pinia if present.
- Add router guards for protected pages.

Notes:

- Do not hard-code provider credentials in Java code.
- Map all auth properties to an `AuthProperties` config class.
