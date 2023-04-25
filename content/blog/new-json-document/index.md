---
title:  Optimize Your Productivity on JSON Documents in GemFire 10
description: Optimize Your Productivity on JSON Documents in GemFire 10
date: 2023-04-11
lastmod: 2023-04-25
team: 
- Jianxia Chen
type: blog
---

## Introduction

GemFire 10 has significantly enhanced its support for JSON documents, making it easier for developers to work with complex JSON data. 
The latest version introduces new APIs and storage formats that provide improved flexibility and efficiency.

GemFire now offers two different binary formats for JSON documents: BSON and PDX. 
The default BSON format is simple, flexible and highly performant, especially on small documents. 
On the other hand, PDX is optimized for nested fields, making it the perfect choice for larger documents with a consistent structure.

Regardless of your choice, GemFire 10's new JSON document feature allows you to easily extract specific fields without having to re-parse the entire document. 
You can also take advantage of query capabilities on any field within a JSON document, including nested fields within objects or arrays. 
This feature enables fast function execution and optimized memory footprint and network traffic on GemFire servers.

With these new features, developers can now efficiently handle complex JSON data, which was previously a time-consuming and error-prone task. 
GemFire 10 makes it easier for developers to extract specific data, run queries, and optimize their applications' performance.

This blog assumes you understand the basic concepts of GemFire. You can check out the
[quick start](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-15_minute_quickstart_gfsh.html) of GemFire
or the tutorial [GemFire Basics](https://gemfire.dev/tutorials/java/gemfire_basics/) and get familiar with it.

## How to Store JSON Documents

JSON supported by `JsonDocument` APIs must always represent a JSON object. It must begin and end with curly braces.
First, let's get started with a simple example with a few lines of code. 
This code assumes you already have a reference to the GemFire `cache` and the `region`.


```java
String jsonString = "{\"foo\":\"bar\"}";
JsonDocument jsonDocument = cache.getJsonDocumentFactory().create(jsonString);
region.put("key", jsonDocument);
```
This converts a JSON string `{"foo":"bar"}` into a `JsonDocument` using a `JsonDocumentFactory` 
and then puts the `JsonDocument` in the region.
Once the `JsonDocument` is stored in GemFire, you can retrieve it by calling `Region.get()` with the key.

If you want to retrieve a specific field of the `JsonDocument`, call `JsonDocument.getField()`
with the field name. For the above example, calling `jsonDocument.getField("foo")` returns `"bar"`.
```java
JsonDocument jsonDocument = region.get("key");
Object value = jsonDocument.getField("foo");
```
For such a tiny JSON document, this might seem like overkill. However, for more complex JSON documents with multiple
fields of different types or even nested fields, the `JsonDocument` interface can help get specific fields without
parsing the whole JSON document.

`JsonDocument` interface has methods like `hasFields()`, `getField()` and `getFieldNames()` etc.
The `toJson()` method allows you to convert a `JsonDocument` back to a JSON string.

For more details about `JsonDocument`, please see the [Javadocs](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonDocument.html).

### Working with JSON Arrays

When calling `JsonDocument.getField()` for a JSON array, you need to cast the return value to a `java.util.List` and use the APIs of
`List` to retrieve the elements. For example:
```java
String jsonString = "{\"arrayField\":[123, 456]}";
region.put("key", cache.getJsonDocumentFactory().create(jsonString));
JsonDocument jsonDocument = region.get("key");
List<Object> list = (List<Object>) jsonDocument.getField("arrayField");
Object value = list.get(0);
System.out.println("The first element of the JSON array is " + value);
```
This code will print:
```
The first element of the JSON array is 123
```

### Working with Nested JSON Documents

For a nested document, cast the return value to `JsonDocument`, and keep using `JsonDocument.getField()` to retrieve the nested field.
For example:
```java
String jsonString = "{\"nestedDocument\":{\"intField\":456}}";
region.put("key", cache.getJsonDocumentFactory().create(jsonString));
JsonDocument jsonDocument = region.get("key");
JsonDocument nestedDocument = (JsonDocument) jsonDocument.getField("nestedDocument");
Object value = nestedDocument.getField("intField");
System.out.println("The value of intField is " + value);
```
This code will print:
```
The value of intField is 456
```

### Working with Queries

You can also query `JsonDocument`s.
The query scans all the `JsonDocument`s in the region and finds those that match the `WHERE` clause.
In this example, the `WHERE` clause matches the first element of `arrayField` that equals 123.
```java
region.put("key1", cache.getJsonDocumentFactory().create("{\"arrayField\":[123, 456]}"));
region.put("key2", cache.getJsonDocumentFactory().create("{\"arrayField\":[\"abc\", \"def\"]}"));
String queryString = "SELECT * FROM /example-region WHERE arrayField[0]=123";
System.out.println("\nQuery result:\n\n" + cache.getQueryService().newQuery(queryString).execute());
```
This code will print:
```
Query result:

[
  {
    "arrayField": [
      123,
      456
    ]
  }
]
```
More details about queries can be found [here](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-querying_basics-chapter_overview.html).

## How to Choose Storage Format for JSON Documents

GemFire currently supports two different binary formats.
The default is based on the [BSON](https://bsonspec.org/) standard 
and is the best choice if your data does not have a well-defined schema.
The other format is [PDX](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-data_serialization-gemfire_pdx_serialization.html) 
which is best suited for data that has a well-defined schema.
PDX has a more compact serialization format and faster field access compared to BSON,
but if it needs to create a schema definition for each document it becomes more costly than BSON.
To get a factory that uses PDX call `getJsonDocumentFactory(StorageFormat.PDX)` on your GemFire cache.

## References

1. [GemFire Examples GitHub Repository](https://github.com/gemfire/gemfire-examples)

2. [`JsonDocument` Examples](https://github.com/gemfire/gemfire-examples/tree/main/feature-examples/json)

3. List of the new public interfaces and APIs in GemFire 10:

* [org.apache.geode.cache.Document](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/cache/Document.html)

* [org.apache.geode.json.JsonDocument](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonDocument.html)

* [org.apache.geode.json.JsonDocumentFactory](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonDocumentFactory.html)

* [org.apache.geode.json.SerializableAsJson](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/SerializableAsJson.html)

* [org.apache.geode.json.StorageFormat](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/StorageFormat.html)

* [org.apache.geode.json.JsonUtilities](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonUtilities.html)

* [org.apache.geode.json.JsonParseException](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonParseException.html)

* [org.apache.geode.cache.RegionService.getJsonDocumentFactory()](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/cache/RegionService.html#getJsonDocumentFactory--)

* [org.apache.geode.cache.RegionService.getJsonDocumentFactory(StorageFormat storageFormat)](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/cache/RegionService.html#getJsonDocumentFactory-org.apache.geode.json.StorageFormat-)
