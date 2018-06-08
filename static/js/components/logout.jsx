import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name)});
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Logout</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Logout</ModalHeader>
          <ModalBody>
            <h3>Logged in as: {this.props.account.email}</h3>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit} name="logout">Logout</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Logout);
