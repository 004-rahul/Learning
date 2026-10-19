# Week 19 — Unseen variations · performance and recovery · PROJECT M9

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 18](WEEK_18.md) [Week 20 →](WEEK_20.md)

**Phase 3 — Project completion and design depth (Week 20 gate)** · Days 127–133 · default dates Mon 01 Mar 2027 – Sun 07 Mar 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Harder follow-ups, unseen variations, advanced graph algorithms  
**Core this week:** Load testing, diagnostics, backup/restore, rollback, project defense

**Goal:** Produce an honest benchmark that separates acceptance from completion, prove a restore works, and defend the project.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] k6 benchmark report with all fields; 1 worker vs 4 workers compared and explained.
- [ ] Backup → restore drill passed; RPO/RTO stated.
- [ ] Booking HLD done (no double booking, payment timeout, compensation).
- [ ] You can answer the 10 project-defense questions without notes.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [127 Mon](#day-127) | Binary-search follow-ups | Capacity To Ship Packages Within D Days, Split Array Largest Sum | Load testing with k6: open vs closed models, offered load vs throughput, acceptance vs completion |
| [128 Tue](#day-128) | Tree follow-ups | Serialize and Deserialize Binary Tree, Binary Tree Maximum Path Sum | Diagnostics: dotnet-counters, traces, dumps; incident diagnosis from evidence |
| [129 Wed](#day-129) | Graph follow-ups | Swim in Rising Water, Evaluate Division | Backup and restore, RPO/RTO, rollback; runbooks |
| [130 Thu](#day-130) | Mixed checkpoint | Longest Increasing Path in a Matrix, Path With Minimum Effort | Project defense: why a queue, worker death, bottleneck, unhandled failure |
| [131 Fri](#day-131) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [132 Sat](#day-132) | Deep work (5 h) | Critical Connections in a Network, Find the City With the Smallest Number of Neighbors at a Threshold Distance, Implement Bellman-Ford with negative-cycle detection, Longest Increasing Path in a Matrix | design + lab/project |
| [133 Sun](#day-133) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-127"></a>

## Day 127 · Monday · Mon 01 Mar 2027
**Binary-search follow-ups** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *How do you stop one tenant starving the others?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Capacity to Ship re-solve with a changed feasibility rule; Split Array Largest Sum.
   - Read first (short): [Binary search on the answer](../NOTES/01_DSA.md#add-dsa-binary-search-answer)
   - Solve: [Capacity To Ship Packages Within D Days (1011)](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) · Medium; [Split Array Largest Sum (410)](https://leetcode.com/problems/split-array-largest-sum/) · Hard
   - Done when: Predicate stated before code. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Load testing with k6: open vs closed models, offered load vs throughput, acceptance vs completion.**
   - Read: [Load testing with k6](../NOTES/10_ENGINEERING_PRACTICE.md#add-loadtest)
   - Do: Write a k6 script for POST /jobs with ramping stages and thresholds.
4. **Explain aloud — 5 min.** *Why separate job acceptance latency from job completion time?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-128"></a>

## Day 128 · Tuesday · Tue 02 Mar 2027
**Tree follow-ups** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why separate job acceptance latency from job completion time?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Serialize and Deserialize Binary Tree; Binary Tree Maximum Path Sum.
   - Read first (short): [Trees: traversals, return values, state, construction](../NOTES/01_DSA.md#add-dsa-trees)
   - Solve: [Serialize and Deserialize Binary Tree (297)](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) · Hard; [Binary Tree Maximum Path Sum (124)](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · Hard
   - Done when: Null markers handled; you can explain the global-max trick. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Diagnostics: dotnet-counters, traces, dumps; incident diagnosis from evidence.**
   - Read: [Diagnostics: counters, traces, dumps and benchmarks](../NOTES/02_CSHARP.md#add-cs-diagnostics); [Incident diagnosis from evidence](../NOTES/10_ENGINEERING_PRACTICE.md#add-incident)
   - Do: Cause thread-pool starvation in the API on purpose and diagnose it with dotnet-counters only.
4. **Explain aloud — 5 min.** *A latency spike with low CPU — what do you check first?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-129"></a>

## Day 129 · Wednesday · Wed 03 Mar 2027
**Graph follow-ups** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *A latency spike with low CPU — what do you check first?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Swim in Rising Water (Dijkstra on max edge) or Path With Minimum Effort; Evaluate Division (weighted graph DFS).
   - Read first (short): [Shortest paths: BFS, 0-1 BFS, Dijkstra, Bellman-Ford, Floyd–Warshall](../NOTES/01_DSA.md#add-dsa-shortest-paths)
   - Solve: [Swim in Rising Water (778)](https://leetcode.com/problems/swim-in-rising-water/) · Hard; [Evaluate Division (399)](https://leetcode.com/problems/evaluate-division/) · Medium
   - Done when: You can say what the 'distance' means in each. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Backup and restore, RPO/RTO, rollback; runbooks.**
   - Read: [Backup and restore: a drill you actually run](../NOTES/04_SQL_DATABASES.md#add-sql-backup-restore); [M7 Q16. What are RPO and RTO?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q16); [Runbooks](../NOTES/10_ENGINEERING_PRACTICE.md#add-runbook)
   - Do: Restore the project database from a backup into a clean database and compare expected durable records.
4. **Explain aloud — 5 min.** *What are RPO and RTO?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-130"></a>

## Day 130 · Thursday · Thu 04 Mar 2027
**Mixed checkpoint** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What are RPO and RTO?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** One unseen graph or DP medium in 45 minutes, narrated.
   - Read first (short): [PART 4 - How to pick a pattern in two minutes](../NOTES/01_DSA.md#dsa-part-4-how-to-pick-a-pattern-in-two-minutes)
   - Solve: [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard; [Path With Minimum Effort (1631)](https://leetcode.com/problems/path-with-minimum-effort/) · Medium
   - Done when: Solved or failure classified. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Project defense: why a queue, worker death, bottleneck, unhandled failure.**
   - Read: [M4 Q26. Why a queue at all, and what did it cost you?](../PROJECT.md#m4-q26); [M4 Q27. Walk me through exactly what happens when a worker dies mid-job.](../PROJECT.md#m4-q27); [M4 Q28. Where is your bottleneck, and how do you know?](../PROJECT.md#m4-q28); [M4 Q29. What failure mode did you deliberately not handle, and why?](../PROJECT.md#m4-q29); [11. Defense questions to rehearse](../PROJECT.md#project-defense)
   - Do: Answer the 10 project-defense questions aloud, recorded; fix the weakest answer.
4. **Explain aloud — 5 min.** *Walk me through exactly what happens when a worker dies mid-job.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-131"></a>

## Day 131 · Friday · Fri 05 Mar 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Capacity To Ship Packages Within D Days, Split Array Largest Sum, Serialize and Deserialize Binary Tree.
   - Then one problem you have not seen, with no pattern hint: [Minimum Height Trees (310)](https://leetcode.com/problems/minimum-height-trees/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why separate job acceptance latency from job completion time?* · *A latency spike with low CPU — what do you check first?* · *What are RPO and RTO?* · *Walk me through exactly what happens when a worker dies mid-job.* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve the hardest problem of the week cold.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Logging pipeline](../DESIGNS.md#hld-logging-pipeline); [LLD card: Restaurant management system](../DESIGNS.md#lld-restaurant)

---

<a id="day-132"></a>

## Day 132 · Saturday · Sat 06 Mar 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Critical Connections (Tarjan, extension), Find the City (Floyd-Warshall, extension); implement Bellman-Ford; Longest Increasing Path re-solve.
   - Solve: [Critical Connections in a Network (1192)](https://leetcode.com/problems/critical-connections-in-a-network/) · Hard *(extension)*; [Find the City With the Smallest Number of Neighbors at a Threshold Distance (1334)](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) · Medium *(extension)*; [Implement Bellman-Ford with negative-cycle detection](../PROBLEMS.md#x-bellman-ford) · own exercise *(extension)*; [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard
3. **Design — 90 min.** Ticket / hotel booking HLD: inventory invariant, holds with expiry, payment timeout and reconciliation, no double booking without distributed transactions.
   - Use: [HLD card: Hotel booking (Booking.com)](../DESIGNS.md#hld-hotel-booking); [HLD card: Movie / event ticket booking (BookMyShow)](../DESIGNS.md#hld-ticket-booking); [M5 Q6. How do you avoid overselling inventory without a distributed transaction?](../NOTES/08_SYSTEM_DESIGN.md#m5-q6); [GAP-05-011 — Design ticket booking system](../NOTES/08_SYSTEM_DESIGN.md#gap-05-011)
4. **Lab / project — 90 min.** PROJECT M9 — evidence: k6 runs at 1 and 4 workers, benchmark report with every field, failure tests re-run, restore drill recorded.
   - Use: [M9 — Evidence (Week 19)](../PROJECT.md#project-m9); [8. Benchmark report — required fields](../PROJECT.md#project-benchmark); [Load testing with k6](../NOTES/10_ENGINEERING_PRACTICE.md#add-loadtest)
5. **English — 20 min.** Record 2 minutes: 'my benchmark and what limits it'.

---

<a id="day-133"></a>

## Day 133 · Sunday · Sun 07 Mar 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why separate job acceptance latency from job completion time?* · *A latency spike with low CPU — what do you check first?* · *What are RPO and RTO?* · *Walk me through exactly what happens when a worker dies mid-job.*
   - Solve cold (25 minutes each): [Serialize and Deserialize Binary Tree (297)](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) · Hard; [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard
   - Sketch in 10–15 minutes: Ticket / hotel booking HLD: inventory invariant, holds with expiry, payment timeout and reconciliation, no double booking without distributed transactions.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Finish the benchmark report; mark every number with how it was measured.
   - Use: [8. Benchmark report — required fields](../PROJECT.md#project-benchmark)
4. **Behavioral — 45 min.** Prioritization / deadline story (worksheet).
   - Use: [GAP-08-016 — Tell me about a time you had conflicting priorities.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-016); [GAP-08-017 — Tell me about a time you missed a deadline.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-017)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Email delivery service](../DESIGNS.md#hld-email-delivery); [LLD card: Car rental system](../DESIGNS.md#lld-car-rental)

---

[← Week 18](WEEK_18.md) · [The plan](../PLAN.md) · [Week 20 →](WEEK_20.md)
