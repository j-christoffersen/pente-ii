import GameState from './GameState';

/* eslint quote-props: 0 */

const patterns = {
  '210': 5 ** 0,
  '120': -(5 ** 0),
  '010': 5 ** 1,
  '020': 5 ** 1,
  '2110': -(5 ** 3) + 5, // original: -(5 ** 3)
  '1220': (5 ** 3) - (5 ** 2), // original: 5 ** 3
  '0110': 5 ** 2,
  '0220': -(5 ** 2),
  '21110': 5 ** 2,
  '12220': -(5 ** 2),
  '02221': -(5 ** 2),
  '21010': 5 ** 0,
  '12020': -(5 ** 0),
  '01110': 5 ** 3,
  '02220': -(5 ** 5),
  '01010': 5 ** 1,
  '02020': -(5 ** 1),
  '211110': 5 ** 3,
  '122220': -(5 ** 7),
  '210110': 5 ** 2,
  '120220': -(5 ** 2),
  '211010': 5 ** 2,
  '122020': -(5 ** 2),
  '011110': 5 ** 6,
  '022220': -(5 ** 7),
  '010110': 5 ** 3,
  '020220': -(5 ** 5),
  '11011': 5 ** 1,
  '22022': -(5 ** 7),
  '11101': 5 ** 3,
  '22202': -(5 ** 7),
};

const CAPTURE_VALUE = 5 ** 4;
const GAME_OVER_VALUE = 5 ** 8;

Object.keys(patterns).forEach((key) => {
  const reverseKey = key.split('').reverse().join('');
  patterns[reverseKey] = patterns[key];
});

const longestPatternLength = Object.keys(patterns).reduce((maxLength, key) => {
  if (key.length > maxLength) return key.length;
  return maxLength;
}, 0);

export default class Evaluation {
  constructor(parentOrGameState, row, col) {
    if (parentOrGameState instanceof GameState) {
      this.gameState = parentOrGameState;
    } else {
      this.gameState = new GameState(parentOrGameState.gameState, row, col);
      this.row = row;
      this.col = col;
    }

    this.updateValue(); // only do this when necessary, via a getter
  }

  updateValue() {
    if (this.gameState.winner === 1) {
      this.value = -GAME_OVER_VALUE;
      return;
    }

    if (this.gameState.winner === 2) {
      this.value = GAME_OVER_VALUE;
      return;
    }

    this.value = 0;
    for (let i = 0; i < this.gameState.board.length; i++) {
      for (let j = 0; j < this.gameState.board[i].length; j++) {
        const dirs = [[1, 1], [1, 0], [0, 1], [1, -1]];
        for (let k = 0; k < dirs.length; k++) {
          const [drow, dcol] = dirs[k];
          let row = i;
          let col = j;

          const pattern = [];
          while (pattern.length <= longestPatternLength) {
            if (!this.gameState.board[row] || this.gameState.board[row][col] === undefined) break;

            pattern.push(this.gameState.board[row][col]);

            const reversePlayers = {
              0: 0,
              1: 2,
              2: 1,
            };

            const patternString = pattern.map(num => reversePlayers[num]).join('');

            if (patterns[patternString]) {
              this.value += patterns[patternString];
            }

            row += drow;
            col += dcol;
          }
        }
      }
    }

    this.value += this.gameState.captures[2] * CAPTURE_VALUE;
    this.value -= this.gameState.captures[1] * CAPTURE_VALUE;
  }

  forEachChild(cb) {
    for (let i = 0; i < this.gameState.board.length; i++) {
      for (let j = 0; j < this.gameState.board[i].length; j++) {
        if (this.gameState.board[i][j] === 0) {
          cb(new Evaluation(this, i, j));
        }
      }
    }
  }

  isValidMove(row, col) {
    return this.gameState.isValidMove(row, col);
  }
}
