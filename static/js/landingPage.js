import React from 'react';

import Login from './login.jsx';
import JoinGame from './joinGame.jsx';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Quip Pro</h1>
      {/* <Login /> */}
        <JoinGame />
      </div>
    )
  }
}

export default LandingPage;
