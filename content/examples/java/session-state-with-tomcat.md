---
title: Session State Management with Tomcat
date: '2023-04-03'
lastmod: '2023-04-03'
repo: https://github.com/gemfire/gemfire-examples/blob/main/feature-examples/sessionState
tags:
- Java
type: examples
description: This example demonstrates how to set-up and use VMware GemFire's Session Management Module for Tomcat.
---

This example assumes you have GemFire and Java installed. It also assumes you have local copy of Tomcat Downloaded.
It was designed and tested with GemFire 1.9.0 and Tomcat 9, and while the session features will work with other combinations
you may need to make some changes to the setup if you're using other versions. For more information about how to set up
the tomcat module with your version of Tomcat and GemFire see the official [documentation](https://docs.vmware.com/en/VMware-GemFire/9.15/gf/tools_modules-http_session_mgmt-tomcat_installing_the_module.html).


##Steps

1. Set the environment Variable $CATALINA_HOME to point at the root directory of your local Tomcat installation. This is a
   Tomcat convention, so in some cases this may have already been set.

2. Find the configuration files located at $CATALINA_HOME/conf/. To the server.xml file add the line:

  ```
<Listener className="org.apache.geode.modules.session.catalina.ClientServerCacheLifecycleListener"/>
  ```

and to the file context.xml add the line:

  ```
<Manager className="org.apache.geode.modules.session.catalina.Tomcat9DeltaSessionManager"/> 
  ```

3. Run the setup script:

  ```
  cd scripts
  ./example-setup.sh <root directory of GemFire install>
  ```

Specify the root directory of your local GemFire installation. Make sure you have no local GemFire cluster running, as this step will start
a new local cluster to manage our Session States. This can be done by running gfsh from your GemFire installation and running a `connect`
command with no parameters. If a cluster is found, use the shutdown command to stop the cluster before continuing.

4. Run the tomcat startup script located at $CATALINA_HOME/bin/startup.sh. You should now be able to reach the example webapp by entering
   the following URL into your browser:
```
localhost:8080/SessionStateDemo/index
```

5. You should now be able to see details about your current session on the page. You can add key/value pairs to your session and get them
   back with the available input prompts. 