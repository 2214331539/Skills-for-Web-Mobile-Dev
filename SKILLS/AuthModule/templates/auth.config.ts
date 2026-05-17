export const authConfig = {
  enabled: process.env.AUTH_MODULE_ENABLED !== 'false',

  apiPrefix: process.env.AUTH_API_PREFIX || '/api/auth',

  frontend: {
    loginPath: process.env.AUTH_FRONTEND_LOGIN_PATH || '/login',
    registerPath: process.env.AUTH_FRONTEND_REGISTER_PATH || '/register',
    afterLoginPath: process.env.AUTH_FRONTEND_AFTER_LOGIN_PATH || '/',
    afterLogoutPath: process.env.AUTH_FRONTEND_AFTER_LOGOUT_PATH || '/login',
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '2h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d',
    issuer: process.env.JWT_ISSUER || 'web-app',
  },

  cookie: {
    enabled: process.env.AUTH_COOKIE_ENABLED !== 'false',
    name: process.env.AUTH_COOKIE_NAME || 'refresh_token',
    domain: process.env.AUTH_COOKIE_DOMAIN || undefined,
    secure: process.env.AUTH_COOKIE_SECURE === 'true',
    httpOnly: process.env.AUTH_COOKIE_HTTP_ONLY !== 'false',
    sameSite: (process.env.AUTH_COOKIE_SAME_SITE || 'lax') as 'lax' | 'strict' | 'none',
  },

  password: {
    algorithm: process.env.PASSWORD_HASH_ALGORITHM || 'bcrypt',
    bcryptRounds: Number(process.env.PASSWORD_BCRYPT_ROUNDS || 12),
    minLength: Number(process.env.PASSWORD_MIN_LENGTH || 8),
    requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
    requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false',
    requireNumber: process.env.PASSWORD_REQUIRE_NUMBER !== 'false',
    requireSpecial: process.env.PASSWORD_REQUIRE_SPECIAL === 'true',
  },

  verificationCode: {
    length: Number(process.env.VERIFICATION_CODE_LENGTH || 6),
    expiresMinutes: Number(process.env.VERIFICATION_CODE_EXPIRES_MINUTES || 5),
    resendCooldownSeconds: Number(process.env.VERIFICATION_CODE_RESEND_COOLDOWN_SECONDS || 60),
    maxAttempts: Number(process.env.VERIFICATION_CODE_MAX_ATTEMPTS || 5),
    storeHash: process.env.VERIFICATION_CODE_STORE_HASH !== 'false',
  },

  email: {
    provider: process.env.EMAIL_PROVIDER || 'log',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
      fromName: process.env.SMTP_FROM_NAME || 'Your App',
      fromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@example.com',
    },
  },

  sms: {
    provider: process.env.SMS_PROVIDER || 'disabled',
    aliyun: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || '',
      endpoint: process.env.ALIYUN_SMS_ENDPOINT || 'dysmsapi.aliyuncs.com',
      signName: process.env.ALIYUN_SMS_SIGN_NAME || '',
      templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE || '',
      templateCodeKey: process.env.ALIYUN_SMS_TEMPLATE_CODE_KEY || 'code',
    },
    tencent: {
      secretId: process.env.TENCENT_SECRET_ID || '',
      secretKey: process.env.TENCENT_SECRET_KEY || '',
      sdkAppId: process.env.TENCENT_SMS_SDK_APP_ID || '',
      signName: process.env.TENCENT_SMS_SIGN_NAME || '',
      templateId: process.env.TENCENT_SMS_TEMPLATE_ID || '',
    },
  },

  captcha: {
    provider: process.env.CAPTCHA_PROVIDER || 'disabled',
    expiresMinutes: Number(process.env.CAPTCHA_EXPIRES_MINUTES || 5),
    turnstile: {
      siteKey: process.env.TURNSTILE_SITE_KEY || '',
      secretKey: process.env.TURNSTILE_SECRET_KEY || '',
    },
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY || '',
      secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    },
  },

  oauth: {
    enabled: process.env.OAUTH_ENABLED === 'true',
    github: {
      enabled: process.env.GITHUB_OAUTH_ENABLED === 'true',
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackUrl: process.env.GITHUB_CALLBACK_URL || '',
    },
    google: {
      enabled: process.env.GOOGLE_OAUTH_ENABLED === 'true',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || '',
    },
    wechat: {
      enabled: process.env.WECHAT_OAUTH_ENABLED === 'true',
      appId: process.env.WECHAT_APP_ID || '',
      appSecret: process.env.WECHAT_APP_SECRET || '',
      callbackUrl: process.env.WECHAT_CALLBACK_URL || '',
    },
  },

  rateLimit: {
    enabled: process.env.AUTH_RATE_LIMIT_ENABLED !== 'false',
    loginMaxAttemptsPerAccount: Number(process.env.AUTH_LOGIN_MAX_ATTEMPTS_PER_ACCOUNT || 5),
    loginLockMinutes: Number(process.env.AUTH_LOGIN_LOCK_MINUTES || 15),
    loginMaxAttemptsPerIp: Number(process.env.AUTH_LOGIN_MAX_ATTEMPTS_PER_IP || 20),
    codeSendMaxPerTargetPerDay: Number(process.env.AUTH_CODE_SEND_MAX_PER_TARGET_PER_DAY || 10),
    codeSendMaxPerIpPerHour: Number(process.env.AUTH_CODE_SEND_MAX_PER_IP_PER_HOUR || 30),
  },

  logs: {
    securityLogEnabled: process.env.AUTH_SECURITY_LOG_ENABLED !== 'false',
    loginLogEnabled: process.env.AUTH_LOGIN_LOG_ENABLED !== 'false',
    maskAccountInLog: process.env.AUTH_MASK_ACCOUNT_IN_LOG !== 'false',
  },
};

export function validateAuthConfigForProduction() {
  const errors: string[] = [];

  if (process.env.NODE_ENV === 'production') {
    if (!authConfig.jwt.accessTokenSecret || authConfig.jwt.accessTokenSecret.startsWith('replace_')) {
      errors.push('JWT_ACCESS_TOKEN_SECRET must be configured in production.');
    }
    if (!authConfig.jwt.refreshTokenSecret || authConfig.jwt.refreshTokenSecret.startsWith('replace_')) {
      errors.push('JWT_REFRESH_TOKEN_SECRET must be configured in production.');
    }
    if (!authConfig.cookie.secure) {
      errors.push('AUTH_COOKIE_SECURE must be true in production.');
    }
    if (authConfig.email.provider === 'log') {
      errors.push('EMAIL_PROVIDER=log must not be used in production.');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid auth configuration:\n${errors.join('\n')}`);
  }
}
