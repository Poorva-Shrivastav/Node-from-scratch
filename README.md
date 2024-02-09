- Stream - sequesnce of data that is being moved from one point to another
  In Node js, the stream of data is being processed in chunks as they arrive, instead of waiting for the entire data before processing.

- Buffers - If there is data that is already being processed or too little data to process, Node puts the arriving data in buffer

e.g. Once the buffer is filled up and data is process, video player shows the video

- error first callback pattern - callback fn where error is the first parameter.
  (err, data) =>{ }

- the buffer that streams use has a default size of 64kb. If we want to change this, we can add highWaterMark with the value in bites.

- Types of Stream:

1. Readable stream
2. Writable stream
3. Duplex stream - sockets
4. Transform stream - File compression - write compressed data and read de-compressed data

- Pipes: createReadStream-reads from file; createWriteStream-write to a file. To make it simple.

  - chaining - using zlib module - allows us to create zipped files
  - chaining with .pipe -> moving from readable stream to a transformed stream to a writeable stream

  e.g. readStream.pipe(gzip).pipe(fs.createWriteStream("./zippedFile.txt.gz"));

server - "Content-Type": "application/json" and JSON.stringify(person) are sufficient to send a json response back to the client

req.url - gives to url
req.method - gives access to HTTP methods - get, post, put, delete

libuv - "C" open source library used for handling async non blocking operations in Node.js, using - Thread pool and Event loop

- crypto module - uses libuv's thread pool.
  crypto.pbkdf2 - password based key derivation - used for hashing password before storing them. CPU intensive.

- fs.readFile and crypto.pbkdf2 run on a seperate thread in libuv's thread pool, though they run synchronously in their own pool, but as far node main thread is concerned, it appears to be running asynchronously.

- libuv's thread pool has 4 threads by default.

- Eventloop in Node.js is a part of libuv and is a part of C programming.

Callback queues - are part of libuv

1. timer queue
2. I/O queue - fs and http modules
3. check queue - setImmediate cbs (only in node, not js)
4. close queue

Microtask queues - not part of libuv

1. nextTick queue - process.nextTick (only in node, not js)
2. promise queue

!Priority Order - refer to ./eventloop.png

1. Sync code
2. Microtask queues - nextTick queue then promise queue
3. timer queue
4. Microtask queues - nextTick queue then promise queue
5. I/O queue - fs and http modules
6. Microtask queues - nextTick queue then promise queue
7. check queue - setImmediate cbs (only in node, not js)
8. Microtask queues - nextTick queue then promise queue
9. close queue
10. Microtask queues - nextTick queue then promise queue

procee.nextTick is discouraged from use.

Reasons to use procee.nextTick :

1. Handle errors ,cleanup
2. allow cb to run after call stack has unwound but before event loop continues

Callback queues:

1. Cbs are in microtask queues are executed before the cbs in timer queue.

!! time queue isn't really a queue. It's a min heap data structure.

! When running a setTimeout with 0ms delay and an I/O or setImmediate async method, the order of execution can never be guaranteed. This is due to the uncertainity of how busy the cpu can be and 0ms delay being overwritten as 1ms.

- Eventloop has to poll to check if the I/O operations are completed and queue up only the completed operations.

  - When it enters the I/O queue for the first time, it is still empty.
  - then control enters the polling part, where it asks if the file reading has completed.
  - readfile says yes. So eventloop queues up the cb in the I/O queue
  - however, exceution has passed the I/O queue, and now it has to wait for it's turn
  - proceeds to check queue

- microtask cbs are executed before check cb. If the check cb has any microtask code, the control moves from check queue to microtask queue as soon as the callback is triggered, and returns back to check queue after the execution is completed in microtask queue. Refer: queues_execution.js.
-