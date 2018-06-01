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

    # if action['type'] == 'server/hello':
    #     print('Got hello data!', action['data'])
    #     emit('action', {'type': 'message', 'data': 'Good day!'})

    # elif action['type'] == 'server/query':
    #     account = None
    #     game = None
    #     player = None
    #     if action['data'] == 'account':
    #         account = Account.query.filter(Account.account_id == 1).one()
    #         account = account.serialize()
    #     elif action['data'] == 'game':
    #         game = Game.query.filter(Game.game_id == 1).one()
    #         account = game.serialize()
    #     elif action['data'] == 'player':
    #         player = Player.query.filter(Player.player_id == 1).one()
    #         account = player.serialize()
    #     emit('action', {'type': 'query', 'data':
    #         {'account': account, 'game': game, 'player': player}
    #         })

    if action['type'] == 'server/login':
        if action['data'] is None:
            logout()
        else:
            account = Account.query.filter(
                Account.email == action['data']['email']).first()
            if account and checkpw(action['data']['password'].encode('utf-8'),
                                   account.password.encode('utf-8')):
                account = account.serialize()
                emit('action', {'type': 'login', 'data':
                    {'login': True, 'account': account}
                    })
            else:
                logout()

    elif action['type'] == 'server/join_game':
        if action['data'] is None:
            leave_game()
        else:
            room_id = action['data']['room_id'].upper()
            game = Game.query.filter(
                Game.room_id == room_id,
                Game.finished_at == None).first()
            if game:
                player = Player.query.filter(
                    Player.game_id == game.game_id,
                    Player.name == action['data']['name']).first()
                if not player:
                    player =  Player(game=game, name=action['data']['name'])
                    commit_to_db(player)
                    player_names = [player_name.name for player_name in game.players]

                    game = game.serialize()
                    player = player.serialize()
                    join_room(room_id)
                    emit('action', {'type': 'join_game', 'data':
                        {'join_game': True, 'game': game, 'player': player}
                        })
                    print('Join Game')
                    emit('action', {'type': 'player_names', 'data':
                        {'player_names': player_names}
                        }, room=room_id, broadcast=True)
                    print('Player Names')
                else:
                    leave_game()
            else:
                leave_game()

    elif action['type'] == 'server/load_players':
        game = Game.query.filter(
            Game.game_id == action['data']['game_id']).one()
        pass



def logout():
    return emit('action', {'type': 'login', 'data':
    {'login': False, 'account': None}
    })

def leave_game():
    return emit('action', {'type': 'join_game', 'data':
    {'join_game': False, 'game': None, 'player': None}
    })


if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=5000)
