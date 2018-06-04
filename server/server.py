import os
from threading import Lock
from flask import  Flask, render_template, session, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from model import Account, Game, Player, connect_to_db, commit_to_db, \
    generate_room_id
from bcrypt import checkpw, hashpw, gensalt
from datetime import datetime


async_mode = None
app = Flask(__name__, static_folder="../static/dist",
                      template_folder="../static")
app.config['SECRET_KEY'] = 'secret'
sio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

connect_to_db(app)

def background_thread():
    count = 0
    while True:
        sio.sleep(10)
        count += 1

@app.route('/')
def index():
    return render_template('index.html', async_mode=sio.async_mode)

@sio.on('action')
def socket_handler(action):

    if action['type'] == 'server/login':
        account = Account.query.filter(
            Account.email == action['data']['email']).first()
        if account and checkpw(action['data']['password'].encode('utf-8'),
                               account.password.encode('utf-8')):
            game = Game.query.filter(
                Game.account == account, Game.finished_at == None).first()
            login(account, game)
        else:
            error_message(action['type'], 'Invalid login')

    elif action['type'] == 'server/logout':
        logout()

    elif action['type'] == 'server/register':
        email = action['data']['email']
        password = action['data']['password']
        account = Account.query.filter(
            Account.email == email).first()
        if not account:
            password = hashpw(password.encode('utf-8'), gensalt())
            try:
                account = Account(email=email, password=password.decode('utf-8'))
            except AssertionError:
                error_message(action['type'], 'Invalid email address')
            else:
                commit_to_db(account)
                login(account)

    elif action['type'] == 'server/join_game':
        room_id = action['data']['room_id'].upper()
        name = action['data']['name']
        game = Game.query.filter(
            Game.room_id == room_id,
            Game.finished_at == None).first()
        if game:
            player = Player.query.filter(
                Player.game_id == game.game_id,
                Player.name == name).first()
            if not player and len(game.players) < 8:
                player =  Player(game=game, name=name)
                commit_to_db(player)
                join_game(game, player)
            elif not player and len(game.players) >= 8:
                error_message(action['type'], 'Game is full')
            else:
                error_message(action['type'], 'Duplicate name')
        else:
            error_message(action['type'], 'Invalid room')

    elif action['type'] == 'server/leave_game':
        player_id = action['data']['player_id']
        game_id = action['data']['game_id']
        player = Player.query.filter(Player.player_id == player_id).one()
        game = Game.query.filter(Game.game_id == game_id, Game.finished_at == None).one()
        commit_to_db(player, delete=True)
        leave_game(game)

    elif action['type'] == 'server/create_game':
        account_id = action['data']
        account = Account.query.filter(Account.account_id == account_id).one()
        active_game = Game.query.filter(
            Game.account == account,
            Game.finished_at == None).first()
        if not active_game:
            game = Game(account=account, room_id=generate_room_id())
            commit_to_db(game)
            login(account, game)
        else:
            error_message(action['type'], 'Game {} is active'.format(active_game.room_id))

    elif action['type'] == 'server/delete_game':
        account_id = action['data']['account_id']
        game_id = action['data']['game_id']
        account = Account.query.filter(Account.account_id == account_id).one()
        game = Game.query.filter(Game.game_id == game_id, Game.finished_at == None).one()
        game.finished_at = datetime.now()
        game.num_players = len(game.players)
        commit_to_db(game)
        delete_game(game)
        login(account)

    elif action['type'] == 'server/start_game':
        game_id = action['data']['game_id']
        game = Game.query.filter(Game.game_id == game_id, Game.finished_at == None).one()
        start_game(game)


def error_message(action_type, details):
    error = 'Unable to perform action: {}'.format(action_type)
    emit('action', {'type': 'message', 'data':
        {'message': error, 'details': details}
        })

def start_game(game):
    emit('action', {'type': 'message', 'data':
        {'message': 'Game {} is starting'.format(game.room_id), 'details': None}
        }, room=game.room_id, broadcast=True)
        

def login(account, game=None):
    account = account.serialize()
    if game:
        game = game.serialize()
    emit('action', {'type': 'login', 'data':
        {'account': account, 'game': game}
        })

def logout():
    emit('action', {'type': 'logout', 'data':
        {'account': None, 'game': None}
        })

def join_game(game, player):
    join_room(game.room_id)
    load_players(game)
    game = game.serialize()
    player = player.serialize()
    emit('action', {'type': 'join_game', 'data':
        {'game': game, 'player': player}
        })

def leave_game(game):
    leave_room(game.room_id)
    load_players(game)
    emit('action', {'type': 'leave_game', 'data':
        {'game': None, 'player': None}
        })

def delete_game(game):
    emit('action', {'type': 'leave_game', 'data':
        {'game': None, 'player': None}
        }, room=game.room_id, broadcast=True)
    close_room(game.room_id)

def load_players(game):
    emit('action', {'type': 'player_names', 'data':
        {'names': [player.name for player in game.players]}
        }, room=game.room_id, broadcast=True)



if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=5000, debug=True)
