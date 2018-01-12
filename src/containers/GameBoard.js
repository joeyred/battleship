import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Ship from '../components/Ship';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    };
  }

  measure() {
    const {clientWidth, clientHeight} = this.refs.gameboard;

    this.setState({
      width: clientWidth,
      height: clientHeight,
    });
  }

  componentDidMount() {
    this.measure();
  }

  componentDidUpdate() {
    this.measure();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    );
  }
  render() {
    const cellSize = this.state.width / 10;
    const style = {};
    const shipProps = {
      carrier: {
        name: 'Carrier',
        size: 5,
        direction: 'vertical',
        damage: [],
        locations: [
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5]
        ],
        cellSize
      }
    }
    return (
      <div className="gameboard" ref="gameboard">
        <div className="enemy-grid" style={{height: this.state.width, width: this.state.width}}></div>
        <div className="player-grid" style={{height: this.state.width, width: this.state.width}}>
          <Ship
            name={shipProps.carrier.name}
            size={shipProps.carrier.size}
            direction={shipProps.carrier.direction}
            damage={shipProps.carrier.damage}
            locations={shipProps.carrier.locations}
            cellSize={shipProps.carrier.cellSize}
          />
        </div>
      </div>
    );
  }
}
