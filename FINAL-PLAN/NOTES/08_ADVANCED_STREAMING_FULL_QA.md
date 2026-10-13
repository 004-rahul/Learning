# Advanced distributed systems, streaming and RAG Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q07"></a>

## Q07 — M7_Advanced_Distributed_and_Streaming

Full source content: [Q-and-A/M7_Advanced_Distributed_and_Streaming.docx](../SOURCE_LIBRARY/Q-and-A/M7_Advanced_Distributed_and_Streaming.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="Q07-B0001"></a>

Month 7 Q&A - Advanced Distributed Systems and Streaming

<a id="Q07-B0002"></a>

Weeks 25 to 28. The topics that separate SDE II from SDE I. 26 questions.

<a id="Q07-B0003"></a>

Covers: Weeks 25-28. Kafka in depth, stream processing, advanced consistency, multi-region, time series, and the RAG service.

<a id="Q07-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q07-B0005"></a>

### How to use this on a bad week

<a id="Q07-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q07-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q07-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q07-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q07-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q07-B0011"></a>

| # | Question |
| --- | --- |
| 1 | When does Kafka beat SQS, concretely? |
| 2 | What is the difference between linearizability and serializability? |
| 3 | Why is event time harder than processing time? |
| 4 | What is write skew and which isolation levels permit it? |
| 5 | What is the hardest part of building a RAG service? |

<a id="Q07-B0012"></a>

### What this file answers

<a id="Q07-B0013"></a>

The Month 7 checkpoint, plus the questions that come up when an interviewer decides you are strong and starts probing for the ceiling. Most candidates at your level cannot answer Part B or Part C.

<a id="Q07-B0014"></a>

### PART A - Kafka in depth

<a id="Q07-Q001"></a>

<a id="Q07-B0015"></a>

### Q1. When does Kafka beat SQS, concretely?

<a id="Q07-B0016"></a>

Say this. Three cases. When you need replay - reprocessing history after fixing a bug, or backfilling a new feature. When several independent consumer groups need the same stream, because each tracks its own offset rather than competing for messages. And when you need ordering by key at high throughput, which partitioning gives you.

<a id="Q07-B0017"></a>

Why. SQS is a queue: a message is consumed and deleted, so there is nothing to replay and one consumer's read denies it to another. Kafka is a log: reading does not remove, so the same data serves many consumers and many times.

<a id="Q07-B0018"></a>

Instead of. SQS wins on operational simplicity - managed, no partition sizing, no rebalancing, built-in DLQ, and per-message visibility timeouts. For your email pipeline it was the right call, and saying so with a reason is stronger than reaching for Kafka.

<a id="Q07-Q002"></a>

<a id="Q07-B0019"></a>

### Q2. Explain consumer group rebalancing and why it hurts.

<a id="Q07-B0020"></a>

Say this. Partitions are assigned to consumers in a group. When a consumer joins, leaves or is deemed dead, the group rebalances and reassigns partitions. In the classic protocol every consumer stops consuming during the rebalance - a stop-the-world pause - so a rolling deploy of ten consumers can cause ten pauses.

<a id="Q07-B0021"></a>

Why. The group needs a consistent view of who owns what, and the simple way to get that is to stop everyone and redistribute. Incremental cooperative rebalancing was added precisely to avoid this.

<a id="Q07-B0022"></a>

Watch out. A consumer that processes a batch for longer than the poll interval is considered dead and triggers a rebalance - which then makes everything slower and can cascade. Tuning max poll records and the interval is the fix.

<a id="Q07-Q003"></a>

<a id="Q07-B0023"></a>

### Q3. How does Kafka guarantee ordering, and what is the limit?

<a id="Q07-B0024"></a>

Say this. Within a single partition, messages are strictly ordered by offset. Across partitions there is no ordering at all. So you get ordering per key by partitioning on that key - all events for one user or one document land in one partition.

<a id="Q07-B0025"></a>

Why. A partition is a single append-only file with one owner at a time, which is what makes order cheap. Ordering across partitions would require global coordination and destroy the throughput.

<a id="Q07-B0026"></a>

Watch out. The consequence is that parallelism is capped by partition count, and you cannot easily increase partitions later without breaking existing key-to-partition mapping. That sizing decision is one of the few genuinely hard-to-reverse Kafka choices.

<a id="Q07-Q004"></a>

<a id="Q07-B0027"></a>

### Q4. What is log compaction and when do you want it?

<a id="Q07-B0028"></a>

Say this. Compaction keeps only the latest value for each key, discarding older ones, rather than deleting by age. You want it when the topic represents current state rather than a sequence of events - a table of user profiles, or configuration - so a new consumer can rebuild the full current state by reading from the beginning.

<a id="Q07-B0029"></a>

Why. It turns a log into a durable, replayable key-value snapshot. That is the mechanism behind change-data-capture topics and the pattern usually called a log-backed table.

<a id="Q07-B0030"></a>

Watch out. It does not guarantee immediate removal - compaction is a background process, so you may still see older versions for a while. And a delete is a tombstone: a null value for the key.

<a id="Q07-Q005"></a>

<a id="Q07-B0031"></a>

### Q5. What are ISR and acks, and how do they relate to durability?

<a id="Q07-B0032"></a>

Say this. The in-sync replica set is the replicas caught up with the leader. `acks=0` does not wait at all; `acks=1` waits for the leader only, so a leader failure right after can lose the message; `acks=all` waits for every in-sync replica. Combined with `min.insync.replicas`, that gives you a real durability guarantee.

<a id="Q07-B0033"></a>

Why. Durability is a quorum property. Acknowledging from the leader alone means one machine holds the only copy for a window, and that window is where data loss lives.

<a id="Q07-B0034"></a>

Watch out. `acks=all` with `min.insync.replicas=1` is a trap - it looks safe and is not, because the ISR can shrink to just the leader. Set it to 2 with a replication factor of 3.

<a id="Q07-Q006"></a>

<a id="Q07-B0035"></a>

### Q6. Kafka claims exactly-once semantics. Is that a contradiction?

<a id="Q07-B0036"></a>

Say this. No, but it is narrower than it sounds. Kafka offers idempotent producers - deduplicating retries using a producer ID and sequence number - and transactions that atomically commit both the messages produced and the consumer offsets. So a read-process-write loop entirely within Kafka can be exactly-once.

<a id="Q07-B0037"></a>

Why. It works because Kafka controls both sides of the operation. The moment your side effect is outside Kafka - a database write, an email, an HTTP call - the guarantee stops applying and you are back to idempotent handlers.

<a id="Q07-B0038"></a>

Watch out. This is the nuance that impresses. "Exactly-once within the Kafka boundary, at-least-once plus idempotency outside it" is the precise answer.

<a id="Q07-B0039"></a>

### PART B - Stream processing

<a id="Q07-Q007"></a>

<a id="Q07-B0040"></a>

### Q7. Why is event time harder than processing time?

<a id="Q07-B0041"></a>

Say this. Event time is when the thing happened; processing time is when you saw it. They differ because of network delays, retries, mobile devices offline for hours, and backfills. So a window over event time cannot simply close when the clock passes its end - late data may still arrive for it.

<a id="Q07-B0042"></a>

Why. Processing time gives you a deterministic, immediately closeable window and the wrong answer. Event time gives the right answer and forces you to decide how long to wait.

<a id="Q07-B0043"></a>

Watch out. Processing-time results are also non-reproducible: replay the same data and you get different windows. Event-time results are reproducible, which matters enormously for billing or analytics.

<a id="Q07-Q008"></a>

<a id="Q07-B0044"></a>

### Q8. What is a watermark?

<a id="Q07-B0045"></a>

Say this. An assertion by the stream processor that it believes it has seen all events with a timestamp earlier than X. When the watermark passes the end of a window, the window is closed and emitted. It is a heuristic about completeness, not a fact.

<a id="Q07-B0046"></a>

Why. You cannot know that no more late data will arrive, so you need a decision rule. The watermark is that rule, made explicit and tunable.

<a id="Q07-B0047"></a>

Watch out. Anything arriving after the watermark is late data, and you must choose: drop it, send it to a side output, or re-open the window and emit a correction. Naming the three options is the strong answer.

<a id="Q07-Q009"></a>

<a id="Q07-B0048"></a>

### Q9. Tumbling, sliding or session windows?

<a id="Q07-B0049"></a>

Say this. Tumbling - fixed, non-overlapping intervals, so every event is in exactly one window. Good for "hits per minute". Sliding - fixed size, advancing by a smaller step, so windows overlap and an event is in several. Good for "average over the last five minutes, updated every minute". Session - dynamic, closing after a gap of inactivity. Good for user sessions, where the natural boundary is a pause rather than a clock.

<a id="Q07-B0050"></a>

Why. They differ in whether the boundary is fixed by the clock or by the data. Session windows need per-key state because each key has its own gap timer.

<a id="Q07-B0051"></a>

Watch out. Sliding windows multiply the state and the output volume by size divided by step. A 24-hour window sliding every minute is 1,440 open windows per key - a very common cause of unexpected memory blowup.

<a id="Q07-Q010"></a>

<a id="Q07-B0052"></a>

### Q10. How do you count distinct users at scale without exact state?

<a id="Q07-B0053"></a>

Say this. HyperLogLog. It gives a cardinality estimate in a fixed small amount of memory - a few kilobytes for billions of items, with a couple of percent error - and it merges, so you can compute per-hour sketches and union them for a day.

<a id="Q07-B0054"></a>

Why. Exact distinct counting needs to remember every item seen, so memory grows with cardinality. HLL trades a small bounded error for constant memory, which is almost always the right trade for analytics.

<a id="Q07-B0055"></a>

Watch out. Its sibling is count-min sketch for frequency estimation - "is this key hot?" Both are good to name, and both are in Redis, which makes them practical rather than academic.

<a id="Q07-Q011"></a>

<a id="Q07-B0056"></a>

### Q11. What is backfill, and why is replay a design requirement?

<a id="Q07-B0057"></a>

Say this. Backfill is reprocessing historical data - because you fixed a bug, added a field, or changed a calculation. It is a design requirement because bugs in stream processing are discovered after the data has flowed, and without replay your only option is to accept permanently wrong history.

<a id="Q07-B0058"></a>

Why. This is the concrete argument for a log rather than a queue: a retained log lets you rewind the offset and reprocess. With a queue the data is gone.

<a id="Q07-B0059"></a>

Watch out. Backfill competes with live traffic for capacity, and it can produce out-of-order and very-late events that break your watermarks. Running it on a separate consumer group with its own resources is the usual answer.

<a id="Q07-B0060"></a>

### PART C - Advanced consistency

<a id="Q07-Q012"></a>

<a id="Q07-B0061"></a>

### Q12. Linearizability or serializability - what is the difference?

<a id="Q07-B0062"></a>

Say this. They are not the same thing. Linearizability is about single operations on single objects: every operation appears to take effect at one instant, and everyone sees them in the same real-time order. Serializability is about transactions over multiple objects: the result is equivalent to running them one at a time in some order - not necessarily the real-time order.

<a id="Q07-B0063"></a>

Why. One is a recency guarantee, the other is an isolation guarantee. A system can be serializable but not linearizable, because it may serialise your transaction before one that actually committed earlier. Strict serializability is both.

<a id="Q07-B0064"></a>

Watch out. This is a genuine differentiator - most candidates at your level use the terms interchangeably. Being precise about it signals real reading.

<a id="Q07-Q013"></a>

<a id="Q07-B0065"></a>

### Q13. What is snapshot isolation and what does it permit?

<a id="Q07-B0066"></a>

Say this. Each transaction reads a consistent snapshot as of its start time, so readers never block writers. Write-write conflicts are detected and one transaction aborts. What it permits is write skew: two transactions read overlapping data, each writes a different row, so there is no write-write conflict to detect, and together they violate a constraint neither would have broken alone.

<a id="Q07-B0067"></a>

Why. The conflict is on a condition across rows, not on a row. Snapshot isolation only watches rows.

<a id="Q07-B0068"></a>

Watch out. The classic example is two doctors both going off-call because each sees the other still on. The fix is serializable isolation, or materialising the conflict by locking the thing the condition depends on.

<a id="Q07-Q014"></a>

<a id="Q07-B0069"></a>

### Q14. What are read-your-writes and monotonic reads?

<a id="Q07-B0070"></a>

Say this. Read-your-writes: after you write, you always see at least your own write - so your comment does not vanish after you post it. Monotonic reads: you never see time go backwards - once you have seen a value, a later read does not show an older one. Both are per-client session guarantees, weaker than strong consistency but far more useful than plain eventual.

<a id="Q07-B0071"></a>

Why. They target the anomalies users actually notice. Full linearizability is expensive; these two remove most of the visible weirdness for a fraction of the cost.

<a id="Q07-B0072"></a>

Watch out. You get them practically by pinning a session to one replica, or by tracking a version token and waiting for the replica to reach it. Naming an implementation makes the answer concrete.

<a id="Q07-Q015"></a>

<a id="Q07-B0073"></a>

### Q15. Active-active or active-passive?

<a id="Q07-B0074"></a>

Say this. Active-passive: one region serves, the other stands by with replicated data. Simple, no write conflicts, but you waste the standby and failover takes time and is rarely rehearsed. Active-active: both serve. Better utilisation and lower latency for users near each region, but you now have concurrent writes in two places, so you need conflict resolution or partitioning of write ownership by key.

<a id="Q07-B0075"></a>

Why. The hard part of active-active is not the infrastructure, it is deciding what happens when the same entity is written in both regions during a partition.

<a id="Q07-B0076"></a>

Watch out. The usual real answer is active-active for reads, single-region ownership for writes per entity. That gets most of the benefit without the conflict problem.

<a id="Q07-Q016"></a>

<a id="Q07-B0077"></a>

### Q16. What are RPO and RTO?

<a id="Q07-B0078"></a>

Say this. RPO - recovery point objective - is how much data you can afford to lose, measured in time. RTO - recovery time objective - is how long you can afford to be down. RPO drives your replication and backup strategy; RTO drives your failover automation.

<a id="Q07-B0079"></a>

Why. They are business decisions, not engineering ones. An RPO of zero requires synchronous replication and therefore higher write latency, so someone has to decide what the data is worth.

<a id="Q07-B0080"></a>

Watch out. "We take nightly backups" implies an RPO of up to 24 hours. Saying that out loud is often the first time anyone realises it is unacceptable.

<a id="Q07-Q017"></a>

<a id="Q07-B0081"></a>

### Q17. Why is replication lag operationally dangerous?

<a id="Q07-B0082"></a>

Say this. Because it is invisible until it matters. Reads go stale, failover to a lagging replica loses the un-replicated writes, and lag typically grows exactly when the system is busiest - so it is worst during an incident.

<a id="Q07-B0083"></a>

Why. A replica applies changes serially from the leader's log. If write volume exceeds the replica's apply rate, the gap grows without bound and there is no natural back-pressure.

<a id="Q07-B0084"></a>

Watch out. Alert on lag, not on replica health. A replica can be perfectly healthy and twenty minutes behind, and that is a data-loss risk you cannot see from a ping.

<a id="Q07-B0085"></a>

### PART D - Time series and geospatial

<a id="Q07-Q018"></a>

<a id="Q07-B0086"></a>

### Q18. Why is cardinality the hard part of a metrics system?

<a id="Q07-B0087"></a>

Say this. Each unique combination of metric name and label values is a separate time series to store and index. Adding a label with high cardinality - a user ID, a request ID, a URL with an ID in it - multiplies series count by that cardinality, and memory and query cost go with it. This is the standard way monitoring systems fall over.

<a id="Q07-B0088"></a>

Why. The storage is optimised for many points on few series. Reverse that and every optimisation stops working.

<a id="Q07-B0089"></a>

Watch out. "Never put an unbounded value in a label" is the rule. Use logs or traces for high-cardinality detail, metrics for aggregates. That division is the answer.

<a id="Q07-Q019"></a>

<a id="Q07-B0090"></a>

### Q19. What is downsampling and why does it work for time series?

<a id="Q07-B0091"></a>

Say this. Keep raw resolution for a short retention, then roll up into coarser buckets - one-minute averages for a week, one-hour for a year. It works because nobody queries per-second data from eight months ago; the value of resolution decays much faster than the value of history.

<a id="Q07-B0092"></a>

Why. Storage cost is points times retention. Downsampling reduces points per unit time as the data ages, so cost grows logarithmically rather than linearly.

<a id="Q07-B0093"></a>

Watch out. Keep min, max and count alongside the average, not just the average - otherwise you lose the spikes, which are the only interesting part of old data.

<a id="Q07-Q020"></a>

<a id="Q07-B0094"></a>

### Q20. How do you find nearby items at scale?

<a id="Q07-B0095"></a>

Say this. Reduce two dimensions to one so you can use an ordinary index. Geohashing encodes lat/long into a string where a shared prefix means physical proximity, so a prefix query finds a neighbourhood. Quadtrees recursively subdivide space, adapting depth to density, which handles cities and oceans differently.

<a id="Q07-B0096"></a>

Why. Standard indexes are one-dimensional. Any geospatial solution is fundamentally a trick for mapping 2D locality onto a 1D ordering.

<a id="Q07-B0097"></a>

Watch out. Geohash has an edge problem: two points either side of a cell boundary can be metres apart with different prefixes. You query the cell plus its eight neighbours. Mentioning that is the mark of someone who has implemented it.

<a id="Q07-Q021"></a>

<a id="Q07-B0098"></a>

### Q21. How does object storage achieve durability without keeping full copies?

<a id="Q07-B0099"></a>

Say this. Erasure coding. Split the object into k data shards, compute m parity shards, and distribute all k+m across failure domains. Any k of them reconstruct the object, so you survive m losses while storing only (k+m)/k times the data - roughly 1.5x for 6+3, versus 3x for triple replication.

<a id="Q07-B0100"></a>

Why. It is the same mathematics as RAID, applied across machines and racks. You trade CPU on read reconstruction for a large storage saving.

<a id="Q07-B0101"></a>

Watch out. The cost is repair traffic and read latency when a shard is missing - reconstruction must fetch k shards from k machines. That is why replication is often preferred for small hot objects and erasure coding for large cold ones.

<a id="Q07-B0102"></a>

### PART E - The RAG service

<a id="Q07-Q022"></a>

<a id="Q07-B0103"></a>

### Q22. What is actually hard about building a RAG service?

<a id="Q07-B0104"></a>

Say this. Retrieval, not generation. If the retrieved context does not contain the answer, no model can produce it. So the hard parts are chunking - how you split documents determines what can ever be retrieved - and hybrid search, because pure vector similarity misses exact terms like error codes, names and IDs.

<a id="Q07-B0105"></a>

Why. Everyone focuses on the prompt because that is the visible part. The failure taxonomy is mostly retrieval failures: missing content, wrong chunk boundaries, right chunk ranked too low.

<a id="Q07-B0106"></a>

Watch out. Prove retrieval before you add generation. Build the search, measure recall@k on a labelled set, and only then generate. That ordering is itself a strong engineering signal.

<a id="Q07-Q023"></a>

<a id="Q07-B0107"></a>

### Q23. Why is chunking the main quality lever?

<a id="Q07-B0108"></a>

Say this. Because a chunk is the smallest unit that can be retrieved. Too large and the embedding is a blur of several topics, so it matches nothing precisely. Too small and it loses the context needed to be useful, and the answer gets split across chunks that are individually unconvincing. Overlapping windows and respecting document structure - headings, paragraphs - both help.

<a id="Q07-B0109"></a>

Why. An embedding is one vector for the whole chunk. Its ability to represent meaning degrades as the chunk covers more distinct meanings.

<a id="Q07-B0110"></a>

Watch out. Have a number: "I tested three chunk sizes and measured recall@5 on a labelled set of fifty questions." Almost no candidate measures, so measuring is the differentiator.

<a id="Q07-Q024"></a>

<a id="Q07-B0111"></a>

### Q24. Why pgvector rather than a dedicated vector database?

<a id="Q07-B0112"></a>

Say this. Because you already run Postgres and know it deeply, so it removes an entire piece of infrastructure, a second consistency model, and a second operational surface. You can join embeddings against your relational metadata in one query, which is exactly what hybrid search and filtered retrieval need.

<a id="Q07-B0113"></a>

Why. A dedicated vector database wins at very large scale and on specialised index types. At your scale that advantage is theoretical and the operational cost is real.

<a id="Q07-B0114"></a>

Watch out. The reasoning is the interview answer, not the choice. "I chose the boring option because it removed a component and I could justify the limits" is what a senior engineer sounds like.

<a id="Q07-Q025"></a>

<a id="Q07-B0115"></a>

### Q25. How do you evaluate a RAG system?

<a id="Q07-B0116"></a>

Say this. Two layers. Retrieval: recall@k and mean reciprocal rank against a labelled set of questions with known correct chunks. Generation: groundedness - is every claim supported by a retrieved chunk - plus answer correctness. Build a set of fifty to a hundred question-answer pairs once and re-run it on every change.

<a id="Q07-B0117"></a>

Why. Without a fixed evaluation set every change is an opinion. With one, you can say "hybrid search moved recall@5 from 0.71 to 0.88", which is an engineering statement.

<a id="Q07-B0118"></a>

Watch out. Citations are how you make groundedness checkable at runtime as well as in evaluation. Requiring every claim to cite a chunk makes hallucination visible to the user.

<a id="Q07-B0119"></a>

### PART F - The Month 7 checklist

<a id="Q07-B0120"></a>

| # | True? |
| --- | --- |
| 1 | Every interview has produced a written analysis with a named root cause |
| 2 | Gaps are actually closing, not recurring - and if one recurred three times, I changed the method |
| 3 | Can explain Kafka's model and when it beats SQS |
| 4 | Can distinguish linearizability from serializability |
| 5 | Can explain write skew and which isolation levels permit it |
| 6 | 4 full mock loops done this month |
| 7 | Both projects survive 30 minutes of hostile questioning |
| 8 | The RAG service is built, deployed, and has measured recall numbers |
| 9 | Pipeline still active |

<a id="Q07-B0121"></a>

The recurring-gap rule, restated because it matters most this month. If the same root cause appears three times in your analysis log, your repair method is wrong, not your effort. Stop repeating the practice and change its shape: implement the algorithm from scratch from memory until it is automatic, rather than solving more problems that use it. Repetition of failure is not practice.
