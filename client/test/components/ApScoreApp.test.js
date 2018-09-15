import test from "ava"
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from "enzyme"

// 単体テスト-----------------------------
import ApScoreApp from "../../src/assets/components/ApScore/ApScoreApp.jsx"
import WebInput from '../../src/assets/components/ApScore/WebInput.jsx';
import GameInput from '../../src/assets/components/ApScore/GameInput.jsx';
import NativeInput from '../../src/assets/components/ApScore/NativeInput.jsx';

// react関連-----------------------------
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

configure({ adapter: new Adapter() });

test("can use ava", (t) => {
  t.pass()
})

test("ApScoreApp sectino element", (t) => {
  const wrapper = shallow(<ApScoreApp handleRequestAppScore={()=>{return}}/>)
  t.is(wrapper.type().target, "section")
})

test("inputState is web, so render WebInput", (t) => {
  const wrapper = shallow(<ApScoreApp handleRequestAppScore={()=>{return}}/>)
  wrapper.setState({ inputState: 'web' });
  t.is(wrapper.childAt(2).type(), WebInput)
})

test("inputState is game, so render GameInput", (t) => {
  const wrapper = shallow(<ApScoreApp handleRequestAppScore={()=>{return}}/>)
  wrapper.setState({ inputState: 'game' });
  t.is(wrapper.childAt(2).type(), GameInput)
})

test("inputState is native, so render NativeInput", (t) => {
  const wrapper = shallow(<ApScoreApp handleRequestAppScore={()=>{return}}/>)
  wrapper.setState({ inputState: 'native' });
  t.is(wrapper.childAt(2).type(), NativeInput)
})

// test("HomeApp section element", (t) => {
//   var wrapper = shallow(<HomeApp />)
//   t.is(wrapper.type(), "section")
// })

// test('HomeApp has svg', (t) => {
//   const wrapper = shallow(<HomeApp />);
//   t.is(wrapper.contains(<circle cx="75" cy="75" r="60" />), true);
// });


