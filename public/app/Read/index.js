angular.module('home', ['blgCRUD'])
	//.filter('unsafe', HtmlFilter)
	.controller('HomeController', HomeController);


/*HtmlFilter.$inject = ['$sce']
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
};*/
HomeController.$inject = ['BlgCrudFactory'/*'$scope'*/];
function HomeController(BlgCrudFactory) {
	var vm = this;

	vm.user = {
		name: 'John'
	};
	var post = {
		title: 'post2',
		author: 'John Smith',
		created_at: 'on August 24, 2012.',
		content: ' <p>Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa.</p>'
	};
	vm.posts = [post, post]



}