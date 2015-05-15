var extend = require('node.extend');

var idSpawn = 0;

function getNewId() {
	return ++idSpawn;
}

function Room() {

	var sockets = [];

	var self = this;

	this.title = '';
	this.id = getNewId();
	this.playlist = [];
	this.listeners = [];
	this.owner = null;
	this.open = false;
	this.sync = true;

	this.addSocket = function(socket) {
		this.listeners.push({
			id: socket.id,
			name: socket.name
		});
		sockets.push(socket);
		this.chat(socket.name + ' joined', -1);
	};

	this.removeSocket = function(socket) {
		sockets.splice(sockets.indexOf(socket), 1);
		self.listeners = self.listeners.filter(function(s) {
			return (s.id != socket.id);
		});
		this.chat(socket.name + ' left', -1);
		if (self.owner == socket.id && self.listeners.length > 0) {
			self.owner = self.listeners[0].id;
			this.chat(self.listeners[0].name + ' owns the room', -1);
		}
	};

	this.update = function() {
		sockets.forEach(function(socket) {
			socket.emit('room', self);
		});
	};

	this.next = function() {
		self.playlist.splice(0, 1);
	};

	this.sync = function(time) {
		sockets.forEach(function(socket) {
			if (self.owner != socket.id) {
				socket.emit('sync', time);
			}
		});
	};

	this.chat = function(message, sender) {
		sockets.forEach(function(socket) {
			socket.emit('chatMessage', {
				sender: sender,
				message: message,
			});
		});
	}
}

function SocketServer(io) {

	var rooms = [],
		sockets = [];

	function getRoomById(id) {
		var r = rooms.filter(function(room) {
			return (room.id === id);
		});
		return (r.length === 1 ? r[0] : null);
	}

	function updateLobby() {
		sockets.forEach(function(socket) {
			socket.emit('rooms', rooms);
		});
	}


	io.on('connection', function (socket) {

		socket.on('setName', function(name) {
			socket.name = name;
			socket.emit('name', name);
		});

		socket.on('setRoom', function(id) {
			if (socket.roomId) {
				var oldRoom = getRoomById(socket.roomId);
			}
			var room = getRoomById(id);
			socket.roomId = id;
			room.addSocket(socket);
			updateLobby();
			room.update();
		});

		socket.on('createRoom', function() {
			var room = new Room();
			room.title = socket.name + '´s room';
			room.owner = socket.id;
			rooms.push(room);
			socket.roomId = room.id;
			room.addSocket(socket);
			updateLobby();
			room.update();
		});

		socket.on('addToPlaylist', function(content) {
			var room = getRoomById(socket.roomId);
			if (room.owner == socket.id || room.open) {
				room.playlist.push(content);
			}
			updateLobby();
			room.update();
		});

		socket.on('onPlaybackComplete', function() {
			var room = getRoomById(socket.roomId);
			if (room.owner == socket.id) {
				room.next();
			}
			updateLobby();
			room.update();
		});

		socket.on('setOpen', function (value) {
			var room = getRoomById(socket.roomId);
			if (room.owner == socket.id) {
				room.open = value;
				room.chat(value ? 'Everyone can modify playlist' : 'Only owner can edit playlist', -1);
			}
			room.update(); 
			updateLobby();
		});

		socket.on('disconnect', function () {
			var room = getRoomById(socket.roomId);
			if (room) {
				room.removeSocket(socket);
				if (room.listeners.length == 0) {
					rooms.splice(rooms.indexOf(room), 1);
				}
				room.update();
				updateLobby();
			}
		});

		socket.on('sync', function (time) {
			console.log('sync', time);
			var room = getRoomById(socket.roomId);
			if (room && room.owner == socket.id) {
				room.sync(time);
			}
		});

		socket.on('chat', function (message) {
			var room = getRoomById(socket.roomId);
			if (room) {
				room.chat(message, socket.id);
			}
		});


		socket.id = getNewId();
		socket.emit('id', socket.id);
		socket.emit('rooms', rooms);

		sockets.push(socket);
	});

}


module.exports = SocketServer;