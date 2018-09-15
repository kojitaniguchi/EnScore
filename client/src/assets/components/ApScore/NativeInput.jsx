import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


export default class NativeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Name: "",
        Download: "",
        data: []
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDownload = this.handleChangeDownload.bind(this)
    this.handleAddNativeData = this.handleAddNativeData.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleSendNativeData = this.handleSendNativeData.bind(this)
  }

  handleChangeName(e) {
    this.setState({ Name: e.target.value });
  }

  handleChangeDownload(e) {
    this.setState({ Download: e.target.value });
  }

  handleAddNativeData() {
    const uuid = this.guid()
    const newNativeData = { id: uuid, name: this.state.Name, download: this.state.Download }
    this.setState({ data: this.state.data.concat(newNativeData) });
    this.setState({ Name: "" })
    this.setState({ Download: "" })
  }

  handleDeleteList(e) {
    const newNativeData = this.state.data.filter(d => {
      return d.id !== e.target.id;
    });
    this.setState({ data: newNativeData });
  }

  // TODO: apiへscore送信
  handleSendNativeData() {
    // NativeDataをdispathcerに渡して、apiからscoreが帰って来るのをまつ
    // homeに飛ばす
    // scoreが帰ってきたとき、score stateが変更されて、topのscoreが変化する
    const par = {
      category: "native",
      data: this.state.data
    }
    this.props.handleRequestAppScore(par)
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
      <NativeInputContainer>
        <div>
          <h1>NativeInput</h1>
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
            <Button onClick={this.handleAddNativeData}>登録</Button>
        </FormGroup>
        <div>
          <h1>登録予定のNativeアプリ</h1>
        </div>
        {(() => {
          return this.state.data.map((d) => (
            <div key={d.id}>   
              <p>{d.name} : {d.download}</p>
              <Button onClick={this.handleDeleteList} id={d.id}>削除</Button>
            </div>
            ))
        })()}  
        <div>
          <h1>Nativeアプリscoreを計測する</h1>
          <Button onClick={this.handleSendNativeData}>送信</Button>
        </div>
      </NativeInputContainer >
    )
  }
}

const NativeInputContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
