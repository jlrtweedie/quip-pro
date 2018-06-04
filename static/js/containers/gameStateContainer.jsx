import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

class GameStateContainer extends React.Component {
	render() {
		const stateProps = this.props.store.getState();
		const game = stateProps.gameState.game;
		const player = stateProps.gameState.player;
		const prompt = stateProps.gameState.prompt;
		const answers = stateProps.gameState.answers;
		const scores = stateProps.gameState.scores;
		const phase = stateProps.gameState.phase;
		const waiting = stateProps.gameState.waiting;

		if (answers) {
			let answerList = answers.map((answer, i) => {
				return <Vote prompt={prompt} answer={answer} />
			});
		}

		if (scores) {
			let scoreList = scores.map((score, i) => {
				return <Scoreboard player={player} score={score} />
			});
		}

		return (
			<div>
				{	phase === 'answering' ? (
					<Prompt prompt={prompt} />
					<div>
						{ waiting === false ? (
							<Answer game={game} player={player} prompt={prompt} />
						) : (
							<div></div>
						) }
					</div>
				) : (
					<div>
					{ phase === 'voting' ? (
						<Prompt prompt={prompt} />
						<div>
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
								<div></div>
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
		gameState: state.gameState
	}
}

export default connect(mapStateToProps)(GameStateContainer);