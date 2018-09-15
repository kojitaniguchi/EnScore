/* Reducersの実装 */
import { handleActions } from 'redux-actions'
import actions from  './../actions/actions.jsx'

const initialScore = {
    qiita: {
        value: 0
    },
    github: {
        value: 0
    },
    app: {
        value: 0
    },
}

const initialLineGraphData = {
  value: [
      [
      '日付',
      '総合スコア',
      'qiitaスコア',
      'githubスコア',
      'アプリスコア',
      ],
      ["", 0, 0, 0, 0],
    ]   
}

const initialState = {
    score: initialScore,
    LineGraphData: initialLineGraphData
}

const HomeReducer = handleActions({
    [actions.successUserScore] : (state, action) => {
        return {
          state,
          score : action.payload.score,
          LineGraphData : action.payload.graph
        }
    },
    [actions.failureUserScore] : (state, action) => ({
        state,
        score : action.payload,
    }),
}, initialState)

export default HomeReducer
