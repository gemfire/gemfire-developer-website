---
title: Functions
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/functions
tags:
- Java
type: examples
description: This example calculates which integers in the region are prime numbers. The determination of the primes occurs inside the server by way of a function and the client displays the primes on the console.
---

The data for a region resides in memory in the JVM for the server. Functions provide a means for calculations to be performed on the data inside the server, avoiding the transfer of the data. For large values, the latency of transferring the data from the server to the client can be large enough to adversely impact performance. Additionally, the server may have access to resources that are unavailable to the client.

A function is implemented by creating a Java class that implements `com.vmware.gemfire.examples.functions.Function`. Using the function context that is passed to a function's execution, the function can access the data from the region. The function's results can be returned from the server to the client using the result sender.

The `deploy` command in `gfsh` deploys all the functions in the specified JAR file. A function's implementation of `execute()` will be run inside the server when `org.apache.geode.cache.execute.Execution.execute()` is invoked for that function.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/functions` directory, build the example, and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start two servers, create a region, and deploy the function.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to put entries into the region.

        $ ../gradlew run

4. Observe the prime numbers.

        The primes in the range from 1 to 100 are:
        [[1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]]


5. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh