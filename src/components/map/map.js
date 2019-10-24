import React from "react";
import { NavBar, Icon } from "antd-mobile";
import axios from "../http.js";
import "./map.css";
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map_list: [
        {
          id: 1,
          x: "116.43244",
          y: "39.929986",
          type: 1
        },
        {
          id: 2,
          x: "116.424355",
          y: "39.92982",
          type: 1
        },
        {
          id: 3,
          x: "116.423349",
          y: "39.935214",
          type: 1
        },
        {
          id: 4,
          x: "116.350444",
          y: "39.931645",
          type: 1
        },
        {
          id: 5,
          x: "116.351684",
          y: "39.91867",
          type: 1
        },
        {
          id: 6,
          x: "116.353983",
          y: "39.913855",
          type: 1
        },
        {
          id: 7,
          x: "116.357253",
          y: "39.923152",
          type: 1
        },
        {
          id: 8,
          x: "116.349168",
          y: "39.923152",
          type: 1
        },
        {
          id: 9,
          x: "116.354954",
          y: "39.935767",
          type: 1
        },
        {
          id: 10,
          x: "116.36232",
          y: "39.938339",
          type: 1
        },
        {
          id: 11,
          x: "116.374249",
          y: "39.94625",
          type: 1
        },
        {
          id: 12,
          x: "116.380178",
          y: "39.953053",
          type: 1
        }
      ]
    };
  }
  componentDidMount() {
    this.init_map();
  }
  back_pev = () => {
    // console.log(this.props);

    var { history } = this.props;

    history.goBack();
  };

  init_map = async () => {
    var res = await axios.post(`/homes/map`);
    console.log(res);

    // console.log(window);
    var { BMap, BMapLib } = window;
    // 创建地图实例
    var map = new BMap.Map("container");
    // 设置中心点坐标
    var point = new BMap.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 5);
    // 添加多个控件;
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

    map.setMapStyleV2({
      styleId: "7c509fef83ab8dbe38623fc4e59491ee"
    });

    // var MAX = 10;
    var markers = [];
    var pt = null;
    // var i = 0;
    // for (; i < MAX; i++) {
    //   pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
    //   console.log(pt);

    //   markers.push(new BMap.Marker(pt));
    // }
    this.state.map_list.forEach(item => {
      pt = new BMap.Point(item.x, item.y);
      // var obj = {
      //   lng: new BMap.Point(item.x),
      //   lat: new BMap.Point(item.y)
      // };
      markers.push(new BMap.Marker(pt));
    });
    console.log(markers);

    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    var markerClusterer = new BMapLib.MarkerClusterer(map, {
      markers: markers
    });
    // console.log(markerClusterer);

    // var map = new BMap.Map("allmap");
    // var point = new BMap.Point(116.331398, 39.897445);

    // var point = new BMap.Point(116.331398,39.897445);
    // map.centerAndZoom(point,12);

    // function myFun(result) {
    //   console.log(result);

    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   alert("当前定位城市:" + cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    //
  };
  render() {
    return (
      <div className="box">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.back_pev}
        >
          {/* NavBar */}
          {/* {this.state.title} */}
          地图找房
        </NavBar>

        <div id="container"></div>
      </div>
    );
  }
}

export default Map;
