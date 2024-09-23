/**
 * Reading the innerHTML property of an Element returns the content of 
 * that element as a string of markup. Setting this property on an 
 * element invokes the web browser’s parser and replaces the element’s 
 * current content with a parsed representation of the new string. You 
 * can test this out by opening the developer console and typing:
 */

document.body.innerHTML = "<h1>Oops</h1>";

/**
 * You will see that the entire web page disappears and is replaced 
 * with the single heading, “Oops”. Web browsers are very good at 
 * parsing HTML, and setting innerHTML is usually fairly efficient. 
 * Note, however, that appending text to the innerHTML property with 
 * the +=  operator is not efficient because it requires both a 
 * serialization step to convert element content to a string and then a 
 * parsing step to convert the new string back into element content.
 */

/**
 *                              WARNING
 * When using these HTML APIs, it is very important that you never 
 * insert user input into the document. If you do this, you allow 
 * malicious users to inject their own scripts into your application. 
 * See “Cross-site scripting” for details.
 */

/**
 * The outerHTML property of an Element is like innerHTML except that 
 * its value includes the element itself. When you query outerHTML, the 
 * value includes the opening and closing tags of the element. And when 
 * you set outerHTML on an element, the new content replaces the 
 * element itself.
 * 
 * A related Element method is insertAdjacentHTML(), which allows you 
 * to insert a string of arbitrary HTML markup “adjacent” to the 
 * specified element. The markup is passed as the second argument to 
 * this method, and the precise meaning of “adjacent” depends on the 
 * value of the first argument. This first argument should be a string 
 * with one of the values “beforebegin,” “afterbegin,” “beforeend,” or 
 * “afterend.” These values correspond to insertion points.
 */

// ELEMENT CONTENT AS PLAIN TEXT

/**
 * Sometimes you want to query the content of an element as plain text 
 * or to insert plain text into a document (without having to escape 
 * the angle brackets and ampersands used in HTML markup). The standard 
 * way to do this is with the textContent property:
 */

let para = document.querySelector("p"); // First <p> in the document
let text = para.textContent; // Get the text od the paragraph
para.textContent = "Hello World!"; //  Alter the text od the paragraph

/**
 * The textContent property is defined by the Node class, so it works 
 * for Text nodes as well as Element nodes. For Element nodes, it finds 
 * and returns all text in all descendants of the element.
 * The Element class defines an innerText property that is similar to 
 * textContent. innerText has some unusual and complex behaviors, such 
 * as attempting to preserve table formatting. It is not well specified 
 * nor implemented compatibly between browsers, however, and should no 
 * longer be used.
 */