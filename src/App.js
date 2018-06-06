import React, { Component } from 'react';
//import logo from './public';
import './App.css';
import Authen from './Authen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <img src='saidlogo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our login page</h1>
        </header>
        <Authen />
      </div>
    );
  }
}

export default App;
