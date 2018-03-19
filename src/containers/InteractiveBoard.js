// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Util
import locationsToCssGrid from '../util/locationsToCssGrid';
import {generateLocations, coordinatesMatch} from '../engine/engine-helpers';
// Components
import Button from '../components/Button';
import SquareCellGrid from '../components/SquareCellGrid';

export default class InteractiveBoard extends Component {
  static propTypes = {
    handleSelection: PropTypes.func,
    handleHover: PropTypes.func,
    gameStage: PropTypes.oneOf(['setup', 'play']).isRequired,
    selectedShip: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      highlightedSpaces: []
      // gridButtons: null
    }
  }
  // componentDidMount() {
  //   this.setState({
  //     gridButtons: this.generateButtons()
  //   });
  // }
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
  onHover(coordinates) {
    const {size, orientation} = this.props.selectedShip;
    const highlightedSpaces = generateLocations(
      coordinates,
      size,
      orientation
    );
    this.setState({
      highlightedSpaces
      // gridButtons: this.generateButtons()
    });
  }
  isHighlighted(coordinates) {
    const highlightedSpaces = this.state.highlightedSpaces;
    for (let i = 0; i < highlightedSpaces.length; i++) {
      if (coordinatesMatch(highlightedSpaces[i], coordinates)) {
        return true;
      }
    }
    return false;
  }
  generateButtons() {
    const spaces = this.generateSpaces();
    let classes = 'interactive-space';
    let gridButtons = [];
    let style;
    for (let i = 0; i < spaces.length; i++) {
      style = {
        gridArea: locationsToCssGrid(spaces[i])
      };
      if (this.props.gameStage === 'setup') {
        if (this.isHighlighted(spaces[i])) {
          style.background = '#ddd';
        }
        gridButtons.push(
          <button
            classes={classes}
            onClick={() => this.props.handleSelection(spaces[i])}
            onMouseEnter={() => this.onHover(spaces[i])}
            style={style}
            key={i}
            >
            <span>{`${spaces[i][0]}, ${spaces[i][1]}`}</span>
          </button>
        );
      }
      if (this.props.gameStage === 'play') {
        gridButtons.push(
          <button
            classes={classes}
            onClick={() => this.props.handleSelection(spaces[i])}
            style={style}
            key={i}
            >
            <span>{`${spaces[i][0]}, ${spaces[i][1]}`}</span>
          </button>
        );
      }
    }
    return gridButtons;
  }
  render() {
    const gridButtons = this.generateButtons();
    let attributes;
    if (this.props.gameStage === 'setup') {
      attributes = {
        style: {
          alignSelf: 'flex-end'
        }
      };
    }
    return (
      <div className="Interactive-board">
        <SquareCellGrid
          {...attributes}
          dimensions={[10, 10]}>
          {gridButtons}
        </SquareCellGrid>
      </div>
    );
  }
}
