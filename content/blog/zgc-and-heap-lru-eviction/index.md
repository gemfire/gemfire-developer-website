---
date: 2023-03-23
description: How GemFire heap LRU eviction interacts with Java garbage collectors, and how that can affect your choice of garbage collector.
lastmod: '2023-03-24'
team:
- Dale Emery
title: ZGC and GemFire Heap LRU Eviction
type: blog
---

## Terminology
- **Long-lived heap usage:** The amount of heap that GemFire requires in order to hold cached data in memory. This includes the memory used for the data's keys and values, plus the data structures that GemFire uses to maintain the data, plus other long-lived data structures that GemFire uses in order to present its services. Long-lived heap usage does not include the transient objects that GemFire uses to perform a particular operation.

## Introduction
`SoftMaxHeapSize` is the primary JVM option for tuning ZGC for use with GemFire's heap LRU eviction. Setting `SoftMaxHeapSize` too high results in entries being evicted from the cache. Setting it too low results in excessively frequent garbage collections. Either of these can affect the throughput of cache operations.


## Effects of SoftMaxHeapSize
To quantify how `SoftMaxHeapSize` affects heap usage, operation throughput, and garbage collection performance, I ran a series of scenarios. Each scenario:
1. Starts a GemFire server with max heap size (`-Xmx`) set to 32g and with GemFire's eviction threshold set to 60%.
1. Pre-populates a set of heap LRU regions with enough total data to bring long-lived heap usage to about 40% of max heap size. (Actual measured long-lived heap usage was 40.5%.)
1. Runs 16 threads to perform as many updates as possible for 2 minutes. Each update replaces a randomly selected value in the cache with a new value of the same size (a 10000 byte array). This generates a great deal of garbage (about 2g per second) while keeping long-lived heap usage essentially constant.

I varied `SoftMaxHeapSize` from 40% to 70%, from just below long-lived heap usage to well above the eviction threshold.

**Garbage Production Rate.**
In these scenarios, the barrage of updates allocated memory at a rate of about 2000 mb/s:

![Allocation Rate](images/long-lived-40-allocation-rate.png)

Given the nature of the scenarios, every allocation resulted in corresponding garbage. Some allocations were for new values that would live in the cache, but that replaced existing values, leaving the old values unreachable. The remaining allocations were for short-lived objects that would become unreachable as soon as they completed their role in the operation.

So this graph shows not only the allocation rate, but also the garbage production rate. Each scenario produced a full heap worth of garbage (32g) every 16 seconds or so.


### Heap Usage
The _Heap Usage_ graph shows the minimum and maximum heap usage (as measured by ZGC's memory manager) as `SoftMaxHeapSize` varies from 40% to 70% of max heap size:

![Heap Usage](images/long-lived-40-heap-usage-highlighted.png)

**Collection Headroom.**
ZGC has a goal of keeping heap usage safely below `SoftMaxHeapSize`. As the _Heap Usage_ chart shows, ZGC can meet this goal only if it has sufficient _collection headroom_ (the difference between `SoftMaxHeapSize` and long-lived heap usage). If the rate of garbage production is high enough, and if not given enough collection headroom, ZGC cannot collect garbage fast enough to keep heap usage safely below `SoftMaxHeapSize`.

Note that the first scenario sets `SoftMaxHeapSize` to 40% of max heap size. This is _below_ the long-lived heap usage (40.5% of max heap size). This makes it impossible for ZGC to keep heap usage below `SoftMaxHeapSize`. Even in this impossible scenario, heap usage exceeded `SoftMaxHeapSize` by at most about 8% of max heap size.

As `SoftMaxHeapSize` increases, ZGC is increasingly able to collect garbage fast enough to keep heap usage near or below `SoftMaxHeapSize`.

**Avoiding Eviction.**
GemFire's heap LRU eviction algorithm has a goal of keeping heap usage below the eviction threshold. To meet this goal, it will evict entries from memory if necessary.

### Collections

![Collections](images/long-lived-40-collections.png)

Increasing collection headroom reduces the number of garbage collections, but increases the CPU usage of each collection.

![Mean Collection Time](images/long-lived-40-mean-collection-time.png)

![Total Collection Time](images/long-lived-40-total-collection-time.png)




### Eviction Safety
![Entries Evicted](images/collection-headroom-entries-evicted.png)

To prevent evictions, `SoftMaxHeapSize` must be set far enough above the long-lived heap usage.




### Throughput
![Throughput](images/long-lived-40-throughput.png)

# Observations
- Insufficient collection headroom
	- Very frequent collections
	- Very frequent evictions
- Sufficient collection headroom
	- Once collection headroom rose above 4.5%
		- No further evictions (3% eviction safety margin sufficed)
		- Operation throughput increased more rapidly for a while
		- Total collection time (i.e. CPU usage) decreased more rapidly for a while
			- Number of collections decreased more rapidly
			- Mean collection time increased steadily
		- Max collection time varied


