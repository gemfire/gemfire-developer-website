---
title: Spring
description: Quick start guide for using Spring as a client for VMware GemFire.
weight: 2
icon: spring
topics:
- Spring
---


Spring Boot for VMware GemFire provides the convenience of Spring Boot's convention over configuration approach by using auto-configuration with Spring Framework's powerful abstractions and highly consistent programming model to simplify the development of VMware GemFire applications.

Spring Boot for VMware GemFire provides developers with a consistent experience whether building and running Spring Boot VMware GemFire applications locally or in a managed environment, such as with [VMware Tanzu Application Service](https://tanzu.vmware.com/application-service) (TAS) or on Kubernetes.

This reference guide explains how to add the Spring Boot for VMware GemFire dependency to your project. Once the dependency has been added, refer to the [Spring Boot for VMware GemFire Reference Guide](https://docs.vmware.com/en/Spring-Boot-for-VMware-GemFire/1.0/sbgf/index.html) for in-depth information about on using the dependency.

## Add Spring Boot for VMware GemFire to a Project

The Spring Boot for VMware GemFire dependencies are available from the [Broadcom Support Portal](https://support.broadcom.com). Access to the Broadcom Maven Repository requires a one-time registration step to create an account.

Spring Boot for VMware GemFire requires users to add the GemFire repository to their projects.

To add Spring Boot for VMware GemFire to a project:

1. You will need a [Broadcom Support Portal](https://support.broadcom.com) account.

1. Select My Downloads. Search by Product Name = VMware Tanzu GemFire. Click on VMware Tanzu GemFire. Click on VMware Tanzu GemFire. Scroll down, Show All Releases, scroll down to Click Green Token for Repository Access and click on the green symbol to the far right. Note your email address.  Copy your access_token (not including any surrounding quotation marks).

1. Add the GemFire repository to your project:

    * **Maven**: Add the following block to the `pom.xml` file:

        ```
        <repository>
            <id>gemfire-release-repo</id>
            <name>Broadcom GemFire Release Repository</name>
            <url>https://packages.broadcom.com/artifactory/gemfire/</url>
        </repository>
        ```

    * **Gradle**: Add the following block to the `repositories` section of the `build.gradle` file:

        ```
        repositories {
            mavenCentral()
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

    * **Maven**: Add the following to the `.m2/settings.xml` file. Replace `MY-USERNAME@example` and `MY-ACCESS-TOKEN` with your Broadcom Maven Repository credentials.

        ```
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

    * **Gradle**: Add the following to the local (`.gradle/gradle.properties`) or project `gradle.properties` file. Replace `MY-USERNAME@example` and `MY-ACCESS-TOKEN` with your Broadcom Maven Repository credentials.

        ```
        gemfireRepoUsername=MY-USERNAME@example.com 
        gemfireRepoPassword=MY-ACCESS-TOKEN
        ```

1. After you have set up the repository and credentials, add the Spring Boot for VMware GemFire dependency to your application.

   ### For version 1.1.0+

   Starting in version 1.1.0, you will be required to "Bring Your Own GemFire," which will allow for improved flexibility with GemFire patch versions. In addition to the Spring Boot for VMware GemFire dependency, you must add an explicit dependency on the desired version of GemFire. The required dependencies will differ for clients and servers.

   #### For clients

    * **Maven**: Add the following to your `pom.xml` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available and `GEMFIRE_VERSION` with the version of VMware GemFire being used for the project.

        ```
        <dependencies>
            <dependency>
                <groupId>com.vmware.gemfire</groupId>
                <artifactId>spring-boot-3.1-gemfire-10.0</artifactId>
                <version>VERSION</version>
            </dependency>
            <dependency>
                <groupId>com.vmware.gemfire</groupId>
                <artifactId>gemfire-core</artifactId>
                <version>GEMFIRE_VERSION</version>
            </dependency>
            <!--if using continuous queries-->
            <dependency>
                <groupId>com.vmware.gemfire</groupId>
                <artifactId>gemfire-cq</artifactId>
                <version>GEMFIRE_VERSION</version>
            </dependency>
        </dependencies>
        ```

    * **Gradle**: Add the following to your `build.gradle` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available and `GEMFIRE_VERSION` with the version of VMware GemFire being used for the project.

        ```
        dependencies {
            implementation "com.vmware.gemfire:spring-boot-3.1-gemfire-10.0:VERSION"
            implementation "com.vmware.gemfire:gemfire-core:GEMFIRE_VERSION"
            // if using continuous queries
            implementation "com.vmware.gemfire:gemfire-cq:GEMFIRE_VERSION"
        }
        ```


   #### For servers
   > NOTE: The server dependencies are only required if the user is starting an embedded GemFire server using Spring.

   * **Maven**: Add the following to your `pom.xml` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available and `GEMFIRE_VERSION` with the version of VMware GemFire being used for the project.

        ```
        <dependency>
            <groupId>com.vmware.gemfire</groupId>
            <artifactId>spring-boot-3.1-gemfire-10.0</artifactId>
            <version>VERSION</version>
        </dependency>
        <dependency>
            <groupId>com.vmware.gemfire</groupId>
            <artifactId>gemfire-server-all</artifactId>
            <version>GEMFIRE_VERSION</version>
            <exclusions>
                <exclusion>
                    <groupId>com.vmware.gemfire</groupId>
                    <artifactId>gemfire-log4j</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        ```

    * **Gradle**: Add the following to your `build.gradle` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available and `GEMFIRE_VERSION` with the version of VMware GemFire being used for the project.

        ```
        dependencies {
            implementation "com.vmware.gemfire:spring-boot-3.1-gemfire-10.0:VERSION"
            implementation ("com.vmware.gemfire:gemfire-server-all:GEMFIRE_VERSION"){
                exclude group: 'com.vmware.gemfire', module: 'gemfire-log4j'
            }
        }
        ```

### For version 1.0.0

   * **Maven**: Add the following to your `pom.xml` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available.

        ```
        <dependencies>
            <dependency>
                <groupId>com.vmware.gemfire</groupId>
                <artifactId>spring-boot-3.1-gemfire-10.0</artifactId>
                <version>VERSION</version>
            </dependency>
        </dependencies>
        ```

   * **Gradle**: Add the following to your `build.gradle` file. Replace `VERSION` with the current version of Spring Boot for VMware GemFire available.

        ```
        dependencies {
            implementation "com.vmware.gemfire:spring-boot-3.1-gemfire-10.0:VERSION"
        }
        ```

Your application is now ready to connect with your GemFire instance.

## Modules

To enable additional functionality, such as Spring Boot Actuator or Spring Session, declare any of the following modules in your `.pom` or `.gradle` file (in addition to the `spring-gemfire-starter  dependency)`:

* `spring-boot-actuator-3.1-gemfire-10.0:1.0.0`
* `spring-boot-logging-3.1-gemfire-10.0:1.0.0`
* `spring-boot-session-3.1-gemfire-10.0:1.0.0`

## Reference Guide

For further information, refer to the [Spring Boot for VMware GemFire Reference Guide](https://docs.vmware.com/en/Spring-Boot-for-VMware-GemFire/1.0/sbgf/index.html).
