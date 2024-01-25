---
title: VMware GemFire 10 Beta to Launch with Major Updates and a Brand-new Interface
date: 2023-01-24
lastmod: '2023-01-24'
team:
- Anthony Baker
type: blog
description: The new beta version of GemFire being announced today will bring significant new features and enhancements that enable developers to build high-performance, scalable applications more easily.
---

Today, we are excited to announce the beta release of [VMware GemFire 10](https://tanzu.vmware.com/gemfire). VMware GemFire is a powerful, high-speed in-memory data and compute grid that enables real-time data processing for modern applications and data pipelines. GemFire has long been relied upon to serve critical workloads around the world and across industries, including finance, telecommunications, health care, insurance, travel, and retail, to name a few.

All businesses are digital businesses, and data is at the heart of their success. They need modern data architectures that are fast and scalable. Based on customer engagement and feedback, the VMware GemFire team is working to add features that bolster its performance to meet customers’ business needs. GemFire can provide companies with a high-speed, low-latency layer that complements the primary database and reduces its load, ultimately increasing overall system performance.

Introducing GemFire 10 beta
The new beta version of GemFire being announced today will bring significant new features and enhancements that enable developers to build high-performance, scalable applications more easily.

With version 10, developers can look forward to:

- **GemFire Management Console** – A brand-new management interface that allows developers and operators to configure and manage GemFire clusters. A single console can provide insight across an entire fleet of GemFire deployments.

- **GemFire Search** – Developers will be able to build full-text search capabilities into their applications that can run at the speed of memory with the full robustness and reliability of GemFire. Searching and indexing can be done from a single product for simplicity of operations.

- **GemFire for Redis Apps** – Expanded compatibility and new eviction policies with simpler deployment as an extension module

- **Spring Boot for VMware GemFire** – Enhanced compatibility and long-term support for Spring applications; we are working hard on supporting the newest Spring releases.

- **JSON document improvements** – GemFire brings document store capabilities to in-memory applications with space-efficient storage. This improvement will allow GemFire to store documents flexibly as BSON or native Portable Document eXchange.

- **Java SE 17 support** – VMware has extensively tested GemFire under Java 17. The Z Garbage Collector is selected by default, which can provide excellent low pause behaviors that mesh well with in-memory workloads, particularly on large heap sizes.

- **Jakarta EE 9** – Session state replication modules now support Apache Tomcat 10 and the Jakarta EE 9 namespace.

- **Pluggable modules** – Developers can package and deploy server-side code independently without conflicting with existing GemFire libraries.

 - **Cross-cluster replication improvements** – Application objects that store partial updates can be more efficiently replicated to other clusters.

- **Updated defaults** – We’re tweaking the out-of-the-box tuning parameters to reduce the initial configuration and setup time.

GemFire applications can be developed in Java, C#, C++, or REST. GemFire 10 will be available across cloud, on-premises, and hybrid environments. It can also seamlessly integrate into Kubernetes and [VMware Tanzu Application Service](https://tanzu.vmware.com/application-service) platforms for simplicity of deployment and Day 2 operations.

This beta release will give you an option to try GemFire 10 before the official release of the general availability (GA) version. Register your interest for GemFire 10 beta [here](https://tanzu.vmware.com/gemfire/beta). As you preview the new interface and features, send us your feedback to help us create an exceptional experience for GemFire users.

Disclaimer: Please note that this is a beta release and is not yet suitable for production use. We will be working hard over the next few months to iron out any remaining issues and stabilize the release in preparation for the general availability (GA) version, which is scheduled for release in the coming months.