import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

import Word from '../components/Word'

export default class Park extends React.Component {
  state = {
    words: [
      {active: false, word: 'chicken', position: [400, 0, 0]}, 
      {active: false, word: 'dog', position: [1000, -200, 0]}
    ]
  }

  removeWord(word) {
    let data = []
    for(let i = 0; i < this.state.words.length; i++) {
      if(this.state.words[i].word !== word) {
        data.push(this.state.words[i])
      }
    }
    console.log(data)
    this.setState({
      words: data
    })
  }

  toggleActive(bool, index) {
    let data = []
    for(let i = 0; i < this.state.words.length; i++) {
      let obj = {
        active: false,
        word: this.state.words[i].word,
        position: this.state.words[i].position
      }
      if(i === index) {
        obj.active = bool
      }
      data.push(obj)
    }
    this.setState({
      words: data
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
        <Text style={{color: 'white', alignSelf: 'center'}}>Ini park level</Text>

        <VrButton
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black',
            alignSelf: 'center'
          }}
          onClick={() => this.props.history.push('/')}
        >
          <Text style={{color: 'white'}}>Back to Menu</Text>
        </VrButton>

        {
          this.state.words.map((item, index) => {
            console.log(item)
            return (
              <View
                style={{
                  width: 200,
                  height: 50,
                  // position: 'absolute',
                  transform: [
                    {translate: item.position}
                  ]
                }}
                onEnter={() => this.toggleActive(true, index)}
                onExit={() => this.toggleActive(false, index)}
                key={index}
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