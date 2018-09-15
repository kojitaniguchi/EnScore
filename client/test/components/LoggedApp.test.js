import test from "ava"
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from "enzyme"

import LoggedApp from "../../src/assets/components/LoggedApp.jsx"

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

configure({ adapter: new Adapter() });

test("LoggedApp div element", (t) => {
  const user = { Name: "", region: "", age: "", category: "" }
  var wrapper = shallow(<LoggedApp user={user}/>)
  t.is(wrapper.type(), "div")
})

test("user info is not sufficient, so render setting message", (t) => {
  const user = { Name: "", region: "", age: "", category: "" }
  var wrapper = shallow(<LoggedApp user={user}/>)
  t.is(wrapper.contains(<Route path='/rank' render={props => <RankApp BarChartData={this.props.BarChartData} handleRequestUserRank={this.props.handleRequestUserRank} user={this.props.user}  />} />), false)
})


