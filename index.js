import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-360';
import { MemoryRouter as Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import Menu from './scenes/Menu'
import LivingRoom from './scenes/LivingRoom'
import Beach from './scenes/Beach'
import Bar from './scenes/Bar'

export default class VR extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <View
            style={{
              width: 4096,
              height: 720,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.01)',//'white',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Route exact path="/" component={Menu} />
            <Route exact path="/level1" component={LivingRoom} />
            <Route exact path="/level2" component={Beach} />
            <Route exact path="/level3" component={Bar} />
          </View>
        </Router>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('VR', () => VR);