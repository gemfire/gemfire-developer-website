---
title: Entry Expiration
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/expiration
tags:
- Java
type: examples
description: Expiration of entries from a region can be used to prevent stale entries from lingering in a region.
---

This is a simple example that demonstrates expiration of entries from a region. This can be used to
prevent stale entries from lingering in a region. This also allows control over the system resources
consumed by any given region.

A region is a collection of entries which are tuples of key and value. When statistics-gathering is
enabled, the region maintains access and modification times for each entry. With entry expiration
configured, the region will enforce time-to-live limits on entries. When the time since access or
modification exceeds the configured duration, the region will take an action to expire the entry.
The region can either destroy expired entries in their entirety or invalidate expired entries by
removing their values.

This example creates a region where the entries are destroyed after ten seconds without being
updated. The example first puts ten random integers into the region. Then the example loops,
printing the number of entries in the region, until the region is empty.

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/expiration` directory, build the example and
   run unit tests.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to demonstrate expiration.

        $ ../gradlew run

4. Shut down the system.

        $ gfsh run --file=scripts/stop.gfsh