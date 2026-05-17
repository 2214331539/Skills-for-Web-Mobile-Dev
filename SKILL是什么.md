# Agent Skill 说明文档

# 一、什么是 Skill

Skill（技能）是一种专门为 AI Agent（如 Codex、Claude Code、Cursor Agent 等）设计的可复用能力模块。

它的核心目标是：

> 把某一类固定、重复、容易出错的工作流程，抽象成一套可持续复用的“行为规范 + 模板 + 工具资源”。

Skill 并不是模型参数，也不是重新训练模型，而是一种：

```text
运行时能力包（Runtime Capability Package）
```

本质上：

```text
Skill = Prompt + Workflow + Constraints + Templates + References + Automation
```

Agent 在执行任务时，可以动态加载对应 Skill，从而获得：

- 更稳定的输出
- 更低随机性
- 更强工程一致性
- 更少试错
- 更标准化的实现

------

# 二、一个完整 Skill 的标准结构

一个完整 Skill 通常包含：

```text
reusable-auth-module/
├── SKILL.md
├── templates/
├── references/
├── scripts/
├── assets/
├── examples/
├── tests/
└── agents/
```

其中：

------

# 1. SKILL.md（核心入口）

这是 Skill 最重要的文件。

它相当于：

```text
Skill 的大脑
```

Agent 会优先读取它。

通常包含：

- Skill 名称
- Skill 描述
- 触发条件
- 工作流
- 规则
- 禁止事项
- 验收标准
- 推荐工具
- References 索引

例如：

```yaml
name: reusable-auth-module

description:
Use when the user needs to implement a reusable authentication system.
```

然后：

```text
Workflow:
1. Detect stack
2. Generate auth config
3. Setup database
4. Create JWT middleware
5. Generate env.example
...
```

SKILL.md 的作用是：

```text
告诉 Agent：
什么时候使用这个 Skill、
应该如何执行、
做到什么程度算完成。
```

------

# 2. templates/

用于存放：

```text
稳定模板
```

例如：

- `.env.example`
- `auth.config.ts`
- `docker-compose.yml`
- `README 模板`
- `React 页面模板`
- `Prisma schema 模板`

作用：

```text
避免 Agent 每次从零随机生成
```

提升：

- 一致性
- 稳定性
- 可维护性

例如：

```text
templates/
├── env.example
├── auth.config.ts
├── jwt.middleware.ts
└── login-page.tsx
```

------

# 3. references/

用于存放：

```text
长文档 / 规范 / 契约
```

因为：

SKILL.md 不应该过长。

references 通常放：

- API 规范
- 数据库 Schema
- 安全检查清单
- UI 规范
- OAuth 配置
- 第三方平台说明
- Coding Convention

例如：

```text
references/
├── database-schema.md
├── security-checklist.md
├── frontend-component-spec.md
└── provider-config-guide.md
```

作用：

```text
给 Agent 提供更深层上下文
```

------

# 4. scripts/

用于：

```text
自动化执行
```

Skill 不一定只是 Prompt。

很多 Skill 会附带：

- 检测脚本
- 初始化脚本
- 校验脚本
- 生成器脚本
- 迁移脚本

例如：

```text
scripts/
├── detect-stack.js
├── check-auth-env.js
└── generate-env-example.js
```

这些脚本可以帮助 Agent：

```text
自动检测项目结构
自动生成配置
自动检查错误
```

------

# 5. assets/

用于：

```text
静态资源
```

例如：

- 图片
- SVG
- 图标
- 示例 UI
- 设计稿
- JSON 示例

例如：

```text
assets/
├── logo.svg
├── ui-preview.png
└── example-response.json
```

------

# 6. examples/

用于：

```text
提供典型落地案例
```

告诉 Agent：

```text
在不同技术栈中应该怎么做
```

例如：

```text
examples/
├── react-express.md
├── react-django.md
├── springboot-vue.md
└── nextjs.md
```

作用：

```text
帮助 Agent 学习 stack-specific implementation
```

------

# 7. tests/

用于：

```text
验证 Skill 是否真正完成
```

例如：

- API 测试
- UI 验证
- 配置校验
- 登录流程测试
- 数据库检查

例如：

```text
tests/
├── auth-api-test.http
├── login-flow-check.js
└── permission-check.js
```

作用：

```text
让 Skill 不只是“生成代码”
而是：
“生成 + 验证”
```

------

# 8. agents/

高级 Skill 有时会包含：

```text
子 Agent
```

用于：

- 多 Agent 协作
- 角色分工
- 不同阶段 workflow

例如：

```text
agents/
├── frontend-agent.md
├── backend-agent.md
└── security-review-agent.md
```

------

# 三、Skill 是如何工作的

Skill 的运行机制通常是：

```text
用户任务
↓
Agent 判断任务类型
↓
匹配 Skill description
↓
加载 SKILL.md
↓
读取 references/templates/scripts
↓
构造 runtime context
↓
开始执行
```

所以：

Skill 本质上是：

```text
Runtime Context Injection
```

即：

```text
运行时能力注入
```

------

# 四、Skill 如何被调用

不同 Agent 调用方式不同。

## Codex

通常支持：

```text
$skill-name
```

例如：

```text
$doc
帮我修改论文格式
```

也可能自动根据 description 匹配。

------

## Claude Code

通常：

```text
自动匹配
```

或者：

```text
请使用 xxx skill
```

------

# 五、Skill 如何安装

常见安装方式：

```bash
npx skills add https://github.com/xxx/skills --skill auth
```

安装后：

Skill 会被下载到：

```text
~/.agents/skills/
```

或：

```text
项目/.agents/skills/
```

然后 Agent 会自动发现。

------

> 