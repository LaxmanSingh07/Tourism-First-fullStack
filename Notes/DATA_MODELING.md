# MONGODB DATA MODELING 

## Data Modeling

It is process of taking the unstructured data from the real word scenario and converting it into the structured data.

```
Real-world
Scenario

    |
    |
    |
unsructured data
    |
    |
    |
structured data
data model
```


`Different` types of `Realationships` between data 
`Referencing/normalization` vs `embedding/denormalization`
`Embedding` or `referencing` other documents?
`Types` of `referencing`? 

# 1. TYPES OF REALATIONSHIPS BETWEEN DATA 

1. One to One (1:1) 

when one field in a document is related to one field in another document. 

Example: 

movie -----> name (1 movie can have only one name)
       
2. One to Many (1:N)

    - 1: Few    

    movie 
   awards 
(1 movie can have many awards)

    - 1: Many (most important)
  
        movie
    reviews
(1 movie can have many reviews)


    - 1: Ton

app (login millions of users)


3. Many to Many (N:N)

`One movie can have many actors`, but one actor also paly in many movies. 


## 2. REFERENCING/NORMALIZATION VS EMBEDDING/DENORMALIZATION 

1. IN REFERENCING/NORMALIZATION

    - We save the data in different collections.
    - We save the data in different documents.
    - We save the data in different fields.
    - We save the data in different databases.
    - We save the data in different servers.

Example: movie and actor and actor ... 

`Here` id came into the picture. 
This type of referencing is called as child referencing. 

`Performace: it's eaiser to query each document on its own.`
`we need to make multiple queries to get all the information.`


2. IN EMBEDDING/DENORMALIZATION

    - We save the data in same collections.
    - We save the data in same documents.
    - We save the data in same fields.
    - We save the data in same databases.
    - We save the data in same servers.


Example: 


`perfomace : we can get all the information in one query`

`impossible to query the embeeded document on its own`



##### we can use both referencing and embedding in the same document. 

try to think first denormalization and then normalization.

## 3. When to embed and when to reference?

1. Relation type 

(How two datasets are related to each other)

Embedding: One to Few or One to Many

Referencing: One to Ton or Many to Many or One to Many

2. Data access pattern 
 (How often we need to access the data) (read/write ratio)

 Embedding: Data is mostly read and rarely updated
            (high read/write ratio)

    Referencing: Data is updated frequently
                (low read/write ratio)

3. Data closeness

Embedding: Datasets really belong together 

User+Email+Address+Phone

Referencing: we frequently need to query both datasets on their own 

Movie+ Images


`It is not necessecary to do in the same way As  I mentioned above. It is just a guideline.`


## 4. TYPES OF REFERENCING

1. Child Referencing

`child doesn't know about parent`

    It is type of referencing we keep reference of one document in another document.

cons: 

Array of id can become very large.
It is anti-cost in mongodb.

`The maximum BSON document size is 16 megabytes`

2. Parent Referencing

`parent doesn't know about child`
    It is type of referencing we keep reference of one document(i.e parent)  in another document(i.e child ).

(Best way to reference) 

(1:Many) (1: Ton) 


3. Two-way Referencing

`both parent and child know about each other`

    It is type of referencing we keep reference of one document(i.e parent)  in another document(i.e child ) and also keep reference of child in parent document.

(Many:Many)



## Summary 

1. THE MOST IMPORTANT PRINCIPLE IS : structure your data to match the ways that your application queries and updates it.

2. Use embedding when you have one to few or one to many relationships between entities.

3. user embedding when data is mostly read and rarely updated, and when two datasets belong intrinsically together.



## Geospatial Data

`Geospatial data` is data that describes a `spatial object` or `spatial relationship` between objects.

- GeoJs


## Populate Tour Guides

using populate actually create a new query behind the scenes.
It may reduce performance. 


## what virtual populate does?

It is a way to populate the data without actually storing it in the database.

foreignField: 'tour' (tour is the name of the field in the review model)
localField: '_id' (_id is the name of the field in the tour model)


## handler factory function

It is a function that returns another function.


## READ PERFORMANCE WITH INDEXES

   ```mongoose
      const doc=await features.query.explain();
    ```