import React from 'react'
import Chart from 'react-google-charts';
import styled from 'styled-components';

export default class HomeChart extends React.Component {
  render() {
    return (
        <CenterBox>
            { this.props.LineGraphData.value.length <= 2 ? 
                <p>推移グラフを出すためには二日以上計測する必要があります。</p>:
                <Chart
                    width={'1000px'}
                    height={'600px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={this.props.LineGraphData.value}
                    options={{
                        chart: {
                        title: 'あなたのスコアの推移',
                        },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            }
        </CenterBox>
    )
  }
}

const CenterBox = styled.section`
  width: 1100px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 60px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
`;