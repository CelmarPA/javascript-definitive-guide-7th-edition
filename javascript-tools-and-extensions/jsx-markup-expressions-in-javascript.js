/**
 * JSX is an extension to core JavaScript that uses HTML-style syntax to 
 * define a tree of elements. JSX is most closely associated with the 
 * React framework for user interfaces on the web. In React, the trees of 
 * elements defined with JSX are ultimately rendered into a web browser 
 * as HTML.
 * 
 * You can think of a JSX element as a new type of JavaScript expression 
 * syntax. JavaScript string literals are delimited with quotation marks, 
 * and regular expression literals are delimited with slashes. In the 
 * same way, JSX expression literals are delimited with angle brackets. 
 * Here is a very simple one:
 */

let line = <hr/>;

/**
 * An important feature of JSX syntax is that you can embed regular 
 * JavaScript expressions within JSX expressions. Within a JSX 
 * expression, text within curly braces is interpreted as plain 
 * JavaScript. These nested expressions are allowed as attribute values 
 * and as child elements. For example:
 */

function sidebar(className, title, content, drawLine=true) {
    return (
        <div className={className}>
            <h1>{title}</h1>
            { drawLine && <hr/> }
            <p>{conten}</p>
        </div>
    );
}

/**
 * The sidebar() function returns a JSX element. It takes four arguments 
 * that it uses within the JSX element. The curly brace syntax may remind 
 * you of template literals that use ${} to include JavaScript 
 * expressions within strings. Since we know that JSX expressions compile 
 * into function invocations, it should not be surprising that arbitrary 
 * JavaScript expressions can be included because function invocations 
 * can be written with arbitrary expressions as well. This example code 
 * is translated by Babel into the following:
 */

function sidebar(className, title, content, drawLine=true) {
    return React.createElement("div", { className: className },
                               React.createElement("h1", null, title),
                               drawLine && React.createElement("hr", null),
                               React.createElement("p", null, content));
}

/**
 * This code is easy to read and understand: the curly braces are gone 
 * and the resulting code passes the incoming function parameters to 
 * React.createElement() in a natural way. Note the neat trick that we’ve 
 * done here with the drawLine parameter and the shortcircuiting && 
 * operator. If you call sidebar() with only three arguments, then 
 * drawLine defaults to true, and the fourth argument to the outer c
 * reateElement() call is the <hr/> element. But if you pass false as the 
 * fourth argument to sidebar(), then the fourth argument to the outer 
 * createElement() call evaluates to false, and no <hr/> element is ever 
 * created. This use of the && operator is a common idiom in JSX to 
 * conditionally include or exclude a child element depending on the 
 * value of some other expression. (This idiom works with React because 
 * React simply ignores children that are false or null and does not 
 * produce any output for them.)
 * 
 * When you use JavaScript expressions within JSX expressions, you are 
 * not limited to simple values like the string and boolean values in the 
 * preceding example. Any JavaScript value is allowed. In fact, it is 
 * quite common in React programming to use objects, arrays, and 
 * functions. Consider the following function, for example:
 */

// Given an array of strings and a callback function return a JSX element
// representing an HTML <ul> list with an array of <li> elements as its child.
function list(items, callback) {
    return (
        <ul style= { {padding:10, border:"solid red 4px"} }>
            {items.map((item, index) => {
                <li onclick={() => callback(index)} key={index}>{item}</li>
            })}
        </ul>
    );
}

/**
 * This function uses an object literal as the value of the style 
 * attribute on the <ul> element. (Note that double curly braces are 
 * required here.) The <ul> element has a single child, but the value of 
 * that child is an array. The child array is the array created by using 
 * the map() function on the input array to create an array of <li> 
 * elements. (This works with React because the React library flattens 
 * the children of an element when it renders them. An element with one 
 * array child is the same as that element with each of those array 
 * elements as children.) Finally, note that each of the nested <li> 
 * elements has an onClick event handler attribute whose value is an 
 * arrow function. The JSX code compiles to the following pure JavaScript 
 * code:
 */

function list(items, callback) {
    return React.createElement(
        "ul",
        { style: { padding: 10, border: "solid red 4px "} },
        items.map((intem, index) =>
            React.createElement(
                "li",
                { onclick: () => callback(index), key: index },
                item
            )
        )
    );
}

/**
 * One other use of object expressions in JSX is with the object spread 
 * operator to specify multiple attributes at once. Suppose that  you 
 * find yourself writing a lot of JSX expressions that repeat a common 
 * set of attributes. You can simplify your expressions by defining the 
 * attributes as properties of an object and “spreading them into” your 
 * JSX elements:
 */

let hebrew = { lang: "he", dir: "rtl" }; // Specify language and direction
let shalow = <span className="emphasis" {...hebrew}>שלום</span>;

/**
 * Finally, there is one more important feature of JSX that we have not 
 * covered yet. As you’ve seen, all JSX elements begin with an identifier 
 * immediately after the opening angle bracket. If the first letter of 
 * this identifier is lowercase (as it has been in all of the examples 
 * here), then the identifier is passed to createElement() as a string. 
 * But if the first letter of the identifier is uppercase, then it is 
 * treated as an actual identifer, and it is the JavaScript value of that 
 * identifier that is passed as the first argument to createElement(). 
 * This means that the JSX expression <Math/> compiles to JavaScript code 
 * that passes the global Math object to React.createElement().
 * 
 * For React, this ability to pass non-string values as the first 
 * argument to createElement() enables the creation of components. A 
 * component is a way of writing a simple JSX expression (with an 
 * uppercase component name) that represents a more complex expression 
 * (using lowercase HTML tag names).
 * 
 * The simplest way to define a new component in React is to write a 
 * function that takes a “props object” as its argument and returns a JSX 
 * expression. A props object is simply a JavaScript object that 
 * represents attribute values, like the objects that are passed as the 
 * second argument to createElement(). Here, for example, is another take 
 * on our sidebar() function:
 */

function Sidebar(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            { props. drawLine && <hr/> }
            <p>{props.content}</p>
        </div>
    );
}

/**
 * This new Sidebar() function is a lot like the earlier sidebar() 
 * function. But this one has a name that begins with a capital letter 
 * and takes a single object argument instead of separate arguments. This 
 * makes it a React component and means that it can be used in place of 
 * an HTML tag name in JSX expressions:
 */

let sidebar = <Sidebar title="Something snappy" content="Something wise"/>

// This <Sidebar/> element compiles like this:
let sidebar = React.createElement(Sidebar, { 
    title: "Something snappy",
    content: "Something wise"
}); 

/**
 * It is a simple JSX expression, but when React renders it, it will pass 
 * the second argument (the Props object) to the first argument (the 
 * Sidebar() function) and will use the JSX expression returned by that 
 * function in place of the <Sidebar> expression.
 */