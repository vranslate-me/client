import React,{ Component } from 'react';
import {
  Text,
  View,
  NativeModules,
  Environment,
} from 'react-360';

import axios from 'axios'
const {AudioModule} = NativeModules;

import { connect } from 'react-redux'

class SpeechRecognition extends React.Component {
//Audio Effect
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
          console.log(output)
          const { data } = await axios.post(`http://localhost:3000/translate/${this.props.language}`, {
            word: output
          })
          this.setState({ interactionActive: false });
          this.props.outputHandler(output, data.translated.toLowerCase());
          AudioModule.stopEnvironmental()
        }

        // Stop
        this.state.annyang.stop();

      } catch(e) { console.log(e); }
    }

    render() {
      var output = null;

      if(this.state.interactionActive) {
        output = (
          <Text style={{color: 'black', marginTop: 40, fontSize: 40}}>Recording..</Text>
        );
      }

      return (
        <View 
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center'
          }}
          onEnter={ this.onGazeEnter.bind(this) }
        >
          {output}
        </View>
      );
    }

}

const mapStateToProps = (state) => ({
  language: state.language
})

export default connect(mapStateToProps)(SpeechRecognition)