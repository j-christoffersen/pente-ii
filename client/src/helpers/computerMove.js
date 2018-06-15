import store from '../store';
import { move } from '../actions';
// import Evaluation from './Evaluation';
import GetNextMoveWorker from '../workers/getNextMove.worker';

const worker = new GetNextMoveWorker();

export default function computerMove() {
  const state = store.getState();

  worker.postMessage({ gameState: state.gameState, difficulty: state.difficulty });

  worker.onmessage = (event) => {
    const bestNextEval = event.data;

    store.dispatch(move(bestNextEval.row, bestNextEval.col, false));
  };
}
