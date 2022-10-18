#! /usr/bin/env bash

PROJECT_ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

PACKAGES_DIR="./packages"

lint() {
  if [ -z "$1" ]; then
    pnpm -r --parallel lint
  else
    pnpm -F "$1" lint
  fi
}

dev() {
  local name=${1:?"Please provide script dir name."}
  pnpm -F "$name" dev
}

build() {
  if [ -z "$1" ]; then
    pnpm -r --parallel build
  else
    pnpm -F "$1" build
  fi
}

TEST_DIR="test"

vtest() {
  if [ -z "$1" ]; then
    pnpm test
  else
    pnpm test "$TEST_DIR"/"$1"
  fi
}

vcoverage() {
  if [ -z "$1" ]; then
    pnpm coverage
  else
    pnpm coverage "$TEST_DIR"/"$1"
  fi
}

type-check() {
  if [ -z "$1" ]; then
    pnpm -r --parallel type-check
  else
    pnpm -F "$1" type-check
  fi
}

new-script() {
  local name=${1:?"Please provide script dir name."}

  if [ -d "$PACKAGES_DIR"/"$name" ]; then
    echo "script dir $name already exists."
  else
    cp -r "$PACKAGES_DIR"/template "$PACKAGES_DIR"/"$name" &&
      sed -i "0,/TODO/ s/TODO/$name/" "$PACKAGES_DIR"/"$name"/package.json &&
      pnpm -F "$name" i &&
      echo "create script dir $name done"
  fi
}

reload() {
  # shellcheck source=/dev/null
  source dev.sh
}
