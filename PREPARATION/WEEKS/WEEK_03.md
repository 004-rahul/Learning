# Week 3 — Strings and two pointers · OOP

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 2](WEEK_02.md) [Week 4 →](WEEK_04.md)

**Phase 1 — Foundations** · Days 15–21 · default dates Mon 09 Nov 2026 – Sun 15 Nov 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Strings, frequency counting, opposite-end pointers, fixed windows  
**Core this week:** Strings, classes, inheritance, interfaces, composition, generics

**Goal:** Solve string and two-pointer problems by stating the pointer invariant, and explain virtual dispatch and interface vs abstract class.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Valid Palindrome and Two Sum II solved without a hint, with the invariant said aloud.
- [ ] A fixed-size window solution written from memory.
- [ ] A small model (job + handler interface with two implementations) that can swap a handler without changing callers.
- [ ] You can explain composition over inheritance with one example from your own code.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [15 Mon](#day-15) | String traversal and frequency | Valid Anagram, Ransom Note | Strings: immutability, interning, StringBuilder, why concatenation in a loop is O(n²) |
| [16 Tue](#day-16) | Opposite-end pointers | Valid Palindrome, Valid Palindrome II | Classes, constructors and chaining, fields vs properties, the six access modifiers |
| [17 Wed](#day-17) | Pointers on sorted input | Two Sum II - Input Array Is Sorted, Squares of a Sorted Array | virtual / override / new; interface vs abstract class |
| [18 Thu](#day-18) | Fixed-size windows | Maximum Average Subarray I, Longest Common Prefix | Composition over inheritance; generics, constraints and variance; generics vs Java erasure |
| [19 Fri](#day-19) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [20 Sat](#day-20) | Deep work (5 h) | First Unique Character in a String, Isomorphic Strings, Word Pattern, 3Sum | design + lab/project |
| [21 Sun](#day-21) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-15"></a>

## Day 15 · Monday · Mon 09 Nov 2026
**String traversal and frequency** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain ref, out and in in one sentence each.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Strings are immutable; use a char[] or an int[26] count. Valid Anagram with counts (compare with sorting). Ransom Note.
   - Read first (short): [Sliding window: templates](../NOTES/01_DSA.md#add-dsa-sliding-window)
   - Solve: [Valid Anagram (242)](https://leetcode.com/problems/valid-anagram/) · Easy; [Ransom Note (383)](https://leetcode.com/problems/ransom-note/) · Easy
   - Done when: Case and alphabet assumptions are written down; both solutions are O(n). Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Strings: immutability, interning, StringBuilder, why concatenation in a loop is O(n²).**
   - Read: [M1 Q8. Why are strings immutable, and what does that buy you?](../NOTES/02_CSHARP.md#m1-q8); [M1 Q9. Why is string concatenation in a loop O(n squared), and what do you use instead?](../NOTES/02_CSHARP.md#m1-q9)
   - Do: Benchmark building a 100,000-part string with += vs StringBuilder (Stopwatch is enough).
4. **Explain aloud — 5 min.** *Why is string concatenation in a loop O(n²)?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-16"></a>

## Day 16 · Tuesday · Tue 10 Nov 2026
**Opposite-end pointers** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is string concatenation in a loop O(n²)?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Valid Palindrome: skip non-alphanumeric characters, compare lower-case. Then Valid Palindrome II (one deletion).
   - Read first (short): [Two pointers: templates](../NOTES/01_DSA.md#add-dsa-two-pointers); [7. Two Pointers ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-7-two-pointers)
   - Solve: [Valid Palindrome (125)](https://leetcode.com/problems/valid-palindrome/) · Easy; [Valid Palindrome II (680)](https://leetcode.com/problems/valid-palindrome-ii/) · Easy
   - Done when: Empty and punctuation-only strings return true; you can say why pointers never miss a pair. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Classes, constructors and chaining, fields vs properties, the six access modifiers.**
   - Read: [BASIC-021 — What are fields, properties, methods, constructors and object initializers?](../NOTES/00_START_FROM_ZERO.md#basic-021); [BASIC-022 — What do all six C# access modifiers mean?](../NOTES/00_START_FROM_ZERO.md#basic-022)
   - Do: Write a Job class whose constructor rejects invalid state; chain two constructors with this(...).
4. **Explain aloud — 5 min.** *What is the job of a constructor?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-17"></a>

## Day 17 · Wednesday · Wed 11 Nov 2026
**Pointers on sorted input** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is the job of a constructor?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Two Sum II: if the sum is too small move left, too big move right — explain why the discarded pairs cannot be the answer. Then Squares of a Sorted Array.
   - Read first (short): [1. Two pointers](../NOTES/01_DSA.md#dsa-1-two-pointers)
   - Solve: [Two Sum II - Input Array Is Sorted (167)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) · Medium; [Squares of a Sorted Array (977)](https://leetcode.com/problems/squares-of-a-sorted-array/) · Easy
   - Done when: You can state the invariant: everything outside the pointers is already decided. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: virtual / override / new; interface vs abstract class.**
   - Read: [M1 Q13. Explain virtual, override and new, and how the runtime picks a method.](../NOTES/02_CSHARP.md#m1-q13); [M1 Q14. Interface or abstract class - how do you actually decide?](../NOTES/02_CSHARP.md#m1-q14)
   - Do: Call a method through a base reference with override and with new — predict, run, explain.
4. **Explain aloud — 5 min.** *Interface or abstract class — how do you decide?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-18"></a>

## Day 18 · Thursday · Thu 12 Nov 2026
**Fixed-size windows** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Interface or abstract class — how do you decide?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Maximum Average Subarray I: keep a running sum, add the new element, remove the old one. Watch overflow. Then Longest Common Prefix.
   - Read first (short): [10. Sliding Window ⭐⭐⭐](../NOTES/00_START_FROM_ZERO.md#arr-10-sliding-window)
   - Solve: [Maximum Average Subarray I (643)](https://leetcode.com/problems/maximum-average-subarray-i/) · Easy; [Longest Common Prefix (14)](https://leetcode.com/problems/longest-common-prefix/) · Easy
   - Done when: Window sum updated in O(1) per step; k = n and k = 1 tested. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Composition over inheritance; generics, constraints and variance; generics vs Java erasure.**
   - Read: [M1 Q16. Why composition over inheritance?](../NOTES/02_CSHARP.md#m1-q16); [M1 Q17. What are covariance and contravariance, and why do out and in exist on generics?](../NOTES/02_CSHARP.md#m1-q17); [M1 Q18. Why are .NET generics not Java erasure?](../NOTES/02_CSHARP.md#m1-q18); [Generics: constraints, generic methods, variance, static abstract members](../NOTES/02_CSHARP.md#add-cs-generics)
   - Do: Write a generic Repository<T> with a `where T : class` constraint; show IEnumerable<string> → IEnumerable<object> works (covariance).
4. **Explain aloud — 5 min.** *Why composition over inheritance?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-19"></a>

## Day 19 · Friday · Fri 13 Nov 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Valid Anagram, Ransom Note, Valid Palindrome.
   - Then one problem you have not seen, with no pattern hint: [Reverse String (344)](https://leetcode.com/problems/reverse-string/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why is string concatenation in a loop O(n²)?* · *What is the job of a constructor?* · *Interface or abstract class — how do you decide?* · *Why composition over inheritance?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve the week's hinted problems; then explain virtual dispatch from memory.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Encode and Decode Strings (271)](https://leetcode.com/problems/encode-and-decode-strings/) · Medium *(premium — free on neetcode.io/LintCode)*

---

<a id="day-20"></a>

## Day 20 · Saturday · Sat 14 Nov 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** First Unique Character, Isomorphic Strings, Word Pattern, and 3Sum (sort, then two pointers, skip duplicates).
   - Solve: [First Unique Character in a String (387)](https://leetcode.com/problems/first-unique-character-in-a-string/) · Easy; [Isomorphic Strings (205)](https://leetcode.com/problems/isomorphic-strings/) · Easy; [Word Pattern (290)](https://leetcode.com/problems/word-pattern/) · Easy; [3Sum (15)](https://leetcode.com/problems/3sum/) · Medium
3. **Design — 90 min.** URL shortener — requirements only: 3 functional requirements, 3 constraints, the redirect API. Single server. Read the card, close it, write your own.
   - Use: [HLD card: URL shortener (TinyURL)](../DESIGNS.md#hld-url-shortener); [BASIC-042 — What are HLD, LLD, requirements and nonfunctional requirements?](../NOTES/00_START_FROM_ZERO.md#basic-042); [The answer template (use it every time)](../NOTES/08_SYSTEM_DESIGN.md#add-sd-template)
4. **Lab / project — 90 min.** OOP model: a Job class and an IJobHandler interface with two implementations (EmailHandler, ReportHandler). A dispatcher picks the handler. Add a third handler without editing the dispatcher. Unit-test it.
   - Use: [OOP essentials with C# examples](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-oop); [SOLID in code, and the 8 design principles](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-solid)
5. **English — 20 min.** Record 2 minutes: 'interface vs abstract class'.

---

<a id="day-21"></a>

## Day 21 · Sunday · Sun 15 Nov 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why is string concatenation in a loop O(n²)?* · *What is the job of a constructor?* · *Interface or abstract class — how do you decide?* · *Why composition over inheritance?*
   - Solve cold (25 minutes each): [Valid Palindrome (125)](https://leetcode.com/problems/valid-palindrome/) · Easy; [Maximum Average Subarray I (643)](https://leetcode.com/problems/maximum-average-subarray-i/) · Easy
   - Sketch in 10–15 minutes: URL shortener — requirements only: 3 functional requirements, 3 constraints, the redirect API.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Implement IComparable<T> and IEquatable<T> on a Money record; sort a list of jobs by priority with a custom IComparer.
   - Use: [Equality, comparison and hash codes in practice](../NOTES/02_CSHARP.md#add-cs-equality); [Modern C# (C# 9 to C# 14) you must recognise](../NOTES/02_CSHARP.md#add-cs-modern)
4. **Behavioral — 45 min.** Two-minute explanation of one real work feature: what it does, what YOU decided, what the team did.
   - Use: [A template for explaining any technical concept](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-explain); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 2](WEEK_02.md) · [The plan](../PLAN.md) · [Week 4 →](WEEK_04.md)
