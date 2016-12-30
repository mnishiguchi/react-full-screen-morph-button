// Ideas adopted from: https://github.com/codrops/ButtonComponentMorph/

import classie from 'classie'

const defaultOptions = {
    closeEl      : '',
    onBeforeOpen : () => { return false },
    onAfterOpen  : () => { return false },
    onBeforeClose: () => { return false },
    onAfterClose : () => { return false }
}

class UIMorphingButton {
  constructor(el, options) {
    this.el = el
    this.options = {...defaultOptions, ...options}
    this._init()
  }


  // ---
  // PRIVATE METHODS
  // ---


  _init() {
      this.expanded  = false
      this.button    = this.el.querySelector('button')
      this.contentEl = this.el.querySelector('.morph-content')
      this._initEvents()
  }

  _initEvents() {

      // open
      this.button.addEventListener('click', () => {
          this.toggle()
      })

      // close
      if (this.options.closeEl !== '') {
          const closeEl = this.el.querySelector(this.options.closeEl)
          if (closeEl) {
              closeEl.addEventListener('click', () => {
                  this.toggle()
              })
          }
      }

      document.onkeydown = function(evt) {
          evt = evt || window.event
          if (this.options.closeEl !== '') {
              const closeEl = this.el.querySelector(this.options.closeEl)

              if (closeEl && this.expanded) {
                  this.toggle()
              }
          }
      }
  }


  // ---
  // PUBLIC METHODS
  // ---


  toggle() {
      if (this.isAnimating) return false

      // callback
      if (this.expanded) {
          this.options.onBeforeClose()
      } else {
          // add class active (solves z-index problem when more than one button is in the page)
          classie.addClass(this.el, 'active')
          this.options.onBeforeOpen()
      }

      this.isAnimating = true

      const self = this

      const onEndTransitionFn = function(ev) {
          if (ev.target !== this) return false

          // open: first opacity then width/height/left/top
          // close: first width/height/left/top then opacity
          if (self.expanded && ev.propertyName !== 'opacity' || !self.expanded && ev.propertyName !== 'width' && ev.propertyName !== 'height' && ev.propertyName !== 'left' && ev.propertyName !== 'top') {
              return false
          }
          this.removeEventListener('transitionend', onEndTransitionFn)

          self.isAnimating = false

          // callback
          if (self.expanded) {
              // remove class active (after closing)
              classie.removeClass(self.el, 'active')
              self.options.onAfterClose()
          } else {
              self.options.onAfterOpen()
          }

          self.expanded = !self.expanded
      }

      this.contentEl.addEventListener('transitionend', onEndTransitionFn)

      // set the left and top values of the contentEl (same like the button)
      const buttonPos = this.button.getBoundingClientRect()
      // need to reset
      classie.addClass(this.contentEl, 'no-transition')
      this.contentEl.style.left = 'auto'
      this.contentEl.style.top  = 'auto'

      // add/remove class "open" to the button wraper
      setTimeout(() => {
          self.contentEl.style.left = buttonPos.left + 'px'
          self.contentEl.style.top = buttonPos.top + 'px'

          if (self.expanded) {
              classie.removeClass(self.contentEl, 'no-transition')
              classie.removeClass(self.el, 'open')
          } else {
              setTimeout(() => {
                  classie.removeClass(self.contentEl, 'no-transition')
                  classie.addClass(self.el, 'open')
              }, 25)
          }
      }, 25)
  }

} // end class

export default UIMorphingButton
