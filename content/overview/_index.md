---
title: Overview
linkTitle: Overview
weight: 1
menu: "main"
description: VMware&trade; Tanzu GemFire<sup>&reg;</sup> is an in-memory, key-value, caching layer that is highly-performant and highly-available.

---
## Tanzu GemFire Typical Topology

The Tanzu GemFire architectural model is a client-server model. The clients are apps or microservices, and the servers are a set of servers within a Tanzu GemFire. The servers provide the data store within Tanzu GemFire.

![Topology Overview](/images/overview/overview_diagram.jpg)


## Data Storage Basics
The servers hold data in key-value pairs, in which values are objects. Each pair is called an **entry**. Entries are logically grouped into named sets called regions. A **region** functions as a map data structure, and is analogous to a database table.

![img](/images/overview/region-diagram.png)

## Tanzu GemFire Shell (gfsh)
The Tanzu GemFire command-line interface, called gfsh, facilitates region administration. Gfsh can be used to do everything from creating and destroying regions to querying region contents.