import store from '../store';
import { move } from '../actions';

export default function computerMove() {
  const state = store.getState();

  let row;
  let col;

  do {
    // select space randomly for now
    row = Math.floor(Math.random() * state.board.length);
    col = Math.floor(Math.random() * state.board[0].length);
  } while (state.board[row][col] !== 0);

  store.dispatch(move(row, col, false));
}
