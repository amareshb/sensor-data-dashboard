import React, {
  Component
} from 'react';
import { Switch, Route } from 'react-router-dom'
import Devices from './devices.js';
import Try from './try.js';

const MainContent = () => (
  <main>
    <Switch>
      <Route exact path='/devices' component={Devices}/>
      <Route exact path='/try' component={Try}/>
    </Switch>
  </main>
)

export default MainContent;
