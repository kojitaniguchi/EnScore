import { connect } from 'react-redux'
import clientApp from './clientAppComponents.jsx'
import actions from './actions/actions.jsx'

let mapStateToProps = (state) => {
  return {
    // HomeReducer
    score: state.HomeReducer.score,
    LineGraphData: state.HomeReducer.LineGraphData,

    // RankReducer
    BarChartData: state.RankReducer.BarChartData,

    // HeaderReducer
    user: state.HeaderReducer.user

  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // HomeReducer
    handleRequestUserScore: () => {
      dispatch(actions.requestUserScore())
    },
    handleRequestAppScore: (param) => {
      dispatch(actions.requestAppScore(param))
    },

    // RankReducer
    handleRequestUserRank: (param) => {
      dispatch(actions.requestUserRank(param))
    },

    // HeaderReducer
    handleRequestUserInfo: () => {
      dispatch(actions.requestUserInfo())
    },
    handleRequestUserUpdate: (param) => {
      dispatch(actions.requestUserUpdate(param))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(clientApp)

export default AppContainer
