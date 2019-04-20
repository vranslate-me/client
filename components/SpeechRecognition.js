import React,{ Component } from 'react';
import {
  Text,
  View,
  NativeModules,
} from 'react-360';

import axios from 'axios'

export default class SpeechRecognition extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        interactionActive: true,
        annyang: NativeModules.Annyang
      }
    }

    async onGazeEnter() {
      try {
        console.log('Active');

        // Start capturing voice
        var output = await this.state.annyang.start();

        if(output) {
          const { data } = await axios.post('http://localhost:3000/translate', {
            word: output
          })
          this.setState({ interactionActive: false });
          this.props.outputHandler(output, data.translated);
        }

        // Stop
        this.state.annyang.stop();

      } catch(e) { console.log(e); }
    }

    render() {
      var output = null;

      if(this.state.interactionActive) {
        output = (
          <Text style={{color: 'black'}}>Recording..</Text>
        );
      }

      return (
        <View 
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center'
          }}
          onEnter={ this.onGazeEnter.bind(this) }
        >
          {output}
        </View>
      );
    }

}