---
title: Entry Eviction
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/eviction
tags:
- Java
type: examples
description: Eviction of entries from a VMware GemFire region allows control over the system resources consumed by any given region.
---

This is a simple example that demonstrates eviction of entries from a region. This allows control
over the system resources consumed by any given region.

A region is a collection of entries which are tuples of key and value. Each entry requires memory
for the key object, the value object, and some overhead. Regions that contain a large number of
entries, entries of a large size, or both can consume enough system resources to impact overall
system performance, even for other regions.

A region can have eviction enabled to enforce an upper limit on either the total number of entries
_or_ the total amount of memory consumed by the entries. The region will then enforce the specified
limits on its in-memory resource consumption. When an operation would exceed those limits, the
region will take an action to assure that the limits will not be exceeded after the operation
completes. The region can either destroy one or more entries or overflow one or more entries to disk.

> **This example assumes you have installed JDK11 and GemFire.**

## Steps

1. From the `gemfire-examples/eviction` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to demonstrate eviction.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh