---
title: Put Multiple Values At Once
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/putall
tags:
- Java
type: examples
description: This is example demonstrates putting a map of values into a VMware GemFire region, checking the size, and retrieving the values.
---

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/putall` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to put entries into the region.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh