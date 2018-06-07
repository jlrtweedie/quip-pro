import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import DisplayPlayers from '../components/displayPlayers.jsx';
import Ready from '../components/ready.jsx';
import Answer from '../components/answer.jsx';
import Vote from '../components/vote.jsx';
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
										<Answer player={player} prompt={prompt} />
									</div>
								) : (
									<div>
										<h2>Waiting for other players...</h2>
									</div>
								) }
							</div>
						) : (
							<div>
								{ phase === 'voting' ? (
									<div>
										{ answers.map((answer, i) =>
											<Vote key={i} player={player} answer={answer} waiting={waiting}
												answerers={answers.map((answer, i) => answer['player_id'])} />
										) }
									</div>
								) : (
									<div>
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
