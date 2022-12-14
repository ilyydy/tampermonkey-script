#! /usr/bin/env bash

function _autotab() {
  echo $1
  echo $2
  echo $3
  COMPREPLY=(test1 test2 atc abc bhj cd)
}

compgen -F _autotab foo