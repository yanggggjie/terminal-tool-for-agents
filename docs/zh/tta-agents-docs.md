# tta-agents

**tta-agents** 是 [tta](../../README.zh.md) 之上的一层：当前 Agent 作为 **Controller**，用 tta 启动、观察和管理另一个 Coding Agent CLI **Worker**。

适合临时委托一个清晰任务，例如：

- 在 Claude Code 里启动 Codex 做一次 review。
- 在 Cursor Agent 里启动 Claude Code 实现一小块功能。
- 让一个 Worker 单独跑测试、调研问题或验证方案。

如果要把 coder / reviewer / tester 等角色固化成一套长程流程，见 [tta-agents-orchestrator](./tta-agents-orchestrator.md)。

## 角色

Controller 派发任务并总结结果；Worker 只执行分配的具体任务，**不得使用 tta**。

## 权限

**请清晰告知正在使用 tta 的 Agent 你的权限范围（允许/禁止的操作、目录、是否 deploy 等）。被 tta 控制的 Coding Agent 以 auto 模式运行，会把 prompt 当授权执行。**

完整工作流、Worker prompt contract 和启动命令见 [`skills-zh/tta/tta-agents-skill.md`](../../skills-zh/tta/tta-agents-skill.md) 与 [`worker-commands.md`](../../skills-zh/tta/worker-commands.md)。
