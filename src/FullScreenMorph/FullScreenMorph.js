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
      <div
        className={FullScreenMorphClassName}
        ref={node => this._wrapperNode = node}
      >

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


  componentDidMount() {
    this._setInitialDimensions()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
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

  /**
   * Sets initial dimensions if specified with props.
   */
  _setInitialDimensions() {
    const { width, height } = this.props

    if (!width || !height) {
      console.info("Default dimensions are applied because you did not specify dimensions")
    }

    this._wrapperNode.style.width = `${width}px`
    this._wrapperNode.style.height = `${height}px`

    this._contentNode.style.width = `${width}px`
    this._contentNode.style.height = `${height}px`

    this._openButtonNode.style.width = `${width}px`
    this._openButtonNode.style.height = `${height}px`
  }

} // end class

export default FullScreenMorph
