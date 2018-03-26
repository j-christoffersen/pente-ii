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
  if (state.winner) {
    return `Player ${state.winner} wins!`;
  }

  return '';
};

const mapStateToProps = state => ({
  message: getMessage(state),
});

export default connect(mapStateToProps)(Message);
