# Week 25 — Kafka and streaming · weak-family repair · AI increment begins

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 24](WEEK_24.md) [Week 26 →](WEEK_26.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 169–175 · default dates Mon 12 Apr 2027 – Sun 18 Apr 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Repair the weakest family; advanced strings (extension)  
**Core this week:** Kafka in depth, stream processing, schema evolution

**Goal:** Explain replay, ordering and late data, verify one message-compatibility scenario, and keep core DSA improving.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Your weakest DSA family shows fewer failures than in Week 24.
- [ ] You can explain partitions, consumer groups, rebalancing, acks/ISR and the limits of Kafka EOS.
- [ ] An old message is processed by a new worker version (compatibility test).
- [ ] Ad-click aggregation design done.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [169 Mon](#day-169) | Weak-family repair | Minimum Window Substring, Longest Substring Without Repeating Characters | Kafka: when it beats SQS, consumer-group rebalancing, ordering |
| [170 Tue](#day-170) | Advanced strings (extension) | Find the Index of the First Occurrence in a String, KMP prefix function (LPS) by hand, then code | Log compaction, ISR and acks, exactly-once semantics; commits, poison messages |
| [171 Wed](#day-171) | Greedy vs DP | Coin Change, Jump Game | Stream processing: event time vs processing time, watermarks, windows |
| [172 Thu](#day-172) | Timed maintenance | Repeated String Match, Longest Happy Prefix | Approximate counting, backfill and replay; schema evolution and Schema Registry |
| [173 Fri](#day-173) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [174 Sat](#day-174) | Deep work (5 h) | Is Graph Bipartite?, Implement Bellman-Ford with negative-cycle detection | design + lab/project |
| [175 Sun](#day-175) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-169"></a>

## Day 169 · Monday · Mon 12 Apr 2027
**Weak-family repair** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Why is replay a design requirement?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Minimum Window Substring (76)](https://leetcode.com/problems/minimum-window-substring/) · Hard; [Longest Substring Without Repeating Characters (3)](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium
   - Done when: Primitive from memory, then an unseen variation.
3. **Kafka: when it beats SQS, consumer-group rebalancing, ordering — 40 min.**
   - Read: [M7 Q1. When does Kafka beat SQS, concretely?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q1); [M7 Q2. Explain consumer group rebalancing and why it hurts.](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q2); [M7 Q3. How does Kafka guarantee ordering, and what is the limit?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q3); [GAP-04-001 — Kafka partition vs consumer — how does parallelism work?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-001); [GAP-04-002 — What happens when there are more consumers than partitions?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-002); [GAP-04-003 — What happens when there are fewer consumers than partitions?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-003); [Kafka essentials — cheat sheet](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#add-kafka-cheatsheet)
   - Do: Draw a topic with 3 partitions and 2 consumer groups; show what a rebalance does.
4. **Explain aloud + log — 10 min.** *When does Kafka beat SQS, concretely?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-170"></a>

## Day 170 · Tuesday · Tue 13 Apr 2027
**Advanced strings (extension)** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *When does Kafka beat SQS, concretely?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Find the Index of the First Occurrence in a String (28)](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) · Easy; [KMP prefix function (LPS) by hand, then code](../PROBLEMS.md#x-kmp) · own exercise *(extension)*
   - Done when: KMP LPS array built by hand for 'aabaaab'.
3. **Log compaction, ISR and acks, exactly-once semantics; commits, poison messages — 40 min.**
   - Read: [M7 Q4. What is log compaction and when do you want it?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q4); [M7 Q5. What are ISR and acks, and how do they relate to durability?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q5); [M7 Q6. Kafka claims exactly-once semantics. Is that a contradiction?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q6); [GAP-04-004 — Kafka offset management — auto commit vs manual commit?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-004); [GAP-04-005 — What happens if a consumer crashes after processing but before committing …](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-005); [GAP-04-006 — How do you implement idempotent Kafka consumers?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-006); [GAP-04-007 — Kafka retention vs log compaction?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-007); [GAP-04-008 — Kafka producer batching and compression?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-008); [GAP-04-009 — What is a poison message in streaming?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-009)
   - Do: Write the crash-after-process-before-commit timeline and how an idempotent consumer handles it.
4. **Explain aloud + log — 10 min.** *Kafka claims exactly-once semantics. Is that a contradiction?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-171"></a>

## Day 171 · Wednesday · Wed 14 Apr 2027
**Greedy vs DP** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Kafka claims exactly-once semantics. Is that a contradiction?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Coin Change (322)](https://leetcode.com/problems/coin-change/) · Medium; [Jump Game (55)](https://leetcode.com/problems/jump-game/) · Medium
   - Done when: One case where greedy works and one where it fails, with a counterexample.
3. **Stream processing: event time vs processing time, watermarks, windows — 40 min.**
   - Read: [M7 Q7. Why is event time harder than processing time?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q7); [M7 Q8. What is a watermark?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q8); [M7 Q9. Tumbling, sliding or session windows?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q9); [Stream processing essentials — cheat sheet](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#add-stream-cheatsheet)
   - Do: Explain the three ways to handle late data for a 1-minute tumbling window.
4. **Explain aloud + log — 10 min.** *What is a watermark?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-172"></a>

## Day 172 · Thursday · Thu 15 Apr 2027
**Timed maintenance** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What is a watermark?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Repeated String Match (686)](https://leetcode.com/problems/repeated-string-match/) · Medium *(extension)*; [Longest Happy Prefix (1392)](https://leetcode.com/problems/longest-happy-prefix/) · Hard *(extension)*
   - Done when: Extension problems attempted with a timer; core problem re-solved if they fail.
3. **Approximate counting, backfill and replay; schema evolution and Schema Registry — 40 min.**
   - Read: [M7 Q10. How do you count distinct users at scale without exact state?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q10); [M7 Q11. What is backfill, and why is replay a design requirement?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#m7-q11); [GAP-04-010 — How do you handle schema evolution?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-010); [GAP-04-011 — What is Schema Registry and why is it useful?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-011); [GAP-04-012 — What is exactly-once processing when an external database is involved?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-012); [GAP-04-013 — Kafka vs RabbitMQ vs SQS vs Pub/Sub — when would you choose each?](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#gap-04-013); [API and message schema evolution](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#add-schema-evolution)
   - Do: Add a field to your job message; make the new worker accept the old message and the old worker ignore the new field.
4. **Explain aloud + log — 10 min.** *Why is replay a design requirement?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-173"></a>

## Day 173 · Friday · Fri 16 Apr 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Minimum Window Substring, Longest Substring Without Repeating Characters, Find the Index of the First Occurrence in a String.
   - Then one problem you have not seen, with no pattern hint: [Shortest Palindrome (214)](https://leetcode.com/problems/shortest-palindrome/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *When does Kafka beat SQS, concretely?* · *Kafka claims exactly-once semantics. Is that a contradiction?* · *What is a watermark?* · *Why is replay a design requirement?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard: Shortest Palindrome. Otherwise repair the weakest family again.

*Optional extra design drill (20 min, only if the repair is done):* [HLD card: Real-time leaderboard](../DESIGNS.md#hld-leaderboard); [LLD card: Circuit breaker](../DESIGNS.md#lld-circuit-breaker)

---

<a id="day-174"></a>

## Day 174 · Saturday · Sat 17 Apr 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Bipartite check and Bellman-Ford re-implemented from memory; one mixed mock.
   - Solve: [Is Graph Bipartite? (785)](https://leetcode.com/problems/is-graph-bipartite/) · Medium; [Implement Bellman-Ford with negative-cycle detection](../PROBLEMS.md#x-bellman-ford) · own exercise *(extension)*
3. **Design — 90 min.** Ad-click aggregation HLD: event ingestion, dedup, windowed counts, late events, reconciliation with a batch job.
   - Use: [HLD card: Ad-click aggregation (stream processing)](../DESIGNS.md#hld-ad-click-aggregation)
4. **Lab / project — 90 min.** PROJECT M11 (AI increment, phase 1): a DOCUMENT_INDEXING job type on your existing worker — extract text, chunk it, store chunks with tenant_id. No LLM yet.
   - Use: [M11 — AI increment (Weeks 25–28)](../PROJECT.md#project-m11); [RAG build checklist (.NET + PostgreSQL/pgvector)](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-rag-build)
5. **English — 20 min.** Record 2 minutes: 'event time vs processing time'.

---

<a id="day-175"></a>

## Day 175 · Sunday · Sun 18 Apr 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *When does Kafka beat SQS, concretely?* · *Kafka claims exactly-once semantics. Is that a contradiction?* · *What is a watermark?* · *Why is replay a design requirement?*
   - Solve cold (25 minutes each): [Find the Index of the First Occurrence in a String (28)](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) · Easy; [Repeated String Match (686)](https://leetcode.com/problems/repeated-string-match/) · Medium *(extension)*
   - Sketch in 10–15 minutes: Ad-click aggregation HLD: event ingestion, dedup, windowed counts, late events, reconciliation with a batch job.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Message-compatibility test in the project (old message, new worker).
   - Use: [API and message schema evolution](../NOTES/09_ADVANCED_DISTRIBUTED_STREAMING.md#add-schema-evolution); [M11 — AI increment (Weeks 25–28)](../PROJECT.md#project-m11)
4. **Behavioral — 45 min.** Technical deep dive with uncertainty: practise 'I don't know, but here is how I would find out'.
   - Use: [M5 Q23. The interviewer keeps asking "why" until you run out. What do you do?](../NOTES/12_BEHAVIORAL_ENGLISH.md#m5-q23); [Phrase bank](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-phrasebank)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [HLD card: Distributed unique ID generator (Snowflake)](../DESIGNS.md#hld-id-generator); [LLD card: Retry with backoff](../DESIGNS.md#lld-retry-backoff)

---

[← Week 24](WEEK_24.md) · [The plan](../PLAN.md) · [Week 26 →](WEEK_26.md)
