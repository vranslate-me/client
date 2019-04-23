import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  NativeModules,
  Environment,
  asset
} from 'react-360';
import { registerKeyboard } from 'react-360-keyboard';
import axios from 'axios';
import Scoreboard from '../components/Scoreboard';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputName } from '../store/actions'

AppRegistry.registerComponent(...registerKeyboard);

class Menu extends React.Component {

  state = {
    scores: {
      Park: [],
      Room: [],
      Bar: []
    }
  }

  async componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'))
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
    console.log(this.state.scores);
  }

  onClick = () => {
    NativeModules.Keyboard.startInput({
      placeholder: 'Enter your name',
    }).then(input => {
      this.props.inputName(input)
    });
  }

  switchToRoom = () => {
    this.props.history.push('/level2');
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
        {!this.props.name ?
          <View style={styles.menuContainer}>
            <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', textAlign: 'center' }}>Welcome To Translate 360</Text>
            <VrButton
              style={styles.customButton}
              onClick={this.onClick}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>Input Your Name</Text>
            </VrButton>
          </View>
          :
          <View style={styles.menuContainer}>
            <Text style={{fontSize: 50}}>Welcome, {this.props.name}</Text>
            <VrButton
              style={styles.customButton}
              onClick={() => this.props.history.push('/level1')}
            >
              <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Park level</Text>
            </VrButton>
            <VrButton
              style={styles.customButton}
              onClick={this.switchToRoom}
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
    width: 300,
    padding: 30,
    backgroundColor: '#151517',
    margin: 30,
    alignItems: 'center'
  },
  menuContainer: {
    height: 600,
    alignItems: 'center',
    // justifyContent: 'space-around',
    padding: 30,
  }
})

const mapStateToProps = (state) => ({
  loading: state.loading,
  name: state.name
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputName
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)