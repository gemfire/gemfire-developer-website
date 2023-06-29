---
title: Improved Integration Testing with GemFire and Testcontainers
description: Improved Integration Testing with GemFire and Testcontainers
date: 2023-06-29
lastmod: 2023-06-29
team: 
- Jens Deppe
type: blog
---
# Improved Integration Testing with GemFire and Testcontainers

## Introduction

Testing your application against real-world, heavy-weight test fixtures such as databases or web
servers can be a daunting task; often resulting in spending more time creating infrastructure and
managing processes than actually writing tests. Testcontainers eases this burden by managing and
exposing these services wrapped in Docker containers.

GemFire, being a distributed system comprised of multiple components, can be difficult to use as an
integration test resource. This post introduces `gemfire-testcontainers` which allows a developer
to use the Testcontainers framework to start a GemFire cluster and write tests against it.
Testcontainers handles the full lifecycle and infrastructure requirements for running a GemFire
cluster freeing the developer to focus on writing their tests.

## Getting Started

In order to use `gemfire-testcontainers` you should add the following dependency to your Maven `pom.xml`:

```xml
<dependency>
  <groupId>com.vmware.gemfire</groupId>
  <artifactId>gemfire-testontainers</artifactId>
  <version>1.0.0</version>
</dependency>
```

Or, if using Gradle, you would add this to your `build.gradle` file:

```groovy
api('com.vmware.gemfire:testcontainers:1.0.0')
```

At this point you are ready to write your first test. Here is an example:

```java
@Test
public void testBasicSetup() {
  // -> 1.
  try (GemFireClusterContainer<?> cluster = new GemFireClusterContainer<>()) {
    // -> 2.
    cluster.acceptLicense();
    // -> 3.
    cluster.start();

    // -> 4.
    cluster.gfsh(
        true,
        "list members",
        "create region --name=FOO --type=REPLICATE",
        "describe region --name=FOO"
    );

    try (
      // -> 5.
      ClientCache cache = new ClientCacheFactory()
          .addPoolLocator("localhost", cluster.getLocatorPort())
          .create()
    ) {
      Region<Integer, String> region = cache
          .<Integer, String>createClientRegionFactory(ClientRegionShortcut.PROXY)
          .create("FOO");

      region.put(1, "Hello World");

      assertThat(region.get(1)).isEqualTo("Hello World");
    }
    // -> 6.
  }
}
```

Breaking this down step by step:

1. Here we're defining a new GemFire cluster. By default, this consists of one locator and 2 servers.
   As of this writing, the default GemFire version is `9.15.6`. The API also allows to specify a
   different GemFire image as well as additional servers.
2. Since GemFire is a commercial product it is required to have a license. This method call
   implies that the user has accepted the license and is aware of any restrictions in the use of GemFire.
3. Now we can start the cluster. This will launch the actual Docker containers.
4. The `GemFireClusterContainer` provides a way to run arbitrary `gfsh` commands, optionally logging
   their output.
5. Now we're ready to interact with GemFire. In this case the client is connecting using the locator's
   port. Notice that we haven't needed to specify which ports GemFire is using. One of the big
   advantages of Testcontainers is that it provides independence from most infrastructure configuration - 
   there is no need to worry about port conflicts since everything is ephemeral and dynamic.
6. Since the cluster is wrapped in a try-resource block cleanup is automatic. Testcontainers will
   ensure that all containers are shut down once the test ends.

## Testing with Rules

The example above started the GemFire cluster as part of the test. However, the cluster could also
have been defined using a JUnit `@Rule` annotation:

```java
@Rule
public GemFireClusterContainer<?> cluster = new GemFireClusterContainer<>()
    .acceptLicense()
    .withGfsh(true, "create region --name=BAZ --type=REPLICATE");
```

Notice that we still need to accept the license, however we do not need to call `start()` as the
cluster lifecycle is managed as part of JUnit Rule processing. 

## Creating GemFire Structures

In our example we're creating a GemFire structure, (a Region in this case), using `gfsh`. In some
cases it may be more convenient to provide a `cache.xml` file. This is as simple as using the
`withCacheXml()` method. The referenced XML resource file will be used when starting the GemFire
servers.

It is often also necessary to provide your own code on the classpath of the GemFire servers. This
is necessary to give access to domain classes or, perhaps, to define a `CacheListener` or a
`Function`. This can be achieved by starting the cluster with the `withClasspath()` method as in
this example:

```java
try (GemFireClusterContainer<?> cluster = new GemFireClusterContainer<>()) {
  cluster.withClasspath("build/classes/java/test", "out/test/classes")
      .withGemFireProperty("security-manager", SimpleSecurityManager.class.getName())
      .withGemFireProperty("security-username", "cluster")
      .withGemFireProperty("security-password", "cluster")
      .acceptLicense()
      .start();
  ...
}
```

Here the specified local filesystem directories will be made available on the classpath for each
GemFire container. In this case a custom `SecurityManager` is being provided which also shows how
different GemFire properties can be set on startup.

## Debugging

Sometimes it may be necessary to debug your code running inside GemFire. Using Testcontainers this
also requires accessing GemFire _inside_ a container. To enable this, start your cluster using the
`withDebugPort(int serverIndex, int debugPort)` method. Servers are numbered starting from 0 and
the port would be the port to which a debugger should connect. This method will cause startup to
block until a debugger attaches to the given port. As such, it is just provided as an aid while
developing tests and should probably not be part of your committed code.

## Under The Hood

While using `gemfire-testcontainers` you might notice additional Docker containers associated with
a GemFire cluster. In addition to `locator*` and `server*` containers, there is also a `socat`
container. This container enables proxying and exposing dynamic GemFire ports so that clients are
able to automatically discover backend server ports without requiring a set of fixed ports to be
used.

Additionally, a `ryuk` container will be running which is a standard Testcontainer process
responsible for ensuring proper cleanup of all started containers.

## Summary

Hopefully `gemfire-testcontainers` will make it easier to perform block-box testing with GemFire.
If you find any bugs or have suggestions for improvements, please do open an issue on the
project's Github page https://github.com/gemfire/gemfire-testcontainers.