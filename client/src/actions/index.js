/* eslint import/prefer-default-export: 0 */

export function move(row, col) {
  return {
    type: 'MOVE',
    row,
    col,
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

export function startGame(playerMode) {
  return {
    type: 'START_GAME',
    playerMode,
  };
}
