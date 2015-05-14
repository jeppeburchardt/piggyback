define(function(require) {


	var React = require('react');
	var Item = require('jsx!views/item');


	var ListItem = React.createClass({

		render: function() {
			
			if (this.props.onSelect) {

				return (<li className="item"><Item item={this.props.item} onSelect={this.onSelect} /></li>);

			} else {

				return (<li className="item"><Item item={this.props.item} /></li>);
			}

			
		},

		onSelect: function() {
			this.props.onSelect(this.props.item);
		},

	});

	return ListItem;
});