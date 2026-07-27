/**
 * 最小自检：PTY 可用 + CLI 冒烟。不装全局、不开 watch UI。
 */
import * as assert from "assert/strict";
import { createRequire } from "module";
import { execFileSync } from "child_process";
import * as path from "path";

const root = path.join(__dirname, "..");
const cli = path.join(__dirname, "cli.js");
const nodeRequire = createRequire(__filename);
const { findNodePtyRoot, testNodePty } = nodeRequire("../scripts/install.js") as {
  findNodePtyRoot: (fromDir?: string) => string | null;
  testNodePty: (nodePtyDir: string) => boolean;
};

function cliOut(args: string[]): string {
  try {
    return execFileSync(process.execPath, [cli, ...args], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string };
    return `${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
}

const ptyRoot = findNodePtyRoot(root);
assert.ok(ptyRoot, "selfcheck: node-pty not found");
assert.ok(testNodePty(ptyRoot), "selfcheck: node-pty spawn failed");

const keys = cliOut(["sess", "keys"]);
assert.ok(keys.includes("enter"), "selfcheck: sess keys should list enter");

const missingCwd = cliOut(["sess", "start", "--sess=selfcheck", "--cmd=true"]);
assert.ok(
  missingCwd.toLowerCase().includes("required") && missingCwd.includes("cwd"),
  "selfcheck: missing --cwd must be rejected",
);

const initNoYes = cliOut(["init"]);
assert.ok(initNoYes.includes("tta init -y"), "selfcheck: init without -y must print usage");

console.log("selfcheck: ok");
