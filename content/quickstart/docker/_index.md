---
title: Docker Quick Start
description: Start a GemFire cluster using Docker
weight: 5
icon: docker2
topics:
- Docker
---

This guide assumes you have installed Docker.

## Steps
1. Download the docker-compose script

      `$ curl -O https://raw.githubusercontent.com/gemfire/gemfire-examples/main/docker-compose.yaml`

2. Start the cluster

      `$ docker compose up`

## Services exposed
- Locator: port 10334
- Server: port 40405
- Management console: [http://localhost:7072/](http://localhost:7072/) 
  - To add the running cluster 
    - click "Connect"
    - host: gemfire-locator-0
    - port: 7070
- Pulse: [http://localhost:7070/pulse](http://localhost:7070/pulse)
- Data API: [http://localhost:7071/gemfire-api/v1/](http://localhost:7071/gemfire-api/v1/)
- Vector Database API: [http://localhost:7071/gemfire-vectordb/v1](http://localhost:7071/gemfire-vectordb/v1)
