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

  cur_dir=$(pwd)
  cd "$PROJECT_ROOT_DIR" 2>/dev/null || exit

  if [ -d "$PACKAGES_DIR"/"$name" ]; then
    echo "script dir $name already exists."
  else
    cp -r "$PACKAGES_DIR"/"$template" "$PACKAGES_DIR"/"$name" &&
      sed -i "s/TODO/$name/" "$PACKAGES_DIR"/"$name"/package.json &&
      sed -i "s/TODO/$name/" "$PACKAGES_DIR"/"$name"/README.md &&
      pnpm -F "$name" i &&
      echo "create script dir $name done"
  fi

  cd "${cur_dir}" || exit
}

reload-dev() {
  # shellcheck source=/dev/null
  source "$PROJECT_ROOT_DIR"/dev.sh
}

_packages_autotab() {
  cur_dir=$(pwd)

  _get_comp_words_by_ref -n : cur

  if [ "${#COMP_WORDS[@]}" -eq 2 ]; then
    cd "$PROJECT_ROOT_DIR"/packages 2>/dev/null && _filedir -d
    cd "${cur_dir}" || exit
  fi
}

_test_autotab() {
  cur_dir=$(pwd)

  _get_comp_words_by_ref -n : cur

  if [ "${#COMP_WORDS[@]}" -eq 2 ]; then
    cd "$PROJECT_ROOT_DIR"/test 2>/dev/null && _filedir 'test.ts'

    for ((i = 0; i < ${#COMPREPLY[@]}; i++)); do
      # 为目录时追加 /
      # 如果已经在 test 目录则会由补全自动追加，不需要额外处理
      if [ -d "${COMPREPLY[$i]}" ] && [ "$PROJECT_ROOT_DIR/test" != "${cur_dir}" ]; then
        COMPREPLY["$i"]="${COMPREPLY[$i]}/"
      else
        COMPREPLY["$i"]="${COMPREPLY[$i]}"
      fi
    done

    cd "${cur_dir}" || exit
  fi
}

complete -X 'template*' -F _packages_autotab lint dev build type-check changelog
complete -o filenames -o nospace -o bashdefault -F _test_autotab vtest vcoverage
