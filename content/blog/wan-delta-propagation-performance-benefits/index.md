---
title: WAN Delta Propagation Performance Benefits
description: This blog shows the performance benefits of the WAN Delta Propagation feature.
team: [Barry Oglesby]
date: 2023-04-01
lastmod: 2023-04-01
type: blog
---
## Introduction
The WAN [Delta Propagation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-delta_propagation-how_delta_propagation_works.html) feature introduced in GemFire 10.0 provides the ability to distribute changes to Delta objects between WAN sites. Previous GemFire versions serialized and distributed the entire Delta object for every update. The main purpose of this feature is to reduce the amount of data sent between WAN sites. A secondary purpose is to improve the performance of event distribution for Delta objects.

This blog shows the performance benefits of this feature.

## Test
The test configuration for the results shown in this blog was:

* 2 WAN sites
* 3 servers per site
* 1 multi-threaded client in site 1

Each server defined a PARTITION_REDUNDANT region with a parallel GatewaySender configured with all default properties.

The client defined a CACHING_PROXY region

The Delta object contained:

- a 10,240 byte payload field
- an int id field
- an int count field
- a long timestamp field

Each Delta object was 10,275 bytes fully serialized.

The client first created 100,000 Delta objects in site 1. These objects were also distributed to site 2.

The client then launched five threads that did updates for five minutes. Each update modified the count and timestamp fields of the Delta object for a total of 12 bytes per update.

The client was first run with WAN delta propagation disabled by setting `delta-propagation=false` in the site 2 servers. With this configuration, each GatewaySender distributed the entire 10,275 bytes for each event.

The client was then run with WAN delta propagation enabled (default behavior in GemFire 10.0) by setting `delta-propagation=true` in the site 2 servers. With this configuration, each GatewaySender distributed only the 12 byte changes for each event.

## Results
The performance benefits of this feature are highlighted by these statistics:

- bytes received by the GatewayReceivers in site 2
- updates by the client threads in site 1
- events queued by the GatewaySenders in site 1
- events distributed by the GatewaySenders in site 1
- event queue size of the GatewaySenders in site 1

### Bytes Received
The `Bytes Received` are the number of bytes received by the GatewayReceivers in site 2 that have been sent by the GatewaySenders in site 1. These bytes represent batches of events.

The maximum and average `Bytes Received` have dropped several orders of magnitude with WAN delta propagation enabled.

These tables show the maximum and average `Bytes Received` for each GatewayReceiver in site 2.

WAN Delta Propagation disabled:

```
| Server |  Maximum   |  Average   |
| ------ | ---------- | ---------- |
| 1      | 43,456,674 | 19,905,449 |
| 2      | 45,782,418 | 22,852,672 |
| 3      | 41,537,388 | 20,119,788 |
```
WAN Delta Propagation enabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 907,738 | 638,512 |
| 2      | 760,219 | 532,708 |
| 3      | 774,651 | 548,023 |
```
These charts show the `Bytes Received` per second for each GatewayReceiver in site 2. To show the scale of the difference between the two, the lines on the left of each chart show the `Bytes Received` for the initial create events and are about the same in both charts.

| **Bytes Received With Delta Propagation Disabled** |
|:--:|
|![Bytes Received With Delta Propagation Disabled](images/delta-disabled-bytesReceived-including-creates.gif#diagram)|

| **Bytes Received With Delta Propagation Enabled** |
|:--:|
|![Bytes Received With Delta Propagation Enabled](images/delta-enabled-bytesReceived-including-creates.gif#diagram)|
### Updates
The `Updates` are the number of update operations sent by the client threads to the site 1 servers.

The total number of `Updates` has increased with WAN delta propagation enabled.

WAN Delta Propagation disabled:

The total `Updates` for all five client threads was 1,945,452:

```
Thread-7: Updated 389,133 entries in 300,002 ms
Thread-8: Updated 388,984 entries in 300,004 ms
Thread-9: Updated 389,244 entries in 300,001 ms
Thread-10: Updated 388,982 entries in 300,001 ms
Thread-11: Updated 389,109 entries in 300,001 ms
```
WAN Delta Propagation enabled:

The total `Updates` for all five client threads was 3,591,087:

```
Thread-7: Updated 719,222 entries in 300,000 ms
Thread-8: Updated 717,950 entries in 300,000 ms
Thread-9: Updated 718,060 entries in 300,000 ms
Thread-10: Updated 718,018 entries in 300,000 ms
Thread-11: Updated 717,837 entries in 300,000 ms
```
### Events Queued
The `Events Queued` are the number of events that have been enqueued in each site 1 GatewaySender’s queue.

The maximum and average `Events Queued` have increased with WAN delta propagation enabled.

These tables show the maximum and average `Events Queued` for each GatewaySender in site 1.

WAN Delta Propagation disabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 7,519   | 3,961   |
| 2      | 7,415   | 3,948   |
| 3      | 7,417   | 3,998   |
```
WAN Delta Propagation enabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 10,496  | 7,151   |
| 2      | 10,569  | 7,227   |
| 3      | 10,396  | 7,129   |
```

These charts show the `Events Queued` per second for each GatewaySender in site 1.

| **Events Queued With Delta Propagation Disabled** |
|:--:|
|![Events Queued With Delta Propagation Disabled](images/delta-disabled-eventsQueued.gif#diagram)|

| **Events Queued With Delta Propagation Enabled** |
|:--:|
|![Events Queued With Delta Propagation Enabled](images/delta-enabled-eventsQueued.gif#diagram)|
### Events Distributed
The `Events Distributed` are the number of events that have been distributed by the GatewaySenders in site 1 and processed by the GatewayReceivers in site 2. 

The maximum and average `Events Distributed` have increased with WAN delta propagation enabled.

These tables show the maximum and average `Events Distributed` for each GatewaySender in site 1.

WAN Delta Propagation disabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 3,788   | 2,031   |
| 2      | 4,063   | 2,029   |
| 3      | 3,688   | 1,979   |
```
WAN Delta Propagation enabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 5,289   | 3,778   |
| 2      | 5,194   | 3,676   |
| 3      | 5,478   | 3,772   |
```
These charts show the `Events Distributed` per second for each GatewaySender in site 1.

| **Events Distributed With Delta Propagation Disabled** |
|:--:|
|![Events Queued With Delta Propagation Disabled](images/delta-disabled-eventsDistributed.gif#diagram)|

| **Events Distributed With Delta Propagation Enabled** |
|:--:|
|![Events Queued With Delta Propagation Enabled](images/delta-enabled-eventsDistributed.gif#diagram)|
### Event Queue Size
The `Event Queue Size` is the current number of events in each site 1 GatewaySender's queue.

The maximum `Event Queue Size` is a mixed bag with the two configurations. The average `Event Queue Size` has dropped with WAN delta propagation enabled.

These tables show the maximum and average `Event Queue Size` for each GatewaySender in site 1.

WAN Delta Propagation disabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 3,396   | 666     |
| 2      | 3,101   | 688     |
| 3      | 3,088   | 669     |
```
WAN Delta Propagation enabled:

```
| Server | Maximum | Average |
| ------ | ------- | ------- |
| 1      | 2,702   | 515     |
| 2      | 3,570   | 508     |
| 3      | 2,268   | 512     |
```
These charts show the `Event Queue Size` for each GatewaySender in site 1.

| **Event Queue Size With Delta Propagation Disabled** |
|:--:|
|![Events Queued With Delta Propagation Disabled](images/delta-disabled-eventQueueSize.gif#diagram)|

| **Event Queue Size With Delta Propagation Enabled** |
|:--:|
|![Events Queued With Delta Propagation Enabled](images/delta-enabled-eventQueueSize.gif#diagram)|
## Conclusion
The WAN Delta Propagation feature in GemFire 10.0 provides several benefits.

The feature:

- reduces the number of bytes distributed between sites
- increases the number of update events in one site
- increases the number of enqueued in one site
- increases the number of distributed events in one site
