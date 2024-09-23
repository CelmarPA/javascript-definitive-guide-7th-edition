const { Socket } = require("dgram");
const EventEmitter = require("events"); // Module name does not match cass name
const net = require("net");
let server = new net.Server(); // create a Server object
server instanceof EventEmitter // => true: Servers are EventEmitters

server.on("connection", socket => { // Listen for "connection" events
    // Server "connection" events are passed a socket object
    // for the client that just connected. Here we send some
    // data to the client and disconnect.
    socket.end("Hello World", "utf8");
})