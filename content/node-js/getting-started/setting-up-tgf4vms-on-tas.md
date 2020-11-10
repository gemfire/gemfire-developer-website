---
title:  "Create a Tanzu GemFire Service Instance on TAS"
link-title: "Create a Tanzu GemFire Service Instance on TAS"

description: How to create a Tanzu GemFire service instance on Taznu Application Service.
weight: 2
type: getting-started-guides
---

This guide walks you through creating a Tanzu GemFire service instance on the Tanzu Application Service.

## Option 1: Create the service instance using the cf CLI

Starting in a terminal

1. Run `cf login`, and create or target your organization’s space.

2. Run `cf marketplace -s p-cloudcache` to list your available VMware Tanzu GemFire plans. Take note of the `service plan` as this will be your `<PLAN-NAME>` in the following step. Note that Tanzu GemFire was previously called Pivotal Cloud Cache).

3. Create a Tanzu GemFire service instance within the space with the following command:
   
   `cf create-service p-cloudcache <PLAN-NAME> <SERVICE-INSTANCE-NAME>`
   
   * Replace `<PLAN-NAME>` with one the plan names from step 2.
   * Replace `<SERVICE-INSTANCE-NAME>` with your own custom name for your service instance.
    
    The `<SERVICE-INSTANCE-NAME>` can include alpha-numeric characters, hyphens, and underscores. This is also the name you will use in your `manifest.yml` to bind your client application to the service instance.
   
4.  If successful you will see 
    
    **OK**
    
    `Create in progress. Use 'cf services' or 'cf service <your-service-name>' to check operation status.`
   
5. Confirm the Tanzu GemFire service instance has been created by running  
   
   `$ cf services`
   
   This command outputs the current status of the service instance creation.  In the **last operation** column you will either see `create in progress` if it is still be created or `create succeeded` when it is ready to be used.
   
   **It can take several minutes for the service instance creation to complete.**
     
   
## Option 2: Create the service instance using Tanzu Application Service apps manager

&nbsp;

{{% alert title="Apps Manger" color="info" %}}
[Apps Manager](https://docs.run.pivotal.io/console/dev-console.html) is a user interface that must be turned on by the operator of the foundation.
{{% /alert %}} 

&nbsp;

1. Within your org, create a space or navigate to the space that will hold your Tanzu Gemfire service instance.

&nbsp;

2. Click on the **Services** tab.
    ![Services Link in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/Service_Tab_in_Apps_Manager.png)

&nbsp;

3.  Click on the **ADD A SERVICE** button.
    ![Add A Service Button in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/add_a_service_button.png)

&nbsp;

4.  Click on ***Tanzu GemFire***.
    ![Click on Tanzu GemFire in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/tanzu_gemfire_apps_manager.png)

&nbsp;

5. Choose one of the available plans and click ***SELECT PLAN***.
     ![Select A Plan in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/select_a_plan.png)

&nbsp;

6.  Fill in the **Instance Name** with a custom name for your service instance. The service instance name can include alpha-numeric characters, hyphens, and underscores. This is the name you will use in your `manifest.yml`.  (Alternatively, if you have already pushed your application to your space can select it in the "Bind to App" dropdown - however we prefer to bind our applications through a `manifest.yml` file)
    
    Click **CREATE**
    
    ![Click CREATE in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/click_CREATE_button.png)


7.  After clicking create you will see Tanzu GemFire service instance provisioning begin and in the **Last Operation** column it will say `create in progress`.
    
     ![Creat in in preogress in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/create_in_progress.png)

&nbsp;

**It can take several minutes for the service instance creation to complete.**

&nbsp;

8.  Once complete you will see `create succeeded` under the **Last Operation** column (you may need to refresh the page for the status to update).

    ![Creat succeeded in Apps Manager](images/spring-boot-for-apache-geode/getting-started/screenshots/create_succeeded.png)


 

 
 
