class Buffer {
    constructor() {
        this.size = 0;
        this.capacity = 4096;
        this.buffer = new Uint8Array(this.capacity);
    }
}

class BufferNew {
    #size = 0;
    get size() { return this.#size; };
    capacity = 4096;
    buffer = new Uint8Array(this.capacity);
}
