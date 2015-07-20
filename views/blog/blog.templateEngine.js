var registerViews = require('../../utils/viewRegister');
var markdown = require('markdown').markdown;

var renderView = registerViews({name: 'index', path: require.resolve('./view/index.jade')});

//var blogCRUD = require('./blog.controller');
var testContent = 'content 1';

var testContent2 = 'content 2';

router.get('/', function (req, res) {

	res.write(renderView.index({blogTitle: 'BAM!',
		tagline:'This is my blog. It\'s awesome',
		articles: [{
		author: 'Jonnie',
		title: 'Post 1',
		date: 'August 11, 2012.',
		img:'http://placehold.it/400x240&text=[img for post 1]',
		content: testContent
	}, {author: 'Jonnie', title: 'Post 2', date: 'August 12, 2012.', content: markdown.toHTML(testContent2), img:'http://placehold.it/400x240&text=[img for post 2]'}]
}));
res.end();
});