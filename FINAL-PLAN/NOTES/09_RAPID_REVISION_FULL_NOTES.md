# Complete rapid revision tables and oral outlines

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q08"></a>

## Q08 — M8_Rapid_Revision_Sheet

Full source content: [Q-and-A/M8_Rapid_Revision_Sheet.docx](../SOURCE_LIBRARY/Q-and-A/M8_Rapid_Revision_Sheet.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.

> Read with these corrections: modern interpolation may avoid boxing; string hash caching and ThreadPool growth are implementation-specific; JWT revocation can use stateful checks; SQL isolation differs by engine. With endpoint routing, CORS belongs after routing and before authorization. Specific correction notes follow the affected statements where identified.


<a id="Q08-B0001"></a>

Month 8 - Rapid Revision Sheet

<a id="Q08-B0002"></a>

Weeks 29 to 32. Everything compressed to one line each. This is not for learning - it is for checking what survived.

<a id="Q08-B0003"></a>

The other seven files teach. This one tests. Cover the right-hand column, read the left, and say the answer. Anything you cannot say goes in the WEAK tab. That is the entire method.

<a id="Q08-B0004"></a>

It is deliberately dense, because by month 8 your risk is no longer missing knowledge - it is failing to retrieve knowledge you already have, under pressure, in a 45-minute window. Consolidate rather than accumulate. The instinct to keep adding topics is the wrong instinct now.

<a id="Q08-B0005"></a>

### How to use it on a commute

<a id="Q08-B0006"></a>

•  One section per journey. Cover the answers with your thumb. Say each one out loud, or mouth it silently - it still works.

<a id="Q08-B0007"></a>

•  Score yourself honestly. Three or more misses in a section means that section is your next Friday.

<a id="Q08-B0008"></a>

•  Do not re-read the answer and move on. Re-read it, then look away and say it. Reading produces recognition; saying produces recall, and only recall shows up in an interview.

<a id="Q08-B0009"></a>

•  Part 6 is the highest-value page. Every "why X and not Y" in one table. That is the shape of most follow-up questions.

<a id="Q08-B0010"></a>

### PART 1 - C# and the runtime, one line each

<a id="Q08-B0011"></a>

| Prompt | Answer |
| --- | --- |
| Value vs reference type | Value holds the data; reference holds an address. Assignment copies the slot either way |
| Where does a struct live | Wherever it is declared. A field of a class lives on the heap with the object |
| Boxing cost | An allocation plus a copy, then an unbox with a type check |
| Three accidental boxes | Assigning to object; non-generic collections or interfaces; string interpolation of value types |
| Why strings are immutable | Safe sharing, interning, and a cacheable hash - so they make good dictionary keys |
| Concat in a loop | O(n squared) - every += allocates and copies. StringBuilder is O(n) amortised |
| Object overhead on x64 | Header plus method table pointer, 16 bytes before your fields |
| Static constructor timing | Before first static access or first instance, exactly once, thread-safe |
| Virtual dispatch | Through the object's method table - the slot is resolved at runtime |
| override vs new | override replaces in the table; new hides and is resolved at compile time from the reference type |
| Equals/GetHashCode contract | Equal objects must share a hash code. Break it and hash collections lose keys |
| Dictionary O(1) | Average, not worst. Degrades to O(n) with a bad hash distribution |
| List<T> growth | Doubles the array, so Add is O(1) amortised and total copying is bounded by 2n |
| yield return compiles to | An IEnumerator state machine class - nothing runs until the first MoveNext |
| Deferred execution bug | Enumerate the same query twice and everything runs twice - two round trips |
| IQueryable vs IEnumerable | IQueryable builds an expression tree for the provider to translate; IEnumerable runs in memory |
| Closure allocates | A hidden class holding the captured variables - and it extends their lifetime |
| throw vs throw ex | throw preserves the stack trace; throw ex resets it |
| Exception filter (when) | Decides before the stack unwinds, so the original frames are still intact |
| Finalizer cost | Two GC cycles - queue, finalise, then collect on the next pass |
| GC generations | Gen 0 cheap because most new objects are dead; gen 2 expensive because it walks everything |
| Large object heap | Over ~85 KB, collected with gen 2, not compacted by default, so it fragments |
| Server vs workstation GC | Server: a heap and a collector thread per core. Use it for any server workload |
| What await does | Returns to the caller, releases the thread, registers a continuation, resumes via the state machine |
| async void | Cannot be awaited and its exceptions cannot be caught. Event handlers only |
| .Result deadlock | Continuation needs the captured context thread; you are blocking that thread. In ASP.NET Core: starvation, not deadlock |
| ConfigureAwait(false) | Do not capture the context. Needed in library code, not in ASP.NET Core |
| ValueTask | Avoids allocating when the result is usually already available. Await exactly once, never block |
| CancellationToken | Cooperative - a flag the operation checks. Nothing is forcibly terminated |
| Thread pool starvation | Blocking outpaces the slow injection rate. Signature: high latency, low CPU |
| Framework vs modern .NET | Windows-only and machine-wide, versus cross-platform, side-by-side and app-local |
| CLR / runtime / SDK | Execution engine; engine plus libraries to run; plus compilers and tooling to build |
| Tiered compilation | Compile fast first, recompile hot methods with full optimisation |
| DI lifetimes | Singleton per app, scoped per request, transient per resolve |
| Captive dependency | A scoped service captured by a singleton outlives its scope - classically a DbContext |
| Middleware ordering | Fixed at startup by nesting. Auth before authorisation; exceptions first |
| Why JWTs cannot be revoked | Validation is local, so there is nothing to delete. Short expiry, denylist, or a version claim |
| N+1 | One query per row from lazy loading in a loop. Find it in the SQL log, not the C# |
| Cache stampede | A hot key expires and everyone misses at once. Lock, jitter the TTL, or serve stale while refreshing |


> Study correction: Modern interpolated-string handlers can avoid boxing. Whether a value is boxed depends on the target/overload and compiler lowering; the source shorthand is too broad. [Official reference](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/)

<a id="Q08-B0012"></a>

### PART 2 - Databases, one line each

<a id="Q08-B0013"></a>

| Prompt | Answer |
| --- | --- |
| How data is stored | Fixed-size pages. Clustered index = the table itself, in key order |
| Index read/write trade | Reads seek instead of scanning; every write must update every index, and inserts can split pages |
| Covering index | Contains every column the query needs, so no lookup back to the table |
| Seek / scan / lookup | Navigate directly; read every page; the extra hop back for uncovered columns |
| When a scan is correct | When the query returns a large fraction of the table - sequential beats thousands of random seeks |
| SARGability | A function on the column, or a leading wildcard, prevents a seek. Rewrite as a range |
| Statistics matter because | Cardinality estimates drive plan choice. Stale stats give you nested loops for a million rows |
| Join types | Nested loops for small plus indexed; hash for two large unindexed; merge for two pre-sorted |
| SQL logical order | FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, LIMIT |
| ACID | Atomicity, Consistency, Isolation, Durability - durability via write-ahead log |
| Read Uncommitted | Permits dirty reads, non-repeatable reads, phantoms |
| Read Committed | Prevents dirty reads; permits non-repeatable reads and phantoms |
| Repeatable Read | Also prevents non-repeatable reads; permits phantoms |
| Serializable | Prevents all three, using range locks, at a real concurrency cost |
| Snapshot | Consistent point-in-time view, readers do not block; permits write skew |
| Write skew | Two transactions write different rows, no write-write conflict, and together they break a constraint |
| MVCC vs locking | Postgres keeps versions so readers never block; SQL Server locks by default unless snapshot is enabled |
| Lock escalation | Many row locks become one table lock to save memory - and suddenly block everyone. Batch your updates |
| Deadlock cause and fix | Two transactions touching rows in a different order. Fix with a consistent access order |
| When to denormalise | When a hot read path's join cost is measured. You accept two sources of truth and own the sync |
| Connection pool exhaustion | "Timeout expired... obtaining a connection from the pool" - usually a leak or a long transaction, not a slow database |

<a id="Q08-B0014"></a>

### PART 3 - Networking, OS and distributed systems, one line each

<a id="Q08-B0015"></a>

| Prompt | Answer |
| --- | --- |
| URL journey | DNS, TCP handshake, TLS handshake, HTTP to a load balancer, app, cache, database, response, then assets from a CDN |
| TCP handshake | SYN, SYN-ACK, ACK - one full round trip before any data |
| Flow vs congestion control | Flow protects the receiver (window); congestion protects the network (slow start, backoff) |
| Head-of-line blocking | HTTP/2 fixed it at the HTTP layer; TCP still stalls all streams on loss. HTTP/3 over QUIC fixes that |
| Why TLS uses both crypto types | Asymmetric to authenticate and agree a key; symmetric because it is fast enough for the data |
| What HTTPS does not hide | Which server you contacted, traffic volume and timing, or a malicious endpoint |
| CORS preflight | An OPTIONS request asking permission before a non-simple cross-origin request. Browser-enforced, not server security |
| WebSocket scaling | The connection is state pinned to one server - so you need a backplane and sticky sessions |
| Context switch cost | Register save plus page-table switch, but mostly the cold cache and TLB afterwards |
| Virtual memory | Private address space mapped to physical pages. Gives isolation and lazy allocation |
| Page fault | The normal mechanism for bringing a page in. Only hard faults are slow |
| Two scheduler layers | The OS schedules threads onto cores; the .NET pool schedules work items onto threads |
| Spinlock catastrophic when | The critical section is long, or threads outnumber cores - you burn a core doing nothing |
| Async I/O needs no thread | The OS and hardware do the waiting; the continuation lives in a heap state machine, not on a stack |
| Replication lag | Asynchronous replication means a follower read can miss a just-committed write |
| Read-your-writes | Route a user to the leader briefly after they write, or wait for a version |
| Quorum R + W > N | Read and write sets must overlap by at least one node - pigeonhole |
| Split brain | Both sides of a partition elect a leader. Prevented by requiring a majority - hence odd cluster sizes |
| Consistent hashing | Ring placement, so adding a node moves ~1/N of keys instead of nearly all |
| Virtual nodes | One physical server occupies many ring positions, smoothing distribution |
| CAP correctly | During a partition choose consistency or availability. Partition tolerance is not optional |
| PACELC | And else, with no partition, you still trade latency against consistency |
| Causal consistency | Causally related operations are seen in order; unrelated ones may not be. Usually what users need |
| Redis single-threaded | Atomic commands, no locks, predictable latency - and network-bound anyway. One slow command blocks all |
| LRU vs LFU vs TTL | Recency; frequency; and TTL is a staleness bound, not an eviction strategy. Usually TTL plus LRU |
| Delivery guarantees | At-most-once loses; at-least-once duplicates; exactly-once delivery is impossible |
| Exactly-once processing | Idempotent handler plus a dedup record in the same transaction as the effect |
| Visibility timeout | A lease, not a lock. Slower than the timeout means a second consumer starts the same work |
| Why jitter | Backoff fixes the rate; jitter breaks the synchronisation. Both are needed |
| DLQ | After N failures, park it. Alert on depth, inspect, fix, replay |
| SQS vs Kafka | A queue forgets; a log remembers. Kafka for replay, many consumer groups, or ordering by key |
| Kafka ordering limit | Within a partition only. Parallelism is capped by partition count |
| Log compaction | Keep only the latest value per key - a durable replayable snapshot of current state |
| acks and ISR | acks=all with min.insync.replicas=2 on a replication factor of 3. acks=1 can lose data |
| Event vs processing time | When it happened vs when you saw it. Event time is reproducible and needs watermarks |
| Watermark | An assertion that everything before time X has probably arrived. A heuristic, not a fact |
| 2PC avoided because | It blocks - a dead coordinator leaves participants holding locks with no safe local decision |
| Distributed lock unsafe | The holder can be paused past the lease. Fix with a monotonic fencing token the resource enforces |
| Dual-write problem | No transaction spans database and broker. The outbox makes it one commit plus a retryable publish |
| Circuit breaker | Closed, open, half-open. Retries without a breaker amplify an outage |
| Bulkhead | Separate pools per dependency, so one slow downstream cannot starve everything |
| Linearizability vs serializability | Single-operation real-time recency, versus multi-object equivalent-to-some-serial-order |
| RPO vs RTO | How much data you can lose, versus how long you can be down |
| Metrics cardinality | Each label combination is a series. Never label with an unbounded value |
| Erasure coding | k data plus m parity shards; any k reconstruct. ~1.5x storage instead of 3x |
| Geohash edge problem | Adjacent points can differ in prefix, so query the cell plus its eight neighbours |

<a id="Q08-B0016"></a>

### PART 4 - The numbers to know cold

<a id="Q08-B0017"></a>

| Quantity | Value |
| --- | --- |
| 2^10 / 2^20 / 2^30 | Thousand / million / billion |
| Max 32-bit signed int | ~2.1 billion. Unsigned ~4.3 billion |
| Seconds in a day | 86,400 - so 1 M/day is ~12 per second, 100 M/day is ~1,200 per second |
| L1 cache reference | ~1 nanosecond |
| Main memory reference | ~100 nanoseconds |
| SSD random read | ~10-100 microseconds |
| Round trip within a datacentre | ~0.5 milliseconds |
| Disk seek (spinning) | ~5-10 milliseconds |
| Round trip across a continent | ~100-150 milliseconds |
| Typical row size | ID 8 bytes, timestamp 8, UUID 16, short string 50-100 |
| Storage estimate formula | rows/day x bytes/row x retention, then add indexes and replication |
| Object overhead in .NET | 16 bytes on x64 before your fields |
| LOH threshold | ~85 kilobytes |
| Page size (DB and OS) | 8 KB for SQL Server and Postgres; 4 KB OS page |
| Thread stack reservation | ~1 megabyte |
| Availability: 99.9% | ~43 minutes of downtime per month |
| Availability: 99.99% | ~4.3 minutes per month |
| H-1B style ratios - skip | Not a number question. See Doc 14 for anything visa-related |


> Study correction: Availability percentages require a defined measurement window and evidence; planned targets are not personal achievements.

<a id="Q08-B0018"></a>

### PART 5 - The fifteen DSA patterns, recognition only

<a id="Q08-B0019"></a>

The full reasoning is in DSA_MASTER_GUIDE. This is the recall drill - cover the right column and name the cue.

<a id="Q08-B0020"></a>

| Pattern | Recognise it when |
| --- | --- |
| Two pointers | Sorted input; pair or triplet; in-place partition or merge |
| Sliding window | Contiguous subarray or substring with a constraint, all values positive |
| Prefix sum + hashing | Subarray sums or counts, negatives allowed; "seen before" |
| Fast and slow pointers | Cycle detection; the middle; O(1) space required |
| Binary search | Sorted input; or "minimum X such that", with a monotonic check |
| Monotonic stack | Next greater or smaller; histogram; trapping rain water |
| Heap / top-K | K largest or closest; merge K lists; running median on a stream |
| Intervals | Ranges, meetings, overlaps. Sort by start to merge, by end to count |
| Tree DFS | Paths, depth, subtree aggregation, validity |
| Tree BFS | The word "level"; minimum depth; a side view |
| Graph BFS/DFS | Grids, islands, connectivity, shortest path with equal-cost edges |
| Topological sort | Prerequisites, dependencies, build order |
| Union-Find | Grouping, components, incremental edges, MST |
| Backtracking | "All" subsets, permutations, combinations; N-Queens; word search |
| Dynamic programming | Count the ways; min or max over choices; repeated subproblems |

<a id="Q08-B0021"></a>

### PART 6 - Why X and not Y (the follow-up bank)

<a id="Q08-B0022"></a>

This is the highest-value page in the file. Almost every "why did you choose that?" is one of these rows.

<a id="Q08-B0023"></a>

| Choice | First when | Second when |
| --- | --- | --- |
| Two pointers / hash map | Already sorted - O(1) space | Unsorted and you need indices |
| Sliding window / prefix sum | All positive - shrinking is safe | Negatives break monotonicity |
| BFS / DFS | Shortest path or levels | Existence, all paths, cycles, topological order |
| BFS / Dijkstra | All edges cost the same | Weighted edges - BFS is simply wrong |
| Dijkstra / Bellman-Ford | Non-negative weights | Negative edges, or you must detect a negative cycle |
| Union-Find / DFS | Incremental edges, many queries, MST | Static graph, one traversal |
| Heap / full sort | Only the top K, or a stream - O(n log k) | You need the whole ordering |
| Greedy / DP | A local optimum is provably global | You can construct a counterexample |
| Memoisation / tabulation | You have the recursion; sparse state space | Stack depth risk, or you want O(1) space |
| struct / class | Small, immutable, short-lived, created in bulk | Everything else - it is the right default |
| Interface / abstract class | A capability unrelated types can have | Genuine shared state and implementation |
| Strategy / switch | Independent, growing, separately testable | Two or three stable, short cases |
| Decorator / inheritance | Compose behaviours freely at runtime | Fixed at compile time, real is-a |
| Task / ValueTask | Default - simple and safe | Usually completes synchronously in a hot path |
| lock / Interlocked | Several operations must be atomic together | A single primitive operation |
| SemaphoreSlim / lock | You need to await inside, or limit to N | Simple mutual exclusion, no await |
| AsNoTracking / tracked | Read-only queries - no snapshot taken | You intend to call SaveChanges |
| Include / projection | You genuinely need the entities | Read-only - project to a DTO, one query, less data |
| Cache-aside / write-through | Default - simple, tolerates staleness | A stale read is unacceptable |
| SQS / Kafka | Independent tasks, managed, DLQ built in | Replay, many consumer groups, or ordering by key |
| 2PC / saga | Almost never - it blocks | Cross-service consistency with availability |
| Choreography / orchestration | Loose coupling, no central component | The flow must be visible and debuggable |
| Active-passive / active-active | Simplicity, no write conflicts | Utilisation and latency, if you can own writes per key |
| Replication / erasure coding | Small hot objects - low read latency | Large cold objects - 1.5x instead of 3x |
| pgvector / vector DB | You already run Postgres; join with metadata | Very large scale or specialised indexes |
| Serializable / snapshot | You must prevent write skew | Readers must never block writers |

<a id="Q08-B0024"></a>

### PART 7 - The 45-minute oral revision outlines

<a id="Q08-B0025"></a>

Weeks 29 and 30 ask you to speak for 45 minutes on each area with no notes. That is the most demanding English practice in the whole plan, and it is also the best final check. Use these as the running order.

<a id="Q08-B0026"></a>

| Area | Cover, in this order |
| --- | --- |
| C# and .NET | Type system and memory; object layout; OOP and dispatch; collections internals; LINQ and deferred execution; delegates and closures; exceptions; IDisposable and the GC; async state machine and the pitfalls; the runtime, JIT and tiering |
| Databases | Pages and B-trees; clustered vs non-clustered; covering indexes; execution plans and SARGability; statistics and plan choice; join algorithms; ACID; isolation levels and anomalies; MVCC vs locking; deadlocks and escalation; normalisation and when to denormalise; connection pooling |
| Networking and OS | The URL journey end to end; DNS; TCP handshake, flow and congestion control; TLS; HTTP versions; WebSockets and scaling; process vs thread; context switching; virtual memory and paging; scheduling; synchronisation primitives; blocking vs async I/O down to IOCP |
| Distributed systems | Replication and lag; quorums; partitioning and consistent hashing; CAP and PACELC; consistency models; caching strategies and failure modes; delivery guarantees and idempotency; DLQ and retries; Kafka model; consensus and Raft; distributed locks; outbox and saga; resilience patterns; observability |
| Your projects | Job platform: architecture, state machine, retries, idempotency, DLQ, priority and fairness, rate limiting, tenant isolation, metrics, deployment, load test numbers, bottleneck, what you would change. RAG: chunking decision, hybrid search, evaluation numbers |
| Behavioural | All 20 stories, randomised, under 3 minutes, Action-heavy, each with a number and a "what I would do differently" |

<a id="Q08-B0027"></a>

### PART 8 - Final self-test

<a id="Q08-B0028"></a>

Forty prompts. Say each out loud, no notes. Score yourself. Anything under 34 out of 40 means you have a specific gap, not a general one - find it and repair it rather than revising everything again.

<a id="Q08-B0029"></a>

| # | Prompt | Prompt |
| --- | --- | --- |
| 1-2 | Value vs reference, and where a struct lives | Boxing, and three accidental places |
| 3-4 | Object layout in memory on x64 | The Equals/GetHashCode contract |
| 5-6 | Why dictionary lookup degrades | What yield return compiles into |
| 7-8 | Deferred execution and a real bug | throw vs throw ex |
| 9-10 | Why a finalizer costs two GC cycles | GC generations and the LOH |
| 11-12 | The async state machine, end to end | Why .Result deadlocks - both halves |
| 13-14 | Thread pool starvation and its signature | Why you cannot await inside a lock |
| 15-16 | Framework vs modern .NET in 60 seconds | The captive dependency problem |
| 17-18 | Kestrel to controller and back | Why a JWT cannot be revoked |
| 19-20 | The N+1 problem and two fixes | Cache stampede and three fixes |
| 21-22 | Seek vs scan, and when a scan is right | SARGability with the YEAR() example |
| 23-24 | Isolation levels to anomalies, from memory | Write skew, and what permits it |
| 25-26 | Why the optimiser chose a hash join | Lock escalation and why batching helps |
| 27-28 | The full URL journey, five minutes | Why TLS uses both crypto types |
| 29-30 | Why a context switch is expensive | Why async I/O needs no thread |
| 31-32 | Consistent hashing and virtual nodes | CAP correctly, plus the misreading |
| 33-34 | Why exactly-once delivery is impossible | How you get exactly-once processing |
| 35-36 | Why 2PC is avoided; what replaced it | Why distributed locks need fencing tokens |
| 37-38 | The dual-write problem and the outbox | Linearizability vs serializability |
| 39-40 | Your project bottleneck, with a number | A failure mode you chose not to handle, and why |


> Study correction: A self-contained token has no automatic central revocation lookup; applications can add deny lists, token/session versions, introspection or short expiry with refresh controls. State your actual design. [Official reference](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

<a id="Q08-B0030"></a>

What you have, at this point. Deep .NET knowledge, working pattern recognition, system design competence, two deployed projects with measured numbers, twenty rehearsed stories, and eight months of demonstrated discipline. None of that expires. If there is no offer yet, the correct response is to continue the month 7 loop - repair, mock, apply - at a sustainable level. Most people who reach this point and keep going convert within the following few months.

<a id="Q08-B0031"></a>

The failure mode to avoid is concluding the eight months were wasted and stopping. That would be stopping at exactly the point where the accumulated work starts paying.


> SQL correction: isolation behavior is engine-specific. PostgreSQL treats Read Uncommitted as Read Committed; Repeatable Read prevents phantom reads but can still allow serialization anomalies. [PostgreSQL documentation](https://www.postgresql.org/docs/current/transaction-iso.html).

> ASP.NET Core correction: with endpoint routing, UseCors belongs after UseRouting and before authorization. [Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0).

> Runtime correction: ThreadPool worker adjustment is not a universal fixed number of threads per second. [Microsoft diagnostic guide](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/debug-threadpool-starvation).
