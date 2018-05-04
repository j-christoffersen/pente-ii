import { DIFFICULTY } from '../config';
import store from '../store';
import { move } from '../actions';
import Evaluation from './Evaluation';

export default function computerMove() {
  const state = store.getState();

  const currentEval = new Evaluation(state.gameState);

  // let bestVal;

  // currentEval.forEachChild((evaluation) => {
  //   if (!bestVal || evaluation.value > bestVal.value) {
  //     bestVal = evaluation;
  //   }
  // });

  // store.dispatch(move(bestVal.row, bestVal.col, false));

  console.log('DIFFICULTY:', DIFFICULTY);
  const bestNextEval = currentEval.alphaBeta(DIFFICULTY);

  store.dispatch(move(bestNextEval.row, bestNextEval.col, false));
}
