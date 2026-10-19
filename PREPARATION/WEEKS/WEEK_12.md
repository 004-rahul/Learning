# Week 12 — Weighted paths, intervals, greedy · OS and messaging · PROJECT M2

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 11](WEEK_11.md) [Week 13 →](WEEK_13.md)

**Phase 2 — Core depth and the project starts** · Days 78–84 · default dates Mon 11 Jan 2027 – Sun 17 Jan 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Dijkstra, MST, intervals, greedy with proofs  
**Core this week:** Schedulers, sync primitives, async I/O; queues, delivery guarantees, retries, DLQ, outbox

**Goal:** Pick the right shortest-path algorithm, prove a greedy choice, explain delivery guarantees, and run a queued job end to end.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Network Delay Time with Dijkstra (stale entries skipped) and Merge Intervals solved.
- [ ] You can explain at-least-once delivery, idempotency and the outbox in your own words.
- [ ] PROJECT M2: a separate worker processes queued jobs through RabbitMQ with attempt history and graceful shutdown.
- [ ] Month 3 checkpoint completed (mixed graph/interval task + one coherent design).

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [78 Mon](#day-78) | Weighted shortest path | Network Delay Time | OS scheduler vs .NET scheduler; mutex, semaphore, spinlock; async I/O without a thread |
| [79 Tue](#day-79) | Sort and merge intervals | Merge Intervals, Insert Interval | Delivery guarantees, exactly-once processing, visibility timeouts |
| [80 Wed](#day-80) | Greedy interval scheduling | Non-overlapping Intervals, Minimum Number of Arrows to Burst Balloons, Meeting Rooms II | Retries with jitter, DLQ, SQS vs RabbitMQ vs Kafka |
| [81 Thu](#day-81) | Reachability with greedy state | Jump Game, Gas Station | Kafka partitions and ordering, backpressure, the outbox pattern; HttpClient lifetime |
| [82 Fri](#day-82) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [83 Sat](#day-83) | Deep work (5 h) | Cheapest Flights Within K Stops, Min Cost to Connect All Points, Jump Game II, Partition Labels | design + lab/project |
| [84 Sun](#day-84) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-78"></a>

## Day 78 · Monday · Mon 11 Jan 2027
**Weighted shortest path** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is a context switch expensive?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Dijkstra with PriorityQueue: a node is final when popped; skip stale entries. Network Delay Time.
   - Read first (short): [Shortest paths: BFS, 0-1 BFS, Dijkstra, Bellman-Ford, Floyd–Warshall](../NOTES/01_DSA.md#add-dsa-shortest-paths)
   - Solve: [Network Delay Time (743)](https://leetcode.com/problems/network-delay-time/) · Medium
   - Done when: You can say why BFS is wrong with weights and why Dijkstra breaks with negative edges. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: OS scheduler vs .NET scheduler; mutex, semaphore, spinlock; async I/O without a thread.**
   - Read: [M3 Q13. Where does the OS scheduler end and the .NET scheduler begin?](../NOTES/05_NETWORKING_OS.md#m3-q13); [M3 Q14. Mutex, semaphore or spinlock - and when is a spinlock catastrophic?](../NOTES/05_NETWORKING_OS.md#m3-q14); [M3 Q15. Why does async I/O not need a thread while waiting?](../NOTES/05_NETWORKING_OS.md#m3-q15); [OS labs in .NET](../NOTES/05_NETWORKING_OS.md#add-os-lab)
   - Do: Run the OS lab: thread-pool starvation with sync-over-async; watch the queue length in dotnet-counters.
4. **Explain aloud — 5 min.** *Why does async I/O not need a thread while waiting?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-79"></a>

## Day 79 · Tuesday · Tue 12 Jan 2027
**Sort and merge intervals** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why does async I/O not need a thread while waiting?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Merge Intervals (sort by start); Insert Interval. Decide whether touching endpoints overlap.
   - Read first (short): [Intervals](../NOTES/01_DSA.md#add-dsa-intervals); [8. Intervals](../NOTES/01_DSA.md#dsa-8-intervals)
   - Solve: [Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/) · Medium; [Insert Interval (57)](https://leetcode.com/problems/insert-interval/) · Medium
   - Done when: Touching and nested intervals handled. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Delivery guarantees, exactly-once processing, visibility timeouts.**
   - Read: [M3 Q24. Explain the delivery guarantees.](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q24); [M3 Q25. So how do you get exactly-once processing?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q25); [M3 Q26. What is a visibility timeout and what goes wrong with it?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q26); [BASIC-044 — What are queue delivery, idempotency and the outbox boundary?](../NOTES/00_START_FROM_ZERO.md#basic-044); [Delivery semantics and idempotency patterns](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-delivery)
   - Do: Write the three crash windows for 'consume → process → ack' and what each causes.
4. **Explain aloud — 5 min.** *Explain the delivery guarantees, and how you get exactly-once *processing*.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-80"></a>

## Day 80 · Wednesday · Wed 13 Jan 2027
**Greedy interval scheduling** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain the delivery guarantees, and how you get exactly-once *processing*.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Non-overlapping Intervals (sort by end; exchange argument). Minimum Arrows. Meeting Rooms II (premium — use a min-heap of end times; free on neetcode.io).
   - Read first (short): [Greedy: choice, proof, counterexample](../NOTES/01_DSA.md#add-dsa-greedy)
   - Solve: [Non-overlapping Intervals (435)](https://leetcode.com/problems/non-overlapping-intervals/) · Medium; [Minimum Number of Arrows to Burst Balloons (452)](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) · Medium; [Meeting Rooms II (253)](https://leetcode.com/problems/meeting-rooms-ii/) · Medium *(premium — free on neetcode.io/LintCode)*
   - Done when: You can give the exchange-argument proof in two sentences. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Retries with jitter, DLQ, SQS vs RabbitMQ vs Kafka.**
   - Read: [M3 Q27. Why do retries need jitter?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q27); [M3 Q28. What is a dead letter queue and what do you actually do with it?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q28); [M3 Q29. SQS, RabbitMQ or Kafka?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q29); [Retry policy design](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-retries); [RabbitMQ vs SQS vs Kafka — semantics table](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-rabbitmq-sqs)
   - Do: Write the retry policy for your project: attempts, backoff formula with jitter, what goes to the DLQ.
4. **Explain aloud — 5 min.** *SQS, RabbitMQ or Kafka — how do you choose?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-81"></a>

## Day 81 · Thursday · Thu 14 Jan 2027
**Reachability with greedy state** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *SQS, RabbitMQ or Kafka — how do you choose?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Jump Game (furthest reach), Gas Station. Find a counterexample to a wrong greedy rule.
   - Read first (short): [Greedy: choice, proof, counterexample](../NOTES/01_DSA.md#add-dsa-greedy)
   - Solve: [Jump Game (55)](https://leetcode.com/problems/jump-game/) · Medium; [Gas Station (134)](https://leetcode.com/problems/gas-station/) · Medium
   - Done when: You can explain why one pass is enough. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Kafka partitions and ordering, backpressure, the outbox pattern; HttpClient lifetime.**
   - Read: [M3 Q30. Explain Kafka partitions, offsets and consumer groups.](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q30); [M3 Q31. How do you guarantee ordering, and what does it cost?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q31); [M3 Q32. What is backpressure and why does it matter?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q32); [M3 Q33. What is the outbox pattern and what problem does it solve?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q33); [The transactional outbox in depth](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-outbox); [HttpClient, IHttpClientFactory and resilience](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-httpclient)
   - Do: Draw the outbox flow for your project: job row + outbox row in one transaction, relay, publish, mark sent.
4. **Explain aloud — 5 min.** *What is the outbox pattern and what problem does it solve?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-82"></a>

## Day 82 · Friday · Fri 15 Jan 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Network Delay Time, Merge Intervals, Insert Interval.
   - Then one problem you have not seen, with no pattern hint: [Path With Minimum Effort (1631)](https://leetcode.com/problems/path-with-minimum-effort/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why does async I/O not need a thread while waiting?* · *Explain the delivery guarantees, and how you get exactly-once *processing*.* · *SQS, RabbitMQ or Kafka — how do you choose?* · *What is the outbox pattern and what problem does it solve?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Mixed set with no labels: one graph, one interval, one array problem from earlier weeks.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Activity selection (greedy by end time) with proof](../PROBLEMS.md#x-activity-selection) · own exercise; [Meeting Rooms (252)](https://leetcode.com/problems/meeting-rooms/) · Easy *(premium — free on neetcode.io/LintCode)*

---

<a id="day-83"></a>

## Day 83 · Saturday · Sat 16 Jan 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Cheapest Flights Within K Stops (Bellman-Ford style / BFS by level), Min Cost to Connect All Points (Prim or Kruskal), Jump Game II, Partition Labels.
   - Solve: [Cheapest Flights Within K Stops (787)](https://leetcode.com/problems/cheapest-flights-within-k-stops/) · Medium; [Min Cost to Connect All Points (1584)](https://leetcode.com/problems/min-cost-to-connect-all-points/) · Medium; [Jump Game II (45)](https://leetcode.com/problems/jump-game-ii/) · Medium; [Partition Labels (763)](https://leetcode.com/problems/partition-labels/) · Medium
3. **Design — 90 min.** Notification service HLD: channels and preferences, async delivery through queues, retries per channel, duplicate prevention, user-visible behaviour.
   - Use: [HLD card: Notification service (email/SMS/push)](../DESIGNS.md#hld-notification); [M3 Q36. Design a notification service - what is the hard part?](../NOTES/08_SYSTEM_DESIGN.md#m3-q36); [GAP-05-004 — Design notification system](../NOTES/08_SYSTEM_DESIGN.md#gap-05-004); [BASIC-044 — What are queue delivery, idempotency and the outbox boundary?](../NOTES/00_START_FROM_ZERO.md#basic-044)
4. **Lab / project — 90 min.** PROJECT M2 — RabbitMQ in Compose, a separate .NET worker (BackgroundService), consume → process → ack, attempt history table, graceful shutdown on Ctrl+C.
   - Use: [M2 — Asynchronous work (Week 12)](../PROJECT.md#project-m2); [BackgroundService: scopes, shutdown, errors and a queue consumer](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-background); [RabbitMQ vs SQS vs Kafka — semantics table](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-rabbitmq-sqs)
5. **English — 20 min.** Record 2 minutes: 'at-least-once delivery and idempotency'.

---

<a id="day-84"></a>

## Day 84 · Sunday · Sun 17 Jan 2027
**Test, review, project, stories** · 300 minutes

1. **Month 3 checkpoint — 90 min (replaces the weekly test).**
   - [ ] Mixed set (45 minutes each, no labels): one array, one tree, one graph or interval problem.
   - [ ] Answer the M3 self-test aloud (link above).
   - [ ] One coherent design from a blank page in 45 minutes: rate limiter or notification service, with API, schema and one failure case.
   - [ ] PROJECT: queued job flows API → DB → RabbitMQ → worker → DB.
   - [ ] Update WEAK; choose next month's three repair items.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Month 3 test (see checkpoint). Then finish PROJECT M2: stop the worker in the middle of a job and show the message is redelivered.
   - Use: [M3 PART F - The Month 3 self-test](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m3-part-f); [M3 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m3-guide); [M2 — Asynchronous work (Week 12)](../PROJECT.md#project-m2)
4. **Behavioral — 45 min.** Explain one trade-off you made at work in 30 seconds, 2 minutes and with full detail.
   - Use: [GAP-08-028 — Tell me about a time you had to choose between speed and quality.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-028); [A template for explaining any technical concept](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-explain)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 11](WEEK_11.md) · [The plan](../PLAN.md) · [Week 13 →](WEEK_13.md)
