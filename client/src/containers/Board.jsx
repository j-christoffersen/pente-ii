import { connect } from 'react-redux';

import Board from '../components/Board';

const mapStateToProps = state => ({
  board: state.gameState.board,
});

export default connect(mapStateToProps)(Board);
