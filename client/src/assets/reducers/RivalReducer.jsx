import { handleActions } from 'redux-actions'
import actions from './../actions/actions.jsx'

const initialState = {
  data: '',
  error: '',
}

const RivalReducer = handleActions({
  [actions.successUser] : (state, action) => ({
      state,
      data : action.payload,
  }),
  [actions.failureUser] : (state, action) => ({
      state,
      error : action.payload,
  }),
}, initialState)

export default RivalReducer
