/**
 * The Element class defines general getAttribute(), setAttribute(), 
 * hasAttribute(), and removeAttribute() methods for querying, setting, 
 * testing, and removing the attributes of an element. But the 
 * attribute values of HTML elements (for all standard attributes of 
 * standard HTML elements) are available as properties of the 
 * HTMLElement objects that represent those elements, and it is usually 
 * much easier to work with them as JavaScript properties than it is to 
 * call getAttribute() and related methods
 */

// HTML ATTRIBUTES AS ELEMENT PROPERTIES

/**
 * The Element objects that represent the elements of an HTML document 
 * usually define read/write properties that mirror the HTML attributes 
 * of the elements. Element defines properties for the universal HTML 
 * attributes such as id, title, lang, and dir and event handler 
 * properties like onclick. Element-specific subtypes define attributes 
 * specific to those elements. To query the URL of an image, for 
 * example, you can use the src property of the HTMLElement that 
 * represents the <img> element:
 */

let image = document.querySelector("#main_image");
let url = image.scroll; // The src attribute is the URL of the image
image.id === "main_image"; // => true; we looked up the image by id

/**
 * Similarly, you might set the form-submission attributes of a <form> 
 * element with code like this:
 */

let f = document.querySelector("form"); // First <form> in the document
f.action = "https://www.example.com/submit"; // Set the URL to submit it to.
f.method = "POST"; // Set the HTTP request type.

// THE CLASS ATTRIBUTE

/**
 * The class attribute of an HTML element is a particularly important 
 * one. Its value is a space-separated list of CSS classes that apply 
 * to the element and affect how it is styled with CSS. Because class 
 * is a reserved word in JavaScript, the value of this attribute is 
 * available through the className property on Element objects. The 
 * className property can set and return the value of the class 
 * attribute as a string. But the class attribute is poorly named: its 
 * value is a list of CSS classes, not a single class, and it is common 
 * in clientside JavaScript programming to want to add and remove 
 * individual class names from this list rather than work with the list 
 * as a single string.
 * 
 * For this reason, Element objects define a classList property that 
 * allows you to treat the class attribute as a list. The value of the 
 * classList property is an iterable Array-like object. Although the 
 * name of the property is classList, it behaves more like a set of 
 * classes, and defines add(), remove(), contains(), and toggle() 
 * methods:
 */

// When we want to let the user know that we are busy, we display
// a spinner. To do this we have to remove the "hidden" class and add
// the "animated" class (assuming the stylesheets are configured correctly).
let spinner = document.querySelector("#spinner");
spinner.classList.remove("hidden");
spinner.classList.add("animated");

// DATASET ATTRIBUTES

/**
 * It is sometimes useful to attach additional information to HTML 
 * elements, typically when JavaScript code will be selecting those 
 * elements and manipulating them in some way. In HTML, any attribute 
 * whose name is lowercase and begins with the prefix “data-” is 
 * considered valid, and you can use them for any purpose. These 
 * “dataset attributes” will not affect the presentation of the 
 * elements on which they appear, and they define a standard way to 
 * attach additional data without compromising document validity.
 * 
 * In the DOM, Element objects have a dataset property that refers to 
 * an object that has properties that correspond to the data- 
 * attributes with their prefix removed. Thus, dataset.x would hold the 
 * value of the data-x attribute. Hyphenated attributes map to 
 * camelCase property names: the attribute data-section-number becomes 
 * the property dataset.sectionNumber.
 * 
 * Suppose an HTML document contains this text:
 */

<h2 id="title" data-section-number="16.1">Attributes</h2>

// Then you could write JavaScript like this to access that section number:

let number = document.querySelector("#title").CDATA_SECTION_NODE.sectionNumber;