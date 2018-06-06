import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

// import Prompt from '../components/prompt.jsx';
import Ready from '../components/ready.jsx';
import Answer from '../components/answer.jsx';
// import Vote from '../components/vote.jsx';
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
		// 				<Vote prompt={prompt} answer={answer} />
		// 				{ votes !== null ? (
		// 					votes.map((vote, i) => {
		// 						return <Tally answer={answer} vote={vote} />
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
				{	phase === 'answering' ? (
					<div>
						{ waiting === false ? (
							<div>
								<h2>{prompt.text}</h2>
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
					{ phase === 'voting' || 'tallying' ? (
						<div>
							<h2>{prompt.text}</h2>
							{ waiting === false ? (
								<div>{ answerList }</div>
							) : (
								<div></div>
							) }
						</div>
					) : (
						<div>
							{ phase === 'scoreboard' ? (
								<div>{ scoreList }</div>
							) : (
								<div>
									<Ready player={player} phase={phase} />
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
