# Your actionable six to eight month preparation guide

Prepared 12 October 2026 for Rahul. You confirmed that you have not completed the preparation yet. Your priority is DSA, system design, behavioral interviews, .NET from basics to advanced, Docker/CI/CD, and then the relevant AI material.

**Start with Day 1 below. You do not need to understand this entire guide before starting.** It defines the boundaries of each topic so “study arrays” becomes a set of concrete actions. Use the older Word documents as references when you reach their subject, not as additional assignments.

This is a backend/SDE-2 preparation curriculum, not a promise of a particular company or level. It covers a broad foundation with selected advanced depth. Mastering every corner of computer science in eight months is not a realistic objective.

## 1. What you do today

Open a C# console project or the coding environment you already know. Do not spend the session configuring a new dashboard.

1. Create the array `[4, -2, 7, 7, 0]`.
2. Print its elements using a loop.
3. Write separate functions to calculate the sum, find the largest element and count occurrences of a target.
4. Predict what happens for an empty array before running the functions. Decide what your maximum function should return or throw for empty input.
5. Explain why accessing a known index is O(1), while finding a value in an unsorted array is O(n).
6. Copy the array variable to another variable, change one element through the second variable, and explain why the first sees the change. Then repeat using a cloned array.
7. Write one line: “I can do ___ independently; I still need help with ___.”

That is a complete first session. You do not need Two Sum, Kadane, Span, Kubernetes or system architecture today.

## 2. Time and learning method

Assumption: 2 hours Monday–Friday and 5 focused hours on each weekend day, totaling **20 hours/week**. Breaks are outside focused time. If your sustainable weekend capacity is lower, use eight months and remove optional material. Do not borrow from sleep or assume commute time is required study time.

| Weekly allocation | Hours | What it buys |
|---|---:|---|
| DSA | 9 | Learning, independent solutions, mixed tests and re-solves |
| System design and LLD | 3 | Foundations initially; design and machine coding later |
| Behavioral and speaking | 1 | Real story collection, short explanations, mock answers |
| C#/.NET, SQL, CS and security | 3 | One focused topic and a small experiment |
| Project, Docker/CI/CD, later AI | 2 | A continuous bounded build; may borrow design time for implementation |
| Recall and weekly review | 1 | Old material tested without notes |
| Tracking and flexible time | 1 | Brief logging and inevitable overrun |

This allocation is a planning budget, not seven new daily obligations. Early project slots become small C# exercises. Later, project work can also provide the SQL, design and testing practice. Do not count the same hour twice or add every track on top of the budget.

### The weekday two hours

| Minutes | Action |
|---|---|
| 0–10 | Recall an older concept or re-derive yesterday's approach without looking |
| 10–80 | DSA: one small lesson/exercise or one problem, including testing |
| 80–110 | One C#/.NET/SQL/CS topic and a tiny code experiment |
| 110–115 | Explain one decision aloud in simple English |
| 115–120 | Log the attempt, mistake and next review |

On Friday, use the same blocks for old mistakes and mixed practice rather than automatically adding new topics. If a problem occupies the full DSA slot, that is normal. “Two problems per day” is not a beginner requirement.

### Every topic needs these six outputs

1. **Meaning:** define it in simple words.
2. **Mechanism:** draw or trace what changes step by step.
3. **Implementation:** write a small example without copying.
4. **Reasoning:** explain why it works and its cost or trade-offs.
5. **Failure case:** identify where the approach breaks or is inappropriate.
6. **Delayed recall:** repeat a small task after a gap.

For DSA, first clarify constraints, work a tiny example, propose brute force, locate repeated work, choose an improvement, code it, test it and state complexity. Learn an approach from a hint after 25–35 minutes of a serious stalled attempt; do not spend two hours staring. Close the explanation and reconstruct it yourself. Mark a hinted solution honestly.

Use AI for explanations, hints after an attempt, counterexamples and review of your reasoning. Independent attempts and mocks must be unassisted. An AI-generated solution is not a completed practice attempt.

### One progress record

Use the existing workbook or a simple local note. The app needs repairs before it can run the schedule; see the audit. Record:

`Date | Topic/problem | Independent / hint / solution read | Main mistake | Complexity or trade-off | Next review | Code/note location`

Revisit weak items approximately after 1, 3, 7, 14 and 30 days, based on the **actual study date**. Prioritize failed recall; do not create an unmanageable queue by scheduling every trivial item five times. Limit daily recall to its time box and reserve Friday for the rest.

## 3. Exactly what “do arrays” means

The following is a full array progression. It spans several weeks and overlaps with hashing, sorting and binary search. **It is not a single week's workload.** A linked interview problem is a representative exercise; you do not need to finish every optional extension before moving on.

| Stage | Learn precisely | Write or solve | Ready to move on when |
|---|---|---|---|
| A. Representation | Fixed size, indexes 0..n-1, Length, element access, traversal, reference semantics, alias vs copy | Print, sum, maximum, minimum, frequency, clone demonstration | You implement these and handle empty/one-element inputs |
| B. Costs and mutation | O(1) indexing, O(n) search; shifting for insertion/deletion; logical length; array vs List; input mutation | Linear search, check sorted, second-largest distinct value, manual insertion/deletion with spare capacity | You can show the shifted indexes and explain the cost |
| C. Simple transformations | Swap, reverse, reader/writer pointer, preserving order | Reverse array; [Move Zeroes](https://leetcode.com/problems/move-zeroes/); [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | No elements are accidentally overwritten; explain the processed prefix |
| D. Hash-assisted arrays | HashSet membership, Dictionary frequencies/complements; duplicates and expected lookup cost | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/); [Two Sum](https://leetcode.com/problems/two-sum/) | Solve brute force first, then explain the memory-for-time trade-off |
| E. Opposite-end pointers | Sorted-input assumption, safe pointer movement, duplicate handling | [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/); [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/); later [3Sum](https://leetcode.com/problems/3sum/) | Explain why the discarded candidates cannot solve the problem |
| F. Prefix/suffix | Running totals, range sums, prefix/suffix products, seed value, overflow | [Running Sum](https://leetcode.com/problems/running-sum-of-1d-array/); [Range Sum Query](https://leetcode.com/problems/range-sum-query-immutable/); later [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Derive a range-sum formula, including a range starting at zero |
| G. Windows | Fixed-size add/remove; variable-size invariant; frequencies; valid shrinking condition | [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/); [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Explain why the positive-sum window rule does not generalize directly to negative numbers |
| H. Prefix plus map | Count previous prefix sums, order of checking/updating, prefix zero | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Correctly handle negative numbers, zero and repeated prefix sums |
| I. Running optimum | Local vs global state; restart or extend | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/); [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Derive the update and handle all-negative maximum-subarray input |
| J. Ordered search | Sorted search space, bounds, invariant, termination | [Binary Search](https://leetcode.com/problems/binary-search/); first/last occurrence | Correct for missing values, duplicates and one-element input |
| K. Sort and sweep | Sorting cost, interval endpoints, overlap, tie handling | [Merge Intervals](https://leetcode.com/problems/merge-intervals/); [Insert Interval](https://leetcode.com/problems/insert-interval/) | Explain whether touching endpoints overlap under the problem definition |
| L. Matrices | Row/column indexing, rectangular vs jagged arrays, boundaries, transpose | Matrix sum, transpose; [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/); later [Rotate Image](https://leetcode.com/problems/rotate-image/) | Correct on one row, one column and non-square input where supported |
| M. Advanced selected | Three-way partition, cyclic placement, max/min product state, monotonic structures | Sort Colors; Maximum Product Subarray; later Trapping Rain Water / First Missing Positive | Core stages are dependable; advanced tasks are not blocking basic progress |

Before declaring the early array foundation complete, independently write sum, maximum, reverse, search, sorted check and frequency count; solve a duplicate/membership problem; explain alias versus copy; state complexity; and test boundary cases. This is the first checkpoint, not a requirement to solve every hard array problem.

### First fourteen days

Use the weekday timing above. Day numbers are study days starting from your actual start date. The 14-day plan deliberately moves slowly enough to establish the method.

| Day | DSA work | Supporting topic and concrete output |
|---|---|---|
| 1 | Today's seven steps from Section 1 | C#: array/reference copying demonstration |
| 2 | Linear search, minimum, maximum; trace loop bounds | Types, `int` vs `long`, integer division and overflow; show one example |
| 3 | Reverse an array using swaps; test 0, 1, odd and even lengths | Methods, parameters, return values; implement `Reverse` yourself |
| 4 | Check sorted order; second-largest distinct element | Conditions and edge cases; decide behavior when fewer than two distinct values exist |
| 5 | Reimplement Days 1–4 with no notes; repair the first failure | Value vs reference types; explain mutation versus reassignment |
| 6 — weekend | Trace insertion/deletion with shifting; List vs array; attempt Contains Duplicate with nested loops, then a set | 90 min DSA, 60 min C# collections, 45 min trace a simple API request, 30 min inventory real work stories, 45 min tiny console exercise/tests, 30 min review/buffer |
| 7 — weekend | Array checkpoint: small functions and two changed-input exercises | 90 min DSA assessment, 60 min repairs, 45 min HTTP client/server basics, 45 min assertions/tests, 30 min recorded explanation, 30 min rest/buffer |
| 8 | Frequency map using Dictionary; count each value | `TryGetValue`, missing keys, equality and hash codes at a practical level |
| 9 | Two Sum brute force; trace why one element cannot be reused | Set vs dictionary; write the input/output contract |
| 10 | Two Sum using a map; check before insert; duplicates such as `[3,3]` | C# loops and helper methods; state expected time and extra space |
| 11 | Move Zeroes using a reader/writer pointer | In-place changes; trace `[0,1,0,3,12]` and all-zero input |
| 12 | Re-solve a previously hinted task; mixed array question with no pattern label | Unit testing basics; turn five boundary cases into assertions |
| 13 — weekend | Remove Duplicates from Sorted Array; then Running Sum | 120 min DSA, 60 min C# classes/interfaces basics, 45 min model a small job submission API on paper, 30 min work-story outline, 45 min review/buffer |
| 14 — weekend | Re-solve Two Sum cold; implement range-sum queries from a prefix array | 120 min DSA/checkpoint, 60 min fix weakest prerequisite, 45 min persistence vs memory concept, 30 min explain a real work feature, 45 min next-week review/buffer |

If Days 9–10 take three sessions, shift the later tasks. Do not jump to the calendar's next algorithm while missing its prerequisite. If the simple exercises are already easy, demonstrate the checkpoint and advance rather than repeating them for a fixed number of days.

## 4. DSA syllabus after arrays

**Core** means learn, implement, test and solve variations. **Extension** means learn only after the core checkpoint or when a target role warrants it. Named problems below are suggestions, not claims about future interview questions. Search the exact titles on your preferred practice platform.

| Topic and order | Core concepts and starter exercises | Next problems and selected extensions | Demonstration |
|---|---|---|---|
| Complexity, throughout | Input size, O(1)/log n/n/n log n/n²; nested loops; auxiliary space; recursion stack; library-operation costs | Amortized vs expected cost; output-sensitive complexity | Derive the cost of your actual code, including sorting and copies |
| Strings and hashing | Immutable strings, char vs string, frequency counts, StringBuilder, ordinal equality; Valid Anagram, Valid Palindrome | Group Anagrams, Longest Consecutive Sequence, longest palindrome by center expansion | Handle duplicates, case assumptions and empty input; avoid repeated concatenation |
| Two pointers and windows | Read/write pointers; sorted pair search; fixed/variable windows | Longest Substring Without Repeating Characters, Permutation in String, 3Sum; Minimum Window Substring later | State the invariant and why each pointer moves |
| Binary search | Exact match, lower/upper bound, midpoint, closed/half-open intervals | First/Last Position, rotated search, Koko Eating Bananas, Ship Packages | Define a monotone predicate before binary-searching an answer |
| Sorting and selection | Implement merge sort; understand quicksort partitioning; comparator correctness, stable vs unstable, heap basics | Kth Largest using heap then quickselect; counting sort when range is bounded | Explain average/worst-case costs and extra memory; all eight sorts are not equally important |
| Linked lists | Node/reference model, head/tail, sentinel, mutation, reverse and merge | Middle, Remove Nth from End, Cycle, Reorder List; k-group reversal later | Draw references before mutation; handle loss of head and null |
| Stack and queue | Push/pop, enqueue/dequeue, LIFO/FIFO, Stack/Queue APIs | Valid Parentheses, Min Stack, Evaluate RPN, Queue Using Stacks | Correct behavior under empty operations; amortized queue explanation |
| Monotonic structures | Store indexes; increasing/decreasing invariants; each item pushed/popped once | Daily Temperatures, Next Greater Element; Sliding Window Maximum, Largest Rectangle later | Explain the linear-time amortized argument |
| Recursion | Base case, progress, call stack, return value, local vs shared state; sum, reverse, simple tree traversal | Divide-and-conquer and recursion-to-loop trade-offs | Trace three levels and explain when a frame returns |
| Backtracking | Choose/explore/unchoose, copies vs shared state, pruning, duplicate handling | Subsets, Permutations, Combination Sum, Word Search; N-Queens optional | Restore state correctly and bound the search tree |
| Trees | Recursive/iterative traversals, depth, BFS levels, paths, subtree return values | Max Depth, Same Tree, Invert Tree, Level Order, Diameter, LCA; serialization later | Solve an unseen tree combination without memorizing a traversal template |
| BST | Global ordering invariant, range validation, search, inorder order | Validate BST, Kth Smallest, LCA of BST | Explain why checking immediate children alone is insufficient |
| Heaps | Heap invariant; min/max; C# PriorityQueue; stable ordering not assumed | Kth Largest, Top K Frequent, Merge K Sorted Lists; Median from Data Stream later | Explain why a min-heap of size k keeps the largest k |
| Graph traversal | Adjacency list/matrix, directed/undirected, visited, disconnected graphs, grid edges | Number of Islands, Clone Graph, Rotting Oranges, Pacific Atlantic | Choose BFS vs DFS; mark visited at the correct moment |
| Graph dependencies | Directed cycles, indegree, topological order | Course Schedule I/II; Alien Dictionary later | Detect cycles and explain why an order may not be unique |
| Connectivity and weighted paths | DSU/path compression/rank; BFS for unweighted paths; Dijkstra for nonnegative weights | Redundant Connection, Accounts Merge, Network Delay Time | Explain when Dijkstra is unsuitable; track stale heap entries |
| Graph extensions | MST/Kruskal, Bellman-Ford, bipartite coloring | Cheapest Flights with state constraints; Floyd-Warshall/SCC only if useful | State what the graph/state actually represents |
| Intervals and greedy | Sorting by start vs finish; overlap rules; exchange argument | Merge/Insert Intervals, Non-overlapping Intervals, Jump Game, Gas Station, Partition Labels | Give a correctness argument or find a counterexample to a tempting rule |
| DP foundations | Start with recursion; define state, transition, base case, order and result; memoization vs tabulation | Climbing Stairs, House Robber, Decode Ways, Unique Paths | Derive a recurrence without seeing a completed table |
| DP core families | 0/1 vs unbounded choices; loop direction; count vs optimize; grid and string states | Coin Change I/II, Partition Equal Subset Sum, Word Break, LCS, LIS | Explain why a dimension exists and when it can be compressed |
| DP extensions | Edit Distance, stock state machines, tree DP, interval DP | Burst Balloons, bitmask DP only after core competence | Discuss complexity before choosing a large state space |
| Tries | Nodes/edges, terminal markers, prefix search, memory trade-off | Implement Trie, Search Suggestions; Word Search II later | Distinguish a complete word from an existing prefix |
| Bits and basic math | AND/OR/XOR/shifts; signed integers; parity; powers; GCD; modulo | Single Number, Counting Bits, Missing Number; exponentiation | Explain cancellation and overflow rather than memorizing tricks |
| Randomized/range extensions | Quickselect randomness; reservoir sampling and Fisher–Yates at overview depth | Fenwick/segment trees, KMP/Rabin–Karp/Z, advanced string/graph algorithms | Optional for general backend prep; do not let these displace core practice |
| Mixed interview practice | Unknown pattern, changing constraints, dry-run tests, code readability, narration | Two-stage prompts: solve, then alter memory/input/stream requirements | A correct independent solution with clear reasoning under a reasonable timer |

**Working quantity:** roughly 150–200 distinct well-chosen problems plus 80–120 meaningful re-solves is a planning range for 32 weeks, not a hiring threshold. Adjust downward if building prerequisites takes longer. Solving the same remembered problem quickly is not evidence of unseen-problem skill.

Use a selection test instead: can you solve a fresh variation without being told the pattern, explain why your solution works, test it and adapt it? Repeatedly failing one family means repair that family rather than increasing total count.

## 5. C# and .NET from basic to advanced

Use C# as both the interview language and project language. Keep frameworks separate from language fundamentals in your notes. For a new project, .NET 10 LTS is a sensible default; the [official support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) lists .NET 8 support ending 10 November 2026. Keep enough Framework knowledge to explain your real work.

| Module | Foundation → deeper coverage | Required small exercise |
|---|---|---|
| Language mechanics | Types, conversions, operators, control flow, methods, nullability, exceptions, `checked`; value/reference semantics; `ref/out/in`, nullable value types | Predict 6 assignment/parameter examples, run them, explain mismatches |
| Objects and contracts | Classes, structs, records, interfaces, abstract classes, encapsulation, inheritance, composition; virtual/override/new; equality/hash code | Model a job and handlers, then replace one handler without editing callers |
| Collections and generics | Array, List, Dictionary, HashSet, Stack, Queue, PriorityQueue; generic constraints; equality comparers; variance at explanation depth | Choose structures for five operations and justify costs; write a custom comparer |
| Delegates and LINQ | Delegates, lambdas, closures, events; IEnumerable/IEnumerator; yield; deferred execution, repeated enumeration, IQueryable boundary | Demonstrate closure capture and a query executing twice; rewrite a hot path clearly |
| Resource lifetime | `using`, IDisposable/IAsyncDisposable, finalization, unmanaged resources, ownership; exception propagation and `throw` vs `throw ex` | Dispose an owned resource correctly on success, exception and cancellation |
| Async | Task vs thread; I/O vs CPU work; async state machine; await; WhenAll/WhenAny; cancellation and timeouts; async void; sync-over-async | Build 3 concurrent I/O calls with cancellation, partial failures and bounded concurrency |
| Concurrency | Race, atomicity, visibility, lock ordering, Monitor, Interlocked, SemaphoreSlim; ConcurrentDictionary compound operations; bounded Channels | Reproduce a race, fix it, then build a bounded producer/consumer with graceful shutdown |
| Runtime and memory | CLR/CoreCLR, IL/JIT, SDK/runtime, GC roots/generations/LOH, boxing; allocation vs retention; server GC; stack location is not the definition of a value type | Observe allocations/counters and explain one retained object; benchmark rather than guess |
| ASP.NET Core | Hosting/Kestrel, middleware order, routing, binding, validation, error responses, DI lifetimes, options, configuration, structured logging | Build a small API from an understood template; reproduce/fix a captive dependency |
| HTTP clients and background work | IHttpClientFactory or correctly managed long-lived clients, connection reuse/DNS lifetime, timeout/cancellation, retry safety; BackgroundService scopes/shutdown | Call a slow fake dependency and stop cleanly without infinite retries |
| EF Core | DbContext lifetime, tracking, projections, eager/explicit/lazy loading, N+1, split queries, transactions, optimistic concurrency, migrations | Capture generated SQL, remove N+1, reproduce a conflicting update |
| Diagnostics and performance | dotnet-counters, traces/dumps, CPU vs allocation vs blocked work, thread-pool starvation, BenchmarkDotNet; Span/Memory/ArrayPool/ValueTask when warranted | Produce a before/after measurement for one real bottleneck and state limitations |
| Advanced options | Expression trees, reflection, source generators, AOT/trimming, assembly loading, unsafe code | Explain purpose/trade-offs. Implement only where the project or target role needs it |

Do not memorize runtime implementation trivia without a use case. You should explain why an API stalls, allocates heavily, deadlocks or produces duplicate effects before studying obscure JIT details.

## 6. SQL, operating systems and networking

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

## 7. System design and LLD

Priority after DSA does **not** mean “wait until all DSA is finished.” Start with small requirements/API/data-model exercises, then gradually build full designs.

### Design foundations in order

1. Functional requirements, scope, actors and constraints.
2. Nonfunctional targets: latency, availability, durability, consistency, security and cost.
3. Capacity estimation: requests/sec, peak versus average, object size, storage growth, bandwidth, concurrency and queue drain time. State assumptions and units.
4. API contracts, data model, indexes, pagination, IDs and state transitions.
5. One straightforward working architecture and its read/write flows.
6. Scaling: statelessness, load balancing, caching, replicas, partitions and hot keys.
7. Messaging: queues vs logs/pub-sub, acknowledgments, retries, DLQs, ordering and replay.
8. Correctness under failure: idempotency, outbox/inbox, duplicate effects, crash windows, leases/fencing, reconciliation.
9. Reliability: deadlines, bounded retries, jitter, backpressure, load shedding, circuit breakers and graceful degradation.
10. Operation: metrics/traces/logs, SLI/SLO, alerting, recovery objectives, backups, deploy/rollback and cost.
11. Advanced reasoning: consistency models, quorums and their assumptions, consensus overview, sagas, CDC, schema evolution, multi-region ownership and stream processing.

### Anchor designs

| Order | System | Main learning goal |
|---|---|---|
| 1 | URL shortener | API/data model, IDs, redirects, indexes and cache |
| 2 | Notification service | Preferences, channels, retries, duplicates and user-visible behavior |
| 3 | Distributed rate limiter | Algorithm, atomicity, per-tenant policy and Redis failure behavior |
| 4 | Job processing platform | Durable submission, outbox, scheduling, workers and recovery |
| 5 | Chat | Connections, ordering, offline delivery, presence and fan-out |
| 6 | News feed | Read/write trade-off, fan-out, celebrity/hot-key behavior |
| 7 | Ticket/hotel booking | Inventory invariant, competing writes, timeout and payment reconciliation |
| 8 | File upload/storage or video processing | Object storage, metadata, multipart uploads, CDN and background processing |
| 9 — extension | Search/autocomplete | Inverted index/trie, ranking, freshness and partitioning |
| 10 — extension | Metrics/stream pipeline | Partitions, consumer groups, windows, late data, retention and cardinality |
| 11 — extension | Ride/location service | Geospatial lookup, fresh locations, matching and regional boundaries |
| 12 — extension | Multi-region evolution of one prior system | Failover, ownership, conflict policy and recovery objectives |

Redo a few anchor designs with changed requirements rather than memorize 18 diagrams. A starting 45-minute practice split is 5 minutes requirements, 5 estimates, 8 API/data, 12 architecture/flows, 10 bottleneck/failure deep dive, 5 trade-offs. Adapt to interviewer direction; it is not a compulsory script.

### LLD and machine coding

Learn encapsulation, composition, responsibility, cohesion/coupling, interfaces, invariants, state machines and testability first. Use SOLID to explain a design decision, not to force extra classes.

Implement Strategy, Factory, Observer, Decorator, Adapter, Builder, State and Command through real changes. Learn Singleton risks and DI alternatives. Recognize the remaining GoF patterns; all 23 do not need full implementations.

Six useful exercises: parking lot, logging framework, LRU cache, rate limiter with a controllable clock, split-expense service, and seat reservation. For each: clarify requirements → define APIs/classes → implement the core → test edge cases → accept one change request. Add concurrency only after the sequential invariants are correct. Use money-safe representation/rounding for expense calculations and test simultaneous seat requests for reservations.

**LLD checkpoint:** implement a scoped solution in 60–90 minutes, keep it readable, test it, and extend it without rewriting everything. This is a practice goal, not a universal interview duration.

## 8. Security, testing, delivery and cloud

| Area | Minimum coverage | Required exercise |
|---|---|---|
| Identity | Authentication vs authorization, cookies/tokens, JWT validation, OAuth/OIDC roles, expiry/rotation | Expired/wrong-audience/wrong-signature token fails; authenticated user still needs object permission |
| API security | Object/function access, injection, validation, over-posting, request limits, CSRF vs CORS, SSRF, secrets and sensitive logs | Threat-model the job API and implement negative access/input tests |
| Testing | Unit/integration/end-to-end boundaries, realistic dependencies, deterministic clock/randomness, failure tests | Integration tests with a real test database; fake time for retry/rate-limit logic |
| Evolution | API and event compatibility, serialization, versioning, deployment order | New worker handles an old message; old deployment survives an additive schema change |
| Docker | Images/containers, Dockerfile/layers, build context, ports, networks, volumes, config, logs, non-root user, health checks | Start API/worker/database/broker reproducibly with Compose |
| CI | Restore/build/test, formatting/static checks, artifacts, secrets handling | A failing meaningful test blocks the pipeline |
| CD | Environment configuration, deployment, smoke test, migrations, rollback, health/readiness | Deploy a good version, inject a bad version in a test environment, recover |
| Cloud basics | Compute, managed database, queues, object storage, IAM, network exposure, monitoring and cost | Deploy a bounded environment with a budget alert and teardown instructions |
| Recovery | Backups, restore, RPO/RTO, reconciliation, runbook | Restore into a clean test database and compare expected durable records |

Use AWS initially because it connects to your experience. Understand equivalent service categories rather than studying three cloud platforms. Kubernetes deployments/services/probes/autoscaling are optional extension material after Docker, CI/CD and one working deployment.

## 9. One project with controlled scope

Build the distributed job platform already proposed in your folder, with a smaller first release. Allocate about 60–80 hours across project, design and relevant backend slots over several months. If implementation takes longer, remove extensions first.

| Milestone | Build | Acceptance test |
|---|---|---|
| 1. Small API | Submit/get job, validation, durable metadata, clear state machine | Accepted job can be retrieved after API restart |
| 2. Asynchronous work | One broker, separate worker, attempt history | Worker processes queued work and updates status |
| 3. Durable publication | Job plus outbox row in one transaction; relay with retries | Crash after commit but before publish; accepted job is eventually delivered |
| 4. Idempotent effects | Unique durable key; business update and processed marker transactionally coupled for local effects | Duplicate message causes one committed local effect; crash-before-commit is recoverable |
| 5. Recovery | Bounded attempts, retry delay/jitter, DLQ, safe replay, worker cancellation and recovery | Kill a worker before/after commit; inspect and recover poison jobs |
| 6. Security and load control | Tenant authorization, bounded concurrency, limits, fair scheduling where needed | Cross-tenant request fails; one noisy tenant cannot exhaust all work capacity |
| 7. Delivery and evidence | Containers, CI, deployment, traces/metrics, load test, restore exercise and README | Clean start instructions work; report measured acceptance and completion behavior |

Pick RabbitMQ **or** SQS first. Learning that their semantics differ is valuable; implementing both initially is unnecessary. PostgreSQL is the durable authority. Add Redis only for a demonstrated cache/rate-limit need, not automatically as the correctness boundary for job processing.

If a job calls an external service, explicitly discuss the crash between external success and local recording. Use a downstream idempotency key when supported; otherwise describe reconciliation and possible duplicates. Do not promise universal exactly-once execution.

Benchmark report fields: machine/cloud size, versions, dataset, payload, test duration, offered rate, successful accepted jobs/sec, completed jobs/sec, p50/p95/p99 for each relevant stage, error rate, oldest queue age, resources and bottleneck. Compare 1 vs several workers and explain whether the workload permits improvement. Do not invent a required 5,000 RPS or 45 ms result.

Keep 3–5 short decision records: database choice, broker choice, idempotency boundary, retry/recovery strategy, and one rejected alternative. These are useful for project defense.

## 10. AI-assisted development, RAG and MCP

AI is a supporting track for this backend plan. Begin light tool-use discipline early; build an AI feature only when the core project and interview work are progressing. For a specifically AI-backend role, increase this track by replacing optional topics, not adding hours.

| Layer | Learn | Small output |
|---|---|---|
| AI-assisted coding | Give context/constraints, inspect diffs, verify behavior, protect private code/data, recognize fabricated APIs | Compare an assisted change with requirements and meaningful tests; explain every accepted line |
| LLM application basics | Tokens/context, latency/cost, nondeterminism, structured results, streaming, timeouts and retries | One bounded request with validation, cancellation and measured latency |
| Retrieval | Documents/chunks, embeddings, similarity, metadata filters, lexical vs vector search | Search a small non-sensitive corpus and inspect false positives/missed results |
| RAG | Retrieve relevant evidence, cite it, abstain when absent; chunk size/overlap experiments | A small retrieval-backed Q&A endpoint with a 20–30 question evaluation set |
| Evaluation and safety | Retrieval recall@k, grounded answer checks, latency/cost, stale documents, permissions, prompt injection | A malicious document cannot authorize extra actions or cross-tenant retrieval |
| MCP concepts | Host/client/server, tools/resources/prompts, transport/auth concepts, tool permissions, untrusted outputs | Explain one request flow; optionally expose a harmless read-only project query |
| Advanced optional | Hybrid retrieval, reranking, embedding/index updates, observability and fallback | Change one variable and compare measured outcomes |

An optional document-indexing job can reuse the worker project. Do not start a separate large agent platform. Broad model training, deep ML mathematics and advanced GPU serving are outside the default general-backend plan.

## 11. Behavioral preparation and communication

Start in Week 1 with facts, not polished scripts. Collect **8–10 real reusable stories** initially; add more only for missing dimensions. The number is a planning aid, not an employer requirement.

Cover ownership, customer impact, debugging/incident response, performance improvement, disagreement, failure, ambiguity, prioritization, collaboration/mentoring and learning from feedback. A story can support more than one dimension, but do not force one incident into every answer.

For each story record: context and constraints; your responsibility; alternatives; your personal actions versus team actions; result and how measured; what did not work; what you learned. Prepare a two-minute version and answers to follow-up questions. Never use the app's unverified metrics as personal experience.

Your recorded email-processing improvement is a promising starting point. Reconstruct the original workflow, bottleneck evidence, exact change, workload comparability, your role and remaining limitations. Do not add guarantees about zero loss or technologies you cannot substantiate.

Five minutes of daily technical speaking plus a weekly story practice is enough to begin. Speak in short sentences: “The requirement is…”, “I chose this because…”, “The cost is…”, “Here is a case where it fails…”. Judge technical correctness and clarity before accent.

From Week 8, alternate coding and short design practice with a peer when possible. Later include behavioral follow-ups and a full loop. Confirm the real interview language, editor, AI rules, rounds and level with the recruiter. Official [Amazon](https://www.amazon.jobs/content/en-gb/how-we-hire/sde-ii-interview-prep) and [Microsoft](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) guidance support practicing coding, design, testing and communication; exact processes remain role-dependent.

## 12. Thirty-two week execution order

The tables above define each module; this table tells you when to use it. DSA stays the largest block. Behavioral and recall continue weekly even when not repeated in every row. A week means a unit of work, not proof that everything was learned in seven days.

| Week | DSA focus | Backend/design/build focus | End-of-week output |
|---|---|---|---|
| 1 | Array mechanics and costs | C# types, methods, reference semantics; API request basics | Array functions with boundary cases |
| 2 | Hashing, mutation, prefix basics | Collections/equality; simple tests; first real story | Two Sum and basic array tasks independently |
| 3 | Strings, two pointers, fixed windows | OOP/interfaces/composition; HTTP basics | Explain one pointer invariant and implement a small model |
| 4 | Variable windows, prefix plus map | LINQ/deferred execution, exceptions/resources | Month 1 assessment and weak-list repair |
| 5 | Binary search and sorting | Async/Task/cancellation; initial URL-shortener requirements | Binary search template plus cancellable I/O demo |
| 6 | Linked lists, stacks, queues | Concurrency/Channels; LLD logging exercise | Correct pointer updates and bounded producer/consumer |
| 7 | Recursion and backtracking | ASP.NET pipeline, DI, configuration; API skeleton | Subsets/permutations plus a tested endpoint |
| 8 | Tree traversals and BST | SQL queries/schema; first 30–45 minute design/mock | Tree invariant, query set, feedback record |
| 9 | Heaps and top-K | Indexes/plans; EF Core behavior | One query improvement measured |
| 10 | Graph BFS/DFS | Transactions/concurrency; rate-limiter design | Graph traversal plus reproduced database race |
| 11 | Topological order and DSU | OS/networking focused labs; job project data/API | Durable submission working |
| 12 | Dijkstra, intervals/greedy | Broker/worker; queue semantics; cumulative mock | End-to-end queued job plus mixed DSA assessment |
| 13 | DP recursion/memoization and 1D | Outbox and duplicate handling; notification design | Crash-before-publication test |
| 14 | Knapsack/counting DP | Durable idempotency and recovery; rate limiter LLD | Duplicate/crash test with correct transaction boundary |
| 15 | Grid/string DP, LIS | Authentication/authorization and API threats | Cross-tenant denial and invalid-input tests |
| 16 | Monotonic structures, bits, trie basics | Docker/Compose, CI; project review | Reproducible local build with test pipeline |
| 17 | Mixed patterns; repair weakest family | Retries/DLQ/replay/backpressure; chat design | Failure scenario report |
| 18 | Timed mixed coding | Deployment, logs/metrics/traces; feed design | Deployed bounded system and trace of one job |
| 19 | Unseen variations, selected harder follow-ups | Load test, backup restore, booking design | Honest benchmark and recovery report |
| 20 | Timed coding and re-solves | Project README/defense, LLD change request, real story review | Readiness checkpoint and reviewed resume content |
| 21 | Coding mock plus targeted repair | Design mock and recruiter/referral preparation | First suitable applications if readiness supports them |
| 22 | Mixed coding/assessment practice | Behavioral mock, role-specific design | Concrete follow-up repair from each mock |
| 23 | Two-round simulation | Code comprehension/debugging, SQL/API round as relevant | Work through unfamiliar code and test a fix |
| 24 | Cumulative assessment | Full project defense and interview loop practice | Six-month-core decision: apply, repair or extend |
| 25 | Weak-family repair | Kafka/streaming depth if relevant; schema evolution | Explain replay/order/failure trade-offs |
| 26 | Mixed mocks | Multi-region/failover and a recovery exercise | One prior design evolved under changed constraints |
| 27 | Timed maintenance | AI basics and small retrieval experiment | Small measured retrieval baseline |
| 28 | Mixed practice | Optional RAG/evaluation and MCP concepts | Evaluation results; no unsupported AI claims |
| 29 | Company/role-specific gaps | Optional search/location design or Kubernetes basics | Only the extension justified by a target role |
| 30 | Full mock loop | Behavioral follow-ups, experience depth | Prioritized last three weaknesses |
| 31 | Repair and interview practice | Active applications/interviews; role-fit questions | Evidence-backed interview review |
| 32 | Light maintenance and targeted practice | Consolidate, continue applications, evaluate fit | Sustainable continuation plan based on actual outcomes |

### Six months versus eight months

Six calendar months provide about 26 weeks; eight provide about 35. The table deliberately uses 24 core weeks and 8 extension weeks, leaving roughly 2–3 weeks for illness, work pressure or difficult prerequisites.

If starting on **12 October 2026**, six calendar months ends **12 April 2027** and eight ends **12 June 2027**. The 32 scheduled weeks end **23 May 2027**, leaving buffer before the eight-month date. These are proposed dates; the existing workbook still has its August start and was not changed.

For six months, complete Weeks 1–24 plus repair buffer. Keep a small AI overview inside a project/review slot if wanted; defer the full RAG build, deep Kafka, Kubernetes, advanced range trees and most hard-DP extensions. Do not compress 32 weeks of assignments into 24 weeks unchanged.

For eight months, use Weeks 25–32 according to observed gaps. Interviews can run alongside them. A public project is useful evidence, but it is not a universal prerequisite for applying. Around Weeks 16–20, assess coding/design/experience readiness and opportunities; begin suitable applications when justified instead of waiting for every optional feature.

## 13. Readiness checks

These are self-assessment guides, not official company pass marks. Use independent problems and feedback from another person when available.

| Point | Evidence to collect |
|---|---|
| Week 2 | Basic array functions, Two Sum reasoning, edge tests, reference/copy explanation |
| Week 4 | A fresh array/string task without a pattern hint; explain complexity and a C# example |
| Week 8 | Traversals/backtracking from scratch; one mock; small API and several SQL queries |
| Week 12 | Mixed array/tree/graph tasks; one coherent design with API/schema/failure discussion; queued project |
| Week 16 | Derive a basic DP recurrence; failure-safe project transaction boundary; test pipeline |
| Week 20 | Across several sessions, solve representative unseen medium tasks with tests in about 35–45 minutes; deliver a coherent 45-minute design and defend the project honestly |
| Week 24 | A complete mock loop, 8–10 real stories ready for probing, resume claims defensible, recurring weaknesses getting smaller |
| Week 32 | Interview feedback drives narrow repairs; no dependence on hints for familiar core families |

A missed checkpoint is a diagnosis, not a reason to restart. Spend a bounded repair week on the prerequisite. Drop extensions before core practice. If an unfamiliar medium takes longer, classify why: concept absent, wrong model, implementation bug, missing edge case, or communication difficulty. The repair depends on that cause.

## 14. How to use the existing files without getting overwhelmed

- **Today:** Section 1, then the first 14-day table. Keep the array reference open only when needed.
- **Current week:** the row in Section 12, plus the corresponding topic checklist above.
- **Explanation needed:** open the relevant M1/M2/etc. Q&A or monthly Word guide. Check the audit's corrections before treating an answer as authoritative.
- **Weekly:** one mixed/no-notes check, one work-story update, and the three most important weak items.
- **Monthly:** use the readiness table and change the next month's allocation based on evidence.

You have enough material to begin. The next useful output is a small correct program you can explain, not another roadmap or a larger topic collection.
