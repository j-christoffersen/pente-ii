import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = props => (
  <div className="message">{props.message}</div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

const getMessage = (state) => {
  if (state.playerMode === 0) {
    return '';
  }

  if (state.gameState.winner) {
    return `Player ${state.gameState.winner} wins!`;
  }

  return `It's player ${state.gameState.turn}'s turn`;
};

const mapStateToProps = state => ({
  message: getMessage(state),
});

export default connect(mapStateToProps)(Message);
