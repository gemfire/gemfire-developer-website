---
title: Replicated Regions
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/replicated
tags:
- Java
type: examples
description: This is a simple example that demonstrates putting values into a VMware GemFire replicated region, checking the size, and retrieving the values.
---

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/replicated` directory, build the example and
   run unit tests

        $ ../gradlew build

2. Next start the locator and two servers

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to create entries in the region

        $ ../gradlew run

4. Kill one of the servers

        $ gfsh -e "connect --locator=127.0.0.1[10334]" -e "stop server --name=server1"

5. Run a gfsh query, and notice that all the entries are still available due to replication

        $ gfsh -e "connect --locator=127.0.0.1[10334]" -e "query --query='select e.key from /example-region.entries e'"

6. Shut down the system:

        $ gfsh run --file=scripts/stop.gfsh