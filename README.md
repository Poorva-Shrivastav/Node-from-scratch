- Stream - sequesnce of data that is being moved from one point to another
  In Node js, the stream of data is being processed in chunks as they arrive, instead of waiting for the entire data before processing.

- Buffers - If there is data that is already being processed or too little data to process, Node puts the arriving data in buffer

e.g. Once the buffer is filled up and data is process, video player shows the video

- error first callback pattern - callback fn where error is the first parameter.
  (err, data) =>{ }
