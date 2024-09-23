/**
 * Client-side JavaScript programs are almost universally event driven: 
 * rather than running some kind of predetermined computation, they 
 * typically wait for the user to do something and then respond to the 
 * user’s actions. The web browser generates an event when the user 
 * presses a key on the keyboard, moves the mouse, clicks a mouse button, 
 * or touches a touchscreen device. Event-driven JavaScript programs 
 * register callback functions for specified types of events in specified 
 * contexts, and the web browser invokes those functions whenever the 
 * specified events occur. These callback functions are called event 
 * handlers or event listeners, and they are registered with 
 * addEventListener():
 */

// Ask the web browser to return an object representing the HTML
// <button> element that matches this CSS selector
let okay = document.querySelector('#confirmUpadateDialogbutton.okay');

// Now register a callback function to be invoked when the user clicks on that button
okay.addEventListener('click', applyUpdate);