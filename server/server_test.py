import os
from threading import Lock
from flask import  Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect


async_mode = None
app = Flask(__name__, static_folder="../static/dist",
                      template_folder="../static")
app.config['SECRET_KEY'] = 'secret'
sio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


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


if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=5000, debug=True)
