# Week 4 — Variable windows, prefix maps, Kadane · collections, LINQ, delegates, exceptions

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 3](WEEK_03.md) [Week 5 →](WEEK_05.md)

**Phase 1 — Foundations** · Days 22–28 · default dates Mon 16 Nov 2026 – Sun 22 Nov 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Variable windows, prefix sum + hash map, running optimum  
**Core this week:** IEnumerable/IQueryable, yield, deferred execution, delegates/closures, exceptions

**Goal:** Choose correctly between a variable window and prefix sum + map, and explain deferred execution, closures and exception handling.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] One unseen array/string problem solved without a pattern hint, with five edge tests and complexity.
- [ ] Subarray Sum Equals K explained, including the {0:1} seed and negative numbers.
- [ ] You can demonstrate a deferred-execution bug and a captured-loop-variable bug.
- [ ] Month 1 checkpoint completed and three weak items named.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [22 Mon](#day-22) | Window validity and shrink rules | Longest Substring Without Repeating Characters | IEnumerable vs ICollection vs IList vs IQueryable; what yield return compiles into |
| [23 Tue](#day-23) | Monotone windows and their limits | Minimum Size Subarray Sum, Max Consecutive Ones III | Deferred execution and LINQ costs |
| [24 Wed](#day-24) | Prefix sums plus a frequency map | Subarray Sum Equals K | Delegates, lambdas, closures and events |
| [25 Thu](#day-25) | Local and global optimum (Kadane) | Best Time to Buy and Sell Stock, Maximum Subarray | Exceptions: throw vs throw ex, filters, cost, using and IDisposable basics |
| [26 Fri](#day-26) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [27 Sat](#day-27) | Deep work (5 h) | Product of Array Except Self, Longest Repeating Character Replacement, Permutation in String, Group Anagrams | design + lab/project |
| [28 Sun](#day-28) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-22"></a>

## Day 22 · Monday · Mon 16 Nov 2026
**Window validity and shrink rules** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why composition over inheritance?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Longest Substring Without Repeating Characters: expand right; while the window is invalid, shrink left. Keep last-seen positions or counts.
   - Read first (short): [Sliding window: templates](../NOTES/01_DSA.md#add-dsa-sliding-window); [2. Sliding window](../NOTES/01_DSA.md#dsa-2-sliding-window)
   - Solve: [Longest Substring Without Repeating Characters (3)](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium
   - Done when: You can say exactly when the window is valid and why shrinking is safe. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: IEnumerable vs ICollection vs IList vs IQueryable; what yield return compiles into.**
   - Read: [M1 Q21. IEnumerable, ICollection, IList, IQueryable - what is the difference and why do…](../NOTES/02_CSHARP.md#m1-q21); [M1 Q22. What does yield return compile into?](../NOTES/02_CSHARP.md#m1-q22)
   - Do: Write an iterator with yield; put a breakpoint inside and see it run only when enumerated.
4. **Explain aloud — 5 min.** *IEnumerable vs IQueryable — why does it matter for a database query?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-23"></a>

## Day 23 · Tuesday · Tue 17 Nov 2026
**Monotone windows and their limits** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *IEnumerable vs IQueryable — why does it matter for a database query?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Minimum Size Subarray Sum (positive numbers allow shrinking). Find an input with negative numbers where the same rule fails.
   - Read first (short): [BASIC-019 — What must I understand before sliding windows and prefix sums?](../NOTES/00_START_FROM_ZERO.md#basic-019); [16. Subarray thinking ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-16-subarray-thinking)
   - Solve: [Minimum Size Subarray Sum (209)](https://leetcode.com/problems/minimum-size-subarray-sum/) · Medium; [Max Consecutive Ones III (1004)](https://leetcode.com/problems/max-consecutive-ones-iii/) · Medium
   - Done when: You wrote the counterexample with negatives. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Deferred execution and LINQ costs.**
   - Read: [M1 Q23. Explain deferred execution and give a bug it causes.](../NOTES/02_CSHARP.md#m1-q23)
   - Do: Create a query, add an item to the source list, then enumerate twice. Count how many times the Where lambda runs.
4. **Explain aloud — 5 min.** *What is deferred execution and give one bug it causes.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-24"></a>

## Day 24 · Wednesday · Wed 18 Nov 2026
**Prefix sums plus a frequency map** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is deferred execution and give one bug it causes.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Subarray Sum Equals K: count earlier prefix sums equal to (prefix − k). Seed the map with {0:1}. Test zeros and negatives.
   - Read first (short): [4. Prefix sum and hashing](../NOTES/01_DSA.md#dsa-4-prefix-sum-and-hashing); [9. Prefix Sum ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-9-prefix-sum)
   - Solve: [Subarray Sum Equals K (560)](https://leetcode.com/problems/subarray-sum-equals-k/) · Medium
   - Done when: You can explain why a window does not work here and the map does. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Delegates, lambdas, closures and events.**
   - Read: [M1 Q24. What does a closure allocate, and what is the captured-loop-variable trap?](../NOTES/02_CSHARP.md#m1-q24); [BASIC-024 — What are delegates, lambdas, closures and events?](../NOTES/00_START_FROM_ZERO.md#basic-024)
   - Do: Reproduce the captured-loop-variable trap with a for loop and a list of Func<int>; fix it. Subscribe to an event and show a leak.
4. **Explain aloud — 5 min.** *What does a closure allocate, and what is the loop-variable trap?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-25"></a>

## Day 25 · Thursday · Thu 19 Nov 2026
**Local and global optimum (Kadane)** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does a closure allocate, and what is the loop-variable trap?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Best Time to Buy and Sell Stock (track the minimum so far), then Maximum Subarray (extend or restart). Handle an all-negative array.
   - Read first (short): [13. Kadane's Algorithm ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-13-kadane-s-algorithm); [Advanced array techniques](../NOTES/01_DSA.md#add-dsa-advanced-arrays)
   - Solve: [Best Time to Buy and Sell Stock (121)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy; [Maximum Subarray (53)](https://leetcode.com/problems/maximum-subarray/) · Medium
   - Done when: All-negative input returns the largest element. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Exceptions: throw vs throw ex, filters, cost, using and IDisposable basics.**
   - Read: [M1 Q25. What is the difference between throw and throw ex?](../NOTES/02_CSHARP.md#m1-q25); [M1 Q26. Why do exception filters exist?](../NOTES/02_CSHARP.md#m1-q26); [M1 Q27. What do exceptions actually cost, and why not use them for control flow?](../NOTES/02_CSHARP.md#m1-q27); [BASIC-026 — What exception and resource basics come before advanced async?](../NOTES/00_START_FROM_ZERO.md#basic-026)
   - Do: Show `throw ex` destroying the stack trace; use `catch (X e) when (...)`.
4. **Explain aloud — 5 min.** *What is the difference between throw and throw ex?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-26"></a>

## Day 26 · Friday · Fri 20 Nov 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Longest Substring Without Repeating Characters, Minimum Size Subarray Sum, Max Consecutive Ones III.
   - Then one problem you have not seen, with no pattern hint: [Contains Duplicate II (219)](https://leetcode.com/problems/contains-duplicate-ii/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *IEnumerable vs IQueryable — why does it matter for a database query?* · *What is deferred execution and give one bug it causes.* · *What does a closure allocate, and what is the loop-variable trap?* · *What is the difference between throw and throw ex?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Before the month test: list the 3 weakest items of the month in the WEAK sheet.

---

<a id="day-27"></a>

## Day 27 · Saturday · Sat 21 Nov 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Product of Array Except Self (prefix and suffix products), Longest Repeating Character Replacement, Permutation in String, Group Anagrams.
   - Solve: [Product of Array Except Self (238)](https://leetcode.com/problems/product-of-array-except-self/) · Medium; [Longest Repeating Character Replacement (424)](https://leetcode.com/problems/longest-repeating-character-replacement/) · Medium; [Permutation in String (567)](https://leetcode.com/problems/permutation-in-string/) · Medium; [Group Anagrams (49)](https://leetcode.com/problems/group-anagrams/) · Medium
3. **Design — 90 min.** URL shortener — data model and key generation (base62 counter vs hash), a cache, and a request-rate estimate. Still one region.
   - Use: [HLD card: URL shortener (TinyURL)](../DESIGNS.md#hld-url-shortener); [M3 Q34. Design a URL shortener - what are the real decisions?](../NOTES/08_SYSTEM_DESIGN.md#m3-q34); [GAP-05-001 — Design URL shortener](../NOTES/08_SYSTEM_DESIGN.md#gap-05-001); [How to estimate, with three worked examples](../NOTES/08_SYSTEM_DESIGN.md#add-sd-estimation)
4. **Lab / project — 90 min.** Write your own MyWhere<T> and MySelect<T,R> with yield. Reproduce the 'query runs twice' bug with a counter, then fix it with ToList().
   - Use: [M1 Q22. What does yield return compile into?](../NOTES/02_CSHARP.md#m1-q22); [M1 Q23. Explain deferred execution and give a bug it causes.](../NOTES/02_CSHARP.md#m1-q23)
5. **English — 20 min.** Record 2 minutes: 'deferred execution'.

---

<a id="day-28"></a>

## Day 28 · Sunday · Sun 22 Nov 2026
**Test, review, project, stories** · 300 minutes

1. **Month 1 checkpoint — 90 min (replaces the weekly test).**
   - [ ] Solve one unseen array/string problem in 45 minutes without a pattern hint; write five edge tests; state complexity.
   - [ ] Answer the M1 self-test aloud without notes (link above). Mark each Pass/Partial/Fail in the REVIEW sheet.
   - [ ] From memory: stack vs heap; three accidental boxing sites; the Equals/GetHashCode contract; deferred execution with a bug.
   - [ ] Count: problems logged with all six fields; re-solve ladder running for every hinted problem; journal has ~15 lines.
   - [ ] Name three weak items and schedule them on Fridays.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Month 1 test (see checkpoint below). Then repair the weakest prerequisite you found.
   - Use: [M1 PART F - The Month 1 self-test](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m1-part-f); [M1 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m1-guide)
4. **Behavioral — 45 min.** Draft one failure/learning story with the worksheet: the real mistake and what you changed afterwards.
   - Use: [GAP-08-001 — Tell me about your biggest failure.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-001); [The story worksheet](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-worksheet)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.
6. **Admin — 15 min.** Optional career admin (only if relocation is still a goal): read the career status box and choose which manual verification to do first.

---

[← Week 3](WEEK_03.md) · [The plan](../PLAN.md) · [Week 5 →](WEEK_05.md)
