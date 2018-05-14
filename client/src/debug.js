import store from './store';
import Evaluation from './helpers/Evaluation';

export default window.getBoardValue = () => {
  const currentEval = new Evaluation(store.getState().gameState);
  console.log(currentEval.value);
};
