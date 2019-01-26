var express = require('express')
var app = express()
var path = require('path')
app.use('/public', express.static(path.join(__dirname, '../public/')))
const PORT = 8080

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

app.listen(PORT, () => {
    console.log(`Hey there! I\'m listening on PORT: ${PORT}\nTake care of what you are saying :))`);
})