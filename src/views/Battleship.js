import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Battleship.css';


// import GAMEDATA from '../mock/GAMEDATA';
// Containers
import GameBoard from '../containers/GameBoard';
import InteractiveBoard from '../containers/InteractiveBoard';
import ShipSelector from '../containers/ShipSelector';
// Components

// Our isolated game engine
import BattleshipEngine from '../engine/battleship-engine';
// var game = new BattleshipEngine();

export default class Battleship extends Component {
  constructor(props) {
    super(props);
    this.game = new BattleshipEngine();
    this.state = {
      gameState: this.game.gameState,
      gameStage: 'setup',
      selectedShip: {
        name: null,
        size: null,
        orientation: null
      },
      selectedCoordinates: null
    };
  }
  componentDidMount() {
    this.setState({
      gameState: this.game.gameState
    });
  }
  action(name, args=false) {
    this.game.action(name, args);
    this.setState({gameState: this.game.gameState});
  }
  // TODO fix this weird method. it works, but it makes me super uncomfortable.
  //      i need an adult.
  getSelectedCoordinates = (coordinates) => {
    this.setState({selectedCoordinates: coordinates});
    if (this.state.gameStage === 'setup' && this.state.selectedShip.name !== null) {
      this.action(
        'placeShip',
        {
          shipName:   this.state.selectedShip.name,
          startingCoordinates: coordinates,
          orientation: this.state.selectedShip.orientation
        }
      );
    }
  }
  selectShip = (index) => {
    const {ships} = this.state.gameState.players[this.state.gameState.activePlayerIndex];
    this.setState({
      selectedShip: {
        name: ships[index].name,
        size: ships[index].size,
        orientation: 'vertical'
      }
    });
  }
  rotateShip = () => {
    const {name, size, orientation} = this.state.selectedShip;
    let newOrientation;

    if (orientation === 'vertical') {
      newOrientation = 'horizontal';
    } else {
      newOrientation = 'vertical';
    }
    this.setState({
      selectedShip: {
        name,
        size,
        orientation: newOrientation
      }
    });
  }
  readyToPlay = () => {
    if (this.state.gameState.activePlayerIndex === 1) {
      this.setState({gameStage: 'play'});
    }
    this.action('nextTurn');
  }
  render() {
    const shipSelector = (this.state.gameStage === 'setup') ?
    <ShipSelector
      activePlayer={this.state.gameState.players[this.state.gameState.activePlayerIndex]}
      selectedShip={this.state.selectedShip}
      selectHandler={this.selectShip}
      rotateHandler={this.rotateShip}
      readyToPlay={this.readyToPlay}
    /> : null;
    return (
      <div className="battleship-game">

        <div className="message-modal"></div>

        <div className="player-controls">
          <button
            className="button circular fire-button"
            onClick={() => this.action('fire', {coordinates: this.state.selectedCoordinates})}
          >
            FIRE
          </button>
        </div>

        {shipSelector}

        <GameBoard
          activePlayer={this.state.gameState.players[this.state.gameState.activePlayerIndex]}
          inactivePlayer={this.state.gameState.players[this.state.gameState.inactivePlayerIndex]}
        />

        <InteractiveBoard
          handleSelection={this.getSelectedCoordinates}
          gameStage={this.state.gameStage}
          selectedShip={this.state.selectedShip}
        />

      </div>
    );
  }
}
