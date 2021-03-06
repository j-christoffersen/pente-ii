import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from './Board';
import Message from './Message';
import Captures from './Captures';
import Overlay from './Overlay';
// import DebugWidget from './DebugWidget';
import { newGame } from '../actions';

const App = props => (
  <div className="grid-container">
    {props.overlayIsVisible && <Overlay />}
    <Board />
    <Message />
    <Captures />
    {/* <DebugWidget /> */}
    <button className="new-game" onClick={props.handleClick}>New Game</button>
  </div>
);

App.propTypes = {
  handleClick: PropTypes.func.isRequired,
  overlayIsVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  overlayIsVisible: state.overlay.isVisible,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(newGame()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
