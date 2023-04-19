# **A Trail Guide to GemFire OQL: Object Query Language**
## **Overview**

VMware GemFire supports a query language known as Object Query Language (OQL).
OQL was originally developed between 1993 and 2001 by the
[Object Data Management Group (ODMG)](https://en.wikipedia.org/wiki/Object_Data_Management_Group) for object databases. The most recent specification
for OQL (ODMG 3.0)was published by OMDG in book form¹.
OQL was later used as the basis for the query language
used in the [Java Data Objects (JDO)](https://en.wikipedia.org/wiki/Java_Data_Objects) specification, known as JDOQL.

For more information about the particular dialect of OQL used in GemFire, please consult the
[Querying section of the GemFire Documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-querying_basics-chapter_overview.html).

This article is meant as a supplement to the GemFire documentation, to highlight
some of the unique aspects of OQL and provide some guidance on writing queries
in OQL with GemFire.

**Footnote 1:** *The Object Data Standard: ODMG 3.0*. Edited by R.G.G. Cattell and Douglas K. Barry, with contributions by Mark Berler, Jeff Eastman, David Jordan, Craig L. Russell, Olaf Schadow, Torsten Stanienda, and Fernando Velez. Morgan Kaufmann Publishers, Inc., 2000. ISBN 1-55860-647-5.

## **Differences between SQL and OQL**
The basic advantages of OQL are given in the GemFire docs as:
  - You can query on any arbitrary object
  - You can navigate object collections
  - You can invoke methods and access the behavior of objects
  - Data mapping is supported
  - You are not required to declare types. Since you do not need type definitions, you can work across multiple languages
  - You are not constrained by a schema

This article will go a little deeper into the aspects of *composable expressions*
and method invocations.
### **Composable Expressions**
A basic difference between OQL and SQL is that OQL consists
entirely of *expressions*, including the
`SELECT` expression which is the core expression for querying.

Since `SELECT` is an expression and not a *statement*, it can be embedded
in more complex expressions *anywhere a collection value is needed*.
This makes the language very composable where expressions
can be nested within each other to the extent that the required (runtime)
types are in alignment.

As an example of the flexibility of this kind of composability, consider
a query that gets the number of employees who have a manager that has a
lower salary than themselves. Assuming an `employees` region with employee objects
that have a `managerId` attribute, and considering that a select expression
can be used anywhere a collection is expected, you could evaluate an OQL query such as:

```sql
select count(*)
  from /employees as emp
  where emp.managerId != 0
          and emp.salary >
            element(select mgr.salary
                    from /employees as mgr
                    where emp.managerId = mgr.emplNumber)
```

select * from /employees as emp where emp.managerId != 0 and emp.salary > element(select mgr.salary from /employees as mgr where emp.managerId = mgr.emplNumber)

The `ELEMENT` function applies to a collection that is known to have exactly
one element and extracts the single element from it.

Here are some other expressions that are valid in OQL, which would *not* be valid
in SQL:
```sql
'Hello World'
-- evaluates to  Hello World

2 + 2
-- evaluates to 4

ELEMENT(SELECT * FROM /employees WHERE emplNumber=10006).hoursPerWeek >= 30
-- evalutes to true (or false)
```
### **Method invocation on Objects**
The other main difference from SQL is that OQL allows methods and simple attributes to be evaluated on objects. In Java, a simple attribute using dot notation
like `myObject.x` gets translated to either a public field or a call to a
getter method such as `myObject.getX()`. Methods that take parameters can also
be invoked in OQL.

Care should be taken when working with methods implemented
in languages like Java where arbitrary methods (and even "getters") can cause
data mutation and other side effects. Since OQL is declarative, the
order of expression evaluation is not always predictable or prescribed,
it works best when the methods invoked in the query language are pure "read-only"
functions, returning values without causing side effects.

## **Evaluating queries in a REPL**

In this article there will be some sample query expressions for demonstration purposes.
You can evaluate these queries yourself using the GemFire command-line tool
`gfsh` as a ["REPL" (Read-Evaluate-Print-Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) tool.

The syntax for executing a query in `gfsh` is:
```
query --query=<Select_Expression>
```
**Note (1):** When evaluating OQL expressions in `gfsh`, you are currently limited
to only using SELECT expressions that query on GemFire regions,
so the query expressions that were given earlier won't work in `gfsh`—but they do
work when using the `QueryService` API in a server(peer) application. This may
be improved in a future version of GemFire.

**Note (2):** This limitation of using a `SELECT` expression also applies when
querying against partitioned regions, whereas other types of expressions can be
used when querying replicated (or local) regions.

### **Set up example Cluster**
If you would like to follow along with evaluating these example queries, here
are step-by-step instructions using `gfsh` to start a GemFire cluster and
populate the example data. After this is done you will be able to
evaluate the queries in the rest of this article.

1. If you haven't already done so, install GemFire and run `gfsh` to get the `gfsh` prompt:
```shell
% gfsh
gfsh>
```
2. Start a locator:
```shell
gfsh> start locator --name=locator
```
3. Start a server:
```
gfsh> start server --name=server1
```
4. Compile the domain classes (see source code at end of this article)
into a jar file, say `employees.jar`, then
deploy the jar to the cluster:
```shell
gfsh> deploy --jars=employees.jar
```

5. Run the `query.gfsh` script
This source for this script is also given at the end of this article.
This creates the `employees` and `departments` regions and populates them with
sample data.

```shell
gfsh> run --file="query.gfsh"
```
You can test that the data is there with:
```shell
gfsh> query --query="select * from /employees"
```
You should see output showing a table with 14 rows of employee data, something
like:
```
firstName |  lastName  | emplNumber |            email             | salary | hoursPerWeek | managerId | deptId
--------- | ---------- | ---------- | ---------------------------- | ------ | ------------ | --------- | ------
"Frankie" | "Forth"    | 10004      | "Frankie.Forth@example.com"  | 100000 | 30           | 0         | 101
"Jamie"   | "Jive"     | 10005      | "Jamie.Jive@example.com"     | 60000  | 20           | 0         | 102
"Pat"     | "Puts"     | 10007      | "Pat.Puts@example.com"       | 75000  | 40           | 0         | 101
… (etc)
```
Likewise, test that the `/departments` data is there with:
```shell
gfsh> query --query="select * from /departments"
```
You should see a table with 3 department rows:
```
deptId |       name        | location
------ | ----------------- | ---------------------------------
101    | "Human Resources" | {"city":"Beaverton","state":"OR"}
100    | "Accounting"      | {"city":"New York","state":"NY"}
102    | "Engineering"     | {"city":"Beaverton","state":"OR"}
```
## **Elements of a SELECT expression**

The SELECT expression has the basic form:

> `SELECT` *projectionList* `FROM` *fromClause* [`WHERE` *booleanExpression*]

> *projectionList* := (`*` |  *projection* {`,` *projection*}) \
> *projection* := *attribute* | *expr* | *aggregationExpr* \
> *aggregationExpr* := *aggOp*`(`*projection*`)` \
> *aggOp* := `MIN` | `MAX` | `SUM` | `AVG` | `COUNT`

> *fromClause* := *collectionExpr* {`,` *collectionExpr*}

By convention, this grammar definition includes these symbols:

```
:=  : a grammar production rule showing a breakdown of syntactical parts
{ } : zero or more repetitions
( ) : a group of elements
|   : alternatives.
```

A *collectionExpr* is any expression that evaluates to a value of type
collection, and a *booleanExpr* is any expression that evaluates to a value of type boolean.

**Note:** This is a simplified form of a select expression, as it can also be
followed by `ORDER BY` and/or `GROUP BY` clauses. This grammar also doesn't
show the optional binding of expressions to identifiers (with or without `AS`).
The complete grammar of GemFire OQL can be found in the current
GemFire documentation under the heading *Query Language Grammar*.

### **Subqueries**
A select expression itself evaluates to a value of type collection, so it
is possible to nest select expressions within select expressions, as long as the
types line up. Some examples: *(the backslash `\` denotes line continuation in `gfsh`)*

```sql
gfsh> query --query="-- QUERY (1) \
-- select expression used in an IN operator, in a WHERE clause \
SELECT firstName, lastName FROM /employees \
  WHERE deptId IN (SELECT dept.deptId FROM /departments dept \
                  WHERE dept.location.state = 'NY')"
Result : true
Limit  : 100
Rows   : 5

firstName | lastName
--------- | --------
Morgan    | Minnow
Taylor    | Tack
Dale      | Driver
Alex      | Able
Ryan      | Redo

gfsh> query --query="-- QUERY (2) \
-- select expression used in a FROM clause \
-- gets the average of the department average salaries \
SELECT AVG(average_salary) FROM \
    (SELECT AVG(salary) AS average_salary, \
        deptId \
      FROM /employees \
      GROUP BY deptId)"
Result : true
Limit  : 100
Rows   : 1

Result
-----------------
79416.66666666667

gfsh> query --query="-- QUERY (3) \
-- select expression used in a projection \
SELECT emplNumber, firstName, lastName, salary, \
    -- calculate the difference between salary and average salary \
    (salary - ELEMENT(SELECT AVG(e.salary) \
        FROM /employees e)) AS diff \
FROM /employees"
Result : true
Limit  : 100
Rows   : 14

emplNumber | firstName | lastName | salary | diff
---------- | --------- | -------- | ------ | -------------------
10001      | Bertie    | Bell     | 80000  | 357.14285714285506
10010      | Casey     | Catch    | 60000  | -19642.857142857145
(etc.)
```
### **Joins**
Queries that read from more than one region, or the same region more
than once (a *self-join*) can often be simplified and in some cases
evaluated more efficiently by using *joins* instead of subqueries.
In OQL, a join between regions is indicated by referencing more than one region
in the *FROM* clause.

A basic join between the `employees` and `departments` regions:
```sql
gfsh> query --query="SELECT \
  e.firstName, e.lastName, d.name as deptName, \
  d.location.city as deptCity, d.location.state as deptState \
FROM /employees e, /departments d \
WHERE e.deptId = d.deptId"
Result : true
Limit  : 100
Rows   : 14

firstName | lastName |    deptName     | deptCity  | deptState
--------- | -------- | --------------- | --------- | ---------
Ryan      | Redo     | Accounting      | New York  | NY
Kris      | Call     | Engineering     | Beaverton | OR
Skyler    | Skip     | Human Resources | Beaverton | OR
(etc.)
```

`Query (1)` shown above could be re-written as a join:
```sql
SELECT emp.firstName, emp.lastName FROM /employees emp, /departments dept \
  WHERE emp.deptId = dept.deptId AND dept.location.state = 'NY'
  ```

### **Object Serialization in Regions**
GemFire supports the Portable Data Exchange (PDX) format for storing domain
objects or JSON documents in a serialized form in a region, and the BSON as
another format for JSON objects. These objects can be queried like any other
objects using OQL, but they have the added advantage that the don't have to be
fully deserialized in order to be queried.

Using PDX serialization also enables read and querying access for REST clients.

For more information about PDX Serialization, JSON Documents, and the REST
API, see the GemFire Documention.

## **Optimizing OQL Queries**
### **Indexing**
#### **Types of indexes and when to use them**
#### **Pruning Results**

## **Debugging OQL Queries**
### **Tracing queries**
### **Logging in methods**
For debugging purposes, adding logging to methods that are invoked in a query
could be helpful. Since methods can take parameters, logging named values
or the result of expression evaluation could help diagnose issues.
### **Query-related Statistics**

---
## **Appendix: Source Code**

### **`gfsh` script**
`query.gfsh`\
Run this in `gfsh` after the cluster is started
(e.g. a locator and the REPL tool running as a peer), to create populate the regions with data.
```
connect
create region --name=employees --type=REPLICATE --if-not-exists
create region --name=departments --type=REPLICATE --if-not-exists

put --region=employees --key=10000 --value="('firstName':'Alex','lastName':'Able','emplNumber':10000,'email':'Alex.Able@example.com','salary':60000,'hoursPerWeek':40,'deptId':100)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10001 --value="('firstName':'Bertie','lastName':'Bell','emplNumber':10001,'email':'Bertie.Bell@example.com','salary':80000,'hoursPerWeek':40,'managerId':10000,'deptId':101)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10002 --value="('firstName':'Kris','lastName':'Call','emplNumber':10002,'email':'Kris.Call@example.com','salary':75000,'hoursPerWeek':40,'deptId':102)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10003 --value="('firstName':'Dale','lastName':'Driver','emplNumber':10003,'email':'Dale.Driver@example.com','salary':90000,'hoursPerWeek':40,'deptId':100)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10004 --value="('firstName':'Frankie','lastName':'Forth','emplNumber':10004,'email':'Frankie.Forth@example.com','salary':100000,'hoursPerWeek':30,'deptId':101)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10005 --value="('firstName':'Jamie','lastName':'Jive','emplNumber':10005,'email':'Jamie.Jive@example.com','salary':60000,'hoursPerWeek':20,'deptId':102)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10006 --value="('firstName':'Morgan','lastName':'Minnow','emplNumber':10006,'email':'Morgan.Minnow@example.com','salary':80000,'hoursPerWeek':40,'deptId':100)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10007 --value="('firstName':'Pat','lastName':'Puts','emplNumber':10007,'email':'Pat.Puts@example.com','salary':75000,'hoursPerWeek':40,'deptId':101)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10008 --value="('firstName':'Ricky','lastName':'Reliable','emplNumber':10008,'email':'Ricky.Reliable@example.com','salary':90000,'hoursPerWeek':40,'deptId':102)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10009 --value="('firstName':'Taylor','lastName':'Tack','emplNumber':10009,'email':'Taylor.Tack@example.com','salary':100000,'hoursPerWeek':40,'deptId':100)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10010 --value="('firstName':'Casey','lastName':'Catch','emplNumber':10010,'email':'Casey.Catch@example.com','salary':60000,'hoursPerWeek':30,'deptId':101)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10011 --value="('firstName':'Jessie','lastName':'Jam','emplNumber':10011,'email':'Jessie.Jam@example.com','salary':80000,'hoursPerWeek':20,'deptId':102)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10012 --value="('firstName':'Ryan','lastName':'Redo','emplNumber':10012,'email':'Ryan.Redo@example.com','salary':75000,'hoursPerWeek':40,'deptId':100)" --value-class=com.vmware.query.blog.Employee
put --region=employees --key=10013 --value="('firstName':'Skyler','lastName':'Skip','emplNumber':10013,'email':'Skyler.Skip@example.com','salary':90000,'hoursPerWeek':40,'deptId':101)" --value-class=com.vmware.query.blog.Employee

put --region=departments --key=100 --value="('deptId':100,'name':'Accounting','location':{'city':'New York','state':'NY'})" --value-class=com.vmware.query.blog.Department
put --region=departments --key=101 --value="('deptId':101,'name':'Human Resources','location':{'city':'Beaverton','state':'OR'})" --value-class=com.vmware.query.blog.Department
put --region=departments --key=102 --value="('deptId':102,'name':'Engineering','location':{'city':'Beaverton','state':'OR'})" --value-class=com.vmware.query.blog.Department
```

### **Domain Classes**
The domain classes need to be deployed to the servers in the cluster.
`Employee.java`
```java
package com.vmware.query.blog;

import java.io.Serializable;
import java.util.StringJoiner;

public class Employee implements Serializable {
  public String firstName;
  public String lastName;
  public int emplNumber;
  public String email;
  public int salary;
  public int hoursPerWeek;
  public int  managerId;
  public int deptId;

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
        .add("managerId=" + managerId)
        .add("deptId=" + deptId)
        .toString();
  }
}
```
`Department.java`
```java
package com.vmware.query.blog;

import java.io.Serializable;
import java.util.StringJoiner;

public class Department implements Serializable {
  public int deptId;
  public String name;
  public Location location;

  public Department() { }

  @Override
  public String toString() {
    return new StringJoiner(", ", Department.class.getSimpleName() + "[", "]")
        .add("deptId=" + deptId)
        .add("name='" + name + "'")
        .add("location=" + location)
        .toString();
  }
}
```
`Location.java`
```java
package com.vmware.query.blog;

import java.io.Serializable;
import java.util.StringJoiner;

public class Location implements Serializable {
  public String city;
  public String state;

  @Override
  public String toString() {
    return new StringJoiner(",")
        .add(city)
        .add(state)
        .toString();
  }
}
```
