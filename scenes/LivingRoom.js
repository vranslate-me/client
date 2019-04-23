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

export default class LivingRoom extends React.Component {
  state = {
    words: [
      {active: false, word: 'Art', position: [1500, -50, 0]}, 
      {active: false, word: 'Mirror', position: [3100, -20, 0]},
      {active: false, word: 'Plant', position: [2100, -200, 0]},
      {active: false, word: 'Book', position: [1400, -300, 0]},
      {active: false, word: 'Door', position: [2700, -100, 0]},
    ]
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('livingroom.jpg'))
  }

  removeWord(word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      if (this.state.words[i].word.toLowerCase() !== word) {
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
                  width: 250,
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