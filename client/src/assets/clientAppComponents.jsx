import React from 'react'
import PropTypes from 'prop-types'

import NormalApp from './components/NormalApp.jsx'

import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom'

import Cookies from 'universal-cookie';
 

class clientApp extends React.Component {
  flag;

  componentWillMount() {
    //  login判定はここでいい感じにする
    const cookies = new Cookies();
    console.log("universal-cookie", cookies)
    console.log("cookies.get('github')", cookies.get('github'))
    console.log("cookies.get('qiita')", cookies.get('qiita'))

    if (cookies.get('github') !== undefined) {
      localStorage.setItem('github', cookies.get('github'));
    } 
    if (cookies.get('qiita') !== undefined) {
      localStorage.setItem('qiita', cookies.get('qiita'));
    }

    // localStorage.setItem('github', '10');
    // localStorage.setItem('qiita', '30');

    // localStorage.removeItem('github');
    // localStorage.removeItem('qiita');
  }
  
  render() {
    return (
      <BrowserRouter>
        <AppContainer>
          <div className="main">
                   <NormalApp 
                    user={this.props.user}
                    score={this.props.score} 
                    LineGraphData={this.props.LineGraphData} 
                    BarChartData={this.props.BarChartData} 
                  />
          </div>
        </AppContainer>
      </BrowserRouter>
    )
  }
}

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

clientApp.propTypes = {
  handleRequestScore: PropTypes.func,
  score: PropTypes.object,
  LineGraphData: PropTypes.object,
}

export default clientApp