import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';
// import { Jumbotron, Col } from 'reactstrap';

import Ready from '../components/ready.jsx';
import Answer from '../components/answer.jsx';
import Vote from '../components/vote.jsx';
import DisplayPlayers from '../components/displayPlayers.jsx';
// import Scoreboard from '../components/scoreboard.jsx';

class GameStateContainer extends React.Component {
	render() {
		const stateProps = this.props.store.getState();
		const game = stateProps.joinGame.game;
		const player = stateProps.joinGame.player;
		const phase = stateProps.gameState.phase;
		const waiting = stateProps.gameState.waiting;
		const prompt = stateProps.gameState.prompt;
		const answers = stateProps.gameState.answers;
		const votes = stateProps.gameState.votes;
		const scores = stateProps.gameState.scores;

		//
		// if (scores) {
		// 	let scoreList = scores.map((score, i) => {
		// 		return <Scoreboard player={player} score={score} />
		// 	});
		// }

		return (
			<div>
				{ phase === 'ready' ? (
					<div>
						<Ready player={player} phase={phase} />
					</div>
				) : (
					<div>
						{ phase === 'answering' ? (
							<div>
								{ waiting === false ? (
									<div>
										<h3>{prompt.text}</h3>
										<Answer player={player} prompt={prompt} />
									</div>
								) : (
									<div>
										<h3>Waiting for other players...</h3>
									</div>
								) }
							</div>
						) : (
							<div>
								{ phase === 'voting' ? (
									<div>
									<h2>{prompt.text}</h2>
										{ answers.map((answer, i) =>
											<div key={i}>
											<Vote key={i+2} player={player} answer={answer} waiting={waiting}
												answerers={answers.map((answer, i) => answer['player_id'])} />
											<br key={i+4}/>
											</div>
										) }
									</div>
								) : (
									<div>
										{ phase === 'tallying' ? (
											<div>
											<h2>{prompt.text}</h2>
												{ answers.map((answer, i) => {
													return (
														<div key={i}>
															<h2 key={i+2}>{answer.name}</h2>
															<Vote key={i+4} player={player} answer={answer} waiting={waiting}
																answerers={answers.map((answer, i) => answer['player_id'])} />
															<DisplayPlayers key={i+6} names={votes[i]} />
														</div>
													) }
												) }
											</div>
										) : (
											<div></div>
										) }
									</div>
								) }
							</div>
						) }
					</div>
				) }
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		joinGame: state.joinGame,
		gameState: state.gameState
	}
}

export default connect(mapStateToProps)(GameStateContainer);
