import generateBoard from '../helpers/generateBoard';

const board = generateBoard();

const defaultState = {
  board,
  turn: 1,
  captures: {
    1: 0,
    2: 0,
  },
  winner: null,
};

const checkForWinner = (state, row, col) => {
  if (state.captures.turn >= 5) return true;

  const dirs = [
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
  ];

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];

    let piecesInARow = 1;
    const currentCoords = {
      row: row + dir.row,
      col: col + dir.col,
    };

    while (state.board[currentCoords.row][currentCoords.col] === state.turn) {
      piecesInARow++;
      currentCoords.row += dir.row;
      currentCoords.col += dir.col;
    }

    currentCoords.row = row - dir.row;
    currentCoords.col = col - dir.col;
    while (state.board[currentCoords.row][currentCoords.col] === state.turn) {
      piecesInARow++;
      currentCoords.row -= dir.row;
      currentCoords.col -= dir.col;
    }

    if (piecesInARow >= 5) return true;
  }

  return false;
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE': {
      const newState = Object.assign({}, state);

      if (state.board[action.row][action.col] === 0 && !state.winner) {
        newState.board = JSON.parse(JSON.stringify(state.board));
        newState.board[action.row][action.col] = state.turn;

        if (checkForWinner(newState, action.row, action.col)) {
          newState.winner = newState.turn;
        }

        newState.turn = state.turn === 1 ? 2 : 1;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducers;
