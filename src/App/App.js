import React, { Component } from 'react';
import { EventEmitter }     from 'fbemitter';

import './App.css';

import ProgressControl from '../ProgressControl/ProgressControl';
import ProgressCircle  from '../ProgressCircle/ProgressCircle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: 30
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
            rating={this.state.rating}
          />
          <br />
          <ProgressControl
            rating={this.state.rating}
            emitter={this._emitter}
          />
        </div>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentWillMount() {
    this._listenForChildren()
  }

  componentWillUnmount() {
    this._unlistenForChildren()
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * Sets up an emitter and listens for events from children.
   */
  _listenForChildren() {
    this._emitter = new EventEmitter()

    this._emitter.addListener('PROGRESS_CONTROL_RATING_CHANGED', ({ rating }) => {
      this.setState({rating})
    })
  }

  /**
   * Removes all the listeners that are registered on the emitter.
   */
  _unlistenForChildren() {
    this._emitter.removeAllListeners()
  }
}

export default App;
