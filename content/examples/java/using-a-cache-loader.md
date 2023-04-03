---
title: Using A Cache Listener
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/loader
tags:
- Java
type: examples
description: This is a simple example that demonstrates loading values using a CacheLoader.
---

This is a simple example that demonstrates loading values using a
`CacheLoader`.  Invoking `Region.get()` causes the `CacheLoader` to
produce a value that is stored in the region.  This approach is
commonly used to fetch data from other systems like a database.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/loader` directory, build the example and
   run unit tests

        $ ../gradlew build

2. Next start the locator and two servers

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to load the entries

        $ ../gradlew run

   The example fetches the entries twice.  The first retrieval is slow,
   simulating a network call.  Subsequent retrievals are much faster since the
   values are stored in the cache.  The loader logs requests into the Geode
   server logs.  You can find those at `build/server1/server1.log` or
   `build/server2/server2.log`.

4. Shut down the system:

        $ gfsh run --file=scripts/stop.gfsh