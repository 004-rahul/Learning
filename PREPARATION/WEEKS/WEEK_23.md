# Week 23 — Amazon-style preparation · code comprehension

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 22](WEEK_22.md) [Week 24 →](WEEK_24.md)

**Phase 4 — Interview launch (Week 24 six-month assessment)** · Days 155–161 · default dates Mon 29 Mar 2027 – Sun 04 Apr 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Amazon-leaning topics: arrays, strings, hashing, trees, graphs, heaps  
**Core this week:** Leadership Principles, timed LLD, OA-style sketch, interview analysis

**Goal:** Map real stories to all 16 Leadership Principles and perform Amazon-style rounds (coding + LLD + LP in every round).

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Every high-frequency LP has two real stories.
- [ ] Two timed LLDs written in working C#.
- [ ] Package-tracking sketch done in 20 minutes.
- [ ] Interview analyses written within 24 hours for any real interview.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [155 Mon](#day-155) | Leadership Principles mapping | Reorder Data in Log Files, Most Common Word | All 16 Leadership Principles in plain words; map your stories |
| [156 Tue](#day-156) | Timed LLD one | Number of Islands, Rotting Oranges | Timed LLD: ATM (40 minutes, working C#) |
| [157 Wed](#day-157) | Amazon-leaning coding | LRU Cache, Merge Intervals | Timed LLD: library management system (40 minutes) |
| [158 Thu](#day-158) | OA-style sketch | Word Ladder, K Closest Points to Origin | Package tracking in 20 minutes (OA-style), then post-interview analysis practice |
| [159 Fri](#day-159) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [160 Sat](#day-160) | Deep work (5 h) | Trapping Rain Water, Find Median from Data Stream | design + lab/project |
| [161 Sun](#day-161) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-155"></a>

## Day 155 · Monday · Mon 29 Mar 2027
**Leadership Principles mapping** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you analyse an interview afterwards?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Reorder Data in Log Files (937)](https://leetcode.com/problems/reorder-data-in-log-files/) · Medium; [Most Common Word (819)](https://leetcode.com/problems/most-common-word/) · Easy
   - Done when: Both solved, narrated.
3. **All 16 Leadership Principles in plain words; map your stories — 40 min.**
   - Read: [Amazon's 16 Leadership Principles and the story matrix](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-lp-matrix); [M6 Q13. What is the Bar Raiser looking for?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q13); [M6 Q14. How is Amazon's loop different from Google's in practice?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q14); [7. Behavioural — this is where I'd add more](../NOTES/12_BEHAVIORAL_ENGLISH.md#qs-7)
   - Do: Fill the STORIES sheet LP columns; find gaps.
4. **Explain aloud + log — 10 min.** *What is the Bar Raiser looking for?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-156"></a>

## Day 156 · Tuesday · Tue 30 Mar 2027
**Timed LLD one** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What is the Bar Raiser looking for?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Number of Islands (200)](https://leetcode.com/problems/number-of-islands/) · Medium; [Rotting Oranges (994)](https://leetcode.com/problems/rotting-oranges/) · Medium
   - Done when: Both re-solved in under 20 minutes.
3. **Timed LLD: ATM (40 minutes, working C#) — 40 min.**
   - Read: [LLD card: ATM](../DESIGNS.md#lld-atm); [GAP-09-003 — Design ATM](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-003)
   - Do: Working code with a state machine and tests.
4. **Explain aloud + log — 10 min.** *Which states does an ATM have?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-157"></a>

## Day 157 · Wednesday · Wed 31 Mar 2027
**Amazon-leaning coding** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Which states does an ATM have?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) · Medium; [Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/) · Medium
   - Done when: Both re-solved cold.
3. **Timed LLD: library management system (40 minutes) — 40 min.**
   - Read: [LLD card: Library management system](../DESIGNS.md#lld-library); [GAP-09-005 — Design library](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-005)
   - Do: Working code with tests.
4. **Explain aloud + log — 10 min.** *How do you keep an LLD extensible?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-158"></a>

## Day 158 · Thursday · Thu 01 Apr 2027
**OA-style sketch** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you keep an LLD extensible?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Word Ladder (127)](https://leetcode.com/problems/word-ladder/) · Hard; [K Closest Points to Origin (973)](https://leetcode.com/problems/k-closest-points-to-origin/) · Medium
   - Done when: Both re-solved cold.
3. **Package tracking in 20 minutes (OA-style), then post-interview analysis practice — 40 min.**
   - Read: [HLD card: Package tracking (Amazon-style OA sketch)](../DESIGNS.md#hld-package-tracking); [M6 Q18. How do you analyse an interview afterwards?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q18); [Interview day checklist and after-interview analysis](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-day)
   - Do: Sketch in 20 minutes, then 25 more minutes of depth.
4. **Explain aloud + log — 10 min.** *How do you analyse an interview afterwards?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-159"></a>

## Day 159 · Friday · Fri 02 Apr 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Reorder Data in Log Files, Most Common Word, Number of Islands.
   - Then one problem you have not seen, with no pattern hint: [Integer to English Words (273)](https://leetcode.com/problems/integer-to-english-words/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What is the Bar Raiser looking for?* · *Which states does an ATM have?* · *How do you keep an LLD extensible?* · *How do you analyse an interview afterwards?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard: Integer to English Words. Otherwise repair.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Trending topics / top-K heavy hitters](../DESIGNS.md#hld-trending-topics); [LLD card: Search autocomplete (trie service)](../DESIGNS.md#lld-autocomplete-lld)

---

<a id="day-160"></a>

## Day 160 · Saturday · Sat 03 Apr 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Full Amazon-style mock: one coding round + one LLD + LP questions in each round.
   - Solve: [Trapping Rain Water (42)](https://leetcode.com/problems/trapping-rain-water/) · Hard; [Find Median from Data Stream (295)](https://leetcode.com/problems/find-median-from-data-stream/) · Hard
3. **Design — 90 min.** Amazon-style LLD mock (with LP questions mixed in).
   - Use: [The LLD / machine-coding round script](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-lld-script); [How a behavioral round flows](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-behavioral-script)
4. **Lab / project — 90 min.** Project: answer the defense questions with a partner probing 'why?'.
   - Use: [11. Defense questions to rehearse](../PROJECT.md#project-defense)
5. **English — 20 min.** Record 2 minutes: an Earn Trust story.

---

<a id="day-161"></a>

## Day 161 · Sunday · Sun 04 Apr 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *What is the Bar Raiser looking for?* · *Which states does an ATM have?* · *How do you keep an LLD extensible?* · *How do you analyse an interview afterwards?*
   - Solve cold (25 minutes each): [Number of Islands (200)](https://leetcode.com/problems/number-of-islands/) · Medium; [Word Ladder (127)](https://leetcode.com/problems/word-ladder/) · Hard
   - Sketch in 10–15 minutes: Amazon-style LLD mock (with LP questions mixed in).
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Weekly review; applications by verified priority.
   - Use: [The application pipeline method](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-applications)
4. **Behavioral — 45 min.** Full LP matrix review; re-record the three weakest stories.
   - Use: [Amazon's 16 Leadership Principles and the story matrix](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-lp-matrix); [GAP-08-024 — Tell me about a time you were wrong.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-024)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.
6. **Admin — 15 min.** Career: applications to overseas targets only by the verified route order (see the career chapter).

*Optional extra design drill (20 min each, pick one):* [HLD card: Content delivery network (CDN)](../DESIGNS.md#hld-cdn); [LLD card: Inventory management](../DESIGNS.md#lld-inventory)

---

[← Week 22](WEEK_22.md) · [The plan](../PLAN.md) · [Week 24 →](WEEK_24.md)
