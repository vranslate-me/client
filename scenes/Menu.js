import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  VrButton,
  NativeModules,
  Environment,
} from 'react-360';
import { registerKeyboard } from 'react-360-keyboard';
import axios from 'axios';
import Scoreboard from '../components/Scoreboard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { inputName, setLanguage, dbFetchScore } from '../store/actions';

const { AudioModule } = NativeModules

AppRegistry.registerComponent(...registerKeyboard);

class Menu extends React.Component {

  state = {
    scores: {
      Room: [],
      Beach: []
    },
    annyang: NativeModules.Annyang,
    languages: [
      { code: 'id', name: 'Indonesia', flag: asset('./Flags/Indonesia.png'), anthem: asset('./Anthem/Indonesia.mp3') },
      { code: 'ja', name: 'Japan', flag: asset('./Flags/Japan.png'), anthem: asset('./Anthem/Japan.mp3') },
      { code: 'zh-CN', name: 'Chinese', flag: asset('./Flags/China.png'), anthem: asset('./Anthem/China.mp3') },
      { code: 'ru', name: 'Russia', flag: asset('./Flags/Russia.png'), anthem: asset('./Anthem/Russia.mp3') },
      { code: 'ko', name: 'Korea', flag: asset('./Flags/Korea.jpg'), anthem: asset('./Anthem/Korea.mp3') },
      { code: 'tr', name: 'Turkey', flag: asset('./Flags/Turkey.jpg'), anthem: asset('./Anthem/Turkey.mp3') },
    ],
    stage: [
      { name: 'Living Room', level: 'level1', image: asset('livingroom.jpg') },
      { name: 'Beach', level: 'level2', image: asset('CannonBeach.jpg') },
    ]
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('bg_360.jpg'))
    this.props.dbFetchScore()
  }

  keyboardInput = () => {
    NativeModules.Keyboard.startInput({
      placeholder: 'Enter your name',
    }).then(input => {
      this.props.inputName(input)
    });
  }

  selectLanguage(language) {
    this.state.annyang.setLanguage(language.code)
    this.props.setLanguage(language)
  }

  playAnthem = (index) => {
    AudioModule.playEnvironmental({
      source: this.state.languages[index].anthem,
      volume: 0.3,
      // is3d: true
      // fadeTime: 3000
    })
  }

  render() {
    return (
      <View
      /* style={{
        width: 1200,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center'
      }} */
      >
        <View style={{
          position: 'absolute',
          alignItems: 'center',
          transform: [
            { translate: [-550, 0, 0] }
          ],
          backgroundColor: 'black',
          width: 500
        }}>
          <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Speech Language</Text>
          {
            this.state.languages.map((language, index) => {
              return (
                <View
                  onEnter={() => { this.playAnthem(index) }}
                  onExit={() => AudioModule.stopEnvironmental()}
                  key={language.code}
                >
                  <VrButton
                    style={(language.code === this.props.language) ? styles.btnSelected : null}
                    onClick={() => this.selectLanguage(language)}>
                    <Image
                      source={language.flag}
                      style={styles.customFlag}
                    />
                  </VrButton>
                </View>
                // <VrButton
                //   style={styles.customButton}
                //   onClick={() => this.selectLanguage(language.code)}
                //   key={language.code}
                // >
                //   <Text
                //     style={{
                //       fontSize: 30,
                //       fontWeight: 'bold',
                //       textAlign: 'center'
                //     }}
                //   >
                //     {language.name}
                //   </Text>
                // </VrButton>
              )
            })
          }
        </View>
        <Scoreboard scores={this.props.scores} />
        {!this.props.name ?
          <View style={styles.menuContainer}>
            <Text style={{ color: 'white', fontSize: 80, fontWeight: 'bold', textAlign: 'center' }}>Welcome To Translate 360</Text>
            <VrButton
              style={[styles.customButton, { marginTop: '10 !important', width: 400 }]}
              onClick={this.keyboardInput}>
              <Text
                style={{
                  fontSize: 50,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>Input your name</Text>
            </VrButton>
          </View>
          :
          <View style={styles.menuContainer}>
            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>Welcome, {this.props.name}</Text>
            {
              this.state.stage.map((item, index) => {
                return (
                  <VrButton
                    style={[styles.thumbnailButton, { marginTop: '8, !important' }]}
                    onClick={() => this.props.history.push(`/${item.level}`)}
                    key={item.name}
                  >
                    <Image source={item.image} style={{ width: 380, height: 130 }} />
                  </VrButton>
                )
              })
            }
          </View>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  customButton: {
    width: 350,
    padding: 20,
    backgroundColor: '#151517',
    margin: 30,
    justifyContent: 'space-between'
  },
  customFlag: {
    width: 100,
    height: 50,
    padding: 20,
    backgroundColor: '#151517',
    margin: 20,
    justifyContent: 'space-between'
  },
  thumbnailButton: {
    width: 380,
    height: 130,
    margin: 20
  },
  menuContainer: {
    height: 600,
    width: 980,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: '#fff',
    // justifyContent: 'space-around',
    padding: 30,
  },
  btnSelected: {
    borderColor: 'skyblue',
    borderWidth: 3
  }
})

const mapStateToProps = (state) => ({
  loading: state.loading,
  name: state.name,
  language: state.language,
  scores: state.scores
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputName,
  setLanguage,
  dbFetchScore
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
