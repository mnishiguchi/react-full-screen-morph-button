import classie          from 'classie'
import UIMorphingButton from './ui-morphing-button'

let didScroll
let scrollPosition

function initUIMorphingButton() {
  const docElem       = window.document.documentElement
  const morphButtonEl = document.querySelector( '.morph-button' )

  scrollFn()
  
  new UIMorphingButton( morphButtonEl, config() )

  function config() {
    return {
      closeSelector: '#close-button',
      onBeforeOpen: () => {
        noScroll()
      },
      onAfterOpen: () => {
        canScroll()
        classie.addClass( document.body, 'noscroll' )
        classie.addClass( morphButtonEl, 'scroll' )
      },
      onBeforeClose: () => {
        classie.removeClass( document.body, 'noscroll' )
        classie.removeClass( morphButtonEl, 'scroll' )
        noScroll()
      },
      onAfterClose: () => {
        canScroll()
      }
    }
  }

  // Prevents scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 )
  }

  function noScroll() {
    window.removeEventListener( 'scroll', scrollHandler )
    window.addEventListener( 'scroll', noScrollFn )
  }

  function scrollFn() {
    window.addEventListener( 'scroll', scrollHandler )
  }

  function canScroll() {
    window.removeEventListener( 'scroll', noScrollFn )
    scrollFn()
  }

  function scrollHandler() {
    if( !didScroll ) {
      didScroll = true
      setTimeout( function() { scrollPage() }, 60 )
    }
  }

  function scrollPage() {
    scrollPosition = {
      x : window.pageXOffset || docElem.scrollLeft,
      y : window.pageYOffset || docElem.scrollTop
    }
    didScroll = false
  }

  // Prevents scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 )
  }

  function noScroll() {
    window.removeEventListener( 'scroll', scrollHandler )
    window.addEventListener( 'scroll', noScrollFn )
  }

  function scrollFn() {
    window.addEventListener( 'scroll', scrollHandler )
  }

  function canScroll() {
    window.removeEventListener( 'scroll', noScrollFn )
    scrollFn()
  }

  function scrollHandler() {
    if( !didScroll ) {
      didScroll = true
      setTimeout( function() { scrollPage() }, 60 )
    }
  }

  function scrollPage() {
    scrollPosition = {
      x : window.pageXOffset || docElem.scrollLeft,
      y : window.pageYOffset || docElem.scrollTop
    }
    didScroll = false
  }

} // end

export default initUIMorphingButton;
