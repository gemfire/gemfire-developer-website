---
title: What's New for JSON Document in GemFire 10
description: New features for JSON document in GemFire 10.
date: 2023-04-11
lastmod: 2023-04-11
team: 
- Jianxia Chen
type: blog
---

## What Are the New Features for JSON Documents

In GemFire 10, new interfaces, APIs and underlying storage formats are introduced to process JSON documents with improved
the performance and memory footprint for different use cases.
With a new underlying storage format that uses BSON, the memory footprint for schema-less JSON documents is greatly improved.
While you can still choose Portable Data eXchange (PDX) storage format for uses cases that has well-defined schema 
and maintain backward compatibility.
With the new `JsonDocument` interface, which offers a unified user experience with different storage formats, whether it
is PDX or BSON. To store JSON document efficiently in GemFire, users can use `RegionService.getJsonDocumentFactory()` to
obtain `JsonDocumentFactory`. Then use its `create()` method to convert a JSON string into the chosen storage format. 
Note `JSONFormatter` is now deprecated in GemFire 10.

This blog assumes you understand the basic concepts of GemFire. You can check out the 
[quick start](https://docs.vmware.com/en/VMware-GemFire/10/gf/getting_started-15_minute_quickstart_gfsh.html) of GemFire
and get familiar with it.

  
## How to Use the New Features

To store a JSON document in GemFire, it could be as simple as putting the JSON string in GemFire region
and get it from the region when needed. However, this is not convenient nor efficient, when you just need
to get specific fields from a JSON document or even query a JSON document.

The new JSON document features offered in GemFire 10 allow you to easily get specific fields without
parsing the whole JSON document. 
It also allows you to query the JSON document with the built-in powerful OQL query engine.
Internally, it uses two different storage formats for different use cases.
This minimizes memory footprint and maximizes flexibility and efficiency.

We will cover the storage formats later. 
First, let's get started with a simple example with a few lines of code:

```java
String jsonString = "{\"foo\":\"bar\"}";
JsonDocument jsonDocument = cache.getJsonDocumentFactory().create(jsonString);
region.put("key", jsonDocument);
```
Assume you have already got the references to the GemFire `cache` and the `region` objects, 
the example code above converts a JSON string into a `JsonDocument` using `JsonDocumentFactory`. 
And then put the `JsonDocument` in the region.
Once the `JsonDocument` is stored in GemFire, you can retrieve it by calling `Region.get()` with a key.

If you want to retrieve a specific field of the `JsonDocument`, in which case you call `JsonDocument.getField()`
with a field name. For the above example, calling `jsonDocument.getField("foo")` returns `"bar"`.
```java
JsonDocument jsonDocument = region.get("key");
Object value = jsonDocument.getField("foo");
```
For such a tiny JSON document, this might seem like an overkill. However, for more complex JSON documents with multiple
fields of different types or even nested fields, the `JsonDocument` interface can help get specific fields without
parsing the whole JSON document.

`JsonDocument` is a new interface which has methods like `hasFiels()`, `getField()` and `getFieldNames()` etc.
`JsonDocument.toJson()` also allows you to convert a `JsonDocument` back to a JSON string.

For more details about `JsonDocument`, please see the references.

### Working with JSON Arrays

When calling `JsonDocument.getField()` for a JSON array, you need to cast it to a `java.util.List` and use the APIs of
`List` to retrieve the elements as you need. For example:
```java
String jsonString = "{\"arrayField\":[123, 456]}";
region.put("key", cache.getJsonDocumentFactory().create(jsonString));
JsonDocument jsonDocument = region.get("key");
Object value = ((List<Object>) jsonDocument.getField("arrayField")).get(0);
System.out.println("The first element of the JSON array is " + value);
```
You will get
```
The first element of the JSON array is 123
```

### Working with Nested JSON Fields

For a nested field, cast it to `JsonDocument`, and keep using the `JsonDocument.getField()` to retrieve the nested field.
For example:
```java
String jsonString = "{\"nestedField\":{\"intField\":456}}";
region.put("key", cache.getJsonDocumentFactory().create(jsonString));
JsonDocument jsonDocument = region.get("key");
Object value = ((JsonDocument) jsonDocument.getField("nestedField")).getField("intField");
System.out.println("The value of intField is " + value);
```
You will get
```
The value of intField is 456
```

### Working with Queries

You can also query `JsonDocument`. For example:
```java
region.put("key1", cache.getJsonDocumentFactory().create("{\"arrayField\":[123, 456]}"));
region.put("key2", cache.getJsonDocumentFactory().create("{\"arrayField\":[\"abc\", \"def\"]}"));
String queryString = "select * from /example-region where arrayField[0]=123";
System.out.println("\nQuery result:\n\n" + cache.getQueryService().newQuery(queryString).execute());
```
You get:
```
Query result:

[
    {"arrayField": [123, 456]}
]

```
More details about queries can be found [here](https://docs.vmware.com/en/VMware-GemFire/10/gf/developing-querying_basics-chapter_overview.html).

GemFire currently supports two different binary formats.
The default is based on the [BSON](https://bsonspec.org/) standard 
and is the best choice if your data does not have a well-defined schema.
The other format is [PDX](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-data_serialization-gemfire_pdx_serialization.html) 
which is best suited for data that has a well-defined schema.
Storing the schema itself has some extra overhead which is a benefit if the schema is reused often.
But if it needs to be created for each document it becomes more costly than BSON.
To get a factory that uses PDX call `getJsonDocumentFactory(StorageFormat.PDX)` on your GemFire cache.

## References

1. GemFire examples GitHub repository:
https://github.com/gemfire/gemfire-examples

2. `JsonDocument` examples:
https://github.com/gemfire/gemfire-examples/tree/main/feature-examples/json

3. List of the new public interfaces and APIs in GemFire 10:

* org.apache.geode.cache.Document

* org.apache.geode.json.JsonDocument

* org.apache.geode.json.JsonDocumentFactory

* org.apache.geode.json.SerializableAsJson

* org.apache.geode.json.StorageFormat

* org.apache.geode.json.JsonUtilities

* org.apache.geode.json.JsonParseException

* org.apache.geode.cache.RegionService.getJsonDocumentFactory()

* org.apache.geode.cache.RegionService.getJsonDocumentFactory(StorageFormat storageFormat)