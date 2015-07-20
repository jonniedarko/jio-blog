'use strict';

var jade = require('jade');

module.exports = function registerViews (views){
	var renderView = {};
	if(views && views.length) {
		for (var i = 0, len = views.length; i < len; i++) {
			renderView[views[i].name] = jade.compileFile(views[i].path);
		}
		;
	} else if (views && views.name && views.path) {
		renderView[views.name] = jade.compileFile(views.path);
	} else {

	}
	return renderView;

};

