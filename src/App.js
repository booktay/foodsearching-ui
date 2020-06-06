import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

import Header from "./pages/Header";
import MyRouter from "./Router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <MyRouter />
        </Router>
      </div>
    );
  }
}

export default App;
