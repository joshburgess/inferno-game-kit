import React, { Component, PropTypes } from 'react';

import { View, Dimensions } from 'react-native';

export default class Stage extends Component {

  static propTypes = {
    children: PropTypes.any,
    height: PropTypes.number,
    style: PropTypes.object,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 1024,
    height: 576,
  };

  static contextTypes = {
    loop: PropTypes.object,
  }

  static childContextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    const { height, width } = Dimensions.get('window');

    this.state = {
      dimensions: [height, width ],
    };
  }

  getChildContext() {
    return {
      scale: this.getScale().scale,
      loop: this.context.loop,
    };
  }

  getScale() {
    const [vheight, vwidth] = this.state.dimensions;
    const { height, width } = this.props;

    let targetWidth;
    let targetHeight;
    let targetScale;

    if (height / width > vheight / vwidth) {
      targetHeight = vheight;
      targetWidth = targetHeight * width / height;
      targetScale = vheight / height;
    } else {
      targetWidth = vwidth;
      targetHeight = targetWidth * height / width;
      targetScale = vwidth / width;
    }

    return {
      height: targetHeight,
      width: targetWidth,
      scale: targetScale,
    };
  }

  getWrapperStyles() {
    return {
      flex: 1
    };
  }

  getInnerStyles() {
    const scale = this.getScale();
    const xOffset = Math.floor((this.state.dimensions[1] - scale.width) / 2);
    const yOffset = Math.floor((this.state.dimensions[0] - scale.height) / 2);

    return {
      height: Math.floor(scale.height),
      width: Math.floor(scale.width),
      position: 'absolute',
      overflow: 'hidden',
      left: xOffset,
      top: yOffset,
    };
  }

  render() {
    return (
      <View style={this.getWrapperStyles()}>
        <View style={{ ...this.getInnerStyles(), ...this.props.style }}>
          {this.props.children}
        </View>
      </View>
    );
  }

}
