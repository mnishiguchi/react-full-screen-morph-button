import React from 'react'
import classie from 'classie'
import classNames from 'classnames'
import UIMorphingButton from '../lib/ui-morphing-button'

import './FullPageMorphButton.css'

class FullPageMorphButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isExpanded : false,
      isAnimating: false,
    }
  }

  render() {
    const FullPageMorphButtonClassName = classNames({
      'FullPageMorphButton' : true,
      'open'                : !this.state.isExpanded && this.state.isAnimating,
      'open scroll'         : this.state.isExpanded,
    })

    return (
      <div className={FullPageMorphButtonClassName}>

        <button
          type="button"
          className="openButton"
          onClick={e => this._handleOpenButtonClick(e)}
        >
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
    // this._initUIMorphingButton()

    this._buttonEl  = document.querySelector('.FullPageMorphButton .openButton')
    this._contentEl = document.querySelector('.FullPageMorphButton .morph-content')
  }


  shouldComponentUpdate(nextProps, nextState) {
    // No updating after animation
    return nextState.isExpanded && !nextState.isAnimating
  }


  // ---
  // PRIVATE METHODS
  // ---


  _initUIMorphingButton() {
    const wrapperEl = document.querySelector( '.FullPageMorphButton' )
    const config = {
      closeSelector: '#close-button',
      onAfterOpen  : () => { classie.addClass( wrapperEl, 'scroll' ) },
    }

    new UIMorphingButton( wrapperEl, config )
  }

  _handleOpenButtonClick(event) {
    console.log(event.target)
    this.setState({ isAnimating: true })

    // Disable the transition initially.
    classie.addClass(this._contentEl, 'no-transition')

    // Align the content to the button.
    const bottonPosition  = this._buttonEl.getBoundingClientRect()
    this._contentEl.style.top  = `${bottonPosition.top}px`
    this._contentEl.style.left = `${bottonPosition.left}px`

    setTimeout(() => {
        classie.removeClass(this._contentEl, 'no-transition')
        this.setState({ isExpanded: true, isAnimating: false })
    }, 25)
  }

} // end class

export default FullPageMorphButton
