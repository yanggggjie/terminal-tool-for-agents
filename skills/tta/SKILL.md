---
name: tta
version: 0.1.12
description: "Operate interactive CLIs, TUIs, and dev servers. Use tta for interactive commands that need keystrokes, screen reads, or continuous observation; use shell for plain non-interactive commands. When controlling a Coding Agent CLI, read tta-agents-skill.md; when creating Orchestrator.md, read create-tta-agens-orchestrator-skill.md."
---

# tta

Use shell for plain non-interactive commands; use `tta` for interactive commands.

## Steps

1. **Decide if the command is interactive** — REPLs, TUIs, interactive wizards, and long-running processes whose output must be observed (such as `npm create vite@latest`, `lazygit`, `npm run dev`) are interactive commands → use tta; plain one-shot bash commands are non-interactive → use shell.
   - Done: you have chosen tta or shell.
2. **Start session** — see [`api-reference.md`](api-reference.md).
   - Done: `sess start` succeeded and `obs stable` read the initial screen.
3. **stable loop** — menus/confirmations use `send key`; free-form text uses `send text` with a quoted heredoc; after every `act`, run `obs stable`.
   - Done: task goal reached, or dev server output observed as needed.
   - Exception: continuously refreshing screens such as `htop` use `obs now`, not `stable`.
4. **Cleanup** — `sess kill` one-shot tasks; keep dev-server sessions while observing.
   - Done: one-shot tasks killed, or retained session name and state stated.

```text
sess start -> obs stable -> (act -> obs stable)* -> [sess kill]
```

## Branches

- Controlling a Coding Agent CLI → read [`tta-agents-skill.md`](tta-agents-skill.md)
- Creating or updating `Orchestrator.md` → read [`create-tta-agens-orchestrator-skill.md`](create-tta-agens-orchestrator-skill.md)

## Reference

- API and command templates → [`api-reference.md`](api-reference.md)
- Stuck or failed → [`troubleshooting.md`](troubleshooting.md)
