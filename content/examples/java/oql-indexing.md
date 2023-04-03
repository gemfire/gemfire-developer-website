---
title: OQL Indexing
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/indexes
tags:
- Java
type: examples
description: This example demonstrates an index for OQL queries on a region.
---

A region can contain objects of arbitrary complexity, including objects that contain other objects.
The values of a region can be queried using
[OQL](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/developing-querying_basics-chapter_overview.html) and
OQL queries can reference fields in the objects in the region. Indexes can be created to improve
the performance of queries. Certain optimizations occur for top-level fields but indexes can also be
created for nested fields, i.e., fields of objects that are contained with the objects in the
region.

This example uses a mock database of passengers and flights stored in a single region. Since the
region contains passenger objects, the index on passenger name uses a top-level field.
Since flight code objects are contained within a passenger object, the index on airline code uses a
nested field. After randomly populating the mock database, this example shows the results of queries
that use no index, a top-level index, and a nested index.

> **This example assumes that JDK11 and GemFire are installed.**

## Steps

1. From the `gemfire-examples/indexes` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start the locator and two servers.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to create indexes in the region.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh