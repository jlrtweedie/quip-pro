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

		// if (answers) {
		// 	let answerList = answers.map((answer, i) => {
		// 		return (
		// 			<div>
		// 				<Vote player={player} answer={answer}
		//          phase={phase} waiting={waiting} />
		// 				{ votes !== null ? (
		// 					votes.map((vote, i) => {
		// 						return <DisplayPlayers players={vote} />
		// 					})
		// 				) : (
		// 					<div></div>
		// 				) }
		// 			</div>
		// 		);
		// 	});
		// }

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
										<h2>Voting</h2>
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

		// return (
		// 	<div>
		// 		{	phase === 'answering' ? (
		// 			<div>
		// 				{ waiting === false ? (
		// 					<div>
		// 						{/* <h2>{prompt.text}</h2> */}
		// 						<Answer player={player} prompt={prompt} />
		// 					</div>
		// 				) : (
		// 					<div>
		// 						<h2>Waiting for other players...</h2>
		// 					</div>
		// 				) }
		// 			</div>
		// 		) : (
		// 			<div>
		// 			{ phase === 'voting' || 'tallying' ? (
		// 				<div>
		// 					{ waiting === false ? (
		// 						<div>
		// 							<h2>{prompt.text}</h2>
		// 							{ answerList }
		// 						</div>
		// 					) : (
		// 						<div></div>
		// 					) }
		// 				</div>
		// 			) : (
		// 				<div>
		// 					{ phase === 'ready' ? (
		// 						<Ready player={player} phase={phase} />
		// 					) : (
		// 						<div>
		// 							{/* <Ready player={player} phase={phase} /> */}
		// 						</div>
		// 					) }
		// 				</div>
		// 			) }
		// 			</div>
		// 		) }
		// 	</div>
		// )
	}
}

function mapStateToProps(state) {
	return {
		joinGame: state.joinGame,
		gameState: state.gameState
	}
}

export default connect(mapStateToProps)(GameStateContainer);
