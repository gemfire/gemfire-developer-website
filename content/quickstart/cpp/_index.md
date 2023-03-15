---
title: C++
weight: 10
featured: true
featuredspot: 5
level1: C++ GemFire Client
layout: intro
icon: cpp
topics:
- C++
description: GemFire Clients using C++

---
To begin using the VMware GemFire C++ Native Client, first download the C++ Client library from the [Tanzu Network](https://network.tanzu.vmware.com/products/pivotal-gemfire/#/releases/1157686).

### Download the Native Clients Libraries from the Tanzu Network
1. In a browser, navigate to the [VMware Tanzu GemFire download](https://network.tanzu.vmware.com/products/pivotal-gemfire) page.
2. From the **Releases:** drop-down menu, select the most recent version of **VMware Tanzu GemFire Native Client**.
3. Select the version that best suits your development platform, and download it.
4. Uncompress the distribution archive, which may be a ZIP archive or a compressed tar file (.tar.gz or .tgz). For example:
    ```
    $ unzip pivotal-gemfire-nativeclient-windows-64bit-10.x.y.zip
    ```
   or
    ```
    $ tar xvzf pivotal-gemfire-nativeclient-linux-64bit-10.x.y.tar.gz
    ```
   
### Put, Get, and Remove with <%=vars.product_name_long%> Native C++ Client
```
#include <iostream>

#include <geode/CacheFactory.hpp>
#include <geode/PoolManager.hpp>
#include <geode/RegionFactory.hpp>
#include <geode/RegionShortcut.hpp>

using namespace vmware::gemfire::client;

int main(int argc, char** argv) {
  auto cache = CacheFactory()
      .set("log-level", "none")
      .create();

  cache.getPoolManager()
      .createFactory()
      .addLocator("localhost", 10334)
      .create("pool");
  
  auto regionFactory = cache.createRegionFactory(RegionShortcut::PROXY);
  auto region = regionFactory.setPoolName("pool").create("example_userinfo");

  std::cout << "Storing id and username in the region" << std::endl;
  region->put("rtimmons", "Robert Timmons");
  region->put("scharles", "Sylvia Charles");

  std::cout << "Getting the user info from the region" << std::endl;
  auto user1 = region->get("rtimmons");
  auto user2 = region->get("scharles");
  std::cout << "  rtimmons = "
            << std::dynamic_pointer_cast<CacheableString>(user1)->value()
            << std::endl;
  std::cout << "  scharles = "
            << std::dynamic_pointer_cast<CacheableString>(user2)->value()
            << std::endl;

  std::cout << "Removing rtimmons info from the region" << std::endl;
  region->remove("rtimmons");

  if (region->existsValue("rtimmons")) {
    std::cout << "rtimmons's info not deleted" << std::endl;
  } else {
    std::cout << "rtimmons's info successfully deleted" << std::endl;
  }

  cache.close();
}
```