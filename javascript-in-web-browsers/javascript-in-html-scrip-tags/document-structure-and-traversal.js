/**
 * Once you have selected an Element from a Document, you sometimes need 
 * to find structurally related portions (parent, siblings, children) of 
 * the document. When we are primarily interested in the Elements of a 
 * document instead of the text within them (and the whitespace between 
 * them, which is also text), there is a traversal API that allows us to 
 * treat a document as a tree of Element objects, ignoring Text nodes 
 * that are also part of the document. This traversal API does not 
 * involve any methods; it is simply a set of properties on Element 
 * objects that allow us to refer to the parent, children, and siblings 
 * of a given element:
 * 
 * - parentNode: This property of an element refers to the parent of the 
 * element, which will be another Element or a Document object.
 * 
 * - children: This NodeList contains the Element children of an element, 
 * but excludes non-Element children like Text nodes (and Comment nodes).
 * 
 * - childElementCount: The number of Element children. Returns the same 
 * value as children.length.
 * 
 * - firstElementChild, lastElementChild: These properties refer to the 
 * first and last Element children of an Element. They are null if the 
 * Element has no Element children.
 * 
 * nextElementSibling, previousElementSibling: These properties refer to 
 * the sibling Elements immediately before or immediately after an 
 * Element, or null if there is no such sibling.
 */

/**
 * Using these Element properties, the second child Element of the first 
 * child Element of the Document can be referred to with either of these 
 * expressions:
 */

document.children[0].children[1]
document.firstElementChild.firstElementChild.nextElementSibling

/**
 * (In a standard HTML document, both of those expressions refer to the 
 * <body> tag of the document.)
 * 
 * Here are two functions that demonstrate how you can use these 
 * properties to recursively do a depth-first traversal of a document 
 * invoking a specified function for every element in the document:
 */

// Recursively traverse the Document or Element e, invoking the function
// f on e and on each of its descendants
function traverse(e, f) {
    f(e); // Invoke f() on e
    for(let child of e.children) { // Iterate over the children
        traverse(child, f); // And recurse on each one
    }
}

function traverse2(e, f) {
    f(e); // Invoke f() on e
    let child = e.firstElementChild; // Iterate the children linked-list style
    while(child !== null) {
        traverse2(child, f) // And recurse
        child = child.nextElementSibling
    }
}

// DOCUMENTS AS TREES OF NODES

/**
 * If you want to traverse a document or some portion of a document and 
 * do not want to ignore the Text nodes, you can use a different set of 
 * properties defined on all Node objects. This will allow you to see 
 * Elements, Text nodes, and even Comment nodes (which represent HTML 
 * comments in the document).
 * 
 * All Node objects define the following properties:
 * 
 * - parentNode: The node that is the parent of this one, or null for 
 * nodes like the Document object that have no parent.
 * 
 * - childNodes: A read-only NodeList that that contains all children 
 * (not just Element children) of the node.
 * 
 * - firstChild, lastChild: The first and last child nodes of a node, or 
 * null if the node has no children.
 * 
 * - nextSibling, previousSibling: The next and previous sibling nodes of 
 * a node. These properties connect nodes in a doubly linked list.
 * 
 * - nodeType: A number that specifies what kind of node this is. 
 * Document nodes have value 9. Element nodes have value 1. Text nodes 
 * have value 3. Comment nodes have value 8.
 * 
 * - nodeValue: The textual content of a Text or Comment node.
 * 
 * - nodeName: The HTML tag name of an Element, converted to uppercase.
 */

/**
 * Using these Node properties, the second child node of the first child 
 * of the Document can be referred to with expressions like these:
 */

document.childNodes[0].childNodes[1]
document.firstChild.firstChild.nextSibling

// Suppose the document in question is the following:
<html><head><title>Test</title></head><body>Hello World!</body></html>

/**
 * Then the second child of the first child is the <body> element. It has 
 * a nodeType of 1 and a nodeName of “BODY”. 
 * 
 * Note, however, that this API is extremely sensitive to variations in 
 * the document text. If the document is modified by inserting a single 
 * newline between the <html> and the <head> tag, for example, the Text 
 * node that represents that newline becomes the first child of the first 
 * child, and the second child is the <head> element instead of the 
 * <body> element.
 * 
 * To demonstrate this Node-based traversal API, here is a function that 
 * returns all of the text within an element or document:
 */

// Return the plain-text content of element e, recursing into child elements.
// This method works like the textContent property
function textContent(e) {
    let s = ""; // Accumulate the text here
    for(let child = e.firstChild; child !== null; child = child.nextSibling) {
        let type = child.nodeType;
        if (type === 3) { // If it is a Text node
            s += child.nodeValue; // add the text content to our string.
        } else if (type === 1) { // And if it is an Element node
            s += textContent(child); // the recurse.
        }
    }
    return s;
}

// This function is a demonstration only—in practice, you would simply
// write e.textContent to obtain the textual content of the element e.