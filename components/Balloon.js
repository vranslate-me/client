import React, { Component } from 'react'
import { asset } from 'react-360'
import Entity from 'Entity'

export default class Boat extends Component {
  render() {
    return (
      <Entity 
        source={{
          obj: asset('./Balloon/balloon.obj'), 
          mtl: asset('./Balloon/balloon.mtl')
        }}
        style={{
          transform: [
            { translate: [100, -50, 0] },
            { scale: 60 }
          ]
        }}
      />
    )
  }
}
