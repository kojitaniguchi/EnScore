import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel, Button, SplitButton } from 'react-bootstrap';

export default class SettingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Name: this.props.user.Name,
        region: this.props.user.region,
        age: this.props.user.age,
        category: this.props.user.category,
        data: {
          Name: "",
          region: "",
          age: "",
          category: ""
        }
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleClickRegion = this.handleClickRegion.bind(this)
    this.handleClickAge = this.handleClickAge.bind(this)
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleConfirmData = this.handleConfirmData.bind(this)
    this.handleDeleteData = this.handleDeleteData.bind(this)
    this.handleSendNewUserData = this.handleSendNewUserData.bind(this)
  }

  handleChangeName(e) {
    this.setState({ Name: e.target.value });
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

  handleConfirmData() {
    const newData = { Name: this.state.Name, region: this.state.region, age: this.state.age, category: this.state.category }
    this.setState({ data: newData });
    this.setState({ Name: "" })
    this.setState({ region: "" })
    this.setState({ age: "" })
    this.setState({ category: "" })
  }

  handleDeleteData(e) {
    this.setState({ data: {
      Name: "",
      region: "",
      age: "",
      category: ""
    } });
  }

  handleSendNewUserData() {
    // 地域と年齢を登録。これからランク機能が使えるようになる。
    console.log("handleRequestUserUpdate")
    this.props.handleRequestUserUpdate(this.state.data)
    this.setState({ data: {
      Name: "",
      region: "",
      age: "",
      category: ""
    } });
  }

  render() {
    let regions1 = ["北海道","青森県","秋田県","岩手県","宮城県","山形県","新潟県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川","山梨県","長野県","静岡県","愛知県","岐阜県","富山県","石川県","福井県","滋賀県","三重県","京都府","大阪府","奈良県","和歌山県","兵庫県","鳥取県","岡山県","島根県","広島県","山口県","香川県","徳島県","愛媛県","高知県","福岡県","大分県","佐賀県","長崎県","熊本県","宮崎県","鹿児島県","沖縄県"]
    let regions1List = regions1.map((region, index) => {
      return <p key={index + 1} onClick={this.handleClickRegion}>{region}</p>
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
      <SettingContainer>
        <h1>現在のユーザー情報</h1>
        <p>ユーザーネーム: {this.props.user.Name}</p>
        <p>地域: {this.props.user.region}</p>
        <p>年齢: {this.props.user.age}</p>
        <p>分野: {this.props.user.category}</p>
        
        <h1>ユーザー情報の更新</h1>
        <p>*分野選択はtopでのアプリスコア、rank機能のスコア換算の時のでdefaltで使用したいアプリケーション分野を選択してください</p>
          <SettingbInputContainer>
          <FormGroup>
              <ControlLabel>ユーザー名</ControlLabel>
              <FormControl 
                type="text"
                value={this.state.Name}
                placeholder="名前"
                onChange={this.handleChangeName}
              />
              {this.state.region}
              <SplitButton
                title={"都道府県"}
              >
              {regions1List}
              </SplitButton>
              {this.state.age}
              <SplitButton
                title={"年齢を選ぶ"}
              >
               {ageList}
              </SplitButton>
              {this.state.category}
              <SplitButton
                title={"分野を選ぶ"}
              >
               {categoryList}
              </SplitButton>
              <Button onClick={this.handleConfirmData}>登録情報の確認</Button>
          </FormGroup>
          <div>
            <h1>新しいユーザー情報</h1>
            <p>ユーザー名：{this.state.data.Name}</p>
            <p>地域：{this.state.data.region}</p>
            <p>年齢：{this.state.data.age}</p>
            <p>カテゴリー：{this.state.data.category}</p>
            <Button onClick={this.handleDeleteData}>取り消し</Button>
          </div>
          <div>
            <Button onClick={this.handleSendNewUserData}>更新</Button>
          </div>
        </SettingbInputContainer >
      </SettingContainer>
    )
  }
}

const SettingbInputContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WebBotton = styled.button`
  border: 1px;
  outline: none;
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

const GameBotton = styled.button`
  outline: none;
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

const NativeBotton = styled.button`
  outline: none;
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