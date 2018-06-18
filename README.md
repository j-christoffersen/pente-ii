# pente-ii
A web version of [PENTE](https://en.wikipedia.org/wiki/Pente). The game features an AI opponent, designed using the minimax algorithm with [alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning).

## [Play](https://j-christoffersen.github.io/pente-ii/)

# About this project
The original version of this game was created as my submission for the fial project for CS50, HarvardX's Intro to CS MOOC. Since then, I have greatly imporved upon my software and algorithm design skills and wanted to rewrite the code to be cleaner and improve upon the alofirhtm to be more smooth, so I recreated the project as pente-ii.

There are a (more than) a few things that I chenged between the original project and this one:
- Rewriting in React. The original project used jQuery (I know) for all UI updates. This project uses React and leverages Redux to manage the app's state, leading too much, much better separation of concerns in the codebase.
- Better software design. In addition to the React/Redux enhancement, this project also makes better use of object-oriented design principles to manage data like the game state and actions like placing pieces on the board, checking for a win, and the minimax algorithm for the AI opponent.
- Add alpha-beta pruning to the minimax algorithm. Adding pruning results in much lower runtimes for the minimax algorithm and makes it feasible to play the game on higher difficulties where the AI is thinking ore moves ahead.
- Utilizing web workers. In the old version of the game, when the AI was calculating its next move, the browser would become unresponsive do to the blocking nature of JavaScript. Now the game uses web workers so the browser is still responseive to inputs.
