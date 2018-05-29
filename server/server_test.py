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
def test_message(action):

    if action['type'] == 'server/hello':
        print('Got hello data!', action['data'])
        emit('action', {'type': 'message', 'data': 'Good day!'})

    elif action['type'] == 'server/query':
        if action['data'] == 'account':
            object = Account.query.filter(Account.account_id == 1).one()
        elif action['data'] == 'game':
            object = Game.query.filter(Game.game_id == 1).one()
        elif action['data'] == 'player':
            object = Player.query.filter(Player.player_id == 1).one()
        data = object.serialize()
        emit('action', {'type': 'response', 'data': data})

    elif action['type'] == 'server/login':
        account = Account.query.filter(Account.email ==
                                       action['data']['email']).first()
        if account and checkpw(action['data']['password'].encode('utf-8'),
                               account.password.encode('utf-8')):
            data = account.serialize()
            emit('action', {'type': 'account', 'data': data})
            emit('action', {'type': 'message', 'data': 'Logged in successfully'})
            emit('action', {'type': 'login', 'data': True})
        else:
            emit('action', {'type': 'message', 'data': 'Invalid login'})
            emit('action', {'type': 'login', 'data': False})



if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=5000, debug=True)
