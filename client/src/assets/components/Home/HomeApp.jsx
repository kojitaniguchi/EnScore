import React from 'react';
import styled from 'styled-components';

export default class HomeApp extends React.Component {
  qiitaRedirectUrl
  githubRedirectUrl

  qiitaFlag
  githubFlag

  qiitaScore
  githubScore

  componentWillMount() {
    this.qiitaRedirectUrl = 'https://qiita.com/api/v2/oauth/authorize?client_id=b88e0f8d74808228dec172b7933e82dc3e6d5ea5&scope=read_qiita'
    this.githubRedirectUrl = 'https://github.com/login/oauth/authorize?client_id=3f9d2552863099f642b8&scope=user:email'
    this.githubFlag = false
    this.qiitaFlag = false

    // production用
    let qiitaScore = localStorage.getItem('qiita');
    let githubScore = localStorage.getItem('github');   

    this.githubScore = 0
    this.qiitaScore = 0

    // test用props
    // let JWT = this.props.test.JWT
    // let qiitaScore = this.props.test.qiita
    // let githubScore = this.props.test.github

    if (qiitaScore == null && githubScore !== null) {
      // 初回　github login　→ 2回目 qiita login
      this.githubFlag = true
      this.githubScore = githubScore
    } 
    if (githubScore == null && qiitaScore !== null) {
      // 初回　qiita login　→ 2回目 github login
      this.qiitaFlag = true
      this.qiitaScore = qiitaScore
    }
    if (qiitaScore !== null && githubScore !== null) {
      // 両アカウントでログイン済み
      this.qiitaFlag = true
      this.githubFlag = true
      this.githubScore = githubScore
      this.qiitaScore = qiitaScore

    }
  }

  render() {
    return (
      <HomeContainer>
        <div>
          <h1>EnScore</h1>
        </div>
        <CardBox>

          <ScoreCard>
            <p>qiitaスコア</p>
            <CircleBox>
              <h1>{this.qiitaScore}</h1>
              <QiitaCircle value={this.qiitaScore}>
                  <circle cx="75" cy="75" r="60" />
              </QiitaCircle>
            </CircleBox>
            {  this.qiitaFlag ? 
              <QiitaBotton qFlag={"qiitaFlagIsTrue"}>認証済み</QiitaBotton> : 
              <QiitaBotton qFlag={"qiitaFlagIsFalse"} href={"https://qiita.com/api/v2/oauth/authorize?client_id=866bd56b7cc0c2cbed2ba0ddb5e3e08f4de323d0&scope=read_qiita"}>qiitaアカウントと連携を許可する</QiitaBotton>
            }
          </ScoreCard>

          <ScoreCard>
            <p>githubスコア</p>
            <CircleBox>
              <h1>{this.githubScore}</h1>
              <GithubCircle value={this.githubScore}>
                  <circle cx="75" cy="75" r="60" />
              </GithubCircle>
            </CircleBox>
            {  this.githubFlag ? 
              <GithubBotton gFlag={"githubFlagIsTrue"}>認証済み</GithubBotton> : 
              <GithubBotton gFlag={"githubFlagIsFalse"} href={"https://github.com/login/oauth/authorize?client_id=e391fe29adceaf06ddbb&scope=user:email"}>githubアカウントと連携を許可する</GithubBotton>
            }
          </ScoreCard>

          <ScoreCard>
            <p>アプリスコア</p>
            <CircleBox>
              <h1>{this.props.score.app.value}</h1>
              <AppCircle value={this.props.score.app.value}>
                  <circle cx="75" cy="75" r="60" />
              </AppCircle>
            </CircleBox>
            <AppBotton>アプリスコアを計算する</AppBotton>
          </ScoreCard>
        </CardBox>
      </HomeContainer>
    )
  }
}

const HomeContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBox = styled.div`
  margin-bottom: 80px;
  background-color: white;
  width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 100px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
`;

const ScoreCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 300px;
`;

const CircleBox = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  & h1 {
    position: absolute;
    left: 79px;
    top: 41px;
  }
`;

const QiitaCircle = styled.svg`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 11px;
  left: 27px;
  transform: rotate(-90deg);

  & circle {
      fill: transparent;
      stroke: #74C13A;
      stroke-width: 6;
      animation: qiita_circle 2.5s;
      animation-fill-mode: forwards;
  }

  ${props => {
    if (props.value == 0) {
      return `@keyframes qiita_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: 0 370; }`
    } 
    const ratio  = 370 * (props.value/100)
    return `@keyframes qiita_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: ${ratio} 370; }`
    }
  }}
`;

const GithubCircle = styled.svg`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 11px;
  left: 27px;
  transform: rotate(-90deg);

  & circle {
      fill: transparent;
      stroke: #25292E;
      stroke-width: 6;
      animation: github_circle 2.5s;
      animation-fill-mode: forwards;
  }

  ${props => {
    if (props.value == 0) {
      return `@keyframes github_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: 0 370; }`
    } 
    const ratio  = 370 * (props.value/100)
      return `@keyframes github_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: ${ratio} 370; }`
    }
  }}
`;

const AppCircle = styled.svg`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 11px;
  left: 27px;
  transform: rotate(-90deg);

  & circle {
      fill: transparent;
      stroke: #F19436;
      stroke-width: 6;
      animation: app_circle 2.5s;
      animation-fill-mode: forwards;
  }

  ${props => {
    if (props.value == 0) {
      return `@keyframes app_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: 0 370; }`
    } 
    const ratio  = 370 * (props.value/100)
    return `@keyframes app_circle { 0% { stroke-dasharray: 0 370; } 100% { stroke-dasharray: ${ratio} 370; }`
    }
  }}
  
`;

const QiitaBotton = styled.a.attrs({
  id: props =>  props.qFlag
})`
  border: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #74C13A;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;

  ${props => {
    if (props.qFlag == "qiitaFlagIsTrue") {
      return `
        width: 97px;
        padding-left: 21px;
        pointer-events: none;
      `
    } 
    if (props.qFlag == "qiitaFlagIsFalse") {
      return `
        width: 249px;
        padding-right: 20px;
        padding-left: 20px;
        transition-duration: 700ms;
        &:hover {
          text-decoration: none;
          color: white;
          background-color: rgba(116, 193, 58, 0.7);
        }
      `
    } 
    }
  }
`;

const GithubBotton = styled.a.attrs({
   id: props =>  props.gFlag,
  })`
  border: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #25292E;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  ${props => {
    if (props.gFlag == "githubFlagIsTrue") {
      return `
        width: 97px;
        padding-left: 21px;
        pointer-events: none;
      `
    } 
    if (props.gFlag == "githubFlagIsFalse") {
      return `
        width: 262px;
        padding-right: 20px;
        padding-left: 20px;
        transition-duration: 700ms;
        &:hover {
          text-decoration: none;
          background-color: rgba(37, 41, 46, 0.7);
          color: white;
        }
      `
    } 
    }
  }
`;

const AppBotton = styled.a`
  border: 1px;
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

