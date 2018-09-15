import React from 'react'
import Chart from 'react-google-charts';
import styled from 'styled-components';

export default class RivalChart extends React.Component {
  render() {
    return (
        <CenterBox>
            <TimeLine>
                <Chart
                    width={'1000px'}
                    height={'150px'}
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={this.props.BarChartData.value}
                    options={{
                        avoidOverlappingGridLines: false,
                        allowHtml: true,
                        height: '150px'
                    }}
                    rootProps={{ 'data-testid': '9' }}
                />
                <p style={MaxNum}>{this.props.BarChartData.status.all}</p>
            </TimeLine> 
        </CenterBox>
    )
  }
}

const CenterBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeLine = styled.section`
  position: relative;
`;

const MaxNum = {
    position: "absolute",
    top: "31px",
    right: "-17px",
};