# Week 6 — Linked lists, stacks and queues · concurrency

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 5](WEEK_05.md) [Week 7 →](WEEK_07.md)

**Phase 1 — Foundations** · Days 36–42 · default dates Mon 30 Nov 2026 – Sun 06 Dec 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Pointer mutation, dummy nodes, fast/slow, stacks, queues  
**Core this week:** Threads, thread pool, races, locks, deadlock, SemaphoreSlim, Channel<T>

**Goal:** Reverse and merge linked lists cold, use stacks and queues correctly, and explain race vs deadlock and bounded concurrency.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Reverse Linked List and Merge Two Sorted Lists written cold.
- [ ] Valid Parentheses and Min Stack correct on empty operations.
- [ ] A racy counter reproduced and fixed three ways; a deadlock reproduced and fixed with lock ordering.
- [ ] A bounded Channel<T> producer/consumer with cancellation and graceful shutdown works.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [36 Mon](#day-36) | Linked-list reference mutation | Reverse Linked List, Middle of the Linked List | OS vocabulary; process vs thread vs Task; the thread pool and starvation |
| [37 Tue](#day-37) | Dummy node and merging | Merge Two Sorted Lists, Remove Nth Node From End of List | Race conditions, lock, Interlocked, volatile |
| [38 Wed](#day-38) | Cycles and palindromes | Linked List Cycle, Palindrome Linked List | Deadlock, why not await inside lock, SemaphoreSlim vs Mutex vs ReaderWriterLockSlim |
| [39 Thu](#day-39) | Stack and queue contracts | Valid Parentheses, Implement Queue using Stacks | Channel<T>, Parallel.For/PLINQ; your email pipeline as a concurrency story |
| [40 Fri](#day-40) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [41 Sat](#day-41) | Deep work (5 h) | Min Stack, Evaluate Reverse Polish Notation, Reorder List, Add Two Numbers | design + lab/project |
| [42 Sun](#day-42) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-36"></a>

## Day 36 · Monday · Mon 30 Nov 2026
**Linked-list reference mutation** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why does calling .Result deadlock in an app with a synchronization context?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Node model; draw prev/current/next before every change. Reverse Linked List iteratively. Middle of the Linked List with fast/slow pointers.
   - Read first (short): [Linked lists](../NOTES/01_DSA.md#add-dsa-linked-list); [3. Fast and slow pointers](../NOTES/01_DSA.md#dsa-3-fast-and-slow-pointers)
   - Solve: [Reverse Linked List (206)](https://leetcode.com/problems/reverse-linked-list/) · Easy; [Middle of the Linked List (876)](https://leetcode.com/problems/middle-of-the-linked-list/) · Easy
   - Done when: Null and one-node lists work; you drew the pointers. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: OS vocabulary; process vs thread vs Task; the thread pool and starvation.**
   - Read: [BASIC-036 — What operating-system vocabulary must come before concurrency?](../NOTES/00_START_FROM_ZERO.md#basic-036); [M2 Q1. What is the difference between a process, a thread and a Task?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q1); [M2 Q2. What does the thread pool actually do, and what is starvation?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q2); [M2 Q3. Why is creating a thousand threads worse than a thousand tasks?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q3); [M1 Q38. What is thread pool starvation and how would you spot it?](../NOTES/02_CSHARP.md#m1-q38); [M1 Q39. Concurrency or parallelism - what is the difference?](../NOTES/02_CSHARP.md#m1-q39)
   - Do: Start 1,000 threads vs 1,000 tasks that each wait 1 second; compare time and memory.
4. **Explain aloud — 5 min.** *What is thread-pool starvation and how would you spot it?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-37"></a>

## Day 37 · Tuesday · Tue 01 Dec 2026
**Dummy node and merging** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is thread-pool starvation and how would you spot it?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Merge Two Sorted Lists with a dummy head; attach the remaining tail. Then Remove Nth Node From End (gap of n between two pointers).
   - Read first (short): [Linked lists](../NOTES/01_DSA.md#add-dsa-linked-list)
   - Solve: [Merge Two Sorted Lists (21)](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy; [Remove Nth Node From End of List (19)](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) · Medium
   - Done when: Empty lists and n = length (remove head) work. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Race conditions, lock, Interlocked, volatile.**
   - Read: [M2 Q4. What is a race condition, at the CPU and memory-model level?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q4); [M2 Q5. lock, Interlocked, or a concurrent collection?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q5); [M2 Q6. Why does volatile rarely mean what people think?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q6)
   - Do: Increment a shared counter from 10 tasks × 10,000 times; get the wrong total; fix with lock, Interlocked and a per-task sum.
4. **Explain aloud — 5 min.** *What is a race condition at the memory level?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-38"></a>

## Day 38 · Wednesday · Wed 02 Dec 2026
**Cycles and palindromes** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is a race condition at the memory level?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Linked List Cycle (fast/slow), then Palindrome Linked List (find middle, reverse second half, compare).
   - Read first (short): [3. Fast and slow pointers](../NOTES/01_DSA.md#dsa-3-fast-and-slow-pointers)
   - Solve: [Linked List Cycle (141)](https://leetcode.com/problems/linked-list-cycle/) · Easy; [Palindrome Linked List (234)](https://leetcode.com/problems/palindrome-linked-list/) · Easy
   - Done when: You can explain why fast and slow must meet inside a cycle. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Deadlock, why not await inside lock, SemaphoreSlim vs Mutex vs ReaderWriterLockSlim.**
   - Read: [M2 Q7. What causes a deadlock and how do you prevent one?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q7); [M2 Q8. Why can you not await inside a lock?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q8); [M2 Q9. SemaphoreSlim, Mutex or ReaderWriterLockSlim?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q9)
   - Do: Create a deadlock with two locks taken in opposite order; fix it with a global lock order. Replace a lock around an await with SemaphoreSlim.WaitAsync.
4. **Explain aloud — 5 min.** *What causes a deadlock and how do you prevent one?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-39"></a>

## Day 39 · Thursday · Thu 03 Dec 2026
**Stack and queue contracts** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What causes a deadlock and how do you prevent one?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Valid Parentheses with a stack. Implement Queue using Stacks (amortised O(1)).
   - Read first (short): [Stacks and queues](../NOTES/01_DSA.md#add-dsa-stack-queue)
   - Solve: [Valid Parentheses (20)](https://leetcode.com/problems/valid-parentheses/) · Easy; [Implement Queue using Stacks (232)](https://leetcode.com/problems/implement-queue-using-stacks/) · Easy
   - Done when: Empty input and unmatched closers handled; you can explain the amortised cost. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Channel<T>, Parallel.For/PLINQ; your email pipeline as a concurrency story.**
   - Read: [M2 Q10. When would you use Channel<T> rather than BlockingCollection?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q10); [M2 Q11. When do Parallel.For and PLINQ hurt rather than help?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q11); [M1 Q40. How is your email pipeline work an async and concurrency story?](../NOTES/02_CSHARP.md#m1-q40)
   - Do: Draw your real email pipeline and mark every concurrency decision (consumers, visibility timeout, retries). Do not add anything that did not exist.
4. **Explain aloud — 5 min.** *When does Parallel.For hurt rather than help?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-40"></a>

## Day 40 · Friday · Fri 04 Dec 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Reverse Linked List, Middle of the Linked List, Merge Two Sorted Lists.
   - Then one problem you have not seen, with no pattern hint: [Intersection of Two Linked Lists (160)](https://leetcode.com/problems/intersection-of-two-linked-lists/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What is thread-pool starvation and how would you spot it?* · *What is a race condition at the memory level?* · *What causes a deadlock and how do you prevent one?* · *When does Parallel.For hurt rather than help?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve the linked-list problems you needed hints for; draw pointers on paper first.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Reverse Linked List II (92)](https://leetcode.com/problems/reverse-linked-list-ii/) · Medium; [Implement Stack using Queues (225)](https://leetcode.com/problems/implement-stack-using-queues/) · Easy; [Design Circular Queue (622)](https://leetcode.com/problems/design-circular-queue/) · Medium

---

<a id="day-41"></a>

## Day 41 · Saturday · Sat 05 Dec 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Min Stack, Evaluate Reverse Polish Notation, Reorder List, Add Two Numbers.
   - Solve: [Min Stack (155)](https://leetcode.com/problems/min-stack/) · Medium; [Evaluate Reverse Polish Notation (150)](https://leetcode.com/problems/evaluate-reverse-polish-notation/) · Medium; [Reorder List (143)](https://leetcode.com/problems/reorder-list/) · Medium; [Add Two Numbers (2)](https://leetcode.com/problems/add-two-numbers/) · Medium
3. **Design — 90 min.** LLD: logging framework — levels, sinks (console, file, in-memory), formatting, async buffering. Requirements → classes → one sequence diagram.
   - Use: [LLD card: Logging framework](../DESIGNS.md#lld-logger); [M4 Q25. Design a logger - and where does your design differ from a real library?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q25); [GAP-09-011 — Design logger](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-011); [The LLD interview method, step by step](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-method)
4. **Lab / project — 90 min.** Build a bounded Channel<T> producer/consumer: 2 producers, 3 consumers, capacity 100, cancellation, graceful drain on shutdown. Log what happens when the channel is full.
   - Use: [M2 Q10. When would you use Channel<T> rather than BlockingCollection?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q10); [Practical async patterns](../NOTES/02_CSHARP.md#add-cs-async-patterns)
5. **English — 20 min.** Record 2 minutes: 'race condition vs deadlock'.

---

<a id="day-42"></a>

## Day 42 · Sunday · Sun 06 Dec 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *What is thread-pool starvation and how would you spot it?* · *What is a race condition at the memory level?* · *What causes a deadlock and how do you prevent one?* · *When does Parallel.For hurt rather than help?*
   - Solve cold (25 minutes each): [Merge Two Sorted Lists (21)](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy; [Valid Parentheses (20)](https://leetcode.com/problems/valid-parentheses/) · Easy
   - Sketch in 10–15 minutes: LLD: logging framework — levels, sinks (console, file, in-memory), formatting, async buffering.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Implement the logger from Saturday's design: console + in-memory sinks, levels, and tests. Add a new sink without changing callers.
   - Use: [LLD card: Logging framework](../DESIGNS.md#lld-logger); [Making an LLD testable](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-testing)
4. **Behavioral — 45 min.** One real ownership story: how you noticed the problem and why you acted (worksheet).
   - Use: [GAP-08-009 — Tell me about a time you took ownership of something outside your responsi…](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-009); [Amazon's 16 Leadership Principles and the story matrix](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-lp-matrix)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 5](WEEK_05.md) · [The plan](../PLAN.md) · [Week 7 →](WEEK_07.md)
