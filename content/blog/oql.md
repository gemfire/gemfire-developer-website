# Trail Guide to GemFire OQL: Object Query Language
## Overview

VMware GemFire supports a query language known as Object Query Language (OQL).
OQL was originally developed between 1993 and 2001 by the
[Object Data Management Group (ODMG)](https://en.wikipedia.org/wiki/Object_Data_Management_Group) for object databases. The most recent specification
for OQL (ODMG 3.0)was published by OMDG in book form[^1].
OQL was later used as the basis for the query language
used in the [Java Data Objects (JDO)](https://en.wikipedia.org/wiki/Java_Data_Objects) specification, known as JDOQL.

For more information about the particular dialect of OQL used in GemFire, please consult the
[Querying section of the GemFire Documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-querying_basics-chapter_overview.html).

[^1]: *The Object Data Standard: ODMG 3.0*. Edited by R.G.G. Cattell and Douglas K. Barry, with contributions by Mark Berler, Jeff Eastman, David Jordan, Craig L. Russell, Olaf Schadow, Torsten Stanienda, and Fernando Velez. Morgan Kaufmann Publishers, Inc., 2000. ISBN 1-55860-647-5.

### Differences between SQL and OQL
The basic advantages of OQL are given in the GemFire docs as:
  - You can query on any arbitrary object
  - You can navigate object collections
  - You can invoke methods and access the behavior of objects
  - Data mapping is supported
  -   You are not required to declare types. Since you do not need type definitions, you can work across multiple languages
  - You are not constrained by a schema

This article will go a little deeper into the aspects of *composable expressions*
and method invocations.
#### Composable Expressions
A basic difference between OQL and SQL is that OQL consists
entirely of *expressions*, including the
`SELECT` expression which is the core expression for querying.

Since `SELECT` is an expression and not a *statement*, it can be embedded
in more complex expressions *anywhere a collection value is needed*.
This makes the language very composable where expressions
can be nested within each other to the extent that the required (runtime)
types are in alignment.

As an example of the flexibility of this kind of composability, consider
a query that gets the number of people who have a spouse that is older
then themselves. Assuming a `person` region with person objects
that have a `spouseId` property, and considering that a select expression
can be used anywhere a collection is expected, you could write an OQL query like:

```sql
count(
  select *
  from /person as p
  where p.spouse_id != null
          and p.age <
            element(select s.age
                    from person as s
                    where p.spouse_id = s.id
                            and p.age < s.age))
```
The `ELEMENT` function applies to a collection that is known to have exactly
one element and extracts the single element from it.
#### Method invocation on Objects
The other main difference from SQL is that OQL allows methods and simple attributes to be evaluated on objects. In Java, a simple attribute using dot notation
like `myObject.x` gets translated to either a public field or a call to a
getter method such as `myObject.getX()`. Methods that take parameters can also
be invoked in OQL.

Care should be taken here when working with methods implemented
in languages like Java where arbitrary methods (and even "getters") can cause
data mutation and other side effects. Since OQL is all about expressions
evaluation/querying, the methods invoked in the query language should always be pure
functions that return values without causing side effects. Otherwise, you
could get unexpected results that are difficult to diagnose.

### Evaluating expressions in a REPL

Let's look at some query expressions to demonstrate these points. A simple ["REPL" (Read-Evaluate-Print-Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) tool is used here where a OQL expression is entered and the REPL tool will evaluate the expression and print the result. We'll show the prompt
for this tool as `oql> ` and the printed result immediately after on the
next line.

In GemFire, you can use the provide console tool called `gfsh` as a REPL, of sorts, for trying out queries. The syntax within `gfsh` is:
```
query --query=<Select_Expression>
```
However, when evaluating OQL expression in `gfsh`, you are currently limited to using only a SELECT Expression. This can be very useful for evaluating queries against a running GemFire cluster for experimental and debugging purposes. However, because of this limitation,
the queries shown in this article are run instead in a simple REPL tool running in a
GemFire server (peer member), so it doesn't have this limitation. The source
code for this tool is shown at the end of this article.

Note that this same limitation of using a `SELECT` expression only also applies when querying against partitioned regions, whereas more complex expressions can be used when querying replicated (or local) regions.

#### Set up REPL and example data
If you would like to follow along with evaluating these example queries, here
are step-by-step instructions using `gfsh` to start a GemFire cluster and
populate some example data.

1. Start a locator
```shell
% gfsh -e "start locator --name=locator"
```
2. Start the Query REPL so it joins the cluster as a peer. \
(See Source Code for `QueryRepl.java` at end of this article)
You should get a prompt at the command line:
```
oql>
```

3. Run the `query.gfsh` script \
This source for this script is also given at the end of this article.
This creates the `employees` region and populates it with sample data.

```shell
% gfsh run --file="query.gfsh"
```
You can test that the data is there with:
```shell
% gfsh -e "connect" -e "query --query='select * from /employees'"
```
You should see output showing a table with 14 rows of employee data, something
like:
```
firstName |  lastName  | emplNumber |            email             | salary | hoursPerWeek
--------- | ---------- | ---------- | ---------------------------- | ------ | ------------
"Jamie"   | "Jive"     | 10005      | "Jamie.Jive@example.com"     | 60000  | 20
… etc
```

#### Evaluate example queries in the REPL
The following are example queries that show some valid OQL queries:

```sql
oql> 'Hello World'
	Hello World

oql> 2 + 2
	4

oql> ELEMENT(SELECT * FROM /employees WHERE emplNumber = 10006).hoursPerWeek >= 30
	true
```
## Source Code

### `gfsh` script
`query.gfsh`
```
connect
create region --name=employees --type=REPLICATE --if-not-exists

put --region=employees --key=10000 --value="('firstName':'Alex','lastName':'Able','emplNumber':10000,'email':'Alex.Able@example.com','salary':60000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10001 --value="('firstName':'Bertie','lastName':'Bell','emplNumber':10001,'email':'Bertie.Bell@example.com','salary':80000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10002 --value="('firstName':'Kris','lastName':'Call','emplNumber':10002,'email':'Kris.Call@example.com','salary':75000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10003 --value="('firstName':'Dale','lastName':'Driver','emplNumber':10003,'email':'Dale.Driver@example.com','salary':90000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10004 --value="('firstName':'Frankie','lastName':'Forth','emplNumber':10004,'email':'Frankie.Forth@example.com','salary':100000,'hoursPerWeek':30)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10005 --value="('firstName':'Jamie','lastName':'Jive','emplNumber':10005,'email':'Jamie.Jive@example.com','salary':60000,'hoursPerWeek':20)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10006 --value="('firstName':'Morgan','lastName':'Minnow','emplNumber':10006,'email':'Morgan.Minnow@example.com','salary':80000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10007 --value="('firstName':'Pat','lastName':'Puts','emplNumber':10007,'email':'Pat.Puts@example.com','salary':75000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10008 --value="('firstName':'Ricky','lastName':'Reliable','emplNumber':10008,'email':'Ricky.Reliable@example.com','salary':90000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10009 --value="('firstName':'Taylor','lastName':'Tack','emplNumber':10009,'email':'Taylor.Tack@example.com','salary':100000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10010 --value="('firstName':'Casey','lastName':'Catch','emplNumber':10010,'email':'Casey.Catch@example.com','salary':60000,'hoursPerWeek':30)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10011 --value="('firstName':'Jessie','lastName':'Jam','emplNumber':10011,'email':'Jessie.Jam@example.com','salary':80000,'hoursPerWeek':20)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10012 --value="('firstName':'Ryan','lastName':'Redo','emplNumber':10012,'email':'Ryan.Redo@example.com','salary':75000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
put --region=employees --key=10013 --value="('firstName':'Skyler','lastName':'Skip','emplNumber':10013,'email':'Skyler.Skip@example.com','salary':90000,'hoursPerWeek':40)" --value-class=com.vmware.query.tool.Employee
```

### Example Domain Class
```java
package com.vmware.query.tool;

import java.io.Serializable;
import java.util.StringJoiner;

public class Employee implements Serializable {
  public String firstName;
  public String lastName;
  public int emplNumber;
  public String email;
  public int salary;
  public int hoursPerWeek;
  public Employee() {}

  @Override
  public String toString() {
    return new StringJoiner(", ", Employee.class.getSimpleName() + "[", "]")
        .add("firstName='" + firstName + "'")
        .add("lastName='" + lastName + "'")
        .add("emplNumber=" + emplNumber)
        .add("email='" + email + "'")
        .add("salary=" + salary)
        .add("hoursPerWeek=" + hoursPerWeek)
        .toString();
  }
}
```

### Query REPL Tool

Notes:
  - Make sure `gemfire-dependencies.jar` and domain classes are in the class path
  - use a `gemfire.properties` file to specify the locator so `gfsh` can find this server, e.g.:

  #### `gemfire.properties`
  ```
  locators=localhost[10334]
```

  #### `QueryRepl.java`

```java
package com.vmware.query.tool;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.geode.cache.Cache;
import org.apache.geode.cache.CacheFactory;
import org.apache.geode.cache.query.QueryService;
import org.apache.geode.cache.query.SelectResults;

public class QueryRepl {

  public static void main(final String[] args) throws IOException {
    try (final Cache cache = new CacheFactory().create()) {
      runRepl(cache);
    }
  }

  private static void runRepl(final Cache cache) throws IOException {
    final QueryService queryService = cache.getQueryService();
    final BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    String query;
    // ctrl-d to quit
    while ((query = promptLine(in)) != null) {
      try {
        if (!query.isEmpty()) {
          final Object results = queryService.newQuery(query).execute();
          printResults(results);
        }
      } catch (final Exception e) {
        e.printStackTrace();
      }
    }
  }

  private static String promptLine(final BufferedReader in) throws IOException {
    System.out.print("\nquery> ");
    return in.readLine();
  }

  private static void printResults(final Object results) {
    if (results instanceof SelectResults) {
      printSelectResults((SelectResults<?>) results);
    } else {
      System.out.printf("--> %s\n", results);
    }
  }

  private static void printSelectResults(final SelectResults<?> results) {
    System.out.println("Query returned " + results.size() + " results.");
    for (final Object obj : results.asList()) {
      System.out.printf("--> %s\n", obj);
    }
  }
}
```

---
---

# Outline and Time Estimates (to be removed in final version)


- OQL is an expressional language (1d)
    -  Expressions, not statements
        - Composability
        - Calling arbitrary methods on objects \
          (use pure functions)

## Using `gfsh` as a query language REPL (0.5d)

- Overview of OQL Features (1d)
  - SELECT expressions
    - Structure of a SELECT expression
        - Data Types of SELECT expression clauses
        - Aggregates within SELECT expressions
    - Subqueries
    - Joins
  - Querying with Portable Data eXchange (PDX) Objects
- History of OQL (0.5d) \
  (ancestor of JDOQL, part of JDO specification)

# Optimizing GemFire OQL Queries (1d)
- Indexing
  - Types of indexes
  - When to use indexes
- Pruning results

# Debugging GemFire OQL Queries (1d)
- Tracing queries
- Logging
- Query-related statistics
