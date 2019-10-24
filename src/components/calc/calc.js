import React, { Component } from "react";
import {
  NavBar,
  Icon,
  Card,
  Tabs,
  SegmentedControl,
  InputItem,
  Button
} from "antd-mobile";

import ReactEcharts from "echarts-for-react";
// import axios from "../http.js";
import "./calc.css";
class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title_list: [
        {
          id: 1,
          title: "贷款方式",
          values: [
            { value: "按贷款总额", val: 1 },
            { value: "按面积算", val: 2 }
          ]
        },
        {
          id: 2,
          title: "贷款年限",
          values: [{ value: "10" }, { value: 20 }, { value: 30 }]
        },
        {
          id: 3,
          title: "贷款利率",
          values: [{ value: "3.25" }, { value: "9" }, { value: "9.5" }]
        }
      ],
      num: 10,
      option: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
  back_pev = () => {
    var { history } = this.props;
    history.goBack();
    // console.log(history);
  };

  getOption = () => {
    // console.log(this.state.option);

    return this.state.option;
  };
  // 计算按钮 改变 数据
  clac_click = () => {
    let option = { ...this.state.option };
    var num = this.state.num;
    num = num * 2;
    option.series[0].data[0].value = num;
    // console.log(option);
    this.setState({
      option,
      num
    });
    console.log(this.state.num);
    // 通过 图表 实例返回的 ref值 找到图标实例 执行 setopton方法 异步改变数据

    this.echarts_react.getEchartsInstance().setOption(this.state.option);
  };

  render() {
    const tabs = [{ title: "AAA1" }, { title: "AAA2" }, { title: "AAA3" }];

    // 卡片头部
    const head_card_list = this.state.title_list.map((item, k) => {
      var arr = [];
      item.values.forEach((item2, i) => {
        arr.push(item2.value);
      });

      return (
        <Card.Header
          key={k}
          // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          title={item.title}
          extra={<SegmentedControl values={arr} />}
        />
      );
    });
    head_card_list.splice(
      1,
      0,
      <Card.Header
        key="cal"
        // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        title="货款总额"
        extra={
          <InputItem placeholder="0.00" extra="¥">
            {/* 价格 */}
          </InputItem>
        }
      />
    );
    // console.log(head_card_list);

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back_pev}
        >
          NavBar
        </NavBar>

        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <div
            style={{
              // height: "150px",
              backgroundColor: "#fff"
            }}
          >
            {/* Content of first tab */}

            <Card full>{head_card_list}</Card>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
            Content of second tab
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
            Content of third tab
          </div>
        </Tabs>
        {/* 按钮 */}
        <Button
          onClick={this.clac_click}
          type="ghost"
          inline
          style={{ width: "100%" }}
        >
          primary
        </Button>
        {/* 图表 */}
        <ReactEcharts
          ref={e => {
            this.echarts_react = e;
          }}
          option={this.getOption()}
        />
      </div>
    );
  }
}

export default Calc;
