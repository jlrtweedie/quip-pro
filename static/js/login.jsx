class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
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
    socket.emit(e.target.name, this.state.formData);
  }

  render() {
    socket.on('logged_in', () => {
      this.setState({loggedIn: true});
    });
    socket.on('logged_out', () => {
      this.setState({loggedIn: false});
    });

    if (!this.state.loggedIn) {
      return (
        <div>
          <input type="text" onChange={this.handleUserInput} name="email" />
          <input type="password" onChange={this.handleUserInput} name="password" />
          <button onClick={this.handleSubmit} name="login">Login</button>
          <button onClick={this.handleSubmit} name="register">Register</button>
        </div>
      );
    } else {
      return (
        <div>
          Logged in as: {this.state.formData['email']} &nbsp;
          <button onClick={this.handleSubmit} name="logout">Logout</button>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
);
