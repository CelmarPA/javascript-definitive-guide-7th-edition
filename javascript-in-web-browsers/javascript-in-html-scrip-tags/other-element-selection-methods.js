/**
 * In addition to querySelector() and querySelectorAll(), the DOM also 
 * defines a number of older element selection methods that are more or 
 * less obsolete now. You may still see some of these methods (especially 
 * getElementById()) in use, however:
 */

// Lokk up an element by id. The argument is just the id, without
// the CSS selector prefix #. Similar to document.querySelector("#sect1")
let sect1 = document.getElementById("sect1");

// Look up all elements (such as form checkboxes) that have a name="color"
// attribute. Similar to document.querySelectorAll('*[name=c"color]');
let colors = document.getElementsByName("color");

// Look upo all <h1> elements in the document.
// Similar to document.querySelectorAll("h1")
let headings = document.getElementsByTagName("h1");

// getElementByTagName() is also defined on elements.
// Get all <h2> elements within the sect1 element.
let subheads = sect1.getElementsByTagName("h2");

// Look up all elements that have class "tooltip."
// Similar to document.querySelectorAll*(".tooltip")
let tooltips = document.getElementsByClassName("tooltip");

// Look up all descendants of sect1 that have class "sidebar"
// Similar to sect1.querySelectorAll(".sidebar")
let sidebars = sect1.getElementsByClassName("sidebar");

/**
 * Like querySelectorAll(), the methods in this code return a NodeList 
 * (except for getElementById(), which returns a single Element object). 
 * Unlike querySelectorAll(), however, the NodeLists returned by these 
 * older selection methods are “live,” which means that the length and 
 * content of the list can change if the document content or structure 
 * changes.
 */

// PRESELECTED ELEMENTS

/**
 * For historical reasons, the Document class defines shortcut properties
to access certain kinds of nodes. The images, forms, and links
properties, for example, provide easy access to the <img>, <form>,
and <a> elements (but only <a> tags that have an href attribute) of a document. These properties refer to HTMLCollection objects, which
are much like NodeList objects, but they can additionally be indexed
by element ID or name. With the document.forms property, for
example, you can access the <form id="address"> tag as:
*/

document.forms.address;

/**
 * An even more outdated API for selecting elements is the document.all 
 * property, which is like an HTMLCollection for all elements in the 
 * document. document.all is deprecated, and you should no longer use it.
 */