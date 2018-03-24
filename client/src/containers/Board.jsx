import { connect } from 'react-redux';

import Board from '../components/Board';

const mapStateToProps = state => ({
  board: state.board,
});

export default connect(mapStateToProps)(Board);
