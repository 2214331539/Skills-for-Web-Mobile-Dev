<p align="center">
  <a href="./README.md">English</a> | 中文
</p>
# 面向 Web 与移动端 AI 开发的 Skills



## 概述（Overview）

该仓库的目标是：

将传统软件开发中常见、重复性的工程模块抽象为可复用的 Skill，使 Coding Agent 能够直接调用并使用。

开发者与 Coding Agent 不再需要反复从零构建相同基础设施，而是可以通过安装 Skill 的方式，快速生成稳定、可配置、面向生产环境的功能模块。

本仓库专注于：

将真实世界的软件工程工作流抽象为可复用的 AI-Agent 能力。



## 仓库目标（Purpose）

本仓库专注于抽象可复用的工程工作流与基础设施模块，例如：

- 认证系统（Authentication）
- Admin 后台系统
- 文件上传系统
- 支付模块
- 通知系统
- RBAC 权限系统
- CRUD 脚手架
- 部署工作流
- AI 基础设施模块
- 数据库初始化
- API 集成工作流
- 前端架构模式
- 以及其他可复用工程组件

这些 Skills 面向以下 Coding Agent：

- Codex
- Claude Code
- Cursor Agent
- Roo Code
- Continue
- Cline
- OpenHands
- Gemini CLI
- 以及其他 Agentic Coding 环境



## 仓库结构（Repository Structure）

```text
skills/
├── reusable-auth-module/
│   ├── SKILL.md
│   ├── templates/
│   ├── references/
│   ├── scripts/
│   └── examples/
│
├── another-skill/
│   └── ...
```

`skills/` 目录下的每一个文件夹，都是一个独立、可复用的 Skill。



## 安装 Skill

你可以通过 `skills` CLI 直接从 GitHub 安装 Skill。

示例：

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module
```

全局安装：

```bash
npx skills add YOUR_NAME/YOUR_REPO --skill reusable-auth-module --global
```



## Skill 的工作方式（How Skills Work）

Skill 并不仅仅只是一个 Prompt。

每一个 Skill 都是一个可复用的能力包（Capability Package），其中可能包含：

- 指令文件（`SKILL.md`）
- Templates 模板
- References 参考文档
- Scripts 脚本
- Examples 示例
- Validation Logic 验证逻辑

当 Skill 被调用时，Coding Agent 会：

1. 加载 Skill 指令
2. 检测当前项目技术栈
3. 读取 Templates 与 References
4. 必要时执行 Scripts
5. 自动生成或修改代码
6. 根据 Skill 工作流验证最终输出



## 设计理念（Design Philosophy）

本仓库中的所有 Skill 都遵循以下原则：

- 默认可复用（Reusable by default）
- 与业务逻辑解耦（Decoupled from business logic）
- 配置驱动（Config-driven）
- 友好的本地开发体验（Local-development friendly）
- 注重安全性（Security-aware）
- 面向 Agent 设计（Agent-oriented）
- 自适应技术栈（Stack-adaptive）
- 面向生产环境（Production-oriented）



## 贡献指南（Contributing）

欢迎贡献新的可复用开发模块。

推荐每个 Skill 使用以下目录结构：

```text
your-skill/
├── SKILL.md
├── templates/
├── references/
├── scripts/
└── examples/
```



## License

MIT License