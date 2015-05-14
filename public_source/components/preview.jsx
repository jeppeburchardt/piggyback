define(function(require) {

	var React = require('react');
	var Player = require('jsx!views/player');
	var CTG = React.addons.CSSTransitionGroup;

	var Preview = React.createClass({


		render: function () {

			var modal = [];

			if (this.props.content) {
							
				modal.push((
					<div className="modal grail" key={this.props.content.id}>
						<div className="modal-content column padded-large item ite--fit">
							<Player content={this.props.content} />
							<div className="row item item--fit padded-large">
								<button onClick={this.onClickCancel} className="item btn btn--outlined epic">Cancel</button>
								<button onClick={this.onClickConfirm} className="item btn btn--outlined cta epic">{this.props.label}</button>
							</div>
						</div>
					</div>
				));
			};

			return(
				<CTG transitionName="modal">
					{modal}
				</CTG>
			);
			// return (<div>{modal}</div>);

		},

		onClickCancel: function () {
			this.props.onCancel(this.props.content);
		},

		onClickConfirm: function () {
			this.props.onConfirm(this.props.content);
		},

	});

	return Preview;

});