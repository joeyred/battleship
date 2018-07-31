import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Overlay extends Component {
  static propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object
  }
  render() {
    const restStyles = this.props.style || {};
    const containerStyle = {
      position: 'fixed',
      zIndex: this.props.active ? '100' : '-10',
      height: '100vh',
      width: '100vw',
      background: '#333',
      opacity: this.props.active ? '1' : '0',
    };
    const activeStyle = {
      pointerEvents: 'none'
    };
    const style = this.props.active ?
    {...containerStyle, ...activeStyle, ...restStyles} :
    {...containerStyle, ...restStyles};
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
