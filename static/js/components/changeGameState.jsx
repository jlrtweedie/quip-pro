import React from 'react';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

class ChangeGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name), data:
      {account_id: this.props.account.account_id, game_id: this.props.game.game_id}
    });
  }

  render() {
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="info">
            Game {this.props.game.room_id}
          </DropdownToggle>
          <DropdownMenu>
            {/*<DropdownItem>*/}
              <DropdownItem onClick={this.handleSubmit} name="start_game">Start Game</DropdownItem>
            {/*</DropdownItem>*/}
            {/*<DropdownItem>*/}
              <DropdownItem onClick={this.handleSubmit} name="delete_game">End Game</DropdownItem>
            {/*</DropdownItem>*/}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(ChangeGameState);
