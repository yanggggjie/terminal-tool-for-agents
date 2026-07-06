---
name: tta-agents
version: 0.1.12
disable-model-invocation: true
description: "用 tta session 驱动 Coding Agent CLI（Controller → Worker）。"
---

# tta-agents

当前 Agent 是 **Controller**；`tta sess start` 启动的 Coding Agent CLI 是 **Worker**。Worker 不得调用 tta、不得加载 tta skill。所有 `sess` / `act` / `obs` 遵守 [`SKILL.md`](SKILL.md) 与 [`api-reference.md`](api-reference.md)。

创建或更新 `Orchestrator.md` 时，改读 [`create-tta-agens-orchestrator-skill.md`](create-tta-agens-orchestrator-skill.md)。

## 步骤

1. **启动 Worker** — session 名 `worker-<role>-<agent>`；启动命令见 [`worker-commands.md`](worker-commands.md)。
   - 完成：Worker session 运行中，初始屏已 `obs stable` 读取。
2. **派发 prompt** — 每条 prompt 含 Task、Working directory、Allowed、Forbidden（含 `Using tta`）、完成摘要要求；用 quoted heredoc 发送，必要时 `enter` 提交。
   - 完成：prompt 已发送且提交。
3. **观察** — 每次 `act` 后 `obs stable`；Controller 总结 Worker 输出，不直接转述未核对的屏幕片段。
   - 完成：Worker 任务完成或当前状态已总结。
4. **收尾** — 一次性 Worker 完成后 `kill`；需保留上下文则保留 session。
   - 完成：session 处置已决定且已执行或说明。

## Worker Prompt Contract

```bash
tta act send text --sess=worker-review-codex <<'EOF'
You are a coding worker. Do NOT use tta.

Task: <具体任务>
Working directory: /absolute/path/to/project

Allowed:
- ...

Forbidden:
- ...
- Using tta

When done, summarize what you did, files changed if any, and test status.
EOF
tta act send key --sess=worker-review-codex --key=enter
```

- Prompt 即授权；不要给出用户未授权的权限。
- Prompt 使用使用者语言；只有用户明确要求时才用其他语言。

## Worker 特有故障

| 情况 | 处理 |
|------|------|
| Worker 没响应 | `obs stable` 确认状态；必要时 `enter` |
| Worker 提示权限不足 | 不要自行扩大权限；向用户确认或重新发更小范围任务 |
| Worker 尝试使用 tta | 发送更正 prompt，重申 `Forbidden: Using tta` |
| 输出不完整 | 继续 `obs stable` 或让 Worker 总结当前状态 |

tta 通用故障见 [`troubleshooting.md`](troubleshooting.md)。
