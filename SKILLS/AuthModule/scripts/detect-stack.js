#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
  } catch {
    return null;
  }
}

const result = {
  root,
  packageManager: null,
  frontend: [],
  backend: [],
  databaseOrm: [],
  files: {},
  scripts: {},
  recommendations: [],
};

result.files.packageJson = exists('package.json');
result.files.pnpmLock = exists('pnpm-lock.yaml');
result.files.yarnLock = exists('yarn.lock');
result.files.packageLock = exists('package-lock.json');
result.files.vite = exists('vite.config.ts') || exists('vite.config.js');
result.files.next = exists('next.config.js') || exists('next.config.mjs') || exists('next.config.ts');
result.files.nuxt = exists('nuxt.config.ts') || exists('nuxt.config.js');
result.files.prisma = exists('prisma/schema.prisma');
result.files.pythonRequirements = exists('requirements.txt');
result.files.pyproject = exists('pyproject.toml');
result.files.djangoManage = exists('manage.py');
result.files.pom = exists('pom.xml');
result.files.gradle = exists('build.gradle') || exists('build.gradle.kts');
result.files.dockerCompose = exists('docker-compose.yml') || exists('compose.yml');
result.files.env = exists('.env');
result.files.envExample = exists('.env.example');

if (result.files.pnpmLock) result.packageManager = 'pnpm';
else if (result.files.yarnLock) result.packageManager = 'yarn';
else if (result.files.packageLock) result.packageManager = 'npm';

const pkg = readJson('package.json');
if (pkg) {
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  result.scripts = pkg.scripts || {};

  if (deps.react) result.frontend.push('react');
  if (deps.vue) result.frontend.push('vue');
  if (deps.next) result.frontend.push('nextjs');
  if (deps.nuxt) result.frontend.push('nuxt');
  if (deps.vite) result.frontend.push('vite');

  if (deps.express) result.backend.push('express');
  if (deps['@nestjs/core']) result.backend.push('nestjs');
  if (deps.fastify) result.backend.push('fastify');
  if (deps.koa) result.backend.push('koa');

  if (deps.prisma || deps['@prisma/client'] || result.files.prisma) result.databaseOrm.push('prisma');
  if (deps.typeorm) result.databaseOrm.push('typeorm');
  if (deps.sequelize) result.databaseOrm.push('sequelize');
  if (deps.mongoose) result.databaseOrm.push('mongoose');

  if (deps.zustand) result.frontend.push('zustand');
  if (deps.redux || deps['@reduxjs/toolkit']) result.frontend.push('redux');
  if (deps.axios) result.frontend.push('axios');
}

if (result.files.djangoManage) result.backend.push('django');
if (result.files.pythonRequirements || result.files.pyproject) result.backend.push('python');
if (result.files.pom || result.files.gradle) result.backend.push('spring-boot-or-java');

if (result.files.prisma) result.databaseOrm.push('prisma');

if (!result.files.envExample) {
  result.recommendations.push('Create .env.example using templates/env.example.');
}

if (result.frontend.length === 0) {
  result.recommendations.push('No frontend framework detected. Consider backend-only auth module unless frontend exists elsewhere.');
}

if (result.backend.length === 0) {
  result.recommendations.push('No backend framework detected. Consider frontend-only auth integration or inspect custom server files manually.');
}

if (!result.databaseOrm.length) {
  result.recommendations.push('No ORM detected. Use SQL templates or inspect custom database layer manually.');
}

console.log(JSON.stringify(result, null, 2));
