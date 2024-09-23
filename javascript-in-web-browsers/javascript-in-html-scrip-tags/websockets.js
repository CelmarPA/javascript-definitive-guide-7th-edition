/**
 * The WebSocket API is a simple interface to a complex and powerful 
 * network protocol. WebSockets allow JavaScript code in the browser to 
 * easily exchange text and binary messages with a server. As with 
 * Server-Sent Events, the client must establish the connection, but once 
 * the connection is established, the server can asynchronously send 
 * messages to the client. Unlike SSE, binary messages are supported, and 
 * messages can be sent in both directions, not just from server to 
 * client.
 * 
 * The network protocol that enables WebSockets is a kind of extension to 
 * HTTP. Although the WebSocket API is reminiscent of low-level network 
 * sockets, connection endpoints are not identified by IP address and 
 * port. Instead, when you want to connect to a service using the  
 * WebSocket protocol, you specify the service with a URL, just as you 
 * would for a web service. WebSocket URLs begin with wss://instead of 
 * https://, however. (Browsers typically restrict WebSockets to only 
 * work in pages loaded over secure https://connections).
 * 
 * To establish a WebSocket connection, the browser first establishes an 
 * HTTP connection and sends the server an Upgrade: websocket header 
 * requesting that the connection be switched from the HTTP protocol to 
 * the WebSocket protocol. What this means is that in order to use 
 * WebSockets in your client-side JavaScript, you will need to be working 
 * with a web server that also speaks the WebSocket protocol, and you 
 * will need to have server-side code written to send and receive data 
 * using that protocol. If your server is set up that way, then this 
 * section will explain everything you need to know to handle the 
 * clientside end of the connection. If your server does not support the  
 * WebSocket protocol, consider using Server-Sent Events instead.
 */

// CREATING, CONNECTING, AND DISCONNECTING WEBSOCKETS

/**
 * If you want to communicate with a WebSocket-enabled server, create a 
 * WebSocket object, specifying the wss:// URL that identifies the server 
 * and service you want to use:
 */

let socket = new WebSocket("wss://example.com/stockticker");

/**
 * When you create a WebSocket, the connection process begins 
 * automatically. But a newly created WebSocket will not be connected 
 * when it is first returned.
 */

/**
 * The readyState property of the socket specifies what state the 
 * connection is in. This property can have the following values:
 * 
 * WebSocket.CONNECTING: This WebSocket is connecting.
 * 
 * WebSocket.OPEN: This WebSocket is connected and ready for 
 * communication.
 * 
 * WebSocket.CLOSING: This WebSocket connection is being closed.
 * 
 * WebSocket.CLOSED: This WebSocket has been closed; no further 
 * communication is possible. This state can also occur when the initial 
 * connection attempt fails.
 * 
 * When a WebSocket transitions from the CONNECTING to the OPEN state, it 
 * fires an “open” event, and you can listen for this event by setting 
 * the onopen property of the WebSocket or by calling addEventListener() 
 * on that object.
 * 
 * If a protocol or other error occurs for a WebSocket connection, the 
 * WebSocket object fires an “error” event. You can set onerror to define 
 * a handler, or, alternatively, use addEventListener().
 * 
 * When you are done with a WebSocket, you can close the connection by 
 * calling the close() method of the WebSocket object. When a WebSocket 
 * changes to the CLOSED state, it fires a “close” event, and you can set 
 * the onclose property to listen for this event.
 */

// SENDING MESSAGES OVER A WEBSOCKET

/**
 * To send a message to the server on the other end of a WebSocket 
 * connection, simply invoke the send() method of the WebSocket object. 
 * send() expects a single message argument, which can be a string, Blob, 
 * ArrayBuffer, typed array, or DataView object. 
 * 
 * The send() method buffers the specified message to be transmitted and 
 * returns before the message is actually sent. The bufferedAmount 
 * property of the WebSocket object specifies the number of bytes that 
 * are buffered but not yet sent. (Surprisingly, WebSockets do not fire 
 * any event when this value reaches 0.)
 */

// RECEIVING MESSAGES FROM A WEBSOCKET

/**
 * To receive messages from a server over a WebSocket, register an event 
 * handler for “message” events, either by setting the onmessage property 
 * of the WebSocket object, or by calling addEventListener(). The object 
 * associated with a “message” event is a MessageEvent instance with a 
 * data property that contains the server’s message. If the server sent 
 * UTF-8 encoded text, then event.data will be a string containing that 
 * text.
 * 
 * If the server sends a message that consists of binary data instead of  
 * text, then the data property will (by default) be a Blob object 
 * representing that data. If you prefer to receive binary messages as 
 * ArrayBuffers instead of Blobs, set the binaryType property of the 
 * WebSocket object to the string “arraybuffer.”
 * 
 * There are a number of Web APIs that use MessageEvent objects for 
 * exchanging messages. Some of these APIs use the structured clone 
 * algorithm (see “The Structured Clone Algorithm”) to allow complex data 
 * structures as the message payload. WebSockets is not one of those 
 * APIs: messages exchanged over a WebSocket are either a single string 
 * of Unicode characters or a single string of bytes (represented as a 
 * Blob or an ArrayBuffer).
 */

// PROTOCOL NEGOTIATION

/**
 * The WebSocket protocol enables the exchange of text and binary 
 * messages, but says nothing at all about the structure or meaning of 
 * those messages. Applications that use WebSockets must build their own 
 * communication protocol on top of this simple message-exchange 
 * mechanism. The use of wss:// URLs helps with this: each URL will 
 * typically have its own rules for how messages are to be exchanged. If 
 * you write code to connect to wss://example.com/stockticker, then you 
 * probably know that you will be receiving messages about stock prices.
 * 
 * Protocols tend to evolve, however. If a hypothetical stock quotation 
 * protocol is updated, you can define a new URL and connect to the 
 * updated service as wss://example.com/stockticker/v2. URL-based 
 * versioning is not always sufficient, however. Withcomplex protocols 
 * that have evolved over time, you may end up with deployed servers that 
 * support multiple versions of the protocol and deployed clients that 
 * support a different set of protocol versions.
 * 
 * Anticipating this situation, the WebSocket protocol and API include an 
 * application-level protocol negotiation feature. When you call the 
 * WebSocket() constructor, the wss:// URL is the first argument, but you 
 * can also pass an array of strings as the second argument. If you do 
 * this, you are specifying a list of application protocols that you know 
 * how to handle and asking the server to pick one. During the connection 
 * process, the server will choose one of the protocols (or will fail 
 * with an error if it does not support any of the client’s options). 
 * Once the connection has been established, the protocol property of the 
 * WebSocket object specifies which protocol version the server chose.
 */