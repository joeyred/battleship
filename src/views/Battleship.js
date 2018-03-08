import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Battleship.css';


// import GAMEDATA from '../mock/GAMEDATA';
// Containers
import GameBoard from '../containers/GameBoard';
// Components

// Our isolated game engine
import BattleshipEngine from '../engine/battleship-engine';
// var game = new BattleshipEngine();

export default class Battleship extends Component {
  constructor(props) {
    super(props);
    this.game = new BattleshipEngine();
    this.state = {
      gameState: this.game.gameState
    };
  }
  componentDidMount() {
    this.setState({gameState: this.game.gameState});
  }
  action(name, args) {
    this.game.action(name, args);
    this.setState({gameState: this.game.gameState});
  }
  render() {
    // Player Interface
    // Player Grids
    // Interactive Grid
    return (
      <div className="battleship-game">

        <div className="message-modal"></div>

        <div className="player-controls">
          <button
            className="button circular fire-button"
            onClick={() => this.action('fire', {coordinates: [1, 1]})}
          >FIRE</button>
          <button
            onClick={()=> this.action('placeShip', {shipName: "carrier", startingCoordinates: [2, 3], orientation: 'vertical'})}
            >Test</button>
        </div>


        <GameBoard
          activePlayer={this.state.gameState.players[this.state.gameState.activePlayerIndex]}
          inactivePlayer={this.state.gameState.players[this.state.gameState.inactivePlayerIndex]}
        />

      </div>
    );
  }
}
