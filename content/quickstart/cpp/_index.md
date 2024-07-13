---
title: C++ Quick Start
description: Quick start guide for using a C++ client with VMware GemFire.
weight: 4
icon: cpp
topics:
- C++
---

## Install VMware GemFire

Download and install VMware GemFire from [Broadcom Support Portal](https://support.broadcom.com/). Follow the installation instructions in the [GemFire documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-installation-install_intro.html).

## Introduction to GFSH

VMware GemFire provides the command line tool "gfsh" for managing GemFire clusters.  Gfsh can be used to start and stop members of the cluster along with configure additional features of the product.

Start interactive gfsh shell in a terminal or console window.

```text
$ gfsh
    _________________________     __
   / _____/ ______/ ______/ /____/ /
  / /  __/ /___  /_____  / _____  /
 / /__/ / ____/  _____/ / /    / /
/______/_/      /______/_/    /_/    10.0.0

Monitor and Manage VMware GemFire
gfsh>
```


## Start a Developer GemFire Cluster

For this tutorial we will start a basic GemFire cluster for development with one locator and server.

Start a GemFire Locator on default port 10334. The locator artifacts, such as log files, are stored in ${HOME}/locator.

```text
$ gfsh start locator --name=locator --dir=${HOME}/locator

................
Locator in /home/<username>/locator on test-javaclient.localdomain[10334] as locator is currently online.
Process ID: 532579
Uptime: 10 seconds
Geode Version: 10.0.0
Java Version: 11.0.17
Log File: /home/<username>/test/locator/locator.log
JVM Arguments: --add-exports=java.management/com.sun.jmx.remote.security=ALL-UNNAMED --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -Dgemfire.enable-cluster-configuration=true -Dgemfire.load-cluster-configuration-from-dir=false -Dgemfire.launcher.registerSignalHandlers=true -Djava.awt.headless=true -Dsun.rmi.dgc.server.gcInterval=9223372036854775806
Class-Path: /home/<username>/vmware-gemfire-10.0.0/lib/gemfire-core-10.0.0.jar:/home/<username>/vmware-gemfire-10.0.0/lib/gemfire-server-all-10.0.0.jar

Successfully connected to: JMX Manager [host=test-javaclient.localdomain, port=1099]

Cluster configuration service is up and running.

```

Start a GemFire Server with default a cache-server port of 40404.

```text
$ gfsh -e "connect" -e "start server --dir=${HOME}/server --name=server"

(1) Executing - connect

Connecting to Locator at [host=localhost, port=10334] ..
Connecting to Manager at [host=test-javaclient.localdomain, port=1099] ..
Successfully connected to: [host=test-javaclient.localdomain, port=1099]

You are connected to a cluster of version 10.0.0.


(2) Executing - start server --dir=test/server --name=server

...
Server in /home/<username>/server on test-javaclient.localdomain[40404] as server is currently online.
Process ID: 534075
Uptime: 3 seconds
Geode Version: 10.0.0
Java Version: 11.0.17
Log File: /home/<username>/test/server/server.log
JVM Arguments: --add-exports=java.management/com.sun.jmx.remote.security=ALL-UNNAMED --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -Dgemfire.default.locators=192.168.0.38[10334] -Dgemfire.start-dev-rest-api=false -Dgemfire.use-cluster-configuration=true -Dgemfire.launcher.registerSignalHandlers=true -Djava.awt.headless=true -Dsun.rmi.dgc.server.gcInterval=9223372036854775806
Class-Path: /home/<username>/vmware-gemfire-10.0.0/lib/gemfire-core-10.0.0.jar:/home/<username>/vmware-gemfire-10.0.0/lib/gemfire-server-all-10.0.0.jar

```

A minimal GemFire cluster should now be available to use.


Next use the `connect` command to access the default locator at localhost and port 10334 for performing management tasks on the running GemFire cluster.

```text
gfsh>connect

Connecting to Locator at [host=localhost, port=10334] ..
Connecting to Manager at [host=test-javaclient.localdomain, port=1099] ..
Successfully connected to: [host=test-javaclient.localdomain, port=1099]

You are connected to a cluster of version 10.0.0.

```

The above response is an affirmative connection to the locator at localhost and port 10334
and should now be ready to manage the GemFire cluster.

## Create a Region

A [Region](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/developing-region_options-chapter_overview.html) is the core structure in the server for holding and managing key-value data in GemFire, it is similar to a hashmap but is distributed across the server members.

While still in the gfsh interactive shell, create a [partition region](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/developing-partitioned_regions-chapter_overview.html) called `example_userinfo`.

```text
gfsh>create region --name=example_userinfo --type=PARTITION

Member  | Status | Message
------- | ------ | --------------------------------------
server | OK     | Region "/example_userinfo" created on "server"

Cluster configuration for group 'cluster' is updated.
```

The region should now be created on server.



## Download the Native Clients Libraries from the Broadcom Support Portal
1. In a browser, navigate to the [VMware Tanzu GemFire download](https://support.broadcom.com/) page.
2. From the **Releases:** drop-down menu, select the most recent version of **VMware Tanzu GemFire Native Client**.
3. Select the version that best suits your development platform, and download it.
4. Uncompress the distribution archive, which may be a ZIP archive or a compressed tar file (.tar.gz or .tgz). For example:
    ```
    $ unzip pivotal-gemfire-nativeclient-windows-64bit-10.x.y.zip
    ```
   or
    ```
    $ tar xvzf pivotal-gemfire-nativeclient-linux-64bit-10.x.y.tar.gz
    ```

   
### Put, Get, and Remove with the GemFire Native C++ Client


The following example, will PUT, GET, and REMOVE entries from the GemFire cluster and write the results out to the console.


```
#include <iostream>

#include <geode/CacheFactory.hpp>
#include <geode/PoolManager.hpp>
#include <geode/RegionFactory.hpp>
#include <geode/RegionShortcut.hpp>

using namespace vmware::gemfire::client;

int main(int argc, char** argv) {
  auto cache = CacheFactory()
      .set("log-level", "none")
      .create();

  cache.getPoolManager()
      .createFactory()
      .addLocator("localhost", 10334)
      .create("pool");
  
  auto regionFactory = cache.createRegionFactory(RegionShortcut::PROXY);
  auto region = regionFactory.setPoolName("pool").create("example_userinfo");

  std::cout << "Storing id and username in the region" << std::endl;
  region->put("rtimmons", "Robert Timmons");
  region->put("scharles", "Sylvia Charles");

  std::cout << "Getting the user info from the region" << std::endl;
  auto user1 = region->get("rtimmons");
  auto user2 = region->get("scharles");
  std::cout << "  rtimmons = "
            << std::dynamic_pointer_cast<CacheableString>(user1)->value()
            << std::endl;
  std::cout << "  scharles = "
            << std::dynamic_pointer_cast<CacheableString>(user2)->value()
            << std::endl;

  std::cout << "Removing rtimmons info from the region" << std::endl;
  region->remove("rtimmons");

  if (region->existsValue("rtimmons")) {
    std::cout << "rtimmons's info not deleted" << std::endl;
  } else {
    std::cout << "rtimmons's info successfully deleted" << std::endl;
  }

  cache.close();
}
```