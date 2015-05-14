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

			return (
				<div className={className} onClick={this.onSelect}>
					<div className="content-image image image--small item item--fit" style={imageStyles}></div>
					<div className="item column">
						<div className="content-title item item--fit ellipsis strong">{this.props.item.title}</div>
						<div className="content-description item ellipsis">{this.props.item.description}</div>
					</div>
				</div>
			);
		},

		onSelect: function() {
			this.props.onSelect(this.props.item);
		},

	});

	return Item;

});