import { handleActions } from 'redux-actions'
import actions from './../actions/actions.jsx'

// const data = { rank: 10 , all:  1230}

const initialBarChart = { 
  value: [
    [
    { type: 'string', id: 'Position' },
    { type: 'string', id: 'Name' },
    { type: 'string', role: 'tooltip' },
    { type: 'number', id: 'Start' },
    { type: 'number', id: 'End' }
    ],
    [ 'あなたのRankポジション', '', '', 0, 0 ],
    [ 'あなたのRankポジション', 'あなた', 'あなた', 0, 0 ],
    [ 'あなたのRankポジション', '', '', 0, 0 ]
  ],
  status: { 
    score: {
      rank: 0, 
      all: 0, 
      totalScore: 0, 
    },
    user: {
      region: "", 
      age: 0, 
      category: ""
    }
  }
}

const initialState = {
  BarChartData: initialBarChart,
}

const RankReducer = handleActions({
  [actions.successUserRank] : (state, action) => ({
      state,
      BarChartData : action.payload,
  }),
  [actions.failureUserRank] : (state, action) => ({
      state,
      BarChartData : action.payload,
  }),
}, initialState)

export default RankReducer
