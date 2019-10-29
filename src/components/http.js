import axios from "axios";
// import { Toast } from "antd-mobile";
// axios.defaults.baseURL = "http://localhost:8086";
axios.defaults.baseURL = "http://47.96.21.88:8086";

var token = localStorage.getItem("token");

// axios.defaults.headers.common["Authorization"] = token;
// console.log(token);
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log(config.url);
    // 如果不是 登录 和 轮播图请求 都配置 token

    if (config.url !== "/users/login" && config.url !== "/homes/swipe") {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log(response);
    // response.status = 201;
    // if (response.status === 200) {
    //   // console.log(response.data);

    //   return response.data.data.list;
    // } else {
    //   Toast.fail(response.data.meta.msg, 1);
    //   return response.data.meta;
    // }
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axios;
