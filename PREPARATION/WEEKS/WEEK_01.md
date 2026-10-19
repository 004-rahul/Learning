# Week 1 — Arrays from zero · C# basics, value vs reference

[Start here](../README.md) · [The plan](../PLAN.md) ·  [Week 2 →](WEEK_02.md)

**Phase 1 — Foundations** · Days 1–7 · default dates Mon 26 Oct 2026 – Sun 01 Nov 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Array representation, traversal, costs  
**Core this week:** C# program basics, types, value vs reference, stack vs heap

**Goal:** Write and test basic array functions in C#, and explain index cost, alias vs copy, and value vs reference types.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Sum, max, count, reverse, linear search, sorted check and second-largest written from memory with tests for empty, one element, negatives and duplicates.
- [ ] You can explain aloud in 2 minutes: why a[i] is O(1) but search is O(n); why changing b[0] after b = a also changes a.
- [ ] A Git repository with a C# solution and an xUnit test project exists and builds.
- [ ] Work journal started: at least 5 one-line entries, and a list of 5 real work situations.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [1 Mon](#day-1) | Array representation and traversal | Array basics: print, sum, max, min, count of a target (handle empty input) | C# program basics: a console project, variables and built-in types, arrays and Length |
| [2 Tue](#day-2) | Indexes, linear search and operation costs | Linear search, first/last occurrence, minimum/maximum with index | int vs long, integer division, overflow, checked arithmetic and conversions |
| [3 Wed](#day-3) | Swapping and reversing in place | Reverse an array in place with two indexes (0, 1, odd, even lengths) | Methods, parameters, return values; value types vs reference types |
| [4 Thu](#day-4) | Sorted check and second-largest distinct | Check sorted order; second-largest DISTINCT value | Stack vs heap, where structs actually live, null vs empty, alias vs copy |
| [5 Fri](#day-5) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [6 Sat](#day-6) | Deep work (5 h) | Insert / delete at an index by shifting, with spare capacity, Contains Duplicate | design + lab/project |
| [7 Sun](#day-7) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-1"></a>

## Day 1 · Monday · Mon 26 Oct 2026
**Array representation and traversal** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What you planned to learn this week, in one sentence.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Do these seven steps exactly: (1) create int[] a = {4, -2, 7, 7, 0}; (2) print every element with a for loop; (3) write Sum, Max and Count(target) methods; (4) decide what Max does for an empty array (throw, or a TryMax that returns bool) and write that down before you run it; (5) say why a[i] is O(1) but finding a value is O(n); (6) write int[] b = a; change b[0]; print a. Then c = (int[])a.Clone(); change c[0]; print a — explain the difference; (7) write one line: 'I can do __ alone; I still need help with __'.
   - Read first (short): [BASIC-001 — What do I need before starting an array problem?](../NOTES/00_START_FROM_ZERO.md#basic-001); [BASIC-003 — What are an index, Length, zero-based indexing and an invalid index?](../NOTES/00_START_FROM_ZERO.md#basic-003); [BASIC-004 — How do for, foreach, while and do/while traverse an array?](../NOTES/00_START_FROM_ZERO.md#basic-004); [1. Array fundamentals ⭐](../NOTES/00_START_FROM_ZERO.md#arr-1-array-fundamentals); [How to use this chapter](../NOTES/01_DSA.md#add-dsa-start)
   - Solve: [Array basics: print, sum, max, min, count of a target (handle empty input)](../PROBLEMS.md#x-array-basics) · own exercise
   - Done when: All three methods work for empty, one element, negatives and duplicates, and you predicted each result before running it. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: C# program basics: a console project, variables and built-in types, arrays and Length.**
   - Read: [BASIC-020 — What language basics must I cover beyond arrays?](../NOTES/00_START_FROM_ZERO.md#basic-020); [C# language basics that interviews assume](../NOTES/02_CSHARP.md#add-cs-basics); [BASIC-002 — What is an array, and how do I create one in C#?](../NOTES/00_START_FROM_ZERO.md#basic-002)
   - Do: Run `dotnet new sln`, `dotnet new console -n Dsa`, `dotnet new xunit -n Dsa.Tests`, add the reference and run `dotnet test`. One test per method.
4. **Explain aloud — 5 min.** *Why is reading a[i] O(1) but finding a value O(n)?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-2"></a>

## Day 2 · Tuesday · Tue 27 Oct 2026
**Indexes, linear search and operation costs** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is reading a[i] O(1) but finding a value O(n)?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Linear search returning the index or -1 (a contract). First and last occurrence. Minimum and maximum with their index. Trace the loop bounds by hand for length 0, 1 and 5.
   - Read first (short): [BASIC-005 — What is the difference between accessing by index and searching by value?](../NOTES/00_START_FROM_ZERO.md#basic-005); [2. Array operations + complexity ⭐](../NOTES/00_START_FROM_ZERO.md#arr-2-array-operations-complexity); [Deriving complexity from code](../NOTES/01_DSA.md#add-dsa-complexity)
   - Solve: [Linear search, first/last occurrence, minimum/maximum with index](../PROBLEMS.md#x-linear-search) · own exercise
   - Done when: Missing target, one element and empty input all behave as your contract says. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: int vs long, integer division, overflow, checked arithmetic and conversions.**
   - Read: [BASIC-017 — What integer arithmetic and C# syntax mistakes should I prevent?](../NOTES/00_START_FROM_ZERO.md#basic-017); [C# language basics that interviews assume](../NOTES/02_CSHARP.md#add-cs-basics)
   - Do: Show int.MaxValue + 1 with and without `checked`; show 7 / 2 and 7 / 2.0; sum a large array into int and into long.
4. **Explain aloud — 5 min.** *What is overflow and when should a sum use long?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-3"></a>

## Day 3 · Wednesday · Wed 28 Oct 2026
**Swapping and reversing in place** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is overflow and when should a sum use long?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Reverse an array with two indexes left and right; stop when left >= right. Draw the array after every swap. Test lengths 0, 1, odd and even.
   - Read first (short): [BASIC-013 — What is in-place modification and how do I reverse an array?](../NOTES/00_START_FROM_ZERO.md#basic-013); [4. In-place modification ⭐](../NOTES/00_START_FROM_ZERO.md#arr-4-in-place-modification)
   - Solve: [Reverse an array in place with two indexes (0, 1, odd, even lengths)](../PROBLEMS.md#x-reverse) · own exercise
   - Done when: Your reverse works for all four lengths and you can say why it stops at the middle. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Methods, parameters, return values; value types vs reference types.**
   - Read: [M1 Q1. What is the difference between a value type and a reference type?](../NOTES/02_CSHARP.md#m1-q1); [M1 Q3. What does a variable actually hold?](../NOTES/02_CSHARP.md#m1-q3); [M1 Q4. Why might passing a struct to a method not change the original?](../NOTES/02_CSHARP.md#m1-q4); [BASIC-009 — What happens when an array is passed to a method?](../NOTES/00_START_FROM_ZERO.md#basic-009)
   - Do: Write Reverse(int[] a) yourself. Then write a method that takes an int and changes it, and one that takes an int[] and changes a[0] — predict, run, explain.
4. **Explain aloud — 5 min.** *What does a variable of a value type hold, and what does a reference-type variable hold?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-4"></a>

## Day 4 · Thursday · Thu 29 Oct 2026
**Sorted check and second-largest distinct** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does a variable of a value type hold, and what does a reference-type variable hold?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Check non-decreasing order in one pass. Find the second-largest DISTINCT value. Decide what to return when fewer than two distinct values exist (all-equal array).
   - Read first (short): [BASIC-011 — How do I find maximum, minimum, sum, count and second largest?](../NOTES/00_START_FROM_ZERO.md#basic-011); [BASIC-012 — How do I check sortedness, first occurrence and last occurrence?](../NOTES/00_START_FROM_ZERO.md#basic-012); [3. Basic traversal pattern ⭐](../NOTES/00_START_FROM_ZERO.md#arr-3-basic-traversal-pattern)
   - Solve: [Check sorted order; second-largest DISTINCT value](../PROBLEMS.md#x-sorted-second) · own exercise
   - Done when: All-equal, negative, one-element and empty inputs are handled by a stated rule. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Stack vs heap, where structs actually live, null vs empty, alias vs copy.**
   - Read: [M1 Q2. Where does a struct actually live - the stack or the heap?](../NOTES/02_CSHARP.md#m1-q2); [BASIC-007 — What is null compared with an empty array and a default element?](../NOTES/00_START_FROM_ZERO.md#basic-007); [BASIC-008 — What are aliasing, copying and cloning?](../NOTES/00_START_FROM_ZERO.md#basic-008)
   - Do: Put a struct inside a class and inside an array; explain where its bytes live. Show null vs Array.Empty<int>() vs new int[3].
4. **Explain aloud — 5 min.** *Where does a struct live — the stack or the heap? (It depends on where it is declared.)* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-5"></a>

## Day 5 · Friday · Fri 30 Oct 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Array basics: print, sum, max, min, count of a target (handle empty input), Linear search, first/last occurrence, minimum/maximum with index, Reverse an array in place with two indexes (0, 1, odd, even lengths).
   - Then one problem you have not seen, with no pattern hint: [Concatenation of Array (1929)](https://leetcode.com/problems/concatenation-of-array/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why is reading a[i] O(1) but finding a value O(n)?* · *What is overflow and when should a sum use long?* · *What does a variable of a value type hold, and what does a reference-type variable hold?* · *Where does a struct live — the stack or the heap? (It depends on where it is declared.)* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* First Friday: also re-implement Monday–Thursday functions from a blank file without notes.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Detect Squares (2013)](https://leetcode.com/problems/detect-squares/) · Medium

---

<a id="day-6"></a>

## Day 6 · Saturday · Sat 31 Oct 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Insert and delete by shifting with spare capacity; array Length vs List Count/Capacity. Then Contains Duplicate twice: nested loops first, then a HashSet.
   - Solve: [Insert / delete at an index by shifting, with spare capacity](../PROBLEMS.md#x-insert-delete) · own exercise; [Contains Duplicate (217)](https://leetcode.com/problems/contains-duplicate/) · Easy
3. **Design — 90 min.** How a web request works, on paper: client → DNS → server → API → database → response. Draw it. No scaling yet.
   - Use: [BASIC-029 — What happens between HTTP request and ASP.NET Core response?](../NOTES/00_START_FROM_ZERO.md#basic-029); [BASIC-035 — What networking vocabulary must come before a distributed design?](../NOTES/00_START_FROM_ZERO.md#basic-035); [How to learn system design from zero](../NOTES/08_SYSTEM_DESIGN.md#add-sd-start)
4. **Lab / project — 90 min.** Set up Git for this personal repo with your personal email (`git config user.email` inside the repo). Commit the array solution and tests. Add a .gitignore for .NET.
   - Use: [BASIC-038 — What are Git, build, tests, CI and CD?](../NOTES/00_START_FROM_ZERO.md#basic-038); [Git essentials](../NOTES/10_ENGINEERING_PRACTICE.md#add-git)
5. **English — 20 min.** Record a 2-minute explanation of alias vs copy for arrays. Listen once for clarity.

---

<a id="day-7"></a>

## Day 7 · Sunday · Sun 01 Nov 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why is reading a[i] O(1) but finding a value O(n)?* · *What is overflow and when should a sum use long?* · *What does a variable of a value type hold, and what does a reference-type variable hold?* · *Where does a struct live — the stack or the heap? (It depends on where it is declared.)*
   - Solve cold (25 minutes each): [Linear search, first/last occurrence, minimum/maximum with index](../PROBLEMS.md#x-linear-search) · own exercise; [Check sorted order; second-largest DISTINCT value](../PROBLEMS.md#x-sorted-second) · own exercise
   - Write from memory: one C# snippet from this week’s lab.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Predict-then-run lab: write 6 small C# examples about assignment and parameters (int, struct, class, array, string, ref). Predict output, run, explain every mismatch in one line.
   - Use: [5. C# and .NET from basic to advanced](../NOTES/02_CSHARP.md#f05-s5)
4. **Behavioral — 45 min.** Start the work journal (one line per working day: problem, decision, outcome). List 5 real work situations: a performance win, an incident, a disagreement, ownership, a failure. Leave unknown numbers blank.
   - Use: [BASIC-047 — How do I prepare behavioral answers when nothing is completed yet?](../NOTES/00_START_FROM_ZERO.md#basic-047); [How behavioral preparation works in this plan](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-system)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.
6. **Admin — 15 min.** Open TRACKER.xlsx, set your start date on the START sheet, and read next week's file (10 minutes).

---

[The plan](../PLAN.md) · [Week 2 →](WEEK_02.md)
