import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class GameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Name: "",
        Download: "",
        data: []
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDownload = this.handleChangeDownload.bind(this)
    this.handleAddGameData = this.handleAddGameData.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleSendGameData = this.handleSendGameData.bind(this)
  }

  handleChangeName(e) {
    this.setState({ Name: e.target.value });
  }

  handleChangeDownload(e) {
    this.setState({ Download: e.target.value });
  }

  handleAddGameData() {
    const uuid = this.guid()
    const newGameData = { id: uuid, name: this.state.Name, download: this.state.Download }
    this.setState({ data: this.state.data.concat(newGameData) });
    this.setState({ Name: "" })
    this.setState({ Download: "" })
  }

  handleDeleteList(e) {
    const newGameData = this.state.data.filter(data => {
      return data.id !== e.target.id;
    });
    this.setState({ data: newGameData });
  }

  // TODO: apiへscore送信
  handleSendGameData() {
    // GameDataをdispathcerに渡して、apiからscoreが帰って来るのをまつ
    // homeに飛ばす
    // scoreが帰ってきたとき、score stateが変更されて、topのscoreが変化する
    const param = {
      category: "game",
      data: this.state.data
    }
    this.props.handleRequestAppScore(param)
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  render() {
    return (
      <GameInputContainer>
        <div>
          <h1>GameInput</h1>
        </div>
        <FormGroup>
            <ControlLabel>ゲーム名</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.Name}
              placeholder="ゲーム名を入力してください"
              onChange={this.handleChangeName}
            />
            <ControlLabel>ダウンロード数</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.Download}
              placeholder="ダウンロード数を入力してください"
              onChange={this.handleChangeDownload}
            />
            <Button onClick={this.handleAddGameData}>登録</Button>
        </FormGroup>
        <div>
          <h1>登録予定のゲーム</h1>
        </div>
        {(() => {
          return this.state.data.map((data) => (
            <div key={data.id}>   
              <p>{data.name} : {data.download}</p>
              <Button onClick={this.handleDeleteList} id={data.id}>削除</Button>
            </div>
            ))
        })()}  
        <div>
          <h1>ゲームscoreを計測する</h1>
          <Button onClick={this.handleSendGameData}>送信</Button>
        </div>
      </GameInputContainer >
    )
  }
}

const GameInputContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
