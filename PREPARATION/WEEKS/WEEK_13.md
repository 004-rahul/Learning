# Week 13 — DP foundations · distributed data and caching · PROJECT M3

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 12](WEEK_12.md) [Week 14 →](WEEK_14.md)

**Phase 2 — Core depth and the project starts** · Days 85–91 · default dates Mon 18 Jan 2027 – Sun 24 Jan 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** From recursion to memo to tabulation; 1-D DP  
**Core this week:** Replication, quorum, split brain, consistent hashing, CAP/PACELC, caching, scaling fundamentals

**Goal:** Derive a basic DP state and recurrence, explain replication and consistency precisely, and show accepted jobs survive the publish crash window.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Climbing Stairs and House Robber derived as recursion → memo → table → two variables.
- [ ] You can say 'dp[i] is …' for every DP problem you solved.
- [ ] PROJECT M3: kill the process between commit and publish — the job is still delivered later.
- [ ] You can explain CAP with the correct definition of C.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [85 Mon](#day-85) | From recursion to DP | Climbing Stairs, Min Cost Climbing Stairs | Replication, read-your-writes, quorum, split brain |
| [86 Tue](#day-86) | Take or skip | House Robber, House Robber II, N-th Tribonacci Number | Consistent hashing, sharding, hot keys, CAP and PACELC, consistency models |
| [87 Wed](#day-87) | Unbounded choices | Coin Change, Decode Ways | Redis, eviction (LRU/LFU/TTL), cache patterns, invalidation, stampede |
| [88 Thu](#day-88) | Segmentation and subsequences | Word Break, Longest Increasing Subsequence | Scaling fundamentals: vertical vs horizontal, stateless, load balancers L4/L7, gateways, discovery, DNS load balancing, CDN |
| [89 Fri](#day-89) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [90 Sat](#day-90) | Deep work (5 h) | Maximum Product Subarray, Longest Palindromic Substring, Palindromic Substrings, Combination Sum IV | design + lab/project |
| [91 Sun](#day-91) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-85"></a>

## Day 85 · Monday · Mon 18 Jan 2027
**From recursion to DP** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is the outbox pattern and what problem does it solve?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Climbing Stairs: write the brute-force recursion, see repeated calls, add memo, then a table, then two variables. Min Cost Climbing Stairs.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families); [15. Dynamic programming](../NOTES/01_DSA.md#dsa-15-dynamic-programming)
   - Solve: [Climbing Stairs (70)](https://leetcode.com/problems/climbing-stairs/) · Easy; [Min Cost Climbing Stairs (746)](https://leetcode.com/problems/min-cost-climbing-stairs/) · Easy
   - Done when: You wrote the state sentence before code. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Replication, read-your-writes, quorum, split brain.**
   - Read: [M3 Q16. Why can a read replica serve stale data, and how do you hide that from a user?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q16); [M3 Q17. What does quorum mean, and why R + W > N?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q17); [M3 Q18. What is split brain?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q18); [GAP-01-020 — What is replication vs partitioning?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-020); [GAP-01-021 — What is leader-follower replication?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-021); [GAP-01-022 — What is read-after-write consistency?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-022); [GAP-01-025 — What is quorum read/write?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-025)
   - Do: Draw leader-follower replication with lag; show a stale read and two fixes.
4. **Explain aloud — 5 min.** *Why can a read replica serve stale data, and how do you hide that from a user?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-86"></a>

## Day 86 · Tuesday · Tue 19 Jan 2027
**Take or skip** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why can a read replica serve stale data, and how do you hide that from a user?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** House Robber; then House Robber II (two linear runs). N-th Tribonacci.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [House Robber (198)](https://leetcode.com/problems/house-robber/) · Medium; [House Robber II (213)](https://leetcode.com/problems/house-robber-ii/) · Medium; [N-th Tribonacci Number (1137)](https://leetcode.com/problems/n-th-tribonacci-number/) · Easy
   - Done when: You can explain why the circle needs two runs. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Consistent hashing, sharding, hot keys, CAP and PACELC, consistency models.**
   - Read: [M3 Q19. Why does consistent hashing beat modulo hashing?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q19); [M3 Q20. What does CAP actually say, and what is the common misreading?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q20); [M3 Q21. Strong, eventual, or causal consistency?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q21); [GAP-01-013 — What is consistent hashing and why is it useful?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-013); [GAP-01-014 — What is database sharding?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-014); [GAP-01-015 — What are good shard keys and bad shard keys?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-015); [GAP-01-016 — What is hot partition/hot key and how do you handle it?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-016); [GAP-01-026 — What is CAP theorem, and what does it actually mean?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-026); [GAP-01-027 — What is PACELC?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-027); [Consistency models — the ladder](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-consistency)
   - Do: Implement consistent hashing with virtual nodes in C# (~80 lines); add a node and count moved keys.
4. **Explain aloud — 5 min.** *What does CAP actually say, and what is the common misreading?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-87"></a>

## Day 87 · Wednesday · Wed 20 Jan 2027
**Unbounded choices** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does CAP actually say, and what is the common misreading?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Coin Change (minimum coins; impossible vs zero). Decode Ways (zeros and two-digit rules).
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Coin Change (322)](https://leetcode.com/problems/coin-change/) · Medium; [Decode Ways (91)](https://leetcode.com/problems/decode-ways/) · Medium
   - Done when: You can explain why greedy fails for coins {1,3,4} and amount 6. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Redis, eviction (LRU/LFU/TTL), cache patterns, invalidation, stampede.**
   - Read: [M3 Q22. Why is Redis being single-threaded a feature?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q22); [M3 Q23. LRU, LFU or TTL?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m3-q23); [GAP-01-010 — What is caching and what are cache-aside, write-through, write-back and re…](../NOTES/08_SYSTEM_DESIGN.md#gap-01-010); [GAP-01-011 — What are cache invalidation strategies?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-011); [GAP-01-012 — What is cache stampede/thundering herd and how do you prevent it?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-012)
   - Do: Add Redis (Compose) and a cache-aside read for job status with a TTL; write what invalidates it.
4. **Explain aloud — 5 min.** *Why is Redis being single-threaded a feature?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-88"></a>

## Day 88 · Thursday · Thu 21 Jan 2027
**Segmentation and subsequences** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is Redis being single-threaded a feature?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Word Break (prefix feasibility). Longest Increasing Subsequence O(n²) first.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Word Break (139)](https://leetcode.com/problems/word-break/) · Medium; [Longest Increasing Subsequence (300)](https://leetcode.com/problems/longest-increasing-subsequence/) · Medium
   - Done when: State and transition written for both. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Scaling fundamentals: vertical vs horizontal, stateless, load balancers L4/L7, gateways, discovery, DNS load balancing, CDN.**
   - Read: [GAP-01-001 — What is horizontal vs vertical scaling?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-001); [GAP-01-002 — What is stateless vs stateful architecture?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-002); [GAP-01-003 — When should you use a load balancer?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-003); [GAP-01-004 — L4 vs L7 load balancer?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-004); [GAP-01-005 — Reverse proxy vs API gateway?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-005); [GAP-01-006 — What is service discovery?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-006); [GAP-01-007 — Client-side vs server-side service discovery?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-007); [GAP-01-008 — What is DNS and how does DNS-based load balancing work?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-008); [GAP-01-009 — What is CDN and when should you use it?](../NOTES/08_SYSTEM_DESIGN.md#gap-01-009); [Building blocks reference](../NOTES/08_SYSTEM_DESIGN.md#add-sd-building-blocks)
   - Do: Draw the generic high-level flow from memory, then compare with the added diagram.
4. **Explain aloud — 5 min.** *L4 vs L7 load balancer?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read [The generic high-level design flow](../NOTES/08_SYSTEM_DESIGN.md#add-sd-flow), then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-89"></a>

## Day 89 · Friday · Fri 22 Jan 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Climbing Stairs, Min Cost Climbing Stairs, House Robber.
   - Then one problem you have not seen, with no pattern hint: [Combination Sum IV (377)](https://leetcode.com/problems/combination-sum-iv/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why can a read replica serve stale data, and how do you hide that from a user?* · *What does CAP actually say, and what is the common misreading?* · *Why is Redis being single-threaded a feature?* · *L4 vs L7 load balancer?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-derive every DP state from this week without looking.

---

<a id="day-90"></a>

## Day 90 · Saturday · Sat 23 Jan 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Maximum Product Subarray (track max and min), Longest Palindromic Substring (expand around centre), Palindromic Substrings, Combination Sum IV.
   - Solve: [Maximum Product Subarray (152)](https://leetcode.com/problems/maximum-product-subarray/) · Medium; [Longest Palindromic Substring (5)](https://leetcode.com/problems/longest-palindromic-substring/) · Medium; [Palindromic Substrings (647)](https://leetcode.com/problems/palindromic-substrings/) · Medium; [Combination Sum IV (377)](https://leetcode.com/problems/combination-sum-iv/) · Medium
3. **Design — 90 min.** LLD: split-expense service (Splitwise) — users, groups, expenses, split types (equal, exact, percent), balances, simplify debts. Use decimal for money and a rounding rule.
   - Use: [LLD card: Split-expense service (Splitwise)](../DESIGNS.md#lld-splitwise)
4. **Lab / project — 90 min.** PROJECT M3 — transactional outbox: write the job row and the outbox row in one transaction; a relay publishes with retries and marks sent. Kill the process between commit and publish; prove the job is delivered later.
   - Use: [M3 — Transactional outbox (Week 13)](../PROJECT.md#project-m3); [The transactional outbox in depth](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-outbox)
5. **English — 20 min.** Record 2 minutes: 'the dual-write problem'.

---

<a id="day-91"></a>

## Day 91 · Sunday · Sun 24 Jan 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why can a read replica serve stale data, and how do you hide that from a user?* · *What does CAP actually say, and what is the common misreading?* · *Why is Redis being single-threaded a feature?* · *L4 vs L7 load balancer?*
   - Solve cold (25 minutes each): [House Robber (198)](https://leetcode.com/problems/house-robber/) · Medium; [Word Break (139)](https://leetcode.com/problems/word-break/) · Medium
   - Sketch in 10–15 minutes: LLD: split-expense service (Splitwise) — users, groups, expenses, split types (equal, exact, percent), balances, simplify debts.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Finish PROJECT M3 and write its decision record (why outbox, polling vs CDC, ordering).
   - Use: [M3 — Transactional outbox (Week 13)](../PROJECT.md#project-m3); [10. Decision records (3–5)](../PROJECT.md#project-decisions)
4. **Behavioral — 45 min.** Ambiguity story: what was unknown, how you clarified, what you deferred.
   - Use: [GAP-08-010 — Tell me about a time you had an ambiguous problem.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-010); [GAP-08-011 — Tell me about a time you had to make a decision with incomplete information.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-011)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 12](WEEK_12.md) · [The plan](../PLAN.md) · [Week 14 →](WEEK_14.md)
