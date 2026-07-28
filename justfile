# tta local dev — run `just` to list recipes
#
#   just install-dev-version — npm run dev:install（本仓库 build + init -y）
#   just install-npm-version — 正式版 init -y

_default:
    @just --list

# Full build → dist/
build:
    npm run build

# Build + 本仓库 init -y（CLI + skill）
install-dev-version:
    npm install
    npm run dev:install

# 正式 npm 包 init -y（CLI + skill）
install-npm-version:
    npx -y terminal-tool-for-agents@latest init -y

# Release: bump → commit → tag → npm publish → push
# Usage: just release patch | minor | major
release level:
    npm run release -- {{level}}
