---
title: Using A Cache Writer
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/writer
tags:
- Java
type: examples
description: In this example, a VMware GemFire cache writer is installed that vets the creation events for the region for proper formatting of Social Security numbers.
---

This is a simple example that demonstrates the use of a cache writer to validate modifications to a region.

A cache writer is added to a region as the region is created. _Before_ an event (e.g., create a new entry, update an existing entry) occurs on that region, the cache writer has the appropriate handler method invoked, e.g., `beforeCreate()` for creating a new entry. This method invocation _can_ affect the operation on the region: if it throws `CacheWriterException` the operation is aborted.

In this example, a cache writer is installed that vets all of the creation events for the region for proper formatting of Social Security numbers. A number of entries are created in the region. The cache writer vets the supplied key for valid formatting. In other applications, the event could either be persisted to some other data store (i.e., write-ahead) or a notification about the activity could be sent via some other mechanism.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/writer` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to add a cache listener, put entries into the region, and capture the events.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh

        $ gfsh run --file=scripts/stop.gfsh