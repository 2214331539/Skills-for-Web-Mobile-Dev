# 可复用 Auth 模块 Skill

一个可供 Codex、Claude Code、Cursor Agent 等 Agent 编程工具使用的可复用 Skill。

该 Skill 用于帮助 Agent 在现有项目中实现一个安全、解耦、可配置的 Web 登录认证模块。

---

## 它可以生成什么

* 登录 / 注册模块
* 后端认证 API
* 数据库表结构或 ORM 模型
* Access Token + Refresh Token 鉴权流程
* Refresh Token 会话表
* 密码哈希加密
* 邮箱验证码 Provider
* 短信 Provider 抽象层
* Captcha 验证码 Provider 抽象层
* OAuth Provider 抽象层
* 前端登录认证页面 / 组件
* 路由鉴权支持
* 集中式配置管理
* `.env.example`
* 集成文档

---

## 目录结构

```text
reusable-auth-module/
├── SKILL.md
├── README.md
├── templates/
│   ├── env.example
│   ├── auth.config.ts
│   ├── auth_config.py
│   ├── application-auth.yml
│   ├── AUTH_MODULE_README.md
│   ├── api-contract.openapi.yaml
│   └── sql/
│       ├── mysql-auth-schema.sql
│       └── postgres-auth-schema.sql
├── references/
│   ├── database-schema.md
│   ├── api-contract.md
│   ├── security-checklist.md
│   ├── frontend-component-spec.md
│   ├── provider-config-guide.md
│   ├── integration-playbook.md
│   └── acceptance-tests.md
├── scripts/
│   ├── detect-stack.js
│   ├── check-auth-env.js
│   └── generate-env-example.js
└── examples/
    ├── react-express.md
    ├── react-django.md
    ├── springboot-vue.md
    └── nextjs.md
```

---

## 使用 Prompt

```text
使用 reusable-auth-module skill 为当前项目实现一个安全、可复用、解耦的登录/注册认证模块。

需要包含：
后端 API、数据库表结构、前端页面/组件、认证状态管理、Token/Session 处理、统一 Provider 配置、.env.example 以及完整文档。

所有第三方邮箱 / 短信 / Captcha / OAuth 服务都必须通过统一配置管理，并在服务关闭时能够优雅降级。
```

---

## 本地开发默认配置

```env
EMAIL_PROVIDER=log
SMS_PROVIDER=disabled
CAPTCHA_PROVIDER=disabled
OAUTH_ENABLED=false
```

---

## 生产环境警告

在正式生产环境部署前，请务必配置：

* 强 JWT Secret
* HTTPS
* 安全 Cookie
* 真实邮箱 / 短信 Provider
* 接口限流（Rate Limit）
* CORS
* CSRF 防护
* 审计日志（Audit Logging）
