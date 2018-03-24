import React from 'react';
import PropTypes from 'prop-types';

const Board = props => (
  <div className="board">
    {
      props.board.map((row, r) => (
        row.map((square, c) => (
          <div className="piece" key={`${r},${c}`} />
        ))
      ))
    }
  </div>
);

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Board;
