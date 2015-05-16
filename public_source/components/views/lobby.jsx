define(function (require) {

	'use strict';
	
	var React = require('react');
	var Item = require('jsx!components/ui/item');

	var RoomListItem = React.createClass({

		render: function() {

			var playlist = '';
			if (this.props.room.playlist && this.props.room.playlist.length > 0) {
				playlist = (
					<div className="item item--fit row">
						<div className="item">
							<div className="item nerf">Now playing</div>
							<div>
								<Item item={this.props.room.playlist[0]} />
							</div>
						</div>
					</div>
				);
			}

			return (
				<li className="lobby-room-item column padded">
					<div className="item epic">{this.props.room.title}</div>
					{playlist}
					<div className="item row padded">
						<button className="lobby-join item item--fit btn cta" onClick={this.onClick}>Join</button>
						<div className="item item--fit">Listeners: <span className="cta">{this.props.room.clients.length}</span></div>
						<div className="item">Playlist: <span className="cta">{this.props.room.open ? 'Open' : 'Closed'}</span></div>
					</div>
				</li>
			);
		},

		onClick: function() {
			this.props.onJoinRoom(this.props.room);
		},

	});

	var Lobby = React.createClass({

		render: function() {
			var list = '';
			
			if (this.props.rooms.length > 0) {
				var items = this.props.rooms.map(function (room) {
					return (<RoomListItem key={room.id} room={room} onJoinRoom={this.onJoinRoom} />);
				}.bind(this));
				list = (
					<ul className="lobby-room-list item scroll">
						{items}
					</ul>
				);
			} else {
				list = (
					<div className="item grail">
						<p className="item strong">No rooms</p>
						<p className="item">There are no rooms</p>
					</div>
				);
			}
			return (
				<div className="lobby item column padded well">
					<div className="item grail grail--epic">
						<p className="epic item">Join an existing room</p>
						<p className="epic item">or</p>
						<button className="epic item btn btn--outlined cta" onClick={this.onClickCreateRoom}>Create a new room</button>
					</div>
					{list}
				</div>
			);
		},

		onJoinRoom: function (room) {
			this.props.onJoinRoom(room);
		},

		onClickCreateRoom: function() {
			this.props.onCreateRoom();
		},

	});

	return Lobby;

});