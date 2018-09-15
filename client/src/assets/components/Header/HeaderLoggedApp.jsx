import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

export default class HeaderLoggedApp extends React.Component {
  handleLogout() {
    localStorage.removeItem('JWT');
  }
  render() {
    return (
      <Header>
        <h1><Link to='/'>Go Realize</Link></h1>
        <ButtonList>
          <div>{this.props.user.Name}</div>
          <div><Link to='/'>Home</Link></div>
          <div><Link to='/rank'>Rank</Link></div>
          <div><Link to='/rival'>Rival</Link></div>
          <div><Link to='/user/setting'>Setting</Link></div>
          <div onClick={this.handleLogout}><Link to='/'>Logout</Link></div>
        </ButtonList>
      </Header>
    )
  }
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);

  & h1 {
    margin-left: 40px;
    color: #202124;
  }
`;

const ButtonList = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  & a {
    text-decoration: none;
    color: #202124;
  }

  & div {
    transition-duration: 700ms;
    padding: 18px;
    text-decoration: none;
    color: #202124;
  }

  & div:hover {
    padding: 18px;
    text-decoration: none;
    background-color: rgba(0,0,0,0.2);
  }

`;
