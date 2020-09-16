import React, { useState, useEffect } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './scroll-to-top.styles.scss';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // updates the showScroll state with pageYOffset
    const checkScrollTop = () => {
      /* to avoid the state from constantly changing resulted from every single update of the DOM event, which causes side-effects & constantly re-renders(bad performance) → limit it to setState only if showScroll = false / true */
      if (window.pageYOffset > 500 && !showScroll) {
        setShowScroll(true);
      } else if (window.pageYOffset <= 500 && showScroll) {
        setShowScroll(false);
      }
    };
    // add an event listener on ComponentDidMount
    document.addEventListener('scroll', checkScrollTop);
    // unbind the event listener on ComponentWillUnmount (a clean up function)
    return () => {
      document.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="scroll-to-top"
      style={{ display: showScroll ? 'flex' : 'none' }}
      onClick={scrollTop}
    >
      <ExpandLessIcon className="arrow-icon" />
    </button>
  );
};

export default ScrollToTop;

/* 
1. showScroll state
  If managing the arrow’s visibility in the parent component’s state,
  it will create unnecessarily state changes and re-rendered the entire parent component 
  when the only thing to do was updating whether or not the arrow should be visible.

2. addEventListener in React?
  While using traditional DOM manipulation in React is considered an anti-pattern, 
  the use in this case is because we are 'not' using traditional DOM manipulation to 
    (1) mutate data
    (2) change state in a significant way
    (3) change the element class or style
  All we are doing is adding a listener to determine whether or not to show an element. 

*/
