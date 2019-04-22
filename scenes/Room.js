import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset
} from 'react-360';

import Entity from 'Entity';

export default class Room extends React.Component {
  componentDidMount() {
    Environment.setBackgroundImage(asset('pertigaan.jpg'))
  }

  render() {
    return (
      <View
        style={{
          width: 1200,
          height: 500,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <VrButton
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black'
          }}
          onClick={() => this.props.history.push('/')}
        >
          <Text style={{ color: 'white' }}>Back to Menu</Text>
        </VrButton>
      </View>
    );
  }
};