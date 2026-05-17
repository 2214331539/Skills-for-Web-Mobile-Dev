#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = process.argv[2] || '.env';
const fullPath = path.resolve(process.cwd(), envPath);

if (!fs.existsSync(fullPath)) {
  console.error(`ENV file not found: ${fullPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(fullPath, 'utf8');
const env = {};

for (const line of raw.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  env[key] = value;
}

const warnings = [];
const errors = [];

function required(key) {
  if (!env[key]) errors.push(`${key} is required.`);
}

function warnDefault(key, badValue) {
  if (env[key] === badValue) warnings.push(`${key} is still set to default placeholder value.`);
}

required('JWT_ACCESS_TOKEN_SECRET');
required('JWT_REFRESH_TOKEN_SECRET');
warnDefault('JWT_ACCESS_TOKEN_SECRET', 'replace_with_strong_access_secret');
warnDefault('JWT_REFRESH_TOKEN_SECRET', 'replace_with_strong_refresh_secret');

const isProduction =
  (env.NODE_ENV || '').toLowerCase() === 'production' ||
  (env.ENV || '').toLowerCase() === 'production';

if (isProduction) {
  if (env.AUTH_COOKIE_SECURE !== 'true') {
    errors.push('AUTH_COOKIE_SECURE must be true in production.');
  }

  if (env.EMAIL_PROVIDER === 'log') {
    errors.push('EMAIL_PROVIDER=log must not be used in production.');
  }

  if (env.JWT_ACCESS_TOKEN_SECRET && env.JWT_ACCESS_TOKEN_SECRET.length < 32) {
    warnings.push('JWT_ACCESS_TOKEN_SECRET should be at least 32 characters.');
  }

  if (env.JWT_REFRESH_TOKEN_SECRET && env.JWT_REFRESH_TOKEN_SECRET.length < 32) {
    warnings.push('JWT_REFRESH_TOKEN_SECRET should be at least 32 characters.');
  }
}

if (env.SMS_PROVIDER === 'aliyun') {
  for (const key of [
    'ALIYUN_ACCESS_KEY_ID',
    'ALIYUN_ACCESS_KEY_SECRET',
    'ALIYUN_SMS_SIGN_NAME',
    'ALIYUN_SMS_TEMPLATE_CODE',
  ]) {
    if (!env[key]) errors.push(`${key} is required when SMS_PROVIDER=aliyun.`);
  }
}

if (env.SMS_PROVIDER === 'tencent') {
  for (const key of [
    'TENCENT_SECRET_ID',
    'TENCENT_SECRET_KEY',
    'TENCENT_SMS_SDK_APP_ID',
    'TENCENT_SMS_SIGN_NAME',
    'TENCENT_SMS_TEMPLATE_ID',
  ]) {
    if (!env[key]) errors.push(`${key} is required when SMS_PROVIDER=tencent.`);
  }
}

if (env.CAPTCHA_PROVIDER === 'turnstile') {
  if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET_KEY) {
    errors.push('TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are required when CAPTCHA_PROVIDER=turnstile.');
  }
}

if (env.CAPTCHA_PROVIDER === 'recaptcha') {
  if (!env.RECAPTCHA_SITE_KEY || !env.RECAPTCHA_SECRET_KEY) {
    errors.push('RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY are required when CAPTCHA_PROVIDER=recaptcha.');
  }
}

if (env.OAUTH_ENABLED === 'true') {
  const providers = [
    ['GITHUB', 'GITHUB_OAUTH_ENABLED', ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_CALLBACK_URL']],
    ['GOOGLE', 'GOOGLE_OAUTH_ENABLED', ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL']],
    ['WECHAT', 'WECHAT_OAUTH_ENABLED', ['WECHAT_APP_ID', 'WECHAT_APP_SECRET', 'WECHAT_CALLBACK_URL']],
  ];

  for (const [, enabledKey, keys] of providers) {
    if (env[enabledKey] === 'true') {
      for (const key of keys) {
        if (!env[key]) errors.push(`${key} is required when ${enabledKey}=true.`);
      }
    }
  }
}

const result = {
  envPath: fullPath,
  ok: errors.length === 0,
  warnings,
  errors,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
