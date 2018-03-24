const generateBoard = () => {
  const N = 17;

  const emptyBoard = [];
  for (let i = 0; i < N; i++) {
    emptyBoard[i] = [];
    for (let j = 0; j < N; j++) {
      emptyBoard[i][j] = 0;
    }
  }

  return emptyBoard;
};

export default generateBoard;
