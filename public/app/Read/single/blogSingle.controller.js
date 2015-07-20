angular.module('blog.read.single', ['blgCRUD'])
	//.filter('unsafe', HtmlFilter)
	.controller('BlogViewController', BlogViewController);


/*HtmlFilter.$inject = ['$sce']
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
};*/
BlogViewController.$inject = ['BlgCrudFactory', '$routeParams'/*'$scope'*/];
function BlogViewController(BlgCrudFactory, $routeParams) {
	var vm = this;

	vm.user = {
		name: 'John'
	};
	/*var post = {
		title: 'post2',
		author: 'John Smith',
		created_at: 'on August 24, 2012.',
		content: ' <p>Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa.</p>'
	};*/
	BlgCrudFactory.get({id:$routeParams.title}, function (post){
		vm.post = post;
	});



}