import React, { Fragment } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset
} from 'react-360';

import Word from '../components/Word'
import Boat from '../components/Boat'
import Doggo from '../components/Doggo'

export default class Park extends React.Component {
  state = {
    words: [
      {active: false, word: 'boat', position: [1600, -270, 0]}, 
      {active: false, word: 'tree', position: [3100, -100, 0]},
      {active: false, word: 'duck', position: [2400, -400, 0]},
      {active: false, word: 'dog', position: [3700, -230, 0]},
    ],
    scaleDog: 1.5
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('park.jpg'))
  }

  removeWord(word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      if (this.state.words[i].word !== word) {
        data.push(this.state.words[i])
      }
    }
    console.log(data)
    this.setState({
      words: data
    })
  }

  toggleActive(bool, index, word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      let obj = {
        active: false,
        word: this.state.words[i].word,
        position: this.state.words[i].position
      }
      if (i === index) {
        obj.active = bool
      }
      data.push(obj)
    }
    this.setState({
      words: data,
      scaleDog: word === 'dog' && bool ? 2 : 1.5
    })
  }

  render() {
    return (
      <View
        style={{
          width: 4000,
          height: 500,
          // justifyContent: 'center',
          // alignItems: 'center'
        }}
      >
        <Boat />
        <Doggo scale={this.state.scaleDog} />

        <VrButton
          style={{
            width: 200,
            height: 50,
            backgroundColor: 'black',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => this.props.history.push('/')}
        >
          <Text style={{ color: 'white' }}>Back to Menu</Text>
        </VrButton>

        {
          this.state.words.map((item, index) => {
            return (
              <View
                style={{
                  width: 200,
                  height: 50,
                  position: 'absolute',
                  transform: [
                    { translate: item.position }
                  ]
                }}
                onEnter={() => this.toggleActive(true, index, item.word)}
                onExit={() => this.toggleActive(false, index, item.word)}
                key={item.word}
              >
                <Word word={item.word} removeWord={this.removeWord.bind(this)} enableSpeaking={item.active} />
              </View>
            )
          })
        }
      </View>
    );
  }
};

// AppRegistry.registerComponent('Boat', () => Boat)