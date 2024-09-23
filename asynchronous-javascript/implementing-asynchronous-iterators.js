/**
 * Instead of using async generators to implement asynchronous iterators, 
 * it is also possible to implement them directly by defining an object 
 * with a Symbol.asyncIterator() method that returns an object with a next
 * () method that returns a Promise that resolves to an iterator result 
 * object. In the following code, we re-implement the clock() function 
 * from the preceding example so that it is not a generator and instead 
 * just returns an asynchronously iterable object. Notice that the next() 
 * method in this example does not explicitly return a Promise; instead, 
 * we just declare next() to be async:
 */

function clock(interval, max = Infinity) {
    // A Promise-ified version of setTimeout that we can use await with.
    // Note that this takes an absolute time instead of an interval.
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }

    // Return an asynchronously iterable object
    return {
        startTime: Date.now(), // Remember when we started
        count: 1, // Rememver which interation we're on
        async next() { // The next() method makes this an iterator
                if (this.count > max) { // Are we done?
                    return { done: true }; // Iteration result indicating done
                }
                // Figure out when the next itereation should begin,
                let targetTime = this.startTime + this.count * interval;
                // wait until that time;
                await until(targetTime);
                // and return the count value in an iteration result object.
                return { value: this.count++ };
        },
        // This method means that this iterator object is also an iterable.
        [Symbol.asyncIterator]() { return this; }
    };
}

/**
 * Note that the implementation of AsyncQueue does not use async or await 
 * and instead works directly with Promises. The code is somewhat 
 * complicated, and you can use it to test your understanding of the 
 * material we’ve covered in this long chapter. Even if you don’t fully 
 * understand the AsyncQueue implementation, do take a look at the 
 * shorter example that follows it: it implements a simple but very 
 * interesting asynchronous iterator on top of AsyncQueue.
 */

/**
* An asynchronously iterable queue class. Add values with enqueue()
* and remove them with dequeue(). dequeue() returns a Promise, which
* means that values can be dequeued before they are enqueued. The
* class implements [Symbol.asyncIterator] and next() so that it can
* be used with the for/await loop (which will not terminate until
* the close() method is called.)
*/
class AsyncQueue {
    constructor() {
        // Values that have been queued but not dequeued yet are stored here
        this.values = [];
        // When Promises are dequeued before their corresponding values are 
        // queued, the resolve methods for those Promises are stored here.
        this.resolvers = [];
        // Once closed, no more values can be enqueued, and no more unfulfilled
        // Promises returned.
        this.close = false;
    }

    enqueued(value) {
        if (this.close) {
            throw new Error("AsybcQueue closed");
        }
        if (this.resolvers.length > 0) {
            // If this value has already been promised, resolve that Promise
            const resolve = this.resolvers.shift();
            resolve(value);
        }
        else {
            // Otherwise, queue it up
            this.values.push(value);
        }
    }

    dequeue() {
        if (this.values.length > 0) {
            // if there is a queued value, return a resolved Promise for it
            const value = this.values.shift();
            return Promise.resolve(value);
        }
        else if (this.closed) {
            // If no queued values and we're closed, return a resolved
            // Promise for the "end-of-stream" maker
            return Promise.resolve(asyncQueue.EOS);
        }
        else {
            // Otherwise, return an unresolved Promise,
            // queuing the resolver function for later use 
            return new Promise((resolve) => {
                this.resolvers.push(resolve); });
        }
    }

    close() {
        // Once the queue is closed, no  more values will be enqueued.
        // So resolve any pending Promises  with the end-of-stream maker
        while(this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
        this.close = true;
    }

    // Define the method that makes this class asynchronously iterable
    [Symbol.asyncIterator]() { return this; }

    // Define the method that makes this an asynchronous iterator. the
    // dequeue() Promise resolves to a value or the EOS sentinel if we're
    // closed. Here, we need to return a Promise that resolves to an
    // iterator result object.
    next() {
        return this.dequeue().then(value => (value === AsyncQueue.EOS)
                                    ? { value: undefined, done: true }
                                    : { value: value, done: false });
    }
}

// A sentinel value returned by dequeue() to marke "end of stream" when closed
AsyncQueue.EOS = Symbol("end-of-stream")

/**
 * Because this AsyncQueue class defines the asynchronous iteration 
 * basics, we can create our own, more interesting asynchronous iterators 
 * simply by asynchronously queueing values. Here’s an example that uses 
 * AsyncQueue to produce a stream of web browser events that can be 
 * handled with a for/await loop
 */

// Push events of the specified type on the specified document element
// onto an AsyncQueue object,  and return the queue for use as an event stream
function eventStream(elt, type) {
    const q = new AsyncQueue(); // Create a queue
    elt.addEventListener(type, e => q.enqueued(e)); // Enqueue events
    return q;
}

async function handleKeys() {
    // Get a steam of keypress events and loop once for each one
    for await (const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }
}