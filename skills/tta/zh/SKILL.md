---
name: tta
version: 0.1.12
description: "操作交互式 CLI、TUI、开发服务器。交互式命令需要按键、读屏或持续观察时用 tta；普通非交互式命令用 shell。控制 Coding Agent CLI 时读 tta-agents-skill.md；创建 Orchestrator.md 时读 create-tta-agens-orchestrator-skill.md。"
---

# tta

普通非交互式命令用 shell；交互式命令用 `tta`。

## 步骤

1. **判定是否为交互式命令** — REPL、TUI、交互式向导、需观察输出的长驻进程（如 `npm create vite@latest`、`lazygit`、`npm run dev`）是交互式命令，用 tta；普通 bash 一次性命令是非交互式命令，用 shell。
   - 完成：已明确「用 tta / 用 shell」。
2. **启动 session** — 见 [`api-reference.md`](api-reference.md)。
   - 完成：`sess start` 成功，且 `obs stable` 读到初始屏。
3. **stable loop** — 菜单/确认用 `send key`；自由文本用 quoted heredoc 的 `send text`；每次 `act` 后 `obs stable`。
   - 完成：任务目标达成，或 dev server 已观察到所需输出。
   - 例外：`htop` 等持续刷新屏用 `obs now`，不等待 `stable`。
4. **清理** — 一次性任务 `sess kill`；dev server 观察期间保留。
   - 完成：一次性任务已 kill，或有意保留的 session 名与状态已说明。

```text
sess start -> obs stable -> (act -> obs stable)* -> [sess kill]
```

## 分支

- 控制 Coding Agent CLI → 读 [`tta-agents-skill.md`](tta-agents-skill.md)
- 创建或更新 `Orchestrator.md` → 读 [`create-tta-agens-orchestrator-skill.md`](create-tta-agens-orchestrator-skill.md)

## 参考

- API、命令模板 → [`api-reference.md`](api-reference.md)
- 卡住或失败 → [`troubleshooting.md`](troubleshooting.md)
