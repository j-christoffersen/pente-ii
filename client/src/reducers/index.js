import generateBoard from '../helpers/generateBoard';

const board = generateBoard();

const defaultState = {
  board,
  turn: 1,
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE': {
      const newState = Object.assign({}, state);

      newState.board = JSON.parse(JSON.stringify(state.board));
      newState.board[action.row][action.col] = state.turn;
      newState.turn = state.turn === 1 ? 2 : 1;

      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducers;
