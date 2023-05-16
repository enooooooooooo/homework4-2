var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {date, name, price}=req.body;
    const sql = "INSERT INTO quote (date, name, price) VALUES (?, ?, ?)";
    db.run(sql, [date, name, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    //res.redirect('/data.html');
    return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    const sql= "SELECT * FROM quote";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.send(rows);
    });
});

module.exports = router;