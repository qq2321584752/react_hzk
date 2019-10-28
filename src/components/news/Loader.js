import React from "react";
import axios from "../http.js";
import Tloader from "react-touch-loader";
import { Card, Badge, Button, Toast, Modal } from "antd-mobile";
// import "./style.css";
import "./tab.css";
class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      pagenum: 0,
      pagesize: 2,
      list: [],
      total: 0,
      // 下拉数据
      canRefreshResolve: 1,
      listLen: 0,
      hasMore: 1,
      initializing: 1,
      refreshedAt: Date.now()
    };
  }

  getdata = async () => {
    //   tabs组件会自动把 下一页面的 组件 进行预加载
    var { pagenum, pagesize } = this.state;
    var { type } = this.props;
    console.log(type);
    var {
      data: {
        list: { data, total }
      }
    } = await axios.post(`/infos/list`, {
      type,
      pagenum,
      pagesize
    });
    if (data) {
      this.setState(
        {
          list: data,
          total,
          type
        },
        () => {
          // console.log(this.state.type);
        }
      );
      return data;
    }
  };

  async componentWillMount() {
    this.getdata();
    // console.log(data, total);
  }

  // 下拉刷新
  refresh = (resolve, reject) => {
    this.setState(
      {
        pagenum: 0
      },
      () => {
        // console.log("下拉刷新");
        this.getdata();
        resolve();
      }
    );
  };
  // 加载更多
  loadMore = resolve => {
    // console.log("加载更多");

    this.setState(
      {
        pagenum: this.state.pagenum + this.state.pagesize
        // pagesize: ""
      },
      async () => {
        let oldarr = this.state.list;
        let newarr = await this.getdata();
        console.log(this.state.pagenum, this.state.total, this.state.pagesize);

        this.setState(
          {
            list: [...oldarr, ...newarr],
            hasMore: this.state.pagenum < this.state.total - this.state.pagesize
          },
          () => {
            // if (this.state.total === this.state.list.length) {
            //   console.log(this.state.total, this.state.list.length);
            // }
            resolve();
          }
        );
        // console.log(oldarr);
        // console.log(newarr);
      }
    );
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
    const prompt = Modal.prompt;
    const { type } = this.state;
    const Newtemplat = props => {
      let { list } = props;
      //   console.log(list);
      let template = list.map((item, k) => {
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
                  {/* {this.props.num} */}
                  <Badge text={item.info_title} style={this.style_badeg} />
                  {/* <Badge text={item.question_name} style={this.style_badeg} /> */}
                  {/* <Badge text={item.question_tag} style={this.style_badeg} /> */}
                  {/* <Badge text={item.home_tags} style={this.style_badeg} /> */}
                  {/* <Badge text={item.home_time} style={this.style_badeg} /> */}
                </div>
              }
            />
          </Card>
        );
      });
      return <div> {template} </div>;
    };

    const Answers = props => {
      let { list } = props;
      console.log(list);

      let template = list.map((item, k) => {
        return (
          <Card key={k} full>
            <Card.Body>
              <div>{item.question_name}</div>
            </Card.Body>
            <Card.Footer
              content={`${item.question_tag}`}
              extra={
                <div>
                  <Badge text={item.answer_content} style={this.style_badeg} />
                  <Badge text={item.username} style={this.style_badeg} />
                </div>
              }
              // username
            />
          </Card>
        );
      });
      template.unshift(
        <Button
          onClick={() => {
            prompt(
              "请输尼玛的内容",
              "",
              [
                {
                  text: "取消",
                  onPress: value =>
                    new Promise(resolve => {
                      Toast.info("onPress promise resolve", 1);
                      setTimeout(() => {
                        resolve();
                        console.log(`value:${value}`);
                      }, 1000);
                    })
                },
                {
                  text: "确定",
                  onPress: async value => {
                    // new Promise(async (resolve, reject) => {
                    var {
                      meta: { status, msg }
                    } = await axios.post("/infos/question", {
                      question: value
                    });
                    // console.log(status);
                    // console.log(msg);

                    if (status === 200) {
                      Toast.success(msg);
                      // resolve();
                    } else {
                      Toast.fail(msg);
                      // reject();
                    }
                    // });

                    // console.log(res);
                  }
                }
              ],
              "default",
              null,
              ["留言内容"]
            );
          }}
          type="warning"
          size="small"
          key="btn"
          icon="check-circle-o"
        >
          发起提问
        </Button>
      );

      return template;
    };
    let { initializing, hasMore, autoLoadMore } = this.state;
    return (
      <div>
        <Tloader
          initializing={initializing}
          onRefresh={this.refresh}
          hasMore={hasMore}
          onLoadMore={this.loadMore}
          autoLoadMore={autoLoadMore}
          className="tloader some class"
        >
          {/* Loader-----{this.props.num} */}

          {type !== 3 ? (
            <Newtemplat list={this.state.list} />
          ) : (
            <Answers list={this.state.list} />
          )}
        </Tloader>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
export default Loader;
