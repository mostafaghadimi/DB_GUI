var express = require('express')
var app = express()
var path = require('path')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'market',
    password: '1',
    port: 5432
};

const pool = new pg.Pool(config);

// TODO: setup connection and query to database in the requests => Mehrdad

app.use('/public', express.static(path.join(__dirname, '../public/')))
const PORT = 8080

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

app.get('/product', (req, res) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('(select * from product where name = \'' + req.query.product + '\') union (select * from product where name like \'' + req.query.product + '\') union (select p.id, p.sell_count, p.name, p.category_id, p.review from product p inner join category c on c.id = p.category_id where c.id in (select category_id from product where product.name like \'\\' + req.query.product + '\'))', function (err, result) {
            done();
            if (err) {
                console.log("error1", err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

app.get('/seller', (req, res) => {
    res.send(req.query.seller)
})

app.get('/user', (req, res) => {
    res.send(req.query.user)
})

app.listen(PORT, () => {
    console.log(`Hey there! I\'m listening on PORT: ${PORT}\nTake care of what you are saying :))`);
})