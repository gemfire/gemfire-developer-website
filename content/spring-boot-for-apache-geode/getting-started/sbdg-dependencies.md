---
title:  "Spring Boot for Apache Geode Dependencies"
link-title: "Spring Boot for Apache Geode Dependencies"

description: How to add Spring Boot for Apache Geode dependencies to your project.
weight: 1
type: getting-started-guides
featured: false
---


Spring Boot apps can take advantage of the Spring Boot for Apache Geode dependency, which provides the convenience of Spring Boot’s convention over configuration approach. It uses auto configuration with the Spring Framework’s powerful abstractions and highly consistent programming model.  It compatible with all Tanzu GemFire installers (standalone, VMs, Kubernetes).  

For a deeper dive please refer to the [Spring Boot for Apache Geode](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/) documentation. 



---

## Including Spring Boot for Apache Geode in your application 

To use [Spring Boot for Apache Geode](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/), declare the spring-geode-starter on your application classpath.  This dependency brings the convenience of Spring Boot’s [auto-configuration to Apache Geode and Tanzu GemFire](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/index.html#geode-configuration-auto). 
 

{{% alert title="Version" color="info" %}}
Make sure that the minor version of Spring Boot you are using, matches the Spring Boot for Apache Geode version you declare in your dependency.
{{% /alert %}} 

&nbsp;
  
**Maven**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter</artifactId>
        <version>1.3.4.RELEASE</version>
    </dependency>
</dependencies>
```
**Gradle**
```groovy
dependencies {
    compile 'org.springframework.geode:spring-geode-starter:1.3.4.RELEASE'
}
```

---

##  Spring Boot for Apache Geode & Spring Session

Spring Boot for Apache Geode provides auto-configuration support to configure Apache Geode as the user’s session information management provider and store when Spring Session for Apache Geode is on your Spring Boot application’s classpath.  
 
To learn more about Spring Boot for Apache Geode's auto-configuration with Spring Session check out the [reference documentation](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/#geode-session). 

{{% alert title="Transitive Dependency " color="warning" %}}
The following dependency transitively pulls in the `spring-geode-starter` so you do not need to declare both dependencies.    
{{% /alert %}} 

&nbsp;

**Maven**
```xml
<dependency>
    <groupId>org.springframework.geode</groupId>
    <artifactId>spring-geode-starter-session</artifactId>
    <version>1.3.4.RELEASE</version>
</dependency>

```
**Gradle**
```groovy
dependencies {
    compile 'org.springframework.geode:spring-geode-starter-session:1.3.4.RELEASE'
}
```

---

##  Spring Boot for Apache Geode & Spring Boot Actuator

Spring Boot for Apache Geode adds [Spring Boot Actuator] (https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready.html) support and dedicated `HealthIndicators` for Apache Geode.  
Spring Boot `HealthIndicators` provide details about the runtime operation and behavior of your Apache Geode based Spring Boot applications.  The [Spring Boot for Apache Geode reference docs](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/index.html#actuator) contains a full list of available health indicators.

{{% alert title="Transitive Dependency " color="warning" %}}
The following dependency transitively pulls in the `spring-geode-starter` so you do not need to declare both dependencies.    
{{% /alert %}} 

&nbsp;

**Maven**
```xml
<dependency>
    <groupId>org.springframework.geode</groupId>
    <artifactId>spring-geode-starter-actuator</artifactId>
    <version>1.3.4.RELEASE</version>
</dependency>

```
**Gradle**
```groovy
dependencies {
    compile 'org.springframework.geode:spring-geode-starter-actuator:1.3.4.RELEASE'
}
```