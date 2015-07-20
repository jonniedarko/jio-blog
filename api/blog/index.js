var request = require('request');
var express = require('express');
var router = express.Router();


var ctrl = require('./blog.controller');

var http = require("http");
var https = require("https");

function isAuthorised(req, res, next) {
	request.post('/', {
			form: {
				key: 'value'

			}
		}, function (err, response, body) {
		console.log('err', err);
		console.log('response.body', response.body);
			req.body.test = response.body.isAuthorised;
			next();
		});

}

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

	var page = req.body.pageNumber || 0;


	ctrl.getPosts(page)
		.then(function (articles) {
			res.status(200).json(articles);
		})
		.catch(function (err) {
			res.status(500).end();
		});


});
// post /api/blog
router.post('/', function (req, res) {
	console.log('req.body', req.body);
	ctrl.createPost(req.body)
		.then(function (article) {
			res.status(201).json(article);
		})
		.catch(function (err) {
			res.status(500).end();
		});
});

// put /api/blog
router.put('/', function (req, res) {
	var id = req.body.id;
	var post = req.body.post;

	ctrl.updatePost(id, post)
		.then(function () {
			res.status(204).json();
		})
		.catch(function (err) {
			res.status(500).end();
		});
});

// put /api/blog/:id
router.delete('/:id', function (req, res) {
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