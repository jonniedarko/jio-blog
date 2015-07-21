/**
 * Created by i311181 on 17 Jul 2015.
 */
angular.module('blg', ['ngRoute', 'blog.read', 'blg-composer', 'jio-filters', 'jio-navbar', 'jio-auth'])
	.config(config)
	.run(run);

config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
function config($routeProvider, $locationProvider, $httpProvider) {
	$httpProvider.interceptors.push('TokenInterceptor');
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
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'app/auth/login/login.view.html',
			controllerAs: 'loginView'
		})
		.when('/signup', {
			controller: 'SignUpController',
			templateUrl: 'app/auth/signUp/signUp.view.html',
			controllerAs: 'signUpView'
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
		.otherwise({redirectTo: '/blog'});

	$locationProvider.html5Mode(true);
}

run.$inject = ['$rootScope', '$location', '$window', 'AuthenticationFactory'];
function run($rootScope, $location, $window, AuthenticationFactory) {
	AuthenticationFactory.check();

	$rootScope.$on('$routeChangeStart', onRouteChangeStart);
	$rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

	function onRouteChangeStart(event, nextRoute, currentRoute) {
		if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLoggedIn()) {
			$location.path("/login");
		} else {
			// check if user object exists else fetch it. This is incase of a page refresh
			if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
			if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
		}
	}

	function routeChangeSuccess(event, nextRoute, currentRoute) {
		//$rootScope.showMenu = AuthenticationFactory.isLogged;
		//$rootScope.role = AuthenticationFactory.userRole;
		// if the user is already logged in, take him to the home page
		if (AuthenticationFactory.isLoggedIn() == true && $location.path() == '/login') {
			$location.path('/blog');
		}
	}
}