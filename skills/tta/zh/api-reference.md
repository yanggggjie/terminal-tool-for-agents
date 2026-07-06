# API 参考

失败时输出 `error: <reason>`，退出码为 1。

## API 表格

| API | 命令 | 用途 | stdout |
|-----|------|------|--------|
| `sess` | `start`, `kill`, `killall`, `list`, `keys`, `watch` | 管理 session | `success` 或 session 列表 |
| `act` | `send text`, `send key` | 向运行中的 session 发送输入 | `success` |
| `obs` | `screen now`, `screen stable`, `screen scroll` | 读取运行中或已退出 session 的屏幕 | 屏幕文本 |

## 命令模板

```bash
tta sess start --sess=<name> --cmd="<command>" --cwd="/absolute/path/to/project"
tta sess kill --sess=<name>
tta sess killall
tta sess list
tta sess keys
tta sess watch   # 仅人类

tta act send text --sess=<name> <<'EOF'
<text>
EOF
tta act send key  --sess=<name> --key=<key>

tta obs screen now    --sess=<name>
tta obs screen stable --sess=<name>
tta obs screen scroll --sess=<name> --dire=<up|down|top|bottom>
```

## 规则

- `--cmd=` 和 `--cwd=` 必须加引号；`--cwd=` 优先绝对路径。
- 每条 `tta` 命令写成单行，不要用 shell 变量。
- session 名用小写短词或短横线，如 `dev`、`vite-once`。
- `act` / `obs` 都需要 `--sess=`，且 session 必须存在。
- `send text` 必须用 `<<'EOF'`，不要用 `<<EOF`，避免 shell 展开 `$`、`()`、反引号。
- heredoc 的真实换行会原样发送；末尾换行通常等同于提交。
- 菜单、列表、编号、`[Y/n]` 确认只用 `send key`。
- 不要依赖 `act` 的 stdout；用 `obs` 读屏。
- Agent 不要用 `tta sess watch`。
- 已退出 session 仍可 `obs` 读取最终输出；`act` 会失败。读完后 `sess kill`。

常见引号错误：

```bash
# 错误
tta sess start --sess=dev --cmd=npm run dev --cwd="/tmp"

# 正确
tta sess start --sess=dev --cmd="npm run dev" --cwd="/tmp"
```

## 示例

```bash
# 一次性交互命令
tta sess start --sess=vite-once --cmd="npm create vite@latest" --cwd="/Users/you/project"
tta obs screen stable --sess=vite-once
tta act send key --sess=vite-once --key=enter
tta obs screen stable --sess=vite-once
tta sess kill --sess=vite-once

# 文本输入
tta act send text --sess=vite-once <<'EOF'
my-project-name
EOF
tta obs screen stable --sess=vite-once

# TUI 菜单
tta act send key --sess=vite-once --key=arrow_down
tta act send key --sess=vite-once --key=enter
tta obs screen stable --sess=vite-once

# REPL 多行：不要逐行粘贴，用 exec 或脚本
tta act send text --sess=pyrepl <<'EOF'
exec("""
for i in range(3):
    print(i)
""")
EOF
tta obs screen stable --sess=pyrepl
```
