import sys
import string
import random
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime
from bcrypt import hashpw, gensalt

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
	in_progress = db.Column(db.Boolean, default=False)
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
	node_id = db.Column(db.Integer, db.ForeignKey('playerprompts.node_id'))
	text = db.Column(db.String(24), nullable=True)

	player = db.relationship('Player', backref=db.backref('answers'))
	node = db.relationship('PlayerPrompt', backref=db.backref('answers'))

	def __repr__(self):
		return '<Answer {}: {}; Player {}, Node {}>'.format(
			self.answer_id, self.text, self.player_id, self.node_id)

	def serialize(self):
		return {
			'answer_id': self.answer_id,
			'player_id': self.player_id,
			'name': self.player.name,
			'prompt_id': self.node.prompt_id,
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

	password = hashpw('password'.encode('utf-8'), gensalt())

	account = Account(email='test@test.com', password=password.decode('utf-8'))
	game = Game(account=account, room_id='ABCD')

	p1 = Player(game=game, name='P1')
	p2 = Player(game=game, name='P2')
	p3 = Player(game=game, name='P3')
	p4 = Player(game=game, name='P4')
	p5 = Player(game=game, name='P5')
	p6 = Player(game=game, name='P6')
	p7 = Player(game=game, name='P7')
	p8 = Player(game=game, name='P8')

	pr1 = Prompt(text='Pr1')
	pr2 = Prompt(text='Pr2')
	pr3 = Prompt(text='Pr3')
	pr4 = Prompt(text='Pr4')
	pr5 = Prompt(text='Pr5')
	pr6 = Prompt(text='Pr6')
	pr7 = Prompt(text='Pr7')
	pr8 = Prompt(text='Pr8')

	n1 = PlayerPrompt(player=p1, prompt=pr1, next_id=2)
	n2 = PlayerPrompt(player=p2, prompt=pr2, next_id=3)
	n3 = PlayerPrompt(player=p3, prompt=pr3, next_id=4)
	n4 = PlayerPrompt(player=p4, prompt=pr4, next_id=5)
	n5 = PlayerPrompt(player=p5, prompt=pr5, next_id=6)
	n6 = PlayerPrompt(player=p6, prompt=pr6, next_id=7)
	n7 = PlayerPrompt(player=p7, prompt=pr7, next_id=8)
	n8 = PlayerPrompt(player=p8, prompt=pr8, next_id=1)

	a11 = Answer(player=p1, node=n1, text='A11')
	a12 = Answer(player=p1, node=n2, text='A12')
	a22 = Answer(player=p2, node=n2, text='A22')
	a23 = Answer(player=p2, node=n3, text='A23')
	a33 = Answer(player=p3, node=n3, text='A33')
	a34 = Answer(player=p3, node=n4, text='A34')
	a44 = Answer(player=p4, node=n4, text='A44')
	a45 = Answer(player=p4, node=n5, text='A45')
	a55 = Answer(player=p5, node=n5, text='A55')
	a56 = Answer(player=p5, node=n6, text='A56')
	a66 = Answer(player=p6, node=n6, text='A66')
	a67 = Answer(player=p6, node=n7, text='A67')
	a77 = Answer(player=p7, node=n7, text='A77')
	a78 = Answer(player=p7, node=n8, text='A78')
	a88 = Answer(player=p8, node=n8, text='A88')
	a81 = Answer(player=p8, node=n1, text='A81')

	v13 = Vote(player=p1, answer=a33)
	v14 = Vote(player=p1, answer=a44)
	v15 = Vote(player=p1, answer=a55)
	v16 = Vote(player=p1, answer=a66)
	v17 = Vote(player=p1, answer=a77)
	v18 = Vote(player=p1, answer=a88)

	v24 = Vote(player=p2, answer=a44)
	v25 = Vote(player=p2, answer=a55)
	v26 = Vote(player=p2, answer=a66)
	v27 = Vote(player=p2, answer=a77)
	v28 = Vote(player=p2, answer=a88)
	v21 = Vote(player=p2, answer=a11)

	v31 = Vote(player=p3, answer=a11)
	v32 = Vote(player=p3, answer=a22)
	v35 = Vote(player=p3, answer=a55)
	v36 = Vote(player=p3, answer=a66)
	v37 = Vote(player=p3, answer=a77)
	v38 = Vote(player=p3, answer=a88)

	v41 = Vote(player=p4, answer=a11)
	v42 = Vote(player=p4, answer=a22)
	v43 = Vote(player=p4, answer=a33)
	v46 = Vote(player=p4, answer=a66)
	v47 = Vote(player=p4, answer=a77)
	v48 = Vote(player=p4, answer=a88)

	v51 = Vote(player=p5, answer=a11)
	v52 = Vote(player=p5, answer=a22)
	v53 = Vote(player=p5, answer=a33)
	v54 = Vote(player=p5, answer=a44)
	v57 = Vote(player=p5, answer=a77)
	v58 = Vote(player=p5, answer=a88)

	v61 = Vote(player=p6, answer=a11)
	v62 = Vote(player=p6, answer=a22)
	v63 = Vote(player=p6, answer=a33)
	v64 = Vote(player=p6, answer=a44)
	v65 = Vote(player=p6, answer=a55)
	v68 = Vote(player=p6, answer=a88)

	v71 = Vote(player=p7, answer=a11)
	v72 = Vote(player=p7, answer=a22)
	v73 = Vote(player=p7, answer=a33)
	v74 = Vote(player=p7, answer=a44)
	v75 = Vote(player=p7, answer=a55)
	v76 = Vote(player=p7, answer=a66)

	v82 = Vote(player=p8, answer=a22)
	v83 = Vote(player=p8, answer=a33)
	v84 = Vote(player=p8, answer=a44)
	v85 = Vote(player=p8, answer=a55)
	v86 = Vote(player=p8, answer=a66)
	v87 = Vote(player=p8, answer=a77)

	db.session.add_all([
		account, game,
		p1, p2, p3, p4, p5, p6, p7, p8,
		pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8,
		n1, n2, n3, n4, n5, n6, n7, n8,
		a11, a12, a22, a23, a33, a34, a44, a45,
		a55, a56, a66, a67, a77, a78, a88, a81,
		v13, v14, v15, v16, v17, v18,
		v21, v24, v24, v26, v27, v28,
		v31, v32, v35, v36, v37, v37,
		v41, v42, v43, v46, v47, v48,
		v51, v52, v53, v54, v57, v58,
		v61, v62, v63, v64, v65, v68,
		v71, v72, v73, v74, v75, v76,
		v82, v83, v84, v85, v86, v87
		])
	db.session.commit()
	close_game(game)
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

def begin_game(game):
	"""Marks game as in progress and counts connected players"""
	game.in_progress = True
	game.num_players = len(game.players)
	db.session.commit()


def close_game(game):
	"""Ends a game by giving it a finish time and counts connected players"""
	game.in_progress = False
	game.finished_at = datetime.now()
	db.session.commit()


def assign_prompts(players):
	"""Creates PlayerPrompt nodes and populates their next fields"""
	nodes = []
	prompts = random.sample(Prompt.query.all(), len(players))
	for player in players:
		prompt = prompts.pop()
		nodes.append(PlayerPrompt(player_id=player.player_id,
								  prompt_id=prompt.prompt_id))
	random.shuffle(nodes)
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
		db.create_all()
	elif sys.argv[-1] == 'seed':
		db.create_all()
		example_data()
