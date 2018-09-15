import React from 'react'
import Chart from 'react-google-charts';
import styled from 'styled-components';

export default class RivalChart extends React.Component {
  render() {
    return (
        <CenterBox>
            <Chart
                width={'1000px'}
                height={'600px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['カテゴリー', 'あなた', 'ライバル'],
                    ['qiitaスコア', 40, 46],
                    ['githubスコア', 50, 60],
                    ['アプリスコア', 64, 79]
                ]}
                options={{
                    chart: {
                    title: 'あなたとライバルのスコアグラフ',
                },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
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

const TimeLine = styled.section`
  position: relative;
`;

const MaxNum = {
    position: "absolute",
    top: "31px",
    right: "-17px",
};