import GameState from '../helpers/GameState';
import Evaluation from '../helpers/Evaluation';

onmessage = (event) => {
  const gameState = Object.assign(new GameState(), event.data.gameState);
  const { difficulty } = event.data;

  const currentEval = new Evaluation(gameState, difficulty);

  const bestNextEval = currentEval.bestChild;

  postMessage(bestNextEval);
};
