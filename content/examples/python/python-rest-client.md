---
title: REST Client in Python
date: '2023-03-29'
lastmod: '2023-03-29'
repo: https://github.com/gemfire/gemfire-examples/blob/main/use-cases/restClient.py
tags:
- Python
- REST
type: examples
description: A guide to using the GemFire REST API from a Python client.
---
## GemFire REST Client in Python

At the end of this article is an example Python script that accesses a GemFire client using the REST API.

To run this example, GemFire must first be installed and a cluster must be started with the REST API enabled.

The step-by-step instructions:

1. Install GemFire according the instructions found at [Getting Started with VMware GemFire](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/getting_started-book_intro.html).

2. With the gemfire `bin` directory in your command `PATH`, start the GemFire shell:
```bash
> gfsh
```
3. Start a locator:
```bash
gfsh> start locator --name=locator1
```
4. Start a server with the REST API enabled. The example code expects the http service to be running on port 8080:
```
gfsh> start server --name=server1 --start-rest-api=true --http-service-port=8080 --http-service-bind-address=localhost --server-port=40405
```
5. Connect to the cluster in `gfsh`:
```bash
gfsh> connect
```
6. Create a region with name "demoRegion" (as expected by the example code):
```
gfsh> create region --name=demoRegion --type=REPLICATE
```
7. Exit gfsh
```
gfsh> exit
```
8. Using python3, run the python example. The code is available Here is the code:

```python
#!/usr/bin/env python3

# This assumes you have created a region called "demoRegion".

import json
import uuid
import requests

REGION = "demoRegion"
BASE_URI = "http://localhost:8080/gemfire-api/v1"

headers = {'content-type': 'application/json'}

person = {'type': 'Person',
          'firstName': 'John',
          'middleName': 'Q',
          'lastName': 'Public',
          'birthDate': '1 Jan 1900'}


def resource_uri(res=None, region=REGION):
    if res:
        return "%s/%s/%s" % (BASE_URI, region, res)
    return "%s/%s" % (BASE_URI, region)


print("[*] First, we'll empty out our demo region - DELETE %s" %
      requests.delete(resource_uri()))

r = requests.delete(resource_uri())
r.raise_for_status()

print("[*] Now, we'll create 5 demo objects")

keys = []

for i in range(1, 6):
    key = uuid.uuid1()

    keys.append(key)
    person['uuid'] = str(key)

    print("\t Creating object with key: POST %s" % key)
    r = requests.post(resource_uri(), json=person,
                      params={'key': key},
                      headers=headers)
    r.raise_for_status()

print("[*] List our keys - GET %s" % resource_uri("keys"))

r = requests.get(resource_uri("keys"))
print(r.text)

print("[*] Here's all our data - GET %s" % resource_uri())

r = requests.get(resource_uri())
print(r.text)

print("[*] Now each key one by one")

for key in keys:
    print("Fetching key - GET %s" % resource_uri(res=key))
    r = requests.get(resource_uri(res=key))
    print(r.text)

print("[*] Now grab one, change the first name to 'Jane' and save it")

print("  GET - %s" % resource_uri(res=keys[0]))
r = requests.get(resource_uri(res=keys[0]))
p = json.loads(r.text)
p['firstName'] = 'Jane'
print("  PUT - %s" % resource_uri(res=keys[0]))
r = requests.put(resource_uri(res=keys[0]), json=p,
                 headers=headers)

print("  GET - %s" % resource_uri(res=keys[0]))
r = requests.get(resource_uri(res=keys[0]))
print(r.text)
```