# Week 9 — Heaps and top-K · SQL and indexes

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 8](WEEK_08.md) [Week 10 →](WEEK_10.md)

**Phase 2 — Core depth and the project starts** · Days 57–63 · default dates Mon 21 Dec 2026 – Sun 27 Dec 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Heap invariant, PriorityQueue, top-K, k-way merge, two heaps  
**Core this week:** Data modeling, storage, B-tree indexes, plans, SARGability, joins, window functions

**Goal:** Use a heap for top-K and k-way merge, and show one measured query improvement from an index.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Kth Largest and Top K Frequent solved with a size-k min-heap; you can say why min-heap.
- [ ] Merge K Sorted Lists solved and costed O(N log k).
- [ ] On ~1M rows: a slow query, its plan, an index, the new plan and the before/after time recorded.
- [ ] 15 practice queries on the jobs/tenants/attempts schema solved.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [57 Mon](#day-57) | Heap invariant and PriorityQueue | Kth Largest Element in an Array, Last Stone Weight | SQL basics and data modeling: keys, constraints, normalization, when to denormalise |
| [58 Tue](#day-58) | Frequency plus top-K | Top K Frequent Elements, K Closest Points to Origin | How data is stored; indexes, write cost, covering indexes |
| [59 Wed](#day-59) | K-way merging | Merge k Sorted Lists, Task Scheduler | Execution plans, seek vs scan vs lookup, SARGability, join algorithms |
| [60 Thu](#day-60) | Two heaps and selection without full sort | Find Median from Data Stream, Implement quicksort partition (Lomuto and Hoare) and quickselect | Logical execution order, window functions, CTEs, connection pooling |
| [61 Fri](#day-61) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [62 Sat](#day-62) | Deep work (5 h) | Top K Frequent Words, Reorganize String, Sort Characters By Frequency, Implement a binary min-heap (push, pop, heapify) on an array | design + lab/project |
| [63 Sun](#day-63) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-57"></a>

## Day 57 · Monday · Mon 21 Dec 2026
**Heap invariant and PriorityQueue** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Compare cache-aside, write-through and write-behind.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Heap = complete tree in an array; parent ≤ children. C# PriorityQueue<TElement,TPriority> is a min-heap. Kth Largest with a size-k min-heap. Last Stone Weight (max-heap via negated priority).
   - Read first (short): [Heaps and C# PriorityQueue](../NOTES/01_DSA.md#add-dsa-heaps); [7. Heap and top-K](../NOTES/01_DSA.md#dsa-7-heap-and-top-k)
   - Solve: [Kth Largest Element in an Array (215)](https://leetcode.com/problems/kth-largest-element-in-an-array/) · Medium; [Last Stone Weight (1046)](https://leetcode.com/problems/last-stone-weight/) · Easy
   - Done when: You can say why a min-heap of size k keeps the k largest. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: SQL basics and data modeling: keys, constraints, normalization, when to denormalise.**
   - Read: [BASIC-033 — What SQL basics do I need before indexes and isolation?](../NOTES/00_START_FROM_ZERO.md#basic-033); [BASIC-034 — What are normalization, denormalization and schema design?](../NOTES/00_START_FROM_ZERO.md#basic-034); [M2 Q42. When would you denormalise on purpose?](../NOTES/04_SQL_DATABASES.md#m2-q42); [Data modeling checklist](../NOTES/04_SQL_DATABASES.md#add-sql-modeling); [Lab setup: PostgreSQL and SQL Server in Docker](../NOTES/04_SQL_DATABASES.md#add-sql-setup)
   - Do: Run PostgreSQL in Docker; create the practice schema; insert a few tenants and jobs.
4. **Explain aloud — 5 min.** *When would you denormalise on purpose?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-58"></a>

## Day 58 · Tuesday · Tue 22 Dec 2026
**Frequency plus top-K** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *When would you denormalise on purpose?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Top K Frequent Elements: count with a Dictionary, then a size-k heap (also know the bucket-sort answer). K Closest Points.
   - Read first (short): [PART 5 - Why this instead of that](../NOTES/01_DSA.md#dsa-part-5-why-this-instead-of-that)
   - Solve: [Top K Frequent Elements (347)](https://leetcode.com/problems/top-k-frequent-elements/) · Medium; [K Closest Points to Origin (973)](https://leetcode.com/problems/k-closest-points-to-origin/) · Medium
   - Done when: You can compare heap O(n log k) with sorting O(n log n). Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: How data is stored; indexes, write cost, covering indexes.**
   - Read: [M2 Q30. How does a database physically store data?](../NOTES/04_SQL_DATABASES.md#m2-q30); [M2 Q31. Why does an index make reads faster and writes slower?](../NOTES/04_SQL_DATABASES.md#m2-q31); [M2 Q32. What is a covering index?](../NOTES/04_SQL_DATABASES.md#m2-q32); [GAP-02-009 — What is a B-tree index?](../NOTES/04_SQL_DATABASES.md#gap-02-009); [GAP-02-010 — Why can too many indexes hurt writes?](../NOTES/04_SQL_DATABASES.md#gap-02-010); [GAP-02-011 — Composite indexes — how does column order matter?](../NOTES/04_SQL_DATABASES.md#gap-02-011); [GAP-02-012 — What is a covering index?](../NOTES/04_SQL_DATABASES.md#gap-02-012)
   - Do: Generate ~1M jobs rows. Query by tenant and status without an index; add a composite index; compare.
4. **Explain aloud — 5 min.** *Why does an index make reads faster and writes slower?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-59"></a>

## Day 59 · Wednesday · Wed 23 Dec 2026
**K-way merging** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why does an index make reads faster and writes slower?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Merge K Sorted Lists: put the k heads in a heap; pop the smallest, push its next. Task Scheduler.
   - Read first (short): [Heaps and C# PriorityQueue](../NOTES/01_DSA.md#add-dsa-heaps)
   - Solve: [Merge k Sorted Lists (23)](https://leetcode.com/problems/merge-k-sorted-lists/) · Hard; [Task Scheduler (621)](https://leetcode.com/problems/task-scheduler/) · Medium
   - Done when: You stated O(N log k) with N total nodes. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Execution plans, seek vs scan vs lookup, SARGability, join algorithms.**
   - Read: [M2 Q33. Seek, scan, or lookup - what is the difference in a plan?](../NOTES/04_SQL_DATABASES.md#m2-q33); [M2 Q34. What is SARGability, and why can WHERE YEAR(created) = 2026 not use an index?](../NOTES/04_SQL_DATABASES.md#m2-q34); [M2 Q35. Why does the optimiser pick a hash join over nested loops?](../NOTES/04_SQL_DATABASES.md#m2-q35); [GAP-02-013 — What is query execution planning?](../NOTES/04_SQL_DATABASES.md#gap-02-013); [Index lab: from Seq Scan to Index Only Scan](../NOTES/04_SQL_DATABASES.md#add-sql-index-lab)
   - Do: Break SARGability with a function on a column; read EXPLAIN (ANALYZE, BUFFERS); rewrite it as a range.
4. **Explain aloud — 5 min.** *Why can WHERE YEAR(created) = 2026 not use an index?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-60"></a>

## Day 60 · Thursday · Thu 24 Dec 2026
**Two heaps and selection without full sort** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why can WHERE YEAR(created) = 2026 not use an index?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Find Median from Data Stream with a max-heap and a min-heap. Study quickselect (average O(n), worst O(n²)).
   - Read first (short): [PART 7 - Complexity, stated properly](../NOTES/01_DSA.md#dsa-part-7-complexity-stated-properly)
   - Solve: [Find Median from Data Stream (295)](https://leetcode.com/problems/find-median-from-data-stream/) · Hard; [Implement quicksort partition (Lomuto and Hoare) and quickselect](../PROBLEMS.md#x-quick-sort) · own exercise
   - Done when: You can explain how the two heaps stay balanced. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Logical execution order, window functions, CTEs, connection pooling.**
   - Read: [M2 Q36. What is the logical execution order of a SQL statement?](../NOTES/04_SQL_DATABASES.md#m2-q36); [M2 Q43. Why does connection pooling matter?](../NOTES/04_SQL_DATABASES.md#m2-q43); [GAP-02-014 — What causes an N+1 query problem?](../NOTES/04_SQL_DATABASES.md#gap-02-014); [GAP-02-015 — What is connection pooling?](../NOTES/04_SQL_DATABASES.md#gap-02-015); [GAP-02-016 — What happens when the DB connection pool is exhausted?](../NOTES/04_SQL_DATABASES.md#gap-02-016); [20 graded query exercises](../NOTES/04_SQL_DATABASES.md#add-sql-queries)
   - Do: Solve 8 of the practice queries (latest attempt per job with ROW_NUMBER, running totals, keyset pagination).
4. **Explain aloud — 5 min.** *What is the logical execution order of a SQL statement?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-61"></a>

## Day 61 · Friday · Fri 25 Dec 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Kth Largest Element in an Array, Last Stone Weight, Top K Frequent Elements.
   - Then one problem you have not seen, with no pattern hint: [Kth Largest Element in a Stream (703)](https://leetcode.com/problems/kth-largest-element-in-a-stream/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *When would you denormalise on purpose?* · *Why does an index make reads faster and writes slower?* · *Why can WHERE YEAR(created) = 2026 not use an index?* · *What is the logical execution order of a SQL statement?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve one heap problem cold and finish the remaining practice queries.

---

<a id="day-62"></a>

## Day 62 · Saturday · Sat 26 Dec 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Top K Frequent Words, Reorganize String, Sort Characters By Frequency; implement a min-heap on an array yourself.
   - Solve: [Top K Frequent Words (692)](https://leetcode.com/problems/top-k-frequent-words/) · Medium; [Reorganize String (767)](https://leetcode.com/problems/reorganize-string/) · Medium; [Sort Characters By Frequency (451)](https://leetcode.com/problems/sort-characters-by-frequency/) · Medium; [Implement a binary min-heap (push, pop, heapify) on an array](../PROBLEMS.md#x-heap-impl) · own exercise
3. **Design — 90 min.** LLD: LRU cache — Dictionary + doubly linked list, O(1) get and put; then thread safety (one lock vs ReaderWriterLockSlim) and an LFU follow-up.
   - Use: [LLD card: LRU / LFU cache](../DESIGNS.md#lld-lru-cache); [GAP-09-013 — Design cache](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-013); [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) · Medium
4. **Lab / project — 90 min.** Index lab end to end: slow query → plan → index → plan → timing. Write the before/after table in your notes. Then design the job-processing schema you will use in Week 11.
   - Use: [Index lab: from Seq Scan to Index Only Scan](../NOTES/04_SQL_DATABASES.md#add-sql-index-lab); [Practice schema: the job platform](../NOTES/04_SQL_DATABASES.md#add-sql-schema)
5. **English — 20 min.** Record 2 minutes: 'covering index'.

---

<a id="day-63"></a>

## Day 63 · Sunday · Sun 27 Dec 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *When would you denormalise on purpose?* · *Why does an index make reads faster and writes slower?* · *Why can WHERE YEAR(created) = 2026 not use an index?* · *What is the logical execution order of a SQL statement?*
   - Solve cold (25 minutes each): [Top K Frequent Elements (347)](https://leetcode.com/problems/top-k-frequent-elements/) · Medium; [Find Median from Data Stream (295)](https://leetcode.com/problems/find-median-from-data-stream/) · Hard
   - Sketch in 10–15 minutes: LLD: LRU cache — Dictionary + doubly linked list, O(1) get and put; then thread safety (one lock vs ReaderWriterLockSlim) and an LFU follow-up.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Finish all 20 practice queries; check your answers; put any you missed on the WEAK sheet. Implement LRU Cache (146) from Saturday's design.
   - Use: [20 graded query exercises](../NOTES/04_SQL_DATABASES.md#add-sql-queries); [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) · Medium
4. **Behavioral — 45 min.** Deep-dive a real SQL/performance improvement from work: what was measured, what you changed, how you know it helped. Separate measured facts from guesses.
   - Use: [Story preparation for every resume line](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-resume-stories); [GAP-08-023 — Tell me about a time you used data to make a decision.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-023)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 8](WEEK_08.md) · [The plan](../PLAN.md) · [Week 10 →](WEEK_10.md)
