import GameState from '../helpers/GameState';
import Evaluation from '../helpers/Evaluation';

onmessage = (event) => {
  const gameState = Object.assign(new GameState(), event.data);

  const currentEval = new Evaluation(gameState);

  const bestNextEval = currentEval.bestChild;

  postMessage(bestNextEval);
};
