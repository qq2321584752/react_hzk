import React from "react";
import "./login.css";
import {
  NavBar,
  Flex,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank,
  Toast
} from "antd-mobile";

import axios from "../http.js";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "tom",
      password: "123"
    };
  }

  render() {
    // 受控input;
    const hand_input = (val, key) => {
      // console.log(val, key);
      this.setState({
        // 中框号 里为 es6写法 放置一个 变量属性名
        [key]: val
      });
    };

    // 点击按钮发送登录请求
    const submit = async () => {
      var obj = {
        uname: this.state.username,
        pwd: this.state.password
      };
      // alert(this.state.username);

      var {
        data: { token },
        meta: { status, msg }
      } = await axios.post("/users/login", obj);

      console.log(status);

      if (status === 200) {
        // console.log(token);
        localStorage.setItem("token", token);
        // localStorage.removeItem("token");
        Toast.success("Load success !!!", 1);
        let { history } = this.props;
        history.push("/home");
        // console.log(history);
      } else {
        Toast.fail(msg, 1);
      }
      // console.log(status, msg);

      // console.log(obj);
    };
    // 解构出来表单对象
    let { username, password } = this.state;
    return (
      <div>
        <NavBar mode="dark">登录</NavBar>
        <WhiteSpace />
        <Flex direction="column" wrap="wrap">
          <Flex.Item>
            <WingBlank size="sm">
              {/* 两个输入框绑定一个事件 */}
              <InputItem
                onChange={val => {
                  hand_input(val, "username");
                }}
                value={username}
                placeholder="controled username"
              >
                账号
              </InputItem>
              <InputItem
                onChange={val => {
                  hand_input(val, "password");
                }}
                value={password}
                placeholder="controled password"
              >
                密码
              </InputItem>
            </WingBlank>
          </Flex.Item>
          <Flex.Item>
            <WhiteSpace />
            <WingBlank>
              <Button onClick={submit} type="primary">
                登录
              </Button>
            </WingBlank>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default Login;
