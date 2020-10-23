---
title:  "Get started with Tanzu GemFire & Node.js"
link-title: "Get started with Tanzu GemFire & Node.js"

description: Create a Node.js client side application that can communicate with your Tanzu GemFire Service Instance
weight: 1
type: guides
featured: false
---

To create a Node.js client side application that can communicate with your Tanzu GemFire Service Instance, you must download and install the Tanzu GemFire Node.js client library.

## Download Node.js for Tanzu GemFire

1. Go to the [Tanzu GemFire](https://network.pivotal.io/products/p-cloudcache/) product page.
2. In the "Releases" drop down, find and select the NodeJS-Client.
3. Click on the file icon to download the tar file (.tgz.).
4. Once downloaded, copy it to your project directory. Do not untar the tar file -- the npm command installs the Node.js API directly from the compressed .tgz archive.

---

## Setup Your Local Development Environment

This guide allows you to test that your local environment is set up correctly and demonstrates how Tanzu GemFire will improve the read performance of your application.  

This guide uses a Book Service example that allows a user to look up books by ISBN or put new books into the service.  

**What You'll Need**
- The [Book Service](https://github.com/gemfire/node-examples/tree/master/book-service) example
- Node.js, version 10.16.3 or above
- Tanzu GemFire or [Apache Geode](https://geode.apache.org/docs/guide/113/getting_started/installation/install_standalone.html)
- The Tanzu GemFire Node.js client

### 1. Clone the Book Service Example
 
 Clone the [node examples](https://github.com/gemfire/node-examples) from the GemFire repository. 
 
 `$ git clone https://github.com/gemfire/node-examples.git`
 
 ### 2. Install the Tanzu GemFire Node.js Client
 
In a terminal, change your working directory to `node-examples/book-service`, and `npm install` the Tanzu GemFire Node.js client you downloaded above, into your project directory.

```bash
$ npm install /project/gemfire-nodejs-client-2.0.0.tgz 
$ npm update
```
 
 ### 3. Mock the TAS VCAP Services Binding
 The local environment mocks the services binding that would exist for a TAS environment. A TAS environment injects the services binding through a `VCAP_SERVICES` environment variable. 


 Set this environment variable:

**Mac and Linux**
```bash
$ export VCAP_SERVICES='{"p-cloudcache":[{"label":"p-cloudcache","provider":null,"plan":"dev-plan","name":"pcc-dev","tags":["gemfire","cloudcache","database","pivotal"],"instance_name":"pcc-dev","binding_name":null,"credentials":{"distributed_system_id":"0","gfsh_login_string":"connect --url=https://localhost:7070/gemfire/v1 --user=super-user --password=1234567 --skip-ssl-validation","locators":["localhost[10334]"],"urls":{"gfsh":"https://localhost:7070/gemfire/v1","pulse":"https://localhost:7070/pulse"},"users":[{"password":"1234567","roles":["cluster_operator"],"username":"super-user"},{"password":"1234567","roles":["developer"],"username":"app"}],"wan":{"sender_credentials":{"active":{"password":"no-password","username":"no-user"}}}},"syslog_drain_url":null,"volume_mounts":[]}]}'
```

**Windows**
```bash
C:>set VCAP_SERVICES={"p-cloudcache":[{"label":"p-cloudcache","provider":null,"plan":"dev-plan","name":"pcc-dev","tags":["gemfire","cloudcache","database","pivotal"],"instance_name":"pcc-dev","binding_name":null,"credentials":{"distributed_system_id":"0","gfsh_login_string":"connect --url=https://localhost:7070/gemfire/v1 --user=super-user --password=1234567 --skip-ssl-validation","locators":["localhost[10334]"],"urls":{"gfsh":"https://localhost:7070/gemfire/v1","pulse":"https://localhost:7070/pulse"},"users":[{"password":"1234567","roles":["cluster_operator"],"username":"super-user"},{"password":"1234567","roles":["developer"],"username":"app"}],"wan":{"sender_credentials":{"active":{"password":"no-password","username":"no-user"}}}},"syslog_drain_url":null,"volume_mounts":[]}]}
```

### 4. Start Tanzu GemFire or Apache Geode on your machine

{{% alert title="Install GemFire or Apache Geode " color="warning" %}}
Make sure you have Tanzu GemFire or Apache Geode installed prior to doing this step, or the script will fail to run.     
{{% /alert %}} 

There are shell scripts in the `book-service/scripts` directory. The `startGemFire` script starts up two locators and two cache servers. The locators allow clients to find the cache servers. To simplify local development, the script also creates the single region that the app uses.

Start the scripts in the `node-examples/book-service` directory

**Mac and Linux**

```
$ ./scripts/startGemFire.sh
```

**Windows**

```
C:>powershell .\scripts\startGemFire.ps1
```

### 5. Run the App Locally

With a current working directory of `node-examples/book-service`

**Mac and Linux**
```
$ node src/server.js
```


**Windows**
```
C:>node .\src\server.js
```

#### Add a Book to the BookService

To add a book to the data service, use a curl command:

**Mac and Linux**

```
$ curl -X PUT \
  'http://localhost:8080/book/put?isbn=0525565329' \
  -H 'Content-Type: application/json' \
  -d '{
  "FullTitle": "The Shining",
  "ISBN": "0525565329",
  "MSRP": "9.99",
  "Publisher": "Anchor",
  "Authors": "Stephen King"
}'
```

**Windows**
```
C:>curl -X PUT  "http://localhost:8080/book/put?isbn=0525565329"  -H "Content-Type: application/json"  -d "{\"FullTitle\": \"The Shining\", \"ISBN\": \"0525565329\", \"MSRP\": \"9.99\", \"Publisher\": \"Anchor\", \"Authors\": \"Stephen King\"}"
```

#### Look Up a Book

To look up a book in the data service, use a curl command, specifying the ISBN as a key:

```
$ curl -X GET 'http://localhost:8080/book/get?isbn=0525565329'
```

### 6. Stop the App and Tear Down the GemFire Cluster

When finished running the example locally, shut down the client and server processes.
 * In the shell running `node`, use `control-C` to stop running the app.
 * Use a script to tear down the GemFire cluster. With a current working directory of `node-examples/book-service`
 
    **Mac and Linux**
 
    `$ ./scripts/shutdownGemFire.sh`
 
    **Windows**
 
    `C:>powershell .\scripts\shutdownGemFire.ps1`
 
 * Use a script to remove the directories and files containing GemFire logs created for the cluster. With a current working directory of `node-examples/book-service`:
 
    **Mac and Linux**
 
    `$ ./scripts/clearGemFireData.sh`
 
    **Windows**
 
    `C:>powershell .\scripts\clearGemFire.ps1`
 
 * Unset the `VCAP_SERVICES` environment variable to avoid interference with running other examples that would reference this environment variable if it continues to exist.
 
    **Mac and Linux**
 
    `$ unset VCAP_SERVICES`
 
 
    **Windows**
 
    `C:>set VCAP_SERVICES=""`
 
 ## Run the application on the Tanzu Application Service
 
  To deploy the Book Service application to Tanzu Application
   Service (TAS) make sure you have created a Tanzu GemFire service instance.
   
### 1. Create a Tanzu GemFire Service Key

In order to connect to your Tanzu GemFire service instance and create the needed regions, you must first create a service key. 

* Create a service key

    `$ cf create-service-key [YOUR-SERVICE INSTANCE-NAME] [SERVICE-NAME-service-key]`

* Output the service key:

    `$ cf service-key [YOUR-SERVICE INSTANCE-NAME] [SERVICE-NAME-service-key]`

* Copy the gfsh connect command labeled as `gfsh_login_string`. It will look something like this:

    `connect --url=https://TAS-name.cf-app.com/gemfire/v1 --user=cluster_operator_XXX --password=YYY --skip-ssl-validation`
   
### 2. Create the Region Used by the Book Service

Start the Tanzu GemFire CLI by typing `gfsh` in your terminal.

With `gfsh` running, Use the connect string from above to connect to the Tanzu GemFire service instance. Use the `return` key when prompted for the keystore and truststore values (in this example you don't need to enter any information in them).

```
gfsh>connect --url=https://TAS-name.cf-app.com/gemfire/v1 --user=cluster_operator_BhKM --password=xucZ --skip-ssl-validation
 key-store:
 key-store-password:
 key-store-type(default: JKS):
 trust-store:
 trust-store-password:
 trust-store-type(default: JKS):
 ssl-ciphers(default: any):
 ssl-protocols(default: any):
 ssl-enabled-components(default: all):
 Successfully connected to: GemFire Manager HTTP service @ https://TAS-name.cf-app.com/gemfire/v1
```

Once connected, create the region that the Book Service expects to find.

```
gfsh>create region --name=test --type=PARTITION
                 Member                      | Status | Message
    ---------------------------------------- | ------ | ------------------------------------------------
    cacheserver-a75d6fcc                     | OK     | Region "/test" created on "cacheserver-a75d6fcc"

    Cluster configuration for group 'cluster' is updated.
```

Type `exit` to quit GFSH.

### 3. Run the App on TAS with Tanzu GemFire

In the project root directory, open the manifest.yml file and replace `PCC-TLS` with the name of your service instance.

With the Tanzu GemFire service instance running (you can check the status by running the `cf services` command), push your app to TAS with `cf push`.

#### Add a Book to the Book Service

Once the BookService app is running, you can now interact with it in the same way as you did locally.

To add a book to the data service, use a curl command similar to the one used when running with a local cluster, specifying the app route assigned in the `cf push` step.

**Mac and Linux**
```
$ curl -X PUT \
  'https://TAS-name.cf-app.com/book/put?isbn=0525565329' \
  -H 'Content-Type: application/json' \
  -d '{
  "FullTitle": "The Shining",
  "ISBN": "0525565329",
  "MSRP": "9.99",
  "Publisher": "Anchor",
  "Authors": "Stephen King"
}'
```

**Windows**
```
$ curl -X PUT "https://cloudcache-node-sample.apps.tas-name.cf-app.com/book/put?isbn=0525565329" -H "Content-Type: application/json" -d "{\"FullTitle\": \"The Shining\", \"ISBN\": \"0525565329\", \"MSRP\": \"9.99\", \"Publisher\": \"Anchor\", \"Authors\": \"Stephen King\"}"
```

The curl command responds with a confirmation: 

    `{"initialized":true}`
    
#### Look Up a Book
To look up a book in the data service, use a curl command similar to the one used when running with a local cluster, specifying the ISBN as a key:

    `$ curl -X GET \'https://cloudcache-node-sample.apps.tas-name.cf-app.com/book/get?isbn=0525565329'`
    
The curl command responds with the requested data:
`{"FullTitle":"The Shining","ISBN":"0525565329","MSRP":"9.99","Publisher":"Anchor","Authors":"Stephen King"}`


