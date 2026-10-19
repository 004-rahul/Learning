# Week 16 — Monotonic structures, bits, tries · Docker, Git, CI/CD · PROJECT M6

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 15](WEEK_15.md) [Week 17 →](WEEK_17.md)

**Phase 2 — Core depth and the project starts** · Days 106–112 · default dates Mon 08 Feb 2027 – Sun 14 Feb 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Monotonic stack/deque, bit tricks, tries  
**Core this week:** Docker images and Compose, Linux basics, Git workflow, CI, CD, health checks, safe migrations

**Goal:** Use monotonic structures and tries correctly, and make the project build, test and run reproducibly from a clean clone.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Daily Temperatures and Sliding Window Maximum explained with the amortised O(n) argument.
- [ ] Implement Trie written cold.
- [ ] PROJECT M6: `docker compose up` runs API + worker + Postgres + RabbitMQ from a clean clone; a failing test blocks the CI pipeline.
- [ ] Month 4 checkpoint completed.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [106 Mon](#day-106) | Monotonic stack | Daily Temperatures, Next Greater Element I, Next Greater Element II | Docker: images, containers, layers, multi-stage builds |
| [107 Tue](#day-107) | Monotonic deque and histogram | Sliding Window Maximum, Largest Rectangle in Histogram, Online Stock Span | Docker Compose (networks, volumes, health checks) and Linux basics |
| [108 Wed](#day-108) | Tries | Implement Trie (Prefix Tree), Design Add and Search Words Data Structure, Search Suggestions System | Git workflow and CI: build, test, format, what each stage protects |
| [109 Thu](#day-109) | Bits | Single Number, Number of 1 Bits, Counting Bits, Missing Number, Reverse Bits | CD: environments, readiness vs liveness, safe migrations, rollback |
| [110 Fri](#day-110) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [111 Sat](#day-111) | Deep work (5 h) | Trapping Rain Water, Word Search II, Sum of Two Integers, Single Number III | design + lab/project |
| [112 Sun](#day-112) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-106"></a>

## Day 106 · Monday · Mon 08 Feb 2027
**Monotonic stack** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is CORS not a CSRF defence?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Daily Temperatures; Next Greater Element I and II (circular). Each index is pushed and popped once.
   - Read first (short): [Monotonic stack and monotonic deque](../NOTES/01_DSA.md#add-dsa-monotonic); [6. Monotonic stack](../NOTES/01_DSA.md#dsa-6-monotonic-stack)
   - Solve: [Daily Temperatures (739)](https://leetcode.com/problems/daily-temperatures/) · Medium; [Next Greater Element I (496)](https://leetcode.com/problems/next-greater-element-i/) · Easy; [Next Greater Element II (503)](https://leetcode.com/problems/next-greater-element-ii/) · Medium
   - Done when: You can state the amortised O(n) argument. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Docker: images, containers, layers, multi-stage builds.**
   - Read: [BASIC-039 — What are Docker image, container, Dockerfile, volume and network?](../NOTES/00_START_FROM_ZERO.md#basic-039); [M5 Q15. Why do multi-stage Docker builds matter?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q15); [Docker for .NET 10](../NOTES/10_ENGINEERING_PRACTICE.md#add-docker)
   - Do: Write a multi-stage Dockerfile for the API (sdk build → aspnet runtime, non-root user, port 8080). Compare image sizes.
4. **Explain aloud — 5 min.** *Why do multi-stage Docker builds matter?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-107"></a>

## Day 107 · Tuesday · Tue 09 Feb 2027
**Monotonic deque and histogram** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why do multi-stage Docker builds matter?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Sliding Window Maximum with a deque of indexes; Largest Rectangle in Histogram (previous/next smaller). Online Stock Span.
   - Read first (short): [Monotonic stack and monotonic deque](../NOTES/01_DSA.md#add-dsa-monotonic)
   - Solve: [Sliding Window Maximum (239)](https://leetcode.com/problems/sliding-window-maximum/) · Hard; [Largest Rectangle in Histogram (84)](https://leetcode.com/problems/largest-rectangle-in-histogram/) · Hard; [Online Stock Span (901)](https://leetcode.com/problems/online-stock-span/) · Medium
   - Done when: You can explain what the deque stores and why. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Docker Compose (networks, volumes, health checks) and Linux basics.**
   - Read: [Docker for .NET 10](../NOTES/10_ENGINEERING_PRACTICE.md#add-docker); [Linux essentials for a backend engineer](../NOTES/10_ENGINEERING_PRACTICE.md#add-linux)
   - Do: Put API, worker, Postgres and RabbitMQ in one compose file with health checks and depends_on conditions.
4. **Explain aloud — 5 min.** *Why is 'localhost' inside a container not your machine?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-108"></a>

## Day 108 · Wednesday · Wed 10 Feb 2027
**Tries** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why is 'localhost' inside a container not your machine?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Implement Trie; Design Add and Search Words; Search Suggestions System.
   - Read first (short): [Trie (prefix tree)](../NOTES/01_DSA.md#add-dsa-trie)
   - Solve: [Implement Trie (Prefix Tree) (208)](https://leetcode.com/problems/implement-trie-prefix-tree/) · Medium; [Design Add and Search Words Data Structure (211)](https://leetcode.com/problems/design-add-and-search-words-data-structure/) · Medium; [Search Suggestions System (1268)](https://leetcode.com/problems/search-suggestions-system/) · Medium
   - Done when: Word end vs prefix distinguished. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Git workflow and CI: build, test, format, what each stage protects.**
   - Read: [BASIC-038 — What are Git, build, tests, CI and CD?](../NOTES/00_START_FROM_ZERO.md#basic-038); [M5 Q16. What does your CI pipeline protect against, stage by stage?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q16); [Git essentials](../NOTES/10_ENGINEERING_PRACTICE.md#add-git); [CI with GitHub Actions](../NOTES/10_ENGINEERING_PRACTICE.md#add-ci)
   - Do: Create a GitHub Actions workflow: restore, build, format check, unit tests, integration tests.
4. **Explain aloud — 5 min.** *What does your CI pipeline protect against, stage by stage?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-109"></a>

## Day 109 · Thursday · Thu 11 Feb 2027
**Bits** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What does your CI pipeline protect against, stage by stage?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Single Number (XOR), Number of 1 Bits, Counting Bits, Missing Number, Reverse Bits.
   - Read first (short): [Bits and math](../NOTES/01_DSA.md#add-dsa-bits-math)
   - Solve: [Single Number (136)](https://leetcode.com/problems/single-number/) · Easy; [Number of 1 Bits (191)](https://leetcode.com/problems/number-of-1-bits/) · Easy; [Counting Bits (338)](https://leetcode.com/problems/counting-bits/) · Easy; [Missing Number (268)](https://leetcode.com/problems/missing-number/) · Easy; [Reverse Bits (190)](https://leetcode.com/problems/reverse-bits/) · Easy
   - Done when: You can explain XOR cancellation and n & (n − 1). Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: CD: environments, readiness vs liveness, safe migrations, rollback.**
   - Read: [M5 Q13. Liveness or readiness - what is the difference and why does it matter?](../NOTES/10_ENGINEERING_PRACTICE.md#m5-q13); [BASIC-040 — What do Kubernetes and cloud basics add?](../NOTES/00_START_FROM_ZERO.md#basic-040); [CD: deployment and release safety](../NOTES/10_ENGINEERING_PRACTICE.md#add-cd); [Zero-downtime schema changes](../NOTES/04_SQL_DATABASES.md#add-sql-migrations)
   - Do: Add /healthz/live (no dependencies) and /healthz/ready (database + broker) endpoints.
4. **Explain aloud — 5 min.** *Liveness or readiness — what is the difference and why does it matter?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-110"></a>

## Day 110 · Friday · Fri 12 Feb 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Daily Temperatures, Next Greater Element I, Next Greater Element II.
   - Then one problem you have not seen, with no pattern hint: [Remove K Digits (402)](https://leetcode.com/problems/remove-k-digits/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why do multi-stage Docker builds matter?* · *Why is 'localhost' inside a container not your machine?* · *What does your CI pipeline protect against, stage by stage?* · *Liveness or readiness — what is the difference and why does it matter?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Mixed unlabeled set: one DP, one graph, one monotonic problem.

*Optional extra practice from this week's patterns (only after the repair is done; otherwise they stay in the pool):* [Previous smaller element with a monotonic stack](../PROBLEMS.md#x-prev-smaller) · own exercise; [Sieve of Eratosthenes, GCD/LCM, fast power with modulo](../PROBLEMS.md#x-sieve-gcd) · own exercise; [Power of Two (231)](https://leetcode.com/problems/power-of-two/) · Easy

---

<a id="day-111"></a>

## Day 111 · Saturday · Sat 13 Feb 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Trapping Rain Water (two pointers or monotonic stack), Word Search II (trie + backtracking), Sum of Two Integers, Single Number III.
   - Solve: [Trapping Rain Water (42)](https://leetcode.com/problems/trapping-rain-water/) · Hard; [Word Search II (212)](https://leetcode.com/problems/word-search-ii/) · Hard; [Sum of Two Integers (371)](https://leetcode.com/problems/sum-of-two-integers/) · Medium; [Single Number III (260)](https://leetcode.com/problems/single-number-iii/) · Medium
3. **Design — 90 min.** LLD: seat reservation (BookMyShow) — shows, seats, a 10-minute hold, concurrent requests for the same seat, payment timeout.
   - Use: [LLD card: Seat reservation with seat locking (BookMyShow)](../DESIGNS.md#lld-seat-reservation); [GAP-09-007 — Design movie ticket booking](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-007); [Thread safety in LLD](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-concurrency)
4. **Lab / project — 90 min.** PROJECT M6 — Compose for the whole system plus the CI workflow; branch protection so a failing test blocks the merge. Clone into a new folder and run it from the README.
   - Use: [M6 — Delivery: containers and CI (Week 16)](../PROJECT.md#project-m6); [CI with GitHub Actions](../NOTES/10_ENGINEERING_PRACTICE.md#add-ci); [Docker for .NET 10](../NOTES/10_ENGINEERING_PRACTICE.md#add-docker)
5. **English — 20 min.** Record 2 minutes: 'how a request flows through my containers'.

---

<a id="day-112"></a>

## Day 112 · Sunday · Sun 14 Feb 2027
**Test, review, project, stories** · 300 minutes

1. **Month 4 checkpoint — 90 min (replaces the weekly test).**
   - [ ] Mixed attempt: one DP and one graph problem, 45 minutes each.
   - [ ] Answer the M4 self-test aloud (link above).
   - [ ] PROJECT: reproducible containers, test pipeline, and a supported idempotency claim (with its boundary).
   - [ ] One LLD in 60–90 minutes from a blank page with tests.
   - [ ] Update WEAK; story count so far; plan next month.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Month 4 test (see checkpoint). Then a 5-minute project walkthrough recorded on video or audio.
   - Use: [M4 PART F - The Month 4 self-test](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m4-part-f); [M4 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m4-guide); [M6 — Delivery: containers and CI (Week 16)](../PROJECT.md#project-m6)
4. **Behavioral — 45 min.** Ownership story told to a partner who keeps asking 'why?' and 'what exactly did YOU do?'.
   - Use: [M5 Q19. Why does saying "we" cost you the answer?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q19); [M5 Q23. The interviewer keeps asking "why" until you run out. What do you do?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q23); [Story preparation for every resume line](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-resume-stories)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 15](WEEK_15.md) · [The plan](../PLAN.md) · [Week 17 →](WEEK_17.md)
