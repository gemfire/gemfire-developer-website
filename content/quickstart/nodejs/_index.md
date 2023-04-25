---
title: Node.js Quick Start
weight: 3
icon: nodejs
topics:
- Node.js
---


This quick start will help you get started using VMware GemFire and the VMware GemFire node.js client, with a small `Book Service` example.

## Install VMware GemFire for Local Development

Download and install VMware GemFire from [Tanzu Network](https://network.tanzu.vmware.com/products/pivotal-gemfire/). Follow the installation instructions in the [GemFire documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-installation-install_intro.html).


## Setup Your Local Development Environment

This guide uses a `Book Service` example that allows a user to look up books by ISBN or put new books into the service.


### What You'll Need
* The [Book Service](https://github.com/gemfire/node-examples/tree/master/book-service) example
* Node.js, version 10.16.3 or above
* The VMware GemFire Node.js client
* A running GemFire cluster

### 1. Clone the Book Service Example

Clone the [node examples](https://github.com/gemfire/node-examples) from the GemFire Node Examples repository.

`$ git clone https://github.com/gemfire/node-examples.git`


### 2. Download Node.js for VMware GemFire
To run the `Book Service` example, you must download and install the VMware GemFire Node.js client library.

* Go to the [VMware GemFire](https://network.pivotal.io/products/p-cloudcache/) product page.
* In the "Releases" drop down, find and select the NodeJS-Client.
* Click on the file icon to download the tar file (.tgz).
* Once downloaded, copy it to your `Book Service` project directory. Do not untar the tar file -- the npm command installs the Node.js API directly from the compressed .tgz archive.

### 3. Install the VMware GemFire Node.js Client

In a terminal, change your working directory to `node-examples/book-service`, and `npm install` the VMware GemFire Node.js client you downloaded above, into your project directory.

```bash
$ npm install /project/gemfire-nodejs-client-2.0.0.tgz 
$ npm update
```


### 4. Start a GemFire Cluster

{{% alert title="Required" color="info" %}}
Make sure that you have GemFire installed on your machine before proceeding.
{{% /alert %}}

There are shell scripts in the `book-service/scripts` directory. The `startGemFire` script starts up two locators and two cache servers. The locators allow clients to find the cache servers. To simplify local development, the script also creates the single region (analogous to a table in a relational database) that the app uses.

Start the scripts in the `node-examples/book-service` directory

**Mac and Linux**

```
$ ./scripts/startGemFire.sh
```

**Windows**

```
C:>powershell .\scripts\startGemFire.ps1
```

### 6. Run the App Locally

With a current working directory of `node-examples/book-service`

**Mac and Linux**
```
$ node src/server.js
```


**Windows**
```
C:>node .\src\server.js
```
&nbsp;

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
&nbsp;

#### Look Up a Book

To look up a book in the data service, use a curl command, specifying the ISBN as a key:

```
$ curl -X GET 'http://localhost:8080/book/get?isbn=0525565329'
```
&nbsp;

## Stop the App and Tear Down the GemFire Cluster

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


