/**
 * Web components are defined in JavaScript, so in order to use a web 
 * component in your HTML file, you need to include the JavaScript file 
 * that defines the component. Because web components are a relatively 
 * new technology, they are often written as JavaScript modules, so you 
 * might include one in your HTML like this:
 */

// <script type="module" src="components/search-bos.js"></script>

/**
 * Web components define their own HTML tag names, with the
 * important restriction that those tag names must include a hyphen. 
 * (This means that future versions of HTML can introduce new tags 
 * without hyphens, and there is no chance that the tags will conflict 
 * with anyone’s web component.) To use a web component, just use its 
 * tag in your HTML file:
 */

// <search-box placeholder="Search..."></search-box>

/**
 * Web components can have attributes just like regular HTML tags can; 
 * the documentation for the component you are using should tell you 
 * which attributes are supported. Web components cannot be defined 
 * with self-closing tags. You cannot write <search-box/>, for example. 
 * Your HTML file must include both the opening tag and the closing tag.
 */

/**
 * Like regular HTML elements, some web components are written to 
 * expect children and others are written in such a way that they do 
 * not expect (and will not display) children. Some web components are 
 * written so that they can optionally accept specially labeled 
 * children that will appear in named “slots.” The <search-box> 
 * component pictured in Figure 15-3 and implemented in Example 15-3 
 * uses “slots” for the two icons it displays. If you want to to use a 
 * <search-box> with different icons, you can use HTML like this:
 */

<search-box>
    <img src="images/search-icon.png" slot="left"/>
    <img src="images/cancel-icon.png" slot="right"/>
</search-box>

/**
 * The slot attribute is an extension to HTML that it is used to 
 * specify which children should go where. The slot names—“left” and 
 * “right” in this example—are defined by the web component. If the 
 * component you are using supports slots, that fact should be included 
 * in its documentation.
 * 
 * I previously noted that web components are often implemented as 
 * JavaScript modules and can be loaded into HTML files with a <script 
 * type="module"> tag. You may remember from the beginning of this 
 * chapter that modules are loaded after document content is parsed, as 
 * if they had a deferred tag. So this means that a web browser will 
 * typically parse and render tags like <search-box> before it has run 
 * the code that will tell it what a <search-box> is. This is normal 
 * when using web components. HTML parsers in web browsers are flexible 
 * and very forgiving about input that they do not understand. When 
 * they encounter a web component tag before that component has been 
 * defined, they add a generic HTMLElement to the DOM tree even though 
 * they do not know what to do with it. Later, when the custom element 
 * is defined, the generic element is “upgraded” so that it looks and 
 * behaves as desired.
 * 
 * If a web component has children, then those children will probably 
 * be displayed incorrectly before the component is defined. You can 
 * use this CSS to keep web components hidden until they are defined:
 */

/**
 * Make the <search-box> component invisible before it is defined.
 * And try to duplicate its eventual layout and size so that nearby
 * content dos not move when it becomes defined.
 */

/*
search-box:not(:defined) {
    opacity: 0;
    display: inline-block;
    width: 300px;
    height: 50px;
}
*/

/**
 * Like regular HTML elements, web components can be used in 
 * JavaScript. If you include a <search-box> tag in your web page, then 
 * you can obtain a reference to it with querySelector() and an 
 * appropriate CSS selector, just as you would for any other HTML tag. 
 * Generally, it only makes sense to do this after the module that 
 * defines the component has run, so be careful when querying web 
 * components that you do not do so too early. Web component 
 * implementations typically (but this is not a requirement) define a 
 * JavaScript property for each HTML attribute they support. And, like 
 * HTML elements, they may also define useful methods. Once again, the 
 * documentation for the web component you are using should specify 
 * what properties and methods are available to your JavaScript code.
 */