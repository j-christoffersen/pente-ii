import generateBoard from './generateBoard';

/* eslint quote-props: 0 */

const patterns = {
  '210': 5 ** 0,
  '012': 5 ** 0,
  '120': -(5 ** 0),
  '021': -(5 ** 0),
  '010': 5 ** 1,
  '020': 5 ** 1,
  '2110': -(5 ** 3),
  '1220': 5 ** 3,
  '0112': -(5 ** 3),
  '0221': -(5 ** 3),
  '0110': 5 ** 2,
  '0220': -(5 ** 2),
  '21110': 5 ** 2,
  '01112': 5 ** 2,
  '12220': -(5 ** 2),
  '02221': -(5 ** 2),
  '01110': 5 ** 4,
  '02220': -(5 ** 5),
  '211110': 5 ** 6,
  '011112': 5 ** 6,
  '122220': -(5 ** 7),
  '022221': -(5 ** 7),
  '011110': 5 ** 8,
  '022220': -(5 ** 9),
  '11111': 5 ** 10,
  '22222': -(5 ** 10),
};

export default class GameState {
  constructor(parent, row, col) {
    if (!parent) {
      this.board = generateBoard();
      this.captures = {
        '1': 0,
        '2': 0,
      };
      this.turn = 1;
      this.winner = null;
    } else {
      this.board = JSON.parse(JSON.stringify(parent.board));
      this.captures = JSON.parse(JSON.stringify(parent.captures));
      this.row = row;
      this.col = col;
      this.parentTurn = parent.turn;
      this.turn = parent.turn === 1 ? 2 : 1;
      this.updateBoard(row, col);
    }

    this.updateValue();
  }

  updateBoard(row, col) {
    this.board[row][col] = this.parentTurn;

    this.checkforCaptures(row, col);

    if (this.checkForWinner(row, col)) {
      this.winner = this.parentTurn;
    }
  }

  checkforCaptures(row, col) {
    const dirs = [
      { drow: -1, dcol: -1 },
      { drow: -1, dcol: 0 },
      { drow: -1, dcol: 1 },
      { drow: 0, dcol: -1 },
      { drow: 0, dcol: 1 },
      { drow: 1, dcol: -1 },
      { drow: 1, dcol: 0 },
      { drow: 1, dcol: 1 },
    ];

    for (let i = 0; i < dirs.length; i++) {
      const { drow, dcol } = dirs[i];

      if (
        this.board[row + (3 * drow)] &&
        this.board[row + drow][col + dcol] === this.turn &&
        this.board[row + (2 * drow)][col + (2 * dcol)] === this.turn &&
        this.board[row + (3 * drow)][col + (3 * dcol)] === this.parentTurn
      ) {
        console.log('capture found');
        this.captures[this.parentTurn] += 1;
        this.board[row + drow][col + dcol] = 0;
        this.board[row + (2 * drow)][col + (2 * dcol)] = 0;
      }
    }
  }

  checkForWinner(row, col) {
    if (this.captures[this.parentTurn] >= 5) return true;

    const dirs = [
      { drow: 1, dcol: 0 },
      { drow: 0, dcol: 1 },
      { drow: 1, dcol: 1 },
      { drow: 1, dcol: -1 },
    ];

    for (let i = 0; i < dirs.length; i++) {
      const { drow, dcol } = dirs[i];

      let piecesInARow = 1;
      const currentCoords = {
        row: row + drow,
        col: col + dcol,
      };

      while (
        this.board[currentCoords.row] &&
        this.board[currentCoords.row][currentCoords.col] === this.parentTurn
      ) {
        piecesInARow++;
        currentCoords.row += drow;
        currentCoords.col += dcol;
      }

      currentCoords.row = row - drow;
      currentCoords.col = col - dcol;

      while (
        this.board[currentCoords.row] &&
        this.board[currentCoords.row][currentCoords.col] === this.parentTurn
      ) {
        piecesInARow++;
        currentCoords.row -= drow;
        currentCoords.col -= dcol;
      }

      if (piecesInARow >= 5) return true;
    }

    return false;
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

            const reversePlayers = {
              0: 0,
              1: 2,
              2: 1,
            };

            const patternString = pattern.map(num => reversePlayers[num]).join('');

            if (patterns[patternString]) {
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
          cb(new GameState(this, i, j));
        }
      }
    }
  }

  isValidMove(row, col) {
    if (this.winner) return false;
    return this.board[row] && this.board[row][col] === 0;
  }
}
