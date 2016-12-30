import React   from 'react'
import classie from 'classie'
import initUIMorphingButton from './ui-morphing-button.config.js'

import './FullPageMorphButton.css'

class FullPageMorphButton extends React.Component {
  render() {
    return (
      <div className="FullPageMorphButton">
        <div className="morph-button morph-button-overlay morph-button-fixed">

          <button type="button">
            {this.props.buttonText}
          </button>

          {this.props.children}
        </div>
      </div>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    initUIMorphingButton()
  }

  componentWillUnmount() {
  }


  // ---
  // PRIVATE METHODS
  // ---


}

export default FullPageMorphButton
