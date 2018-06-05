import random as rand


PROMPTS = {
	"Prompt 1",
	"Prompt 2",
	"Prompt 3",
	"Prompt 4",
	"Prompt 5",
	"Prompt 6",
	"Prompt 7",
	"Prompt 8"
}

PLAYERS = {
	"Player 1",
	"Player 2",
	"Player 3",
	"Player 4",
}


class Prompt():
	"""Prompt container"""

	def __init__(self, _prompt):
		self._prompt = _prompt

	def __repr__(self):
		return '<Prompt: {}>'.format(self._prompt)


class Answer():
	"""Answer container"""

	def __init__(self, _answer, player):
		self._answer = _answer
		self.player = player
		self.voters = []

	def __repr__(self):
		return '<Answer: {}; Player: {}>'.format(self._answer, self.player)


class Vote():
	"""Vote container"""

	def __init__(self, player, prompt, answer):
		self.player = player
		self.prompt = prompt
		self.answer = answer

	def __repr__(self):
		return '<Vote by {player} on {prompt} for {answer}>'.format(
			self.player, self.prompt, self.answer)

class PromptNode():
	"""A node pair for a prompt and a player"""

	def __init__(self, _prompt, player):
		self._prompt = Prompt(_prompt)
		self.player = player
		self.next = None

	def __repr__(self):
		return '<{}; Player: {}>'.format(self._prompt, self.player)


class PromptAssignment():
	"""A graph structure holding prompt and player pairs"""

	def __init__(self, players):
		self.nodes = []
		self.prompts = rand.sample(PROMPTS, len(players))
		for player in players:
			_prompt = self.prompts.pop()
			self.nodes.append(PromptNode(_prompt, player))
		for i, node in enumerate(self.nodes):
			node.next = self.nodes[i-1]

