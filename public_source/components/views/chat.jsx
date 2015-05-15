define(function(require) {

	'use strict';

	var React = require('react');

	var Chat = React.createClass({

		getInitialState: function () {
			return {
				entries: [],
				input: ''
			};
		},

		componentDidMount: function () {
			this.props.service.onChatMessage = this.onChatMessage;
		},

		componentWillUpdate: function() {
			var node = React.findDOMNode(this.refs.scroll);
			this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
		},

		componentDidUpdate: function() {
			if (this.shouldScrollBottom) {
				var node = React.findDOMNode(this.refs.scroll);
				node.scrollTop = node.scrollHeight;
			}
		},

		onChatMessage: function (item) {
			this.setState({
				entries: this.state.entries.concat([item])
			});
		},

		onChangeInput: function (e) {
			this.setState({
				input: e.target.value
			});
		},

		onFormSubmit: function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.props.service.chat(this.state.input);
			this.setState({
				input: ''
			});
		},

		renderEntry: function (entry) {
			if (entry.sender !== -1) {
				return (
					<div className="chat-entry">
						<div className="nerf">{entry.listener.name}:</div>
						<p>{entry.message}</p>
					</div>
				);
			} else {
				return (
					<div className="chat-entry">
						<p className="nerf cta">{entry.message}</p>
					</div>
				);
			} 
		},

		render: function () {

			var entries = this.state.entries.map(this.renderEntry);

			return(
				<div className="chat well item column padded">
					<div className="item item--fit header epic">Chat</div>
					<div className="item scroll" ref="scroll">
						{entries}
					</div>
					<div className="item item--fit">
					<form className="item item--fit row padded" onSubmit={this.onFormSubmit}>
						<div className="item input">
							<input type="text" value={this.state.input} onChange={this.onChangeInput} />
						</div>
						<div className="item item--fit">
							<input type="submit" value="Talk" className="btn cta" />
						</div>
					</form>
					</div>
				</div>
			);

		},

	});

	return Chat;

});