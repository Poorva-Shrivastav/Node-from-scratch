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
