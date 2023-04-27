---
title: Using A Cache Listener
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/listener
tags:
- Java
type: examples
description: In this example, a VMware GemFire cache listener is installed and notified of each entry creation and then adds it to a queue of events.
---

This is a simple example that demonstrates the use of a cache listener to capture modifications to a region.

A cache listener is added to a region when the region is created. _After_ an event (e.g., create a new entry, update an existing entry) occurs on that region, the cache listener has the appropriate handler method invoked, e.g., `afterCreate()` for creating a new entry. This method invocation can _not_ affect the operation on the region.

In this example, a cache listener is installed that captures all of the creation events for the region. A number of entries are created in the region. The cache listener is notified of each creation and adds it to its queue of events. In other applications, the event could either be persisted to some other data store (i.e., write-behind) or a notification about the activity could be sent via some other mechanism.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/listener` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to add a cache listener, put entries into the region, and capture the events.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh