const sqlite3 = require('sqlite3').verbose();
const {getDbPath ,TABLE_NAME} = require('./lib/config');
const dbFile = getDbPath();
//1. 打开原数据库
const oldDb = new sqlite3.Database(dbFile, (err) => {
    if (err) throw err;
    console.log('已连接原数据库',dbFile);
});

// 查看表结构
oldDb.all(`PRAGMA table_info(${TABLE_NAME})`, (err, columns) => {
    if (err) throw err;
    console.log('stardict表结构：');
    columns.forEach(column => {
        console.log(`${column.cid}: ${column.name} (${column.type}, ${column.notnull ? 'NOT NULL' : ''}, ${column.dflt_value}, ${column.pk ? 'PRIMARY KEY' : ''})`);
    });
    
    // 查询几条记录看看实际数据
    const selectSql = `select * from ${TABLE_NAME} order by random() limit 5`;
    oldDb.all(selectSql, (err, rows) => {
        if (err) throw err;
        if(!rows || rows.length === 0){
            console.log('查询到0条记录');
            return;
        }
        console.log(`\n查询到${rows.length}条记录：`);
        rows.forEach((row)=>{
            console.log('Word:', row.word, '| Phonetic:', row.phonetic, '| Tag:', row.tag, '| Translation:', row.translation?.substring(0, 50) + '...');
        })
        
        // 关闭数据库连接
        oldDb.close((err) => {
            if (err) {
                console.error('关闭数据库失败：', err.message);
                return;
            }
            console.log('\n数据库连接已关闭。');
        });
    });
});