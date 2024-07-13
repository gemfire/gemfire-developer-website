---
title: Java Quick Start
description: Quick start guide for using a Java client with VMware GemFire.
weight: 1
icon: java
topics:
 - Java
---

Before starting the following example make sure you have GemFire installed.

To use a Java client with GemFire, you must add the dependencies that are appropriate for your application.  The GemFire dependencies are available from the [Broadcom Maven Repo](https://support.broadcom.com).  Access to the Broadcom Maven Repository requires a one-time registration step to create an account.

## Add GemFire to a Project
To add GemFire to a Maven or Gradle project
1. You will need a [Broadcom Support Portal](https://support.broadcom.com) account.
1. Select My Downloads. Search by Product Name = VMware Tanzu GemFire. Click on VMware Tanzu GemFire. Click on VMware Tanzu GemFire. Scroll down, Show All Releases, scroll down to Click Green Token for Repository Access and click on the green symbol to the far right. Note your email address.  Copy your access_token (not including any surrounding quotation marks).
1. Add the GemFire repository to your project:

   - **Maven**
     Add the following to the `pom.xml` file:
       ```xml
       <repositories>
           <repository>
               <id>gemfire-release-repo</id>
               <name>Broadcom GemFire Release Repository</name>
               <url>https://packages.broadcom.com/artifactory/gemfire/</url>
           </repository>
       </repositories>
       ```
   - **Gradle**
     Add the following to the `build.gradle` file:
       ```groovy
       repositories {
           maven {
               credentials {
                   username "$gemfireRepoUsername"
                   password "$gemfireRepoPassword"
               }
               url = uri("https://packages.broadcom.com/artifactory/gemfire/")
           }
       }
       ```
1. Add your Broadcom Maven Repository credentials.
   - **Maven**
     Add the following to the `.m2/settings.xml` file. Replace `MY-USERNAME@example` and `MY-ACCESS-TOKEN` with your Broadcom Maven Repository credentials.
       ```xml
       <settings>
           <servers>
               <server>
                   <id>gemfire-release-repo</id>
                   <username>MY-USERNAME@example.com</username>
                   <password>MY-ACCESS-TOKEN</password>
               </server>
           </servers>
       </settings>
       ```
   - **Gradle**
     Add the following to the local `.gradle/gradle.properties` or project `gradle.properties` file. Replace `MY-USERNAME@example` and `MY-ACCESS-TOKEN` with your Broadcom Maven Repository credentials.
       ```groovy
       gemfireRepoUsername=MY-USERNAME@example.com
       gemfireRepoPassword=MY-ACCESS-TOKEN
       ```
1. Add the dependencies to the project.
   - **Maven**
     Add the following to your `pom.xml` file. Replace VERSION with the version of
     GemFire being used for the project.
       ```xml
        <dependencies>
           <dependency>
               <groupId>com.vmware.gemfire</groupId>
               <artifactId>gemfire-core</artifactId>
               <version>VERSION</version>
           </dependency>
       </dependencies>
       ```
   - **Gradle**
     Add the following to your `build.gradle` file. Replace $VERSION with the version of
     GemFire being used for the project.
       ```
       dependencies {
         implementation "com.vmware.gemfire:gemfire-core:$VERSION"
       }
       ```
## Start a GemFire Cluster
For the following client examples, start a simple cluster and create an example region.
1. With GemFire installed or available, in a terminal start the GemFire shell (GFSH)
    ```
    $ gfsh 
    ```
2. Using GFSH start a locator
    ```
    start locator
    ```
3. Next, use GFSH to start a server
    ```
    start server
    ```
4. Create a region called "helloWorld".
    ```
    create region --name=helloWorld --type=PARTITION 
    ```
## Simple Put and Get
The following is an example of connecting to the GemFire cluster started above.  

This example
- Creates a `ClientCache`, with cluster connection information.
  - Creates a client side PROXY Region ("helloWorld") that represents the `helloWorld` region that was created on the server.
  - PUTs data into the helloWorld region.
  - GETs that data from the helloWorld region.
  - Prints the value on the command line.
    ```java
    import org.apache.geode.cache.Region;
    import org.apache.geode.cache.client.ClientCache;
    import org.apache.geode.cache.client.ClientCacheFactory;
    import org.apache.geode.cache.client.ClientRegionShortcut;
    public class HelloWorldApplication {
      public static void main(String[] args) {
        ClientCache cache = new ClientCacheFactory().addPoolLocator("127.0.0.1", 10334).create();
        Region<String, String>
            helloWorldRegion =
            cache.<String, String>createClientRegionFactory(ClientRegionShortcut.PROXY).create("helloWorld");
        helloWorldRegion.put("1", "HelloWorldValue");
        String value1 = helloWorldRegion.get("1");
        System.out.println(value1);
        cache.close();
      }
    }
    ```

Build and run the application.  You should see ‘HelloWorldValue’ printed in the command line.
