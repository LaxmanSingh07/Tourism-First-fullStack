## MONGODB: AN OVERVIEW


MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. No database makes you more productive.

MongoDB is a document database, which means it stores data in JSON-like documents. You can use MongoDB to store, query, and index JSON documents. MongoDB is a document database, which means it stores data in JSON-like documents. You can use MongoDB to store, query, and index JSON documents.

#### collections 

A collection is a group of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.


#### documents

A document is a set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.


`KEY MONGODB FEATURES`:

* Document-Oriented Storage
* Replication and High Availability
* Auto-Sharding
* Indexing
* Querying
* Aggregation
* Fast In-Place Updates
* Full Index Support
* GridFS Support

#### Document-Oriented Storage

MongoDB stores data records as documents (specifically BSON documents). Documents are analogous to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.


#### Replication and High Availability

MongoDB provides high availability and data durability through replication and automated failover. MongoDB supports replica sets and sharded clusters.


#### Auto-Sharding

MongoDB supports sharding, which is the process of distributing data across multiple machines. Sharding allows MongoDB to scale horizontally, that is, to increase the amount of data it can store and the number of read and write operations it can handle by adding more machines to a cluster.


#### Indexing

MongoDB supports secondary indexes. Indexes support the efficient execution of queries in MongoDB.


#### Querying

MongoDB supports a rich and expressive query language. MongoDB supports a rich and expressive query language.



#### Aggregation

MongoDB provides a framework for data aggregation. Aggregation operations process data records and return computed results.


#### Fast In-Place Updates



MongoDB provides fast in-place updates. MongoDB provides fast in-place updates.



#### Full Index Support


MongoDB supports a variety of index types to support queries and aggregations.



## DOCUMENTS,BSON AND EMBEDDING 


`BSON` : BSON is a binary-encoded serialization of JSON-like documents. BSON extends the JSON model to provide additional data types and to organize data more efficiently. BSON is a binary-encoded serialization of JSON-like documents. BSON extends the JSON model to provide additional data types and to organize data more efficiently.


`EMBEDDING` : Embedding is the process of storing related data in a single document. Embedding is the process of storing related data in a single document.


`CREATING A LOCAL MONGODB INSTANCE` :

* Download the MongoDB Community Server from the MongoDB website.
* Extract the archive file.
* Create a directory for the database files.
* Run the mongod executable.
* Run the mongo executable.



`SOME MONGODB COMMANDS` :

* show dbs
Mongosh provides a wide range of commands for working with MongoDB databases and collections. Some of the most commonly used commands include:

use <database>: Switches to the specified database.

show databases: Lists all the available databases.

show collections: Lists all the collections in the current database.

db.<collection>.find(): Returns all the documents in the specified collection.

db.<collection>.findOne(): Returns a single document from the specified collection.

db.<collection>.insertOne(<document>): Inserts a new document into the specified collection.

db.<collection>.updateOne(<filter>, <update>): Updates a single document in the specified collection that matches the specified filter.

db.<collection>.deleteOne(<filter>): Deletes a single document from the specified collection that matches the specified filter.

db.<collection>.aggregate(<pipeline>): Performs an aggregation operation on the specified collection using the specified pipeline.

db.<collection>.createIndex(<keys>, <options>): Creates an index on the specified keys in the specified collection.

db.<collection>.dropIndex(<index>): Drops the specified index from the specified collection.

db.<collection>.stats(): Returns statistics about the specified collection.




Mongodb automatically gives an id to each document in a collection. This id is a 12-byte value consisting of:



`CRUD OPERATIONS` :

* Create
* Read
* Update
* Delete


`CRUD QUERIES` :

* db.collection.find()
* db.collection.findOne()
* db.collection.insertOne()
* db.collection.updateOne()
* db.collection.deleteOne()



```bson
    db.tours.find({name: "The Forest Hiker", difficulty: "easy"})
```
`Query Operators` :

* $eq
* $gt
* $gte
* $in
* $lt
* $lte
* $ne



$eq: Matches documents where the value of a field equals a specified value. Example: db.collection.find({ field1: { $eq: "value1" } })
$ne: Matches documents where the value of a field is not equal to a specified value. Example: db.collection.find({ field1: { $ne: "value1" } })
$gt: Matches documents where the value of a field is greater than a specified value. Example: db.collection.find({ field1: { $gt: 100 } })
$lt: Matches documents where the value of a field is less than a specified value. Example: db.collection.find({ field1: { $lt: 100 } })
$gte: Matches documents where the value of a field is greater than or equal to a specified value. Example: db.collection.find({ field1: { $gte: 100 } })
$lte: Matches documents where the value of a field is less than or equal to a specified value. Example: db.collection.find({ field1: { $lte: 100 } })
$in: Matches documents where the value of a field equals any value in a specified array. Example: db.collection.find({ field1: { $in: ["value1", "value2"] } })
$nin: Matches documents where the value of a field does not equal any value in a specified array. Example: db.collection.find({ field1: { $nin: ["value1", "value2"] } })
$exists: Matches documents where a field exists or does not exist. Example: db.collection.find({ field1: { $exists: true } })
$regex: Matches documents where a field matches a specified regular expression. Example: db.collection.find({ field1: { $regex: /pattern/ } })



## Combination of Query Operators

* $and
* $or
* $nor
* $not
* $expr

//