# .NET runtime, ASP.NET Core, concurrency and SQL Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q02"></a>

## Q02 — M2_DotNet_Runtime_ASP_and_SQL

Full source content: [Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx](../SOURCE_LIBRARY/Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.

> Read with these corrections: modern interpolation may avoid boxing; string hash caching and ThreadPool growth are implementation-specific; JWT revocation can use stateful checks; SQL isolation differs by engine. With endpoint routing, CORS belongs after routing and before authorization. Specific correction notes follow the affected statements where identified.


<a id="Q02-B0001"></a>

Month 2 Q&A - Runtime, ASP.NET Core and SQL

<a id="Q02-B0002"></a>

Weeks 5 to 8. The month that makes you dangerous in a .NET interview. 46 questions.

<a id="Q02-B0003"></a>

Covers: Weeks 5-8. Concurrency, the runtime and GC, ASP.NET Core hosting and DI, Web API and JWT, EF Core, caching, and the deepest SQL week in the plan.

<a id="Q02-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q02-B0005"></a>

### How to use this on a bad week

<a id="Q02-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q02-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q02-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q02-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q02-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q02-B0011"></a>

| # | Question |
| --- | --- |
| 1 | .NET Framework versus modern .NET, in 60 seconds |
| 2 | What does the thread pool actually do, and what is starvation? |
| 3 | Trace a request from Kestrel to your controller and back |
| 4 | Why can a JWT not be revoked? |
| 5 | Write the isolation level to anomaly table from memory |

<a id="Q02-B0012"></a>

### What this file answers

<a id="Q02-B0013"></a>

Everything in the Month 2 checkpoint. Part E (SQL) has the highest immediate value of anything in these eight files - it applies to your job on Monday morning, not just to interviews.

<a id="Q02-B0014"></a>

### PART A - Concurrency

<a id="Q02-Q001"></a>

<a id="Q02-B0015"></a>

### Q1. What is the difference between a process, a thread and a Task?

<a id="Q02-B0016"></a>

Say this. A process is an isolated address space with its own memory. A thread is a unit of execution inside a process, sharing its memory. A `Task` is not a thread at all - it is a promise of a future result, which may be executed on a pool thread, or on no thread if it is waiting for I/O.

<a id="Q02-B0017"></a>

Why. Conflating Task with thread is the root of most bad async code. A thousand tasks awaiting I/O consume almost no threads; a thousand threads consume a thousand stacks, each around a megabyte of reserved address space.

<a id="Q02-B0018"></a>

Watch out. "A Task is a promise, not a thread" is the sentence to say. It leads naturally into the thread pool question, which is usually next.

<a id="Q02-Q002"></a>

<a id="Q02-B0019"></a>

### Q2. What does the thread pool actually do, and what is starvation?

<a id="Q02-B0020"></a>

Say this. It keeps a set of reusable threads with a work queue per thread, and it steals work between queues to stay balanced. It grows only slowly - on the order of one or two threads per second - because rapid growth causes thrashing. Starvation is when work blocks threads faster than the pool injects new ones, so everything queues behind the blocked threads.

<a id="Q02-B0021"></a>

Why. The pool is optimised for short, non-blocking work items. Blocking holds a thread doing nothing at all, and the deliberately conservative injection rate then becomes the bottleneck.

<a id="Q02-B0022"></a>

Watch out. The signature in production is rising latency with low CPU. If CPU were high it would be a different problem entirely. Saying that distinction is the answer that lands.

<a id="Q02-Q003"></a>

<a id="Q02-B0023"></a>

### Q3. Why is creating a thousand threads worse than a thousand tasks?

<a id="Q02-B0024"></a>

Say this. Each thread reserves around a megabyte of stack, needs a kernel object, and adds to the scheduler's work. With more threads than cores the CPU spends its time context switching rather than computing. A thousand tasks awaiting I/O may occupy no threads at all.

<a id="Q02-B0025"></a>

Why. Threads are an OS resource; tasks are a scheduling abstraction. You want roughly as many runnable threads as you have cores, and as many in-flight operations as your I/O can sustain - those are different numbers.

<a id="Q02-Q004"></a>

<a id="Q02-B0026"></a>

### Q4. What is a race condition, at the CPU and memory-model level?

<a id="Q02-B0027"></a>

Say this. Two threads access shared state without ordering, and the result depends on timing. It is not only about interleaved statements: a read-modify-write like `count++` is three operations, and separately each core has its own cache, so a write by one thread may not be visible to another without a memory barrier.

<a id="Q02-B0028"></a>

Why. The CPU and the compiler are both allowed to reorder operations as long as single-threaded behaviour is preserved. Locks and `Interlocked` insert barriers that forbid the reordering across them, which is what makes the code correct.

<a id="Q02-B0029"></a>

Watch out. Saying "increment is not atomic" is a good answer. Adding "and separately, visibility needs a barrier" is a much better one - most candidates only know the first half.

<a id="Q02-Q005"></a>

<a id="Q02-B0030"></a>

### Q5. lock, Interlocked, or a concurrent collection?

<a id="Q02-B0031"></a>

Say this. `Interlocked` for a single primitive operation - increment, exchange, compare-and-swap - because it is a single CPU instruction with no blocking. `lock` when you need several operations to be atomic together. A concurrent collection when the shared state *is* a collection, because it is designed for it and usually uses fine-grained locking or lock-free techniques internally.

<a id="Q02-B0032"></a>

Why. `lock` compiles to `Monitor.Enter`/`Exit` in a try/finally. It is cheap when uncontended and expensive when contended, because it escalates to a kernel wait.

<a id="Q02-B0033"></a>

Instead of. Do not reach for `lock` first. The cheapest correct thing wins, and for a counter that is `Interlocked.Increment`.

<a id="Q02-Q006"></a>

<a id="Q02-B0034"></a>

### Q6. Why does volatile rarely mean what people think?

<a id="Q02-B0035"></a>

Say this. It prevents certain compiler and CPU reorderings around that one field, and forces a read from memory rather than a register. It does not make an operation atomic - `volatile int x; x++` is still a race - and it does not synchronise anything else.

<a id="Q02-B0036"></a>

Why. It is a barrier annotation, not a lock. People reach for it hoping for atomicity and get only visibility, so the bug survives and becomes harder to reproduce.

<a id="Q02-B0037"></a>

Instead of. `Interlocked` for atomicity, `lock` for grouped invariants. Reach for `volatile` almost never - if you think you need it, you probably need one of the other two.

<a id="Q02-Q007"></a>

<a id="Q02-B0038"></a>

### Q7. What causes a deadlock and how do you prevent one?

<a id="Q02-B0039"></a>

Say this. Four conditions must all hold: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break any one and the deadlock is impossible. The practical fix is to break circular wait by imposing a global lock ordering - always acquire A before B, everywhere.

<a id="Q02-B0040"></a>

Why. Lock ordering works because a cycle requires at least one thread to acquire out of order. If no code path can, no cycle can form.

<a id="Q02-B0041"></a>

Instead of. A lock timeout is a detection mechanism, not a prevention. It turns a hang into an intermittent failure, which is often worse to diagnose.

<a id="Q02-Q008"></a>

<a id="Q02-B0042"></a>

### Q8. Why can you not await inside a lock?

<a id="Q02-B0043"></a>

Say this. A `lock` is thread-affine - the same thread that entered must exit. An `await` can resume on a different thread, which would try to release a lock it never took. The compiler forbids it outright.

<a id="Q02-B0044"></a>

Why. Beyond the mechanics, holding a lock across an await means holding it for the duration of an I/O operation, which destroys throughput even if it worked.

<a id="Q02-B0045"></a>

Instead of. `SemaphoreSlim` with `WaitAsync`. It is not thread-affine, so it is safe across an await. Remember to release it in a `finally`.

<a id="Q02-Q009"></a>

<a id="Q02-B0046"></a>

### Q9. SemaphoreSlim, Mutex or ReaderWriterLockSlim?

<a id="Q02-B0047"></a>

Say this. `SemaphoreSlim` to limit concurrency to N, and it is the only one with an async wait. `Mutex` when you need mutual exclusion across processes, because it is a named OS object. `ReaderWriterLockSlim` when reads massively outnumber writes and readers can safely run in parallel.

<a id="Q02-B0048"></a>

Why. A semaphore counts permits; a mutex is a semaphore of one with ownership tracking; a reader-writer lock trades extra bookkeeping for parallel reads.

<a id="Q02-B0049"></a>

Watch out. `ReaderWriterLockSlim` only pays off when reads dominate heavily and the critical section is long. For short sections a plain lock is usually faster because it has less overhead.

<a id="Q02-Q010"></a>

<a id="Q02-B0050"></a>

### Q10. When would you use Channel<T> rather than BlockingCollection?

<a id="Q02-B0051"></a>

Say this. `Channel<T>` for async producer-consumer - it is built for `await`, supports bounded capacity with backpressure, and never blocks a thread. `BlockingCollection` is the older synchronous equivalent and blocks a thread while waiting.

<a id="Q02-B0052"></a>

Why. On a server, blocking a pool thread to wait for a queue item is exactly the starvation problem from Q2. A channel lets the consumer await, so the thread is released.

<a id="Q02-B0053"></a>

Instead of. `BlockingCollection` is still fine in a console tool or a dedicated background thread where blocking costs nothing.

<a id="Q02-Q011"></a>

<a id="Q02-B0054"></a>

### Q11. When do Parallel.For and PLINQ hurt rather than help?

<a id="Q02-B0055"></a>

Say this. When the work is I/O-bound, because you are occupying threads to wait. When the per-item work is tiny, because the partitioning and coordination overhead exceeds the work. And when the body touches shared state, because you have just created a race across every core.

<a id="Q02-B0056"></a>

Why. They are data-parallelism tools for CPU-bound work over independent items. Async is the tool for I/O concurrency; they solve different problems.

<a id="Q02-B0057"></a>

Watch out. On a busy web server, parallelising inside a request often makes total throughput worse - you are stealing cores from other requests to speed up one.

<a id="Q02-B0058"></a>

### PART B - The runtime

<a id="Q02-Q012"></a>

<a id="Q02-B0059"></a>

### Q12. .NET Framework versus .NET Core versus modern .NET - in sixty seconds.

<a id="Q02-B0060"></a>

Say this. The Framework is Windows-only, installed machine-wide, and one version is shared by everything on the box. .NET Core was the cross-platform rewrite - side-by-side versioning, deployed with the app, much faster, open source. From .NET 5 they dropped "Core" and it is just .NET, one unified platform. The Framework now gets security fixes only, so all new work goes to modern .NET.

<a id="Q02-B0061"></a>

Why. The split existed because the Framework was tied to Windows and to a single global install, which made both cross-platform support and independent versioning impossible without a rewrite.

<a id="Q02-B0062"></a>

Watch out. The migration question follows immediately. The honest answer: anything tied to Windows-only APIs, Web Forms, WCF hosting, App Domains or the GAC needs a replacement rather than a recompile. You have lived this at Casepoint - say so.

<a id="Q02-Q013"></a>

<a id="Q02-B0063"></a>

### Q13. What are the CLR, the runtime, the SDK and the BCL?

<a id="Q02-B0064"></a>

Say this. The CLR is the execution engine - JIT, garbage collector, type loader. CoreCLR is its cross-platform implementation. The runtime is the CLR plus the base libraries needed to run an app. The SDK is the runtime plus the compilers and tooling needed to build one. The BCL is the standard library.

<a id="Q02-B0065"></a>

Why. The practical consequence: a server needs only the runtime; a build machine needs the SDK. Knowing which is which is the difference between a 30 MB and a 200 MB container image.

<a id="Q02-Q014"></a>

<a id="Q02-B0066"></a>

### Q14. What are JIT, tiered compilation, ReadyToRun and AOT?

<a id="Q02-B0067"></a>

Say this. IL is compiled to machine code at runtime by the JIT. Tiered compilation compiles quickly and badly first, then recompiles hot methods with full optimisation. ReadyToRun pre-compiles ahead of time but keeps the JIT available. Native AOT compiles everything ahead of time and removes the JIT entirely.

<a id="Q02-B0068"></a>

Why. Tiering exists because startup and steady-state want opposite things: fast compilation versus fast code. Tiering gets both by changing its mind once it knows what is hot.

<a id="Q02-B0069"></a>

Instead of. AOT gives near-instant startup and a small binary, at the cost of no reflection-heavy code and no runtime code generation. Good for CLI tools and serverless; awkward for a reflection-heavy web app.

<a id="Q02-Q015"></a>

<a id="Q02-B0070"></a>

### Q15. Why is a gen 0 collection cheap and a gen 2 collection expensive?

<a id="Q02-B0071"></a>

Say this. Gen 0 is a small region of recently allocated objects, and the generational hypothesis says most of them are already dead. So the collector walks only the few survivors and promotes them - work proportional to survivors, not to allocations. Gen 2 holds everything long-lived, so collecting it means examining the whole heap.

<a id="Q02-B0072"></a>

Why. The hypothesis is empirically true for almost all programs, which is why generational collection is essentially universal.

<a id="Q02-B0073"></a>

Watch out. The lesson is that GC tuning is rarely the fix - allocation rate is. Reduce allocations with pooling, `Span<T>` or streaming, and the GC problem disappears.

<a id="Q02-Q016"></a>

<a id="Q02-B0074"></a>

### Q16. What is the large object heap and why does it matter?

<a id="Q02-B0075"></a>

Say this. Objects over roughly 85 kilobytes go on a separate heap that is collected with gen 2 and, by default, is not compacted. So it fragments: you can have plenty of free space in total and still fail to allocate, because no single gap is large enough.

<a id="Q02-B0076"></a>

Why. Compacting large objects means copying large amounts of memory, which was judged too expensive to do by default. You can opt in for a one-off compaction.

<a id="Q02-B0077"></a>

Watch out. The usual culprit is large arrays or buffers - reading a whole file into a byte array, or a `List<T>` that grew past the threshold. `ArrayPool<T>` and streaming are the fixes.

<a id="Q02-B0078"></a>

### PART C - ASP.NET Core

<a id="Q02-Q017"></a>

<a id="Q02-B0079"></a>

### Q17. Trace a request from Kestrel to your controller and back.

<a id="Q02-B0080"></a>

Say this. Kestrel accepts the TCP connection and parses the HTTP request into an `HttpContext`. That context flows through the middleware pipeline in registration order - exception handling, HTTPS redirection, static files, routing, authentication, authorisation, then endpoint routing selects your action. Model binding maps the request to parameters, validation runs, your action executes, the result is formatted, and the response unwinds back out through the same middleware in reverse.

<a id="Q02-B0081"></a>

Why. Each middleware is a function that gets the context and a delegate for "the next one". Calling next goes deeper; returning comes back out. That is why the pipeline is a nested chain and not a list.

<a id="Q02-B0082"></a>

Watch out. The "and back out in reverse" half is what proves you understand it. Most candidates describe only the inbound journey.

<a id="Q02-Q018"></a>

<a id="Q02-B0083"></a>

### Q18. Why does middleware order matter, and what happens if you get it wrong?

<a id="Q02-B0084"></a>

Say this. Because each one can short-circuit or modify what the rest see. Authentication must come before authorisation, or there is no identity to authorise. Exception handling must be first or it cannot catch what happens later. Static files before routing avoids the routing cost for assets. Put CORS after routing and preflight requests fail.


> Study correction: With endpoint routing, UseCors belongs after UseRouting and before authorization; saying that after routing inherently breaks CORS is incorrect. [Official reference](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0)

<a id="Q02-B0085"></a>

Why. The pipeline is built by nesting delegates at startup, so ordering is fixed at that point - it is structural, not configurable per request.

<a id="Q02-B0086"></a>

Watch out. A good concrete answer: authorisation before authentication silently rejects every authenticated user, because the identity has not been populated yet.

<a id="Q02-Q019"></a>

<a id="Q02-B0087"></a>

### Q19. Explain the DI lifetimes and the captive dependency problem.

<a id="Q02-B0088"></a>

Say this. Singleton is one instance for the whole application. Scoped is one per request. Transient is a new one every time it is resolved. The captive dependency problem is injecting a shorter-lived service into a longer-lived one - typically a scoped `DbContext` into a singleton. The singleton captures it, so it outlives its scope and is shared across requests.

<a id="Q02-B0089"></a>

Why. A `DbContext` is not thread-safe and holds per-request change tracking state. Sharing one across concurrent requests gives you concurrency exceptions and data from other users' requests.

<a id="Q02-B0090"></a>

Instead of. Inject `IServiceScopeFactory` into the singleton and create a scope per unit of work. This is exactly what a `BackgroundService` must do.

<a id="Q02-B0091"></a>

Watch out. .NET throws on this at startup when scope validation is on, which it is by default in development. If you have ever seen "Cannot consume scoped service from singleton", that was this.

<a id="Q02-Q020"></a>

<a id="Q02-B0092"></a>

### Q20. How does configuration precedence work?

<a id="Q02-B0093"></a>

Say this. Providers are added in order and later ones override earlier ones. The default order is `appsettings.json`, then `appsettings.{Environment}.json`, then user secrets in development, then environment variables, then command-line arguments. Last one wins.

<a id="Q02-B0094"></a>

Why. It is a layered dictionary, flattened with colon-separated keys. That is why an environment variable named `Logging__LogLevel__Default` overrides the nested JSON value - double underscore maps to the colon separator.

<a id="Q02-B0095"></a>

Watch out. This is how you configure containers without rebuilding images, and it is a very common practical question.

<a id="Q02-Q021"></a>

<a id="Q02-B0096"></a>

### Q21. Why use IOptions rather than reading IConfiguration directly?

<a id="Q02-B0097"></a>

Say this. It gives you a strongly typed object, validated once at startup rather than on every read, and it decouples your class from the configuration system so it can be unit tested with a plain object.

<a id="Q02-B0098"></a>

Why. `IOptions<T>` is bound once and cached as a singleton. `IOptionsSnapshot<T>` re-reads per scope, and `IOptionsMonitor<T>` supports change notifications for genuinely dynamic settings.

<a id="Q02-B0099"></a>

Watch out. Choosing between the three is a good follow-up. If a setting must be changeable without a restart, you need the monitor.

<a id="Q02-B0100"></a>

### PART D - Web API, security and EF Core

<a id="Q02-Q022"></a>

<a id="Q02-B0101"></a>

### Q22. Which HTTP methods are idempotent, and why does it matter?

<a id="Q02-B0102"></a>

Say this. GET, PUT, DELETE, HEAD and OPTIONS are idempotent - repeating them has the same effect as doing them once. POST and PATCH are not. It matters because clients, proxies and message queues retry, so a non-idempotent operation can happen twice on a flaky network.

<a id="Q02-B0103"></a>

Why. Idempotency is a property of the effect, not of the response. `DELETE` twice returns 404 the second time but the resource is still gone - the effect is unchanged, so it qualifies.

<a id="Q02-B0104"></a>

Watch out. This leads straight to idempotency keys. If a payment POST can be retried, you must store a client-supplied key and return the first result on a repeat - which is exactly what you built in your job platform.

<a id="Q02-Q023"></a>

<a id="Q02-B0105"></a>

### Q23. What is inside a JWT, and what is the difference between signing and encryption?

<a id="Q02-B0106"></a>

Say this. Three base64url parts separated by dots: a header naming the algorithm, a payload of claims, and a signature over the first two. Signing proves it was not tampered with and came from the issuer. It does not hide anything - the payload is readable by anyone.

<a id="Q02-B0107"></a>

Why. A signature is a hash of the content combined with a secret or a private key. Anyone with the public key can verify it; only the holder of the private key can produce it.

<a id="Q02-B0108"></a>

Watch out. Never put anything secret in a JWT. Candidates who say "it is encrypted" fail this question instantly. Paste one into jwt.io once and you will never forget.

<a id="Q02-Q024"></a>

<a id="Q02-B0109"></a>

### Q24. Why can a JWT not be revoked, and what are the three ways teams work around it?

<a id="Q02-B0110"></a>

Say this. Because validation is purely local - the server checks the signature and the expiry and needs no database call. That statelessness is the entire benefit, and it means there is nothing to delete. Workarounds: keep access tokens very short-lived and use refresh tokens; maintain a denylist of revoked token IDs, which reintroduces state; or bump a per-user token version claim and reject older versions.

<a id="Q02-B0111"></a>

Why. Every workaround trades away some statelessness. That trade is the real answer, and naming it is what distinguishes a considered answer from a memorised one.

<a id="Q02-B0112"></a>

Watch out. "Log out" on a JWT system usually just deletes the token client-side. The token remains valid until it expires - a genuine security consideration worth raising.

<a id="Q02-Q025"></a>

<a id="Q02-B0113"></a>

### Q25. How does the EF Core change tracker know what to update?

<a id="Q02-B0114"></a>

Say this. When a tracked entity is loaded, EF stores a snapshot of its original values. `SaveChanges` compares current values to the snapshot, works out which properties changed, and generates UPDATE statements touching only those columns.

<a id="Q02-B0115"></a>

Why. That snapshot is why tracking costs memory and time proportional to what you loaded, and why `AsNoTracking` is meaningfully faster for read-only queries - there is no snapshot to take and no comparison to make.

<a id="Q02-B0116"></a>

Instead of. For read-only queries always `AsNoTracking`, or better, project to a DTO so you never materialise entities at all.

<a id="Q02-Q026"></a>

<a id="Q02-B0117"></a>

### Q26. What is the N+1 problem, how do you find it, and how do you fix it?

<a id="Q02-B0118"></a>

Say this. You load a list of N parents, then touch a navigation property inside a loop, so you issue one extra query per parent - N+1 in total. You find it by logging the generated SQL; you cannot see it by reading the C#. You fix it with `Include`, or better, by projecting to a DTO so only one query with a join runs.

<a id="Q02-B0119"></a>

Why. It happens because lazy loading makes a database round trip look like a property access. The cost is invisible at the call site, which is exactly why it survives code review.

<a id="Q02-B0120"></a>

Watch out. `Include` on multiple collections causes cartesian explosion - use `AsSplitQuery` or separate queries. Knowing the fix has its own trap is the senior signal here.

<a id="Q02-Q027"></a>

<a id="Q02-B0121"></a>

### Q27. Compare cache-aside, write-through and write-behind.

<a id="Q02-B0122"></a>

Say this. Cache-aside: read the cache, on a miss load from the database and populate. Simple, and the default. Write-through: write to cache and database together, so they stay consistent at the cost of write latency. Write-behind: write to cache and flush to the database later - fastest writes, but you can lose data if the cache dies.

<a id="Q02-B0123"></a>

Why. They differ only in who writes and when. The hard part is never the strategy, it is invalidation and stampedes.

<a id="Q02-B0124"></a>

Watch out. Cache-aside plus a short TTL covers most real systems. Reach for write-through only when a stale read is genuinely unacceptable.

<a id="Q02-Q028"></a>

<a id="Q02-B0125"></a>

### Q28. What is a cache stampede and how do you prevent it?

<a id="Q02-B0126"></a>

Say this. A hot key expires, and every concurrent request misses simultaneously and hits the database at once - which can take the database down at exactly the moment traffic is highest. Three fixes: a short lock so only one caller refreshes; jittered or staggered expiry so keys do not expire together; or serve the stale value while one caller refreshes in the background.

<a id="Q02-B0127"></a>

Why. The problem is synchronised expiry. Any fix works by de-synchronising it or by serialising the refill.

<a id="Q02-B0128"></a>

Watch out. Also called the thundering herd. Mentioning that the same phrase applies to retry storms without jitter connects two topics well.

<a id="Q02-Q029"></a>

<a id="Q02-B0129"></a>

### Q29. When would you use a BackgroundService, and what is the catch?

<a id="Q02-B0130"></a>

Say this. For work that must run independently of a request - queue consumers, scheduled jobs, cleanup. The catch is dependency injection: a `BackgroundService` is a singleton, so it cannot inject a scoped `DbContext`. You must inject `IServiceScopeFactory` and create a scope per unit of work.

<a id="Q02-B0131"></a>

Why. It is registered as a hosted service and started with the host, so its lifetime is the application's - which is precisely why the scoped-service rule bites here.

<a id="Q02-B0132"></a>

Watch out. Second catch: an unhandled exception in a `BackgroundService` can stop the host by default. Wrap the loop body in try/catch or you lose the whole process to one bad message.

<a id="Q02-B0133"></a>

### PART E - SQL and database internals (highest immediate job value)

<a id="Q02-Q030"></a>

<a id="Q02-B0134"></a>

### Q30. How does a database physically store data?

<a id="Q02-B0135"></a>

Say this. In fixed-size pages, typically 8 kilobytes. A table with no clustered index is a heap - unordered pages. With a clustered index, the table is the index: the rows are stored in key order in the leaf level of a B-tree. A non-clustered index is a separate B-tree holding the key plus a pointer back to the row.

<a id="Q02-B0136"></a>

Why. Everything about index behaviour follows from this. A clustered index defines physical order, so you get one; non-clustered indexes are extra sorted copies of a subset of columns, which is why they cost storage and slow writes.

<a id="Q02-Q031"></a>

<a id="Q02-B0137"></a>

### Q31. Why does an index make reads faster and writes slower?

<a id="Q02-B0138"></a>

Say this. Reads get an ordered structure, so the engine can seek in O(log n) page reads instead of scanning every page. Writes have to update every index as well as the table, and an insert in the middle of a sorted structure can cause a page split - allocating a new page and moving half the rows.

<a id="Q02-B0139"></a>

Why. It is the classic space-and-write cost for read speed. Five indexes means every insert does six writes.

<a id="Q02-B0140"></a>

Watch out. Page splits also cause fragmentation, which then slows the reads the index was meant to speed up. That is why fill factor and index maintenance exist.

<a id="Q02-Q032"></a>

<a id="Q02-B0141"></a>

### Q32. What is a covering index?

<a id="Q02-B0142"></a>

Say this. An index that contains every column the query needs, so the engine answers entirely from the index and never touches the table. You achieve it by adding non-key columns as included columns.

<a id="Q02-B0143"></a>

Why. Without it, each matching row costs an extra lookup back into the table - a key lookup. For a query returning thousands of rows, eliminating those lookups is often a ten-times improvement.

<a id="Q02-B0144"></a>

Watch out. This is one of the highest-value practical SQL techniques and it applies directly to your eDiscovery query work. Have a real before-and-after from your job if you can.

<a id="Q02-Q033"></a>

<a id="Q02-B0145"></a>

### Q33. Seek, scan, or lookup - what is the difference in a plan?

<a id="Q02-B0146"></a>

Say this. A seek navigates the B-tree directly to the rows it needs - what you want. A scan reads every page. A lookup is the extra hop from a non-clustered index back to the table for columns the index did not cover.

<a id="Q02-B0147"></a>

Why. A scan is not automatically bad: if the query returns most of the table, reading it sequentially is genuinely cheaper than thousands of random seeks. The optimiser chooses based on estimated row counts.

<a id="Q02-B0148"></a>

Watch out. "A scan means something is wrong" is the wrong answer. "A scan on a large table with a selective predicate means something is wrong" is the right one.

<a id="Q02-Q034"></a>

<a id="Q02-B0149"></a>

### Q34. What is SARGability, and why can WHERE YEAR(created) = 2026 not use an index?

<a id="Q02-B0150"></a>

Say this. A predicate is SARGable if the engine can use it to seek. Wrapping the column in a function destroys that, because the index stores `created`, not `YEAR(created)` - so the engine must compute the function for every row and therefore scan. Rewrite it as a range: `created >= '2026-01-01' AND created < '2027-01-01'`.

<a id="Q02-B0151"></a>

Why. An index is a sorted structure over the raw column values. Any transformation of the column breaks the ordering the seek depends on.

<a id="Q02-B0152"></a>

Watch out. The same applies to a leading wildcard - `LIKE '%term'` cannot seek, while `LIKE 'term%'` can. Also to implicit conversions caused by a parameter of the wrong type, which is a very common invisible cause.

<a id="Q02-Q035"></a>

<a id="Q02-B0153"></a>

### Q35. Why does the optimiser pick a hash join over nested loops?

<a id="Q02-B0154"></a>

Say this. Nested loops is best when one input is small and the other has an index on the join key - it seeks once per outer row. Hash join is best for two large unindexed inputs: it builds a hash table from the smaller side and probes it with the larger, which is one pass over each. Merge join needs both inputs already sorted on the key, and is then very cheap.

<a id="Q02-B0155"></a>

Why. The choice is driven by estimated cardinality. That is why stale statistics cause bad plans - the optimiser picks nested loops for what it thinks is 10 rows and actually gets a million.

<a id="Q02-B0156"></a>

Watch out. "The plan changed and the query got slow" is almost always statistics or parameter sniffing. Naming both is a strong answer.

<a id="Q02-Q036"></a>

<a id="Q02-B0157"></a>

### Q36. What is the logical execution order of a SQL statement?

<a id="Q02-B0158"></a>

Say this. FROM and JOIN, then WHERE, then GROUP BY, then HAVING, then SELECT, then DISTINCT, then ORDER BY, then LIMIT or TOP.

<a id="Q02-B0159"></a>

Why. This explains two things people get wrong constantly: you cannot use a SELECT alias in a WHERE clause, because SELECT has not happened yet; and WHERE filters rows before grouping while HAVING filters groups after.

<a id="Q02-B0160"></a>

Watch out. Filter in WHERE rather than HAVING whenever you can - it reduces the rows before the aggregation instead of after.

<a id="Q02-Q037"></a>

<a id="Q02-B0161"></a>

### Q37. State the four ACID properties.

<a id="Q02-B0162"></a>

Say this. Atomicity - all or nothing. Consistency - the transaction moves the database from one valid state to another, respecting constraints. Isolation - concurrent transactions do not see each other's intermediate state. Durability - once committed, it survives a crash.

<a id="Q02-B0163"></a>

Why. Durability comes from write-ahead logging: the log is flushed to disk before the commit returns, so recovery can replay it. Atomicity comes from the same log, played backwards.

<a id="Q02-B0164"></a>

Watch out. Isolation is the one with levels and the one worth real depth - the next question.

<a id="Q02-Q038"></a>

<a id="Q02-B0165"></a>

### Q38. Write the isolation level to anomaly table.

<a id="Q02-B0166"></a>

Say this. Read Uncommitted allows dirty reads, non-repeatable reads and phantoms. Read Committed prevents dirty reads. Repeatable Read also prevents non-repeatable reads. Serializable prevents all three, by taking range locks. Snapshot gives a consistent point-in-time view without blocking readers, but permits write skew.

<a id="Q02-B0167"></a>

Why. Each level up takes more or longer-held locks, so it costs concurrency. You are explicitly buying correctness with throughput, and the right level depends on the workload rather than on a global preference.

<a id="Q02-B0168"></a>

Watch out. Know the definitions precisely. Dirty read - uncommitted data. Non-repeatable read - the same row read twice gives different values. Phantom - the same range query returns different rows.

<a id="Q02-Q039"></a>

<a id="Q02-B0169"></a>

### Q39. What is write skew, and why does snapshot isolation permit it?

<a id="Q02-B0170"></a>

Say this. Two transactions each read a set of rows, each decides its change is fine based on what it read, and both commit - producing a state neither would have allowed. The classic case is two doctors both dropping off on-call because each sees the other still on.

<a id="Q02-B0171"></a>

Why. Snapshot isolation guarantees each transaction sees a consistent snapshot and detects write-write conflicts. But these two wrote different rows, so there is no conflict to detect - the conflict is on a condition, not a row.

<a id="Q02-B0172"></a>

Instead of. Serializable, or an explicit lock on the thing the condition depends on. This is a strong Month 7 topic and a genuine differentiator.

<a id="Q02-Q040"></a>

<a id="Q02-B0173"></a>

### Q40. MVCC in PostgreSQL versus locking in SQL Server - what is the practical difference?

<a id="Q02-B0174"></a>

Say this. PostgreSQL keeps multiple row versions, so a reader never blocks a writer and a writer never blocks a reader - readers see the version valid at their snapshot. SQL Server by default uses shared locks for reads, so readers can block writers, unless you enable snapshot isolation or read committed snapshot.

<a id="Q02-B0175"></a>

Why. MVCC trades storage and cleanup work for concurrency: old versions accumulate and must be vacuumed. Locking trades concurrency for simplicity and no cleanup.

<a id="Q02-B0176"></a>

Watch out. This is why `WITH (NOLOCK)` is so widespread in SQL Server codebases - people reaching for read uncommitted to avoid blocking, and accepting dirty reads without realising it. Snapshot isolation is the correct fix.

<a id="Q02-Q041"></a>

<a id="Q02-B0177"></a>

### Q41. What causes a SQL deadlock, and what is lock escalation?

<a id="Q02-B0178"></a>

Say this. A deadlock is two transactions each holding a lock the other needs - usually because they touched the same rows in a different order. The engine detects the cycle and kills one as the victim. Lock escalation is the engine converting many row locks into a single table lock to save memory, which suddenly blocks everyone.

<a id="Q02-B0179"></a>

Why. The fix for deadlocks is consistent access order, the same principle as lock ordering in application code. The fix for escalation is smaller batches.

<a id="Q02-B0180"></a>

Watch out. A large UPDATE or DELETE in one statement is the classic escalation trigger. Batching it into chunks of a few thousand rows is the standard remedy - and a genuinely useful thing to know at Casepoint scale.

<a id="Q02-Q042"></a>

<a id="Q02-B0181"></a>

### Q42. When would you denormalise on purpose?

<a id="Q02-B0182"></a>

Say this. When a read path is hot and the join cost is measured, not guessed. Storing a computed count or a copy of a parent name avoids a join on every read. You accept that the copy can drift and you take responsibility for keeping it correct.

<a id="Q02-B0183"></a>

Why. Normalisation optimises for write correctness - one fact in one place. Denormalisation optimises for read speed by duplicating. Both are right; they answer different questions.

<a id="Q02-B0184"></a>

Watch out. Always state the cost: now there are two sources of truth and something must keep them in sync. Denormalising without saying that reads as not understanding the trade.

<a id="Q02-Q043"></a>

<a id="Q02-B0185"></a>

### Q43. Why does connection pooling matter?

<a id="Q02-B0186"></a>

Say this. Opening a database connection is expensive - a TCP handshake, authentication, session setup. The pool keeps them open and hands them out, so a request pays almost nothing. It also caps total connections, which protects the database from being overwhelmed.

<a id="Q02-B0187"></a>

Why. That cap is why pool exhaustion is a real production failure: if code holds connections too long - a long transaction, or a leaked `DbContext` - requests queue waiting for one, and you see timeouts that look like database slowness but are not.

<a id="Q02-B0188"></a>

Watch out. "Timeout expired. The timeout period elapsed prior to obtaining a connection from the pool" is this exact error, and it usually means a leak, not a slow database.

<a id="Q02-B0189"></a>

### PART F - The Month 2 self-test

<a id="Q02-B0190"></a>

Cover the answers. Anything you cannot say goes in the WEAK tab.

<a id="Q02-B0191"></a>

| # | Say it out loud, no notes |
| --- | --- |
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


> Study correction: A self-contained token has no automatic central revocation lookup; applications can add deny lists, token/session versions, introspection or short expiry with refresh controls. State your actual design. [Official reference](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

<a id="Q02-B0192"></a>

Part E is the one to over-invest in. SQL depth is the only topic in these eight files that pays you back at work the same week you learn it - and your day job at Casepoint involves query optimisation, so every hour here has two returns.


> SQL correction: isolation behavior is engine-specific. PostgreSQL treats Read Uncommitted as Read Committed; Repeatable Read prevents phantom reads but can still allow serialization anomalies. [PostgreSQL documentation](https://www.postgresql.org/docs/current/transaction-iso.html).

> ASP.NET Core correction: with endpoint routing, UseCors belongs after UseRouting and before authorization. [Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0).

> Runtime correction: ThreadPool worker adjustment is not a universal fixed number of threads per second. [Microsoft diagnostic guide](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/debug-threadpool-starvation).
