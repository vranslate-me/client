import React, { Component } from 'react'
import { Text, View, StyleSheet, NativeModules, asset } from 'react-360'
import SpeechRecognition from './SpeechRecognition';
import Pointer from '../components/Pointer';

//Audio Effect
const {AudioModule} = NativeModules;

export default class Word extends Component {
  state = {
    spokenWords: ''
  }

  speechRetriever(word, translated) {
    // console.log(word, '= kata yang di eja')
    // console.log(translated, '= hasil google translate')

    if(translated.toLowerCase().search(this.props.word.toLowerCase()) !== -1 && word.toLowerCase() !== this.props.word.toLowerCase()) {
      // console.log('poof')
      AudioModule.playOneShot({
        source: asset('./Bar/wowwww.mp3'),
        volume: 0.3,
      })
      this.props.removeWord(this.props.word.toLowerCase())
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
          minHeight: 150,
          borderWidth: 5,
          borderColor: 'green',
          alignItems: 'center'
        }}
      >   
        <Pointer />     
        {/* <Text style={{color: 'red', fontSize: 50}}>{this.props.word}</Text> */}
        <Text style={{color: 'red', fontSize: 70}}>{this.state.spokenWords}</Text>
        {recording}
      </View>
    )
  }
}
