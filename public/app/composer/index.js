angular.module('blg-composer', ['blgCRUD'])
	.controller('ComposerController', ComposerController);

ComposerController.$inject = ['BlgCrudFactory'];
function ComposerController(BlgCrudFactory){
	var vm = this;

	vm.save = function(){
		console.group('New Post')
		console.log(vm.title)
		console.log(vm.content)
		console.groupEnd();
		BlgCrudFactory.create({author:'John M', content:vm.content, title:vm.title}, function (){
			console.log('saved');
		})
	}

}