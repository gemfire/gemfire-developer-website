---
title: Spring for VMware GemFire is Now Available
date: 2022-12-26
lastmod: '2022-12-26'
team:
- John Martin
type: blog
description: The Spring for VMware GemFire dependencies bring the full power of the Spring Framework to your VMware GemFire applications.
---

We are pleased to reintroduce Spring for VMware GemFire!

The Spring for VMware GemFire dependencies bring the full power of the Spring Framework to your VMware GemFire applications. It’s now easier than ever to build fast and scalable Spring applications using VMware GemFire for distributed data management.

With the reintroduction of these dependencies, we plan to support multiple versions of Spring and GemFire for enhanced compatibility and simpler upgrade cycles. This will allow customers to update their Spring versions while continuing to use their current GemFire installations.

## Spring Boot for VMware GemFire
Spring Boot for VMware GemFire provides the convenience of Spring Boot’s convention over configuration approach by using auto-configuration with Spring Framework’s powerful abstractions and highly consistent programming model to simplify the development of VMware GemFire applications. [Check out the QuickStart guide to begin](https://docs.vmware.com/en/Spring-Boot-for-VMware-GemFire/index.html).

## Spring Data for VMware GemFire
Spring Data for VMware GemFire provides full configuration and initialization of VMware GemFire using the Spring Framework. This dependency helps to simplify the configuration of VMware GemFire components, including caches, regions, indexes, disk stores, functions, WAN gateways, persistence backup, and several other distributed system components to support a variety of application use cases with minimal effort. [Check out the QuickStart guide to begin](https://docs.vmware.com/en/Spring-Data-for-VMware-GemFire/index.html).

## Spring Session for VMware GemFire
Spring Session for VMware GemFire provides an implementation of the core Spring Session framework using VMware GemFire to manage a user’s Session information. [Check out the QuickStart guide to begin](https://docs.vmware.com/en/Spring-Session-for-VMware-GemFire/index.html).

# FAQ
***I’m currently using a previous version of Spring for Apache Geode or Spring for GemFire dependencies, are these new dependencies different?***

The functionality, integration, and annotations that you are using are the same and will continue to work. However, the dependency group ID, artifact ID, version, and maven repository have changed. Users will need to create an account and then make the appropriate changes to their application as described in the QuickStart guides above.

***Why is this changing?***

We have received feedback from customers that need support for multiple Spring and GemFire versions for longer periods of time. Previously, the Spring libraries were tied to a specific version of GemFire. While users could upgrade/downgrade the GemFire version of the Spring dependency, they did so at their own risk. With the reintroduction of these dependencies, we plan to be able to support multiple Spring and GemFire combinations for extended periods.

***What versions of Spring and GemFire are compatible?***

The current releases of the Spring for GemFire dependencies are compatible with

- Spring Boot 2.7, 3.0, and 3.1
- Spring Data 2.7, 3.0, and 3.1
- Spring Session 2.7, 3.0, and 3.1
- GemFire 9.15 and 10.0

***How do I migrate to the new dependencies?***

The best way to migrate your current application is to follow the QuickStart guide listed above for the appropriate dependency.

***What happens if I find an issue with a dependency?***
The Spring for GemFire dependencies are open source. If you find an issue, please create a GitHub issue in the appropriate GitHub repository:

- [Spring Boot for VMware GemFire](https://github.com/gemfire/spring-boot-for-vmware-gemfire)
- [Spring Data for VMware GemFire](https://github.com/gemfire/spring-data-for-vmware-gemfire)
- [Spring Session for VMware GemFire](https://github.com/gemfire/spring-session-for-vmware-gemfire)

# What's next?
As we are reintroducing the Spring for GemFire dependencies, we are working hard to be compatible with the next generation of Spring, including

- Spring 3.0
- Spring Batch
- Spring Integration
- Spring Cloud Data Flow

While this is not an official roadmap, it should offer an idea as to where we’re heading with the dependencies in the future!