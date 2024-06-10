---
title: "Introducing VMware Tanzu GemFire for Tanzu Platform for Cloud Foundry 2.1"
description: This release introduces a host of new features and enhancements designed to empower your data capabilities, including GemFire VectorDB.
date: 2024-06-10
lastmod: 2024-06-10
team: 
- John Martin
type: blog
---

## Introduction

Tanzu GemFire for Tanzu Platform 2.1 is now available for download from the Tanzu Network.

>Note: Tanzu Application Service (TAS) is now known as Tanzu Platform for Cloud Foundry

Resources:

- [Download from Tanzu Net](https://network.tanzu.vmware.com/products/tanzu-gemfire-for-vms/)
- [GemFire for Tanzu Platform for Cloud Foundry Documentation](https://docs.vmware.com/en/VMware-GemFire-for-Tanzu-Application-Service/2.1/gf-tas/content-index.html)
- [GemFire for Tanzu Platform for Cloud Foundry v2.1 Release notes](https://docs.vmware.com/en/VMware-GemFire-for-Tanzu-Application-Service/2.1/gf-tas/content-release-notes.html)

This release introduces a host of new features and enhancements designed to empower your data capabilities. With additions like GemFire VectorDB, GemFire can now be utilized as a vector database on the Tanzu Platform for Cloud Foundry, enabling users to unlock advanced data analytics and AI capabilities. Let's dive into the key updates in this release and discover how they can amplify your data capabilities.


## Introducing GemFire VectorDB 1.1 Extension: An Advanced Data Analytics and AI Tool

With this new release we introduce the GemFire VectorDB 1.1 extension, empowering you with advanced vector-based data processing and analysis tools. The GemFire Vector Database seamlessly integrates the robust performance of GemFire with cutting-edge AI capabilities, simplifying the setup of AI use cases. This user-friendly extension is now available on the Tanzu Platform for Cloud Foundry.

## Enhanced Configuration Options: Fine-Tuning Cluster Performance

This release introduces enhanced configuration options, allowing you to tailor your plans precisely to your requirements. These new settings include the ability to set the number of locators, providing greater control over cluster performance and resource utilization. Users are no longer required to have 3 locators for the smallest plans, offering increased flexibility in deployment strategies.

## VM Extensions for Flexible Deployment: Scalable and Customizable Solutions
The release provides users with the flexibility to apply VM extensions across all service instances or customize sets of extensions for each specific plan. VM extensions enable users to define IaaS-specific configurations for their VMs, such as associating security groups and load balancers. Leveraging the Tanzu Operations Manager API, users can create custom VM extensions, assign unique names to them, and link these names with BOSH jobs for seamless integration and management.

## Additional Updates
- Upgraded [GemFire Search](https://docs.vmware.com/en/VMware-GemFire-Search/1.1/gemfire-search/release_notes.html) extension to version 1.1.0, which upgrades Lucene from 9.3 to 9.10.0.
- Includes the [GemFire Session Management 1.0](https://docs.vmware.com/en/VMware-GemFire/10.1/gf/tools_modules-http_session_mgmt-chapter_overview.html) extension, providing fast, scalable, and reliable session replication for HTTP servers without requiring application changes.
- The GemFire for Redis Apps Extension has been removed.

This release represents a significant step forward in modern data management, offering a robust, scalable, and feature-rich solution tailored to meet the evolving demands of today's applications.
Unlock the full potential of your data-driven initiatives with Tanzu GemFire. Download now and experience the future of data management firsthand!
For comprehensive release notes, detailed instructions, and additional resources, visit our documentation page. 
