import store from '../store';
import { move } from '../actions';
import Evaluation from './Evaluation';

export default function computerMove() {
  const state = store.getState();

  const currentEval = new Evaluation(state.gameState);

  currentEval.getBestChild()
    .then((bestNextEval) => {
      store.dispatch(move(bestNextEval.row, bestNextEval.col, false));
    });
}
