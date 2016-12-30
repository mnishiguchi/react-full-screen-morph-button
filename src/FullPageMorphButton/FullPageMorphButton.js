import React   from 'react';
import classie from 'classie'
import UIMorphingButton from './UIMorphingButton'

import './FullPageMorphButton.css'

const content = (
  <div
    className="content-style-overlay"
    style={{padding: '2rem 1rem'}}
  >
    <h2>Masatoshi Nishiguchi</h2>

    <p>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.
    </p>
    <p>
      The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
    </p>
    <p>
      Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.
    </p>

    <button
      type="button"
      id="close-button"
      className="btn btn-secondary"
    >
      Close
    </button>
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
      closeEl : '#close-button',
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
