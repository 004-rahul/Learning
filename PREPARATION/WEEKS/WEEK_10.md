# Week 10 — Graph BFS/DFS · transactions and isolation

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 9](WEEK_09.md) [Week 11 →](WEEK_11.md)

**Phase 2 — Core depth and the project starts** · Days 64–70 · default dates Mon 28 Dec 2026 – Sun 03 Jan 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Graph representation, DFS, BFS, grids, multi-source BFS  
**Core this week:** ACID, isolation levels per engine, MVCC vs locking, deadlocks, migrations, backup

**Goal:** Choose BFS vs DFS correctly and show a database invariant surviving concurrent requests.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Number of Islands, Clone Graph and Rotting Oranges solved; visited marked at the right moment.
- [ ] Lost update, write skew and a deadlock reproduced in two sessions; a booking race prevented.
- [ ] You can explain PostgreSQL vs SQL Server isolation differences.
- [ ] A backup restored into a fresh database and verified.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [64 Mon](#day-64) | Graph representation and DFS | Number of Islands, Flood Fill | Transactions, ACID, anomalies, isolation levels |
| [65 Tue](#day-65) | Graph identity and copying | Clone Graph, Max Area of Island | Write skew, snapshot isolation, MVCC vs locking |
| [66 Wed](#day-66) | Multi-source BFS | Rotting Oranges, 01 Matrix | Locks, deadlocks, lock escalation, optimistic vs pessimistic concurrency |
| [67 Thu](#day-67) | Reachability with reversed reasoning | Pacific Atlantic Water Flow, Surrounded Regions | Safe migrations, CDC, backup and restore |
| [68 Fri](#day-68) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [69 Sat](#day-69) | Deep work (5 h) | Word Ladder, Is Graph Bipartite?, Walls and Gates, Keys and Rooms | design + lab/project |
| [70 Sun](#day-70) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-64"></a>

## Day 64 · Monday · Mon 28 Dec 2026
**Graph representation and DFS** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is the logical execution order of a SQL statement?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Adjacency list vs matrix; grids are graphs (4 directions, bounds). Number of Islands with DFS. Flood Fill.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs); [11. Graph BFS and DFS](../NOTES/01_DSA.md#dsa-11-graph-bfs-and-dfs)
   - Solve: [Number of Islands (200)](https://leetcode.com/problems/number-of-islands/) · Medium; [Flood Fill (733)](https://leetcode.com/problems/flood-fill/) · Easy
   - Done when: Bounds and visited handled; you can say O(rows × cols). Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Transactions, ACID, anomalies, isolation levels.**
   - Read: [GAP-02-001 — What is a database transaction?](../NOTES/04_SQL_DATABASES.md#gap-02-001); [GAP-02-002 — ACID — what does each property actually guarantee?](../NOTES/04_SQL_DATABASES.md#gap-02-002); [GAP-02-003 — What are dirty reads, non-repeatable reads and phantom reads?](../NOTES/04_SQL_DATABASES.md#gap-02-003); [GAP-02-004 — Read committed vs repeatable read vs serializable?](../NOTES/04_SQL_DATABASES.md#gap-02-004); [M2 Q37. State the four ACID properties.](../NOTES/04_SQL_DATABASES.md#m2-q37); [M2 Q38. Write the isolation level to anomaly table.](../NOTES/04_SQL_DATABASES.md#m2-q38)
   - Do: Write the isolation → anomaly table from memory, then compare with the corrected one for PostgreSQL.
4. **Explain aloud — 5 min.** *State the four ACID properties and what each protects.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-65"></a>

## Day 65 · Tuesday · Tue 29 Dec 2026
**Graph identity and copying** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *State the four ACID properties and what each protects.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Clone Graph with a map from original to clone (handles cycles). Max Area of Island.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs)
   - Solve: [Clone Graph (133)](https://leetcode.com/problems/clone-graph/) · Medium; [Max Area of Island (695)](https://leetcode.com/problems/max-area-of-island/) · Medium
   - Done when: Cycles do not loop forever; each node cloned once. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Write skew, snapshot isolation, MVCC vs locking.**
   - Read: [M2 Q39. What is write skew, and why does snapshot isolation permit it?](../NOTES/04_SQL_DATABASES.md#m2-q39); [M2 Q40. MVCC in PostgreSQL versus locking in SQL Server - what is the practical differe…](../NOTES/04_SQL_DATABASES.md#m2-q40); [GAP-02-005 — Optimistic vs pessimistic locking?](../NOTES/04_SQL_DATABASES.md#gap-02-005); [GAP-02-006 — Row-level vs table-level locking?](../NOTES/04_SQL_DATABASES.md#gap-02-006); [GAP-02-007 — What is MVCC?](../NOTES/04_SQL_DATABASES.md#gap-02-007); [PostgreSQL vs SQL Server: the differences that matter](../NOTES/04_SQL_DATABASES.md#add-sql-pg-vs-sqlserver)
   - Do: Reproduce write skew (doctors on call) in PostgreSQL REPEATABLE READ; then SERIALIZABLE and the 40001 retry.
4. **Explain aloud — 5 min.** *What is write skew, and why does snapshot isolation permit it?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-66"></a>

## Day 66 · Wednesday · Wed 30 Dec 2026
**Multi-source BFS** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is write skew, and why does snapshot isolation permit it?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Rotting Oranges: start the queue with all rotten oranges; count levels; detect unreachable fresh ones. 01 Matrix.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs)
   - Solve: [Rotting Oranges (994)](https://leetcode.com/problems/rotting-oranges/) · Medium; [01 Matrix (542)](https://leetcode.com/problems/01-matrix/) · Medium
   - Done when: Unreachable cells return -1 / correct distance. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Locks, deadlocks, lock escalation, optimistic vs pessimistic concurrency.**
   - Read: [M2 Q41. What causes a SQL deadlock, and what is lock escalation?](../NOTES/04_SQL_DATABASES.md#m2-q41); [GAP-02-008 — What is a deadlock and how does a database handle it?](../NOTES/04_SQL_DATABASES.md#gap-02-008); [Isolation and concurrency lab: two sessions](../NOTES/04_SQL_DATABASES.md#add-sql-isolation-lab)
   - Do: Create a deadlock in two sessions; read the error; fix with consistent order + retry. Add a version column and an optimistic update.
4. **Explain aloud — 5 min.** *Optimistic or pessimistic locking — when each?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-67"></a>

## Day 67 · Thursday · Thu 31 Dec 2026
**Reachability with reversed reasoning** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Optimistic or pessimistic locking — when each?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Pacific Atlantic Water Flow: search from the oceans inward with two visited sets. Surrounded Regions (mark border-connected cells first).
   - Read first (short): [9. Graph Patterns](../NOTES/01_DSA.md#f02-dsa-9-graph-patterns)
   - Solve: [Pacific Atlantic Water Flow (417)](https://leetcode.com/problems/pacific-atlantic-water-flow/) · Medium; [Surrounded Regions (130)](https://leetcode.com/problems/surrounded-regions/) · Medium
   - Done when: You can explain why searching from the border is easier. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Safe migrations, CDC, backup and restore.**
   - Read: [GAP-02-017 — Database migration strategies for zero-downtime deployments?](../NOTES/04_SQL_DATABASES.md#gap-02-017); [GAP-02-018 — What is CDC (Change Data Capture)?](../NOTES/04_SQL_DATABASES.md#gap-02-018); [GAP-02-019 — When would you use CDC instead of an application-level event?](../NOTES/04_SQL_DATABASES.md#gap-02-019); [Zero-downtime schema changes](../NOTES/04_SQL_DATABASES.md#add-sql-migrations); [Backup and restore: a drill you actually run](../NOTES/04_SQL_DATABASES.md#add-sql-backup-restore)
   - Do: pg_dump your practice database, restore it into a new database, compare row counts.
4. **Explain aloud — 5 min.** *How do you change a schema without downtime?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-68"></a>

## Day 68 · Friday · Fri 01 Jan 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Number of Islands, Flood Fill, Clone Graph.
   - Then one problem you have not seen, with no pattern hint: [Find if Path Exists in Graph (1971)](https://leetcode.com/problems/find-if-path-exists-in-graph/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *State the four ACID properties and what each protects.* · *What is write skew, and why does snapshot isolation permit it?* · *Optimistic or pessimistic locking — when each?* · *How do you change a schema without downtime?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve one grid BFS cold; re-run the isolation lab you found hardest.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Detect a cycle in an undirected graph (DFS parent / DSU)](../PROBLEMS.md#x-undirected-cycle) · own exercise

---

<a id="day-69"></a>

## Day 69 · Saturday · Sat 02 Jan 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Word Ladder (BFS over words), Is Graph Bipartite, Walls and Gates (premium — free on neetcode.io/LintCode), Keys and Rooms.
   - Solve: [Word Ladder (127)](https://leetcode.com/problems/word-ladder/) · Hard; [Is Graph Bipartite? (785)](https://leetcode.com/problems/is-graph-bipartite/) · Medium; [Walls and Gates (286)](https://leetcode.com/problems/walls-and-gates/) · Medium *(premium — free on neetcode.io/LintCode)*; [Keys and Rooms (841)](https://leetcode.com/problems/keys-and-rooms/) · Medium
3. **Design — 90 min.** Distributed rate limiter HLD: fixed window vs sliding window vs token bucket; atomic updates in Redis; per-tenant keys; what happens if Redis is down.
   - Use: [HLD card: Distributed rate limiter](../DESIGNS.md#hld-rate-limiter); [M3 Q35. Design a rate limiter - which algorithm and why?](../NOTES/08_SYSTEM_DESIGN.md#m3-q35); [M5 Q10. Compare the rate limiting algorithms.](../NOTES/08_SYSTEM_DESIGN.md#m5-q10); [GAP-05-005 — Design rate limiter](../NOTES/08_SYSTEM_DESIGN.md#gap-05-005)
4. **Lab / project — 90 min.** Booking race lab: two sessions try to book the last seat. Reproduce the double booking, then prevent it with a unique constraint and with a conditional UPDATE. Write which you prefer and why.
   - Use: [Isolation and concurrency lab: two sessions](../NOTES/04_SQL_DATABASES.md#add-sql-isolation-lab)
5. **English — 20 min.** Record 2 minutes: 'write skew'.

---

<a id="day-70"></a>

## Day 70 · Sunday · Sun 03 Jan 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *State the four ACID properties and what each protects.* · *What is write skew, and why does snapshot isolation permit it?* · *Optimistic or pessimistic locking — when each?* · *How do you change a schema without downtime?*
   - Solve cold (25 minutes each): [Clone Graph (133)](https://leetcode.com/problems/clone-graph/) · Medium; [Pacific Atlantic Water Flow (417)](https://leetcode.com/problems/pacific-atlantic-water-flow/) · Medium
   - Sketch in 10–15 minutes: Distributed rate limiter HLD: fixed window vs sliding window vs token bucket; atomic updates in Redis; per-tenant keys; what happens if Redis is down.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Do a SQL Server dirty-read demo (READ UNCOMMITTED / NOLOCK) if you have SQL Server; note PostgreSQL can never show one. Then finish the backup-restore drill and write down RPO/RTO in plain words.
   - Use: [Isolation and concurrency lab: two sessions](../NOTES/04_SQL_DATABASES.md#add-sql-isolation-lab); [Backup and restore: a drill you actually run](../NOTES/04_SQL_DATABASES.md#add-sql-backup-restore)
4. **Behavioral — 45 min.** Real incident story: symptoms, triage, evidence, mitigation, long-term fix (worksheet).
   - Use: [GAP-08-013 — Tell me about a time you prevented a major problem.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-013); [The story worksheet](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-worksheet)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 9](WEEK_09.md) · [The plan](../PLAN.md) · [Week 11 →](WEEK_11.md)
