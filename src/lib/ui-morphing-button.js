// Ideas adopted from: https://github.com/codrops/ButtonComponentMorph/

import classie from 'classie'

const defaultOptions = {
    closeSelector: '',
    onBeforeOpen : () => { return false },
    onAfterOpen  : () => { return false },
    onBeforeClose: () => { return false },
    onAfterClose : () => { return false }
}

class UIMorphingButton {
  constructor(wrapperEl, options) {
    this.wrapperEl = wrapperEl
    this.options   = {...defaultOptions, ...options}
    this.expanded  = false

    this.buttonEl  = this.wrapperEl.querySelector('.openButton')
    this.contentEl = this.wrapperEl.querySelector('.morph-content')

    this._subscribeEventsForToggle()
  }


  // ---
  // PRIVATE METHODS
  // ---


  _subscribeEventsForToggle() {

      // open
      this.buttonEl.addEventListener('click', () => this._toggle() )

      // close
      if (this.options.closeSelector !== '') {
          const closeEl = this.wrapperEl.querySelector(this.options.closeSelector)
          if (closeEl) {
              closeEl.addEventListener('click', () => this._toggle() )
          }
      }
  }

  _toggle() {

      //
      // Before-animation callbacks
      //
      if (this.isAnimating) return false

      if (this.expanded) {
          this.options.onBeforeClose()
      } else {
          // Add class active (solves z-index problem when more than one button is in the page)
          // classie.addClass(this.wrapperEl, 'active')
          this.options.onBeforeOpen()
      }
      this.isAnimating = true


      //
      // Align the content to the button.
      //

      // need to reset
      classie.addClass(this.contentEl, 'no-transition')
      this.contentEl.style.left = 'auto'
      this.contentEl.style.top  = 'auto'

      // add/remove class "open" to the button wraper
      setTimeout(() => {
          const buttonPosition = this.buttonEl.getBoundingClientRect()
          this.contentEl.style.left = buttonPosition.left + 'px'
          this.contentEl.style.top  = buttonPosition.top + 'px'

          if (this.expanded) {
              classie.removeClass(this.contentEl, 'no-transition')
              classie.removeClass(this.wrapperEl, 'open')
          } else {
              setTimeout(() => {
                  classie.removeClass(this.contentEl, 'no-transition')
                  classie.addClass(this.wrapperEl, 'open')
              }, 25)
          }
      }, 25)


      //
      // Set up handler for the content's transitionend event.
      //
      this.contentEl.addEventListener('transitionend', onEndTransitionFn)

      // A reference to this instance.
      const self = this

      function onEndTransitionFn(ev) {
          if (ev.target !== this) return false

          // open:  first opacity then width/height/left/top
          // close: first width/height/left/top then opacity
          const opacityConds  = ev.propertyName !== 'opacity'
          const otherConds    = (ev.propertyName !== 'width') &&
                                (ev.propertyName !== 'height') &&
                                (ev.propertyName !== 'left') &&
                                (ev.propertyName !== 'top')
          const cond = (self.expanded) ? opacityConds && otherConds :
                                         otherConds && opacityConds

          if (cond) { return false }

          // NOTE: Only this "this" is local "this".
          this.removeEventListener('transitionend', onEndTransitionFn)

          self.isAnimating = false

          //
          // After-animation callbacks
          //
          if (self.expanded) {
              self.options.onAfterClose()
          } else {
              self.options.onAfterOpen()
          }

          self.expanded = !self.expanded
      }
  }

} // end class

export default UIMorphingButton
