import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// A widget to test that other running code is non-blocking
class DebugWidget extends Component {
  constructor() {
    super();
    this.state = {
      number: 1,
    };
  }

  render() {
    return (
      <div>
        {`The number is ${this.state.number}`}
        {[1, 2, 3].map(num => (
          <button key={num} onClick={() => { this.setState({ number: num }); }}>{num}</button>
        ))}
      </div>
    );
  }
}

// DebugWidget.propTypes = {};

export default DebugWidget;
