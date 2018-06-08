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
        	{/*<NavbarToggler onClick={this.toggle} />*/}
        	{/*<Collapse isOpen={this.state.isOpen} navbar>*/}
        		<Nav className="ml-auto" navbar>
				  { account === null ? (
				  	
				  	<NavItem>
				  	<Login />
				  	</NavItem>
				  	
				  ) : (
				  		<div>
				  		<NavItem>
				  		<Logout account={account} />
				  		</NavItem>
				  		
							{ game === null ? (
								
								<NavItem>
								<CreateGame account={account} />
								</NavItem>
								
							) : (
								
								<NavItem>
								<ChangeGameState account={account} game={game} />
								</NavItem>
								
							) }
							</div>
				  ) }
				  </Nav>
				  {/*</Collapse>*/}

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
