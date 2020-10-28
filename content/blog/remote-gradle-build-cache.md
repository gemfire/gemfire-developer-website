---
title: "Apache Geode as a remote Gradle Build Cache"

description: >
    Apache Geode as a remote cache for Gradle to share commonly built task outputs across remote builds to improve build times
date: 2020-02-06
type: blog
featured: true
authors: 
- Jason Huynh
---

[Apache Geode as a remote Gradle Build Cache](https://jasonhuynh.blogspot.com/2020/02/apache-geode-as-remote-gradle-build.html)

Gradle task output can be cached locally but also remotely. The idea of a remote cache is to share commonly built task outputs across remote builds to improve build times. With a few steps, we can use Apache Geode as a remote cache for Gradle.


