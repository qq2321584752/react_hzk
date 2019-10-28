import React, { Component } from "react";
import { NavBar } from "antd-mobile";
import axios from "../http";
import "./chat.css";
import Chatwindow from "./chatwindow.js";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLocked: false,
      item: {}
    };
  }
  async componentWillMount() {
    let {
      data: { list }
    } = await axios.post("/chats/list");
    this.setState({
      list
    });
    console.log(list);
  }
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  showChatwindow = item => {
    this.setState({
      isLocked: true,
      item
    });
    console.log("click");
  };
  // closechat = lock => {
  //   this.setState({
  //     isLocked: lock
  //   });
  // };
  render() {
    var chat_list = this.state.list.map((item, k) => {
      return (
        <li key={item.id} onClick={this.showChatwindow.bind(this, item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter" />
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      );
    });
    return (
      <div>
        {this.state.isLocked && (
          <Chatwindow
            closechat={lock => {
              this.setState({
                isLocked: lock
              });
            }}
            item={this.state.item}
          />
        )}
        <NavBar mode="light">
          {/* NavBar */}
          {this.props.title}
        </NavBar>
        <div className="chat-list">
          <ul>{chat_list}</ul>
        </div>
      </div>
    );
  }
}

export default Chat;
