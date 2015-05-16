
function Chat() {

	this.handleMessage = function(channel, client, msg) {

		if (msg.feature === 'chat') {

			channel.broadcast({
				feature: 'chat',
				sender: client,
				message: msg.message,
			});
		}
	};

	this.toJSON = function () {
		return 'chat';
	};

}

module.exports = Chat;