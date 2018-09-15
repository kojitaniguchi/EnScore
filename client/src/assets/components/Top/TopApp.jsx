import React from 'react'
import styled from 'styled-components';
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom'

export default class TopApp extends React.Component {
  constructor(props) {
    super(props);
    const data = {
      score: {
        qiita: {
          value: 90,
          authorization: true
      },
      github: {
          value: 93,
          authorization: true
      },
      app: {
          value: 98,
          authorization: false
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
          ["2018/1/3", 60,  30, 40, 30],
          ["2018/2/12", 144, 50, 58, 34],
          ["2018/3/3", 154,  50, 50, 54],
          ["2018/4/12", 179, 60, 63, 56],
          ["2018/5/3", 198,  66, 66, 66],
          ["2018/6/12", 229, 78, 79, 72],
          ["2018/7/12", 252, 83, 82, 88],
          ["2018/8/12", 281, 90, 93, 98],
        ]
      }
    }
    this.state = { data };
  }

  render() {
    return (
      <TopContainer>
        <Layer>
          <h1>全国のエンジニア学生との距離を知ろう</h1>
          <Link style={NoUnderline} to='/login'><StartBotton style={NoUnderline}>全国のエンジニアとの距離を測る</StartBotton></Link>
        </Layer>
        <MiddleBox>
          <h1>自分の成果物をスコア化し実力を把握する</h1>
          <p>qiitaやgithub、自分のオリジナルアプリ(webサービス、ゲーム、ネイティブアプリ)のダウンロード数などをもとにスコアを算出</p>
          <p>スコアをもとに全国のエンジニア学生の中での自分の順位が測定できます</p>
          <p>自分がエンジニア学生の中でどれほどの実力なのか知ることができるサービスです</p>
        </MiddleBox>
        <h1>トップエンジニア学生のスコア例</h1>
        <CardBox>
          <ScoreCard>
            <p>qiitaスコア</p>
            <CircleBox>
              <h1>{this.state.data.score.qiita.value}</h1>
              <QiitaCircle value={this.state.data.score.qiita.value}>
                  <circle cx="75" cy="75" r="60" />
              </QiitaCircle>
            </CircleBox>
          </ScoreCard>
          <ScoreCard>
            <p>githubスコア</p>
            <CircleBox>
              <h1>{this.state.data.score.github.value}</h1>
              <GithubCircle value={this.state.data.score.github.value}>
                  <circle cx="75" cy="75" r="60" />
              </GithubCircle>
            </CircleBox>
          </ScoreCard>
          <ScoreCard>
            <p>アプリスコア</p>
            <CircleBox>
              <h1>{this.state.data.score.app.value}</h1>
              <AppCircle value={this.state.data.score.app.value}>
                  <circle cx="75" cy="75" r="60" />
              </AppCircle>
            </CircleBox>
          </ScoreCard>
        </CardBox>
        <CenterBox>
        <Chart
            width={'1000px'}
            height={'600px'}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={this.state.data.graph.value}
            options={{
                chart: {
                title: 'トップ学生エンジニアのスコア',
                },
            }}
            rootProps={{ 'data-testid': '3' }}
        />
        </CenterBox>
        <MiddleBox>
          <h1>さっそく自分の実力を計測してみる</h1>
          <Link style={NoUnderline} to='/login'><StartBotton style={NoUnderline}>全国のエンジニアとの距離を測る</StartBotton></Link>
        </MiddleBox>
      </TopContainer>
    )
  }
}

const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    margin-bottom: 70px;  }
`;

const CenterBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 60px;
  border-radius: 2px;
`;

const MiddleBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding-bottom: 40px;
  padding-top: 90px;
  margin-bottom: 60px;
  border-radius: 2px;
  & h1 {
    margin-bottom: 75px;
  }
`;

const Layer = styled.div`
  width: 100%;
  height: 570px;
  background-image: url("./img/gorila.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0.9;

  & h1 {
    margin-top: 190px;
    margin-bottom: 150px;
    color: white;
    opacity: 1;
  }
`

const NoUnderline = {
  textDecoration: "none"
};

const CardBox = styled.div`
  margin-top: 10px;
  position: relative;
  top: 0;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 2px;
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
    left: 82px;
    top: 47px;
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

const StartBotton = styled.a`
  margin-top: 30px;
  margin-left: 15px;
  border: 1px;
  padding: 25px;
  background-color: #25292E;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;

  &:hover {
    color: white;
    background-color: rgba(37, 41, 46, 1);
  }
`;