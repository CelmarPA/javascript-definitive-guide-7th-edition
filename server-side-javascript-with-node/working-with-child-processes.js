// execSync() and execFileSync()

/**
 * The easiest way to run another program is with 
 * child_process.execSync(). This function takes the command to run as 
 * its first argument. It creates a child process, runs a shell in that 
 * process, and uses the shell to execute the command you passed. Then it 
 * blocks until the command (and the shell) exit. If the command exits 
 * with an error, then execSync() throws an exception. Otherwise, 
 * execSync() returns whatever output the command writes to its stdout 
 * stream. By default this return value is a buffer, but you can specify 
 * an encoding in an optional second argument to get a string instead. If 
 * the command writes any output to stderr, that output just gets passed 
 * through to the parent process’s stderr stream.
 */

// exec() and execFile()

/**
 * The execSync() and execFileSync() functions are, as their names 
 * indicate, synchronous: they block and do not return until the child 
 * process exits. Using these functions is a lot like typing Unix 
 * commands in a terminal window: they allow you to run a sequence of 
 * commands one at a time. But if you’re writing a program that needs to 
 * accomplish a number of tasks, and those tasks don’t depend on each 
 * other in any way, then you may want to parallelize them and run 
 * multiple commands at the same time. You can do this with the 
 * asynchronous functions child_process.exec() and 
 * child_process.execFile().
 * 
 * exec() and execFile() are like their synchronous variants except that 
 * they return immediately with a ChildProcess object that represents the 
 * running child process, and they take an error-first callback as their 
 * final argument. The callback is invoked when the child process exits, 
 * and it is actually called with three arguments. The first is the 
 * error, if any; it will be null if the process terminated normally. The 
 * second argument is the collected output that was sent to the child’s 
 * standard output stream. And the third argument is any output that was 
 * sent to the child’s standard error stream.
 * 
 * If you plan to execute multiple child processes at the same time, then 
 * it may be easiest to use the “promisified” version of exec() which 
 * returns a Promise object which, if the child process exits without 
 * error, resolves to an object with stdout and stderr properties. Here, 
 * for example, is a function that takes an array of shell commands as 
 * its input and returns a Promise that resolves to the result of all of 
 * those commands:
 */

const child_process = require("child_process");
const util = require("util");
const execP = util.promisify(child_process.exec);

function parallelExec(commands) {
    // Use the array of commands to create an array of Promises
    let promises = commands.map(command => execP(command, {encoding: "utf8"}));
    // Return a Promise that will fulfill to an array of the fulfillment
    // values of each of the individual promises. (Instead of returning objects
    // with stdout and stderr properties we just return the stdout value.)
    return Promise.all(promises)
        .then(outputs => outputs.map(out => out.stdout));
}

module.exports = parallelExec;

// spawn()

/**
 * The various exec functions described so far—both synchronous and 
 * asynchronous—are designed to be used with child processes that run 
 * quickly and do not produce a lot of output. Even the asynchronous 
 * exec() and execFile() are nonstreaming: they return the process output 
 * in a single batch, only after the process has exited. 
 * 
 * The child_process.spawn() function allows you streaming access to the 
 * output of the child process, while the process is still running. It 
 * also allows you to write data to the child process (which will see 
 * that data as input on its standard input stream): this means it is 
 * possible to dynamically interact with a child process, sending it 
 * input based on the output it generates.
 * 
 * spawn() does not use a shell by default, so you must invoke it like 
 * execFile() with the executable to be run and a separate array of 
 * command-line arguments to pass to it. spawn() returns a ChildProcess 
 * object like execFile() does, but it does not take a callback argument. 
 * Instead of using a callback function, you listen to events on the 
 * ChildProcess object and on its streams.
 * 
 * The ChildProcess object returned by spawn() is an event emitter. You 
 * can listen for the “exit” event to be notified when the child process 
 * exits. A ChildProcess object also has three stream properties. stdout 
 * and stderr are Readable streams: when the child process writes to its 
 * stdout and its stderr streams, that output becomes readable through 
 * the ChildProcess streams. Note the inversion of the names here. In the 
 * child process, “stdout” is a Writable output stream, but in the parent 
 * process, the stdout property of a ChildProcess object is a Readable 
 * input stream.
 * 
 * Similarly, the stdin property of the ChildProcess object is a 
 * Writeable stream: anything you write to this stream becomes available 
 * to the child process on its standard input. 
 * 
 * The ChildProcess object also defines a pid property that specifies the 
 * process id of the child. And it defines a kill() method that you can 
 * use to terminate a child process.
 */

// fork()

/**
 * child_process.fork() is a specialized function for running a module of 
 * JavaScript code in a child Node process. fork() expects the same 
 * arguments as spawn(), but the first argument should specify the path 
 * to a file of JavaScript code instead of an executable binary file.
 * 
 * A child process created with fork() can communicate with the parent 
 * process via its standard input and standard output streams, as 
 * described in the previous section for spawn(). But in addition, fork() 
 * enables another, much easier, communication channel between the parent 
 * and child processes. 
 * 
 * When you create a child process with fork(), you can use the send() 
 * method of the returned ChildProcess object to send a copy of an object 
 * to the child process. And you can listen for the “message” event on 
 * the ChildProcess to receive messages from the child. The code running 
 * in the child process can use process.send() to send a message to the 
 * parent and can listen for “message” events on process to receive 
 * messages from the parent.
 * 
 * Here, for example, is some code that uses fork() to create a child 
 * process, then sends that child a message and waits for a response:
 */

// const child_process = require("child_process");

// Start a new node process running the code in child.js in our directory
let child = child_process.fork(`${__dirname}/child.js`);

// Send a message to the child
child.send({x: 4, y: 3});

// Print the child's response when it arrives.
child.on("message", message => {
    console.log(message.hypotenuse); // This should print "5"
    // Since we only send one message we only expect one response.
    // After we receive it we call disconnect() to terminate the connection
    // between parent and child. This allows both processes to exit cleanly. 
    child.disconnect();
});