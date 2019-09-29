const http = require('http');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodemongoose', {useNewUrlParser: true});

const User = require('./user.js');
const Product = require('./product.js');

function createDocuments() {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: 'test2',
		email: 'test2@example.com'
	});

	user.save(function (err) {
		if (err) return;

		const product1 = new Product({
			title: 'title1',
			price: 111,
			description: 'd1',
			imageUrl: 'http://127.0.0.1:3000/?hoge',
			userId: user._id
		});
		product1.save(function (err) {
			if (err) return;
			// that's it!
		});
	});
}

function getProducts() {
	Product.find().populate('userId')
	.then(p => {
		console.log('==========');
		console.log(p);
		// ここではpは配列なのでuserIdは取れない
		//console.log(p.userId.name);
		console.log('==========');
	});
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log('**** server\n');
	//createDocuments();
	getProducts();
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

