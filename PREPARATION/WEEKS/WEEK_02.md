# Week 2 — Hashing and prefix basics · structs, equality, collections

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 1](WEEK_01.md) [Week 3 →](WEEK_03.md)

**Phase 1 — Foundations** · Days 8–14 · default dates Mon 02 Nov 2026 – Sun 08 Nov 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** HashSet/Dictionary, frequency maps, Two Sum, reader/writer pointers, prefix sums  
**Core this week:** Structs, boxing, Equals/GetHashCode, collection internals, ref/out/in

**Goal:** Use HashSet and Dictionary correctly, solve Two Sum from scratch, and explain boxing and the Equals/GetHashCode contract.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Two Sum solved cold (brute force, then one-pass map) with [3,3] and no-answer tests.
- [ ] Frequency map written from memory with TryGetValue.
- [ ] You can explain the Equals/GetHashCode contract and show a Dictionary 'losing' a key whose hash changed.
- [ ] A toy hash map with separate chaining (~60 lines) works.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [8 Mon](#day-8) | Set membership and duplicate detection | Contains Duplicate, Frequency map of an int[] with Dictionary (TryGetValue) | Struct vs class, boxing and its hidden cost, nullable value types |
| [9 Tue](#day-9) | Two Sum, brute force first | Two Sum | Equality: ==, Equals, GetHashCode, IEquatable<T>, records |
| [10 Wed](#day-10) | Two Sum in one pass with a map | Two Sum, Longest Consecutive Sequence | List<T>, Dictionary and HashSet internals: growth, buckets, collisions |
| [11 Thu](#day-11) | Reader and writer pointers | Move Zeroes, Remove Element | ref, out, in; const vs readonly vs static; static constructors; object memory layout |
| [12 Fri](#day-12) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [13 Sat](#day-13) | Deep work (5 h) | Remove Duplicates from Sorted Array, Running Sum of 1d Array, Plus One, Merge Sorted Array, Range Sum Query - Immutable | design + lab/project |
| [14 Sun](#day-14) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-8"></a>

## Day 8 · Monday · Mon 02 Nov 2026
**Set membership and duplicate detection** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Where does a struct live — the stack or the heap? (It depends on where it is declared.)* Then one item from the WEAK sheet.
2. **DSA — 60 min.** HashSet<T>: Add returns false for duplicates; expected O(1). Re-solve Contains Duplicate cold. Then count frequencies with Dictionary<int,int> and TryGetValue.
   - Read first (short): [BASIC-014 — How are Dictionary and HashSet different?](../NOTES/00_START_FROM_ZERO.md#basic-014); [5. Frequency counting ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-5-frequency-counting); [C# interview toolkit (.NET 10)](../NOTES/01_DSA.md#add-dsa-csharp-toolkit)
   - Solve: [Contains Duplicate (217)](https://leetcode.com/problems/contains-duplicate/) · Easy; [Frequency map of an int[] with Dictionary (TryGetValue)](../PROBLEMS.md#x-frequency) · own exercise
   - Done when: You can state the memory-for-time trade-off and expected vs worst-case lookup. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Struct vs class, boxing and its hidden cost, nullable value types.**
   - Read: [M1 Q5. When would you choose a struct over a class?](../NOTES/02_CSHARP.md#m1-q5); [M1 Q6. What is boxing, what does it cost, and name three places it happens by accident.](../NOTES/02_CSHARP.md#m1-q6); [M1 Q7. How do nullable value types work?](../NOTES/02_CSHARP.md#m1-q7)
   - Do: Box an int into object and unbox it; assign a struct to an interface variable; open SharpLab (sharplab.io) and find the `box` IL instruction.
4. **Explain aloud — 5 min.** *What is boxing, what does it cost, and name three places it happens by accident.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-9"></a>

## Day 9 · Tuesday · Tue 03 Nov 2026
**Two Sum, brute force first** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is boxing, what does it cost, and name three places it happens by accident.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Two Sum with two loops. Trace why an element cannot be used twice. Write the input/output contract (indices, exactly one answer).
   - Read first (short): [The per-problem protocol, step by step](../NOTES/01_DSA.md#add-dsa-protocol)
   - Solve: [Two Sum (1)](https://leetcode.com/problems/two-sum/) · Easy
   - Done when: Brute force passes and you can state its O(n²) cost and why. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Equality: ==, Equals, GetHashCode, IEquatable<T>, records.**
   - Read: [M1 Q15. State the Equals/GetHashCode contract and what breaks without it.](../NOTES/02_CSHARP.md#m1-q15); [Equality, comparison and hash codes in practice](../NOTES/02_CSHARP.md#add-cs-equality)
   - Do: Make a class Point used as a Dictionary key without overriding Equals/GetHashCode — it fails. Fix it. Then mutate a key after insert and watch lookup fail.
4. **Explain aloud — 5 min.** *State the Equals/GetHashCode contract and what breaks without it.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-10"></a>

## Day 10 · Wednesday · Wed 04 Nov 2026
**Two Sum in one pass with a map** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *State the Equals/GetHashCode contract and what breaks without it.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Check the complement BEFORE inserting the current value. Test [3,3], negative numbers and no match. Say expected time and extra space.
   - Read first (short): [6. Hashing ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-6-hashing); [Prefix sums, prefix + hash map, difference array](../NOTES/01_DSA.md#add-dsa-prefix-hash)
   - Solve: [Two Sum (1)](https://leetcode.com/problems/two-sum/) · Easy; [Longest Consecutive Sequence (128)](https://leetcode.com/problems/longest-consecutive-sequence/) · Medium
   - Done when: One-pass solution written from memory; you can explain check-before-insert. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: List<T>, Dictionary and HashSet internals: growth, buckets, collisions.**
   - Read: [M1 Q19. Why is dictionary lookup O(1), and what makes it degrade to O(n)?](../NOTES/02_CSHARP.md#m1-q19); [M1 Q20. How does List<T> grow, and why is Add amortised O(1)?](../NOTES/02_CSHARP.md#m1-q20)
   - Do: Print List<T>.Capacity while adding 20 items. Explain amortised O(1) Add.
4. **Explain aloud — 5 min.** *Why is Dictionary lookup O(1) on average, and what makes it O(n)?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-11"></a>

## Day 11 · Thursday · Thu 05 Nov 2026
**Reader and writer pointers** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is Dictionary lookup O(1) on average, and what makes it O(n)?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Move Zeroes: a writer index marks where the next non-zero goes. Trace [0,1,0,3,12] and an all-zero array. Then Remove Element.
   - Read first (short): [Two pointers: templates](../NOTES/01_DSA.md#add-dsa-two-pointers)
   - Solve: [Move Zeroes (283)](https://leetcode.com/problems/move-zeroes/) · Easy; [Remove Element (27)](https://leetcode.com/problems/remove-element/) · Easy
   - Done when: Order is preserved; no element is overwritten before it is read. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: ref, out, in; const vs readonly vs static; static constructors; object memory layout.**
   - Read: [M1 Q10. Explain ref, out and in.](../NOTES/02_CSHARP.md#m1-q10); [M1 Q11. What is actually in memory when you write `new Person()`?](../NOTES/02_CSHARP.md#m1-q11); [M1 Q12. When does a static constructor actually run?](../NOTES/02_CSHARP.md#m1-q12); [BASIC-023 — What are const, readonly, static and enums?](../NOTES/00_START_FROM_ZERO.md#basic-023)
   - Do: Write a method with ref, one with out, one with in. Predict the static constructor run order for two classes.
4. **Explain aloud — 5 min.** *Explain ref, out and in in one sentence each.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-12"></a>

## Day 12 · Friday · Fri 06 Nov 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Contains Duplicate, Frequency map of an int[] with Dictionary (TryGetValue), Two Sum.
   - Then one problem you have not seen, with no pattern hint: [Find All Numbers Disappeared in an Array (448)](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What is boxing, what does it cost, and name three places it happens by accident.* · *State the Equals/GetHashCode contract and what breaks without it.* · *Why is Dictionary lookup O(1) on average, and what makes it O(n)?* · *Explain ref, out and in in one sentence each.* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Unit-testing basics: turn five boundary cases from this week into xUnit [Theory] rows.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Range Sum Query 2D - Immutable (304)](https://leetcode.com/problems/range-sum-query-2d-immutable/) · Medium

---

<a id="day-13"></a>

## Day 13 · Saturday · Sat 07 Nov 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Remove Duplicates from Sorted Array, Running Sum, Plus One, Merge Sorted Array (fill from the back).
   - Solve: [Remove Duplicates from Sorted Array (26)](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) · Easy; [Running Sum of 1d Array (1480)](https://leetcode.com/problems/running-sum-of-1d-array/) · Easy; [Plus One (66)](https://leetcode.com/problems/plus-one/) · Easy; [Merge Sorted Array (88)](https://leetcode.com/problems/merge-sorted-array/) · Easy; [Range Sum Query - Immutable (303)](https://leetcode.com/problems/range-sum-query-immutable/) · Easy
3. **Design — 90 min.** API contract on paper: POST /jobs and GET /jobs/{id} — inputs, validation, status codes, stored fields. No code.
   - Use: [HTTP essentials for API design](../NOTES/05_NETWORKING_OS.md#add-netw-http); [BASIC-030 — What are REST, HTTP methods, status codes and idempotency?](../NOTES/00_START_FROM_ZERO.md#basic-030)
4. **Lab / project — 90 min.** Build a toy hash map with separate chaining (buckets = array of lists), Put/Get/Remove and a resize at load factor 0.75. Test collisions with a bad hash.
   - Use: [M1 Q19. Why is dictionary lookup O(1), and what makes it degrade to O(n)?](../NOTES/02_CSHARP.md#m1-q19); [C# interview toolkit (.NET 10)](../NOTES/01_DSA.md#add-dsa-csharp-toolkit)
5. **English — 20 min.** Record 2 minutes: 'How does a Dictionary find a key?'

---

<a id="day-14"></a>

## Day 14 · Sunday · Sun 08 Nov 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *What is boxing, what does it cost, and name three places it happens by accident.* · *State the Equals/GetHashCode contract and what breaks without it.* · *Why is Dictionary lookup O(1) on average, and what makes it O(n)?* · *Explain ref, out and in in one sentence each.*
   - Solve cold (25 minutes each): [Two Sum (1)](https://leetcode.com/problems/two-sum/) · Easy; [Move Zeroes (283)](https://leetcode.com/problems/move-zeroes/) · Easy
   - Write from memory: one C# snippet from this week’s lab.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Re-solve Two Sum cold. Then explain Range Sum Query (303) from Saturday: derive prefix[r+1] − prefix[l] on paper, including a range that starts at 0.
   - Use: [Prefix sums, prefix + hash map, difference array](../NOTES/01_DSA.md#add-dsa-prefix-hash)
4. **Behavioral — 45 min.** Outline the email-processing improvement with the story worksheet: your responsibility, the baseline, the change, how it was measured, what you do not know yet.
   - Use: [The story worksheet](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-worksheet); [Story preparation for every resume line](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-resume-stories)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 1](WEEK_01.md) · [The plan](../PLAN.md) · [Week 3 →](WEEK_03.md)
