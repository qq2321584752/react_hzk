import React from "react";
import "antd-mobile/dist/antd-mobile.css";
// import logo from "./logo.svg";
// import Login from "./components/login/login.js";
// import Main from "./components/home/main.js.js";
import "./App.css";
import AppRouter from "./router/router.js";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Main /> */}
      <AppRouter />
      {/* <Button loading>loading button</Button> */}
      {/* <WhiteSpace /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
