---
title: Auto-Serialization Of Objects
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/serialization
tags:
- Java
type: examples
description: This example demonstrates reflection-based auto-serialization to put objects into and get objects out of regions without relying on Java, PDX, or data serialization.
---

This is a simple example that demonstrates auto-serialization of objects of classes that do *not*
use Java serialization, PDX serialization, or data serialization. Reflection-based auto-serialization
uses Java reflection to put objects into and get objects out of regions without relying on Java,
PDX, or data serialization.

For an object to be stored in a region as either key or value, a copy of the object must be sent to
the server. Typically Java objects are sent across the network by serializing them into bytes
sent across a socket and then deserializing them from the bytes received from the socket on the
other side. This requires those objects' classes to implement a particular interface that defines
how that serialization and deserialization is accomplished, e.g., `java.io.Serializable`,
`org.apache.geode.DataSerializable`, or `org.apache.geode.pdx.PdxSerializable`.

In order to perform queries on objects within the server, the fields of the objects must be
individually accessible. One way to accomplish this is to deserialize the objects into instances
within the server. This requires the relevant classes to be in the server's class path. Another way
to accomplish this is by using the field-addressable format, PDX.

The reflection-based auto-serializer uses Java's reflection and introspection to construct a PDX
instance. This obviates modifying classes to implement a serialization interface. This also allows
the objects to be queried by way of PDX without the classes being preset on the server's class
path.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/serialization` directory, build the example and
   run unit tests

        $ ../gradlew build

2. Next start the locator and two servers

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to create entries in the region

        $ ../gradlew run

4. Shut down the system:

        $ gfsh run --file=scripts/stop.gfsh