import { connect } from 'react-redux';

import Home from '../screens/Home';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default AppContainer;
