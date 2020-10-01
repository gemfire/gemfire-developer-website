---
title:  "Get started with Tanzu GemFire & Node.js"
link-title: "Get started with Tanzu GemFire & Node.js"

description: Create a Node.js client side application that can communicate with your Tanzu GemFire Service Instance
weight: 1
type: getting-started-guides
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

### Clone the Book Service Example
 
 Clone the [node examples](https://github.com/gemfire/node-examples) from the GemFire repository. 
 
 `$ git clone https://github.com/gemfire/node-examples.git`
 
 ### Install the Tanzu GemFire Node.js Client
 
In a terminal, change your working directory to `node-examples/book-service`, and `npm install` the Tanzu GemFire Node.js client you downloaded above, into your project directory.

```bash
$ npm install /project/gemfire-nodejs-client-2.0.0.tgz 
$ npm update
```
 
 ### Mock the TAS VCAP Services Binding
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

### Start Tanzu GemFire or Apache Geode on your machine

{{% alert title="Install GemFire or Apache Geode " color="warning" %}}
Make sure you have Tanzu GemFire or Apache Geode installed prior to doing this step, or the script will fail to run.     
{{% /alert %}} 

There are shell scripts in the `book-service/scripts` directory. The `startGemFire` script starts up two locators and two cache servers. The locators allow clients to find the cache servers. To simplify local development, the script also creates the single region that the app uses.

Start the scripts in the `node-examples/book-service` directory

**Mac and Linux**

```bash
$ ./scripts/startGemFire.sh
```

**Windows**

```bash
C:>powershell .\scripts\startGemFire.ps1
```

### Run the App Locally

With a current working directory of `node-examples/book-service`

**Mac and Linux**
```bash
$ node src/server.js
```


**Windows**
```bash
C:>node .\src\server.js
```

