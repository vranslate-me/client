import React, { Component } from 'react'
import { asset } from 'react-360'
import Entity from 'Entity'

export default class Doggo extends Component {
  render() {
    return (
      <Entity 
        source={{
          obj: asset('./Doggo/doggo.obj'), 
          mtl: asset('./Doggo/doggo.mtl')
        }}
        style={{
          transform: [
            { translate: [2300, -330, -50] },//[3800, -380, -50] },
            { rotateX: 90 },
            { rotateY: 180},
            { rotateZ: 120},
            { scale: this.props.scale }
          ]
        }}
      />
    )
  }
}
