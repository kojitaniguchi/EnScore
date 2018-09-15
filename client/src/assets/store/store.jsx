// Store
import { createStore, applyMiddleware } from 'redux'

// sagaMiddleware
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas.jsx'

// reducers
import Reducers from './../reducers/AppReducer.jsx'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(Reducers, applyMiddleware(sagaMiddleware, logger))

export { store, sagaMiddleware, rootSaga }
