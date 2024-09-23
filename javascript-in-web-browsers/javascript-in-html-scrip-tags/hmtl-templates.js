let tableBody = document.querySelector("tbody");
let template = document.querySelector("#row");
let clone = template.content.cloneNode(true); // deep clone 
// ... Use the DOM to insert content into the <td> elements of the clone...
// Now add the cloned and initialized row into the table
tableBody.append(clone);

/**
 * Template elements do not have to appear literally in an HTML 
 * document in order to be useful. You can create a template in your 
 * JavaScript code, create its children with innerHTML, and then make 
 * as many clones as needed without the parsing overhead of innerHTML.
 */