class Login extends React.Component {
  handleClick() {
    alert('Logged in');
  }

  render() {
    return <button onClick={this.handleClick}>Log in here</button>;
  }
}

ReactDOM.render(
  <Login />,
  $('#test')[0]
);
