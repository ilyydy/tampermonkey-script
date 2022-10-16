#! /usr/bin/env bash

PROJECT_ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

SRC_DIR="$PROJECT_ROOT_DIR"/src

lint() {
  pnpm lint
}

check() {
  pnpm type-check
}

dev() {
  local name=${1:?"Please provide script dir name."}
  pnpm vite "$SRC_DIR"/"$name"
}

build() {
  local name=${1:?"Please provide script dir name."}
  pnpm type-check && pnpm vite build "$SRC_DIR"/"$name"
}

new-script() {
  local name=${1:?"Please provide script dir name."}

  if [ -d "$SRC_DIR"/"$name" ]; then
    echo "script dir $name already exists."
  else
    cp -r "$SRC_DIR"/template "$SRC_DIR"/"$name" && echo "script dir $name done"
  fi
}

reload() {
  # shellcheck source=/dev/null
  source dev.sh
}
