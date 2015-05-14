define(function(require){

	'use strict';
	
	var React = require('react');
	
	var SignIn = require('jsx!components/signin');
	var Lobby = require('jsx!components/lobby');
	var Finder = require('jsx!components/finder');
	var Playlist = require('jsx!components/playlist');
	var Chat = require('jsx!components/chat');
	var Preview = require('jsx!components/preview');

	var Player = require('jsx!views/player');
	var CheckBox = require('jsx!views/checkbox');
	var Masthead = require('jsx!views/masthead');
	
	var YouTubeService = require('services/youtube');
	var Socket = require('services/socket');
	
	var service = new YouTubeService();
	
	var App = React.createClass({

		socket: null,

		getInitialState: function () {
			return {
				isConnected: false,
				rooms: [],
				playlist: [],
				name: undefined,
				room: false,
				content: null,
				preview: null,
				canAdd: false,
				isOwner: false,
				sync: true,
			};
		},

		componentDidMount: function () {
			this.socket = new Socket();
			this.socket.onUserChange = this.onUserChange;
			this.socket.onRoomChange = this.onRoomChange;
			this.socket.onRoomsChange = this.onRoomsChange;
			this.socket.onPlayListChange = this.onPlayListChange;
			this.socket.onSyncUpdate = this.onSyncUpdate;
		},

		onUserChange: function () {
			this.setState({
				isConnected: this.socket.isConnected,
				name: this.socket.name,
				userId: this.socket.id,
			});
		},

		onRoomChange: function () {
			this.setState({
				room: this.socket.room,
				canAdd: (this.socket.room.owner === this.state.userId || this.socket.room.open),
				isOwner: (this.socket.room.owner === this.state.userId),
			});
		},

		onRoomsChange: function () {
			this.setState({
				rooms: this.socket.rooms
			});
		},

		onSyncUpdate: function (value) {
			if (this.state.sync) {
				this.refs.player.sync(value);
			}
		},

		renderConnecting: function () {
			return (
				<div className="app">
					<div className="grail grail--epic">
						<div className="item">&nbsp;<div className="spinner"></div></div>
						<p className="strong item">Connection lost</p>
						<p className="item">Reconnecting to server</p>
					</div>
				</div>
			);
		},

		renderSignIn: function () {
			return (
				<div className="app column">
					<SignIn key="SignIn" onNameChange={this.onNameChange} />
				</div>
			);
		},

		renderLobby: function() {
			return (
				<div className="app column">
					<Lobby 
						rooms={this.state.rooms} 
						onJoinRoom={this.onJoinRoom} 
						onCreateRoom={this.onCreateRoom} />
				</div>
			);
		},

		renderWorkSpace: function() {

			var finder = '',
				settings = '',
				sync = '',
				workspaceClassName = 'workspace item row well';

			if (this.state.preview) {
				workspaceClassName += ' preview';
			}

			if (this.state.canAdd) {
				finder = (
					<Finder 
						ref="finder"
						service={service} 
						onSelect={this.onSelect} 
						onPreview={this.onPreview} />
				);
			}
			if (this.state.isOwner) {
				settings = (
					<div className="item item--fit">
						<CheckBox label="Allow listeners to add to playlist" checked={this.state.room.open} onChange={this.onOpenChange} />
					</div>
				);					
			} else {
				sync = (<div className="item item--fit"><CheckBox label="Sync player" checked={this.state.sync} onChange={this.onSyncChange} /></div>);
			}
			return (
				<div className="app column">
					<Masthead title={this.state.room.title} />
					<div className={workspaceClassName}>
						<div className="row item padded">
							<div className="item column padded">
								<Player ref="player" content={this.state.room.playlist[0]} onTimeUpdate={this.onTimeUpdate} onComplete={this.onContentComplete} />
								<div className="item item--fit row padded">
									{sync}
									{settings}
								</div>
								<div className="row item padded">
									{finder}
									<Playlist list={this.state.room.playlist} />
								</div>
							</div>
							<Chat service={this.socket} />
						</div>
					</div>
					<Preview label="Add to playlist" content={this.state.preview} onConfirm={this.onConfirmPreview} onCancel={this.onCancelPreview} />
				</div>
			);
		},

		render: function () {
			if (!this.state.isConnected) {
				return this.renderConnecting();

			} else if (!this.state.name) {
				return this.renderSignIn();

			} else if (!this.state.room) {
				return this.renderLobby();

			} else {
				return this.renderWorkSpace();
			}
		},

		onNameChange: function (name) {
			this.socket.setName(name);
		},

		onCreateRoom: function () {
			this.socket.createRoom();
		},

		onJoinRoom: function (room) {
			this.socket.setRoom(room.id);
		},

		onSelect: function (item) {
			this.setState({
				preview: item
			});
			this.refs.player.mute();
		},

		onCancelPreview: function() {
			this.setState({
				preview: null
			});
			this.refs.player.unMute();
		},

		onConfirmPreview: function(item) {
			this.socket.addToPlaylist(item);
			this.refs.finder.clear();
			this.setState({
				preview: null
			});
			this.refs.player.unMute();
		},

		onContentComplete: function () {
			this.socket.onPlaybackComplete();
		},

		onOpenChange: function (value) {
			this.socket.setOpen(value);
		},

		onSyncChange: function (value) {
			this.setState({
				sync: value
			});
		},

		onTimeUpdate: function (value) {
			if (this.state.isOwner) {
				this.socket.setSync(value);
			}
		},


	});

	return App;

});