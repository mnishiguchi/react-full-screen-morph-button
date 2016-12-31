import React from 'react'
import classie from 'classie'
import UIMorphingButton from './lib/ui-morphing-button'

import './FullPageMorphButton.css'

class FullPageMorphButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="morph-button morph-button-overlay morph-button-fixed">

        <button type="button">
          {this.props.buttonText}
        </button>

        {this.props.children}
      </div>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._initUIMorphingButton()
  }

  componentWillUnmount() {
  }


  // ---
  // PRIVATE METHODS
  // ---


  _initUIMorphingButton() {
    const wrapperEl = document.querySelector( '.morph-button' )
    const config = {
      closeSelector: '#close-button',
      onAfterOpen: () => { classie.addClass( wrapperEl, 'scroll' ) },
    }

    new UIMorphingButton( wrapperEl, config )
  }

} // end class

export default FullPageMorphButton
