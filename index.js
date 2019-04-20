import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-360';
import { MemoryRouter as Router, Route } from 'react-router'
import Menu from './scenes/Menu'
import Park from './scenes/Park'
import Room from './scenes/Room'

export default class VR extends React.Component {
  render() {
    return (
      <Router>
        <View>
          <Route exact path="/" component={Menu} />
          <Route exact path="/level1" component={Park} />
          <Route exact path="/level2" component={Room} />
        </View>
      </Router>
    );
  }
};

AppRegistry.registerComponent('VR', () => VR);
