---
title:  Optimize Your Productivity on JSON Documents in GemFire 10
description: Optimize Your Productivity on JSON Documents in GemFire 10
date: 2023-04-11
lastmod: 2023-04-11
team: 
- Jianxia Chen
type: blog
---

## Introduction

To store a JSON document in GemFire, it can be as simple as storing a JSON string in a GemFire region.
However, some GemFire features are not optimal for JSON strings.
For example, query execution, indexes, function execution, serialization and JSON field access.

The new JSON document feature offered in GemFire 10 allows you to easily get specific fields without
parsing the whole JSON document.
It also allows you to query JSON documents with indexes.

Here is the comparison between JSON string and `JsonDocument`, a new interface for JSON documents.

Table: Benefits Comparison

|         Features          | JSON String  |  JsonDocument  |
|:-------------------------:|:------------:|:--------------:|
|     Memory Footprint      |     Big      |     Small      |
|     JSON Field Access     |     Slow     |      Fast      |
|     Ability to Query      |     Hard     |      Easy      |
|   OQL Query with Index    |      No      |      Yes       |
| Function Execution Access |     Slow     |      Fast      |

This blog assumes you understand the basic concepts of GemFire. You can check out the
[quick start](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-15_minute_quickstart_gfsh.html) of GemFire
or the tutorial [GemFire Basics](https://gemfire.dev/tutorials/java/gemfire_basics/). And get familiar with it.

## How to Store JSON Documents

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

If you want to retrieve a specific field of the `JsonDocument`, in which case you call `JsonDocument.getField()`
with the field name. For the above example, calling `jsonDocument.getField("foo")` returns `"bar"`.
```java
JsonDocument jsonDocument = region.get("key");
Object value = jsonDocument.getField("foo");
```
For such a tiny JSON document, this might seem like an overkill. However, for more complex JSON documents with multiple
fields of different types or even nested fields, the `JsonDocument` interface can help get specific fields without
parsing the whole JSON document.

`JsonDocument` interface has methods like `hasFields()`, `getField()` and `getFieldNames()` etc.
The `toJson()` method allows you to convert a `JsonDocument` back to a JSON string.

For more details about `JsonDocument`, please see the [Javadocs](https://gemfire.docs.pivotal.io/apidocs/gf-100/org/apache/geode/json/JsonDocument.html).

### Working with JSON Arrays

When calling `JsonDocument.getField()` for a JSON array, you need to cast the return value to a `java.util.List` and use the APIs of
`List` to retrieve the elements as you need. For example:
```java
String jsonString = "{\"arrayField\":[123, 456]}";
region.put("key", cache.getJsonDocumentFactory().create(jsonString));
JsonDocument jsonDocument = region.get("key");
Object value = ((List<Object>) jsonDocument.getField("arrayField")).get(0);
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
Object value = ((JsonDocument) jsonDocument.getField("nestedDocument")).getField("intField");
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

[//]: # (Different storage formats for the JSON documents are now supported to optimize different document types.)

[//]: # (For the schema-less JSON documents, the BSON storage format is optimal.)

[//]: # (For the schema-based JSON documents, the PDX storage format is optimal.)

[//]: # (Schema-based JSON documents tend to share the same field names.)

[//]: # (Schema-less JSON documents tend to have different field names.)

[//]: # (`RegionService.getJsonDocumentFactory&#40;StorageFormat.PDX&#41;`)

GemFire currently supports two different binary formats.
The default is based on the [BSON](https://bsonspec.org/) standard 
and is the best choice if your data does not have a well-defined schema.
The other format is [PDX](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-data_serialization-gemfire_pdx_serialization.html) 
which is best suited for data that has a well-defined schema.
Storing the schema itself has some extra overhead which is a benefit if the schema is reused often.
But if it needs to be created for each document it becomes more costly than BSON.
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