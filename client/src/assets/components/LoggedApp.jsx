import React from 'react'
import { Route } from 'react-router-dom'

import HomeApp from './Home/HomeApp.jsx'
import RankApp from './Rank/RankApp.jsx'
import RivalApp from './Rival/RivalApp.jsx'
import SettingApp from './Setting/SettingApp.jsx'
import ApScoreApp from './ApScore/ApScoreApp.jsx'

export default class LoggedApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={props => <HomeApp score={this.props.score} LineGraphData={this.props.LineGraphData} handleRequestUserScore={this.props.handleRequestUserScore} />} />

        { this.props.user.region == "" || this.props.user.age == "" || this.props.user.category == "" ?  
        <Route path='/rank' render={props => <p>ランキング測定を行うためには「setting」から、地域・年齢・分野を設定し、ユーザー情報を更新してください。</p>} />: 
        <Route path='/rank' render={props => <RankApp BarChartData={this.props.BarChartData} handleRequestUserRank={this.props.handleRequestUserRank} user={this.props.user}  />} />
        }

        <Route path='/rival' render={props => <RivalApp />} />
        <Route path='/score/app' render={props => <ApScoreApp handleRequestAppScore={this.props.handleRequestAppScore}/>} />
        <Route path='/user/setting' render={props => <SettingApp user={this.props.user} handleRequestUserUpdate={this.props.handleRequestUserUpdate}/>} />
      </div>      
    )
  }
}