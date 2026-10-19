# Week 5 — Binary search and sorting · resource lifetime, GC, async/await

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 4](WEEK_04.md) [Week 6 →](WEEK_06.md)

**Phase 1 — Foundations** · Days 29–35 · default dates Mon 23 Nov 2026 – Sun 29 Nov 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Binary search (exact, bounds, rotated, on the answer), merge sort, quicksort  
**Core this week:** IDisposable, finalizers, GC generations, async/await, the state machine and its traps

**Goal:** Write a binary search that always terminates, implement merge sort, and explain what await really does and why .Result deadlocks.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Binary search, lower bound and upper bound correct on missing values, duplicates and one element.
- [ ] Koko Eating Bananas solved with a monotone predicate you can state.
- [ ] Merge sort implemented from memory; quicksort partition traced.
- [ ] The async state machine read in SharpLab; a .Result deadlock reproduced and fixed.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [29 Mon](#day-29) | Binary search invariant | Binary Search, Search Insert Position | IDisposable, using, the dispose pattern and finalizers |
| [30 Tue](#day-30) | Lower and upper bounds | Find First and Last Position of Element in Sorted Array, First Bad Version | GC generations, the large object heap, workstation vs server GC |
| [31 Wed](#day-31) | Rotated sorted arrays | Find Minimum in Rotated Sorted Array, Search in Rotated Sorted Array | async/await: what await does and the generated state machine |
| [32 Thu](#day-32) | Binary search on the answer | Koko Eating Bananas, Capacity To Ship Packages Within D Days | async pitfalls: async void, .Result deadlock, ConfigureAwait, ValueTask, CancellationToken |
| [33 Fri](#day-33) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [34 Sat](#day-34) | Deep work (5 h) | Implement merge sort (stable, O(n log n), O(n) extra), Implement quicksort partition (Lomuto and Hoare) and quickselect, Sort an Array, Sort Colors | design + lab/project |
| [35 Sun](#day-35) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-29"></a>

## Day 29 · Monday · Mon 23 Nov 2026
**Binary search invariant** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is the difference between throw and throw ex?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Closed interval [lo, hi] vs half-open [lo, hi). Pick one template and use it always. mid = lo + (hi - lo) / 2. Then Search Insert Position.
   - Read first (short): [Binary search: exact match, bounds, rotated arrays](../NOTES/01_DSA.md#add-dsa-binary-search); [11. Binary Search ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-11-binary-search)
   - Solve: [Binary Search (704)](https://leetcode.com/problems/binary-search/) · Easy; [Search Insert Position (35)](https://leetcode.com/problems/search-insert-position/) · Easy
   - Done when: Absent value, one element and two elements all terminate correctly. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: IDisposable, using, the dispose pattern and finalizers.**
   - Read: [M1 Q28. Explain IDisposable and why a finalizer makes collection take two GC cycles.](../NOTES/02_CSHARP.md#m1-q28); [BASIC-026 — What exception and resource basics come before advanced async?](../NOTES/00_START_FROM_ZERO.md#basic-026)
   - Do: Write a class that owns a FileStream; implement IDisposable; show `using` disposing on success and on exception.
4. **Explain aloud — 5 min.** *Why does a finalizer make collection take (at least) two GC cycles?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-30"></a>

## Day 30 · Tuesday · Tue 24 Nov 2026
**Lower and upper bounds** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why does a finalizer make collection take (at least) two GC cycles?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** First and Last Position: two boundary searches. First Bad Version uses the same lower-bound template.
   - Read first (short): [5. Binary search, and binary search on the answer](../NOTES/01_DSA.md#dsa-5-binary-search-and-binary-search-on-the-answer)
   - Solve: [Find First and Last Position of Element in Sorted Array (34)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) · Medium; [First Bad Version (278)](https://leetcode.com/problems/first-bad-version/) · Easy
   - Done when: All-duplicates and missing target return the right bounds. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: GC generations, the large object heap, workstation vs server GC.**
   - Read: [M1 Q29. Explain GC generations and the large object heap.](../NOTES/02_CSHARP.md#m1-q29); [M1 Q30. Workstation GC or server GC?](../NOTES/02_CSHARP.md#m1-q30)
   - Do: Allocate many short-lived objects and watch `dotnet-counters monitor` (gen 0 count, allocation rate).
4. **Explain aloud — 5 min.** *Why is a gen 0 collection cheap and a gen 2 collection expensive?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-31"></a>

## Day 31 · Wednesday · Wed 25 Nov 2026
**Rotated sorted arrays** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is a gen 0 collection cheap and a gen 2 collection expensive?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Find Minimum in Rotated Sorted Array, then Search in Rotated Sorted Array: decide which half is sorted, then decide where the target can be.
   - Read first (short): [Binary search: exact match, bounds, rotated arrays](../NOTES/01_DSA.md#add-dsa-binary-search)
   - Solve: [Find Minimum in Rotated Sorted Array (153)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) · Medium; [Search in Rotated Sorted Array (33)](https://leetcode.com/problems/search-in-rotated-sorted-array/) · Medium
   - Done when: You can say what assumption breaks with duplicates. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: async/await: what await does and the generated state machine.**
   - Read: [M1 Q31. What does await actually do?](../NOTES/02_CSHARP.md#m1-q31); [M1 Q32. Walk me through the generated state machine.](../NOTES/02_CSHARP.md#m1-q32); [BASIC-028 — What are async, concurrency and parallelism?](../NOTES/00_START_FROM_ZERO.md#basic-028)
   - Do: Paste a small async method into SharpLab and find MoveNext, the state field and the awaiter.
4. **Explain aloud — 5 min.** *What does await actually do?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-32"></a>

## Day 32 · Thursday · Thu 26 Nov 2026
**Binary search on the answer** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does await actually do?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Koko Eating Bananas: the answer space is speeds 1..max; the predicate 'can finish in h hours' is monotone. Ceiling division; use long for totals. Then Capacity to Ship Packages.
   - Read first (short): [Binary search on the answer](../NOTES/01_DSA.md#add-dsa-binary-search-answer); [12. Binary Search on Answer ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-12-binary-search-on-answer)
   - Solve: [Koko Eating Bananas (875)](https://leetcode.com/problems/koko-eating-bananas/) · Medium; [Capacity To Ship Packages Within D Days (1011)](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) · Medium
   - Done when: You stated the predicate and both bounds before coding. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: async pitfalls: async void, .Result deadlock, ConfigureAwait, ValueTask, CancellationToken.**
   - Read: [M1 Q33. Why is async void almost always wrong?](../NOTES/02_CSHARP.md#m1-q33); [M1 Q34. Why does calling .Result deadlock?](../NOTES/02_CSHARP.md#m1-q34); [M1 Q35. What does ConfigureAwait(false) do and when do you need it?](../NOTES/02_CSHARP.md#m1-q35); [M1 Q36. Task or ValueTask?](../NOTES/02_CSHARP.md#m1-q36); [M1 Q37. How does CancellationToken work, and why is it not "killing a thread"?](../NOTES/02_CSHARP.md#m1-q37); [Practical async patterns](../NOTES/02_CSHARP.md#add-cs-async-patterns)
   - Do: Call three slow fake services with Task.WhenAll, a 2-second timeout (CancelAfter) and one failing call; handle the failure.
4. **Explain aloud — 5 min.** *Why does calling .Result deadlock in an app with a synchronization context?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-33"></a>

## Day 33 · Friday · Fri 27 Nov 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Binary Search, Search Insert Position, Find First and Last Position of Element in Sorted Array.
   - Then one problem you have not seen, with no pattern hint: [Sqrt(x) (69)](https://leetcode.com/problems/sqrtx/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why does a finalizer make collection take (at least) two GC cycles?* · *Why is a gen 0 collection cheap and a gen 2 collection expensive?* · *What does await actually do?* · *Why does calling .Result deadlock in an app with a synchronization context?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-explain async/await from memory before reading anything.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Search a 2D Matrix (74)](https://leetcode.com/problems/search-a-2d-matrix/) · Medium

---

<a id="day-34"></a>

## Day 34 · Saturday · Sat 28 Nov 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Implement merge sort and quicksort partition (Lomuto) yourself; trace both on 8 numbers. Solve Sort an Array with merge sort, then Sort Colors (Dutch flag).
   - Solve: [Implement merge sort (stable, O(n log n), O(n) extra)](../PROBLEMS.md#x-merge-sort) · own exercise; [Implement quicksort partition (Lomuto and Hoare) and quickselect](../PROBLEMS.md#x-quick-sort) · own exercise; [Sort an Array (912)](https://leetcode.com/problems/sort-an-array/) · Medium; [Sort Colors (75)](https://leetcode.com/problems/sort-colors/) · Medium
3. **Design — 90 min.** URL shortener — full 30-minute design: requirements, estimate, API, schema and indexes, cache, one failure (cache down).
   - Use: [HLD card: URL shortener (TinyURL)](../DESIGNS.md#hld-url-shortener); [The answer template (use it every time)](../NOTES/08_SYSTEM_DESIGN.md#add-sd-template); [The numbers table](../NOTES/08_SYSTEM_DESIGN.md#add-sd-numbers)
4. **Lab / project — 90 min.** Reproduce the .Result deadlock in an environment with a synchronization context (a small WinForms/WPF app, or a custom SynchronizationContext). Fix it three ways and write which fix is correct for a server.
   - Use: [M1 Q34. Why does calling .Result deadlock?](../NOTES/02_CSHARP.md#m1-q34); [M1 Q35. What does ConfigureAwait(false) do and when do you need it?](../NOTES/02_CSHARP.md#m1-q35)
5. **English — 20 min.** Record 2 minutes: 'what await does'.

---

<a id="day-35"></a>

## Day 35 · Sunday · Sun 29 Nov 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why does a finalizer make collection take (at least) two GC cycles?* · *Why is a gen 0 collection cheap and a gen 2 collection expensive?* · *What does await actually do?* · *Why does calling .Result deadlock in an app with a synchronization context?*
   - Solve cold (25 minutes each): [Find First and Last Position of Element in Sorted Array (34)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) · Medium; [Koko Eating Bananas (875)](https://leetcode.com/problems/koko-eating-bananas/) · Medium
   - Sketch in 10–15 minutes: URL shortener — full 30-minute design: requirements, estimate, API, schema and indexes, cache, one failure (cache down).
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Read Stephen Toub's 'How Async/Await Really Works in C#' (devblogs.microsoft.com) for 60 minutes; write a six-question summary (what, why, how, trade-offs, when, when not). Then implement bubble/selection/insertion sort and state their costs.
   - Use: [Bubble, selection, insertion sort — trace and state costs](../PROBLEMS.md#x-simple-sorts) · own exercise; [Sorting algorithms](../NOTES/01_DSA.md#add-dsa-sorting)
4. **Behavioral — 45 min.** Performance story with follow-ups: how was it measured, why that approach, what alternatives, what are its limits. Fill the gaps you can verify; mark the rest 'unknown'.
   - Use: [Story preparation for every resume line](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-resume-stories); [GAP-08-023 — Tell me about a time you used data to make a decision.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-023)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 4](WEEK_04.md) · [The plan](../PLAN.md) · [Week 6 →](WEEK_06.md)
