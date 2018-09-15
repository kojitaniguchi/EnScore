import { call, put, fork, takeEvery, push } from 'redux-saga/effects'
import 'babel-polyfill'
// import ApiClient from './api/ApiClient.jsx'
import actions from './../actions/actions.jsx'
import Cookies from 'universal-cookie';

// --------------------- Score ------------------------------------------
// --------------------- TopScore ------------------------------------------
function* RequestUserScore(action) {
  // 計測するので、
  let JWT = localStorage.getItem('JWT');
  const cookies = new Cookies();
  // cookies.set('JWT', JWT)

  console.log("RequestUserScore")
  // const { data, error } = yield ApiClient.post('/user/score', jwt)

  const error = false
  const data = 
  {
    score: {
      qiita: {
        value: 50
      },
      github: {
        value: 68
      },
      app: {
        value: 0
      }
    },
    graph: {
      value: [
        [
        '日付',
        '総合スコア',
        'qiitaスコア',
        'githubスコア',
        'アプリスコア',
        ],
        ["2018/3/3", 50, 30, 20, 0],
        ["2018/5/12", 118, 50, 68, 0],
      ]
    }
  }

  if (data && !error) {
    yield put(actions.successUserScore(data))
  } else {
    yield put(actions.failureUserScore(error))
  }
}

function* getRequestUserScoreAction() {
  yield takeEvery('REQUEST_USER_SCORE', RequestUserScore)
}

// --------------------- AppScore ------------------------------------------
function* RequestAppScore(action) {
  let JWT = localStorage.getItem('JWT');
  const cookies = new Cookies();
  // cookies.set('JWT', JWT)
  console.log("score cookies", cookies)

  const params = action.payload
  // {
  //   category: "web",
  //   data: [{name: hoge},{}.....]
  // }
  console.log('REQUEST_APP_SCORE', params)

  // const { error } = yield ApiClient.post('/user/score', jwt)

  const error = false

  if (!error) {
    yield put(actions.requestUserScore())
    // yield put(push('/'))
  } else {
    yield put(actions.failureUserScore(error))
  }
}

function* getRequestAppScoreAction() {
  yield takeEvery('REQUEST_APP_SCORE', RequestAppScore)
}




// --------------------- Rank ------------------------------------------
function* RequestUserRank(action) {
  let JWT = localStorage.getItem('JWT');
  const cookies = new Cookies();
  // cookies.set('JWT', JWT)
  console.log("user cookies", cookies)

  const params = action.payload
  console.log("rank user params", params)
  // const params = {
  //   region: "", 
  //   age: "", 
  //   category: "" 
  // }
      
  // const { data, error } = yield ApiClient.post('/user/score', jwt)
  const error = false
  // response

  const status = { 
    score: {
      rank: 100, 
      all: 1230, 
      totalScore: 80, 
    },
    user: {
      name: params.name,
      region: params.region, 
      age: params.age, 
      category: params.category
    }
  }

  let scoreRank = status.score.rank
  let scoreAll = status.score.all
  
  const data = {
    value: [
      [
      { type: 'string', id: 'Position' },
      { type: 'string', id: 'Name' },
      { type: 'string', role: 'tooltip' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' }
      ],
      [ 'あなたのRankポジション', 'other user', 'other user', 0,  scoreRank],
      [ 'あなたのRankポジション', 'あなた', 'あなた', scoreRank, scoreRank + (scoreAll*0.07) ],
      [ 'あなたのRankポジション', 'other user', 'other user', scoreRank + (scoreAll*0.07), scoreAll ]
    ],
    status: status
  }

  if (data && !error) {
    yield put(actions.successUserRank(data))
  } else {
    yield put(actions.failureUserRank(error))
  }
}

function* getRequestUserRankAction() {
  yield takeEvery('REQUEST_USER_RANK', RequestUserRank)
}

// --------------------- user ------------------------------------------

// --------------------- info ------------------------------------------
function* RequestUserInfo() {
  console.log("RequestUserInfo")
  let JWT = localStorage.getItem('JWT');
  const cookies = new Cookies();
  // cookies.set('JWT', JWT)

  // const params = action.payload
  // console.log("saga action.payload user update", params)
  // const params = {
  //   Name: "newName",
  //   region: "", 
  //   age: "", 
  //   category: ""
  // }
      
  // const { data, error } = yield ApiClient.post('/user/score', jwt)
  const error = false
  const data = {
    Name: "first set git name",
    region: "",
    age: "",
    category: ""
  }

  if (data && !error) {
    console.log("successUserInfo")
    yield put(actions.successUserInfo(data))
  } else {
    yield put(actions.failureUserInfo(error))
  }
}

function* getRequestUserInfoAction() {
  yield takeEvery('REQUEST_USER_INFO', RequestUserInfo)
}



// --------------------- update ------------------------------------------
function* RequestUserUpdate(action) {
  let JWT = localStorage.getItem('JWT');
  const cookies = new Cookies();
  // cookies.set('JWT', JWT)

  const params = action.payload
  console.log("saga action.payload user update", params)
  // const params = {
  //   Name: "newName",
  //   region: "", 
  //   age: "", 
  //   category: ""
  // }
      
  // const { data, error } = yield ApiClient.post('/user/score', jwt)
  const error = false
  // response
  // const data = {
  //   Name: "update",
  //   region: "",
  //   age: "",
  //   category: ""
  // }

  if (params && !error) {
    yield put(actions.successUserUpdate(params))
  } else {
    yield put(actions.failureUserUpdate(error))
  }
}

function* getRequestUserUpdateAction() {
  yield takeEvery('REQUEST_USER_UPDATE', RequestUserUpdate)
}


export default function* rootSaga() {
  yield fork(getRequestUserScoreAction)
  yield fork(getRequestAppScoreAction)
  yield fork(getRequestUserRankAction)
  yield fork(getRequestUserUpdateAction)
  yield fork(getRequestUserInfoAction)
}
