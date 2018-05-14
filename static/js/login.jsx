class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userEmail: '',
        userPassword: ''
      }
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
    socket.emit('login', {
      email: this.state.formData['userEmail'],
      password: this.state.formData['userPassword']
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleUserInput} name="userEmail" default="Email" />
        <input type="password" onChange={this.handleUserInput} name="userPassword" default="Password" />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
);
