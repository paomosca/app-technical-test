import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from '../screens/App'

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer