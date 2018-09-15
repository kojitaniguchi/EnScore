import React from 'react'
import { Route } from 'react-router-dom'

import HomeApp from './Home/HomeApp.jsx'

export default class NormalApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={props => <HomeApp score={this.props.score} LineGraphData={this.props.LineGraphData} handleRequestUserScore={this.props.handleRequestUserScore} />} />
      </div>      
    )
  }
}