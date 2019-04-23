import React from 'react';
import {
  Text,
  View,
  VrButton,
  Environment,
  asset,
  NativeModules,
  Pano
} from 'react-360';
import Word from '../components/Word'

// import Entity from 'Entity';
// import Doggo from '../components/Doggo'
// import Stone from '../components/Stone'

//Audio Effect
// const { AudioModule } = NativeModules;

export default class Room extends React.Component {
  state = {
    words: [
      {
        active: false, word: 'tree', position: [2330, -30, 0],
        /* height: 200 */
      },
      { active: false, word: 'sunset', position: [940, -220, 0] },
      { active: false, word: 'stone', position: [370, -100, 0] },
      { active: false, word: 'cloud', position: [1540, -30, 0] },
      { active: false, word: 'cliffs', position: [3600, -5, 0] },
    ],
    // dog: {
    //   scale: 1.3,
    //   borderWidth: 3,
    //   borderColor: 'lightgrey',
    // }
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('CannonBeach.jpg'), { transition: 0.5, format: '2D' })
  }

  removeWord(word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      if (this.state.words[i].word.toLowerCase() !== word) {
        data.push(this.state.words[i])
      }
    }
    console.log(data)
    this.setState({
      words: data
    })
  }

  toggleActive(bool, index, word) {
    let data = []
    for (let i = 0; i < this.state.words.length; i++) {
      let obj = {
        active: false,
        word: this.state.words[i].word,
        position: this.state.words[i].position
      }
      if (i === index) {
        obj.active = bool
        // if (obj.active) {
        // AudioModule.playEnvironmental({
        //   source: asset('./Bar/ticktock.mp3'),
        //   volume: 0.3,
        // })
        // if (name === 'dog') {
        //   this.setState({ dog: { ...this.state.dog, scale: 2.15, borderWidth: 0 } })
        // }
        // }
        // else {
        //   AudioModule.stopEnvironmental()
        //   if (name === 'dog') this.setState({ dog: { ...this.state.dog, scale: 1.3, borderWidth: 3 } })
        // }
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
        <VrButton
          style={{
            width: 200,
            height: 50,
            backgroundColor: 'black',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => this.props.history.push('/')}
        >
          <Text style={{ color: 'white' }}>Back to Menu</Text>
        </VrButton>

        {/* <Stone /> */}
        {/* <Doggo scale={this.state.dog.scale} /> */}

        {
          this.state.words.map((item, index) => {
            console.log(item)
            return (
              <View
                style={{
                  width: 200,
                  height: 50,
                  position: 'absolute',
                  transform: [
                    { translate: item.position }
                  ]
                }}
                onEnter={() => this.toggleActive(true, index, item.word)}
                onExit={() => this.toggleActive(false, index, item.word)}
                key={index}
              >
                {/* <Word borderW={this.state[item.word].borderWidth} word={item.word} removeWord={this.removeWord.bind(this)} enableSpeaking={item.active} /> */}
                <Word word={item.word} removeWord={this.removeWord.bind(this)} enableSpeaking={item.active} />
              </View>
            )
          })
        }
      </View>
    );
  }
};