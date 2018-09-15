import { handleActions } from 'redux-actions'
import actions from './../actions/actions.jsx'

const initialState = {
    user: {
        Name: "",
        region: "",
        age: "",
        category: ""
    }
}

const HeaderReducer = handleActions({
　 [actions.successUserInfo] : (state, action) => ({
        state,
        user: action.payload,
　 }),
　 [actions.failureUserInfo] : (state, action) => ({
        state,
        error : action.payload,
　 }),
  [actions.successUserUpdate] : (state, action) => ({
      state,
      user: action.payload,
  }),
  [actions.failureUserUpdate] : (state, action) => ({
      state,
      error : action.payload,
  }),
}, initialState)

export default HeaderReducer
