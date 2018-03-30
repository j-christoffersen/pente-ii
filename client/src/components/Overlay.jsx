import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideOverlay } from '../actions';

class Overlay extends Component {
  constructor() {
    super();
    this.state = {
      page: 'main',
    };

    this.showRules = this.showRules.bind(this);
    this.hideRules = this.hideRules.bind(this);
  }

  showRules() {
    this.setState({
      page: 'rules',
    });
  }

  hideRules() {
    this.setState({
      page: 'main',
    });
  }

  render() {
    let message;

    if (this.state.page === 'rules') {
      message = (
        <div>
          <p>The rules go here</p>
          <button onClick={this.hideRules}>Back</button>
          <button onClick={this.props.play}>Play</button>
        </div>
      );
    } else {
      message = (
        <div>
          <h1>PENTE</h1>
          <p>Welcome to PENTE!</p>
          <button onClick={this.showRules}>Rules</button>
          <button onClick={this.props.play}>Play</button>
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
  play: () => { dispatch(hideOverlay()); },
});

export default connect(null, mapDispatchToProps)(Overlay);
