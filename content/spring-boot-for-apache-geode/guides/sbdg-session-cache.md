---
title:  "Session State Caching"
link-title: "Session State Caching"
slug: Session State Caching
description: Session state cache using Tanzu GemFire in a Spring Boot application.
weight: 1
type: guides


---

This guide walks you through how to implement a session state cache using Tanzu GemFire and [Spring Boot for Apache Geode](https://docs.spring.io/spring-boot-data-geode-build/current/reference/html5/).
## When should I use a session state cache?

Session state caching is useful for storing data associated with an HTTP session. Storing this data in a cache allows it to be retrieved quickly and persisted across logins. Some examples where this might be useful include:
* Shopping cart entries
* User preferences (name, site theme, etc.)
* Single Sign On (SSO) credentials
* Site Navigation History
* etc.  

---
  
## How does session state caching work?
When a user connects to a website that utilizes sessions, an HTTP session is created.

In our example the [Spring Session](https://docs.spring.io/spring-session/docs/current/reference/html5/) library takes care of managing the user session. When a user connects, a unique ID for the session is generated and stored as a cookie in the user’s browser. On subsequent requests, the cookie is sent to the server, identifying the session.

The session UUID is used as a key in a data store holding information associated with the session (see examples of session data above.) The data store can be a traditional database, but this can lead to performance issues when there is a large volume of users, or user data, or both. A cache can improve performance in these cases.

---

## What you'll need
To complete this guide you need:

* The [Session State example](https://github.com/pivotal/cloud-cache-examples/tree/master/session-state)
* Your favorite text editor or IDE
* JDK 8 or 11
* A Spring Boot application (using 2.2 or greater)
* The Spring Boot for Apache Geode dependency.
* A [Tanzu GemFire service instance](spring-boot-for-apache-geode/getting-started/setting-up-tgf4vms-on-tas) on the Tanzu Application Service

---

## Where do we begin?
This example consists of a simple Spring Boot back end application and a React front end application that records user-provided notes, and associates them with the user’s session. If the user navigates away, and then returns to the site, their notes will still be available. The app also offers the ability to destroy the session - analogous to logging out of a website or closing the browser/tab.

The back end (in the `src/main/java/sessionstate/` directory) handles all the session management and storage, and is the main focus of the example.

The front end (in the `frontend/` directory) is provided to illustrate how a web app can interact with the session data. The example front end is written using the React framework, but clients can use any language or framework capable of interacting with a REST endpoint.

### 1: Add the Spring Boot for Apache Geode Dependency
To allow the application to work with Tanzu GemFire and utilize the Spring Boot for Apache Geode dependency, add the following dependency information (the example code uses Gradle)

**Gradle**
```groovy
dependencies {
    implementation("org.springframework.geode:spring-geode-starter-session:1.3.4")
 }
```

**Maven**
```xml
<dependencies>
    <dependency>
      <groupId>org.springframework.geode</groupId>
      <artifactId>spring-geode-starter-session</artifactId>
      <version>1.3.4.RELEASE</version>
    </dependency>
</dependencies>

```

### 2: Add Spring Boot for Apache Geode Annotations
The Spring Boot application will need the following annotations

```java
@SpringBootApplication
@EnableClusterAware
public class SessionStateApplication {
  public static void main(String[] args) {
     SpringApplication.run(SessionStateApplication.class, args);
  }
}
```
[@EnableClusterAware](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware)
Allows the application to seamlessly switch between local-only (application running on local machine) and client/server (in a managed environment such as Tanzu Application Service). This annotation includes the [@EnableClusterConfiguration](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware) annotation, which dynamically creates regions if they do not exist already. Note that the @EnableClusterConfiguration annotation will only create Regions, it will not delete or update existing regions.

The example Spring Boot application uses a `RestController` that allows the front end application to interact with a REST API to read, update, and destroy session data.

```java
@RestController
public class SessionController {
    @GetMapping("/getSessionNotes")
    public List<String> getSessionNotes(HttpServletRequest request) {
        List<String> notes = (List<String>) request.getSession().getAttribute("NOTES");
        return notes;
    }

    @PostMapping("/addSessionNote")
    public void addSessionNote(@RequestBody String note, HttpServletRequest request) {
        List<String> notes = (List<String>) request.getSession().getAttribute("NOTES");

        if (notes == null) {
            notes = new ArrayList<>();
        }

        notes.add(note);
        request.getSession().setAttribute("NOTES", notes);
    }

    @PostMapping("/invalidateSession")
    public void invalidateSession(HttpServletRequest request) {
        request.getSession(false).invalidate();
    }
}
```

### 3: Accessing and Displaying Session Data from the Front End
The front end web application accesses the back end REST API using standard GET and POST HTTP methods. See `frontend/src/sessionService.js`

```javascript
import axios from 'axios';

const instance = axios.create();

const addNote = async (note) => {
   await instance.post('/addSessionNote', note,{
       headers: { 'Content-Type': 'text/plain' }
   });
};

const getNotes = async () => {
   const response = await instance.get('/getSessionNotes');
   return response.data;
};

const destroySession = async () => {
   await instance.post('/invalidateSession');
};
```

### 4: Build and Run the Application Locally
Navigate to the root of the project  in a command line and run the Spring Boot run command.

**Gradle**
```
./gradlew bootRun
```

 **Maven**
```
mvn spring-boot:run
``` 

>**Note:** If you do not have Tanzu GemFire running locally, you will see an exception logged of the form: `Could not connect to: localhost:40404`. The application is still able to run normally using the internal cache implementation.

The web application will be accessible at (http://localhost:8080) by default. The "Enter your note:" form can be used to enter notes. The "DESTROY SESSION" button can be used to clear the session data and delete the notes.

![img](/images/spring-boot-for-apache-geode/guides/sbdg-session-cache/screenshots/session-state-frontend.jpg)

### 5. Deploy your application on the Tanzu Application Service

&nbsp;
 
 {{% alert title="Tanzu GemFire Service Instance" color="warning" %}}
  To deploy the application to the Tanzu Application
   Service (TAS) make sure you have [created a Tanzu GemFire service instance](spring-boot-for-apache-geode/getting-started/setting-up-tgf4vms-on-tas).
 {{% /alert %}} 
 
&nbsp; 
 In the project root directory, open the `manifest.yml` file and replace  `<your-tanzu-gemfire-service>` with the name of your service instance.
 
 Once the Tanzu GemFire service instance is running (you can check the status by running the `cf services` command), push your app to TAS with `cf push`.
 
 ---

## Testing Tip
The API is tested using standard Spring Boot techniques, such as `@RunWith(SpringRunner.class`) and `MockMvc`. There are two notable items in the test class:
It autowires a `CacheManager`, and accesses it to confirm that session data is properly stored in the cache.
The tests are annotated with `@DirtiesContext` to destroy the test region between test runs and avoid test pollution.

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SessionStateApplication.class)
@AutoConfigureMockMvc
public class SessionControllerTest {
   @Autowired
   MockMvc mockMvc;

   @Autowired
   CacheManager cacheManager;

   static String NOTE1 = "Nothing More Than Memories";

...

   @Test
   @DirtiesContext
   public void addSessionNote_should_addNoteToSessionInCache() throws Exception {
       MvcResult mvcResult = mockMvc.perform(post("/addSessionNote")
               .content(NOTE1))
               .andExpect(status().isOk())
               .andReturn();

       String encodedSessionUUID = mvcResult.getResponse().getCookie("SESSION").getValue();

       List<String> notesList = getNotesForSessionInCache(encodedSessionUUID);

       assertEquals(NOTE1, (notesList.get(0)));
   }
...
```


