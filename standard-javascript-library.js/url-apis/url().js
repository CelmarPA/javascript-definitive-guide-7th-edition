/**
 * Since JavaScript is so commonly used in web browsers and web servers, 
 * it is common for JavaScript code to need to manipulate URLs. The URL 
 * class parses URLs and also allows modification (adding search 
 * parameters or altering paths, for example) of existing URLs. It also 
 * properly handles the complicated topic of escaping and unescaping the 
 * various components of a URL.
 * 
 * Create a URL object with the URL() constructor, passing an absolute 
 * URL string as the argument. Or pass a relative URL as the first 
 * argument and the absolute URL that it is relative to as the second 
 * argument. Once you have created the URL object, its various properties 
 * allow you to query unescaped versions of the various parts of the URL:
 */

let url = new URL("https://example.com:8000/path/name?q=term#fragment");
console.log(url.href); // => "https://example.com:8000/path/name? q=term#fragment"
console.log(url.origin); // => "https://example.com:8000"
console.log(url.protocol); // => "https:"
console.log(url.host); // => "example.com:8000"
console.log(url.hostname); // => "example.com"
console.log(url.port); // => "8000"
console.log(url.pathname); // => "/path/name"
console.log(url.search); // => "?q=term"
console.log(url.hash); // => "#fragment"

/**
 * Although it is not commonly used, URLs can include a username or a 
 * username and password, and the URL class can parse these URL 
 * components, too:
 */

let url1 = new URL("ftp://admin:1337!@ftp.example.com/");
console.log(url1.href); // => "ftp://admin:1337!@ftp.example.com/"
console.log(url1.origin); // => "ftp://ftp.example.com"
console.log(url1.username); // => "admin"
console.log(url1.password); // => "1337"

/**
 * The origin property here is a simple combination of the URL protocol 
 * and host (including the port if one is specified). As such, it is a 
 * read-only property. But each of the other properties demonstrated in 
 * the previous example is read/write: you can set any of these 
 * properties to set the corresponding part of the URL:
 */

let url2 = new URL("htts://example.com"); // Start with our server
url2.pathname = "api/search"; // Add a path to an API endpoint
url2.search = "q=test"; // Add a query parameter
console.log(url2.toString()); // => "htts://example.com/api/search?q=test"

/**
 * One of the important features of the URL class is that it correctly 
 * adds punctuation and escapes special characters in URLs when that is 
 * needed:
 */

let url3 = new URL("https://example.com");
url3.pathname = "path with spaces";
url3.search = "q=foo#bar";
console.log(url3.pathname); // => "/path%20with%20spaces"
console.log(url3.search); // => "?q=foo%23bar"
console.log(url3.href); // => "https://example.com/path%20with%20spaces?q=foo%23bar"

/**
 * The href property in these examples is a special one: reading href is 
 * equivalent to calling toString(): it reassembles all parts of the URL 
 * into the canonical string form of the URL. And setting href to a new 
 * string reruns the URL parser on the new string as if you had called 
 * the URL() constructor again.
 */

/**
 * If you want to encode these kinds of name/value pairs into the query 
 * portion of a URL, then the searchParams property will be more useful 
 * than the search property. The search property is a read/write string 
 * that lets you get and set the entire query portion of the URL. The 
 * searchParams property is a read-only reference to a URLSearchParams 
 * object, which has an API for getting, setting, adding, deleting, and 
 * sorting the parameters encoded into the query portion of the URL:
 */

let url4 = new URL("https://example.com/search");
console.log(url4.search); // => "": no query yet
url4.searchParams.append("q", "term"); // Add a search parameter
console.log(url4.search); // => "?q=term"
url4.searchParams.set("q", "x"); // Change the value of this parameter
console.log(url4.search); // => "?q=x"
console.log(url4.searchParams.get("q")); // => "x": query the parameter value
console.log(url4.searchParams.has("q")); // => true: there is a q parameter
console.log(url4.searchParams.has("p")); // => false: there is no p parameter
url4.searchParams.append("opts", "1"); // Add another search parameter
console.log(url4.search); // => "?q=x&opts=1"
url4.searchParams.append("opts", "&"); // Add another value for same name
console.log(url4.search); // => "?q=x&opts=1&opts=%26": note escape
console.log(url4.searchParams.get("opts")); // => "1": the first value
console.log(url4.searchParams.getAll("opts")); // => ["1","&"]: all values
url4.searchParams.sort(); // Put params in alphabetical order
console.log(url4.search); // => "?opts=1&opts=%26&q=x"
url4.searchParams.set("opts", "y"); // Change the opts param
console.log(url4.search); // => "?opts=y&q=x"
// searchParams is iterable
console.log([...url4.searchParams]); // => [["opts", "y"], ["q", "x"]]
url4.searchParams.delete("opts"); //  Delete the opts param
console.log(url4.search); // => "?q=x"
console.log(url4.href); // => "https://example.com/search?q=x"

/**
 * The value of the searchParams property is a URLSearchParams object. If 
 * you want to encode URL parameters into a query string, you can create 
 * a URLSearchParams object, append parameters, then convert it to a 
 * string and set it on the search property of a URL:
 */

let url5 = new URL("https://example.com");
let params = new URLSearchParams();
params.append("q", "term");
params.append("opts", "exact"); 
console.log(params.toString()); // => "q=term&opts=exact"
url5.search = params;
console.log(url5.href); // => "https://example.com/?q=term&opts=exact"