const sqlite3 = require('sqlite3').verbose();
const { getDbPath, TABLE_NAME } = require('./lib/config');

// 连接数据库
const dbFile = getDbPath();
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) throw err;
    console.log('已连接数据库', dbFile);
});

// 查询带有vk标记的单词
db.all(`SELECT * FROM ${TABLE_NAME} WHERE tag LIKE '%vk%' LIMIT 20`, (err, rows) => {
    if (err) {
        console.error('查询失败:', err.message);
        return;
    }
    
    if (rows.length === 0) {
        console.log('未找到带有vk标记的单词');
    } else {
        console.log(`找到 ${rows.length} 个带有vk标记的单词（显示前20个）：`);
        rows.forEach((row) => {
            console.log(`- ${row.word}: ${row.tag}`);
        });
        
        // 查询总数
        db.get(`SELECT COUNT(*) as total FROM ${TABLE_NAME} WHERE tag LIKE '%vk%'`, (err, result) => {
            if (err) {
                console.error('查询总数失败:', err.message);
            } else {
                console.log(`\n数据库中共有 ${result.total} 个带有vk标记的单词`);
            }
            
            // 关闭数据库连接
            db.close((err) => {
                if (err) {
                    console.error('关闭数据库失败:', err.message);
                    return;
                }
                console.log('数据库连接已关闭。');
            });
        });
    }
});