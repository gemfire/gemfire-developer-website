---
title: Region Colocation
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/colocation
tags:
- Java
type: examples
description: This is a simple example that illustrates how to colocate the data of two VMware GemFire regions.
---

By default, GemFire selects the data locations for a partitioned region independent of the data locations for any other partitioned region using a hashing policy on the key. This example shows how to modify this policy in order to store related data from two regions (`order`and `customer`) in the same member.

`customer` region stores `Customer` objects using an `int` as key:

 ```
Region<Integer, Customer> customerRegion
```

`order` region stores `Order` object using an `OrderKey` object as key:

```
Region<OrderKey, Order> accountRegion
```
In order to store `Order` objects in the same member than their related customer info, a custom partition-resolved is needed: `OrderPartitionResolved`. When this partition resolver receives an `OrderKey` object, it returns the same key (the customer id) that was used to store the related customer. In this way, GemFire applies the hashing policy over the same key for `Order`and `Customer` related objects and as a consequence, they are stored in the same member.

## Steps

1. From the `gemfire-examples/colocation` directory, build the example.

        $ ../gradlew build

2. Next start a locator, start two servers, create `customer` region, and create `order`region colocated with `customer` region.

        $ ../gradlew start

3. Run the example to put entries into both regions.

        $ ../gradlew run

4. Shut down the system.

        $ ../gradlew stop