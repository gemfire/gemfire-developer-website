---
title: "Introducing Gemfire 10"
date: "2023-04-12"
lastmod: "2023-04-14"
team:
- Anthony Baker
description: The next major release of GemFire is now available! 
---

## The next major release of GemFire is now available! 

[GemFire](https://www.vmware.com/products/gemfire.html) is a high-speed in-memory database for low latency applications. Focused on resiliency and consistency, GemFire makes it easy to scale your data and support your business critical applications whether they are on-premise, in the cloud, or somewhere in between.

GemFire 10* was [pre-announced](https://tanzu.vmware.com/content/blog/vmware-gemfire-10-beta-news) at the SpringOne Essentials conference in January and then released as a Public Beta. Since that time we have been hard at work finalizing the release. Anticipation has been building within the user community as we’ve demoed these new features and incorporated your feedback. 

This new major version marks a significant milestone on the GemFire journey with over 21 years of active development since the first commit in 2002. During this time we have helped customers across all industries run key aspects of their business on GemFire with speed, scale, and resilience. It’s no surprise that many of your financial, insurance, health care, or travel interactions likely go through GemFire!

## Highlights

The following sections discuss the key features available in GemFire 10 and related products.

**GemFire Management Console** – A brand-new management interface that allows developers and operators to configure and manage GemFire clusters. A single console can provide insight across an entire fleet of GemFire deployments.

**GemFire Search** – Developers can build full-text search capabilities into their applications that run at the speed of memory with the full robustness and reliability of GemFire. Searching and indexing can be done from a single product for simplicity of operations.

**GemFire for Redis Apps** – Expanded compatibility and new eviction policies with simpler deployment as an extension module

**Spring for GemFire** – Enhanced compatibility and long-term support for Spring applications.

**JSON document improvements** – GemFire brings document store capabilities to in-memory applications with space-efficient storage. This improvement will allow GemFire to store documents flexibly as BSON or native Portable Document eXchange.

**Java 17 support** – VMware has extensively tested GemFire under Java 17. The Z Garbage Collector is selected by default, which can provide excellent low pause behaviors that mesh well with in-memory workloads, particularly on large heap sizes.

**Jakarta EE 9** – Session state replication modules now support Apache Tomcat 10 and the Jakarta EE 9 namespace.

**Pluggable modules** – Developers can package and deploy server-side code independently without conflicting with existing GemFire libraries.

**Cross-cluster replication improvements** – Application objects that store partial updates can be more efficiently replicated to other clusters.

**Updated defaults** – We’ve tweaked the out-of-the-box tuning parameters to reduce the initial configuration and setup time.

**Deploy and run everywhere** – GemFire can run on-premise or in the cloud; on bare metal, virtual machines, or containers; and offers automated management and seamless upgrades on Kubernetes and Tanzu Application Service.

## Next Steps

To learn more about GemFire, please visit the new GemFire Developer Center at https://gemfire.dev. There you will find quickstarts, tutorials, videos, and blog articles to help you get started.

Links:
- GemFire 10.0 [documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/about_gemfire.html), [release notes](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/release_notes.html), and [download](https://network.tanzu.vmware.com/products/pivotal-gemfire/)
- GemFire Management Console 1.0 [documentation](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.0/gfmc/index.html), [release notes](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.0/gfmc/release_notes.html), and [download](https://network.tanzu.vmware.com/products/gemfire-management-console/)
- Webinar: [GemFire 10 Features](videos/gemfire-10.0-beta-open)
- Video: [GemFire in two minutes](videos/gemfire-in-two-minutes) / [The World of GemFire](videos/the-world-of-gemfire)


\* designated the “Gideon” release in honor of our colleague [Gideon Low](blog/remembering-gideon-low).
