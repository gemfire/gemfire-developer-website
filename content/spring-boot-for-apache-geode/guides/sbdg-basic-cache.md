---
title:  "A Basic Cache"
link-title: "A Basic Cache"
slug: A Basic Cache
description: Add a simple Look-Aside Cache to your Spring Boot application. 
weight: 1
type: guides
featured: true
---

This guide walks you through how to add a simple cache, also called a Look-Aside Cache, to your Spring Boot application for Tanzu GemFire.
## When should I use a look-aside cache?

Look-aside caching is a great candidate for data that doesn’t change often and is frequently read. Some examples include:
* Front page for a website
* Healthcare policies, procedure codes, providers, and coverage.
* Promotional campaign information
* Product Catalog
* User profiles
* Movie listings
* etc.  

---
  
## How does a look-aside cache work?
With a look-aside cache pattern, the application will request data from the cache. If the data **IS NOT** in the cache (**cache miss**), the application will request the data from the data store. Once the application receives the data, it will write that data to the cache (**cache write**).  

![img](/images/guides/spring/diagrams/Diagram1_CacheMissAndWrite.svg)

If the data **IS** in the cache (**cache hit**), your application will receive the requested data without needing to access the data store.  

![img](/images/guides/spring/diagrams/Diagram2_CacheHit.svg)

---

## What you'll need
To complete this guide you need:

* The [Look-Aside Cache example](https://github.com/pivotal/cloud-cache-examples/tree/master/look-aside-cache)
* Your favorite text editor or IDE
* JDK 8 or 11
* A Spring Boot application (using 2.2 or greater)

---

## Where do we begin?
This example begins with a Spring Boot application that is making a call to an external data source (in this case, the free [Bikewise API](https://www.bikewise.org/documentation/api_v2)), using a ZIP code as the search term. Adding a look-aside cache speeds up subsequent searches of that ZIP code.

In your application the external data source may be a call to a database, a different API, or another microservice.

You can download the complete application from the [Tanzu GemFire examples](https://github.com/pivotal/cloud-cache-examples) GitHub repository.

### Step 1: Add the Spring Boot for Apache Geode Dependency
To allow the application to work with Tanzu GemFire and utilize the Spring Boot for Pivotal GemFire dependency, add the following dependency information to the `build.gradle` file

```groovy
dependencies {
    implementation("org.springframework.geode:spring-geode-starter:1.3.3")
}
```
### Step 2: Add Application-Level Annotations
Add the following annotations to either your application configuration class or your main application class

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.data.gemfire.config.annotation.EnableCachingDefinedRegions;
import org.springframework.geode.config.annotation.EnableClusterAware;

@Configuration
@EnableCachingDefinedRegions
@EnableClusterAware
public class LookAsideCacheApplicationConfig {
    ...
}
```

[@EnableCachingDefinedRegions](https://docs.spring.io/spring-data/geode/docs/current/reference/html/#bootstrap-annotation-config-caching)
Inspects the Spring application for components annotated with [@Cacheable](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache-annotations) to identify the regions (caches) needed by the application at runtime.

[@EnableClusterAware](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware)
Allows the application to seamlessly switch between local-only (application running on local machine) and client/server (in a managed environment such as Tanzu Application Service). This annotation includes the [@EnableClusterConfiguration](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware) annotation, which dynamically creates regions if they do not exist already. Note that the @EnableClusterConfiguration annotation will only create Regions, it will not delete or update existing regions.````

### Step 3: Add @Cacheable Annotation to Service Method
Finally, add the @Cacheable annotation to the service methods whose results will be cached.

```java
import org.springframework.cache.annotation.Cacheable;
    ...

@Service
public class BikeIncidentService {
    private final RestTemplate restTemplate;

    @Value("${bikewise.api.url}")
    private String API_URL;

    ...

    @Cacheable("BikeIncidentsByZip")
    public List<BikeIncident> getBikeIncidents(String zipCode) throws IOException {
        
        String jsonIncidents = restTemplate.getForObject(API_URL + zipCode, String.class);
    
        return convertJsonToBikeIncidents(jsonIncidents);
    }

    ...
}
```
Add the name of the region you wish to be created as an argument to the annotation. In the above example we have `@Cacheable(“BikeIncidentsByZip”)`, so a region with the name BikeIncidentsByZip will be used.

Remember that with the look-aside caching pattern, the application will first look in the cache and if the value is found, the application will not run the logic in the annotated method.

### Step 4: Build and Run the Application!
```
./gradlew bootRun
```

---

### Step 5. Deploy your application 
