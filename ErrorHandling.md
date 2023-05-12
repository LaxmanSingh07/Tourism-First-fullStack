# Debugging and Error Handling in Node.js with ndb


db is a Python debugger built on top of the standard pdb debugger. It is part of the google-cloud-sdk package and is commonly used for debugging Google App Engine applications.

The main advantage of using ndb over pdb is that it provides additional features specifically designed for debugging App Engine applications, such as support for asynchronous code and the ability to inspect and modify the App Engine datastore.

Some of the key features of ndb include:

Support for debugging asynchronous code using asyncio and await
Ability to interact with the App Engine datastore and memcache
Integration with the App Engine logging system
Support for remote debugging using the remote_api interface
Customizable REPL environment with tab-completion and syntax highlighting




### ERROR HANDLING IN EXPRESS: AN OVERVIEW

OPERATIONAL ERRORS: Errors that we can predict and handle.

PROGRAMMING ERRORS: Errors that we can't predict and handle or difficult to handle.




#### WHAT IS STACK TRACE?

A stack trace is a report of the active stack frames at a certain point in time during the execution of a program. Programmers commonly use stack tracing during interactive and post-mortem debugging.



```JS
 Error.captureStackTrace(this,this.constructor);

```

