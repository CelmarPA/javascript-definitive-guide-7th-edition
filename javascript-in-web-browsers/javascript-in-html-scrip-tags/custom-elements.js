/**
 * The second web browser feature that enables web components is b
 * “custom elements”: the ability to associate a JavaScript class with 
 * an HTML tag name so that any such tags in the document are 
 * automatically turned into instances of the class in the DOM tree. 
 * The customElements.define() method takes a web component tag name as 
 * its first argument (remember that the tag name must include a 
 * hyphen) and a subclass of HTMLElement as its second argument. Any 
 * existing elements in the document with that tag name are “upgraded” 
 * to newly created instances of the class. And if the browser parses 
 * any HTML in the future, it will automatically create an instance of 
 * the class for each of the tags it encounters.
 */

/**
 * The class passed to customElements.define() should extend 
 * HTMLElement and not a more specific type like HTMLButtonElement. 
 * Recall that when a JavaScript class extends another class, the 
 * constructor function must call super() before it uses the this 
 * keyword, so if the custom element class has a constructor, it should 
 * call super() (with no arguments) before doing anything else.
 */

/**
 * The browser will automatically invoke certain “lifecycle methods” of 
 * a custom element class. The connectedCallback() method is invoked 
 * when an instance of the custom element is inserted into the 
 * document, and many elements use this method to perform 
 * initialization. There is also a disconnectedCallback() method 
 * invoked when (and if) the element is removed from the document, 
 * though this is less often used.
 * 
 * The browser will automatically invoke certain “lifecycle methods” of 
 * a custom element class. The connectedCallback() method is invoked 
 * when an instance of the custom element is inserted into the 
 * document, and many elements use this method to perform 
 * initialization. There is also a disconnectedCallback() method 
 * invoked when (and if) the element is removed from the document, 
 * though this is less often used.
 * 
 * Custom element classes can also define whatever other properties and 
 * methods they want to. Commonly, they will define getter and setter 
 * methods that make the element’s attributes available as JavaScript 
 * properties.
 * 
 * As an example of a custom element, suppose we want to be able to 
 * display circles within paragraphs of regular text. We’d like to be 
 * able to write HTML like this in order to render mathematical story 
 * problems.
 */

/*
<p>
    The document has one marble: <inline-circle></inline-circle>
    The HTML parser instantiates two more marbles:
    <inline-circle diameter="1.2em" color="blue"></inline-circle>
    <inline-circle diameter=".6em" color="gold"></inline-circle>
    How many marbles does the document contain now?
</p>
*/

/**
 * We can implement this <inline-circle> custom element with the code shown in:
 */

// The <inline-circle> custom element
customElements.define("inline-circle", class InlineCircle
extends HTMLElement {
    // The browser calls this method when an <inline-circle> element
    // is inserted into the document. There is also a disconnectedCallback()
    // that we don't need in this example.
    connectedCallback() {
        // Set the styles needed to create circles
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.style.border = "solid black 1px";
        this.style.tranform = "translateY(10%)";
        // If there is not already a size defined, set a default size
        // that is based on the current font size.
        if (!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }

    // The static observedAttributes property specifies which attibutes
    // we want to be notified about changes to. (We use a getter here since
    // we can only use "static" with methods.)
    static get observedAttributes() { return ["diameter", "color"]; } 

    // This callback is invoked when one of the attributes listed above
    // changes, either when the custom element is first parsed,or later.
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "diameter":
                // If the diameter attribute changes, update the size styles
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                // If the color attribute changes, update the color styles
                this.style.backgroundColor = newValue;
                break;
        }
    }

    // Define JavaScript properties that correspond to the element's
    // attributes. These getters and setters just get and set the underluing
    // attributes. If a JavaScript property is set, that sets the attribute
    // which triggers a call to attributeChangedCallback() which updates
    // the element styles.
    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) { this.setAttribute("diameter", diameter); }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
});