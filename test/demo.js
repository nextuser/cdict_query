// demo  use cdict_query
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


async function testQueryRows(n = 10){
    const  wordDB  = await cq.asyncGetDB();

    const selectSql = `select * from ${cq.getTableName()} order by random() limit ${n}`;
    wordDB.all(selectSql, (err, rows) => {
        if (err) throw err;
        if(!rows || rows.length === 0){
            console.log('查询到0条记录');
            return;
        }
        console.log(`查询到${rows.length}条记录`);
        rows.forEach((row)=>{
            console.log(row.word,row.translation);
        })
    });

};
//testQuery()
//testQueryRows(20);

queryDatas(8);