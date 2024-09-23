/**
 * We’ve seen how to query and alter document content using strings of 
 * TML and of plain text. And we’ve also seen that we can traverse a 
 * Document to examine the individual Element and Text nodes that it is 
 * made of. It is also possible to alter a document at the level of 
 * individual nodes. The Document class defines methods for creating 
 * Element objects, and Element and Text objects have methods for 
 * inserting, deleting, and replacing nodes in the tree. 
 * 
 * Create a new element with the createElement() method of the Document 
 * class and append strings of text or other elements to it with its 
 * append() and prepend() methods:
 */

let paragraph = document.createElement("p"); // Create an empty <p> element
let emphasis = document.createElement("em"); // Create an empty <em> element
emphasis.append("World"); // Add text to the <em> element
paragraph.append("Hello", emphasis, "!"); // Add text and <em> to <p>
paragraph.prepend("i"); // Add more text at start of <p>
paragraph.innerHTML // => "iHello<em>World</em>!"

/**
 * append() and prepend() take any number of arguments, which can be 
 * Node objects or strings. String arguments are automatically 
 * converted to Text nodes. (You can create Text nodes explicitly with 
 * document.createTextNode(), but there is rarely any reason to do so.) 
 * append() adds the arguments to the element at the end of the child 
 * list. prepend() adds the arguments at the start of the child list.
 * 
 * If you want to insert an Element or Text node into the middle of the 
 * containing element’s child list, then neither append() or prepend() 
 * will work for you. In this case, you should obtain a reference to a 
 * sibling node and call before() to insert the new content before that 
 * sibling or after() to insert it after that sibling. 
 * For example:
 */

// Find the heading element with class="greetings"
let greetings = document.querySelector("h2.greetings");

// Now insert the new paragraph and a horizontal rule after the heading
greetings.after(paragraph, document.createElement("hr"));

/**
 * Like append() and prepend(), after() and before() take any number of 
 * string and element arguments and insert them all into the document 
 * after converting strings to Text nodes. append() and prepend() are 
 * only defined on Element objects, but after() and before() work on 
 * both Element and Text nodes: you can use them to insert content 
 * relative to a Text node.
 * 
 * Note that elements can only be inserted at one spot in the document. 
 * If an element is already in the document and you insert it somewhere 
 * else, it will be moved to the new location, not copied:
 */

// We inserted the paragraph after this element, but now we
// move it so it appears before the element instead
greetings.before(paragraph);

/** 
 * If you do want to make a copy of an element, use the cloneNode() 
 * method, passing true to copy all of its content:
 */

// Make a copy of the paragraph and insert it after the greetings element
greetings.after(paragraph.cloneNode(true));

/**
 * You can remove an Element or Text node from the document by calling 
 * its remove() method, or you can replace it by calling replaceWith() 
 * instead. remove() takes no arguments, andreplaceWith() takes any 
 * number of strings and elements just like before() and after() do:
 */

// Remove the greetings element from the document and replace it with
// the paragraph element (moving the paragraph from its current location
// if it is already inserted into the document).
greetings.replaceWith(paragraph);

// And now remove the paragraph
paragraph.remove();

/**
 * The DOM API also defines an older generation of methods for 
 * inserting and removing content. appendChild(), insertBefore(), 
 * replaceChild(), and removeChild() are harder to use than the methods 
 * shown here and should never be needed.
 */
