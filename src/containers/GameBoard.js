import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '../components/Grid';
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
    let ships = [];
    for (let i = 0; i < this.props.player.ships.length; i++) {
      ships.push(
        <Ship
          name={this.props.player.ships[i].name}
          damage={this.props.player.ships[i].damage}
          locations={this.props.player.ships[i].locations}
        />
      );
    }



    return (
      <div className="gameboard" ref="gameboard">
        <div className="enemy-grid" style={{height: this.state.width, width: this.state.width}}></div>
        <div className="player-grid" style={{height: this.state.width, width: this.state.width}}>
          <Grid dimensions={[10, 10]} height={this.state.width} width={this.state.width}>
            {ships}
          </Grid>
        </div>
      </div>
    );
  }
}
