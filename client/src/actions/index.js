/* eslint import/prefer-default-export: 0 */

export function move(row, col) {
  return {
    type: 'MOVE',
    row,
    col,
  };
}
