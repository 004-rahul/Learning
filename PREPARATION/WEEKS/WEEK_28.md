# Week 28 — RAG evaluation and MCP · hard problems in owned patterns

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 27](WEEK_27.md) [Week 29 →](WEEK_29.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 190–196 · default dates Mon 03 May 2027 – Sun 09 May 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Coding mocks; selected hard problems only in patterns you own  
**Core this week:** Grounded generation, prompt injection, tenant security, MCP, AI operations

**Goal:** Produce an honest RAG evaluation with negative security tests, and make no AI claims beyond implemented evidence.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Grounded answers with citations and abstention when context is missing.
- [ ] Six negative security tests pass (prompt injection, cross-tenant retrieval).
- [ ] Object storage (S3-like) and Dropbox designs done.
- [ ] Month 7 checkpoint completed.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [190 Mon](#day-190) | Coding mock one | Largest Rectangle in Histogram, Trapping Rain Water | Grounded answers, citations, abstention; retrieval vs generation failures |
| [191 Tue](#day-191) | Repair one repeated bug | Reverse Nodes in k-Group, Sliding Window Maximum | Prompt injection, tenant access, document permissions |
| [192 Wed](#day-192) | Coding mock two | Binary Tree Maximum Path Sum, Serialize and Deserialize Binary Tree | MCP: host/client/server, tools/resources/prompts, transports, security |
| [193 Thu](#day-193) | Code review exercise | LFU Cache, LRU Cache | AI operations: latency, cost, observability, model/index changes |
| [194 Fri](#day-194) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [195 Sat](#day-195) | Deep work (5 h) | Partition to K Equal Sum Subsets, Shortest Path Visiting All Nodes | design + lab/project |
| [196 Sun](#day-196) | CHECKPOINT · Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-190"></a>

## Day 190 · Monday · Mon 03 May 2027
**Coding mock one** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you control the cost of an LLM feature?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Largest Rectangle in Histogram (84)](https://leetcode.com/problems/largest-rectangle-in-histogram/) · Hard; [Trapping Rain Water (42)](https://leetcode.com/problems/trapping-rain-water/) · Hard
   - Done when: Hard problems only in patterns you already own.
3. **Grounded answers, citations, abstention; retrieval vs generation failures — 40 min.**
   - Read: [RAG evaluation in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-eval); [The concepts that separate real understanding from tutorial knowledge](../NOTES/11_AI_LLM_RAG_MCP.md#s12-the-concepts-that-separate-real-understanding-from-tutorial-)
   - Do: Add generation with citations and an 'I don't know' path; classify 5 failures with the 4-way taxonomy.
4. **Explain aloud + log — 10 min.** *Why must a RAG system be able to say 'I don't know'?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-191"></a>

## Day 191 · Tuesday · Tue 04 May 2027
**Repair one repeated bug** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Why must a RAG system be able to say 'I don't know'?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Reverse Nodes in k-Group (25)](https://leetcode.com/problems/reverse-nodes-in-k-group/) · Hard; [Sliding Window Maximum (239)](https://leetcode.com/problems/sliding-window-maximum/) · Hard
   - Done when: Your most repeated mistake category, fixed with a small task and a variation.
3. **Prompt injection, tenant access, document permissions — 40 min.**
   - Read: [LLM and RAG security](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-security)
   - Do: Write the six negative tests (injected instructions in a document; cross-tenant query).
4. **Explain aloud + log — 10 min.** *How do you stop a malicious document from making the model do something?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-192"></a>

## Day 192 · Wednesday · Wed 05 May 2027
**Coding mock two** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you stop a malicious document from making the model do something?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Binary Tree Maximum Path Sum (124)](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · Hard; [Serialize and Deserialize Binary Tree (297)](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) · Hard
   - Done when: Narrated, timed.
3. **MCP: host/client/server, tools/resources/prompts, transports, security — 40 min.**
   - Read: [BASIC-046 — What are tool calling, MCP, structured output and prompt injection?](../NOTES/00_START_FROM_ZERO.md#basic-046); [Track D - MCP (Model Context Protocol)](../NOTES/11_AI_LLM_RAG_MCP.md#s12-track-d-mcp-model-context-protocol); [MCP in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-mcp)
   - Do: Optional: expose a read-only get_job_status MCP tool for your project.
4. **Explain aloud + log — 10 min.** *Tools, resources and prompts in MCP — who controls each?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-193"></a>

## Day 193 · Thursday · Thu 06 May 2027
**Code review exercise** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Tools, resources and prompts in MCP — who controls each?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [LFU Cache (460)](https://leetcode.com/problems/lfu-cache/) · Hard *(extension)*; [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) · Medium
   - Done when: LFU as an extension; LRU cold.
3. **AI operations: latency, cost, observability, model/index changes — 40 min.**
   - Read: [Building LLM features in .NET](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-dotnet); ["How do you use AI tools?" — answer framework](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-interview)
   - Do: Add token/latency logging to your AI job type (no secrets, no PII).
4. **Explain aloud + log — 10 min.** *How do you control the cost of an LLM feature?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-194"></a>

## Day 194 · Friday · Fri 07 May 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Largest Rectangle in Histogram, Trapping Rain Water, Reverse Nodes in k-Group.
   - Then one problem you have not seen, with no pattern hint: [Burst Balloons (312)](https://leetcode.com/problems/burst-balloons/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *Why must a RAG system be able to say 'I don't know'?* · *How do you stop a malicious document from making the model do something?* · *Tools, resources and prompts in MCP — who controls each?* · *How do you control the cost of an LLM feature?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard: Burst Balloons (interval DP). Otherwise repair.

*Optional extra design drill (20 min, only if the repair is done):* [LLD card: Notification system](../DESIGNS.md#lld-notification-lld); [LLD card: Recommendation engine](../DESIGNS.md#lld-recommendation-lld)

---

<a id="day-195"></a>

## Day 195 · Saturday · Sat 08 May 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** A weak family with an unseen prompt (45 minutes) + a re-solve.
   - Solve: [Partition to K Equal Sum Subsets (698)](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) · Medium *(extension)*; [Shortest Path Visiting All Nodes (847)](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) · Hard *(extension)*
3. **Design — 90 min.** Object storage (S3-like) and file storage/sync (Dropbox) HLDs: metadata vs data, chunking, durability, erasure coding.
   - Use: [HLD card: Object storage (S3-like)](../DESIGNS.md#hld-object-storage); [HLD card: File storage and sync (Dropbox / Google Drive)](../DESIGNS.md#hld-dropbox); [GAP-05-007 — Design file storage / Dropbox](../NOTES/08_SYSTEM_DESIGN.md#gap-05-007)
4. **Lab / project — 90 min.** PROJECT M11 phase 4: bounded generation, evaluation report, negative security tests; optional read-only MCP tool.
   - Use: [M11 — AI increment (Weeks 25–28)](../PROJECT.md#project-m11); [MCP in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-mcp)
5. **English — 20 min.** Record 2 minutes: 'where my AI feature fails and why it is small'.

---

<a id="day-196"></a>

## Day 196 · Sunday · Sun 09 May 2027
**Test, review, project, stories** · 300 minutes

1. **Month 7 checkpoint — 90 min (replaces the weekly test).**
   - [ ] Honest RAG evaluation with numbers you measured, plus the negative security tests.
   - [ ] M7 checklist answered aloud (link above).
   - [ ] One design evolved to two regions.
   - [ ] Timed coding stable; the WEAK sheet shows fewer repeat failures than Week 24.
   - [ ] If interviews are running: every interview has a written analysis with a dated repair.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Month 7 test (see checkpoint).
   - Use: [M7 PART F - The Month 7 checklist](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m7-part-f); [M7 — how to use it on a bad week](../NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#m7-guide)
4. **Behavioral — 45 min.** Where the AI feature fails, and why it stays small: an honest answer.
   - Use: ["How do you use AI tools?" — answer framework](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-interview); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [LLD card: Pub/sub message broker (in-memory)](../DESIGNS.md#lld-pub-sub); [LLD card: Event-driven producer-consumer](../DESIGNS.md#lld-producer-consumer)

---

[← Week 27](WEEK_27.md) · [The plan](../PLAN.md) · [Week 29 →](WEEK_29.md)
