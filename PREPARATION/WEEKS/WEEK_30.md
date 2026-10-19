# Week 30 — Full mock loops and final gap repair · oral revision

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 29](WEEK_29.md) [Week 31 →](WEEK_31.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 204–210 · default dates Mon 17 May 2027 – Sun 23 May 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Coding rounds with follow-ups  
**Core this week:** 45-minute oral monologues: C#/.NET, databases, networking/OS, distributed systems

**Goal:** Complete a mock loop, name the top three gaps, and give specific repair tasks — no broad restart.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] A full mock loop completed with written feedback.
- [ ] Four 45-minute oral monologues recorded.
- [ ] Top three gaps with dated repair tasks.
- [ ] Redo of two designs done.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [204 Mon](#day-204) | Coding round one | Median of Two Sorted Arrays, Split Array Largest Sum | Oral monologue: C# and .NET (45 minutes, recorded) |
| [205 Tue](#day-205) | Repair round one | Count of Smaller Numbers After Self, Sliding Window Maximum | Oral monologue: databases |
| [206 Wed](#day-206) | Coding round two | Critical Connections in a Network, Swim in Rising Water | Oral monologue: networking and OS |
| [207 Thu](#day-207) | Experience and debugging round | Insert Delete GetRandom O(1), Time Based Key-Value Store | Oral monologue: distributed systems; resume and application refresh |
| [208 Fri](#day-208) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [209 Sat](#day-209) | Deep work (5 h) | Minimum Window Substring, Longest Valid Parentheses | design + lab/project |
| [210 Sun](#day-210) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-204"></a>

## Day 204 · Monday · Mon 17 May 2027
**Coding round one** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Explain at-least-once delivery and idempotency.* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Median of Two Sorted Arrays (4)](https://leetcode.com/problems/median-of-two-sorted-arrays/) · Hard *(extension)*; [Split Array Largest Sum (410)](https://leetcode.com/problems/split-array-largest-sum/) · Hard
   - Done when: Independent unseen task with a follow-up.
3. **Oral monologue: C# and .NET (45 minutes, recorded) — 40 min.**
   - Read: [PART 7 - The 45-minute oral revision outlines](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-7-the-45-minute-oral-revision-outlines); [PART 1 - C# and the runtime, one line each](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-1-c-and-the-runtime-one-line-each)
   - Do: Record the monologue; list what you could not explain.
4. **Explain aloud + log — 10 min.** *Explain the .NET request pipeline end to end.* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-205"></a>

## Day 205 · Tuesday · Tue 18 May 2027
**Repair round one** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Explain the .NET request pipeline end to end.* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Count of Smaller Numbers After Self (315)](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) · Hard *(extension)*; [Sliding Window Maximum (239)](https://leetcode.com/problems/sliding-window-maximum/) · Hard
   - Done when: Reproduce yesterday's failure cause; fresh variant.
3. **Oral monologue: databases — 40 min.**
   - Read: [PART 2 - Databases, one line each](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-2-databases-one-line-each); [PostgreSQL vs SQL Server: the differences that matter](../NOTES/04_SQL_DATABASES.md#add-sql-pg-vs-sqlserver)
   - Do: Record; list gaps.
4. **Explain aloud + log — 10 min.** *Explain isolation levels per engine.* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-206"></a>

## Day 206 · Wednesday · Wed 19 May 2027
**Coding round two** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Explain isolation levels per engine.* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Critical Connections in a Network (1192)](https://leetcode.com/problems/critical-connections-in-a-network/) · Hard *(extension)*; [Swim in Rising Water (778)](https://leetcode.com/problems/swim-in-rising-water/) · Hard
   - Done when: Different family, same evaluation.
3. **Oral monologue: networking and OS — 40 min.**
   - Read: [PART 3 - Networking, OS and distributed systems, one line each](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-3-networking-os-and-distributed-systems-one-line-each)
   - Do: Record; list gaps.
4. **Explain aloud + log — 10 min.** *What happens when you type a URL?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-207"></a>

## Day 207 · Thursday · Thu 20 May 2027
**Experience and debugging round** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What happens when you type a URL?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Insert Delete GetRandom O(1) (380)](https://leetcode.com/problems/insert-delete-getrandom-o1/) · Medium; [Time Based Key-Value Store (981)](https://leetcode.com/problems/time-based-key-value-store/) · Medium
   - Done when: Re-solved cold.
3. **Oral monologue: distributed systems; resume and application refresh — 40 min.**
   - Read: [PART 6 - Why X and not Y (the follow-up bank)](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-6-why-x-and-not-y-the-follow-up-bank); [Contradictions still in this chapter, and which instruction wins](../NOTES/16_CAREER_APPLICATIONS_RELOCATION.md#add-career-consistency)
   - Do: Record; refresh the application list.
4. **Explain aloud + log — 10 min.** *Explain at-least-once delivery and idempotency.* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-208"></a>

## Day 208 · Friday · Fri 21 May 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Median of Two Sorted Arrays, Split Array Largest Sum, Count of Smaller Numbers After Self.
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Explain the .NET request pipeline end to end.* · *Explain isolation levels per engine.* · *What happens when you type a URL?* · *Explain at-least-once delivery and idempotency.* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Repair day: the top three gaps from the monologues.

*Optional extra design drill (20 min, only if the repair is done):* [LLD card: Traffic light controller](../DESIGNS.md#lld-traffic-light)

---

<a id="day-209"></a>

## Day 209 · Saturday · Sat 22 May 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Simulated loop: 45-minute coding round.
   - Solve: [Minimum Window Substring (76)](https://leetcode.com/problems/minimum-window-substring/) · Hard; [Longest Valid Parentheses (32)](https://leetcode.com/problems/longest-valid-parentheses/) · Hard *(extension)*
3. **Design — 90 min.** 45-minute design mock with a partner, then redo two weak designs.
   - Use: [How to practise system design](../NOTES/08_SYSTEM_DESIGN.md#add-sd-practice); [HLD card: News feed (Facebook / Twitter timeline)](../DESIGNS.md#hld-news-feed); [HLD card: Chat and messaging (WhatsApp / Slack)](../DESIGNS.md#hld-chat)
4. **Lab / project — 90 min.** Project-defense rehearsal with a probing partner.
   - Use: [11. Defense questions to rehearse](../PROJECT.md#project-defense)
5. **English — 20 min.** Record 2 minutes: 'my biggest failure'.

---

<a id="day-210"></a>

## Day 210 · Sunday · Sun 23 May 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Explain the .NET request pipeline end to end.* · *Explain isolation levels per engine.* · *What happens when you type a URL?* · *Explain at-least-once delivery and idempotency.*
   - Solve cold (25 minutes each): [Count of Smaller Numbers After Self (315)](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) · Hard *(extension)*; [Insert Delete GetRandom O(1) (380)](https://leetcode.com/problems/insert-delete-getrandom-o1/) · Medium
   - Sketch in 10–15 minutes: 45-minute design mock with a partner, then redo two weak designs.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Write the top three gaps and their repair tasks for Week 31.
   - Use: [PART 8 - Final self-test](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m8-part-8-final-self-test)
4. **Behavioral — 45 min.** Three random behavioral questions with deep follow-ups.
   - Use: [GAP-08-026 — Tell me about a project that failed.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-026); [GAP-08-029 — Tell me about a time you disagreed with a product/business requirement.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-029); [GAP-08-030 — Tell me about a time you had to say no.](../NOTES/12_BEHAVIORAL_ENGLISH.md#gap-08-030)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [LLD card: Meeting room scheduler](../DESIGNS.md#lld-meeting-scheduler)

---

[← Week 29](WEEK_29.md) · [The plan](../PLAN.md) · [Week 31 →](WEEK_31.md)
