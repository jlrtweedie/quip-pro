class DisplayGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      loaded: false
    };
  }

  render() {
    socket.on('logged_in', (msg) => {
      this.setState({
        account: msg.data,
        loaded: true
      });
    });
    socket.on('logged_out', () => {
      this.setState({
        account: '',
        loaded: false
      });
    });
    if (this.state.loaded) {
      return <p>Logged in as: {this.state.account}</p>
    } else {
      return <p>You are not logged in</p>
    }
  }
}

ReactDOM.render(
  <DisplayGames />,
  document.getElementById('display-games')
);
