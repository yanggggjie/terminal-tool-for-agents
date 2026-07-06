# tta-agents-orchestrator

**tta-agents-orchestrator** 是建立在 [tta-agents](./tta-agents-docs.md) 之上的工作流范式：

> **Human → Orchestrator → Workers**

Human 定义目标、边界和验收标准。**Orchestrator** 负责拆分步骤、启动或复用 Worker session、派发任务、观察结果，并在 Workers 之间转述必要信息。Workers 负责具体执行：编码、review、测试、调研、浏览器自动化等。

适合把一次任务拆给多个 Coding Agent，例如 coder 写代码、reviewer 找问题、tester 做验证。只需要临时委托一个 Worker 时，用 [tta-agents](./tta-agents-docs.md) 即可。

## 核心协议

1. Orchestrator 是当前正在使用 tta 的 Agent；**只调度，不读代码、不编码**。
2. Workers 由 Orchestrator 启动，不能使用 tta，彼此也不直接通信。
3. 默认串行调度：派发 → 等待 → 观察 → 总结 → 决定下一步。

```text
派给 worker A -> 等待并观察完成 -> 总结
    -> 判断下一步
    -> 派给 worker B，或把反馈转回 worker A
    -> 等待并观察完成
    -> 重复，直到阶段或任务完成
```

可以同时保留多个 worker session 保存上下文；同一任务链上默认一次只推进一个步骤。

创建或更新 `Orchestrator.md` 见 [`skills/tta/zh/create-tta-agens-orchestrator-skill.md`](../../skills/tta/zh/create-tta-agens-orchestrator-skill.md) 与 [`orchestrator-template.md`](../../skills/tta/zh/orchestrator-template.md)。
