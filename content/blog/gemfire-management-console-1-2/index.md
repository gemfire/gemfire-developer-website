---
title: "GemFire Management Console 1.2: What's New?"
date: "2024-03-19"
lastmod: "2024-03-19"
type: blog

# Author(s)
team:
- John Martin
description: "Introducing the GemFire Management Console version 1.2! This release features an intuitive Multi-Site Topology view, enhanced query management, seamless security integration, and enhanced data insights."
---

Introducing the GemFire Management Console (GMC) version 1.2, where efficiency meets innovation in managing your distributed system. Available now from the [Broadcom Support Portal](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Tanzu%20GemFire%20Management%20Console).

Discover the latest features tailored to enhance visibility, security, and data management, empowering you to unlock the full potential of your GemFire clusters.

## Multi-site View
Delve deeper into your distributed system with the Multi-site View. This comprehensive overview offers invaluable insights into Multi-site (WAN) configurations, showcasing gateways and providing a topology view for enhanced visibility. Simplify cluster management and optimize decision-making with Multi-site View at your fingertips.

The new multi-site feature allows you to see your gateway-senders and gateway-receivers all in one table.
[![image of the multi-site table view showing gateway senders and gateway receivers](images/multi-site_table_view.png#diagram)](images/multi-site_table_view.png)

Additionally, you can now get a visual diagram of your connected clusters, allowing you to inspect the connection status between two clusters.
[![image of the multi-site table view showing the topology view of a 3 cluster connection](images/multi_site_topology_explorer.png#diagram)](images/multi_site_topology_explorer.png)


## Enhanced Cluster Information

Access expanded insights into GemFire clusters running **version 10.1** with enhanced cluster information. This feature offers additional cluster details, providing a holistic understanding of system health and performance. With detailed metrics and status updates, proactively monitor and optimize your GemFire clusters for peak efficiency and reliability.

[![image of enhanced information for a server](images/gemfire_10_dot_1_enhanced_information.png#diagram)](images/gemfire_10_dot_1_enhanced_information.png)


## GemFire Usage Report
Track resource utilization effectively with the core count report with the GemFire Management Console Usage Report. Gain valuable insights into connected GemFire clusters and their reported core quantities, optimizing resource allocation for optimal performance. 
[![image of a GemFire Usage Report](images/GemFire_Usage_Report.png#diagram)](images/GemFire_Usage_Report.png)


## Frequently Run Queries
Boost workflow efficiency with the ability to save and reuse frequently executed queries in the GemFire Management Console 1.2. Eliminate the need for recreating complex queries, saving time and effort in data exploration. Focus on extracting insights and making informed decisions with ease. 

![image of a Saved Query](images/Saved_Query.png#diagram)

## Query Cancellation
Take control of data exploration with the ability to cancel a long-running query. This new feature is exclusively available for GemFire clusters running version 10.1+. Cancel queries directly from the Data Explorer view, enhancing flexibility and responsiveness in managing data exploration tasks. 

## Security Enhancements
Elevate security measures with seamless integration of the Kerberos and SAML authentication protocols. Prioritize GemFire Management Console protection without compromising usability or performance, ensuring sensitive data remains accessible only to authorized users. With the GemFire Management Console 1.2, you can fortify your console security and enhance overall system integrity with Kerberos or SAML security protocols.

## Export and Import Region Data
Streamline data management tasks with effortless import and export of region data in the GemFire Management Console 1.2. Facilitate efficient data migration and synchronization within your GemFire environment, empowering seamless data management and flexibility. Explore new possibilities in data handling with the Export and Import Region Data feature.

![image of the import and export data option for a region](images/import_export_region_data.png#diagram)

## Create Disk Store Backups
Ensure the resilience and integrity of your GemFire data with the flexible backup options in the GemFire Management Console 1.2. From incremental to full disk-store backups, safeguard your data against loss and expedite disaster recovery. With the ability to create Disk Store backups, rest assured that your data management needs are met with peace of mind.
![image of the create disk store backup screen](images/Back_up_disk_store.png#diagram)


## Compatability
The GemFire Management Console allows users to view clusters across all GemFire deployment types including

- VMware GemFire: 10.1.x
- VMware GemFire: 10.0.x
- VMware GemFire: 9.15.x
- VMware GemFire for TAS: 1.14.5+
- VMware GemFire for Kubernetes: 2.1+  

## Conclusion
GemFire Management Console 1.2 redefines distributed system management with its array of features tailored for enhanced visibility, security, and efficiency. From Multisite View to enhanced cluster information, additional security enhancements, the ability to export and import region data, save frequently run queries, and the GemFire Management Console Usage Report, the GemFire Management Console 1.2 sets a new benchmark in distributed system management. 

## Additional Resources

**Download:** Available now from the [Broadcom Support Portal](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Tanzu%20GemFire%20Management%20Console).

**Documentation:** [GemFire Management Console 1.2 Documentation](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.2/gfmc/index.html)

**Release Notes:** [GemFire Management Console 1.2 Release Notes](https://docs.vmware.com/en/VMware-GemFire-Management-Console/1.2/gfmc/release_notes.html)