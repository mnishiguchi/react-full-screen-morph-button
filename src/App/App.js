import React, { Component } from 'react'
import Faker                from 'Faker'

import FullPageMorphButton from '../FullPageMorphButton/FullPageMorphButton'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="h4">
            <a href="https://github.com/mnishiguchi/react-full-screen-morph-button">
              React Full-screen Morph Button
            </a>
          </h2>
        </div>

        <div
          style={{ marginTop: '2rem' }}
          className="container"
        >

          <p>{Faker.Lorem.paragraphs()}</p>

          <FullPageMorphButton
            openButtonText="More info"
            closeButtonText="Close"
          >
            {this._renderMorphContent()}
          </FullPageMorphButton>

          <p>{Faker.Lorem.paragraphs()}</p>
          <p>{Faker.Lorem.paragraphs()}</p>
          <p>{Faker.Lorem.paragraphs()}</p>
        </div>

      </div>
    )
  }


  // ---
  // PRIVATE METHODS
  // ---


  _renderMorphContent() {
    return (
      <div>
        <h2>
          Masatoshi Nishiguchi
        </h2>

        <p>{Faker.Lorem.paragraphs()}</p>
        <p>{Faker.Lorem.paragraphs()}</p>
        <p>{Faker.Lorem.paragraphs()}</p>
        <p>{Faker.Lorem.paragraphs()}</p>
        <p>{Faker.Lorem.paragraphs()}</p>
        <p>{Faker.Lorem.paragraphs()}</p>
      </div>
    )
  }
} // end class

export default App
