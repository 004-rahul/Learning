# .NET runtime, concurrency, ASP.NET Core, Web API, EF Core, caching

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 2 Q&A parts A–D (M2) in full. Weeks 6–8 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART A - Concurrency
- PART B - The runtime
- PART C - ASP.NET Core
- PART D - Web API, security and EF Core
- ➕ The ASP.NET Core middleware order for .NET 10, as code
- ➕ Dependency injection: lifetimes, validation, keyed services and disposal
- ➕ Configuration, the options pattern and secrets
- ➕ A complete minimal API: a small job service
- ➕ HttpClient, IHttpClientFactory and resilience
- ➕ BackgroundService: scopes, shutdown, errors and a queue consumer
- ➕ Practical EF Core
- ➕ Caching in ASP.NET Core: the APIs
- ➕ Rate limiting: the built-in middleware and its limits
- ➕ Authentication and authorization: JWT, policies and tenant ownership
- ➕ SignalR, interview-ready

---

<a id="m2-part-a"></a>

## PART A - Concurrency

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m2-q1"></a>

#### Q1. What is the difference between a process, a thread and a Task?
Say this. A process is an isolated address space with its own memory. A thread is a unit of execution inside a process, sharing its memory. A `Task` is not a thread at all - it is a promise of a future result, which may be executed on a pool thread, or on no thread if it is waiting for I/O.
Why. Conflating Task with thread is the root of most bad async code. A thousand tasks awaiting I/O consume almost no threads; a thousand threads consume a thousand stacks, each around a megabyte of reserved address space.
Watch out. "A Task is a promise, not a thread" is the sentence to say. It leads naturally into the thread pool question, which is usually next.
<a id="m2-q2"></a>

#### Q2. What does the thread pool actually do, and what is starvation?
Say this. It keeps a set of reusable threads with a work queue per thread, and it steals work between queues to stay balanced. It grows only slowly - on the order of one or two threads per second - because rapid growth causes thrashing. Starvation is when work blocks threads faster than the pool injects new ones, so everything queues behind the blocked threads.
Why. The pool is optimised for short, non-blocking work items. Blocking holds a thread doing nothing at all, and the deliberately conservative injection rate then becomes the bottleneck.
Watch out. The signature in production is rising latency with low CPU. If CPU were high it would be a different problem entirely. Saying that distinction is the answer that lands.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Same as M1 Q38: injection speed above the minimum is runtime-dependent. Also, besides per-thread local queues (LIFO, with work stealing) there is a global FIFO queue used for work queued from outside the pool.

<a id="m2-q3"></a>

#### Q3. Why is creating a thousand threads worse than a thousand tasks?
Say this. Each thread reserves around a megabyte of stack, needs a kernel object, and adds to the scheduler's work. With more threads than cores the CPU spends its time context switching rather than computing. A thousand tasks awaiting I/O may occupy no threads at all.
Why. Threads are an OS resource; tasks are a scheduling abstraction. You want roughly as many runnable threads as you have cores, and as many in-flight operations as your I/O can sustain - those are different numbers.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Thread stack size is platform-dependent and *reserved*, not committed: about 1 MB on Windows, ~1.5 MB for .NET secondary threads on Linux (the main thread follows `ulimit -s`, often 8 MB).

<a id="m2-q4"></a>

#### Q4. What is a race condition, at the CPU and memory-model level?
Say this. Two threads access shared state without ordering, and the result depends on timing. It is not only about interleaved statements: a read-modify-write like `count++` is three operations, and separately each core has its own cache, so a write by one thread may not be visible to another without a memory barrier.
Why. The CPU and the compiler are both allowed to reorder operations as long as single-threaded behaviour is preserved. Locks and `Interlocked` insert barriers that forbid the reordering across them, which is what makes the code correct.
Watch out. Saying "increment is not atomic" is a good answer. Adding "and separately, visibility needs a barrier" is a much better one - most candidates only know the first half.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] CPU caches are kept coherent by hardware (MESI). Visibility and ordering bugs come from store buffers, out-of-order execution (ARM is weaker than x86) and compiler/JIT optimisations such as hoisting a read into a register. The conclusion is unchanged: use locks, `Interlocked` or `Volatile`.

<a id="m2-q5"></a>

#### Q5. lock, Interlocked, or a concurrent collection?
Say this. `Interlocked` for a single primitive operation - increment, exchange, compare-and-swap - because it is a single CPU instruction with no blocking. `lock` when you need several operations to be atomic together. A concurrent collection when the shared state *is* a collection, because it is designed for it and usually uses fine-grained locking or lock-free techniques internally.
Why. `lock` compiles to `Monitor.Enter`/`Exit` in a try/finally. It is cheap when uncontended and expensive when contended, because it escalates to a kernel wait.
Instead of. Do not reach for `lock` first. The cheapest correct thing wins, and for a counter that is `Interlocked.Increment`.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Add: .NET 9 introduced `System.Threading.Lock`; in C# 13 `lock (myLock)` on a `Lock` instance uses `EnterScope()` and is faster than locking on an `object`.

<a id="m2-q6"></a>

#### Q6. Why does volatile rarely mean what people think?
Say this. It prevents certain compiler and CPU reorderings around that one field, and forces a read from memory rather than a register. It does not make an operation atomic - `volatile int x; x++` is still a race - and it does not synchronise anything else.
Why. It is a barrier annotation, not a lock. People reach for it hoping for atomicity and get only visibility, so the bug survives and becomes harder to reproduce.
Instead of. `Interlocked` for atomicity, `lock` for grouped invariants. Reach for `volatile` almost never - if you think you need it, you probably need one of the other two.
<a id="m2-q7"></a>

#### Q7. What causes a deadlock and how do you prevent one?
Say this. Four conditions must all hold: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break any one and the deadlock is impossible. The practical fix is to break circular wait by imposing a global lock ordering - always acquire A before B, everywhere.
Why. Lock ordering works because a cycle requires at least one thread to acquire out of order. If no code path can, no cycle can form.
Instead of. A lock timeout is a detection mechanism, not a prevention. It turns a hang into an intermittent failure, which is often worse to diagnose.
<a id="m2-q8"></a>

#### Q8. Why can you not await inside a lock?
Say this. A `lock` is thread-affine - the same thread that entered must exit. An `await` can resume on a different thread, which would try to release a lock it never took. The compiler forbids it outright.
Why. Beyond the mechanics, holding a lock across an await means holding it for the duration of an I/O operation, which destroys throughput even if it worked.
Instead of. `SemaphoreSlim` with `WaitAsync`. It is not thread-affine, so it is safe across an await. Remember to release it in a `finally`.
<a id="m2-q9"></a>

#### Q9. SemaphoreSlim, Mutex or ReaderWriterLockSlim?
Say this. `SemaphoreSlim` to limit concurrency to N, and it is the only one with an async wait. `Mutex` when you need mutual exclusion across processes, because it is a named OS object. `ReaderWriterLockSlim` when reads massively outnumber writes and readers can safely run in parallel.
Why. A semaphore counts permits; a mutex is a semaphore of one with ownership tracking; a reader-writer lock trades extra bookkeeping for parallel reads.
Watch out. `ReaderWriterLockSlim` only pays off when reads dominate heavily and the critical section is long. For short sections a plain lock is usually faster because it has less overhead.
<a id="m2-q10"></a>

#### Q10. When would you use Channel<T> rather than BlockingCollection?
Say this. `Channel<T>` for async producer-consumer - it is built for `await`, supports bounded capacity with backpressure, and never blocks a thread. `BlockingCollection` is the older synchronous equivalent and blocks a thread while waiting.
Why. On a server, blocking a pool thread to wait for a queue item is exactly the starvation problem from Q2. A channel lets the consumer await, so the thread is released.
Instead of. `BlockingCollection` is still fine in a console tool or a dedicated background thread where blocking costs nothing.
<a id="m2-q11"></a>

#### Q11. When do Parallel.For and PLINQ hurt rather than help?
Say this. When the work is I/O-bound, because you are occupying threads to wait. When the per-item work is tiny, because the partitioning and coordination overhead exceeds the work. And when the body touches shared state, because you have just created a race across every core.
Why. They are data-parallelism tools for CPU-bound work over independent items. Async is the tool for I/O concurrency; they solve different problems.
Watch out. On a busy web server, parallelising inside a request often makes total throughput worse - you are stealing cores from other requests to speed up one.

<a id="m2-part-b"></a>

## PART B - The runtime

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m2-q12"></a>

#### Q12. .NET Framework versus .NET Core versus modern .NET - in sixty seconds.
Say this. The Framework is Windows-only, installed machine-wide, and one version is shared by everything on the box. .NET Core was the cross-platform rewrite - side-by-side versioning, deployed with the app, much faster, open source. From .NET 5 they dropped "Core" and it is just .NET, one unified platform. The Framework now gets security fixes only, so all new work goes to modern .NET.
Why. The split existed because the Framework was tied to Windows and to a single global install, which made both cross-platform support and independent versioning impossible without a rewrite.
Watch out. The migration question follows immediately. The honest answer: anything tied to Windows-only APIs, Web Forms, WCF hosting, App Domains or the GAC needs a replacement rather than a recompile. You have lived this at Casepoint - say so.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Current versions (Oct 2026): .NET 10 is the LTS (C# 14). .NET 8 *and* .NET 9 both reach end of support on 10 Nov 2026 (STS support was extended to 24 months). .NET 11 is due Nov 2026. Use .NET 10 for the project. For WCF migrations, CoreWCF exists as a path.

<a id="m2-q13"></a>

#### Q13. What are the CLR, the runtime, the SDK and the BCL?
Say this. The CLR is the execution engine - JIT, garbage collector, type loader. CoreCLR is its cross-platform implementation. The runtime is the CLR plus the base libraries needed to run an app. The SDK is the runtime plus the compilers and tooling needed to build one. The BCL is the standard library.
Why. The practical consequence: a server needs only the runtime; a build machine needs the SDK. Knowing which is which is the difference between a 30 MB and a 200 MB container image.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Image sizes: the ASP.NET runtime image is roughly 100–220 MB depending on base (Alpine/chiseled vs Debian); the SDK image is roughly 700–900 MB. ~30 MB images need `runtime-deps` plus self-contained trimming or Native AOT.

<a id="m2-q14"></a>

#### Q14. What are JIT, tiered compilation, ReadyToRun and AOT?
Say this. IL is compiled to machine code at runtime by the JIT. Tiered compilation compiles quickly and badly first, then recompiles hot methods with full optimisation. ReadyToRun pre-compiles ahead of time but keeps the JIT available. Native AOT compiles everything ahead of time and removes the JIT entirely.
Why. Tiering exists because startup and steady-state want opposite things: fast compilation versus fast code. Tiering gets both by changing its mind once it knows what is hot.
Instead of. AOT gives near-instant startup and a small binary, at the cost of no reflection-heavy code and no runtime code generation. Good for CLI tools and serverless; awkward for a reflection-heavy web app.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Since .NET 8, ASP.NET Core minimal APIs and gRPC support Native AOT (via source generators); MVC controllers do not. For tiering, also name Dynamic PGO (on by default since .NET 8) and on-stack replacement (OSR).

<a id="m2-q15"></a>

#### Q15. Why is a gen 0 collection cheap and a gen 2 collection expensive?
Say this. Gen 0 is a small region of recently allocated objects, and the generational hypothesis says most of them are already dead. So the collector walks only the few survivors and promotes them - work proportional to survivors, not to allocations. Gen 2 holds everything long-lived, so collecting it means examining the whole heap.
Why. The hypothesis is empirically true for almost all programs, which is why generational collection is essentially universal.
Watch out. The lesson is that GC tuning is rarely the fix - allocation rate is. Reduce allocations with pooling, `Span<T>` or streaming, and the GC problem disappears.
<a id="m2-q16"></a>

#### Q16. What is the large object heap and why does it matter?
Say this. Objects over roughly 85 kilobytes go on a separate heap that is collected with gen 2 and, by default, is not compacted. So it fragments: you can have plenty of free space in total and still fail to allocate, because no single gap is large enough.
Why. Compacting large objects means copying large amounts of memory, which was judged too expensive to do by default. You can opt in for a one-off compaction.
Watch out. The usual culprit is large arrays or buffers - reading a whole file into a byte array, or a `List<T>` that grew past the threshold. `ArrayPool<T>` and streaming are the fixes.

<a id="m2-part-c"></a>

## PART C - ASP.NET Core

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m2-q17"></a>

#### Q17. Trace a request from Kestrel to your controller and back.
Say this. Kestrel accepts the TCP connection and parses the HTTP request into an `HttpContext`. That context flows through the middleware pipeline in registration order - exception handling, HTTPS redirection, static files, routing, authentication, authorisation, then endpoint routing selects your action. Model binding maps the request to parameters, validation runs, your action executes, the result is formatted, and the response unwinds back out through the same middleware in reverse.
Why. Each middleware is a function that gets the context and a delegate for "the next one". Calling next goes deeper; returning comes back out. That is why the pipeline is a nested chain and not a list.
Watch out. The "and back out in reverse" half is what proves you understand it. Most candidates describe only the inbound journey.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] The endpoint is *selected* in `UseRouting` — before authentication/authorization — so authorization can read `[Authorize]` metadata; it is *executed* by the endpoint middleware at the end. Inside MVC there is also the filter pipeline (authorization → resource → model binding → action → exception → result filters), and `[ApiController]` returns an automatic 400 for invalid models. With .NET 6+ minimal hosting, `WebApplication` adds routing/endpoints implicitly.

<a id="m2-q18"></a>

#### Q18. Why does middleware order matter, and what happens if you get it wrong?
Say this. Because each one can short-circuit or modify what the rest see. Authentication must come before authorisation, or there is no identity to authorise. Exception handling must be first or it cannot catch what happens later. Static files before routing avoids the routing cost for assets. Put CORS after routing and preflight requests fail.
Why. The pipeline is built by nesting delegates at startup, so ordering is fixed at that point - it is structural, not configurable per request.
Watch out. A good concrete answer: authorisation before authentication silently rejects every authenticated user, because the identity has not been populated yet.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] The CORS ordering claim is wrong. Correct order: `UseRouting` → `UseCors` → `UseAuthentication` → `UseAuthorization` → endpoints (and `UseCors` before `UseResponseCaching`). If CORS runs *after* authorization, the preflight OPTIONS request (which carries no credentials) is rejected with 401/403. Placed before `UseRouting`, a global policy still works but endpoint-level `[EnableCors]`/`RequireCors` metadata is not visible. Source: Microsoft Learn, 'Enable CORS in ASP.NET Core'.

<a id="m2-q19"></a>

#### Q19. Explain the DI lifetimes and the captive dependency problem.
Say this. Singleton is one instance for the whole application. Scoped is one per request. Transient is a new one every time it is resolved. The captive dependency problem is injecting a shorter-lived service into a longer-lived one - typically a scoped `DbContext` into a singleton. The singleton captures it, so it outlives its scope and is shared across requests.
Why. A `DbContext` is not thread-safe and holds per-request change tracking state. Sharing one across concurrent requests gives you concurrency exceptions and data from other users' requests.
Instead of. Inject `IServiceScopeFactory` into the singleton and create a scope per unit of work. This is exactly what a `BackgroundService` must do.
Watch out. .NET throws on this at startup when scope validation is on, which it is by default in development. If you have ever seen "Cannot consume scoped service from singleton", that was this.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] A transient injected into a singleton is also captive. For singletons/background services, `IDbContextFactory<T>` (`AddDbContextFactory`) is often cleaner than `IServiceScopeFactory`.

<a id="m2-q20"></a>

#### Q20. How does configuration precedence work?
Say this. Providers are added in order and later ones override earlier ones. The default order is `appsettings.json`, then `appsettings.{Environment}.json`, then user secrets in development, then environment variables, then command-line arguments. Last one wins.
Why. It is a layered dictionary, flattened with colon-separated keys. That is why an environment variable named `Logging__LogLevel__Default` overrides the nested JSON value - double underscore maps to the colon separator.
Watch out. This is how you configure containers without rebuilding images, and it is a very common practical question.
<a id="m2-q21"></a>

#### Q21. Why use IOptions rather than reading IConfiguration directly?
Say this. It gives you a strongly typed object, validated once at startup rather than on every read, and it decouples your class from the configuration system so it can be unit tested with a plain object.
Why. `IOptions<T>` is bound once and cached as a singleton. `IOptionsSnapshot<T>` re-reads per scope, and `IOptionsMonitor<T>` supports change notifications for genuinely dynamic settings.
Watch out. Choosing between the three is a good follow-up. If a setting must be changeable without a restart, you need the monitor.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Options are *not* validated at startup by default — validation runs lazily on the first `.Value`. Chain `.ValidateDataAnnotations().ValidateOnStart()` (.NET 6+) to fail fast. `IOptionsSnapshot` is scoped, so it cannot be injected into a singleton.


<a id="m2-part-d"></a>

## PART D - Web API, security and EF Core

*Source: Q-and-A/M2_DotNet_Runtime_ASP_and_SQL.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m2-q22"></a>

#### Q22. Which HTTP methods are idempotent, and why does it matter?
Say this. GET, PUT, DELETE, HEAD and OPTIONS are idempotent - repeating them has the same effect as doing them once. POST and PATCH are not. It matters because clients, proxies and message queues retry, so a non-idempotent operation can happen twice on a flaky network.
Why. Idempotency is a property of the effect, not of the response. `DELETE` twice returns 404 the second time but the resource is still gone - the effect is unchanged, so it qualifies.
Watch out. This leads straight to idempotency keys. If a payment POST can be retried, you must store a client-supplied key and return the first result on a repeat - which is exactly what you built in your job platform.
<a id="m2-q23"></a>

#### Q23. What is inside a JWT, and what is the difference between signing and encryption?
Say this. Three base64url parts separated by dots: a header naming the algorithm, a payload of claims, and a signature over the first two. Signing proves it was not tampered with and came from the issuer. It does not hide anything - the payload is readable by anyone.
Why. A signature is a hash of the content combined with a secret or a private key. Anyone with the public key can verify it; only the holder of the private key can produce it.
Watch out. Never put anything secret in a JWT. Candidates who say "it is encrypted" fail this question instantly. Paste one into jwt.io once and you will never forget.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Anyone with the public key can verify, only the private-key holder can produce' is true for RS/ES/PS/EdDSA. With HS256 every verifier holds the shared secret and can also mint tokens — a reason to prefer asymmetric keys across services. Encrypted JWTs (JWE) do exist; say 'a signed JWT (JWS) is encoded, not encrypted'. Always validate `alg` (reject `none`, guard against algorithm confusion), `iss`, `aud`, `exp` and signature; `Microsoft.IdentityModel` allows 5 minutes clock skew by default.

<a id="m2-q24"></a>

#### Q24. Why can a JWT not be revoked, and what are the three ways teams work around it?
Say this. Because validation is purely local - the server checks the signature and the expiry and needs no database call. That statelessness is the entire benefit, and it means there is nothing to delete. Workarounds: keep access tokens very short-lived and use refresh tokens; maintain a denylist of revoked token IDs, which reintroduces state; or bump a per-user token version claim and reject older versions.
Why. Every workaround trades away some statelessness. That trade is the real answer, and naming it is what distinguishes a considered answer from a memorised one.
Watch out. "Log out" on a JWT system usually just deletes the token client-side. The token remains valid until it expires - a genuine security consideration worth raising.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] 'A JWT cannot be revoked' is too absolute — the answer's own workarounds are revocation mechanisms. Precise wording: a self-contained JWT has no server-side state to delete, so revoking it means re-introducing some state. Options: a `jti` denylist (e.g. Redis with TTL = remaining token life); a per-user token version or 'valid-after' timestamp; signing-key rotation for mass revocation; short-lived access tokens plus rotating, revocable refresh tokens with reuse detection; reference tokens with introspection (RFC 7662).

<a id="m2-q25"></a>

#### Q25. How does the EF Core change tracker know what to update?
Say this. When a tracked entity is loaded, EF stores a snapshot of its original values. `SaveChanges` compares current values to the snapshot, works out which properties changed, and generates UPDATE statements touching only those columns.
Why. That snapshot is why tracking costs memory and time proportional to what you loaded, and why `AsNoTracking` is meaningfully faster for read-only queries - there is no snapshot to take and no comparison to make.
Instead of. For read-only queries always `AsNoTracking`, or better, project to a DTO so you never materialise entities at all.
<a id="m2-q26"></a>

#### Q26. What is the N+1 problem, how do you find it, and how do you fix it?
Say this. You load a list of N parents, then touch a navigation property inside a loop, so you issue one extra query per parent - N+1 in total. You find it by logging the generated SQL; you cannot see it by reading the C#. You fix it with `Include`, or better, by projecting to a DTO so only one query with a join runs.
Why. It happens because lazy loading makes a database round trip look like a property access. The cost is invisible at the call site, which is exactly why it survives code review.
Watch out. `Include` on multiple collections causes cartesian explosion - use `AsSplitQuery` or separate queries. Knowing the fix has its own trap is the senior signal here.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] In EF Core, lazy loading is **off by default** (it needs the Proxies package + `UseLazyLoadingProxies()` and virtual navigations, or `ILazyLoader`). Without it, touching an unloaded navigation gives null/empty — silently wrong data, not N+1. In EF Core, N+1 comes from enabled lazy-loading proxies or from queries/`Load()` inside a loop. `AsSplitQuery` exists since EF Core 5 and can be set globally with `UseQuerySplittingBehavior`.

<a id="m2-q27"></a>

#### Q27. Compare cache-aside, write-through and write-behind.
Say this. Cache-aside: read the cache, on a miss load from the database and populate. Simple, and the default. Write-through: write to cache and database together, so they stay consistent at the cost of write latency. Write-behind: write to cache and flush to the database later - fastest writes, but you can lose data if the cache dies.
Why. They differ only in who writes and when. The hard part is never the strategy, it is invalidation and stampedes.
Watch out. Cache-aside plus a short TTL covers most real systems. Reach for write-through only when a stale read is genuinely unacceptable.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Write-through does not *guarantee* consistency: there is no transaction spanning cache and database, so partial failures or concurrent writers can still make them diverge.

<a id="m2-q28"></a>

#### Q28. What is a cache stampede and how do you prevent it?
Say this. A hot key expires, and every concurrent request misses simultaneously and hits the database at once - which can take the database down at exactly the moment traffic is highest. Three fixes: a short lock so only one caller refreshes; jittered or staggered expiry so keys do not expire together; or serve the stale value while one caller refreshes in the background.
Why. The problem is synchronised expiry. Any fix works by de-synchronising it or by serialising the refill.
Watch out. Also called the thundering herd. Mentioning that the same phrase applies to retry storms without jitter connects two topics well.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Add .NET's `HybridCache` (`Microsoft.Extensions.Caching.Hybrid`, GA with .NET 9), which has built-in stampede protection, plus probabilistic early refresh as another technique.

<a id="m2-q29"></a>

#### Q29. When would you use a BackgroundService, and what is the catch?
Say this. For work that must run independently of a request - queue consumers, scheduled jobs, cleanup. The catch is dependency injection: a `BackgroundService` is a singleton, so it cannot inject a scoped `DbContext`. You must inject `IServiceScopeFactory` and create a scope per unit of work.
Why. It is registered as a hosted service and started with the host, so its lifetime is the application's - which is precisely why the scoped-service rule bites here.
Watch out. Second catch: an unhandled exception in a `BackgroundService` can stop the host by default. Wrap the loop body in try/catch or you lose the whole process to one bad message.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated — verify] In .NET 10, `BackgroundService.ExecuteAsync` was changed to run entirely as a background task (previously its synchronous prefix could block startup). Check the .NET 10 breaking-changes list before stating it in an interview.


<a id="add-net-pipeline"></a>

## ➕ The ASP.NET Core middleware order for .NET 10, as code

Part C, Q17 and Q18 explain *why* order matters. This section gives the order you can write from memory. It follows the "Middleware order" section of [ASP.NET Core Middleware](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-10.0#middleware-order) (page dated Aug 2026), plus the [rate limiting](https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit?view=aspnetcore-10.0) and [output caching](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/output?view=aspnetcore-10.0) pages.

### The order for a typical Web API

```csharp
var app = builder.Build();

// 1. Errors first, so it catches exceptions from everything below.
if (app.Environment.IsDevelopment())
    app.UseDeveloperExceptionPage();          // optional: WebApplication adds it in Development by default
else
{
    app.UseExceptionHandler();                // with AddProblemDetails(): returns ProblemDetails JSON
    app.UseHsts();                            // adds the Strict-Transport-Security header
}

app.UseHttpsRedirection();                    // 2. HTTP -> HTTPS
app.UseStaticFiles();                         // 3. serve files and short-circuit (MapStaticAssets() is the .NET 9+ endpoint alternative)

app.UseRouting();                             // 4. choose the endpoint (does not run it yet)
app.UseRateLimiter();                         // 5. after routing if you use per-endpoint policies
app.UseCors();                                // 6. after routing, before auth
app.UseAuthentication();                      // 7. who are you? (sets HttpContext.User)
app.UseAuthorization();                       // 8. are you allowed? (reads endpoint [Authorize] metadata)
app.UseOutputCache();                         // 9. after CORS and auth
app.UseMiddleware<TenantContextMiddleware>(); // 10. your own middleware that needs user + endpoint

app.MapControllers();                         // 11. endpoints run here
app.MapGroup("/jobs").MapJobEndpoints();

app.Run();
```

`UseResponseCaching()` (the older, HTTP-header-based cache) goes after `UseCors()`. Most APIs do not need it; output caching is usually the better choice (see the caching section).

### Why each position matters

| Middleware | Position rule | What breaks if it is wrong |
|---|---|---|
| `UseExceptionHandler` | First | Exceptions thrown by middleware registered *before* it are not caught. The client gets an empty 500 or a dropped connection. |
| `UseHsts` | Early, non-Development only | HSTS in development can lock your browser to HTTPS on localhost. |
| `UseHttpsRedirection` | Before anything that does real work | Requests are processed over plain HTTP first. |
| `UseStaticFiles` | Before routing and auth | Files go through routing and auth for no reason. Note: files served here are **not** protected by authorization. |
| `UseRouting` | Before CORS, rate limiter, auth | Later middleware cannot see which endpoint was chosen, so endpoint metadata (`[Authorize]`, `[EnableCors]`, `[EnableRateLimiting]`) is invisible. |
| `UseRateLimiter` | After `UseRouting` **when you use endpoint-specific policies**. A global-only limiter may go before routing. | `[EnableRateLimiting]` and `RequireRateLimiting` policies are silently not applied. |
| `UseCors` | After routing, **before** authentication/authorization, and before response caching | The preflight `OPTIONS` request carries no credentials. If auth runs first, it gets 401/403, and the browser blocks the real call. |
| `UseAuthentication` | Before `UseAuthorization` | Authorization sees an anonymous user and rejects everyone. |
| `UseAuthorization` | After authentication, before endpoints | Policies are not enforced. |
| `UseOutputCache` | After `UseCors`, after `UseRouting`, after `UseAuthentication` and `UseAuthorization` | The docs warn it can serve content cached for an authorized user to an unauthorized one. |
| Custom middleware | Wherever its data is ready | A tenant middleware placed before authentication cannot read the user's tenant claim. |
| Endpoints (`Map...`) | Last | They are terminal. Anything after them does not run for matched requests. |

**One nuance about the rate limiter.** The docs' sample puts `UseRateLimiter` right after `UseRouting`, before authentication. If your partition key uses `HttpContext.User` (per user or per tenant), the user is not known yet at that point, so everyone falls into the "anonymous" bucket. In that case, place `UseRateLimiter` **after** `UseAuthentication`. (This follows from how the pipeline works; test it.)

**`WebApplication` defaults.** In .NET 6+, `WebApplication` adds routing and endpoints automatically. If you do not call `UseRouting()`, routing runs at the start of the pipeline. Call it explicitly when you need CORS, auth or rate limiting to see endpoint metadata in a known order.

### Writing a custom middleware

**Inline (quick, for small things):**

```csharp
app.Use(async (context, next) =>
{
    var sw = Stopwatch.StartNew();
    await next(context);                       // call the rest of the pipeline
    app.Logger.LogInformation("{Path} took {Ms} ms", context.Request.Path, sw.ElapsedMilliseconds);
});
```

**Class-based (testable, can use DI):**

```csharp
public sealed class CorrelationIdMiddleware(RequestDelegate next, ILogger<CorrelationIdMiddleware> logger)
{
    private const string Header = "X-Correlation-Id";

    public async Task InvokeAsync(HttpContext context)        // scoped services go here as parameters
    {
        string id = context.Request.Headers[Header].FirstOrDefault() ?? Guid.NewGuid().ToString("N");
        context.Response.Headers[Header] = id;

        using (logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = id }))
        {
            await next(context);
        }
    }
}

app.UseMiddleware<CorrelationIdMiddleware>();
```

Rules to say aloud:
- A convention-based middleware is created **once** (like a singleton). Inject singletons in the constructor. Inject **scoped** services (such as a `DbContext`) as extra parameters of `InvokeAsync`. Otherwise you create a captive dependency.
- To **short-circuit**, write the response and do **not** call `next`.
- Do not change headers after the response has started. Check `context.Response.HasStarted`, or use `context.Response.OnStarting(...)`.
- If you need a per-request instance, implement `IMiddleware` and register the class in DI.

<a id="add-net-di"></a>

## ➕ Dependency injection: lifetimes, validation, keyed services and disposal

Part C, Q19 defines the three lifetimes and the captive dependency. This section adds the details interviewers follow up with.

### Lifetimes table

| Lifetime | Created | Disposed | Typical use | Danger |
|---|---|---|---|---|
| **Singleton** | Once, on first request (or when you pass an instance) | When the root container is disposed (app shutdown) | Caches, `HttpClient` factories, config objects, stateless helpers | Must be **thread-safe**. Must not hold scoped or transient objects. |
| **Scoped** | Once per scope. In ASP.NET Core, one scope per HTTP request. | When the scope ends (end of the request) | `DbContext`, unit of work, current-user / tenant context | Resolving it from the root provider makes it live forever. |
| **Transient** | Every time it is resolved | When the scope that resolved it ends | Light, stateless services | A transient `IDisposable` resolved from the **root** is kept until shutdown, which is a memory leak. |

### Captive dependencies in one picture

```
Singleton ReportCache
   └── needs IJobRepository (scoped)  ← captured once, reused by every request forever
          └── needs AppDbContext (scoped, not thread-safe)
```

Rule: a service may depend only on services that live **as long or longer**. Singleton → singleton. Scoped → scoped or singleton. Transient → anything.

### Scope validation

```csharp
builder.Host.UseDefaultServiceProvider(o =>
{
    o.ValidateScopes = true;    // throw if a scoped service is resolved from the root, or captured by a singleton
    o.ValidateOnBuild = true;   // at startup, check every registration can be built
});
```

- Both are **on by default in the Development environment** ([.NET Generic Host](https://learn.microsoft.com/en-us/dotnet/core/extensions/generic-host)). They are off in Production, because of the startup cost.
- **Failure case.** The bug passes tests in Development only if a test actually resolves that path. Turn both on in your integration tests too.
- `ValidateOnBuild` cannot check services that are resolved by a factory lambda or by `GetService` inside your code.

### `IServiceScopeFactory` in background work

A `BackgroundService` and any singleton have **no request scope**. Create one per unit of work:

```csharp
public sealed class InvoiceSweeper(IServiceScopeFactory scopes, ILogger<InvoiceSweeper> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(1));
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            await using var scope = scopes.CreateAsyncScope();               // new scope = new DbContext
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await db.Invoices.Where(i => i.DueAt < DateTime.UtcNow && !i.Reminded)
                             .ExecuteUpdateAsync(s => s.SetProperty(i => i.Reminded, true), stoppingToken);
        }   // scope disposed here: DbContext and its connection are released
    }
}
```

- Use `CreateAsyncScope` with `await using`, so services that implement only `IAsyncDisposable` are disposed correctly.
- One scope per **message** or per **batch**. Not one scope for the whole lifetime of the service; that is the captive dependency again, just hidden.

### Keyed services (.NET 8+)

Register several implementations of one interface and pick one by key.

```csharp
builder.Services.AddKeyedSingleton<IPaymentGateway, StripeGateway>("stripe");
builder.Services.AddKeyedSingleton<IPaymentGateway, RazorpayGateway>("razorpay");

public sealed class CheckoutService([FromKeyedServices("razorpay")] IPaymentGateway gateway) { }

// Or choose at runtime:
var gw = serviceProvider.GetRequiredKeyedService<IPaymentGateway>(tenant.GatewayKey);
```

- **Trade-off.** Resolving by key at runtime is a service-locator pattern. For a fixed set of options, a small factory class (`IPaymentGatewayFactory.Get(name)`) is easier to test and read.

### Open generics

```csharp
builder.Services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
// IRepository<Job> resolves to EfRepository<Job>, IRepository<Invoice> to EfRepository<Invoice>
```

- Also common for decorators and pipelines, for example `ICommandHandler<>` and logging decorators.

### Disposal rules

1. The container disposes only the objects **it created**. If you register an instance (`AddSingleton(new Foo())`), the container does **not** dispose it. You own it.
2. Scoped and transient disposables are disposed when **their scope** ends. Singletons are disposed at app shutdown.
3. Disposal happens in **reverse order of creation**.
4. **Never** call `Dispose` on an injected service. Its owner is the container, and others may still use it.
5. Transient `IDisposable` objects resolved from the **root provider** (for example, inside a singleton factory) are tracked until shutdown. That is a slow memory leak. Resolve them from a scope instead.
6. If a service implements only `IAsyncDisposable`, dispose its scope with `await using` / `DisposeAsync`. Disposing such a scope synchronously throws.

<a id="add-net-config"></a>

## ➕ Configuration, the options pattern and secrets

Part C, Q20 and Q21 cover precedence and why `IOptions` exists. This section is the working setup.

### Sources and precedence (last one wins)

`WebApplication.CreateBuilder` loads, in this order ([.NET Generic Host](https://learn.microsoft.com/en-us/dotnet/core/extensions/generic-host)):

1. `appsettings.json`
2. `appsettings.{Environment}.json` (for example `appsettings.Production.json`)
3. User secrets (**Development environment only**)
4. Environment variables
5. Command-line arguments

```bash
# The same key at each level
appsettings.json:            "Jobs": { "MaxConcurrency": 4 }
environment variable:        Jobs__MaxConcurrency=16       # double underscore = ':'
command line:                --Jobs:MaxConcurrency=32      # wins
```

- **Failure case.** A Kubernetes environment variable silently overrides the value in `appsettings.Production.json`, and nobody knows why the JSON change "does nothing". Log the effective (non-secret) settings at startup.
- You can add more providers (Azure App Configuration, AWS Systems Manager Parameter Store, AWS Secrets Manager). Their position in the list decides their priority.

### Options pattern with validation

```csharp
public sealed class JobOptions
{
    public const string Section = "Jobs";

    [Range(1, 64)]
    public int MaxConcurrency { get; set; } = 4;

    [Required, Url]
    public string CallbackBaseUrl { get; set; } = "";
}

builder.Services.AddOptions<JobOptions>()
    .BindConfiguration(JobOptions.Section)
    .ValidateDataAnnotations()
    .Validate(o => o.CallbackBaseUrl.StartsWith("https://"), "CallbackBaseUrl must be HTTPS")
    .ValidateOnStart();          // fail at startup, not on the first request that reads it
```

- Without `ValidateOnStart()`, validation runs only when `.Value` is first read. A bad deployment starts "healthy" and fails later, under traffic.
- With it, the app **refuses to start**, so the deployment fails fast and the old version keeps serving.

### `IOptions` vs `IOptionsSnapshot` vs `IOptionsMonitor`

| | Lifetime | Sees config changes? | Use in |
|---|---|---|---|
| `IOptions<T>` | Singleton | No. Read once. | Most services. Settings that need a restart. |
| `IOptionsSnapshot<T>` | **Scoped** | Yes, re-read **per request** | Per-request code. Cannot be injected into a singleton. |
| `IOptionsMonitor<T>` | Singleton | Yes, **live**, with `OnChange` callback | Singletons and background services that must react to changes. |

```csharp
public sealed class Worker(IOptionsMonitor<JobOptions> options) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            int limit = options.CurrentValue.MaxConcurrency;   // always the latest value
            await Task.Delay(1000, ct);
        }
    }
}
```

- "Live reload" works only if the **source** supports it (JSON files with `reloadOnChange`, some cloud providers). Environment variables do not change while a process runs.

### Secrets: where they belong

| Place | Use for | Never for |
|---|---|---|
| `appsettings.json` in git | Non-secret defaults | Passwords, keys, connection strings with passwords |
| **User secrets** (`dotnet user-secrets set "Db:Password" "..."`) | Local development on your own machine. Stored in your user profile, outside the repo. | Production. They are **not encrypted**, just kept out of git. |
| **Environment variables** | Containers, CI, simple deployments | Highly sensitive values in shared hosts: they can leak into logs, crash dumps and process listings |
| **Secret manager** (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) | Production secrets. Gives access control, audit logs and rotation. | - |

Rules:
- **Never commit secrets.** If one is committed, **rotate it**. Deleting the commit is not enough, because git history and clones keep it.
- Add a secret scanner to CI (for example GitHub secret scanning or gitleaks).
- Prefer identity over passwords when the platform allows it: an IAM role for AWS SDK calls, or managed identity for Azure SQL.
- Do not log the whole configuration. Mark options classes that contain secrets, and never log them.

<a id="add-net-minimal-api"></a>

## ➕ A complete minimal API: a small job service

Goal: `POST /jobs` creates a job, `GET /jobs/{id}` reads it. It uses validation, `TypedResults`, ProblemDetails, and the right status codes: 201 with `Location`, 400, 404 and 409. The store is in memory to keep it short. In your project, replace it with EF Core.

```csharp
using System.Collections.Concurrent;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();     // errors become RFC 9457 ProblemDetails JSON
builder.Services.AddValidation();         // .NET 10: DataAnnotations validation for minimal APIs
builder.Services.AddSingleton<IJobStore, InMemoryJobStore>();

var app = builder.Build();
app.UseExceptionHandler();                // unhandled exception -> 500 ProblemDetails
app.UseStatusCodePages();                 // empty 4xx/5xx (for example a bare 404) -> ProblemDetails

var jobs = app.MapGroup("/jobs")          // route group: shared prefix, tags, filters, auth
    .WithTags("Jobs")
    .AddEndpointFilter<RequireTenantHeaderFilter>();

jobs.MapPost("/", CreateJob);
jobs.MapGet("/{id:guid}", GetJob);

app.Run();

static async Task<Results<Created<JobResponse>, ValidationProblem, ProblemHttpResult>> CreateJob(
    CreateJobRequest req, IJobStore store, CancellationToken ct)
{
    // Attribute rules ([Required], [StringLength]) already ran: AddValidation returns 400 before we get here.
    // Business rules that need logic go here:
    if (req.RunAt is { } runAt && runAt <= DateTimeOffset.UtcNow)
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            [nameof(CreateJobRequest.RunAt)] = ["RunAt must be in the future."]
        });                                                                   // 400

    var job = new Job(Guid.NewGuid(), req.ClientReference, req.Type, req.RunAt,
                      JobStatus.Queued, DateTimeOffset.UtcNow);

    if (!await store.TryAddAsync(job, ct))
        return TypedResults.Problem(
            title: "Duplicate job",
            detail: $"A job with client reference '{req.ClientReference}' already exists.",
            statusCode: StatusCodes.Status409Conflict);                       // 409

    return TypedResults.Created($"/jobs/{job.Id}", JobResponse.From(job));   // 201 + Location
}

static async Task<Results<Ok<JobResponse>, NotFound>> GetJob(Guid id, IJobStore store, CancellationToken ct)
    => await store.FindAsync(id, ct) is { } job
        ? TypedResults.Ok(JobResponse.From(job))                               // 200
        : TypedResults.NotFound();                                             // 404 (ProblemDetails via UseStatusCodePages)

// ---------- Types ----------
public enum JobStatus { Unknown = 0, Queued = 1, Running = 2, Succeeded = 3, Failed = 4 }

public sealed record CreateJobRequest(
    [Required, StringLength(64)] string ClientReference,
    [Required, AllowedValues("export", "import", "email")] string Type,
    DateTimeOffset? RunAt);

public sealed record Job(Guid Id, string ClientReference, string Type, DateTimeOffset? RunAt,
                         JobStatus Status, DateTimeOffset CreatedAt);

public sealed record JobResponse(Guid Id, string ClientReference, string Type, string Status, DateTimeOffset CreatedAt)
{
    public static JobResponse From(Job j) => new(j.Id, j.ClientReference, j.Type, j.Status.ToString(), j.CreatedAt);
}

public interface IJobStore
{
    Task<bool> TryAddAsync(Job job, CancellationToken ct);
    Task<Job?> FindAsync(Guid id, CancellationToken ct);
}

public sealed class InMemoryJobStore : IJobStore
{
    private readonly ConcurrentDictionary<Guid, Job> _byId = new();
    private readonly ConcurrentDictionary<string, Guid> _byReference = new(StringComparer.Ordinal);

    public Task<bool> TryAddAsync(Job job, CancellationToken ct)
    {
        if (!_byReference.TryAdd(job.ClientReference, job.Id)) return Task.FromResult(false); // atomic duplicate check
        _byId[job.Id] = job;
        return Task.FromResult(true);
    }

    public Task<Job?> FindAsync(Guid id, CancellationToken ct) => Task.FromResult(_byId.GetValueOrDefault(id));
}

public sealed class RequireTenantHeaderFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        if (string.IsNullOrWhiteSpace(ctx.HttpContext.Request.Headers["X-Tenant-Id"]))
            return TypedResults.Problem(title: "Missing X-Tenant-Id header", statusCode: StatusCodes.Status400BadRequest);

        return await next(ctx);          // run the endpoint (or the next filter)
    }
}
```

### Status codes in this API

| Situation | Code | How |
|---|---|---|
| Created | **201** + `Location: /jobs/{id}` | `TypedResults.Created(uri, body)` |
| Body fails `[Required]`/`[StringLength]` | **400** ValidationProblem | `AddValidation()` runs before the handler |
| Business rule fails (RunAt in the past) | **400** ValidationProblem | `TypedResults.ValidationProblem(errors)` |
| Malformed JSON body | **400** | The framework rejects it during binding |
| Unknown ID | **404** | `TypedResults.NotFound()` |
| Same `ClientReference` again | **409** Conflict | `TypedResults.Problem(statusCode: 409)` |
| Unhandled exception | **500** ProblemDetails, no stack trace in Production | `UseExceptionHandler()` + `AddProblemDetails()` |

### Why each piece is there

- **`TypedResults` + `Results<A, B, C>`.** The return type lists every possible response. The compiler checks it, unit tests can assert the exact type (`Assert.IsType<Created<JobResponse>>(result.Result)`), and OpenAPI metadata is generated from it. The docs prefer `TypedResults` over `Results` ([Minimal APIs quick reference](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0)).
- **`AddValidation()` (.NET 10).** Before .NET 10, minimal APIs had no built-in validation, and teams used FluentValidation or a filter. In .NET 10 it is built in, uses a source generator, and returns 400 with the errors. If you forget `AddValidation()`, **no validation runs and nothing warns you** ([Validation in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/validation?view=aspnetcore-10.0)). Some validation attributes are marked experimental in .NET 10 (verify for your project type).
- **ProblemDetails.** One standard error shape (`type`, `title`, `status`, `detail`, `errors`), so clients parse every error the same way.
- **409 and idempotency.** The unique `ClientReference` acts like an idempotency key: a retried POST cannot create a second job. A stricter design returns the **original** 201 response for an exact repeat, and 409 only when the same key comes with a different body.
- **Tenant header filter.** This shows the shape of an endpoint filter. In a real system, take the tenant from the **validated token**, never from a header the client controls (see the auth section).

### Route groups and endpoint filters

- `MapGroup("/jobs")` shares a prefix and anything you chain: `.RequireAuthorization()`, `.RequireRateLimiting("per-tenant")`, `.CacheOutput()`, `.AddEndpointFilter<...>()`, `.WithTags(...)`. Groups can be nested.
- An **endpoint filter** wraps the handler, like MVC action filters. It sees the bound arguments (`ctx.Arguments`) and can short-circuit by returning a result. Filters run in the order they are added.
- **Middleware vs filter:** middleware runs for every request and sees only the raw `HttpContext`. A filter runs only for its endpoints, after model binding, so it can read the typed arguments.

### When to use controllers instead

| Choose minimal APIs | Choose controllers |
|---|---|
| New, small to medium services; microservices | A large existing MVC/Web API codebase (consistency matters more than style) |
| You want Native AOT (controllers do not support it) | You rely on MVC features: complex model binders, `IActionFilter`/`IResultFilter` ordering, conventions, OData, views |
| You like explicit code in one place | The team prefers class-based organisation and attribute routing everywhere |

- **Say this.** "Both run on the same routing and middleware pipeline. I choose by team and codebase. For a new service on .NET 10 I would use minimal APIs with route groups, `TypedResults` and the built-in validation."

<a id="add-net-httpclient"></a>

## ➕ HttpClient, IHttpClientFactory and resilience

Sources: [HttpClient guidelines](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient-guidelines) and [Build resilient HTTP apps](https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience).

### Why `new HttpClient()` per call is bad: socket exhaustion

- **Mechanism.** Each `HttpClient` owns a handler, and each handler owns a **connection pool**. Creating and disposing a client per request throws the pool away. Every call opens a new TCP (and TLS) connection.
- A closed TCP connection stays in `TIME_WAIT` for a while, holding a local port. Under high request rates the machine runs out of ports: "socket exhaustion". Even before that, every call pays the connect and TLS handshake cost.

```csharp
// Bad: a new pool per call
using var client = new HttpClient();
var r = await client.GetAsync(url);
```

### Why a single static client needs `PooledConnectionLifetime`: DNS changes

- `HttpClient` resolves DNS **only when it opens a connection**. A static client keeps connections open for a long time, so it never sees a DNS change. After a blue/green deployment or failover, it keeps calling the old IP address.
- Fix: limit connection lifetime, so connections are replaced and DNS is looked up again.

```csharp
private static readonly HttpClient Shared = new(new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromMinutes(2)   // choose based on how often DNS can change
});
```

### `IHttpClientFactory` and typed clients

The factory pools **handlers** and recycles them after `HandlerLifetime` (default 2 minutes). Clients it creates are cheap and short-lived. Both the socket problem and the DNS problem are solved, and you get one place for configuration.

```csharp
builder.Services.AddHttpClient<PaymentsClient>(c =>
{
    c.BaseAddress = new Uri("https://payments.internal/");
    c.Timeout = Timeout.InfiniteTimeSpan;        // let the resilience pipeline own timeouts (see below)
})
.AddStandardResilienceHandler();

public sealed class PaymentsClient(HttpClient http)
{
    public async Task<PaymentStatus?> GetStatusAsync(string paymentId, CancellationToken ct) =>
        await http.GetFromJsonAsync<PaymentStatus>($"payments/{Uri.EscapeDataString(paymentId)}", ct);
}
```

- **Failure case.** A typed client is registered as **transient**. If you inject it into a **singleton**, the singleton keeps one `HttpClient` and one handler forever, and you are back to the DNS problem. In singletons, inject `IHttpClientFactory` and call `CreateClient` per operation, or use a static client with `PooledConnectionLifetime`.
- **Cookies warning.** The factory shares pooled handlers, so a `CookieContainer` can leak between callers. For cookie-based clients, use your own long-lived client.

### Timeouts and cancellation

- `HttpClient.Timeout` defaults to **100 seconds**. That is too long for a request path. Set a per-call limit with a token instead:

```csharp
using var cts = CancellationTokenSource.CreateLinkedTokenSource(requestAborted);
cts.CancelAfter(TimeSpan.FromSeconds(3));
var status = await payments.GetStatusAsync(id, cts.Token);
```

- Always pass the request's `CancellationToken` (`HttpContext.RequestAborted`, or the handler parameter). If the client disconnects, the downstream call stops too.
- Do not stack three timeouts that fight each other. Pick a total time budget per call, and make each layer fit inside it.

### `AddStandardResilienceHandler` (Microsoft.Extensions.Http.Resilience)

It adds five strategies, from outside to inside, with these defaults:

| Order | Strategy | Default |
|---|---|---|
| 1 | Rate limiter (concurrency) | 1,000 permits, queue 0 |
| 2 | **Total** request timeout (covers all retries) | 30 s |
| 3 | **Retry** | 3 retries, exponential backoff, **jitter on**, base delay 2 s |
| 4 | **Circuit breaker** | Opens at a 10% failure ratio, min throughput 100, sampling 30 s, break 5 s |
| 5 | **Attempt** timeout (each try) | 10 s |

- It retries on HTTP 5xx, 408, 429, `HttpRequestException` and `TimeoutRejectedException`.
- **Jitter** adds randomness to delays, so a thousand clients do not retry at the same moment (the thundering herd from Part D, Q28).
- **Circuit breaker:** after many failures it stops calling the sick dependency for a short time and fails fast. That protects both sides.
- Add only **one** resilience handler per client. Do not stack them.

### Retrying a POST is dangerous

By default the standard handler **retries all methods, including POST**. The docs warn this can duplicate records. If the first attempt reached the server but the response was lost, a retry runs the payment or insert **twice**.

Choose one:

```csharp
// Option A: no retries for unsafe methods (POST, PATCH, PUT, DELETE, CONNECT)
.AddStandardResilienceHandler(o => o.Retry.DisableForUnsafeHttpMethods());

// Option B: keep retries, but make the POST idempotent with a key the server stores
var req = new HttpRequestMessage(HttpMethod.Post, "payments")
{
    Content = JsonContent.Create(payment)
};
req.Headers.Add("Idempotency-Key", payment.ClientPaymentId);   // same key on every retry
```

- **Say this.** "Retries need idempotency. For GETs, retry with backoff and jitter. For a payment POST, either do not retry automatically, or send an idempotency key so the server returns the first result instead of charging twice." This ties directly to Part D, Q22.

<a id="add-net-background"></a>

## ➕ BackgroundService: scopes, shutdown, errors and a queue consumer

Part D, Q29 says when to use a `BackgroundService` and that it needs scopes. This section is the full, safe shape.

### Facts to know

- **Scope per unit of work.** The service is a singleton. Create a scope per message or batch with `IServiceScopeFactory.CreateAsyncScope()` (see the DI section).
- **Graceful shutdown.** On SIGTERM (for example `docker stop` or a Kubernetes pod stop), the host cancels `stoppingToken`, then waits up to `HostOptions.ShutdownTimeout` for `StopAsync` to finish. The default is **30 seconds** since .NET 6 (verify for your version). After that, work is abandoned.
- **Unhandled exceptions.** Since .NET 6, `BackgroundServiceExceptionBehavior.StopHost` is the default: an exception that escapes `ExecuteAsync` **stops the whole host**. The other option, `Ignore`, keeps the app running with a dead worker, which is worse because nobody notices.
- **.NET 10 change.** All of `ExecuteAsync` now runs as a background task. Before .NET 10, the code before the first `await` ran synchronously during startup and could block other services from starting ([breaking change note](https://learn.microsoft.com/en-us/dotnet/core/compatibility/extensions/10.0/backgroundservice-executeasync-task)). If you need work done before startup completes, put it in `StartAsync` instead.

```csharp
builder.Services.Configure<HostOptions>(o =>
{
    o.ShutdownTimeout = TimeSpan.FromSeconds(45);   // keep below the platform's kill timeout
    o.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.StopHost; // default; be explicit
});
```

- **Watch out.** The platform has its own limit. Kubernetes sends SIGKILL after `terminationGracePeriodSeconds` (30 s by default). If your `ShutdownTimeout` is longer than that, the process is killed before it finishes. Keep them aligned.

### A queue-consumer loop with bounded concurrency

This shape works for SQS, RabbitMQ or Azure Service Bus. `IQueueClient` stands for your broker SDK.

```csharp
public sealed class JobConsumer(
    IQueueClient queue,
    IServiceScopeFactory scopes,
    IOptionsMonitor<JobOptions> options,
    ILogger<JobConsumer> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        int limit = options.CurrentValue.MaxConcurrency;
        using var gate = new SemaphoreSlim(limit);
        var inFlight = new List<Task>();

        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                IReadOnlyList<QueueMessage> batch;
                try
                {
                    batch = await queue.ReceiveAsync(maxMessages: 10, stoppingToken);   // long poll
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    log.LogError(ex, "Receive failed; backing off");
                    await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
                    continue;                                                  // do not crash the host
                }

                foreach (var msg in batch)
                {
                    await gate.WaitAsync(stoppingToken);                       // at most 'limit' in flight
                    inFlight.Add(ProcessOneAsync(msg, gate, stoppingToken));
                }
                inFlight.RemoveAll(t => t.IsCompleted);
            }
        }
        catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
        {
            // Shutting down: stop receiving. Fall through and finish in-flight work.
        }

        await Task.WhenAll(inFlight);                                          // finish what we started
    }

    private async Task ProcessOneAsync(QueueMessage msg, SemaphoreSlim gate, CancellationToken stoppingToken)
    {
        try
        {
            await using var scope = scopes.CreateAsyncScope();                 // fresh DbContext per message
            var handler = scope.ServiceProvider.GetRequiredService<IJobHandler>();

            await handler.HandleAsync(msg.Body, CancellationToken.None);       // see note below
            await queue.DeleteAsync(msg, CancellationToken.None);              // ack only after success
        }
        catch (Exception ex)
        {
            // Do not delete: the broker redelivers after the visibility timeout,
            // and moves it to a dead-letter queue after N attempts.
            log.LogError(ex, "Message {MessageId} failed", msg.Id);
        }
        finally
        {
            gate.Release();
        }
    }
}
```

Points to explain:
- **Bounded concurrency.** The semaphore keeps at most `MaxConcurrency` messages in progress. The loop stops receiving when all slots are busy, so it never pulls more than it can handle.
- **Errors per message are caught.** One bad message cannot stop the host. The receive loop also catches errors, with a back-off.
- **Ack after success.** The message is deleted only after the handler succeeds. That gives **at-least-once** delivery, so `HandleAsync` must be **idempotent** (store processed message IDs, or use a unique constraint).
- **Shutdown.** When `stoppingToken` fires, the loop stops taking new messages, then waits for in-flight work. In-flight handlers get `CancellationToken.None` so they can finish within the shutdown timeout. If your handlers can be long, pass a token that cancels a few seconds before `ShutdownTimeout` instead, and rely on redelivery.
- **Poison messages.** Configure a dead-letter queue and a max receive count on the broker, so a message that always fails does not loop forever.
- **SQS-specific.** Keep the visibility timeout longer than your worst processing time, or extend it while working. Otherwise another consumer receives the same message while you are still processing it.

<a id="add-net-efcore"></a>

## ➕ Practical EF Core

Part D, Q25 and Q26 cover the change tracker and N+1. This section is the daily toolkit.

### DbContext lifetime

- `AddDbContext<AppDbContext>(...)` registers it as **scoped**: one per request. A `DbContext` is **not thread-safe**. Two parallel queries on one context throw `InvalidOperationException` ("A second operation was started on this context...").
- For singletons, background services, or parallel work, use a factory:

```csharp
builder.Services.AddDbContextFactory<AppDbContext>(o => o.UseNpgsql(connString));

public sealed class ReportBuilder(IDbContextFactory<AppDbContext> factory)
{
    public async Task<int> CountAsync(CancellationToken ct)
    {
        await using var db = await factory.CreateDbContextAsync(ct);   // you own it; dispose it
        return await db.Jobs.CountAsync(ct);
    }
}
```

- `AddDbContextPool` reuses context instances to save allocation cost. Do not keep per-request state in fields of a pooled context.

### Tracking vs `AsNoTracking`, and projections

```csharp
// Read-only list for an API: project to a DTO. Only the needed columns, no tracking, no entities.
var page = await db.Jobs
    .Where(j => j.TenantId == tenantId && j.Status == JobStatus.Failed)
    .OrderByDescending(j => j.CreatedAt)
    .Select(j => new JobListItem(j.Id, j.Type, j.CreatedAt, j.Customer.Name))   // join done in SQL
    .Take(50)
    .ToListAsync(ct);

// Read entities you will not change:
var jobs = await db.Jobs.AsNoTracking().Where(...).ToListAsync(ct);

// Load to update: tracking (the default) is needed so SaveChanges knows what changed.
var job = await db.Jobs.SingleAsync(j => j.Id == id, ct);
job.Status = JobStatus.Running;
await db.SaveChangesAsync(ct);
```

- **Rule of thumb.** Queries for display → `Select` to a DTO. Load for update → tracked entity. `AsNoTracking` sits between the two.
- You can make no-tracking the default with `UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)` and opt in with `AsTracking()`.

### `Include` vs split queries

- `Include` loads related data in **one** SQL query with JOINs.
- Two collection `Include`s in one query multiply rows: 100 orders x 10 lines x 5 payments = 5,000 rows for 100 orders ("cartesian explosion").
- `AsSplitQuery()` sends one query per collection instead.

```csharp
var orders = await db.Orders
    .Include(o => o.Lines)
    .Include(o => o.Payments)
    .AsSplitQuery()
    .Where(o => o.CustomerId == customerId)
    .ToListAsync(ct);
```

- **Trade-off.** Split queries mean more round trips, and the separate queries are not one consistent snapshot unless you use a transaction with suitable isolation. Single query: one round trip, but possibly huge result sets. Measure.

### See the generated SQL (how you find N+1)

```csharp
builder.Services.AddDbContext<AppDbContext>(o =>
{
    o.UseNpgsql(connString);
    if (builder.Environment.IsDevelopment())
    {
        o.LogTo(Console.WriteLine, LogLevel.Information);   // prints every SQL command
        o.EnableSensitiveDataLogging();                    // shows parameter VALUES: dev only
    }
});
```

- Or set the log category `Microsoft.EntityFrameworkCore.Database.Command` to `Information` in `appsettings.Development.json`.
- `query.ToQueryString()` shows the SQL for one query without running it.
- **N+1 signature in the log:** one `SELECT` for the list, then the **same** `SELECT ... WHERE Id = @p` repeated once per row.
- **Never** enable `EnableSensitiveDataLogging` in production. It writes parameter values (emails, tokens, card data) into your logs.
- **Lazy loading is off by default** in EF Core (see the correction in Part D, Q26). Without it, an unloaded navigation is simply `null` or empty. Check for that before assuming N+1.

### Optimistic concurrency

Two users load the same job and both save. Without protection, the last write silently wins.

```csharp
// SQL Server: rowversion, changed by the database on every update
public class Job
{
    public Guid Id { get; set; }
    public JobStatus Status { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; } = [];
}

// PostgreSQL (Npgsql): map the system column xmin (verify the exact setup for your Npgsql version)
public class Job
{
    public Guid Id { get; set; }
    public JobStatus Status { get; set; }
    [Timestamp] public uint Version { get; set; }    // Npgsql maps a uint row version to xmin
}
// Portable alternative: an int Version column marked [ConcurrencyCheck] that YOUR code increments.
```

- **Mechanism.** EF adds the token to the `WHERE` clause: `UPDATE ... WHERE Id = @id AND RowVersion = @original`. If 0 rows change, someone else updated first, and EF throws `DbUpdateConcurrencyException`.

```csharp
try
{
    await db.SaveChangesAsync(ct);
}
catch (DbUpdateConcurrencyException)
{
    return TypedResults.Problem(statusCode: StatusCodes.Status409Conflict,
        title: "The job was changed by someone else. Reload and try again.");
}
```

- In an API, send the version to the client (for example as an `ETag`) and require it back (`If-Match`). Then a stale client gets **409** or **412** instead of overwriting newer data.

### Explicit transactions

- `SaveChanges` already wraps its own commands in a transaction. You need an explicit one only when **several** `SaveChanges` calls, or raw SQL plus `SaveChanges`, must succeed or fail together.

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);
db.Payments.Add(payment);
await db.SaveChangesAsync(ct);
await db.Database.ExecuteSqlInterpolatedAsync($"UPDATE wallets SET balance = balance - {amount} WHERE id = {walletId}", ct);
await tx.CommitAsync(ct);   // if we never reach this line, disposal rolls back
```

- **Watch out.** With retrying execution strategies (`EnableRetryOnFailure`), a manual transaction must run inside `db.Database.CreateExecutionStrategy().ExecuteAsync(...)`. Otherwise EF throws, because it cannot safely retry half a transaction.
- A database transaction does **not** cover sending an SQS message or calling an API. For "save and publish" use the outbox pattern.

### `ExecuteUpdate` / `ExecuteDelete` (EF Core 7+)

```csharp
int updated = await db.Jobs
    .Where(j => j.Status == JobStatus.Running && j.HeartbeatAt < cutoff)
    .ExecuteUpdateAsync(s => s
        .SetProperty(j => j.Status, JobStatus.Failed)
        .SetProperty(j => j.FailedReason, "Heartbeat lost"), ct);

int deleted = await db.AuditLogs.Where(a => a.CreatedAt < retentionCutoff).ExecuteDeleteAsync(ct);
```

- One SQL statement. Nothing is loaded into memory.
- **Trade-offs.** It bypasses the change tracker: already-tracked entities are not updated, `SaveChanges` interceptors and audit logic do not run, and concurrency tokens are not checked unless you add them to the `Where`.

### Migrations and safe deployment

Source: [Applying migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying).

- **Review the SQL.** Generate a script and read it: `dotnet ef migrations script --idempotent --output migrate.sql`. EF can turn a rename into "drop column + add column", which loses data.
- **Automated deploy:** a **migration bundle** (`dotnet ef migrations bundle`) run as a one-off deployment job. Not from every app replica at startup.
- **EF Core 9+** takes a database-wide lock during `Migrate`, so concurrent runs are safer. The docs still prefer a separate deployment step when review, least privilege or high availability matter.
- Use a deployment identity with schema rights. The app's own login should only read and write data.
- **Expand-contract (zero downtime).** During a rolling deploy, old and new app versions run at the same time, so every schema change must work with both:
  1. **Expand:** add the new column as nullable or with a default. Deploy code that writes both old and new columns.
  2. **Migrate data:** backfill in small batches.
  3. **Switch:** deploy code that reads only the new column.
  4. **Contract:** in a later release, drop the old column.
- **Never** rename or drop a column in the same release as the code that stops using it.

<a id="add-net-caching"></a>

## ➕ Caching in ASP.NET Core: the APIs

Part D, Q27 and Q28 cover cache strategies and stampedes. This section maps them to the .NET APIs.

### `IMemoryCache`: in-process, per instance

```csharp
builder.Services.AddMemoryCache(o => o.SizeLimit = 10_000);   // units are YOURS, e.g. "entries"

var plan = await cache.GetOrCreateAsync($"plan:{tenantId}", async entry =>
{
    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);  // hard limit
    entry.SlidingExpiration = TimeSpan.FromMinutes(2);                 // drop if unused
    entry.Size = 1;                                                    // required when SizeLimit is set
    return await db.Plans.AsNoTracking().SingleAsync(p => p.TenantId == tenantId, ct);
});
```

- Fastest option: no network, no serialization. But each instance has its own copy, so after an update, instances disagree until expiry.
- **Failure case 1.** Without `SizeLimit`, the cache can grow until the process runs out of memory. With `SizeLimit`, **every** entry must set `Size`, or it throws.
- **Failure case 2.** `GetOrCreateAsync` does **not** stop a stampede: several callers can run the factory at the same time.
- Cached objects are shared references. If a caller changes one, every caller sees the change. Cache immutable objects.

### `IDistributedCache` with Redis: shared across instances

```csharp
builder.Services.AddStackExchangeRedisCache(o =>
{
    o.Configuration = builder.Configuration.GetConnectionString("Redis");
    o.InstanceName = "jobs-api:";            // key prefix, so apps sharing Redis do not collide
});
```

- Stores `byte[]`, so you serialize yourself. Every read is a network call.
- All instances see the same value. Invalidation works across the fleet.

### `HybridCache` (.NET 9+): L1 + L2 + stampede protection

Source: [HybridCache library](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid?view=aspnetcore-10.0).

```csharp
builder.Services.AddStackExchangeRedisCache(o => o.Configuration = redisConn);  // becomes L2 automatically
builder.Services.AddHybridCache(o =>
{
    o.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(10),              // L2 (Redis)
        LocalCacheExpiration = TimeSpan.FromMinutes(1)      // L1 (memory): keep it short
    };
});

public sealed class JobSummaryService(HybridCache cache, AppDbContext db)
{
    public ValueTask<JobSummary> GetAsync(Guid tenantId, CancellationToken ct) =>
        cache.GetOrCreateAsync(
            $"tenant:{tenantId}:job-summary",
            async token => await LoadAsync(tenantId, token),
            tags: [$"tenant:{tenantId}"],
            cancellationToken: ct);

    public async Task OnJobChangedAsync(Guid tenantId, CancellationToken ct) =>
        await cache.RemoveByTagAsync($"tenant:{tenantId}", ct);   // invalidate everything for that tenant

    private async Task<JobSummary> LoadAsync(Guid tenantId, CancellationToken ct) => new(
        Total:  await db.Jobs.CountAsync(j => j.TenantId == tenantId, ct),
        Failed: await db.Jobs.CountAsync(j => j.TenantId == tenantId && j.Status == JobStatus.Failed, ct));
}
```

What it gives you:
- **L1 + L2.** Reads check memory first, then Redis, then call your factory, and store the result in both.
- **Stampede protection.** For one key, only one caller runs the factory. Others wait for its result. This works **within one instance only**: ten instances can still make ten database calls.
- **Tags.** `RemoveByTagAsync` invalidates a group. It is a *logical* invalidation ("ignore entries created before now"); old values stay in storage until they expire.
- Serialization is handled for you (System.Text.Json by default).
- **Important limit.** `RemoveAsync`/`RemoveByTagAsync` clear the current server's L1 and the shared L2. **Other servers' L1 copies are not cleared.** They serve stale data until `LocalCacheExpiration`. That is why L1 expiry should be short.

### Output caching vs response caching

| | Output caching (`AddOutputCache`, .NET 7+) | Response caching (`AddResponseCaching`) |
|---|---|---|
| Who decides | **The server**, by policy | **HTTP headers** (`Cache-Control`), also used by browsers and proxies |
| Stored where | Server memory by default; Redis via `AddStackExchangeRedisOutputCache` (.NET 8+) | Server memory |
| Invalidate on demand | Yes: tags + `EvictByTagAsync` | No |
| Stampede protection | Yes, resource locking is on by default | No |
| Client can bypass | No | Yes, with `Cache-Control: no-cache` |
| Default rules | GET/HEAD, status 200 only; not for authenticated requests; not if the response sets cookies | Follows the headers |

Source: [Output caching middleware](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/output?view=aspnetcore-10.0). For server-side caching of API responses, output caching is usually the right choice.

### Cache-aside, the code version

```csharp
public async Task<Product?> GetProductAsync(Guid tenantId, Guid id, CancellationToken ct)
{
    string key = $"t:{tenantId}:product:{id}";
    var bytes = await cache.GetAsync(key, ct);                         // 1. try the cache
    if (bytes is not null) return JsonSerializer.Deserialize<Product>(bytes);

    var product = await db.Products.AsNoTracking()                     // 2. miss: read the database
        .SingleOrDefaultAsync(p => p.TenantId == tenantId && p.Id == id, ct);
    if (product is null) return null;                                  //    (optionally cache "not found" briefly)

    await cache.SetAsync(key, JsonSerializer.SerializeToUtf8Bytes(product),   // 3. fill with a TTL
        new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5) + TimeSpan.FromSeconds(Random.Shared.Next(0, 30))
        }, ct);                                                        //    jitter spreads expiry times
    return product;
}

public async Task UpdateProductAsync(Product p, CancellationToken ct)
{
    db.Products.Update(p);
    await db.SaveChangesAsync(ct);                                     // write the database first
    await cache.RemoveAsync($"t:{p.TenantId}:product:{p.Id}", ct);    // then delete (not update) the cache key
}
```

### Invalidation and keys per tenant

- **Delete on write, do not update.** Deleting the key after the database commit is simpler and safer. Two concurrent "update cache" calls can finish in the wrong order and leave an old value.
- **Always keep a TTL**, even with explicit invalidation. If an invalidation is lost (a crash between the DB commit and the cache delete), the TTL limits how long the data stays wrong.
- **Put the tenant in every key**: `t:{tenantId}:...`. A key without the tenant can serve **one customer's data to another** — a security incident, not only a bug. Build keys in one helper so nobody forgets.
- Add a **version** to keys when the cached shape changes (`v2:t:{tenantId}:product:{id}`). After a deploy, old and new code then do not read each other's format.
- Do not build keys from raw user input. Use internal IDs.

<a id="add-net-ratelimit"></a>

## ➕ Rate limiting: the built-in middleware and its limits

Source: [Rate limiting middleware in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit?view=aspnetcore-10.0) (.NET 7+).

### The four limiters

| Limiter | How it works | Good for | Weak spot |
|---|---|---|---|
| **Fixed window** | N requests per window (for example 100 per minute). The counter resets at the window edge. | Simple quotas | A burst at the edge: 100 at 0:59 plus 100 at 1:00 = 200 in two seconds |
| **Sliding window** | The window is split into segments. Old segments roll off gradually. | Smoother quotas | A little more state and CPU |
| **Token bucket** | A bucket holds up to N tokens. Each request takes one. Tokens refill at a fixed rate. | Allowing short bursts with a steady average rate | Needs two numbers tuned (size and refill rate) |
| **Concurrency** | At most N requests **in progress** at once. No time window. | Protecting an expensive endpoint or a fragile dependency | Does not limit the total requests per minute |

### Partitioned by user or tenant

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;   // set it explicitly

    options.AddPolicy("per-tenant", httpContext =>
    {
        // Partition key from the VALIDATED token, not from a client header.
        string tenant = httpContext.User.FindFirst("tenant_id")?.Value ?? "anonymous";

        return RateLimitPartition.GetTokenBucketLimiter(tenant, _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = 100,                                  // burst size
            TokensPerPeriod = 50,                              // refill
            ReplenishmentPeriod = TimeSpan.FromSeconds(10),
            QueueLimit = 0                                     // reject instead of queueing
        });
    });

    options.OnRejected = async (context, ct) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out TimeSpan retryAfter))
            context.HttpContext.Response.Headers.RetryAfter =
                ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString(CultureInfo.InvariantCulture);

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsJsonAsync(
            new { title = "Too many requests" }, ct);
    };
});

app.UseRouting();
app.UseAuthentication();        // the partition key above reads the user, so authenticate first
app.UseRateLimiter();           // after routing: endpoint policies are visible
app.UseAuthorization();

app.MapGroup("/jobs").RequireRateLimiting("per-tenant");
```

Points:
- **Set the status code.** Always set `RejectionStatusCode` or `OnRejected` to return **429**. Do not rely on the default.
- **`Retry-After`.** Tell the client when to try again. The lease provides `RetryAfter` metadata only when the limiter can estimate it. A concurrency limiter cannot. In that case, choose a small fixed value.
- **Partition on trusted identity.** The docs warn that partitioning on user-controlled input (for example a client IP that can be spoofed, or a free-text header) exposes you to DoS. Each new key also creates a new limiter in memory.
- **Queueing.** `QueueLimit > 0` makes excess requests wait instead of failing. For APIs, rejecting fast is usually better than holding connections.

### The big limit: it is per instance, in memory

- Each app instance keeps its **own** counters. With 4 replicas behind a load balancer and a limit of 100 per minute, a tenant can really make about **400** per minute. When the platform autoscales, the real limit changes with it.
- **Options for a true global limit:**
  1. **Gateway limiting.** Enforce limits at the API gateway or ingress (for example AWS API Gateway usage plans, or Nginx/Envoy rate limiting). This is often the simplest.
  2. **A distributed limiter in Redis.** Keep the counter or token bucket in Redis and update it **atomically with a Lua script**, so "read, check, decrement" is one step. Without atomicity, two instances can both read "1 left" and both allow the request.

```lua
-- Fixed window in Redis: KEYS[1] = "rl:{tenant}:{window}", ARGV[1] = limit, ARGV[2] = window seconds
local current = redis.call('INCR', KEYS[1])
if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[2]) end
if current > tonumber(ARGV[1]) then return 0 end
return 1
```

- **Trade-offs of Redis limiting.** It adds a network call to every request, and you must decide what happens when Redis is down: **fail open** (allow traffic, risk overload) or **fail closed** (reject, risk an outage). Many teams keep the local in-memory limiter as a second layer, so each instance is still protected when Redis fails.
- **Say this.** "The built-in limiter protects one instance. For a per-tenant quota across replicas, I enforce it at the gateway, or in Redis with an atomic Lua script, and I return 429 with `Retry-After` either way."

<a id="add-net-auth"></a>

## ➕ Authentication and authorization: JWT, policies and tenant ownership

Part D, Q23 and Q24 cover what is inside a JWT and revocation. This section is the server-side setup.

### JWT bearer validation

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = "https://login.example.com/";        // issuer: signing keys are fetched from its metadata (JWKS)
        o.Audience = "jobs-api";                            // this API's identifier
        o.MapInboundClaims = false;                         // keep claim names as in the token ("sub", "tenant_id")
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://login.example.com/",
            ValidateAudience = true,
            ValidateLifetime = true,                         // checks exp and nbf
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.FromSeconds(30),            // default is 5 minutes
            ValidAlgorithms = [SecurityAlgorithms.RsaSha256] // accept only what you expect
        };
    });
```

| Check | Why |
|---|---|
| **Signature / signing key** | Proves the token was issued by your identity provider and not changed. With `Authority`, keys come from the issuer's metadata, so key rotation works. |
| **Issuer (`iss`)** | Rejects tokens from another identity provider or tenant directory. |
| **Audience (`aud`)** | Rejects a token that was issued for **another API**. Without this, a token for service A works on service B. |
| **Lifetime (`exp`, `nbf`)** | Rejects expired and not-yet-valid tokens. |
| **Clock skew** | Allows small clock differences between servers. The default 5 minutes means a token is accepted up to 5 minutes after expiry. Shorter is stricter. |
| **Algorithms** | Guards against `alg: none` and algorithm-confusion attacks. |

- **Never** turn validation off "to make it work in dev". Use a dev identity provider or test tokens signed with a test key.

### "Authenticated" is not "authorized"

- **Authentication** answers *who are you*. A valid token proves identity.
- **Authorization** answers *what may you do*. A valid token for user A must not let A read user B's invoice.
- **Failure case.** `[Authorize]` alone only checks that the user is **logged in**. Many real data leaks (IDOR / BOLA: changing the ID in the URL) are endpoints that authenticate correctly but never check **ownership**.

### Policy-based authorization

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("jobs:write", p => p.RequireAuthenticatedUser()
                                  .RequireClaim("scope", "jobs.write"))
    .AddPolicy("billing-admin", p => p.RequireRole("BillingAdmin"));

app.MapGroup("/jobs").RequireAuthorization();                         // logged in
app.MapPost("/jobs", CreateJob).RequireAuthorization("jobs:write");   // plus a scope
```

- A policy is a named set of **requirements**. For complex rules, write an `IAuthorizationRequirement` and an `AuthorizationHandler<T>`.
- Put rules in policies, not in `if` statements spread through controllers. Policies are reusable and testable.
- Note: some identity providers put several scopes in one space-separated `scope` claim. Then `RequireClaim("scope", "jobs.write")` does not match. Check what your provider emits. (verify)

### Resource-based authorization: tenant ownership

Policies run **before** the handler, so they cannot see the database record. For "may this user touch **this** job?", load the resource, then ask `IAuthorizationService`.

```csharp
public sealed class SameTenantRequirement : IAuthorizationRequirement;

public sealed class SameTenantHandler : AuthorizationHandler<SameTenantRequirement, Job>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, SameTenantRequirement requirement, Job job)
    {
        string? tenant = context.User.FindFirst("tenant_id")?.Value;
        if (tenant is not null && job.TenantId.ToString() == tenant)
            context.Succeed(requirement);
        return Task.CompletedTask;                    // not calling Succeed = not authorized
    }
}

builder.Services.AddSingleton<IAuthorizationHandler, SameTenantHandler>();

static async Task<Results<Ok<JobResponse>, NotFound>> GetJob(
    Guid id, ClaimsPrincipal user, IAuthorizationService auth, AppDbContext db, CancellationToken ct)
{
    var job = await db.Jobs.AsNoTracking().SingleOrDefaultAsync(j => j.Id == id, ct);
    if (job is null) return TypedResults.NotFound();

    var result = await auth.AuthorizeAsync(user, job, new SameTenantRequirement());
    if (!result.Succeeded) return TypedResults.NotFound();     // 404, not 403: see below

    return TypedResults.Ok(JobResponse.From(job));
}
```

- **Defence in depth.** Also filter by tenant **in the query** (`Where(j => j.Id == id && j.TenantId == tenantId)`), or use an EF Core global query filter on `TenantId`. Then a forgotten check still cannot return another tenant's row.
- Take `tenant_id` from the **validated token**. Never from a header, query string or body that the client controls.

### 404 or 403 for another tenant's resource?

| Return | Meaning to the caller | Use when |
|---|---|---|
| **403 Forbidden** | "This exists, but you may not access it." | The caller is allowed to know the resource exists (for example, a page in their own company they lack permission for). |
| **404 Not Found** | "There is nothing here for you." | The resource belongs to **another tenant**. A 403 would confirm that the ID exists, which leaks information and helps attackers enumerate IDs. |

- **Say this.** "Inside one tenant, a missing permission gets 403. Across tenants, I return 404, so the API does not reveal that another customer's record exists. And the tenant filter is in the query itself, not only in a check afterwards."
- **401 vs 403.** 401 = not authenticated (no token, or an invalid one). 403 = authenticated but not allowed.

<a id="add-net-signalr"></a>

## ➕ SignalR, interview-ready

You used SignalR at work, so expect follow-ups: "how did you scale it?", "what happens on reconnect?", "can messages be lost?". Sources: [Production hosting and scaling](https://learn.microsoft.com/en-us/aspnet/core/signalr/scale?view=aspnetcore-10.0), [Redis backplane](https://learn.microsoft.com/en-us/aspnet/core/signalr/redis-backplane?view=aspnetcore-10.0), [Users and groups](https://learn.microsoft.com/en-us/aspnet/core/signalr/groups?view=aspnetcore-10.0), [Configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-10.0).

### What it is

- **Definition.** A library for real-time, two-way messages between server and clients (browser, .NET, Java). The server can **push** to clients without the client polling.
- **Hub.** A class whose public methods clients can call. The server calls client methods by name.

```csharp
[Authorize]
public sealed class JobHub : Hub<IJobClient>
{
    public override async Task OnConnectedAsync()
    {
        string tenant = Context.User!.FindFirst("tenant_id")!.Value;      // from the validated token
        await Groups.AddToGroupAsync(Context.ConnectionId, $"tenant:{tenant}");
        await base.OnConnectedAsync();
    }

    public Task Subscribe(Guid jobId)                                        // client -> server
    {
        // Check that the user may see this job before adding them (groups are NOT a security feature).
        return Groups.AddToGroupAsync(Context.ConnectionId, $"job:{jobId}");
    }
}

public interface IJobClient                                                  // server -> client, strongly typed
{
    Task JobProgress(Guid jobId, int percent);
    Task JobCompleted(Guid jobId, string status);
}

builder.Services.AddSignalR();
app.MapHub<JobHub>("/hubs/jobs");
```

- **Sending from outside the hub** (for example from your queue consumer): inject `IHubContext<JobHub, IJobClient>`.

```csharp
public sealed class ProgressNotifier(IHubContext<JobHub, IJobClient> hub)
{
    public Task ReportAsync(Guid jobId, int percent) =>
        hub.Clients.Group($"job:{jobId}").JobProgress(jobId, percent);
}
```

- **Hub instances are transient.** A new hub object is created for each call. Do not store state in hub fields. Keep it in a store, or in `Context.Items` for per-connection data.

### Groups and users

- **Group** = a named set of connections (a chat room, a tenant, a job). A connection can be in many groups.
- **User** = all connections of one user ID (laptop and phone). `Clients.User(userId)` sends to all of them. The user ID comes from the `NameIdentifier` claim by default.
- **Facts interviewers check:**
  - Group membership is **not** kept when a connection reconnects. The client must rejoin. (The server-side `OnConnectedAsync` above rejoins tenant groups automatically. Job subscriptions must be re-sent by the client.)
  - Groups live **in memory** and do not survive a server restart.
  - You **cannot count** group members, because with several servers no single server knows them all.
  - **Groups are not a security feature.** Check authorization before adding a connection to a group, and remove it yourself if permission is revoked.

### Transports

1. **WebSockets**: preferred. A full-duplex, persistent connection.
2. **Server-Sent Events**: server-to-client stream over HTTP; client-to-server uses normal requests.
3. **Long polling**: the fallback; the client keeps asking.

The client first sends a **negotiate** request, then picks the best transport both sides support. Behind Nginx or a load balancer, WebSockets need the `Upgrade`/`Connection` headers forwarded and a long enough idle timeout.

### Scale-out: why one server is not enough, and the two options

Each server knows only **its own** connections. With two servers, `Clients.Group("tenant:42")` on server A misses the users connected to server B. You need a backplane or a service.

| | **Redis backplane** | **Azure SignalR Service** |
|---|---|---|
| How | `AddSignalR().AddStackExchangeRedis(conn)`. Servers forward messages to each other through Redis pub/sub. | Clients connect to the managed service. Your servers keep only a few connections to it. |
| Sticky sessions | **Required** (except WebSockets-only clients with `SkipNegotiation`) | **Not required** |
| Connections per app server | All client connections | Small and constant |
| Fits | Your own infrastructure (on-premises, AWS) | Apps hosted on Azure (Microsoft recommends it there) |

- **Redis down = messages lost.** SignalR does **not** buffer messages while Redis is unavailable. Messages sent during the outage are lost. It reconnects to Redis automatically afterwards.
- Run Redis in the **same data center** as the app. Use a **channel prefix** if several apps share one Redis, or they will receive each other's broadcasts.

### Sticky sessions: why they are needed

- One SignalR connection can be several HTTP requests: the negotiate call, then the transport. With long polling or SSE, every poll is a new request. All of them must reach **the same server process**, which holds that connection's state. Without affinity, requests land on other servers and the connection fails.
- They are not needed when: there is a single server; you use Azure SignalR Service; or every client uses WebSockets only with `SkipNegotiation`.

### Reconnect

- The JavaScript and .NET clients reconnect only if you enable it: `.withAutomaticReconnect()` / `.WithAutomaticReconnect()`. By default, they try a few times with increasing delays, then give up. (verify the default delays for your client version)
- After a normal reconnect, the client gets a **new connection ID**. Group membership is gone, and messages sent while it was disconnected are **lost**.
- On the client, handle `onreconnected` to rejoin groups and **reload current state** (for example, fetch the job status from the REST API).
- **Stateful reconnect (.NET 8+).** With `AllowStatefulReconnects = true` on the hub endpoint and `withStatefulReconnect()` on the client, the server and client buffer messages (100,000 bytes by default) during a **short** disconnect, and replay them when the same connection comes back. It helps with brief network blips, not long outages or server restarts.

### Message ordering and delivery limits

- **Delivery is at-most-once.** There is no acknowledgement and no durable storage. If the client is disconnected, or Redis is down, the message is gone.
- **Ordering.** Messages sent over **one** connection arrive in the order they were sent on that connection. There is no guarantee across different senders, across servers through a backplane, or after a reconnect. (verify against the docs before stating it strongly)
- **Server limits to know:** a hub processes **one invocation at a time per client** by default (`MaximumParallelInvocationsPerClient = 1`). The maximum incoming message size is **32 KB** by default. Keep-alive is 15 s; the server treats a client as gone after 30 s of silence.
- **Design rule.** Treat SignalR as a **notification channel**, not the source of truth. Send small events ("job 123 is now 60%"), include a version or sequence number, and let the client fetch the real state over REST when it reconnects or sees a gap. Critical data (payments, final job results) must be stored in the database first and readable through the API.

### 60-second answer: "How would you build live job progress for thousands of users?"

> "Workers publish progress to the API servers, and the API pushes it to clients through a SignalR hub. Each user joins a group per tenant and per job they watch, after an authorization check. With more than one server, I add a Redis backplane with sticky sessions, or use Azure SignalR Service on Azure, so a message reaches the right clients on any server. SignalR is at-most-once: messages are lost during disconnects and Redis outages. So every message carries the job ID and a sequence number. On reconnect, the client rejoins its groups and reloads the current status from a REST endpoint. The database is the source of truth; SignalR only tells the client that something changed."
