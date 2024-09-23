/**
 * Client-side JavaScript exists to turn static HTML documents into 
 * interactive web applications. So scripting the content of web pages is 
 * really the central purpose of JavaScript.
 * 
 * Every Window object has a document property that refers to a Document 
 * object. The Document object represents the content of the window, and 
 * it is the subject of this section. The Document object does not stand 
 * alone, however. It is the central object in the DOM for representing 
 * and manipulating document content.
 * 
 * The DOM was introduced in §15.1.2. This section explains the API in 
 * detail. It covers:
 * 
 * - How to query or select individual elements from a document.
 * 
 * - How to traverse a document, and how to find the ancestors, siblings, 
 * and descendants of any document element.
 * 
 * - How to query and set the attributes of document elements.
 * 
 * - How to query, set, and modify the content of a document.
 * 
 * - How to modify the structure of a document by creating, inserting, 
 * and deleting nodes.
 */

// Selecting Document Elements
/**
 * Client-side JavaScript programs often need to manipulate one or more 
 * elements within the document. The global document property refers to 
 * the Document object, and the Document object has head and body 
 * properties that refer to the Element objects for the <head> and <body> 
 * tags, respectively. But a program that wants to manipulate an element 
 * embedded more deeply in the document must somehow obtain or select the 
 * Element objects that refer to those document elements.
 */

// SELECTING ELEMENTS WITH CSS SELECTORS

/**
 * CSS stylesheets have a very powerful syntax, known as selectors, for 
 * describing elements or sets of elements within a document. The DOM 
 * methods querySelector() and querySelectorAll() allow us to find the 
 * element or elements within a document that match a specified CSS 
 * selector. Before we cover the methods, we’ll start with a quick 
 * tutorial on CSS selector syntax.
 * 
 * CSS selectors can describe elements by tag name, the value of their id 
 * attribute, or the words in their class attribute:
 */

div // Any <div> element
#nav // The element with id="nav"
.warning // Any element with "warning" in its class attribute

/**
 * The # character is used to match based on the id attribute, and the .
 * character is used to match based on the class attribute. Elements 
 * canalso be selected based on more general attribute values:
 */

p[lang="fr"] // A paragraph written in French: <p lang="fr">
*[name="x"] // Any element with a name="x" attribute

/**
 * Note that these examples combine a tag name selector (or the * tag 
 * name wildcard) with an attribute selector. More complex combinations 
 * are also possible:
 */

span.fatal.error // Any <span> with "fatal" and "error" in its class
span[lang="fr"].warning // Any <span> in French with class "warning"

/**
 * Selectors can also specify document structure:
 */

#log span // Any <span> descendant of the element with id="log"
#log>span // Any <span> child of the element with id="log"
body>h1:first-child // The first <h1> child of the <body>
img + p.caption // A <p> with class "caption" immediately after an <img>
h2 ~ p // Any <p> that follows an <h2> and is a sibling of it

/**
 * If two selectors are separated by a comma, it means that we’ve selected
 * elements that match either one of the selectors:
 */

button, input[type="button"] // All <button> and <input type="button"> elements

/**
 * As you can see, CSS selectors allow us to refer to elements within a 
 * document by type, ID, class, attributes, and position within the 
 * document. The querySelector() method takes a CSS selector string as 
 * its argument and returns the first matching element in the document 
 * that it finds, or returns null if none match:
 */

// Find the document element for the HTML tag with attribute id="spinner"
let spinner = document.querySelector("#spinner");

/**
 * querySelectorAll() is similar, but it returns all matching elements in 
 * the document rather than just returning the first:
 */

// Find all Element objects for <h1>, <h2>, and <h3> tags
let titles = document.querySelectorAll("h1, h2, h3");

/**
 * The return value of querySelectorAll() is not an array of Element 
 * objects. Instead, it is an array-like object known as a NodeList. 
 * NodeList objects have a length property and can be indexed like 
 * arrays, so you can loop over them with a traditional for  loop. 
 * NodeLists are also iterable, so you can use them with for/of loops as 
 * well. If you want to convert a NodeList into a true array, simply pass 
 * it to Array.from().
 * 
 * The NodeList returned by querySelectorAll() will have a length 
 * property set to 0 if there are not any elements in the document that 
 * match the specified selector.
 * 
 * querySelector() and querySelectorAll() are implemented by the Element 
 * class as well as by the Document class. When invoked on an element, 
 * these methods will only return elements that are descendants of that 
 * element.
 * 
 * Note that CSS defines ::first-line and ::first-letter pseudoelements. 
 * In CSS, these match portions of text nodes rather than actual 
 * elements. They will not match if used with querySelectorAll() or 
 * querySelector(). Also, many browsers will refuse to return matches for 
 * the :link and :visited pseudoclasses, as this could expose information 
 * about the user’s browsing history.
 * 
 * Another CSS-based element selection method is closest(). This method 
 * is defined by the Element class and takes a selector as its only 
 * argument. If the selector matches the element it is invoked on, it 
 * returns that element. Otherwise, it returns the closest ancestor 
 * element that the selector matches, or returns null if none matched. In 
 * a sense, closest() is the opposite of querySelector(): closest() 
 * starts at an element and looks for a match above it in the tree, while 
 * querySelector() starts with an element and looks for a match below it 
 * in the tree. closest() can be useful when you have registered an event 
 * handler at a high level in the document tree. If you are handling a 
 * “click” event, for example, you might want to know whether it is a 
 * click a hyperlink. The event object will tell you what the target was, 
 * but that target might be the text inside a link rather than the 
 * hyperlink’s <a> tag itself. Your event handler could look for the 
 * nearest containing hyperlink like this:
 */

// Find the closest enclosing <a> tag that has an href attribute.
let hyperlink = event.target.closest("a[href]");

// Here is another way you might use closest():
// Return true if the element e is inside of an HTML list element
function insideList(e) {
    return e.closest("ul,ol,dl") !== null;
}

/**
 * The related method matches() does not return ancestors or descendants: 
 * it simply tests whether an element is matched by a CSS selector and 
 * returns true if so and false otherwise:
 */

// Return true if e is an HTML heading element
function isHeading(e) {
    return e.matches("h1,h2,h3,h4,h5,h6");
}