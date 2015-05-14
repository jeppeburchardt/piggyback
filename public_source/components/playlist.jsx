define(function(require) {

	'use strict';

	var React = require('react');
	var ListItem = require('jsx!views/list-item');
	

	var Playlist = React.createClass({



		render: function() {

			if (this.props.list.length > 0) {
				
				var items = this.props.list.map(function (item) {
						return (<ListItem item={item} />);
					}.bind(this));

				return (
					<div className="column item well padded">
						<div className="item item--fit header epic">Playlist</div>
						<div className="item scroll"><ul className="column padded">{items}</ul></div>
					</div>
				);
				
			} else {
				return (
					<div className="grail item well">
						<p className="item strong">Playlist is empty</p>
						<p className="item">Suggest or add an item to the playlist</p>
					</div>
				);
			}
		}

	});

	return Playlist;

});