# Week 29 — Role-specific advanced choice · retrieval from memory

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 28](WEEK_28.md) [Week 30 →](WEEK_30.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 197–203 · default dates Mon 10 May 2027 – Sun 16 May 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Re-solve every failed problem; build a one-page pattern sheet  
**Core this week:** One role-specific extension (Kubernetes or deep .NET diagnostics); algorithm breadth; remaining patterns

**Goal:** Choose and finish one role-specific extension with a concrete output, while core interview performance stays stable.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Every failed problem from DSA_LOG re-solved from memory.
- [ ] One-page pattern sheet (15+ patterns, cues, a template line each) written.
- [ ] One extension with a concrete output (e.g. K8s deployment with probes, or a performance investigation).
- [ ] Redo of URL shortener, rate limiter and notification compared with your Month 3 versions.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [197 Mon](#day-197) | Re-solve failed problems | First Missing Positive, Find the Duplicate Number | Choose the extension: Kubernetes/KEDA or deep .NET diagnostics (by target role) |
| [198 Tue](#day-198) | Pattern sheet | Container With Most Water, 3Sum | Extension lab, part 1 |
| [199 Wed](#day-199) | Algorithm breadth overview | Strongly connected components: Kosaraju and Tarjan, Implement Floyd-Warshall (all pairs) | Search, location and storage breadth |
| [200 Thu](#day-200) | Remaining patterns | Merge Intervals, Non-overlapping Intervals | Remaining patterns: Interpreter and the rest of GoF; CQRS, event sourcing, DDD basics |
| [201 Fri](#day-201) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [202 Sat](#day-202) | Deep work (5 h) | Maximal Rectangle, Matrix chain multiplication (interval DP) | design + lab/project |
| [203 Sun](#day-203) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-197"></a>

## Day 197 · Monday · Mon 10 May 2027
**Re-solve failed problems** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *When is CQRS over-engineering?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [First Missing Positive (41)](https://leetcode.com/problems/first-missing-positive/) · Hard; [Find the Duplicate Number (287)](https://leetcode.com/problems/find-the-duplicate-number/) · Medium
   - Done when: Failed problems from the log, from memory.
3. **Choose the extension: Kubernetes/KEDA or deep .NET diagnostics (by target role) — 40 min.**
   - Read: [Kubernetes basics (OPTIONAL extension)](../NOTES/10_ENGINEERING_PRACTICE.md#add-k8s); [Diagnostics: counters, traces, dumps and benchmarks](../NOTES/02_CSHARP.md#add-cs-diagnostics); [🔹 Phase 4: Containerization, Kubernetes & Production Observability (Weeks 19–20)](../PROJECT.md#f01-phase-4-containerization-kubernetes-production-observability)
   - Do: Write what the extension must produce by Sunday.
4. **Explain aloud + log — 10 min.** *Why did you choose this extension for your target roles?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-198"></a>

## Day 198 · Tuesday · Tue 11 May 2027
**Pattern sheet** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Why did you choose this extension for your target roles?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Container With Most Water (11)](https://leetcode.com/problems/container-with-most-water/) · Medium; [3Sum (15)](https://leetcode.com/problems/3sum/) · Medium
   - Done when: Re-solved cold.
3. **Extension lab, part 1 — 40 min.**
   - Read: [Kubernetes basics (OPTIONAL extension)](../NOTES/10_ENGINEERING_PRACTICE.md#add-k8s); [Diagnostics: counters, traces, dumps and benchmarks](../NOTES/02_CSHARP.md#add-cs-diagnostics)
   - Do: Build the first half of the extension.
4. **Explain aloud + log — 10 min.** *Explain the extension in 2 minutes.* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-199"></a>

## Day 199 · Wednesday · Wed 12 May 2027
**Algorithm breadth overview** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Explain the extension in 2 minutes.* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Strongly connected components: Kosaraju and Tarjan](../PROBLEMS.md#x-scc) · own exercise *(extension)*; [Implement Floyd-Warshall (all pairs)](../PROBLEMS.md#x-floyd) · own exercise *(extension)*
   - Done when: Overview only: SCC, Floyd–Warshall, interval/bitmask DP, segment trees — know when they apply.
3. **Search, location and storage breadth — 40 min.**
   - Read: [HLD card: Search autocomplete / typeahead](../DESIGNS.md#hld-typeahead); [HLD card: Proximity / nearby search (Yelp, Google Maps nearby)](../DESIGNS.md#hld-proximity); [HLD card: Video upload and streaming (YouTube)](../DESIGNS.md#hld-youtube)
   - Do: Pick one of the three designs and redo it with a changed requirement.
4. **Explain aloud + log — 10 min.** *When would you use a trie service vs a search engine?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-200"></a>

## Day 200 · Thursday · Thu 13 May 2027
**Remaining patterns** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *When would you use a trie service vs a search engine?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/) · Medium; [Non-overlapping Intervals (435)](https://leetcode.com/problems/non-overlapping-intervals/) · Medium
   - Done when: Re-solved cold.
3. **Remaining patterns: Interpreter and the rest of GoF; CQRS, event sourcing, DDD basics — 40 min.**
   - Read: [All 23 GoF patterns: table, code for the important ones](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-gof); [Enterprise patterns beyond GoF (.NET backend)](../NOTES/07_LLD_OOP_PATTERNS.md#add-lld-enterprise)
   - Do: Write one Interpreter example (a tiny rule language).
4. **Explain aloud + log — 10 min.** *When is CQRS over-engineering?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-201"></a>

## Day 201 · Friday · Fri 14 May 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: First Missing Positive, Find the Duplicate Number, Container With Most Water.
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why did you choose this extension for your target roles?* · *Explain the extension in 2 minutes.* · *When would you use a trie service vs a search engine?* · *When is CQRS over-engineering?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Finish the one-page pattern sheet.

*Optional extra design drill (20 min, only if the repair is done):* [LLD card: In-memory file system](../DESIGNS.md#lld-file-system)

---

<a id="day-202"></a>

## Day 202 · Saturday · Sat 15 May 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Histogram / monotonic deque or interval DP — or a mixed mock if those are not needed.
   - Solve: [Maximal Rectangle (85)](https://leetcode.com/problems/maximal-rectangle/) · Hard *(extension)*; [Matrix chain multiplication (interval DP)](../PROBLEMS.md#x-mcm) · own exercise *(extension)*
3. **Design — 90 min.** Redo SD1–SD3 (URL shortener, rate limiter, notification) from a blank page; compare with your Month 3 notes.
   - Use: [HLD card: URL shortener (TinyURL)](../DESIGNS.md#hld-url-shortener); [HLD card: Distributed rate limiter](../DESIGNS.md#hld-rate-limiter); [HLD card: Notification service (email/SMS/push)](../DESIGNS.md#hld-notification)
4. **Lab / project — 90 min.** Extension lab, part 2: finish and document it in the README.
   - Use: [Kubernetes basics (OPTIONAL extension)](../NOTES/10_ENGINEERING_PRACTICE.md#add-k8s)
5. **English — 20 min.** Record 2 minutes: 'why I want this role/team'.

---

<a id="day-203"></a>

## Day 203 · Sunday · Sun 16 May 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *Why did you choose this extension for your target roles?* · *Explain the extension in 2 minutes.* · *When would you use a trie service vs a search engine?* · *When is CQRS over-engineering?*
   - Solve cold (25 minutes each): [Container With Most Water (11)](https://leetcode.com/problems/container-with-most-water/) · Medium; [Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/) · Medium
   - Sketch in 10–15 minutes: Redo SD1–SD3 (URL shortener, rate limiter, notification) from a blank page; compare with your Month 3 notes.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Update the README and resume only with what you built and measured.
   - Use: [12. Adding it to your resume (only after M10)](../PROJECT.md#project-resume)
4. **Behavioral — 45 min.** Why this role/team, using verified role information only.
   - Use: [Questions to ask the recruiter and the interviewers](../NOTES/13_INTERVIEW_ROUNDS.md#add-int-recruiter)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [LLD card: Food delivery app](../DESIGNS.md#lld-food-delivery-lld)

---

[← Week 28](WEEK_28.md) · [The plan](../PLAN.md) · [Week 30 →](WEEK_30.md)
