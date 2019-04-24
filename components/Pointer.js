import React from 'react';
import { Animated, asset } from 'react-360';

import Entity from 'Entity';
import Easing from 'Easing';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class Pointer extends React.Component {

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render() {
    const rotate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })
    const bounce = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 30, 0]
    })
    return (
      <AnimatedEntity
        source={{
          obj: asset('./Pointer/arrow.obj'),
          mtl: asset('./Pointer/arrow.mtl')
        }}
        style={{
          transform: [
            { translateY: bounce },
            { rotateY: rotate },
            { scale: 50 }
          ]
        }}
      />
    );
  }
}

// https://vrroom.buzz/vr-news/guide-vr/how-make-react-vr-apps