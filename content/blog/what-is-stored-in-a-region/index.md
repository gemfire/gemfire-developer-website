---
title: What is Stored in a Region
description: This article describes the different GemFire RegionEntry and CachedDeserializable types and when they are used.
date: 2021-05-27
lastmod: 2021-05-27
team:
- Barry Oglesby
type: blog
---

## Introduction
The Region is the data structure that stores entries in a Cache. Its entries are `RegionEntry` instances and are stored in a customized `ConcurrentHashMap` called `CustomEntryConcurrentHashMap`. A RegionEntry contains the key which may or may not be kept in deserialized form depending on the key type and the value which is a byte array wrapped by a `CachedDeserializable` instance in most cases.

This article describes the different RegionEntry and `CachedDeserializable` types and when they are used.

## Region Architecture
There are mainly two different kinds of Regions, namely replicated and partitioned.

### Replicated Region
A replicated Region is implemented by [DistributedRegion](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/developing-distributed_regions-chapter_overview.html).

The architecture diagram below shows the relationship between DistributedRegions and RegionEntries.

![DistributedRegion Architecture Diagram](images/barry_05_27_2021_distributedregion_architecture.png#diagram)

### Partitioned Region
A partitioned Region is implemented by [PartitionedRegion](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/developing-partitioned_regions-chapter_overview.html) which contains a collection of BucketRegions. A `BucketRegion` is an extension of DistributedRegion.

The architecture diagram below shows the relationship between `PartitionedRegions` and RegionEntries.

![PartitionedRegion Architecture Diagram](images/barry_05_27_2021_partitionedregion_architecture.png#diagram)

## RegionEntry Creation
When a Region is created, it creates a subclass of `AbstractRegionMap` to hold its entries. The `AbstractRegionMap` uses a `RegionEntryFactory` to determine the type of RegionEntry to create when requested.

### RegionEntryFactory
The type of `RegionEntryFactory` created by a Region depends on several factors including:

- whether statistics are enabled
- whether LRU eviction is enabled
- whether overflow to disk or persistence is enabled
- whether concurrency checking is enabled
- whether off-heap memory is used

There are several groupings of `RegionEntryFactory` types including:

- `VersionedThin` — creates RegionEntry instances for Regions that have concurrency checking enabled and statistics deactivated
- `VersionedStats` — creates RegionEntry instances for Regions that have both concurrency checking and statistics enabled
- `VMThin` — creates RegionEntry instances for Regions that have both concurrency checking and statistics deactivated
- `VMStats` — creates RegionEntry instances for Regions that have concurrency checking deactivated and statistics enabled

Each of these groupings includes several different `RegionEntryFactory` types. For example, the `VersionedThin` grouping includes:

- `VersionedThinRegionEntryHeapFactory` — creates `VersionedThinRegionEntryHeap`* instances for Regions with basic configuration.
- `VersionedThinLRURegionEntryHeapFactory` — creates `VersionedThinLRURegionEntryHeap`* instances for Regions with LRU destroy eviction configured.
- `VersionedThinDiskRegionEntryHeapFactory` — creates `VersionedThinDiskRegionEntryHeap`* instances for Regions with persistence configured.
- `VersionedThinDiskLRURegionEntryHeapFactory` — creates `VersionedThinDiskLRURegionEntryHeap`* instances for Regions with LRU overflow eviction configured.

Off-heap versions of each of these `VersionedThin` factories also exist. In addition, each of these is duplicated for the `VMStats`, `VMThin` and `VersionedStats` `RegionEntryFactory` types.

### RegionEntry
The base implementation of RegionEntry is called `AbstractRegionEntry`. It has several direct abstract subclasses including:

- `VMThinRegionEntry` — is a RegionEntry that has statistics deactivated
- `VMStatsRegionEntry` — is a RegionEntry that provides extra statistics including hit, miss and lastAccessedTime
- `AbstractLRURegionEntry` — is a RegionEntry that provides LRU destroy eviction behavior
- `AbstractDiskRegionEntry` — is a RegionEntry that provides persistence or LRU overflow eviction behavior

Each of these has many concrete subclasses.

The type of RegionEntry created by a `RegionEntryFactory` depends on the type of key:

- String keys (1–7 characters, 8–15 characters, 16+ characters)
- Integer keys
- Long keys
- UUID keys
- Object keys

Each of these key types causes a different RegionEntry type to be created. Combined with `RegionEntryFactory` factors listed above, there are 192 different RegionEntry types that can be created.

### Examples
Shown below are examples of RegionEntry types for common Region shortcuts. The code I used to create and log different kinds of RegionEntry instances is [here](https://github.com/boglesby/log-region-entries).

**PARTITION_REDUNDANT**
The RegionEntry instances in a Region defined with the PARTITION_REDUNDANT shortcut are:
```
| Key Class             |   RegionEntry Type                       |
| -------------------   |   -------------------------------------- |
| Domain Object         |   VersionedThinRegionEntryHeapObjectKey  |
| Integer               |   VersionedThinRegionEntryHeapIntKey     |
| Long                  |   VersionedThinRegionEntryHeapLongKey    |
| String (1-7 chars)    |   VersionedThinRegionEntryHeapStringKey1 |
| String (8-15 chars)   |   VersionedThinRegionEntryHeapStringKey2 |
| String (16+ chars)    |   VersionedThinRegionEntryHeapObjectKey  |
| UUID                  |   VersionedThinRegionEntryHeapUUIDKey    |
```
Note: There are different types of RegionEntry instances containing String keys. Depending on the number of characters in the String, the String key is stored in a `StringKey1`, `StringKey2` or Object RegionEntry like:

- VMThinRegionEntryHeapStringKey1 — encodes String keys of length 1–7 characters into a long field
- VMThinRegionEntryHeapStringKey2 — encodes String keys of length 8–15 characters into two long fields
- VMThinRegionEntryHeapObjectKey — stores String keys of length 16+ characters in an Object field

**PARTITION_REDUNDANT_HEAP_LRU**

The RegionEntry instances in a Region defined with the PARTITION_REDUNDANT_HEAP_LRU shortcut are:
```
| Key Class           | RegionEntry Type                          |
| ------------------- | ----------------------------------------- |
| Domain Object       | VersionedThinLRURegionEntryHeapObjectKey  |
| Integer             | VersionedThinLRURegionEntryHeapIntKey     |
| Long                | VersionedThinLRURegionEntryHeapLongKey    |
| String (1-7 chars)  | VersionedThinLRURegionEntryHeapStringKey1 |
| String (8-15 chars) | VersionedThinLRURegionEntryHeapStringKey2 |
| String (16+ chars)  | VersionedThinLRURegionEntryHeapObjectKey  |
| UUID                | VersionedThinLRURegionEntryHeapUUIDKey    |
```
**PARTITION_REDUNDANT_OVERFLOW**

The RegionEntry instances in a Region defined with the PARTITION_REDUNDANT_OVERFLOW shortcut are:
```
| Key Class           | RegionEntry Type                              |
| ------------------- | --------------------------------------------- |
| Domain Object       | VersionedThinDiskLRURegionEntryHeapObjectKey  |
| Integer             | VersionedThinDiskLRURegionEntryHeapIntKey     |
| Long                | VersionedThinDiskLRURegionEntryHeapLongKey    |
| String (1-7 chars)  | VersionedThinDiskLRURegionEntryHeapStringKey1 |
| String (8-15 chars) | VersionedThinDiskLRURegionEntryHeapStringKey2 |
| String (16+ chars)  | VersionedThinDiskLRURegionEntryHeapObjectKey  |
| UUID                | VersionedThinDiskLRURegionEntryHeapUUIDKey    |
```
**PARTITION_REDUNDANT_PERSISTENT**

The RegionEntry instances in a Region defined with the PARTITION_REDUNDANT_PERSISTENT shortcut are:
```
| Key Class           | RegionEntry Type                           |
| ------------------- | ------------------------------------------ |
| Domain Object       | VersionedThinDiskRegionEntryHeapObjectKey  |
| Integer             | VersionedThinDiskRegionEntryHeapIntKey     |
| Long                | VersionedThinDiskRegionEntryHeapLongKey    |
| String (1-7 chars)  | VersionedThinDiskRegionEntryHeapStringKey1 |
| String (8-15 chars) | VersionedThinDiskRegionEntryHeapStringKey2 |
| String (16+ chars)  | VersionedThinDiskRegionEntryHeapObjectKey  |
| UUID                | VersionedThinDiskRegionEntryHeapUUIDKey    |
```
**PARTITION_REDUNDANT_PERSISTENT_OVERFLOW**

The RegionEntry instances in a Region defined with the PARTITION_REDUNDANT_PERSISTENT_OVERFLOW shortcut are:
```
| Key Class           | RegionEntry Type                              |
| ------------------- | --------------------------------------------- |
| Domain Object       | VersionedThinDiskLRURegionEntryHeapObjectKey  |
| Integer             | VersionedThinDiskLRURegionEntryHeapIntKey     |
| Long                | VersionedThinDiskLRURegionEntryHeapLongKey    |
| String (1-7 chars)  | VersionedThinDiskLRURegionEntryHeapStringKey1 |
| String (8-15 chars) | VersionedThinDiskLRURegionEntryHeapStringKey2 |
| String (16+ chars)  | VersionedThinDiskLRURegionEntryHeapObjectKey  |
| UUID                | VersionedThinDiskLRURegionEntryHeapUUIDKey    |
```
## CachedDeserializable
When a key and value are stored in a Region, the key is first deserialized into its object instance, and the value is serialized into a byte array. The value is then wrapped by a `CachedDeserializable` using `CachedDeserializableFactory`. The RegionEntry is created with the key and `CachedDeserializable` value. The RegionEntry converts UUID and String keys of length 1–15 into long fields. It stores Long keys in a long field, and Integer keys in an int field.

There are several implementations of `CachedDeserializable` including:

- `VMCachedDeserializable`
- `PreferBytesCachedDeserializable`
- `StoreAllCachedDeserializable`

The `CachedDeserializableFactory` decides which of these to instantiate for a specific value based on several factors including:

- the value of the PDX read-serialized boolean
- the value of the `gemfire.PREFER_SERIALIZED` java system property
- the value of the `gemfire.STORE_ALL_VALUE_FORMS` java system property

### VMCachedDeserializable
A `VMCachedDeserializable` is the default value stored in the RegionEntry. It can store either the byte array or deserialized value. It is initially created with the byte array. The byte array value is replaced by the deserialized value if a server-side operation is done on that entry (e.g. `CacheListener getNewValue` is invoked or a get is done in a Function).

On a Region defined with the PARTITION shortcut, a RegionEntry looks like:
```
| Property                                | Value                                  |
| --------------------------------------- | -------------------------------------- |
| Region Entry Class                      | VersionedThinRegionEntryHeapStringKey1 |
| Region Entry Key Class                  | String                                 |
| Region Entry Key                        | 0                                      |
| Region Entry Value Class                | VMCachedDeserializable                 |
| CachedDeserializable Value Class        | [B                                     |
| CachedDeserializable Value Bytes        | [B@1a4b421b                            |
| CachedDeserializable Value Bytes Length | 37                                     |
```
If a server-side get is done on that entry, the same RegionEntry looks like:
```
| Property                         | Value                                                |
| -------------------------------- | ---------------------------------------------------- |
| Region Entry Class               | VersionedThinRegionEntryHeapStringKey1               |
| Region Entry Key Class           | String                                               |
| Region Entry Key                 | 0                                                    |
| Region Entry Value Class         | VMCachedDeserializable                               |
| CachedDeserializable Value Class | Trade                                                |
| CachedDeserializable Value       | Trade(id=0; security=VMW; quantity=50; price=160.50) | 
```
### PreferBytesCachedDeserializable
A `PreferBytesCachedDeserializable` always stores the byte array value.

If PDX read-serialized is true or the *`gemfire.PREFER_SERIALIZED`* java system property is set to true (default is false), the RegionEntry will contain a `PreferBytesCachedDeserializable` value.

If a server-side operation is done on that entry, the byte array is either wrapped by a PdxInstance if PDX read-serialized is true or the domain object if the system property is set and returned to the caller. The `PreferBytesCachedDeserializable` is unaffected and continues to contain the byte array.

On a Region defined with the PARTITION shortcut and PDX read-serialized set to true, a RegionEntry looks like:
```
| Property                                | Value                                  |
| --------------------------------------- | -------------------------------------- |
| Region Entry Class                      | VersionedThinRegionEntryHeapStringKey1 |
| Region Entry Key Class                  | String                                 |
| Region Entry Key                        | 0                                      |
| Region Entry Value Class                | PreferBytesCachedDeserializable        |
| CachedDeserializable Value Class        | [B                                     |
| CachedDeserializable Value Bytes        | [B@770f6519                            |
| CachedDeserializable Value Bytes Length | 37                                     |
```
On a Region defined with the PARTITION shortcut and the system property set to true, a RegionEntry looks like:
```
| Property                                | Value                                  |
| --------------------------------------- | -------------------------------------- |
| Region Entry Class                      | VersionedThinRegionEntryHeapStringKey1 |
| Region Entry Key Class                  | String                                 |
| Region Entry Key                        | 0                                      |
| Region Entry Value Class                | PreferBytesCachedDeserializable        |
| CachedDeserializable Value Class        | [B                                     |
| CachedDeserializable Value Bytes        | [B@5e7a11de                            |
| CachedDeserializable Value Bytes Length | 36                                     |
```
### StoreAllCachedDeserializable
A `StoreAllCachedDeserializable` stores both the byte array and deserialized values. The use of this type is controlled entirely by the gemfire.`STORE_ALL_VALUE_FORMS` java system property. It is false by default. If it is set to true, the RegionEntry will contain a `StoreAllCachedDeserializable` value.

On a Region defined with the PARTITION shortcut and the system property set to true, a RegionEntry looks like:
```
| Property                                | Value                                                |
| --------------------------------------- | ---------------------------------------------------- |
| Region Entry Class                      | VersionedThinRegionEntryHeapStringKey1               |
| Region Entry Key Class                  | String                                               |
| Region Entry Key                        | 0                                                    |
| Region Entry Value Class                | StoreAllCachedDeserializable                         |
| CachedDeserializable Value Class        | [B                                                   |
| CachedDeserializable Value Bytes        | [B@6ff9593b                                          |
| CachedDeserializable Value Bytes Length | 35                                                   |
| CachedDeserializable Value Object Class | Trade                                                |
| CachedDeserializable Value Object       | Trade(id=0; security=VMW; quantity=50; price=160.50) |
```
## Conclusion
This article has shown the RegionEntry and `CachedDeserializable` types used by Regions with various configurations and key types.