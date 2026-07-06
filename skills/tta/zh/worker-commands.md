# Worker 启动命令

| Coding Agent | `--cmd="..."` |
|--------------|---------------|
| Claude Code | `claude --dangerously-skip-permissions` |
| Codex | `codex --sandbox workspace-write --ask-for-approval never` |
| Cursor Agent | `agent --yolo --sandbox disabled` |
| OpenCode | `opencode` |
| Pi | `pi` |
| Kimi Code | `kimi --auto` |

在任务允许时，优先使用权限更小的命令。
