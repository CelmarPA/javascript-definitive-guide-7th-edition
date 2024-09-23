/**
 * The custom element demonstrated in Example 15-2 is not well 
 * encapsulated. When you set its diameter or color attributes, it 
 * responds by altering its own style attribute, which is not behavior 
 * we would ever expect from a real HTML element. To turn a custom 
 * element into a true web component, it should use the powerful 
 * encapsulation mechanism known as shadow DOM.
 * 
 * Shadow DOM allows a “shadow root” to be attached to a custom element 
 * (and also to a <div>, <span>, <body>, <article>, <main>, <nav>, 
 * <header>, <footer>, <section>, <p>, <blockquote>, <aside>, or <h1> 
 * through <h6> element) known as a “shadow host.” Shadow host 
 * elements, like all HTML elements, are already the root of a normal 
 * DOM tree of descendant elements and text nodes. A shadow root is the 
 * root of another, more private, tree of descendant elements that 
 * sprouts from the shadow host and can be thought of as a distinct 
 * minidocument.
 * 
 * The word “shadow” in “shadow DOM” refers to the fact that elements 
 * that descend from a shadow root are “hiding in the shadows”: they 
 * are not part of the normal DOM tree, do not appear in the children  
 * array of their host element, and are not visited by normal DOM 
 * traversal methods such as querySelector(). For contrast, the normal, 
 * regular DOM children of a shadow host are sometimes referred to as 
 * the “light DOM.”
 * 
 * To understand the purpose of the shadow DOM, picture the HTML 
 * <audio> and <video> elements: they display a nontrivial user 
 * interface for controlling media playback, but the play and pause 
 * buttons and other UI elements are not part of the DOM tree and 
 * cannot  be manipulated by JavaScript. Given that web browsers are 
 * designed to display HTML, it is only natural that browser vendors 
 * would want to  display internal UIs like these using HTML. In fact, 
 * most browsers have been doing something like that for a long time, 
 * and the shadow DOM makes it a standard part of the web platform.
 */