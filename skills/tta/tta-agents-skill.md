---
name: tta-agents
description: "Drive a Coding Agent CLI through tta sessions (Controller → Worker). Use when delegating coding, review, testing, or research tasks to Codex, Claude Code, Cursor Agent, OpenCode, Pi, or Kimi Code."
---

# tta-agents

The current agent is the **Controller**; the Coding Agent CLI started with `tta sess start` is the **Worker**. Workers must not call tta or load the tta skill. All `sess` / `act` / `obs` follow [`SKILL.md`](SKILL.md) and [`api-reference.md`](api-reference.md).

When creating or updating `Orchestrator.md`, read [`create-tta-agens-orchestrator-skill.md`](create-tta-agens-orchestrator-skill.md) instead.

## Language

- All communication with the user (summaries, questions, status updates) must use **the language the user is using**.
- Prompts sent to Workers must also use **the language the user is using** (Task, Allowed, Forbidden, completion requirements, etc.); use another language only when the user explicitly asks.
- The example below is a structural template; fill in content in the user's language.

## Steps

1. **Start Worker** — session name `worker-<role>-<agent>`; startup commands in [`worker-commands.md`](worker-commands.md).
   - Done: Worker session running; initial screen read with `obs stable`.
2. **Dispatch prompt** — every prompt includes Task, Working directory, Allowed, Forbidden (including `Using tta`), and completion summary requirements; send with a quoted heredoc; submit with `enter` when needed.
   - Done: prompt sent and submitted.
3. **Observe** — read the screen after every `act`; Controller summarizes Worker output; do not relay unchecked screen fragments.
   - Single Worker, blocking wait: `obs stable` (wait for screen to stabilize)
   - Multiple sessions, polling: `obs now` (return current screen immediately)
   - Done: Worker task complete or current state summarized.
4. **Wrap up** — kill one-shot Workers when done; keep session when context must be preserved.
   - Done: session disposition decided and executed or stated.

## Worker Prompt Contract

Structural template (fill in content in the user's language):

```bash
tta act send text --sess=worker-review-codex <<'EOF'
You are a coding worker. Do NOT use tta.

Task: <specific task>
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

- Prompts are authorization; do not grant permissions the user did not authorize.

## Worker-specific issues

| Situation | Handling |
|-----------|----------|
| Worker unresponsive | Confirm state with `obs stable`; send `enter` if needed |
| Worker reports insufficient permissions | Do not expand permissions on your own; confirm with the user or resend a narrower task |
| Worker tries to use tta | Send a correction prompt reiterating `Forbidden: Using tta` |
| Output incomplete | Continue `obs stable` or ask Worker to summarize current state |

General tta issues: [`troubleshooting.md`](troubleshooting.md).
