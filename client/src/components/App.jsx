import React from 'react';
import Board from '../containers/Board';
import Message from './Message';
import Captures from './Captures';

const App = () => (
  <div>
    <Board />
    <Message />
    <Captures />
  </div>
);

export default App;
