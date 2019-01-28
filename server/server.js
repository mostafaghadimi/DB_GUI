var express = require('express')
var app = express()
var path = require('path')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

var ejs = require('ejs')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/ejs'));

const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'DB_GUI',
    password: 'root',
    port: 5432
};

const pool = new pg.Pool(config);

// TODO: setup connection and query to database in the requests => Mehrdad

app.use('/public', express.static(path.join(__dirname, '../public/')))
const PORT = 8080

//-------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

app.get('/product', (req, res) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('select sp.id, sell_count sell_count, p.name as name, p.review review, inventory inventory, price price, sf.name featureName, sf.value featureValue, gf.name featureName1, gf.value featureValue1 from (((product p inner join special_product sp on p.id = sp.product_id)inner join general_feature gf on gf.product_id = p.id) inner join special_feature sf on sf.special_product_id = sp.id) where p.id in ((select id from product where name = \'' + req.query.product + '\') union (select id from product where name like \'%' + req.query.product + '%\') union (select p.id from product p inner join category c on c.id = p.category_id where c.id in (select category_id from product where product.name like \'%' + req.query.product + '%\')))', function (err, result) {
            done();
            if (err) {
                console.log("error1", err);
                res.status(400).send(err);
            }
			// res.status(200).send(getProductRes(result.rows, req.query.product));
			queryResult = getProductRes(result.rows, req.query.product)
			res.render('products', {
				query: queryResult,
				search: req.query.product
			})
       })
   })
});

function getProductRes(ls, st) {
	var res = {};
	var aux = [];
	
	for(var i = 0; i < ls.length; i++){
		if(!(ls[i].name === st))
			continue;
		var key = ls[i].id;
		if (!(ls[i].id in res)){
			res[key] = {};
			var k = 'features';
			res[key][k] = {};
		}
		var f1, f2, v1, v2;
		Object.entries(ls[i]).forEach(entry => {
			let k = entry[0];
			let value = entry[1];
			if (k === 'featurename')
				f1 = value;
			else if (k === 'featurename1')
				f2 = value;
			else if (k === 'featurevalue')
				v1 = value;
			else if (k === 'featurevalue1')
				v2 = value;
			else 
				res[key][k] = value;
		});
		res[key]['features'][f1] = v1;
		res[key]['features'][f2] = v2;
		
	}
	
	Object.entries(res).forEach(entry => {
		let key = entry[0];
		let value = entry[1];
		aux.push(value);
	});
	
	res = {};
	
	for(var i = 0; i < ls.length; i++){
		if(ls[i].name === st)
			continue;
		var key = ls[i].id;
		if (!(ls[i].id in res)){
			res[key] = {};
			var k = 'features';
			res[key][k] = {};
		}
		var f1, f2, v1, v2;
		Object.entries(ls[i]).forEach(entry => {
			let k = entry[0];
			let value = entry[1];
			if (k === 'featurename')
				f1 = value;
			else if (k === 'featurename1')
				f2 = value;
			else if (k === 'featurevalue')
				v1 = value;
			else if (k === 'featurevalue1')
				v2 = value;
			else 
				res[key][k] = value;
		});
		res[key]['features'][f1] = v1;
		res[key]['features'][f2] = v2;
		
		
	}
	
	Object.entries(res).forEach(entry => {
		let key = entry[0];
		let value = entry[1];
		aux.push(value);
	});
	
	return aux;
}


//-------------------------------------------------------------------------------------------------------------------------------------------

app.get('/seller', (req, res) => {
   pool.connect(function (err, client, done) {
	   if (err) {
		   console.log("Can not connect to the DB" + err);
	   }
	   client.query('select name, address, description, validated from seller where address like \'%' + req.query.seller + '%\' or name = \'%' + req.query.seller + '%\'', function (err, result) {
			done();
			if (err) {
				console.log("error1", err);
				res.status(400).send(err);
			}
			res.render('seller', {
				query: result.rows,
				search: req.query.seller
			});
	   })
   })
});

//-------------------------------------------------------------------------------------------------------------------------------------------

app.get('/user', (req, res) => {
   pool.connect(function (err, client, done) {
	   if (err) {
		   console.log("Can not connect to the DB" + err);
	   }
	   client.query('select * from customer where email = \'' + req.query.user + '\' and password = \'' + req.query.pass + '\'', function (err, result) {
			done();
			if (err) {
				console.log("error1", err);
				res.status(400).send(err);
			}
			res.render('user', {
				query: result.rows,
				search: req.query.user
			});
	   })
   })
});

//-------------------------------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Hey there! I\'m listening on PORT: ${PORT}\nTake care of what you are saying :))`);
})