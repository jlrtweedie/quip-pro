import os
from threading import Lock
from flask import  Flask, render_template, session, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from model import Account, Game, Player, connect_to_db, commit_to_db, \
    generate_room_id
from bcrypt import checkpw


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
        if action['data'] is None:
            logout()
        else:
            account = Account.query.filter(
                Account.email == action['data']['email']).first()
            if account and checkpw(action['data']['password'].encode('utf-8'),
                                   account.password.encode('utf-8')):
                login(account)
            else:
                error_message(action['type'])

    elif action['type'] == 'server/join_game':
        if action['data'] is None:
            print(action)
            player_id = action['handle']['player_id']
            game_id = action['handle']['game_id']
            player = Player.query.filter(Player.player_id == player_id).one()
            game = Game.query.filter(Game.game_id == game_id).one()
            commit_to_db(player, delete=True)
            leave_game(game)
        else:
            room_id = action['data']['room_id'].upper()
            name = action['data']['name']
            game = Game.query.filter(
                Game.room_id == room_id,
                Game.finished_at == None).first()
            if game:
                player = Player.query.filter(
                    Player.game_id == game.game_id,
                    Player.name == name).first()
                if not player:
                    player =  Player(game=game, name=name)
                    commit_to_db(player)
                    join_game(game, player)
                else:
                    error_message(action['type'])
            else:
                error_message(action['type'])


def error_message(action_type):
    error = 'Unable to perform action: {}'.format(action_type)
    return emit('action', {'type': 'message', 'data':
        {'message': error}
        })

def login(account):
    account = account.serialize()
    return emit('action', {'type': 'login', 'data':
        {'login': True, 'account': account}
        })

def logout():
    return emit('action', {'type': 'login', 'data':
        {'login': False, 'account': None}
        })

def join_game(game, player):
    join_room(game.room_id)
    load_players(game)
    game = game.serialize()
    player = player.serialize()
    return emit('action', {'type': 'join_game', 'data':
        {'join_game': True, 'game': game, 'player': player}
        })

def leave_game(game):
    leave_room(game.room_id)
    load_players(game)
    return emit('action', {'type': 'join_game', 'data':
        {'join_game': False, 'game': None, 'player': None}
        })

def load_players(game):
    return emit('action', {'type': 'player_names', 'data':
        {'player_names': [player.name for player in game.players]}
        }, room=game.room_id, broadcast=True)
    


if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=5000)
