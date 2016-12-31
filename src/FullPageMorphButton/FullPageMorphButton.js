import React            from 'react'
import classie          from 'classie'
import classNames       from 'classnames'

import './FullPageMorphButton.css'

class FullPageMorphButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isExpanded  : false,
      isAnimating : false,
      scrollTop   : null,
    }
  }

  render() {
    const FullPageMorphButtonClassName = classNames({
      'FullPageMorphButton scroll' : true,
      'open'                       : this.state.isExpanded,
    })

    const {
      openButtonText,
      closeButtonText,
      children
    } = this.props

    const openButton = (
      <button
        type="button"
        className="openButton"
        ref={node => this._openButtonNode = node}
        onClick={e => this._handleOpen(e)}
      >
        {openButtonText}
      </button>
    )

    const closeButton = (
      <div
        className="closeButton btn btn-secondary"
        onClick={e => this._handleClose(e)}
        style={{position: 'fixed', bottom: '1rem', right: '1rem'}}
      >
        {closeButtonText}
      </div>
    )

    return (
      <div className={FullPageMorphButtonClassName}>

        {openButton}

        <div
          className="MorphContent"
          style={{padding: '2rem 0'}}
          ref={node => this._contentNode = node}
        >
          <div className="container">
            {children} {closeButton}
          </div>
        </div>
      </div>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.isAnimating
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * Handles the closing morph.
   */
  _handleClose(event) {
    this.setState({ isAnimating: true }, () => {

      // Disable the transition initially.
      classie.addClass(this._contentNode, 'no-transition')

      this._alignContentToOpenButton()

      setTimeout(() => {
        classie.removeClass(this._contentNode, 'no-transition')
        this.setState({
          isExpanded: false,
          isAnimating: false
        })
      }, 25)
    })
  }

  /**
   * Handles the opening morph.
   */
  _handleOpen(event) {
    console.log(event.target)
    this.setState({ isAnimating: true }, () => {

      // Disable the transition initially.
      classie.addClass(this._contentNode, 'no-transition')

      this._alignContentToOpenButton()

      setTimeout(() => {
        classie.removeClass(this._contentNode, 'no-transition')
        this.setState({
          isExpanded : true,
          isAnimating: false,
          scrollTop  : document.body.scrollTop
        })
      }, 25)
    })

  }

  _alignContentToOpenButton() {
    const bottonPosition  = this._openButtonNode.getBoundingClientRect()
    this._contentNode.style.top  = `${bottonPosition.top}px`
    this._contentNode.style.left = `${bottonPosition.left}px`
  }
} // end class

export default FullPageMorphButton
