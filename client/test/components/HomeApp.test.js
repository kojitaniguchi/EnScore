import test from "ava"
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from "enzyme"

// 単体テスト-----------------------------
import HomeApp from "../../src/assets/components/Home/HomeApp.jsx"

// react関連-----------------------------
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

configure({ adapter: new Adapter() });

test("HomeApp sectino element", (t) => {
  const wrapper = shallow(<HomeApp
        test={{ JWT: "test", qiita: "test", github: null }}
        user={{}}
        score={{ qiita: { value: 0 }, github: { value: 0 }, app: { value: 0 } }} 
        LineGraphData={{}} 
        BarChartData={{}} 
        handleRequestAppScore={() => { return }}
        handleRequestUserScore={() => { return }}
        handleRequestUserRank={() => { return }}
        handleRequestUserUpdate={() => { return }}
    />)
  t.is(wrapper.type().target, "section")
})


//  HomeApp画面で、ログイン状態に基づいたボタンを表示させているかのテスト
// テストの時はHomeAppの test用propsのコメントアウトをはずし、production用を外す

// qiitaログインのみが終了し、githubログインがまだ。 qiitaはスコアボタン　githubは認証許可ボタン
test("HomeApp qiita login. render qiita score button and github login button", (t) => {
    const wrapper = shallow(<HomeApp
          test={{ JWT: "test", qiita: "test", github: null }}
          user={{}}
          score={{ qiita: { value: 0 }, github: { value: 0 }, app: { value: 0 } }} 
          LineGraphData={{}} 
          BarChartData={{}} 
          handleRequestAppScore={() => { return }}
          handleRequestUserScore={() => { return }}
          handleRequestUserRank={() => { return }}
          handleRequestUserUpdate={() => { return }}
      />)
    t.is(wrapper.childAt(1).childAt(0).childAt(2).childAt(0).text(), "qiitaスコアを計算する")
    t.is(wrapper.childAt(1).childAt(1).childAt(2).childAt(0).text(), "githubアカウントと連携を許可する")
  })

// githubログインのみが終了し、qiitaログインがまだ。 githubはスコアボタン　qiitaは認証許可ボタン
test("HomeApp github login. render qigithubita score button and qiita login button", (t) => {
    const wrapper = shallow(<HomeApp
          test={{ JWT: "test", qiita: null, github: "test" }}
          user={{}}
          score={{ qiita: { value: 0 }, github: { value: 0 }, app: { value: 0 } }} 
          LineGraphData={{}} 
          BarChartData={{}} 
          handleRequestAppScore={() => { return }}
          handleRequestUserScore={() => { return }}
          handleRequestUserRank={() => { return }}
          handleRequestUserUpdate={() => { return }}
      />)
    t.is(wrapper.childAt(1).childAt(0).childAt(2).childAt(0).text(), "qiitaアカウントと連携を許可する")
    t.is(wrapper.childAt(1).childAt(1).childAt(2).childAt(0).text(), "githubスコアを計算する")
  })

// 両方の連携認証が終わり、両方のボタンが計測可能なスコアボタンである
test("HomeApp github login　and qiita login. render github score button and qiita score button", (t) => {
    const wrapper = shallow(<HomeApp
          test={{ JWT: "test", qiita: "test", github: "test" }}
          user={{}}
          score={{ qiita: { value: 0 }, github: { value: 0 }, app: { value: 0 } }} 
          LineGraphData={{}} 
          BarChartData={{}} 
          handleRequestAppScore={() => { return }}
          handleRequestUserScore={() => { return }}
          handleRequestUserRank={() => { return }}
          handleRequestUserUpdate={() => { return }}
      />)
    t.is(wrapper.childAt(1).childAt(0).childAt(2).childAt(0).text(), "qiitaスコアを計算する")
    t.is(wrapper.childAt(1).childAt(1).childAt(2).childAt(0).text(), "githubスコアを計算する")
  })