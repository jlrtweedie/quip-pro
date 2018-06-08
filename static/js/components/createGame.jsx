import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class CreateGame extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

handleSubmit(e) {
	this.props.dispatch({type:'server/'.concat(e.target.name), data: this.props.account.account_id});
}

render() {
	return (
		<div>
			<Button color="info" onClick={this.handleSubmit} name="create_game">Create Game</Button>
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
