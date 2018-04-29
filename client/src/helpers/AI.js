import store from '../store';
import { move } from '../actions';

export default function computerMove() {
  const state = store.getState();

  const currentGame = state.gameState;

  let bestGame;

  currentGame.forEachChild((gameState) => {
    if (!bestGame || gameState.value > bestGame.value) {
      bestGame = gameState;
    }
  });

  store.dispatch(move(bestGame.row, bestGame.col, false));
}
