/* eslint import/prefer-default-export: 0 */

export function move(row, col, fromClick) {
  return {
    type: 'MOVE',
    row,
    col,
    fromClick,
  };
}

export function newGame() {
  return {
    type: 'NEW_GAME',
  };
}

export function showOverlay() {
  return {
    type: 'SHOW_OVERLAY',
  };
}

export function startGame(playerMode, difficulty) {
  return {
    type: 'START_GAME',
    playerMode,
    difficulty,
  };
}
