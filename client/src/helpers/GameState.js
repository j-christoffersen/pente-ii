import generateBoard from './generateBoard';

export default class GameState {
  constructor(parent, row, col) {
    if (!parent) {
      this.board = generateBoard();
      this.captures = {
        1: 0,
        2: 0,
      };
      this.turn = 1;
      this.winner = null;
    } else {
      this.board = JSON.parse(JSON.stringify(parent.board));
      this.captures = JSON.parse(JSON.stringify(parent.captures));
      this.parentTurn = parent.turn;
      this.turn = parent.turn === 1 ? 2 : 1;
      this.updateBoard(row, col);
    }
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

  isValidMove(row, col) {
    if (this.winner) return false;
    return this.board[row] && this.board[row][col] === 0;
  }
}
