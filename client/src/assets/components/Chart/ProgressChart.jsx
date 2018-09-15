import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'


export default class ProgressChart extends React.Component {

    componentDidMount() {

    }

  render() {
    return (
        <CardBox>

          <ScoreCard>
            <p>qiitaスコア</p>
            <CircleBox>
              <h1>92</h1>
              <QiitaCircle>
                  <circle cx="75" cy="75" r="60" />
              </QiitaCircle>
            </CircleBox>
            <Link style={NoUnderline} to='/'><QiitaBotton>qiitaスコアを計算する</QiitaBotton></Link>
          </ScoreCard>

          <ScoreCard>
            <p>githubスコア</p>
            <CircleBox>
              <h1>50</h1>
              <GithubCircle>
                  <circle cx="75" cy="75" r="60" />
              </GithubCircle>
            </CircleBox>
            <GithubBotton href='https://github.com/login/oauth/authorize?client_id=3f9d2552863099f642b8'>githubスコアを計算する</GithubBotton>
          </ScoreCard>

          <ScoreCard>
            <p>アプリスコア</p>
            <CircleBox>
              <h1>70</h1>
              <AppCircle>
                  <circle cx="75" cy="75" r="60" />
              </AppCircle>
            </CircleBox>
            <Link style={NoUnderline} to='/score/app'><AppBotton>アプリスコアを計算する</AppBotton></Link>
          </ScoreCard>
          
        </CardBox>
    )
  }
}

const NoUnderline = {
  textDecoration: "none"
};

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

  @keyframes qiita_circle {
    0% { stroke-dasharray: 0 370; }
    100% { stroke-dasharray: 320 370; }
  }
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

  @keyframes github_circle {
    0% { stroke-dasharray: 0 370; }
    100% { stroke-dasharray: 185 370; }
  }
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

  @keyframes app_circle {
    0% { stroke-dasharray: 0 370; }
    100% { stroke-dasharray: 260 370; }
  }
`;

const QiitaBotton = styled.a`
  border: 1px;
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

const GithubBotton = styled.a`
  border: 1px;
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

