define(function (require) {

	'use strict';

	var React = require('react');
	var YuoTubeApi = require('YuoTubeApi');

	var Player = React.createClass({

		currentVideoId: null,
		timeUpdateInterval: null,

		propTypes: {
			onTimeUpdate: React.PropTypes.func,
			onComplete: React.PropTypes.func
		},

		render: function() {
			return (
				<div className="item column">
					<div className="item column player" ref="playerContainer"></div>
				</div>
			);
		},

		sync: function(value) {
			if (this.player) {
				var lag = Math.abs(value - this.player.getCurrentTime());
				if (lag > 3) {
					this.player.seekTo(value);
				} else {
					// console.log('lag', lag);
				}
			}
		},

		componentDidUpdate: function() {
			this.updateVideo();
		},

		componentDidMount: function() {
			this.updateVideo();
			
			if (this.timeUpdateInterval) {
				clearInterval(this.timeUpdateInterval);
			}
			this.timeUpdateInterval = setInterval(function(){
				if (this.player) {
					this.props.onTimeUpdate(this.player.getCurrentTime());
				}
			}.bind(this), 5000);
		},

		componentWillUnmount: function () {
			if (this.timeUpdateInterval) {
				clearInterval(this.timeUpdateInterval);
			}
		},

		updateVideo: function() {
			if (!this.props.content) {
				return;
			}

			//if (!this.player || (this.player && this.player.getVideoData().video_id != this.props.content.id)) { 

			if (this.currentVideoId !== this.props.content.id) {

				if (this.player) {
					this.player.destroy();
					this.player = null;
				}

				var el = document.createElement('div');
				el.className = 'item';

				var container = React.findDOMNode(this.refs.playerContainer);
				container.innerHTML = '';
				container.appendChild(el);

				this.player = new YuoTubeApi.Player(el, {
					height: '100%',
					width: '100%',
					videoId: this.props.content.id,
					playerVars: { 'autoplay': 1, controls: 0 }, // 
					events: {
						'onStateChange': this.onPlayerStateChange,
						'onError': this.onPlayerError,
					}
				});

				this.currentVideoId = this.props.content.id;
			}
		},

		onSyncChange: function (value) {
			this.setState({
				sync: value
			});
		},

		onPlayerError: function () {
			this.next();
		},

		onPlayerStateChange: function (e) {
			switch(e.data) {
				case 0:
				case -1:
					this.next();
					break;

				default:
					console.log('unknown state change: ', e);
					break;
			}
		},

		next: function () {
			this.props.onComplete(this.props.content);
		},

		mute: function () {
			if (this.player) {
				this.player.mute();
			}
		},

		unMute: function () {
			if (this.player) {
				this.player.unMute();
			}
		},

	});

	return Player;

});