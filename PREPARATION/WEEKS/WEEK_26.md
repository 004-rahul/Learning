# Week 26 — Consistency, multi-region and recovery · range queries (extension)

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 25](WEEK_25.md) [Week 27 →](WEEK_27.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 176–182 · default dates Mon 19 Apr 2027 – Sun 25 Apr 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Mixed mocks; Fenwick/segment trees as an extension  
**Core this week:** Linearizability vs serializability, snapshot isolation, active-active, RPO/RTO, replication lag, time series and geo

**Goal:** Distinguish consistency guarantees precisely and evolve one earlier design to two regions with its cost.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] You can explain linearizable vs serializable vs strict serializable with examples.
- [ ] One earlier design evolved to two regions (ownership, failover, RPO/RTO).
- [ ] Metrics/monitoring design done.
- [ ] Optional: Fenwick tree implemented.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [176 Mon](#day-176) | Timed coding round | Maximal Square, Count Square Submatrices with All Ones | Linearizability vs serializability; snapshot isolation; read-your-writes and monotonic reads |
| [177 Tue](#day-177) | Range queries (extension) | Range Sum Query - Mutable, Segment tree with lazy propagation (range add, range sum) | Active-active vs active-passive; RPO and RTO; replication lag |
| [178 Wed](#day-178) | DP follow-up | Edit Distance, Longest Palindromic Subsequence | Time series and geospatial: cardinality, downsampling, geohash/quadtree, erasure coding |
| [179 Thu](#day-179) | Debugging under time pressure | Count of Smaller Numbers After Self, My Calendar I | Recovery drill: backup restore and regional failover on paper |
| [180 Fri](#day-180) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [181 Sat](#day-181) | Deep work (5 h) | Find Median from Data Stream, Merge k Sorted Lists | design + lab/project |
| [182 Sun](#day-182) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-176"></a>

## Day 176 · Monday · Mon 19 Apr 2027
**Timed coding round** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How would you fail over your project to another region?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Maximal Square (221)](https://leetcode.com/problems/maximal-square/) · Medium; [Count Square Submatrices with All Ones (1277)](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) · Medium
   - Done when: Both narrated within time.
3. **Linearizability vs serializability; snapshot isolation; read-your-writes and monotonic reads — 40 min.**
   - Read: [M7 Q12. Linearizability or serializability - what is the difference?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q12); [M7 Q13. What is snapshot isolation and what does it permit?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q13); [M7 Q14. What are read-your-writes and monotonic reads?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q14); [Consistency models — the ladder](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-consistency)
   - Do: Write one example of a system that is serializable but not linearizable.
4. **Explain aloud + log — 10 min.** *Linearizability or serializability — what is the difference?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-177"></a>

## Day 177 · Tuesday · Tue 20 Apr 2027
**Range queries (extension)** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Linearizability or serializability — what is the difference?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Range Sum Query - Mutable (307)](https://leetcode.com/problems/range-sum-query-mutable/) · Medium *(extension)*; [Segment tree with lazy propagation (range add, range sum)](../PROBLEMS.md#x-segment-tree) · own exercise *(extension)*
   - Done when: Fenwick update/query written; segment tree optional.
3. **Active-active vs active-passive; RPO and RTO; replication lag — 40 min.**
   - Read: [M7 Q15. Active-active or active-passive?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q15); [M7 Q16. What are RPO and RTO?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q16); [M7 Q17. Why is replication lag operationally dangerous?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q17); [Multi-region patterns](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#add-multiregion)
   - Do: Choose a home region per tenant for your project; write the failover steps.
4. **Explain aloud + log — 10 min.** *Active-active or active-passive?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-178"></a>

## Day 178 · Wednesday · Wed 21 Apr 2027
**DP follow-up** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Active-active or active-passive?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Edit Distance (72)](https://leetcode.com/problems/edit-distance/) · Medium; [Longest Palindromic Subsequence (516)](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium
   - Done when: Re-derived from the state sentence.
3. **Time series and geospatial: cardinality, downsampling, geohash/quadtree, erasure coding — 40 min.**
   - Read: [M7 Q18. Why is cardinality the hard part of a metrics system?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q18); [M7 Q19. What is downsampling and why does it work for time series?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q19); [M7 Q20. How do you find nearby items at scale?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q20); [M7 Q21. How does object storage achieve durability without keeping full copies?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q21)
   - Do: Explain why a user_id label breaks a metrics system.
4. **Explain aloud + log — 10 min.** *Why is cardinality the hard part of a metrics system?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-179"></a>

## Day 179 · Thursday · Thu 22 Apr 2027
**Debugging under time pressure** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Why is cardinality the hard part of a metrics system?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Count of Smaller Numbers After Self (315)](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) · Hard *(extension)*; [My Calendar I (729)](https://leetcode.com/problems/my-calendar-i/) · Medium
   - Done when: Find and fix a planted bug (off-by-one, missing visited, wrong base case) in your old code.
3. **Recovery drill: backup restore and regional failover on paper — 40 min.**
   - Read: [Backup and restore: a drill you actually run](../NOTES/04_SQL_DATABASES.md#add-sql-backup-restore); [Runbooks](../NOTES/10_ENGINEERING_PRACTICE.md#add-runbook)
   - Do: Write a failover runbook for your project.
4. **Explain aloud + log — 10 min.** *How would you fail over your project to another region?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-180"></a>

## Day 180 · Friday · Fri 23 Apr 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Maximal Square, Count Square Submatrices with All Ones, Range Sum Query - Mutable.
   - Then one problem you have not seen, with no pattern hint: [Smallest Range Covering Elements from K Lists (632)](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Linearizability or serializability — what is the difference?* · *Active-active or active-passive?* · *Why is cardinality the hard part of a metrics system?* · *How would you fail over your project to another region?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard; otherwise repair.

*Optional extra design drill (20 min, only if the repair is done):* [LLD card: Tic-tac-toe](../DESIGNS.md#lld-tic-tac-toe); [LLD card: Metrics and monitoring](../DESIGNS.md#lld-metrics-lld)

---

<a id="day-181"></a>

## Day 181 · Saturday · Sat 24 Apr 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** One mixed mock (45 minutes coding) and one design mock.
   - Solve: [Find Median from Data Stream (295)](https://leetcode.com/problems/find-median-from-data-stream/) · Hard; [Merge k Sorted Lists (23)](https://leetcode.com/problems/merge-k-sorted-lists/) · Hard
3. **Design — 90 min.** Metrics and monitoring system HLD; then evolve the URL shortener (or your project) to two regions.
   - Use: [HLD card: Metrics and monitoring system](../DESIGNS.md#hld-metrics-monitoring); [HLD card: Multi-region evolution of an earlier design](../DESIGNS.md#hld-multi-region); [GAP-05-017 — Design metrics/monitoring system](../NOTES/08_SYSTEM_DESIGN.md#gap-05-017); [GAP-05-030 — Design a multi-region globally distributed service](../NOTES/08_SYSTEM_DESIGN.md#gap-05-030)
4. **Lab / project — 90 min.** PROJECT M11 phase 2: embeddings + pgvector table and index; POST /query returns top-K chunks (no LLM yet). Respect tenant filters.
   - Use: [M11 — AI increment (Weeks 25–28)](../PROJECT.md#project-m11); [RAG build checklist (.NET + PostgreSQL/pgvector)](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-rag-build)
5. **English — 20 min.** Record 2 minutes: 'RPO and RTO for my project'.

---

<a id="day-182"></a>

## Day 182 · Sunday · Sun 25 Apr 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Linearizability or serializability — what is the difference?* · *Active-active or active-passive?* · *Why is cardinality the hard part of a metrics system?* · *How would you fail over your project to another region?*
   - Solve cold (25 minutes each): [Range Sum Query - Mutable (307)](https://leetcode.com/problems/range-sum-query-mutable/) · Medium *(extension)*; [Count of Smaller Numbers After Self (315)](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) · Hard *(extension)*
   - Sketch in 10–15 minutes: Metrics and monitoring system HLD; then evolve the URL shortener (or your project) to two regions.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Recovery drill for the project (restore + failover on paper).
   - Use: [Runbooks](../NOTES/10_ENGINEERING_PRACTICE.md#add-runbook)
4. **Behavioral — 45 min.** Leadership/ownership follow-ups: risk, escalation, trade-offs (influence without authority).
   - Use: [GAP-08-019 — Tell me about a time you influenced without authority.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-019); [GAP-08-005 — Tell me about a time you changed someone's mind.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-005)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [LLD card: Chess](../DESIGNS.md#lld-chess); [LLD card: Authentication system](../DESIGNS.md#lld-auth-system)

---

[← Week 25](WEEK_25.md) · [The plan](../PLAN.md) · [Week 27 →](WEEK_27.md)
