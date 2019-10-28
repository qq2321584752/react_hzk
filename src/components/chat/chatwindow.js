import React, { Component } from "react";
import { NavBar, Icon, TextareaItem, Button } from "antd-mobile";
import axios from "../http";
import "./chatwindow.css";
import handle, { IMEvent } from "./wsclient";

const Chatlist = props => {
  const uid = localStorage.getItem("uid") - 0;
  // console.log(uid)

  // 详情聊天列表
  let list = props.listContent.map(item => {
    // console.log(item);

    // 如果item的form_user(3)等于当前登录的用户的uid=>right 反之left

    return (
      <li
        key={item.id}
        className={
          item.from_user !== uid ? "chat-info-left" : "chat-info-right"
        }
      >
        <img src={item.avatar} alt="莫得" />
        {/* <span className={'name'}>{item.chat_msg}</span> */}
        <span className={"info"}>{item.chat_msg}</span>
        {/* <span className={'time'}>{item.chat_msg}</span> */}
      </li>
    );
  });
  return list;
};
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      chat_msg: "abc",
      client: null
    };
  }
  backtochat = () => {
    // 回到上一页
    // ? chat.js state isShow
  };

  // 聊天第二步-> 接收消息

  componentDidMount = async () => {
    console.log(this.props.item);
    let { from_user, to_user } = this.props.item;
    let {
      data: { list }
    } = await axios.post("/chats/info", {
      from_user,
      to_user
    });
    this.setState({
      list
    });

    let uid = localStorage.getItem("uid");
    // 建立连接之后 会持续监听 数据 的 传输操作，ws会调用函数，传递实参过来
    // 形参输出 服务器返回的 数据
    let client = handle(uid, data => {
      //   console.log("Data returned by the server", data);
      // 服务器 返回的数据 就是 另一个 用户的 发送的 信息，我们要渲染的 页面上
      // 将逻辑处理放在函数单独处理
      this.reseMsg(data);
    });
    // console.log(client);

    this.setState({
      client
    });
    // console.log(this.state.list);
  };
  // 聊天关闭
  closeChat = () => {
    let { closechat } = this.props;
    closechat(false);
  };
  sendMsg = () => {
    // 1.点击发送消息 从状态里边 解构 出来客户端对象
    let { client } = this.state;
    // 2.根据已有数据 类型 塑造发送数据格式包，（列表点击的 时候的 组件传值）
    let {
      item: { from_user, to_user, avatar }
    } = this.props;
    let postdata = {
      from_user,
      to_user,
      avatar,
      id: Math.random() + "",
      chat_msg: this.state.chat_msg
    };
    //3. 对象身上的 触发发送事件 ，要发送的 类别，和 发送的数据 传输的 格式 要求json字符串，
    //! 不然发送不出去 ！！！JSON
    client.emitEvent(IMEvent.MSG_TEXT_SEND, JSON.stringify(postdata));
    // 4.将自己发送的数据 现在 自己的 对话列表显示，在原来的 聊天记录添加 自己编辑的 数据
    let list = [...this.state.list];
    list.push(postdata);
    this.setState({
      list
    });
    console.log("发送消息", client, postdata, JSON.stringify(postdata));

    // 设置消息格式和内容
  };
  reseMsg = data => {
    // console.log("Data returned by the server", data);
    // 服务器返回数据 格式 json
    // 转化为 正常对象·
    let {
      data: { content }
    } = data;
    // 调成记录的 所需格式 添加在记录里
    let list = [...this.state.list];
    list.push(JSON.parse(content));
    // 数据驱动试图更新
    this.setState({
      list
    });
    console.log(JSON.parse(content));
  };
  handleMsgChange = v => {
    this.setState({
      chat_msg: v
    });
  };
  render() {
    return (
      <div className="chat-window">
        <NavBar
          className="chat-window-title"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.backtochat}
        >
          <span>{this.props.item.username}</span>
        </NavBar>
        <div className="chat-window-content">
          <ul>
            <Chatlist listContent={this.state.list} />
          </ul>
        </div>
        <div>
          <div className="chat-window-input">
            <TextareaItem
              value={this.state.chat_msg}
              onChange={this.handleMsgChange}
              placeholder="请输入内容..."
            />
            <Button type="primary" onClick={this.closeChat}>
              关闭
            </Button>
            <Button onClick={this.sendMsg}>发送</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ChatWindow;
