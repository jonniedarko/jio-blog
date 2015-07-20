angular.module('blgCRUD', ['ngResource'])
	.factory('BlgCrudFactory', composerFactory);

composerFactory.$inject = ['$resource'];
function composerFactory($resource) {
	return $resource('/api/blog/:id', {id: '@id'}, {
		create: {method: 'POST', params: {author: '', content: '', title: ''}},
		getList: {method: 'GET', isArray: true}
	});
}
