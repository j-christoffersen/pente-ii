import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { move } from '../actions';

const Space = props => (
  <button
    className={classNames(['piece', `player-${props.player}`])}
    onClick={() => { props.handleClick(props.row, props.col); }}
  />
);

Space.propTypes = {
  player: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

Space.defaultProps = {
  player: 0,
};

const mapDispatchToProps = dispatch => ({
  handleClick: (row, col) => { dispatch(move(row, col, true)); },
});

export default connect(null, mapDispatchToProps)(Space);
