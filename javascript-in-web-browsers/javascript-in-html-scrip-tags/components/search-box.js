class SearchBox extends HTMLElement {
    constructor() {
        super(); // Invoke the superclass constructor; must be first.

        // Create a shadow DOM tree and attach it to this eleement, setting
        // The value of this.shadowRoot.
        this.attachShadow({mode: "open"});

        // Clone the template that defines the descendants  and stylesheet for
        // this custom component,and append that content to the shadow root.
        this.shadowRoot.append(SearchBox.template.content.cloneNode(true));

        // Get references  to the important elements in the shadow DOM
        this.input = this.shadowRoot.querySelector("input");
        let leftSlot = this.shadowRoot.querySelector('slot[name="left"]');
        let rightSlot = this.shadowRoot.querySelector('slot[name="right"]');

        // When the internal input field gets or loses focus, set or remove
        // The "focused" attribute which will cause our internal stylesheet
        // to display or hide a fake focus ring on the entire component. Note
        // that the "blur" and "focus" events bubble and appear to originate
        // from the <search-box>.
        this.input.onfocus = () => { this.setAttribute("focused", ""); };
        this.input.onblur = () => { this.removeAttribute("focused");};

        // If the user clicks on the magnifying glass, trigger a "search" 
        // event. Also trigger it if the input field fires a "change" 
        // event. (The "change" event does not bubble out of the Shadow DOM.)
        leftSlot.onclick = this.input.onchange = (event) => {
            event.stopPropagation(); // Prevent clicks events from bubbling
            if (this.disable) return; // Do nothing when disable
            this.dispatchEvent(new CustomEvent("search", {
                detail: this.input.value
            }));
        };

        // If the user clicks on the X, trigger a "clear" event.
        // If preventDefault() is not called on the event, clear the input.
        rightSlot.onclick = (event) => {
            event.stopPropagation(); // Don't let the click bubble up
            if (this.disable) return; // Don't do anything if disable
            let e = new CustomEvent("clear", { cancelable: true });
            this.dispatchEvent(e);
            if (!e.defaultPrevented) { // If the event was not "cancelled"
                this.input.value = ""; // the clear the input field
            }
        };
    }

    // When some of our attributes are set or changed, we need to set the 
    // correspoding value on the internal <input> element. This life cycle
    // method, together with the static observedAttributes property below,
    // takes care of that.
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.input.disabled =  newValue !== null;
        } else if (name === "placeholder") {
            this.input.placeholder = newValue;
        } else if (name === "size") {
            this.input.size = newValue;
        } else if (name === "value") {
            this.input.value = newValue;
        }
    }

    // Finally, we define property getters and setters for properties that
    // correspond to the HTML attributes we support. The getters simply return
    // the value (or the presence) of the attribute. And the setters just set
    // the value (or the presence) of the attribute. When a setter method
    // changes an attribute, the browser will automatically invoke the
    // attributeChangedCallback above.

    get placeholder() { return this.getAttribute("placeholder"); }
    get size() { return this.getAttribute("size"); }
    get value() { return this.getAttribute("value"); }
    get disabled() { return this.getAttribute("disabled"); }
    get hidden() { return this.getAttribute("hidden"); }

    set placeholder(value) { this.setAttribute("placeholder", value); }
    set size(value) { this.setAttribute("size", value); }
    set value(text) { this.setAttribute("value", text); }
    set disabled(value) {
        if (value) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }
    set hidden(value) {
        if (value) this.setAttribute("hidden", "");
        else this.removeAttribute("hidden");
    }
}

// This static field is required for the attributeChangedCallback method.
// Only attributes named in this array will trigger calls to that method.
SearchBox.observedAttributes = ["disabled", "placeholder", "size", "value"];

// Create a <template> element to hold the stylesheet and the tree of
// elements that we'll use for each instance of the SearchBox element.
SearchBox.template = document.createElement("template");

// We initialize the template by parsing this string of HTML. Note, however,
// that when we instantiate a SearchBox, we are able to just clone the nodes
// in the template and do have to parse the HTML again.
SearchBox.template.innerHTML = `
<style>
/*
* The :host selector refers to the <search-box> element in the light
* DOM. These styles are defaults and can be overridden by the user of the
* <search-box> with styles in the light DOM.
*/
:host {
    display: inline-block; /* The default is inline display */
    border: solid black 1px; /* A rounded border around the <input> and <slots> */
    border-radius: 5px;
    padding: 4px 6px; /* And some space inside the border */
}
:host([hidden]) { /* Note the parentheses: when host has hidden... */
    display:none; /* ...attribute set don't display it */
} 
:host([disabled]) { /* When host has the disabled attribute... */
    opacity: 0.5; /* ...gray it out */
}
:host([focused]) { /* When host has the focused attribute... */
box-shadow: 0 0 2px 2px #6AE; /* display this fake focus ring. */
}
/* The rest of the stylesheet only applies to elements in the Shadow DOM. */
input {
    border-width: 0; /* Hide the border of the internal input field. */
    outline: none; /* Hide the focus ring, too. */
    font: inherit; /* <input> elements don't inherit font by default */
    background: inherit; /* Same for background color. */
} 
slot {
    cursor: default; /* An arrow pointer cursor over the buttons */
    user-select: none; /* Don't let the user select the emoji text */
} 
</style>
<div>
    <slot name="left">\u{1f50d}</slot> <!-- U+1F50D is a magnifying glass -->
    <input type="text" id="input" /> <!-- The actual input element -->
    <slot name="right">\u{2573}</slot> <!-- U+2573 is an X -->
</div>
`;
// Finally, we call customElement.define() to register the SearchBox element
// as the implementation of the <search-box> tag. Custom elements are required
// to have a tag name that contains a hyphen.
customElements.define("search-box", SearchBox);