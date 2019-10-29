import React from "react";
import "./index.css";
import axios from "../http";
import { Grid, Button, Modal, Slider } from "antd-mobile";
import AvatarEditor from "react-avatar-editor";

// import AvatarEditor from 'react-avatar-editor'

let gridtext = [
  "看房记录",
  "我的订单",
  "我的收藏",
  "个人资料",
  "身份认证",
  "联系我们"
];
class Modalchoseimage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: true,
      file: {},
      scale: 1.2
    };

    // this.setEditorRef = React.createRef();
  }
  // componentWillMount() {}
  onClose = () => {
    let { close_modal, img_path } = this.props;
    close_modal();
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      // console.log(canvasScaled.toDataURL());
      img_path(canvasScaled.toDataURL());
    }

    // let img_path = canvas.toDataURL();
    // console.log(img_path);
  };
  setEditorRef = editor => (this.editor = editor);

  render() {
    let { file } = this.props;
    // this.state.file = file;

    // console.log(file);
    return (
      <div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={() => {
            this.onClose("modal1");
          }}
          title="裁剪图片"
          footer={[
            {
              text: "确认",
              onPress: () => {
                // console.log("ok");
                this.onClose("modal1");
              }
            }
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => {
            alert("afterClose");
          }}
        >
          <AvatarEditor
            ref={this.setEditorRef}
            image={file}
            width={150}
            height={150}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={this.state.scale}
            rotate={0}
            borderRadius={85}
            // scale={20}
          />

          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            defaultValue={15}
            min={10}
            max={20}
            onChange={val => {
              // this.on_Slider_Change("change")}
              this.setState({
                scale: val * 0.1
              });
              console.log(val);
            }}
            // onAfterChange={this.log("afterChange")}
          />
        </Modal>
      </div>
    );
  }
}

class Modalchoseimage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: true
    };
    this.img_ref = React.createRef();
  }
  componentDidMount() {}
  onClose = data => {
    // console.log(data);
    // this.setState({
    //   modal1: false
    // });
    let { close_modal } = this.props;
    var node = this.img_ref.current;

    // console.log(node.files[0]);
    close_modal(node.files[0]);
  };
  select_img = () => {
    // console.log(a.persist());
  };
  render() {
    return (
      <div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={() => {
            this.onClose();
          }}
          title="Title"
          footer={[
            {
              text: "Ok",
              onPress: () => {
                console.log("ok");
                this.onClose();
              }
            }
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => {
            // alert("afterClose");
          }}
        >
          <input
            ref={this.img_ref}
            type="file"
            name="file"
            onChange={this.select_img}
          />
        </Modal>
      </div>
    );
  }
}

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      data: Array.from(new Array(6)).map((_val, i) => ({
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
        text: `name${i}`
      })),
      isshow: false,
      isshow1: false,
      file: {}
    };
  }

  componentDidMount = async () => {
    let user_id = localStorage.getItem("uid");
    let {
      data: { avatar, username }
    } = await axios.post("/my/info", {
      user_id
    });
    // console.log(username);

    // Grid数据修改
    let data = Array.from(new Array(6)).map((item, i) => {
      return {
        id: i + 1,
        icon: `http://47.96.21.88:8086/public/0${i + 1}.png`,
        text: gridtext[i]
      };
    });

    this.setState({
      data,
      uname: username,
      avatarPath: avatar
    });
  };
  close_modal = file => {
    this.setState({
      isshow: false,
      isshow1: file,
      file: file
    });
  };
  showImageModal = () => {
    console.log("list - click");
    this.setState({
      isshow: true
    });
  };
  selectMenuITtem = el => {
    console.log(el);
  };
  img_path = async path => {
    // let user_id = localStorage.getItem("uid");
    await axios.post("/my/avatar", { avatar: path });
    this.setState({
      avatarPath: path 
    });
    // console.log(data);
  };
  render() {
    return (
      <div className="my-container">
        {this.state.isshow && (
          <Modalchoseimage close_modal={this.close_modal} />
        )}
        {this.state.isshow1 && (
          <Modalchoseimage1
            close_modal={this.close_modal}
            file={this.state.file}
            img_path={this.img_path}
          />
        )}
        <div className="my-title">
          <img src={"http://47.96.21.88:8086/public/my-bg.png"} alt="me" />
          <div className="info">
            <div className="myicon">
              <img
                onClick={this.showImageModal}
                src={this.state.avatarPath}
                alt="icon"
              />
            </div>
            <div className="name">{this.state.uname}</div>
            <Button>已认证</Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid
          square
          columnNum={3}
          data={this.state.data}
          isCarousel
          onClick={el => {
            this.selectMenuITtem(el);
          }}
        />

        <div className="my-ad">
          <img src={"http://47.96.21.88:8086/public/ad.png"} alt="" />
        </div>
      </div>
    );
  }
}

export default Mine;
