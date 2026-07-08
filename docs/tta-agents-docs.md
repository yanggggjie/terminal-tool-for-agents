# tta-agents

**tta-agents** is the layer on top of [tta](../README.en.md): the current agent acts as **Controller**, using tta to start, observe, and manage another Coding Agent CLI **Worker**.

Useful for temporarily delegating one clear task, for example:

- Start Codex from Claude Code for a review.
- Use Claude Code from Cursor Agent to implement a small change.
- Ask one Worker to run tests, research an issue, or validate an approach.

For long-horizon workflows that turn coder / reviewer / tester into a fixed process, see [tta-agents-orchestrator](./tta-agents-orchestrator.md).

## Roles

The Controller assigns tasks and summarizes results; the Worker only executes the assigned task and **must not use tta**.

## Permissions

**Clearly tell the agent using tta your permission scope (allowed/forbidden actions, directories, deploy, etc.). The coding agent controlled by tta runs in auto mode and treats prompts as authorization.**

Full workflow, Worker prompt contract, and startup commands: [`skills/tta/tta-agents-skill.md`](../skills/tta/tta-agents-skill.md) and [`worker-commands.md`](../skills/tta/worker-commands.md).
