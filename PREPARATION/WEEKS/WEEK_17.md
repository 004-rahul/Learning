# Week 17 — Mixed coding · distributed hard parts · PROJECT M7

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 16](WEEK_16.md) [Week 18 →](WEEK_18.md)

**Phase 3 — Project completion and design depth (Week 20 gate)** · Days 113–119 · default dates Mon 15 Feb 2027 – Sun 21 Feb 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Mixed sets without labels; repair the weakest family  
**Core this week:** Failure models, 2PC, Raft, leases and fencing, clocks, sagas, resilience patterns

**Goal:** Classify coding failures precisely and make the platform recover from worker crashes and poison messages.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Four unlabeled medium problems attempted; each failure classified (concept / model / bug / edge case / communication).
- [ ] PROJECT M7: kill a worker mid-job and the job completes; a poison job lands in the DLQ and can be replayed safely.
- [ ] A failure-modes table (failure → detection → response → observed behaviour) exists.
- [ ] Chat HLD done.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [113 Mon](#day-113) | Mixed array and window selection | Minimum Window Substring, Find All Anagrams in a String | Failure models, partitions, split brain, 2PC, Raft leader election |
| [114 Tue](#day-114) | Mixed graph and tree selection | Copy List with Random Pointer, Shortest Path in Binary Matrix | Distributed locks, leases, fencing tokens, clocks (Lamport, vector, skew, monotonic) |
| [115 Wed](#day-115) | DP state repair | Number of Longest Increasing Subsequence, Longest Common Subsequence | The dual-write problem, sagas (choreography vs orchestration), compensation |
| [116 Thu](#day-116) | Changed constraints | Kth Largest Element in a Stream, Find Median from Data Stream | Circuit breakers, bulkheads, retry storms, backoff with jitter, load shedding, admission control |
| [117 Fri](#day-117) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [118 Sat](#day-118) | Deep work (5 h) | Rotate Image, Spiral Matrix, Set Matrix Zeroes, Valid Sudoku | design + lab/project |
| [119 Sun](#day-119) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-113"></a>

## Day 113 · Monday · Mon 15 Feb 2027
**Mixed array and window selection** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Liveness or readiness — what is the difference and why does it matter?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Unseen problems, no topic hint: decide the pattern in two minutes using the decision table, then solve.
   - Read first (short): [PART 4 - How to pick a pattern in two minutes](../NOTES/01_DSA.md#dsa-part-4-how-to-pick-a-pattern-in-two-minutes)
   - Solve: [Minimum Window Substring (76)](https://leetcode.com/problems/minimum-window-substring/) · Hard; [Find All Anagrams in a String (438)](https://leetcode.com/problems/find-all-anagrams-in-a-string/) · Medium
   - Done when: You named the pattern before coding and logged the cause of any failure. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Failure models, partitions, split brain, 2PC, Raft leader election.**
   - Read: [GAP-03-001 — What is a distributed system's failure model?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-001); [GAP-03-002 — What is a network partition?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-002); [GAP-03-003 — What is split-brain?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-003); [GAP-03-004 — What is quorum?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-004); [GAP-03-005 — Why does majority voting help?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-005); [GAP-03-006 — What is leader/follower replication?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-006); [GAP-03-007 — What happens when the leader dies?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-007); [GAP-03-008 — What is leader lease vs leader election?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-008); [M4 Q13. Why is two-phase commit avoided in modern systems?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q13); [M4 Q14. Explain Raft leader election.](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q14)
   - Do: Watch the Raft visualisation (raft.github.io); explain a leader election aloud.
4. **Explain aloud — 5 min.** *Why is two-phase commit avoided across services?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-114"></a>

## Day 114 · Tuesday · Tue 16 Feb 2027
**Mixed graph and tree selection** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is two-phase commit avoided across services?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** One unseen BFS/DFS/tree problem in 45 minutes, then one linked-list design problem.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs)
   - Solve: [Copy List with Random Pointer (138)](https://leetcode.com/problems/copy-list-with-random-pointer/) · Medium; [Shortest Path in Binary Matrix (1091)](https://leetcode.com/problems/shortest-path-in-binary-matrix/) · Medium
   - Done when: Visited and null handling correct on the first submit, or the cause logged. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Distributed locks, leases, fencing tokens, clocks (Lamport, vector, skew, monotonic).**
   - Read: [M4 Q15. Why can a distributed lock not be made safe with timeouts alone?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q15); [GAP-03-010 — What is vector clock?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-010); [GAP-03-011 — What is Lamport clock?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-011); [GAP-03-012 — Why do distributed systems need logical clocks?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-012); [GAP-03-013 — What is clock skew?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-013); [GAP-03-014 — Why can't you rely on wall-clock timestamps for ordering?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-014); [GAP-03-015 — What is monotonic clock?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-015); [Leases, heartbeats, visibility timeouts and fencing](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-leases); [Clocks: physical, logical and hybrid](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-clocks)
   - Do: Write the 'two lock holders' scenario for a Redis lock with a GC pause, and how a fencing token stops the damage.
4. **Explain aloud — 5 min.** *Why can a distributed lock not be made safe with timeouts alone?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-115"></a>

## Day 115 · Wednesday · Wed 17 Feb 2027
**DP state repair** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why can a distributed lock not be made safe with timeouts alone?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Take your oldest failed DP problem: write the recursion and the state sentence first, then code. Then one new DP problem.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Number of Longest Increasing Subsequence (673)](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) · Medium; [Longest Common Subsequence (1143)](https://leetcode.com/problems/longest-common-subsequence/) · Medium
   - Done when: The state sentence is written before code. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: The dual-write problem, sagas (choreography vs orchestration), compensation.**
   - Read: [M4 Q16. What is the dual-write problem?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q16); [M4 Q17. Choreography or orchestration for a saga?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q17); [Sagas — a worked example](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-sagas)
   - Do: Write the order → payment → inventory saga with a compensating step for each.
4. **Explain aloud — 5 min.** *Choreography or orchestration for a saga?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-116"></a>

## Day 116 · Thursday · Thu 18 Feb 2027
**Changed constraints** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Choreography or orchestration for a saga?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Top-K with a stream (Kth Largest in a Stream) and with bounded memory; Find Median re-solve.
   - Read first (short): [Heaps and C# PriorityQueue](../NOTES/01_DSA.md#add-dsa-heaps)
   - Solve: [Kth Largest Element in a Stream (703)](https://leetcode.com/problems/kth-largest-element-in-a-stream/) · Easy; [Find Median from Data Stream (295)](https://leetcode.com/problems/find-median-from-data-stream/) · Hard
   - Done when: You can say what changes when input is a stream. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Circuit breakers, bulkheads, retry storms, backoff with jitter, load shedding, admission control.**
   - Read: [M4 Q18. Explain the circuit breaker states, and why retries alone amplify an outage.](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q18); [M4 Q19. What is a bulkhead and what does it protect?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#m4-q19); [GAP-03-018 — What is backpressure in distributed systems?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-018); [GAP-03-019 — How do you prevent cascading failures?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-019); [GAP-03-020 — How do you handle partial failure?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-020); [GAP-03-021 — What is graceful degradation?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-021); [GAP-03-022 — What is load shedding?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-022); [GAP-03-023 — What is admission control?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-023); [GAP-03-024 — What is retry storm?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-024); [GAP-03-025 — What is exponential backoff with jitter?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-025); [GAP-03-026 — What is request hedging and when can it make things worse?](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#gap-03-026); [Resilience toolkit and cascading failure](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-resilience)
   - Do: Add the standard resilience handler to the project's outbound HttpClient (if it has one) or to a fake downstream; show the breaker opening.
4. **Explain aloud — 5 min.** *Explain circuit-breaker states and why retries alone amplify an outage.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-117"></a>

## Day 117 · Friday · Fri 19 Feb 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Minimum Window Substring, Find All Anagrams in a String, Copy List with Random Pointer.
   - Then one problem you have not seen, with no pattern hint: [Fruit Into Baskets (904)](https://leetcode.com/problems/fruit-into-baskets/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why is two-phase commit avoided across services?* · *Why can a distributed lock not be made safe with timeouts alone?* · *Choreography or orchestration for a saga?* · *Explain circuit-breaker states and why retries alone amplify an outage.* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Classify every failure this week by cause in the DSA_LOG sheet.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Matrix: row/column sums, transpose, rectangular vs jagged arrays](../PROBLEMS.md#x-2d-basics) · own exercise; [Counting sort and radix sort for bounded integers](../PROBLEMS.md#x-counting-radix) · own exercise *(extension)*; [Rod cutting (unbounded knapsack)](../PROBLEMS.md#x-rod-cutting) · own exercise *(extension)*; [Infix to postfix (shunting-yard) and evaluate](../PROBLEMS.md#x-infix-postfix) · own exercise *(extension)*; [Tree views: left, right, top, bottom view](../PROBLEMS.md#x-tree-views) · own exercise *(extension)*; [Rat in a maze (grid backtracking, all paths)](../PROBLEMS.md#x-rat-maze) · own exercise *(extension)*; [4Sum (18)](https://leetcode.com/problems/4sum/) · Medium *(extension)*; [Maximum Sum Circular Subarray (918)](https://leetcode.com/problems/maximum-sum-circular-subarray/) · Medium *(extension)*; [Basic Calculator (224)](https://leetcode.com/problems/basic-calculator/) · Hard *(extension)*; [Sudoku Solver (37)](https://leetcode.com/problems/sudoku-solver/) · Hard *(extension)*; [Construct Binary Tree from Inorder and Postorder Traversal (106)](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) · Medium *(extension)*; [Boundary of Binary Tree (545)](https://leetcode.com/problems/boundary-of-binary-tree/) · Medium *(premium — free on neetcode.io/LintCode, extension)*; [Reconstruct Itinerary (332)](https://leetcode.com/problems/reconstruct-itinerary/) · Hard *(extension)*; [House Robber III (337)](https://leetcode.com/problems/house-robber-iii/) · Medium *(extension)*; [Shortest Common Supersequence (1092)](https://leetcode.com/problems/shortest-common-supersequence/) · Hard *(extension)*; [Palindrome Partitioning II (132)](https://leetcode.com/problems/palindrome-partitioning-ii/) · Hard *(extension)*; [Cherry Pickup (741)](https://leetcode.com/problems/cherry-pickup/) · Hard *(extension)*; [Single Number II (137)](https://leetcode.com/problems/single-number-ii/) · Medium *(extension)*

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Pastebin](../DESIGNS.md#hld-pastebin); [LLD card: Online voting system](../DESIGNS.md#lld-voting)

---

<a id="day-118"></a>

## Day 118 · Saturday · Sat 20 Feb 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Two 40-minute mixed problems with a timer: Rotate Image and Spiral Matrix; then Set Matrix Zeroes and Valid Sudoku.
   - Solve: [Rotate Image (48)](https://leetcode.com/problems/rotate-image/) · Medium; [Spiral Matrix (54)](https://leetcode.com/problems/spiral-matrix/) · Medium; [Set Matrix Zeroes (73)](https://leetcode.com/problems/set-matrix-zeroes/) · Medium; [Valid Sudoku (36)](https://leetcode.com/problems/valid-sudoku/) · Medium
3. **Design — 90 min.** Chat (WhatsApp/Slack) HLD: connections and gateways, message ordering per conversation, offline delivery, presence, group fan-out.
   - Use: [HLD card: Chat and messaging (WhatsApp / Slack)](../DESIGNS.md#hld-chat); [M5 Q8. How do you deliver a message to a device that is offline?](../NOTES/08_SYSTEM_DESIGN.md#m5-q8); [GAP-05-003 — Design WhatsApp/chat system](../NOTES/08_SYSTEM_DESIGN.md#gap-05-003); [SignalR, interview-ready](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-signalr)
4. **Lab / project — 90 min.** PROJECT M7 — reliability: bounded retries with backoff + jitter, DLQ with inspect and authorised replay, job leases with heartbeats and a reaper, cancellation. Kill a worker mid-job; send a poison message.
   - Use: [M7 — Reliability (Week 17)](../PROJECT.md#project-m7); [Retry policy design](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-retries); [Leases, heartbeats, visibility timeouts and fencing](../NOTES/06_DISTRIBUTED_SYSTEMS_MESSAGING.md#add-ds-leases)
5. **English — 20 min.** Record 2 minutes: 'what happens when a worker dies mid-job'.

---

<a id="day-119"></a>

## Day 119 · Sunday · Sun 21 Feb 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why is two-phase commit avoided across services?* · *Why can a distributed lock not be made safe with timeouts alone?* · *Choreography or orchestration for a saga?* · *Explain circuit-breaker states and why retries alone amplify an outage.*
   - Solve cold (25 minutes each): [Copy List with Random Pointer (138)](https://leetcode.com/problems/copy-list-with-random-pointer/) · Medium; [Kth Largest Element in a Stream (703)](https://leetcode.com/problems/kth-largest-element-in-a-stream/) · Easy
   - Sketch in 10–15 minutes: Chat (WhatsApp/Slack) HLD: connections and gateways, message ordering per conversation, offline delivery, presence, group fan-out.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Write the failure-modes table for the project from what you OBSERVED (not what you expect).
   - Use: [M7 — Reliability (Week 17)](../PROJECT.md#project-m7); [M4 Q27. Walk me through exactly what happens when a worker dies mid-job.](../PROJECT.md#m4-q27)
4. **Behavioral — 45 min.** Incident story with 'what would you change today?' (worksheet).
   - Use: [GAP-08-018 — Tell me about a time you delivered under extreme pressure.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-018); [M5 Q22. How do you answer "what would you do differently?"](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q22)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Flight booking](../DESIGNS.md#hld-flight-booking); [LLD card: URL shortener](../DESIGNS.md#lld-url-shortener-lld)

---

[← Week 16](WEEK_16.md) · [The plan](../PLAN.md) · [Week 18 →](WEEK_18.md)
