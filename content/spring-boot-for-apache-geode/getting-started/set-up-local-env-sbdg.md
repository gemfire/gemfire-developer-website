---
title:  "Set Up Your Local Environment"
link-title: "Set Up Your Local Environment"

description: A guide to help get your local development environment up and running.
weight: 1
type: getting-started-guides

---

This guide walks you through setting up your local development environment using Apache Geode and a `Hello World` example.    

## What is Apache Geode?

Tanzu GemFire, an enterprise offering, is powered by Apache Geode and adds additional enterprise functionality and integrations.  Apache Geode is the open source core of Tanzu GemFire.   This means that you can use Apache Geode on your local machine when developing and testing your Tanzu GemFire applications.


## Install Apache Geode for Local Development

When developing and testing your application locally, you can use Apache Geode.

There are multiple ways to install Apache Geode for local development.  We will highlight two different ways below (brew or the .zip/.tar file below), however you can find [additional installation options here](https://geode.apache.org/docs/guide/13/getting_started/installation/install_standalone.html).

 ### Option 1: Using brew
 
 In a terminal run the following command:
 
 `brew install apache-geode`
 
 This will install the most recent version of Apache Geode.

### Option 2: Download a .zip or .tar file.


1. Download the .zip or .tar file from the [Apache Releases page](https://geode.apache.org/releases/).
2.  Unzip or expand the file.
3. Add the Geode bin directory to your PATH environment variable.
     
     **macOS/Unix/Linux**
     ```
    PATH=$PATH:$JAVA_HOME/bin:path_to_product/bin
    export PATH
    ```
    
     **Windows**
    `set PATH=%PATH%;%JAVA_HOME%\bin;path_to_product\bin`

### Check your installation

In a terminal type

```gfsh version```

You should see something similar to

```
gfsh version
1.13.1
```

Apache Geode is now installed on your machine.

---

## Set Up Your Local Environment

This section will guide you through testing a `Hello, World!` client application on your local machine to confirm that your local environment is set up correctly.


### What You'll Need
* The [Hello, World!](https://github.com/pivotal/cloud-cache-examples/tree/master/hello-world) example.
* JDK 8 or 11
* Spring Boot 2.1 or above
* Spring Boot for Apache Geode 
* Apache Geode installed on your local machine.

### 1. Download the Hello, World! Example

Clone the Hello, World! app from the [examples repo](https://github.com/pivotal/cloud-cache-examples). 

```
$ git clone git@github.com:pivotal/cloud-cache-examples.git
```

### 2. Start an Apache Geode Cluster

{{% alert title="Required" color="info" %}}
Make sure that you have installed Apache Geode on your machine before proceeding.
{{% /alert %}} 

Included in the example is a custom Gradle task that invokes a Geode Shell (gfsh) script `startCluster`.  This script starts a small local cluster and creates a region (analogous to a table in a relational database)  called `Hello`.  

In a terminal, from the working directory of `cloud-cache-examples/hello-world` run the following task:

```
$ ./gradlew startCluster
```

This is a **2 step Gradle task** and may take several minutes to complete.

### 3. Build and Run the App

In the same working directory as above, build the application

```
./gradlew build
```

then run the application

```
./gradlew bootRun
```

*We are running a gradle task so you will most likely see the executing progress bar stop around 75% when the app is up and running.*

Now that the application has started, open a browser and go to http://localhost:8080/hello.

You should see something similar to the below, which represents an artificial time delay simulating a database query.

> key: hello
>
>value: 2019-10-01T16:17:51.557 (this will be your current date & time)
>
>time to look up: 3057ms (quantity of time that it took to acquire the key-value pair).


**Refresh the page** and you should see something similar to

> key: hello
>
>value: 2019-10-01T16:17:51.557 (this will be your current date & time)
>
>time to look up: 6ms (quantity of time that it took to acquire the key-value pair).

Note that the ***time to look up*** has been significantly reduced. This represents the app getting the information from the cache (Apache Geode), instead of querying the database.

### 4. Stop the App and Tear Down the Apache Geode Cluster

Stop running the app, then with a current working directory of `cloud-cache-examples/hello-world` run the `stopAndCleanUpCluster gradle task

```
./gradlew stopAndCleanUpCluster
```

Congratulations! Your local environment is set up and ready to develop with.

---

 ## Learn More
 
 Now that you have successfully set up your local development environment, check out some other guides
  
 * Set up your [Tanzu GemFire service instance](spring-boot-for-apache-geode/getting-started/set-up-tgf4vms-on-tas-sbdg) on the Tanzu Application Service. 
  
 * You can get started by implementing a [basic look-aside cache](spring-boot-for-apache-geode/guides/a-basic-cache) that will improve the read performance of your application. 
 
* Create an application that utilizes Spring Boot for Apache Geode and Spring Session for [session state caching](spring-boot-for-apache-geode/guides/session-state-caching). 
