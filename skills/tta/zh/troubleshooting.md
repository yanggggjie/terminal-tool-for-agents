# 故障排查

| 情况 | 处理 |
|------|------|
| 屏幕卡住 | 先 `enter`，再试 `arrow_up` / `arrow_down` / `tab`，然后 `obs screen stable` |
| `act` 失败 | `tta sess list` 看状态；若 `exited`，先 `obs` 读错误，再 `sess kill` |
| TUI 无反应 | 检查是否误用 `send text`；菜单和确认框改用 `send key` |
| heredoc 结束不了 | `ctrl+c` 取消；确认结尾 `EOF` 顶格且单独一行 |
| REPL 卡在多行提示符 | 先试空行；仍卡住用 `ctrl+c`，改用脚本、paste/editor 模式或 `exec("""...""")` |
| 启动失败 | `sess list` -> `obs screen stable` 读错误 -> `sess kill` |
| 监控型应用（如 `htop`） | 屏幕不会稳定；用 `obs screen now`，不要用 `obs screen stable` |
