# Week 7 — Recursion and backtracking · .NET runtime and ASP.NET Core

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 6](WEEK_06.md) [Week 8 →](WEEK_08.md)

**Phase 1 — Foundations** · Days 43–49 · default dates Mon 07 Dec 2026 – Sun 13 Dec 2026 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Recursion, call stack, subsets, permutations, combinations, pruning  
**Core this week:** .NET Framework vs modern .NET, CLR/JIT, GC, Kestrel, middleware, DI, configuration

**Goal:** Generate subsets and permutations independently with correct cleanup, and explain the ASP.NET Core request pipeline, DI lifetimes and the .NET runtime.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Subsets and Permutations written without help, with the choose/explore/unchoose step visible.
- [ ] A 60-second answer to '.NET Framework vs .NET Core vs modern .NET'.
- [ ] A minimal API job skeleton (POST/GET, in-memory store) with tests.
- [ ] A captive dependency reproduced and fixed.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [43 Mon](#day-43) | Recursion mechanics | Recursive sum, factorial, power, reverse a string — draw the call stack, Fibonacci three ways: naive recursion, memo, iterative — compare cost, Fibonacci Number | .NET Framework vs .NET Core vs modern .NET; CLR, SDK, BCL; JIT, tiered compilation, ReadyToRun, AOT |
| [44 Tue](#day-44) | Choose, explore, unchoose | Subsets, Pow(x, n) | GC gen 0 vs gen 2, the LOH; trace a request from Kestrel to your endpoint and back |
| [45 Wed](#day-45) | Permutations | Permutations, Letter Combinations of a Phone Number | Middleware order (with the CORS correction) and DI lifetimes / captive dependencies |
| [46 Thu](#day-46) | Pruning and repeated candidates | Combination Sum, Generate Parentheses | Configuration precedence, IOptions, validation and ProblemDetails |
| [47 Fri](#day-47) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [48 Sat](#day-48) | Deep work (5 h) | Subsets II, Permutations II, Word Search, Palindrome Partitioning | design + lab/project |
| [49 Sun](#day-49) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-43"></a>

## Day 43 · Monday · Mon 07 Dec 2026
**Recursion mechanics** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *When does Parallel.For hurt rather than help?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Base case and progress. Recursive sum, factorial, power, reverse a string — draw call frames for three levels. Fibonacci three ways (naive, memo, loop).
   - Read first (short): [BASIC-037 — What are recursion, a base case and a call stack?](../NOTES/00_START_FROM_ZERO.md#basic-037); [Recursion](../NOTES/01_DSA.md#add-dsa-recursion); [PART 1 - Why the order matters](../NOTES/01_DSA.md#dsa-part-1-why-the-order-matters)
   - Solve: [Recursive sum, factorial, power, reverse a string — draw the call stack](../PROBLEMS.md#x-recursion-basics) · own exercise; [Fibonacci three ways: naive recursion, memo, iterative — compare cost](../PROBLEMS.md#x-fib-three-ways) · own exercise; [Fibonacci Number (509)](https://leetcode.com/problems/fibonacci-number/) · Easy
   - Done when: You can say when each frame returns and the stack depth. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: .NET Framework vs .NET Core vs modern .NET; CLR, SDK, BCL; JIT, tiered compilation, ReadyToRun, AOT.**
   - Read: [M2 Q12. .NET Framework versus .NET Core versus modern .NET - in sixty seconds.](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q12); [M2 Q13. What are the CLR, the runtime, the SDK and the BCL?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q13); [M2 Q14. What are JIT, tiered compilation, ReadyToRun and AOT?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q14); [BASIC-027 — What are .NET, C#, SDK, runtime, CLR, BCL, IL and JIT?](../NOTES/00_START_FROM_ZERO.md#basic-027); [.NET Framework vs .NET Core vs modern .NET: the one-page answer](../NOTES/02_CSHARP.md#add-cs-framework-vs-modern)
   - Do: Write your own comparison table first, then read. Run `dotnet --info` and explain each line.
4. **Explain aloud — 5 min.** *.NET Framework vs modern .NET in sixty seconds.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-44"></a>

## Day 44 · Tuesday · Tue 08 Dec 2026
**Choose, explore, unchoose** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *.NET Framework vs modern .NET in sixty seconds.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Subsets: at each index choose to include or skip; copy the current list into the answer; remove after the recursive call. Then Pow(x, n) by halving.
   - Read first (short): [Backtracking](../NOTES/01_DSA.md#add-dsa-backtracking); [14. Backtracking](../NOTES/01_DSA.md#dsa-14-backtracking)
   - Solve: [Subsets (78)](https://leetcode.com/problems/subsets/) · Medium; [Pow(x, n) (50)](https://leetcode.com/problems/powx-n/) · Medium
   - Done when: State restored after every call; negative n handled in Pow. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: GC gen 0 vs gen 2, the LOH; trace a request from Kestrel to your endpoint and back.**
   - Read: [M2 Q15. Why is a gen 0 collection cheap and a gen 2 collection expensive?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q15); [M2 Q16. What is the large object heap and why does it matter?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q16); [M2 Q17. Trace a request from Kestrel to your controller and back.](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q17)
   - Do: Draw the request pipeline from Kestrel to the endpoint, with each middleware in and out.
4. **Explain aloud — 5 min.** *Trace a request from Kestrel to your controller and back.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-45"></a>

## Day 45 · Wednesday · Wed 09 Dec 2026
**Permutations** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Trace a request from Kestrel to your controller and back.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Permutations with a used[] array (or swapping). Then Letter Combinations of a Phone Number.
   - Read first (short): [Backtracking](../NOTES/01_DSA.md#add-dsa-backtracking)
   - Solve: [Permutations (46)](https://leetcode.com/problems/permutations/) · Medium; [Letter Combinations of a Phone Number (17)](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) · Medium
   - Done when: Branches restore state; you can state the n·n! cost. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Middleware order (with the CORS correction) and DI lifetimes / captive dependencies.**
   - Read: [M2 Q18. Why does middleware order matter, and what happens if you get it wrong?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q18); [M2 Q19. Explain the DI lifetimes and the captive dependency problem.](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q19); [BASIC-031 — What are dependency injection lifetimes and configuration?](../NOTES/00_START_FROM_ZERO.md#basic-031); [The ASP.NET Core middleware order for .NET 10, as code](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-pipeline); [Dependency injection: lifetimes, validation, keyed services and disposal](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-di)
   - Do: Reorder three custom middleware and observe the output. Inject a scoped service into a singleton with scope validation on and read the error.
4. **Explain aloud — 5 min.** *Explain DI lifetimes and the captive dependency problem.* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-46"></a>

## Day 46 · Thursday · Thu 10 Dec 2026
**Pruning and repeated candidates** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain DI lifetimes and the captive dependency problem.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Combination Sum: candidates may repeat, so recurse with the same index; prune when the sum exceeds the target. Then Generate Parentheses.
   - Read first (short): [6. Recursion & Backtracking Patterns](../NOTES/01_DSA.md#f02-dsa-6-recursion-backtracking-patterns)
   - Solve: [Combination Sum (39)](https://leetcode.com/problems/combination-sum/) · Medium; [Generate Parentheses (22)](https://leetcode.com/problems/generate-parentheses/) · Medium
   - Done when: You can explain the reuse rule and the pruning condition. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Configuration precedence, IOptions, validation and ProblemDetails.**
   - Read: [M2 Q20. How does configuration precedence work?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q20); [M2 Q21. Why use IOptions rather than reading IConfiguration directly?](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q21); [Configuration, the options pattern and secrets](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-config); [A complete minimal API: a small job service](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-minimal-api)
   - Do: Bind an options class, validate it with ValidateOnStart, override it with an environment variable.
4. **Explain aloud — 5 min.** *How does configuration precedence work?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-47"></a>

## Day 47 · Friday · Fri 11 Dec 2026
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Recursive sum, factorial, power, reverse a string — draw the call stack, Fibonacci three ways: naive recursion, memo, iterative — compare cost, Fibonacci Number.
   - Then one problem you have not seen, with no pattern hint: [Combination Sum III (216)](https://leetcode.com/problems/combination-sum-iii/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *.NET Framework vs modern .NET in sixty seconds.* · *Trace a request from Kestrel to your controller and back.* · *Explain DI lifetimes and the captive dependency problem.* · *How does configuration precedence work?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve one backtracking problem from a blank file; say the choose/explore/unchoose steps aloud.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Combination Sum II (40)](https://leetcode.com/problems/combination-sum-ii/) · Medium

---

<a id="day-48"></a>

## Day 48 · Saturday · Sat 12 Dec 2026
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Subsets II and Permutations II (sort, skip duplicates at the same depth), Word Search (restore visited), Palindrome Partitioning.
   - Solve: [Subsets II (90)](https://leetcode.com/problems/subsets-ii/) · Medium; [Permutations II (47)](https://leetcode.com/problems/permutations-ii/) · Medium; [Word Search (79)](https://leetcode.com/problems/word-search/) · Medium; [Palindrome Partitioning (131)](https://leetcode.com/problems/palindrome-partitioning/) · Medium
3. **Design — 90 min.** LLD: parking lot — requirements, vehicle and spot types, allocation strategy, ticket and payment, state changes. Sequential first.
   - Use: [LLD card: Parking lot](../DESIGNS.md#lld-parking-lot); [M4 Q23. How do you approach a 45-minute LLD from a blank page?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q23); [M4 Q24. Design a parking lot - what are the real decisions?](../NOTES/07_LLD_OOP_PATTERNS.md#m4-q24); [GAP-09-001 — Design parking lot](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-001)
4. **Lab / project — 90 min.** Minimal API from an empty project (no template code you do not understand): POST /jobs returns 201 + Location, GET /jobs/{id} returns 200/404, validation returns ProblemDetails, in-memory store marked TEMPORARY. Add WebApplicationFactory tests.
   - Use: [A complete minimal API: a small job service](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-minimal-api); [Testing strategy in .NET](../NOTES/10_ENGINEERING_PRACTICE.md#add-test-strategy)
5. **English — 20 min.** Record 2 minutes: 'DI lifetimes'.

---

<a id="day-49"></a>

## Day 49 · Sunday · Sun 13 Dec 2026
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *.NET Framework vs modern .NET in sixty seconds.* · *Trace a request from Kestrel to your controller and back.* · *Explain DI lifetimes and the captive dependency problem.* · *How does configuration precedence work?*
   - Solve cold (25 minutes each): [Subsets (78)](https://leetcode.com/problems/subsets/) · Medium; [Combination Sum (39)](https://leetcode.com/problems/combination-sum/) · Medium
   - Sketch in 10–15 minutes: LLD: parking lot — requirements, vehicle and spot types, allocation strategy, ticket and payment, state changes.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Reproduce a captive dependency in the API (scoped DbContext-like service inside a singleton), see the bug, fix it with IServiceScopeFactory. Then N-Queens if time remains (optional).
   - Use: [M2 Q19. Explain the DI lifetimes and the captive dependency problem.](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#m2-q19); [N-Queens (51)](https://leetcode.com/problems/n-queens/) · Hard
4. **Behavioral — 45 min.** A real disagreement story: the other view stated fairly, the evidence, the decision. If you have no real one yet, write 'find a real one' — do not invent.
   - Use: [GAP-08-003 — Tell me about a time you disagreed with your manager.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-003); [GAP-08-004 — Tell me about a time you disagreed with a senior engineer.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-004); [M5 Q20. What makes a Have Backbone story work?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q20)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 6](WEEK_06.md) · [The plan](../PLAN.md) · [Week 8 →](WEEK_08.md)
