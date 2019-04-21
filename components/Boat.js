import React, { Component } from 'react'
import { asset } from 'react-360'
import Entity from 'Entity'

export default class Boat extends Component {
  render() {
    return (
      <Entity 
        source={{
          obj: asset('./Boat/boat.obj'), 
          mtl: asset('./Boat/boat.mtl')
        }}
        style={{
          transform: [
            { translate: [1700, -380, -20] },
            { rotateX: 30 },
            { scale: 0.5 }
          ]
        }}
      />
    )
  }
}
