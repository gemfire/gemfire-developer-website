---
title: 'Testing Spring for GemFire Apps with GemFire Testcontainers'
date: '2024-03-08'
lastmod: '2024-03-08'
description: Dive into the future of GemFire testing and elevate your development workflow today with the cutting-edge testing revolution of GemFire Testcontainers 2.0.0!
type: blog
team:
  - Patrick Johnson
---

Until recently, the primary way to start GemFire during integration testing was using Spring Test for GemFire to bootstrap
a server application with Spring. With the recent release of GemFire Testcontainers 2.0.0, you can now start a containerized
GemFire cluster and configure it via gfsh just like any other GemFire cluster.

## Benefits of Testcontainers

1. The GemFire cluster runs in Docker, allowing you to run your tests in parallel without running into port
   conflicts, saving time and resources.
2. You can configure your cluster using the GemFire shell (GFSH), giving you more flexibility to control your cluster.
3. A GemFire cluster started with Testcontainers is essentially the same as a GemFire cluster started in the traditional way. This can give you more confidence that your application testing of GemFire is representative of how it will behave in production.

## Getting started with Testcontainers

### Adding the dependency
The first step to using GemFire Testcontainers is to add it as a dependency to your project.
If you don't already have access to the GemFire commercial Maven repository, follow the steps on the [GemFire Developer Site](https://gemfire.dev/quickstart/java/).
Once you have access to the GemFire Maven repository, you can add a dependency on GemFire Testcontainers to your build.

Gradle: 
```kotlin
testImplementation("com.vmware.gemfire:testcontainers:2.0.0")
```

Maven:
```xml
<dependency>
  <groupId>com.vmware.gemfire</groupId>
  <artifactId>gemfire-testcontainers</artifactId>
  <version>2.0.0</version>
</dependency>
```

### Getting the GemFire Image

You will also need to pick a container image for the version of GemFire you want to use. GemFire
images can be found on [Dockerhub](https://hub.docker.com/r/gemfire/gemfire). Make sure to use the same version of GemFire that you built your application with. 

If you plan to deploy code into your GemFire Testcontainers cluster, make sure to select an image with the same or higher JDK
version than the one used to compile the code to be deployed. For example, you may want `gemfire/gemfire:10.1-jdk17` if
your project uses JDK 17, which is required for Spring Framework 6 and later.

### Using Testcontainers in Your Test

Now that Testcontainers has been added as a dependency, and you have selected an appropriate GemFire image, you can
start writing or converting your test. 

First, make sure that you have Docker running in your environment.

The primary class you will use to set up and interact with your cluster is `GemFireCluster`. You create a `GemFireCluster`
by passing in the Docker image to use and the number of locators and servers to start. There are also several methods to
configure the cluster before it starts, such as `GemFireCluster.withGfsh()` and `GemFireCluster.withClasspath()`. Then, accept the license and start the cluster.

Once started, you can access the locator and server ports using `getLocatorPorts` and `getServerPorts`, which returns a
list of Integers. You'll want to set a property with the locator and/or server information, or introduce a
`ClientCacheConfigurer` bean to connect to the cluster. 

Here's an example of configuring and starting a GemFire cluster using Testcontainers:

```java
private static GemFireCluster gemFireCluster;

@BeforeClass
public static void startGemFireCluster() throws IOException {
  gemFireCluster = new GemFireCluster(System.getProperty("gemfire/gemfire:10.1-jdk17"), 1, 1)
      .withClasspath(GemFireCluster.SERVER_GLOB, "/path/to/some/jar")
      .withGfsh(false, "create region --name=Customers --type=PARTITION");

  gemFireCluster.acceptLicense().start();

  System.setProperty("spring.data.gemfire.pool.locators", String.format("localhost[%d]", gemFireCluster.getLocatorPort()));
}
```

The setup happens in a `@BeforeClass` method so GemFire will start before your test. After your test, you can shut down the cluster like this:

```java
@AfterClass
public static void stopGemFireCluster() {
  gemFireCluster.close();
}
```

After your cluster is running, you can interact with it using Gfsh commands via `GemFireCluster.gfsh()`. This is
different from `withGfsh` that we used earlier.  The `withGfsh` method **configures** the cluster before it is started by passing commands that run at start time. The `gfsh` method  invokes commands on a running cluster when the method is called.

If you're deploying code using Gfsh's `deploy` command, you'll need to
make the jar file accessible to Docker by using `GemFireCluster.withPreStart` and copying the file to the container
before the cluster starts.

```java
gemfireCluster.withPreStart(GemFireCluster.ALL_GLOB, container -> 
  container.copyFileToContainer(MountableFile.forHostPath("/local/path/to/jar"), "/destination/path/in/container"))
```

Now you can invoke the `deploy` command like normal, using the path to the jar in the container.

If you want to see logs from your GemFire members, the best way to do that is to view them in Docker Desktop by clicking
on the relevant container.

That's essentially all that's required to use Testcontainers to test your Spring for GemFire apps.

Full examples of Spring Data GemFire and Testcontainers can be viewed [here](https://github.com/gemfire/spring-for-gemfire-examples/tree/main/testcontainers/testcontainer-simple)

For more information on Testcontainers with GemFire,
check out [this blog post](https://gemfire.dev/blog/fast-and-easy-testing-with-gemfire-and-testcontainers/) by Jens Deppe.
There have been some changes with the 2.0 release, but there is still lots of valuable information in there.

For more information on Spring for GemFire, checkout the documentation for Spring 
[Data](https://docs.vmware.com/en/Spring-Data-for-VMware-GemFire/1.0/sdgf/index.html),
[Boot](https://docs.vmware.com/en/Spring-Boot-for-VMware-GemFire/1.0/sbgf/index.html),
[Session](https://docs.vmware.com/en/Spring-Session-for-VMware-GemFire/1.0/ssgf/index.html)
