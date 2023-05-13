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



2. IN EMBEDDING/DENORMALIZATION

    - We save the data in same collections.
    - We save the data in same documents.
    - We save the data in same fields.
    - We save the data in same databases.
    - We save the data in same servers.


Example: 

