---
title: Persistent Regions
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/persistence
tags:
- Java
type: examples
description: This example demonstrates persistent regions.
---

The data for a region resides in memory in the JVM for the server. When a region is persistent, the data for that region is also preserved in a disk store. The disk store uses a directory in a file system to save the operations on regions. Unlike non-persistent regions, the data for a persistent region is available even after a period where no servers for that region are running.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/persistence` directory, build the example, and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, create a disk store, and create a persistent region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to increment an entry the region.

        $ ../gradlew run

4. Observe that the first time an initial value is used.

        Initialized counter to 0
        Incremented counter to 1

5. Restart down the server.

        $ gfsh run --file=scripts/restart.gfsh

6. Run the example to increment an entry the region.

        $ ../gradlew run

7. Observe that the second time the previous value is used.

        Retrieved counter of 1
        Incremented counter to 2

8. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh