`MONGODB`

`MONGODB` is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

`MONGOOSE`

Mongoose is an object data modeling (ODM) library that provides a rigorous modeling environment for your data, enforcing structure as needed while still maintaining the flexibility that makes MongoDB powerful.

1. Mongoose allows for rapid and simple development of monogdb based applications.

2. Features: Schemas to model data and relationships,easy data validation, simple query API, middleware, etc.

Mongoose Schema: Where we model our data, by describing the structure of our documents, the default values, validators, etc.

Mongoose model: a wrapper for the schema, providing and interface to the dtabase for CRUD operations.

SCHEMA --------> MODEL --------> DOCUMENTS

mongoose uses javascript native data types

## Validators in the Schema

1. required: true
2. min: 0
3. max: 255

### MVC ARCHITECTURE

`MVC is stands for the Model View Controller.`

`MVC is an architectural pattern that separates an application into three main logical components Model, View, and Controller.`
`Separation of concerns is the main reason why MVC is so popular.`

Router:

    - A router is a software component responsible for creating, activating, deactivating and destroying component sub-trees.
    - It interprets a URL route (such as /forum/thread/1234) and translates it into a router state that includes the information which component should be loaded.

Controller:

    - A controller is a software design pattern that represents an object that handles a request.
    - It receives the input, optionally validates it and then passes the input to the model.

Model:

    - A model is a software design pattern that represents a data object.
    - It can also have logic to update controller if its data changes.

View:

        - A view is a software design pattern that represents a visual element.
        - It can be a chart or a diagram.
        - It can also be a "dumb" UI component such as a button or a form field.
        - A view receives data from the model and renders a chart or diagram based on that data.
        -temmplate engine is used to render the view

there are two type of local logic

1. Applicatoin Logic
2. bUSSINESS lOGIC

3. Application Logic:

   - Handles HTTP requests and responses
   - Renders views
   - Handles other tasks related to the application itself
   - About the app's more technical aspects
   - Bride between the user and the business logic

4. Business Logic:
   -Code that actually solves the business problem

- Directly related to the business rules of the application

Example:

Creating a new user

Application Logic in controller

Business Logic in model

Fat Model, Skinny Controller : offload as much logic as possible to the model, and keep the controllers as simple and "skinny" as possible.

## what is agrigation pipline

Aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into an aggregated result.

## uNWINDNIG AND PROJECTING

$unwind: Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.

$project: Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be existing fields from the input documents or newly computed fields.

## VIRTUAL PROPERTIES

Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storge

`We can't use the virtual properties in the query because they are not part of the database`

we can't use the virtual properties in the query because they are not part of the database
we can only use the fields that are part of the database
we can use the virtual properties in the output

# MIDDLEWARE IN MONGODB

there are four types of middleware in mongoose

1. Document Middleware
2. Query Middleware
3. Aggregate Middleware
4. Model Middleware

## DOCUMENT MIDDLEWARE

That can act on the currently processed document.
It is also called as the pre and post hooks because they are executed before and after an event.

```JS

const schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});

```

#### post middleware function

```JS

schema.post('save', function(doc, next) {
  // do stuff
  next();
});

```

`Post middleware ` function executes after all of the pre middleware functions have completed.

- we don't have access to this keyword in the post middleware function

Notes:

- we can have multiple pre and post middleware functions for a single hook;
  `**hook**` : is an event in the document lifecycle
