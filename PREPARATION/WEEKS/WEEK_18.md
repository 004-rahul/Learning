# Week 18 — Timed coding · observability and cloud · PROJECT M8

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 17](WEEK_17.md) [Week 19 →](WEEK_19.md)

**Phase 3 — Project completion and design depth (Week 20 gate)** · Days 120–126 · default dates Mon 22 Feb 2027 – Sun 28 Feb 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Timed mediums with narration; first coding mocks  
**Core this week:** Logs/metrics/traces, OpenTelemetry, SLOs, percentiles, AWS basics, bottlenecks, tenant fairness

**Goal:** Complete two reviewed coding mocks and trace one accepted job through a running system.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Two coding mocks done (45 minutes each, narrated) with written feedback.
- [ ] PROJECT M8: one job traced API → outbox → broker → worker → DB in a trace viewer; metrics for submitted/completed/failed/queue age.
- [ ] A noisy tenant cannot starve other tenants (test).
- [ ] News feed HLD done.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [120 Mon](#day-120) | Coding mock one | Time Based Key-Value Store, Find Peak Element | Logs, metrics, traces; RED/USE; correlation IDs; OpenTelemetry in .NET |
| [121 Tue](#day-121) | Mock repair | Search a 2D Matrix II, Kth Smallest Element in a Sorted Matrix | SLIs, SLOs, error budgets; p50/p95/p99 |
| [122 Wed](#day-122) | Coding mock two | Binary Tree Zigzag Level Order Traversal, Populating Next Right Pointers in Each Node | Cloud basics on AWS (compute, RDS, Amazon MQ/SQS, S3, IAM, VPC, cost); Kubernetes overview |
| [123 Thu](#day-123) | Code comprehension | Sum Root to Leaf Numbers | Finding bottlenecks under load; tenant fairness |
| [124 Fri](#day-124) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [125 Sat](#day-125) | Deep work (5 h) | Reverse Nodes in k-Group, Kth Smallest Element in a BST, Path Sum II | design + lab/project |
| [126 Sun](#day-126) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-120"></a>

## Day 120 · Monday · Mon 22 Feb 2027
**Coding mock one** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain circuit-breaker states and why retries alone amplify an outage.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** 45-minute unfamiliar medium with a timer, talking aloud the whole time. Log any help you needed.
   - Read first (short): [The coding round script (45 minutes)](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-coding-script)
   - Solve: [Time Based Key-Value Store (981)](https://leetcode.com/problems/time-based-key-value-store/) · Medium; [Find Peak Element (162)](https://leetcode.com/problems/find-peak-element/) · Medium
   - Done when: Feedback written within the hour: what went well, what went badly, root cause. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Logs, metrics, traces; RED/USE; correlation IDs; OpenTelemetry in .NET.**
   - Read: [M4 Q20. What are RED and USE?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q20); [M4 Q21. Why do correlation IDs matter, and where do they have to flow?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q21); [GAP-03-016 — What is distributed tracing?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-016); [GAP-03-017 — What is OpenTelemetry?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-017); [BASIC-041 — What are logs, metrics, traces, health, SLI, SLO, RPO and RTO?](../NOTES/00_START_FROM_ZERO.md#basic-041); [Observability with OpenTelemetry in .NET](../NOTES/10_ENGINEERING_PRACTICE.md#add-otel)
   - Do: Add OpenTelemetry tracing to the API and worker; propagate trace context in RabbitMQ message headers.
4. **Explain aloud — 5 min.** *What are RED and USE?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-121"></a>

## Day 121 · Tuesday · Tue 23 Feb 2027
**Mock repair** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What are RED and USE?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Rebuild the part of yesterday's mock that failed from scratch, then one new problem of the same family.
   - Read first (short): [The coding round script (45 minutes)](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-coding-script)
   - Solve: [Search a 2D Matrix II (240)](https://leetcode.com/problems/search-a-2d-matrix-ii/) · Medium; [Kth Smallest Element in a Sorted Matrix (378)](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) · Medium
   - Done when: The failed part works from a blank file. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: SLIs, SLOs, error budgets; p50/p95/p99.**
   - Read: [M4 Q22. What is an SLI, an SLO, and an error budget?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q22); [M5 Q14. What do p50, p95 and p99 tell you, and why not the average?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q14); [SLIs, SLOs and error budgets for the job platform](../NOTES/10_ENGINEERING_PRACTICE.md#add-slo)
   - Do: Define three SLIs for your project (acceptance latency, completion latency, success rate) and an SLO for each.
4. **Explain aloud — 5 min.** *What do p50, p95 and p99 tell you, and why not the average?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-122"></a>

## Day 122 · Wednesday · Wed 24 Feb 2027
**Coding mock two** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What do p50, p95 and p99 tell you, and why not the average?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** 45-minute task from a different family; ask a peer (or yourself) to change one constraint at minute 30.
   - Read first (short): [Running mocks](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-mocks)
   - Solve: [Binary Tree Zigzag Level Order Traversal (103)](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) · Medium; [Populating Next Right Pointers in Each Node (116)](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) · Medium
   - Done when: You adapted the solution to the changed constraint. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Cloud basics on AWS (compute, RDS, Amazon MQ/SQS, S3, IAM, VPC, cost); Kubernetes overview.**
   - Read: [BASIC-040 — What do Kubernetes and cloud basics add?](../NOTES/00_START_FROM_ZERO.md#basic-040); [AWS basics mapped to the project](../NOTES/10_ENGINEERING_PRACTICE.md#add-aws); [Kubernetes basics (OPTIONAL extension)](../NOTES/10_ENGINEERING_PRACTICE.md#add-k8s)
   - Do: Create an AWS budget and billing alarm before anything else. Write the deployment plan (or a local fallback).
4. **Explain aloud — 5 min.** *What does least privilege mean in IAM?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-123"></a>

## Day 123 · Thursday · Thu 25 Feb 2027
**Code comprehension** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does least privilege mean in IAM?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Read an unfamiliar C# module (an open-source library file of ~200 lines); find one bug or risk; write a test for it.
   - Read first (short): [M6 Q7. What is the code comprehension round and why is it good news for you?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q7)
   - Solve: [Sum Root to Leaf Numbers (129)](https://leetcode.com/problems/sum-root-to-leaf-numbers/) · Medium
   - Done when: You explained the module's purpose in 2 minutes. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Finding bottlenecks under load; tenant fairness.**
   - Read: [M5 Q17. How do you actually find a bottleneck under load?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q17); [M5 Q11. How do you stop one tenant starving the others?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q11); [Load testing with k6](../NOTES/10_ENGINEERING_PRACTICE.md#add-loadtest)
   - Do: Add per-tenant concurrency caps to the worker (fair scheduling) and a test where one tenant floods the queue.
4. **Explain aloud — 5 min.** *How do you stop one tenant starving the others?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-124"></a>

## Day 124 · Friday · Fri 26 Feb 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Time Based Key-Value Store, Find Peak Element, Search a 2D Matrix II.
   - Then one problem you have not seen, with no pattern hint: [Flatten Binary Tree to Linked List (114)](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What are RED and USE?* · *What do p50, p95 and p99 tell you, and why not the average?* · *What does least privilege mean in IAM?* · *How do you stop one tenant starving the others?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve the two mock problems cold.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Restaurant reservation](../DESIGNS.md#hld-restaurant-reservation); [LLD card: Ride sharing (Uber)](../DESIGNS.md#lld-uber-lld)

---

<a id="day-125"></a>

## Day 125 · Saturday · Sat 27 Feb 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** A full coding mock without autocomplete (plain editor): Reverse Nodes in k-Group, then Kth Smallest in BST re-solve and Path Sum II.
   - Solve: [Reverse Nodes in k-Group (25)](https://leetcode.com/problems/reverse-nodes-in-k-group/) · Hard; [Kth Smallest Element in a BST (230)](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Medium; [Path Sum II (113)](https://leetcode.com/problems/path-sum-ii/) · Medium
3. **Design — 90 min.** News feed HLD: fan-out on write vs read, the celebrity problem, ranking, cursor pagination, caching.
   - Use: [HLD card: News feed (Facebook / Twitter timeline)](../DESIGNS.md#hld-news-feed); [M5 Q5. Why does neither pure fan-out strategy work for a news feed?](../NOTES/08_SYSTEM_DESIGN.md#m5-q5); [GAP-05-002 — Design Twitter/X news feed](../NOTES/08_SYSTEM_DESIGN.md#gap-05-002)
4. **Lab / project — 90 min.** PROJECT M8 — observability + fairness + deploy: traces across the queue, metrics (submitted, completed, failed, queue age, duration histogram), dashboards (Grafana or the Aspire dashboard), structured logs with correlation IDs. Deploy to AWS (or keep the local fallback) with teardown steps.
   - Use: [M8 — Fairness, observability, deployment (Week 18)](../PROJECT.md#project-m8); [Observability with OpenTelemetry in .NET](../NOTES/10_ENGINEERING_PRACTICE.md#add-otel); [AWS basics mapped to the project](../NOTES/10_ENGINEERING_PRACTICE.md#add-aws)
5. **English — 20 min.** Record 2 minutes: 'how I would find why a job is slow'.

---

<a id="day-126"></a>

## Day 126 · Sunday · Sun 28 Feb 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *What are RED and USE?* · *What do p50, p95 and p99 tell you, and why not the average?* · *What does least privilege mean in IAM?* · *How do you stop one tenant starving the others?*
   - Solve cold (25 minutes each): [Search a 2D Matrix II (240)](https://leetcode.com/problems/search-a-2d-matrix-ii/) · Medium; [Sum Root to Leaf Numbers (129)](https://leetcode.com/problems/sum-root-to-leaf-numbers/) · Medium
   - Sketch in 10–15 minutes: News feed HLD: fan-out on write vs read, the celebrity problem, ranking, cursor pagination, caching.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Trace one job end to end and screenshot it for the README. Tear down any cloud resources you do not need.
   - Use: [M8 — Fairness, observability, deployment (Week 18)](../PROJECT.md#project-m8)
4. **Behavioral — 45 min.** Mentoring or collaboration story (only a real one): what you did, what changed for the other person.
   - Use: [GAP-08-020 — Tell me about a time you mentored someone.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-020); [GAP-08-021 — Tell me about a time you helped a struggling teammate.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-021)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Food delivery (Swiggy / Zomato)](../DESIGNS.md#hld-food-delivery); [LLD card: Airline management system](../DESIGNS.md#lld-airline)

---

[← Week 17](WEEK_17.md) · [The plan](../PLAN.md) · [Week 19 →](WEEK_19.md)
