import classie          from 'classie'
import UIMorphingButton from './lib/ui-morphing-button'

let didScroll      = false
let scrollPosition = { x: 0, y: 0 }

function initUIMorphingButton() {
  const rootEl    = window.document.documentElement
  const wrapperEl = document.querySelector( '.morph-button' )

  window.addEventListener( 'scroll', scrollHandler )

  new UIMorphingButton( wrapperEl, config() )

  function config() {
    return {
      closeSelector: '#close-button',
      onBeforeOpen: () => {
        disableScrolling()
      },
      onAfterOpen: () => {
        enableScrolling()
        classie.addClass( document.body, 'noscroll' )
        classie.addClass( wrapperEl, 'scroll' )
      },
      onBeforeClose: () => {
        classie.removeClass( document.body, 'noscroll' )
        classie.removeClass( wrapperEl, 'scroll' )
        disableScrolling()
      },
      onAfterClose: () => {
        enableScrolling()
      }
    }
  }

  // Prevents scrolling when opening/closing button
  function stayStill() {
    window.scrollTo( scrollPosition.x,  scrollPosition.y )
  }

  function disableScrolling() {
    window.removeEventListener( 'scroll', scrollHandler )
    window.addEventListener( 'scroll', stayStill )
  }

  function enableScrolling() {
    window.addEventListener( 'scroll', scrollHandler )
  }

  function enableScrolling() {
    window.removeEventListener( 'scroll', stayStill )
    window.addEventListener( 'scroll', scrollHandler )
  }

  function scrollHandler() {
    if( !didScroll ) {
      didScroll = true
      setTimeout(() => {
        rememberPosition()
        didScroll = false
      }, 60 )
    }
  }

  function rememberPosition() {
    scrollPosition.x = window.pageXOffset || rootEl.scrollLeft
    scrollPosition.y = window.pageYOffset || rootEl.scrollTop
  }

} // end

export default initUIMorphingButton;
