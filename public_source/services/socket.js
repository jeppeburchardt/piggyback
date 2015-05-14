define(function(require) {

	'use strict';

	var io = require('socketio');

	function Socket() {

		// private
		var self = this;
		var socket = io.connect(document.location.origin);

		function onConnect() {
			self.isConnected = true;
		}
		function onId (id) {
			self.id = id;
			self.onUserChange();
		}
		function onRooms (rooms) {
			self.rooms = rooms;
			self.onRoomsChange();
		}
		function onName (name) {
			self.name = name;
			self.onUserChange();
		}
		function onRoom (room) {
			self.room = room;
			self.onRoomChange();
		}
		function onSync (value) {
			self.onSyncUpdate(value);
		}
		function onChatMessage (entry) {
			if (!self.onChatMessage) {
				return;
			}
			self.onChatMessage({
				message: entry.message,
				listener: getListenerById(entry.sender),
				sender: entry.sender
			});
		}
		function getListenerById (id) {
			if (!self.room || !self.room.listeners) {
				return null;
			}
			var l = self.room.listeners.filter(function(listener){
				return (listener.id === id);
			});
			if (l.length > 0) {
				return l[0];
			} else {
				return null;
			}
		}
		function onDisconnect () {
			self.id = null;
			self.name = null;
			self.isConnected = false;
			self.onUserChange();
		}

		// public 
		this.id = null;
		this.name = null;
		this.rooms = [];
		this.room = [];
		this.isConnected = false;

		this.setName = function(name) {
			socket.emit('setName', name);
		};
		this.setRoom = function(id) {
			socket.emit('setRoom', id);
		};
		this.createRoom = function() {
			socket.emit('createRoom');
		};
		this.addToPlaylist = function(content) {
			socket.emit('addToPlaylist', content);
		};
		this.onPlaybackComplete = function() {
			socket.emit('onPlaybackComplete');
		};
		this.setOpen = function(value) {
			socket.emit('setOpen', value);
		};
		this.setSync = function(value) {
			socket.emit('sync', value);
		};
		this.chat = function(message) {
			socket.emit('chat', message);
		};

		socket.on('connect', onConnect);
		socket.on('id', onId);
		socket.on('rooms', onRooms);
		socket.on('name', onName);
		socket.on('room', onRoom);
		socket.on('sync', onSync);
		socket.on('chatMessage', onChatMessage);
		socket.on('disconnect', onDisconnect);
	}

	return Socket;
});