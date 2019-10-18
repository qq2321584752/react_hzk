import React from "react";
// import logo from "./logo.svg";
import Login from "./components/login/login.js";
import Main from "./components/main/main.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Login />
      <Main />
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
