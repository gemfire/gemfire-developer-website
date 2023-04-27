---
title: Spring - Convert Spring Data Redis Pub-Sub to VMware GemFire
date: '2021-05-28'
lastmod: '2021-05-28'
repo: https://github.com/gemfire/spring-for-apache-geode-examples
tags:
- Redis
- Spring
type: examples
description: This example highlights the changes necessary for switching to SBDG for a Spring Data Redis publish/subscribe app.

---

The projects in this directory illustrate a Spring Boot application that creates a publish and subscribe channel with either Redis or VMware GemFire. In this guide, we will highlight the changes necessary for switching from Spring Data Redis to Spring Boot for GemFire using a publish/subscribe application.

In the VMware GemFire example, a `Region` will represent the equivalent of a `PatternTopic` as defined in the Redis example.