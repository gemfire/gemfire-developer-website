---
title: Overflow to Disk
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/overflow
tags:
- Java
type: examples
description: In this example, a VMware GemFire server hosts a partitioned region that stores strings. The example shows entry values being overflowed to disk and removed from memory.
---

This examples demonstrates how to use GemFire's Overflow to disk.

In this example, a server hosts a partitioned region that stores strings.
The example shows entry values being overflowed to disk and removed from memory.

This example assumes that GemFire is installed.

## Set up the region
1. Set directory ```gemfire-examples/overflow``` to be the
   current working directory.
   Each step in this example specifies paths relative to that directory.

2. Run a script that starts a locator and two servers. The script
   then creates the ```example-region``` region and puts 4 entries.

        $ gfsh run --file=scripts/start.gfsh

Note that both the region size and `totalEntriesOnlyOnDisk` are 0 before we put any entries.

3. Shut down the cluster

        $ gfsh run --file=scripts/stop.gfsh

4. In the output of the second `show metrics --region=example-region` command, notice the line

`diskstore | totalEntriesOnlyOnDisk       | 2`

This shows that 2 values have been overflowed to disk and are no longer in memory.
Notice that the size from the second `describe region --name=example-region`
is still 4

`Region   | size                   | 4`

Because all the keys remain in memory.
The entries are still accessible.
