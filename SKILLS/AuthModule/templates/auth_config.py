import os
from dataclasses import dataclass


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in ["1", "true", "yes", "on"]


def env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    if value is None or value == "":
        return default
    return int(value)


@dataclass
class AuthConfig:
    enabled: bool = env_bool("AUTH_MODULE_ENABLED", True)
    api_prefix: str = os.getenv("AUTH_API_PREFIX", "/api/auth")

    jwt_access_token_secret: str = os.getenv("JWT_ACCESS_TOKEN_SECRET", "")
    jwt_refresh_token_secret: str = os.getenv("JWT_REFRESH_TOKEN_SECRET", "")
    jwt_access_token_expires_in: str = os.getenv("JWT_ACCESS_TOKEN_EXPIRES_IN", "2h")
    jwt_refresh_token_expires_in: str = os.getenv("JWT_REFRESH_TOKEN_EXPIRES_IN", "30d")
    jwt_issuer: str = os.getenv("JWT_ISSUER", "web-app")

    cookie_enabled: bool = env_bool("AUTH_COOKIE_ENABLED", True)
    cookie_name: str = os.getenv("AUTH_COOKIE_NAME", "refresh_token")
    cookie_domain: str = os.getenv("AUTH_COOKIE_DOMAIN", "")
    cookie_secure: bool = env_bool("AUTH_COOKIE_SECURE", False)
    cookie_http_only: bool = env_bool("AUTH_COOKIE_HTTP_ONLY", True)
    cookie_same_site: str = os.getenv("AUTH_COOKIE_SAME_SITE", "lax")

    password_hash_algorithm: str = os.getenv("PASSWORD_HASH_ALGORITHM", "bcrypt")
    password_bcrypt_rounds: int = env_int("PASSWORD_BCRYPT_ROUNDS", 12)
    password_min_length: int = env_int("PASSWORD_MIN_LENGTH", 8)
    password_require_uppercase: bool = env_bool("PASSWORD_REQUIRE_UPPERCASE", True)
    password_require_lowercase: bool = env_bool("PASSWORD_REQUIRE_LOWERCASE", True)
    password_require_number: bool = env_bool("PASSWORD_REQUIRE_NUMBER", True)
    password_require_special: bool = env_bool("PASSWORD_REQUIRE_SPECIAL", False)

    verification_code_length: int = env_int("VERIFICATION_CODE_LENGTH", 6)
    verification_code_expires_minutes: int = env_int("VERIFICATION_CODE_EXPIRES_MINUTES", 5)
    verification_code_resend_cooldown_seconds: int = env_int("VERIFICATION_CODE_RESEND_COOLDOWN_SECONDS", 60)
    verification_code_max_attempts: int = env_int("VERIFICATION_CODE_MAX_ATTEMPTS", 5)
    verification_code_store_hash: bool = env_bool("VERIFICATION_CODE_STORE_HASH", True)

    email_provider: str = os.getenv("EMAIL_PROVIDER", "log")
    smtp_host: str = os.getenv("SMTP_HOST", "")
    smtp_port: int = env_int("SMTP_PORT", 587)
    smtp_secure: bool = env_bool("SMTP_SECURE", False)
    smtp_user: str = os.getenv("SMTP_USER", "")
    smtp_password: str = os.getenv("SMTP_PASSWORD", "")
    smtp_from_name: str = os.getenv("SMTP_FROM_NAME", "Your App")
    smtp_from_address: str = os.getenv("SMTP_FROM_ADDRESS", "no-reply@example.com")

    sms_provider: str = os.getenv("SMS_PROVIDER", "disabled")
    captcha_provider: str = os.getenv("CAPTCHA_PROVIDER", "disabled")
    oauth_enabled: bool = env_bool("OAUTH_ENABLED", False)

    rate_limit_enabled: bool = env_bool("AUTH_RATE_LIMIT_ENABLED", True)
    login_max_attempts_per_account: int = env_int("AUTH_LOGIN_MAX_ATTEMPTS_PER_ACCOUNT", 5)
    login_lock_minutes: int = env_int("AUTH_LOGIN_LOCK_MINUTES", 15)
    login_max_attempts_per_ip: int = env_int("AUTH_LOGIN_MAX_ATTEMPTS_PER_IP", 20)
    code_send_max_per_target_per_day: int = env_int("AUTH_CODE_SEND_MAX_PER_TARGET_PER_DAY", 10)
    code_send_max_per_ip_per_hour: int = env_int("AUTH_CODE_SEND_MAX_PER_IP_PER_HOUR", 30)

    security_log_enabled: bool = env_bool("AUTH_SECURITY_LOG_ENABLED", True)
    login_log_enabled: bool = env_bool("AUTH_LOGIN_LOG_ENABLED", True)
    mask_account_in_log: bool = env_bool("AUTH_MASK_ACCOUNT_IN_LOG", True)


auth_config = AuthConfig()


def validate_auth_config_for_production() -> None:
    if os.getenv("ENV", os.getenv("NODE_ENV", "")).lower() != "production":
        return

    errors = []

    if not auth_config.jwt_access_token_secret or auth_config.jwt_access_token_secret.startswith("replace_"):
        errors.append("JWT_ACCESS_TOKEN_SECRET must be configured in production.")

    if not auth_config.jwt_refresh_token_secret or auth_config.jwt_refresh_token_secret.startswith("replace_"):
        errors.append("JWT_REFRESH_TOKEN_SECRET must be configured in production.")

    if not auth_config.cookie_secure:
        errors.append("AUTH_COOKIE_SECURE must be true in production.")

    if auth_config.email_provider == "log":
        errors.append("EMAIL_PROVIDER=log must not be used in production.")

    if errors:
        raise RuntimeError("Invalid auth configuration:\n" + "\n".join(errors))
