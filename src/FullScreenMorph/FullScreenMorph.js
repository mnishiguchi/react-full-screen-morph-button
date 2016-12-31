import React      from 'react'
import classie    from 'classie'
import classNames from 'classnames'

import './FullScreenMorph.css'

class FullScreenMorph extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isExpanded  : false,
    }
  }

  render() {
    const FullScreenMorphClassName = classNames({
      'FullScreenMorph' : true,
      'open scroll'     : this.state.isExpanded,
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
      <div className={FullScreenMorphClassName}>

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
   * Aligns the morph content's top-left to the open button's.
   */
  _alignMorphContentToOpenButton() {
    const position  = this._openButtonNode.getBoundingClientRect()
    this._contentNode.style.top  = `${position.top}px`
    this._contentNode.style.left = `${position.left}px`
  }

  /**
   * Handles the closing morph.
   */
  _handleClose(event) {
    // Disable the transition initially.
    classie.addClass(this._contentNode, 'no-transition')

    this._alignMorphContentToOpenButton()

    setTimeout(() => {
      classie.removeClass(this._contentNode, 'no-transition')
      this.setState({
        isExpanded: false
      }, () => {
        classie.removeClass(document.body, 'noscroll')
      })
    }, 25)
  }

  /**
   * Handles the opening morph.
   */
  _handleOpen(event) {
    console.log(event.target)

    // Disable the transition initially.
    classie.addClass(this._contentNode, 'no-transition')

    this._alignMorphContentToOpenButton()

    setTimeout(() => {
      classie.removeClass(this._contentNode, 'no-transition')
      this.setState({
        isExpanded : true,
      }, () => {
        classie.addClass(document.body, 'noscroll')
      })
    }, 25)
  }

} // end class

export default FullScreenMorph
