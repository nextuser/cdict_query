const sqlite3 = require('sqlite3').verbose();
const { getDbPath, TABLE_NAME } = require('./lib/config');
const { vk3500Words } = require('./vkwords');   


// 维克多3500词汇列表（这里只是示例，实际使用时需要完整的3500词列表）


// 连接数据库
const dbFile = getDbPath();
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) throw err;
    console.log('已连接数据库', dbFile);
});


    
    // 为维克多3500词汇添加vk标记
    let processed = 0;
    let found = 0;
    
    const processWord = (word, index) => {
        // 检查单词是否存在于数据库中
        db.get(`SELECT * FROM ${TABLE_NAME} WHERE word = ?`, [word.toLowerCase()], (err, row) => {
            if (err) {
                console.error(`处理单词 ${word} 时出错:`, err.message);
            } else if (row) {
                // 如果找到了单词，添加vk标记
                let tag = row.tag || '';
                if (!tag.includes('vk')) {
                    tag = tag ? `${tag} vk` : 'vk';
                    db.run(`UPDATE ${TABLE_NAME} SET tag = ? WHERE word = ?`, [tag, word.toLowerCase()], (err) => {
                        if (err) {
                            console.error(`更新单词 ${word} 时出错:`, err.message);
                        } else {
                            console.log(`已为单词 ${word} 添加vk标记`);
                            found++;
                        }
                    });
                } else {
                    console.log(`单词 ${word} 已包含vk标记`);
                    found++;
                }
            } else {
                console.log(`单词 ${word} 未在数据库中找到`);
            }
            
            processed++;
            
            // 如果处理完所有单词，关闭数据库连接
            if (processed === vk3500Words.length) {
                console.log(`\n处理完成: 共处理 ${processed} 个单词，其中 ${found} 个在数据库中找到并标记`);
                
                // 关闭数据库连接
                db.close((err) => {
                    if (err) {
                        console.error('关闭数据库失败:', err.message);
                        return;
                    }
                    console.log('数据库连接已关闭。');
                });
            }
        });
    };
    
    // 逐个处理单词
    vk3500Words.forEach((word, index) => {
        processWord(word, index);
    });