/**
 * A fundamental feature of the HTTP protocol upon which the web is built 
 * is that clients initiate requests and servers respond to those 
 * requests. Some web apps find it useful, however, to have their server 
 * send them notifications when events occur. This does not come 
 * naturally to HTTP, but the technique that has been devised is for the 
 * client to make a request to the server, and then neither the client 
 * nor the server close the connection. When the server has something to 
 * tell the client about, it writes data to the connection but keeps it 
 * open. The effect is as if the client makes a network request and the 
 * server responds in a slow and bursty way with significant pauses 
 * between bursts of activity. Network connections like this don’t 
 * usually stay open forever, but if the client detects that the 
 * connection has closed, it can simply make another request to reopen 
 * the connection.
 * 
 * This technique for allowing servers to send messages to clients is 
 * surprisingly effective (though it can be expensive on the server side 
 * because the server must maintain an active connection to all of its 
 * clients). Because it is a useful programming pattern, client-side 
 * JavaScript supports it with the EventSource API. To create this kind 
 * of long-lived request connection to a web server, simply pass a URL to 
 * the EventSource() constructor. When the server writes (properly 
 * formatted) data to the connection, the EventSource object translates 
 * those into events that you can listen for:
 */

let ticker = new EventSource("stockprices.php");
ticker.addEventListener("bid", (event) => {
    displayNewBid(event.data);
})

/**
 * One obvious application for Server-Sent Events is for multiuser 
 * collaborations like online chat. A chat client might use fetch() to 
 * post messages to the chat room and subscribe to the stream of chatter 
 * with an EventSource object. The next example demonstrates how easy it 
 * is to write a chat client like this with EventSource:
 * 
 * simple-chat.html ; simple-chat.js
 * 
 * The server-side code for this chat program is not much more 
 * complicated than the client-side code. The next example is a simple 
 * Node HTTP server. When a client requests the root URL “/”, it sends 
 * the chat client code shown in previus example. When a client makes a 
 * GET request for the URL “/chat”, it saves the response object and 
 * keeps that connection open. And when a client makes a POST request to 
 * “/chat”, it uses the body of the request as a chat message and writes 
 * it, using the “text/event-stream” format to each of the saved response 
 * objects. The server code listens on port 8080, so after running it 
 * with Node, point your browser to http://localhost:8080 to connect and 
 * begin chatting with yourself.
 * 
 * chat-server.js
 */

