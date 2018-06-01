import sys
import string
import random
from flask import Flask, jsonify
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

	p1 = Player(game=game, name='Player 1')
	p2 = Player(game=game, name='Player 2')
	p3 = Player(game=game, name='Player 3')
	p4 = Player(game=game, name='Player 4')
	# p5 = Player(game=game, name='Player 5')
	# p6 = Player(game=game, name='Player 6')
	# p7 = Player(game=game, name='Player 7')
	# p8 = Player(game=game, name='Player 8')

	db.session.add_all([account, game, p1, p2, p3, p4]) #, p5, p6, p7, p8])
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


if __name__ == '__main__':

	connect_to_db(app)
	if sys.argv[-1] == 'rebuild':
		example_data()
