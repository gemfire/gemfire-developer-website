---
title: Introducing Spring Cloud Data Flow for GemFire
date: 2024-02-16
lastmod: '2024-02-16'
team:
- Udo Kohlmeyer
type: blog 
description: Announcing the release of Spring Cloud Data Flow for GemFire! This article provides basic examples demonstrating how to use the Spring Cloud Data Flow for GemFire libraries with a Spring Cloud Data Flow server.
---

The release of [Spring Cloud Data Flow for GemFire](https://github.com/gemfire/spring-cloud-data-flow-for-vmware-gemfire) and [Spring Integration for GemFire](https://github.com/gemfire/spring-integration-for-vmware-gemfire) marks another milestone for [VMware GemFire's](https://tanzu.vmware.com/gemfire) integration with the [Spring](https://spring.io/) ecosystem. Joining the existing projects, [Spring Data for GemFire](https://github.com/gemfire/spring-data-for-vmware-gemfire), [Spring Session for GemFire](https://github.com/gemfire/spring-session-for-vmware-gemfire), and [Spring Boot for GemFire](https://github.com/gemfire/spring-boot-for-vmware-gemfire), to provide seamless integration of GemFire with Spring.

In this blog a quick overview of [Spring Cloud DataFlow](https://spring.io/projects/spring-cloud-dataflow) (SCDF) and [Spring Cloud Stream Applications](https://spring.io/projects/spring-cloud-stream-applications) are provided, followed by simple examples for Spring Cloud Data Flow for GemFire and how they can be used. For further information about Spring Cloud Data Flow or Spring Cloud Stream Applications, follow the links provided.

## What is Spring Cloud DataFlow?
Spring Cloud Data Flow(SCDF) is a micro-service-based stream and batch processing system. Some of the use cases it supports include extract, transform, and load (ETL), import-export, event streaming and predictive analytics.

In event streaming there are 3 main components:
* Suppliers - supplies data
* Processors - processes input data from one form and outputs processed data.
* Consumers - consumes data

Event streams are also known as pipelines within SCDF. In the simplest example, streams generally consist of a supplier, zero or more processors and a consumer. There are many different stream patterns, like [fan-in or fan-out](https://dataflow.spring.io/docs/feature-guides/streams/fanin-fanout/), which are explained better in the SCDF [documentation](https://dataflow.spring.io/docs/feature-guides/streams/).

Using SCDF vernacular, “suppliers” are “sources” and “consumers” are “sinks”. Source, processors and sinks are connected using connectors, which are known as “Binders”. Binders are “point-to-point” meaning  SCDF provides 2 binders out of the box, [Apache Kafka](https://kafka.apache.org/) and [RabbitMQ](https://www.rabbitmq.com/), other binders can be found [here](https://dataflow.spring.io/docs/concepts/streams/). 

## Spring Cloud Data Flow for VMware GemFire

Spring Cloud Data Flow for GemFire (SCDFGF) is an implementation that is specifically targeted at the event streaming use case, within the SCDF system. SCDFGF provides implementations for both a “source” and “sink”, for GemFire. Leveraging GemFire’s [Continuous Queries](https://docs.vmware.com/en/VMware-GemFire/10.1/gf/developing-continuous_querying-chapter_overview.html) and [Subscription](https://docs.vmware.com/en/VMware-GemFire/10.1/gf/developing-events-tune_client_server_event_messaging.html) for the “source” implementation. SCDFGF also provides bindings for both RabbitMQ and Kafka.

Spring Cloud Data Flow for GemFire has released four artifacts compatible with SCDF versions 2.10.x and 2.11.x:

* GemFire Source Rabbit : 1.0.0
* GemFire Source Kafka : 1.0.0
* GemFire Sink Rabbit : 1.0.0
* GemFire Sink Kafka : 1.0.0

These artifacts are available in both the GemFire Commercial Maven Repository and Docker Hub. Details on how to access and install these artifacts can be found in the [Spring Cloud Data Flow for GemFire](https://gemfire.dev/documentation/spring/spring_cloud_data_flow_for_gemfire.pdf) documentation.

The following examples showcase both the GemFire Source and GemFire Sink applications for Spring Cloud Data Flow.

---

## Prerequisites 
In order to run the examples, a Spring Cloud Data Flow (SCDF) environment and GemFire cluster are required.

### Setup Spring Cloud Data Flow Server
- To install an SCDF environment follow the “[Installation Guide](https://dataflow.spring.io/docs/installation/)” for SCDF. For this example **RabbitMQ** will be used as the messaging connector (as per the [instructions](https://dataflow.spring.io/docs/installation/local/manual/#install-messaging-middleware)). RabbitMQ must be running in order these examples to work properly.

- Once you have started the [server](https://dataflow.spring.io/docs/installation/local/manual/#dataflow), [skipper](https://dataflow.spring.io/docs/installation/local/manual/#skipper) and RabbitMQ, open a browser and navigate to the [SCDF application home](http://localhost:9393/dashboard).

- Click on "Applications" in the left menu. Then click "Add Application(s)". 
- In the "Import application starters from dataflow.spring.io" select the starters for the messaging connector being used. For this example we used the **Stream application starters for RabbitMQ/Maven**.  This will then install a set of out-of-the-box applications, some of which are needed for the following examples.   

### Add the GemFire Sink and Source Applications for RabbitMQ

To run the Spring Cloud Data Flow for GemFire (SCDFGF) examples, one also needs to add the relevant source and sink applications for GemFire. For this example, we will be using the RabbitMQ sink and source artifacts.

**There are two methods to deploy the artifacts** into the Spring Cloud Dataflow Server: using the images from Docker Hub or download the artifacts from the Pivotal Commercial Maven repository.

#### Add GemFire Sink RabbitMQ Application

**Docker Hub Images**

1. Log in to your Spring Cloud Dataflow Server.
2. Add the Application using the **Add Application** button.
3. Select the first option **Register one or more applications**.
4. Add a name in the `Name` field - for example `gemfire`, or `gemfire-sink-rabbit`. 
5. For `Type`, select `sink`.
6. For `Spring Boot version`, select the appropriate version.
7. For `URI`, enter ` docker://docker.io/gemfire/gemfire-sink-rabbit:1.0.0`
8. Click **Import Application** to import the GemFire Sink for Rabbit Stream Application.

**Commercial Maven Repository Artifacts**

1. In a browser, navigate to the [Pivotal Commercial Maven Repository](https://commercial-repo.pivotal.io/login/auth).

2. Click the **Create Account** link.

3. Complete the information in the registration page.

4. Once you have a Pivotal Commercial Maven Repository account created, you can now download the GemFire Sink Rabbit artifact (replace `{commercialMavenRepoUsername}` with your commercial maven repo username/email):

   `wget https://commercial-repo.pivotal.io/data3/gemfire-release-repo/gemfire/com/vmware/gemfire/spring/cloud/stream/app/gemfire-sink-rabbit/1.0.0/gemfire-sink-rabbit-1.0.0.jar --user {commercialMavenRepoUsername} --ask-password`

5. Log in to your Spring Cloud Dataflow Server.
6. Add the Application using the **Add Application** button.
7. Select the third option, **Import application coordinates from properties file**.
8. Add the `sink` properties, replacing `{artifactFileName}` with the location of the downloaded artifacts from step 2. You can change the application name (`gemfire`) as needed. 

   ```
   sink.gemfire=file://{artifactFileName}
   ```
9. Click **Import Application** to import the GemFire Sink for Rabbit Stream Application. It may a take a minute for this application to appear in the SCDF Applications list.

#### Add GemFire Source RabbitMQ Application

**Docker Hub Images**

1. Log in to your Spring Cloud Dataflow Server.
2. Add the Application using the **Add Application** button.
3. Select the first option **Register one or more applications**.
4. Add a name in the `Name` field - - for example `gemfire`, or `gemfire-source-rabbit`.
5. For `Type`, select `source`.
6. For `Spring Boot version`, select the appropriate version.
7. For `URI`, enter ` docker://docker.io/gemfire/gemfire-source-rabbit:1.0.0`
8. Click **Import Application** to import the GemFire Source for Rabbit Stream Application.

**Commercial Maven Repository Artifacts**

1. This assumes you have created a Pivotal Commercial Maven Repository when installing the GemFire Sink for RabbitMQ application in the previous section.
2. Download the GemFire Source Rabbit artifact (replace `{commercialMavenRepoUsername}` with your commercial maven repo username/email):

   `wget https://commercial-repo.pivotal.io/data3/gemfire-release-repo/gemfire/com/vmware/gemfire/spring/cloud/stream/app/gemfire-source-rabbit/1.0.0/gemfire-source-rabbit-1.0.0.jar --user {commercialMavenRepoUsername} --ask-password`

3. Log in to your Spring Cloud Dataflow Server.
4. Add the Application using the **Add Application** button.
5. Select the third option, **Import application coordinates from properties file**.
6. Add the `source` properties, replacing `{artifactFileName}` with the location of the downloaded artifacts from step 2. You can change the application name (`gemfire`) as needed.

   ```
   source.gemfire=file://{artifactFileName}
   ```

7. Click **Import Application** to import the GemFire Source for Rabbit Stream Application.

> See the [Spring Cloud Data Flow for GemFire documentation](https://gemfire.dev/documentation/spring/spring_cloud_data_flow_for_gemfire.pdf) for additional detailed installation instructions or to install the GemFire sink and source applications for Kafka.

### Setup GemFire Environment
For these examples a GemFire environment is required.

- Download the latest GemFire from [Tanzu Network](https://network.tanzu.vmware.com/products/pivotal-gemfire)
- Extract the GemFire archive to known location
- Navigate to the installation folder for GemFire
- Run Gfsh in the bin directory, by either running `gfsh.sh` or `gfsh.bat` (depending on Windows or Linux/MacOS)
- Start a Locator by running the following gfsh command: `start locator --name=locator1`
- Start a Server by running the following gfsh command: `start server --name=server1`
- Note the **host / IP address and the port** of the locator. These will be used when creating the Streams.
- Create a GemFire data region, “Stocks” using the gfsh command:
   ```
    create region --name=Stocks --type=REPLICATE`.
  ```

---

## Examples

Below are two examples:
1. GemFire as a Sink. Receiving data from an HTTP REST endpoint and writing to GemFire. A pipeline will be set up with an “http” source, taking a stock quote and writing the quote into a GemFire region.
2. GemFire as a Source. Receiving data from GemFire and writing it to a file. A pipeline will be set up monitoring a “Stocks” region, using a GemFire CQ. Any stock orders over 1000 will be written to a file.


### GemFire Sink
This example requires the [Prerequisite](#prerequisites) section to have been completed.

1. In the terminal running the GemFire shell (GFSH), confirm that you have the required region, "Stocks",  using the gfsh command:
`list regions`. You should see a region named `Stocks` listed. If not, confirm that you have GemFire running using the steps above.

2. In the [Spring Cloud Data Flow dashboard](http://localhost:9393/dashboard), create a SCDF stream that will take an HTTP request and put it into the GemFire data Region “Stocks”.

    In the toolbar on the left, select “Streams”. You should now be able to create a new stream.

   ![Spring Cloud Data Flow - create streams image](images/scdf_create_stream.png)    
    

3. Click on “Create Stream(s)” and add the following line to the top text box.
   ```
   http --port=9098 | gemfire --region-name=Stocks --key-expression=payload.getField('symbol') --json=true --gemfire.pool.host-addresses=GemFire_host/IP_address:port --spring.rabbitmq.host=RabbitMQ_host/IP_address
   ```
   - You can change the port from `9098` to another port as needed.
   - If you've customized the application name, ensure that you update the `gemfire` name accordingly.
   - Substitute the host/IP address and port with the GemFire locator details from your GemFire cluster. 
   - Update the host/IP address of the RabbitMQ instance with the information corresponding to your currently running RabbitMQ instance.
  
4. Click on the “Create Stream(s)” button. A popup will now prompt for a name for the stream, enter `gemfire-stocks`. Click "Create the Stream(s)". Once created, the “Streams” screen should now display the newly created stream, named `gemfire-stocks`.  Note that the *Status* is “Undeployed”.

   ![Newly created Stream - gemfire-stocks](images/scdf_http_stream_created.png)

   
5. Now the stream needs to be deployed. This can be done by clicking the stream name. Then and click the button `Deploy Stream`. This will take you to another screen that allows you to confirm the properties are set as expected. Click `Deploy the Stream` button on the bottom.

6. Once successfully deployed, open a terminal and the run the following curl command
   ```
   curl -d '{"symbol":"AVGO","price":1265.23}' -H "Content-Type: application/json" -X POST http://localhost:9098
   ``` 

   This will post a json document to the stream deployed http source, hosted on port 9098.

7. To see if the result was correctly processed, use the following gfsh command to see if the data was put into the GemFire data region “Stocks” 

   ```
   query --query="select * from /Stocks"
   ```
   
   ![Terminal window with query and output of query](images/gfsh_stocks_query.png)


### GemFire Source
This example requires the [Prerequisites](#prerequisites) and [GemFire Sink](#gemfire-sink) example to have been completed.

1. In the SCDF web dashboard, navigate to the “Streams” screen.

2. On the toolbar on the left, select “Streams”. One should now be able to create a new stream.

   ![Streams screen](images/scdf_create_stream.png)
 
3. Click on “Create Stream(s)”. On the “Create Stream(s)” screen, add the following line to the top text box.
   ```
   gemfire --region-name=Stocks --query='SELECT * from /Stocks s where s.price > 999' --cq-event-expression=getNewValue().toString() --subscription-enabled=true --connect-type=locator --json=true --gemfire.pool.host-addresses=GemFire_host/IP_address:port | file --directory=/tmp --name=gemfirecq.txt
   ```
   - Substitute the host/IP address and port with the GemFire locator details from your GemFire cluster.



4. Click on the “Create Stream(s)” button. A popup will now prompt for a name for the stream, `gemfire-orders`. Once created, the “Streams” screen should now display the newly created stream.

5. Now the stream needs to be deployed. This can be done by clicking the stream name. Then and click the button `Deploy Stream`. This will take you to another screen that allows you to confirm the properties are set as expected. Click `Deploy the Stream` button on the bottom.

This will now create a stream which creates a GemFire CQ against the “Stocks” region. The CQ will trigger when the value for a stock exceeds a price of 1000. That stock will then be written to a file, `gemfire-cq.txt`, in the `/tmp` directory.

### Run the Examples
1. Run the following command which should write an entry to the file.
   ```
   curl -d '{"symbol":"AVGO","price":1265.23}' -H "Content-Type: application/json" -X POST http://localhost:9098
   ```
2. Check the file by running the following command in the terminal
   ```
   cat /tmp/gemfirecq.txt
   ``` 
   You should see the following entry.   

      ![Image of a terminal window the output of the file showing 1 entry](images/cat_gemfirecq.png)

3. Run the following command which should **NOT** write an entry to the file.
   ```
   `curl -d '{"symbol":"AVGO","price":265.23}' -H "Content-Type: application/json" -X POST http://localhost:9098
   ```
4. Confirm that the entry was NOT written to the file by running the 
   ```
   cat /tmp/gemfirecq.txt
   ```
5. Now, run the following command again, with a different price, which should write an entry to the file. 
   ```
   curl -d '{"symbol":"AVGO","price":1365.23}' -H "Content-Type: application/json" -X POST http://localhost:9098
   ```
6. Check the file again and you should see two entries:
   ```
   cat /tmp/gemfirecq.txt
   ``` 

   ![Image of a terminal window the output of the file now showing 2 entries](images/cat_updated_gemfirecq.png)


## Conclusion
Through these Spring Cloud Data Flow for GemFire (SCDFGF) examples, we showcased scenarios such as utilizing GemFire to receive data from HTTP REST endpoints and writing to GemFire, as well as monitoring GemFire data for specific conditions and writing the results to a file. These practical demonstrations underscore the versatility and applicability of GemFire within the Spring ecosystem for diverse business needs.

This seamless integration of GemFire within Spring Cloud Data Flow can empower a multitude of real-world applications across various industries: GemFire can facilitate high-frequency trading platforms, accelerate medical data analysis for faster diagnoses, optimize network performance and customer experience, and even enable real-time sports analytic insights for coaches and analysts. These examples underscore GemFire's versatility in driving efficiency and innovation across diverse business sectors within the Spring ecosystem.
