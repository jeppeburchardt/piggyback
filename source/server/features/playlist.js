
function Playlist() {

	this.name = 'playlist';
	this.accessType = 'owner';

	this.handleMessage = function(channel, client, msg) {

		if (msg.feature === 'playlist') {

			if (msg.type === 'add') {

				if (client === channel.owner || this.accessType === 'all') {
					msg.content.client = client;
					channel.playlist.push(msg.content);
				}
				channel.update();

			} else if (msg.type === 'accessType') {

				if (client === channel.owner) {

					this.accessType = msg.accessType;
					channel.update();
				}
			}
		}
	};
}

module.exports = Playlist;