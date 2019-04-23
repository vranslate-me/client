import React from 'react';
import { Animated, Image, VrButton, View, asset, Text } from 'react-360';
import Easing from 'Easing';

export default class Pointer extends React.Component {
  // static defaultProps = {
  //   position: [0, 0, -10],
  //   rotation: [0, 90, 0],
  //   iconURL: asset('pointer.png')
  // };

  state = {
    position: [0, 0, -10],
    rotation: [0, 90, 0],
  }
  // constructor(props) {
  //   super(props);
  //   this.state = Object.assign({}, this.props);
  // }

  render() {
    console.log(this.props)
    return (
      <Image
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          transform: [
            { rotateX: 30 },
            { rotateY: 90 },
            //{ rotateY: 0 },
            { translate: [1000, -300, -50] }
          ]
        }}
        source={asset('pointer.png')}>
      </Image>
    );
  }
}

// https://vrroom.buzz/vr-news/guide-vr/how-make-react-vr-apps