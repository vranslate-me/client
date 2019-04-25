import React,{ Component } from 'react';
import {
  Text,
  View,
  NativeModules,
  Environment,
} from 'react-360';

// import axios from 'axios'

//server
import server from '../server/api'

import { connect } from 'react-redux'
import console = require('console');

const { AudioModule } = NativeModules

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
        // console.log('Active');

        // Start capturing voice
        var output = await this.state.annyang.start();

        if(output) {
          // console.log(output)
          const { data } = await server({
            url: `/translate/${this.props.language}`,
            method: 'post',
            data: {
              word: output
            }
          })
          // const { data } = await server(`/translate/${this.props.language}`, { //axios.post(`https://31d06abb.ngrok.io/translate/${this.props.language}`, {
          //   word: output
          // })
          this.setState({ interactionActive: false });
          this.props.outputHandler(output, data.translated.toLowerCase());
          AudioModule.stopEnvironmental()
        }

        // Stop
        this.state.annyang.stop();

      } catch(e) { 
        // console.log(e); 
      }
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
          {/* {output} */}
          <Text></Text>
        </View>
      );
    }

}

const mapStateToProps = (state) => ({
  language: state.language
})

export default connect(mapStateToProps)(SpeechRecognition)