import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={{
        width: 1200,
        height: 500,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Text style={{color: 'black'}}>Ini menu</Text>
        
        <VrButton
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black'
          }}
          onClick={() => this.props.history.push('/level1')}
        >
          <Text style={{color: 'white'}}>Park level</Text>
        </VrButton>

        <VrButton
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black'
          }}
          onClick={() => this.props.history.push('/level2')}
        >
          <Text style={{color: 'white'}}>Room level</Text>
        </VrButton>

      </View>
    );
  }
};