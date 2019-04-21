import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-360'
import SpeechRecognition from './SpeechRecognition'

export default class Word extends Component {
  state = {
    spokenWords: ''
  }

  speechRetriever(word, translated) {
    console.log(this.props.word, 'kata yang di tes')
    console.log(translated, 'hasil google translate')
    this.setState({
      spokenWords: word
    })

    if(translated === this.props.word && word !== this.props.word) {
      console.log('poof')
      this.props.removeWord(this.props.word)
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