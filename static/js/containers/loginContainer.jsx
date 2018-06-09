import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem } from 'reactstrap';

import Login from '../components/login.jsx';
import Logout from '../components/logout.jsx';
import CreateGame from '../components/createGame.jsx';
import ChangeGameState from '../components/changeGameState.jsx';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
		this.toggle = this.toggle.bind(this);
	}

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

	render() {
		const stateProps = this.props.store.getState().login;
		const account = stateProps.account;
		const game = stateProps.game;
		return (
      <div>
        <Navbar color="light" light expand="md">
        	<NavbarBrand>Quip Pro!</NavbarBrand>
        	<NavbarToggler onClick={this.toggle} />
        	<Collapse isOpen={this.state.isOpen} navbar>
				  	{ account === null ? (
        			<Nav className="ml-auto" navbar >
        				<NavItem>
				  				<Login />
				  			</NavItem>
				  		</Nav>
				  	) : (
				  		<Nav className="ml-auto" navbar >
				  			<NavItem>
								{ game === null ? (
									<CreateGame account={account} />
								) : (
									<ChangeGameState account={account} game={game} />
								) }
								</NavItem>
				  			<NavItem>
				  				<Logout account={account} />
				  			</NavItem>
				  		</Nav>
				  	) }
				  </Collapse>
				</Navbar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		login: state.login
	}
}

export default connect(mapStateToProps)(LoginContainer);
