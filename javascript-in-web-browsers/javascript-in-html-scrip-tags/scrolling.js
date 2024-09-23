/**
 * The scrollTo() method of the Window object takes the x and y 
 * coordinates of a point (in document coordinates) and sets these as 
 * the scrollbar offsets. That is, it scrolls the window so that the 
 * specified  point is in the upper-left corner of the viewport. If you 
 * specify a pointthat is too close to the bottom or too close to the 
 * right edge of the  document, the browser will move it as close as 
 * possible to the upperleft corner but won’t be able to get it all the 
 * way there. The following code scrolls the browser so that the 
 * bottom-most page of the document is visible:
 */

// Get the heights of the document and viewport.
let documentHeight = document.documentElement.offsetHeight;
let viewportHeight = window.innerHeight;
// Adn scroll so the last "page" shows in the viewport
window.scrollTo(0, documentHeight - viewportHeight);

/**
 * The scrollBy() method of the Window is similar to scrollTo(), but 
 * its arguments are relative and are added to the current scroll 
 * position:
 */

// Scroll 50 pixels down every 500ms. Note there is no way to turn this off!
setInterval(() => { scrollBy(0, 50) }, 500);

/**
 * If you want to scroll smoothly with scrollTo() or scrollBy(), pass a 
 * single object argument instead of two numbers, like this:
 */

window.scrollTo({
    letf: 0,
    top:  documentHeight - viewportHeight,
    behavior: "smooth"
});