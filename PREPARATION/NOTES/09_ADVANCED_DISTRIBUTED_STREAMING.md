# Advanced distributed systems and streaming

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 7 parts A–D (M7) and the Kafka prompts with answers. Weeks 25–26 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART A - Kafka in depth
- PART B - Stream processing
- PART C - Advanced consistency
- PART D - Time series and geospatial
- Kafka and streaming — prompts and answers
- ➕ Kafka essentials — cheat sheet
- ➕ Stream processing essentials — cheat sheet
- ➕ Multi-region patterns
- ➕ API and message schema evolution

---

<a id="m7-part-a"></a>

## PART A - Kafka in depth

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m7-q1"></a>

#### Q1. When does Kafka beat SQS, concretely?
Say this. Three cases. When you need replay - reprocessing history after fixing a bug, or backfilling a new feature. When several independent consumer groups need the same stream, because each tracks its own offset rather than competing for messages. And when you need ordering by key at high throughput, which partitioning gives you.
Why. SQS is a queue: a message is consumed and deleted, so there is nothing to replay and one consumer's read denies it to another. Kafka is a log: reading does not remove, so the same data serves many consumers and many times.
Instead of. SQS wins on operational simplicity - managed, no partition sizing, no rebalancing, built-in DLQ, and per-message visibility timeouts. For your email pipeline it was the right call, and saying so with a reason is stronger than reaching for Kafka.
<a id="m7-q2"></a>

#### Q2. Explain consumer group rebalancing and why it hurts.
Say this. Partitions are assigned to consumers in a group. When a consumer joins, leaves or is deemed dead, the group rebalances and reassigns partitions. In the classic protocol every consumer stops consuming during the rebalance - a stop-the-world pause - so a rolling deploy of ten consumers can cause ten pauses.
Why. The group needs a consistent view of who owns what, and the simple way to get that is to stop everyone and redistribute. Incremental cooperative rebalancing was added precisely to avoid this.
Watch out. A consumer that processes a batch for longer than the poll interval is considered dead and triggers a rebalance - which then makes everything slower and can cascade. Tuning max poll records and the interval is the fix.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Add the newer mechanisms: KIP-848 (broker-driven incremental consumer rebalance protocol, GA in Kafka 4.0) and static membership (`group.instance.id`) to avoid rebalances on rolling deploys. Distinguish `session.timeout.ms` (heartbeats) from `max.poll.interval.ms` (processing too slow).

<a id="m7-q3"></a>

#### Q3. How does Kafka guarantee ordering, and what is the limit?
Say this. Within a single partition, messages are strictly ordered by offset. Across partitions there is no ordering at all. So you get ordering per key by partitioning on that key - all events for one user or one document land in one partition.
Why. A partition is a single append-only file with one owner at a time, which is what makes order cheap. Ordering across partitions would require global coordination and destroy the throughput.
Watch out. The consequence is that parallelism is capped by partition count, and you cannot easily increase partitions later without breaking existing key-to-partition mapping. That sizing decision is one of the few genuinely hard-to-reverse Kafka choices.
<a id="m7-q4"></a>

#### Q4. What is log compaction and when do you want it?
Say this. Compaction keeps only the latest value for each key, discarding older ones, rather than deleting by age. You want it when the topic represents current state rather than a sequence of events - a table of user profiles, or configuration - so a new consumer can rebuild the full current state by reading from the beginning.
Why. It turns a log into a durable, replayable key-value snapshot. That is the mechanism behind change-data-capture topics and the pattern usually called a log-backed table.
Watch out. It does not guarantee immediate removal - compaction is a background process, so you may still see older versions for a while. And a delete is a tombstone: a null value for the key.
<a id="m7-q5"></a>

#### Q5. What are ISR and acks, and how do they relate to durability?
Say this. The in-sync replica set is the replicas caught up with the leader. `acks=0` does not wait at all; `acks=1` waits for the leader only, so a leader failure right after can lose the message; `acks=all` waits for every in-sync replica. Combined with `min.insync.replicas`, that gives you a real durability guarantee.
Why. Durability is a quorum property. Acknowledging from the leader alone means one machine holds the only copy for a window, and that window is where data loss lives.
Watch out. `acks=all` with `min.insync.replicas=1` is a trap - it looks safe and is not, because the ISR can shrink to just the leader. Set it to 2 with a replication factor of 3.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] `acks=all` and idempotence are producer defaults since Kafka 3.0. Keep `unclean.leader.election.enable=false`. When the ISR drops below `min.insync.replicas`, writes fail with NotEnoughReplicas — that is the availability trade-off.

<a id="m7-q6"></a>

#### Q6. Kafka claims exactly-once semantics. Is that a contradiction?
Say this. No, but it is narrower than it sounds. Kafka offers idempotent producers - deduplicating retries using a producer ID and sequence number - and transactions that atomically commit both the messages produced and the consumer offsets. So a read-process-write loop entirely within Kafka can be exactly-once.
Why. It works because Kafka controls both sides of the operation. The moment your side effect is outside Kafka - a database write, an email, an HTTP call - the guarantee stops applying and you are back to idempotent handlers.
Watch out. This is the nuance that impresses. "Exactly-once within the Kafka boundary, at-least-once plus idempotency outside it" is the precise answer.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] For EOS, consumers must read with `isolation.level=read_committed`; Kafka Streams uses `processing.guarantee=exactly_once_v2`.


<a id="m7-part-b"></a>

## PART B - Stream processing

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m7-q7"></a>

#### Q7. Why is event time harder than processing time?
Say this. Event time is when the thing happened; processing time is when you saw it. They differ because of network delays, retries, mobile devices offline for hours, and backfills. So a window over event time cannot simply close when the clock passes its end - late data may still arrive for it.
Why. Processing time gives you a deterministic, immediately closeable window and the wrong answer. Event time gives the right answer and forces you to decide how long to wait.
Watch out. Processing-time results are also non-reproducible: replay the same data and you get different windows. Event-time results are reproducible, which matters enormously for billing or analytics.
<a id="m7-q8"></a>

#### Q8. What is a watermark?
Say this. An assertion by the stream processor that it believes it has seen all events with a timestamp earlier than X. When the watermark passes the end of a window, the window is closed and emitted. It is a heuristic about completeness, not a fact.
Why. You cannot know that no more late data will arrive, so you need a decision rule. The watermark is that rule, made explicit and tunable.
Watch out. Anything arriving after the watermark is late data, and you must choose: drop it, send it to a side output, or re-open the window and emit a correction. Naming the three options is the strong answer.
<a id="m7-q9"></a>

#### Q9. Tumbling, sliding or session windows?
Say this. Tumbling - fixed, non-overlapping intervals, so every event is in exactly one window. Good for "hits per minute". Sliding - fixed size, advancing by a smaller step, so windows overlap and an event is in several. Good for "average over the last five minutes, updated every minute". Session - dynamic, closing after a gap of inactivity. Good for user sessions, where the natural boundary is a pause rather than a clock.
Why. They differ in whether the boundary is fixed by the clock or by the data. Session windows need per-key state because each key has its own gap timer.
Watch out. Sliding windows multiply the state and the output volume by size divided by step. A 24-hour window sliding every minute is 1,440 open windows per key - a very common cause of unexpected memory blowup.
<a id="m7-q10"></a>

#### Q10. How do you count distinct users at scale without exact state?
Say this. HyperLogLog. It gives a cardinality estimate in a fixed small amount of memory - a few kilobytes for billions of items, with a couple of percent error - and it merges, so you can compute per-hour sketches and union them for a day.
Why. Exact distinct counting needs to remember every item seen, so memory grows with cardinality. HLL trades a small bounded error for constant memory, which is almost always the right trade for analytics.
Watch out. Its sibling is count-min sketch for frequency estimation - "is this key hot?" Both are good to name, and both are in Redis, which makes them practical rather than academic.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Redis HyperLogLog uses 12 KB with **0.81%** standard error (not 'a couple of percent'). Count-min sketch was not core Redis — it came from RedisBloom/Redis Stack and is bundled from Redis 8.

<a id="m7-q11"></a>

#### Q11. What is backfill, and why is replay a design requirement?
Say this. Backfill is reprocessing historical data - because you fixed a bug, added a field, or changed a calculation. It is a design requirement because bugs in stream processing are discovered after the data has flowed, and without replay your only option is to accept permanently wrong history.
Why. This is the concrete argument for a log rather than a queue: a retained log lets you rewind the offset and reprocess. With a queue the data is gone.
Watch out. Backfill competes with live traffic for capacity, and it can produce out-of-order and very-late events that break your watermarks. Running it on a separate consumer group with its own resources is the usual answer.

<a id="m7-part-c"></a>

## PART C - Advanced consistency

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m7-q12"></a>

#### Q12. Linearizability or serializability - what is the difference?
Say this. They are not the same thing. Linearizability is about single operations on single objects: every operation appears to take effect at one instant, and everyone sees them in the same real-time order. Serializability is about transactions over multiple objects: the result is equivalent to running them one at a time in some order - not necessarily the real-time order.
Why. One is a recency guarantee, the other is an isolation guarantee. A system can be serializable but not linearizable, because it may serialise your transaction before one that actually committed earlier. Strict serializability is both.
Watch out. This is a genuine differentiator - most candidates at your level use the terms interchangeably. Being precise about it signals real reading.
<a id="m7-q13"></a>

#### Q13. What is snapshot isolation and what does it permit?
Say this. Each transaction reads a consistent snapshot as of its start time, so readers never block writers. Write-write conflicts are detected and one transaction aborts. What it permits is write skew: two transactions read overlapping data, each writes a different row, so there is no write-write conflict to detect, and together they violate a constraint neither would have broken alone.
Why. The conflict is on a condition across rows, not on a row. Snapshot isolation only watches rows.
Watch out. The classic example is two doctors both going off-call because each sees the other still on. The fix is serializable isolation, or materialising the conflict by locking the thing the condition depends on.
<a id="m7-q14"></a>

#### Q14. What are read-your-writes and monotonic reads?
Say this. Read-your-writes: after you write, you always see at least your own write - so your comment does not vanish after you post it. Monotonic reads: you never see time go backwards - once you have seen a value, a later read does not show an older one. Both are per-client session guarantees, weaker than strong consistency but far more useful than plain eventual.
Why. They target the anomalies users actually notice. Full linearizability is expensive; these two remove most of the visible weirdness for a fraction of the cost.
Watch out. You get them practically by pinning a session to one replica, or by tracking a version token and waiting for the replica to reach it. Naming an implementation makes the answer concrete.
<a id="m7-q15"></a>

#### Q15. Active-active or active-passive?
Say this. Active-passive: one region serves, the other stands by with replicated data. Simple, no write conflicts, but you waste the standby and failover takes time and is rarely rehearsed. Active-active: both serve. Better utilisation and lower latency for users near each region, but you now have concurrent writes in two places, so you need conflict resolution or partitioning of write ownership by key.
Why. The hard part of active-active is not the infrastructure, it is deciding what happens when the same entity is written in both regions during a partition.
Watch out. The usual real answer is active-active for reads, single-region ownership for writes per entity. That gets most of the benefit without the conflict problem.
<a id="m7-q16"></a>

#### Q16. What are RPO and RTO?
Say this. RPO - recovery point objective - is how much data you can afford to lose, measured in time. RTO - recovery time objective - is how long you can afford to be down. RPO drives your replication and backup strategy; RTO drives your failover automation.
Why. They are business decisions, not engineering ones. An RPO of zero requires synchronous replication and therefore higher write latency, so someone has to decide what the data is worth.
Watch out. "We take nightly backups" implies an RPO of up to 24 hours. Saying that out loud is often the first time anyone realises it is unacceptable.
<a id="m7-q17"></a>

#### Q17. Why is replication lag operationally dangerous?
Say this. Because it is invisible until it matters. Reads go stale, failover to a lagging replica loses the un-replicated writes, and lag typically grows exactly when the system is busiest - so it is worst during an incident.
Why. A replica applies changes serially from the leader's log. If write volume exceeds the replica's apply rate, the gap grows without bound and there is no natural back-pressure.
Watch out. Alert on lag, not on replica health. A replica can be perfectly healthy and twenty minutes behind, and that is a data-loss risk you cannot see from a ping.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'A replica applies changes serially' depends on the engine: MySQL has multi-threaded replication; PostgreSQL physical replication replay is effectively single-process.


<a id="m7-part-d"></a>

## PART D - Time series and geospatial

*Source: Q-and-A/M7_Advanced_Distributed_and_Streaming.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m7-q18"></a>

#### Q18. Why is cardinality the hard part of a metrics system?
Say this. Each unique combination of metric name and label values is a separate time series to store and index. Adding a label with high cardinality - a user ID, a request ID, a URL with an ID in it - multiplies series count by that cardinality, and memory and query cost go with it. This is the standard way monitoring systems fall over.
Why. The storage is optimised for many points on few series. Reverse that and every optimisation stops working.
Watch out. "Never put an unbounded value in a label" is the rule. Use logs or traces for high-cardinality detail, metrics for aggregates. That division is the answer.
<a id="m7-q19"></a>

#### Q19. What is downsampling and why does it work for time series?
Say this. Keep raw resolution for a short retention, then roll up into coarser buckets - one-minute averages for a week, one-hour for a year. It works because nobody queries per-second data from eight months ago; the value of resolution decays much faster than the value of history.
Why. Storage cost is points times retention. Downsampling reduces points per unit time as the data ages, so cost grows logarithmically rather than linearly.
Watch out. Keep min, max and count alongside the average, not just the average - otherwise you lose the spikes, which are the only interesting part of old data.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] With fixed downsampling tiers, storage still grows *linearly* with retention (a smaller slope), not logarithmically. It would be logarithmic only if resolution kept halving with age.

<a id="m7-q20"></a>

#### Q20. How do you find nearby items at scale?
Say this. Reduce two dimensions to one so you can use an ordinary index. Geohashing encodes lat/long into a string where a shared prefix means physical proximity, so a prefix query finds a neighbourhood. Quadtrees recursively subdivide space, adapting depth to density, which handles cities and oceans differently.
Why. Standard indexes are one-dimensional. Any geospatial solution is fundamentally a trick for mapping 2D locality onto a 1D ordering.
Watch out. Geohash has an edge problem: two points either side of a cell boundary can be metres apart with different prefixes. You query the cell plus its eight neighbours. Mentioning that is the mark of someone who has implemented it.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Any geospatial solution maps 2D onto 1D' is over-absolute: R-trees (PostGIS GiST) and k-d trees index 2D directly. Also name Google S2 (Hilbert curve cells) and Uber H3 (hexagons).

<a id="m7-q21"></a>

#### Q21. How does object storage achieve durability without keeping full copies?
Say this. Erasure coding. Split the object into k data shards, compute m parity shards, and distribute all k+m across failure domains. Any k of them reconstruct the object, so you survive m losses while storing only (k+m)/k times the data - roughly 1.5x for 6+3, versus 3x for triple replication.
Why. It is the same mathematics as RAID, applied across machines and racks. You trade CPU on read reconstruction for a large storage saving.
Watch out. The cost is repair traffic and read latency when a shard is missing - reconstruction must fetch k shards from k machines. That is why replication is often preferred for small hot objects and erasure coding for large cold ones.


## Kafka and streaming — prompts and answers

<a id="qs-4"></a>

### 4. Kafka/streaming — only a few more

*Source: Q-and-A/system-designdistributed-systems foundation.docx (prompt list). Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Month 7 is already excellent here. I would only add:
- Kafka partition vs consumer — how does parallelism work?
- What happens when there are more consumers than partitions?
- What happens when there are fewer consumers than partitions?
- Kafka offset management — auto commit vs manual commit?
- What happens if a consumer crashes after processing but before committing its offset?
- How do you implement idempotent Kafka consumers?
- Kafka retention vs log compaction?
- Kafka producer batching and compression?
- What is a poison message in streaming?
- How do you handle schema evolution?
- What is Schema Registry and why is it useful?
- What is exactly-once processing when an external database is involved?
- Kafka vs RabbitMQ vs SQS vs Pub/Sub — when would you choose each?
These are enough. Don't turn Kafka into a separate six-week subject unless the target role specifically requires it.


<a id="gap-04"></a>

#### Answers to the section 4 prompts (written 13 Oct 2026, kept in full)

Practice for every card below: Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

<a id="gap-04-001"></a>


#### GAP-04-001 — Kafka partition vs consumer — how does parallelism work?

**Answer / starting outline.** Partitions are the unit of Kafka ordering and consumer-group assignment. In the conventional group model, a partition is assigned to one active consumer at a time; one consumer may own several partitions. Application processing concurrency must preserve any required partition/key ordering.



<a id="gap-04-002"></a>


#### GAP-04-002 — What happens when there are more consumers than partitions?

**Answer / starting outline.** In a conventional consumer group, extra consumers beyond the number of partitions have no assignment and add no partition-level parallelism. Other subscription/group modes may differ; state which model you mean.



<a id="gap-04-003"></a>


#### GAP-04-003 — What happens when there are fewer consumers than partitions?

**Answer / starting outline.** Some consumers own multiple partitions. Uneven partition load can cause skew even when partition counts look balanced. Tune processing, partition keys and assignments using measured work per partition.



<a id="gap-04-004"></a>


#### GAP-04-004 — Kafka offset management — auto commit vs manual commit?

**Answer / starting outline.** Auto commit periodically advances offsets under client configuration and polling behavior; it may not align with completion of business processing. Manual commit lets the application choose the boundary. Commit after safely completed effects for replayable processing, accounting for crashes and duplicates.



<a id="gap-04-005"></a>


#### GAP-04-005 — What happens if a consumer crashes after processing but before committing its offset?

**Answer / starting outline.** The record can be read again after restart because the committed offset did not advance. Make the business effect idempotent; committing first instead introduces a loss window if processing then fails.



<a id="gap-04-006"></a>


#### GAP-04-006 — How do you implement idempotent Kafka consumers?

**Answer / starting outline.** Identify events durably and atomically combine deduplication with database-local changes, using a unique key/transaction. Producer idempotence prevents a producer retry from duplicating log entries under its contract; it does not deduplicate arbitrary consumer effects.



<a id="gap-04-007"></a>


#### GAP-04-007 — Kafka retention vs log compaction?

**Answer / starting outline.** Retention removes old log segments according to configured time/size constraints. Compaction retains a recent value per key over time, with deletion/tombstone rules; it does not immediately remove every duplicate key. Choose based on replay history versus reconstructing current keyed state.



<a id="gap-04-008"></a>


#### GAP-04-008 — Kafka producer batching and compression?

**Answer / starting outline.** Batching groups producer records to improve throughput; waiting for fuller batches adds latency. Compression reduces bytes at CPU cost and often benefits from batching. Tune with realistic payloads and delivery/latency requirements rather than copying universal settings.



<a id="gap-04-009"></a>


#### GAP-04-009 — What is a poison message in streaming?

**Answer / starting outline.** A poison message repeatedly fails processing, such as invalid schema or unrecoverable business data. Isolate it with a bounded retry/dead-letter policy and record error context. Skipping or quarantining it can affect ordering/business completeness and needs an explicit policy.



<a id="gap-04-010"></a>


#### GAP-04-010 — How do you handle schema evolution?

**Answer / starting outline.** Use backward/forward compatibility rules, optional fields/defaults when suitable, versioned contracts and compatibility tests. Coordinate deployments and replay old records. Renaming/removing a field or changing its meaning can break readers even when parsing succeeds.



<a id="gap-04-011"></a>


#### GAP-04-011 — What is Schema Registry and why is it useful?

**Answer / starting outline.** A schema registry manages versions and compatibility rules for message schemas. Clients can serialize/identify schemas consistently. It does not validate all business semantics or guarantee that every consumer handles every version correctly.



<a id="gap-04-012"></a>


#### GAP-04-012 — What is exactly-once processing when an external database is involved?

**Answer / starting outline.** Kafka transactions can coordinate Kafka records and offsets, not automatically an independent database/API. For database-local effects, combine durable event deduplication/position with the change in one database transaction. External effects need their own idempotency/reconciliation contract and clearly bounded guarantees.



<a id="gap-04-013"></a>


#### GAP-04-013 — Kafka vs RabbitMQ vs SQS vs Pub/Sub — when would you choose each?

**Answer / starting outline.** Kafka suits retained partitioned streams and replay. RabbitMQ suits brokered routing/work queues with its delivery features. SQS is a managed queue with service-specific ordering/deduplication options. Managed Pub/Sub suits subscription fan-out with its service guarantees. Compare retention, ordering scope, throughput, latency, operational burden and cloud coupling.




<a id="add-kafka-cheatsheet"></a>

## ➕ Kafka essentials — cheat sheet

One table for revision. Part A above ([Q1](#m7-q1) to [Q6](#m7-q6)) explains the ideas. Defaults change between versions, so check kafka.apache.org/documentation for your version. Lines marked (verify) are version-specific.

| Concept | What it is | Key facts and traps |
|---|---|---|
| Topic | A named stream of records | Split into partitions. Config is per topic (retention, cleanup policy). |
| Partition | An ordered, append-only log; the unit of order and of parallelism | You can add partitions but never remove them. Adding them changes key → partition mapping ([Q3](#m7-q3)). |
| Offset | A record's position in its partition | The consumer stores "next offset to read". One number covers all earlier records. |
| Consumer group | Consumers that share the work of a topic | In a classic group, each partition has one owner at a time. Different groups each get every record. |
| Rebalance | Moving partitions between group members | Classic protocol: stop-the-world. **KIP-848** (GA in Kafka 4.0, `group.protocol=consumer`): the broker drives small, incremental changes. **Static membership** (`group.instance.id`): a restarting consumer keeps its partitions, so a rolling deploy does not rebalance. |
| Liveness timers | `session.timeout.ms` (no heartbeats) vs `max.poll.interval.ms` (processing too slow, default 5 min) | A slow batch breaks the second one and causes a rebalance, not a crash. |
| Key → partition | `hash(key) % partitions` | Java clients use murmur2. The .NET client (Confluent.Kafka, on librdkafka) defaults to a **different** partitioner. If Java and .NET produce to the same topic, set `Partitioner.Murmur2Random` in .NET (verify). A null key spreads records over partitions, with no order. |
| Ordering | Only inside one partition | Needs the idempotent producer, or `max.in.flight.requests.per.connection=1`, or retries can reorder. Processing one partition in parallel breaks it. |
| Replication factor | Copies of each partition | Use 3 in production. The broker default is 1 (verify). |
| ISR | In-sync replicas: replicas caught up with the leader | Only an ISR member may become leader (keep `unclean.leader.election.enable=false`). |
| `acks` | How many replicas must confirm a write | `0` none, `1` leader only, `all` every ISR member. Default `all` since 3.0. |
| `min.insync.replicas` | Smallest ISR size that may accept `acks=all` writes | Use 2 with RF 3. If the ISR is smaller, writes fail (`NotEnoughReplicas`). Broker default is 1. |
| Idempotent producer | Producer ID + sequence number per partition; the broker drops retried duplicates | Default since 3.0. It only removes **producer-retry** duplicates, not duplicates from your own code or from consumers. |
| Transactions / EOS | Atomic write to several partitions + consumer offsets (`transactional.id`) | Consumers must use `isolation.level=read_committed` (default is `read_uncommitted`). A new producer with the same `transactional.id` fences the old "zombie" one, like a fencing token. Only covers Kafka → Kafka ([Q6](#m7-q6)). |
| Retention | Delete old segments by time or size | `retention.ms` default 7 days (verify). Tiered storage can move old segments to object storage (verify GA for your version). |
| Compaction | Keep the latest record per key | `cleanup.policy=compact` (or `compact,delete`). Not immediate. For current state, not history ([Q4](#m7-q4)). |
| Tombstone | A record with a key and a **null** value | Tells compaction to delete the key. It stays for `delete.retention.ms` (default 1 day, verify) so consumers can see it. |
| Consumer lag | Log-end offset − committed offset, per partition | Alert on lag that keeps growing, and on **time** lag (how old the oldest unread record is). Raw counts mislead. |
| Auto vs manual commit | Auto: the client commits every `auto.commit.interval.ms` (default 5 s). Manual: you commit after the work. | Crash **after** the work and **before** the commit → the record is read again → duplicate ([GAP-04-005](#gap-04-005)). Commit before the work → possible loss. So: commit after, and make the handler idempotent. |
| Share groups (KIP-932) | "Queues for Kafka": many consumers per partition, per-record accept / release / reject, delivery count, lock timeout | No order guarantee. Early access in 4.0, preview in 4.1. Check the GA status before you rely on it (verify). |
| Schema Registry | A service that stores schema versions and checks compatibility | Not part of Apache Kafka. Confluent's is the common one; Apicurio, Karapace and AWS Glue are alternatives. Each message carries a small schema ID, not the whole schema. |

### .NET notes (Confluent.Kafka)

- A common safe pattern: keep auto-commit on, set `EnableAutoOffsetStore = false`, and call `consumer.StoreOffset(result)` only **after** your handler finishes. Auto-commit then commits only finished work.
- One consumer instance per poll loop. Do not call `Consume` from several threads.
- If you hand records to worker tasks, keep the records of one partition in order, and store an offset only when all earlier records of that partition are done.

### Compatibility modes (Confluent Schema Registry)

| Mode | Meaning | Allowed in Avro (examples) | Upgrade first |
|---|---|---|---|
| `BACKWARD` (default) | The new schema can read data written with the previous schema | Delete a field; add a field **with a default** | Consumers |
| `BACKWARD_TRANSITIVE` | …with **all** earlier schemas | Same | Consumers |
| `FORWARD` | The previous schema can read data written with the new schema | Add a field; delete a field that **had a default** | Producers |
| `FORWARD_TRANSITIVE` | …with all earlier schemas | Same | Producers |
| `FULL` / `FULL_TRANSITIVE` | Both directions | Add or delete only fields with defaults | Either |
| `NONE` | No checks | Anything | You coordinate by hand |

- **Transitive matters for replay.** If you replay a topic from the start, the newest consumer must read every old version. Use a `_TRANSITIVE` mode.
- **Protobuf:** fields are identified by **number**, not name. Adding a field is safe. Removing one is safe if you mark its number `reserved`. Never reuse a number. Confluent recommends `BACKWARD_TRANSITIVE` for Protobuf (verify).
- Compatibility checks the **shape**, not the **meaning**. Changing `amount` from rupees to paise passes every check and breaks every consumer.

### Safe defaults to say in an interview

RF = 3, `min.insync.replicas = 2`, `acks = all`, idempotence on, unclean leader election off, commit after processing, idempotent consumer, key by the entity that needs order.

<a id="add-stream-cheatsheet"></a>

## ➕ Stream processing essentials — cheat sheet

Part B above ([Q7](#m7-q7) to [Q11](#m7-q11)) explains event time, watermarks, windows, HyperLogLog and backfill. This sheet adds the details and the names that differ between tools.

### Time

| Term | Meaning | Note |
|---|---|---|
| Event time | When it happened (a timestamp inside the record) | Gives correct, repeatable results ([Q7](#m7-q7)) |
| Processing time | When the processor saw it | Simple, but results change on replay |
| Ingestion time | When the broker stored it | A middle option; Kafka can stamp it (`LogAppendTime`) |
| Watermark | "I think I have seen everything before time T" | A guess, not a fact ([Q8](#m7-q8)). Usually "highest event time seen − allowed delay". One idle partition can stop the watermark from moving, so tools have an idle-source timeout. |

### Windows

| Window | Shape | Example | Note |
|---|---|---|---|
| Tumbling | Fixed size, no overlap | Jobs completed per minute | Each event is in exactly one window |
| Hopping | Fixed size, moves by a smaller step, so windows overlap | Last 5 minutes, updated every minute | Flink calls this **sliding** |
| Sliding (Kafka Streams) | Defined by the largest time gap between two records; windows are created as records arrive | "Two failed logins within 10 s" | Not the same as Flink's sliding window |
| Session | Per key; ends after a gap with no events | A user session ends after 30 minutes idle | A late event can fill a gap and **merge** two sessions |

When someone says "sliding window", ask which tool they mean.

### Late data strategies

[Q8](#m7-q8) names three: drop, side output, re-open. In tool terms:

| Strategy | How | Cost |
|---|---|---|
| Grace period / allowed lateness | Keep the window open a while after the watermark (Kafka Streams `TimeWindows.ofSizeAndGrace`; Flink `allowedLateness`) | More state held for longer |
| Emit early, then update | Send a result now and corrected results later | Downstream must **upsert** by (key, window), not append |
| Final result only | Kafka Streams `suppress(untilWindowCloses)` | Higher delay; one clean result |
| Side output | Send late events to a separate stream (Flink `sideOutputLateData`) | Someone must handle that stream |
| Fix later in batch | A nightly job recomputes from the raw data | Two code paths to keep equal |

### State stores

- Aggregations and joins need **state** (counts, windows, the other side of a join).
- **Kafka Streams:** a local RocksDB store per task, backed by a compacted **changelog topic**. After a crash, the store is rebuilt from the changelog. That can be slow for big state, so use standby replicas (`num.standby.replicas`).
- **Flink:** a state backend (heap or RocksDB) plus periodic **checkpoints** to durable storage such as S3. Use savepoints to upgrade a job without losing state.
- State is split by key. If you change the key (`selectKey`), the tool writes a **repartition** topic. Joins need both inputs **co-partitioned**: same partition count, same partitioner.

### Exactly-once in stream processors

- **Kafka Streams:** `processing.guarantee=exactly_once_v2`. Output records, changelog writes and input offsets commit in one Kafka transaction. Readers downstream must use `read_committed`.
- **Flink:** checkpoint barriers flow through the job. On failure, Flink goes back to the last checkpoint and re-reads the source from the offsets saved in it. For end-to-end exactly-once, the sink must be **transactional** (commit when the checkpoint completes, for example the Kafka sink in exactly-once mode) or **idempotent** (upsert by key).
- **Costs:** results appear only after a commit or checkpoint, so delay goes up. Transaction timeouts must be longer than the checkpoint interval.
- **Limit:** an HTTP call or an email inside the job is still at-least-once. See [Q6](#m7-q6) and [delivery semantics](06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-delivery).

### Approximate data structures

| Structure | Answers | Memory | Error | Redis commands |
|---|---|---|---|---|
| HyperLogLog | "How many **distinct** items?" | 12 KB per key | 0.81% standard error | `PFADD`, `PFCOUNT`, `PFMERGE` |
| Count-min sketch | "How **often** did X appear?" | width × depth counters | Only **over**-counts, never under | `CMS.INITBYPROB`, `CMS.INCRBY`, `CMS.QUERY` |
| Bloom filter | "Have I **seen** X?" | About 9.6 bits per item for a 1% false-positive rate (from the standard formula) | "Maybe yes" can be wrong; "no" is always right. You cannot delete. | `BF.RESERVE`, `BF.ADD`, `BF.EXISTS` |

- All three **merge**: you can combine per-hour sketches into a day.
- Count-min sketch and Bloom filter came from the RedisBloom module (Redis Stack). Redis 8 includes them (verify). A Cuckoo filter is like a Bloom filter that supports delete.
- Job-platform uses: HyperLogLog for distinct tenants per day; count-min sketch to find "hot" tenants (noisy neighbours); a Bloom filter for "has this email address bounced before?" in front of a database check.

### Backfill and replay with a separate consumer group

[Q11](#m7-q11) says why. Here is how:

1. Deploy the fixed code as a **new consumer group**, for example `job-analytics-backfill-2026-10`. The live group keeps running.
2. Set its start position: `kafka-consumer-groups.sh --group <g> --topic jobs --reset-offsets --to-datetime 2026-10-01T00:00:00.000 --execute` (the group must be stopped), or `offsetsForTimes` in code.
3. Write to a **shadow** output (a new table or topic), or use idempotent upserts keyed by (entity, window). Never append on top of live results.
4. **Throttle** it (fewer instances, smaller `max.poll.records`, client quotas) so live consumers keep their latency.
5. Give it its own watermark settings. Old data arrives fast and out of order.
6. **Turn off side effects.** A backfill must not resend emails or webhooks. Use a "replay mode" flag.
7. Compare shadow and live results (counts, samples), then switch readers and delete the backfill group.

You can only replay what Kafka still holds. For longer history, use longer retention, tiered storage, or an archive in S3.

<a id="add-multiregion"></a>

## ➕ Multi-region patterns

[Q15](#m7-q15) compares active-active and active-passive. [Q16](#m7-q16) defines RPO and RTO. This section adds the patterns, the conflict problem and a checklist.

### Patterns with RPO and RTO

The ranges come from the AWS whitepaper "Disaster Recovery of Workloads on AWS" (verify the current wording). They are rough, not promises.

| Pattern | Writes | RPO | RTO | Cost |
|---|---|---|---|---|
| Backup and restore | One region | Time since the last backup (hours) | Hours (rebuild everything) | Lowest |
| Pilot light | One region; data replicated, little compute in region 2 | Replication lag | Tens of minutes (start and scale compute) | Low |
| Warm standby (active-passive) | One region; a smaller full copy runs in region 2 | Replication lag | Minutes | Medium |
| Active-active, home region per entity | Each entity is written only in its home region | Replication lag, for entities whose home failed | Minutes (move the home) | High |
| Active-active, multi-writer | Any region writes anything | Near zero for local writes, but conflicts | Near zero | Highest, and the hardest to get right |

The key sentence: **with asynchronous replication, RPO is never zero.** Writes that did not reach the other region before the failure are lost or stuck. RPO = 0 needs synchronous cross-region writes, which adds the cross-region round trip to every write.

### Per-entity home region (write ownership)

- Every tenant or user has a `home_region`. **Only** the home region writes their data. Other regions read a replica, which can be stale.
- Routing: a small global directory (`tenant → region`), replicated and cached. Or put the region in the ID (for example a tenant ID prefix).
- For read-your-writes, send the user's reads to the home region too.
- **Moving a home:** stop writes for that entity, wait until replication catches up, change the directory entry (with a version number, as fencing), then allow writes again.
- This is [Q15](#m7-q15)'s "single-region ownership for writes per entity". It removes write conflicts without any clever merge logic.

### Conflict resolution

**Last-write-wins (LWW)** keeps the write with the newest timestamp. It is simple and dangerous:

- It **silently drops** a write. Example: in Mumbai a user changes their email; at the same moment in Frankfurt an admin changes their phone. With row-level LWW, one of the two changes disappears, and no one is told.
- Clock skew can pick the **older** write as the winner ([clocks](06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-clocks)).
- Counters break: two `+1`s become one `+1`.
- Field-level LWW is better, but still drops concurrent changes to the same field.

**CRDTs (conflict-free replicated data types)** are data types whose merge gives the same result in any order, and merging twice changes nothing. So replicas agree without coordination.

| CRDT | Idea | Use |
|---|---|---|
| G-Counter | One counter per region; value = sum | Views, likes |
| PN-Counter | Two G-Counters: increments and decrements | Counts that go up and down |
| OR-Set | Add-wins set with unique tags | Shopping cart, tags |
| LWW-Register | One value, newest timestamp wins | Still LWW, use with care |
| Sequence CRDTs (RGA; libraries such as Yjs, Automerge) | Ordered text | Collaborative editing |

CRDTs **cannot** protect rules like "balance ≥ 0" or "username is unique". Those need one authority (a home region or consensus).

Products: Redis Enterprise Active-Active uses CRDTs. Azure Cosmos DB multi-region writes use LWW by default, with custom resolution as an option. DynamoDB global tables use LWW, and now also offer a multi-region strong consistency mode (verify both).

### Data residency

- Some laws or contracts require data to stay in a country. Example: India's RBI rule on storing payment-system data in India (verify the current scope).
- Make the **home region = the residency region**. Do not replicate that data out of it, or only in a pseudonymised or encrypted form that is allowed.
- Watch the hidden copies: **logs, traces, analytics, search indexes and backups** count too. Logs with personal data are the most common leak.
- Disaster recovery may need two regions inside the same country (for example AWS Mumbai `ap-south-1` and Hyderabad `ap-south-2`).

### DNS and anycast failover

- **DNS failover:** health-checked records (for example Route 53 failover or latency routing) with a low TTL. But resolvers and clients can cache longer than the TTL.
- **.NET trap:** `HttpClient` reuses pooled connections and does not look up DNS again. Set `SocketsHttpHandler.PooledConnectionLifetime` (for example a few minutes) so clients follow a DNS change.
- **Anycast:** one IP address is announced from many locations, and BGP routing sends users to the nearest healthy one. Failover means withdrawing the route, so there is no DNS cache problem. Examples: AWS Global Accelerator, Cloudflare. Long connections (WebSocket, SignalR) can drop when the route changes, so clients need reconnect logic.
- **Fence the old region before you promote the new one.** Otherwise both regions accept writes: split brain across regions.

### Checklist: "evolve design X to two regions"

1. **Why?** Lower latency, disaster recovery, or data residency? Write down RPO and RTO targets.
2. **Classify the data:** reference data (replicate everywhere), per-tenant data (home region), money and stock (one authority), analytics (eventual).
3. **Choose write ownership:** home region per tenant, and a routing layer that knows it.
4. **Global uniqueness** (usernames, email addresses): one global authority, or region-prefixed IDs.
5. **IDs:** UUIDv7 or ULID, not database sequences that clash across regions.
6. **Replication:** what is replicated, how, the expected lag, and the lag alert.
7. **Messaging:** a broker and an outbox per region. Cross-region events through Kafka MirrorMaker 2, RabbitMQ Shovel or Federation, or EventBridge cross-region rules.
8. **Idempotency keys** must work if a retry lands in the other region: store them with the entity in its home region.
9. **Caches** per region, with invalidation from the replicated change stream.
10. **Scheduled jobs and leases:** decide if a job runs once globally or once per region.
11. **Failover:** who decides (automatic or a human), how the old region is fenced, and whether the surviving region has capacity for **all** the traffic.
12. **Failback:** how to reconcile writes the failed region accepted but did not replicate.
13. **Test it:** regular failover drills. An untested failover usually fails.
14. **Cost:** double capacity plus cross-region data transfer.

For your job platform: each tenant has a home region; its jobs are created and run there. When a region fails, the new region re-queues jobs whose leases belonged to the dead region. Idempotency and fencing make the duplicates harmless.

<a id="add-schema-evolution"></a>

## ➕ API and message schema evolution

[GAP-04-010](#gap-04-010) and [GAP-04-011](#gap-04-011) give the short answers. This section gives the rules and the deploy order.

### Safe and breaking changes

| Safe (additive) | Breaking |
|---|---|
| Add an **optional** response field | Remove or rename a field |
| Add a new endpoint or a new event type | Change a field's type (`int` → `string`) |
| Add an optional request field with a default | Add a **required** request field |
| Make a validation rule looser | Make a validation rule stricter |
| | Change a field's **meaning** or unit (rupees → paise) |
| | Add an enum value, if clients fail on unknown values |

### Tolerant readers

A tolerant reader takes what it needs and ignores the rest.

- Ignore unknown fields. `System.Text.Json` does this by default.
- Handle unknown enum values. `JsonStringEnumConverter` **throws** on an unknown string, so map unknown values to an `Unknown` member with a custom converter, or keep the field as a string.
- Do not validate the whole message against a strict schema. Check only the fields you use.
- Treat a missing optional field as its default.

### Never reuse field numbers or names

- **Protobuf:** the field **number** is the identity on the wire. When you delete a field, mark it `reserved 4; reserved "old_name";`. If you reuse 4 for a new field, old messages are read as the wrong data, with no error.
- **JSON:** never reuse an old field name with a new meaning. Add a new name.
- **Events:** if a change cannot be made compatible, create a **new event type** (`JobCompletedV2`) and publish both for a while.

### API versioning strategies

| Strategy | Example | Good | Bad |
|---|---|---|---|
| URL path | `/v2/jobs` | Clear; easy to route and to cache | The version is not really part of the resource |
| Query string | `/jobs?api-version=2` | Easy to try in a browser | Easy to forget |
| Header | `api-version: 2` | Clean URLs | Hidden; harder to test by hand |
| Media type | `Accept: application/vnd.rahul.jobs.v2+json` | Very precise (per representation) | The most complex for clients |

- In ASP.NET Core, the `Asp.Versioning.Http` / `Asp.Versioning.Mvc` packages support all four.
- Version only for **breaking** changes. Additive changes do not need a new version.
- Announce removal with `Deprecation` and `Sunset` response headers (RFC 8594 for `Sunset`; `Deprecation` has its own RFC, verify the number), and watch usage per version before you turn one off.

### Deploy order

The rule: **the reader must understand a new shape before any writer sends it.**

- **New field or new event type that consumers must handle:** deploy **consumers first** (they accept old and new), then producers.
- **A field that a producer will stop sending:** first make consumers treat it as optional, then stop sending it.
- With a schema registry, the mode tells you the order: `BACKWARD` → consumers first; `FORWARD` → producers first ([compatibility modes](#add-kafka-cheatsheet)).
- **Old messages live a long time:** in Kafka retention, in DLQs, in outbox tables. New code must still read every version it can meet. **Upcasters** convert an old version to the new one when the message is read.
- Put a `type` and a `version` in every message envelope so a consumer knows what it has.

### Dual writing during migrations (expand and contract)

Example: move `jobs.payload` from a text column to a new `jsonb` column.

1. **Expand:** add the new column. Nothing reads it yet.
2. **Dual write:** new code writes both columns **in the same database transaction**.
3. **Backfill:** copy old rows to the new column, in small batches.
4. **Switch reads**, behind a feature flag. Compare old and new for a while (shadow reads).
5. **Stop writing the old column.**
6. **Contract:** drop the old column after every reader has moved.

Each step is a separate deploy, and each one can be rolled back.

**Warning:** dual writing to **two different systems** (two databases, or a database and a broker) is the dual-write problem again ([Q16](06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q16)). One write can succeed and the other fail. Use the outbox or CDC to feed the second system, and reconcile at the end.

For a topic migration: produce to the old and new topics (from the outbox), move consumers one by one, then stop the old topic. Some consumers may see a message on both topics during the move, so they must be idempotent.
