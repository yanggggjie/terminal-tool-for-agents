# Troubleshooting

| Situation | Handling |
|-----------|----------|
| Screen stuck | Try `enter`, then `arrow_up` / `arrow_down` / `tab`, then `obs screen stable` |
| `act` failed | Run `tta sess list`; if `exited`, read errors with `obs`, then `sess kill` |
| TUI does not respond | Check whether `send text` was used by mistake; use `send key` for menus and confirmations |
| heredoc does not finish | Cancel with `ctrl+c`; ensure the ending `EOF` is flush-left and on its own line |
| REPL stuck at continuation prompt | Try an empty line; if still stuck, use `ctrl+c`, then switch to a script, paste/editor mode, or `exec("""...""")` |
| Start failed | `sess list` -> `obs screen stable` to read errors -> `sess kill` |
| Monitoring apps (such as `htop`) | Screen will not stabilize; use `obs screen now`, not `obs screen stable` |
