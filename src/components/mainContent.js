import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from './rooms.js';
import Try from './try.js';
import './mainContent.css';
import SensorData from './sensorData.js';

const MainContent = () => (
  <main className="main">
    <Switch>
      <Route exact path='/rooms' component={Rooms}/>
      <Route exact path='/try' component={Try}/>
      <Route exact path='/sensorData' component={SensorData}/>
    </Switch>
  </main>
)

export default MainContent;
