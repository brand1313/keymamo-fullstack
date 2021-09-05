const express = require("express");
const app = express();

const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.raw());
app.use(express.text());

//테이블 생성하기

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results', results);
})

//DB lists 테이블에 있는 모든 데이터를 프론트 서버에 전달

app.get('/api/values',(req, res) => {
    
    db.pool.query("SELECT * FROM lists;",(err, results, fields) => {
        if(err){
            return res.status(500).send(err);
        }else{
            return res.json(results);
        }
    })
})

//입력한 내용을 DB에 넣어주기
app.post('/api/value',(req, res) => {
    
    db.pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}")`, (err, results, fields) => {
        if(err){
            return res.status(500).send(err);
        }else{
            return res.json({success: true, value: req.body.value});
        }
    });
})

app.listen(5000, () => {
    console.log('server running at 5000');
});
