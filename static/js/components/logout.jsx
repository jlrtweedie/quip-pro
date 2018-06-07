import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Button, Label } from 'reactstrap';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name)});
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Logout
        </DropdownToggle>
      <DropdownMenu>
      <Form>
        <Label>Logged in as: {this.props.account.email}</Label>
        <FormGroup>
          <Button color="primary" onClick={this.handleSubmit} name="logout">Logout</Button>
        </FormGroup>
      </Form>
      </DropdownMenu>
      </Dropdown>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Logout);
