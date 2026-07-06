# Worker startup commands

| Coding Agent | `--cmd="..."` |
|--------------|---------------|
| Claude Code | `claude --dangerously-skip-permissions` |
| Codex | `codex --sandbox workspace-write --ask-for-approval never` |
| Cursor Agent | `agent --yolo --sandbox disabled` |
| OpenCode | `opencode` |
| Pi | `pi` |
| Kimi Code | `kimi --auto` |

When the task allows, prefer the least-permissive command.
