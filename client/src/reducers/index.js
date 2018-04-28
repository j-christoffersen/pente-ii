import generateBoard from '../helpers/generateBoard';
import computerMove from '../helpers/AI';

const board = generateBoard();

const defaultState = {
  board,
  turn: 1,
  playerMode: null,
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
      if (state.overlay.isVisible) return state;
      if (
        state.playerMode === 'ONE PLAYER' &&
        state.turn === 2 &&
        action.clicked === true
      ) {
        return state;
      }

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

      // creates side effects that cause a later action,
      // perhaps this structure is not ideal.
      if (state.playerMode === 'ONE PLAYER' && newState.turn === 2) {
        setTimeout(computerMove, 2000);
      }

      return newState;
    }

    case 'NEW_GAME': {
      return defaultState;
    }

    case 'START_GAME': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.overlay.isVisible = false;
      newState.playerMode = action.playerMode;
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
