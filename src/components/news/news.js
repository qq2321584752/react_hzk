import React, { Component } from "react";
import { NavBar, Tabs } from "antd-mobile";

import Loader from "./Loader.js";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: ""
    };
  }

  tabs_change = (tab, index) => {
    switch (index) {
      case 0:
        this.one_tab(index + 1);
        break;
      case 1:
        this.tow_tab(index + 1);
        break;
      case 2:
        this.three_tab(index + 1);
        break;

      default:
        break;
    }
  };
  one_tab = index => {
    return <Loader type={index} />;
  };

  tow_tab = index => {
    return <Loader type={index} />;
  };

  three_tab = index => {
    return <Loader type={index} />;
  };
  render() {
    //
    const tabs = [{ title: "资讯" }, { title: "头条" }, { title: "问答" }];
    return (
      <div>
        <NavBar mode="light">
          {/* NavBar */}
          {this.props.title}
        </NavBar>

        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={this.tabs_change}
          // onTabClick={(tab, index) => {
          //
          // }}
        >
          {this.one_tab(1)}
          {this.tow_tab(2)}
          {this.three_tab(3)}

          {/* Content of third tab */}
          {/* <Loader num={1} /> */}
          {/* <Loader num={2} /> */}
          {/* <Loader num={3} /> */}
          {/* {this.tabs_change} */}
        </Tabs>
      </div>
    );
  }
}

export default News;
