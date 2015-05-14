define(function(require){

	var React = require('react');

	var Checkbox = React.createClass({

		getInitialState: function() {
			return { isChecked: this.props.checked };
		},

		onChange: function() {
			this.setState({isChecked: !this.state.isChecked});
			this.props.onChange(this.state.isChecked);
		},

		render: function() {
			return (
				<label className="checkbox">
					<input type="checkbox" checked={this.props.checked} onChange={this.onChange} />
					<div className="label">{this.props.label}</div>
				</label>
			);
		},

	});

	return Checkbox;

});