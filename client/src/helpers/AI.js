import { DIFFICULTY } from '../config';
import store from '../store';
import { move } from '../actions';
import Evaluation from './Evaluation';

export default function computerMove() {
  const state = store.getState();

  const currentEval = new Evaluation(state.gameState);

  // refactor to be a getter for bestChild
  const bestNextEval = currentEval.alphaBeta(DIFFICULTY).bestChild;

  store.dispatch(move(bestNextEval.row, bestNextEval.col, false));
}
