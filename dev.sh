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

changelog() {
  if [ -z "$1" ]; then
    pnpm -r --parallel changelog
  else
    pnpm -F "$1" changelog
  fi
}

new-script() {
  local name=${1:?"Please provide script dir name."}

  if [ -z "$2" ]; then
    template="template"
  else
    template="template-$2"
  fi

  if [ -d "$PACKAGES_DIR"/"$name" ]; then
    echo "script dir $name already exists."
  else
    cp -r "$PACKAGES_DIR"/"$template" "$PACKAGES_DIR"/"$name" &&
      sed -i "s/TODO/$name/" "$PACKAGES_DIR"/"$name"/package.json &&
      sed -i "s/TODO/$name/" "$PACKAGES_DIR"/"$name"/README.md &&
      pnpm -F "$name" i &&
      echo "create script dir $name done"
  fi
}

reload-dev() {
  # shellcheck source=/dev/null
  source dev.sh
}

_packages_autotab() {
  local cur=${COMP_WORDS[COMP_CWORD]}

  if [ "${#COMP_WORDS[@]}" -eq 2 ]; then
    cd "$PROJECT_ROOT_DIR"/packages && _filedir -d; cd ..
  else
    return 0
  fi
}

_test_autotab() {
  # shellcheck disable=SC2034
  local cur=${COMP_WORDS[COMP_CWORD]}

  if [ "${#COMP_WORDS[@]}" -eq 2 ]; then
    cd "$PROJECT_ROOT_DIR"/test && _filedir 'test.ts'; cd ..
  else
    return 0
  fi
}

complete -X 'template*' -F _packages_autotab lint dev build type-check changelog
complete -F _test_autotab vtest vcoverage
