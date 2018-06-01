import React from 'react';
import { connect } from 'react-redux';

class CreateGame extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


handleSubmit() {
	this.props.dispatch({type:'server/create_game', data: this.props.account.account_id});
}

render() {
	return (
		<div>
			<h2>Create Game</h2>
			<button onClick={this.handleSubmit} name="create_game">Create Game</button>
		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		login: state.login
	}
}

export default connect(mapStateToProps)(CreateGame);
