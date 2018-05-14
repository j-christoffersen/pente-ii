import { N, DIFFICULTY } from '../config';
import GameState from './GameState';
import Trie from '../lib/Trie';

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

const patternTrie = new Trie();

Object.keys(patterns).forEach((key) => {
  const reverseKey = key.split('').reverse().join('');
  patterns[reverseKey] = patterns[key];
});

const keys = Object.keys(patterns);

keys.forEach((key) => {
  patternTrie.insert(key, patterns[key]);
});

export default class Evaluation {
  constructor(parentOrGameState, row, col) {
    this.bounds = {};

    if (parentOrGameState instanceof GameState) {
      this.gameState = parentOrGameState;

      const { board } = this.gameState;

      this.bounds.minRow = Math.floor((N - 1) / 2);
      this.bounds.maxRow = Math.floor(N / 2);
      this.bounds.minCol = Math.floor((N - 1) / 2);
      this.bounds.maxCol = Math.floor(N / 2);

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j]) {
            if (i < this.bounds.minRow) this.bounds.minRow = i;
            if (i > this.bounds.maxRow) this.bounds.maxRow = i;
            if (j < this.bounds.minCol) this.bounds.minCol = j;
            if (j > this.bounds.maxCol) this.bounds.maxCol = j;
          }
        }
      }

      this.bounds.minRow = Math.max(this.bounds.minRow - 2, 0);
      this.bounds.maxRow = Math.min(this.bounds.maxRow + 2, N - 1);
      this.bounds.minCol = Math.max(this.bounds.minCol - 2, 0);
      this.bounds.maxCol = Math.min(this.bounds.maxCol + 2, N - 1);
    } else {
      const parent = parentOrGameState;
      this.gameState = new GameState(parent.gameState, row, col);
      this.row = row;
      this.col = col;
      this.bounds.minRow = Math.max(Math.min(parent.bounds.minRow, row - 2), 0);
      this.bounds.maxRow = Math.min(Math.max(parent.bounds.maxRow, row + 2), N - 1);
      this.bounds.minCol = Math.max(Math.min(parent.bounds.minCol, col - 2), 0);
      this.bounds.maxCol = Math.min(Math.max(parent.bounds.maxCol, col + 2), N - 1);
    }

    // console.log(this.bounds.minRow, this.bounds.maxRow, this.bounds.minCol, this.bounds.maxCol);
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

          let curTrieNode = patternTrie.root;
          while (curTrieNode) {
            this.memValue += curTrieNode.val;

            const reversePlayers = {
              0: 0,
              1: 2,
              2: 1,
            };

            const nextChar = this.gameState.parentTurn === 1 ?
              this.gameState.board[row][col] :
              reversePlayers[this.gameState.board[row][col]];

            curTrieNode = curTrieNode.children[nextChar];

            row += drow;
            col += dcol;

            if (!this.gameState.board[row] || this.gameState.board[row][col] === undefined) break;
          }
        }
      }
    }

    this.memValue += this.gameState.captures[this.gameState.parentTurn] * CAPTURE_VALUE;
    this.memValue -= this.gameState.captures[this.gameState.turn] * CAPTURE_VALUE;

    return this.memValue;
  }

  get bestChild() {
    if (this.memBestChild) return this.memBestChild;

    this.alphaBeta(DIFFICULTY);
    return this.memBestChild;
  }

  alphaBeta(depth, alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY) {
    if (depth === 0) {
      this.v = this.value;
      return this;
    }

    // here or in get value redundant
    if (this.gameState.winner === this.gameState.parentTurn) {
      this.v = GAME_OVER_VALUE;
      if (depth % 2 === 1) this.v *= -1;
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
            breakFlag = true;
          }
        }
      } else {
        if (child.v < bestV) {
          bestV = child.v;
          bestEval = child;
          if (bestV < alpha) {
            breakFlag = true;
          }
        }
      }
    });

    // refactor to not need bestV
    this.v = bestV;
    this.memBestChild = bestEval;
    // console.log(bestEval);
    return this;
  }

  forEachChild(cb) {
    // console.log(this.bounds.minRow, this.bounds.maxRow, this.bounds.minCol, this.bounds.maxCol);

    for (let i = this.bounds.minRow; i <= this.bounds.maxRow; i++) {
      for (let j = this.bounds.minCol; j <= this.bounds.maxCol; j++) {
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
