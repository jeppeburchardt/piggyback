var Client = require('./client');
var Channel = require('./channel');

var ChatFeature = require('./features/chat');
var SyncFeature = require('./features/sync');
var PlaylistFeature = require('./features/playlist');


function SocketServer(io) {

	'use strict';

	var channels = [],
		clients = [],
		idSpawn = 0,
		lobby = [];

	function getNewId() {
		return ++idSpawn;
	}

	function getChannelById(id) {
		var r = channels.filter(function(room) {
			return (room.id === id);
		});
		return (r.length === 1 ? r[0] : null);
	}

	function updateLobby() {
		lobby.forEach(function(client) {
			client.sendLobbyUpdate(channels);
		});
	}

	
	io.on('connection', function (socket) {

		var client = new Client(getNewId(), socket);

		socket.on('setChannel', function(id) {
			// remove from lobby
			var lobbyIndex = lobby.indexOf(client);
			if (lobbyIndex > -1) {
				lobby.splice(lobbyIndex, 1);
			}
			// clients can only leave a channel by disconnecting
			// remove old channel 
			// var channel = client.getChannel();
			// if (channel) {
			// 	channel.removeClient(client);
			// }
			// add new channel
			var newChannel = getChannelById(id);
			if (newChannel) {
				newChannel.addClient(client);
			}
		});

		socket.on('createChannel', function() {
			var channel = new Channel(getNewId());
			channel.owner = client;
			channel.title = client.name + '´s channel';

			channel.addFeature(new ChatFeature());
			channel.addFeature(new SyncFeature());
			channel.addFeature(new PlaylistFeature());

			channel.addClient(client);
			channels.push(channel);
			updateLobby();
		});

		socket.on('disconnect', function () {
			var channel = client.getChannel();
			if (channel) {
				channel.removeClient(client);
				if (channel.clients.length == 0) {
					channels.splice(channels.indexOf(channel), 1);
					updateLobby();
				}
			}
		});

		socket.on('feature', function (obj) {
			console.log('> feature', obj);
			var channel = client.getChannel();
			channel.handleFeatureEvent(client, obj);
		})

		lobby.push(client);
		updateLobby();

	});

}

module.exports = SocketServer;