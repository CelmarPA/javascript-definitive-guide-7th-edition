/**
 * Web servers and clients have become so ubiquitous that it is easy to 
 * forget that it is possible to write clients and servers that do not 
 * use HTTP. Even though Node has a reputation as a good environment for 
 * writing web servers, Node also has full support for writing other 
 * types of network servers and clients. 
 * 
 * If you are comfortable working with streams, then networking is 
 * relatively simple, because network sockets are simply a kind of Duplex 
 * stream. The “net” module defines Server and Socket classes. To create 
 * a server, call net.createServer(), then call the listen() method of 
 * the resulting object to tell the server what port to listen on for 
 * connections. The Server object will generate “connection” events when 
 * a client connects on that port, and the value passed to the event 
 * listener will be a Socket object. The Socket object is a Duplex 
 * stream, and you can use it to read data from the client and write data 
 * to the client. Call end() on the Socket to disconnect. 
 * 
 * Writing a client is even easier: pass a port number and hostname to 
 * net.createConnection() to create a socket to communicate with whatever 
 * server is running on that host and listening on that port. Then use 
 * that socket to read and write data from and to the server.
 * 
 * The following code demonstrates how to write a server with the “net” 
 * module. When the client connects, the server tells a knock-knock joke:
 */

// A TCP server that delivers interactive knock-knock jokes on port 6789.
// (Why is six afraid of seven? Because seven ate nine!)
const net = require("net");
const readline = require("readline");

// Create a Server object and start listening for connections
let server = net.createServer();
server.listen(6789, () => console.log("Delivering laughs on port 6789"));

// When a client connects, tell them a knock-knock joke.
server.on("connection",socket => {
    tellJoke(socket)
        .then(() => socket.end()) // When the joke is done, close the socket.
        .catch((err) => {
            console.error(err); // Log any errors that occur,
            socket.end(); // but still close the socket!
        })
});

// These are all the jokes we know.
const jokes = {
    "Boo": "Don't cry...it's only a joke!",
    "Lettuce": "Lets us in! It's freezing out here!",
    "A little old lady": "Wow, I didn't know you could yodel!"
};

// Interactively perform a knock-knock joke over this socket, without blocking.
async function tellJoke(socket) {
    // Pick one of the jokes at random
    let randomElement = a => a[Math.floor(Math.random() * a.length)];
    let who = randomElement(Object.keys(jokes));
    let punchline = jokes[who];

    // Use the readline module to read the user's input one line at a time.
    let lineReader = readline.createInterface({
        input: socket,
        output: socket,
        prompt: ">> "
    });

    // A utility function to output a line of text to the client
    // and then (by default) display a prompt.
    function output(text, prompt=true) {
        socket.write(`${text}\r\n`);
        if (prompt) lineReader.prompt();
    }

    // Knock-knock jokes have a call-and-response structure.
    // We expect different input from the user at different stages and
    // take different action when we get that input at different stages.
    let stage = 0;

    // Start the knock-knock joke off in the traditional way.
    output("Knock Knock!");

    // Now read lines asynchronously from the client until the joke is done.
    for await (let inputLine of lineReader) {
        if (stage === 0) {
            if (inputLine.toLocaleLowerCase() === "who's there?") {
                // If the user gives the right response at stage 0
                // then tell the first part of the joke and go to stage 1.
                output(who);
                stage = 1;
            } else {
                // Otherwise teach the user how to do knockknock jokes.
                output('Please type "Who\'s there?".');
            }
        } else if (stage === 1) {
            if (inputLine.toLocaleLowerCase() === `${who.toLocaleLowerCase()} who?`) {
                // If the user's response is correct at stage 1, then
                // deliver the punchline and return since the joke is done.
                output(`${punchline}`, false);
                return;
            } else {
                // Make the user play along.
                output(`Please type "${who} who?".`);
            }
        }
    }
}

// Connect to the joke port (6789) on the server named on the command line
let socket = require("net").createConnection(6789, process.argv[2]);
socket.pipe(process.stdout); // Pipe data from the socket to stdout
process.stdin.pipe(socket); // Pipe data from stdin to the socket
socket.on("close", () => process.exit()); // Quit when the socket closes.