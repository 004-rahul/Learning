# SQL and database internals

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 2 Q&A part E, the database-internals prompts with answers, and the SQL/OS/networking proof table. Weeks 9–10 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART E - SQL and database internals (highest immediate job value)
- Database internals — prompts and answers
- SQL, OS and networking proof tasks (12 Oct guide)
- ➕ Lab setup: PostgreSQL and SQL Server in Docker
- ➕ Practice schema: the job platform
- ➕ 20 graded query exercises
- ➕ Index lab: from Seq Scan to Index Only Scan
- ➕ Isolation and concurrency lab: two sessions
- ➕ PostgreSQL vs SQL Server: the differences that matter
- ➕ Zero-downtime schema changes
- ➕ Backup and restore: a drill you actually run
- ➕ Data modeling checklist

---

<a id="m2-part-e"></a>

## PART E - SQL and database internals (highest immediate job value)

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m2-q30"></a>

#### Q30. How does a database physically store data?
Say this. In fixed-size pages, typically 8 kilobytes. A table with no clustered index is a heap - unordered pages. With a clustered index, the table is the index: the rows are stored in key order in the leaf level of a B-tree. A non-clustered index is a separate B-tree holding the key plus a pointer back to the row.
Why. Everything about index behaviour follows from this. A clustered index defines physical order, so you get one; non-clustered indexes are extra sorted copies of a subset of columns, which is why they cost storage and slow writes.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Page size is 8 KB in SQL Server and PostgreSQL but 16 KB in MySQL InnoDB. 'With a clustered index the table is the index' is true for SQL Server and InnoDB; **PostgreSQL has no clustered indexes** (tables are heaps; `CLUSTER` is a one-time reorder). In SQL Server, a non-clustered index on a clustered table points to the clustering key (a RID only on heaps). Keep the clustering key narrow, unique and ever-increasing — random GUIDv4 keys cause page splits; use NEWSEQUENTIALID or UUIDv7 (`Guid.CreateVersion7()` in .NET 9+).

<a id="m2-q31"></a>

#### Q31. Why does an index make reads faster and writes slower?
Say this. Reads get an ordered structure, so the engine can seek in O(log n) page reads instead of scanning every page. Writes have to update every index as well as the table, and an insert in the middle of a sorted structure can cause a page split - allocating a new page and moving half the rows.
Why. It is the classic space-and-write cost for read speed. Five indexes means every insert does six writes.
Watch out. Page splits also cause fragmentation, which then slows the reads the index was meant to speed up. That is why fill factor and index maintenance exist.
<a id="m2-q32"></a>

#### Q32. What is a covering index?
Say this. An index that contains every column the query needs, so the engine answers entirely from the index and never touches the table. You achieve it by adding non-key columns as included columns.
Why. Without it, each matching row costs an extra lookup back into the table - a key lookup. For a query returning thousands of rows, eliminating those lookups is often a ten-times improvement.
Watch out. This is one of the highest-value practical SQL techniques and it applies directly to your eDiscovery query work. Have a real before-and-after from your job if you can.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] `INCLUDE` columns exist in SQL Server and PostgreSQL 11+, not MySQL. PostgreSQL index-only scans also need an up-to-date visibility map (VACUUM).

<a id="m2-q33"></a>

#### Q33. Seek, scan, or lookup - what is the difference in a plan?
Say this. A seek navigates the B-tree directly to the rows it needs - what you want. A scan reads every page. A lookup is the extra hop from a non-clustered index back to the table for columns the index did not cover.
Why. A scan is not automatically bad: if the query returns most of the table, reading it sequentially is genuinely cheaper than thousands of random seeks. The optimiser chooses based on estimated row counts.
Watch out. "A scan means something is wrong" is the wrong answer. "A scan on a large table with a selective predicate means something is wrong" is the right one.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Seek/scan/key lookup is SQL Server vocabulary. PostgreSQL plans say Seq Scan, Index Scan, Index Only Scan and Bitmap Heap Scan.

<a id="m2-q34"></a>

#### Q34. What is SARGability, and why can WHERE YEAR(created) = 2026 not use an index?
Say this. A predicate is SARGable if the engine can use it to seek. Wrapping the column in a function destroys that, because the index stores `created`, not `YEAR(created)` - so the engine must compute the function for every row and therefore scan. Rewrite it as a range: `created >= '2026-01-01' AND created < '2027-01-01'`.
Why. An index is a sorted structure over the raw column values. Any transformation of the column breaks the ordering the seek depends on.
Watch out. The same applies to a leading wildcard - `LIKE '%term'` cannot seek, while `LIKE 'term%'` can. Also to implicit conversions caused by a parameter of the wrong type, which is a very common invisible cause.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] A .NET-specific cause of implicit conversion: ADO.NET/EF send strings as `nvarchar`; against a `varchar` column that triggers `CONVERT_IMPLICIT` and a scan. Fix with EF `.IsUnicode(false)`/`HasColumnType("varchar(..)")` or Dapper `DbString { IsAnsi = true }`.

<a id="m2-q35"></a>

#### Q35. Why does the optimiser pick a hash join over nested loops?
Say this. Nested loops is best when one input is small and the other has an index on the join key - it seeks once per outer row. Hash join is best for two large unindexed inputs: it builds a hash table from the smaller side and probes it with the larger, which is one pass over each. Merge join needs both inputs already sorted on the key, and is then very cheap.
Why. The choice is driven by estimated cardinality. That is why stale statistics cause bad plans - the optimiser picks nested loops for what it thinks is 10 rows and actually gets a million.
Watch out. "The plan changed and the query got slow" is almost always statistics or parameter sniffing. Naming both is a strong answer.
<a id="m2-q36"></a>

#### Q36. What is the logical execution order of a SQL statement?
Say this. FROM and JOIN, then WHERE, then GROUP BY, then HAVING, then SELECT, then DISTINCT, then ORDER BY, then LIMIT or TOP.
Why. This explains two things people get wrong constantly: you cannot use a SELECT alias in a WHERE clause, because SELECT has not happened yet; and WHERE filters rows before grouping while HAVING filters groups after.
Watch out. Filter in WHERE rather than HAVING whenever you can - it reduces the rows before the aggregation instead of after.
<a id="m2-q37"></a>

#### Q37. State the four ACID properties.
Say this. Atomicity - all or nothing. Consistency - the transaction moves the database from one valid state to another, respecting constraints. Isolation - concurrent transactions do not see each other's intermediate state. Durability - once committed, it survives a crash.
Why. Durability comes from write-ahead logging: the log is flushed to disk before the commit returns, so recovery can replay it. Atomicity comes from the same log, played backwards.
Watch out. Isolation is the one with levels and the one worth real depth - the next question.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Atomicity comes from the log played backwards' is true for SQL Server and InnoDB (undo). PostgreSQL has no undo log: aborted row versions are invisible via MVCC commit status and are removed later by VACUUM.

<a id="m2-q38"></a>

#### Q38. Write the isolation level to anomaly table.
Say this. Read Uncommitted allows dirty reads, non-repeatable reads and phantoms. Read Committed prevents dirty reads. Repeatable Read also prevents non-repeatable reads. Serializable prevents all three, by taking range locks. Snapshot gives a consistent point-in-time view without blocking readers, but permits write skew.
Why. Each level up takes more or longer-held locks, so it costs concurrency. You are explicitly buying correctness with throughput, and the right level depends on the workload rather than on a global preference.
Watch out. Know the definitions precisely. Dirty read - uncommitted data. Non-repeatable read - the same row read twice gives different values. Phantom - the same range query returns different rows.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] The isolation table is generic, and engines differ — say which engine you mean. **SQL Server:** Read Committed is lock-based unless RCSI is on (RCSI is ON by default in Azure SQL Database); Repeatable Read holds shared locks (phantoms possible); Serializable uses key-range locks; SNAPSHOT is a separate level that raises update-conflict error 3960 and permits write skew. **PostgreSQL:** READ UNCOMMITTED behaves as READ COMMITTED (no dirty reads ever); REPEATABLE READ is snapshot isolation and also prevents phantoms, but permits write skew; SERIALIZABLE is SSI — no range locks, no blocking, it aborts with SQLSTATE 40001 and the application **must retry**. **MySQL InnoDB:** default REPEATABLE READ with snapshot reads plus next-key/gap locks for locking reads. The ANSI table also omits lost update and read skew. Source: PostgreSQL docs, 'Transaction Isolation'.

<a id="m2-q39"></a>

#### Q39. What is write skew, and why does snapshot isolation permit it?
Say this. Two transactions each read a set of rows, each decides its change is fine based on what it read, and both commit - producing a state neither would have allowed. The classic case is two doctors both dropping off on-call because each sees the other still on.
Why. Snapshot isolation guarantees each transaction sees a consistent snapshot and detects write-write conflicts. But these two wrote different rows, so there is no conflict to detect - the conflict is on a condition, not a row.
Instead of. Serializable, or an explicit lock on the thing the condition depends on. This is a strong Month 7 topic and a genuine differentiator.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Who permits write skew: SQL Server SNAPSHOT, PostgreSQL REPEATABLE READ, Oracle 'SERIALIZABLE' (which is really snapshot isolation) and anything weaker. SQL Server SERIALIZABLE and PostgreSQL SERIALIZABLE (SSI) prevent it.

<a id="m2-q40"></a>

#### Q40. MVCC in PostgreSQL versus locking in SQL Server - what is the practical difference?
Say this. PostgreSQL keeps multiple row versions, so a reader never blocks a writer and a writer never blocks a reader - readers see the version valid at their snapshot. SQL Server by default uses shared locks for reads, so readers can block writers, unless you enable snapshot isolation or read committed snapshot.
Why. MVCC trades storage and cleanup work for concurrency: old versions accumulate and must be vacuumed. Locking trades concurrency for simplicity and no cleanup.
Watch out. This is why `WITH (NOLOCK)` is so widespread in SQL Server codebases - people reaching for read uncommitted to avoid blocking, and accepting dirty reads without realising it. Snapshot isolation is the correct fix.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] The usual fix for NOLOCK culture is RCSI (statement-level versioning, no code change), not SNAPSHOT (needs code changes and produces update conflicts). Versioning costs tempdb space (or the persistent version store with ADR in SQL Server 2019+). PostgreSQL SSI does not block readers either.

<a id="m2-q41"></a>

#### Q41. What causes a SQL deadlock, and what is lock escalation?
Say this. A deadlock is two transactions each holding a lock the other needs - usually because they touched the same rows in a different order. The engine detects the cycle and kills one as the victim. Lock escalation is the engine converting many row locks into a single table lock to save memory, which suddenly blocks everyone.
Why. The fix for deadlocks is consistent access order, the same principle as lock ordering in application code. The fix for escalation is smaller batches.
Watch out. A large UPDATE or DELETE in one statement is the classic escalation trigger. Batching it into chunks of a few thousand rows is the standard remedy - and a genuinely useful thing to know at Casepoint scale.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Lock escalation is SQL Server-only: about 5,000 locks on one object escalate to a table/partition lock. PostgreSQL and InnoDB never escalate. So 'batch in a few thousand' means keep each batch under ~5,000 rows on SQL Server.

<a id="m2-q42"></a>

#### Q42. When would you denormalise on purpose?
Say this. When a read path is hot and the join cost is measured, not guessed. Storing a computed count or a copy of a parent name avoids a join on every read. You accept that the copy can drift and you take responsibility for keeping it correct.
Why. Normalisation optimises for write correctness - one fact in one place. Denormalisation optimises for read speed by duplicating. Both are right; they answer different questions.
Watch out. Always state the cost: now there are two sources of truth and something must keep them in sync. Denormalising without saying that reads as not understanding the trade.
<a id="m2-q43"></a>

#### Q43. Why does connection pooling matter?
Say this. Opening a database connection is expensive - a TCP handshake, authentication, session setup. The pool keeps them open and hands them out, so a request pays almost nothing. It also caps total connections, which protects the database from being overwhelmed.
Why. That cap is why pool exhaustion is a real production failure: if code holds connections too long - a long transaction, or a leaked `DbContext` - requests queue waiting for one, and you see timeouts that look like database slowness but are not.
Watch out. "Timeout expired. The timeout period elapsed prior to obtaining a connection from the pool" is this exact error, and it usually means a leak, not a slow database.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Default `Max Pool Size` is 100 in both SqlClient and Npgsql.



## Database internals — prompts and answers

<a id="qs-2"></a>

### 2. Database internals — important gap

*Source: Q-and-A/system-designdistributed-systems foundation.docx (prompt list). Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Your current material talks about transactions and isolation, but I'd add:
- What is a database transaction?
- ACID — what does each property actually guarantee?
- What are dirty reads, non-repeatable reads and phantom reads?
- Read committed vs repeatable read vs serializable?
- Optimistic vs pessimistic locking?
- Row-level vs table-level locking?
- What is MVCC?
- What is a deadlock and how does a database handle it?
- What is a B-tree index?
- Why can too many indexes hurt writes?
- Composite indexes — how does column order matter?
- What is a covering index?
- What is query execution planning?
- What causes an N+1 query problem?
- What is connection pooling?
- What happens when the DB connection pool is exhausted?
- Database migration strategies for zero-downtime deployments?
- What is CDC (Change Data Capture)?
- When would you use CDC instead of an application-level event?
Priority: High for SDE-II.


<a id="gap-02"></a>

#### Answers to the section 2 prompts (written 13 Oct 2026, kept in full)

Practice for every card below: Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

<a id="gap-02-001"></a>


#### GAP-02-001 — What is a database transaction?

**Answer / starting outline.** A transaction groups operations into a commit/rollback unit. Its atomicity and isolation apply to resources inside that transaction boundary. A database transaction does not automatically include an HTTP payment call or broker publish.



<a id="gap-02-002"></a>


#### GAP-02-002 — ACID — what does each property actually guarantee?

**Answer / starting outline.** Atomicity: all-or-nothing committed changes. Consistency: preserve defined constraints/invariants through valid transactions. Isolation: constrain concurrent interference according to the chosen level. Durability: committed changes survive failures covered by the database/configuration. Business correctness still depends on correctly defined operations.



<a id="gap-02-003"></a>


#### GAP-02-003 — What are dirty reads, non-repeatable reads and phantom reads?

**Answer / starting outline.** Dirty read sees uncommitted data. Non-repeatable read sees a previously read row change across reads. Phantom read sees a set of matching rows change. These definitions describe anomalies; engines implement isolation differently.



<a id="gap-02-004"></a>


#### GAP-02-004 — Read committed vs repeatable read vs serializable?

**Answer / starting outline.** Read committed generally gives committed data for each statement. Repeatable read preserves a stronger view, but implementation matters. PostgreSQL repeatable read prevents phantoms yet can permit serialization anomalies; its read uncommitted behaves as read committed. Serializable requires a result equivalent to a serial execution and can require transaction retries.



<a id="gap-02-005"></a>


#### GAP-02-005 — Optimistic vs pessimistic locking?

**Answer / starting outline.** Optimistic concurrency checks that a version/state has not changed before committing and retries/rejects conflicts. Pessimistic concurrency takes locks before making the change. Optimistic suits low conflicts; pessimistic can simplify high-contention invariants but adds waits and deadlock risk.



<a id="gap-02-006"></a>


#### GAP-02-006 — Row-level vs table-level locking?

**Answer / starting outline.** Row locks coordinate access to particular rows; table locks cover wider access. Actual lock modes, predicate/range locks and escalation vary by engine. Narrower locking often improves concurrency but consumes resources and is not a substitute for suitable isolation.



<a id="gap-02-007"></a>


#### GAP-02-007 — What is MVCC?

**Answer / starting outline.** MVCC retains multiple row versions so readers can obtain an appropriate snapshot without always blocking writers. Snapshot visibility depends on isolation and transaction state. Versions need cleanup; long transactions can delay reclamation and increase storage pressure.



<a id="gap-02-008"></a>


#### GAP-02-008 — What is a deadlock and how does a database handle it?

**Answer / starting outline.** A database deadlock is a cycle of transactions waiting on one another’s locks. The engine detects or times out the situation and aborts a victim. Retry the whole affected transaction when safe, shorten transactions and use consistent lock ordering.



<a id="gap-02-009"></a>


#### GAP-02-009 — What is a B-tree index?

**Answer / starting outline.** A B-tree-family index keeps keys in an ordered balanced structure, supporting efficient key/range lookup. Tree height grows slowly, while actual performance depends on pages, cache, selectivity and heap/table visits. A hash index and a B-tree have different access properties.



<a id="gap-02-010"></a>


#### GAP-02-010 — Why can too many indexes hurt writes?

**Answer / starting outline.** Every indexed insert/delete and relevant update must maintain additional structures, increasing I/O, CPU and sometimes contention. Indexes consume storage/cache. Keep indexes justified by actual queries and check whether apparently redundant indexes enforce different constraints.



<a id="gap-02-011"></a>


#### GAP-02-011 — Composite indexes — how does column order matter?

**Answer / starting outline.** A composite index orders keys lexicographically, such as (TenantId, CreatedAt, Id). Leading-column equality and subsequent range/order predicates often fit well. Planner capabilities vary, so avoid treating the left-prefix heuristic as an absolute rule. Compare actual plans for required queries.



<a id="gap-02-012"></a>


#### GAP-02-012 — What is a covering index?

**Answer / starting outline.** A covering index supplies all columns a query needs through its keys/included data, potentially avoiding extra table fetches. Index-only behavior also depends on engine visibility rules. Including too much data increases size and write maintenance.



<a id="gap-02-013"></a>


#### GAP-02-013 — What is query execution planning?

**Answer / starting outline.** The optimizer chooses an execution plan using available indexes, statistics and estimated costs. EXPLAIN shows estimated operations; an execution-enabled plan adds actual behavior and may run the statement. Check estimated-versus-actual row counts, scans, joins, sorts and buffers on safe representative data.



<a id="gap-02-014"></a>


#### GAP-02-014 — What causes an N+1 query problem?

**Answer / starting outline.** N+1 occurs when loading N parent records causes an additional query per parent, commonly through lazy loading. Use a bounded projection, suitable join/eager loading or batch fetch. One giant join can cause cartesian explosion, so measure rows/bytes rather than merely reducing query count.



<a id="gap-02-015"></a>


#### GAP-02-015 — What is connection pooling?

**Answer / starting outline.** Connection pooling reuses established connections instead of opening one for each operation. Checkout duration and pool size bound concurrent database usage. Dispose/return connections promptly; a connection pool and database server capacity are different limits.



<a id="gap-02-016"></a>


#### GAP-02-016 — What happens when the DB connection pool is exhausted?

**Answer / starting outline.** Requests wait or fail when no pooled connection becomes available within the configured bound. Causes include leaked connections, long transactions and excessive concurrency. Investigate checkout time, database waits and pool metrics before increasing the limit and overloading the server.



<a id="gap-02-017"></a>


#### GAP-02-017 — Database migration strategies for zero-downtime deployments?

**Answer / starting outline.** Use expand-and-contract: add backward-compatible schema, deploy compatible code, backfill in bounded steps, switch reads/writes, then remove old schema after old code is gone. Plan locks, rollback and data compatibility. “Migration succeeded” does not mean mixed-version traffic is safe.



<a id="gap-02-018"></a>


#### GAP-02-018 — What is CDC (Change Data Capture)?

**Answer / starting outline.** CDC captures database changes, commonly from transaction logs, and sends them downstream. It can support replication, analytics or event pipelines. Handle snapshots, offsets, delete events, schema evolution and duplicates; row changes are not automatically meaningful domain events.



<a id="gap-02-019"></a>


#### GAP-02-019 — When would you use CDC instead of an application-level event?

**Answer / starting outline.** Use CDC for existing/legacy writers or comprehensive data-change propagation when application hooks are impractical. Application events express domain meaning more clearly. An outbox captured through CDC can combine domain events with transactional storage; both approaches need consumer/replay semantics.





## SQL, OS and networking proof tasks (12 Oct guide)

<a id="f05-s6"></a>

### 6. SQL, operating systems and networking

*Source: FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md (12 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*


These are required engineering foundations, not a separate degree course. Much already exists in your old month documents; the improvement is to attach exercises.

| Track | Basics | Deeper layer | Proof of understanding |
|---|---|---|---|
| SQL querying | SELECT/WHERE, joins, aggregates, GROUP BY/HAVING, NULL, ordering | Window functions, CTEs, EXISTS, deduplication, top-N per group, running totals, pagination | Solve 15–20 varied queries across a small jobs/tenants/attempts schema |
| Data modeling | Keys, constraints, cardinality, relationships, normalization | Denormalization, JSON trade-offs, audit/history, tenant keys | Schema that enforces actual business invariants |
| Indexes/plans | B-tree, composite column order, selectivity, covering indexes | Query plans, statistics, SARGability, write cost, hot indexes, keyset pagination | Compare plans and timings before/after an index on representative data |
| Transactions | Atomicity, commit/rollback, locks, isolation | MVCC, lost update, write skew, deadlock retries, optimistic vs pessimistic control | Two sessions reproduce a booking race and then prevent it |
| Storage/operations | Durable writes, WAL/log concept, connection pooling | Backup/restore, safe migration, retention, partitioning/replicas | Restore a test backup and rehearse a backward-compatible schema change |
| Operating systems | Processes/threads, address space, stack/heap, scheduling, system calls, files/sockets | Virtual memory/page faults, context switch, deadlocks, I/O completion, file descriptors | Identify CPU saturation versus blocked I/O versus memory pressure in a toy program |
| Networking | DNS, IP/ports, TCP/UDP, TLS, HTTP methods/status/headers | Keepalive, timeouts, HTTP/2/3 concepts, reverse proxy/LB, caches, WebSockets/SignalR | Trace a request end to end and diagnose a failed/slow connection |
| Everyday engineering tools | Git commits/branches/diffs, terminal, environment variables, logs | Merge conflict resolution, bisect concept, code review, Linux process/network basics | Review a small change and diagnose a container/API failure |

Teach SQL Server and PostgreSQL separately where semantics differ. For example, PostgreSQL Repeatable Read does not behave exactly like a generic SQL-standard anomaly table; see [its isolation documentation](https://www.postgresql.org/docs/14/transaction-iso.html).


<a id="add-sql-setup"></a>

## ➕ Lab setup: PostgreSQL and SQL Server in Docker

You need two databases on your laptop. Docker is the easiest way. Install Docker Desktop (WSL 2 backend on Windows) first.

### Versions (verify)

- **PostgreSQL:** 18 is the stable major version used here (released September 2025). PostgreSQL 19 was in beta in mid-2026 and may be released by now (verify on postgresql.org/support/versioning). Everything below also runs on 17, except `uuidv7()` and two small EXPLAIN details, which are marked.
- **SQL Server:** 2022 Developer edition. Developer edition is free and has all Enterprise features, but you may not use it in production. SQL Server 2025 is also available as `mssql/server:2025-latest` (verify).

### One `docker run` each (PowerShell)

```powershell
# PostgreSQL 18. From 18, the image keeps data under /var/lib/postgresql/18/docker,
# so mount the volume at /var/lib/postgresql (verify on the Docker Hub "postgres" page).
docker run -d --name pg -e POSTGRES_PASSWORD=Passw0rd! -e POSTGRES_DB=jobs `
  -p 5432:5432 -v pgdata18:/var/lib/postgresql postgres:18

# PostgreSQL 17 instead: the old path still applies.
# docker run -d --name pg -e POSTGRES_PASSWORD=Passw0rd! -e POSTGRES_DB=jobs -p 5432:5432 -v pgdata17:/var/lib/postgresql/data postgres:17

# SQL Server 2022 Developer. It needs about 2 GB of RAM. The password must be strong
# (8+ characters, three of: upper, lower, digit, symbol) or the container stops.
docker run -d --name mssql -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Passw0rd!2026" `
  -e "MSSQL_PID=Developer" -p 1433:1433 -v mssqldata:/var/opt/mssql `
  mcr.microsoft.com/mssql/server:2022-latest
```

Check that both are running: `docker ps`. If one is missing, read its log: `docker logs mssql`.

### Minimal docker-compose

Save as `docker-compose.yml` and run `docker compose up -d`. Stop with `docker compose down` (data stays in the volumes).

```yaml
services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: "Passw0rd!"
      POSTGRES_DB: jobs
    ports: ["5432:5432"]
    volumes: ["pgdata18:/var/lib/postgresql"]
  mssql:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Passw0rd!2026"
      MSSQL_PID: Developer
    ports: ["1433:1433"]
    volumes: ["mssqldata:/var/opt/mssql"]
volumes:
  pgdata18:
  mssqldata:
```

### Connect

| Tool | How |
|---|---|
| psql (no install) | `docker exec -it pg psql -U postgres -d jobs` |
| Run a .sql file with psql | `Get-Content schema.sql \| docker exec -i pg psql -U postgres -d jobs -v ON_ERROR_STOP=1` |
| sqlcmd (no install) | `docker exec -it mssql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Passw0rd!2026" -C` (path and `-C` flag apply to recent 2022 images; verify) |
| SSMS (Windows) | Server `localhost,1433`, SQL Server Authentication, user `sa`. Tick **Trust server certificate**. |
| VS Code | MSSQL extension for SQL Server; Microsoft's PostgreSQL extension for PostgreSQL (verify). |
| Azure Data Studio | Retired on 28 February 2026. Microsoft says to use the VS Code MSSQL extension instead (learn.microsoft.com). Do not install it now. |
| DBeaver | One tool for both. New connection → PostgreSQL (localhost:5432) or SQL Server (localhost:1433; set driver property `trustServerCertificate=true`). |

Useful psql commands: `\dt` (tables), `\d jobs` (one table), `\di` (indexes), `\timing on` (show time per statement), `\x` (vertical output), `\q` (quit).

Connection strings for .NET:

```text
PostgreSQL (Npgsql):   Host=localhost;Port=5432;Database=jobs;Username=postgres;Password=Passw0rd!
SQL Server (SqlClient): Server=localhost,1433;Database=labdb;User Id=sa;Password=Passw0rd!2026;TrustServerCertificate=True
```

`TrustServerCertificate=True` is for a local lab only. Microsoft.Data.SqlClient encrypts by default, and the container uses a self-signed certificate.

<a id="add-sql-schema"></a>

## ➕ Practice schema: the job platform

This schema is used by every lab below. It is also the start of your job-platform project. A tenant (a customer company) has users. Users submit jobs. Workers run jobs; every try is a row in `job_attempts`. When a job finishes, the app writes an event to `outbox_messages` in the same transaction. Consumers record what they handled in `processed_messages`, so a duplicate message is ignored.

Design choices you should be able to defend:

- **`status` is `text` with a CHECK constraint, not an enum.** Both work. A CHECK constraint is easier to change later (drop and re-add it). A PostgreSQL enum can add a value but cannot easily remove one.
- **`tenant_id` is in every table**, and indexes for tenant-facing queries start with `tenant_id`. Composite foreign keys such as `(tenant_id, created_by)` make the database reject a job that points to a user in another tenant.
- **All times are `timestamptz`.** PostgreSQL stores them as UTC and converts on display.
- **Identity columns** (`GENERATED ALWAYS AS IDENTITY`) instead of the older `serial`.

### DDL (PostgreSQL 17+)

```sql
DROP TABLE IF EXISTS processed_messages, outbox_messages, job_attempts, jobs, users, tenants CASCADE;

CREATE TABLE tenants (
    tenant_id   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        text        NOT NULL UNIQUE,
    plan        text        NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
    user_id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id    bigint      NOT NULL REFERENCES tenants (tenant_id),
    email        text        NOT NULL,
    display_name text,
    created_at   timestamptz NOT NULL DEFAULT now(),
    deleted_at   timestamptz NULL,                    -- soft delete
    -- Needed so other tables can use a composite FK (tenant_id, user_id).
    CONSTRAINT uq_users_tenant_user UNIQUE (tenant_id, user_id)
);

-- Login lookup. lower(): PostgreSQL text comparison is case-sensitive, so this stops
-- 'A@x.com' and 'a@x.com' from both existing. WHERE deleted_at IS NULL: a deleted
-- user's email can be registered again (a soft-delete trade-off).
CREATE UNIQUE INDEX uq_users_tenant_email_active
    ON users (tenant_id, lower(email)) WHERE deleted_at IS NULL;

CREATE TABLE jobs (
    job_id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id       bigint      NOT NULL REFERENCES tenants (tenant_id),
    created_by      bigint      NULL,                 -- NULL = created by the system
    job_type        text        NOT NULL,             -- 'ocr', 'index', 'export', 'email', 'thumbnail'
    status          text        NOT NULL DEFAULT 'queued'
                    CHECK (status IN ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
    priority        smallint    NOT NULL DEFAULT 5 CHECK (priority BETWEEN 1 AND 9),  -- 1 = most urgent
    idempotency_key text        NULL,
    payload         jsonb       NOT NULL DEFAULT '{}',
    attempt_count   int         NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
    max_attempts    int         NOT NULL DEFAULT 3,
    run_after       timestamptz NOT NULL DEFAULT now(),
    locked_by       text        NULL,
    locked_until    timestamptz NULL,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    finished_at     timestamptz NULL,
    version         int         NOT NULL DEFAULT 1,   -- optimistic concurrency token
    -- The creator must belong to the same tenant (not checked when created_by is NULL).
    CONSTRAINT fk_jobs_creator FOREIGN KEY (tenant_id, created_by) REFERENCES users (tenant_id, user_id),
    -- Invariant: a job has finished_at if and only if it is in a final state.
    CONSTRAINT ck_jobs_finished CHECK ((status IN ('succeeded', 'failed', 'cancelled')) = (finished_at IS NOT NULL)),
    -- Same request submitted twice = same job. NULL keys do not conflict with each other.
    CONSTRAINT uq_jobs_idempotency UNIQUE (tenant_id, idempotency_key),
    -- Target for the composite FK from job_attempts.
    CONSTRAINT uq_jobs_tenant_job UNIQUE (tenant_id, job_id)
);

-- Tenant job list, newest first, and keyset pagination (exercise 17).
-- job_id is the tie-breaker so the order is unique.
CREATE INDEX ix_jobs_tenant_created ON jobs (tenant_id, created_at DESC, job_id DESC);

-- "Show my failed jobs, newest first". Equality columns first, then the sort column.
CREATE INDEX ix_jobs_tenant_status_created ON jobs (tenant_id, status, created_at DESC);

-- Worker dequeue (exercise 20). A partial index: only queued rows are in it, so it stays
-- tiny even when the table is huge. No tenant_id: the queue is global on purpose.
CREATE INDEX ix_jobs_dequeue ON jobs (priority, run_after) WHERE status = 'queued';

-- Reaper: find running jobs whose lease expired (the worker probably died).
CREATE INDEX ix_jobs_running_lease ON jobs (locked_until) WHERE status = 'running';

-- No index on (tenant_id, created_by) on purpose: users are soft-deleted, so no DELETE
-- needs it. PostgreSQL does NOT index foreign keys for you. Add it if you hard-delete users.

CREATE TABLE job_attempts (
    attempt_id    bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id     bigint      NOT NULL,
    job_id        bigint      NOT NULL,
    attempt_no    int         NOT NULL CHECK (attempt_no >= 1),
    worker_id     text        NOT NULL,
    started_at    timestamptz NOT NULL,
    finished_at   timestamptz NULL,
    outcome       text        NULL CHECK (outcome IN ('succeeded', 'failed', 'timed_out')),
    error_message text        NULL,
    CONSTRAINT fk_attempts_job FOREIGN KEY (tenant_id, job_id)
        REFERENCES jobs (tenant_id, job_id) ON DELETE CASCADE,
    CONSTRAINT ck_attempts_time CHECK (finished_at IS NULL OR finished_at >= started_at),
    -- One row per try. Also serves "attempts of a job" and the FK lookup on delete.
    CONSTRAINT uq_attempts UNIQUE (tenant_id, job_id, attempt_no)
);

-- Tenant reports by time ("slowest attempts this week").
CREATE INDEX ix_attempts_tenant_started ON job_attempts (tenant_id, started_at);

CREATE TABLE outbox_messages (
    -- gen_random_uuid() is UUIDv4 (random). On PostgreSQL 18+ use DEFAULT uuidv7():
    -- time-ordered, so new keys go to the end of the index (verify your version).
    message_id       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id        bigint      NOT NULL REFERENCES tenants (tenant_id),
    aggregate_type   text        NOT NULL,
    aggregate_id     bigint      NOT NULL,
    message_type     text        NOT NULL,
    payload          jsonb       NOT NULL,
    created_at       timestamptz NOT NULL DEFAULT now(),
    published_at     timestamptz NULL,
    publish_attempts int         NOT NULL DEFAULT 0,
    last_error       text        NULL
);

-- The relay only reads unpublished rows, oldest first. Partial index = small and hot.
-- Global, not per tenant: the relay is a background process for all tenants.
CREATE INDEX ix_outbox_unpublished ON outbox_messages (created_at) WHERE published_at IS NULL;

CREATE TABLE processed_messages (
    consumer_name text        NOT NULL,
    message_id    uuid        NOT NULL,
    tenant_id     bigint      NOT NULL,
    processed_at  timestamptz NOT NULL DEFAULT now(),
    -- The inbox check: "has this consumer already handled this message?"
    PRIMARY KEY (consumer_name, message_id)
);

-- Cleanup job deletes old rows: DELETE ... WHERE processed_at < now() - interval '30 days'.
CREATE INDEX ix_processed_at ON processed_messages (processed_at);
```

### Generate about 1M jobs

Run this after the DDL. It may take a minute or two. Shape of the data: 100 tenants, 10 users per tenant (users 9 and 10 of each tenant never create jobs, for exercise 3), 1,000,000 jobs over the last year, about 85% succeeded and 5% failed, and 1 to 3 attempts per job with a long tail of durations.

```sql
TRUNCATE processed_messages, outbox_messages, job_attempts, jobs, users, tenants RESTART IDENTITY CASCADE;

-- Explicit ids for the small tables, so the job generator can compute valid user ids.
INSERT INTO tenants (tenant_id, name, plan) OVERRIDING SYSTEM VALUE
SELECT g, 'tenant-' || g, (ARRAY['free', 'pro', 'enterprise'])[1 + g % 3]
FROM generate_series(1, 100) AS g;

INSERT INTO users (user_id, tenant_id, email, display_name) OVERRIDING SYSTEM VALUE
SELECT g, (g - 1) / 10 + 1, 'user' || g || '@tenant' || ((g - 1) / 10 + 1) || '.test', 'User ' || g
FROM generate_series(1, 1000) AS g;

-- Move the identity counters past the explicit ids.
SELECT setval(pg_get_serial_sequence('tenants', 'tenant_id'), 100);
SELECT setval(pg_get_serial_sequence('users', 'user_id'), 1000);

WITH base AS (
    SELECT g, 1 + (g % 100) AS tenant_id, random() AS r
    FROM generate_series(1, 1000000) AS g
), shaped AS (
    SELECT g, tenant_id,
           CASE WHEN r < 0.85 THEN 'succeeded'
                WHEN r < 0.90 THEN 'failed'
                WHEN r < 0.93 THEN 'cancelled'
                WHEN r < 0.95 THEN 'running'
                ELSE 'queued' END AS status,
           CASE WHEN r < 0.93 THEN now() - random() * interval '365 days'
                ELSE now() - random() * interval '2 hours' END AS created_at
    FROM base
)
INSERT INTO jobs (tenant_id, created_by, job_type, status, priority, idempotency_key, payload,
                  attempt_count, run_after, created_at, updated_at, finished_at)
SELECT tenant_id,
       CASE WHEN random() < 0.1 THEN NULL
            ELSE (tenant_id - 1) * 10 + 1 + floor(random() * 8)::int END,   -- users 1..8 of the tenant
       (ARRAY['ocr', 'index', 'export', 'email', 'thumbnail'])[1 + floor(random() * 5)::int],
       status,
       1 + floor(random() * 9)::int,
       CASE WHEN g % 3 = 0 THEN 'req-' || g END,
       jsonb_build_object('doc_id', g, 'pages', 1 + floor(random() * 500)::int),
       CASE status WHEN 'failed' THEN 3 WHEN 'queued' THEN 0 WHEN 'cancelled' THEN 0
                   ELSE 1 + (random() < 0.1)::int END,
       created_at, created_at, created_at,
       CASE WHEN status IN ('succeeded', 'failed', 'cancelled')
            THEN created_at + random() * interval '30 minutes' END
FROM shaped;

-- 1 to 3 attempts per job. Duration = 1 s + a long tail (power(random(), 4) is mostly small).
INSERT INTO job_attempts (tenant_id, job_id, attempt_no, worker_id, started_at, finished_at, outcome, error_message)
SELECT j.tenant_id, j.job_id, a.n,
       'worker-' || (1 + floor(random() * 20)::int),
       j.created_at + (a.n - 1) * interval '1 minute',
       CASE WHEN a.n = j.attempt_count AND j.status = 'running' THEN NULL
            ELSE j.created_at + (a.n - 1) * interval '1 minute'
                 + (1 + 120 * power(random(), 4)) * interval '1 second' END,
       CASE WHEN a.n = j.attempt_count AND j.status = 'running'   THEN NULL
            WHEN a.n = j.attempt_count AND j.status = 'succeeded' THEN 'succeeded'
            WHEN random() < 0.2 THEN 'timed_out'
            ELSE 'failed' END,
       NULL
FROM jobs AS j
CROSS JOIN LATERAL generate_series(1, j.attempt_count) AS a(n);

UPDATE job_attempts SET error_message = 'simulated error ' || (attempt_id % 7)
WHERE outcome IN ('failed', 'timed_out');

-- Outbox: one JobCompleted event for 50,000 recent finished jobs; about 2% still unpublished.
INSERT INTO outbox_messages (tenant_id, aggregate_type, aggregate_id, message_type, payload, created_at, published_at)
SELECT tenant_id, 'job', job_id, 'JobCompleted',
       jsonb_build_object('jobId', job_id, 'status', status),
       finished_at,
       CASE WHEN random() < 0.98 THEN finished_at + interval '2 seconds' END
FROM jobs
WHERE finished_at IS NOT NULL
ORDER BY finished_at DESC
LIMIT 50000;

-- 500 duplicates ON PURPOSE (same event written twice, new message_id) for exercise 16.
INSERT INTO outbox_messages (tenant_id, aggregate_type, aggregate_id, message_type, payload, created_at, published_at)
SELECT tenant_id, aggregate_type, aggregate_id, message_type, payload, created_at, published_at
FROM outbox_messages
ORDER BY random()
LIMIT 500;

INSERT INTO processed_messages (consumer_name, message_id, tenant_id, processed_at)
SELECT 'billing', message_id, tenant_id, published_at + interval '1 second'
FROM outbox_messages
WHERE published_at IS NOT NULL;

-- Refresh statistics and the visibility map (needed for index-only scans).
VACUUM ANALYZE;

-- Check the result.
SELECT 'jobs' AS t, count(*) FROM jobs
UNION ALL SELECT 'job_attempts', count(*) FROM job_attempts
UNION ALL SELECT 'outbox_messages', count(*) FROM outbox_messages
UNION ALL SELECT 'processed_messages', count(*) FROM processed_messages;

SELECT status, count(*) FROM jobs GROUP BY status ORDER BY 2 DESC;
```

If an insert fails with a CHECK or FK error, read the constraint name in the error. It tells you which invariant the data broke. That is the constraint doing its job.

<a id="add-sql-queries"></a>

## ➕ 20 graded query exercises

Rules: write the query yourself first, run it, and only then open the solution. Tenant 7 owns users 61 to 70. Level 1 is basic, level 2 is intermediate, level 3 is what SDE-2 interviews ask. All solutions are PostgreSQL; SQL Server differences are noted.

### Level 1: basics

**1. Filter.** Show the 20 newest failed jobs of tenant 7 from the last 7 days.

<details><summary>Solution</summary>

```sql
SELECT job_id, job_type, created_at
FROM jobs
WHERE tenant_id = 7
  AND status = 'failed'
  AND created_at >= now() - interval '7 days'   -- a range on the raw column: index-friendly
ORDER BY created_at DESC
LIMIT 20;                                        -- SQL Server: SELECT TOP (20) ...
```

Do not write `created_at::date >= current_date - 7`. A cast on the column hides it from the index (see the index lab).
</details>

**2. Joins.** Show the 10 newest jobs of tenant 7 with the tenant name and the creator's email. System jobs (no creator) must appear, with the text `system`.

<details><summary>Solution</summary>

```sql
SELECT j.job_id, t.name AS tenant, COALESCE(u.email, 'system') AS creator, j.status, j.created_at
FROM jobs j
JOIN tenants t      ON t.tenant_id = j.tenant_id
LEFT JOIN users u   ON u.tenant_id = j.tenant_id AND u.user_id = j.created_by
WHERE j.tenant_id = 7
ORDER BY j.created_at DESC
LIMIT 10;
```

An inner join to `users` silently drops system jobs. Second trap: a filter on the right table of a LEFT JOIN belongs in `ON`. `WHERE u.deleted_at IS NULL` would remove the NULL rows and turn it back into an inner join.
</details>

**3. Anti-join.** Which users of tenant 7 have never created a job?

<details><summary>Solution</summary>

```sql
SELECT u.user_id, u.email
FROM users u
LEFT JOIN jobs j ON j.tenant_id = u.tenant_id AND j.created_by = u.user_id
WHERE u.tenant_id = 7
  AND j.job_id IS NULL;          -- no match = the LEFT JOIN filled NULLs
```

Expected: users 69 and 70. `NOT EXISTS` (exercise 10) is the other correct form and is often clearer.
</details>

**4. GROUP BY / HAVING.** List tenants with more than 40 failed jobs in the last 30 days, most first.

<details><summary>Solution</summary>

```sql
SELECT tenant_id, count(*) AS failed_jobs
FROM jobs
WHERE status = 'failed'                          -- row filter: before grouping
  AND created_at >= now() - interval '30 days'
GROUP BY tenant_id
HAVING count(*) > 40                             -- group filter: after grouping
ORDER BY failed_jobs DESC;
```

You may use the alias in `ORDER BY` but not in `HAVING` or `WHERE`, because of the logical order (see Q36).
</details>

**5. NULL trap.** How many jobs of tenant 7 were *not* created by user 61? Count system jobs too.

<details><summary>Solution</summary>

```sql
-- Wrong: NULL <> 61 is UNKNOWN, not TRUE, so system jobs are dropped.
SELECT count(*) FROM jobs WHERE tenant_id = 7 AND created_by <> 61;

-- Right:
SELECT count(*) FROM jobs WHERE tenant_id = 7 AND created_by IS DISTINCT FROM 61;
-- or: AND (created_by <> 61 OR created_by IS NULL)
```

Run both and compare. The difference is the number of system jobs. Also remember: `WHERE x = NULL` is never true; write `x IS NULL`.
</details>

**6. COUNT(\*) vs COUNT(col).** For tenants 1 to 5, show: all jobs, jobs with a creator, distinct creators, and finished jobs.

<details><summary>Solution</summary>

```sql
SELECT tenant_id,
       count(*)                   AS all_jobs,       -- counts rows
       count(created_by)          AS with_creator,   -- skips NULLs
       count(DISTINCT created_by) AS creators,       -- skips NULLs, then de-duplicates
       count(finished_at)         AS finished
FROM jobs
WHERE tenant_id BETWEEN 1 AND 5
GROUP BY tenant_id
ORDER BY tenant_id;
```

`creators` is 8, not 9: the system "creator" (NULL) is not counted.
</details>

**7. DISTINCT.** Which job types did tenant 7 run in the last 30 days, and how many types is that?

<details><summary>Solution</summary>

```sql
SELECT DISTINCT job_type
FROM jobs
WHERE tenant_id = 7 AND created_at >= now() - interval '30 days'
ORDER BY job_type;

SELECT count(DISTINCT job_type)
FROM jobs
WHERE tenant_id = 7 AND created_at >= now() - interval '30 days';
```

`SELECT DISTINCT x` and `GROUP BY x` give the same rows. Smell to avoid: adding DISTINCT to hide duplicates that a join created. That usually means you need `EXISTS` (exercise 10).
</details>

### Level 2: intermediate

**8. Conditional aggregation.** For each job type, in the last 30 days, show total jobs, succeeded, failed and success rate in percent.

<details><summary>Solution</summary>

```sql
SELECT job_type,
       count(*) AS total,
       count(*) FILTER (WHERE status = 'succeeded') AS succeeded,
       count(*) FILTER (WHERE status = 'failed')    AS failed,
       round(100.0 * count(*) FILTER (WHERE status = 'succeeded') / NULLIF(count(*), 0), 2) AS success_pct
FROM jobs
WHERE created_at >= now() - interval '30 days'
GROUP BY job_type
ORDER BY success_pct;
```

`100.0` avoids integer division. `NULLIF(..., 0)` avoids division by zero. SQL Server has no `FILTER`: use `SUM(CASE WHEN status = 'succeeded' THEN 1 ELSE 0 END)`.
</details>

**9. CTE.** For tenant 7, last 90 days, find job types whose failure rate is higher than the tenant's overall failure rate. Count only succeeded and failed jobs.

<details><summary>Solution</summary>

```sql
WITH recent AS (
    SELECT job_type, status
    FROM jobs
    WHERE tenant_id = 7
      AND created_at >= now() - interval '90 days'
      AND status IN ('succeeded', 'failed')
), overall AS (
    SELECT avg((status = 'failed')::int) AS fail_rate FROM recent
), by_type AS (
    SELECT job_type, count(*) AS n, avg((status = 'failed')::int) AS fail_rate
    FROM recent
    GROUP BY job_type
)
SELECT b.job_type, b.n,
       round(b.fail_rate * 100, 2) AS type_fail_pct,
       round(o.fail_rate * 100, 2) AS overall_fail_pct
FROM by_type b CROSS JOIN overall o
WHERE b.fail_rate > o.fail_rate
ORDER BY b.fail_rate DESC;
```

A CTE gives each step a name. It is for readability. Since PostgreSQL 12 a simple CTE is usually inlined, so it is not automatically "computed once".
</details>

**10. EXISTS vs IN, and the NOT IN trap.** (a) List jobs of tenant 7 that had at least one `timed_out` attempt. (b) Redo exercise 3 with `NOT IN` and explain the result.

<details><summary>Solution</summary>

```sql
-- (a) Three ways. EXISTS and IN are semi-joins: each job appears once.
SELECT j.job_id FROM jobs j
WHERE j.tenant_id = 7
  AND EXISTS (SELECT 1 FROM job_attempts a
              WHERE a.tenant_id = j.tenant_id AND a.job_id = j.job_id AND a.outcome = 'timed_out');

SELECT j.job_id FROM jobs j
WHERE j.tenant_id = 7
  AND j.job_id IN (SELECT a.job_id FROM job_attempts a WHERE a.tenant_id = 7 AND a.outcome = 'timed_out');

-- JOIN returns a job once per matching attempt, so it needs DISTINCT. Avoid.
SELECT DISTINCT j.job_id FROM jobs j
JOIN job_attempts a ON a.tenant_id = j.tenant_id AND a.job_id = j.job_id
WHERE j.tenant_id = 7 AND a.outcome = 'timed_out';

-- (b) The trap: this returns ZERO rows.
SELECT u.user_id FROM users u
WHERE u.tenant_id = 7
  AND u.user_id NOT IN (SELECT created_by FROM jobs WHERE tenant_id = 7);
```

Why zero rows: the subquery contains NULL (system jobs). `69 NOT IN (61, ..., NULL)` means `69 <> NULL AND ...`, which is UNKNOWN, never TRUE. Fix: use `NOT EXISTS`, or add `AND created_by IS NOT NULL` inside the subquery. Rule: never use `NOT IN` with a subquery on a nullable column. For performance, modern planners usually treat `EXISTS` and `IN` the same; check the plan.
</details>

**11. Latest attempt per job (ROW_NUMBER).** For every failed job of tenant 7, show only its latest attempt.

<details><summary>Solution</summary>

```sql
SELECT job_id, attempt_no, outcome, error_message, finished_at
FROM (
    SELECT a.*,
           row_number() OVER (PARTITION BY a.job_id ORDER BY a.attempt_no DESC) AS rn
    FROM job_attempts a
    JOIN jobs j ON j.tenant_id = a.tenant_id AND j.job_id = a.job_id
    WHERE j.tenant_id = 7 AND j.status = 'failed'
) x
WHERE rn = 1;

-- PostgreSQL shortcut:
SELECT DISTINCT ON (a.job_id) a.job_id, a.attempt_no, a.outcome
FROM job_attempts a
JOIN jobs j ON j.tenant_id = a.tenant_id AND j.job_id = a.job_id
WHERE j.tenant_id = 7 AND j.status = 'failed'
ORDER BY a.job_id, a.attempt_no DESC;
```

You cannot filter on `rn` in the same `SELECT`, because window functions run after `WHERE`. Wrap it in a subquery or CTE.
</details>

**12. Top-N per group.** For each job type, show the 3 slowest succeeded attempts in the last 7 days.

<details><summary>Solution</summary>

```sql
WITH d AS (
    SELECT j.job_type, a.job_id, a.finished_at - a.started_at AS duration,
           row_number() OVER (PARTITION BY j.job_type
                              ORDER BY a.finished_at - a.started_at DESC) AS rn
    FROM job_attempts a
    JOIN jobs j ON j.tenant_id = a.tenant_id AND j.job_id = a.job_id
    WHERE a.outcome = 'succeeded'
      AND a.started_at >= now() - interval '7 days'
)
SELECT job_type, job_id, duration
FROM d
WHERE rn <= 3
ORDER BY job_type, rn;
```

Alternative: `CROSS JOIN LATERAL (SELECT ... ORDER BY ... LIMIT 3)` per group. SQL Server calls it `CROSS APPLY`. LATERAL wins when there are few groups and a good index per group.
</details>

**13. Running total.** For tenant 7, show jobs created per day for the last 14 days and a running total.

<details><summary>Solution</summary>

```sql
SELECT day, jobs_created,
       sum(jobs_created) OVER (ORDER BY day) AS running_total
FROM (
    SELECT date_trunc('day', created_at) AS day, count(*) AS jobs_created
    FROM jobs
    WHERE tenant_id = 7 AND created_at >= now() - interval '14 days'
    GROUP BY 1
) d
ORDER BY day;
```

Notes: `sum(count(*)) OVER (...)` also works in one level. With `ORDER BY` the default frame is `RANGE UNBOUNDED PRECEDING`, so ties get the same total; write `ROWS UNBOUNDED PRECEDING` if you want row by row. "Day" uses the session time zone (`SHOW timezone;`). For India use `date_trunc('day', created_at, 'Asia/Kolkata')` (PostgreSQL 14+).
</details>

**14. RANK.** Rank tenants by failed jobs in the last 30 days. Show RANK, DENSE_RANK and ROW_NUMBER side by side.

<details><summary>Solution</summary>

```sql
SELECT tenant_id, failed,
       rank()       OVER (ORDER BY failed DESC) AS rnk,        -- 1, 2, 2, 4
       dense_rank() OVER (ORDER BY failed DESC) AS dense_rnk,  -- 1, 2, 2, 3
       row_number() OVER (ORDER BY failed DESC) AS row_num     -- 1, 2, 3, 4 (ties broken randomly)
FROM (
    SELECT tenant_id, count(*) AS failed
    FROM jobs
    WHERE status = 'failed' AND created_at >= now() - interval '30 days'
    GROUP BY tenant_id
) t
ORDER BY failed DESC;
```

Find a tie in your output and explain the three columns aloud. ROW_NUMBER with ties is not deterministic: add a tie-breaker such as `tenant_id`.
</details>

### Level 3: advanced

**15. Percentiles.** For each job type, in the last 30 days, show p50, p95, p99, average and maximum duration (seconds) of succeeded attempts.

<details><summary>Solution</summary>

```sql
SELECT j.job_type,
       count(*) AS n,
       round(percentile_cont(0.50) WITHIN GROUP (ORDER BY extract(epoch FROM a.finished_at - a.started_at))::numeric, 2) AS p50_s,
       round(percentile_cont(0.95) WITHIN GROUP (ORDER BY extract(epoch FROM a.finished_at - a.started_at))::numeric, 2) AS p95_s,
       round(percentile_cont(0.99) WITHIN GROUP (ORDER BY extract(epoch FROM a.finished_at - a.started_at))::numeric, 2) AS p99_s,
       round(avg(extract(epoch FROM a.finished_at - a.started_at)), 2) AS avg_s,
       round(max(extract(epoch FROM a.finished_at - a.started_at)), 2) AS max_s
FROM job_attempts a
JOIN jobs j ON j.tenant_id = a.tenant_id AND j.job_id = a.job_id
WHERE a.outcome = 'succeeded'
  AND a.started_at >= now() - interval '30 days'
GROUP BY j.job_type;
```

Look at the gap between p50 and p99: the data has a long tail, so the average hides it. That is why SLOs use percentiles. `percentile_cont` interpolates; `percentile_disc` returns a real value from the data. SQL Server: `PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY d) OVER (PARTITION BY job_type)` is a window function there, so add DISTINCT or group afterwards.
</details>

**16. Dedup with a window function.** The outbox contains duplicate events (same `aggregate_type`, `aggregate_id`, `message_type`). Count them, delete all but the oldest copy, then stop it happening again.

<details><summary>Solution</summary>

```sql
-- Count the extra copies.
SELECT count(*) - count(DISTINCT (aggregate_type, aggregate_id, message_type)) AS extra_copies
FROM outbox_messages;

-- Delete all but the first copy. message_id breaks ties when created_at is equal.
BEGIN;
WITH ranked AS (
    SELECT message_id,
           row_number() OVER (PARTITION BY aggregate_type, aggregate_id, message_type
                              ORDER BY created_at, message_id) AS rn
    FROM outbox_messages
)
DELETE FROM outbox_messages o
USING ranked r
WHERE o.message_id = r.message_id
  AND r.rn > 1;
-- Check the row count printed by psql. It should match extra_copies. Then:
COMMIT;

-- Prevent it: the database now rejects a second copy.
ALTER TABLE outbox_messages
    ADD CONSTRAINT uq_outbox_event UNIQUE (aggregate_type, aggregate_id, message_type);
```

Always run a destructive fix inside `BEGIN` and check the row count before `COMMIT`. In real life a job may emit the same event type twice on purpose; then the key must include something like an event sequence number.
</details>

**17. Keyset pagination vs OFFSET.** Page through tenant 7's jobs, newest first, 20 per page. Compare page 450 with OFFSET and with keyset, using `EXPLAIN (ANALYZE, BUFFERS)`.

<details><summary>Solution</summary>

```sql
-- OFFSET: the database reads 9,000 rows and throws them away.
EXPLAIN (ANALYZE, BUFFERS)
SELECT job_id, status, created_at
FROM jobs
WHERE tenant_id = 7
ORDER BY created_at DESC, job_id DESC
OFFSET 8980 LIMIT 20;

-- Keyset: remember the last row of the previous page and seek past it.
-- Get real values first, e.g. the last row of the OFFSET query above.
EXPLAIN (ANALYZE, BUFFERS)
SELECT job_id, status, created_at
FROM jobs
WHERE tenant_id = 7
  AND (created_at, job_id) < ('2026-01-05 10:00:00+00', 123456)   -- replace with real values
ORDER BY created_at DESC, job_id DESC
LIMIT 20;
```

What to see: the OFFSET plan's Index Scan reports about 9,000 actual rows; the keyset plan reports 20. The OFFSET cost grows with the page number; keyset stays flat. Keyset is also correct while new rows arrive (OFFSET pages shift, so users see duplicates or miss rows). Cost: no "jump to page 450". The index `ix_jobs_tenant_created (tenant_id, created_at DESC, job_id DESC)` matches the ORDER BY exactly. SQL Server has no row-value comparison: write `created_at < @c OR (created_at = @c AND job_id < @id)`, and use `OFFSET ... FETCH NEXT 20 ROWS ONLY` for offset paging.
</details>

**18. Upsert with `INSERT … ON CONFLICT`.** (a) A consumer receives a message. Record it in `processed_messages` and tell whether it is new or a duplicate. (b) Submit a job with an idempotency key so a retried request returns the same `job_id`.

<details><summary>Solution</summary>

```sql
-- (a) Inbox pattern. Run it twice: first "INSERT 0 1", then "INSERT 0 0" = duplicate, skip the work.
INSERT INTO processed_messages (consumer_name, message_id, tenant_id)
VALUES ('billing', '6f1c1e2a-0000-4000-8000-000000000001', 7)
ON CONFLICT (consumer_name, message_id) DO NOTHING;

-- (b) Idempotent job submission. Step 1: try to insert.
INSERT INTO jobs (tenant_id, created_by, job_type, idempotency_key, payload)
VALUES (7, 61, 'export', 'req-abc-001', '{"format": "pdf"}')
ON CONFLICT (tenant_id, idempotency_key) DO NOTHING
RETURNING job_id;
-- Step 2: if no row came back, the job already exists. Read it.
SELECT job_id, status FROM jobs WHERE tenant_id = 7 AND idempotency_key = 'req-abc-001';
```

`ON CONFLICT` needs a unique constraint or unique index on exactly those columns. It is atomic: two concurrent inserts cannot both win. `DO UPDATE SET ... = EXCLUDED.col` is the "update if it exists" form. In .NET, do (a) in the same transaction as the business change, so "handled" and "recorded" commit together. SQL Server has no `ON CONFLICT`: use `INSERT ... WHERE NOT EXISTS (SELECT ... WITH (UPDLOCK, HOLDLOCK))`, or insert and catch duplicate-key errors 2627/2601. Avoid plain `MERGE` for this: without `HOLDLOCK` it has race conditions.
</details>

**19. Recursive CTE (simple).** For tenant 7, show failed `email` jobs per day for the last 14 days. Days with zero must appear. Build the list of days with a recursive CTE.

<details><summary>Solution</summary>

```sql
WITH RECURSIVE days AS (
    SELECT date_trunc('day', now()) - interval '13 days' AS day      -- anchor: first day
    UNION ALL
    SELECT day + interval '1 day' FROM days                          -- step: next day
    WHERE day < date_trunc('day', now())                             -- stop condition
)
SELECT d.day::date, count(j.job_id) AS failed_email_jobs             -- count(j.job_id), NOT count(*)
FROM days d
LEFT JOIN jobs j
       ON j.tenant_id = 7 AND j.job_type = 'email' AND j.status = 'failed'
      AND j.created_at >= d.day AND j.created_at < d.day + interval '1 day'
GROUP BY d.day
ORDER BY d.day;
```

`count(*)` would show 1 on empty days, because the LEFT JOIN still returns one row with NULLs. In PostgreSQL, `generate_series(start, stop, interval '1 day')` is the shorter way; the recursive form is what you write on SQL Server and what interviewers want to see. The same pattern walks a tree (for example `parent_job_id`): anchor = the root row, step = `JOIN children c ON c.parent_id = t.id`. SQL Server stops at 100 levels unless you set `OPTION (MAXRECURSION n)`.
</details>

**20. Dequeue with SKIP LOCKED.** Write the worker query that claims the 5 most urgent queued jobs, marks them running with a 5-minute lease, and lets many workers run it at the same time without taking the same job. Test it in two psql sessions.

<details><summary>Solution</summary>

```sql
BEGIN;
WITH next_jobs AS (
    SELECT job_id
    FROM jobs
    WHERE status = 'queued' AND run_after <= now()
    ORDER BY priority, run_after
    LIMIT 5
    FOR UPDATE SKIP LOCKED              -- skip rows another worker has locked
)
UPDATE jobs j
SET status        = 'running',
    locked_by     = 'worker-1',
    locked_until  = now() + interval '5 minutes',
    attempt_count = attempt_count + 1,
    updated_at    = now(),
    version       = version + 1
FROM next_jobs n
WHERE j.job_id = n.job_id
RETURNING j.job_id, j.priority, j.attempt_count;
-- Session 2: run the same statement (worker-2) BEFORE session 1 commits.
-- It returns 5 DIFFERENT jobs and does not wait.
COMMIT;
```

It uses the partial index `ix_jobs_dequeue`. Without `SKIP LOCKED`, worker 2 waits for worker 1. Without `FOR UPDATE`, two workers can claim the same job. The lease (`locked_until`) plus the reaper index handles a worker that dies. SQL Server version: `SELECT TOP (5) ... WITH (UPDLOCK, READPAST, ROWLOCK)`. This is the core of your job-platform worker; say "SKIP LOCKED queue" in interviews and explain the lease.
</details>

<a id="add-sql-index-lab"></a>

## ➕ Index lab: from Seq Scan to Index Only Scan

Goal: produce your own before/after numbers. In an interview, "I measured it" beats "I read it". Theory is in Q31–Q34 and GAP-02-009 to 013; this lab is the practice.

### Step 0: a copy table with no indexes

```sql
-- CREATE TABLE AS copies the data but NO indexes and NO constraints.
DROP TABLE IF EXISTS lab_jobs;
CREATE TABLE lab_jobs AS SELECT * FROM jobs;
VACUUM ANALYZE lab_jobs;
\timing on
```

### How to read `EXPLAIN (ANALYZE, BUFFERS)`

`EXPLAIN` alone shows the plan the optimiser *expects*. `ANALYZE` really runs the query (careful with UPDATE/DELETE: wrap them in `BEGIN; ... ROLLBACK;`). On PostgreSQL 18, `ANALYZE` includes buffer counts automatically (verify); on 17 add `BUFFERS`.

| You see | It means |
|---|---|
| `Seq Scan`, `Parallel Seq Scan` | Reads the whole table |
| `Index Scan` | Walks the index, then fetches each row from the table (heap) |
| `Index Only Scan` + `Heap Fetches: 0` | Answered from the index alone |
| `Bitmap Index Scan` → `Bitmap Heap Scan` | Collects matching row locations first, then reads the pages in physical order |
| `cost=0.42..85.10` | Planner units, not milliseconds. Startup cost..total cost |
| `rows=` (estimate) vs `actual ... rows=` | A big difference means bad statistics: run `ANALYZE` |
| `Rows Removed by Filter: 999,500` | Work wasted on rows that did not match |
| `Buffers: shared hit=120 read=3400` | 8 KB pages from memory (hit) and from disk or the OS cache (read) |
| `Sort Method: top-N heapsort` | A sort the right index could remove |
| `Execution Time` | The real time on the server |

Run every query twice. The first run may read from disk (cold cache); the second is usually faster (warm). Record the warm numbers, and record buffers too: they do not change with the cache, so they are fairer than time.

### Step 1: the slow query

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT job_id, status, created_at
FROM lab_jobs
WHERE tenant_id = 42 AND status = 'failed'
ORDER BY created_at DESC
LIMIT 20;
```

Expect a (Parallel) Seq Scan, a large `Rows Removed by Filter`, and a sort. Write the numbers in the table at the end.

### Step 2: a single-column index

```sql
CREATE INDEX ix_lab_tenant ON lab_jobs (tenant_id);
ANALYZE lab_jobs;
-- re-run the Step 1 EXPLAIN
```

Expect a Bitmap Index Scan on `tenant_id`, then a Bitmap Heap Scan that reads every row of tenant 42 (about 10,000 rows, spread over many pages), filters on status, then sorts. Better, but still a lot of wasted reads.

### Step 3: a composite index

```sql
CREATE INDEX ix_lab_tenant_status_created ON lab_jobs (tenant_id, status, created_at DESC);
ANALYZE lab_jobs;
-- re-run the Step 1 EXPLAIN
```

Expect an Index Scan that reads about 20 entries and stops. No filter, no sort node: the index already gives the rows in the requested order. Buffers should drop sharply.

### Step 4: why column order matters

```sql
DROP INDEX ix_lab_tenant_status_created;
DROP INDEX ix_lab_tenant;
CREATE INDEX ix_lab_wrong ON lab_jobs (created_at, status, tenant_id);
ANALYZE lab_jobs;
-- re-run the Step 1 EXPLAIN
```

The index is sorted by `created_at` first. Rows for tenant 42 + failed are scattered through it, so the database must walk the index backwards and filter, or give up and do a Seq Scan. Compare buffers with Step 3.

Then test a second query on the good index:

```sql
DROP INDEX ix_lab_wrong;
CREATE INDEX ix_lab_tenant_status_created ON lab_jobs (tenant_id, status, created_at DESC);
EXPLAIN (ANALYZE, BUFFERS)
SELECT count(*) FROM lab_jobs
WHERE tenant_id = 42 AND created_at >= now() - interval '7 days';   -- no status
```

`status` is the middle column and the query does not give it. Before PostgreSQL 18, the index can only use `tenant_id` here and must check `created_at` on every tenant-42 entry. PostgreSQL 18 added B-tree **skip scan**, which can jump over the few status values (verify on your version). The rule to say in interviews: equality columns first, then the range or sort column; the index helps only from the left, unless the engine can skip.

### Step 5: a covering index with INCLUDE

```sql
-- A report that touches thousands of rows.
EXPLAIN (ANALYZE, BUFFERS)
SELECT job_type, count(*)
FROM lab_jobs
WHERE tenant_id = 42 AND created_at >= now() - interval '90 days'
GROUP BY job_type;

CREATE INDEX ix_lab_tenant_created ON lab_jobs (tenant_id, created_at);
ANALYZE lab_jobs;
-- re-run: Index Scan or Bitmap Heap Scan, many heap pages (every page holds rows of all tenants)

DROP INDEX ix_lab_tenant_created;
CREATE INDEX ix_lab_tenant_created_incl ON lab_jobs (tenant_id, created_at) INCLUDE (job_type);
VACUUM ANALYZE lab_jobs;      -- sets the visibility map, which index-only scans need
-- re-run: Index Only Scan, Heap Fetches: 0
```

`INCLUDE` columns are stored in the index leaf but are not part of the sort key. Use them for columns you only *read*. Cost: a bigger index and slower writes.

### Step 6: break SARGability, then fix it

```sql
CREATE INDEX ix_lab_created ON lab_jobs (created_at);
CREATE INDEX ix_lab_job_id  ON lab_jobs (job_id);
CREATE INDEX ix_lab_idem    ON lab_jobs (idempotency_key text_pattern_ops);
ANALYZE lab_jobs;

-- (a) Function or cast on the column: Seq Scan.
EXPLAIN ANALYZE SELECT count(*) FROM lab_jobs WHERE created_at::date = current_date - 3;
-- Fix: a range on the raw column: Index (Only) Scan.
EXPLAIN ANALYZE SELECT count(*) FROM lab_jobs
WHERE created_at >= current_date - 3 AND created_at < current_date - 2;

-- (b) Leading wildcard: Seq Scan. Prefix: index range scan.
EXPLAIN ANALYZE SELECT * FROM lab_jobs WHERE idempotency_key LIKE '%12345';
EXPLAIN ANALYZE SELECT * FROM lab_jobs WHERE idempotency_key LIKE 'req-12345%';

-- (c) Implicit conversion: bigint compared with numeric. The column is cast, so: Seq Scan.
EXPLAIN ANALYZE SELECT * FROM lab_jobs WHERE job_id = 500000.0;
-- Fix: the same type as the column: Index Scan.
EXPLAIN ANALYZE SELECT * FROM lab_jobs WHERE job_id = 500000;
```

Things to notice:

- In (c) the plan shows `Filter: ((job_id)::numeric = 500000.0)`. The cast is on the column side. In .NET this happens when you pass a `decimal` parameter for a `bigint` column. The SQL Server version (`nvarchar` parameter vs `varchar` column) is in the Q34 correction.
- Why `text_pattern_ops` in (b)? The Docker image usually creates databases with a non-C collation such as en_US.utf8 (check the Collate column of `\l`). With such a collation a normal B-tree cannot serve `LIKE 'abc%'` (postgresql.org, "Operator Classes and Operator Families").
- For a real "contains" search (`LIKE '%abc%'`), use a trigram index: `CREATE EXTENSION pg_trgm; CREATE INDEX ... USING gin (col gin_trgm_ops);`.
- A fix for (a) when you cannot change the query: an expression index. It must use an immutable expression, and `timestamptz::date` is not immutable (it depends on the time zone). The range rewrite is the right fix.

### Step 7: measure the write cost

```sql
-- How big are the indexes compared with the table?
SELECT indexrelname, pg_size_pretty(pg_relation_size(indexrelid)) AS size, idx_scan
FROM pg_stat_user_indexes WHERE relname = 'lab_jobs';
SELECT pg_size_pretty(pg_table_size('lab_jobs')) AS table_size;

-- Insert 100,000 rows WITH all the lab indexes. Note the time.
INSERT INTO lab_jobs SELECT * FROM jobs WHERE job_id <= 100000;

-- Drop every lab index, then insert the same rows again. Note the time.
DROP INDEX IF EXISTS ix_lab_tenant_status_created, ix_lab_tenant_created_incl,
                      ix_lab_created, ix_lab_job_id, ix_lab_idem;
INSERT INTO lab_jobs SELECT * FROM jobs WHERE job_id <= 100000;
```

`idx_scan` counts how often each index was used since the statistics were reset. On a real system, an index with `idx_scan = 0` after weeks is a candidate to drop, unless it enforces a unique constraint.

### Record your results

| Step | Plan node | Buffers (hit / read) | Execution time | Note |
|---|---|---|---|---|
| 1 no index | | | | |
| 2 `(tenant_id)` | | | | |
| 3 `(tenant_id, status, created_at)` | | | | |
| 4 wrong order | | | | |
| 5 without / with INCLUDE | | | | |
| 6 non-SARGable / fixed | | | | |
| 7 insert 100k: 5 indexes / none | | | | |

Keep this table. It becomes a one-minute interview story: "On 1M rows the query read N buffers; after the composite index it read M."

### SQL Server equivalents

- **Actual plan:** in SSMS press Ctrl+M (Include Actual Execution Plan), then run. Read right to left. Look for Index Seek vs Index Scan vs Key Lookup, thick arrows, and estimated vs actual rows.
- **Numbers:** `SET STATISTICS IO, TIME ON;` then run. The Messages tab shows `logical reads` per table (pages read from memory; the main number to compare) and CPU and elapsed time.
- **1M rows:** SQL Server 2022 has `GENERATE_SERIES(1, 1000000)` (needs compatibility level 160; verify).
- **Same ideas, same syntax:** composite indexes, `INCLUDE`, filtered indexes (`WHERE status = 'queued'`, the equivalent of a partial index).
- **History:** Query Store keeps plans and runtime stats over time and can force a good plan. The missing-index hint in a plan is a suggestion; do not create it blindly.

<a id="add-sql-isolation-lab"></a>

## ➕ Isolation and concurrency lab: two sessions

The theory is in Q37–Q41 and the isolation correction under Q38. Here you *see* each anomaly. Open two terminals side by side and run the steps in the order of the `[S1]` / `[S2]` labels. Do not run a whole block at once.

### Setup

PostgreSQL (two terminals: `docker exec -it pg psql -U postgres -d jobs`; type `\set PROMPT1 'S1> '` in the first and `\set PROMPT1 'S2> '` in the second):

```sql
CREATE SCHEMA IF NOT EXISTS lab;
DROP TABLE IF EXISTS lab.counters, lab.doctors, lab.flights, lab.bookings;
CREATE TABLE lab.counters (id int PRIMARY KEY, value int NOT NULL, version int NOT NULL DEFAULT 1);
INSERT INTO lab.counters (id, value) VALUES (1, 10), (2, 20);
CREATE TABLE lab.doctors (name text PRIMARY KEY, on_call boolean NOT NULL);
INSERT INTO lab.doctors VALUES ('alice', true), ('bob', true);
CREATE TABLE lab.flights (flight_id int PRIMARY KEY, seats_left int NOT NULL CHECK (seats_left >= 0));
INSERT INTO lab.flights VALUES (1, 1);                -- one seat left
CREATE TABLE lab.bookings (flight_id int NOT NULL, seat_no int NOT NULL, user_name text NOT NULL);
SET lock_timeout = '10s';                             -- run in BOTH sessions, so nothing hangs forever
```

SQL Server (two SSMS query windows, or two `sqlcmd` sessions):

```sql
CREATE DATABASE labdb;
GO
ALTER DATABASE labdb SET ALLOW_SNAPSHOT_ISOLATION ON;   -- for the SNAPSHOT tests
GO
USE labdb;
CREATE TABLE dbo.counters (id int PRIMARY KEY, value int NOT NULL, ver rowversion);
INSERT INTO dbo.counters (id, value) VALUES (1, 10), (2, 20);
CREATE TABLE dbo.doctors (name varchar(20) PRIMARY KEY, on_call bit NOT NULL);
INSERT INTO dbo.doctors VALUES ('alice', 1), ('bob', 1);
CREATE TABLE dbo.flights (flight_id int PRIMARY KEY, seats_left int NOT NULL CHECK (seats_left >= 0));
INSERT INTO dbo.flights VALUES (1, 1);
CREATE TABLE dbo.bookings (flight_id int NOT NULL, seat_no int NOT NULL, user_name varchar(20) NOT NULL);
```

A new on-premises SQL Server database has RCSI **off**, so plain reads take shared locks. Azure SQL Database has it on. Check: `SELECT name, is_read_committed_snapshot_on FROM sys.databases;`.

To see who blocks whom: PostgreSQL `SELECT pid, pg_blocking_pids(pid), wait_event_type, state, query FROM pg_stat_activity WHERE datname = 'jobs';`. SQL Server: `SELECT session_id, blocking_session_id, wait_type FROM sys.dm_exec_requests WHERE blocking_session_id <> 0;`.

Reset data between labs: `UPDATE lab.counters SET value = CASE id WHEN 1 THEN 10 ELSE 20 END, version = 1;`.

### Lab 1: lost update

The app reads a value, adds 1 in C#, and writes the result back.

```sql
-- [S1] BEGIN;
-- [S1] SELECT value FROM lab.counters WHERE id = 1;          -- 10
-- [S2] BEGIN;
-- [S2] SELECT value FROM lab.counters WHERE id = 1;          -- 10
-- [S1] UPDATE lab.counters SET value = 11 WHERE id = 1;  COMMIT;
-- [S2] UPDATE lab.counters SET value = 11 WHERE id = 1;  COMMIT;
-- [S1] SELECT value FROM lab.counters WHERE id = 1;          -- 11, but two increments happened: one is lost
```

The same happens on SQL Server under default READ COMMITTED. Three fixes, each worth running:

```sql
-- Fix A, pessimistic lock: S2's SELECT waits until S1 commits, then reads 11.
-- [S1] BEGIN; SELECT value FROM lab.counters WHERE id = 1 FOR UPDATE;
-- [S2] BEGIN; SELECT value FROM lab.counters WHERE id = 1 FOR UPDATE;   -- waits
--      SQL Server: SELECT value FROM dbo.counters WITH (UPDLOCK, ROWLOCK) WHERE id = 1;

-- Fix B, atomic update: let the database do the arithmetic. Result 12.
-- [S1] BEGIN; UPDATE lab.counters SET value = value + 1 WHERE id = 1;
-- [S2] BEGIN; UPDATE lab.counters SET value = value + 1 WHERE id = 1;   -- waits
-- [S1] COMMIT;                                                          -- S2 continues and reads the new row
-- [S2] COMMIT;

-- Fix C, optimistic version column: no lock is held while the user thinks.
-- [S1] SELECT value, version FROM lab.counters WHERE id = 1;            -- 10, version 1
-- [S2] SELECT value, version FROM lab.counters WHERE id = 1;            -- 10, version 1
-- [S1] UPDATE lab.counters SET value = 11, version = version + 1 WHERE id = 1 AND version = 1;  -- UPDATE 1
-- [S2] UPDATE lab.counters SET value = 11, version = version + 1 WHERE id = 1 AND version = 1;  -- UPDATE 0
```

`UPDATE 0` means "someone changed it": the app re-reads and retries, or returns HTTP 409/412. This is exactly what EF Core does with a concurrency token (`[Timestamp]` / `rowversion` on SQL Server, `xmin` or a version column on PostgreSQL) and why it throws `DbUpdateConcurrencyException`. Extra: run the original lost-update steps with `BEGIN ISOLATION LEVEL REPEATABLE READ;` in PostgreSQL. S2's UPDATE now fails with `could not serialize access due to concurrent update` (SQLSTATE 40001).

### Lab 2: non-repeatable read

```sql
-- [S1] BEGIN;                                                 -- READ COMMITTED (default)
-- [S1] SELECT value FROM lab.counters WHERE id = 2;           -- 20
-- [S2] UPDATE lab.counters SET value = 25 WHERE id = 2;       -- autocommit
-- [S1] SELECT value FROM lab.counters WHERE id = 2;           -- 25: same row, new value
-- [S1] COMMIT;
```

Now repeat with `BEGIN ISOLATION LEVEL REPEATABLE READ;` in S1 (set the value back first). S1 sees 20 both times; S2 is **not** blocked: PostgreSQL keeps the old version for S1's snapshot. On SQL Server, `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; BEGIN TRAN; SELECT ...` keeps S1's shared lock, so **S2's UPDATE waits** until S1 commits. Same anomaly prevented, opposite mechanism (versions vs locks).

### Lab 3: phantom read

```sql
-- [S1] BEGIN;                                                 -- READ COMMITTED
-- [S1] SELECT count(*) FROM lab.counters WHERE value >= 10;   -- 2
-- [S2] INSERT INTO lab.counters (id, value) VALUES (3, 30);   -- autocommit
-- [S1] SELECT count(*) FROM lab.counters WHERE value >= 10;   -- 3: a new row appeared (phantom)
-- [S1] COMMIT;
-- cleanup: DELETE FROM lab.counters WHERE id = 3;
```

With `REPEATABLE READ`, PostgreSQL shows no phantom (count stays 2): its snapshot covers the whole query. SQL Server REPEATABLE READ still shows the phantom, because it locks only the rows it read. SQL Server SERIALIZABLE blocks S2's INSERT with a key-range lock; SNAPSHOT shows no phantom without blocking.

### Lab 4: write skew (doctors on call)

Rule: at least one doctor must stay on call. Each doctor checks the rule, then goes off call.

```sql
-- [S1] BEGIN ISOLATION LEVEL REPEATABLE READ;
-- [S1] SELECT count(*) FROM lab.doctors WHERE on_call;        -- 2, "fine, I can leave"
-- [S2] BEGIN ISOLATION LEVEL REPEATABLE READ;
-- [S2] SELECT count(*) FROM lab.doctors WHERE on_call;        -- 2, "fine, I can leave"
-- [S1] UPDATE lab.doctors SET on_call = false WHERE name = 'alice';
-- [S2] UPDATE lab.doctors SET on_call = false WHERE name = 'bob';    -- different row: no conflict
-- [S1] COMMIT;
-- [S2] COMMIT;                                                -- succeeds
-- [S1] SELECT * FROM lab.doctors;                             -- nobody on call: rule broken
```

Reset (`UPDATE lab.doctors SET on_call = true;`) and run it again with `BEGIN ISOLATION LEVEL SERIALIZABLE;` in both sessions. Now S2 fails, at its UPDATE or at COMMIT:

```text
ERROR:  could not serialize access due to read/write dependencies among transactions
SQLSTATE: 40001
```

This is not a bug. SERIALIZABLE in PostgreSQL (SSI) works by aborting one transaction, so **the app must retry the whole transaction** (sketch below). Another fix in READ COMMITTED: lock the rows the rule depends on, `SELECT name FROM lab.doctors WHERE on_call FOR UPDATE;`, before checking. SQL Server: under SNAPSHOT the anomaly happens too; under SERIALIZABLE both sessions hold range locks and one is usually killed as a deadlock victim (error 1205), which again means retry.

### Lab 5: dirty read (SQL Server only)

```sql
-- [S1] BEGIN TRAN; UPDATE dbo.counters SET value = 999 WHERE id = 1;     -- not committed
-- [S2] SELECT value FROM dbo.counters WITH (NOLOCK) WHERE id = 1;         -- 999
--      (same as SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED)
-- [S1] ROLLBACK;
-- [S2] SELECT value FROM dbo.counters WHERE id = 1;                       -- 10: S2 saw a value that never existed
```

Without NOLOCK, and with RCSI off, S2's plain SELECT **waits** for S1. With RCSI on, it returns the last committed value (10) immediately. That is why RCSI, not NOLOCK, is the fix for blocking.

Try the same in PostgreSQL: `BEGIN ISOLATION LEVEL READ UNCOMMITTED;` is accepted, but S2 reads 10. PostgreSQL never shows a dirty read: READ UNCOMMITTED behaves as READ COMMITTED (postgresql.org, "Transaction Isolation").

### Lab 6: deadlock

```sql
-- [S1] BEGIN; UPDATE lab.counters SET value = value + 1 WHERE id = 1;
-- [S2] BEGIN; UPDATE lab.counters SET value = value + 1 WHERE id = 2;
-- [S1] UPDATE lab.counters SET value = value + 1 WHERE id = 2;     -- waits for S2
-- [S2] UPDATE lab.counters SET value = value + 1 WHERE id = 1;     -- cycle; after about 1 s:
```

```text
ERROR:  deadlock detected
DETAIL:  Process 123 waits for ShareLock on transaction 456; blocked by process 789. ...
SQLSTATE: 40P01
```

The victim's transaction is rolled back; the other one continues. Run `ROLLBACK;` in the victim and `COMMIT;` in the other. PostgreSQL checks for a cycle after `deadlock_timeout` (default 1 s). SQL Server gives `Msg 1205 ... was deadlocked on lock resources with another process and has been chosen as the deadlock victim. Rerun the transaction.` The deadlock graph is in the built-in `system_health` Extended Events session.

Fixes:

1. **Consistent lock order.** Every code path touches rows in the same order (for example, by id). Lock them up front: `SELECT id FROM lab.counters WHERE id IN (1, 2) ORDER BY id FOR UPDATE;`. Repeat the lab with this first line in both sessions: S2 just waits, and there is no deadlock.
2. **Short transactions.** No HTTP calls or user input inside a transaction.
3. **Retry** the whole transaction on a deadlock or serialization error, with a small random backoff.

```csharp
// Retry sketch for PostgreSQL (Npgsql). SQL Server: catch SqlException with Number 1205.
for (var attempt = 1; ; attempt++)
{
    try
    {
        await using var tx = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, ct);
        await DoBusinessWorkAsync(db, ct);           // re-read everything inside the retry
        await tx.CommitAsync(ct);
        break;
    }
    catch (PostgresException ex) when (attempt < 5 &&
        (ex.SqlState == PostgresErrorCodes.SerializationFailure ||    // 40001
         ex.SqlState == PostgresErrorCodes.DeadlockDetected))         // 40P01
    {
        db.ChangeTracker.Clear();                                     // drop stale tracked entities
        await Task.Delay(Random.Shared.Next(20, 100) * attempt, ct);  // backoff with jitter
    }
}
```

EF Core's `EnableRetryOnFailure()` can also retry transient errors, but with a user transaction you must run the whole unit through `db.Database.CreateExecutionStrategy().ExecuteAsync(...)`. Which error codes it counts as transient depends on the provider (verify).

### Lab 7: booking race ("two users book the last seat")

Race version: check, then insert.

```sql
-- [S1] BEGIN;
-- [S1] SELECT seats_left FROM lab.flights WHERE flight_id = 1;                  -- 1, "available"
-- [S2] BEGIN;
-- [S2] SELECT seats_left FROM lab.flights WHERE flight_id = 1;                  -- 1, "available"
-- [S1] INSERT INTO lab.bookings VALUES (1, 42, 'asha');  COMMIT;
-- [S2] INSERT INTO lab.bookings VALUES (1, 42, 'ravi');  COMMIT;
-- [S1] SELECT * FROM lab.bookings;                                              -- seat 42 sold twice
```

Prevention 1, a unique constraint (the database enforces the rule, whatever the app does):

```sql
TRUNCATE lab.bookings;
ALTER TABLE lab.bookings ADD CONSTRAINT uq_seat UNIQUE (flight_id, seat_no);
-- Repeat the race. S2's INSERT waits for S1, then fails:
-- ERROR: duplicate key value violates unique constraint "uq_seat"   (SQLSTATE 23505)
-- The app maps 23505 to HTTP 409 Conflict. SQL Server: error 2627.
```

Prevention 2, a conditional update (for "N seats left" without seat numbers):

```sql
-- [S1] BEGIN;
-- [S1] UPDATE lab.flights SET seats_left = seats_left - 1
--      WHERE flight_id = 1 AND seats_left > 0 RETURNING seats_left;              -- UPDATE 1, 0 left
-- [S2] BEGIN;
-- [S2] UPDATE lab.flights SET seats_left = seats_left - 1
--      WHERE flight_id = 1 AND seats_left > 0 RETURNING seats_left;              -- waits
-- [S1] INSERT INTO lab.bookings VALUES (1, 42, 'asha'); COMMIT;
-- [S2] -- continues: re-checks seats_left > 0 on the new row, gets UPDATE 0 = sold out
-- [S2] ROLLBACK;
```

The check and the change are one statement, so there is no gap between them. The `CHECK (seats_left >= 0)` is a second safety net. SQL Server: `UPDATE ... OUTPUT inserted.seats_left WHERE flight_id = 1 AND seats_left > 0;` and test `@@ROWCOUNT`.

Interview line: "I reproduced the double booking with two sessions, then made it impossible with a unique constraint, and for counters I use a conditional update that returns zero rows when sold out."

<a id="add-sql-pg-vs-sqlserver"></a>

## ➕ PostgreSQL vs SQL Server: the differences that matter

You use both at work. Interviewers like candidates who say "it depends on the engine" and then name the difference.

| Topic | PostgreSQL | SQL Server |
|---|---|---|
| Clustered index | None. Tables are heaps; every index points to a row location (TID). `CLUSTER` reorders once and is not maintained. | The clustered index *is* the table. Non-clustered indexes store the clustering key, so keep it narrow and ever-increasing. |
| Concurrency model | MVCC always. Old row versions stay in the table until VACUUM removes them. | Locking by default. Row versions (in tempdb, or the persistent version store with ADR) only with RCSI or SNAPSHOT. |
| Default isolation | READ COMMITTED (snapshot per statement). Readers and writers never block each other. | READ COMMITTED with shared locks: readers can wait for writers. |
| RCSI | Not needed; this is already how it behaves. | `ALTER DATABASE x SET READ_COMMITTED_SNAPSHOT ON`. No code change. On by default in Azure SQL Database. |
| Stronger levels | REPEATABLE READ = snapshot isolation. SERIALIZABLE = SSI, aborts with 40001. | REPEATABLE READ and SERIALIZABLE hold locks (range locks for SERIALIZABLE). SNAPSHOT is separate; update conflicts give error 3960. |
| Auto-increment | `GENERATED ALWAYS AS IDENTITY` (standard), or a `SEQUENCE`. `serial` is the old way. | `IDENTITY(1,1)`, or a `SEQUENCE` object. |
| UUID type | `uuid` (16 bytes). `gen_random_uuid()` = v4. `uuidv7()` built in from 18 (verify). | `uniqueidentifier`. `NEWID()` = random; `NEWSEQUENTIALID()` = ordered (only as a column default). |
| UUIDv7 note | Time-ordered v7 keys append to the end of the index: good locality. | SQL Server sorts `uniqueidentifier` by its *last* bytes first, so a v7 value from .NET `Guid.CreateVersion7()` is not in insert order there (verify). EF Core's default client-side GUID generator for SQL Server already creates SQL-Server-friendly sequential values. |
| Upsert | `INSERT ... ON CONFLICT (cols) DO NOTHING / DO UPDATE`. Atomic. `MERGE` exists from 15. | `MERGE` (use `WITH (HOLDLOCK)` or it can race), or `UPDATE` then `INSERT` inside a transaction with `UPDLOCK, HOLDLOCK`. |
| Returning rows | `RETURNING *` on INSERT/UPDATE/DELETE. | `OUTPUT inserted.*, deleted.*`. |
| JSON | `jsonb`: binary, indexable with GIN, rich operators (`->`, `->>`, `@>`). | 2022: JSON stored in `nvarchar(max)`, with `JSON_VALUE`, `OPENJSON`; index through a computed column. SQL Server 2025 and Azure SQL add a native `json` type (verify). |
| Pagination | `LIMIT n OFFSET m`, or `FETCH FIRST n ROWS ONLY`. Row-value keyset `(a, b) < (x, y)`. | `TOP (n)`, or `ORDER BY ... OFFSET m ROWS FETCH NEXT n ROWS ONLY` (ORDER BY required). No row-value comparison. |
| Case and collation | Unquoted names are folded to lower case. Text comparison is case-sensitive by default; use `lower()` with an expression index, `citext`, or a non-deterministic ICU collation. | Case-insensitive by default (`SQL_Latin1_General_CP1_CI_AS`). Collation is set per server, database or column. |
| `varchar` vs `nvarchar` | No `nvarchar`. `text` and `varchar` store the database encoding (normally UTF-8). Prefer `text`, with a CHECK for length if needed. | `varchar` = 1 byte per character in a code page (or UTF-8 with a `_UTF8` collation, 2019+). `nvarchar` = UTF-16. Mixing them causes `CONVERT_IMPLICIT` and scans (see Q34). |
| Lock escalation | Never. Row locks live in the row header, not in memory. | Around 5,000 locks on one object escalate to a table (or partition) lock. Batch large writes. |
| Plans | `EXPLAIN (ANALYZE, BUFFERS)`; `auto_explain` to log slow plans. | Actual execution plan (Ctrl+M), `SET STATISTICS IO, TIME ON`, Query Store. |
| Workload stats | `pg_stat_statements` (top queries by total time), `pg_stat_user_indexes`, `pg_stat_activity`. | DMVs: `sys.dm_exec_query_stats`, `sys.dm_db_index_usage_stats`, `sys.dm_exec_requests`. |
| Statistics upkeep | Autovacuum runs `ANALYZE`; manual `ANALYZE table`. | Auto-update statistics; manual `UPDATE STATISTICS table`. |
| Cleanup cost | VACUUM (autovacuum). A long-open transaction stops cleanup and makes tables bloat. | Ghost cleanup; with versioning, a long transaction makes the version store grow. |
| Online index build | `CREATE INDEX CONCURRENTLY`. | `WITH (ONLINE = ON)`: Enterprise, Developer and Azure SQL only (learn.microsoft.com, editions page). |

Interview line: "Same SQL, different engines underneath. In PostgreSQL, readers never block and I watch VACUUM and long transactions. In SQL Server, I check whether RCSI is on, watch lock escalation, and choose the clustering key carefully."

<a id="add-sql-migrations"></a>

## ➕ Zero-downtime schema changes

GAP-02-017 gives the idea. This section gives the steps and commands. The root problem: during a rolling deploy, **old code and new code run at the same time against one database**. Every schema step must work with both.

### The pattern: expand → migrate → contract

| Phase | What you do | Old code still works? |
|---|---|---|
| 1. Expand | Add new things only: nullable columns, new tables, new indexes. | Yes: it ignores them. |
| 2. Deploy code v2 | Writes both old and new (dual write); still reads old. | Yes. |
| 3. Migrate (backfill) | Copy old data into the new shape, in small batches. | Yes. |
| 4. Switch | Code v3 reads the new shape. Keep it deployed for a while. | Old code is gone now. |
| 5. Contract | Remove old columns or tables, in a later release. | Not needed. |

Rollback is easy until phase 5, because the old schema is still there.

### Adding a NOT NULL column

Case 1: a constant default. On PostgreSQL 11+, this is a fast metadata-only change:

```sql
SET lock_timeout = '3s';     -- do not wait forever behind a long query
ALTER TABLE jobs ADD COLUMN source text NOT NULL DEFAULT 'api';
```

Why `lock_timeout`: even a fast `ALTER TABLE` needs an ACCESS EXCLUSIVE lock for a moment. If a long query holds the table, the ALTER waits, and **every new query queues behind the ALTER**. That is an outage. With a timeout, the ALTER fails quickly and you retry later. On SQL Server, a NOT NULL column with a default is metadata-only on Enterprise and Developer editions (verify for your edition); otherwise it rewrites every row.

Case 2: the value must be computed per row (for example, copied from the tenant):

```sql
-- 1. Expand: nullable column, instant.
ALTER TABLE jobs ADD COLUMN region text NULL;
-- 2. Deploy code that writes region for new rows.
-- 3. Backfill in batches by key range. Short transactions; no long locks.
DO $$
DECLARE last_id bigint := 0; max_id bigint;
BEGIN
  SELECT max(job_id) INTO max_id FROM jobs;
  WHILE last_id < max_id LOOP
    UPDATE jobs j SET region = CASE WHEN j.tenant_id % 2 = 0 THEN 'in' ELSE 'eu' END
    WHERE j.job_id > last_id AND j.job_id <= last_id + 5000 AND j.region IS NULL;
    last_id := last_id + 5000;
    COMMIT;                 -- allowed in DO blocks since PostgreSQL 11 (outside BEGIN)
  END LOOP;
END $$;
-- 4. Prove there are no NULLs without blocking writes.
ALTER TABLE jobs ADD CONSTRAINT ck_jobs_region_nn CHECK (region IS NOT NULL) NOT VALID;  -- instant
ALTER TABLE jobs VALIDATE CONSTRAINT ck_jobs_region_nn;     -- scans, but writes continue
ALTER TABLE jobs ALTER COLUMN region SET NOT NULL;          -- 12+: uses the valid CHECK, no scan
ALTER TABLE jobs DROP CONSTRAINT ck_jobs_region_nn;
```

On SQL Server, keep each batch under about 5,000 rows to avoid lock escalation.

### Renaming a column safely

Never run `RENAME COLUMN` while old code is running: old code breaks at once. EF Core generates `RenameColumn` when you rename a property, so read every generated migration. Do it as expand/contract:

1. Add the new column `kind`.
2. Deploy code that writes both `job_type` and `kind`, and reads `job_type`.
3. Backfill `kind` from `job_type` in batches.
4. Deploy code that reads `kind` (still writes both).
5. Deploy code that writes only `kind`.
6. Later release: drop `job_type`.

Many steps for one rename. So in a review, ask: "Is this rename worth it?"

### Creating indexes without long locks

PostgreSQL: a plain `CREATE INDEX` blocks writes to the table until it finishes.

```sql
CREATE INDEX CONCURRENTLY ix_jobs_tenant_type ON jobs (tenant_id, job_type);
```

- It is slower and cannot run inside a transaction block.
- If it fails, it leaves an INVALID index. Find it with `SELECT indexrelid::regclass FROM pg_index WHERE NOT indisvalid;`, then `DROP INDEX CONCURRENTLY` and try again.
- `REINDEX CONCURRENTLY` (12+) and `DROP INDEX CONCURRENTLY` also exist.

SQL Server: `CREATE INDEX ... WITH (ONLINE = ON)`. Online index operations are Enterprise-edition features (also in Developer and Azure SQL Database); Standard edition gives an error (learn.microsoft.com, "Editions and supported features of SQL Server 2022"). `RESUMABLE = ON` lets you pause and resume a long build (needs ONLINE; verify version support).

### EF Core migrations as SQL scripts

Do not run `Database.Migrate()` at startup when you have several instances: they race, and the app user then needs DDL rights. Produce a reviewed script instead:

```powershell
dotnet ef migrations script --idempotent -o migrate.sql          # all migrations, safe to re-run
dotnet ef migrations script AddRegion AddRegionNotNull -o step.sql  # a range
dotnet ef migrations script AddRegionNotNull AddRegion -o rollback.sql   # "from" newer than "to" = rollback script
dotnet ef migrations bundle -o efbundle.exe                      # a runnable migrator for the pipeline
```

For `CREATE INDEX CONCURRENTLY` in an EF migration, use `migrationBuilder.Sql("CREATE INDEX CONCURRENTLY ...", suppressTransaction: true);`. Npgsql also has `.IsCreatedConcurrently()` on an index (verify). Read every script in the pull request like code.

### Rollback plan (write it before you deploy)

- **Roll back code, not schema.** Expand steps are backward-compatible, so the old code runs on the new schema.
- **Contract happens one release later**, when no running version needs the old column.
- **Take a backup, or note the PITR time, before a destructive step** (drop, type change, big UPDATE).
- **Down migrations can lose data** (dropping a column drops its data). Often a forward fix is safer.
- **Write it down:** the step, how to check it worked, and how to undo it. If you cannot undo it, say so and get approval.

<a id="add-sql-backup-restore"></a>

## ➕ Backup and restore: a drill you actually run

A backup you have never restored is only a hope. This section gives the types and a 30-minute drill.

### RPO and RTO in plain words

- **RPO (Recovery Point Objective):** how much data you may lose, measured in time. "RPO 15 minutes" = after a disaster we may lose at most the last 15 minutes of writes. Backup frequency decides it.
- **RTO (Recovery Time Objective):** how long you may be down. "RTO 1 hour" = we must be serving again within an hour. Restore speed, replay time and the switch-over decide it. You only *know* your RTO after you time a real restore.

### Backup types

| Engine | Type | What it is | Notes |
|---|---|---|---|
| SQL Server | Full | The whole database | The base of every restore |
| SQL Server | Differential | Changes since the last **full** | Restore = full + the latest differential |
| SQL Server | Log | Log records since the last log backup | Needs the FULL recovery model. Restore = full + diff + every log in order; `STOPAT` gives point-in-time. |
| PostgreSQL | `pg_dump` (logical) | SQL or archive of one database | Portable across versions, good for small DBs and upgrades. Slow for big DBs (indexes rebuilt on restore). No point-in-time. |
| PostgreSQL | Base backup + WAL archive (physical) | A copy of the data files (`pg_basebackup`) plus every WAL file after it | Point-in-time recovery (PITR) to any moment: set `recovery_target_time`. Version 17 added incremental base backups (`pg_basebackup --incremental`, `pg_combinebackup`). Tools: pgBackRest, Barman. |

Managed services (Azure SQL, Azure Database for PostgreSQL, RDS) do the physical backups and PITR for you. You still must test restores and know the retention period.

### Drill: PostgreSQL

```powershell
# 1. Dump (custom format: compressed, supports parallel and selective restore).
docker exec pg pg_dump -U postgres -d jobs -Fc -f /tmp/jobs.dump
docker exec pg ls -lh /tmp/jobs.dump

# 2. Restore into a NEW database. Time this step: it is your RTO for this size.
docker exec pg createdb -U postgres jobs_restore
Measure-Command { docker exec pg pg_restore -U postgres -d jobs_restore --jobs 4 /tmp/jobs.dump }
```

```sql
-- 3. Verify. Run in BOTH databases and compare the output.
SELECT 'jobs' AS t, count(*), max(job_id) FROM jobs
UNION ALL SELECT 'job_attempts', count(*), max(attempt_id) FROM job_attempts
UNION ALL SELECT 'outbox_messages', count(*), NULL FROM outbox_messages;

-- A content checksum over key columns, in a fixed order.
SELECT md5(string_agg(job_id::text || '|' || status || '|' || created_at::text, ',' ORDER BY job_id))
FROM jobs;

-- Indexes and constraints came back too?
SELECT count(*) FROM pg_indexes WHERE schemaname = 'public';
SELECT conname FROM pg_constraint WHERE conrelid = 'jobs'::regclass ORDER BY 1;
```

Notes: `pg_dump` does not include roles; use `pg_dumpall --globals-only` for those. To copy the file out of the container: `docker cp pg:/tmp/jobs.dump .`.

### Drill: SQL Server

```sql
BACKUP DATABASE labdb TO DISK = '/var/opt/mssql/data/labdb_full.bak' WITH CHECKSUM, INIT;
RESTORE VERIFYONLY FROM DISK = '/var/opt/mssql/data/labdb_full.bak' WITH CHECKSUM;
RESTORE FILELISTONLY FROM DISK = '/var/opt/mssql/data/labdb_full.bak';   -- logical file names
RESTORE DATABASE labdb_restore FROM DISK = '/var/opt/mssql/data/labdb_full.bak'
WITH MOVE 'labdb'     TO '/var/opt/mssql/data/labdb_restore.mdf',
     MOVE 'labdb_log' TO '/var/opt/mssql/data/labdb_restore_log.ldf',
     RECOVERY, STATS = 10;
DBCC CHECKDB (labdb_restore) WITH NO_INFOMSGS;                  -- physical and logical integrity
SELECT COUNT(*), CHECKSUM_AGG(BINARY_CHECKSUM(id, value)) FROM labdb.dbo.counters;
SELECT COUNT(*), CHECKSUM_AGG(BINARY_CHECKSUM(id, value)) FROM labdb_restore.dbo.counters;
```

Use the names that `FILELISTONLY` prints in the `MOVE` lines. `BINARY_CHECKSUM` can miss some changes, so it is fine for a drill but not proof.

### Write down after the drill

Backup size, restore time, verification result, and anything that surprised you. "I restored a 1M-row database in N minutes and verified counts and checksums" is a strong, honest interview sentence.

<a id="add-sql-modeling"></a>

## ➕ Data modeling checklist

Use this list for every new table, in your project and in system design interviews. Examples refer to the practice schema.

1. **Keys.** Every table has a primary key. Choose surrogate or natural on purpose.
   - *Surrogate* (`bigint` identity or UUID): stable, small, never changes. Default choice.
   - *Natural* (email, ISO country code): has meaning, but can change or be reused. Keep it as a UNIQUE constraint next to a surrogate PK (`uq_users_tenant_email_active`).
   - Use a UUID when ids are created outside the database or must not be guessable; prefer time-ordered UUIDv7 for index locality (engine notes in the table above).
2. **Constraints enforce invariants, not the app alone.** Two app instances can race; the database cannot be bypassed. Use NOT NULL, CHECK (`ck_jobs_finished`), UNIQUE (`uq_jobs_idempotency`), FOREIGN KEY. If the rule is "never two X", it should be a unique constraint.
3. **One-to-many.** The foreign key sits on the "many" side (`job_attempts.job_id`). PostgreSQL does not index it for you; decide whether to.
4. **Many-to-many.** A join table with a composite PK, for example `job_tags (tenant_id, job_id, tag_id)`. It often grows its own columns later (`added_by`, `added_at`).
5. **Soft delete (`deleted_at`).** Pros: undo, audit, foreign keys stay valid. Cons: every query must filter it (easy to forget; EF Core global query filters help), unique constraints must become partial (`WHERE deleted_at IS NULL`), and the table keeps growing. Privacy rules (the right to be forgotten) may still need a hard delete or anonymisation.
6. **Audit and history.** For "who changed what, when": an append-only `job_status_history (job_id, from_status, to_status, changed_by, changed_at)` written in the same transaction. Or SQL Server temporal tables (`SYSTEM_VERSIONING = ON`), or triggers. History tables grow fast: plan retention or partitioning.
7. **Multi-tenant keys.** `tenant_id` in every table. Indexes for tenant queries start with `tenant_id`. Composite FKs `(tenant_id, x_id)` stop cross-tenant links. Every query filters by tenant (EF Core global filter, or PostgreSQL row-level security as a second guard). Document the exceptions, such as global worker queues.
8. **Money.** `numeric(19,4)` in PostgreSQL, `decimal(19,4)` in SQL Server, or integer minor units (paise, cents) in `bigint`. Never `float` or `real`. Store the currency code next to the amount.
9. **Time.** PostgreSQL `timestamptz`; SQL Server `datetime2` stored in UTC, or `datetimeoffset`. Store UTC, convert at the edge. A plain `timestamp` (no time zone) is for "wall clock" values such as "store opens at 09:00". Use half-open ranges: `>= start AND < end`.
10. **Status fields.** CHECK constraint or lookup table; document the allowed transitions (queued → running → succeeded/failed). Enforce them with a conditional update: `UPDATE ... SET status = 'running' WHERE job_id = $1 AND status = 'queued'`.
11. **JSON columns.** Good for flexible payloads you read whole (`jobs.payload`). Bad for anything you filter, join or constrain often; promote those to real columns.
12. **When to denormalise** (see Q42). Only for a measured hot read path. Name who keeps the copy correct (same transaction, trigger, or event) and how you detect drift. Common safe cases: a counter like `jobs.attempt_count`, a read model or summary table, a search index.
13. **Size and growth.** Estimate rows per day and keep-for-how-long. Big append-only tables (attempts, outbox, history) need a retention job or time-based partitioning from day one.
