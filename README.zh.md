<div align="center">

<img src="./src/watch-ui/logo.png" alt="terminal-tool-for-agents, abbreviated as tta" width="520">


### **tta：让 Agent 操作交互式终端**

[![npm](https://img.shields.io/npm/v/terminal-tool-for-agents.svg)](https://www.npmjs.com/package/terminal-tool-for-agents)

[English README](./README.md)

</div>


## 是什么

`tta` 是给 Agent 用的终端控制工具。你的 Agent 可以是 Claude Code 等 Coding Agent，也可以是 OpenClaw 等助手 Agent；使用 `tta` 后，它可以交互式地打开终端程序、观察屏幕、发送输入并等待输出稳定。

适合普通 shell 一次性跑不完的任务：调试 `pdb`、操作 `IPython`、使用 `lazygit` 这类 TUI，或者启动另一个 **Coding Agent**（如 `Claude Code`，见 [tta-agents](./docs/zh/tta-agents-docs.md)）。

如果你还在手动操作终端里的交互式程序，手动开启多个 Coding Agent、传递上下文、分配任务、收集结果，或者等待一个 Agent 完成后再分配下一个任务，请尝试 `tta` 自动化。

Fork 自 [tui-use](https://github.com/onesuper/tui-use) 并改造为 `tta`。感谢 [onesuper](https://github.com/onesuper) 的原始工作。

## 快速开始

**安装 CLI：**

```bash
npm install -g terminal-tool-for-agents
```

**安装 skill：**

```bash
npx skills add yanggggjie/terminal-tool-for-agents
```

运行后 CLI 会交互式询问安装范围（全局/项目）、目标 agent（Cursor、Claude Code 等）和安装方式，按需选择即可。

中文 skill 源文件在 [`skills-zh/tta/`](./skills-zh/tta/)，仅供仓库维护；用户安装请用上方 `npx skills add`。

**让 Agent 使用 tta**：

```text
使用 tta 开启一个codex，来帮我 review 上一个 commit 的代码
```

**观察 session**：

```bash
tta sess watch
```

然后打开 http://127.0.0.1:7654/。

## 提供灵活选择

| 方式 | 适合场景 | 文档 |
|------|----------|------|
| `tta` | 控制单个交互式终端程序，例如调试、菜单选择、查看开发服务输出 | 本 README |
| `tta-agents` | 将单个明确任务委托给另一个 Coding Agent，例如使用 Codex 进行 review | [tta-agents](./docs/zh/tta-agents-docs.md) |
| `tta-agents-orchestrator` | 编排多个 Coding Agent 处理长程任务，例如编码、review、测试分工协作 | [tta-agents-orchestrator](./docs/zh/tta-agents-orchestrator.md) |

`tta` 不绑定某个 Agent。Codex、OpenCode 等 Coding Agent 可以使用，OpenClaw、Hermes 等助手 Agent 也可以用；例如让 OpenClaw 远程操控 Claude Code 写代码。硬性要求只有：安装 Node.js。

## 示例

### tta

让 Agent 操作交互式终端。

<a href="https://youtu.be/7WcIyX3d6qI" target="_blank" rel="noopener noreferrer">
  <img src="./docs/assets/tta.png" alt="tta pdb 示例视频封面" width="720">
</a>

步骤：

1. 按上面的“快速开始”安装 `tta` CLI 和 skills。
2. 直接告诉 Agent：用 `tta` 使用 `pdb` 完成调试任务。
3. 运行 `tta sess watch` 进行观察。

[IPython 示例录屏](https://youtu.be/6cZgYbIjAM8)

### tta-agents

让 Agent 启动另一个 Coding Agent 做任务。

<a href="https://youtu.be/J5YDg4BLOVc" target="_blank" rel="noopener noreferrer">
  <img src="./docs/assets/tta-agents.png" alt="tta-agents review 示例视频封面" width="720">
</a>

步骤：

1. 按上面的“快速开始”安装 `tta` CLI 和 skills。
2. 直接告诉 Agent：使用 `tta` 开启另一个 Coding Agent 进行 review。
3. 运行 `tta sess watch` 进行观察。

**注意：`tta` 的 Skill 默认只会通过输入框输入内容；如需斜线命令、快捷键或切换模型，请明确告诉 Agent 具体用法。**

### tta-agents-orchestrator

让多个 Coding Agent 按 `Orchestrator.md` 协作。

<a href="https://youtu.be/umV0VdJ9a8g" target="_blank" rel="noopener noreferrer">
  <img src="./docs/assets/tta-agents-orchestrator.png" alt="tta-agents-orchestrator dev-team 示例视频封面" width="720">
</a>
[视频中的 Orchestrator.md](https://github.com/yanggggjie/rising-repo/blob/main/Orchestrator.md)

步骤：

1. 按上面的“快速开始”安装 `tta` CLI 和 skills。
2. 告诉 Agent 创建一个 `Orchestrator.md`。
3. 让 Agent 严格遵循 `Orchestrator.md`，成为 Orchestrator。
4. 向 Agent 下达你要完成的任务。
5. 运行 `tta sess watch` 进行观察。

[用 Orchestrator 让 claude code 和 codex 下五子棋示例录屏](https://youtu.be/52gOo3hJYv4)


## [为什么使用 tta-agents？](./docs/zh/why-tta-agents.md)



## 更新

```bash
npm update -g terminal-tool-for-agents
npx skills update yanggggjie/terminal-tool-for-agents
```

## API 概览

tta 的一切操作都在 **session** 内进行（`--sess=`）：

| API | 命令 | 作用 |
|-----|------|------|
| **sess** | `start`, `kill`, `killall`, `list`, `keys`, `watch` | 创建、停止、列出 session；人类用 watch UI |
| **act** | `send text`, `send key` | 向 **运行中** 的 session 发送输入 |
| **obs** | `screen now`, `screen stable`, `screen scroll` | 读取 session 屏幕 |

```text
tta sess start -> (tta act ... -> tta obs screen stable)* -> tta sess kill
```

失败时输出一行 `error: <reason>`，退出码为 1。

工作流见 [`skills-zh/tta/SKILL.md`](./skills-zh/tta/SKILL.md)；命令模板见 [`api-reference.md`](./skills-zh/tta/api-reference.md)；故障排查见 [`troubleshooting.md`](./skills-zh/tta/troubleshooting.md)。

## 环境要求

- **Node.js** 22.x–26.x（`engines`：`>=22.0.0 <27.0.0`）；仓库含 `.nvmrc`（`24`）供本地开发
- 安装时会自动运行 `postinstall`，将 node-pty prebuild 复制到 `build/Release` 并验证 PTY 可用；无需手动 `approve-scripts`

## 开发

本地开发统一执行：

```bash
just install-dev-version
```

会 build、全局安装当前仓库版本；`postinstall` 会自动 `tta sess killall` 停掉旧 server。


如果你修改了 `tta` 的 skills，请给测试 Agent 加上这条指令：

```text
始终使用本地的 tta skills，而不是安装的 tta skills
本地 tta skills 路径 @YOURPATH/terminal-tool-for-agents/skills/tta
```

切回 npm 上的正式版：

```bash
just install-npm-version
```

## 许可证

MIT
