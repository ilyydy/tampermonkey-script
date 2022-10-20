# tampermonkey-script

[![LICENSE](https://img.shields.io/github/license/ilyydy/tampermonkey-script)](https://github.com/ilyydy/tampermonkey-script/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/ilyydy/tampermonkey-script/branch/main/graph/badge.svg?token=85M2JFKXLY)](https://codecov.io/gh/ilyydy/tampermonkey-script)
[![ci test](https://github.com/ilyydy/tampermonkey-script/actions/workflows/ci-test.yml/badge.svg?branch=main)](https://github.com/ilyydy/tampermonkey-script/actions/workflows/ci-test.yml)
[![node compatibility](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/en/about/releases/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

基于 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 的 [tampermonkey](https://www.tampermonkey.net/) 脚本开发仓库

## 脚本列表

- [csdn](./packages/csdn/README.md): 对 CSDN 页面优化处理
- [douban-bookshelf](./packages/douban-bookshelf/README.md): 豆瓣读书虚拟书架

## 开发

```bash
pnpm i

pnpm -F $script_name dev # 会打开浏览器 tampermonkey 安装脚本

pnpm test # 全量测试
pnpm test $script_name # 测试指定脚本

pnpm build # 全量编译
pnpm -F $script_name build # 编译脚本到 dist 目录下

pnpm i -g commitizen
cz # 用 commitizen 替换 git commit
```

另外提供了 [dev.sh](dev.sh) 集成了常用开发命令

```bash
. dev.sh

dev $script_name

vtest # 全量测试
vtest $script_name # 测试指定脚本

build # 全量编译
build $script_name # 编译脚本到 dist 目录下

new-script $script_name # 新建一个 script 项目
...
```
