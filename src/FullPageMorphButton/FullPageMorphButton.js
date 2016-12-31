import React            from 'react'
import classie          from 'classie'
import classNames       from 'classnames'
import { EventEmitter } from 'fbemitter';
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

    const { openButtonText } = this.props

    return (
      <div className={FullPageMorphButtonClassName}>

        <button
          type="button"
          className="openButton"
          onClick={e => this._handleOpenButtonClick(e)}
        >
          {openButtonText}
        </button>

        {this._renderChildrenWithProps()}
      </div>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentWillMount() {
    // Register and listen for our custom events that will be emitted by children.
    this._subscribeEvents()
  }

  componentDidMount() {
    // this._initUIMorphingButton()

    this._buttonEl  = document.querySelector('.FullPageMorphButton .openButton')
    this._contentEl = document.querySelector('.FullPageMorphButton .MorphContent')
  }

  componentWillUnmount() {
    this._unsubscribeEvents()
  }

  shouldComponentUpdate(nextProps, nextState) {
    // No updating after animation
    return nextState.isExpanded && !nextState.isAnimating
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * Sets up an emitter and listens for events from children.
   */
  _subscribeEvents() {
    this._emitter = new EventEmitter()

    this._emitter.addListener('MORPH_CONTENT_CLOSE_BUTTON_CLICKED', payload => {
      console.log(`MORPH_CONTENT_CLOSE_BUTTON_CLICKED`)
      this._handleCloseButtonClick()
    })
  }

  /**
   * Removes all the listeners that are registered on the emitter.
   */
  _unsubscribeEvents() {
    this._emitter.removeAllListeners()
  }


  // _initUIMorphingButton() {
  //   const wrapperEl = document.querySelector( '.FullPageMorphButton' )
  //   const config = {
  //     closeSelector: '#close-button',
  //     onAfterOpen  : () => { classie.addClass( wrapperEl, 'scroll' ) },
  //   }
  //
  //   new UIMorphingButton( wrapperEl, config )
  // }


  // TODO
  //
  _handleCloseButtonClick(event) {
    this.setState({ isAnimating: true })

    // Disable the transition initially.
    classie.addClass(this._contentEl, 'no-transition')

    // // Align the content to the button.
    // const bottonPosition  = this._buttonEl.getBoundingClientRect()
    // this._contentEl.style.top  = `${bottonPosition.top}px`
    // this._contentEl.style.left = `${bottonPosition.left}px`

    classie.removeClass(this._contentEl, 'no-transition')
    this.setState({ isExpanded: false, isAnimating: false })
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

  _renderChildrenWithProps() {
    const { children } = this.props

    const propsForChildren = {
      emitter: this._emitter
    }

    return children ? React.cloneElement(children, propsForChildren) : null
  }

} // end class

export default FullPageMorphButton
