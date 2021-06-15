import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../screens/App';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
