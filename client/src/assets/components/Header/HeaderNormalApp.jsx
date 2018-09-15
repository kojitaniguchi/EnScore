import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

export default class HeaderNormalApp extends React.Component {
  render() {
    return (
      <Header>
        <h1><Link to='/' style={NoUnderline}>Go Realize</Link></h1>
        <ButtonList>
          <div><Link to='/'>Top</Link></div>
          <div><Link to='/login'>login</Link></div>
        </ButtonList>
      </Header>
    )
  }
}

const NoUnderline = {
  textDecoration: "none",
  color: "#202124"
};

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
