 import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Battleship.css';

import series from '../util/series';
// import GAMEDATA from '../mock/GAMEDATA';
// Containers
import GameBoard from '../containers/GameBoard';
import InteractiveBoard from '../containers/InteractiveBoard';
import ShipSelector from '../containers/ShipSelector';
// Components
import Modal from '../components/Modal';
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
      selectedCoordinates: null,
      hoveredCoordinates: null,
      test: ''
    };
  }
  /**
   * Create a series of state changes or other funtionality based on animation frames
   * and multi-step animations.
   *
   * @method series
   *
   * @param  {Object|Boolean} hooks - Callbacks to be executed at specific points
   *                                  in the series.
   * @param  {Function} [hooks.before] - Fired before the first frame is requested.
   * @param  {Function} [hooks.beforeEachFrame] - Fired before each frame.
   * @param  {Function} [hooks.beforeEachStep] - Fired before each step.
   * @param  {Function} [hooks.afterEachFrame] - Fired after each frame.
   * @param  {Function} [hooks.afterEachStep] - Fired after each step.
   * @param  {Function} [hooks.after] - Fired after final frame.
   *
   * @param  {Array[]} steps               - Array of `step` arrays.
   * @param  {Number} steps[].durration    - Ammount of frames in the step.
   * @param  {Object} steps[].partialState  - Partial to be passed to `this.setState`.
   * @param  {Function} [steps[].callback] - Optional callback function.
   */
  // series = (hooks, ...steps) => {
  //   let stepIndex = 0;
  //   let start = null;
  //   let stepStart = null;
  //   let duration = {
  //     current:      0,
  //     previousStep: null,
  //     total:        0
  //   };
  //   let stepsFired = [];
  //
  //   // Loop through the steps and put together whatever values may be needed.
  //   for (let i = 0; i < steps.length; i++) {
  //     // Get total duration
  //     duration.total += steps[i][0];
  //     // Set up Array for our fake loop.
  //     stepsFired.push(false);
  //   }
  //
  //
  //   function step(timestamp) {
  //     start = start ? start : timestamp;
  //     stepStart = stepStart ? stepStart : timestamp;
  //     let progress = timestamp - start;
  //
  //     // HOOK: Before Each Frame
  //     if (hooks && hooks.beforeEachFrame) {
  //       hooks.beforeEachFrame();
  //     }
  //     console.log('das a frame');
  //     // Actions per step
  //     if (progress >= duration.current && stepsFired[stepIndex] === false) {
  //       console.log('step happening');
  //       let callback = steps[stepIndex][2] || false;
  //
  //       // HOOK: Before Each Step
  //       if (hooks && hooks.beforeEachStep) {
  //         hooks.beforeEachStep();
  //       }
  //
  //       if (step[stepIndex][1]) {
  //         this.setState(steps[stepIndex][1]);
  //       }
  //
  //       // if there's a callback, fire it.
  //       if (callback) {
  //         callback();
  //       }
  //       stepsFired[stepIndex] = true;
  //
  //       // only add to the durration as long as it isnt the last step.
  //       if (stepIndex !== steps.length) {
  //         duration.current += steps[stepIndex][0];
  //       }
  //
  //       if (hooks && hooks.afterEachStep) {
  //         hooks.afterEachStep();
  //       }
  //
  //       // Up the step index
  //       stepIndex++;
  //     }
  //
  //     // HOOK: afterEachFrame
  //     if (hooks && hooks.afterEachFrame) {
  //       hooks.afterEachFrame();
  //     }
  //
  //     // Invoke the next frame as long as the total duration of the animation series
  //     // hasn't been exceded.
  //     if (progress < duration.total) {
  //       window.requestAnimationFrame(step);
  //     } else {
  //       // HOOK: after
  //       if (hooks && hooks.after) {
  //         hooks.after();
  //       }
  //     }
  //   }
  //   console.log('hello');
  //   window.requestAnimationFrame(step);
  // }

  componentDidMount() {
    this.setState({
      gameState: this.game.gameState
    });
  }
  triggerMessage() {}
  action(name, args=false) {
    this.game.action(name, args);
    this.setState({gameState: this.game.gameState});
  }
  onCoordinateSelection = (coordinates) => {
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
  fire = () => {
    // this.game.action('fire', {coordinates: this.state.selectedCoordinates});
    this.action('fire', {coordinates: this.state.selectedCoordinates});
    if (this.state.gameState.message === 'hit') {
      series(
        false,
        [
          500,
          () => {console.log('rumble');}
        ],
        [
          500,
          () => {console.log('modal');}
        ]
      );
    }

    if (this.state.gameState.message === 'miss') {
      series(
        false,
        [
          500,
          () => {
            console.log('splash');
            this.setState({test: 'splash'});
          }
        ],
        [
          500,
          () => {console.log('modal');}
        ]
      );
    }
  }
  onCoordinateHover = (coordinates) => {
    this.setState({hoveredCoordinates: coordinates});
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

        <Modal active={false}>
          <h1></h1>
        </Modal>

        <div className="player-controls">
          <button
            className="button circular fire-button"
            onClick={() => this.fire()}
          >
            FIRE
          </button>
        </div>

        {shipSelector}

        <GameBoard
          activePlayer={this.state.gameState.players[this.state.gameState.activePlayerIndex]}
          inactivePlayer={this.state.gameState.players[this.state.gameState.inactivePlayerIndex]}
          selectedShip={this.state.selectedShip}
          hoveredCoordinates={this.state.hoveredCoordinates}
          gameStage={this.state.gameStage}
        />

        <InteractiveBoard
          handleSelection={this.onCoordinateSelection}
          handleHover={this.onCoordinateHover}
          gameStage={this.state.gameStage}
        />

      </div>
    );
  }
}
