import os
import json
import string
import random
from threading import Lock
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask_login import LoginManager
from model import Account, Game, Player, connect_to_db, commit_to_db, \
    generate_room_id
from bcrypt import checkpw, hashpw, gensalt
from datetime import datetime


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()
login_manager = LoginManager()
connect_to_db(app)


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


def background_thread():
    count = 0
    while True:
        socketio.sleep(10)
        count += 1

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.on('test_message', namespace='/test')
def test_message():
    emit('my_response', {'data': 'Test'})

@socketio.on('my_ping', namespace='/test')
def ping_pong():
    emit('my_pong')


@socketio.on('login', namespace='/test')
def login(message):
    account = Account.query.filter(Account.email == message['email']).first()
    if account and checkpw(message['password'].encode('utf-8'),
                           account.password.encode('utf-8')):
        session['logged_in'] = True
        emit('my_response', {'data': 'Logged in successfully'})
        emit('logged_in', {'data': account.email})
    else:
        emit('my_response', {'data': 'Invalid login'})

@socketio.on('logout', namespace='/test')
def logout(message):
    if session.get('logged_in'):
        session['logged_in'] = False
        emit('my_response', {'data': 'Logged out successfully'})
        emit('logged_out')

@socketio.on('register', namespace='/test')
def create_account(message):
    account = Account.query.filter(Account.email == message['email']).first()
    if account:
        emit('my_response', {'data':
             '{} is already a registered account'.format(message['email'])
             })
    else:
        password = hashpw(message['password'].encode('utf-8'), gensalt())
        try:
            account = Account(email=message['email'],
                              password=password.decode('utf-8'))
        except AssertionError:
            emit('my_response', {'data':
                 '{} is not a valid email address'.format(message['email'])
                 })
        else:
            commit_to_db(account)
            session['logged_in'] = True
            emit('my_response', {'data': 'Account created successfully'})
            emit('logged_in', {'data': account.email})


@socketio.on('join_game', namespace='/test')
def join_game(message):
    game = Game.query.filter(Game.room_id == message['room_id'].upper(),
                             Game.finished_at == None).first()
    if game:
        player = Player.query.filter(Player.game_id == game.game_id,
                                    Player.name == message['player_name']
                                    ).first()
        if not player and len(game.players) < 8:
            player = Player(game=game, name=message['player_name'])
            commit_to_db(player)
            session['active_player'] = player.player_id
            emit('my_response', {'data':
                 'Successfully joined game: {}'
                 .format(message['room_id'].upper())
                 })
            emit('joined_game', {'data': True})
        elif player:
            emit('my_response', {'data':
                 'The name {} is already taken'.format(message['player_name'])
                 })
        elif len(game.players) == 8:
            emit('my_response', {'data':
                 'Game {} is full'.format(message['room_id'].upper())
                 })
    else:
        emit('my_response', {'data':
             'Game {} does not exist'.format(message['room_id'].upper())
             })

@socketio.on('leave_game', namespace='/test')
def leave_game(message):
    game = Game.query.filter(Game.room_id == message['room_id'].upper(),
                             Game.finished_at == None).first()
    player = Player.query.filter(Player.game_id == game.game_id,
                                 Player.name == message['player_name']
                                 ).first()
    commit_to_db(player, delete=True)
    del session['active_player']
    emit('my_response', {'data':
         'Successfully left game: {}'.format(message['room_id'].upper())
         })
    emit('joined_game', {'data': False})


@socketio.on('load_game', namespace='/test')
def load_game(message):
    account = Account.query.filter(Account.email == message).first()
    game = Game.query.filter(Game.account == account,
                             Game.finished_at == None).first()
    if game:
        emit('display_game', {'room_id': game.room_id,
                              'started_at': json.dumps(game.started_at,
                                                       cls=DateTimeEncoder)
            })

@socketio.on('create_game', namespace='/test')
def create_game(message):
    account = Account.query.filter(Account.email == message).first()
    game = Game.query.filter(Game.account == account,
                             Game.finished_at == None).first()
    if not game:
        game = Game(account=account, room_id=generate_room_id())
        commit_to_db(game)
        load_game(message)
    else:
        emit('my_response', {'data':
             'Active game {} already exists'.format(game.room_id)
             })

@socketio.on('end_game', namespace='/test')
def end_game(message):
    game = Game.query.filter(Game.room_id == message['room_id'],
                             Game.finished_at == None).first()

    game.finished_at = datetime.now()
    game.num_players = len(game.players)
    commit_to_db()
    emit('display_game', {'room_id': '', 'started_at': ''})
    emit('my_response', {'data':
         'Ended game {}'.format(game.room_id)
         })


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
