import _ from 'lodash';
import {
  coordinatesMatch,
  checkForShip,
  validateLocations,
  generateLocations
} from './engine-helpers';

export default class BattleshipEngine {
  constructor() {
    // Use this to define usable methods for the action method.
    this.actions = ['placeShip', 'fire', 'startGame', 'nextTurn'];
    this.players = {};
    // this is what will be exposed to an interface to consume?
    this.gameState = {};
    this.numberOfPlayers = 2;
    this.currentTurn = 0;
    this.currentRound = 0;
    // 0 = player 1, 1 = player 2
    this.activePlayerIndex = 0;
    this.inactivePlayerIndex = (this.activePlayerIndex === 0) ? 1 : 0;
    this.message = '';
    this.gameOver = false;
    this.buildDataModel();
    this.updateExposedState();

  }
  buildDataModel() {
    const factories = {
      player: (ships) => {
        return {
          misses: [],
          hits: [],
          ships: ships
        };
      },
      ship: (name, size) => {
        return {
          name: name,
          size: size,
          locations: [],
          damage: {
            locations: [],
            count: 0
          },
          destroyed: false,
          placed: false
        };
      }
    };
    const ships = [
      {name: 'carrier', size: 5},
      {name: 'battleship',size: 4},
      {name: 'cruiser',size: 3},
      {name: 'submarine',size: 3},
      {name: 'destroyer',size: 2}
    ];
    let players = [];
    let shipsModel = [];


    for (let i = 0; i < this.numberOfPlayers; i++) {
      shipsModel = [];
      for (let shipIndex = 0; shipIndex < ships.length; shipIndex++) {
        shipsModel.push(factories.ship(ships[shipIndex].name, ships[shipIndex].size));
      }
      players.push(factories.player(shipsModel));
    }
    this.players = players;
    this.model = {
      players: players
    };
  }
  updateExposedState() {
    this.gameState = {
      players: this.players,
      numberOfPlayers: this.numberOfPlayers,
      currentRound: this.currentRound,
      currentTurn: this.currentTurn,
      activePlayerIndex: this.activePlayerIndex,
      inactivePlayerIndex: this.inactivePlayerIndex,
      message: this.message,
      gameOver: this.gameOver
    };
  }
  endGameCondition() {
    for (let i = 0; i < this.players[this.inactivePlayerIndex].ships.length; i++) {
      if (this.players[this.inactivePlayerIndex].ships[i].destroyed === false) {
        return false;
      }
    }
    return true;
  }

  spaceCanBeFiredOn(coordinates) {
    const inactivePlayer = this.players[this.inactivePlayerIndex];
    const unavailableSpaces = _.concat(inactivePlayer.misses, inactivePlayer.hits);
    for (let i = 0; i < unavailableSpaces.length; i++) {
      if (coordinatesMatch(unavailableSpaces[i], coordinates)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Proper way for interaction layer to commit actions of the game.
   *
   * @method action
   *
   * @param  {String} name - name of the action matching the private method to invoke.
   * @param  {Object} args - arguments to be passed to the private method.
   */
  action(name, args) {
    // console.log('no match found yet');
    // console.log(this.actions);
    // console.log(_.includes(this.actions, name));
    if (_.includes(this.actions, name)) {
      // console.log('found a match!');
      // fire the method
      if (args) {
        // console.log('args were passed');
        this[name](args);
      } else {
        // console.log('no args here');
        this[name]();
      }
      // end of game condition check?
      if (this.endGameCondition()) {
        this.gameOver = true;
      }
      // update game state
      this.updateExposedState();
    }
  }
  startGame() {
    this.currentRound = 1;
    this.currentTurn = 1;
  }
  nextTurn() {
    if (!this.endGameCondition()) {
      // up then turn counter
      this.currentTurn++;
      this.activePlayerIndex++;
      // check if last player for the round is ending their turn
      if (this.activePlayerIndex === this.numberOfPlayers) {
        this.activePlayerIndex = 0;
        this.currentRound++;
      }
    }
  }
  fire(args) {
    let {coordinates} = args;
    const shipIndex = checkForShip(this.players[this.inactivePlayerIndex], coordinates);

    if (this.spaceCanBeFiredOn(coordinates)) {
      if (shipIndex) {
        let ship = this.players[this.inactivePlayerIndex].ships[shipIndex];

        // Add coordinates to locations array in damage object.
        ship.damage.locations.push(coordinates);

        // Add coordinates to hits array.
        this.players[this.inactivePlayerIndex].hits.push(coordinates);

        this.message = 'hit';

        // Up the damage counter
        ship.damage.count++;

        // If the damage count equals the size of the ship,
        // then the ship has been destroyed.
        if (ship.size === ship.damage.count) {
          ship.destroyed = true;
        }
      } else {
        this.players[this.inactivePlayerIndex].misses.push(coordinates);

        this.message = 'miss';
      }
    }
  }
  placeShip(args) {
    const {
      shipName,
      startingCoordinates,
      orientation
    } = args;
    let player = this.players[this.activePlayerIndex];
    const shipIndex = _.findIndex(player.ships, {name: shipName});
    const proposedLocations = generateLocations(
      startingCoordinates,
      player.ships[shipIndex].size,
      orientation
    );

    if (validateLocations(player, proposedLocations)) {
      this.players[this.activePlayerIndex].ships[shipIndex].locations = proposedLocations;
      this.players[this.activePlayerIndex].ships[shipIndex].placed = true;
    }
  }
}
