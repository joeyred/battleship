import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import Grid from '../components/Grid';
import SquareCellGrid from '../components/SquareCellGrid';
import Marker from '../components/Marker';
import Ship from '../components/Ship';

export default class GameBoard extends Component {
  static propTypes = {
    activePlayer: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired
  }
  renderMarkers(player, type) {
    let markers = [];
    for (let i = 0; i < player[type].length; i++) {
      markers.push(
        <Marker
          location={player[type][i]}
          classes={`marker ${type}`}
          key={`marker-${type}-${i}`}
        />
      );
    }
    return markers;
  }
  render() {

    let ships = [];
    for (let i = 0; i < this.props.activePlayer.ships.length; i++) {
      if (this.props.activePlayer.ships[i].placed === true) {
        ships.push(
          <Ship
            name={this.props.activePlayer.ships[i].name}
            damage={this.props.activePlayer.ships[i].damage}
            locations={this.props.activePlayer.ships[i].locations}
            key={this.props.activePlayer.ships[i].name}
          />
        );
      }
    }

    return (
      <div className="gameboard" ref="gameboard">
        <div className="enemy-grid">
          <SquareCellGrid dimensions={[10, 10]}>
            {this.renderMarkers(this.props.inactivePlayer, 'hits')}
            {this.renderMarkers(this.props.inactivePlayer, 'misses')}
          </SquareCellGrid>
        </div>
        <div className="player-grid">
          <SquareCellGrid dimensions={[10, 10]}>
            {ships}
            {this.renderMarkers(this.props.activePlayer, 'hits')}
            {this.renderMarkers(this.props.activePlayer, 'misses')}
          </SquareCellGrid>
        </div>
      </div>
    );
  }
}
