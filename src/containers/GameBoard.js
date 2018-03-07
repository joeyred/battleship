import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import Grid from '../components/Grid';
import SquareCellGrid from '../components/SquareCellGrid';
import Marker from '../components/Marker';
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
    // const cellSize = this.state.width / 10;
    // const style = {};
    //
    let playerGrid = {
      hits: [],
      misses: []
    }
    for (let i = 0; i < this.props.activePlayer.hits.length; i++) {
      playerGrid.hits.push(
        <Marker
          location={this.props.activePlayer.hits[i]}
          classes="marker hit"
        />
      );
    }
    for (let i = 0; i < this.props.activePlayer.misses.length; i++) {
      playerGrid.misses.push(
        <Marker
          location={this.props.activePlayer.misses[i]}
          classes="marker miss"
        />
      );
    }

    let enemyGrid = {
      hits: [],
      misses: []
    }
    for (let i = 0; i < this.props.inactivePlayer.hits.length; i++) {
      enemyGrid.hits.push(
        <Marker
          location={this.props.activePlayer.hits[i]}
          classes="marker hit"
        />
      );
    }
    for (let i = 0; i < this.props.inactivePlayer.misses.length; i++) {
      enemyGrid.misses.push(
        <Marker
          location={this.props.inactivePlayer.misses[i]}
          classes="marker miss"
        />
      );
    }

    let ships = [];
    for (let i = 0; i < this.props.activePlayer.ships.length; i++) {
      ships.push(
        <Ship
          name={this.props.activePlayer.ships[i].name}
          damage={this.props.activePlayer.ships[i].damage}
          locations={this.props.activePlayer.ships[i].locations}
        />
      );
    }



    return (
      <div className="gameboard" ref="gameboard">
        <div className="enemy-grid">
          <SquareCellGrid dimensions={[10, 10]}>
            {enemyGrid.hits}
            {enemyGrid.misses}
          </SquareCellGrid>
        </div>
        <div className="player-grid">
          <SquareCellGrid dimensions={[10, 10]}>
            {ships}
            {playerGrid.hits}
            {playerGrid.misses}
          </SquareCellGrid>
        </div>
      </div>
    );
  }
}
