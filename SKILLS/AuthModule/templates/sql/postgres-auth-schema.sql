CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  nickname VARCHAR(100),
  avatar_url VARCHAR(500),
  email VARCHAR(255) UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  phone VARCHAR(30) UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  register_source VARCHAR(50),
  register_ip VARCHAR(64),
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(64),
  password_updated_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS user_credentials (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  password_hash VARCHAR(255) NOT NULL,
  password_algo VARCHAR(50) DEFAULT 'bcrypt',
  password_version INTEGER DEFAULT 1,
  failed_login_count INTEGER DEFAULT 0,
  locked_until TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS verification_codes (
  id BIGSERIAL PRIMARY KEY,
  target VARCHAR(255) NOT NULL,
  target_type VARCHAR(20) NOT NULL,
  scene VARCHAR(50) NOT NULL,
  code_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  send_ip VARCHAR(64),
  verify_attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_verification_target_scene ON verification_codes(target, scene);
CREATE INDEX IF NOT EXISTS idx_verification_expires_at ON verification_codes(expires_at);

CREATE TABLE IF NOT EXISTS user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  refresh_token_hash VARCHAR(255) NOT NULL UNIQUE,
  access_token_jti VARCHAR(100),
  device_id VARCHAR(255),
  device_name VARCHAR(255),
  user_agent TEXT,
  os VARCHAR(100),
  browser VARCHAR(100),
  ip VARCHAR(64),
  location VARCHAR(255),
  is_trusted BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP NULL,
  revoke_reason VARCHAR(255),
  last_active_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_device_id ON user_sessions(device_id);

CREATE TABLE IF NOT EXISTS login_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NULL,
  account_input VARCHAR(255),
  login_type VARCHAR(50),
  success BOOLEAN NOT NULL,
  failure_reason VARCHAR(255),
  ip VARCHAR(64),
  location VARCHAR(255),
  user_agent TEXT,
  device_id VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_login_logs_user_id ON login_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_login_logs_ip ON login_logs(ip);
CREATE INDEX IF NOT EXISTS idx_login_logs_created_at ON login_logs(created_at);

CREATE TABLE IF NOT EXISTS security_events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  event_type VARCHAR(100) NOT NULL,
  event_detail TEXT,
  ip VARCHAR(64),
  user_agent TEXT,
  risk_level VARCHAR(20) DEFAULT 'low',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_security_events_user_id ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_event_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at);

CREATE TABLE IF NOT EXISTS user_oauth_accounts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  provider VARCHAR(50) NOT NULL,
  provider_user_id VARCHAR(255) NOT NULL,
  provider_username VARCHAR(255),
  provider_avatar VARCHAR(500),
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_user_id)
);

CREATE INDEX IF NOT EXISTS idx_oauth_user_id ON user_oauth_accounts(user_id);
