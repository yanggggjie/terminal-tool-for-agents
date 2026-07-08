# API reference

On failure, tta prints `error: <reason>` and exits with code 1.

## API table

| API | Commands | Role | stdout |
|-----|----------|------|--------|
| `sess` | `start`, `kill`, `killall`, `list`, `keys`, `watch` | Manage sessions | `success` or session list |
| `act` | `send text`, `send key` | Send input to a running session | `success` |
| `obs` | `screen now`, `screen stable`, `screen scroll` | Read the screen of a running or exited session | screen text |

## Command templates

```bash
tta sess start --sess=<name> --cmd="<command>" --cwd="/absolute/path/to/project"
tta sess kill --sess=<name>
tta sess killall
tta sess list
tta sess keys
tta sess watch   # human-only

tta act send text --sess=<name> <<'EOF'
<text>
EOF
tta act send key  --sess=<name> --key=<key>

tta obs screen now    --sess=<name>
tta obs screen stable --sess=<name>
tta obs screen scroll --sess=<name> --dire=<up|down|top|bottom>
```

## Rules

- `--cmd=` and `--cwd=` must be quoted; prefer absolute paths for `--cwd=`.
- Write each `tta` command on one line; do not use shell variables.
- Use short lowercase session names or hyphenated names, such as `dev` or `vite-once`.
- `act` / `obs` require `--sess=` and the session must exist.
- `send text` must use `<<'EOF'`, not `<<EOF`, to avoid shell expansion of `$`, `()`, and backticks.
- Real newlines in heredocs are sent literally; the trailing newline usually submits.
- Menus, lists, numbered options, and `[Y/n]` confirmations must use `send key`.
- Do not rely on `act` stdout; use `obs` to read the screen.
- Agents must not use `tta sess watch`.
- Exited sessions can still be read with `obs`; `act` fails. Read the final output, then `sess kill`.
- `obs screen now` returns immediately — good for polling multiple sessions; `obs screen stable` waits for stability — good for sequential single-task waits.
- When output exceeds the screen, use `obs screen scroll --dire=down` to read history.

Common quoting error:

```bash
# wrong
tta sess start --sess=dev --cmd=npm run dev --cwd="/tmp"

# correct
tta sess start --sess=dev --cmd="npm run dev" --cwd="/tmp"
```

## Examples

```bash
# One-shot interactive command
tta sess start --sess=vite-once --cmd="npm create vite@latest" --cwd="/Users/you/project"
tta obs screen stable --sess=vite-once
tta act send key --sess=vite-once --key=enter
tta obs screen stable --sess=vite-once
tta sess kill --sess=vite-once

# Text input
tta act send text --sess=vite-once <<'EOF'
my-project-name
EOF
tta obs screen stable --sess=vite-once

# TUI menu
tta act send key --sess=vite-once --key=arrow_down
tta act send key --sess=vite-once --key=enter
tta obs screen stable --sess=vite-once

# dev server: keep session after start; do not kill until observation is done
tta sess start --sess=dev --cmd="npm run dev" --cwd="/Users/you/project"
tta obs screen stable --sess=dev
# continue obs as needed; sess kill only after confirming no issues

# REPL multi-line: do not paste line by line; use exec or a script
tta act send text --sess=pyrepl <<'EOF'
exec("""
for i in range(3):
    print(i)
""")
EOF
tta obs screen stable --sess=pyrepl
```
