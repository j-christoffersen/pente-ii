import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startGame } from '../actions';
import rules from '../resources/rules.txt';

class Overlay extends Component {
  constructor() {
    super();
    this.state = {
      page: 'main',
    };
  }

  render() {
    let message;

    if (this.state.page === 'rules') {
      message = (
        <div>
          <p>{rules}</p>
          <button className="btn" onClick={() => { this.setState({ page: 'main' }); }}>Back</button>
          <button className="btn" onClick={() => { this.setState({ page: 'difficulty' }); }}>One Player</button>
          <button className="btn" onClick={() => { this.props.play('TWO PLAYER'); }}>Two Player</button>
        </div>
      );
    } else if (this.state.page === 'main') {
      message = (
        <div>
          <h1>PENTE</h1>
          <p>Welcome to PENTE!</p>
          <button className="btn" onClick={() => { this.setState({ page: 'rules' }); }}>Rules</button>
          <button className="btn" onClick={() => { this.setState({ page: 'difficulty' }); }}>One Player</button>
          <button className="btn" onClick={() => { this.props.play('TWO PLAYER'); }}>Two Player</button>
        </div>
      );
    } else {
      message = (
        <div>
          <h1>Select difficulty:</h1>
          <p>Note that the harder the difficulty, the longer the AI takes to make a move</p>
          <button className="btn" onClick={() => { this.props.play('ONE PLAYER', 1); }}>Easy</button>
          <button className="btn" onClick={() => { this.props.play('ONE PLAYER', 2); }}>Medium</button>
          {/* <button className="btn" onClick={() => { this.props.play('ONE PLAYER', 3); }}>Hard</button> */}
        </div>
      );
    }

    return (
      <div className="overlay">
        {message}
      </div>
    );
  }
}

Overlay.propTypes = {
  play: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  play: (playerMode, difficulty) => { dispatch(startGame(playerMode, difficulty)); },
});

export default connect(null, mapDispatchToProps)(Overlay);
