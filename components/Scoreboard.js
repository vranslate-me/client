import React, { Component } from 'react'
import { Text, View, StyleSheet, NativeModules, asset } from 'react-360'

export default class Scoreboard extends Component {
  render() {
    return (
      <View style={style.scoreboard}>
        <Text style={style.title}>Scoreboard</Text>
        <View style={style.scores}>
          {Object.keys(this.props.scores).map((lvl, index) => {
            return (
              <View key={lvl} style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'black', borderRightWidth: index === 0 ? 3 : 0, borderColor: 'white' }}>
                <Text style={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold' }}>{lvl}</Text>
                <View style={{ flexDirection: 'row', marginBottom: 0, borderBottomWidth: 2, borderColor: 'white' }}>
                  <Text style={style.drow}>Name</Text>
                  <Text style={style.drow}>Score</Text>
                  <Text style={style.drow}>Language</Text>
                </View>
                <View style={{ position: 'absolute', paddingTop: 10, transform: [{ translate: [0, -65, 0] }], backgroundColor: 'black', minHeight: 400, width: 395 }}>
                  {!this.props.scores[lvl] ?
                    <Text>Loading ...</Text>
                    :
                    this.props.scores[lvl].length === 0 ?
                      <Text style={style.drow}>No Player</Text>
                      :
                      this.props.scores[lvl].map(e => {
                        return (
                          <View key={e._id} style={{ flexDirection: 'row' }}>
                            <Text style={style.drow}>{e.name}</Text>
                            <Text style={style.drow}>{Math.round(e.score)}</Text>
                            <Text style={style.drow}>{e.language}</Text>
                          </View>
                        )
                      })}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  scoreboard: {
    // borderWidth: 4,
    // borderColor: '#fff',
    transform: [
      { translate: [1000, 0, 0] },
    ],
    position: 'absolute',
    width: 900,
    height: 630,
    // backgroundColor: 'black',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    width: 785,
    backgroundColor: 'black'
  },
  scores: {
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  drow: {
    width: 130,
    height: 30,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  }
})
