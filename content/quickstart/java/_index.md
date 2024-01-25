---
title: Java Quick Start
description: Quick start guide for using a Java client with VMware GemFire.
weight: 1
icon: java
topics:
 - Java
---

Before starting the following example make sure you have GemFire installed.

To use a Java client with GemFire, you must add the dependencies that are appropriate for your application.  The GemFire dependencies are available from the [Pivotal Commercial Maven Repo](https://commercial-repo.pivotal.io/login/auth).  Access to the Pivotal Commercial Maven Repository requires a one-time registration step to create an account.

## Add GemFire to a Project
To add GemFire to a Maven or Gradle project
1. In a browser, navigate to the [Pivotal Commercial Maven Repository](https://commercial-repo.pivotal.io/login/auth).
2. Click the **Create Account** link.
3. Complete the information in the registration page and accept the EULA.
4. Click **Register**.
5. After registering, you will receive a confirmation email. Follow the instruction in this email to activate your account.
6. Add the GemFire repository to your project:

   - **Maven**
     Add the following to the `pom.xml` file:
       ```xml
       <repositories>
           <repository>
               <id>gemfire-release-repo</id>
               <name>Pivotal GemFire Release Repository</name>
               <url>https://commercial-repo.pivotal.io/data3/gemfire-release-repo/gemfire</url>
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
               url = uri("https://commercial-repo.pivotal.io/data3/gemfire-release-repo/gemfire")
           }
       }
       ```
7. Add your Pivotal Commercial Maven Repository credentials.
   - **Maven**
     Add the following to the `.m2/settings.xml` file. Replace `MY-USERNAME@example` and `MY-DECRYPTED-PASSWORD` with your Pivotal Commercial Maven Repository credentials.
       ```xml
       <settings>
           <servers>
               <server>
                   <id>gemfire-release-repo</id>
                   <username>MY-USERNAME@example.com</username>
                   <password>MY-DECRYPTED-PASSWORD</password>
               </server>
           </servers>
       </settings>
       ```
   - **Gradle**
     Add the following to the local `.gradle/gradle.properties` or project `gradle.properties` file. Replace `MY-USERNAME@example` and `MY-DECRYPTED-PASSWORD` with your Pivotal Commercial Maven Repository credentials.
       ```groovy
       gemfireRepoUsername=MY-USERNAME@example.com
       gemfireRepoPassword=MY-DECRYPTED-PASSWORD
       ```
8. Add the dependencies to the project.
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
