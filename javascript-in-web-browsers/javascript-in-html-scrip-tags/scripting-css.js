/**
 * Some of the CSS styles that are commonly scripted from *JavaScript:
 * 
 * - Setting the display style to “none” hides an element. You 
 * can later show the element by setting display to some other 
 * value.
 * 
 * - You can dynamically position elements by setting the 
 * position style to “absolute,” “relative,” or “fixed” and then 
 * setting the top and left styles to the desired coordinates. 
 * This is important when using JavaScript to display dynamic 
 * content like modal dialogues and tooltips.
 * 
 * - You can shift, scale, and rotate elements with the 
 * transform style.
 * 
 * - You can animate changes to other CSS styles with the 
 * transition style. These animations are handled automatically 
 * by the web browser and do not require JavaScript, but you can 
 * use JavaScript to initiate the animations.
 */

// CSS Classes

/**
 * The simplest way to use JavaScript to affect the styling of 
 * document content is to add and remove CSS class names from 
 * the class attribute of HTML tags. This is easy to do with the 
 * classList property of Element objects.
 * 
 * Suppose, for example, that your document’s stylesheet 
 * includes a definition for a “hidden” class:
 */

.hidden {
    diplay: none;
}

/**
 * With this style defined, you can hide (and then show) an 
 * element with code like this:
 */

// Assume that this "tooltip" element has class="hidden" in the HTML file.
// We can make it visible like this:
document.querySelector("tooltip").classList.remove("hidden");

// And we can hide it again like this:
document.querySelector("tooltip").classList.add("hidden");

// Inline Styles

/**
 * To continue with the preceding tooltip example, suppose that 
 * the document is structured with only a single tooltip 
 * element, and we want to dynamically position it before 
 * displaying it. In general, we can’t create a different 
 * stylesheet class for each possible position of the tooltip, 
 * so the classList property won’t help us with positioning.
 * 
 * In this case, we need to script the style attribute of the 
 * tooltip element to set inline styles that are specific to 
 * that one element. The DOM defines a style property on all 
 * Element objects that correspond to the style attribute. 
 * Unlike most such properties, however, the style property is 
 * not a string. Instead, it is a CSSStyleDeclaration object: a 
 * parsed representation of the CSS styles that appear in 
 * textual form in the style attribute. To display and set the 
 * position of our hypothetical tooltip with JavaScript, we 
 * might use code like this:
 */

function displayAt(tooltip, x, y) {
    tooltip.style.diplay = "block";
    tooltip.style.position = "absolute";
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

/**
 *       NAMING CONVENTIONS: CSS PROPERTIES IN JAVASCRIPT 
 * 
 * Many CSS style properties, such as font-size, contain hyphens 
 * in their names. In JavaScript, a hyphen is interpreted as a 
 * minus sign and is not allowed in property names or other 
 * identifiers.  Therefore, the names of the properties of the 
 * CSSStyleDeclaration object are slightly different from the 
 * names of actual CSS properties. If a CSS property name 
 * contains one or more hyphens, the CSSStyleDeclaration 
 * property name is formed by removing the hyphens and 
 * capitalizing the letter immediately following each hyphen. 
 * The CSS property border-left-width is accessed through the 
 * JavaScript borderLeftWidth property, for example, and the CSS 
 * font-family property is written as fontFamily in JavaScript.
 */

/**
 * When working with the style properties of the 
 * CSSStyleDeclaration object, remember that all values must be 
 * specified as strings. In a stylesheet or style attribute, you 
 * can write:
 */

display: block; font-family: sans-serif; background-color: #ffffff;

// To accomplish the same thing for an element e with JavaScript, you  have to quote all of the values:
e.style.display = "block";
e.style.fontFamily = "sans-serif";
e.style.backgroundColor = "#ffffff";

/**
 * Furthermore, remember that many CSS properties require units 
 * such as “px” for pixels or “pt” for points. Thus, it is not 
 * correct to set the marginLeft property like this:
 */

e.style.marginLeft = 300; // Incorrect: this is a number, not a string
e.style.marginLeft - "300"; // Incorrect: the units are missing

/**
 * Furthermore, remember that many CSS properties require units 
 * such as “px” for pixels or “pt” for points. Thus, it is not 
 * correct to set the marginLeft property like this:
 */
e.style.marginLeft = "300px";

/**
 * If you want to set a CSS property to a computed value, be 
 * sure to append the units at the end of the computation:
 */
e.style.left = `${x0 + left_border + left_padding}px`;

/**
 * Recall that some CSS properties, such as margin, are 
 * shortcuts for other properties, such as margin-top, 
 * margin-right, marginbottom, and margin-left. The 
 * CSSStyleDeclaration object has properties that correspond to 
 * these shortcut properties. For example, you might set the 
 * margin property like this:
 */
e.style.margin = `${top}px ${right}px ${buttom}px ${left}px`;

/**
 * Sometimes, you may find it easier to set or query the inline 
 * style of an element as a single string value rather than as a 
 * CSSStyleDeclaration object. To do that, you can use the 
 * Element getAttribute() and setAttribute() methods, or you can 
 * use the cssText property of the CSSStyleDeclaration object:
 */

// Copy the inline style of element e to element f:
f.setAttribute("style", e.getAttribute("style"));

// Or do it like this:
f.style.cssText = e.style.cssText;

/**
 * When querying the style property of an element, keep in mind 
 * that it represents only the inline styles of an element and 
 * that most styles for most elements are specified in 
 * stylesheets rather than inline. Furthermore, the values you 
 * obtain when querying the style property will use whatever 
 * units and whatever shortcut property format is actually used 
 * on the HTML attribute, and your code may have to do some 
 * sophisticated parsing to interpret them. In general, if you 
 * want to query the styles of an element, you probably want the 
 * computed style, which is discussed next.
 */

// Computed Styles

/**
 * The computed style for an element is the set of property 
 * values that the browser derives (or computes) from the 
 * element’s inline style plus all applicable style rules in all 
 * stylesheets: it is the set of properties actually used to 
 * display the element. Like inline styles, computed styles are 
 * represented with a CSSStyleDeclaration object. Unlike inline 
 * styles, however, computed styles are read-only. You can’t set 
 * these styles, but the computed CSSStyleDeclaration object for 
 * an element lets you determine what style property values the 
 * browser used when rendering that element.
 * 
 * Obtain the computed style for an element with the 
 * getComputedStyle() method of the Window object. The first 
 * argument to this method is the element whose computed style 
 * is desired. The optional second argument is used to specify a 
 * CSS pseudoelement, such as “::before” or “::after”:
 */

let title = document.querySelector("#section1title");
let styles = window.getComputedStyle(title);
let beforeStyles = window.getComputedStyle(title, "::before");

/**
 * The return value of getComputedStyle() is a 
 * CSSStyleDeclaration object that represents all the styles 
 * that apply to the specified element (or pseudoelement). There 
 * are a number of important differences between a 
 * CSSStyleDeclaration object that represents inline styles and 
 * one that represents computed styles:
 * 
 * - Computed style properties are read-only.
 * 
 * - Computed style properties are absolute: relative units like 
 * percentages and points are converted to absolute values. Any 
 * property that specifies a size (such as a margin size or a 
 * font size) will have a value measured in pixels. This value 
 * will be a string with a “px” suffix, so you’ll still need to 
 * parse it, but you won’t have to worry about parsing or 
 * converting other units. Properties whose values are colors 
 * will be returned in “rgb()” or “rgba()” format.
 * 
 * -  Shortcut properties are not computed—only the fundamental 
 * properties that they are based on are. Don’t query the margin 
 * property, for example, but use marginLeft, marginTop, and so 
 * on. Similarly, don’t query border or even borderWidth. 
 * Instead, use borderLeftWidth, borderTopWidth, and so on.
 * 
 * - The cssText property of the computed style is undefined.
 */

/**
 * A CSSStyleDeclaration object returned by getComputedStyle() 
 * generally contains much more information about an element than the 
 * CSSStyleDeclaration obtained from the inline style property of that 
 * element. But computed styles can be tricky, and querying them does 
 * not always provide the information you might expect. Consider the 
 * font-family attribute: it accepts a comma-separated list of desired 
 * font families for cross-platform portability. When you query the 
 * fontFamily property of a computed style, you’re simply getting the 
 * value of the most specific font-family style that applies to the 
 * element. This may return a value such as “arial,helvetica,
 * sans-serif,” which does not tell you which typeface is actually in 
 * use. Similarly, if an element is not absolutely positioned, 
 * attempting to query its position and size through the top and left 
 * properties of its computed style often returns the value auto. This 
 * is a perfectly legal CSS value, but it is probably not what you were 
 * looking for.
 * 
 * Although CSS can be used to precisely specify the position and size 
 * of document elements, querying the computed style of an element is 
 * not the preferred way to determine the element’s size and position. 
 */

// Scripting Stylesheets

/**
 * In addition to scripting class attributes and inline styles, 
 * JavaScript can also manipulate stylesheets themselves. Stylesheets 
 * are associated with an HTML document with a <style> tag or with a 
 * <link rel="stylesheet"> tag. Both of these are regular HTML tags, so 
 * you can give them both id attributes and then look them up with 
 * document.querySelector().
 * 
 * The Element objects for both <style> and <link> tags have a disabled 
 * property that you can use to disable the entire stylesheet. 
 * You might use it with code like this:
 */

// This function switches between the "light" and "dark" themes
function toggleTheme() {
    let ligthTheme = document.querySelector("#light-theme");
    let darkTheme = document.querySelector("#dark-theme");
    if (darkTheme.disable) { // Currently light, switch to dark
        ligthTheme.disable = true;
        darkTheme.disable = false;
    } else { // Currently dark, switch to light
        ligthTheme.disable = false;
        darkTheme.disable = true;
    }
}

/**
 * Another simple way to script stylesheets is to insert new ones into 
 * the document using DOM manipulation techniques we’ve already seen. 
 * For example:
 */

function setTheme(name) {
    // Create a new <link rel="stylesheet"> element to load the named stylesheet
    let link = document.createElement("link");
    link.id = "theme";
    link.rel = "stylesheet";
    link.href = `theme/${name}.css`;

    // Look for an existing link with id "theme"

    let currentTheme = document.querySelector("#theme");
    if (currentTheme) {
        // If there is an existing theme,  replace it with the new one.
        currentTheme.replaceWith(link);
    } else {
        // Otherwise, just insert the link to the theme stylesheet.
        document.head.append(link);
    }
}

/**
 * Less subtly, you can also just insert a string of HTML containing a 
 * <style> tag into your document. This is a fun trick, for example:
 */

document.head.insertAdjacentHTML(
    "beforeend",
    "<style> body{transform:rotate(180deg)}</style>"
);

// CSS Animations and Events

/**
 * Suppose you have the following two CSS classes defined in a 
 * stylesheet:
 */

.transparent { opacity: 0; }
.fadeable { transition: opacity .5s ease-in }

/**
 * If you apply the first style to an element, it will be fully 
 * transparent and therefore invisible. But if you apply the second 
 * style that tells the browser that when the opacity of the element 
 * changes, that change should be animated over a period of 0.5 
 * seconds, “ease-in” specifies that the opacity change animation 
 * should start off slow and then accelerate.
 */

/**
 * Now suppose that your HTML document contains an element with the 
 * “fadeable” class:
 */

<div id="subscribe" class="fadeable notification">...</div>

// In JavaScript, you can add the “transparent” class:
document.querySelector("#subscribe").classList.add("transparent");

/**
 * This element is configured to animate opacity changes. Adding the 
 * “transparent” class changes the opacity and triggers an animate: the 
 * browser “fades out” the element so that it becomes fully transparent 
 * over the period of half a second.
 * 
 * This works in reverse as well: if you remove the “transparent” class 
 * of a “fadeable” element, that is also an opacity change, and the 
 * element fades back in and becomes visible again.
 * 
 * JavaScript does not have to do any work to make these animations 
 * happen: they are a pure CSS effect. But JavaScript can be used to 
 * trigger them.
 * 
 * JavaScript can also be used to monitor the progress of a CSS 
 * transition because the web browser fires events at the start and end 
 * of a transition. The “transitionrun” event is dispatched when the 
 * transition is first triggered. This may happen before any visual 
 * changes begin, when the transition-delay style has been specified. 
 * Once the visual changes begin a “transitionstart” event is 
 * dispatched, and when the animation is complete, a “transitionend” 
 * event is dispatched. The target of all these events is the element 
 * being animated, of course. The event object passed to handlers for 
 * these events is a TransitionEvent object. It has a propertyName 
 * property that specifies the CSS property being animated and an 
 * elapsedTime property that for “transitionend” events specifies how 
 * many seconds have passed since the “transitionstart” event.
 * 
 * In addition to transitions, CSS also supports a more complex form of 
 * animation known simply as “CSS Animations.” These use CSS properties 
 * such as animation-name and animation-duration and a special 
 * @keyframes rule to define animation details. But once again, 
 * if you define all of the animation properties on a CSS class, then 
 * you can use JavaScript to trigger the animation simply by adding the 
 * class to the element that is to be animated.
 * 
 * And like CSS transitions, CSS animations also trigger events that 
 * your JavaScript code can listen form. “animationstart” is dispatched 
 * when the animation starts, and “animationend” is dispatched when it 
 * is complete. If the animation repeats more than once, then an 
 * “animationiteration” event is dispatched after each repetition 
 * except the last. The event target is the animated element, and the 
 * event object passed to handler functions is an AnimationEvent 
 * object. These events include an animationName property that 
 * specifies the animation-name property that defines the animation and 
 * an elapsedTime property that specifies how many seconds have passed 
 * ince the animation started.
 */