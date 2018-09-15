import { combineReducers } from 'redux'
import HeaderReducer from './HeaderReducer.jsx'
import HomeReducer from './HomeReducer.jsx'
import RankReducer from './RankReducer.jsx'
import RivalReducer from './RivalReducer.jsx'

const Reducers = combineReducers({
  HeaderReducer,
  HomeReducer,
  RankReducer,
  RivalReducer
})

export default Reducers
