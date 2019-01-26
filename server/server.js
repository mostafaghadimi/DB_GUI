var express = require('express')
var app = express()
var path = require('path')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

var pg = require('pg')

// TODO: setup connection and query to database in the requests => Mehrdad

app.use('/public', express.static(path.join(__dirname, '../public/')))
const PORT = 8080

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

app.get('/product', (req, res) => {
    res.send(req.query.product)
})

app.get('/seller', (req, res) => {
    res.send(req.query.seller)
})

app.get('/user', (req, res) => {
    res.send(req.query.user)
})

app.listen(PORT, () => {
    console.log(`Hey there! I\'m listening on PORT: ${PORT}\nTake care of what you are saying :))`);
})