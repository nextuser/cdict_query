
const cq = require('cdict_query');

async function testQuery(){
    const  wordDB  = await cq.asyncGetDB();

    const selectSql = `select * from ${cq.getTableName()} order by random() limit 5`;
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
testQuery();

