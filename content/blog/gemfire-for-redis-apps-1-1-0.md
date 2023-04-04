---
title: Experience the Latest Features of VMware GemFire for Redis Apps 1.1.0
date: 2023-03-24
lastmod: '2023-03-24'
team:
- John Martin
type: blog
description: GemFire for Redis Apps 1.1.0 offers an improved experience for users, with new Redis commands, capabilities, and compatibility with the latest GemFire release.
---

VMware is proud to announce the release of VMware GemFire for Redis Apps 1.1.0, available now on the [Tanzu Network](https://network.tanzu.vmware.com/products/tanzu-gemfire-for-redis-apps/)!

VMware GemFire for Redis Apps is an extension for [VMware GemFire](https://www.vmware.com/products/gemfire.html) that allows applications currently using a Redis client to connect to and send Redis commands to GemFire. This allows applications to use GemFire as a datastore for Redis clients, with little to no code changes.

GemFire for Redis Apps 1.1.0 offers an improved experience for users, with new Redis commands, capabilities, and compatibility with the latest GemFire release. Here are some of the key benefits explained:

## Better compatibility
This release is compatible with both [GemFire 9.15](https://tanzu.vmware.com/content/blog/improved-functionality-with-tanzu-gemfire-9-15) and [GemFire 10 (beta)](https://tanzu.vmware.com/content/blog/vmware-gemfire-10-beta-news), and means that GemFire for Redis Apps can be used by a wider range of GemFire users, regardless of which version they are currently using. Additionally, compatibility with multiple versions of GemFire enables users to take advantage of new features and capabilities that may be available in GemFire 10, but not in GemFire 9.15. This provides greater flexibility and choice to GemFire users, allowing them to select the version that best meets their needs while still being able to use GemFire for Redis Apps that is compatible with both.

## Keyspace notifications
With Redis keyspace notifications, you can subscribe to specific keys and receive notifications when they change, allowing you to create a real-time notification system. Keyspace notifications are useful for a variety of use cases, including real-time messaging applications, cache invalidation, real time analytics, user session management, cache warming, and more.

## Allkeys-lru eviction policy
This release brings the ability for users to set an eviction policy of `allkeys-lru` which automatically removes data from the database when the maximum memory limit is reached. This is particularly useful when you have a database that contains a large number of keys and you want to ensure that the most important keys are always available in memory. For example, in a cache application, you might want to guarantee that the most frequently accessed data is always available in memory, while less frequently accessed data is removed, so as to make space for new data.

VMware GemFire for Redis Apps additionally provides fine-grain eviction control by allowing users to configure the memory threshold at which entries will be evicted, as well as the memory threshold at which commands that write data are denied.

## HyperLogLog
The HyperLogLog (HLL) data structure is used for probabilistic counting of unique elements in a set. It provides an efficient way to estimate the number of unique elements of a large set without having to store all the elements in memory. This is helpful in scenarios where accurate counting is not essential, and a probabilistic estimate is sufficient.

Some common use cases for the Redis HLL data structure include

- Counting unique visitors to a website.
- Counting unique events, such as the number of unique email addresses that have opened a marketing email campaign.
- Tracking unique items in a shopping cart.

This release of VMware GemFire for Redis Apps supports the Redis HLL commands:

- **PFADD** – Add one or more elements to a HLL, which allows you to perform probabilistic counting of unique elements in a very large data set.
- **PFCOUNT** – Count the number of unique elements in one or more HLLs, enabling you to perform fast and accurate counting of unique elements.
- **PFMERGE** – Merge two or more HLLs into a single HLL, which combines the results of multiple probabilistic counts into a single, more accurate count.

## New Redis commands for lists, strings, and sorted sets
VMware GemFire for Redis Apps now supports over 140 Redis commands. In this release, we have added support for the following commands

- **BLMOVE** – Move an element from one blocking list to another and allows you to perform atomic operations on multiple lists.
- **GETDEL** – Get a value from a key and delete it atomically, which allows you to retrieve and remove a value in a single command.
- **GETEX** – Get a value from a key and set an expiration on the key, allowing you to retrieve and set an expiration on a value in a single command.
- **ZDIFF** – Compute the difference between two sorted sets.
- **ZDIFFSTORE** – Store the result of the ZDIFF command in a new sorted set.
- **ZINTER** – Compute the intersection of two or more sorted sets.
- **ZMSCORE** – Retrieve the score of one or more members in a sorted set.
- **ZRANDMEMBER** – Retrieve a random member from a sorted set.
- **ZRANGESTORE** – Store a range of members from a sorted set in a new sorted set.
- **ZUNION** – Compute the union of two or more sorted sets.


The release of VMware GemFire for Redis Apps 1.1.0 is a significant development that brings new and exciting features to the extension. This release improves the user experience with new Redis commands, features, better compatibility with VMware GemFire, and bug fixes to improve overall platform stability. With over 140 Redis commands supported, the GemFire for Redis Apps extension continues to be an increasingly powerful tool for developers looking to use GemFire as a datastore for Redis clients.

The VMware GemFire for Redis Apps extension provides an excellent opportunity for developers to expand their capabilities and streamline their application development process. In addition to the features mentioned above, this release includes bug fixes to improve the platform's overall stability. Visit the [release notes](https://docs.vmware.com/en/VMware-GemFire-for-Redis-Apps/1.1/gf-for-redis-apps/release-notes.html) and [documentation](https://docs.vmware.com/en/VMware-GemFire-for-Redis-Apps/1.1/gf-for-redis-apps/about.html) for a comprehensive list of features and details.