import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class WebInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        Name: "",
        Url: "",
        data: []
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.handleAddWebData = this.handleAddWebData.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleSendWebData = this.handleSendWebData.bind(this)
  }

  handleChangeName(e) {
    this.setState({ Name: e.target.value });
  }

  handleChangeUrl(e) {
    this.setState({ Url: e.target.value });
  }

  handleAddWebData() {
    const uuid = this.guid()
    const newWebData = { id: uuid, name: this.state.Name, url: this.state.Url }
    this.setState({ data: this.state.data.concat(newWebData) });
    this.setState({ Name: "" })
    this.setState({ Url: "" })
  }

  handleDeleteList(e) {
    const newWebData = this.state.data.filter(data => {
      return data.id !== e.target.id;
    });
    this.setState({ data: newWebData });
  }

  // TODO: apiへscore送信
  handleSendWebData() {
    // webDataをdispathcerに渡して、apiからscoreが帰って来るのをまつ
    // homeに飛ばす
    // scoreが帰ってきたとき、score stateが変更されて、topのscoreが変化する
    const param = {
      category: "web",
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
      <WebInputContainer>
        <div>
          <h1>WebInput</h1>
        </div>
        <FormGroup>
            <ControlLabel>webサイト名</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.Name}
              placeholder="webサイト名を入力してください"
              onChange={this.handleChangeName}
            />
            <ControlLabel>webサイトURL</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.Url}
              placeholder="webサイトURLを入力してください"
              onChange={this.handleChangeUrl}
            />
            <Button onClick={this.handleAddWebData}>登録</Button>
        </FormGroup>
        <div>
          <h1>登録予定のwebサイト</h1>
        </div>
        {(() => {
          return this.state.data.map((data) => (
            <div key={data.id}>   
              <p>{data.name} : {data.url}</p>
              <Button onClick={this.handleDeleteList} id={data.id}>削除</Button>
            </div>
            ))
        })()}  
        <div>
          <h1>webサイトscoreを計測する</h1>
          <Button onClick={this.handleSendWebData}>送信</Button>
        </div>
      </WebInputContainer >
    )
  }
}

const WebInputContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

