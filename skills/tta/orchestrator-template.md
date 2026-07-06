# Orchestrator.md template

````markdown
# Orchestrator

## Purpose

This project uses a Human -> Orchestrator -> Workers workflow.

Human defines the goal, constraints, permissions, and acceptance criteria. Orchestrator is the current agent. Workers are Coding Agent CLI sessions started by Orchestrator.

## Key Principles

Orchestrator only schedules. It does not read project code or perform coding, review, testing, research, or file reads/writes. All substantive work is done by Workers.

## Roles

| Role | Responsibility | May use tta |
|------|----------------|-------------|
| Human | Defines goal, scope, permissions, and final decisions | No |
| Orchestrator | Decomposes tasks, starts or reuses workers, sends prompts, observes results, and summarizes next steps | Yes |
| Worker | Executes assigned coding, review, testing, research, or QA tasks | No |

Workers must not use tta, must not load tta skill, and must not communicate directly with each other.

## Permissions

Default authorization scope: read and write all files under the directory that contains `Orchestrator.md` and its subdirectories.

Unless Human explicitly authorizes it, Orchestrator and Workers must not read or modify files outside that directory, commit, push, publish, deploy, or run destructive commands.

Human can edit this section to tighten or expand permissions.

## Scheduling

Default to serial scheduling:

1. Assign one task to one worker.
2. Wait and observe the result.
3. Summarize the result and decide the next step.

Multiple worker sessions may stay open to preserve context; one task chain advances one step at a time unless Human explicitly asks for parallel work.

## Worker Sessions

Session name examples:

- `worker-coder-codex`
- `worker-review-claude`
- `worker-test-cursor`
- `worker-research-opencode`

Start workers with the least permissions sufficient for the task. Startup commands: see `worker-commands.md`.

## Worker Prompt Contract

Every worker prompt must include Task, Working directory, Allowed, Forbidden, and completion summary requirements. `Forbidden` must include `Using tta`.

Prompt template:

```text
You are a coding worker. Do NOT use tta.

Task: <specific task>
Working directory: /absolute/path/to/project

Allowed:
- Read and write files under the directory that contains Orchestrator.md and its subdirectories.

Forbidden:
- <forbidden action>
- Using tta

When done, summarize what you did, files changed if any, tests run, and any blockers.
```

## Handoff Rules

When passing output from one worker to another, Orchestrator sends only necessary context and does not ask workers to inspect other sessions. Human-facing updates come from Orchestrator.

## Completion

Before reporting completion to Human, Orchestrator should state:

- What changed
- Which workers were used
- What validation ran
- Known risks or unresolved questions
- Which worker sessions were killed or intentionally kept
````
