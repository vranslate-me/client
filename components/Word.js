import React, { Component } from 'react'
import { Text, View, StyleSheet, NativeModules, asset } from 'react-360'
import SpeechRecognition from './SpeechRecognition'

//Audio Effect
const {AudioModule} = NativeModules;

export default class Word extends Component {
  state = {
    spokenWords: ''
  }

  speechRetriever(word, translated) {
    console.log(this.props.word, 'kata yang di tes')
    console.log(translated, 'hasil google translate')

    if(translated === this.props.word && word !== this.props.word) {
      console.log('poof')
      AudioModule.playOneShot({
        source: asset('./Bar/wowwww.mp3'),
        volume: 0.3,
      })
      this.props.removeWord(this.props.word)
    } else {
      AudioModule.playOneShot({
        source: asset('./Bar/wrong_buzz.mp3'),
        volume: 0.3,
      })
      this.setState({
        spokenWords: word
      })
    }
  }

  render() {
    const recording = this.props.enableSpeaking ? 
      <SpeechRecognition speaking={this.props.enableSpeaking} outputHandler={this.speechRetriever.bind(this)} /> 
      : null
    return (
      <View
        style={{
          width: '100%',
          height: 150,
          borderWidth: 3,
          borderColor: 'lightgrey',
          alignItems: 'center'
        }}
      >
        <Text style={{color: 'red', fontSize: 50}}>{this.props.word}</Text>
        <Text style={{color: 'red', fontSize: 50}}>{this.state.spokenWords}</Text>
        {recording}
      </View>
    )
  }
}