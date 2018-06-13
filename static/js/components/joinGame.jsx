import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, Input, Col } from 'reactstrap';

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        room_id: '',
        name: ''
      }
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div>
      <br />
      <br />
      <Col sm={{size:8, offset:2}}>
      <Jumbotron>
        <h2>Join Game</h2>
        <Form>
        <FormGroup>
        <Input type="text" onChange={this.handleUserInput}
          placeholder="Name" name="name" maxLength="12" />&nbsp;
        <Input type="text" onChange={this.handleUserInput}
          placeholder="Room Code" name="room_id" maxLength="4" />&nbsp;
        </FormGroup>
        <Button color="success" onClick={this.handleSubmit} name="join_game">Join Game</Button>
        </Form>
      </Jumbotron>
      </Col>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    join_game: state.join_game
  }
}

export default connect(mapStateToProps)(JoinGame);
