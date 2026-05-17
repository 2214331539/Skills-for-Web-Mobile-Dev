CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  nickname VARCHAR(100),
  avatar_url VARCHAR(500),
  email VARCHAR(255) UNIQUE,
  email_verified TINYINT DEFAULT 0,
  phone VARCHAR(30) UNIQUE,
  phone_verified TINYINT DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  register_source VARCHAR(50),
  register_ip VARCHAR(64),
  last_login_at DATETIME,
  last_login_ip VARCHAR(64),
  password_updated_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL
);

CREATE TABLE IF NOT EXISTS user_credentials (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  password_algo VARCHAR(50) DEFAULT 'bcrypt',
  password_version INT DEFAULT 1,
  failed_login_count INT DEFAULT 0,
  locked_until DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_credentials_user_id (user_id),
  CONSTRAINT fk_user_credentials_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS verification_codes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  target VARCHAR(255) NOT NULL,
  target_type VARCHAR(20) NOT NULL,
  scene VARCHAR(50) NOT NULL,
  code_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  send_ip VARCHAR(64),
  verify_attempts INT DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_verification_target_scene (target, scene),
  KEY idx_verification_expires_at (expires_at)
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  access_token_jti VARCHAR(100),
  device_id VARCHAR(255),
  device_name VARCHAR(255),
  user_agent TEXT,
  os VARCHAR(100),
  browser VARCHAR(100),
  ip VARCHAR(64),
  location VARCHAR(255),
  is_trusted TINYINT DEFAULT 0,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  revoke_reason VARCHAR(255),
  last_active_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_sessions_refresh_token_hash (refresh_token_hash),
  KEY idx_user_sessions_user_id (user_id),
  KEY idx_user_sessions_device_id (device_id),
  CONSTRAINT fk_user_sessions_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS login_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NULL,
  account_input VARCHAR(255),
  login_type VARCHAR(50),
  success TINYINT NOT NULL,
  failure_reason VARCHAR(255),
  ip VARCHAR(64),
  location VARCHAR(255),
  user_agent TEXT,
  device_id VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_login_logs_user_id (user_id),
  KEY idx_login_logs_ip (ip),
  KEY idx_login_logs_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS security_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_detail TEXT,
  ip VARCHAR(64),
  user_agent TEXT,
  risk_level VARCHAR(20) DEFAULT 'low',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_security_events_user_id (user_id),
  KEY idx_security_events_event_type (event_type),
  KEY idx_security_events_created_at (created_at),
  CONSTRAINT fk_security_events_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_oauth_accounts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  provider VARCHAR(50) NOT NULL,
  provider_user_id VARCHAR(255) NOT NULL,
  provider_username VARCHAR(255),
  provider_avatar VARCHAR(500),
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_oauth_provider_user (provider, provider_user_id),
  KEY idx_oauth_user_id (user_id),
  CONSTRAINT fk_oauth_accounts_user FOREIGN KEY (user_id) REFERENCES users(id)
);
