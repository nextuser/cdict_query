# 简介
这是一个根据英文查询中文含义

相关数据库定义。 数据库原始数据来自【ECDICT】（https://github.com/skywind3000/ECDICT）
```shell
$ sqlite3 db/cdict2w.db
SQLite version 3.45.1 2024-01-30 16:01:20
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE IF NOT EXISTS "stardict" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
"word" VARCHAR(64) COLLATE NOCASE NOT NULL UNIQUE,
"phonetic" VARCHAR(64),
"translation" TEXT,
"tag" VARCHAR(64),
"bnc" INTEGER DEFAULT(NULL),
"frq" INTEGER DEFAULT(NULL),
"exchange" TEXT
);

```

#  测试

## 发布到npm
```shell
cd npm
unset https_proxy
unset http_proxy
unset all_proxy
unset HTTPS_PROXY
unset HTTP_PROXY
unset ALL_PROXY
npm publish --registry=https://registry.npmjs.org/

```
# 本地调试
```shell
 cd npm 
```
# 使用
```shell
cd test
npm link ../npm
npm run test
```