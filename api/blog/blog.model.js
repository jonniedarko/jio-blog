'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BlogSchema = new Schema({
	name: String,
	tagline:String,
	description:String,
	created_at : {
		type:Date,
		default:Date.now
	},
	updated_at: {
		type:Date,
		default:Date.now
	},
	posts: [{type:ObjectId, ref:'Post'}]

});

var PostSchema = new Schema({
	author: String,
	updated_by: String,
	created_at : {
		type:Date,
		default:Date.now
	},
	updated_at: {
		type:Date,
		default:Date.now
	},
	title: String,
	content: String,
	date: Date
});

var Blog = mongoose.model('Blog', BlogSchema);
var Post = mongoose.model('Post', PostSchema);

module.exports = {
	Blog: Blog,
	Post : Post
};