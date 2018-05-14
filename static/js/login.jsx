class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userEmail: '',
        userPassword: ''
      },
      loggedIn: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    let formData = Object.assign({}, this.state.formData);
    formData[e.target.name] = e.target.value;
    this.setState({formData});
  }

  handleSubmit(e) {
    if (!this.state.loggedIn) {
      socket.emit('login', {
        email: this.state.formData['userEmail'],
        password: this.state.formData['userPassword']
      });
    } else {
      socket.emit('logout');
    }
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <input type="text" onChange={this.handleUserInput} name="userEmail" />
          <input type="password" onChange={this.handleUserInput} name="userPassword" />
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleSubmit}>Logout</button>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
);
