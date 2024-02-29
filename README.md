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

Cluster Threads module - can be used to run multiple instances of Node.js in multiple threads to distribute work load

Worker Thread module - allows running of multiple application threads within a single Node.js instance

- Deploy : fly.io or render.com

# ----------------------------------EXPRESS--------------------------------

Routing:

1. We can create dynamic urls by passsing one or more params
2. We collect the data using req.params.<variable_name>

/search/:key([0-9]{4}) -> key can be only numbers with 4 digits validation
/search/:key([0-9]{4}) -> key can be only alphabets with 5 digits validation

- wildcard routes - user enters the route that doesn't match our criteria
  router.get("\*", (req, res) => {
  let resObj = {
  statusCode: 404,
  statusMessage: "URL not found",
  };
  res.send(resObj );
  });

# Middleware: function that has access to req, res, and next middleware function

When UI makes an API call, before reaching to the server, it first goes to middleware
UI -> Request -> API -> Middleware -> server

1. Logging the correct data -> Most common usecase
2. Authentication
3. Body parsing - check is all the required data is present
4. Sanitizing

Ordering of the methods/functions is most crucial.

!!There's no way direct way we can pass data from one middleware to the other, but we can attach properties to the req obj dynamically

# Query String:

localhost:3000/products?key=value&key2=value2 - req.query

PUT - update the entire details about the user in the db.
PATCH - update only some information, e.g. address, everything else remains the same.

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

express-validator:

- query function doesn't handle the rejections, we need to do it ourself.
- body function: works similar to query. parses the payload and gets the errors
- validationResult - extracts validation errors. This is used to handle rejections from query and body functions. It takes req as arguement and returns result, that has the data of the rejects
- matchedData - extracts sanitised data from req body, post validationResult check.
- checkSchema - Rather than putting all our checks in a single file, we can create a separate file with validation schemas(in our case).
  checkSchema: Creates an express middleware with validations for this schema object, and it can be used directly, without specifying query/body function.

# Cookie - small piece of data that server sends to browser

Web browser stores these cookies
HTTP request is stateless, server doesn't know who the request is coming from.

# Cookies

Cookie parser - cookies and signed cookies

1. Cookie parser gives us access to req.cookies with an object keyed with the cookie name.
2. We can also enable signed cookie by passing a secret string

# Sessions

1. Http is stateless. We don't know who's making the request

- express-session

1. saveUninitialized - false - we don't want to save data of every user visiting the website
2. resave - false - forces the session to be saved back to the session store, even if the session was never modified during the request.
3. req.session.visited = true; Helps is retrieving same session id every time we try to hit the same api
4. If we set - req.session.user to a user, now the set session id is mapped to this user and the user data comes along with the request body

# Passport

Passport works really well with express-sessions and many people use both of them together as Passport would map the user with a session id and help to verify if the password is correct.

1. Install passport and passport-local strategy as dependencies. Other strategies - https://www.passportjs.org/packages/
2. passport.initialize()
3. passport.session() - This takes care of attaching dynamic user property to request obj called user. Then we can access this user obj from the request body and know whi that user is.
4. new Strategy({usernameField: "email"}, (username, password, done) => {}) .
   By specifying this option: {usernameField: "email"}, we are telling passport that we are not using username field but we are using email field. Then passport looks for email field in the request body.

5. passport.serializeUser((user,done)=>{done(user.id)}) -> takes user obj that we validated and stores it in the session data //done takes the arguement that is unique.
6. passport.deserializeUser((id,done)=>{})

# https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

The main role of this function is to: Validate user - user exists and password in req body and db are same

# Mongoose

1. Install mongoose
2. connect mongoose to express with uri
3. create schemas
4. connect db to passport and verify the user - inside strategy - verification and deserializeUser functions.

# bcrypt

1. hash the password before saving with bcrypt.hash(pwd, salt)
2. For comparing pwd saved in db with the password entered by the user, use the compare function - bcrypt.compare(inputPwd, dbPwd)

# session store

This helps in restoring the session, even after the server went down and the session is terminated.

1. connected session to db with npm package - connect-mongo
2. Inside index.js, where we are calling session middleware, add -
   store: MongoStore.create({
   client: mongoose.connection.getClient(),
   }),
