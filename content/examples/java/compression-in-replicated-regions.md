---
title: Compression in Replicated Regions
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/compression
tags:
- Java
type: examples
description: This example demonstrates enabling Compression in a replicated region.



---

This is a simple example that demonstrates enabling Compression in a
replicated region. The Default compression algorithm included with GemFire is Snappy. Additionally, you can specify your own compressor algorithm as well by implementing `org.apache.geode.compression.Compression` Interface. For enabling compression on a GemFire region you can follow the official [document](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/managing-region_compression.html#how-to-enable-compression-in-a-region-2).

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/compression` directory, build the example and
   run unit tests

        $ ../gradlew build

2. Next start the locator, two servers and create replicated region `example-region` with `compression` enabled.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to create and get entries using GemFire Java Client from the region

        $ ../gradlew run

4. Shut down the system:

        $ gfsh run --file=scripts/stop.gfsh