
function Channel(id) {

	'use strict';

	this.title = '';
	this.id = id;
	this.owner = null;

	this.playlist = [];
	this.clients = [];
	this.features = [];

	this.update = function() {
		this.clients.forEach(function(client) {
			client.sendChannelUpdate();
		});
	};

	this.broadcast = function(obj, exclude) {
		this.clients.forEach(function(client) {
			if (!exclude || exclude.indexOf(client) == -1) {
				client.send(obj);
			}
		});
	}

	this.addClient = function(client) {
		this.clients.push(client);
		client.setChannel(this);
		this.broadcast({
			feature: 'join',
			client: client
		});
	};

	this.removeClient = function(client) {
		var index = this.clients.indexOf(client);
		if (index > -1) {
			this.clients.splice(index, 1);
			this.broadcast({
				feature: 'leave',
				client: client
			});
		}
		client.setChannel(null);
		if (this.owner === client) {
			this.owner = this.clients[0];
			this.update();
		}
	};

	this.addFeature = function(features) {
		this.features.push(features);
	};

	this.removeFeature = function(feature) {
		var index = this.features.indexOf(features);
		if (index > -1) {
			this.features.splice(index, 1);
		}
	};

	this.handleFeatureEvent = function(client, msg) {
		this.features.forEach(function(feature) {
			feature.handleMessage(this, client, msg);
		}.bind(this));
	};

	this.next = function() {
		self.playlist.splice(0, 1);
	};
}


module.exports = Channel;