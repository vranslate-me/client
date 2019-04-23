import React, { Component } from 'react'
import { asset } from 'react-360'
import Entity from 'Entity'

export default class Stone extends Component {
  render() {
    return (
      <Entity 
        source={{
        //   obj: asset('./Doggo/doggo.obj'), 
        //   mtl: asset('./Doggo/doggo.mtl')
          gltf2: asset('./stone_black_3/scene.gltf')
        }}
        style={{
          transform: [
            { translate: [1700, -330, -50] },//[3800, -380, -50] },
            { rotateX: 90 },
            { rotateY: 180},
            { rotateZ: 120},
            { scale: 5 }
          ]
        }}
      />
    )
  }
}
