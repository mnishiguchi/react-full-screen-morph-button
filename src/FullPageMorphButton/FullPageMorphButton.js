import React   from 'react'
import initUIMorphingButton from './ui-morphing-button.config.js'

import './FullPageMorphButton.css'

class FullPageMorphButton extends React.Component {
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
    initUIMorphingButton()
  }

  componentWillUnmount() {
  }


  // ---
  // PRIVATE METHODS
  // ---


}

export default FullPageMorphButton
