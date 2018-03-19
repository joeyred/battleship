import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ShipSelector extends Component {
  static propTypes = {
    activePlayer: PropTypes.object.isRequired,
    selectedShip: PropTypes.object.isRequired,
    rotateHandler: PropTypes.func,
    selectHandler: PropTypes.func,

  };
  allShipsPlaced() {
    const {
      ships
    } = this.props.activePlayer;
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].placed) {
        return false;
      }
    }
    return true;
  }
  render() {
    const {
      ships
    } = this.props.activePlayer;
    let shipsOutput = [];
    for (let i = 0; i < ships.length; i++) {
      shipsOutput.push(
        <button
          className={`ship-selector-button ${ships[i].name}`}
          onClick={() => this.props.selectHandler(i)}
          key={`ship-${i}`}
          >
          <span>{ships[i].name}</span>
        </button>
      );
    }
    return (
      <div className="ship-selector-window">
        <div className="ship-selector-selection-buttons">
          {shipsOutput}
        </div>
        <div className="ship-selector-message-button-row">
          <button
            onClick={() => this.props.rotateHandler()}
          >
            Rotate
          </button>
          <button
            onClick={() => this.props.readyToPlay()}
            disabled={!this.allShipsPlaced()}
          >
            Ready
          </button>
        </div>
      </div>
    );
  }
}
