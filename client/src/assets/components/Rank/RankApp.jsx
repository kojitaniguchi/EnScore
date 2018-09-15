import React from 'react';
import styled from 'styled-components';
import RankChart from './RankChart.jsx';
import { SplitButton, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class RankApp extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      region: "",
      age: "",
      category: ""
    }
    this.handleUpdateBotton = this.handleUpdateBotton.bind(this)
    this.handleClickRegion = this.handleClickRegion.bind(this)
    this.handleClickAge = this.handleClickAge.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleSearchBotton = this.handleSearchBotton.bind(this)
  }

  componentWillMount() {
    const params = {
      name : this.props.user.Name,
      region: this.props.user.region, 
      age: this.props.user.age, 
      category: this.props.user.category
    }
    this.props.handleRequestUserRank(params)
  }

  handleClickRegion(e) {
    this.setState({ region: e.target.innerHTML })
  }
  handleClickAge(e) {
    this.setState({ age: e.target.innerHTML })
  }
  handleClickCategory(e) {
    this.setState({ category: e.target.innerHTML })
  }

  handleUpdateBotton(e) {
    console.log("Rankを更新する")
    let param = {
      name: this.props.user.Name,
      region: this.props.BarChartData.status.user.region,
      age: this.props.BarChartData.status.user.age,
      category: this.props.BarChartData.status.user.category
    }
    // user state の region age defaultCategory を利用する
    // 初期化は HeaderReducer state ユーザーの　default 情報を使って this.props.handleRequestUserRank(param)

    this.props.handleRequestUserRank(param)
  }

  handleSearchBotton() {
    // 選択されたの　region age Category を利用する
    let param = {
      name: this.props.user.Name,
      region: this.state.region,
      age: this.state.age,
      category: this.state.category
    }
    console.log("測定する", param)
    this.props.handleRequestUserRank(param)
    this.setState({
      region: "",
      age: "",
      category: ""
    })
  }

  render() {
      let region = this.props.BarChartData.status.user.region
      let age = this.props.BarChartData.status.user.age
      let category = this.props.BarChartData.status.user.category
      let all = this.props.BarChartData.status.score.all
      let rank = this.props.BarChartData.status.score.rank
      let totalScore = this.props.BarChartData.status.score.totalScore

      let regions1 = ["北海道","青森県","秋田県","岩手県","宮城県","山形県","新潟県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川","山梨県","長野県","静岡県","愛知県","岐阜県","富山県","石川県","福井県","滋賀県","三重県","京都府","大阪府","奈良県","和歌山県","兵庫県","鳥取県","岡山県","島根県","広島県","山口県","香川県","徳島県","愛媛県","高知県","福岡県","大分県","佐賀県","長崎県","熊本県","宮崎県","鹿児島県","沖縄県"]
      let regions1List = regions1.map((region, index) => {
        return <p key={index + 1} onClick={this.handleClickRegion}>{region}</p>
      })
      let regions2 = ["北海道地方", "東北地方", "関東地方", "中部地方", "近畿地方", "中国地方", "四国地方", "九州・沖縄地方"]
      let regions2List = regions2.map((region, index) => {
        return <p key={index + 48} onClick={this.handleClickRegion}>{region}</p>
      })    
      let regions3 = ["東日本", "西日本", "全国"]
      let regions3List = regions3.map((region, index) => {
        return <p key={index + 56} onClick={this.handleClickRegion}>{region}</p>
      })  
      
      let ages = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
      let ageList = ages.map((a, index) => {
        return <p key={index + 1} onClick={this.handleClickAge}>{a}</p>
      }) 

      let categories = ["web", "ゲーム", "ネイティブ"]
      let categoryList = categories.map((c, index) => {
        return <p key={index + 1} onClick={this.handleClickCategory}>{c}</p>
      })      
    return (
      <RankContainer>
          <ColumnBox>
          <h1>{region}：{category}：{age}歳</h1>
          <p>でのあなたのランキング</p>
          <RankChart BarChartData={this.props.BarChartData}/>
          <p>あなたは{region}の{category}エンジニア学生({age}歳){all}人中、{rank}番目です。</p>
          <p>あなたのtotalスコア: {totalScore}</p>
          <UpdateBotton onClick={this.handleUpdateBotton}>同じ条件で更新する</UpdateBotton>
        </ColumnBox>
         <ColumnBox>
          <h1>地域：年齢：分野から自分のランキングを測定する</h1>
          <CardBox>
            <RegionColumnCard>
            <h4>選択した地域:</h4>
            <h3>{this.state.region}</h3>
            <FlexCard>
              <SplitButton
                title={"都道府県"}
              >
              {regions1List}
              </SplitButton>
              <SplitButton
                title={"地方別"}
              >
              {regions2List}
              </SplitButton>
              <SplitButton
                title={"東西・全国"}
              >
                {regions3List}
              </SplitButton>
              </FlexCard>
            </RegionColumnCard>
            <ColumnCard>
            <h4>選択した年齢：</h4>
            <h3>{this.state.age}</h3>
              <SplitButton
                title={"年齢を選ぶ"}
              >
               {ageList}
              </SplitButton>
            </ColumnCard>
            <ColumnCard>
            <h4>選択した分野：</h4>
            <h3>{this.state.category}</h3>
              <SplitButton
                title={"分野を選ぶ"}
              >
               {categoryList}
              </SplitButton>
            </ColumnCard>
            <UpdateBotton onClick={this.handleSearchBotton}>測定する</UpdateBotton>
          </CardBox>
        </ColumnBox>
     </RankContainer>
    )
  }
}

const CardBox = styled.div`
  background-color: white;
  width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 100px;
`;

const FlexCard = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  & SplitButton {
  text-align: center;
  }
`;

const ColumnBox = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: white;
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
`;

const ColumnCard = styled.div`
  height: 200px;
  width: 160px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegionColumnCard = styled.div`
  height: 200px;
  width: 460px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RankContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateBotton = styled.button`
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
