---
name: create-tta-agens-orchestrator
version: 0.1.12
disable-model-invocation: true
description: "Create or update Orchestrator.md, codifying a Human → Orchestrator → Workers workflow."
---

# create-tta-agens-orchestrator

Write executable in-project guidance so the current agent acts as **Orchestrator** and uses tta to start and manage Coding Agent Workers. `sess` / `act` / `obs` follow [`SKILL.md`](SKILL.md) and [`api-reference.md`](api-reference.md).

## Core protocol

`Orchestrator.md` must make clear:

1. Human defines the goal, boundaries, permissions, and acceptance criteria.
2. Orchestrator only schedules. It does not read project code or perform coding, testing, review, research, or file reads/writes.
3. Workers execute concrete tasks. They must not use tta, must not load the tta skill, and must not communicate directly with each other.
4. Default scheduling is serial: assign → wait → observe → summarize → decide the next step.
5. Multiple worker sessions may stay open to preserve context; one task chain advances one step at a time by default.
6. A `Permissions` section is required. Default permissions are read/write access to the directory containing `Orchestrator.md` and its subdirectories.

## Steps

1. **Confirm directory** — default to workspace root if the user did not specify.
   - Done: target path confirmed.
2. **Confirm Workers** — e.g. coder, reviewer, tester, researcher, browser-qa; if unclear, use the minimal set coder / reviewer / tester.
   - Done: required Worker roles listed.
3. **Write template** — full template in [`orchestrator-template.md`](orchestrator-template.md); replace placeholders with project-specific commands, directories, and permissions.
   - Done: file written; placeholders replaced.
4. **Self-contained** — no dependency on README, docs, or external links; no unusable relative links.
   - Done: file stands alone.
5. **Merge existing file** — if `Orchestrator.md` exists, read first and update without overwriting existing constraints.
   - Done: existing constraints preserved.
6. **Deliver** — remind the user that default permissions can be tightened or expanded in `Permissions`.
   - Done: user knows permissions are adjustable.

Minimal version: keep Purpose, Roles, Permissions, Scheduling, and Worker Prompt Contract.

## Issues

| Situation | Handling |
|-----------|----------|
| Permissions unclear | Write default permissions; remind user they can edit `Permissions` |
| User asks Orchestrator to code directly | Explain protocol limit: substantive work must go to Workers |
