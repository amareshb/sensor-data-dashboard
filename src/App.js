import React, {
  Component
} from 'react';
import logo from './logo.svg';
import NavBar from './components/nav-bar.js'
import './App.css';
import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from "react-router-dom";
import Devices from './components/devices.js';
import MainContent from './components/mainContent.js';

class App extends Component {
  constructor(props) {
        super(props);
    }


  render() {
    return (
        <div>
          <NavBar />
          <MainContent />
        </div>

    );
  }
}

export default App;
