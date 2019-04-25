import React, { Fragment } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
  NativeModules
} from 'react-360';

import Word from '../components/Word'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { dbAddScore } from '../store/actions';

class LivingRoom extends React.Component {
  state = {
    words: [
      {active: false, word: 'Art', position: [1500, -200, 0]}, 
      {active: false, word: 'Mirror', position: [3075, -170, 0]},
      {active: false, word: 'Plant', position: [2100, -320, 0]},
      {active: false, word: 'Book', position: [1420, -470, 0]},
      {active: false, word: 'Door', position: [2650, -220, 0]},
      {active: false, word: 'Kitchen', position: [450, -200, 0]},
    ],
    score: 0,
    totalWords: 0
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('livingroom.jpg'))
    this.setState({
      totalWords: this.state.words.length
    })
  }

  backToMenu() {
    const data = {
      name: this.props.name,
      level: 1,
      score: this.state.score / this.state.totalWords * 100,
      lang: this.props.languageName
    }
    this.props.dbAddScore(data, this.props.history)
  }

  removeWord(word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      if (this.state.words[i].word.toLowerCase() !== word) {
        data.push(this.state.words[i])
      }
    }
    this.setState({
      words: data,
      score: this.state.score + 1
    })
  }

  toggleActive(bool, index) {
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
      words: data
    })
  }

  render() {
    return (
      <View
        style={{
          width: 4000,
          height: 720,
          // justifyContent: 'center',
          // alignItems: 'center'
        }}
      >

        {
          !this.props.loading ?
          <VrButton
            style={{
              width: 240,
              height: 60,
              backgroundColor: 'black',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => this.backToMenu()}
          >
            <Text style={{ color: 'white', fontSize: 40 }}>Back to Menu</Text>
          </VrButton> : null
        }

        {
          this.state.score === this.state.totalWords ? 
          <View
            style={{
              width: 300,
              height: 70,
              marginTop: 100,
              backgroundColor: 'black',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{fontSize: 60}}>You did it!</Text>
          </View> :
          null
        }

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
                onEnter={() => this.toggleActive(true, index)}
                onExit={() => this.toggleActive(false, index)}
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

const mapStateToProps = (state) => ({
  loading: state.loading,
  name: state.name,
  languageName: state.languageName
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dbAddScore
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LivingRoom)