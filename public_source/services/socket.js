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
		function onLobbyUpdate (rooms) {
			self.rooms = rooms;
			self.onRoomsChange();
		}
		function onName (name) {
			self.name = name;
			self.onUserChange();
		}
		function onChannelUpdate (room) {
			self.room = room;
			self.onRoomChange();
		}
		function onSync (value) {
			console.log('onSync', value);
			self.onSyncUpdate(value);
		}
		function onChatMessage (entry) {
			if (!self.onChatMessage) {
				return;
			}
			self.onChatMessage(entry);
		}
		function onDisconnect () {
			self.id = null;
			self.name = null;
			self.isConnected = false;
			self.onUserChange();
		}
		function onFeatureMessage(obj) {

			switch(obj.feature) {
				
				case 'chat':
					onChatMessage(obj);
					break;

				case 'sync':
					if (obj.type === 'position') {
						onSync(obj.value);		
					}
					break;

				case 'join':
					onChatMessage({
						sender: -1,
						message: obj.client.name + ' joined'
					});
					break;

				case 'leave':
					onChatMessage({
						sender: -1,
						message: obj.client.name + ' left'
					});
					break;
			}
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
			socket.emit('setChannel', id);
		};
		this.createRoom = function() {
			socket.emit('createChannel');
		};

		this.getFeature = function(name) {
			var r = this.room.features.filter(function(feature){
				return name === feature.name;
			});
			if (r && r.length > 0) {
				return r[0];
			} else {
				return null;
			}
		};
		

		// edit playlist:
		this.addToPlaylist = function(content) {
			socket.emit('feature', {
				feature: 'playlist',
				type: 'add',
				content: content,
			});
		};
		this.setOpen = function(value) {
			socket.emit('feature', {
				feature: 'playlist',
				type: 'accessType',
				accessType: (value ? 'all' : 'owner'),
			});
		};

		// feature sync
		this.setSync = function(value) {
			socket.emit('feature', {
				feature: 'sync',
				type: 'position',
				value: value,
			});
		};
		this.onPlaybackComplete = function() {
			socket.emit('feature', {
				feature: 'sync',
				type: 'next',
			});
		};

		// feature chat
		this.chat = function(message) {
			socket.emit('feature', {
				feature:'chat',
				message: message,
			});
		};

		socket.on('connect', onConnect);
		socket.on('id', onId);
		socket.on('lobby', onLobbyUpdate);
		socket.on('name', onName);
		socket.on('channel', onChannelUpdate);
		socket.on('disconnect', onDisconnect);
		socket.on('msg', onFeatureMessage);
	}

	return Socket;
});