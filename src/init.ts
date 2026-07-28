/**
 * 一键安装：`init` 装全局 CLI + skill（对齐 yodo）。
 * skill 不走 postinstall（npm allowScripts）；node-pty 仍由 scripts/install.js 处理。
 */
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

const PKG_ROOT = path.join(__dirname, "..");
const SKILL_NAME = "tta";

export type InitOptions = {
  yes: boolean;
};

function cleanNpmEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith("npm_") || key === "INIT_CWD" || key === "PROJECT_CWD") {
      delete env[key];
    }
  }
  return env;
}

function requireBundledSkill(): void {
  if (!fs.existsSync(path.join(PKG_ROOT, "skills", SKILL_NAME, "SKILL.md"))) {
    console.error(`包内缺少 skills/${SKILL_NAME}/SKILL.md`);
    process.exit(1);
  }
}

function run(cmd: string, inherit = true): void {
  child_process.execSync(cmd, {
    stdio: inherit ? "inherit" : "pipe",
    env: cleanNpmEnv(),
    cwd: PKG_ROOT,
  });
}

function installCli(): void {
  // ponytail: 无 watch — 重装会把 dist 拷进 global prefix；改代码后需 rebuild 再 init
  console.log("正在从本包安装 CLI（npm i -g .）...");
  run("npm install -g .");
  console.log("✓ CLI 已就绪（若配置了 npm global bin，则 tta 在 PATH 上）\n");
}

function installSkills(): void {
  console.log(`正在安装 skill（${PKG_ROOT}）...`);
  const args = [
    "npx",
    "-y",
    "skills",
    "add",
    PKG_ROOT,
    "-g",
    "-y",
    "-a",
    "universal",
    "-a",
    "claude-code",
    "-s",
    SKILL_NAME,
  ];
  run(args.map(shellQuote).join(" "));
  console.log("✓ Skill 已安装（universal + claude-code）\n");
}

function shellQuote(s: string): string {
  if (/^[a-zA-Z0-9_@.+:=,/-]+$/.test(s)) return s;
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

export async function handleInit(options: InitOptions): Promise<void> {
  if (!options.yes) {
    console.log("请非交互安装：tta init -y");
    process.exit(1);
  }

  requireBundledSkill();

  console.log("\n  terminal-tool-for-agents init\n");

  try {
    installCli();
  } catch {
    console.error("CLI 安装失败（权限 / npm prefix？）。继续——你可能仍可用 npx。\n");
  }

  try {
    installSkills();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Skill 安装失败：${msg}`);
    console.error(
      `重试：npx -y skills add ${PKG_ROOT} -g -y -a universal -a claude-code -s ${SKILL_NAME}`,
    );
    process.exit(1);
  }

  console.log("接下来可以：");
  console.log("  tta --help");
  console.log("  tta sess list");
  console.log("");
}
