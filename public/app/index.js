/**
 * Created by i311181 on 17 Jul 2015.
 */
angular.module('blg', ['ngRoute','blog.read', 'blg-composer', 'jio-filters'])
	.config(config);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider){
	$routeProvider
		.when('/blog', {
			controller: 'BlogListController',
			templateUrl: 'app/read/list/blogList.view.html',
			controllerAs: 'blogList'
		})
		.when('/blog/:title', {
			controller: 'BlogViewController',
			templateUrl: 'app/read/single/single.view.html',
			controllerAs: 'blog'
		})
		.when('/create', {
			controller: 'ComposerController',
			templateUrl: 'app/composer/composer.view.html',
			controllerAs: 'composer'
		})

		/*.when('/login', {
			controller: 'LoginController',
			templateUrl: 'login/login.view.html',
			controllerAs: 'login'
		})

		.when('/register', {
			controller: 'RegisterController',
			templateUrl: 'register/register.view.html',
			controllerAs: 'register'
		})*/
		.otherwise({ redirectTo: '/blog' });

	$locationProvider.html5Mode(true);
}
