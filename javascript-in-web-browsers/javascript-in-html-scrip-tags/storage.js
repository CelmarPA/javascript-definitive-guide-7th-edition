/**
 * Web applications can use browser APIs to store data locally on the 
 * user’s computer. This client-side storage serves to give the web 
 * browser a memory. Web apps can store user preferences, for example, or 
 * even store their complete state, so that they can resume exactly where 
 * you left off at the end of your last visit. Client-side storage is 
 * segregated by origin, so pages from one site can’t read the data 
 * stored by pages from another site. But two pages from the same site 
 * can share storage and use it as a communication mechanism. Data input 
 * in a form on one page can be displayed in a table on another page, for 
 * example. Web applications can choose the lifetime of the data they 
 * store: data can be stored temporarily so that it is retained only 
 * until the window closes or the browser exits, or it can be saved on 
 * the user’s computer and stored permanently so that it is available 
 * months or years later.
 * 
 * There are a number of forms of client-side storage:
 * 
 * - Web Storage: The Web Storage API consists of the localStorage and 
 * sessionStorage objects, which are essentially persistent objects that 
 * map string keys to string values. Web Storage is very easy to use and 
 * is suitable for storing large (but not huge) amounts of data.
 * 
 * - Cookies: Cookies are an old client-side storage mechanism that was 
 * designed for use by server-side scripts. An awkward JavaScript API 
 * makes cookies scriptable on the client side, but they’re hard to use 
 * and suitable only for storing small amounts of textual data. Also, any 
 * data stored as cookies is always transmitted to the server with every 
 * HTTP request, even if the data is only of interest to the client.
 * 
 * - IndexedDB: IndexedDB is an asynchronous API to an object database 
 * that supports indexing. 
 */

/**
 *                  STORAGE, SECURITY, AND PRIVACY
 * 
 * Web browsers often offer to remember web passwords for you, and they 
 * store them safely in encrypted form on the device. But none of the 
 * forms of client-side data storage described in this chapter involve 
 * encryption: you should assume that anything your web applications save 
 * resides on the user’s device in unencrypted form. Stored data is 
 * therefore accessible to curious users who share access to the device 
 * and to malicious software (such as spyware) that exists on the device. 
 * For this reason, no form of client-side storage should ever be used 
 * for passwords, financial account numbers, or other similarly sensitive 
 * information.
 */

// localStorage and sessionStorage

/**
 * The localStorage and sessionStorage properties of the Window object 
 * refer to Storage objects. A Storage object behaves much like a regular 
 * JavaScript object, except that:
 * 
 * - The property values of Storage objects must be strings.
 * 
 * - The properties stored in a Storage object persist. If you set a 
 * property of the localStorage object and then the user reloads the 
 * page, the value you saved in that property is still available to your 
 * program.
 * 
 * You can use the localStorage object like this, for example:
 */

let name = localStorage.username; // Query a stored value.
if (!name) {
    name = prompt("What is your name?"); // Ask the user a question.
    localStorage.username = name; // Store the user's response.
}

/**
 * You can use the delete operator to remove properties from localStorage 
 * and sessionStorage, and you can use a for/in loop or Object.keys() to 
 * enumerate the properties of a Storage object. If you want to remove 
 * all properties of a storage object, call the clear() method:
 */

localStorage.clear();

/**
 * Storage objects also define getItem(), setItem(), and deleteItem() 
 * methods, which you can use instead of direct property access and the 
 * delete operator if you want to. 
 * 
 * Keep in mind that the properties of Storage objects can only store 
 * strings. If you want to store and retrieve other kinds of data, you’ll 
 * have to encode and decode it yourself.
 * 
 * For example:
 */

// If you store a number, it is automatically converted to a string.
// Don't forget to parse it when retrieving it from storage.
localStorage.x = 10;
let x = parseInt(localStorage.x);

// Convert a Date to a string when setting, and parse it when getting
localStorage.lastRead = (new Date()).toUTCString();
let lastRead = new Date(Date.parse(localStorage.lastRead));

// JSON makes a convenient encoding for any primitive or data structure
localStorage.data = JSON.stringify(data); // Encode and store
let data = JSON.parse(localStorage.data); // Retrieve and decode.

// STORAGE LIFETIME AND SCOPE

/**
 * The difference between localStorage and sessionStorage involves the 
 * lifetime and scope of the storage. Data stored through localStorage is 
 * permanent: it does not expire and remains stored on the user’s device 
 * until a web app deletes it or the user asks the browser (through some 
 * browser-specific UI) to delete it.
 * 
 * localStorage is scoped to the document origin. As explained in “The 
 * same-origin policy”, the origin of a document is defined by its 
 * protocol, hostname, and port. All documents with the same origin share 
 * the same localStorage data (regardless of the origin of the scripts 
 * that actually access localStorage). They can read each other’s data, 
 * and they can overwrite each other’s data. But documents with different 
 * origins can never read or overwrite each other’s data (even if they’re 
 * both running a script from the same third-party server).
 * 
 * Data stored through sessionStorage has a different lifetime than data 
 * stored through localStorage: it has the same lifetime as the top-level 
 * window or browser tab in which the script that stored it is running. 
 * When the window or tab is permanently closed, any data stored through 
 * sessionStorage is deleted. (Note, however, that modern browsers have 
 * the ability to reopen recently closed tabs and restore the last 
 * browsing session, so the lifetime of these tabs and their associated 
 * sessionStorage may be longer than it seems.)
 * 
 * Like localStorage, sessionStorage is scoped to the document origin so 
 * that documents with different origins will never share sessionStorage. 
 * But sessionStorage is also scoped on a per-window basis. If a user has 
 * two browser tabs displaying documents from the same origin, those two 
 * tabs have separate  sessionStorage data: the scripts running in one 
 * tab cannot read or overwrite the data written by scripts in the other 
 * tab, even if both tabs are visiting exactly the same page and are 
 * running exactly the same scripts.
 */

// STORAGE EVENTS

/**
 * Whenever the data stored in localStorage changes, the browser triggers 
 * a “storage” event on any other Window objects to which that data is 
 * visible (but not on the window that made the change). If a browser has 
 * two tabs open to pages with the same origin, and one of those pages 
 * stores a value in localStorage, the other tab will receive a “storage” 
 * event.
 * 
 * Register a handler for “storage” events either by setting 
 * window.onstorage or by calling window.addEventListener() with event 
 * type “storage”.
 * 
 * The event object associated with a “storage” event has some important 
 * properties:
 * 
 * - key: The name or key of the item that was set or removed. If the 
 * clear() method was called, this property will be null.
 * 
 * - newValue: Holds the new value of the item, if there is one. If 
 * removeItem() was called, this property will not be present.
 * 
 * - oldValue: Holds the old value of an existing item that changed or 
 * was deleted. If a new property (with no old value) is added, then this 
 * property will not be present in the event object.
 * 
 * - storageArea: The Storage object that changed. This is usually the 
 * localStorage object.
 * 
 * - url: The URL (as a string) of the document whose script made this
 * storage change.
 * 
 * Note that localStorage and the “storage” event can serve as a 
 * broadcast mechanism by which a browser sends a message to all windows 
 * that are currently visiting the same website. If a user requests that 
 * a website stop performing animations, for example, the site might 
 * store that preference in localStorage so that it can honor it in 
 * future visits. And by storing the preference, it generates an event 
 * that allows other windows displaying the same site to honor the 
 * request as well.
 * 
 * As another example, imagine a web-based image-editing application that 
 * allows the user to display tool palettes in separate windows. When the 
 * user selects a tool, the application uses localStorage to save the 
 * current state and to generate a notification to other windows that a 
 * new tool has been selected.
 */

// Cookies

/**
 * A cookie is a small amount of named data stored by the web browser and 
 * associated with a particular web page or website. Cookies were 
 * designed for server-side programming, and at the lowest level, they 
 * are implemented as an extension to the HTTP protocol. Cookie data is 
 * automatically transmitted between the web browser and web server, so 
 * server-side scripts can read and write cookie values that are stored 
 * on the client. This section demonstrates how client-side scripts can 
 * also manipulate cookies using the cookie property of the Document object.
 * 
 * The API for manipulating cookies is an old and cryptic one. There are 
 * no methods involved: cookies are queried, set, and deleted by reading 
 * and writing the cookie property of the Document object using specially 
 * formatted strings. The lifetime and scope of each cookie can be 
 * individually specified with cookie attributes. These attributes are 
 * also specified with specially formatted strings set on the same cookie 
 * property.
 */

// READING COOKIES

/**
 * When you read the document.cookie property, it returns a string that 
 * contains all the cookies that apply to the current document. The 
 * string is a list of name/value pairs separated from each other by a 
 * semicolon and a space. The cookie value is just the value itself and 
 * does not include any of the attributes that may be associated with 
 * that cookie. In order to make use of the document.cookie property, you 
 * must typically call the split() method to break it into individual 
 * name/value pairs.
 * 
 * Once you have extracted the value of a cookie from the cookie 
 * property, you must interpret that value based on whatever format or 
 * encoding was used by the cookie’s creator. You might, for example, 
 * pass the cookie value to decodeURIComponent() and then to JSON.parse().
 * 
 * The code that follows defines a getCookie() function that parses the document.cookie property and returns an object whose properties specify the names and values of the document’s cookies:
 */

// Return the document's cookies as a Map object.
// Assume that cookie values are encoded with encodeURIComponent().

function getCookies() {
    let cookies = new Map(); // The object we will return
    let all = document.cookie; // Get all cookies in one big string
    let list = all.split("; "); // Split intop individual name/value pairs
    for(let cookie of list) { // For each cookie in that list
        if (!cookie.includes("=")) continue; // Skip if there is no = sign
        let p = cookie.indexOf("="); // Find the first = sign
        let name = cookie.substring(0, p); // Get cookie name
        let value = cookie.substring(p+1); // Gett cookie value
        value = decodeURIComponent(value); // Decode the value
        cookies.set(name, value); // Remember cookie name and value
    }
    return cookies;
}

// STORING COOKIES

/**
 * To associate a transient cookie value with the current document, 
 * simply set the cookie property to a name=value string. For example:
 */

document.cookie = `version=${encodeURIComponent(document.lastModified)}`

/**
 * The next time you read the cookie property, the name/value pair you 
 * stored is included in the list of cookies for the document. Cookie 
 * values cannot include semicolons, commas, or whitespace. For this 
 * reason, you may want to use the core JavaScript global function 
 * encodeURIComponent() to encode the value before storing it in the 
 * cookie. If you do this, you’ll have to use the corresponding 
 * decodeURIComponent() function when you read the cookie value.
 * 
 * A cookie written with a simple name/value pair lasts for the current 
 * web-browsing session but is lost when the user exits the browser. To 
 * create a cookie that can last across browser sessions, specify its 
 * lifetime (in seconds) with a max-age attribute. You can do this by 
 * setting the cookie property to a string of the form: name=value; 
 * max-age=seconds. The following function sets a cookie with an optional 
 * max-age attribute:
 */

// Store the name/value pair as a cookie, encoding the value with
// encodeURIComponent() in order to escape semicolons, commas, and spaces.
// If daysToLive is a number, set the max-age attribute so that the cookie
// expires after the specified number of days. Pass 0 to delete a cookie.
function setCookie(name, value, daysToLive=null) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if (daysToLive !== null) {
        cookie += `; max-age=${daysToLive * 60 * 60 * 24}`;
    }
    document.cookie = cookie;
}

/**
 * Similarly, you can set the path and domain attributes of a cookie by 
 * appending strings of the form ;path=value or ;domain=value to the 
 * string that you set on the document.cookie property. To set the secure 
 * property, simply append ;secure.
 * 
 * To change the value of a cookie, set its value again using the same 
 * name, path, and domain along with the new value. You can change the 
 * lifetime of a cookie when you change its value by specifying a new 
 * max-age attribute.
 * 
 * To delete a cookie, set it again using the same name, path, and 
 * domain, specifying an arbitrary (or empty) value, and a max-age 
 * attribute of 0.
 */

// IndexedDB

