import React, { Component } from 'react'

import {
  Text,
  View
} from 'react-360'

export default class SpeechResults extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={{
        width: 100,
        position: 'absolute',
        transform: [
          // {translateX: -150},
          {translateY: -50}
        ],
        backgroundColor: 'mistyrose'
      }}>
        <Text style={{color: 'black'}}>{this.props.word}</Text>
        <Text style={{
          color: 'red',
          fontWeight: 'bold'
        }}>
        speech output:
          {this.props.results}
        </Text>
      </View>
    )
  }
}