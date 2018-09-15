import test from "ava"
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from "enzyme"
import React from 'react'

import HeaderLoggedApp from "../../src/assets/components/Header/HeaderLoggedApp.jsx"

configure({ adapter: new Adapter() });

test("HeaderLoggedApp is header element", (t) => {
    const user = { Name: "小島よしお" }
    const wrapper = shallow(<HeaderLoggedApp user={user}/>)
    t.is(wrapper.type().target, "header")
})

test("Header user name is changed props", (t) => {
    const user = { Name: "小島よしお" }
    const wrapper = shallow(<HeaderLoggedApp user={user}/>)
    t.is(wrapper.childAt(1).childAt(0).text(), "小島よしお")
})