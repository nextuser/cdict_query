#  测试

## 发布到npm
```shell
unset https_proxy
unset http_proxy
unset all_proxy
unset HTTPS_PROXY
unset HTTP_PROXY
unset ALL_PROXY
npm publish --registry=https://registry.npmjs.org/
```

# 使用
## 安装库
```
npm i cdict_query
```

## 使用库
```javascript
const cq = require('cdict_query');
const word = "circumvent"
async function testQuery(){
  const row = await cq.queryWord(word);
  if(row){
    console.log(row.word, row.phonetic, row.translation)
  } else{
      console.log('not found:',word)
  }
}

async function queryDatas(n = 10){
  let db = await cq.asyncGetDB();
  if(!db) {
    console.log("connect db failed, use DEBUG=1 to show debug info");
  }

  let sql = `SELECT * FROM ${cq.getTableName()} order by random() LIMIT ${n}`
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('查询失败：', err.message);
      return;
    }

    // 显示查询结果
    console.log(`查询到 ${rows.length} 条记录：`);
    console.log('----------------------------------------');
    rows.forEach((row, index) => {
      console.log(`[${index + 1}]`, row); // 输出每条记录
    });
    console.log('----------------------------------------');
  });

  // 关闭数据库连接（在查询完成后）
  db.close((err) => {
    if (err) {
      console.error('关闭数据库失败：', err.message);
      return;
    }
    console.log('数据库连接已关闭。');
  });
}
```

