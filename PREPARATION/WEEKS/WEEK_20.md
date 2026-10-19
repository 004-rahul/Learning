# Week 20 — Readiness and project defense · design framework · GATE

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 19](WEEK_19.md) [Week 21 →](WEEK_21.md)

**Phase 3 — Project completion and design depth (Week 20 gate)** · Days 134–140 · default dates Mon 08 Mar 2027 – Sun 14 Mar 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Timed coding and re-solves  
**Core this week:** The design framework, estimation, classic designs' hard parts, behavioral structure, resume truth check

**Goal:** Pass the Week 20 gate: independent mediums, a coherent 45-minute design, a working defended project, and real stories ready for probing.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Several unseen mediums solved in 35–45 minutes with tests.
- [ ] A coherent 45-minute design delivered (e-commerce or payment).
- [ ] PROJECT M10: README, decision records and a 15-minute defense; scope frozen.
- [ ] 10–12 real stories written, mapped to Leadership Principles, recorded under 3 minutes each.
- [ ] Resume updated only with claims you can defend (project added only if built and measured).

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [134 Mon](#day-134) | Independent coding round | Asteroid Collision, Car Fleet | The design framework: the nine steps, the 45-minute budget, estimation numbers |
| [135 Tue](#day-135) | Repair the highest-impact weakness | Decode String, Basic Calculator II | The classic designs and the one hard part of each |
| [136 Wed](#day-136) | Two shorter tasks | Insert Delete GetRandom O(1), Subarray Product Less Than K | Behavioral structure: STAR, 'I' vs 'we', Have Backbone, Earn Trust |
| [137 Thu](#day-137) | Code review and extension | Continuous Subarray Sum, Contiguous Array | Behavioral follow-ups; quantifying honestly; the flagship story; resume truth check |
| [138 Fri](#day-138) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [139 Sat](#day-139) | Deep work (5 h) | Next Permutation, Find the Duplicate Number, Majority Element, Rotate Array | design + lab/project |
| [140 Sun](#day-140) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-134"></a>

## Day 134 · Monday · Mon 08 Mar 2027
**Independent coding round** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Walk me through exactly what happens when a worker dies mid-job.* Then one item from the WEAK sheet.
2. **DSA — 60 min.** One unfamiliar medium, verbal reasoning, boundary tests, 45 minutes.
   - Read first (short): [The coding round script (45 minutes)](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-coding-script)
   - Solve: [Asteroid Collision (735)](https://leetcode.com/problems/asteroid-collision/) · Medium; [Car Fleet (853)](https://leetcode.com/problems/car-fleet/) · Medium
   - Done when: Passed with your own tests first. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: The design framework: the nine steps, the 45-minute budget, estimation numbers.**
   - Read: [M5 Q1. What are the nine steps, in order?](../NOTES/08_SYSTEM_DESIGN.md#m5-q1); [M5 Q2. How do you budget the 45 minutes?](../NOTES/08_SYSTEM_DESIGN.md#m5-q2); [M5 Q3. What estimation numbers must you know cold?](../NOTES/08_SYSTEM_DESIGN.md#m5-q3); [M5 Q4. How do you estimate storage for a design?](../NOTES/08_SYSTEM_DESIGN.md#m5-q4); [GAP-06-001 — How many requests can one server handle?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-001); [GAP-06-002 — How do you estimate QPS from DAU?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-002); [GAP-06-003 — How do you estimate peak QPS?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-003); [GAP-06-004 — What peak-to-average ratio should you assume?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-004); [The answer template (use it every time)](../NOTES/08_SYSTEM_DESIGN.md#add-sd-template); [How to estimate, with three worked examples](../NOTES/08_SYSTEM_DESIGN.md#add-sd-estimation)
   - Do: Do three estimation drills on paper (QPS from DAU, storage per year, cache size).
4. **Explain aloud — 5 min.** *What are the design steps, in order?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read [GAP-06-005 — How do you estimate bandwidth?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-005); [GAP-06-006 — How do you estimate storage growth?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-006); [GAP-06-007 — How do you estimate cache size?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-007); [GAP-06-008 — How do you estimate number of servers?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-008); [GAP-06-009 — How do you estimate database capacity?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-009); [GAP-06-010 — How do you estimate number of Kafka partitions?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-010); [GAP-06-011 — How do you estimate queue depth?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-011); [GAP-06-012 — How do you calculate availability?](../NOTES/08_SYSTEM_DESIGN.md#gap-06-012); [The numbers table](../NOTES/08_SYSTEM_DESIGN.md#add-sd-numbers), then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-135"></a>

## Day 135 · Tuesday · Tue 09 Mar 2027
**Repair the highest-impact weakness** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What are the design steps, in order?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Your most-failed family: the primitive from memory, then one variation.
   - Read first (short): [PART 10 - The mistakes that keep people stuck](../NOTES/01_DSA.md#dsa-part-10-the-mistakes-that-keep-people-stuck)
   - Solve: [Decode String (394)](https://leetcode.com/problems/decode-string/) · Medium; [Basic Calculator II (227)](https://leetcode.com/problems/basic-calculator-ii/) · Medium
   - Done when: The primitive is correct from a blank file. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: The classic designs and the one hard part of each.**
   - Read: [M5 Q5. Why does neither pure fan-out strategy work for a news feed?](../NOTES/08_SYSTEM_DESIGN.md#m5-q5); [M5 Q6. How do you avoid overselling inventory without a distributed transaction?](../NOTES/08_SYSTEM_DESIGN.md#m5-q6); [M5 Q7. Why are payment systems obsessed with idempotency?](../NOTES/08_SYSTEM_DESIGN.md#m5-q7); [M5 Q8. How do you deliver a message to a device that is offline?](../NOTES/08_SYSTEM_DESIGN.md#m5-q8); [M5 Q9. What is the hard part of a file storage design?](../NOTES/08_SYSTEM_DESIGN.md#m5-q9); [M5 Q10. Compare the rate limiting algorithms.](../NOTES/08_SYSTEM_DESIGN.md#m5-q10)
   - Do: For each of the six, say the hard part and the standard solution in two sentences.
4. **Explain aloud — 5 min.** *Why are payment systems obsessed with idempotency?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: complexity drill: time and space with the reason for this week's problems.

---

<a id="day-136"></a>

## Day 136 · Wednesday · Wed 10 Mar 2027
**Two shorter tasks** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why are payment systems obsessed with idempotency?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Two easier mixed tasks in 25 minutes each.
   - Read first (short): [How a behavioral round flows](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-behavioral-script)
   - Solve: [Insert Delete GetRandom O(1) (380)](https://leetcode.com/problems/insert-delete-getrandom-o1/) · Medium; [Subarray Product Less Than K (713)](https://leetcode.com/problems/subarray-product-less-than-k/) · Medium
   - Done when: Both correct with complexity stated. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Behavioral structure: STAR, 'I' vs 'we', Have Backbone, Earn Trust.**
   - Read: [M5 Q18. Why does Action get 55% of a STAR answer?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q18); [M5 Q19. Why does saying "we" cost you the answer?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q19); [M5 Q20. What makes a Have Backbone story work?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q20); [M5 Q21. What makes an Earn Trust story work?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q21); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
   - Do: Rewrite one story removing every 'we' that hides your own action.
4. **Explain aloud — 5 min.** *Why does saying 'we' cost you the answer?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: narration drill: explain one solved problem as if to an interviewer.

---

<a id="day-137"></a>

## Day 137 · Thursday · Thu 11 Mar 2027
**Code review and extension** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Why does saying 'we' cost you the answer?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Review a small API/worker change in your project as if you were a reviewer; add a test before fixing anything.
   - Read first (short): [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
   - Solve: [Continuous Subarray Sum (523)](https://leetcode.com/problems/continuous-subarray-sum/) · Medium; [Contiguous Array (525)](https://leetcode.com/problems/contiguous-array/) · Medium
   - Done when: Review notes written; test added. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: Behavioral follow-ups; quantifying honestly; the flagship story; resume truth check.**
   - Read: [M5 Q22. How do you answer "what would you do differently?"](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q22); [M5 Q23. The interviewer keeps asking "why" until you run out. What do you do?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q23); [M5 Q24. How do you quantify a story when you do not have exact numbers?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q24); [M5 Q25. Which of your stories is the flagship, and what does that mean for preparation?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q25); [Story preparation for every resume line](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-resume-stories); [Contradictions still in this chapter, and which instruction wins](../NOTES/16_CAREER_APPLICATIONS_RELOCATION.md#add-career-consistency)
   - Do: Read every resume line and ask 'can I survive one follow-up?'. Mark lines to prepare or remove.
4. **Explain aloud — 5 min.** *How do you answer 'what would you do differently?'* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-138"></a>

## Day 138 · Friday · Fri 12 Mar 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Asteroid Collision, Car Fleet, Decode String.
   - Then one problem you have not seen, with no pattern hint: [First Missing Positive (41)](https://leetcode.com/problems/first-missing-positive/) · Hard
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What are the design steps, in order?* · *Why are payment systems obsessed with idempotency?* · *Why does saying 'we' cost you the answer?* · *How do you answer 'what would you do differently?'* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard: First Missing Positive (cyclic placement). Otherwise re-solve the month's failures.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Photo sharing (Instagram)](../DESIGNS.md#hld-instagram); [LLD card: Amazon order management](../DESIGNS.md#lld-order-management)

---

<a id="day-139"></a>

## Day 139 · Saturday · Sat 13 Mar 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Timed: Next Permutation, Find the Duplicate Number, Majority Element, Rotate Array (25 minutes each).
   - Solve: [Next Permutation (31)](https://leetcode.com/problems/next-permutation/) · Medium; [Find the Duplicate Number (287)](https://leetcode.com/problems/find-the-duplicate-number/) · Medium; [Majority Element (169)](https://leetcode.com/problems/majority-element/) · Easy; [Rotate Array (189)](https://leetcode.com/problems/rotate-array/) · Medium
3. **Design — 90 min.** E-commerce checkout and inventory HLD (no overselling), then payment workflow HLD (idempotency keys, webhooks, reconciliation).
   - Use: [HLD card: E-commerce checkout, orders and inventory (Amazon)](../DESIGNS.md#hld-ecommerce); [HLD card: Payment system / wallet (PhonePe)](../DESIGNS.md#hld-payment); [GAP-05-012 — Design payment system](../NOTES/08_SYSTEM_DESIGN.md#gap-05-012); [GAP-05-013 — Design e-commerce checkout](../NOTES/08_SYSTEM_DESIGN.md#gap-05-013); [GAP-05-014 — Design inventory/stock reservation](../NOTES/08_SYSTEM_DESIGN.md#gap-05-014)
4. **Lab / project — 90 min.** PROJECT M10 — README (10 sections), 3–5 decision records, 15-minute defense recorded, scope frozen. Only now add the project to your resume, with measured numbers only.
   - Use: [M10 — README, decisions, defense (Week 20)](../PROJECT.md#project-m10); [9. README sections](../PROJECT.md#project-readme); [12. Adding it to your resume (only after M10)](../PROJECT.md#project-resume)
5. **English — 20 min.** Record all your stories under 3 minutes each.

---

<a id="day-140"></a>

## Day 140 · Sunday · Sun 14 Mar 2027
**Test, review, project, stories** · 300 minutes

1. **Week 20 gate (Month 5) — 90 min (replaces the weekly test).**
   - [ ] Across several sessions, unseen medium problems solved in 35–45 minutes with tests.
   - [ ] A coherent 45-minute design from a blank page (anchor design with a changed requirement).
   - [ ] PROJECT deployed or runnable from a clean clone, load-tested, failure-tested, documented, defended in 15 minutes.
   - [ ] 10–12 real stories written and recorded; every resume line survives one follow-up.
   - [ ] Answer the Month 5 gate checklist (link above). Decide: start applying in Week 21, or repair for two weeks first.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** WEEK 20 GATE (see checkpoint). If several items are 'no', spend Weeks 21–22 repairing them before applying anywhere you really want.
   - Use: [M5 PART E - The Month 5 gate](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m5-part-e); [M5 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m5-guide)
4. **Behavioral — 45 min.** Review your 10–12 stories against the LP matrix; fill the gaps with real situations only.
   - Use: [Amazon's 16 Leadership Principles and the story matrix](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-lp-matrix); [GAP-08-025 — Tell me about your most technically difficult project.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-025); [GAP-08-027 — Tell me about a project you are most proud of.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-027)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.
6. **Admin — 15 min.** Career: update the resume with the real project (only if built and measured) and change '4.5+ years' to the accurate figure at that date. Do not touch the Resume folder's originals — edit copies.

*Optional extra design drill (20 min each, pick one):* [HLD card: Short-video feed (TikTok)](../DESIGNS.md#hld-tiktok); [LLD card: Live cricket score (CricBuzz)](../DESIGNS.md#lld-cricbuzz)

---

[← Week 19](WEEK_19.md) · [The plan](../PLAN.md) · [Week 21 →](WEEK_21.md)
