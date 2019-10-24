import React from "react";
import { TabBar } from "antd-mobile";
import Main from "../main/main.js";
import News from "../news/news.js";
import Mine from "../mine/mine.js";
import Chat from "../chat/chat.js";

import { jsondata } from "../Tarbar.json";

import "./home.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
      fullScreen: false,
      jsondata
    };
  }

  renderContent(pageText) {
    // console.log(this.props.history);

    // console.log(jsondata_);

    switch (pageText) {
      case "main":
        return <Main history={this.props.history} />;
      case "news":
        return <News />;
      case "chat":
        return <Chat />;
      case "mine":
        return <Mine />;
      default:
    }
    // console.log(pageText);

    // return (
    //   <div>
    //     <Main />
    //   </div>
    // );
  }

  render() {
    var { jsondata } = this.state;
    var list = jsondata.map(item => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.key}
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background: `${item.icon}`
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background: `${item.selectedIcon}`
              }}
            />
          }
          selected={this.state.selectedTab === `${item.key}`}
          onPress={() => {
            this.setState({
              selectedTab: `${item.key}`
            });
          }}
          data-seed="logId"
        >
          {this.renderContent(`${item.key}`)}
        </TabBar.Item>
      );
    });

    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "100%", width: "100%", top: 0 }
            : { height: "100%" }
        }
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {list}
        </TabBar>
      </div>
    );
  }
}

export default Home;

/*
  <div>
          <TabBar.Item
            title="主页"
            key="Life"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "blueTab"}
            onPress={() => {
              this.setState({
                selectedTab: "blueTab"
              });
            }}
            data-seed="logId"
          >
            {this.renderContent("main")}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="资讯"
            key="Koubei"
            selected={this.state.selectedTab === "redTab"}
            onPress={() => {
              this.setState({
                selectedTab: "redTab"
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent("news")}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="微聊"
            key="Friend"
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              this.setState({
                selectedTab: "greenTab"
              });
            }}
          >
            {this.renderContent("chat")}
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
            }}
            selectedIcon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
            }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === "yellowTab"}
            onPress={() => {
              this.setState({
                selectedTab: "yellowTab"
              });
            }}
          >
            {this.renderContent("mine")}
          </TabBar.Item>
        </div>
*/
