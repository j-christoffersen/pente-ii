import store from '../store';
import { move } from '../actions';

/* eslint quote-props: 0 */

const patterns = {
  '210': 5 ** 0,
  '012': 5 ** 0,
  '010': 5 ** 2,
  '2110': -(5 ** 6),
  '0112': -(5 ** 6),
  '0110': 5 ** 4,
  '21110': 5 ** 4,
  '01112': 5 ** 4,
  '01110': 5 ** 8,
  '211110': 5 ** 10,
  '011112': 5 ** 10,
  '011110': 5 ** 12,
  '11111': 5 ** 14,
};

class Board {
  constructor(parentBoard, row, col) {
    if (row === undefined || col === undefined) {
      this.board = parentBoard;
      this.lastPlayer = 1;
    } else {
      this.board = JSON.parse(JSON.stringify(parentBoard.board));
      this.row = row;
      this.col = col;
      this.lastPlayer = parentBoard.lastPlayer === 1 ? 2 : 1;
      this.board[row][col] = this.lastPlayer;
    }

    this.updateValue();
  }

  updateValue() {
    this.value = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const dirs = [[1, 1], [1, 0], [0, 1], [1, -1]];
        for (let k = 0; k < dirs.length; k++) {
          const [drow, dcol] = dirs[k];
          let row = i;
          let col = j;

          const pattern = [];
          while (pattern.length <= 5) {
            if (!this.board[row] || this.board[row][col] === undefined) break;

            pattern.push(this.board[row][col]);

            const patternString = pattern.join('');
            const numMap = {
              0: 0,
              1: 2,
              2: 1,
            };
            const reversePatternString = pattern.map(num => numMap[num]).join('');

            if (patterns[reversePatternString]) {
              this.value -= patterns[reversePatternString] * 5;
              break;
            } else if (patterns[patternString]) {
              this.value += patterns[patternString];
              break;
            }

            row += drow;
            col += dcol;
          }
        }
      }
    }
  }

  forEachChild(cb) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          cb(new Board(this, i, j));
        }
      }
    }
  }
}

export default function computerMove() {
  const state = store.getState();

  const currentBoard = new Board(state.board);

  let bestBoard;

  currentBoard.forEachChild((board) => {
    console.log(board.value);
    if (!bestBoard || board.value > bestBoard.value) {
      bestBoard = board;
    }
  });

  console.log(bestBoard);

  store.dispatch(move(bestBoard.row, bestBoard.col, false));
}
