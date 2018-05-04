import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Space from './Space';

const Board = props => (
  <div className="board">
    {
      props.board.map((rowArray, row) => (
        rowArray.map((square, col) => (
          <Space key={`${row},${col}`} row={row} col={col} player={props.board[row][col]} />
        ))
      ))
    }
  </div>
);

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

const mapStateToProps = state => ({
  board: state.gameState.board,
});

export default connect(mapStateToProps)(Board);
