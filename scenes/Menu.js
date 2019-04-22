import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  NativeModules
} from 'react-360';
import { registerKeyboard } from 'react-360-keyboard';
import axios from 'axios';
import Scoreboard from '../components/Scoreboard';

export default class Menu extends React.Component {

  state = {
    name: null,
    scores: {
      Park: [],
      Room: [],
      Bar: []
    }
  }

  async componentDidMount() {
    const { data } = await axios({
      url: 'http://localhost:3000/scores',
      method: 'get'
    })
    let Park = data.filter(e => e.level === 1);
    let Room = data.filter(e => e.level === 2);
    let Bar = data.filter(e => e.level === 3);
    this.setState({
      scores: {
        Park: Park,
        Room: Room,
        Bar: Bar
      }
    });
  }

  onClick = () => {
    NativeModules.Keyboard.startInput({
      placeholder: 'Enter your name',
    }).then(name => {
      this.setState({ name });
    });
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
        <Scoreboard scores={this.state.scores} />
        {!this.state.name ?
          <View style={styles.menuContainer}>
            <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', textAlign: 'center' }}>Welcome To Translate 360</Text>
            <VrButton
              style={[styles.customButton, { marginTop: 80 }]}
              onClick={this.onClick}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: 'center'
                }}>Click to enter your name</Text>
            </VrButton>
          </View>
          :
          <View style={styles.thumbnail}>
            <VrButton
              style={styles.customButton}
              onClick={() => this.props.history.push('/level1')}
            >
              <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Park level</Text>
            </VrButton>
            <VrButton
              style={styles.customButton}
              onClick={() => this.props.history.push('/level2')}
            >
              <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Room level</Text>
            </VrButton>

            <VrButton
              style={styles.customButton}
              onClick={() => this.props.history.push('/level3')}
            >
              <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Bar level</Text>
            </VrButton>
          </View>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  customButton: {
    width: 400,
    padding: 30,
    backgroundColor: '#151517',
    margin: 30,
    alignItems: 'center'
  },
  menuContainer: {
    height: 600,
    width: 720,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    // justifyContent: 'space-around',
    padding: 30,
  }
});

AppRegistry.registerComponent(...registerKeyboard);