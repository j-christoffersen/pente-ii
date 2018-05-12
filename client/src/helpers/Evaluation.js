import { N } from '../config';
import GameState from './GameState';

let debugCounter = 0;

/* eslint quote-props: 0 */

const patterns = {
  '120': 5 ** 0,
  '210': -(5 ** 0),
  '010': 5 ** 1,
  '020': -(5 ** 1),
  '2110': -(5 ** 3) + 5, // original: -(5 ** 3)
  '1220': (5 ** 3) - (5 ** 2), // original: 5 ** 3
  '0110': 5 ** 2,
  '0220': -(5 ** 2),
  '21110': 5 ** 2,
  '12220': -(5 ** 2),
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

      const { board } = this.gameState;

      this.minRow = Math.floor((N - 1) / 2);
      this.maxRow = Math.floor(N / 2);
      this.minCol = Math.floor((N - 1) / 2);
      this.maxCol = Math.floor(N / 2);

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j]) {
            if (i < this.minRow) this.minRow = i;
            if (i > this.maxRow) this.maxRow = i;
            if (j < this.minCol) this.minCol = j;
            if (j > this.maxCol) this.maxCol = j;
          }
        }
      }

      this.minRow = Math.max(this.minRow - 2, 0);
      this.maxRow = Math.min(this.maxRow + 2, N - 1);
      this.minCol = Math.max(this.minCol - 2, 0);
      this.maxCol = Math.min(this.maxCol + 2, N - 1);
    } else {
      const parent = parentOrGameState;
      this.gameState = new GameState(parent.gameState, row, col);
      this.row = row;
      this.col = col;
      this.minRow = Math.min(parent.minRow, row - 2);
      this.maxRow = Math.max(parent.maxRow, row + 2);
      this.minCol = Math.min(parent.minCol, col - 2);
      this.maxCol = Math.max(parent.maxCol, col + 2);
    }

    // console.log(this.minRow, this.maxRow, this.minCol, this.maxCol);
  }

  get value() {
    if (this.memValue !== undefined) return this.memValue;

    if (this.gameState.winner === this.gameState.turn) {
      this.memValue = -GAME_OVER_VALUE;
      return this.memValue;
    }

    if (this.gameState.winner === this.gameState.parentTurn) {
      this.memValue = GAME_OVER_VALUE;
      return this.memValue;
    }

    this.memValue = 0;

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

            const patternString = this.gameState.parentTurn === 1 ?
              pattern.join('') :
              pattern.map(num => reversePlayers[num]).join('');

            if (patterns[patternString]) {
              this.memValue += patterns[patternString];
            }

            row += drow;
            col += dcol;
          }
        }
      }
    }

    this.memValue += this.gameState.captures[this.gameState.parentTurn] * CAPTURE_VALUE;
    this.memValue -= this.gameState.captures[this.gameState.turn] * CAPTURE_VALUE;

    return this.memValue;
  }

  alphaBeta(depth, alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY) {
    if (depth === 0) {
      this.v = this.value;
      return this;
    }

    // here or in get value redundant
    if (this.gameState.winner === this.gameState.parentTurn) {
      this.v = GAME_OVER_VALUE;
      if (this.depth % 2 === 1) this.v *= -1;
      return this;
    }

    const isMaximizer = depth % 2 === 1;

    let bestV = isMaximizer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    let bestEval = null;

    let breakFlag = false; // set flag to break out of following loop
    this.forEachChild((evaluation) => {
      if (breakFlag) return;

      const newAlpha = isMaximizer ? Math.max(alpha, bestV) : alpha;
      const newBeta = isMaximizer ? beta : Math.min(beta, bestV);

      const child = evaluation.alphaBeta(depth - 1, newAlpha, newBeta);

      if (isMaximizer) {
        if (child.v > bestV) {
          bestV = child.v;
          bestEval = child;
          if (bestV > beta) {
            // breakFlag = true;
          }
        }
      } else {
        if (child.v < bestV) {
          bestV = child.v;
          bestEval = child;
          if (bestV < alpha) {
            // breakFlag = true;
          }
        }
      }
    });

    bestEval.v = bestV;
    console.log(bestEval);
    return bestEval;
  }

  forEachChild(cb) {
    console.log(this.minRow, this.maxRow, this.minCol, this.maxCol);

    for (let i = this.minRow; i <= this.maxRow; i++) {
      for (let j = this.minCol; j <= this.maxCol; j++) {
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
