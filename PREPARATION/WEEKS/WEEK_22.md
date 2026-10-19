# Week 22 — Interview performance · no-IDE coding · role-specific practice

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 21](WEEK_21.md) [Week 23 →](WEEK_23.md)

**Phase 4 — Interview launch (Week 24 six-month assessment)** · Days 148–154 · default dates Mon 22 Mar 2027 – Sun 28 Mar 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Timed mediums, plain editor, follow-up variations  
**Core this week:** No-IDE coding, complexity statements, LLD task scheduler, design drills, communication under pressure

**Goal:** Code correctly without an IDE, adapt to follow-ups, and handle communication under pressure.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] At least 4 problems solved in a plain text editor with a dry run.
- [ ] Task-scheduler LLD and YouTube + typeahead design drills done.
- [ ] Hard stories (failure, conflict, wrong decision) survive follow-ups.
- [ ] SQL/API or assessment weakness named and repaired.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [148 Mon](#day-148) | No-IDE coding | Count Good Nodes in Binary Tree, Subtree of Another Tree | Coding without autocomplete; 'make it faster'; stating complexity |
| [149 Tue](#day-149) | LLD drill | Course Schedule, Course Schedule II | LLD drill: task scheduler — priorities, delays, recurring tasks, worker threads |
| [150 Wed](#day-150) | Design drill | Top K Frequent Elements, Top K Frequent Words | Design drills: YouTube (upload, transcoding, streaming) and typeahead (trie service, ranking, caching) |
| [151 Thu](#day-151) | Communication under pressure | Partition Equal Subset Sum, Target Sum | When English stalls, answer length, recovering a bad answer, questions to ask; aptitude only if a target test needs it |
| [152 Fri](#day-152) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [153 Sat](#day-153) | Deep work (5 h) | Min Cost to Connect All Points, Cheapest Flights Within K Stops | design + lab/project |
| [154 Sun](#day-154) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-148"></a>

## Day 148 · Monday · Mon 22 Mar 2027
**No-IDE coding** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Your English stalls mid-answer. What do you do?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Count Good Nodes in Binary Tree (1448)](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) · Medium; [Subtree of Another Tree (572)](https://leetcode.com/problems/subtree-of-another-tree/) · Easy
   - Done when: Both in a plain editor with a dry run before 'submitting'.
3. **Coding without autocomplete; 'make it faster'; stating complexity — 40 min.**
   - Read: [M6 Q5. How do you handle "can you make it faster?" when you think it is optimal?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q5); [M6 Q6. How do you code with no autocomplete and no compiler?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q6); [M6 Q8. How do you state complexity so it counts?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q8)
   - Do: Write the code on paper or Notepad; dry-run on the example out loud.
4. **Explain aloud + log — 10 min.** *How do you code with no autocomplete and no compiler?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-149"></a>

## Day 149 · Tuesday · Tue 23 Mar 2027
**LLD drill** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you code with no autocomplete and no compiler?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Course Schedule (207)](https://leetcode.com/problems/course-schedule/) · Medium; [Course Schedule II (210)](https://leetcode.com/problems/course-schedule-ii/) · Medium
   - Done when: Both re-solved cold in under 20 minutes.
3. **LLD drill: task scheduler — priorities, delays, recurring tasks, worker threads — 40 min.**
   - Read: [LLD card: Task scheduler](../DESIGNS.md#lld-task-scheduler); [GAP-09-014 — Design task scheduler](../NOTES/07_LLD_OOP_PATTERNS.md#gap-09-014)
   - Do: Classes + one concurrency decision + one test.
4. **Explain aloud + log — 10 min.** *Where does concurrency appear in a task scheduler?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-150"></a>

## Day 150 · Wednesday · Wed 24 Mar 2027
**Design drill** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Where does concurrency appear in a task scheduler?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Top K Frequent Elements (347)](https://leetcode.com/problems/top-k-frequent-elements/) · Medium; [Top K Frequent Words (692)](https://leetcode.com/problems/top-k-frequent-words/) · Medium
   - Done when: Both re-solved cold.
3. **Design drills: YouTube (upload, transcoding, streaming) and typeahead (trie service, ranking, caching) — 40 min.**
   - Read: [HLD card: Video upload and streaming (YouTube)](../DESIGNS.md#hld-youtube); [HLD card: Search autocomplete / typeahead](../DESIGNS.md#hld-typeahead); [GAP-05-016 — Design search/autocomplete](../NOTES/08_SYSTEM_DESIGN.md#gap-05-016); [GAP-05-022 — Design YouTube](../NOTES/08_SYSTEM_DESIGN.md#gap-05-022)
   - Do: One 20-minute drill for each.
4. **Explain aloud + log — 10 min.** *What separates a passing design from a strong one?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-151"></a>

## Day 151 · Thursday · Thu 25 Mar 2027
**Communication under pressure** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What separates a passing design from a strong one?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Partition Equal Subset Sum (416)](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium; [Target Sum (494)](https://leetcode.com/problems/target-sum/) · Medium
   - Done when: Both re-solved cold.
3. **When English stalls, answer length, recovering a bad answer, questions to ask; aptitude only if a target test needs it — 40 min.**
   - Read: [M6 Q19. Your English stalls mid-answer. What do you do?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q19); [M6 Q20. How long should an answer be?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q20); [M6 Q21. How do you recover an answer that has gone badly?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q21); [M6 Q22. What do you do in the last five minutes when they ask if you have questions?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q22); [M6 Q23. How do you handle a panel or back-to-back onsite fatigue?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q23); [M6 Q24. What is the single highest-value habit this month?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q24); [M6 Q17. What aptitude do you actually need, and what can you skip?](../NOTES/13_INTERVIEW_ROUNDS.md#m6-q17); [When aptitude matters, and a minimal plan](../NOTES/14_APTITUDE_ESTIMATION.md#add-apt-when); [Phrase bank](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-phrasebank)
   - Do: Practise 10 phrases from the phrase bank in a mock answer.
4. **Explain aloud + log — 10 min.** *Your English stalls mid-answer. What do you do?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-152"></a>

## Day 152 · Friday · Fri 26 Mar 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Count Good Nodes in Binary Tree, Subtree of Another Tree, Course Schedule.
   - Then one problem you have not seen, with no pattern hint: [Find if Path Exists in Graph (1971)](https://leetcode.com/problems/find-if-path-exists-in-graph/) · Easy
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *How do you code with no autocomplete and no compiler?* · *Where does concurrency appear in a task scheduler?* · *What separates a passing design from a strong one?* · *Your English stalls mid-answer. What do you do?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Repair day: re-solve every no-IDE failure.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Video-on-demand streaming (Netflix)](../DESIGNS.md#hld-netflix); [LLD card: Learning management system](../DESIGNS.md#lld-lms)

---

<a id="day-153"></a>

## Day 153 · Saturday · Sat 27 Mar 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Plain-editor round (45 minutes) plus a verbal dry run; then a peer mock if available.
   - Solve: [Min Cost to Connect All Points (1584)](https://leetcode.com/problems/min-cost-to-connect-all-points/) · Medium; [Cheapest Flights Within K Stops (787)](https://leetcode.com/problems/cheapest-flights-within-k-stops/) · Medium
3. **Design — 90 min.** LLD mock: rate limiter or parking lot with a change request.
   - Use: [LLD card: Rate limiter / API throttling with a controllable clock](../DESIGNS.md#lld-rate-limiter-lld); [LLD card: Parking lot](../DESIGNS.md#lld-parking-lot)
4. **Lab / project — 90 min.** Project: rehearse deployment and rollback from your own documentation.
   - Use: [9. README sections](../PROJECT.md#project-readme); [CD: deployment and release safety](../NOTES/10_ENGINEERING_PRACTICE.md#add-cd)
5. **English — 20 min.** Record 2 minutes: 'my biggest technical challenge'.

---

<a id="day-154"></a>

## Day 154 · Sunday · Sun 28 Mar 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *How do you code with no autocomplete and no compiler?* · *Where does concurrency appear in a task scheduler?* · *What separates a passing design from a strong one?* · *Your English stalls mid-answer. What do you do?*
   - Solve cold (25 minutes each): [Course Schedule (207)](https://leetcode.com/problems/course-schedule/) · Medium; [Partition Equal Subset Sum (416)](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium
   - Sketch in 10–15 minutes: LLD mock: rate limiter or parking lot with a change request.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Weekly review and application follow-ups.
   - Use: [The application pipeline method](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-applications)
4. **Behavioral — 45 min.** Mock: failure and ambiguity stories; check every number is verified.
   - Use: [GAP-08-001 — Tell me about your biggest failure.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-001); [GAP-08-010 — Tell me about a time you had an ambiguous problem.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-010); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Music streaming (Spotify)](../DESIGNS.md#hld-spotify); [LLD card: Payment system](../DESIGNS.md#lld-payment-lld)

---

[← Week 21](WEEK_21.md) · [The plan](../PLAN.md) · [Week 23 →](WEEK_23.md)
