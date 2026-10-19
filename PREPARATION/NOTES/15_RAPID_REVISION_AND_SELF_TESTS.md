# Rapid revision sheet, commute guides and monthly self-tests

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 8 revision sheet in full, every month file's 'bad week' guide and five-question shortlist, and every self-test/checklist. Checkpoint Sundays use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- ➕ Which self-test to use on which checkpoint Sunday
- Month 8 rapid revision sheet
- Commute guides from each month file
- Self-tests and checklists from each month file
- PART F - The Month 1 self-test
- PART F - The Month 2 self-test
- PART F - The Month 3 self-test
- PART F - The Month 4 self-test
- PART E - The Month 5 gate
- PART F - The Month 7 checklist

---

<a id="add-checkpoint-index"></a>

## ➕ Which self-test to use on which checkpoint Sunday

| Checkpoint | Week | Use | Plus |
|---|---|---|---|
| Month 1 | 4 | [M1 self-test](#m1-part-f) | one unseen array/string problem; the Week 4 evidence list |
| Month 2 | 8 | [M2 self-test](#m2-part-f) (concurrency, runtime, ASP.NET parts) | first design mock feedback |
| Month 3 | 12 | [M3 self-test](#m3-part-f) | mixed coding test; one design from a blank page |
| Month 4 | 16 | [M4 self-test](#m4-part-f) | one LLD in 60–90 minutes; project M6 |
| Month 5 — **gate** | 20 | [M5 gate checklist](#m5-part-e) | the Week 20 gate in the plan |
| Month 6 | 24 | [M6 checklist](13_INTERVIEW_ROUNDS.md#m6-part-e) | full mock loop; apply / repair / extend decision |
| Month 7 | 28 | [M7 checklist](#m7-part-f) | RAG evaluation; two-region design |
| Final | 32 | [M8 final self-test](#m8-part-8-final-self-test) (aim 34/40) | continuation plan |

How to run a self-test: timer on, notes closed, answer every prompt aloud or in writing. Mark each Pass / Partial / Fail in REVIEW. Every Partial or Fail goes to WEAK with a Friday date.

On a bad week, use the commute guides below: each month file has a "read these five questions in 20 minutes" box.


## Month 8 rapid revision sheet


*Source: Q-and-A/M8_Rapid_Revision_Sheet.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m8-month-8-rapid-revision-sheet"></a>

### Month 8 - Rapid Revision Sheet
Weeks 29 to 32. Everything compressed to one line each. This is not for learning - it is for checking what survived.
The other seven files teach. This one tests. Cover the right-hand column, read the left, and say the answer. Anything you cannot say goes in the WEAK tab. That is the entire method.
It is deliberately dense, because by month 8 your risk is no longer missing knowledge - it is failing to retrieve knowledge you already have, under pressure, in a 45-minute window. Consolidate rather than accumulate. The instinct to keep adding topics is the wrong instinct now.
<a id="m8-how-to-use-it-on-a-commute"></a>

#### How to use it on a commute
•  One section per journey. Cover the answers with your thumb. Say each one out loud, or mouth it silently - it still works.
•  Score yourself honestly. Three or more misses in a section means that section is your next Friday.
•  Do not re-read the answer and move on. Re-read it, then look away and say it. Reading produces recognition; saying produces recall, and only recall shows up in an interview.
•  Part 6 is the highest-value page. Every "why X and not Y" in one table. That is the shape of most follow-up questions.
<a id="m8-part-1-c-and-the-runtime-one-line-each"></a>

### PART 1 - C# and the runtime, one line each

| Prompt | Answer |
|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Rows to read with corrections: string interpolation does not box on C# 10+/.NET 6+ (see M1 Q6); Server GC uses regions and DATAS on .NET 9+ (M1 Q30); thread-pool injection rate is runtime-dependent (M1 Q38); 'JWT cannot be revoked' is too absolute (M2 Q24); EF Core lazy loading is off by default, so N+1 is not 'a property access' unless proxies are enabled (M2 Q26).

<a id="m8-part-2-databases-one-line-each"></a>

### PART 2 - Databases, one line each

| Prompt | Answer |
|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Rows to read with corrections: the isolation rows are engine-specific — PostgreSQL REPEATABLE READ prevents phantoms and SERIALIZABLE is SSI with no range locks (M2 Q38); lock escalation is SQL Server-only (~5,000 locks) (M2 Q41); RCSI, not SNAPSHOT, is the usual fix for NOLOCK (M2 Q40).

<a id="m8-part-3-networking-os-and-distributed-systems-one-line-each"></a>

### PART 3 - Networking, OS and distributed systems, one line each

| Prompt | Answer |
|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Rows to read with corrections: R+W>N is not linearizability (M3 Q17); four nodes *do* have a majority of three — even sizes just add cost without tolerance (M3 Q18); SQS FIFO and Kafka EOS give bounded effectively-once (M3 Q24); share groups change the consumers-vs-partitions rule (M3 Q30); 2PC is still used inside consensus-replicated databases (M4 Q13); async file I/O on Linux uses pool threads (M3 Q15).

<a id="m8-part-4-the-numbers-to-know-cold"></a>

### PART 4 - The numbers to know cold

| Quantity | Value |
|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Thread stack size is platform-dependent (~1 MB Windows, ~1.5 MB .NET threads on Linux). Ignore the 'H-1B style ratios' row — it does not belong in a technical numbers table. The 99.9% ≈ 43 min/month and 99.99% ≈ 4.3 min/month rows are correct.

<a id="m8-part-5-the-fifteen-dsa-patterns-recognition-only"></a>

### PART 5 - The fifteen DSA patterns, recognition only
The full reasoning is in DSA_MASTER_GUIDE. This is the recall drill - cover the right column and name the cue.

| Pattern | Recognise it when |
|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Sliding window: the precondition is 'validity is monotone in window size', not 'all values positive' (see DSA pattern 2).

<a id="m8-part-6-why-x-and-not-y-the-follow-up-bank"></a>

### PART 6 - Why X and not Y (the follow-up bank)
This is the highest-value page in the file. Almost every "why did you choose that?" is one of these rows.

| Choice | First when | Second when |
|---|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** Rows to read with corrections: the window-vs-prefix row has the same 'positive' over-simplification; '2PC almost never' is too absolute (M4 Q13); 'Serializable/snapshot… readers must never block writers' is wrong for PostgreSQL SSI, which does not block readers either (M2 Q40).

<a id="m8-part-7-the-45-minute-oral-revision-outlines"></a>

### PART 7 - The 45-minute oral revision outlines
Weeks 29 and 30 ask you to speak for 45 minutes on each area with no notes. That is the most demanding English practice in the whole plan, and it is also the best final check. Use these as the running order.

| Area | Cover, in this order |
|---|---|
| C# and .NET | Type system and memory; object layout; OOP and dispatch; collections internals; LINQ and deferred execution; delegates and closures; exceptions; IDisposable and the GC; async state machine and the pitfalls; the runtime, JIT and tiering |
| Databases | Pages and B-trees; clustered vs non-clustered; covering indexes; execution plans and SARGability; statistics and plan choice; join algorithms; ACID; isolation levels and anomalies; MVCC vs locking; deadlocks and escalation; normalisation and when to denormalise; connection pooling |
| Networking and OS | The URL journey end to end; DNS; TCP handshake, flow and congestion control; TLS; HTTP versions; WebSockets and scaling; process vs thread; context switching; virtual memory and paging; scheduling; synchronisation primitives; blocking vs async I/O down to IOCP |
| Distributed systems | Replication and lag; quorums; partitioning and consistent hashing; CAP and PACELC; consistency models; caching strategies and failure modes; delivery guarantees and idempotency; DLQ and retries; Kafka model; consensus and Raft; distributed locks; outbox and saga; resilience patterns; observability |
| Your projects | Job platform: architecture, state machine, retries, idempotency, DLQ, priority and fairness, rate limiting, tenant isolation, metrics, deployment, load test numbers, bottleneck, what you would change. RAG: chunking decision, hybrid search, evaluation numbers |
| Behavioural | All 20 stories, randomised, under 3 minutes, Action-heavy, each with a number and a "what I would do differently" |

<a id="m8-part-8-final-self-test"></a>

### PART 8 - Final self-test
Forty prompts. Say each out loud, no notes. Score yourself. Anything under 34 out of 40 means you have a specific gap, not a general one - find it and repair it rather than revising everything again.

| # | Prompt | Prompt |
|---|---|---|
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

What you have, at this point. Deep .NET knowledge, working pattern recognition, system design competence, two deployed projects with measured numbers, twenty rehearsed stories, and eight months of demonstrated discipline. None of that expires. If there is no offer yet, the correct response is to continue the month 7 loop - repair, mock, apply - at a sustainable level. Most people who reach this point and keep going convert within the following few months.
The failure mode to avoid is concluding the eight months were wasted and stopping. That would be stopping at exactly the point where the accumulated work starts paying.

> ⚠️ **Correction (final version, 19 Oct 2026):** The prompt about 'three accidental boxing sites' must not use string interpolation as an example on modern .NET (M1 Q6).



## Commute guides from each month file

<a id="m1-guide"></a>

### M1 — how to use it on a bad week

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 1 Q&A - C#, Memory and Async
Weeks 1 to 4. The month that turns "I use C#" into "I understand C#". 42 questions.
Covers: Weeks 1-4. Type system, memory, OOP, collections, LINQ, delegates, exceptions, lifetime, async.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | What is the difference between a value type and a reference type? |
| 2 | Where does a struct actually live - stack or heap? |
| 3 | What is boxing and what does it cost? |
| 4 | What does await actually do? |
| 5 | Why does calling .Result deadlock? |

##### What this file answers
Everything in the Month 1 checkpoint, plus the follow-up questions an interviewer asks after your first answer. If you can say all 42 of these out loud, Month 1 is done - regardless of how many days you managed to sit down.

<a id="m2-guide"></a>

### M2 — how to use it on a bad week

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 2 Q&A - Runtime, ASP.NET Core and SQL
Weeks 5 to 8. The month that makes you dangerous in a .NET interview. 46 questions.
Covers: Weeks 5-8. Concurrency, the runtime and GC, ASP.NET Core hosting and DI, Web API and JWT, EF Core, caching, and the deepest SQL week in the plan.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | .NET Framework versus modern .NET, in 60 seconds |
| 2 | What does the thread pool actually do, and what is starvation? |
| 3 | Trace a request from Kestrel to your controller and back |
| 4 | Why can a JWT not be revoked? |
| 5 | Write the isolation level to anomaly table from memory |

##### What this file answers
Everything in the Month 2 checkpoint. Part E (SQL) has the highest immediate value of anything in these eight files - it applies to your job on Monday morning, not just to interviews.

<a id="m3-guide"></a>

### M3 — how to use it on a bad week

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 3 Q&A - Networking, OS and Distributed Data
Weeks 9 to 12. The month that fills the degree-shaped gap. 44 questions.
Covers: Weeks 9-12. Networking, operating systems, replication and partitioning, caching, and messaging. Plus the first three system designs.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | What happens when you type a URL and press enter? |
| 2 | Why does TLS use both asymmetric and symmetric cryptography? |
| 3 | Why does async I/O not need a thread while waiting? |
| 4 | Why does consistent hashing beat modulo hashing? |
| 5 | Why is exactly-once delivery a myth, and what do you do instead? |

##### What this file answers
Everything in the Month 3 checkpoint. This is the material a CS degree gives people and you were never taught - which is why it is also the material that most changes how senior you sound.

<a id="m4-guide"></a>

### M4 — how to use it on a bad week

*Source: Q-and-A/M4_Design_and_Distributed_Systems.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 4 Q&A - Design, LLD and Distributed Systems
Weeks 13 to 16. Design skills, and the project starts. 36 questions.
Covers: Weeks 13-16. SOLID, the design patterns that matter, consensus, distributed locks, outbox and saga, resilience and observability.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | Explain SRP without reciting the definition |
| 2 | Why is Dependency Inversion not the same as using a DI container? |
| 3 | Why is two-phase commit avoided in modern systems? |
| 4 | Why can a distributed lock not be made safe with timeouts alone? |
| 5 | What is the dual-write problem and how does outbox solve it? |

##### What this file answers
Everything in the Month 4 checkpoint, plus the LLD round questions Amazon asks explicitly. Part C is the material that separates SDE II from SDE I.

<a id="m5-guide"></a>

### M5 — how to use it on a bad week

*Source: Q-and-A/M5_System_Design_and_Behavioural.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 5 Q&A - System Design and Behavioural
Weeks 17 to 20. The month you become interview-ready. 34 questions.
Covers: Weeks 17-20. Project phases 2 to 4, the estimation numbers, the classic designs, and the behavioural structure.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | The nine steps of a system design, in order |
| 2 | The estimation numbers you must know cold |
| 3 | Why does neither pure fan-out strategy work at scale? |
| 4 | How do you avoid overselling inventory without a distributed transaction? |
| 5 | Why does Action get 55% of a STAR answer? |

##### What this file answers
Everything in the Month 5 checkpoint - which is the gate to applying. Part A is the numbers to memorise; Part D is the behavioural structure that decides roughly half your Amazon score.

<a id="m6-guide"></a>

### M6 — how to use it on a bad week

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 6 Q&A - Interview Rounds and Delivery
Weeks 21 to 24. Applications start. This month is about performance, not knowledge. 26 questions.
Covers: Weeks 21-24. The Google and Amazon loops, how to behave inside a round, what to do when stuck, and the aptitude gates on mid-tier applications.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | What do you do in the first five minutes of a coding round? |
| 2 | You are stuck with fifteen minutes left. What do you actually do? |
| 3 | The interviewer gives you a hint. How do you take it? |
| 4 | What is the Bar Raiser looking for? |
| 5 | How do you code with no autocomplete and no compiler? |

##### What this file answers
By now the knowledge is largely built. What is untested is whether you can deploy it in 45 minutes, in English, with someone watching. That is a different skill and this file is about that skill.

<a id="m7-guide"></a>

### M7 — how to use it on a bad week

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

#### Month 7 Q&A - Advanced Distributed Systems and Streaming
Weeks 25 to 28. The topics that separate SDE II from SDE I. 26 questions.
Covers: Weeks 25-28. Kafka in depth, stream processing, advanced consistency, multi-region, time series, and the RAG service.
Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.
##### How to use this on a bad week
•  20 minutes on a train: read the five questions in the box below. Nothing else.
•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.
•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.
•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.
##### If you only have 20 minutes, read these five

| # | Question |
|---|---|
| 1 | When does Kafka beat SQS, concretely? |
| 2 | What is the difference between linearizability and serializability? |
| 3 | Why is event time harder than processing time? |
| 4 | What is write skew and which isolation levels permit it? |
| 5 | What is the hardest part of building a RAG service? |

##### What this file answers
The Month 7 checkpoint, plus the questions that come up when an interviewer decides you are strong and starts probing for the ceiling. Most candidates at your level cannot answer Part B or Part C.


## Self-tests and checklists from each month file

<a id="m1-part-f"></a>

## PART F - The Month 1 self-test

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Cover the answers. If you can say all twelve out loud, Month 1 is genuinely done. Anything you cannot goes in the WEAK tab.

| # | Say it out loud, no notes |
|---|---|
| 1 | Value vs reference types, and where a struct actually lives |
| 2 | What boxing is and three places it happens accidentally |
| 3 | What is physically in memory when you write new Person() |
| 4 | How the runtime picks which method to call, at method-table level |
| 5 | The Equals/GetHashCode contract and what breaks without it |
| 6 | Why dictionary lookup is O(1) and what degrades it |
| 7 | What yield return compiles into |
| 8 | Deferred execution, and a real bug it causes |
| 9 | Why throw ex is wrong |
| 10 | Why a finalizer makes collection take two GC cycles |
| 11 | The async state machine, from call to resumption |
| 12 | Why .Result deadlocks - both the sync-context half and the starvation half |

If you have had a bad month and only read this file, you are not behind in the way you think. The tracker measures days; interviews measure what you can say. Twelve answers you can give out loud is worth more than twenty days of reading you cannot reproduce.

<a id="m2-part-f"></a>

## PART F - The Month 2 self-test

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Cover the answers. Anything you cannot say goes in the WEAK tab.

| # | Say it out loud, no notes |
|---|---|
| 1 | Thread pool, injection rate, starvation - and its production signature |
| 2 | Why you cannot await inside a lock, and what to use instead |
| 3 | .NET Framework versus modern .NET, in 60 clean seconds |
| 4 | Why gen 0 is cheap and gen 2 is expensive |
| 5 | Kestrel to controller and back, naming each stage |
| 6 | The captive dependency problem and what actually goes wrong |
| 7 | Why a JWT cannot be revoked, and the three workarounds |
| 8 | The N+1 problem, how you find it, and two ways to fix it |
| 9 | Cache stampede and three ways to prevent it |
| 10 | Seek versus scan versus lookup, and when a scan is correct |
| 11 | SARGability, with the YEAR() example and the rewrite |
| 12 | The isolation level to anomaly table, from memory |
| 13 | Why the optimiser chose a hash join over nested loops |
| 14 | Lock escalation and why batching fixes it |

Part E is the one to over-invest in. SQL depth is the only topic in these eight files that pays you back at work the same week you learn it - and your day job at Casepoint involves query optimisation, so every hour here has two returns.

<a id="m3-part-f"></a>

## PART F - The Month 3 self-test

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Cover the answers. Anything you cannot say goes in the WEAK tab.

| # | Say it out loud, no notes |
|---|---|
| 1 | The full URL journey, five minutes, without stalling |
| 2 | The TCP handshake, and what reliability costs |
| 3 | Why TLS uses both asymmetric and symmetric cryptography |
| 4 | Head-of-line blocking, and what HTTP/2 fixed and what it did not |
| 5 | Why a context switch is expensive - cache and TLB |
| 6 | Virtual memory, page faults, and why a fault is not an error |
| 7 | How await maps down to IOCP, and why waiting needs no thread |
| 8 | Consistent hashing, virtual nodes, and why modulo fails |
| 9 | CAP stated correctly, including the common misreading |
| 10 | Why exactly-once delivery is impossible and what you do instead |
| 11 | Visibility timeout, and what goes wrong when processing is slow |
| 12 | Why retries need jitter, and why they need a circuit breaker too |
| 13 | SQS versus Kafka, with a real reason for each |
| 14 | The dual-write problem and how the outbox solves it |

Your advantage in this month. You have used SQS, EventBridge, Redis and SignalR in production. You are not learning Part D from zero - you are learning the vocabulary for things you have already built. Always anchor the answer to your own system: "we hit exactly this with duplicate deliveries in the email pipeline, and the fix was...". That is the answer no other candidate can give.

<a id="m4-part-f"></a>

## PART F - The Month 4 self-test

*Source: Q-and-A/M4_Design_and_Distributed_Systems.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Cover the answers. Anything you cannot say goes in the WEAK tab.

| # | Say it out loud, no notes |
|---|---|
| 1 | Each SOLID principle, with a violation you personally encountered |
| 2 | Why Dependency Inversion is not the same as a DI container |
| 3 | When a design pattern is over-engineering |
| 4 | How event handlers leak memory in .NET |
| 5 | The case for and against wrapping EF Core in a repository |
| 6 | Why 2PC is avoided, and what replaced it |
| 7 | Raft leader election, from memory |
| 8 | Why a distributed lock is unsafe with timeouts alone, and what fencing tokens fix |
| 9 | The dual-write problem and the outbox pattern |
| 10 | Circuit breaker states, and why retries alone amplify an outage |
| 11 | RED versus USE, and why p99 not average |
| 12 | What happens to an in-flight job when its worker dies |
| 13 | Your project bottleneck, with a real number |
| 14 | A failure mode you deliberately did not handle, and why |

Parts C and E are the ones that matter most. Part C is the material Amazon uses to separate SDE II from SDE I. Part E is your project, and your project will be probed harder than anything else on your resume - a weak answer on your own work costs more than a weak answer on a general topic.

<a id="m5-part-e"></a>

## PART E - The Month 5 gate

*Source: Q-and-A/M5_System_Design_and_Behavioural.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

This is the most important checkpoint in the plan. Do not start applying to your top targets until these are genuinely true. The plan is eight months precisely so a two-week delay here is affordable - and applying with a half-built project converts a strong candidate into a rejection plus a 6-12 month cooldown, which is far more expensive.

| # | True? |
|---|---|
| 1 | The project is deployed and publicly reachable |
| 2 | It survives a worker being killed mid-job, with the job recovered |
| 3 | It handles duplicate delivery without double-processing, and I can demonstrate it |
| 4 | Retries with backoff and jitter, and a working DLQ with replay |
| 5 | A rate limiter that is correct across multiple instances |
| 6 | A metrics dashboard and health checks |
| 7 | Load tested, with real p95/p99 numbers written down |
| 8 | I know my bottleneck and can evidence it with a number |
| 9 | CI/CD green, and I built it rather than copying it |
| 10 | README complete with an architecture diagram and stated trade-offs |
| 11 | 15-20 STAR stories written and rehearsed aloud |
| 12 | Every high-frequency Amazon principle covered by at least two stories |
| 13 | A Have Backbone story that is genuinely mine |
| 14 | 9 system designs completed, all timed at 45 minutes |
| 15 | I can explain the project in 5 minutes, and defend it for 30 |

If several are "no" - spend the first two weeks of month 6 repairing, then apply. That is the plan working as designed, not the plan failing.

<a id="m7-part-f"></a>

## PART F - The Month 7 checklist

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*


| # | True? |
|---|---|
| 1 | Every interview has produced a written analysis with a named root cause |
| 2 | Gaps are actually closing, not recurring - and if one recurred three times, I changed the method |
| 3 | Can explain Kafka's model and when it beats SQS |
| 4 | Can distinguish linearizability from serializability |
| 5 | Can explain write skew and which isolation levels permit it |
| 6 | 4 full mock loops done this month |
| 7 | Both projects survive 30 minutes of hostile questioning |
| 8 | The RAG service is built, deployed, and has measured recall numbers |
| 9 | Pipeline still active |

The recurring-gap rule, restated because it matters most this month. If the same root cause appears three times in your analysis log, your repair method is wrong, not your effort. Stop repeating the practice and change its shape: implement the algorithm from scratch from memory until it is automatic, rather than solving more problems that use it. Repetition of failure is not practice.
