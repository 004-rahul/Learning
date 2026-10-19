# Week 8 — Trees and BST · Web API, security basics, EF Core, caching

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 7](WEEK_07.md) [Week 9 →](WEEK_09.md)

**Phase 1 — Foundations** · Days 50–56 · default dates Mon 14 Dec 2026 – Sun 20 Dec 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Tree DFS/BFS, return values up the tree, BST invariant  
**Core this week:** HTTP/REST, JWT and auth basics, EF Core change tracking and N+1, caching, background services

**Goal:** Solve tree and BST problems by saying what each call returns, and explain REST, JWT, N+1 and cache-aside from experience.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Max Depth, Invert Tree, Level Order and Validate BST written cold.
- [ ] N+1 reproduced with SQL logging and fixed two ways.
- [ ] First 45-minute design mock done (URL shortener) and feedback recorded.
- [ ] Month 2 checkpoint completed.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [50 Mon](#day-50) | Tree recursion | Maximum Depth of Binary Tree, Invert Binary Tree, Same Tree | HTTP and REST: methods, idempotency, status codes, versioning |
| [51 Tue](#day-51) | Level-order BFS | Binary Tree Level Order Traversal, Binary Tree Right Side View | JWT: structure, signing vs encryption, validation, revocation; authentication vs authorization |
| [52 Wed](#day-52) | BST global invariant | Validate Binary Search Tree, Kth Smallest Element in a BST | EF Core change tracker, AsNoTracking, projections, N+1 |
| [53 Thu](#day-53) | Subtree combination and BST LCA | Diameter of Binary Tree, Balanced Binary Tree, Lowest Common Ancestor of a Binary Search Tree | Cache-aside vs write-through vs write-behind, stampede, BackgroundService |
| [54 Fri](#day-54) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [55 Sat](#day-55) | Deep work (5 h) | Lowest Common Ancestor of a Binary Tree, Construct Binary Tree from Preorder and Inorder Traversal, Path Sum, Count Good Nodes in Binary Tree | design + lab/project |
| [56 Sun](#day-56) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-50"></a>

## Day 50 · Monday · Mon 14 Dec 2026
**Tree recursion** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *How does configuration precedence work?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Maximum Depth and Invert Binary Tree: say what each call returns. Same Tree.
   - Read first (short): [Trees: traversals, return values, state, construction](../NOTES/01_DSA.md#add-dsa-trees); [9. Tree DFS](../NOTES/01_DSA.md#dsa-9-tree-dfs)
   - Solve: [Maximum Depth of Binary Tree (104)](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Easy; [Invert Binary Tree (226)](https://leetcode.com/problems/invert-binary-tree/) · Easy; [Same Tree (100)](https://leetcode.com/problems/same-tree/) · Easy
   - Done when: You can say the return value of every call in one sentence. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: HTTP and REST: methods, idempotency, status codes, versioning.**
   - Read: [M2 Q22. Which HTTP methods are idempotent, and why does it matter?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q22); [BASIC-029 — What happens between HTTP request and ASP.NET Core response?](../NOTES/00_START_FROM_ZERO.md#basic-029); [BASIC-030 — What are REST, HTTP methods, status codes and idempotency?](../NOTES/00_START_FROM_ZERO.md#basic-030); [HTTP essentials for API design](../NOTES/05_NETWORKING_OS.md#add-netw-http)
   - Do: Write the status code you return for each case of your job API (201, 200, 202, 400, 401, 403, 404, 409, 429, 500).
4. **Explain aloud — 5 min.** *Which HTTP methods are idempotent, and why does it matter?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-51"></a>

## Day 51 · Tuesday · Tue 15 Dec 2026
**Level-order BFS** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Which HTTP methods are idempotent, and why does it matter?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Level Order Traversal with a queue and a level-size loop. Right Side View.
   - Read first (short): [10. Tree BFS](../NOTES/01_DSA.md#dsa-10-tree-bfs)
   - Solve: [Binary Tree Level Order Traversal (102)](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Medium; [Binary Tree Right Side View (199)](https://leetcode.com/problems/binary-tree-right-side-view/) · Medium
   - Done when: Empty tree returns an empty list. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: JWT: structure, signing vs encryption, validation, revocation; authentication vs authorization.**
   - Read: [M2 Q23. What is inside a JWT, and what is the difference between signing and encryption?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q23); [M2 Q24. Why can a JWT not be revoked, and what are the three ways teams work around it?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q24); [BASIC-032 — What web security basics must I learn?](../NOTES/00_START_FROM_ZERO.md#basic-032); [Authentication and authorization: JWT, policies and tenant ownership](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-auth)
   - Do: Decode a JWT at jwt.io (use a test token). Configure JWT bearer validation in your API and write a failing test for an expired token.
4. **Explain aloud — 5 min.** *What is inside a JWT, and what is the difference between signing and encryption?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-52"></a>

## Day 52 · Wednesday · Wed 16 Dec 2026
**BST global invariant** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is inside a JWT, and what is the difference between signing and encryption?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Validate BST: pass (min, max) bounds down — checking only the children is wrong. Kth Smallest via inorder.
   - Read first (short): [Trees: traversals, return values, state, construction](../NOTES/01_DSA.md#add-dsa-trees)
   - Solve: [Validate Binary Search Tree (98)](https://leetcode.com/problems/validate-binary-search-tree/) · Medium; [Kth Smallest Element in a BST (230)](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Medium
   - Done when: You can give the counter-example that breaks the children-only check. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: EF Core change tracker, AsNoTracking, projections, N+1.**
   - Read: [M2 Q25. How does the EF Core change tracker know what to update?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q25); [M2 Q26. What is the N+1 problem, how do you find it, and how do you fix it?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q26); [Practical EF Core](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-efcore)
   - Do: Turn on EF Core SQL logging. Loop over jobs and read job.Attempts — count the queries. Fix with Include and with a projection.
4. **Explain aloud — 5 min.** *What is the N+1 problem, how do you find it, and how do you fix it?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-53"></a>

## Day 53 · Thursday · Thu 17 Dec 2026
**Subtree combination and BST LCA** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is the N+1 problem, how do you find it, and how do you fix it?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Diameter of Binary Tree (height up, best answer in a field). Balanced Binary Tree. Lowest Common Ancestor of a BST.
   - Read first (short): [7. Tree Patterns](../NOTES/01_DSA.md#f02-dsa-7-tree-patterns)
   - Solve: [Diameter of Binary Tree (543)](https://leetcode.com/problems/diameter-of-binary-tree/) · Easy; [Balanced Binary Tree (110)](https://leetcode.com/problems/balanced-binary-tree/) · Easy; [Lowest Common Ancestor of a Binary Search Tree (235)](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) · Medium
   - Done when: You used one DFS that returns height and updates the answer. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Cache-aside vs write-through vs write-behind, stampede, BackgroundService.**
   - Read: [M2 Q27. Compare cache-aside, write-through and write-behind.](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q27); [M2 Q28. What is a cache stampede and how do you prevent it?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q28); [M2 Q29. When would you use a BackgroundService, and what is the catch?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q29); [Caching in ASP.NET Core: the APIs](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-caching); [BackgroundService: scopes, shutdown, errors and a queue consumer](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-background)
   - Do: Add IMemoryCache cache-aside to GET /jobs/{id} with a short TTL; write what goes wrong when the job status changes.
4. **Explain aloud — 5 min.** *Compare cache-aside, write-through and write-behind.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-54"></a>

## Day 54 · Friday · Fri 18 Dec 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Maximum Depth of Binary Tree, Invert Binary Tree, Same Tree.
   - Then one problem you have not seen, with no pattern hint: [Subtree of Another Tree (572)](https://leetcode.com/problems/subtree-of-another-tree/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Which HTTP methods are idempotent, and why does it matter?* · *What is inside a JWT, and what is the difference between signing and encryption?* · *What is the N+1 problem, how do you find it, and how do you fix it?* · *Compare cache-aside, write-through and write-behind.* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve Validate BST and Level Order cold.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Convert Sorted Array to Binary Search Tree (108)](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) · Easy; [Inorder Successor in BST (285)](https://leetcode.com/problems/inorder-successor-in-bst/) · Medium *(premium — free on neetcode.io/LintCode)*

---

<a id="day-55"></a>

## Day 55 · Saturday · Sat 19 Dec 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Lowest Common Ancestor of a Binary Tree, Construct Binary Tree from Preorder and Inorder, Path Sum, Count Good Nodes.
   - Solve: [Lowest Common Ancestor of a Binary Tree (236)](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) · Medium; [Construct Binary Tree from Preorder and Inorder Traversal (105)](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) · Medium; [Path Sum (112)](https://leetcode.com/problems/path-sum/) · Easy; [Count Good Nodes in Binary Tree (1448)](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) · Medium
3. **Design — 90 min.** FIRST DESIGN MOCK (45 minutes, timer on, talk aloud, ideally with a partner): URL shortener from a blank page. Score yourself with the practice rubric and write three things you missed.
   - Use: [HLD card: URL shortener (TinyURL)](../DESIGNS.md#hld-url-shortener); [How to practise system design](../NOTES/08_SYSTEM_DESIGN.md#add-sd-practice); [Running mocks](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-mocks)
4. **Lab / project — 90 min.** Finish the parking lot: pricing strategy, tests, and one change request (add electric-vehicle spots) without rewriting.
   - Use: [LLD card: Parking lot](../DESIGNS.md#lld-parking-lot); [LLD self-review checklist and the 10 most common mistakes](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-checklist)
5. **English — 20 min.** Record 2 minutes: 'the N+1 problem'.

---

<a id="day-56"></a>

## Day 56 · Sunday · Sun 20 Dec 2026
**Test, review, project, stories** · 300 minutes

1. **Month 2 checkpoint — 90 min (replaces the weekly test).**
   - [ ] One unseen tree/BST problem in 45 minutes with tests.
   - [ ] Traversals and backtracking (subsets, permutations) from a blank file.
   - [ ] Answer the M2 self-test parts on concurrency, runtime and ASP.NET aloud (link above).
   - [ ] Demo: the minimal API with tests; the N+1 fix; one cancellable async call with timeout.
   - [ ] One mock done with written feedback. Update the WEAK sheet; plan Friday repairs.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Month 2 test (see checkpoint). Then repair the weakest item.
   - Use: [M2 PART F - The Month 2 self-test](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m2-part-f); [M2 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m2-guide)
4. **Behavioral — 45 min.** Receiving feedback: a real example where you changed your approach after feedback.
   - Use: [GAP-08-007 — Tell me about a time you received difficult feedback.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-007); [M5 Q21. What makes an Earn Trust story work?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q21)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.
6. **Admin — 15 min.** Decide whether to take IELTS/WES now (only if relocation is still a goal and the route needs it — see the career timeline).

---

[← Week 7](WEEK_07.md) · [The plan](../PLAN.md) · [Week 9 →](WEEK_09.md)
