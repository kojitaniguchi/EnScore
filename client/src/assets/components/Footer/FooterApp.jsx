import React from 'react'
import styled from 'styled-components';

export default class FooterApp extends React.Component {
  render() {
    return (
      <Footer>
        <h1>footer</h1>
      </Footer>
    )
  }
}

const Footer = styled.footer`
  height: 100px;
  font-size: 1.5rem;
  text-align: center;
  color: #FFC507;
  background: #353B41;
`;
