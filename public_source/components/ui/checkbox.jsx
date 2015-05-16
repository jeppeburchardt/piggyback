define(function(require){

	'use strict';

	var React = require('react');

	var Checkbox = React.createClass({

		
		onChange: function() {
			var value = React.findDOMNode(this.refs.checkbox).checked;
			this.props.onChange(value);
		},

		render: function() {
			return (
				<label className="checkbox">
					<input type="checkbox" ref="checkbox" checked={this.props.checked} onChange={this.onChange} />
					<div className="label">{this.props.label}</div>
				</label>
			);
		},

	});

	return Checkbox;

});