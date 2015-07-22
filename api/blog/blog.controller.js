'use strict';
var q = require('q');
var Post = require('./blog.model').Post;
var userService  = require('../../services/userService');

module.exports = {
	createPost: createPost,
	deletePost: deletePost,
	getPost: getPost,
	getPosts: getPosts,
	updatePost: updatePost
};

/**
 * creates a new post
 *
 * @param articleData
 * @returns promise
 */
function createPost(articleData) {
	var deferred = q.defer();
	var article = new Post();
	// eventually replace with logged in user
	article.author = articleData.author;
	article.content = articleData.content;
	article.title = articleData.title;
	article.titleUrl = articleData.title.replace(/\s+/g, '-').toLowerCase();
	article.save(function (err, savedArticle) {
		if (err) {
			deferred.reject(err);
		}else {
			userService.getUser(article.author)
				.then(function(user){
					console.log(user);
					deferred.resolve(savedArticle)
				})
				.catch(function (){
					deferred.reject(savedArticle)
				})

		}
	});
	return deferred.promise;
};

/**
 * gets a Post
 *
 * @param id
 * @returns promise
 */
function getPost(titleUrl) {
	var deferred = q.defer();
	Post.findOne({titleUrl:titleUrl})
		.exec(function (err, article) {
			if (err) {
				deferred.reject(err)
			} else if (!article) {
				deferred.reject();
			} else {
				deferred.resolve(article)
			}
		});
	return deferred.promise;
};

/**
 * gets all Posts
 *
 * @returns promise
 */
function getPosts(from) {
	var deferred = q.defer();
	var limit = 10;
	/*var limitDate = date || Date.now();
	 { created_at: { $lte: limitDate } }
	 */
	Post.find()
		.skip(from*limit)
		.limit( limit )
		.sort( '-created_at' )
		.exec(function (err, articles) {
			if (err) {
				deferred.reject(err)
			} else if (!articles) {
				deferred.reject();
			} else {
				deferred.resolve(articles)
			}
		});
	return deferred.promise;
};

/**
 * deletes post
 *
 * @param id
 * @returns promise
 */
function deletePost(id) {
	var deferred = q.defer();
	Post.find({_id: id})
		.remove()
		.exec(function (err) {
			if (err) {
				deferred.reject(err)
			}
			deferred.resolve();
		});
	return deferred.promise;
};


/**
 * update a post
 *
 * @param id
 * @param updatedArticle
 * @returns promise
 */
function updatePost(id, updatedArticle) {
	var deferred = q.defer();
	Post.update({_id: id}, updatedArticle, function (err) {
		if (err) {
			deferred.reject(err)
		}
		deferred.resolve();
	});

	return deferred.promise;
};