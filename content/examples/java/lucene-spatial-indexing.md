---
title: Lucene Spatial Indexing
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/luceneSpatial
tags:
- Java
type: examples
description: These examples demonstrate how to use GemFire's LuceneSerializer and LuceneQueryProvider APIs to customize how GemFire data is stored and indexed in Lucene.
---

All the examples are run from Example.java class's main method. In these example two servers host a partitioned region that stores the location information,including GPS coordinates. The region has lucene index that allows spatial queries to be performed against the data. 

These examples show how to do a spatial query:

1. First example is SearchNearestResultExample, it finds nearby locations from a specific location.

2. Second example is DistanceFacetsExample, it finds all the locations which coincides with the given location.

3. Third example is SearchOverlappingLocation, it finds the location that overlaps with other locations.

4. Fourth example is SearchIntersectingCoordinates, it finds the location that coincides with a given shape (which consists of multiple locations).

> **These examples assume that Java 11 and GemFire are installed. Minimum java version is jdk11.**
>
>**Note: These example use the GemFire Search extension which requires GemFire 10 to work**

## Set up the Lucene index and region
1. Set directory ```gemfire-examples/luceneSpatial``` to be the current working directory.
   Each step in this example specifies paths relative to that directory.

2. Build the examples

        $ ../gradlew build

3. Add VMware GemFire Search extension path to the `GEMFIRE_EXTENSIONS_REPOSITORY_PATH` environment
   variable. For example, if your vmware-gemfire-search-<version>.gfm file is located in
   /gemfire-extensions, use the following command:

        $ export GEMFIRE_EXTENSIONS_REPOSITORY_PATH=/gemfire-extensions

4. Run a script that starts a locator and two servers, creates a Lucene index called ```simpleIndex``` with a custom LuceneSerializer that indexes spatial data. The script
   then creates the ```example-region``` region.

        $ gfsh run --file=scripts/start.gfsh

5. Run the examples to populate both the Lucene index and `example-region`. This program adds data to the example-region, and then performs the searches mentioned above.

        $ ../gradlew run


6. Shut down the cluster

        $ gfsh run --file=scripts/stop.gfsh

7. Clean up any generated directories and files so this example can be rerun.

        $ ../gradlew cleanServer
