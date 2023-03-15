---
title: .Net
weight: 5
featured: true
featuredspot: 4
level1: .NET GemFire Client
layout: intro
icon: dotnet
topics:
- .NET
description: GemFire Clients using .NET

---
To begin using the VMware GemFire .NET Framework Native Client, first download the .NET Framework Client library from the [Tanzu Network](https://network.tanzu.vmware.com/products/pivotal-gemfire/#/releases/1157686).

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
5. Add the `VMware.GemFire.dll` and `VMware.GemFire.pdb` files to your project.
6. In your `.csproj` file add a reference to the dll.
   ```
    <ItemGroup>
         <Reference Include="VMware.GemFire.dll">
           <HintPath>..\VMware.GemFire.dll</HintPath>
         </Reference>
    </ItemGroup>
   ```

### Put, Get and Remove with <%=vars.product_name_long%> Native .NET Client (C#)
```
using System;
using Apache.Geode.Client;
 class Program
  {
    static void Main(string[] args)
    {
      var cache = new CacheFactory()
          .Set("log-level", "none")
          .Create();
      cache.GetPoolManager()
          .CreateFactory()
          .AddLocator("localhost", 10334)
          .Create("pool");
      var regionFactory = cache.CreateRegionFactory(RegionShortcut.PROXY)
          .SetPoolName("pool");
      var region = regionFactory.Create<string, string>("example_userinfo");
      Console.WriteLine("Storing id and username in the region");
      const string rtimmonsKey = "rtimmons";
      const string rtimmonsValue = "Robert Timmons";
      const string scharlesKey = "scharles";
      const string scharlesValue = "Sylvia Charles";
      region.Put(rtimmonsKey, rtimmonsValue);
      region.Put(scharlesKey, scharlesValue);
      Console.WriteLine("Getting the user info from the region");
      var user1 = region.Get(rtimmonsKey, null);
      var user2 = region.Get(scharlesKey, null);
      Console.WriteLine(rtimmonsKey + " = " + user1);
      Console.WriteLine(scharlesKey + " = " + user2);
      Console.WriteLine("Removing " + rtimmonsKey + " info from the region");
      if (region.Remove(rtimmonsKey))
      {
        Console.WriteLine("Info for " + rtimmonsKey + " has been deleted");
      }
      else
      {
        Console.WriteLine("Info for " + rtimmonsKey + " has not been deleted");
      }
      cache.Close();
    }
 }
```