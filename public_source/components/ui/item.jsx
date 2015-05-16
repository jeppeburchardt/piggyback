define(function (require) {

	'use strict';

	var React = require('react');

	var Item = React.createClass({

		render: function () {
			
			var imageStyles = {
				backgroundImage: 'url(' + this.props.item.image + ')'
			};

			var className = 'content row padded';
			
			if (this.props.onSelect) {
				className += ' btn btn--clear';
			}

			var info = '';
			if (this.props.item.client) {
				info = (<div className="content-client item item--fit nerf">Added by {this.props.item.client.name}</div>);
			} else {
				info = (<div className="content-provider item item--fit nerf">{this.props.item.provider}</div>);
			}

			return (
				<div className={className} onClick={this.onSelect}>
					<div className="content-image image image--small item item--fit" style={imageStyles}></div>
					<div className="item column split">
						<div className="content-title item item--fit ellipsis strong">{this.props.item.title}</div>
						<div className="content-description item item--fit ellipsis">{this.props.item.description}</div>
						{info}
					</div>
				</div>
			);
		},

		onSelect: function() {
			if (this.props.onSelect) {
				this.props.onSelect(this.props.item);
			}
		},

	});

	return Item;

});