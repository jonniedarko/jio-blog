/**
 * Created by i311181 on 20 Jul 2015.
 */
angular.module('blog.read', ['blgCRUD'])
	.filter('unsafe', HtmlFilter)
	.controller('BlogListController', BlogListController);


HtmlFilter.$inject = ['$sce']
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
};
BlogListController.$inject = ['BlgCrudFactory'/*'$scope'*/];
function BlogListController(BlgCrudFactory) {
	var vm = this;

	vm.user = {
		name: 'John'
	};

	vm.posts = [];//post, post]
	BlgCrudFactory.getList(function(posts){
		vm.posts = posts;
	})


}