import React from 'react';
import styled from 'styled-components';
import WebInput from './WebInput.jsx';
import GameInput from './GameInput.jsx';
import NativeInput from './NativeInput.jsx';

export default class ApScoreApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputState: ''
    };
    this.handleWebBotton = this.handleWebBotton.bind(this);
    this.handleGameBotton = this.handleGameBotton.bind(this);
    this.handleNativeBotton = this.handleNativeBotton.bind(this);
  }

  handleWebBotton() {
    this.setState({ inputState: 'web' })
  }
  handleGameBotton() {
    this.setState({ inputState: 'game' })
  }
  handleNativeBotton() {
    this.setState({ inputState: 'native' })
  }
  render() {
    return (
      <ApScoreContainer>
        <h1>アプリスコアを算出する</h1>
        <CenterBox>
          <WebBotton onClick={this.handleWebBotton} >webサービスのスコアを算出する</WebBotton>
          <GameBotton onClick={this.handleGameBotton} >gameのスコアを算出する</GameBotton>
          <NativeBotton onClick={this.handleNativeBotton} >nativeアプリのスコアを算出する</NativeBotton>
        </CenterBox>  
        {(() => {
          switch(this.state.inputState) {
            case 'web':
                return <WebInput handleRequestAppScore={this.props.handleRequestAppScore}/>
                break;
         
            case 'game':
                return <GameInput handleRequestAppScore={this.props.handleRequestAppScore}/>
                break;
         
            case 'native':
                return <NativeInput handleRequestAppScore={this.props.handleRequestAppScore}/>
                break;
    
            default:
                return <p>アプリカテゴリーを選んでください</p>
                break;
          }
        })()}  
      </ApScoreContainer>
    )
  }
}

const CenterBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApScoreContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WebBotton = styled.button`
  border: 1px;
  outline: none;
  padding: 15px;
  background-color: #74C13A;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;
  transition-duration: 700ms;

  &:hover {
    background-color: rgba(116, 193, 58, 0.7);
  }

`;

const GameBotton = styled.button`
  outline: none;
  padding: 15px;
  background-color: #25292E;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;
  transition-duration: 700ms;

  &:hover {
    background-color: rgba(37, 41, 46, 0.7);
  }
`;

const NativeBotton = styled.button`
  outline: none;
  padding: 15px;
  background-color: #F19436;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;
  transition-duration: 700ms;

  &:hover {
    background-color: rgba(241, 148, 54, 0.7);
  }
`;