# tampermonkey-script

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

基于 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 的 tampermonkey 脚本开发仓库

## 开发

```shell
pnpm i
pnpm dev $script_name # 会打开浏览器 tampermonkey 安装脚本
pnpm test # 全量测试
pnpm test $script_name # 测试指定脚本

pnpm build $script_name # 编译脚本到 dist 目录下

pnpm i -g commitizen
cz # 用 commitizen 替换 git commit
```

另外提供了 [dev.sh](dev.sh) 集成了常用开发命令

```shell
. dev.sh

dev $script_name
vtest # 全量测试
vtest $script_name # 测试指定脚本

build $script_name
new-script $script_name
...
```

## 脚本列表

### [CSDN](./src/csdn/)

对 CSDN 页面优化处理
