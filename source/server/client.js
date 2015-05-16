
function Client(id, sock) {

	'use strict';

	// private
	var channel = null;
	var socket = sock;

	// public
	this.id = id;
	this.name = '';

	this.setChannel = function(cha) {
		channel = cha;
		this.sendChannelUpdate();
	};

	this.getChannel = function() {
		return channel;
	};

	this.setName = function(name) {
		this.name = name;
		socket.emit('name', this.name);
	};

	this.sendLobbyUpdate = function(allChannels) {
		socket.emit('lobby', allChannels);
	};

	this.sendChannelUpdate = function() {
		socket.emit('channel', channel);
	};

	this.send = function (obj) {
		socket.emit('msg', obj);
	};

	socket.on('setName', this.setName.bind(this));
	socket.emit('id', this.id);
}

module.exports = Client;