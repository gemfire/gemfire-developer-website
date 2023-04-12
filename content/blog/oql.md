# Overview of GemFire OQL as a Query Language (3d)

VMware GemFire supports a query language known as Object Query Language (OQL).
OQL was originally developed between 1993 and 2001 by the
[Object Data Management Group (ODMG)](https://en.wikipedia.org/wiki/Object_Data_Management_Group) for object databases. OQL was later used as the basis for the query language
used in the [Java Data Objects (JDO)](https://en.wikipedia.org/wiki/Java_Data_Objects) specification, known as JDOQL.

For more information about the particular dialect of OQL used in GemFire, please consult the
[Querying section of the GemFire Documentation](https://docs.vmware.com/en/VMware-GemFire/10.0/gf/developing-querying_basics-chapter_overview.html).

## Differences between SQL and OQL

### Composable Expressions
Perhaps the most basic difference between OQL and SQL is that OQL consists
entirely of *expressions*, including the
`SELECT` expression which is the core expression for querying.

Since `SELECT` is an expression and not a statement, it can be embedded
in more complex expressions. This makes the language very composable where expressions
can be nested within each other to the extent that the required (runtime)
types are in alignment. This will be explored further with some examples.

### Method invocation on Objects
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

Let's look at some query expressions to demonstrate these points. A *hypothetical* "REPL" (Read-Evaluate-Print-Loop) is used here where a valid OQL expression is entered and the REPL tool will evaluate the expression and print the result. We'll show the prompt
for this tool as `query> ` and the printed result immediately after on the
next line.

Note that when evaluated in a server, such as in a cluster with peer-to-peer
topology, an OQL query does not need to be a `SELECT` expression, it can be any expression such as the following:

```
query> 'Hello World'
'Hello World'

query> 2 + 2
4

query> ELEMENT(SELECT * FROM /region WHERE id = 123).status = 'active'
true
```

In GemFire, you can use the provide console tool called `gfsh` as a REPL, of sorts, for trying out queries. The syntax within `gfsh` is:
```
query --query=<Select_Expression>
```
However, when evaluating OQL expression in `gfsh`, you are currently limited to using only a SELECT Expression. This can be useful for evaluating queries against a running GemFire cluster for experimental and debugging purposes.

Note that this same limitation of using a `SELECT` expression only also applies when querying against partitioned regions, whereas more complex expressions can be used when querying replicated (or local) regions.

---
---

# Outline and Time Estimates (to be removed in final version)


- OQL is an expressional language (1d)
    -  Expressions, not statements
        - Composability
        - Calling arbitrary methods on objects

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
- History of OQL (0.5d)

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