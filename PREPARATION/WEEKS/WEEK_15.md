# Week 15 — Grid and string DP, LIS · API security · PROJECT M5

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 14](WEEK_14.md) [Week 16 →](WEEK_16.md)

**Phase 2 — Core depth and the project starts** · Days 99–105 · default dates Mon 01 Feb 2027 – Sun 07 Feb 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Two-string DP, LIS, stock state machines  
**Core this week:** AuthN vs AuthZ, object-level access, input validation, CORS vs CSRF, SSRF, secrets, threat model

**Goal:** Derive a 2-D DP recurrence and demonstrate cross-tenant denial plus invalid-token and invalid-input behaviour.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] LCS and Edit Distance derived with a drawn table.
- [ ] Ten security tests pass, including 'tenant A cannot read tenant B's job by ID'.
- [ ] A one-page threat model (STRIDE) of the job platform exists.
- [ ] LLD elevator state machine implemented.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [99 Mon](#day-99) | Two-string state | Longest Common Subsequence | Authentication vs authorization; JWT validation and negative tests |
| [100 Tue](#day-100) | Edit operations | Edit Distance, Interleaving String | Object- and function-level authorization; tenant isolation (OWASP API1, API5) |
| [101 Wed](#day-101) | Stock state machines | Best Time to Buy and Sell Stock II, Best Time to Buy and Sell Stock with Cooldown | Input validation, injection, mass assignment, request limits, sensitive data in logs |
| [102 Thu](#day-102) | Subsequence families | Longest Palindromic Subsequence, Number of Longest Increasing Subsequence | CORS vs CSRF, SSRF, secrets management, threat modeling |
| [103 Fri](#day-103) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [104 Sat](#day-104) | Deep work (5 h) | Distinct Subsequences, Word Break, Longest Increasing Subsequence, Decode Ways | design + lab/project |
| [105 Sun](#day-105) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-99"></a>

## Day 99 · Monday · Mon 01 Feb 2027
**Two-string state** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is untestable code usually badly designed code?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Longest Common Subsequence: dp[i][j] for prefixes; match vs skip. Draw the table for 'abcde'/'ace'.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Longest Common Subsequence (1143)](https://leetcode.com/problems/longest-common-subsequence/) · Medium
   - Done when: You can explain each cell's meaning. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Authentication vs authorization; JWT validation and negative tests.**
   - Read: [JWT, OAuth 2.0 and OpenID Connect in practice](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-tokens); [Authentication and authorization: JWT, policies and tenant ownership](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-auth)
   - Do: Write tests: expired token, wrong audience, wrong issuer, bad signature → 401.
4. **Explain aloud — 5 min.** *Why is 'authenticated' not the same as 'authorized'?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-100"></a>

## Day 100 · Tuesday · Tue 02 Feb 2027
**Edit operations** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is 'authenticated' not the same as 'authorized'?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Edit Distance: insert, delete, replace. Interleaving String if time.
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Edit Distance (72)](https://leetcode.com/problems/edit-distance/) · Medium; [Interleaving String (97)](https://leetcode.com/problems/interleaving-string/) · Medium
   - Done when: Base row and column filled correctly. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Object- and function-level authorization; tenant isolation (OWASP API1, API5).**
   - Read: [OWASP API Security Top 10 (2023) applied to the job platform](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-owasp); [M5 Q12. How do you prove tenant isolation rather than assert it?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q12)
   - Do: Add a tenant check to every job query (a global query filter) and a resource-based authorization handler; test 404 for another tenant's job.
4. **Explain aloud — 5 min.** *How do you prove tenant isolation rather than assert it?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-101"></a>

## Day 101 · Wednesday · Wed 03 Feb 2027
**Stock state machines** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *How do you prove tenant isolation rather than assert it?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Best Time to Buy and Sell Stock II (greedy) and with Cooldown (states: hold, sold, rest).
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Best Time to Buy and Sell Stock II (122)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) · Medium; [Best Time to Buy and Sell Stock with Cooldown (309)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) · Medium
   - Done when: You can draw the state diagram. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Input validation, injection, mass assignment, request limits, sensitive data in logs.**
   - Read: [Web security essentials](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-web)
   - Do: Use DTOs only (no binding to entities); add size limits; make sure tokens and PII never appear in logs.
4. **Explain aloud — 5 min.** *What is mass assignment and how do DTOs prevent it?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-102"></a>

## Day 102 · Thursday · Thu 04 Feb 2027
**Subsequence families** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What is mass assignment and how do DTOs prevent it?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Longest Palindromic Subsequence; LIS in O(n log n) with tails + binary search (extension).
   - Read first (short): [Dynamic programming families](../NOTES/01_DSA.md#add-dsa-dp-families)
   - Solve: [Longest Palindromic Subsequence (516)](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium; [Number of Longest Increasing Subsequence (673)](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) · Medium
   - Done when: You can explain the tails array idea. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: CORS vs CSRF, SSRF, secrets management, threat modeling.**
   - Read: [Web security essentials](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-web); [A lightweight threat model for the job platform](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-threat-model)
   - Do: Write the STRIDE table for your project and the list of ten security tests.
4. **Explain aloud — 5 min.** *Why is CORS not a CSRF defence?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-103"></a>

## Day 103 · Friday · Fri 05 Feb 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Longest Common Subsequence, Edit Distance, Interleaving String.
   - Then one problem you have not seen, with no pattern hint: [Distinct Subsequences (115)](https://leetcode.com/problems/distinct-subsequences/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why is 'authenticated' not the same as 'authorized'?* · *How do you prove tenant isolation rather than assert it?* · *What is mass assignment and how do DTOs prevent it?* · *Why is CORS not a CSRF defence?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard extension; otherwise re-solve LCS cold.

---

<a id="day-104"></a>

## Day 104 · Saturday · Sat 06 Feb 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Distinct Subsequences (extension), Word Break re-solve, LIS re-solve, Decode Ways re-solve.
   - Solve: [Distinct Subsequences (115)](https://leetcode.com/problems/distinct-subsequences/) · Hard *(extension)*; [Word Break (139)](https://leetcode.com/problems/word-break/) · Medium; [Longest Increasing Subsequence (300)](https://leetcode.com/problems/longest-increasing-subsequence/) · Medium; [Decode Ways (91)](https://leetcode.com/problems/decode-ways/) · Medium
3. **Design — 90 min.** LLD: elevator system — requests, direction, a state machine (Idle, MovingUp, MovingDown, DoorsOpen), a scheduling strategy (SCAN/LOOK).
   - Use: [LLD card: Elevator system](../DESIGNS.md#lld-elevator); [GAP-09-002 — Design elevator](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-002); [Designing state machines in code](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-state-machines)
4. **Lab / project — 90 min.** PROJECT M5 — security: JWT authentication, tenant authorization, validation, secrets from configuration (never in source), log scrubbing, built-in rate limiting per tenant. All ten security tests pass.
   - Use: [M5 — Security and load control (Week 15)](../PROJECT.md#project-m5); [A lightweight threat model for the job platform](../NOTES/10_ENGINEERING_PRACTICE.md#add-sec-threat-model)
5. **English — 20 min.** Record 2 minutes: 'how my API keeps tenants apart'.

---

<a id="day-105"></a>

## Day 105 · Sunday · Sun 07 Feb 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why is 'authenticated' not the same as 'authorized'?* · *How do you prove tenant isolation rather than assert it?* · *What is mass assignment and how do DTOs prevent it?* · *Why is CORS not a CSRF defence?*
   - Solve cold (25 minutes each): [Edit Distance (72)](https://leetcode.com/problems/edit-distance/) · Medium; [Longest Palindromic Subsequence (516)](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium
   - Sketch in 10–15 minutes: LLD: elevator system — requests, direction, a state machine (Idle, MovingUp, MovingDown, DoorsOpen), a scheduling strategy (SCAN/LOOK).
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Finish PROJECT M5. Run the tests from a clean checkout.
   - Use: [M5 — Security and load control (Week 15)](../PROJECT.md#project-m5)
4. **Behavioral — 45 min.** Customer-impact story: who was affected, how you knew, what changed for them. Say clearly which numbers you do not know.
   - Use: [GAP-08-022 — Tell me about a time you had to raise the engineering quality bar.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-022); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 14](WEEK_14.md) · [The plan](../PLAN.md) · [Week 16 →](WEEK_16.md)
