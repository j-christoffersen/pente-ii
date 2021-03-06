import GameState from '../helpers/GameState';
import computerMove from '../helpers/computerMove';
import { COMPUTER_WAIT_TIME } from '../config';

const defaultState = {
  gameState: new GameState(),
  playerMode: 0,
  difficulty: 0,
  overlay: {
    isVisible: true,
  },
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE': {
      if (state.overlay.isVisible) return state;
      if (
        state.playerMode === 'ONE PLAYER' &&
        state.gameState.turn === 2 &&
        action.clicked === true
      ) {
        return state;
      }

      const newState = Object.assign({}, state);
      const { row, col } = action;

      if (state.gameState.isValidMove(row, col)) {
        newState.gameState = new GameState(state.gameState, row, col);
      }

      // creates side effects that cause a later action,
      // perhaps this structure is not ideal.
      if (
        state.playerMode === 'ONE PLAYER' &&
        newState.gameState.turn === 2 &&
        !newState.gameState.winner
      ) {
        setTimeout(computerMove, COMPUTER_WAIT_TIME);
      }

      return newState;
    }

    case 'NEW_GAME': {
      return defaultState;
    }

    case 'START_GAME': {
      const newState = Object.assign({}, state);
      newState.overlay = Object.assign({}, state.overlay);
      newState.overlay.isVisible = false;
      newState.playerMode = action.playerMode;
      newState.difficulty = action.difficulty;
      return newState;
    }

    case 'SHOW_OVERLAY': {
      const newState = Object.assign({}, state);
      newState.overlay = Object.assign({}, state.overlay);
      newState.overlay.isVisible = true;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducers;
