/**
 * The location property of both the Window and Document objects refers 
 * to the Location object, which represents the current URL of the 
 * document displayed in the window, and which also provides an API for 
 * loading new documents into the window.
 * 
 * The Location object is very much like a URL object (§11.9), and you 
 * can use properties like protocol, hostname, port, and path to access 
 * the various parts of the URL of the current document. The href 
 * property returns the entire URL as a string, as does the toString() 
 * method.
 * 
 * The hash and search properties of the Location object are interesting 
 * ones. The hash property returns the “fragment identifier” portion of 
 * the URL, if there is one: a hash mark (#) followed by an element ID. 
 * The search property is similar. It returns the portion of the URL that 
 * starts with a question mark: often some sort of query string. In 
 * general, this portion of a URL is used to parameterize the URL and 
 * provides a way to embed arguments in it. While these arguments are 
 * usually intended for scripts run on a server, there is no reason why 
 * they cannot also be used in JavaScript-enabled pages.
 * 
 * URL objects have a searchParams property that is a parsed 
 * representation of the search property. The Location object does not 
 * have a searchParams property, but if you want to parse window.location.
 * search, you can simply create a URL object from the Location object 
 * and then use the URL’s searchParams:
 */

let url = new URL(window.location);
let query = utl.searchParams.get("q");
let numResults = parseInt(url.searchParams.get(n) || "10");

// Loading New Documents

/**
 * If you assign a string to window.location or to document.location, 
 * that string is interpreted as a URL and the browser loads it, 
 * replacing the current document with a new one:
 */

window.location = "http://www.oreilly.com"; // Go buy some books!

/**
 * You can also assign relative URLs to location. They are resolved 
 * relative to the current URL:
 */
document.location = "page2.html"; // Load the next page

/**
 * A bare fragment identifier is a special kind of relative URL that does 
 * not cause the browser to load a new document but simply to scroll so 
 * that the document element with id or name that matches the fragment is 
 * visible at the top of the browser window. As a special case, the 
 * fragment identifier #top makes the browser jump to the start of the 
 * document (assuming no element has an id="top" attribute):
 */

location = "#top"; // Jump the top of the document

/**
 * The individual properties of the Location object are writable, and 
 * setting them changes the location URL and also causes the browser to 
 * load a new document (or, in the case of the hash property, to 
 * navigate  within the current document):
 */

document.location.path = "pages/3.html"; // Load a new page
document.location.hash = "TOC"; // Scroll to the table od contents
location.seach  = "?page=" + (page+1); // Reload with new query string

/**
 * You can also load a new page by passing a new string to the assign() 
 * method of the Location object. This is the same as assigning the 
 * string to the location property, however, so it’s not particularly 
 * interesting.
 * 
 * The replace() method of the Location object, on the other hand, is 
 * quite useful. When you pass a string to replace(), it is interpreted 
 * as a URL and causes the browser to load a new page, just as assign() 
 * does. The difference is that replace() replaces the current document 
 * in the browser’s history. If a script in document A sets the location 
 * property or calls assign() to load document B and then the user clicks 
 * the Back button, the browser will go back to document A. If you use 
 * replace() instead, then document A is erased from the browser’s 
 * history, and when the user clicks the Back button, the browser returns 
 * to whatever document was displayed before document A.
 * 
 * When a script unconditionally loads a new document, the replace() 
 * method is a better choice than assign(). Otherwise, the Back button 
 * would take the browser back to the original document, and the same 
 * script would again load the new document. Suppose you have a 
 * JavaScript-enhanced version of your page and a static version that 
 * does not use JavaScript. If you determine that the user’s browser does 
 * not support the web platform APIs that you want to use, you could use 
 * location.replace() to load the static version:
 */

// If the browser does not support the JavaScript APIs we need,
// redirect to a static page that does not use JavaScript.
if (!isBrowserSupported())
    location.replace("staticpage.hmtl");

/**
 * Notice that the URL passed to replace() is a relative one. Relative 
 * URLs are interpreted relative to the page in which they appear, just 
 * as they would be if they were used in a hyperlink. 
 * 
 * In addition to the assign() and replace() methods, the Location object 
 * also defines reload(), which simply makes the browser reload the 
 * document.
 */

// Browsing History

/**
 * The history property of the Window object refers to the History object 
 * for the window. The History object models the browsing history of a 
 * window as a list of documents and document states. The length property 
 * of the History object specifies the number of elements in the browsing 
 * history list, but for security reasons, scripts are not allowed to 
 * access the stored URLs. (If they could, any scripts could snoop 
 * through your browsing history.)
 * 
 * The History object has back() and forward() methods that behave like 
 * the browser’s Back and Forward buttons do: they make the browser go 
 * backward or forward one step in its browsing history. A third method, 
 * go(), takes an integer argument and can skip any number of pages 
 * forward (for positive arguments) or backward (for negative arguments) 
 * in the history list:
 */

history.go(-2); // Go back 2, like clicking the Back button twice
history.go(0); // Another way to reload the current page

/**
 * If a window contains child windows (such as <iframe> elements), the 
 * browsing histories of the child windows are chronologically 
 * interleaved with the history of the main window. This means that 
 * calling history.back() (for example) on the main window may cause one 
 * of the child windows to navigate back to a previously displayed 
 * document but leaves the main window in its current state.
 */

// History Management with hashchange Events

/**
 * One history management technique involves location.hash and the 
 * “hashchange” event. Here are the key facts you need to know to 
 * understand this technique:
 * 
 * - The location.hash property sets the fragment identifier of the URL 
 * and is traditionally used to specify the ID of a document section to 
 * scroll to. But location.hash does not have to be an element ID: you 
 * can set it to any string. As long as no element happens to have that 
 * string as its ID, the browser won’t scroll when you set the hash 
 * property like this.
 * 
 * - Setting the location.hash property updates the URL displayed in the 
 * location bar and, very importantly, adds an entry to the browser’s 
 * history.
 * 
 * Whenever the fragment identifier of the document changes,  the browser 
 * fires a “hashchange” event on the Window object. If you set location.
 * hash explictly, a “hashchange” event is fired. And, as we’ve 
 * mentioned, this change to the Location object creates a new entry in 
 * the browser’s browsing history. So if the user now clicks the Back 
 * button, the browser will return to its previous URL before you set 
 * location.hash. But this means that the fragment identifier has changed 
 * again, so another “hashchange” event is fired in this case. This means 
 * that as long as you can create a unique fragment identifier for each 
 * possible state of your application, “hashchange” events will notify 
 * you if the user moves backward and forward though their browsing 
 * history.
 */

// History Management with pushState()

/**
 * The second technique for managing history is somewhat more complex but 
 * is less of a hack than the “hashchange” event. This more robust 
 * history-management technique is based on the history.pushState() 
 * method and the “popstate” event. When a web app enters a new state, it 
 * calls history.pushState() to add an object representing the state to 
 * the browser’s history. If the user then clicks the Back button, the 
 * browser fires a “popstate” event with a copy of that saved state 
 * object, and the app uses that object to re-create its previous state. 
 * In addition to the saved state object, applications can also save a 
 * URL with each state, which is important if you want users to be able 
 * to bookmark and share links to the internal states of the app.
 * 
 * The first argument to pushState() is an object that contains all the 
 * state information necessary to restore the current state of the 
 * document. This object is saved using HTML’s structured clone 
 * algorithm, which is more versatile than JSON.stringify() and can 
 * support Map,  Set, and Date objects as well as typed arrays and 
 * ArrayBuffers.
 * 
 * The second argument was intended to be a title string for the state, 
 * but most browsers do not support it, and you should just pass an empty 
 * string. The third argument is an optional URL that will be displayed 
 * in the location bar immediately and also if the user returns to this 
 * state via Back and Forward buttons. Relative URLs are resolved against 
 * the current location of the document. Associating a URL with each 
 * state allows the user to bookmark internal states of your application. 
 * Remember, though, that if the user saves a bookmark and then visits it 
 * a day later, you won’t get a “popstate” event about that visit: you’ll 
 * have to restore your application state by parsing the URL.
 */

/**
 *                      THE STRUCTURED CLONE ALGORITHM
 * 
 * The history.pushState() method does not use JSON.stringify()
 * to serialize state data. Instead, it uses a more robust serialization 
 * technique known as the structured clone algorithm, defined by the HTML 
 * standard.
 * 
 * The structured clone algorithm can serialize anything that JSON 
 * stringify() can, but in addition, it enables serialization of most 
 * other JavaScript types, including Map, Set, Date, RegExp, and typed 
 * arrays, and it can handle data structures that include circular 
 * references. The structured clone algorithm cannot serialize functions 
 * or classes, however. When cloning objects it does not copy the 
 * prototype object, getters and setters, or non-enumerable properties. 
 * While the structured clone algorithm can clone most built-in 
 * JavaScript types, it cannot copy types defined by the host 
 * environment, such as document Element objects.
 * 
 * This means that the state object you pass to history.pushState() need 
 * not be limited to the objects, arrays, and primitive values that JSON.
 * stringify() supports. Note, however, that if you pass an instance of a 
 * class that you have defined, that instance will be serialized as an 
 * ordinary JavaScript object and will lose its prototype.
 */

/**
 * In addition to the pushState() method, the History object also  
 * defines replaceState(), which takes the same arguments but replaces 
 * the current history state instead of adding a new state to the 
 * browsing history. When an application that uses pushState() is first 
 * loaded, it is often a good idea to call replaceState() to  define a 
 * state object for this initial state of the application.
 * 
 * When the user navigates to saved history states using the Back or 
 * Forward buttons, the browser fires a “popstate” event on the Window 
 * object. The event object associated with the event has a property 
 * named state, which contains a copy (another structured clone) of the 
 * state object you passed to pushState().
 * 
 * The next example is a simple web application—the number-guessing game 
 * that uses pushState() to save its history, allowing the user to “go 
 * back” to review or redo their guesses:
 * 
 * History management with pushState():
 * 
 * guess-game.html; guess-game-style.css; guess-game-script.js
 */