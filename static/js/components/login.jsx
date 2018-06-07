import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Input, Button, Label } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      dropdownOpen: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleUserInput(e) {
    let data = Object.assign({}, this.state.data);
    data[e.target.name] = e.target.value;
    this.setState({data});
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name), data: this.state.data});
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        Login
      </DropdownToggle>
{/*        <Col>
        <Label>Login</Label>
        </Col>*/}
      <DropdownMenu>
      <Form>
        {/*<Col xs="4" sm={{size: 3}}>*/}
        <FormGroup>
          {/*<Label for="email">Email</Label>*/}
          <Input type="email" name="email" id="email" placeholder="email"
            onChange={this.handleUserInput} maxLength="64" />
        </FormGroup>
        {/*</Col>*/}
        {/*<Col xs="4" sm={{size: 3}}>*/}
        <FormGroup>
          {/*<Label for="password">Password</Label>*/}
          <Input type="password" name="password" id="password" placeholder="password"
            onChange={this.handleUserInput} maxLength="128" />
        </FormGroup>
        {/*</Col>*/}
        {/*<Col xs="4" sm={{size: 6}}>*/}
        <FormGroup>
          <Button color="primary" onClick={this.handleSubmit} name="login">Login</Button>&nbsp;
          <Button color="primary" onClick={this.handleSubmit} name="register">Register</Button>
        </FormGroup>
        {/*</Col>*/}
      </Form>
      </DropdownMenu>
      </Dropdown>
        // Email: <input type="text" onChange={this.handleUserInput}
        //          name="email" maxLength="64" />
        // Password: <input type="password" onChange={this.handleUserInput}
        //             name="password" maxLength="128" />
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login);
