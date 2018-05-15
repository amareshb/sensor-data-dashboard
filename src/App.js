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
import MainContent from './components/mainContent.js';

class App extends Component {
  
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
