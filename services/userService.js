'use strict';
var mqtt = require('mqtt');
var q = require('q');

var broker = 'localhost';
var port = 1883;

var topic = '/api/users/';
//(port, broker);
var message = {
	event: '/api/users/',
	state: {
		id: '55a8ef1ed6ffe3db3e63c1c9'
	}
};
/*var topicId = topic + message.state.id +'/';
 var payload = JSON.stringify(message);

 client.subscribe(topicId);
 client.on('message', function (topic, message) {
 if (topic === topicId) {
 console.log('returned message', JSON.parse(message));
 client.end();

 }
 });
 client.publish('/api/users/!*!/', payload, function () {
 console.log('[API REQ] Message published to the topic', topicId, payload);
 });*/

function getUser(id) {
	var deferred = q.defer();
	var topic = '/api/users/' + id + '/';
	var client = mqtt.connect('mqtt://localhost:' + port);
	var message = {
		event: topic,
		state: {
			id: id
		}
	};
	var payload = JSON.stringify(message);

	client.subscribe(topic);
	client.on('message', function (messageTopic, message) {
		if (messageTopic === topic) {

			console.log('returned message', JSON.parse(message));
			client.end(topic);
			deferred.resolve('user gotten')

		}
	});
	client.on('error', function (err) {
		client.end(topic);
		deferred.reject({'Error': err});
	});
	client.publish('/api/users/*/', payload, function () {
		console.log('[API REQ] Message published to the topic', topicId, payload);
	});

	return deferred.promise;
}
module.exports = {
	getUser: getUser
};