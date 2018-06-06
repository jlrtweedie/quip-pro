import sys
import string
import random
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime
from bcrypt import hashpw, gensalt
from random import sample, shuffle

app = Flask(__name__)
db = SQLAlchemy()


class Account(db.Model):
	"""User account information."""

	__tablename__ = 'accounts'

	account_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	email = db.Column(db.String(64), unique=True)
	password = db.Column(db.String(128))

	def __repr__(self):
		return '<Account {} [{}]>'.format(self.account_id, self.email)

	def serialize(self):
		return {
			'account_id': self.account_id,
			'email': self.email
		}

	@validates('email')
	def validate_email(self, key, accounts):
		assert '@' in accounts
		return accounts


class Game(db.Model):
	"""Table containing all games."""

	__tablename__ = 'games'

	game_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	account_id = db.Column(db.Integer, db.ForeignKey('accounts.account_id'))
	room_id = db.Column(db.String(4))
	started_at = db.Column(db.DateTime, default=datetime.now())
	finished_at = db.Column(db.DateTime, nullable=True)
	num_players = db.Column(db.Integer, nullable=True)

	account = db.relationship('Account', backref=db.backref('games'))

	def __repr__(self):
		if not self.finished_at:
			return '<Game {} started at {}>'.format(self.game_id,
													self.started_at)
		else:
			return '<Game {} finished at {}>'.format(self.game_id,
													 self.finished_at)

	def serialize(self):
		return {
			'game_id': self.game_id,
			'account_id': self.account_id,
			'room_id': self.room_id
		}


class Player(db.Model):
	"""Defines a player connected to a game."""

	__tablename__ = 'players'

	player_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	game_id = db.Column(db.Integer, db.ForeignKey('games.game_id'))
	name = db.Column(db.String(12))
	score = db.Column(db.Integer, default=0)

	game = db.relationship('Game', backref=db.backref('players'))

	def __repr__(self):
		return '<Player {} connected to game {}>'.format(self.player_id,
		self.game_id)

	def serialize(self):
		return {
			'player_id': self.player_id,
			'game_id': self.game_id,
			'name': self.name
		}


class Prompt(db.Model):
	"""An individual prompt question"""

	__tablename__ = 'prompts'

	prompt_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	text = db.Column(db.String(64), unique=True)

	def __repr__(self):
		return '<Prompt {}: {}>'.format(self.prompt_id, self.text)

	def serialize(self):
		return {
			'prompt_id': self.prompt_id,
			'text': self.text
		}


class PlayerPrompt(db.Model):
	"""A player/prompt pair node"""

	__tablename__ = 'playerprompts'

	node_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'))
	prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.prompt_id'))
	next_id = db.Column(db.Integer, nullable=True)

	player = db.relationship('Player', backref=db.backref('playerprompts'))
	prompt = db.relationship('Prompt')

	def __repr__(self):
		return '<Node {}, Player {}, Prompt {}, Next {}>'.format(
			self.node_id, self.player_id, self.prompt_id, self.next_id)

	def serialize(self):
		return {
			'node_id': self.node_id,
			'player_id': self.player_id,
			'prompt_id': self.prompt_id,
			'next_id': self.next_id
		}


class Answer(db.Model):
	"""An answer to a prompt"""

	__tablename__ = 'answers'

	answer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'))
	prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.prompt_id'))
	text = db.Column(db.String(24), nullable=True)

	player = db.relationship('Player', backref=db.backref('answers'))
	prompt = db.relationship('Prompt')

	def __repr__(self):
		return '<Answer {}: {}; Player {}, Prompt {}>'.format(
			self.answer_id, self.text, self.player_id, self.prompt_id)

	def serialize(self):
		return {
			'answer_id': self.answer_id,
			'player_id': self.player_id,
			'prompt_id': self.prompt_id,
			'text': self.text
		}


class Vote(db.Model):
	"""A vote for an answer to a prompt from a given player"""

	__tablename__ = 'votes'

	vote_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'))
	answer_id = db.Column(db.Integer, db.ForeignKey('answers.answer_id'))

	player = db.relationship('Player', backref=db.backref('votes'))
	answer = db.relationship('Answer', backref=db.backref('votes'))

	def __repr__(self):
		return '<Vote {}, Player {}, Answer {}>'.format(
			self.vote_id, self.player_id, self.answer_id)

	def serialize(self):
		return {
			'vote_id': self.vote_id,
			'player_id': self.player_id,
			'answer_id': self.answer_id
		}


################################################################################


def connect_to_db(app, db_uri='postgresql:///quippro'):
	"""Connect app to database."""

	app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	db.app = app
	db.init_app(app)
	print('Connected to DB.')


def example_data():
	"""Seeds test data."""

	db.create_all()

	password = hashpw('password'.encode('utf-8'), gensalt())

	account = Account(email='test@test.com', password=password.decode('utf-8'))
	game = Game(account=account, room_id='ABCD')

	# p1 = Player(game=game, name='Player 1')
	# p2 = Player(game=game, name='Player 2')
	# p3 = Player(game=game, name='Player 3')
	# p4 = Player(game=game, name='Player 4')

	pr1 = Prompt(text='Prompt 1')
	pr2 = Prompt(text='Prompt 2')
	pr3 = Prompt(text='Prompt 3')
	pr4 = Prompt(text='Prompt 4')
	pr5 = Prompt(text='Prompt 5')
	pr6 = Prompt(text='Prompt 6')
	pr7 = Prompt(text='Prompt 7')
	pr8 = Prompt(text='Prompt 8')

	db.session.add_all([account, game, # p1, p2, p3, p4,
		pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8])
	db.session.commit()
	print('Test data seeded.')


def commit_to_db(item=None, delete=False):
	"""Commits objects to database."""

	if item and not delete:
		db.session.add(item)
	elif item and delete:
		db.session.delete(item)
	db.session.commit()


def generate_room_id():
	"""Generates a random 4 character string for a unique room ID."""
	while True:
		room_id = ''.join(random.choice(string.ascii_uppercase)
						  for k in range(4))
		if not Game.query.filter(Game.room_id == room_id,
								 Game.finished_at == None).first():
			return room_id


def close_game(game):
	"""Ends a game by giving it a finish time and counts connected players"""
	game.finished_at = datetime.now()
	game.num_players = len(game.players)
	commit_to_db()


def assign_prompts(players):
	"""Creates PlayerPrompt nodes and populates their next fields"""
	nodes = []
	prompts = sample(Prompt.query.all(), len(players))
	for player in players:
		prompt = prompts.pop()
		nodes.append(PlayerPrompt(player_id=player.player_id,
								  prompt_id=prompt.prompt_id))
	shuffle(nodes)
	db.session.add_all(nodes)
	db.session.commit()

	for i, node in enumerate(nodes):
		node.next_id = nodes[i-1].node_id
	db.session.commit()


def score_answers(answer1, answer2):
	"""Assigns a score to answers based on the fraction of votes received"""
	p1 = Player.query.filter(Player.player_id == answer1.player_id).one()
	p2 = Player.query.filter(Player.player_id == answer2.player_id).one()
	v1 = len(answer1.votes)
	v2 = len(answer2.votes)
	if v1 + v2 == 0:
		return None
	p1.score += int(round((1000 * v1 / (v1 + v2)), -1))
	if v2 == 0 and v1 != 0:
		p1.score += 500
	p2.score += int(round((1000 * v2 / (v1 + v2)), -1))
	if v1 == 0 and v2 != 0:
		p2.score += 500
	db.session.commit()


def get_winner(game):
	"""Returns the player with the highest score"""
	return Player.query.filter(Player.game == game).order_by(Player.score).first()


################################################################################

if __name__ == '__main__':

	connect_to_db(app)
	if sys.argv[-1] == 'rebuild':
		example_data()
