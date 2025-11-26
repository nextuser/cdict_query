const sqlite3 = require('sqlite3').verbose();
const {getDbPath ,TABLE_NAME} = require('./lib/config');
const dbFile = getDbPath();
//1. 打开原数据库
const oldDb = new sqlite3.Database(dbFile, (err) => {
    if (err) throw err;
    console.log('已连接原数据库',dbFile);
});

const selectSql = `select * from ${TABLE_NAME} order by random() limit 5`;
oldDb.all(selectSql, (err, rows) => {
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