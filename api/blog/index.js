
var express = require('express');
var router = express.Router();
var auth = require('jio-node-auth')();


var ctrl = require('./blog.controller');

var http = require("http");
var https = require("https");

// get /api/blog/:id
router.get('/:titleUrl', function (req, res) {


	ctrl.getPost(req.params.titleUrl)
		.then(function (articles) {
			res.status(200).json(articles);
		})
		.catch(function (err) {
			res.status(500).end();
		});

});

// get /api/blog
router.get('/', function (req, res) {

	var page = req.query.page || 0;


	ctrl.getPosts(page)
		.then(function (articles) {
			res.status(200).json(articles);
		})
		.catch(function (err) {
			res.status(500).end();
		});


});
// post /api/blog
router.post('/', auth.verify, function (req, res) {
	var art = req.body;
	art.author = req.user;
	ctrl.createPost(art)
		.then(function (article) {
			res.status(201).json(article);
		})
		.catch(function (err) {
			console.log('ERROR:', err);
			res.status(500).end();
		});
});

// put /api/blog
router.put('/:id',  auth.verify, function (req, res) {
	var id = req.body.id;
	var post = req.body.post;
	console.log('PUTTING', id, post)

	ctrl.updatePost(id, post)
		.then(function (info) {
			console.log('info', info)
			res.status(204).json();
		})
		.catch(function (err) {
			res.status(500).end();
		});
});

// put /api/blog/:id
router.delete('/:id',  auth.verify, function (req, res) {
	var id = req.params.id;

	ctrl.deletePost(id)
		.then(function () {
			res.status(204).json();
		})
		.catch(function (err) {
			res.status(500).end();
		});
});


module.exports = router;