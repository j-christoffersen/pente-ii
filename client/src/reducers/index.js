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
  overlay: {
    isVisible: true,
  },
};

const checkForWinner = (newState, row, col) => {
  if (newState.captures[newState.turn] >= 5) return true;

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

    while (newState.board[currentCoords.row][currentCoords.col] === newState.turn) {
      piecesInARow++;
      currentCoords.row += dir.row;
      currentCoords.col += dir.col;
    }

    currentCoords.row = row - dir.row;
    currentCoords.col = col - dir.col;
    while (newState.board[currentCoords.row][currentCoords.col] === newState.turn) {
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
      const newState = JSON.parse(JSON.stringify(state));
      const { row, col } = action;

      if (state.board[row][col] === 0 && !state.winner) {
        newState.board[row][col] = state.turn;


        // check for captures
        const dirs = [
          { row: -1, col: -1 },
          { row: -1, col: 0 },
          { row: -1, col: 1 },
          { row: 0, col: -1 },
          { row: 0, col: 1 },
          { row: 1, col: -1 },
          { row: 1, col: 0 },
          { row: 1, col: 1 },
        ];

        const opponent = newState.turn === 1 ? 2 : 1;

        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[i];

          if (
            newState.board[row + dir.row][col + dir.col] === opponent &&
            newState.board[row + (2 * dir.row)][col + (2 * dir.col)] === opponent &&
            newState.board[row + (3 * dir.row)][col + (3 * dir.col)] === newState.turn
          ) {
            newState.captures[newState.turn] += 1;
            newState.board[row + dir.row][col + dir.col] = 0;
            newState.board[row + (2 * dir.row)][col + (2 * dir.col)] = 0;
          }
        }


        if (checkForWinner(newState, action.row, action.col)) {
          newState.winner = newState.turn;
        }

        newState.turn = state.turn === 1 ? 2 : 1;
      }

      return newState;
    }

    case 'NEW_GAME': {
      return defaultState;
    }

    case 'HIDE_OVERLAY': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.overlay.isVisible = false;
      return newState;
    }

    case 'SHOW_OVERLAY': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.overlay.isVisible = true;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducers;
