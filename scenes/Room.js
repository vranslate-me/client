import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
} from 'react-360';

import Word from '../components/Word'

export default class Room extends React.Component {

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
        <Text style={{ color: 'white' }}>Ini room level</Text>
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