import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Util
import locationsToCssGrid from '../util/locationsToCssGrid';
// Components
import SquareCellGrid from '../components/SquareCellGrid';

export default class ButtonGrid extends Component {
  static propTypes = {
    showCoordinates: PropTypes.bool,
    dimensions: PropTypes.array.isRequired,
    handleSelection: PropTypes.func,
    handleHover: PropTypes.func
  }
  generateSpaces() {
    let spaces = [];
    let x, y;
    const firstSpace = [0, 0];
    const lastSpace = [9, 9];

    for (x = firstSpace[0]; x <= lastSpace[0]; x++) {
      for (y = firstSpace[1]; y <= lastSpace[1]; y++) {
        spaces.push([x, y]);
      }
      y = 0;
    }
    return spaces;
  }
  render() {
    const showCoordinates = this.props.showCoordinates || false;
    const spaces = this.generateSpaces();
    let classes = 'interactive-space';
    let gridButtons = [];
    let coordinatesElement;
    let style;
    let handlers = {};
    for (let i = 0; i < spaces.length; i++) {
      style = {
        gridArea: locationsToCssGrid(spaces[i])
      };
      if (this.props.handleSelection) {
        handlers.onClick = () => this.props.handleSelection(spaces[i]);
      }
      if (this.props.handleHover) {
        handlers.onMouseEnter = () => this.props.handleHover(spaces[i]);
      }
      if (showCoordinates) {
        coordinatesElement = <span>{`${spaces[i][0]}, ${spaces[i][1]}`}</span>;
      }
      gridButtons.push(
        <button
          {...handlers}
          classes={classes}
          style={style}
          key={i}
          >
          {showCoordinates ? coordinatesElement : null}
        </button>
      );
    }
    return (
        <SquareCellGrid
          {...this.props.attributes}
          className='button-grid'
          dimensions={this.props.dimensions}>
          {gridButtons}
        </SquareCellGrid>
    );
  }
}
