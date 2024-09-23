/**
 * There are two basic ways to register event handlers. The first, from 
 * the early days of the web, is to set a property on the object or 
 * document element that is the event target. The second (newer and more 
 * general) technique is to pass the handler to the addEventListener() 
 * method of the object or element.
 */

// SETTING EVENT HANDLER PROPERTIES

/**
 * The simplest way to register an event handler is by setting a property 
 * of the event target to the desired event handler function. By 
 * convention, event handler properties have names that consist of the 
 * word “on” followed by the event name: onclick, onchange, onload, 
 * onmouseover, and so on. Note that these property names are case 
 * sensitive and are written in all lowercase, even when the event type 
 * (such as “mousedown”) consists of multiple words. The following code 
 * includes two event handler registrations of this kind:
 */

// Set the onload property of the Window object to a function.
// The function is the event handler: it is invoked when the document loads.
window.onload = function() {
    // Look up a <form> element
    let form = document.querySelector("form#shipping");
    // Register an event handler function on the form that will be invoked
    // before the form is submitted. Assum isFormValid() is define elsewhere
    form.onsubmit = function(event) { // When the user submits the form
        if (!isFormValid(this)) { // check whether form inputs are valid
            event.preventDefault(); // and if not, prevet submission.
        }
    };
};

/**
 * The shortcoming of event handler properties is that they are designed 
 * around the assumption that event targets will have at most one handler 
 * for each type of event. It is often better to register event handlers 
 * using addEventListener() because that technique does not overwrite any 
 * previously registered handlers.
 */

// SETTING EVENT HANDLER ATTRIBUTES

/**
 * The event handler properties of document elements can also be defined
 * directly in the HTML file as attributes on the corresponding HTML tag. 
 * (Handlers that would be registered on the Window element with 
 * JavaScript can be defined with attributes on the <body> tag in HTML.) 
 * This technique is generally frowned upon in modern web development, 
 * but it is possible, and it’s documented here because you may still see 
 * it in existing code.
 * 
 * When defining an event handler as an HTML attribute, the attribute 
 * value should be a string of JavaScript code. That code should be the 
 * body of the event handler function, not a complete function 
 * declaration. That is, your HTML event handler code should not be 
 * surrounded by curly braces and prefixed with the function keyword. For 
 * example:
 */

<button onclick="console.log('Thank you');">Please Click</button>

/**
 * If an HTML event handler attribute contains multiple JavaScript statements, you must remember to separate those statements with semicolons or break the attribute value across multiple lines.
 * 
 * When you specify a string of JavaScript code as the value of an HTML 
 * event handler attribute, the browser converts your string into a 
 * function that works something like this one:
 */

function(event) {
    with(document) {
        with(this.form || {}) {
            with(this) {
                /* your code here */
            }
        }
    }
}

/**
 * The event argument means that your handler code can refer to the 
 * current event object as event. The with statements mean that the code 
 * of your handler can refer to the properties of the target object, the 
 * containing <form> (if any), and the containing Document object 
 * directly, as if they were variables in scope. The with statement is 
 * forbidden in strict mode (§5.6.3), but JavaScript code in HTML 
 * attributes is never strict. Event handlers defined in this way are 
 * executed in an environment in which unexpected variables are defined. 
 * This can be a source of confusing bugs and is a good reason to avoid 
 * writing event handlers in HTML.
 */

// ADDEVENTLISTENER()

/**
 * Any object that can be an event target—this includes the Window and 
 * Document objects and all document Elements—defines a method named 
 * addEventListener() that you can use to register an event handler for 
 * that target. addEventListener() takes three arguments. The first is 
 * the event type for which the handler is being registered. The event 
 * type (or name) is a string that does not include the “on” prefix used 
 * when setting event handler properties. The second argument to 
 * addEventListener() is the function that should be invoked when the 
 * specified type of event occurs. The third argument is optional and is 
 * explained below.
 * 
 * The following code registers two handlers for the “click” event on a 
 * <button> element. Note the differences between the two techniques used:
 */

/**

<button id="mybutton">Click me</button>
<script>
let b = document.querySelector("#mybutton");
b.onclick = function() { console.log("Thanks for clicking me!"); };
b.addEventListener("click", () => { console.log("Thanks again!"); });
</script>

*/

/**
 * Calling addEventListener() with “click” as its first argument does not 
 * affect the value of the onclick property. In this code, a  button 
 * click will log two messages to the developer console. And if we called 
 * addEventListener() first and then set onclick, we would still log two 
 * messages, just in the opposite order. More  importantly, you can call 
 * addEventListener() multiple times to  register more than one handler 
 * function for the same event type on the same object. When an event 
 * occurs on an object, all of the handlers  registered for that type of 
 * event are invoked in the order in which they were registered. Invoking 
 * addEventListener() more than once on the same object with the same 
 * arguments has no effect—the handler function remains registered only 
 * once, and the repeated invocation does not alter the order in which 
 * handlers are invoked.
 * 
 * addEventListener() is paired with a removeEventListener() method that  
 * expects the same two arguments (plus an optional third) but removes an 
 * event handler function from an object rather than adding it. It is 
 * often useful to temporarily register an event handler and then remove 
 * it soon afterward. For example, when you get a “mousedown” event, you 
 * might register temporary event handlers for “mousemove” and “mouseup” 
 * events so that you can see if the user drags the mouse.
 * 
 * You’d then deregister these handlers when the “mouseup” event arrives. 
 * In such a situation, your event handler removal code might look like 
 * this:
 */

document.removeEventListener("mousemove", handleMouseMove);
document.removeEventListener("mouseup", handleMouseup);

/**
 * The optional third argument to addEventListener() is a boolean value 
 * or object. If you pass true, then your handler function is registered 
 * as a capturing event handler and is invoked at a different phase of 
 * event dispatch. We’ll cover event capturing in §15.2.4. If you pass a 
 * third argument of true when you register an event listener, then you 
 * must also pass true as the third argument to removeEventListener() if 
 * you want to remove the handler. 
 * 
 * Registering a capturing event handler is only one of the three options 
 * that addEventListener() supports, and instead of passing asingle 
 * boolean value, you can also pass an object that explicitly specifies 
 * the options you want:
 */

document.addEventListener("click", handleClick, {
    capture: true,
    once: true,
    passive: true
});

/**
 * If the Options object has a capture property set to true, then the 
 * event handler will be registered as a capturing handler. If that 
 * property is false or is omitted, then the handler will be 
 * non-capturing.
 * 
 * If the Options object has a once property set to true, then the event 
 * listener will be automatically removed after it is triggered once. If 
 * this property is false or is omitted, then the handler is never 
 * automatically removed.
 * 
 * If the Options object has a passive property set to true, it indicates 
 * that the event handler will never call preventDefault() to cancel the 
 * default action. This is particularly important for touch events on 
 * mobile devices—if event handlers for “touchmove” events can prevent 
 * the browser’s default scrolling action, then the browser cannot 
 * implement smooth scrolling. This passive property provides a way to 
 * register a potentially disruptive event handler of this sort but lets 
 * the web browser know that it can safely begin its default behavior 
 * —such as scrolling—while the event handler is running. Smooth 
 * scrolling is so important for a good user experience that Firefox and 
 * Chrome make “touchmove” and “mousewheel” events passive by default. So 
 * if you actually want to register a handler that calls preventDefault() 
 * for one of these events, you should explicitly set the passive 
 * property to false.
 * 
 * You can also pass an Options object to removeEventListener(), but the 
 * capture property is the only one that is relevant. There is no need to 
 * specify once or passive when removing a listener, and these properties 
 * are ignored.
 */