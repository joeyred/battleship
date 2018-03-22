import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    /**
     * Whether or not the button can be interacted with.
     * @type {boolean}
     */
    disabled: PropTypes.bool,

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func
  }
  clickHandler = (e) => {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }
    this.props.onClick();
  }
  render() {
    const disabled = this.props.disabled || false;
    return (
      <button
        className={this.props.classes}
        disabled={disabled}
        onClick={this.clickHandler}
        >
        {this.props.children}
      </button>
    );
  }
}
