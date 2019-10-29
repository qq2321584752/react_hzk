import React, { Component } from "react";
import { NavBar, Icon, Card, Badge } from "antd-mobile";
import axios from "../http.js";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      cur_house: []
    };
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  async componentDidMount() {
    // console.log(this.props);
    // 根据父元素传来的id查找数据
    let res = await axios.post(`/homes/list`, this.props.location.state);
    // console.log(res);

    // location;
    this.setState({
      title: this.props.location.state.text,
      cur_house: res.data
    });
  }
  back_pev = () => {
    var { history } = this.props;
    history.goBack();
    // console.log(history);
  };
  thumbStyle = {
    width: "80px",
    height: "60px"
  };

  style_badeg = {
    marginLeft: 12,
    padding: "0 3px",
    backgroundColor: "#fff",
    borderRadius: 2,
    color: "#f19736",
    border: "1px solid #f19736"
  };
  render() {
    // console.log(this.state);
    let house_arr = this.state.cur_house.map((item, k) => {
      return (
        <Card full key={k}>
          <Card.Header
            // title={item.home_name}
            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            // thumb="http://127.0.0.1:8086/public/home.png"
            thumb="http://47.96.21.88:8086/public/home.png"
            thumbStyle={this.thumbStyle}
            extra={
              <div>
                <Badge text={item.home_price} style={this.style_badeg} />
                <Badge text={item.home_desc} style={this.style_badeg} />
                <Badge text={item.home_tags} style={this.style_badeg} />
                <Badge text={item.home_time} style={this.style_badeg} />
              </div>
            }
          />
        </Card>
      );
    });
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back_pev}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
            <Icon key="1" type="ellipsis" />
          ]}
        >
          {/* NavBar */}
          {this.state.title}
        </NavBar>

        {house_arr}
      </div>
    );
  }
}

export default Detail;
