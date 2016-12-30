import React, { Component } from 'react';
import { EventEmitter }     from 'fbemitter';

import './App.css';

import FullPageMorphButton from '../FullPageMorphButton/FullPageMorphButton';
import ProgressControl     from '../ProgressControl/ProgressControl';
import ProgressCircle      from '../ProgressCircle/ProgressCircle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      score: 77
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="h4">
            React Full-screen Morph Button
          </h2>
        </div>

        <div style={{ margin: '1.5rem 0' }}>
          <ProgressCircle
            score={this.state.score}
          />
          <br />
          <ProgressControl
            score={this.state.score}
            emitter={this._emitter}
          />
        </div>

        <FullPageMorphButton />
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentWillMount() {
    this._subscribeEvents()
  }

  componentWillUnmount() {
    this._unsubscribeEvents()
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * Sets up an emitter and listens for events from children.
   */
  _subscribeEvents() {
    this._emitter = new EventEmitter()

    this._emitter.addListener('PROGRESS_CONTROL_SCORE_CHANGED', ({ score }) => {
      this.setState({ score })
    })
  }

  /**
   * Removes all the listeners that are registered on the emitter.
   */
  _unsubscribeEvents() {
    this._emitter.removeAllListeners()
  }
}

export default App;
