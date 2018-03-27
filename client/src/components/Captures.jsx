import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Captures = props => (
  <div className="message">
    <div>Yellow: {props.captures[1]}</div>
    <div>Green: {props.captures[2]}</div>
  </div>
);

Captures.propTypes = {
  captures: PropTypes.shape({
    1: PropTypes.number.isRequired,
    2: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  captures: state.captures,
});

export default connect(mapStateToProps)(Captures);
