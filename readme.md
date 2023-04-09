`What is express`?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Behind the scenes`?

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.


Express contains a very robuset set of features: comples routing easier handling of requests and repsonses, serving static files, and error handling among many others.

Express makes it easier to orgainize our application into an MVC architecture on the server side.


npm i express@4


`what is routing`?

Routing refers to how an application's endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.

Each route can have one or more handler functions, which are executed when the route is matched.


`What is an api Anyways`?

An API is an application programming interface. It is a set of functions and procedures that allow the creation of applications that access the features or data of an operating system, application, or other service.


api :
application programming interface a piece of software that can be used by another piece of software, in order to allow applications to talk to each other



But "Application" can be other things: 
-Node.js fs or http APIs ("node APIs");

-Browser's DOM javascript API

-with oops when exposing methods to the public. we're creating an API:


### THE REST ARCHITECTURE

REST: REpresentational State Transfer


-seprate API into logical resources 
-Expose structred resouce-based URLs
-Use HTTP methods (verbs) to perform operations on resources
-Send dat as JSON (usually)
-Be stateless: no client context stored on the server between requests

### Resource: 

Object or representation of something that can be named. A resource has an identifier, which is a URI that uniquely identifies that resource. For example, the URI /customers/1234 is the URI for a specific customer.

Endpoints should contain nouns, not verbs. For example, use /customers, not /getAllCustomers or /addNewCustomer.


### RQUEST METHODS

GET: Used to retrieve a representation of a resource at a specific URI. The body of the response message contains the details of the requested resource.

POST: Used to create a new resource. The body of the request message specifies the data for the new resource.

PUT: Used to update an existing resource. The body of the request message specifies the changes to the resource.

patch: Used to update an existing resource. The body of the request message specifies the changes to the resource.

DELETE: Used to delete a specific resource.

### HTTP STATUS CODES

200 OK: The request has succeeded.
202 Accepted: The request has been accepted for processing, but the processing has not been completed.
400 Bad Request: The request could not be understood by the server due to malformed syntax.
401 Unauthorized: The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.
403 Forbidden: The server understood the request, but is refusing to fulfill it.
404 Not Found: The server has not found anything matching the Request-URI.
500 Internal Server Error: The server encountered an unexpected condition which prevented it from fulfilling the request.



endpoints 

/addNewTour ---> POST /tours   create

/getTour ----->GET /tours/7(id)  read


----> /getTour -----> Get/tours    update
            
                    ----> no need to pass the 
            
put is used for the entire new resource and  put and patch is used to update the existing resoure
/updatetous ----> put /tours/7
                  patch /tours/7

/deleteTour ----> DELETE/ tours /7   DELETE


HTTP METHOD 

### JSON: 
json is stand for the javascript object notation. it is a lightweight data-interchange format. it is easy for humans to read and write. it is easy for machines to parse and generate. it is based on a subset of the javascript programming language standard ecma-262 3rd edition - december 1999. this is a text format that is completely language independent but uses conventions that are familiar to programmers of the c-family of languages, including c, c++, c#, java, javascript, perl, python, and many others. these properties make json an ideal data-interchange language.

Example:

```json
{
    "name": "John",
    "age": 30,
    "cars": [
        { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
        { "name":"BMW", "models":[ "320", "X3", "X5" ] },
        { "name":"Fiat", "models":[ "500", "Panda" ] }
    ]
}
```



RESPONSE FORMATTING 

JSEND: 

WHAT IS STATLESS?

Stateless means that the server does not need to remember anything about the client between requests. This is a very important concept in RESTful APIs. The server should not need to know anything about the client other than the request itself. This allows the server to be stateless, which means that it can be scaled horizontally. This is a very important concept in RESTful APIs. The server should not need to know anything about the client other than the request itself. This allows the server to be stateless, which means that it can be scaled horizontally.




`How express works`?

The essence of Express is: a series of middleware function calls.

Request Response Cycle

The request-response cycle is the core of an HTTP-based application, the Express app included. At the beginning of each cycle, an incoming request is received and routed to the appropriate route handler. The route handler then generates a response and sends it back to the client.

The request-response cycle is illustrated in the following diagram:






### Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.


Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
In express every thing is middleware. even the routing is middleware.



Example: of middleware

parsing body
logging
getting headers
router
static files





`comman Syntax for middleware`:


```js

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});
```

What is middleware stack?

The middleware stack is the order in which the middleware functions are called. Express executes the middleware functions in the order in which they are added to the stack. The first middleware function is executed first, followed by the second middleware function, and so on. The last middleware function is executed last.

It is kind of pipline.

`from the last middleware send the response to the client`

This is known as the request-response cycle.


`What is mounting`?


Mounting is a way to create a mini-application within an exis



`Prams Middleware`:

In this middleware we can access the params of the url.

```js
app.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});
```