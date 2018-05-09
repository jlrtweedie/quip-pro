import os
from threading import Lock
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
