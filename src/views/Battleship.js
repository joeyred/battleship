import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Battleship.css';

import GAMEDATA from '../mock/GAMEDATA';
// Containers
import GameBoard from '../containers/GameBoard';
// Components

export default class Battleship extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // Player Interface
    // Player Grids
    // Interactive Grid
    const cells = (quantity, keyPrefix) => {
      let output = [];
      for (let i = 0; i < quantity; i++) {
        output.push(<div className="grid-cell" key={`${keyPrefix}-${i}`}></div>);
      }
      return output;
    }
    return (
      <div className="battleship-game">

        <div className="message-modal"></div>

        <div className="player-controls">
          <button className="button circular fire-button">FIRE</button>
        </div>


        <GameBoard activePlayer={GAMEDATA.players[0]} inactivePlayer={GAMEDATA.players[1]} />
        {/* <div className="gameboard" ref="gameboard">
          <div className="crosshairs"></div>
          <div className="grid-interaction-layer"></div>

          <div className="enemy-grid">
            <div className="grid">
              {cells(100, 'enemy')}
            </div>
          </div>

          <div className="player-grid">
            <div className="grid">
              {cells(100, 'player')}
            </div>
          </div>
        </div> */}


      </div>
    );
  }
}
