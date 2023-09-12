---

title: Getting Started Off Platform with VMware GemFire for Kubernetes
date: '2022-08-15'
description: How to set up off platform with a VMware GemFire instance on Kubernetes.
lastmod: '2022-08-15'
link-title: Getting Started Off Platform with VMware GemFire for Kubernetes
parent: Spring for VMware GemFire
type: tutorials
icon: spring
weight: 
aliases:
    - get-started-off-platform-tgf4k8s-sbdg/
---

This guide walks you through creating and testing a VMware GemFire cluster on Kubernetes using a *Hello, World!* client application connecting off platform


## Before you start!
This guide assumes that the [VMware GemFire Operator](https://docs.vmware.com/en/VMware-GemFire-for-Kubernetes/2.0/gf-k8s/install.html), **contour** and a **cert-manager** have been installed in your Kubernetes cluster. 

In order to create a GemFire cluster, you will need a [Tanzu Net](https://network.tanzu.vmware.com/products/tanzu-gemfire-for-kubernetes/) account, in order to pull the GemFire image from the registry. 

You will also need permission to use `kubectl`. 
 

## Create A VMware GemFire Cluster

1. Verify that you are in the Kubernetes cluster you want to use for VMware GemFire

    ```
    kubectl config current-context
    ```
   
   
2. Create a namespace for the VMware GemFire cluster (We use the creative *namespace* name of `gemfire-cluster` for this example)
    
    ```
    kubectl create namespace gemfire-cluster
    ```
   
   
3. Create an image pull secret that will be used to pull down the VMware GemFire images needed to create the cluster

    ```
    $ kubectl create secret docker-registry image-pull-secret --namespace=gemfire-cluster --docker-server=registry.tanzu.vmware.com --docker-username='TANZU NET USERNAME' --docker-password='TANZU NET PASSWD'
    ```  
     
   * Replace `--namepsace=gemfire-cluster` with the name of your namespace, if different.
   * Replace `--docker-username='TANZU NET USERNAME'` with your Tanzu Net Username
   * Replace `--docker-password='TANZU NET PASSWD'` with your Tanzu Net Password
     
4. Create a Gateway and Gateway Class for your VMware GemFire Cluster.  
   ```yaml
    ---
    apiVersion: gateway.networking.k8s.io/v1beta1
    kind: GatewayClass
    metadata:
      name: my-contour-gateway-class
    spec:
      controllerName: projectcontour.io/gateway-controller

    ---
    apiVersion: gateway.networking.k8s.io/v1beta1
    kind: Gateway
    metadata:
      name: hello-world-cluster-gateway
    spec:
      gatewayClassName: my-contour-gateway-class
    listeners:
     - name: my-gateway-listener
       protocol: TLS
       port: 9000
       tls:
         mode: Passthrough
     ```
   
5. Apply the Gateway and Gateway class
   ```
   kubectl apply -f GATEWAY-CRD-YAML
   ```
* Replace `GATEWAY-CRD-YAML` with the name of the yaml file you created in Step 4. 


6. Create your VMware GemFire CRD file. 
    
    Below is a simple yaml file that will create a VMware GemFire cluster named `hello-world-gemfire-cluster` with 1 [locator](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/configuring-running-running_the_locator.html) and 2 [servers](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/configuring-running-running_the_cacheserver.html), with TLS turned off. Save this as a YAML file in your current working directory.
    
      ```yaml
      apiVersion: gemfire.vmware.com/v1
      kind: GemFireCluster
      metadata:
        name: hello-world-gemfire-cluster
      spec:
        image: registry.tanzu.vmware.com/pivotal-gemfire/vmware-gemfire:9.15.3
        ingress:
          gatewayName: hello-world-cluster-gateway
      ```

        
> For the full list of GemFire CRD configuration options and explanations check out the VMware GemFire [Customer Resource Definition template](https://docs.vmware.com/en/VMware-GemFire-for-Kubernetes/2.0/gf-k8s/crd.html).
    
   
7. Apply your VMware GemFire CRD YAML from *Step 4* to create the VMware GemFire cluster

    ```
    kubectl -n gemfire-cluster apply -f CLUSTER-CRD-YAML
    ``` 
    * Replace `-n gemfire-cluster` with the name of your namespace, if it's different.
    * Replace `CLUSTER-CRD-YAML` with the name of the yaml file you created in Step 6. 
   

8. If successful you should see in your terminal

    `gemfirecluster.gemfire.vmware.com/hello-world-gemfire-cluster created`      


9. Confirm that VMware GemFire is up and ready to use
    
    ```
    kubectl -n gemfire-cluster get GemFireClusters
    ```
   * Replace `-n gemfire-cluster` with the name of your namespace, if it's different.
   
   When the cluster is ready to use the output should look similar to
    
    ```
    NAME                          LOCATORS   SERVERS   CLUSTER IMAGE                                                     OPERATOR VERSION
    hello-world-gemfire-cluster   1/1        2/2       registry.tanzu.vmware.com/pivotal-gemfire/vmware-gemfire:9.15.3   2.0.0-build.73
    ```
   Where the `NAME` will be the value you have for the `name` entry in your CRD file from *Step 4* . 
        
10. Obtain Gateway IP Address from the Gateway that was created
    ```
    kubectl get gateways -n gemfire-cluster
    ```
    
The output will look similar to the following:

   ```
    NAME         CLASS                      ADDRESS         PROGRAMMED   AGE
    my-gateway   my-contour-gateway-class   35.192.190.183   True         41s
   ```

The address may be empty and take a few minutes to be assigned. Rerun the command until the address appears.

---

## Run a Spring Boot for VMware GemFire app

This section will guide you through testing a *Hello, World!* client application, that utilizes Spring Boot for VMware GemFire.

### What You'll Need

* The [Hello, World!](https://github.com/gemfire/spring-for-gemfire-examples/tree/main/hello-world) example
* JDK 8, 11, or 17. JDK 17 is required to use Spring Boot 3.0 or higher.
* Spring Boot 2.6 or above
* [Spring Boot for VMware GemFire](https://docs.vmware.com/en/Spring-Boot-for-VMware-GemFire/index.html) 
* VMware GemFire for Kubernetes 2.0+
* [A Pivotal Commercial Maven Repo account (free)](https://commercial-repo.pivotal.io/login/auth)


###  1. Download the Hello, World! Example

Clone the Hello, World! app from the [examples repo](https://github.com/gemfire/spring-for-gemfire-examples). 

```
$ git clone https://github.com/gemfire/spring-for-gemfire-examples.git
```

### 2. Edit the `gradle.properties` File
* Navigate to the `spring-for-gemfire-examples/hello-world` directory
* Open the `gradle.properties`
* Replace the value for `gemfireRepoUsername=` with your Commercial Maven Repo Username
* Replace the value for `gemfireRepoPassword` with your Commercial Maven Repo Password

### 3. Edit the `application.properties` File 

* Navigate to the `spring-for-gemfire-examples/hello-world` directory
* Open the `application.properties` in src/main/resources
* Uncomment the two listed properties
* Replace the value for `spring.data.gemfire.pool.locators:` with your VMware GemFire cluster information, for each locator (in this example we only have one locator).  The information will follow the form:

   ```
   [GEMFIRE-CLUSTER-NAME]-locator-[LOCATOR-NUMBER].[GEMFIRE-CLUSTER-NAME]-locator.[NAMESPACE-NAME].svc.cluster.local[10334]
   ```
    For our example the value looks like this:

    ```
    spring.data.gemfire.pool.locators: hello-world-gemfire-cluster-locator-0.hello-world-gemfire-cluster-locator.gemfire-cluster.svc.cluster.local[10334]
    ```

  
* Replace the value for `spring.data.gemfire.management.http.host:` with your VMware GemFire cluster information.  This will allow Spring Boot for VMware GemFire to push your initial cluster configuration to GemFire.  The information follows a similar form as above:

   ```
   [GEMFIRE-CLUSTER-NAME]-locator-[LOCATOR-NUMBER].[GEMFIRE-CLUSTER-NAME]-locator.[NAMESPACE-NAME].svc.cluster.local
   ```
    For our example the value looks like this:
    
     ```
      spring.data.gemfire.management.http.host: hello-world-gemfire-cluster-locator-0.hello-world-gemfire-cluster-locator.gemfire-cluster.svc.cluster.local
     ```
  
* Pull down certificates from the GemFire Cluster
  ```
  mkdir certs
  kubectl get secret -n gemfire-cluster hello-world-gemfire-cluster-cert -o=jsonpath='{.data.password}' | base64 --decode > ./certs/password
  kubectl get secret -n gemfire-cluster hello-world-gemfire-cluster-cert -o=jsonpath='{.data.keystore\.p12}' | base64 --decode > ./certs/keystore.p12
  kubectl get secret -n gemfire-cluster hello-world-gemfire-cluster-cert -o=jsonpath='{.data.truststore\.p12}' | base64 --decode > ./certs/truststore.p12
  ```

* Add and modify ssl configuration for the client application.properties

  Replace `thePassword` with the string value found in password file created in the certs directory from the previous step
  ```
  spring.data.gemfire.security.ssl.keystore = /absolute/file/system/path/to/keystore.jks
  spring.data.gemfire.security.ssl.keystore.password = thePassword
  spring.data.gemfire.security.ssl.truststore = /absolute/file/system/path/to/truststore.jks
  spring.data.gemfire.security.ssl.truststore.password = thePassword
  ```

* Configure a SNI Proxy Socket Factory for the Hello World Application

Add the following property to the application.properties file.  The name of the bean can be replaced by a value of your choosing
  
   ```
    spring.data.gemfire.pool.socket-factory-bean-name=myProxySocketFactory
   ```

* Create the Proxy Socket Factory Bean in the Hello World Application
Now that the socket factory bean has been configured, a corresponding bean needs to be created.  A simple way to do this is to modify the HelloWorldApplication.java and insert the following lines
* Note the ip address will need to be modified to match the Gateway IP address found in the steps above.

  ```
  @Bean
  SocketFactory myProxySocketFactory() {
   return ProxySocketFactories.sni("34.71.205.43", 9000);
  }
  ```

### Remove unused Annotations in the Hello World Application 
Remove the cluster aware annotation so that it won't connect to a local cluster
Delete the following from HelloWorldApplication.java

  ```
  @EnableClusterAware  <-Remove this annotation
  ```


### 5. Deploy the Hello World Application 
* In a terminal, navigate to the `hello-world` directory
* Build the application with `./gradlew clean bootRun`


### 6.  Access the Hello, World! Application
Now that the application is running locally, you can access the application by using your local browser.  Navigate to `localhost:8080`
 
You should see something similar to this, which represents an artificial time delay simulating a database query.
 
> key: hello
>
>value: 2019-10-01T16:17:51.557 (this will be your current date & time)
>
>time to look up: 3057ms (quantity of time that it took to acquire the key-value pair).  


**Refresh the page** and you should see something similar to

> key: hello
>
>value: 2019-10-01T16:17:51.557 (this will be your current date & time)
>
>time to look up: 6ms (quantity of time that it took to acquire the key-value pair).

Note that the ***time to look up*** has been significantly reduced. This represents the app getting the information from the cache, VMware GemFire, instead of querying the database.


### 7.  Confirm that the Hello, World! App is connected
If you would like to confirm that your Hello World! app is connected to your VMware GemFire cluster you can connect through the VMware GemFire shell - commonly referred to as *gfsh*

In a terminal

* Start gfsh for kubernetes
    ```
    kubectl -n gemfire-cluster exec -it hello-world-gemfire-cluster-locator-0 -- gfsh
    ```  

  * Replace `-n gemfire-cluster` with the name of your namespace, if it's different.
 

* Once you see that `GFSH` has started, connect to your cluster with the `connect` command

    ```
    connect --locator=hello-world-gemfire-cluster-locator-0.hello-world-gemfire-cluster-locator.gemfire-cluster.svc.cluster.local[10334] --security-properties-file=/security/gfsecurity.properties
    ``` 
* Once connected run the `list regions` command

    ```
    list regions
    ``` 

You should see something similar to

  ```
    List of regions
    ------------------
    Hello
  ```

* Confirm the web page timestamp has the same value as that stored in your *Hello* region. Run the *gfsh* command

    ``
    get --key hello --region=/Hello
    ``
    
You should see something similar to this, where the "Value" listed in your terminal should match the "value" shown on the web page. 
    
   **Response from the gfsh command**
   
   ```
    Result      : true
    Key Class   : java.lang.String
    Key         : hello
    Value Class : java.lang.String
    Value       : "2022-11-17T19:22:30.894"
   ```
    
   **Shown on the Webpage**
   
   ```
    key: hello
    value: 2022-11-17T19:22:30.894
    time to look up: 2ms
   ```

**Congratulations! You’re ready to start using VMware GemFire for Kubernetes.**

---


## Delete the Hello, World! app

To delete the *Hello, World!* app you will need to delete the deployment and the service.  

This will remove the *Hello, World!* deployment, replicaset, and pod.

```
kubectl -n gemfire-cluster delete deployment hello-world-deployment
```

This will remove the *Hello, World!* service.

```
kubectl -n gemfire-cluster delete service hello-world-deployment
```

---

## Delete the VMware GemFire Cluster

If you need to delete your VMware GemFire cluster, first remove the cluster

  ```
  kubectl -n gemfire-cluster delete GemFireCluster hello-world-gemfire-cluster
  ```
   * Replace `-n gemfire-cluster` with your namespace if different.
   * Replace `hello-world-gemfire-cluster` with the name of your GemFire instance if different.       

When the VMware GemFire cluster has been completely deleted, remove the persistent volume claims of the Kubernetes cluster. These are disk claims that Kubernetes makes on the underlying system. 

   ```
    kubectl -n gemfire-cluster get persistentvolumeclaims
   ```
    
   * Replace `-n gemfire-cluster` with your namespace if different.

To delete all the persistent volume claim listed, run the following command

   ```
    kubectl delete pvc -n gemfire-cluster --all
   ```
   * Replace `-n gemfire-cluster` with your namespace if different.
   
---

 ## Learn More
 
 Now that you have successfully created a running VMware GemFire cluster on Kubernetes, check out some other guides.
  
 * Create an application that utilizes Spring Boot for VMware GemFire and Spring Session for [session state caching](/tutorials/spring-for-gemfire/session-state-cache-sbgf).