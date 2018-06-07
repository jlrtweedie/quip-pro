# Quip Pro

Quip Pro is a social word game for three to eight players where players give short, silly answers to a set of prompts, and then vote for their favorite answers to prompts answered by other players. No login is required to play - simply enter a name and a room's four-letter code on your personal device to join the fun. This project was inspired by the popular games Quiplash and Quiplash 2, developed by Jackbox Games.

## Contents

* [Tech Stack](#tech)
* [Features](#features)
* [Installation](#install)

## <a name="tech"></a>Tech Stack

### Back End
* Python
* PostgreSQL
* SQLAlchemy
* Flask
* Socket.IO

### Front End
* React
* Redux
* Socket.IO
* Bootstrap

Quip Pro utilizes Socket.IO to maintain asynchronous, bidirectional client/server communication to both manage client state and relay database requests. The implementation allows for many games to be run concurrently and for players in games to receive data at both the individual and game level.

## <a name="features"></a>Features

Players can join games from the app's landing page by entering a name and a room's unique four-letter code, without logging in or registering a user account.

Users can register for or log into an existing user account, which allows for the creation of new games.

Once a player connects to a game, they will be shown a list of all other connected players. The game's host can begin the game when there are three or more players connected.

Players each receive a different set of prompts, and each prompt is answered by two players. Those answers are put up against one another in head-to-head voting.

During the voting phase, players can vote for their favorite answers to all prompts they themselves did not answer. The answers are anonymized during voting.

Once all eligible players have voted on a given prompt, the authors of each answer are revealed, along with which other players voted for which answer.

After every prompt has been voted on, the game concludes with a scoreboard and displays the game's winner.

## <a name="install"></a>Installation

1. [Install PostgreSQL](https://www.postgresql.org/download/)
2. Clone this repository:
```
$ git clone https://github.com/jlrtweedie/quip-pro.git
```
3. Create a Python virtual environment and install all Python dependencies:
```
$ virtualenv env -p python3
$ source env/bin/activate
$ pip install -r requirements.txt
```
4. Install all Node dependencies via npm:
```
$ npm i
```
5. Create a database:
```
$ createdb quippro
$ python server/model.py rebuild
```
6. Run the build script to compile all React components via Webpack:
```
$ npm run build
```
7. Launch the server and connect to localhost:5000 in your browser:
```
$ python server/server.py
```
