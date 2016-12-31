import React, { Component } from 'react'
import { EventEmitter }     from 'fbemitter'

import FullPageMorphButton from '../FullPageMorphButton/FullPageMorphButton'
import ProgressControl     from '../ProgressControl/ProgressControl'
import ProgressCircle      from '../ProgressCircle/ProgressCircle'

import './App.css'

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
            <a href="https://github.com/mnishiguchi/react-full-screen-morph-button">
              React Full-screen Morph Button
            </a>
          </h2>
        </div>

        <div
          style={{ marginTop: '2rem' }}
          className="container"
        >
          <ProgressCircle
            score={this.state.score}
          />
          <br />
          <ProgressControl
            score={this.state.score}
            emitter={this._emitter}
          />
          <FullPageMorphButton
            buttonText="More info"
            >
              {this._renderMorphContent()}
            </FullPageMorphButton>

            <hr />

            {this._renderPlaceholderParagraphs()}
        </div>

      </div>
    )
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


  _renderMorphContent() {
    return (
      <div
        className="morph-content"
        style={{padding: '2rem 0'}}
      >
        <div>
          <div className="container">

            <h2>
              Masatoshi Nishiguchi
            </h2>

            <p>
              One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.
            </p>
            <p>
              The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
            </p>
            <p>
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.
            </p>

            <button
              type="button"
              id="close-button"
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  _renderPlaceholderParagraphs() {
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    )
  }

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

export default App
