import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

export default class Park extends React.Component {
  render() {
    return (
      <View
        style={{
          width: 1200,
          height: 500,
          backgroundColor: 'lightgrey',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{color: 'black'}}>Ini park level</Text>

        <VrButton
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black'
          }}
          onClick={() => this.props.history.push('/')}
        >
          <Text style={{color: 'white'}}>Back to Menu</Text>
        </VrButton>
      </View>
    );
  }
};