---
title: GemFire Rest API
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/rest
tags:
- Java
type: examples
description: This example demonstrates putting values into a replicated region and retrieving the values using the GemFire REST API.
---

This is a simple example that demonstrates putting values into a
replicated region and retrieving the values using the GemFire REST API. For enabling the REST API you can follow the official [document](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/rest_apps-setup_config.html).

This example assumes you have installed JDK11 and GemFire.

## Steps

1. From the `gemfire-examples/rest` directory, build the example and
   run unit tests

        $ ../gradlew build

2. Next start the locator and two servers

        $ gfsh run --file=scripts/start.gfsh

3. Run the example to create and get entries using HTTP Java Client from the region

        $ ../gradlew run

4. Shut down the system:

        $ gfsh run --file=scripts/stop.gfsh