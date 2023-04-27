---
title: "Introducing VMware Gemfire 10"
date: "2023-04-13"
lastmod: "2023-04-13"
team:
- Anthony Baker
aliases:
- introducing-gemfire-10
description: The next major release of VMware GemFire is now available! 
---

## The next major release of GemFire is now available! 

[GemFire](https://www.vmware.com/products/gemfire.html) is a high-speed in-memory database for low latency applications. Focused on resiliency and consistency, GemFire makes it easy to scale your data and support business-critical applications whether they are on-premises, in the cloud, or somewhere in between.

GemFire 10* was [pre-announced](https://tanzu.vmware.com/content/blog/vmware-gemfire-10-beta-news) at the [SpringOne Essentials](https://tanzu.vmware.com/content/blog/springone-essentials-2023-news) conference in January and later released as a public beta. Since then, we have been hard at work finalizing the release for general availability. Anticipation has been building within the user community as we’ve demoed these new features and incorporated your valuable feedback. 

This new major version marks a significant milestone in the evolution of GemFire, with over 21 years of active development since its inception in 2002. During this time we have helped customers across various industries run key aspects of their businesses on GemFire with speed, scale, and resilience. It’s no surprise that many of your financial, insurance, health care, or travel interactions likely go through GemFire!

## Highlights

The following list provides further information on the key features available in GemFire 10 (and related products).

**VMware GemFire Management Console** – This brand-new management interface allows developers and operators to configure and manage GemFire clusters. A single console can provide insight across an entire fleet of GemFire deployments.

**VMware GemFire Search** – Developers can build full-text search capabilities into their applications that run at the speed of memory with the full robustness and reliability of GemFire. Searching and indexing can be done from a single product for simplicity of operations.

**VMware GemFire for Redis Apps** – This release offers expanded compatibility and new eviction policies with simpler deployment as an extension module.

**Spring for VMware GemFire** – Enhanced compatibility and long-term support for Spring applications are available.

**JSON document improvements** – GemFire brings document store capabilities to in-memory applications with space-efficient storage. This improvement will allow GemFire to store documents flexibly as BSON or native Portable Document eXchange.

**Java 17 support** – VMware has extensively tested GemFire under Java 17. The Z Garbage Collector is selected by default, which can provide excellent low-pause behaviors that mesh well with in-memory workloads, particularly on large heap sizes.

**Jakarta Enterprise Edition (JEE) 9** – Session state replication modules now support Apache Tomcat 10 and the Jakarta EE 9 namespace.

**Pluggable modules** – Developers can package and deploy server-side code independently without conflicting with existing GemFire libraries.

**Cross-cluster replication improvements** – Application objects that store partial updates can be more efficiently replicated to other clusters.

**Updated defaults** – We’ve tweaked the out-of-the-box tuning parameters to reduce the initial configuration and setup time.

**Deploy and run everywhere** – GemFire can run on-premises or in the cloud; on bare metal, virtual machines, or containers; and offers automated management and seamless upgrades on Kubernetes and VMware Tanzu Application Service.

## Next steps

To learn more about GemFire, please visit the new GemFire Developer Center at https://gemfire.dev. There you will find quickstart guides, tutorials, videos, and blog articles to help you get started!

## Additional resources

- GemFire 10.0: [documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/about_gemfire.html), [release notes](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/release_notes.html), and [download](https://network.tanzu.vmware.com/products/pivotal-gemfire/)
- GemFire Management Console 1.0: [documentation](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.0/gfmc/index.html), [release notes](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.0/gfmc/release_notes.html), and [download](https://network.tanzu.vmware.com/products/gemfire-management-console/)
- Webinar: [GemFire 10 Features](videos/gemfire-10.0-beta-open)
- Video: [GemFire in two minutes](videos/gemfire-in-two-minutes) / [The World of GemFire](videos/the-world-of-gemfire)


\* VMware GemFire 10 is designated the “Gideon” release in honor of our colleague [Gideon Low](remembering-gideon-low).
