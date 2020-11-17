---
title:  "A Basic Cache"
link-title: "A Basic Cache"
slug: A Basic Cache
description: Add a simple Look-Aside Cache to your Spring Boot application. 
weight: 1
type: guides

---

This guide walks you through how to add a simple cache, called a Look-Aside Cache, to your Spring Boot application using VMware Tanzu GemFire and the [Spring Boot for Apache Geode](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/) dependency.
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

![img](/images/spring-boot-for-apache-geode/guides/sbdg-basic-cache/diagrams/CacheMissAndWrite.png)

If the data **IS** in the cache (**cache hit**), your application will receive the requested data without needing to access the data store.  

![img](/images/spring-boot-for-apache-geode/guides/sbdg-basic-cache/diagrams/CacheHit.png)

---

## What you'll need
To complete this guide you need:

* The [Look-Aside Cache example](https://github.com/pivotal/cloud-cache-examples/tree/master/look-aside-cache)
* Your favorite text editor or IDE
* JDK 8 or 11
* A Spring Boot application (using 2.2 or greater)
* The Spring Boot for Apache Geode dependency.
* A [Tanzu GemFire service instance](spring-boot-for-apache-geode/getting-started/setting-up-tgf4vms-on-tas) on the Tanzu Application Service

---

## Where do we begin?
This example begins with a Spring Boot application that is making a call to an external data source (in this case, the free [Bikewise API](https://www.bikewise.org/documentation/api_v2)), using a ZIP code as the search term. By adding a look-aside cache, you will speed up subsequent searches of that ZIP code.

In your application the external data source may be a call to a database, a different API, or another microservice.

You can download the complete application from the [Tanzu GemFire examples](https://github.com/pivotal/cloud-cache-examples) GitHub repository.

### 1: Add the Spring Boot for Apache Geode Dependency
To allow the application to work with Tanzu GemFire and utilize the Spring Boot for Apache Geode dependency, add the following dependency information (for this example we have used Gradle)

**Gradle**
```groovy
dependencies {
    implementation("org.springframework.geode:spring-geode-starter:1.3.4")
}
```

**Maven**
```xml
<dependency>
    <groupId>org.springframework.geode</groupId>
    <artifactId>spring-geode-starter-actuator</artifactId>
    <version>1.3.4.RELEASE</version>
</dependency>

```
{{% alert title="Version" color="warning" %}}
Make sure that the minor version of Spring Boot you are using, matches the Spring Boot for Apache Geode version you declare in your dependency.
{{% /alert %}} 


### 2: Add Spring Boot for Apache Geode Annotations
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
Allows the application to seamlessly switch between local-only (application running on local machine) and client/server (in a managed environment such as Tanzu Application Service). This annotation includes the [@EnableClusterConfiguration](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware) annotation, which dynamically creates regions if they do not exist already. Note that the @EnableClusterConfiguration annotation will only create Regions, it will not delete or update existing regions.

### 3: Add the @Cacheable Annotation to Service Method
Finally, add the `@Cacheable` annotation to the service methods whose results will be cached.

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

### 4: Build and Run the App Locally.
Navigate to the root of the project  in a command line and run the Spring Boot run command.

**Gradle**
```
./gradlew bootRun
```

 **Maven**
```
mvn spring-boot:run
``` 


We are running a gradle task so you will most likely see the executing progress bar stop around 75% when the app is up and running.

When the app is running open a browser and go to <http://localhost:8080>.  You should see this

![img](/images/spring-boot-for-apache-geode/guides/sbdg-basic-cache/screenshots/look-aside-cache-app-1.png)

&nbsp;

Enter a ZIP code to search for bike incidents.

![img](/images/spring-boot-for-apache-geode/guides/sbdg-basic-cache/screenshots/look-aside-cache-app-2.png)

&nbsp;


Notice the response time on the right side.  The application has now queried the Bikewise API with the entered ZIP code and stored the response in Tanzu GemFire.  

If you click the search button again with the same ZIP code, you will see that the response time is significantly faster, as the application is now retrieving the information from the Tanzu GemFire cache.

![img](/images/spring-boot-for-apache-geode/guides/sbdg-basic-cache/screenshots/look-aside-cache-app-3.png)


### 5. Deploy your application on the Tanzu Application Service

&nbsp;
       
{{% alert title="Tanzu GemFire Service Instance" color="warning" %}}
To deploy the Bike Incident application to Tanzu Application Service (TAS) make sure you have [created a Tanzu GemFire service instance](spring-boot-for-apache-geode/getting-started/setting-up-tgf4vms-on-tas).
{{% /alert %}} 
       
&nbsp;
 
 In the project root directory, open the `manifest.yml` file and replace  `<your-tanzu-gemfire-service>` with the name of your service instance.
 
 Once the Tanzu GemFire service instance is running (you can check the status by running the `cf services` command), push your app to TAS with `cf push`.
 
 ---
 
 ## Testing Tip
 
 When unit testing during development, to verify caching, `@Autowire` a CacheManager and use it to obtain your named region and verify its contents.
 
 The [@DirtiesContext](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/test/annotation/DirtiesContext.html) is used to destroy the test region and its data after the test is run. This prevents interference with other tests.
 
 In the look-aside-cache example, this looks like:
 
 ```java
import org.springframework.cache.CacheManager;
import org.springframework.test.annotation.DirtiesContext;

    ...
    
@Autowired
CacheManager cacheManager;

    ...
    
@Test
@DirtiesContext
public void getBikeIncidents_ShouldPullFromCache_AfterFirstResult() throws IOException {
    mockRestServer.expect(ExpectedCount.once(), requestTo(API_URL + ZIP_CODE_30306))
        .andRespond(withSuccess(mockIncidentsJsonForZipcode_30306, MediaType.APPLICATION_JSON));

    List<BikeIncident> resultsFor_30306_fromApi =
    bikeIncidentService.getBikeIncidents(ZIP_CODE_30306);
    List<BikeIncident> resultsFor_30306_fromCache =
    bikeIncidentService.getBikeIncidents(ZIP_CODE_30306);

    mockRestServer.verify();
    assertEquals(resultsFor_30306_fromApi,
    cacheManager.getCache("BikeIncidentsByZip").get(ZIP_CODE_30306).get());
    assertEquals(resultsFor_30306_fromApi, resultsFor_30306_fromCache);
}

```
