import React   from 'react';
import classie from 'classie'
import UIMorphingButton from './UIMorphingButton'


import './FullPageMorphButton.css'

const content = (
  <div
    className="content-style-overlay"
    style={{padding: "2rem 1rem"}}
  >
    <button
      type="button"
      className="close-button pull-right"
    >
      <i className="fa fa-times"></i>
    </button>
    <h2>About Parsley</h2>
    <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p>
    <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot
        soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot
        watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>
  </div>
)

class FullPageMorphButton extends React.Component {
  render() {
    return (
      <div className="FullPageMorphButton">
        <div className="morph-button morph-button-overlay morph-button-fixed">
          <button type="button">More Info</button>
          <div className="morph-content">
            <div>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    var docElem = window.document.documentElement, didScroll, scrollPosition;

    // trick to prevent scrolling when opening/closing button
    function noScrollFn() {
      window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
    }

    function noScroll() {
      window.removeEventListener( 'scroll', scrollHandler );
      window.addEventListener( 'scroll', noScrollFn );
    }

    function scrollFn() {
      window.addEventListener( 'scroll', scrollHandler );
    }

    function canScroll() {
      window.removeEventListener( 'scroll', noScrollFn );
      scrollFn();
    }

    function scrollHandler() {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( function() { scrollPage(); }, 60 );
      }
    };

    function scrollPage() {
      scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
      didScroll = false;
    };

    scrollFn();

    var el = document.querySelector( '.morph-button' );

    new UIMorphingButton( el, {
      closeEl : '.close-button',
      onBeforeOpen : function() {
        // don't allow to scroll
        noScroll();
      },
      onAfterOpen : function() {
        // can scroll again
        canScroll();
        // add class "noscroll" to body
        classie.addClass( document.body, 'noscroll' );
        // add scroll class to main el
        classie.addClass( el, 'scroll' );
      },
      onBeforeClose : function() {
        // remove class "noscroll" to body
        classie.removeClass( document.body, 'noscroll' );
        // remove scroll class from main el
        classie.removeClass( el, 'scroll' );
        // don't allow to scroll
        noScroll();
      },
      onAfterClose : function() {
        // can scroll again
        canScroll();
      }
    } );
  }

  componentWillUnmount() {
  }


  // ---
  // PRIVATE METHODS
  // ---



}

export default FullPageMorphButton;
