---
title: GemFire Queries
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/queries
tags:
- Java
type: examples
description: This example demonstrates simple queries on a VMware GemFire region.

---

In this example, two servers host a single partitioned region with entries
that represent employee information.
The example does queries through the API and presents example queries
to be invoked through the `gfsh` command-line interface.

This example assumes that JDK11 and GemFire are installed.

## Set up the cluster
1. Set directory ```gemfire-examples/queries``` to be the
   current working directory.
   Each step in this example specifies paths relative to that directory.

2. Build the example (with the `EmployeeData` class)

        $ ../gradlew build


4. Run a script that starts a locator and two servers,
   and then creates the ```example-region``` region.

        $ ../gradlew start

## Run the example program
1. Run the example to populate `example-region` with employee information,
   print out the region information,
   and then programmatically invoke three queries,
   printing the results of each query.

        $ ../gradlew run

## Issue `gfsh` commands to query the region

`gfsh` can also be used to issue queries.

1.  If you have not already installed GemFire,
    the build step will have installed a `gfsh` executable for you
    at a path relative to the current working directory
    within a versioned directory:

        ../build/vmware-gemfire-<version>/bin/gfsh

    You can use this relative path to invoke gfsh by substituting
    the appropriate `<version>`.

2. Start `gfsh` and connect to the cluster:

        $ gfsh
        ...
        gfsh>connect --locator=127.0.0.1[10334]

3. The quantity of entries may be observed with `gfsh`:

        gfsh>describe region --name=example-region

   Here are some `gfsh` queries to try on the `example-region` region.

   Query for all entries in the region:

        gfsh>query --query="select * from /example-region"

   Query for the `email` field of all entries in the region:

        gfsh>query --query="SELECT x.email FROM /example-region x"

   Query for all entries that have a `lastName` field that starts
   with the letter 'C':

        gfsh>query --query="SELECT DISTINCT * FROM /example-region x WHERE x.lastName.startsWith('C')"

   Exit gfsh:

        gfsh>exit

## Shut down the cluster and (optionally) clean up the directory
1. Shut down the cluster:

        $ ../gradlew stop

2. If desired, clean up the generated directories containing
   logs:

        $ ../gradlew cleanServer
