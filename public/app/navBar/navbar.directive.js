'use strict';

angular.module('jio-navbar', ['jio-auth'])
	.controller('NavBarCtrl', NavBarCtrl)
	.directive('jioNavbar', NavBar);


function NavBar() {
	return {
		restrict: 'EA', //E = element, A = attribute, C = class, M = comment
		replace: true,
		scope: {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			title: '@'
		},
		templateUrl: 'app/navBar/navbar.view.html',
		controllerAs: 'navbar',
		controller: NavBarCtrl, //Embed a custom controller in the directive
		link: function (scope, element, attrs) {

		} //DOM manipulation
	}
}
NavBarCtrl.$inject = ['AuthenticationFactory', 'UserAuthFactory', '$scope'];
function NavBarCtrl(AuthenticationFactory, UserAuthFactory, $scope) {
	var vm = this;
	console.log('AuthenticationFactory.isLogged', AuthenticationFactory.isLogged);
	vm.isLoggedIn = AuthenticationFactory.isLoggedIn();

	$scope.$on('isLogged:updated', function () {
		console.log('test')
		vm.isLoggedIn = AuthenticationFactory.isLoggedIn();
	});

	vm.logout = function () {
		console.log('UserAuthFactory', UserAuthFactory);
		UserAuthFactory.logout();
	};
	vm.user = {
		name: 'John M',
		imageUrl: ''
	}

}

