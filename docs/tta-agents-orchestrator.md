# tta-agents-orchestrator

**tta-agents-orchestrator** is a workflow pattern built on top of [tta-agents](./tta-agents-docs.md):

> **Human → Orchestrator → Workers**

Human defines the goal, boundaries, and acceptance criteria. The **Orchestrator** breaks work into steps, starts or reuses Worker sessions, assigns tasks, observes results, and relays only necessary information between Workers. Workers do the concrete execution: coding, review, testing, research, browser automation, and so on.

Use it when one task benefits from multiple coding agents, such as a coder writing code, a reviewer finding issues, and a tester validating behavior. If you only need to temporarily delegate one Worker task, use [tta-agents](./tta-agents-docs.md).

## Core protocol

1. The Orchestrator is the current agent using tta; **schedules only — does not read code or write code**.
2. Workers are started by the Orchestrator. They must not use tta and do not talk to each other directly.
3. Default serial scheduling: assign → wait → observe → summarize → decide the next step.

```text
assign to worker A -> observe until done -> summarize
    -> decide next step
    -> assign to worker B or send feedback back to worker A
    -> observe until done
    -> repeat until phase or task completes
```

You may keep multiple worker sessions open so each retains context; one step in the same task chain should be active at a time by default.

To create or update `Orchestrator.md`, see [`skills/tta/create-tta-agens-orchestrator-skill.md`](../skills/tta/create-tta-agens-orchestrator-skill.md) and [`orchestrator-template.md`](../skills/tta/orchestrator-template.md).
