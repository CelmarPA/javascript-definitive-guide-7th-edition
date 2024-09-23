
/**
 * The global Process object has a number of useful properties and 
 * functions that generally relate to the state of the currently running 
 * Node process. Consult the Node documentation for complete details, but 
 * here are some properties and functions you should be aware of:
 */

process.argv // An array of command-line arguments.
process.arch // The CPU architecture: "x64", for example.
process.cwd() // Returns the current working directory.
// process.chdir() // Sets the current working directory.
process.cpuUsage() // Reports CPU usage.
process.env // An object of environment variables.
process.execPath // The absolute filesystem path to the node executable.
process.exit() // Terminates the program.
process.exitCode // An integer code to be reported when the program exits.
process.getuid() // Return the Unix user id of the current user.
process.hrtime.bigint() // Return a "high-resolution" nanosecond timestamp
process.kill() // Send a signal to another process.
process.memoryUsage() // Return an object with memory usage details.
process.nextTick() // Like setImmediate(), invoke a function soon.
process.pid // The process id of the current process.
process.ppid // The parent process id.
process.platform // The OS: "linux", "darwin", or "win32", for example.
process.resourceUsage() // Return an object with resource usage details.
process.setuid()// Sets the current user, by id or name.
process.title // The process name that appears in `ps` listings.
process.umask() // Set or return the default permissions for new files.
process.uptime() // Return Node's uptime in seconds.
process.version // Node's version string.
process.versions // Version strings for the libraries Node depends on.

/**
 * The “os” module (which, unlike process, needs to be explicitly loaded 
 * with require()) provides access to similarly low-level details about 
 * the computer and operating system that Node is running on. You may 
 * never need to use any of these features, but it is worth knowing that 
 * Node makes them available:
 */

const os = require("os");
os.arch() // Returns CPU architecture. "x64" or "arm", for example.
os.constants // Useful constants such as os.constants.signals.SIGINT
os.cpus() // Data about system CPU cores, including usage times.
os.endianness() // The CPU's native endianness "BE" or "LE".
os.EOL // The OS native line terminator: "\n" or "\r\n".
os.freemem() // Returns the amount of free RAM in bytes.
os.getPriority() // Returns the OS scheduling priority of a process.
os.homedir() // Returns the current user's home directory.
os.hostname() // Returns the hostname of the computer.
os.loadavg() // Returns the 1, 5, and 15-minute load averages.
os.networkInterfaces() // Returns details about available network. connections.
os.platform() // Returns OS: "linux", "darwin", or "win32", for example.
os.release() // Returns the version number of the OS.
os.setPriority() // Attempts to set the scheduling priority for a process.
os.tmpdir() // Returns the default temporary directory.
os.totalmem() // Returns the total amount of RAM in bytes.
os.type() // Returns OS: "Linux", "Darwin", or "Windows_NT", e.g.
os.uptime() // Returns the system uptime in seconds.
os.userInfo() // Returns uid, username, home, and shell of current user.