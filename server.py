import os
from threading import Lock
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask_login import LoginManager
from model import Account, Game, Player, connect_to_db
from bcrypt import checkpw


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()
login_manager = LoginManager()
connect_to_db(app)


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
    # print(message)
    account = Account.query.filter(Account.email == message['email']).first()
    if session.get('logged_in'):
        emit('my_response', {'data': 'You are already logged in'})
    elif account and checkpw(message['password'].encode('utf-8'),
                           account.password.encode('utf-8')):
        session['logged_in'] = True
        emit('my_response', {'data': 'Logged in successfully'})
    else:
        emit('my_response', {'data': 'Invalid login'})

@socketio.on('logout', namespace='/test')
def logout():
    if session.get('logged_in'):
        session['logged_in'] = False
        emit('my_response', {'data': 'Logged out successfully'})
    else:
        emit('my_response', {'data': 'You are not logged in'})


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
