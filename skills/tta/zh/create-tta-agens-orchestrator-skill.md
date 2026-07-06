---
name: create-tta-agens-orchestrator
version: 0.1.12
disable-model-invocation: true
description: "创建或更新 Orchestrator.md，固化 Human → Orchestrator → Workers 工作流。"
---

# create-tta-agens-orchestrator

写一份可执行的项目内说明，让当前 Agent 作为 **Orchestrator**，用 tta 启动和管理 Coding Agent Workers。`sess` / `act` / `obs` 遵守 [`SKILL.md`](SKILL.md) 与 [`api-reference.md`](api-reference.md)。

## 核心协议

`Orchestrator.md` 必须明确：

1. Human 定义目标、边界、权限和验收标准。
2. Orchestrator 只做调度，不读项目代码，不执行编码、测试、review、调研或文件读写。
3. Workers 执行具体任务，不能使用 tta，不能加载 tta skill，彼此不直接通信。
4. 默认串行调度：派发 → 等待 → 观察 → 总结 → 决定下一步。
5. 可保留多个 worker session 保存上下文；同一任务链默认一次只推进一步。
6. 必须包含 `权限` 章节；默认权限是 `Orchestrator.md` 所在目录及其子目录的读写权限。

## 步骤

1. **确认目录** — 用户未指定时默认当前工作区根目录。
   - 完成：目标路径已确定。
2. **确认 Workers** — 例如 coder、reviewer、tester、researcher、browser-qa；不明确时给最小组合 coder / reviewer / tester。
   - 完成：所需 Worker 角色已列出。
3. **写入模板** — 完整模板见 [`orchestrator-template.md`](orchestrator-template.md)；用项目实际命令、目录和权限替换占位内容。
   - 完成：文件已写入，占位内容已替换。
4. **自包含** — 不依赖 README、docs 或外部链接；不加入不可用的相对链接。
   - 完成：文件可独立执行。
5. **合并已有文件** — 若 `Orchestrator.md` 已存在，先读再更新，不覆盖用户已有约束。
   - 完成：已有约束已保留。
6. **交付** — 提醒用户可在 `权限` 章节收紧或放宽默认权限。
   - 完成：用户已知权限可调整。

最小版本保留：目标、角色、权限、调度、Worker Prompt Contract 五节。

## 故障

| 情况 | 处理 |
|------|------|
| 权限不清 | 写入默认权限，并提醒用户可修改 `权限` 章节 |
| 用户要求 Orchestrator 直接编码 | 说明协议限制：实质性工作必须交给 Workers |
