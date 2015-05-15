define(function(require) {

	'use strict';

	var React = require('react');
	var ListItem = require('jsx!components/ui/list-item');

	var Finder = React.createClass({

		getInitialState: function () {
			return {
				result: [],
				term: '',
				loading: false,
				error: null
			};
		},

		render: function () {

			var content = '';

			if (this.state.result.length > 0) {

				var items = this.state.result.map(function (item) {
					return (<ListItem item={item} onSelect={this.onSelect} />);
				}.bind(this));
				content = (<div className="item scroll"><ul className="column padded">{items}</ul></div>);

			} else if (this.state.error) {
				content = (
					<div className="grail well item">
						<p className="strong item">Error</p>
						<p>{this.state.error}</p>
					</div>
				);

			} else if (this.state.loading) {
				content = (<div className="grail well item"><p className="spinner"></p></div>);
			} else {
				content = (<div className="item"></div>);
			}

			return (
				<div className="finder well item column padded">
					<div className="item item--fit header epic">Search</div>
					{content}
					<form className="item item--fit row padded" onSubmit={this.onSearch}>
						<div className="item input">
							<input type="text" value={this.state.term} onChange={this.onTermChange} />
						</div>
						<div className="item item--fit">
							<input type="submit" value="Search" className="btn btn--outine cta" />
						</div>
					</form>
				</div>
			);
		},

		onTermChange: function (e) {
			this.setState({term: e.target.value});
		},

		onSearch: function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ loading: true, result: [] });
			this.props.service.search(this.state.term).then(
				function(result){
					this.setState({
						loading: false,
						result: result,
						error: null,
					});
				}.bind(this), 
				function(error){
					this.setState({
						error: error,
						result: [],
						loading: false,
					});
				}.bind(this)
			);
		},

		onSelect: function (item) {
			this.props.onSelect(item);
		},

		clear: function() {
			this.setState({
				result: [],
				term: ''
			});
		},

	});

	return Finder;

});