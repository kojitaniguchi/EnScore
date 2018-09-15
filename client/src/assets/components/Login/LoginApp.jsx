import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

export default class LoginApp extends React.Component {
  qiitaRedirectUrl
  githubRedirectUrl

  componentWillMount() {
    this.qiitaRedirectUrl = 'https://qiita.com/api/v2/oauth/authorize?client_id=578ca02351facf9f4c535bd7b62d0f2b9a750945&scope=read_qiita'
    this.githubRedirectUrl = 'https://github.com/login/oauth/authorize?client_id=Iv1.d882cbd0a00cefe1'
  }

  handleQiitaBotton() {
    console.log("handleQiitaBotton")
    localStorage.setItem('qiita_jwt', "qiita");
  }

  handleGithubBotton() {
    console.log("handleGithubBotton")
    localStorage.setItem('github_jwt', "github");
  }

  render() {
    return (
      <LoginContainer>
        <h1>Login</h1>
        <p>このサイトはqiitaアカウント、またはgithubアカウントを利用しログインすることができます。</p>
        <FlexBox>
          {/* <Link style={NoUnderline} to='/'><QiitaBotton onClick={this.handleQiitaBotton} style={NoUnderline}>qiitaアカウントでログインする</QiitaBotton></Link>
          <Link style={NoUnderline} to='/'><GithubBotton onClick={this.handleGithubBotton} style={NoUnderline}>githubアカウントでログインする</GithubBotton></Link> */}
          <QiitaBotton href={this.qiitaRedirectUrl}>qiitaアカウントでログインする</QiitaBotton>
          <GithubBotton href={this.githubRedirectUrl}>githubアカウントでログインする</GithubBotton>
        </FlexBox>
      </LoginContainer>
    )
  }
}

const LoginContainer = styled.section`
  margin-top: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.section`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    color: white;
    background-color: rgba(116, 193, 58, 0.8);
  }
`;

const GithubBotton = styled.a`
  margin-left: 15px;
  border: 1px;
  padding: 15px;
  background-color: #25292E;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  color: white;
  transition-duration: 700ms;

  &:hover {
    color: white;
    background-color: rgba(37, 41, 46, 0.8);
  }
`;

const NoUnderline = {
  textDecoration: "none"
};