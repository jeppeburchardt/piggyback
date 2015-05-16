
function Sync() {

	this.handleMessage = function(channel, client, msg) {

		if (msg.feature === 'sync') {

			if (channel.owner === client) {
				
				if (msg.type === 'position') {

					channel.broadcast({
						feature: 'sync',
						type: 'position',
						value: msg.value,
					}, [channel.owner]);

				} else if (msg.type === 'next') {

					channel.playlist.splice(0, 1);
					channel.update();
				}
			}
		}
	};

	this.toJSON = function () {
		return 'sync';
	};

}


module.exports = Sync;