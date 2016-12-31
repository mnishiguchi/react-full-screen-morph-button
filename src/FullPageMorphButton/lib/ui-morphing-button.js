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

    this.buttonEl  = this.wrapperEl.querySelector('button')
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

  // TODO: Understand this code
  _toggle() {
      if (this.isAnimating) return false

      // callback
      if (this.expanded) {
          this.options.onBeforeClose()
      } else {
          // add class active (solves z-index problem when more than one button is in the page)
          classie.addClass(this.wrapperEl, 'active')
          this.options.onBeforeOpen()
      }

      this.isAnimating = true

      const self = this

      const onEndTransitionFn = function(ev) {
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

          // NOTE: this is local this.
          this.removeEventListener('transitionend', onEndTransitionFn)

          self.isAnimating = false

          // callback
          if (self.expanded) {
              // remove class active (after closing)
              classie.removeClass(self.wrapperEl, 'active')
              self.options.onAfterClose()
          } else {
              self.options.onAfterOpen()
          }

          self.expanded = !self.expanded
      }

      this.contentEl.addEventListener('transitionend', onEndTransitionFn)

      // set the left and top values of the contentEl (same like the button)
      const buttonPos = this.buttonEl.getBoundingClientRect()

      // need to reset
      classie.addClass(this.contentEl, 'no-transition')
      this.contentEl.style.left = 'auto'
      this.contentEl.style.top  = 'auto'

      // add/remove class "open" to the button wraper
      setTimeout(() => {
          this.contentEl.style.left = buttonPos.left + 'px'
          this.contentEl.style.top = buttonPos.top + 'px'

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
  }

} // end class

export default UIMorphingButton
