---
title: "GemFire Management Console 1.3: New Features and Enhancements"
date: "2024-10-10"
lastmod: "2024-10-10"
type: blog

# Author(s)
team:
- John Martin
description: "The VMware Tanzu GemFire Management Console continues to evolve, offering powerful tools for managing and monitoring GemFire clusters."
---

The VMware Tanzu GemFire Management Console continues to evolve, offering powerful tools for managing and monitoring GemFire clusters. With the release of version 1.3.0, available now on from the [Broadcom Support Portal](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Tanzu%20GemFire%20Management%20Console), we've introduced several new features and enhancements that are designed to provide greater flexibility, improve disaster recovery capabilities, and enhance the overall user experience.

## Custom Security 

Security is paramount in any distributed system, and with this release, we’re introducing a new Custom security option when connecting to clusters. This feature is particularly valuable for organizations with unique security requirements. The Custom connection security feature allows users to include a custom class that can interface directly with an organization’s internal security systems, such as LDAP, Kerberos, OAuth, or others.

For instance, if your organization uses LDAP with specific parameters to authenticate users, you can now integrate this directly into your GemFire management operations. Before any command is executed—whether it’s a connection request or an operation on a region—the custom class can call your internal security system to retrieve the necessary credentials. This ensures that all operations are fully compliant with your organization’s security policies, reducing the risk of unauthorized access and maintaining a strong security posture across your GemFire clusters.

## Copy Data 

Data management and disaster recovery are critical aspects of any distributed system, and the new Copy Data feature in Tanzu GemFire Management Console v1.3.0 addresses these needs directly. This feature allows users to copy entries from a region in one cluster to the same region in another cluster, or even multiple clusters.

In the event of a disaster recovery scenario, this feature becomes particularly valuable. Users can quickly and efficiently copy data from a production cluster to a new cluster, ensuring that the recovery environment is populated with the latest data. Whether you’re setting up a new cluster or responding to an unexpected failure, the Copy Data feature streamlines the process, allowing you to minimize downtime.

## Enhanced Usage Reporting

Effective cluster resource management is essential for maintaining optimal performance and preventing resource bottlenecks. In version 1.3.0, we’ve significantly expanded the Usage Report feature to give you more granular insights into your cluster’s resource utilization.

The enhanced report now includes details for each member of every cluster connected to the management console, including Heap Size, OS Version, and JVM information. This comprehensive view allows administrators to identify clusters that may be over utilizing computing resources, enabling proactive management and rebalancing of workloads as needed. By understanding the resource consumption patterns of your clusters, you can make informed decisions to optimize performance, reduce costs, and ensure that your infrastructure is being used efficiently.

## Streamlined Gateway Senders and Receivers

In a distributed system like GemFire, Gateway Senders and Receivers are essential for enabling data replication across clusters. With Tanzu GemFire Management Console v1.3.0, we've made it easier than ever to create and manage these components. The streamlined controls now allow users to create and delete Gateway Senders and Receivers directly within the management console, simplifying the process of setting up and managing your multi-site architecture.

Whether you’re configuring a new data replication topology or adjusting an existing setup, this enhancement ensures that you can manage your data replication infrastructure with greater ease and efficiency. By bringing these capabilities into the console, we’ve reduced the complexity of managing distributed systems, allowing you to focus more on your data strategy and less on operational overhead.

## Real-Time Stats

Monitoring the performance of your clusters in real-time is crucial for maintaining smooth operations and quickly addressing any issues that arise. In this release, we’ve introduced real-time GET/PUT statistics that can be accessed directly within the console, without the need for a Prometheus server.

This feature provides basic monitoring capabilities, allowing you to track the number of GET and PUT operations in real time. While this is a more lightweight solution compared to setting up a full Prometheus server, it offers immediate insights into your cluster’s activity. This can be particularly useful for smaller deployments or for scenarios where you need quick access to performance data without the overhead of a more complex monitoring setup.

## Exclusive Features for GemFire 10.1+

For users running GemFire 10.1 and above, we’ve introduced two additional advanced features:

### Detailed Gateway Information

For those leveraging multi-site architectures, gaining insights into your Gateway Senders and Receivers is critical for ensuring data consistency and performance. In version 1.3.0, you can access comprehensive details about these components, including configuration settings and performance metrics. This detailed information helps you better understand the status and efficiency of your data replication processes, allowing you to make informed decisions about your architecture.

### Cluster Location World Map
Understanding the geographical distribution of your clusters can provide valuable context for managing a global distributed system. The new World Map view in Tanzu GemFire Management Console v1.3.0 leverages the time zone information reported by your clusters to place them on a map, giving you a visual representation of your cluster locations.

This feature is particularly useful for multi-site deployments, as it allows you to see at a glance where your clusters are located and how they’re interconnected. Whether you’re managing clusters across different regions or simply want a clearer picture of your system’s global footprint, the World Map view provides an intuitive way to visualize and manage your distributed environment.


## Compatability
The GemFire Management Console allows users to view clusters across all GemFire deployment types including

- VMware GemFire: 10.1.x
- VMware GemFire: 10.0.x
- VMware GemFire: 9.15.x
- VMware GemFire for TAS: 1.14.5+
- VMware GemFire for Kubernetes: 2.1+  
