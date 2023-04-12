---
title: What's new in JSON document
description: New JSON document enhancement
date: 2023-04-11
lastmod: 2023-04-11
team:
- Jianxia Chen
type: Blog
---

## What are the new features for JSON documents

In GemFire 10, new interfaces, APIs and underlying storage format are introduced to process JSON documents with improved
the performance and memory footprint for certain use cases.
With a new underlying storage format that uses BSON, the memory footprint for schema-less JSON documents is greatly improved.
While you can still choose Portable Data eXchange (PDX) storage format to uses cases that don't change JSON schema that
often and maintain backward compatibility.
With the new JsonDocument interface, which offers a unified user experience with different storage formats, whether it
is PDX or BSON. To store JSON document efficiently in GemFire, users can use RegionService.getJsonDocumentFactory() to
obtain JsonDocumentFactory. Then use its `create` method to convert JSON string into the chosen storage format. 
Note JSONFormatter is now deprecated.

The blog assume you understand the basic concepts of GemFire. You can check out the quick start of GemFire and get
familiar with it.
https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-15_minute_quickstart_gfsh.html
  
## How to Use the New Features

To store a JSON document in GemFire, it could be as simple as just put the JSON string in GemFire region
and get it from the region when needed. However, this is not convenient nor efficient, when you just need
to get specific fields from the JSON document or even query the JSON document.

The new JSON document features offered in GemFire 10.0 allows you to easily get specific fields without
parsing the whole JSON document. 
It also allows you to query the JSON document with the built-in powerful OQL query engine.
Internally, it uses two different storage formats for different use cases. 
This minimizes memory footprint and maximizes flexibility and efficiency. 

Let's get started with a simple example with a few lines of code:

```java
String jsonString = "{\"foo\":\"bar\"}";
JsonDocument jsonDocument = cache.getJsonDocumentFactory().create(jsonString);
region.put("key", jsonDocument);
```
Assume you have already got the references to the GemFire `cache` and the `region` objects, 
the example code above converts a JSON string into a `JsonDocument` using `JsonDocumentFactory`. 
And then put the `JsonDocument` in the region.
Once the `JsonDocument` is stored in GemFire, you can retrieve it by calling `Region.get()` with a key.

If you only want to retrieve a specific field of the `JsonDocument`, in which case you call `JsonDocument.getField()`
with a field name. For the above example, calling `jsonDocument.getField("foo")` returns `"bar"`.
`JsonDocument` is a new interface which has methods like `hasFiels()`, `getField()` and `getFieldNames()` etc.
You can use it to get the value of a specific field. For example:
```java
JsonDocument jsonDocument = region.get("key");
Object value = jsonDocument.getField("foo");
```
For such a tiny JSON document, this might seem like an overkill. However, for more complex JSON documents with multiple
fields of different types or even nested fields, the `JsonDocument` interface can help get specific fields without
you parsing the whole JSON document.
`JsonDocument.toJson()` also allows you to convert the `JsonDocument` back to a JSON string.

For more details about `JsonDocument`, please see the references.

### Working with JSON Arrays

When calling `JsonDocument.getField()`, for a JSON array, you need to cast it to a `java.util.List` and use the APIs of
`List` to retrieve the elements as you need. For example:
```java
((List) jsonDocument.getField("arrayField")).get(0);
```

### Working with Nested JSON Fields

For a nested field, cast it to `JsonDocument`, and keep using the `JsonDocument.getField()` to retrieve the nested field.
For example:
```java
JsonDocument nestedField = (JsonDocument) jsonDocument.getField("nestedField");
nestedField.getField("nestField");
```

### Query the JSON Document

You can also query the `JsonDocument`. For example:
```java
cache.getQueryService().newQuery("select * from /example-region where name='name5'").execute()
```
More about the query: https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-querying_basics-chapter_overview.html

GemFire currently supports two different binary formats.
The default is based on the `BSON` standard and is the best choice if your data does not have a well-defined schema.
The other format is `PDX` which is best suited for data that has a well-defined schema.
Storing the schema itself has some extra overhead which is a benefit if the schema is reused often.
But if it needs to be created for each document it becomes more costly than `BSON`.
To get a factory that uses `PDX` call `getJsonDocumentFactory(StorageFormat.PDX)` on your GemFire cache.
To get in-depth introduction of `PDX`, please refer to the official GemFire document
https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-data_serialization-gemfire_pdx_serialization.html

## Backward Compatibility

REST clients can both access and store JsonDocuments. 
Currently, the REST client will always store `JsonDocument`s with the `PDX` format. 
But they can access `JsonDocument`s that are stored using the `BSON` format.
`JsonDocument`s using the `PDX` format can be accessed by clients running on an older version of GemFire. 
But `JsonDocument`s using the `BSON` format can not be accessed in a client running on an older version of GemFire. 
Attempts to do so will result in a deserialization exception on the client.

`JsonDocument`s using the `BSON` format can not be sent to older versions of GemFire in a cluster 
or over WAN during rolling upgrade. 
So it should only be used once all the members have been upgraded to GemFire 10.0.

A few words about backward compatibility, esp. PDX, REST
`JSONFormatter` is deprecated.

## References

GemFire example GitHub repository:
https://github.com/gemfire/gemfire-examples

List of new public interfaces and APIs:

org.apache.geode.cache.Document
org.apache.geode.json.JsonDocument
org.apache.geode.json.JsonDocumentFactory
org.apache.geode.json.SerializableAsJson
StorageFormat
JsonUtilities
JsonParseException

org.apache.geode.cache.RegionService.getJsonDocumentFactory();
org.apache.geode.cache.RegionService.getJsonDocumentFactory(StorageFormat storageFormat);