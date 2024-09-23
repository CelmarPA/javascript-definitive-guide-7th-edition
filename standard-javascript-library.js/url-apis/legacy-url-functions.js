/**
 * Prior to the definition of the URL API described previously, there 
 * have been multiple attempts to support URL escaping and unescaping in 
 * the core JavaScript language. The first attempt was the globally 
 * defined escape() and unescape() functions, which are now deprecated 
 * but still widely implemented. They should not be used. 
 */

// When escape() and unescape() were deprecated, ECMAScript 
//introduced two pairs of alternative global functions:
/**
 * encodeURI() and decodeURI(): encodeURI() takes a string as its 
 * argument and returns a new string in which non-ASCII characters plus 
 * certain ASCII characters (such as space) are escaped. decodeURI() 
 * reverses the process. Characters that need to be escaped are first 
 * converted to their UTF- 8 encoding, then each byte of that encoding is 
 * replaced with a %xx escape sequence, where xx is two hexadecimal 
 * digits. Because encodeURI() is intended for encoding entire URLs, it 
 * does not escape URL separator characters such as /, ?, and #. But this 
 * means that encodeURI() cannot work correctly for URLs that have those 
 * characters within their various components.
 * 
 * encodeURIComponent() and decodeURIComponent(): This pair of functions 
 * works just like encodeURI() and decodeURI() except that they are 
 * intended to escape individual components of a URI, so they also escape 
 * characters like /, ?, and # that are used to separate those 
 * components. These are the most useful of the legacy URL functions, but 
 * be aware that encodeURIComponent() will escape / characters in a path 
 * name that you probably do not want escaped. And it will convert spaces 
 * in a query parameter to %20, even though spaces are supposed to be 
 * escaped with a + in that portion of a URL.
 */