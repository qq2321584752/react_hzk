import React, { Component } from "react";
import {
  SearchBar,
  Carousel,
  Grid,
  Toast,
  NoticeBar,
  Card,
  Badge
} from "antd-mobile";
import "./main.css";
import axios from "../http.js";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_val: "",
      sw_list: ["1", "2", "3"],
      grid_list: [],
      // 默认给一个初始值 防止布局错乱
      imgHeight: 176,
      homes_info: [],
      homes_faq: [],
      homes_house: [],
      homes_house_change: []
      // 菜单数据
    };
  }
  // 封装 请求代码
  getdata = async url => {
    const {
      data,
      meta: { status, msg }
    } = await axios.post(`${url}`);
    if (status === 200) {
      return data.list;
    } else {
      Toast.fail(msg, 1);
    }
  };

  async componentDidMount() {
    // console.log(this.autoFocusInst);

    this.autoFocusInst.focus();

    // var sw_list = axios.post(`/homes/swipe`);
    var sw_list = this.getdata("/homes/swipe");
    // console.log(meta);

    // var sw_list = meta.list;

    // simulate img loading

    // var menu_list = axios.post(`/homes/menu`);
    var menu_list = this.getdata("/homes/menu");

    var homes_info = this.getdata("/homes/info");

    var homes_faq = this.getdata("/homes/faq");

    var homes_house = this.getdata("/homes/house");

    // Promise.all方法接收一个 数组 数组的每一项都是 promise对象， 会在每个单元都完成后 返回一个 大数组，里边根据你传进去的顺序 返回一列数组
    // 返回的 也是 promise对象 所以我们 await 接收结果
    var main_data = await Promise.all([
      sw_list,
      menu_list,
      homes_info,
      homes_faq,
      homes_house
    ]);
    // console.log(main_data);

    this.setState(
      {
        sw_list: main_data[0],
        menu_list: main_data[1],
        homes_info: main_data[2],
        homes_faq: main_data[3],
        homes_house: main_data[4]
      },
      () => {
        const grid_list = this.state.menu_list.map((item, i) => ({
          // icon: `http://localhost:8086/public/0${item.id}.png`,
          icon: `http://47.96.21.88:8086/public/0${item.id}.png`,

          id: item.id,
          text: `${item.menu_name}`
        }));

        this.setState({
          grid_list,
          // 在得到数据后 进行切割
          homes_house_change: this.sp_arr(this.state.homes_house, 2, 2, 3)
        });
        // console.log(data);
      }
    );
    // console.log(this.state);
  }

  // 切割数组方法
  sp_arr = (arr, ...rest) => {
    let a = [];
    for (let i = 0; i < rest.length; i++) {
      let temp = arr.splice(0, rest[i]);
      a.push(temp);
    }
    // console.log(a);
    return a;
  };

  search_ = search_val => {
    // console.log(this);

    this.setState({
      search_val
    });
    // console.log(search_val);
  };
  // 菜单点击事件 传回当前信息和 索引
  gaid_cliick = (val, index) => {
    let { text } = val;
    console.log(val);

    let { history } = this.props;

    switch (val.id) {
      case 1:
      case 2:
      case 3:
      case 4:
        history.push("/detail", { text: text, home_type: val.id });
        break;
      case 5:
        history.push("/map", { text: text });
        break;
      case 7:
        history.push("/calc");
        break;

      default:
        break;
    }

    // console.log(history);

    // console.log(val, index);
  };

  style_badeg = {
    marginLeft: 12,
    padding: "0 3px",
    backgroundColor: "#fff",
    borderRadius: 2,
    color: "#f19736",
    border: "1px solid #f19736"
  };

  thumbStyle = {
    width: "80px",
    height: "60px"
  };
  render() {
    let homes_house_arr = this.state.homes_house_change.map((item, k) => {
      var item_temp = item.map((item2, k2) => {
        return (
          <Card full key={k2}>
            <Card.Header
              title={item2.home_name}
              // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              // thumb="http://127.0.0.1:8086/public/home.png"
              thumb="http://47.96.21.88:8086/public/home.png"
              thumbStyle={this.thumbStyle}
              extra={
                <div>
                  <Badge text={item2.home_price} style={this.style_badeg} />
                  <Badge text={item2.home_desc} style={this.style_badeg} />
                  <Badge text={item2.home_tags} style={this.style_badeg} />
                  <Badge text={item2.home_time} style={this.style_badeg} />
                </div>
              }
            />
          </Card>
        );
      });
      // console.log(this.state.homes_house_change);

      let title_ = ["最新开盘", "二手精选", "组个家"];
      item_temp.unshift(<div key="div_title">{title_[k]}</div>);

      return item_temp;
    });
    // console.log(homes_house_arr);

    // 卡片模板
    let homes_faq_template = this.state.homes_faq.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
          />
          <Card.Body>
            <div>
              <Badge text={item.question_tag} style={this.style_badeg} />

              <Badge text={item.answer_content} style={this.style_badeg} />
              <Badge text={item.atime} style={this.style_badeg} />
              <Badge text={item.question_id} style={this.style_badeg} />
              <Badge text={item.qnum} style={this.style_badeg} />
            </div>
          </Card.Body>
        </Card>
      );
    });
    // homes_faq_template = [<span>好客问答</span>, ...homes_faq_template];
    homes_faq_template.unshift(<span key="span">好客问答</span>);
    // console.log(homes_faq_template);

    // 通栏模板
    // info_title
    let info_temolate = this.state.homes_info.map((item, k) => {
      return (
        <NoticeBar
          key={k}
          marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
          mode="link"
          action={<strong>可以乌拉了</strong>}
        >
          {item.info_title}
        </NoticeBar>
      );
    });

    let car_listdata = this.state.sw_list.map((val, index) => (
      <a
        key={val}
        href="http://www.alipay.com"
        style={{
          display: "block",
          position: "relative",
          top: this.state.slideIndex === index ? -10 : 0,
          height: this.state.imgHeight,
          boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)"
        }}
      >
        <img
          src={val.original}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // console.log("onload，执行了");

            // fire window resize event to change height  检测到屏幕大小变化的 时候 重新赋值auto填充页面
            window.dispatchEvent(new Event("resize"));
            this.setState({ imgHeight: "auto" });
          }}
        />
      </a>
    ));
    return (
      <div className="main_box">
        {/* 搜索框 */}
        <SearchBar
          ref={ref => {
            // console.log((this.autoFocusInst = ref));
            return (this.autoFocusInst = ref);
          }}
          onChange={this.search_}
          value={this.state.search_val}
          placeholder="Search"
        />
        {/* 轮播图 */}
        <Carousel
          className="space-carousel"
          // frameOverflow="visible"
          // cellSpacing={10}
          // slideWidth={0.8}
          autoplay
          infinite
          // beforeChange={(from, to) =>
          //   console.log(`slide from ${from} to ${to}`)
          // }
          // afterChange={index => this.setState({ slideIndex: index })}
        >
          {car_listdata}
        </Carousel>
        {/* 宫格 */}
        <Grid
          onClick={this.gaid_cliick}
          data={this.state.grid_list}
          activeStyle={false}
        />
        {/* 通告栏 */}
        {info_temolate}
        {/* 卡片 */}
        {homes_faq_template}
        {/* 房屋信息 */}
        {homes_house_arr}
      </div>
    );
  }
}

export default Main;
