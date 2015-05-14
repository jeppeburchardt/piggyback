define(function (require) {

	'use strict';

	var React = require('react');

	var SignIn = React.createClass({

		getInitialState: function () {
			return { name: '' };
		},

		componentDidMount: function () {
			React.findDOMNode(this.refs.nameInput).focus();
		},

		render: function () {
			return (
				<form onSubmit={this.onFormSubmit} className="sign-in grail grail--epic">
					<p className="epic item">What´s your name?</p>
					<div className="input item"><input className="epic" type="text" name="name" ref="nameInput" value={this.state.name} onChange={this.onNameChange} /></div>
					<input type="submit" value="Enter" className="btn cta btn--outlined epic item" />
				</form>
			);
		},

		onNameChange: function (e) {
			this.setState({name: e.target.value});
		},

		onFormSubmit: function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.props.onNameChange(this.state.name);
		},

	});

	return SignIn;

});