var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

module.exports = app = express();
var mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/blog';
mongoose.connect(mongoUrl);

var blogRoutes = require('./api/blog');

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	req.user = req.headers['x-key'];
	next();
});

app.use('/api/blog', blogRoutes);

app.all('/*', function(req, res, next) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendFile('index.html', { root: __dirname+'/public' });
});

var host;
var port = process.env.PORT || 3000;
var node_env = process.env.NODE_ENV || 'DEV';

app.listen(port, function () {
	host = this.address().address;

	console.log('app listening  at http://%s:%s in %s', host, port, node_env);

});
