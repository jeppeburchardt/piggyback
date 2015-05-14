define(function(require) {

	var React = require('react');

	var Mashead = React.createClass({


		render: function() {

			return(
				<div className="masthead item item--fit row">
					<div className="brand item">The Piggyback Lounge</div>
					<div className="item item--fit">{this.props.title}</div>
					<div className="item"></div>
				</div>
			);

		},

	});

	return Mashead;

});