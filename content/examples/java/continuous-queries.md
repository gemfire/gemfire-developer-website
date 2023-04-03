---
title: Continuous Queries
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/cq
tags:
- Java
type: examples
description: Continuous Queries (CQ) allow clients to subscribe to server-side events using a SQL-like query. When a client registers a CQ, the client will receive all events that modify the query results.
---

In this example, the client program will first register a CQ with the query
`SELECT * FROM /example-region i where i > 70`. The region has keys and values that are both Integer types.

The program loops, randomly generating two integers to put on the server as the key and value.

If a value is either created or updated that is greater than 70, the above CQ will trigger the `RandomEventLister`,
which prints to stdout.

The client will generate data for 20 seconds, close the CQ and Cache, and then exit.

> This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/cq` directory, build the example.

        $ ../gradlew build

2. Next start a locator, start a server, and create a region.

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to demonstrate continues queries.

        $ ../gradlew run

4. Shut down the server.

        $ gfsh run --file=scripts/stop.gfsh