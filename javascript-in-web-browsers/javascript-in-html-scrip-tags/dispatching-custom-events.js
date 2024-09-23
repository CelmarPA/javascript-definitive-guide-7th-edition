/**
 * Client-side JavaScript’s event API is a relatively powerful one, and 
 * you can use it to define and dispatch your own events. Suppose, for 
 * example, that your program periodically needs to perform a long 
 * calculation or make a network request and that, while this operation 
 * is pending, other operations are not possible. You want to let the 
 * user know about this by displaying “spinners” to indicate that the 
 * application is busy. But the module that is busy should not need to 
 * know where the spinners should be displayed. Instead, that module 
 * might just dispatch an event to announce that it is busy and then 
 * dispatch another event when it is no longer busy. Then, the UI module 
 * can register event handlers for those events and take whatever UI 
 * actions are appropriate to notify the user.
 * 
 * If a JavaScript object has an addEventListener() method, then it is an 
 * “event target,” and this means it also has a dispatchEvent() method. 
 * You can create your own event object with the CustomEvent() 
 * constructor and pass it to dispatchEvent(). The first argument to 
 * CustomEvent() is a string that specifies the type of your event, and 
 * the second argument is an object that specifies the properties of the 
 * event object. Set the detail property of this object to a string, 
 * object, or other value that represents the content of your event. If 
 * you plan to dispatch your event on a document element and want it to 
 * bubble up the document tree, add bubbles:true to the second argument:
 */

// Dispatch a custom event so the UI knows we are busy
document.dispatchEvent(new CustomEvent("busy", { detail: true }));

// Perform a network operation
fetch(url)
    .then(handleNetworkRespose)
    .catch(handleNetworkError)
    .finally(() => {
        // Afeter the network request has succeeded or faliled, dispatch
        // another event to let the UI know that we are no longer busy.
        document.dispatchEvent(new CustomEvent("busy", { detail: false }));
    });

// Elsewhere, in your program you can register ta handler for "busy" events
// and use it to show or hide spinner to let the user know.
document.addEventListener("busy", (e) => {
    if(e.detail) {
        showSpinner();
    } else {
        hideSpinner();
    }
});