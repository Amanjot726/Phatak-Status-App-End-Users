import { Component } from 'react';
import {Text as ReactText, TextProps} from 'react-native';


export default class Text extends Component<TextProps> {
    render() {
      const { children, style, ...rest } = this.props
      return (
          <ReactText selectable={false} style={[style]} {...rest}>
            {this.props.children}
          </ReactText>
      );
    }
  }