const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

let connection = mysql.createConnection(config);
for (let i = 0; i < 10; i++) {
    let sql = `INSERT INTO people(name) VALUES ('Marcos Murilo ${i}')`;
    connection.query(sql);
}
connection.end();

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", (req, res) => {
    let connection = mysql.createConnection(config);
    let sql = `SELECT name FROM people`;

    connection.query(sql, (err, peoples, fields)  => {
        if (err) {
            console.log(err);
            res.render('error', { title: 'FullCycle 2.0', message: 'Ops!'});
            return;
        }
        res.render('index', {
            title: 'FullCycle 2.0',
            message: 'Full Cycle Rocks!',
            names: peoples.map(people => people.name)
        });
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
