#!/usr/bin/env node
/**
 * Sync main SKILL.md frontmatter version from package.json.
 * Runs in release-it `after:bump` hook (see .release-it.json).
 * Sub-skills (tta-agents-skill.md, etc.) intentionally have no version field.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const skillPaths = require("./skill-paths.js").map((rel) => path.join(root, rel));
const { version } = require(path.join(root, "package.json"));

for (const skillPath of skillPaths) {
  let content = fs.readFileSync(skillPath, "utf8");

  if (/^version:\s*.+$/m.test(content)) {
    content = content.replace(/^version:\s*.+$/m, `version: ${version}`);
  } else {
    content = content.replace(/^---\r?\n/, `---\nversion: ${version}\n`);
  }

  fs.writeFileSync(skillPath, content);
}

process.stdout.write(`sync-skill-version: ${version} (${skillPaths.length} skills)\n`);
