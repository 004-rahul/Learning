# Distributed systems, replication, caching and messaging

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 3 parts C–D, Month 4 part C, and the distributed-systems prompts with answers. Weeks 12–13 and 17 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART C - Replication, partitioning and caching
- PART D - Messaging (your strongest area - own it)
- PART C - The hard parts of distributed systems
- Distributed systems — prompts and answers
- ➕ Distributed systems map — the order to learn it
- ➕ Delivery semantics and idempotency patterns
- ➕ The transactional outbox in depth
- ➕ Retry policy design
- ➕ Leases, heartbeats, visibility timeouts and fencing
- ➕ RabbitMQ vs SQS vs Kafka — semantics table
- ➕ Sagas — a worked example
- ➕ Consistency models — the ladder
- ➕ Clocks: physical, logical and hybrid
- ➕ Resilience toolkit and cascading failure

---

<a id="m3-part-c"></a>

## PART C - Replication, partitioning and caching

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m3-q16"></a>

#### Q16. Why can a read replica serve stale data, and how do you hide that from a user?
Say this. Replication is asynchronous - the leader acknowledges the write before followers have applied it, so a read from a follower can miss a just-committed write. You hide it with read-your-writes consistency: route a user's reads to the leader for a short window after they write, or pin them to a replica known to be caught up, or track a version and wait for the replica to reach it.
Why. Synchronous replication would remove the staleness but make every write as slow as the slowest follower, and unavailable if a follower is down. The lag is the price of write availability.
Watch out. The user-visible symptom is "I saved it and it disappeared". That framing shows you have operated a system, not just read about one.
<a id="m3-q17"></a>

#### Q17. What does quorum mean, and why R + W > N?
Say this. With N replicas, if you write to W and read from R, then R + W > N guarantees the read set and write set overlap by at least one node - so at least one node you read from has the latest write. Common choice is N=3, W=2, R=2.
Why. It is a pigeonhole argument. Any two subsets of a set of N whose sizes sum to more than N must share a member.
Watch out. Tuning R and W trades read latency against write latency. W=N gives fast reads and fragile writes; W=1, R=N is the reverse.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] R + W > N does not guarantee you read the latest write in Dynamo-style systems: sloppy quorums and hinted handoff, concurrent writes, partially failed writes that are not rolled back, and last-write-wins clock skew can all return stale data. Quorum is not linearizability (DDIA chapter 5).

<a id="m3-q18"></a>

#### Q18. What is split brain?
Say this. A network partition leaves two halves of a cluster each believing the other is dead, so both elect a leader and both accept writes. When the partition heals you have two divergent histories and no automatic way to reconcile them.
Why. It is prevented by requiring a majority quorum to elect a leader: only one side of a partition can hold a majority, so the minority side refuses to serve.
Watch out. This is why cluster sizes are odd numbers. Three or five nodes have an unambiguous majority; four does not.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] 'Four nodes have no unambiguous majority' is wrong — four nodes have a majority of three. The real argument against even sizes: four tolerates one failure, the same as three, so it adds cost without fault tolerance, and a 2–2 split leaves neither side with quorum. Also: a deposed leader on the minority side can still serve stale reads until it learns of a higher term; Raft prevents this with ReadIndex or leader leases.

<a id="m3-q19"></a>

#### Q19. Why does consistent hashing beat modulo hashing?
Say this. With `hash(key) % N`, changing N changes the destination of almost every key - add one server and you have to move nearly all your data. Consistent hashing places both servers and keys on a ring and assigns each key to the next server clockwise, so adding a server only moves the keys between it and its predecessor - roughly 1/N of the data.
Why. The modulo binds every key to the current server count. The ring binds each key to a position, and positions do not change when membership does.
Watch out. Plain rings distribute unevenly, so real implementations use virtual nodes - each physical server occupies many ring positions, which smooths the distribution and makes rebalancing granular. Mention that; it is the follow-up.
<a id="m3-q20"></a>

#### Q20. What does CAP actually say, and what is the common misreading?
Say this. It says that when a network partition occurs, you must choose between consistency and availability - you cannot have both. The misreading is "pick two of three", as if you could trade away partition tolerance. You cannot: partitions are a fact of networks, not a design choice. So the real choice is CP or AP, and only during a partition.
Why. When there is no partition you can have both, which is why PACELC extends it: else, in normal operation, you still trade latency against consistency.
Watch out. This is the single most commonly botched distributed-systems question, so getting it right is disproportionately valuable. Say "partition tolerance is not optional" explicitly.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Define the terms when you answer: in CAP, C means linearizability (not ACID consistency) and A means every non-failed node returns a non-error response. Many real systems are neither strictly CP nor AP.

<a id="m3-q21"></a>

#### Q21. Strong, eventual, or causal consistency?
Say this. Strong means every read sees the latest write, as if there were one copy. Eventual means replicas converge if writes stop, with no ordering promise in the meantime. Causal is in between: operations that are causally related are seen in order by everyone, while unrelated ones may be seen in any order.
Why. Causal is usually what users actually need. A reply appearing before the message it replies to is unacceptable; two unrelated posts arriving in different orders is not.
Watch out. Anchor it: eventual consistency is fine for a view counter, unacceptable for an account balance. Concrete examples land far better than definitions.
<a id="m3-q22"></a>

#### Q22. Why is Redis being single-threaded a feature?
Say this. Because every command is atomic with no locking, no context switches and no cache-line contention. That makes the implementation simple and the latency extremely predictable - and it is not the bottleneck anyway, since Redis is usually limited by network and memory bandwidth rather than CPU.
Why. Concurrency in a data structure server means locks, and locks mean contention and complexity. Removing concurrency removes an entire class of bugs and gives you atomicity for free.
Watch out. Modern Redis does use threads for I/O and background tasks - command execution is what stays single-threaded. And one slow command, like `KEYS *` on a large database, blocks everything. That is the real operational consequence.
<a id="m3-q23"></a>

#### Q23. LRU, LFU or TTL?
Say this. LRU evicts what has not been touched recently and is the sensible default - it tracks recency, which usually predicts reuse. LFU evicts what is used least often, which is better when popularity is stable but worse when it shifts, because an old hot item lingers. TTL is not really an eviction policy - it is a correctness tool for bounding staleness.
Why. LRU adapts fast and can be fooled by a large scan that evicts everything useful. LFU resists that but adapts slowly.
Watch out. You usually want TTL plus LRU: TTL bounds how wrong the data can be, LRU bounds how much memory it uses. They answer different questions.

<a id="m3-part-d"></a>

## PART D - Messaging (your strongest area - own it)

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m3-q24"></a>

#### Q24. Explain the delivery guarantees.
Say this. At-most-once: send and do not retry - you may lose messages. At-least-once: retry until acknowledged - you may get duplicates. Exactly-once: no duplicates and no loss, which is not achievable as a delivery guarantee. Almost every real queue, including SQS, gives at-least-once.
Why. The impossibility is simple: after sending, the sender either gets an acknowledgement or it does not. If it does not, it cannot distinguish "the message was lost" from "the acknowledgement was lost", so it must choose between resending and not - duplicate or loss.
Watch out. Say "duplicates are normal, not exceptional". That reframing is what leads to the right design instead of a hunt for a queue that promises exactly-once.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] SQS Standard is at-least-once; SQS FIFO offers exactly-once *processing* within a 5-minute deduplication window (MessageDeduplicationId); Kafka offers exactly-once semantics within Kafka (see M7 Q6). Precise wording: exactly-once delivery to an arbitrary side effect over an unreliable network is impossible; systems offer effectively-once within a bounded scope, and end to end you still need idempotency.

<a id="m3-q25"></a>

#### Q25. So how do you get exactly-once processing?
Say this. At the consumer, not the transport. Make the handler idempotent: give each message a stable business or idempotency key, and write a deduplication record in the same transaction as the effect. If the record already exists, skip. Then a duplicate delivery is harmless.
Why. The transaction is the crucial part. If you write the effect and the dedup record separately, a crash between them leaves you either processing twice or losing the work - you have just moved the problem.
Instead of. If the effect is not transactional - sending an email, calling a third-party API - you cannot get atomicity, so you need an outbox pattern or a compensating action instead.
Watch out. This is exactly what you built in the job platform. Have the dedup table schema in your head - it is the most likely deep-dive of the whole project.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] An outbox makes the *intent* durable and the send retryable — it is still at-least-once. Exactly-once external effects (email, payment, third-party HTTP) need the provider to support idempotency keys (e.g. Stripe's `Idempotency-Key`); otherwise you accept duplicates and reconcile/compensate.

<a id="m3-q26"></a>

#### Q26. What is a visibility timeout and what goes wrong with it?
Say this. When a consumer receives a message it becomes invisible to others for a set period rather than being deleted. If the consumer finishes and deletes it, done. If the consumer crashes, the timeout expires and the message reappears for someone else. What goes wrong: processing takes longer than the timeout, the message reappears, and a second consumer starts the same work while the first is still running.
Why. It is a lease, not a lock. The queue cannot know whether a silent consumer is slow or dead, so it must guess with a timer.
Instead of. Extend the visibility timeout with a heartbeat while working, and size the initial timeout from your p99 processing time, not the average.
Watch out. This is the same problem as a distributed lock lease, and it has the same fix - the connection is worth pointing out.
<a id="m3-q27"></a>

#### Q27. Why do retries need jitter?
Say this. Without it, everything that failed at the same moment retries at the same moment. So a brief downstream blip produces a synchronised wave of retries that keeps the downstream down - a thundering herd. Jitter randomises each delay so the load spreads out.
Why. Exponential backoff alone fixes the rate but not the synchronisation. Both clients wait one second, then two, then four - together, every time.
Watch out. Also cap the total attempts and add a circuit breaker. Retries without a breaker amplify an outage instead of riding it out - retrying harder against a dying service is what turns a blip into an incident.
<a id="m3-q28"></a>

#### Q28. What is a dead letter queue and what do you actually do with it?
Say this. After N failed attempts a message is moved to a separate queue instead of being retried forever. That stops one poison message blocking the pipeline and preserves it for inspection. Operationally: alert on DLQ depth, inspect the payload and the error, fix the cause, then replay.
Why. Without it, a message that can never succeed is retried indefinitely, consuming capacity and hiding the failure. The DLQ makes the failure visible and bounded.
Watch out. "A DLQ nobody monitors is a data loss mechanism with extra steps." Alerting on depth and having a replay path is the part most candidates never mention.
<a id="m3-q29"></a>

#### Q29. SQS, RabbitMQ or Kafka?
Say this. SQS is a managed work queue - a message is consumed and deleted, scaling consumers is trivial, DLQ is built in, and there is no infrastructure to run. RabbitMQ is a broker with rich routing - exchanges, topics, per-message acknowledgement - when the routing logic is the hard part. Kafka is a durable partitioned log: consumers track their own offsets, messages remain after being read, so you get replay, multiple independent consumer groups, and ordering within a partition.
Why. The core distinction is queue versus log. A queue forgets; a log remembers. If you might need to reprocess history, or several unrelated consumers need the same stream, you need a log.
Instead of. For your email pipeline SQS was the right call - independent tasks, no replay requirement, already in the AWS estate, managed retry and DLQ. Say that; a justified simple choice beats an unjustified sophisticated one.
<a id="m3-q30"></a>

#### Q30. Explain Kafka partitions, offsets and consumer groups.
Say this. A topic is split into partitions, each an append-only ordered log. Every message has an offset - its position. A consumer group has each partition assigned to exactly one consumer in the group, and each consumer commits its offset. So parallelism is bounded by partition count, and ordering is guaranteed within a partition but not across the topic.
Why. That design is why Kafka scales: no per-message bookkeeping, just a sequential file and a cursor per consumer. It is also why more consumers than partitions gains you nothing.
Watch out. If you need ordering per entity, partition by that entity's key - all events for one user land in one partition and stay ordered. That is the standard answer to "how do you keep ordering at scale".

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] 'More consumers than partitions gains nothing' is true for classic consumer groups. Kafka 4.x 'share groups' (KIP-932, Queues for Kafka) allow several consumers per partition — check their current GA status before relying on it.

<a id="m3-q31"></a>

#### Q31. How do you guarantee ordering, and what does it cost?
Say this. Ordering only exists within a single sequential path - one FIFO queue, or one Kafka partition, or one consumer. So you get it by routing everything that must be ordered through one path, keyed by entity. It costs parallelism: that path is now a serial bottleneck, and a slow message blocks everything behind it.
Why. Order and parallelism are fundamentally in tension. Processing two things at once means you cannot promise which finishes first.
Watch out. The good design move is to narrow the ordering requirement - usually you need ordering per user or per document, not globally. Saying that turns an impossible requirement into an easy one.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Ordering within a partition also needs the idempotent producer (`enable.idempotence=true`, default since Kafka 3.0) or `max.in.flight.requests.per.connection=1`, otherwise retries can reorder messages. SQS FIFO orders per MessageGroupId. Processing one partition in parallel breaks the order.

<a id="m3-q32"></a>

#### Q32. What is backpressure and why does it matter?
Say this. It is the downstream telling the upstream to slow down, rather than silently accumulating work. Without it, a fast producer and a slow consumer means an unbounded queue - growing memory, growing latency, and eventually a crash or an out-of-memory kill.
Why. A bounded buffer converts a memory problem into a latency problem, which is nearly always the better failure. You want to be slow, not dead.
Watch out. `Channel<T>` with a bounded capacity is the in-process version. Queue depth alarms and consumer autoscaling are the distributed version. Naming both shows range.
<a id="m3-q33"></a>

#### Q33. What is the outbox pattern and what problem does it solve?
Say this. The dual-write problem: you need to update the database and publish an event, and there is no transaction spanning both. If the publish fails after the commit you have lost the event; if it succeeds and the commit fails you have published a lie. The outbox writes the event into a table in the same transaction as the data change, and a separate process reads that table and publishes.
Why. Now there is exactly one atomic operation. The publish becomes a retryable at-least-once step, which combined with idempotent consumers is correct.
Watch out. It gives at-least-once publishing, not exactly-once, so consumers still need idempotency. This is a Month 4 topic but it belongs with messaging - and it is a strong thing to have in your project.

<a id="m4-part-c"></a>

## PART C - The hard parts of distributed systems

*Source: Q-and-A/M4_Design_and_Distributed_Systems.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m4-q13"></a>

#### Q13. Why is two-phase commit avoided in modern systems?
Say this. Because it blocks. The coordinator asks everyone to prepare, then tells everyone to commit. If the coordinator dies after the prepare phase, every participant is holding locks and cannot decide alone whether to commit or abort - so they wait, holding those locks, until it comes back. It converts one node's failure into everyone's unavailability.
Why. The participants have promised they can commit, so they cannot unilaterally abort; but they have not been told to, so they cannot commit. There is no safe local decision.
Instead of. A saga: a sequence of local transactions, each with a compensating action, so every step commits immediately and failure is handled by compensating rather than by holding locks. You trade atomicity for availability and accept temporary inconsistency.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] '2PC is avoided in modern systems' is too absolute. It is avoided *across independently owned services*. It is used inside Spanner, CockroachDB and YugabyteDB, where every participant is a consensus-replicated group so coordinator failure is masked; Kafka transactions use a 2PC-style protocol with a replicated coordinator.

<a id="m4-q14"></a>

#### Q14. Explain Raft leader election.
Say this. Every node has a randomised election timeout. A follower that hears nothing from a leader becomes a candidate, increments the term, and requests votes. A node grants one vote per term to the first candidate whose log is at least as up to date as its own. A candidate with a majority becomes leader and starts sending heartbeats.
Why. Randomised timeouts prevent everyone becoming a candidate at once. Requiring a majority guarantees at most one leader per term, and the log-freshness rule guarantees no committed entry is ever lost.
Watch out. Terms are a logical clock. A message from an older term is rejected, which is what makes a returning stale leader harmless.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Log freshness guarantees no committed entry is lost' also needs Raft's rule that a leader only commits entries from its *current term* by counting replicas (Raft paper, Figure 8).

<a id="m4-q15"></a>

#### Q15. Why can a distributed lock not be made safe with timeouts alone?
Say this. Because the lock holder can be paused - a long GC pause, a slow disk, a descheduled VM - past the lease expiry without knowing it. The lock is released, another client acquires it, and then the first one wakes up and continues, still believing it holds the lock. Now two clients are in the critical section and neither is wrong from its own point of view.
Why. The lease expires in real time, but the holder's belief expires only when it checks - and it cannot check atomically with the work it is doing.
Instead of. A fencing token: the lock service issues a monotonically increasing number with each grant, and the protected resource rejects any write with a token lower than the highest it has seen. The stale holder's write is refused by the resource itself.
Watch out. This is Kleppmann's critique of Redlock, and it is a genuinely senior topic. Knowing the fencing-token answer sets you apart.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Fencing tokens only work if the protected resource checks them, and many (S3, third-party APIs) cannot. The alternative is a conditional write: ETag/`If-Match`, or compare-and-set on a version column.

<a id="m4-q16"></a>

#### Q16. What is the dual-write problem?
Say this. You need to change the database and publish an event, and there is no transaction spanning both. Whichever you do first, a crash in between leaves the system inconsistent: commit then fail to publish means the event is lost; publish then fail to commit means you announced something that did not happen.
Why. There is no ordering that fixes it, because the failure window exists in both orders. You need to make it one atomic operation, which is what the outbox does.
Instead of. The outbox: write the event to a table in the same transaction as the data change, and have a separate publisher read that table. One commit, then an at-least-once publish that can safely be retried.
<a id="m4-q17"></a>

#### Q17. Choreography or orchestration for a saga?
Say this. Choreography: each service reacts to events and emits its own, with no central controller - loosely coupled, no single point of failure, but the overall flow exists nowhere and is very hard to debug. Orchestration: one coordinator drives each step explicitly - the flow is visible in one place and easy to reason about, at the cost of coupling and a component that must stay available.
Why. It is the classic distributed trade-off: emergent behaviour is resilient and opaque, centralised behaviour is clear and coupled.
Watch out. For anything with money or compliance in it, prefer orchestration. When someone asks "why did this order not ship", you want one place to look.
<a id="m4-q18"></a>

#### Q18. Explain the circuit breaker states, and why retries alone amplify an outage.
Say this. Closed - calls pass through, failures are counted. Open - the threshold was crossed, so calls fail immediately without touching the downstream. Half-open - after a timeout, let a trial trickle through; success closes it, failure re-opens it. Retries alone amplify because a struggling service receives more load exactly when it can least handle it, so it never recovers.
Why. The breaker converts a slow failure into a fast one, which protects your own threads and gives the downstream room to recover. Failing fast is a feature.
Watch out. Retry plus breaker plus timeout plus jitter is the complete set. Any one on its own is incomplete, and naming all four is the answer.
<a id="m4-q19"></a>

#### Q19. What is a bulkhead and what does it protect?
Say this. Separate resource pools per dependency, so exhausting one cannot starve the others. If all your threads or connections are in one pool and one downstream goes slow, every request queues behind it - including ones that never needed that dependency.
Why. It is named after ship compartments: the point is to make one flooded compartment survivable rather than fatal.
Watch out. This is a very common real outage shape: an unrelated feature goes down and takes the whole API with it because they shared a connection pool.
<a id="m4-q20"></a>

#### Q20. What are RED and USE?
Say this. RED is for services: Rate, Errors, Duration - how many requests, how many failed, how long they took. USE is for resources: Utilisation, Saturation, Errors - how busy, how much queuing, how many faults. RED tells you the user is unhappy; USE tells you which resource is why.
Why. They are complementary because a service can be slow with no resource saturated - waiting on a downstream - and a resource can be saturated with users still happy.
Watch out. Pair it with the four golden signals - latency, traffic, errors, saturation - and say they overlap deliberately. Also: measure p95 and p99, never the average. The average hides exactly the requests people complain about.
<a id="m4-q21"></a>

#### Q21. Why do correlation IDs matter, and where do they have to flow?
Say this. They are the only way to reconstruct one logical operation across many services and asynchronous hops. The ID must be generated at the edge, put in the logging context, and propagated through every boundary - HTTP headers, and crucially the message metadata when you enqueue, so the worker logs under the same ID as the API.
Why. Without it, a failure in a worker is a log line with no path back to the request that caused it. With it, one search reconstructs the whole story.
Watch out. The queue hop is the one people miss. You built this in week 16 - "trace one job end to end using only your logs" is exactly this, and it is a great thing to have done.
<a id="m4-q22"></a>

#### Q22. What is an SLI, an SLO, and an error budget?
Say this. An SLI is the measurement - "99.2% of requests succeeded in under 300ms". An SLO is the target - "99.9% under 300ms". The error budget is the allowed shortfall: at 99.9% you may fail 0.1%, which is about 43 minutes a month.
Why. The budget turns reliability into a spendable resource. Budget remaining means you can ship risky changes; budget exhausted means you stop feature work and fix reliability. It replaces arguing with arithmetic.
Watch out. 100% is never the target - it is unachievable and the last fraction costs more than it is worth. Saying that shows you understand reliability as an engineering trade rather than an aspiration.


## Distributed systems — prompts and answers

<a id="qs-3"></a>

### 3. Distributed systems — missing important topics

*Source: Q-and-A/system-designdistributed-systems foundation.docx (prompt list). Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Month 7 covers a lot, but I'd still add:
- What is a distributed system's failure model?
- What is a network partition?
- What is split-brain?
- What is quorum?
- Why does majority voting help?
- What is leader/follower replication?
- What happens when the leader dies?
- What is leader lease vs leader election?
- What is gossip protocol?
- What is vector clock?
- What is Lamport clock?
- Why do distributed systems need logical clocks?
- What is clock skew?
- Why can't you rely on wall-clock timestamps for ordering?
- What is monotonic clock?
- What is distributed tracing?
- What is OpenTelemetry?
- What is backpressure in distributed systems?
- How do you prevent cascading failures?
- How do you handle partial failure?
- What is graceful degradation?
- What is load shedding?
- What is admission control?
- What is retry storm?
- What is exponential backoff with jitter?
- What is request hedging and when can it make things worse?
The clock/time questions are especially worth adding because they often separate basic distributed-systems knowledge from deeper understanding.


<a id="gap-03"></a>

#### Answers to the section 3 prompts (written 13 Oct 2026, kept in full)

Practice for every card below: Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

<a id="gap-03-001"></a>


#### GAP-03-001 — What is a distributed system's failure model?

**Answer / starting outline.** Define what can fail: process crash, message loss/delay/duplication, network partition, disk loss, clock skew and possibly malicious behavior. Also define recovery and timeout assumptions. An algorithm proven under crash-only faults may not tolerate arbitrary malicious nodes.



<a id="gap-03-002"></a>


#### GAP-03-002 — What is a network partition?

**Answer / starting outline.** A network partition separates nodes that cannot communicate reliably even though they may be running. Timeouts cannot distinguish a failed node from a slow or partitioned one. Specify which side may serve which operations and how divergence is resolved.



<a id="gap-03-003"></a>


#### GAP-03-003 — What is split-brain?

**Answer / starting outline.** Split-brain means multiple nodes/groups act as authoritative for the same state when only one should. Avoid unsafe writes with majority-backed coordination, fencing at protected resources and a controlled failover protocol. A load balancer alone does not establish authority.



<a id="gap-03-004"></a>


#### GAP-03-004 — What is quorum?

**Answer / starting outline.** A quorum is a sufficiently large participating set under a coordination rule. Majority quorums overlap, which helps prevent conflicting decisions when voting/state rules are respected. It is not simply “ask many nodes and trust the largest value.”



<a id="gap-03-005"></a>


#### GAP-03-005 — Why does majority voting help?

**Answer / starting outline.** Two majorities from the same fixed membership must share at least one node. If that node follows safe voting/recording rules, incompatible decisions can be prevented. Membership changes require a safe protocol; arbitrary sets of different members need not overlap.



<a id="gap-03-006"></a>


#### GAP-03-006 — What is leader/follower replication?

**Answer / starting outline.** The leader coordinates writes and followers reproduce them. Acknowledgment rules determine what survives failover. Reads from followers may be stale. Leadership, replication and durability must be considered together.



<a id="gap-03-007"></a>


#### GAP-03-007 — What happens when the leader dies?

**Answer / starting outline.** Followers detect missing heartbeats and a coordination protocol may elect a new leader. The old leader might still be alive behind a partition, so new authority must be fenced/validated. Recovery may lose unreplicated writes unless the acknowledgment guarantee rules that out.



<a id="gap-03-008"></a>


#### GAP-03-008 — What is leader lease vs leader election?

**Answer / starting outline.** Election chooses an authority through a protocol; a lease grants time-bounded authority under clock/timing assumptions. A lease holder can pause past expiry and continue acting unless protected resources reject stale tokens. A lease is not a complete consensus protocol.



<a id="gap-03-009"></a>


#### GAP-03-009 — What is gossip protocol?

**Answer / starting outline.** Gossip spreads membership/state by peers exchanging information with subsets of other peers. It scales dissemination without every node contacting all nodes each time. Convergence is gradual; gossip alone does not provide linearizable writes or immediate failure certainty.



<a id="gap-03-010"></a>


#### GAP-03-010 — What is vector clock?

**Answer / starting outline.** A vector clock keeps a component per participant to track causal history. One vector dominating another indicates causal order; incomparable vectors can represent concurrent updates. It helps detect conflicts but increases metadata and still requires a resolution policy.



<a id="gap-03-011"></a>


#### GAP-03-011 — What is Lamport clock?

**Answer / starting outline.** A Lamport clock is a logical counter advanced locally and on message receipt: set it above both local and received counters. If A causally precedes B, its clock is smaller. The reverse is not guaranteed, so it cannot by itself distinguish all concurrency.



<a id="gap-03-012"></a>


#### GAP-03-012 — Why do distributed systems need logical clocks?

**Answer / starting outline.** Logical clocks describe causal relationships without trusting synchronized wall clocks. Message delays and physical-clock changes make timestamps unreliable for strict causal order. Choose Lamport or vector metadata based on whether a total ordering convention or concurrency detection is needed.



<a id="gap-03-013"></a>


#### GAP-03-013 — What is clock skew?

**Answer / starting outline.** Clock skew is the difference between nodes’ clock readings at a real instant. Clock drift is differing rates over time. Synchronization reduces but does not eliminate error; designs should state tolerated uncertainty rather than assume exact agreement.



<a id="gap-03-014"></a>


#### GAP-03-014 — Why can't you rely on wall-clock timestamps for ordering?

**Answer / starting outline.** A later real-world event may carry an earlier wall timestamp due to skew or clock adjustment. For business order, use authoritative sequencing, logical clocks or defined conflict rules. A timestamp can still be useful metadata without being a complete ordering guarantee.



<a id="gap-03-015"></a>


#### GAP-03-015 — What is monotonic clock?

**Answer / starting outline.** A monotonic clock does not move backward within its defined scope and is appropriate for elapsed durations/timeouts. Wall time gives calendar timestamps. Do not compare unrelated monotonic-clock readings across machines or persist them as globally meaningful instants.



<a id="gap-03-016"></a>


#### GAP-03-016 — What is distributed tracing?

**Answer / starting outline.** Distributed tracing represents a request/workflow as related spans across services, linked by propagated context. It reveals which stage contributed latency/error. Sampling and asynchronous message context must be designed; traces do not replace metrics or correct logs.



<a id="gap-03-017"></a>


#### GAP-03-017 — What is OpenTelemetry?

**Answer / starting outline.** OpenTelemetry supplies APIs, SDKs, instrumentation and collection/export conventions for telemetry. It is not itself a storage/query dashboard. Instrument spans, useful metrics and correlated logs; export to a chosen backend and manage sampling, sensitive fields and cardinality.



<a id="gap-03-018"></a>


#### GAP-03-018 — What is backpressure in distributed systems?

**Answer / starting outline.** Distributed backpressure limits accepted or in-flight work when downstream capacity is insufficient. Propagate budgets where possible and use bounded queues/concurrency, rejection or slower producers. Queuing indefinitely converts a capacity problem into latency and resource failure.



<a id="gap-03-019"></a>


#### GAP-03-019 — How do you prevent cascading failures?

**Answer / starting outline.** Prevent cascades with deadlines, bounded retries with jitter, circuit breakers where useful, bulkheads, admission control and graceful degradation. Retrying at every service layer can multiply traffic; use one coherent retry budget and preserve operation semantics.



<a id="gap-03-020"></a>


#### GAP-03-020 — How do you handle partial failure?

**Answer / starting outline.** A partial failure means one component/operation fails while others succeed. Record durable operation state, make retries idempotent, reconcile uncertain outcomes and use compensations where appropriate. Do not infer that a timeout means the remote side effect did not happen.



<a id="gap-03-021"></a>


#### GAP-03-021 — What is graceful degradation?

**Answer / starting outline.** Preserve useful bounded functionality under failures, such as serving known-stale read-only data. Communicate degraded state where relevant. Avoid silently weakening authorization, financial or inventory invariants.



<a id="gap-03-022"></a>


#### GAP-03-022 — What is load shedding?

**Answer / starting outline.** Load shedding rejects or drops selected work to keep the system viable during overload. Prefer explicit 429/503 or priority-aware rejection to unlimited queuing. Specify retry guidance and which work is never safely droppable.



<a id="gap-03-023"></a>


#### GAP-03-023 — What is admission control?

**Answer / starting outline.** Admission control decides whether to accept work based on available capacity, tenant quotas, priority or a concurrency budget. An accepted job should have a defined durable meaning. Rate limits bound arrival rate; concurrency limits bound simultaneous work.



<a id="gap-03-024"></a>


#### GAP-03-024 — What is retry storm?

**Answer / starting outline.** A retry storm is repeated correlated retry traffic that worsens an outage. Limit attempts, use deadlines and jitter, avoid stacked retry layers, and distinguish transient from permanent failures. Retrying unsafe effects requires an idempotency/reconciliation contract.



<a id="gap-03-025"></a>


#### GAP-03-025 — What is exponential backoff with jitter?

**Answer / starting outline.** Exponential backoff grows the wait between attempts, capped at a maximum. Jitter randomizes waits so clients do not retry together. Bound total elapsed time and attempts, honor useful retry signals, and do not retry invalid input or authorization failures.



<a id="gap-03-026"></a>


#### GAP-03-026 — What is request hedging and when can it make things worse?

**Answer / starting outline.** Hedging duplicates a slow request to reduce tail latency. It can worsen saturated systems by adding work, and duplicate side effects are unsafe without suitable semantics. Use measured delay thresholds, bounded volume and cancellation for operations safe to repeat.




<a id="add-ds-map"></a>

## ➕ Distributed systems map — the order to learn it

Learn these ten topics in this order. Each one needs the one before it. Read the one sentence, then follow the link for the detail.

| # | Topic | One sentence | Where |
|---|---|---|---|
| 1 | Failure models | First write down what can fail (crash, lost or late message, partition, long pause, wrong clock), because a design is only "correct" against a stated failure model. | [GAP-03-001](#gap-03-001), [GAP-03-002](#gap-03-002) |
| 2 | Replication | Keep copies of the data on several machines so one crash loses nothing, and accept that copies can lag behind the leader. | [Q16](#m3-q16), [GAP-03-006](#gap-03-006) |
| 3 | Partitioning | Split data by key across machines so no machine holds everything, and pick keys that spread the load evenly. | [Q19](#m3-q19) |
| 4 | Consistency | Decide what a reader may see when copies disagree, from linearizable down to eventual. | [Consistency ladder](#add-ds-consistency) |
| 5 | Consensus | Let a group agree on one value or one leader even when some members fail, by using a majority (Raft, Paxos). | [Q14](#m4-q14), [Q18](#m3-q18) |
| 6 | Messaging | Move work and events between services through a broker, and accept that delivery is at-least-once in practice. | [Part D](#m3-part-d), [Broker table](#add-ds-rabbitmq-sqs) |
| 7 | Idempotency | Make every handler safe to run twice, because retries and redelivery make duplicates normal. | [Delivery and idempotency](#add-ds-delivery) |
| 8 | Transactions across services | Keep several services correct without one big transaction, using the outbox, the inbox and sagas. | [Outbox](#add-ds-outbox), [Sagas](#add-ds-sagas) |
| 9 | Resilience | Stop one slow part from taking down everything, with timeouts, bounded retries, breakers, bulkheads and load shedding. | [Retries](#add-ds-retries), [Resilience](#add-ds-resilience) |
| 10 | Observability | See what the system does (metrics, logs, traces, correlation IDs) so you find the cause of a failure fast. | [Q20](#m4-q20), [Q21](#m4-q21), [GAP-03-016](#gap-03-016) |

Time and clocks belong between topics 1 and 4. Read [Clocks](#add-ds-clocks) right after failure models.

Your job platform touches all ten. In an interview, name one example per topic from it: a worker crash (1), a PostgreSQL replica (2), queues per job type (3), read-your-writes for a new job (4), Raft inside RabbitMQ quorum queues (5), RabbitMQ (6), the dedup table (7), the outbox (8), retries and DLQ (9), one correlation ID from API to worker (10).

<a id="add-ds-delivery"></a>

## ➕ Delivery semantics and idempotency patterns

[Q24](#m3-q24) and [Q25](#m3-q25) give the basic idea. This section gives the patterns and the code.

### The three semantics

| Semantics | How you get it | What can still go wrong |
|---|---|---|
| At-most-once | Ack the message (or commit the offset) **before** you do the work. Never retry. | A crash after the ack and before the work loses the message. Fine only for data you can lose: metric samples, "user is typing" signals. |
| At-least-once | Ack **after** the work is committed. Retry on error or timeout. The producer retries until the broker confirms (publisher confirms). | Duplicates: crash after the work but before the ack; a lost ack; a visibility timeout that expired; a producer retry after a lost confirm; the outbox relay publishing again. Redelivery can also change the order. |
| Effectively-once | At-least-once delivery **plus** an idempotent handler (dedup key committed with the effect). Inside Kafka only: Kafka transactions. | It is only as good as its scope. The dedup window can end (SQS FIFO keeps 5 minutes). Dedup rows can be deleted too early. Effects outside your database (email, HTTP call) are not covered. The key can be wrong (a new ID per delivery instead of per business operation). |

Say it like this: "The broker gives at-least-once. I make processing effectively-once with idempotency."

### Pattern 1 — Idempotency key on the API

The client sends a unique key with an unsafe request, for example `Idempotency-Key: 7f3c...` on `POST /jobs`. If the network fails, the client sends the **same** key again. The server must return the first answer, not create a second job.

The server stores three things: the key, a **fingerprint** of the request, and the **stored response**.

```sql
CREATE TABLE idempotency_keys (
    tenant_id      uuid        NOT NULL,
    idem_key       text        NOT NULL,
    request_hash   bytea       NOT NULL,   -- SHA-256 of method + path + canonical body
    status_code    int         NULL,       -- NULL = still in progress
    response_body  jsonb       NULL,
    created_at     timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (tenant_id, idem_key)
);
```

Rules:

- **Scope the key by tenant or user.** Client A must never get client B's response with a guessed key.
- **Same key, same fingerprint, finished:** return the stored status code and body.
- **Same key, same fingerprint, still running:** return `409 Conflict`. The client retries later.
- **Same key, different fingerprint:** return an error (the IETF draft "Idempotency-Key HTTP header" suggests `422`, verify). The client has a bug. Never return the old answer for a different request.
- **Save the response in the same transaction as the business change** (the new job row). Then a crash rolls back both, and you never have a "finished" key without the job.
- **Keep keys longer than the client's retry window.** Stripe documents 24 hours (verify).
- If the request calls an external system, one transaction is not possible. Commit the key row first as "in progress" with a lock-until time, so a crashed request can be taken over later.

### Pattern 2 — Consumer dedup table in the SAME transaction

```sql
CREATE TABLE processed_messages (
    consumer      text        NOT NULL,   -- e.g. 'job-worker'
    message_id    uuid        NOT NULL,   -- stable ID set by the producer
    processed_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (consumer, message_id)
);
```

`consumer` is in the key because with fan-out, two different consumers get the same message. Each must process it once.

The message ID must be set **once by the producer** (for example the outbox row's `message_id`). A broker delivery tag is not stable across redeliveries.

### Pattern 3 — Inbox

The dedup table above is the simplest inbox. A full inbox also stores the message and processes it later. See [the inbox part of the outbox section](#add-ds-outbox).

### Pattern 4 — Conditional writes

Only write if the data is still what you read.

```sql
UPDATE jobs
SET    status = 'Completed', version = version + 1
WHERE  id = @id AND version = @expectedVersion;
-- 0 rows updated = someone changed it first. Reload, then decide.
```

- **HTTP:** the server sends an `ETag`. The client sends `If-Match: "<etag>"`. If the resource changed, the server returns `412 Precondition Failed`.
- **EF Core:** a concurrency token. A conflict throws `DbUpdateConcurrencyException`. With Npgsql you can use PostgreSQL's `xmin` column as the token.
- **Redis:** `SET key value NX`, or a Lua script. The general name is compare-and-set (CAS).

### Pattern 5 — Natural idempotency (SET vs INCREMENT)

| Not idempotent | Idempotent version |
|---|---|
| `UPDATE accounts SET balance = balance + 100` | Insert a ledger row with a unique `transfer_id`; the balance is the sum of the ledger. A second insert fails on the unique key. |
| Event "progress increased by 10%" | Event "progress is now 70%" |
| `POST /jobs` | `PUT /jobs/{clientGeneratedId}` |

`SET status = 'Completed'` gives the same result if it runs twice. `balance + 100` does not. When you can, send **state**, not **change**.

### Why the two simple orders are wrong

**Marker first, then work (two transactions):**

```
Tx 1: INSERT processed_messages (msg-7)   COMMIT
      --- worker crashes here ---
Redelivery: INSERT msg-7 -> conflict -> "already done" -> ack
Result: the work NEVER happened. You built at-most-once by accident.
```

**Work first, then marker (two transactions):**

```
Tx 1: UPDATE accounts SET balance = balance + 100   COMMIT
      --- worker crashes here ---
Redelivery: no marker -> do the work again -> balance + 200
Result: the work happened TWICE.
```

The problem in both: two commits, and a crash between them. The fix: **one** commit for both.

### The correct version — one transaction

Pseudo-code, Npgsql + Dapper style:

```csharp
public async Task HandleAsync(JobCompleted msg, CancellationToken ct)
{
    await using var conn = await _dataSource.OpenConnectionAsync(ct);
    await using var tx = await conn.BeginTransactionAsync(ct);

    // 1. Claim the message ID. The primary key does the dedup.
    int inserted = await conn.ExecuteAsync(
        """
        INSERT INTO processed_messages (consumer, message_id)
        VALUES ('job-worker', @MessageId)
        ON CONFLICT (consumer, message_id) DO NOTHING
        """, new { msg.MessageId }, tx);

    if (inserted == 0)
    {
        await tx.RollbackAsync(ct);   // duplicate: the work is already committed
        return;                       // the caller acks
    }

    // 2. The business change, in the SAME transaction.
    await conn.ExecuteAsync(
        "UPDATE jobs SET status = 'Completed', result = @Result WHERE id = @JobId",
        new { msg.Result, msg.JobId }, tx);

    // 3. One commit: both rows exist, or neither.
    await tx.CommitAsync(ct);
}
// The caller acks the broker message only AFTER HandleAsync returns.
```

What happens at each crash point:

| Crash or race | What happens next |
|---|---|
| Crash before commit | PostgreSQL rolls back the marker and the work together. Redelivery does the work once. |
| Crash after commit, before ack | The marker exists. Redelivery hits `ON CONFLICT`, skips, and acks. |
| Two workers get the same message at once | The second `INSERT` waits on the first one's uncommitted row. If the first commits, the second gets a conflict and skips. If the first rolls back, the second goes on. |

Two more rules:

- **External effects are not covered.** An email or HTTP call cannot join the transaction. Write an outbox row in this transaction instead, and send the email from the outbox with the provider's idempotency key (see the correction under [Q25](#m3-q25)).
- **Keep dedup rows longer than any redelivery or replay window.** If someone can replay the DLQ after 14 days, keep the rows for 30 days. Delete older rows in small batches.

<a id="add-ds-outbox"></a>

## ➕ The transactional outbox in depth

[Q33](#m3-q33) and [Q16 (dual write)](#m4-q16) explain why you need it. This section shows how to build it.

### Schema

```sql
CREATE TABLE outbox (
    id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message_id      uuid        NOT NULL UNIQUE,   -- consumers dedup on this
    aggregate_type  text        NOT NULL,          -- 'job'
    aggregate_id    uuid        NOT NULL,          -- the ordering key
    aggregate_ver   int         NOT NULL,          -- version of the job after this change
    event_type      text        NOT NULL,          -- 'JobCreated'
    payload         jsonb       NOT NULL,
    headers         jsonb       NOT NULL DEFAULT '{}',  -- correlation ID, trace context
    created_at      timestamptz NOT NULL DEFAULT now(),
    sent_at         timestamptz NULL,
    attempts        int         NOT NULL DEFAULT 0,
    last_error      text        NULL
);
CREATE INDEX ix_outbox_unsent ON outbox (id) WHERE sent_at IS NULL;
```

The partial index keeps "find unsent rows" fast even when the table holds many sent rows.

### Write the business row and the outbox row in one transaction

```csharp
await using var tx = await conn.BeginTransactionAsync(ct);
await conn.ExecuteAsync(InsertJobSql, job, tx);                  // status 'Queued', version 1
await conn.ExecuteAsync(InsertOutboxSql, new {
    MessageId = Guid.NewGuid(), JobId = job.Id, EventType = "JobCreated",
    Payload = json, Headers = headersJson }, tx);
await tx.CommitAsync(ct);   // the job and its event exist together, or not at all
```

Never call the broker inside this transaction. The API only writes rows. The relay publishes.

### The relay, option A — polling with `FOR UPDATE SKIP LOCKED`

```csharp
while (!ct.IsCancellationRequested)
{
    await using var tx = await conn.BeginTransactionAsync(ct);

    var rows = (await conn.QueryAsync<OutboxRow>(
        """
        SELECT id, message_id, aggregate_id, event_type, payload, headers
        FROM   outbox
        WHERE  sent_at IS NULL
        ORDER  BY id
        LIMIT  100
        FOR UPDATE SKIP LOCKED
        """, transaction: tx)).ToList();

    foreach (var row in rows)
        await _publisher.PublishAsync(row, ct);   // waits for the broker's publisher confirm

    await conn.ExecuteAsync(
        "UPDATE outbox SET sent_at = now() WHERE id = ANY(@Ids)",
        new { Ids = rows.Select(r => r.Id).ToArray() }, tx);
    await tx.CommitAsync(ct);

    if (rows.Count == 0)
        await Task.Delay(TimeSpan.FromMilliseconds(500), ct);
}
```

Notes:

- `SKIP LOCKED` lets several relay instances run without taking the same rows.
- "Published" must mean "the broker confirmed it". In RabbitMQ, turn on **publisher confirms**. Without them, a publish can be lost and you still mark the row as sent.
- Keep batches small. The transaction stays open while you publish.
- To avoid empty polling, the API can run `NOTIFY outbox` in the same transaction. PostgreSQL delivers it only on commit. The relay waits with `LISTEN outbox`, and keeps a slow poll as a safety net.

### The relay, option B — CDC with Debezium

Debezium reads PostgreSQL's write-ahead log (WAL) through a logical replication slot. Every committed outbox insert becomes an event, **in commit order**. Debezium's Outbox Event Router sends it to a topic, keyed by `aggregate_id`.

- **Good:** no polling load, commit order for free, low delay. You can even delete the outbox row in the same transaction, because the WAL already holds the event.
- **Bad:** more infrastructure (Kafka Connect or Debezium Server). Debezium is Kafka-first; Debezium Server has other sinks, including RabbitMQ (verify).
- **Danger:** if the connector stops, the slot keeps WAL on disk until the disk fills. Set `max_slot_wal_keep_size` (PostgreSQL 13+) and alert on slot lag.

For your project, start with polling. Mention CDC as the next step.

### Ordering per aggregate

- **Several relays break order.** Relay 1 locks row 10 (job X). Relay 2 skips it and publishes row 11 (also job X). Now 11 arrives before 10.
  - Simple fix: **one active relay**. Take leadership with `pg_try_advisory_lock(<constant>)`. Other instances wait.
  - Scale fix: shard relays by `hash(aggregate_id) % N`, one relay per shard.
- **Do not skip ahead.** If publishing row 10 of job X fails, do not publish row 11 of job X.
- **Commit order is not ID order.** The identity value is given at insert time, not at commit time. A poller can see id 11 before the transaction holding id 10 commits. Across different jobs this is fine. For one job: update the job row **first** (this takes its row lock), then insert the outbox row. Put `aggregate_ver` in the event so a consumer can see a gap or an old version.
- **Keep order on the broker side too:** RabbitMQ one queue with Single Active Consumer, or a consistent-hash exchange; SQS FIFO with `MessageGroupId = aggregate_id`; Kafka with key = `aggregate_id`.

### Marking sent and cleanup

- **Delete on send:** the smallest table, but no history for debugging.
- **Mark `sent_at`, then purge:** a nightly job deletes rows older than 7 days, in small batches.
- **Partition by day:** drop old partitions. The cheapest purge, with no table bloat.

Monitor the number of unsent rows, the **age of the oldest unsent row** (alert on this), and relay errors.

### Crash windows

| Crash happens… | Database | Broker | Outcome |
|---|---|---|---|
| Before commit | Nothing (rolled back) | Nothing | Clean. The API returns an error or times out. The client retries with the same idempotency key. |
| After commit, before publish | Job + unsent outbox row | Nothing | Only a delay. The relay restarts, finds the unsent row, and publishes it. |
| After publish, before mark-sent | Outbox row still unsent | Message delivered | The relay publishes it **again**. Consumers see a duplicate with the same `message_id`. |
| Publish timed out (unknown result) | Row unsent | Maybe delivered | The relay retries. Possible duplicate. |

So the outbox gives **at-least-once** publishing. Consumers must still be idempotent: because of rows 3 and 4, because the broker redelivers, and because someone may replay the DLQ.

### The inbox pattern on the consumer side

The inbox is the mirror of the outbox. It has two forms.

1. **Dedup inbox.** Insert the `message_id` in the same transaction as the business change. This is [Pattern 2 above](#add-ds-delivery).
2. **Store-then-process inbox.** The consumer only inserts the message into an `inbox` table (`message_id` primary key, `aggregate_id`, `payload`, `processed_at`, `attempts`) and acks fast. A local processor reads the inbox and does the work.

Why the second form: the broker is free quickly, retries happen locally with your own backoff, you keep an audit trail, and you can process one aggregate in order. The cost: one more table and one more background loop.

Clean old inbox rows the same way as outbox rows. Keep them longer than any replay window.

<a id="add-ds-retries"></a>

## ➕ Retry policy design

[Q27](#m3-q27), [GAP-03-024](#gap-03-024) and [GAP-03-025](#gap-03-025) give the "why". This section is the design.

### Transient or permanent?

| Transient (retry) | Permanent (do not retry) |
|---|---|
| Timeout, connection reset | `400 Bad Request`, `422` validation error |
| `503 Service Unavailable`, `502`, `504` | `401` / `403` (retry will not fix auth) |
| `429 Too Many Requests` (wait for `Retry-After`) | `404` for a resource that should exist (usually a bug) |
| PostgreSQL deadlock (`40P01`) or serialization failure (`40001`) | Message cannot be deserialized |
| Broker or DB failover in progress | Business rule broken ("job type unknown") |

Unknown errors: treat as transient, but with a small limit. A permanent error goes **straight to the DLQ** with its reason. Do not waste five retries on it.

### Bounded attempts

Bound two things:

- **Attempts:** for example 5.
- **Total time:** a deadline. Do not retry if the caller already gave up.

### Exponential backoff with full jitter

Formula (from the AWS Architecture Blog post "Exponential Backoff And Jitter"):

```
ceiling(n) = min(cap, base * 2^n)
delay(n)   = random_between(0, ceiling(n))
```

Example with `base = 1 s`, `cap = 60 s`. The "example delay" column is one random draw.

| Retry n | base × 2^n | Ceiling after cap | Example delay |
|---|---|---|---|
| 0 | 1 s | 1 s | 0.4 s |
| 1 | 2 s | 2 s | 1.7 s |
| 2 | 4 s | 4 s | 0.9 s |
| 3 | 8 s | 8 s | 6.2 s |
| 4 | 16 s | 16 s | 11.0 s |
| 5 | 32 s | 32 s | 3.5 s |
| 6 | 64 s | 60 s | 41.8 s |

```csharp
static TimeSpan FullJitter(int retry, TimeSpan baseDelay, TimeSpan cap)
{
    double ceilingMs = Math.Min(cap.TotalMilliseconds,
                                baseDelay.TotalMilliseconds * Math.Pow(2, retry));
    return TimeSpan.FromMilliseconds(Random.Shared.NextDouble() * ceilingMs);
}
```

In real .NET code use Polly v8 (`RetryStrategyOptions` with `BackoffType = DelayBackoffType.Exponential` and `UseJitter = true`) or `Microsoft.Extensions.Http.Resilience`. Check which jitter formula your Polly version uses (verify).

### Retry budgets

Attempts per request are not enough. In an outage, every request retries, and load can multiply. A **retry budget** limits retries across all requests.

- Example rule: retries may be at most 10% of normal calls. The Google SRE book (chapter "Handling Overload") describes a per-client budget like this. gRPC's "retry throttling" is a token-bucket version of the same idea.
- When the budget is empty, fail fast and let the circuit breaker take over.

### Where to retry — and why layers multiply

You can retry in three places:

1. **Client** — the browser, mobile app or SDK.
2. **Middleware** — an `HttpClient` handler, Polly, a service mesh.
3. **Consumer** — broker redelivery, or your worker's retry logic.

If every layer retries, the attempts **multiply**:

```
API (3 tries) -> Service A (3 tries) -> Service B (3 tries) -> DB
One user click = 3 x 3 x 3 = 27 calls to the DB, at the worst moment.
```

Rules:

- Retry in **one** layer, usually the one closest to the failing call. Other layers fail fast.
- Pass the deadline down, so an inner layer stops when the outer caller has given up.
- Retry only idempotent operations, or operations with an idempotency key.

### Retries in the job platform

| Option | How | Verdict |
|---|---|---|
| `basic.nack(requeue: true)` | The message goes straight back | No delay, a hot loop. Avoid for repeated failures. |
| Retry queues with TTL + DLX | `retry.10s`, `retry.1m`, `retry.10m` queues; when the TTL ends, the message dead-letters back to the main queue | Works well. Fixed delay tiers. |
| PostgreSQL-driven | On failure: `attempt = attempt + 1`, `run_after = now() + backoff`, status back to `Queued` | Best fit when PostgreSQL is the source of truth. The broker message is only a wake-up. |
| Quorum queue `delivery-limit` | RabbitMQ dead-letters after N deliveries | Keep as a safety net under the other options. |

### Poison messages and the DLQ

[Q28](#m3-q28) covers what a DLQ is. Here is the operational side.

**Put context on every DLQ message:** original queue, attempt count, last error and stack trace, first and last failure time, correlation ID, schema version.

**Safe replay:**

- **Fix the cause first.** Replaying into the same bug just fills the DLQ again.
- **Authorisation.** Only an operator role can replay. Log who replayed what and when.
- **Idempotency.** Replay with the **same** `message_id`, so dedup protects you.
- **Rate limit.** Replay slowly, so you do not overload the service you just fixed. SQS's `StartMessageMoveTask` has a messages-per-second setting (verify). Try 10 messages first, then the rest.
- **Stop loops.** Count replays. A message that fails again goes to a "parked" queue for a human.

**Alerting:**

- Alert when DLQ depth is above 0 for important queues, or when it grows fast.
- Alert on the age of the oldest message (SQS: `ApproximateAgeOfOldestMessage`).
- SQS standard queues keep the original enqueue time when moving a message to the DLQ. So set the DLQ retention **longer** than the source queue retention, or messages can expire before anyone looks (verify in the SQS docs).

<a id="add-ds-leases"></a>

## ➕ Leases, heartbeats, visibility timeouts and fencing

[Q26](#m3-q26) (visibility timeout) and [Q15](#m4-q15) (fencing tokens) give the theory. This section builds it for your workers.

### Two ways to claim a job

| Way | How | Who decides "this worker is dead"? |
|---|---|---|
| Database row lease | `UPDATE jobs SET locked_by, locked_until` | The database clock and a reaper |
| Broker lease | SQS visibility timeout; RabbitMQ unacked message | SQS: a timer. RabbitMQ: the channel closes, or `consumer_timeout` fires (default 30 minutes, verify) |

RabbitMQ has no per-message timer. An unacked message stays with a consumer until its channel or connection closes. So with RabbitMQ, use a **database lease** as the real authority. The broker message is only "wake up, job 42 is ready".

### Claim with `FOR UPDATE SKIP LOCKED`

```sql
UPDATE jobs
SET    status       = 'Running',
       locked_by    = @WorkerId,
       locked_until = now() + interval '30 seconds',
       attempt      = attempt + 1          -- the fencing token
WHERE  id = (
         SELECT id
         FROM   jobs
         WHERE  status = 'Queued' AND run_after <= now()
         ORDER  BY priority DESC, created_at
         LIMIT  1
         FOR UPDATE SKIP LOCKED
       )
RETURNING id, type, payload, attempt;
```

- `SKIP LOCKED`: two workers never wait for each other. Each takes a different row.
- Index it: `CREATE INDEX ix_jobs_ready ON jobs (priority DESC, created_at) WHERE status = 'Queued';`
- `attempt` goes up on every claim. It is your **fencing token**.

### Heartbeat: extend the lease

```sql
UPDATE jobs
SET    locked_until = now() + interval '30 seconds'
WHERE  id = @Id AND locked_by = @WorkerId AND attempt = @Attempt AND status = 'Running';
-- 0 rows = you lost the lease. Stop the work now.
```

Send a heartbeat about every third of the lease (every 10 s for a 30 s lease). A long lease means slow recovery after a crash. A short lease means more false expiries during pauses, and more DB writes.

### The reaper (sweeper)

```sql
UPDATE jobs
SET    status = 'Queued', locked_by = NULL, locked_until = NULL,
       run_after = now() + interval '5 seconds'
WHERE  status = 'Running' AND locked_until < now() AND attempt < max_attempts;
```

A second statement sets `status = 'Failed'` when `attempt >= max_attempts`. Run the reaper every few seconds on one instance (use an advisory lock). Count expired leases as a metric. Many expiries mean crashes, or a lease that is too short.

### The paused worker problem

A worker can stop for a while without knowing it: a GC pause, a VM freeze, a network cut. Its lease ends. Another worker takes the job. Then the first worker wakes up and continues.

```
time  Worker A                          DB (job 42)                Worker B
0s    claims job 42                     attempt=1, until=30s
10s   heartbeat ok                      until=40s
12s   ---- long GC pause / network cut ----
40s                                     lease expired
41s                                     reaper: status=Queued
42s                                     attempt=2, until=72s       claims job 42
55s   wakes up, finishes, writes
      result WHERE attempt = 1  ->  0 rows. Rejected.
```

### The fenced write

```sql
UPDATE jobs
SET    status = 'Completed', result = @Result, locked_by = NULL, locked_until = NULL
WHERE  id = @Id AND attempt = @Attempt AND status = 'Running';
-- 0 rows = someone else owns the job now. Throw your result away.
```

The database checks the token, so the old worker cannot overwrite the new one. This is the fencing token from [Q15](#m4-q15), checked by the resource itself.

Fencing protects **your database**. It does not stop an email that the paused worker already sent. For that, use the provider's idempotency key, built from `job_id`, not from `attempt`.

### Clock skew

- Do **all** lease math with the database clock: `now() + interval`, compared with `now()`. Every worker then uses one clock, so worker clock skew cannot break correctness.
- `now()` in PostgreSQL is the **transaction start** time. `clock_timestamp()` is the real current time. In short transactions this does not matter.
- The worker still needs to know when to stop. Start a `Stopwatch` **before** sending the claim, and treat the lease as lost at `lease − safety margin`. A monotonic clock does not jump when NTP corrects the wall clock.

### C# worker sketch with heartbeat

```csharp
var job = await ClaimAsync(workerId, ct);           // the UPDATE ... RETURNING above
if (job is null) { await Task.Delay(pollDelay, ct); continue; }

using var leaseCts = CancellationTokenSource.CreateLinkedTokenSource(ct);

var heartbeat = Task.Run(async () =>
{
    using var timer = new PeriodicTimer(TimeSpan.FromSeconds(10));
    while (await timer.WaitForNextTickAsync(leaseCts.Token))
    {
        bool stillMine = await ExtendLeaseAsync(job.Id, workerId, job.Attempt);
        if (!stillMine) { leaseCts.Cancel(); break; }   // lease lost: stop the work
    }
});

try
{
    var result = await _handler.RunAsync(job, leaseCts.Token);
    bool saved = await CompleteAsync(job.Id, job.Attempt, result);   // fenced write
    if (!saved)
        _log.LogWarning("Lease lost for job {JobId}; result discarded", job.Id);
}
finally
{
    leaseCts.Cancel();
    try { await heartbeat; } catch (OperationCanceledException) { }
}
```

With SQS, the heartbeat is `ChangeMessageVisibility` instead of the SQL update. The visibility timeout can be at most 12 hours.

<a id="add-ds-rabbitmq-sqs"></a>

## ➕ RabbitMQ vs SQS vs Kafka — semantics table

[Q29](#m3-q29) and [GAP-04-013](09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-013) compare them at a high level. This table compares the mechanics. Sources: rabbitmq.com/docs, docs.aws.amazon.com/AWSSimpleQueueService, kafka.apache.org/documentation. Version-specific numbers are marked (verify).

| Topic | RabbitMQ (quorum / classic queues) | Amazon SQS (Standard / FIFO) | Kafka (classic consumer groups) |
|---|---|---|---|
| Model | Broker pushes messages to consumers. A message is deleted on ack. | Managed queue. Consumers poll (long polling up to 20 s). Deleted on `DeleteMessage`. | Append-only log. Consumers pull and keep offsets. Records stay after reading. |
| Ack | `basic.ack` per message (or "all up to this tag") | `DeleteMessage` with the receipt handle | Commit an offset per partition. One number covers all earlier records. |
| Negative ack | `basic.nack` / `basic.reject`. `requeue=true` puts it back; `false` dead-letters or drops it. | No nack. Let the visibility timeout end, or set it to 0 for a fast retry. | None. Do not commit and seek back, or write to a retry topic. Share groups add per-record release and reject (verify). |
| Prefetch / flow | `basic.qos` prefetch = most unacked messages per consumer | Up to 10 messages per receive; limits on in-flight messages (verify) | `max.poll.records`, `fetch.max.bytes` |
| Redelivery | On requeue, or when the channel closes. `redelivered` flag. Quorum queues count deliveries. | After the visibility timeout. `ApproximateReceiveCount` attribute. | After a restart or rebalance, from the last committed offset. A whole batch can repeat. |
| Lease | No timer per message. `consumer_timeout` (default 30 min, verify) closes a channel that holds a message too long. | Visibility timeout: default 30 s, max 12 h. Extend with `ChangeMessageVisibility`. | Partition ownership. `max.poll.interval.ms` (default 5 min) and the session timeout decide "dead". |
| Dead letters | Dead-letter exchange (`x-dead-letter-exchange`): on reject without requeue, TTL expiry, queue length limit, quorum `delivery-limit` | Redrive policy: after `maxReceiveCount`, move to the DLQ. Move back with `StartMessageMoveTask`. | No built-in DLQ for consumers. Your app writes to a dead-letter topic. Kafka Connect has a DLQ for sink connectors. |
| Ordering | FIFO per queue. Breaks with several consumers or requeue. Single Active Consumer keeps order. | Standard: best effort. FIFO: strict per `MessageGroupId`. | Strict per partition. Key decides the partition. |
| Dedup | None built in. Publisher confirms only mean "the broker has it". | FIFO: 5-minute dedup window on `MessageDeduplicationId`. | Idempotent producer removes producer-retry duplicates. Transactions inside Kafka. |
| Max message size | `max_message_size`, 16 MiB default in 4.x (verify). Keep messages small. | 1 MiB since 2025, was 256 KiB (verify). Larger: store in S3 and send a pointer. | Broker `message.max.bytes`, about 1 MB by default (verify) |
| Delay / scheduling | No native delay. Use TTL + DLX retry queues, or the delayed-message plugin (read its limits, verify). | `DelaySeconds` up to 15 min (per message only on Standard). Longer: EventBridge Scheduler. | None. Retry topics with pause, or an external scheduler. |
| Priority | Classic queues: `x-max-priority` (use 10 levels or fewer). Quorum queues: two levels from 4.0 (verify). | None. Use separate queues and poll the high one more often. | None. Use separate topics. |
| Retention / replay | Deleted on ack. RabbitMQ **Streams** give log-style replay. | Deleted when you delete it. Unconsumed messages: default 4 days, max 14 days. | Time or size retention (default 7 days, verify) or compaction. Replay by moving the offset. |
| Fan-out | Exchanges: direct, topic, fanout, headers, each bound to many queues | SNS topic to many SQS queues, or EventBridge rules | Many consumer groups read the same topic |
| Replication | Quorum queues (Raft, majority). Classic mirrored queues were removed in 4.0. | Managed by AWS across Availability Zones | Replication factor, ISR, `acks=all`, `min.insync.replicas` |

### Quorum queues in RabbitMQ

- A quorum queue is a **replicated queue built on Raft**: a leader and followers on different nodes.
- A publish is confirmed only after a **majority** of replicas wrote it. One node can die without losing confirmed messages.
- Always durable. More disk and memory than classic queues.
- **Poison-message handling:** they count deliveries and dead-letter after `delivery-limit`. RabbitMQ 4.0 set a default limit of 20 (verify). They also offer **at-least-once dead-lettering** (verify the settings it needs).
- Classic mirroring is gone in 4.0, so **use quorum queues for any queue you cannot lose.**

In .NET, `RabbitMQ.Client` 7.x has a fully async API (`IChannel`, `BasicAckAsync`) (verify). Turn on publisher confirms and automatic connection recovery.

### Which one for the job platform?

- **RabbitMQ — your first choice, and a good one.** Per-message ack, prefetch = worker concurrency, routing by job type with a topic exchange, priorities, DLX, easy local Docker setup, and you already know it. Use quorum queues, publisher confirms and manual acks.
- **SQS — if everything runs on AWS and you want no broker to operate.** The visibility timeout maps directly to a job lease, and the DLQ redrive is built in. You lose priorities and rich routing (use SNS or EventBridge), and local development needs an emulator.
- **Kafka — not as the work queue.** Order is per partition, so a slow job blocks the jobs behind it in that partition, and there is no per-message retry. Use Kafka for a **job events stream** (`JobCreated`, `JobCompleted`) for analytics, audit and replay.

**The design point to say in the interview:** PostgreSQL is the source of truth. The broker message only says "job 42 is ready". If the broker loses a message, a sweeper re-publishes jobs that stayed `Queued` too long. So the broker is replaceable. An `IJobQueue` interface lets you swap RabbitMQ for SQS.

<a id="add-ds-sagas"></a>

## ➕ Sagas — a worked example

[Q13](#m4-q13) explains why 2PC blocks. [Q17](#m4-q17) compares choreography and orchestration. This section works through one saga end to end.

### The business flow

An order needs four services: **Order → Payment → Inventory → Shipping**. Each service has its own database. No transaction spans them.

| Step | Service | Action | Compensation |
|---|---|---|---|
| 1 | Order | Create the order, status `Pending` | Mark the order `Cancelled` |
| 2 | Payment | **Authorise** the payment (hold the money) | **Void** the authorisation |
| 3 | Inventory | Reserve the items (with an expiry time) | Release the reservation |
| 4 | Shipping | Create the shipment | Cancel the shipment, if not dispatched |
| 5 | Payment | **Capture** the payment | Refund (a manual or separate process) |

Two design choices:

- **Authorise first, capture last.** Voiding a hold is cheap and invisible to the customer. A refund is slow and visible.
- **Step 4 is the pivot.** After it, the saga does not compensate. It only goes forward. Step 5 must be **retried until it succeeds**, and a human gets an alert if it keeps failing.

### Orchestration

One orchestrator (here, inside the Order service) sends commands and waits for replies.

```
Orchestrator              Payment          Inventory          Shipping
  |-- AuthorizePayment ---->|
  |<-- PaymentAuthorized ---|
  |-- ReserveStock ------------------------->|
  |<-- StockFailed (out of stock) -----------|
  |-- VoidPayment --------->|
  |<-- PaymentVoided -------|
  |  order = Cancelled
```

### Choreography

No controller. Each service reacts to an event and emits a new one.

```
OrderPlaced -> Payment authorises -> PaymentAuthorized
            -> Inventory reserves  -> StockReserved
            -> Shipping creates    -> ShipmentCreated -> Order: Completed

Failure:   StockFailed -> Payment voids -> PaymentVoided -> Order: Cancelled
```

The full flow is not written in any one place. To see it, you need tracing.

### The saga as a state machine

| State | Event | Next state | Command sent |
|---|---|---|---|
| `Started` | (start) | `PaymentPending` | `AuthorizePayment` |
| `PaymentPending` | `PaymentAuthorized` | `InventoryPending` | `ReserveStock` |
| `PaymentPending` | `PaymentDeclined` | `Cancelled` | none |
| `PaymentPending` | timeout | `PaymentPending` | `GetPaymentStatus` (ask, do not guess) |
| `InventoryPending` | `StockReserved` | `ShippingPending` | `CreateShipment` |
| `InventoryPending` | `StockFailed` | `CompensatingPayment` | `VoidPayment` |
| `ShippingPending` | `ShipmentCreated` | `CapturePending` | `CapturePayment` |
| `ShippingPending` | `ShipmentFailed` | `CompensatingInventory` | `ReleaseStock` |
| `CompensatingInventory` | `StockReleased` | `CompensatingPayment` | `VoidPayment` |
| `CompensatingPayment` | `PaymentVoided` | `Cancelled` | none |
| `CapturePending` | `PaymentCaptured` | `Completed` | none |
| `CapturePending` | `CaptureFailed` | `CapturePending` | `CapturePayment` again, with backoff; alert after N tries |

Store it in PostgreSQL:

```sql
CREATE TABLE order_sagas (
    saga_id      uuid        PRIMARY KEY,
    order_id     uuid        NOT NULL UNIQUE,
    state        text        NOT NULL,
    version      int         NOT NULL DEFAULT 0,   -- optimistic concurrency
    deadline_at  timestamptz NULL,                 -- timeout for the current step
    data         jsonb       NOT NULL,             -- payment auth ID, reservation ID, ...
    updated_at   timestamptz NOT NULL DEFAULT now()
);
```

Every transition is **one local transaction**:

1. Insert the reply's `message_id` into the inbox (dedup).
2. `UPDATE order_sagas SET state = @next, version = version + 1 WHERE saga_id = @id AND version = @v` (conditional write).
3. Insert the next command into the outbox.

This joins three earlier sections: [delivery](#add-ds-delivery), [outbox](#add-ds-outbox) and conditional writes.

### Idempotent steps

- Every command carries `saga_id` and a step name. The Payment service uses `"{saga_id}:authorize"` as the idempotency key with the payment provider. A repeated command returns the same result.
- **Compensations must be idempotent too.** Voiding twice is a no-op.
- **A compensation can arrive before the action.** Because of retries, `ReleaseStock` for saga 42 may arrive before `ReserveStock` for saga 42. Inventory then records "saga 42 is cancelled", and rejects the late `ReserveStock`.
- **A compensation must handle "it never happened".** Voiding a payment that was never authorised returns success.

### Timeouts

- Each step sets `deadline_at`. A sweeper finds sagas past their deadline.
- **A timeout does not mean the step failed.** The payment may have succeeded and only the reply was lost. First ask the service for the status. Compensate only when you know, or after a set number of tries. Send the rest to a human.

### No isolation

A saga is not isolated. Other requests can see the middle states, for example stock that is reserved but not yet paid. Use a **semantic lock** (status `Pending` means "do not edit this order now"), and show the user "Processing…", not "Confirmed".

### Why not 2PC across services

[Q13](#m4-q13) explains the blocking problem. More reasons:

- Every participant must support prepare and commit. HTTP APIs, SQS and payment providers do not.
- Locks are held across network round trips, and every participant must be up for any commit.
- In .NET, distributed transactions (MSDTC) work only on Windows (.NET 7+), not in Linux containers (verify).

.NET tools for sagas: MassTransit state machines, NServiceBus sagas, Temporal's .NET SDK. Check licences first (MassTransit v9+ is commercial, verify). In the interview, explain the hand-written version above. It shows you understand the parts.

<a id="add-ds-consistency"></a>

## ➕ Consistency models — the ladder

[Q21](#m3-q21), [Q12 (linearizable vs serializable)](09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q12) and [Q14 (session guarantees)](09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q14) define some of these. Here they are in one ladder, strongest first.

| Model | Promise | One-line example |
|---|---|---|
| Strict serializable | Linearizable + serializable transactions | A bank transfer across two accounts, seen in real-time order by everyone |
| Linearizable | It acts like one copy. Once a write finishes, every later read sees it. | Username "rahul" is taken: after success, nobody else can take it |
| Sequential | Everyone sees the same order of operations, and each client's own order is kept. It may lag real time. | Everyone sees chat messages A, B, C in the same order, maybe a little late |
| Causal | A cause is seen before its effect. Unrelated operations can be seen in any order. | A reply never appears before the question it answers |
| Read-your-writes | You always see your own writes | After you edit your profile, you see the new name |
| Monotonic reads | You never go back in time | Job status never goes `Completed` → `Running` when you refresh |
| Eventual | If writes stop, all copies become equal | The like count shows 1,203 on one server and 1,205 on another, and later the same |

Read-your-writes and monotonic reads are **session guarantees**. They are parts of causal consistency, not full levels on their own.

### Quorum and its limits

[Q17](#m3-q17) and its correction explain R + W > N and where it fails. In short:

- Quorum gives **overlap**, not **order**. Two concurrent writes can still land in different orders on different nodes.
- Quorum reads are linearizable only if the reader also **repairs** stale replicas before it returns. Even then, compare-and-set needs consensus.
- A quorum system stops answering when a majority is unreachable.
- Write latency = the speed of the W-th fastest replica.

### CAP precisely

[Q20](#m3-q20) and its correction define the terms: C = linearizability, A = every non-failed node answers with a non-error response. The whole proof fits in three lines:

1. A partition splits node 1 from node 2.
2. A client writes `x = 2` on node 1.
3. Another client reads `x` on node 2. Node 2 must either answer the old value (not C) or wait or error (not A).

CAP talks about one failure (a partition) and one model (linearizability). It says nothing about latency.

**PACELC** adds that part: **if P**artition, choose **A** or **C**; **E**lse, choose **L**atency or **C**onsistency.

| System (typical setup) | During partition | Normal operation |
|---|---|---|
| PostgreSQL, one primary, synchronous replica | C | C (each commit waits for the replica) |
| DynamoDB default reads | A | L (eventually consistent reads; strongly consistent reads are an option) |
| Cassandra with consistency ONE | A | L |
| Google Spanner | C | C |

These labels are rough. They depend on configuration.

### How to pick per use case

| Use case | Model you need | How |
|---|---|---|
| Account balance, payment | Linearizable writes, serializable transaction | Write and read on the primary; conditional writes; a ledger |
| Unique username, one lease per job | Linearizable | A unique constraint or compare-and-set on the primary |
| Job status for the user who created it | Read-your-writes + monotonic reads | Read from the primary for a short time after a write, or wait until the replica reaches the version |
| Comments and chat | Causal | Order per conversation; carry the parent ID |
| Like count, view count | Eventual | Count in Redis, flush in batches; or a CRDT counter |
| Product catalog, feature flags | Eventual with bounded staleness | A cache with a TTL |

The rule: **pick the weakest model that still protects the business rule.** Use strong consistency for money and uniqueness. Use weak consistency for counts and feeds.

<a id="add-ds-clocks"></a>

## ➕ Clocks: physical, logical and hybrid

[GAP-03-010](#gap-03-010) to [GAP-03-015](#gap-03-015) define the terms. This section adds how they work, with examples.

### Physical vs logical

| | Physical (wall) clock | Logical clock |
|---|---|---|
| What it counts | Seconds since an epoch | Events |
| Good for | Showing time to people; TTLs; rough sorting | Ordering events by cause |
| Problem | Drift, skew, jumps back and forward | Does not show real time |
| .NET | `DateTime.UtcNow`, `DateTimeOffset.UtcNow` | Your own counter; a version column |

### NTP, drift and skew

- **Drift:** a quartz clock runs a little fast or slow. DDIA (chapter 8) quotes Google's assumption of 200 ppm drift: about 6 ms if you resync every 30 seconds, about 17 seconds if you resync once a day.
- **Skew:** two clocks show different times at the same moment.
- NTP corrects the clock by **slewing** (running a bit faster or slower) or by **stepping** (jumping). A step can move the clock **backwards**.
- Other surprises: leap seconds (many clouds "smear" them over a day), VM pauses, a badly configured NTP server.
- Google's TrueTime returns an **interval** [earliest, latest]. Spanner waits until the uncertainty has passed before it shows a commit. Most systems do not have this.

### Lamport timestamps — worked example

Rules:

1. Before each local event: `L = L + 1`.
2. When sending: attach `L`.
3. When receiving a message with time `T`: `L = max(L, T) + 1`.
4. For a total order, compare `(L, nodeId)`.

```
Node A: event a1 -> L=1.  sends m -> L=2 (m carries 2)
Node B: event b1 -> L=1.  receives m -> L = max(1, 2) + 1 = 3
```

The send (2) is lower than the receive (3), so cause comes before effect. But a1 and b1 both have L = 1. They are concurrent, and Lamport cannot tell you that. The node ID only breaks the tie.

### Vector clocks — worked example

Each node keeps one counter per node.

```
A: local event         -> [A:1, B:0]
A: sends m             -> [A:2, B:0]   (m carries [A:2, B:0])
B: local event         -> [A:0, B:1]
B: receives m          -> max each slot, then add 1 to B -> [A:2, B:2]
```

Compare two vectors:

- Every slot of V1 ≤ V2, and at least one is smaller: V1 **happened before** V2.
- Neither is ≤ the other, for example `[A:1, B:0]` and `[A:0, B:1]`: they are **concurrent**. That is a conflict, and you need a rule to resolve it.

The cost: one slot per node or writer. The vectors grow, and real systems trim them (Riak uses "dotted version vectors").

### Hybrid logical clocks (overview)

A hybrid logical clock (HLC) is a pair: (physical part, logical counter).

- The physical part follows the largest wall time seen, its own or one received in a message.
- The counter goes up when the physical part does not move.
- Result: timestamps stay close to real time (useful for "read as of 10:00") **and** respect cause and effect like Lamport.
- Used by CockroachDB and YugabyteDB. They still need bounded skew. CockroachDB stops a node whose clock is too far off (verify the exact rule).

### Monotonic clocks for durations

```csharp
// Wrong: the wall clock can jump; elapsed can be negative or huge
var start = DateTime.UtcNow;
await DoWorkAsync();
var elapsed = DateTime.UtcNow - start;

// Right: monotonic
long t0 = Stopwatch.GetTimestamp();
await DoWorkAsync();
TimeSpan elapsed2 = Stopwatch.GetElapsedTime(t0);   // .NET 7+
```

- Use `Stopwatch` or `Environment.TickCount64` for timeouts, durations and lease safety margins.
- Use `TimeProvider` (.NET 8+) so tests can control time (`FakeTimeProvider`).
- A monotonic reading means nothing on another machine. Never store it or send it.

### The rule: never order events across machines by wall clock

Example: worker 1 writes "Running" at 10:00:00.120 by its clock. Worker 2 writes "Completed" at 10:00:00.100 by its clock, because its clock is 50 ms slow. Sorted by timestamp, the job looks like it went back to Running.

Use instead:

- **One sequencer:** a database sequence, or a Kafka offset inside one partition.
- **A version per entity:** `jobs.version`, incremented on every change.
- **Logical clocks or HLC**, when there is no single sequencer.

In your platform: order a job's events by `jobs.version` and the outbox `id`, do lease math with the database clock, and use `created_at` only for display.

<a id="add-ds-resilience"></a>

## ➕ Resilience toolkit and cascading failure

[Q18](#m4-q18) (circuit breaker), [Q19](#m4-q19) (bulkhead), [Q32](#m3-q32) (backpressure) and [GAP-03-019](#gap-03-019) to [GAP-03-026](#gap-03-026) give the definitions. This section shows how the tools work together, in .NET terms.

### Timeouts and deadline propagation

- Give every call a timeout. `HttpClient.Timeout` is 100 seconds by default, far too long for an internal call.
- Set a **total budget** at the edge (for example 2 s) and pass the **remaining** time to each hop. A callee stops when the budget is gone, so nobody works on a request the user has already abandoned.
- In .NET: link `HttpContext.RequestAborted` with a `CancellationTokenSource` and call `CancelAfter(remaining)`. gRPC sends deadlines for you. For HTTP, send the remaining milliseconds in a header, not an absolute time, because clocks differ.
- For queues: put `expires_at` in the message, and let the worker drop expired messages (a 10-minute-old one-time-password email is useless).

### Retries

See [Retry policy design](#add-ds-retries): one layer only, bounded attempts, full jitter, a retry budget.

### Circuit breaker in practice

- **One breaker per dependency**, so one bad dependency does not block the others.
- Polly v8 settings: `FailureRatio`, `MinimumThroughput`, `SamplingDuration`, `BreakDuration`.
- Count only timeouts and 5xx as failures. A `400` is the caller's bug.
- When open, return something useful fast: cached data, a default, or `503` with `Retry-After`.
- `Microsoft.Extensions.Http.Resilience` gives `AddStandardResilienceHandler()`: rate limiter, total timeout, retry, circuit breaker and per-attempt timeout in one pipeline (verify the order).

### Bulkheads in .NET

- A separate named `HttpClient` per dependency, with its own `MaxConnectionsPerServer`.
- A concurrency limit per dependency: `SemaphoreSlim`, or `ConcurrencyLimiter` from `System.Threading.RateLimiting`.
- Separate RabbitMQ consumers (each with its own prefetch) per job type, so slow "video" jobs cannot block fast "email" jobs.

### Load shedding

Reject extra work early and cheaply, so the work you accept still finishes.

```csharp
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status503ServiceUnavailable;
    o.AddConcurrencyLimiter("api", c => { c.PermitLimit = 200; c.QueueLimit = 50; });  // example values
});
```

Shed low-priority work first (reports before payments). Use `503` + `Retry-After` for overload, and `429` for a client over its quota.

### Admission control

Decide at the door whether to accept a job.

- Check the tenant's quota: queued + running jobs ≤ its limit.
- Check the system: queue depth or the age of the oldest queued job. If it is too high, return `429` with `Retry-After`.
- An accepted job is a **promise** (a durable row). Accept only what you can finish within your SLO.

### Backpressure

```csharp
var channel = Channel.CreateBounded<Job>(new BoundedChannelOptions(capacity: 100)
{
    FullMode = BoundedChannelFullMode.Wait   // the writer waits instead of using more memory
});
await channel.Writer.WriteAsync(job, ct);
```

RabbitMQ prefetch is backpressure from the broker to a consumer. RabbitMQ memory and disk alarms **block publishers**. Kafka consumers can `Pause()` and `Resume()` partitions.

### Graceful degradation in the job platform

- Redis is down: skip the cache and read the database, with a concurrency limit.
- SignalR is down: clients poll `GET /jobs/{id}` instead.
- The email provider is down: keep email jobs queued with backoff. Do not mark them failed.

Never degrade by weakening auth or skipping money checks.

### Hedged requests

If a request has no answer after about your p95 latency, send the same request to a second replica. Use the first answer and cancel the other. This cuts tail latency when slowness is random per server (Dean and Barroso, "The Tail at Scale", CACM 2013). Polly v8 has a hedging strategy.

It **hurts** when the system is overloaded (it adds load when load is highest), when the operation is a non-idempotent write, when both copies hit the same slow database, or when you cannot cancel the loser. Hedge only reads, and only a small share of requests.

### A cascading failure, step by step

```
Users --> API --> Service A --> Service B --> PostgreSQL
                                               (one slow query holds locks)

1. PostgreSQL slows down. Calls from B take 10 s instead of 50 ms.
2. B's connection pool fills. B is now slow for EVERY request, even ones that do not need that table.
3. A's calls to B time out. A retries 3 times. B gets 3x the load.
4. A's threads all wait on B. A fails its health checks.
5. The load balancer removes A instances. The remaining A instances get more traffic and fall over.
6. Users press refresh. Even more load.
Result: the whole site is down. The cause was one slow query.
```

How each tool stops it:

| Tool | Where | What it stops |
|---|---|---|
| Deadline propagation | A → B → DB | B stops work that A has already abandoned (step 3) |
| One retry layer + jitter + budget | A | The 3x amplification (step 3) |
| Circuit breaker | A, around B | A fails fast and B gets room to recover (steps 3–4) |
| Bulkhead | A and B | Calls to B cannot use the threads needed for other features (steps 2 and 4) |
| Load shedding | B | B rejects extra work quickly and serves what it can (step 2) |
| Admission control | API edge | New work is refused at the door with `429` (step 6) |
| Bounded queues / backpressure | Everywhere | Memory stays bounded; you get slow, not dead |
| Graceful degradation | API | Users get cached or partial data instead of errors (step 6) |
| Liveness that does not check dependencies | Health checks | Healthy A instances are not killed because B is slow (step 5) |

The last row is a common real mistake. A **liveness** check must only ask "is this process alive?". A **readiness** check may look at dependencies. In ASP.NET Core, use tags to split the two health check endpoints.
