# LLD, patterns and distributed systems Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q04"></a>

## Q04 — M4_Design_and_Distributed_Systems

Full source content: [Q-and-A/M4_Design_and_Distributed_Systems.docx](../SOURCE_LIBRARY/Q-and-A/M4_Design_and_Distributed_Systems.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="Q04-B0001"></a>

Month 4 Q&A - Design, LLD and Distributed Systems

<a id="Q04-B0002"></a>

Weeks 13 to 16. Design skills, and the project starts. 36 questions.

<a id="Q04-B0003"></a>

Covers: Weeks 13-16. SOLID, the design patterns that matter, consensus, distributed locks, outbox and saga, resilience and observability.

<a id="Q04-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q04-B0005"></a>

### How to use this on a bad week

<a id="Q04-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q04-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q04-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q04-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q04-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q04-B0011"></a>

| # | Question |
| --- | --- |
| 1 | Explain SRP without reciting the definition |
| 2 | Why is Dependency Inversion not the same as using a DI container? |
| 3 | Why is two-phase commit avoided in modern systems? |
| 4 | Why can a distributed lock not be made safe with timeouts alone? |
| 5 | What is the dual-write problem and how does outbox solve it? |

<a id="Q04-B0012"></a>

### What this file answers

<a id="Q04-B0013"></a>

Everything in the Month 4 checkpoint, plus the LLD round questions Amazon asks explicitly. Part C is the material that separates SDE II from SDE I.

<a id="Q04-B0014"></a>

### PART A - SOLID, with real violations

<a id="Q04-Q001"></a>

<a id="Q04-B0015"></a>

### Q1. Explain Single Responsibility without reciting the definition.

<a id="Q04-B0016"></a>

Say this. "One reason to change" - not "does one thing". A class that formats a report and also emails it has two reasons to change: the layout team and the delivery team. When one changes you risk breaking the other, and two teams end up editing one file.

<a id="Q04-B0017"></a>

Why. The unit is a reason for change, which means a stakeholder, not a verb. That is why "does one thing" is misleading - a method that validates, saves and publishes does one business thing and has three reasons to change.

<a id="Q04-B0018"></a>

Watch out. Use a real example from your own code. "I had a service that parsed the file and also decided the retry policy" is worth ten textbook definitions.

<a id="Q04-Q002"></a>

<a id="Q04-B0019"></a>

### Q2. What does Open/Closed actually look like in practice?

<a id="Q04-B0020"></a>

Say this. You should be able to add behaviour without editing existing code. In practice that means the variation point is behind an abstraction - a new payment provider is a new class implementing an interface, not a new branch in a switch that everything already depends on.

<a id="Q04-B0021"></a>

Why. Editing working code risks breaking working behaviour. Adding a class cannot break what was already there, so the blast radius of a change is bounded.

<a id="Q04-B0022"></a>

Instead of. Do not abstract pre-emptively. Open/Closed is a response to observed change - the second time you edit that switch, extract the abstraction. Doing it on the first is speculative generality.

<a id="Q04-Q003"></a>

<a id="Q04-B0023"></a>

### Q3. Give a Liskov violation that compiles fine and breaks at runtime.

<a id="Q04-B0024"></a>

Say this. A `Square` inheriting `Rectangle` with independent width and height setters. Code written against `Rectangle` sets width to 4 and height to 5 and asserts the area is 20 - which holds for every rectangle and fails for a square, because setting one dimension changes the other.

<a id="Q04-B0025"></a>

Why. Liskov is about behavioural substitutability, not just signature compatibility. The compiler checks the signature; the invariants are what break.

<a id="Q04-B0026"></a>

Watch out. A better real-world one: an implementation that throws `NotSupportedException` for a method on the interface. It satisfies the compiler and violates the contract - a read-only collection implementing `IList` is the classic.

<a id="Q04-Q004"></a>

<a id="Q04-B0027"></a>

### Q4. Why is Dependency Inversion not the same thing as using a DI container?

<a id="Q04-B0028"></a>

Say this. Dependency Inversion is a design principle: high-level policy should not depend on low-level detail; both should depend on an abstraction, and the abstraction should be owned by the high-level side. A DI container is a tool that wires up constructors. You can use a container and still violate the principle completely - inject a concrete `SqlRepository` everywhere and nothing is inverted.

<a id="Q04-B0029"></a>

Why. The inversion is about who owns the interface. If your domain layer defines `IOrderRepository` and the data layer implements it, the dependency arrow points inward and the domain is testable in isolation. If the data layer defines it, nothing changed.

<a id="Q04-B0030"></a>

Watch out. This is a favourite question because almost everyone conflates them. Getting it right is a strong signal, and it leads naturally into talking about testability.

<a id="Q04-Q005"></a>

<a id="Q04-B0031"></a>

### Q5. When is a design pattern over-engineering?

<a id="Q04-B0032"></a>

Say this. When there is only one implementation and no concrete reason to expect a second. A Strategy with one strategy is a switch statement with three extra files and one more indirection to trace when debugging.

<a id="Q04-B0033"></a>

Why. Every abstraction has a cost: more files, more indirection, harder navigation. It pays only when it absorbs a change you actually make. If the change never comes, you paid for nothing.

<a id="Q04-B0034"></a>

Watch out. Interviewers love a candidate who can say "I would not use a pattern here, and here is why". Enthusiasm for patterns reads as junior; judgement about them reads as senior.

<a id="Q04-B0035"></a>

### PART B - The patterns that matter

<a id="Q04-Q006"></a>

<a id="Q04-B0036"></a>

### Q6. Strategy or a switch statement?

<a id="Q04-B0037"></a>

Say this. Strategy when the behaviours are genuinely independent, likely to grow, and better tested separately - payment providers, pricing rules, export formats. A switch when there are two or three cases, they are stable, and they are short enough to read at a glance.

<a id="Q04-B0038"></a>

Why. Strategy converts a compile-time branch into a runtime composition. That buys extensibility and testability and costs indirection.

<a id="Q04-B0039"></a>

Watch out. The honest version: refactor the switch to Strategy when you edit it for the third time. "I refactored a switch to Strategy and then judged whether it actually improved" is a mature answer.

<a id="Q04-Q007"></a>

<a id="Q04-B0040"></a>

### Q7. How do event handlers cause memory leaks in .NET?

<a id="Q04-B0041"></a>

Say this. Subscribing creates a reference from the publisher to the subscriber. If the publisher outlives the subscriber and you never unsubscribe, the subscriber can never be collected - along with everything it references.

<a id="Q04-B0042"></a>

Why. The direction is what surprises people. You wrote `publisher.Event += handler`, so it looks like the subscriber depends on the publisher, but the delegate list lives on the publisher and holds the subscriber alive.

<a id="Q04-B0043"></a>

Instead of. Unsubscribe in `Dispose`, or use weak event patterns. In practice: any long-lived singleton raising events is a leak waiting to happen.

<a id="Q04-B0044"></a>

Watch out. A lambda capturing `this` has the same effect and is harder to spot, because there is no named method to search for.

<a id="Q04-Q008"></a>

<a id="Q04-B0045"></a>

### Q8. Decorator or inheritance?

<a id="Q04-B0046"></a>

Say this. Decorator when you want to add behaviour to an instance at runtime and combine additions freely - caching plus logging plus retry over the same repository, composed in any order. Inheritance when the behaviour is fixed at compile time and there is a genuine is-a relationship.

<a id="Q04-B0047"></a>

Why. Decorator composes; inheritance multiplies. Three optional behaviours by inheritance means eight classes for every combination. By decoration it is three classes you stack.

<a id="Q04-B0048"></a>

Watch out. ASP.NET Core middleware is the Decorator pattern - each one wraps the next and can act before and after. Saying that connects Month 2 to Month 4 and is a genuinely good observation.

<a id="Q04-Q009"></a>

<a id="Q04-B0049"></a>

### Q9. Should you wrap EF Core in a repository? Argue both sides.

<a id="Q04-B0050"></a>

Say this. Against: `DbSet<T>` is already a repository and `DbContext` is already a unit of work, so a thin wrapper is duplication that also hides useful capability - you lose composable `IQueryable`, `Include`, projections and split queries, or you leak them through anyway. For: it gives you a domain-shaped interface, keeps EF out of the domain layer, makes unit tests trivial, and centralises query logic so you do not have the same filter written twelve times.

<a id="Q04-B0051"></a>

Why. The real question is what you are isolating from. If it is "we might swap the ORM" - you will not, and the abstraction will leak. If it is "the domain should not know about EF" - that is a legitimate architectural boundary.

<a id="Q04-B0052"></a>

Watch out. Having a genuine opinion with reasons on both sides is the answer. A confident one-sided answer here reads as inexperience, because both are defensible.

<a id="Q04-Q010"></a>

<a id="Q04-B0053"></a>

### Q10. Why is Singleton often called an anti-pattern, and when is it still right?

<a id="Q04-B0054"></a>

Say this. Because it hides a dependency - anything can reach it globally, so it does not appear in any constructor and cannot be substituted in a test. It also introduces shared mutable state across the whole process. It is still right for genuinely stateless, thread-safe, expensive-to-create things: a configured `HttpClient`, a logger, a cache.

<a id="Q04-B0055"></a>

Why. The problem is the static access, not the single instance. A singleton registered in a DI container and injected through a constructor has the single instance without the global access, which is why that is the pattern everyone actually uses.

<a id="Q04-B0056"></a>

Watch out. "Singleton lifetime is fine; the Singleton pattern is usually not" is a crisp way to say it.

<a id="Q04-Q011"></a>

<a id="Q04-B0057"></a>

### Q11. Name three anti-patterns you have actually seen.

<a id="Q04-B0058"></a>

Say this. Anemic domain model - entities that are just property bags with all the logic in "service" classes, so the rules are scattered and duplicated. Service locator - resolving dependencies from a container inside a class, which hides them and defeats the point of DI. God object - one class that grew until nobody dares change it, usually called Manager or Helper.

<a id="Q04-B0059"></a>

Why. All three share a cause: it is easier to add to an existing thing than to create the right new thing. That is also why they grow rather than appear.

<a id="Q04-B0060"></a>

Watch out. You have worked on a legacy eDiscovery platform - you have seen these. A specific, unnamed example from real code is far more convincing than the definitions.

<a id="Q04-Q012"></a>

<a id="Q04-B0061"></a>

### Q12. Why is untestable code usually badly designed code?

<a id="Q04-B0062"></a>

Say this. Because the things that make code hard to test are the things that make it hard to change: hidden dependencies, static state, doing too much, and no seams. If you cannot construct the class without a database, the class knows too much about the database.

<a id="Q04-B0063"></a>

Why. A test is just another caller. If a test cannot use it in isolation, no other caller can either - so tomorrow's feature will not be able to reuse it.

<a id="Q04-B0064"></a>

Watch out. "Testability and good design are the same conversation" is the line. Interviewers who care about design care about this.

<a id="Q04-B0065"></a>

### PART C - The hard parts of distributed systems

<a id="Q04-Q013"></a>

<a id="Q04-B0066"></a>

### Q13. Why is two-phase commit avoided in modern systems?

<a id="Q04-B0067"></a>

Say this. Because it blocks. The coordinator asks everyone to prepare, then tells everyone to commit. If the coordinator dies after the prepare phase, every participant is holding locks and cannot decide alone whether to commit or abort - so they wait, holding those locks, until it comes back. It converts one node's failure into everyone's unavailability.

<a id="Q04-B0068"></a>

Why. The participants have promised they can commit, so they cannot unilaterally abort; but they have not been told to, so they cannot commit. There is no safe local decision.

<a id="Q04-B0069"></a>

Instead of. A saga: a sequence of local transactions, each with a compensating action, so every step commits immediately and failure is handled by compensating rather than by holding locks. You trade atomicity for availability and accept temporary inconsistency.

<a id="Q04-Q014"></a>

<a id="Q04-B0070"></a>

### Q14. Explain Raft leader election.

<a id="Q04-B0071"></a>

Say this. Every node has a randomised election timeout. A follower that hears nothing from a leader becomes a candidate, increments the term, and requests votes. A node grants one vote per term to the first candidate whose log is at least as up to date as its own. A candidate with a majority becomes leader and starts sending heartbeats.

<a id="Q04-B0072"></a>

Why. Randomised timeouts prevent everyone becoming a candidate at once. Requiring a majority guarantees at most one leader per term, and the log-freshness rule guarantees no committed entry is ever lost.

<a id="Q04-B0073"></a>

Watch out. Terms are a logical clock. A message from an older term is rejected, which is what makes a returning stale leader harmless.

<a id="Q04-Q015"></a>

<a id="Q04-B0074"></a>

### Q15. Why can a distributed lock not be made safe with timeouts alone?

<a id="Q04-B0075"></a>

Say this. Because the lock holder can be paused - a long GC pause, a slow disk, a descheduled VM - past the lease expiry without knowing it. The lock is released, another client acquires it, and then the first one wakes up and continues, still believing it holds the lock. Now two clients are in the critical section and neither is wrong from its own point of view.

<a id="Q04-B0076"></a>

Why. The lease expires in real time, but the holder's belief expires only when it checks - and it cannot check atomically with the work it is doing.

<a id="Q04-B0077"></a>

Instead of. A fencing token: the lock service issues a monotonically increasing number with each grant, and the protected resource rejects any write with a token lower than the highest it has seen. The stale holder's write is refused by the resource itself.

<a id="Q04-B0078"></a>

Watch out. This is Kleppmann's critique of Redlock, and it is a genuinely senior topic. Knowing the fencing-token answer sets you apart.

<a id="Q04-Q016"></a>

<a id="Q04-B0079"></a>

### Q16. What is the dual-write problem?

<a id="Q04-B0080"></a>

Say this. You need to change the database and publish an event, and there is no transaction spanning both. Whichever you do first, a crash in between leaves the system inconsistent: commit then fail to publish means the event is lost; publish then fail to commit means you announced something that did not happen.

<a id="Q04-B0081"></a>

Why. There is no ordering that fixes it, because the failure window exists in both orders. You need to make it one atomic operation, which is what the outbox does.

<a id="Q04-B0082"></a>

Instead of. The outbox: write the event to a table in the same transaction as the data change, and have a separate publisher read that table. One commit, then an at-least-once publish that can safely be retried.

<a id="Q04-Q017"></a>

<a id="Q04-B0083"></a>

### Q17. Choreography or orchestration for a saga?

<a id="Q04-B0084"></a>

Say this. Choreography: each service reacts to events and emits its own, with no central controller - loosely coupled, no single point of failure, but the overall flow exists nowhere and is very hard to debug. Orchestration: one coordinator drives each step explicitly - the flow is visible in one place and easy to reason about, at the cost of coupling and a component that must stay available.

<a id="Q04-B0085"></a>

Why. It is the classic distributed trade-off: emergent behaviour is resilient and opaque, centralised behaviour is clear and coupled.

<a id="Q04-B0086"></a>

Watch out. For anything with money or compliance in it, prefer orchestration. When someone asks "why did this order not ship", you want one place to look.

<a id="Q04-Q018"></a>

<a id="Q04-B0087"></a>

### Q18. Explain the circuit breaker states, and why retries alone amplify an outage.

<a id="Q04-B0088"></a>

Say this. Closed - calls pass through, failures are counted. Open - the threshold was crossed, so calls fail immediately without touching the downstream. Half-open - after a timeout, let a trial trickle through; success closes it, failure re-opens it. Retries alone amplify because a struggling service receives more load exactly when it can least handle it, so it never recovers.

<a id="Q04-B0089"></a>

Why. The breaker converts a slow failure into a fast one, which protects your own threads and gives the downstream room to recover. Failing fast is a feature.

<a id="Q04-B0090"></a>

Watch out. Retry plus breaker plus timeout plus jitter is the complete set. Any one on its own is incomplete, and naming all four is the answer.

<a id="Q04-Q019"></a>

<a id="Q04-B0091"></a>

### Q19. What is a bulkhead and what does it protect?

<a id="Q04-B0092"></a>

Say this. Separate resource pools per dependency, so exhausting one cannot starve the others. If all your threads or connections are in one pool and one downstream goes slow, every request queues behind it - including ones that never needed that dependency.

<a id="Q04-B0093"></a>

Why. It is named after ship compartments: the point is to make one flooded compartment survivable rather than fatal.

<a id="Q04-B0094"></a>

Watch out. This is a very common real outage shape: an unrelated feature goes down and takes the whole API with it because they shared a connection pool.

<a id="Q04-Q020"></a>

<a id="Q04-B0095"></a>

### Q20. What are RED and USE?

<a id="Q04-B0096"></a>

Say this. RED is for services: Rate, Errors, Duration - how many requests, how many failed, how long they took. USE is for resources: Utilisation, Saturation, Errors - how busy, how much queuing, how many faults. RED tells you the user is unhappy; USE tells you which resource is why.

<a id="Q04-B0097"></a>

Why. They are complementary because a service can be slow with no resource saturated - waiting on a downstream - and a resource can be saturated with users still happy.

<a id="Q04-B0098"></a>

Watch out. Pair it with the four golden signals - latency, traffic, errors, saturation - and say they overlap deliberately. Also: measure p95 and p99, never the average. The average hides exactly the requests people complain about.

<a id="Q04-Q021"></a>

<a id="Q04-B0099"></a>

### Q21. Why do correlation IDs matter, and where do they have to flow?

<a id="Q04-B0100"></a>

Say this. They are the only way to reconstruct one logical operation across many services and asynchronous hops. The ID must be generated at the edge, put in the logging context, and propagated through every boundary - HTTP headers, and crucially the message metadata when you enqueue, so the worker logs under the same ID as the API.

<a id="Q04-B0101"></a>

Why. Without it, a failure in a worker is a log line with no path back to the request that caused it. With it, one search reconstructs the whole story.

<a id="Q04-B0102"></a>

Watch out. The queue hop is the one people miss. You built this in week 16 - "trace one job end to end using only your logs" is exactly this, and it is a great thing to have done.

<a id="Q04-Q022"></a>

<a id="Q04-B0103"></a>

### Q22. What is an SLI, an SLO, and an error budget?

<a id="Q04-B0104"></a>

Say this. An SLI is the measurement - "99.2% of requests succeeded in under 300ms". An SLO is the target - "99.9% under 300ms". The error budget is the allowed shortfall: at 99.9% you may fail 0.1%, which is about 43 minutes a month.

<a id="Q04-B0105"></a>

Why. The budget turns reliability into a spendable resource. Budget remaining means you can ship risky changes; budget exhausted means you stop feature work and fix reliability. It replaces arguing with arithmetic.

<a id="Q04-B0106"></a>

Watch out. 100% is never the target - it is unachievable and the last fraction costs more than it is worth. Saying that shows you understand reliability as an engineering trade rather than an aspiration.

<a id="Q04-B0107"></a>

### PART D - The LLD round (Amazon tests this explicitly)

<a id="Q04-Q023"></a>

<a id="Q04-B0108"></a>

### Q23. How do you approach a 45-minute LLD from a blank page?

<a id="Q04-B0109"></a>

Say this. Five minutes clarifying requirements and explicitly stating what is out of scope. Five listing the nouns - those become your entities. Ten defining the interfaces and where the variation lives. Twenty coding the core classes, with real method bodies for the interesting parts and stubs for the boring ones. Five on edge cases and one alternative you rejected.

<a id="Q04-B0110"></a>

Why. Interviewers score whether you got to working code, and whether your class boundaries make sense. Perfect completeness is not expected; a sensible structure and an articulated trade-off is.

<a id="Q04-B0111"></a>

Watch out. The most common failure is spending twenty-five minutes on requirements and never writing a class. Set yourself a hard limit and move.

<a id="Q04-Q024"></a>

<a id="Q04-B0112"></a>

### Q24. Design a parking lot - what are the real decisions?

<a id="Q04-B0113"></a>

Say this. Entities: Vehicle with a size, Spot with a size and occupancy, Level, Ticket, and a PricingStrategy. The real decisions are: how a vehicle maps to eligible spot sizes; how you find a free spot efficiently, which is a free-list or a per-size counter rather than a scan; making pricing a strategy so hourly, daily and flat are separate classes; and thread safety on allocation so two cars cannot take one spot.

<a id="Q04-B0114"></a>

Why. The allocation concurrency is the part that separates a real answer from a class diagram. It is the same compare-and-set problem as everywhere else.

<a id="Q04-B0115"></a>

Watch out. Have one rejected alternative ready. "I considered a single list of spots scanned linearly and rejected it because lookup becomes O(n) at exactly the busiest time."

<a id="Q04-Q025"></a>

<a id="Q04-B0116"></a>

### Q25. Design a logger - and where does your design differ from a real library?

<a id="Q04-B0117"></a>

Say this. Entities: a Logger facade, a Level enum, Sinks (console, file, HTTP), Formatters, and a buffered async writer. Key decisions: level filtering as early as possible so a disabled level costs almost nothing; sinks as an interface for extension; buffering with a background flush so logging never blocks the caller; and deciding what happens when the buffer is full - drop or block.

<a id="Q04-B0118"></a>

Why. Serilog adds structured logging: the message template and its properties are kept separate so downstream tools can query on fields rather than grepping strings. That is the biggest difference from a naive design and it is the right thing to mention.

<a id="Q04-B0119"></a>

Watch out. "What happens if the sink is down?" is the follow-up. Answer: buffer with a bound, then drop, and never let logging take down the application.

<a id="Q04-B0120"></a>

### PART E - Your project, defended

<a id="Q04-Q026"></a>

<a id="Q04-B0121"></a>

### Q26. Why a queue at all, and what did it cost you?

<a id="Q04-B0122"></a>

Say this. It decouples submission from execution, so the API can accept work in milliseconds and stay responsive under a spike, and workers scale independently. The cost is real: eventual consistency, so the caller must poll or be notified; at-least-once delivery, so every handler needs idempotency; and a whole new class of operational concern - queue depth, poison messages, DLQ monitoring.

<a id="Q04-B0123"></a>

Why. You have converted a latency problem into a complexity problem. That is usually the right trade for background work and the wrong one for something the user is waiting on.

<a id="Q04-B0124"></a>

Watch out. Never present the queue as free. Naming what it cost is what makes the choice sound like a decision.

<a id="Q04-Q027"></a>

<a id="Q04-B0125"></a>

### Q27. Walk me through exactly what happens when a worker dies mid-job.

<a id="Q04-B0126"></a>

Say this. The job row stays in a Running state with a lease and a heartbeat timestamp that the worker was updating. When the worker dies the heartbeat stops. A reaper process looks for jobs whose lease has expired and returns them to Pending, incrementing the attempt count. Another worker picks it up. Because the handler is idempotent, any partial work from the first attempt does not double-apply.

<a id="Q04-B0127"></a>

Why. The heartbeat is what distinguishes "slow" from "dead" - without it you either kill slow jobs or wait forever for dead ones. The lease is the same lease-expiry problem as a distributed lock.

<a id="Q04-B0128"></a>

Watch out. Be honest about the window: a job can be re-run while the original worker is merely paused, which is exactly why idempotency is load-bearing and not decorative.

<a id="Q04-Q028"></a>

<a id="Q04-B0129"></a>

### Q28. Where is your bottleneck, and how do you know?

<a id="Q04-B0130"></a>

Say this. Name it and give the number. Typically the database on status writes, or the queue receive round trip, or worker CPU on the actual job. You know because you load tested with k6, measured p95 and p99 at increasing load, watched where latency turned upward, and correlated that with queue depth, connection pool usage and CPU.

<a id="Q04-B0131"></a>

Why. A bottleneck is where the curve bends, not where you guessed. Having the numbers is what makes this a strong answer rather than a plausible one.

<a id="Q04-B0132"></a>

Watch out. This is the question that most reliably exposes a project that was never actually load tested. Have the table of numbers in your README and be able to quote a figure.

<a id="Q04-Q029"></a>

<a id="Q04-B0133"></a>

### Q29. What failure mode did you deliberately not handle, and why?

<a id="Q04-B0134"></a>

Say this. Pick a real one and own it. For example: no multi-region failover, because the added complexity and cost would not have taught me anything the single-region design did not, and the recovery objective for a demonstration platform does not justify it. Or: no exactly-once external side effects, because that needs an outbox on the third-party call, and I chose to demonstrate idempotency in the core path instead.

<a id="Q04-B0135"></a>

Why. A deliberate, articulated scope decision reads as engineering judgement. "I did not think of it" reads as luck.

<a id="Q04-B0136"></a>

Watch out. This is the single best question to prepare for your project, because it distinguishes someone who built something from someone who followed a tutorial. Have your answer written down.

<a id="Q04-B0137"></a>

### PART F - The Month 4 self-test

<a id="Q04-B0138"></a>

Cover the answers. Anything you cannot say goes in the WEAK tab.

<a id="Q04-B0139"></a>

| # | Say it out loud, no notes |
| --- | --- |
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

<a id="Q04-B0140"></a>

Parts C and E are the ones that matter most. Part C is the material Amazon uses to separate SDE II from SDE I. Part E is your project, and your project will be probed harder than anything else on your resume - a weak answer on your own work costs more than a weak answer on a general topic.
