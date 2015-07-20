'use strict';
var chai = require('chai');
chai.config.includeStack = true;

var expect = chai.expect;
var mongoose = require('mongoose');
var app = require('../../index.js');
var request = require('supertest-as-promised').agent(app.listen());

describe('blog api test', function () {

	before(function (done) {
		// clean up db
		if (process.env.NODE_ENV === 'testing') {
			mongoose.connect(process.env.MONGO, function () {
				mongoose.connection.on('open', function () {
					mongoose.connection.db.dropDatabase(function () {
						done()

					})
				})
			});
		} else {
			done();
		}
	});

	var helloWorldPost = {title: 'hello world', author: 'John Smith', content: 'This is a test Blog post'};

	it('Create an Post', function (done) {

		request
			.post('/api/blog')
			.send(helloWorldPost)
			.expect(201)
			.then(function (res) {
				expect(res.body).to.not.be.empty;
				expect(res.body.title).to.eq(helloWorldPost.title);
				expect(res.body.author).to.eq(helloWorldPost.author);
				expect(res.body.content).to.eq(helloWorldPost.content);
				done();

			})
			.catch(done);
	});
	var postId;

	it('Get a list of Posts', function (done) {
		request
			.get('/api/blog')
			.expect(200)
			.then(function (res) {
				expect(res.body).to.not.be.empty;
				expect(res.body[0]._id).to.not.be.empty;
				postId = res.body[0]._id;
				expect(res.body[0].title).to.eq(helloWorldPost.title);
				expect(res.body[0].author).to.eq(helloWorldPost.author);
				expect(res.body[0].content).to.eq(helloWorldPost.content);
				done();

			})
			.catch(done)
	});
	var updatePost = {title: 'hello world', updated_by: 'John Smith', content: 'This is an Updated test Blog post'};
	it('update Post', function (done) {
		expect(postId).to.not.be.empty;
		request
			.put('/api/blog')
			.send({id: postId, post: updatePost})
			.expect(204)
			.then(function () {

				return request
					.get('/api/blog')
					.expect(200)
			})
			.then(function (res) {
				expect(res.body).to.not.be.empty;
				expect(res.body[0].title).to.eq(helloWorldPost.title);
				expect(res.body[0].author).to.eq(helloWorldPost.author);
				expect(res.body[0].author).to.eq(updatePost.updated_by);
				expect(res.body[0].content).to.eq(updatePost.content);
				done();
			})
			.catch(done);
	});

	it('Delete Post', function (done) {
		expect(postId).to.not.be.empty;
		request
			.delete('/api/blog/'+postId)
			.expect(204)
			.then(function () {

				return request
					.get('/api/blog')
					.expect(200)
			})
			.then(function (res) {
				expect(res.body).to.be.empty;
				expect(res.body.length).to.eq(0);
				done();
			})
			.catch(done);
	})

});