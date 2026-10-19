# Week 14 — Knapsack and counting DP · SOLID and patterns · PROJECT M4

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 13](WEEK_13.md) [Week 15 →](WEEK_15.md)

**Phase 2 — Core depth and the project starts** · Days 92–98 · default dates Mon 25 Jan 2027 – Sun 31 Jan 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** 0/1 vs unbounded knapsack, loop order, grid DP  
**Core this week:** SOLID with real violations, Strategy/Observer/Decorator, repository debate, testability

**Goal:** Explain 0/1 vs unbounded DP and loop order, apply SOLID to real code, and make duplicate delivery commit exactly one local effect.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Partition Equal Subset Sum and Coin Change II solved; loop order explained.
- [ ] Each SOLID principle explained with a violation from your own code (or a realistic one).
- [ ] PROJECT M4: duplicate message → one committed local effect; duplicate POST with the same Idempotency-Key → the same response.
- [ ] LLD rate limiter with a controllable clock implemented and tested.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [92 Mon](#day-92) | 0/1 decisions | 0/1 knapsack (classic) — derive state, then 1-D array looping backwards, Partition Equal Subset Sum, Subset sum (boolean DP) | SOLID: single responsibility and open/closed |
| [93 Tue](#day-93) | Counting: combinations vs permutations | Coin Change II, Target Sum | Liskov, Interface Segregation, Dependency Inversion; when a pattern is over-engineering |
| [94 Wed](#day-94) | Grid paths | Unique Paths, Unique Paths II, Minimum Path Sum | Strategy vs switch, event-handler leaks, Decorator vs inheritance; the 23 GoF patterns |
| [95 Thu](#day-95) | More knapsack shapes | Ones and Zeroes, Perfect Squares, Last Stone Weight II | Repository over EF Core, Singleton, anti-patterns, testability |
| [96 Fri](#day-96) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [97 Sat](#day-97) | Deep work (5 h) | Triangle, Maximal Square, Count Square Submatrices with All Ones, Coin Change | design + lab/project |
| [98 Sun](#day-98) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-92"></a>

## Day 92 · Monday · Mon 25 Jan 2027
**0/1 decisions** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *L4 vs L7 load balancer?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Classic 0/1 knapsack, then Partition Equal Subset Sum: 1-D array, capacity loop BACKWARDS. Subset sum.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [0/1 knapsack (classic) — derive state, then 1-D array looping backwards](../PROBLEMS.md#x-knapsack-01) · own exercise; [Partition Equal Subset Sum (416)](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium; [Subset sum (boolean DP)](../PROBLEMS.md#x-subset-sum) · own exercise
   - Done when: You can say why the loop goes backwards. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: SOLID: single responsibility and open/closed.**
   - Read: [M4 Q1. Explain Single Responsibility without reciting the definition.](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q1); [M4 Q2. What does Open/Closed actually look like in practice?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q2); [BASIC-043 — What are OOP, SOLID, UML and the missing Interpreter pattern?](../NOTES/00_START_FROM_ZERO.md#basic-043); [SOLID in code, and the 8 design principles](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-solid)
   - Do: Find a class in your own past code with two reasons to change; write how you would split it.
4. **Explain aloud — 5 min.** *Explain Single Responsibility without reciting the definition.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-93"></a>

## Day 93 · Tuesday · Tue 26 Jan 2027
**Counting: combinations vs permutations** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain Single Responsibility without reciting the definition.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Coin Change II (coins outer loop = combinations). Target Sum (reduce to subset sum).
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Coin Change II (518)](https://leetcode.com/problems/coin-change-ii/) · Medium; [Target Sum (494)](https://leetcode.com/problems/target-sum/) · Medium
   - Done when: You can show what changes if you swap the loops. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Liskov, Interface Segregation, Dependency Inversion; when a pattern is over-engineering.**
   - Read: [M4 Q3. Give a Liskov violation that compiles fine and breaks at runtime.](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q3); [M4 Q4. Why is Dependency Inversion not the same thing as using a DI container?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q4); [M4 Q5. When is a design pattern over-engineering?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q5)
   - Do: Write a Liskov violation that compiles and breaks at runtime; fix it.
4. **Explain aloud — 5 min.** *Why is Dependency Inversion not the same as using a DI container?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-94"></a>

## Day 94 · Wednesday · Wed 27 Jan 2027
**Grid paths** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is Dependency Inversion not the same as using a DI container?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Unique Paths and Unique Paths II (obstacles). Minimum Path Sum.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Unique Paths (62)](https://leetcode.com/problems/unique-paths/) · Medium; [Unique Paths II (63)](https://leetcode.com/problems/unique-paths-ii/) · Medium; [Minimum Path Sum (64)](https://leetcode.com/problems/minimum-path-sum/) · Medium
   - Done when: Boundaries and blocked cells are correct. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Strategy vs switch, event-handler leaks, Decorator vs inheritance; the 23 GoF patterns.**
   - Read: [M4 Q6. Strategy or a switch statement?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q6); [M4 Q7. How do event handlers cause memory leaks in .NET?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q7); [M4 Q8. Decorator or inheritance?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q8); [All 23 GoF patterns: table, code for the important ones](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-gof)
   - Do: Add a caching decorator around a repository interface; register it with DI.
4. **Explain aloud — 5 min.** *Decorator or inheritance?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-95"></a>

## Day 95 · Thursday · Thu 28 Jan 2027
**More knapsack shapes** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Decorator or inheritance?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Ones and Zeroes (two capacities), Perfect Squares, Last Stone Weight II.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Ones and Zeroes (474)](https://leetcode.com/problems/ones-and-zeroes/) · Medium; [Perfect Squares (279)](https://leetcode.com/problems/perfect-squares/) · Medium; [Last Stone Weight II (1049)](https://leetcode.com/problems/last-stone-weight-ii/) · Medium
   - Done when: You recognised each as a knapsack variant. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Repository over EF Core, Singleton, anti-patterns, testability.**
   - Read: [M4 Q9. Should you wrap EF Core in a repository? Argue both sides.](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q9); [M4 Q10. Why is Singleton often called an anti-pattern, and when is it still right?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q10); [M4 Q11. Name three anti-patterns you have actually seen.](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q11); [M4 Q12. Why is untestable code usually badly designed code?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q12); [Enterprise patterns beyond GoF (.NET backend)](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-enterprise); [Making an LLD testable](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-testing)
   - Do: Argue both sides of wrapping EF Core in a repository in writing (5 lines each).
4. **Explain aloud — 5 min.** *Why is untestable code usually badly designed code?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-96"></a>

## Day 96 · Friday · Fri 29 Jan 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: 0/1 knapsack (classic) — derive state, then 1-D array looping backwards, Partition Equal Subset Sum, Subset sum (boolean DP).
   - Then one problem you have not seen, with no pattern hint: [Triangle (120)](https://leetcode.com/problems/triangle/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Explain Single Responsibility without reciting the definition.* · *Why is Dependency Inversion not the same as using a DI container?* · *Decorator or inheritance?* · *Why is untestable code usually badly designed code?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-derive 0/1 vs unbounded knapsack loops from scratch.

---

<a id="day-97"></a>

## Day 97 · Saturday · Sat 30 Jan 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Triangle, Maximal Square, Count Square Submatrices, Coin Change re-solve.
   - Solve: [Triangle (120)](https://leetcode.com/problems/triangle/) · Medium; [Maximal Square (221)](https://leetcode.com/problems/maximal-square/) · Medium; [Count Square Submatrices with All Ones (1277)](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) · Medium; [Coin Change (322)](https://leetcode.com/problems/coin-change/) · Medium
3. **Design — 90 min.** LLD: rate limiter with a controllable clock — token bucket class, per-client policy, TimeProvider/FakeTimeProvider in tests, then thread safety.
   - Use: [LLD card: Rate limiter / API throttling with a controllable clock](../DESIGNS.md#lld-rate-limiter-lld); [GAP-09-012 — Design rate limiter](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-012); [Thread safety in LLD](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-concurrency)
4. **Lab / project — 90 min.** PROJECT M4 — idempotent consumption: a processed_messages row committed in the SAME transaction as the job's result; duplicate delivery test; crash-before-commit test. Idempotent submission with an Idempotency-Key header.
   - Use: [M4 — Idempotent effects (Week 14)](../PROJECT.md#project-m4); [Delivery semantics and idempotency patterns](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-delivery)
5. **English — 20 min.** Record 2 minutes: 'how my worker handles a duplicate message'.

---

<a id="day-98"></a>

## Day 98 · Sunday · Sun 31 Jan 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Explain Single Responsibility without reciting the definition.* · *Why is Dependency Inversion not the same as using a DI container?* · *Decorator or inheritance?* · *Why is untestable code usually badly designed code?*
   - Solve cold (25 minutes each): [Coin Change II (518)](https://leetcode.com/problems/coin-change-ii/) · Medium; [Ones and Zeroes (474)](https://leetcode.com/problems/ones-and-zeroes/) · Medium
   - Sketch in 10–15 minutes: LLD: rate limiter with a controllable clock — token bucket class, per-client policy, TimeProvider/FakeTimeProvider in tests, then thread safety.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Finish PROJECT M4 tests. Write down exactly where the guarantee stops (external effects).
   - Use: [M4 — Idempotent effects (Week 14)](../PROJECT.md#project-m4); [2. Guarantees — and where they stop](../PROJECT.md#project-guarantees)
4. **Behavioral — 45 min.** Failure-story follow-ups: what you missed, how you knew the fix worked, what you would do differently.
   - Use: [GAP-08-002 — Tell me about a time you made a bad technical decision.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-002); [GAP-08-012 — Tell me about a time you moved quickly and made a mistake.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-012); [M5 Q22. How do you answer "what would you do differently?"](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q22)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 13](WEEK_13.md) · [The plan](../PLAN.md) · [Week 15 →](WEEK_15.md)
