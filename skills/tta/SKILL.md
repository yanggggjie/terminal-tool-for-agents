---
name: tta
version: 0.1.12
description: "Operate interactive CLIs, TUIs, REPLs, and dev servers through a PTY. Use tta for interactive commands that need keystrokes, screen reads, or continuous observation (such as lazygit, npm run dev, pdb, IPython, npm create); use shell for plain non-interactive commands (such as git status, npm test). When controlling a Coding Agent CLI, read tta-agents-skill.md; when creating Orchestrator.md, read create-tta-agens-orchestrator-skill.md."
---

# tta

Use shell for plain non-interactive commands; use `tta` for interactive commands.

## Language

Always communicate with the user, write comments, and write explanations in **the language the user is using**. Switch languages only when the user explicitly asks.

## Command shorthand

In this document, `sess` / `act` / `obs stable` / `obs now` mean:

- `tta sess ...`
- `tta act ...`
- `tta obs screen stable --sess=<name>`
- `tta obs screen now --sess=<name>`

Full command templates: [`api-reference.md`](api-reference.md).

## When not to use tta

Use shell, not tta, for:

- One-shot, non-interactive commands that exit when done (such as `git status`, `npm test`, `ls`)
- Pipes or redirects that do not need screen reads or keystrokes

## Steps

1. **Decide if the command is interactive** — REPLs, TUIs, interactive wizards, and long-running processes whose output must be observed (such as `npm create vite@latest`, `lazygit`, `npm run dev`) are interactive → use tta; plain one-shot bash commands are non-interactive → use shell.
   - Done: you have chosen tta or shell.
2. **Start session** — see [`api-reference.md`](api-reference.md).
   - Done: `tta sess start` succeeded and `obs stable` read the initial screen.
3. **stable loop** — menus/confirmations use `send key`; free-form text uses `send text` with a quoted heredoc; after every `act`, run `obs stable`.
   - Done: task goal reached, or dev server output observed as needed.
   - Exception: continuously refreshing screens such as `htop` use `obs now`, not `stable`.
4. **Cleanup** — `sess kill` one-shot tasks; keep dev-server sessions while observing.
   - Done: one-shot tasks killed, or retained session name and state stated.

```text
tta sess start -> obs stable -> (act -> obs stable)* -> [sess kill]
```

## Branches

- Controlling a Coding Agent CLI → read [`tta-agents-skill.md`](tta-agents-skill.md)
- Creating or updating `Orchestrator.md` → read [`create-tta-agens-orchestrator-skill.md`](create-tta-agens-orchestrator-skill.md)

## Reference

- API and command templates → [`api-reference.md`](api-reference.md)
- Stuck or failed → [`troubleshooting.md`](troubleshooting.md)
