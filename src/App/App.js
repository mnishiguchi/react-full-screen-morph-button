import React, { Component } from 'react'
import Faker                from 'Faker'

import FullScreenMorph from '../FullScreenMorph/FullScreenMorph'

class App extends Component {
  render() {
    const headerStyle = {
      background: '#222',
      height    : 'auto',
      padding   : '25px 0 20px 0',
      color     : 'white',
    }
    
    return (
      <div className="App" style={{textAlign: 'center'}}>
        <div style={headerStyle}>
          <h1 className="h4">
            <a
              href="https://github.com/mnishiguchi/react-full-screen-morph-button"
              style={{color: '#e7e8f4'}}
            >
              React Full-screen Morph Button
            </a>
          </h1>
        </div>

        <div
          style={{ marginTop: '2rem' }}
          className="container"
        >

          <p>{Faker.Lorem.paragraphs()}</p>

          <FullScreenMorph>
            {this._renderMorphContent()}
          </FullScreenMorph>

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
        <h2 className="h3" style={{padding: '1rem 0 1.5rem 0'}}>
          Masatoshi Nishiguchi
        </h2>

        <img src="http://placehold.jp/7b81c3/ffffff/300x200.png" alt="placeholder" />

        <div className="py-1"></div>

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
