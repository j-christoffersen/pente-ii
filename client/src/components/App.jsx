import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../containers/Board';
import Message from './Message';
import Captures from './Captures';
import { newGame } from '../actions';

const App = props => (
  <div>
    <Board />
    <Message />
    <Captures />
    <button onClick={props.handleClick}>New Game</button>
  </div>
);

App.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(newGame()); },
});

export default connect(null, mapDispatchToProps)(App);
