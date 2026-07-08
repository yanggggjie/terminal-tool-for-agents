---
name: create-tta-agens-orchestrator
description: "Create or update Orchestrator.md, codifying a Human → Orchestrator → Workers workflow. Use when splitting coder/reviewer/tester long-horizon work, multi-agent orchestration, or in-project scheduling rules."
---

# create-tta-agens-orchestrator

Write executable in-project guidance so the current agent acts as **Orchestrator** and uses tta to start and manage Coding Agent Workers. `sess` / `act` / `obs` follow [`SKILL.md`](SKILL.md) and [`api-reference.md`](api-reference.md).

## Language

- `Orchestrator.md` must be written **entirely in the language the user is using** (section headings, principles, permissions, scheduling notes, Worker prompt templates, etc.).
- Communication and delivery notes to the user must also use the user's language.
- Use another language only when the user explicitly asks.
- [`orchestrator-template.md`](orchestrator-template.md) provides a structural reference; when writing to the project, translate all content into the user's language. Do not copy English placeholders verbatim.

## Core protocol

`Orchestrator.md` must make clear:

1. Human defines the goal, boundaries, permissions, and acceptance criteria.
2. Orchestrator only schedules. It does not read project code or perform coding, testing, review, research, or file reads/writes.
3. Workers execute concrete tasks. They must not use tta, must not load the tta skill, and must not communicate directly with each other.
4. Default scheduling is serial: assign → wait → observe → summarize → decide the next step.
5. Multiple worker sessions may stay open to preserve context; one task chain advances one step at a time by default.
6. A `Permissions` section is required. Default permissions are read/write access to the directory containing `Orchestrator.md` and its subdirectories.
7. Worker startup commands must be inlined; do not reference files outside the project.

## Steps

1. **Confirm directory** — default to workspace root if the user did not specify.
   - Done: target path confirmed.
2. **Confirm Workers** — e.g. coder, reviewer, tester, researcher, browser-qa; if unclear, use the minimal set coder / reviewer / tester.
   - Done: required Worker roles listed.
3. **Confirm language** — use the language the user is using.
   - Done: language for `Orchestrator.md` confirmed.
4. **Write template** — full template in [`orchestrator-template.md`](orchestrator-template.md); replace placeholders with project-specific commands, directories, and permissions; inline Worker startup commands.
   - Done: file written; placeholders replaced; language matches the user.
5. **Self-contained** — no dependency on README, docs, or external links; no relative links to files that do not exist in the project.
   - Done: file stands alone.
6. **Merge existing file** — if `Orchestrator.md` exists, read first and update without overwriting existing constraints.
   - Done: existing constraints preserved.
7. **Deliver** — in the user's language, remind them that default permissions can be tightened or expanded in `Permissions`.
   - Done: user knows permissions are adjustable.

Minimal version: keep Purpose, Roles, Permissions, Scheduling, Worker startup commands, and Worker Prompt Contract.

## Issues

| Situation | Handling |
|-----------|----------|
| Permissions unclear | Write default permissions; remind user they can edit `Permissions` |
| User asks Orchestrator to code directly | Explain protocol limit: substantive work must go to Workers |
| User language unclear | Follow the current conversation language; do not default to English |
