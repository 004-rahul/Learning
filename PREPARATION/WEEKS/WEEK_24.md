# Week 24 — Google-style preparation · six-month assessment

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 23](WEEK_23.md) [Week 25 →](WEEK_25.md)

**Phase 4 — Interview launch (Week 24 six-month assessment)** · Days 162–168 · default dates Mon 05 Apr 2027 – Sun 11 Apr 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Google-leaning topics: graphs, DP, recursion, follow-up variations, no IDE  
**Core this week:** Code comprehension, hiring committee, Google Docs and distributed cache designs, full loop

**Goal:** Pass a full mock loop and make the six-month decision: apply widely, repair, or extend.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] All week's coding in a plain editor.
- [ ] Google Docs and distributed cache designs done.
- [ ] A complete mock loop (coding + design + behavioral) with feedback.
- [ ] Six-month decision written: apply / repair / extend, with reasons.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [162 Mon](#day-162) | No-IDE graphs and DP | Longest Increasing Path in a Matrix, Longest Common Subsequence | Hiring committee: how to be easy to write down |
| [163 Tue](#day-163) | Code comprehension | Evaluate Division, Minimum Height Trees | Code comprehension: read 45 minutes of open-source C#, explain it aloud, find a risk |
| [164 Wed](#day-164) | Design: collaborative editing | Edit Distance, Longest Palindromic Substring | Google Docs design: OT vs CRDT, presence, conflict handling |
| [165 Thu](#day-165) | Design: distributed cache | LFU Cache, LRU Cache | Distributed cache design: consistent hashing, replication, eviction, hot keys |
| [166 Fri](#day-166) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [167 Sat](#day-167) | Deep work (5 h) | Word Search II, Largest Rectangle in Histogram | design + lab/project |
| [168 Sun](#day-168) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-162"></a>

## Day 162 · Monday · Mon 05 Apr 2027
**No-IDE graphs and DP** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you handle a hot key in a distributed cache?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard; [Longest Common Subsequence (1143)](https://leetcode.com/problems/longest-common-subsequence/) · Medium
   - Done when: Both in a plain editor with follow-ups ('stream', 'doesn't fit in memory').
3. **Hiring committee: how to be easy to write down — 40 min.**
   - Read: [M6 Q15. What does the hiring committee mean for how you should answer?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q15); [M6 Q12. What separates a passing design from a strong one?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q12)
   - Do: After each answer, say one sentence that summarises your decision.
4. **Explain aloud + log — 10 min.** *What does the hiring committee mean for how you answer?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-163"></a>

## Day 163 · Tuesday · Tue 06 Apr 2027
**Code comprehension** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What does the hiring committee mean for how you answer?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Evaluate Division (399)](https://leetcode.com/problems/evaluate-division/) · Medium; [Minimum Height Trees (310)](https://leetcode.com/problems/minimum-height-trees/) · Medium
   - Done when: Both solved.
3. **Code comprehension: read 45 minutes of open-source C#, explain it aloud, find a risk — 40 min.**
   - Read: [M6 Q7. What is the code comprehension round and why is it good news for you?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q7)
   - Do: Pick one file from a .NET open-source project and explain it.
4. **Explain aloud + log — 10 min.** *What is the code comprehension round and how do you prepare?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-164"></a>

## Day 164 · Wednesday · Wed 07 Apr 2027
**Design: collaborative editing** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What is the code comprehension round and how do you prepare?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Edit Distance (72)](https://leetcode.com/problems/edit-distance/) · Medium; [Longest Palindromic Substring (5)](https://leetcode.com/problems/longest-palindromic-substring/) · Medium
   - Done when: Both re-solved.
3. **Google Docs design: OT vs CRDT, presence, conflict handling — 40 min.**
   - Read: [HLD card: Collaborative editor (Google Docs)](../DESIGNS.md#hld-google-docs); [GAP-05-021 — Design Google Docs / collaborative editing](../NOTES/08_SYSTEM_DESIGN.md#gap-05-021)
   - Do: 20-minute drill.
4. **Explain aloud + log — 10 min.** *How do two people edit the same paragraph safely?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-165"></a>

## Day 165 · Thursday · Thu 08 Apr 2027
**Design: distributed cache** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do two people edit the same paragraph safely?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [LFU Cache (460)](https://leetcode.com/problems/lfu-cache/) · Hard *(extension)*; [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) · Medium
   - Done when: LFU attempted (extension); LRU cold.
3. **Distributed cache design: consistent hashing, replication, eviction, hot keys — 40 min.**
   - Read: [HLD card: Distributed cache (Redis-like)](../DESIGNS.md#hld-distributed-cache); [GAP-05-006 — Design distributed cache](../NOTES/08_SYSTEM_DESIGN.md#gap-05-006)
   - Do: 20-minute drill.
4. **Explain aloud + log — 10 min.** *How do you handle a hot key in a distributed cache?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-166"></a>

## Day 166 · Friday · Fri 09 Apr 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Longest Increasing Path in a Matrix, Longest Common Subsequence, Evaluate Division.
   - Then one problem you have not seen, with no pattern hint: [Median of Two Sorted Arrays (4)](https://leetcode.com/problems/median-of-two-sorted-arrays/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What does the hiring committee mean for how you answer?* · *What is the code comprehension round and how do you prepare?* · *How do two people edit the same paragraph safely?* · *How do you handle a hot key in a distributed cache?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard: Median of Two Sorted Arrays. Otherwise repair.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Ad serving](../DESIGNS.md#hld-ad-serving); [LLD card: Feature flag system](../DESIGNS.md#lld-feature-flags)

---

<a id="day-167"></a>

## Day 167 · Saturday · Sat 10 Apr 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Full mock loop part 1: 45 minutes coding + 45 minutes design + 30 minutes behavioral.
   - Solve: [Word Search II (212)](https://leetcode.com/problems/word-search-ii/) · Hard; [Largest Rectangle in Histogram (84)](https://leetcode.com/problems/largest-rectangle-in-histogram/) · Hard
3. **Design — 90 min.** Full design mock (job platform, booking or notification).
   - Use: [How to practise system design](../NOTES/08_SYSTEM_DESIGN.md#add-sd-practice); [HLD card: Distributed job scheduler / task queue (your project)](../DESIGNS.md#hld-job-platform)
4. **Lab / project — 90 min.** Project: reproduce setup from a clean clone; run one failure test and one benchmark again.
   - Use: [M9 — Evidence (Week 19)](../PROJECT.md#project-m9)
5. **English — 20 min.** Record 2 minutes: 'why this company'.

---

<a id="day-168"></a>

## Day 168 · Sunday · Sun 11 Apr 2027
**Test, review, project, stories** · 300 minutes

1. **Week 24 — six-month core assessment — 90 min (replaces the weekly test).**
   - [ ] A complete mock loop with written feedback.
   - [ ] 10–12 real stories ready for probing; resume claims defensible.
   - [ ] Recurring weaknesses getting smaller (compare WEAK sheet with Week 12).
   - [ ] M6 checklist (link above) answered.
   - [ ] Written decision: apply widely now / repair two weeks / extend into Weeks 25–32 before applying to dream companies. No automatic pass by date.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** SIX-MONTH ASSESSMENT (see checkpoint).
   - Use: [M6 PART E - The Month 6 checklist](../NOTES/13_INTERVIEW_ROUNDS.md#m6-part-e); [M6 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m6-guide)
4. **Behavioral — 45 min.** Mock three behavioral questions with deep follow-ups.
   - Use: [How a behavioral round flows](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-behavioral-script); [GAP-08-019 — Tell me about a time you influenced without authority.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-019)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Recommendation system](../DESIGNS.md#hld-recommendations); [LLD card: Distributed ID generator (Snowflake)](../DESIGNS.md#lld-snowflake-id)

---

[← Week 23](WEEK_23.md) · [The plan](../PLAN.md) · [Week 25 →](WEEK_25.md)
