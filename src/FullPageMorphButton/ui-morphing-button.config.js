import classie          from 'classie'
import UIMorphingButton from './ui-morphing-button'

function initUIMorphingButton() {
  const docElem = window.document.documentElement
  const el      = document.querySelector( '.morph-button' )

  let didScroll
  let scrollPosition

  scrollFn()

  const opts = {
    closeEl: '#close-button',
    onBeforeOpen: () => {
      noScroll()
    },
    onAfterOpen: () => {
      canScroll()
      classie.addClass( document.body, 'noscroll' )
      classie.addClass( el, 'scroll' )
    },
    onBeforeClose: () => {
      classie.removeClass( document.body, 'noscroll' )
      classie.removeClass( el, 'scroll' )
      noScroll()
    },
    onAfterClose: () => {
      canScroll()
    }
  }

  new UIMorphingButton( el, opts )

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
}

export default initUIMorphingButton;
