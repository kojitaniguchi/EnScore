import React from 'react';
import styled from 'styled-components';
import RivalChart from './RivalChart.jsx';
import ProgressChart from '../Chart/ProgressChart.jsx'

export default class RivalApp extends React.Component {
  render() {
    return (
      <RivalContainer>
        <h1>ライバルのスコア</h1>
        <ProgressChart />
        <RivalChart />
      </RivalContainer>
    )
  }
}

const RivalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

