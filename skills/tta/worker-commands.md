# Worker 启动命令

| Coding Agent | `--cmd="..."` |
|--------------|---------------|
| Claude Code | `claude --dangerously-skip-permissions` |
| Codex | `codex --sandbox workspace-write --ask-for-approval never` |
| Cursor Agent | `agent --yolo --sandbox disabled` |
| OpenCode | `opencode` |
| Pi | `pi` |
| Kimi Code | `kimi --auto` |

## 规则

- 在任务允许时，**优先使用权限更小的命令**。
- 高权限 flag（如 `--dangerously-skip-permissions`、`--yolo`）意味着 Worker 会把 prompt 当授权自动执行；派发前必须确认使用者已授权。
- CLI 不在 PATH 时先 `which <command>` 确认；找不到则告知使用者，不要猜测路径。

## Session 命名

格式：`worker-<role>-<agent>`

示例：

- `worker-coder-codex`
- `worker-review-claude`
- `worker-test-cursor`
- `worker-research-opencode`

## 启动示例

```bash
tta sess start --sess=worker-review-codex --cmd="codex --sandbox workspace-write --ask-for-approval never" --cwd="/absolute/path/to/project"
tta obs screen stable --sess=worker-review-codex
```
