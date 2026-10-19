# Week 27 — Retrieval and AI · company-style practice

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 26](WEEK_26.md) [Week 28 →](WEEK_28.md)

**Phase 5 — Advanced depth, conversion and continuation** · Days 183–189 · default dates Mon 26 Apr 2027 – Sun 02 May 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Timed maintenance; one re-solve each of graph and DP  
**Core this week:** AI-assisted development, LLM basics, RAG pipeline, embeddings, hybrid search, evaluation

**Goal:** Run a bounded retrieval experiment with a corpus, labels, a baseline and failure examples — without weakening core practice.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] 20–30 labelled questions; recall@k and MRR measured for a baseline.
- [ ] One variable changed (chunk size or hybrid search) and the result compared honestly.
- [ ] Proximity and Uber designs done.
- [ ] Core DSA timed practice continued every weekday.

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [183 Mon](#day-183) | Mixed maintenance | Number of Islands, Kth Largest Element in an Array | AI-assisted development and LLM basics for a backend engineer |
| [184 Tue](#day-184) | Weakness transfer test | Search Suggestions System, Design Add and Search Words Data Structure | RAG: the pipeline stage by stage; why chunking matters |
| [185 Wed](#day-185) | Prefix problems | Word Search II, Maximum XOR of Two Numbers in an Array | Embeddings, similarity, vector indexes, pgvector |
| [186 Thu](#day-186) | Mock with real tools | Longest Increasing Path in a Matrix, Longest Consecutive Sequence | Hybrid search (BM25 + vector, RRF), reranking, evaluation |
| [187 Fri](#day-187) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [188 Sat](#day-188) | Deep work (5 h) | Course Schedule, Word Break | design + lab/project |
| [189 Sun](#day-189) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-183"></a>

## Day 183 · Monday · Mon 26 Apr 2027
**Mixed maintenance** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you evaluate a RAG system?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Number of Islands (200)](https://leetcode.com/problems/number-of-islands/) · Medium; [Kth Largest Element in an Array (215)](https://leetcode.com/problems/kth-largest-element-in-an-array/) · Medium
   - Done when: Both re-solved cold under 20 minutes.
3. **AI-assisted development and LLM basics for a backend engineer — 40 min.**
   - Read: [BASIC-045 — What are tokens, context, embeddings, RAG and fine-tuning?](../NOTES/00_START_FROM_ZERO.md#basic-045); [Concept glossary (one line each)](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-concepts); [Building LLM features in .NET](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-dotnet); [Track A - AI-assisted development as an engineering practice](../NOTES/11_AI_LLM_RAG_MCP.md#s12-track-a-ai-assisted-development-as-an-engineering-practice); [Track B - LLM fundamentals (only what a backend engineer needs)](../NOTES/11_AI_LLM_RAG_MCP.md#s12-track-b-llm-fundamentals-only-what-a-backend-engineer-needs)
   - Do: Make one bounded LLM call from .NET with a timeout, validated JSON output and logged latency.
4. **Explain aloud + log — 10 min.** *How do you use AI tools, and how do you verify their output?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-184"></a>

## Day 184 · Tuesday · Tue 27 Apr 2027
**Weakness transfer test** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *How do you use AI tools, and how do you verify their output?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Search Suggestions System (1268)](https://leetcode.com/problems/search-suggestions-system/) · Medium; [Design Add and Search Words Data Structure (211)](https://leetcode.com/problems/design-add-and-search-words-data-structure/) · Medium
   - Done when: A new variant of the most recently repaired pattern.
3. **RAG: the pipeline stage by stage; why chunking matters — 40 min.**
   - Read: [Track C - RAG (Retrieval Augmented Generation)](../NOTES/11_AI_LLM_RAG_MCP.md#s12-track-c-rag-retrieval-augmented-generation); [The pipeline, stage by stage](../NOTES/11_AI_LLM_RAG_MCP.md#s12-the-pipeline-stage-by-stage); [M7 Q22. What is actually hard about building a RAG service?](../NOTES/11_AI_LLM_RAG_MCP.md#m7-q22); [M7 Q23. Why is chunking the main quality lever?](../NOTES/11_AI_LLM_RAG_MCP.md#m7-q23)
   - Do: Run two chunk sizes over the same corpus and compare retrieved results by hand.
4. **Explain aloud + log — 10 min.** *What is actually hard about building a RAG service?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-185"></a>

## Day 185 · Wednesday · Wed 28 Apr 2027
**Prefix problems** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *What is actually hard about building a RAG service?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Word Search II (212)](https://leetcode.com/problems/word-search-ii/) · Hard; [Maximum XOR of Two Numbers in an Array (421)](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) · Medium *(extension)*
   - Done when: Trie problems re-solved; Max XOR as an extension.
3. **Embeddings, similarity, vector indexes, pgvector — 40 min.**
   - Read: [M7 Q24. Why pgvector rather than a dedicated vector database?](../NOTES/11_AI_LLM_RAG_MCP.md#m7-q24); [RAG build checklist (.NET + PostgreSQL/pgvector)](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-rag-build)
   - Do: Add an HNSW index; measure query time before and after on your corpus.
4. **Explain aloud + log — 10 min.** *Why pgvector rather than a dedicated vector database?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-186"></a>

## Day 186 · Thursday · Thu 29 Apr 2027
**Mock with real tools** · 120 minutes (interview-phase rhythm)

1. **Recall — 10 min.** Explain aloud: *Why pgvector rather than a dedicated vector database?* Then one WEAK item.
2. **Timed DSA — 60 min.** Two problems, 25 minutes each, talking aloud the whole time; 10 minutes to review and log root causes.
   - Solve: [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard; [Longest Consecutive Sequence (128)](https://leetcode.com/problems/longest-consecutive-sequence/) · Medium
   - Done when: Timed in the editor your target company uses.
3. **Hybrid search (BM25 + vector, RRF), reranking, evaluation — 40 min.**
   - Read: [M7 Q25. How do you evaluate a RAG system?](../NOTES/11_AI_LLM_RAG_MCP.md#m7-q25); [RAG evaluation in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-eval)
   - Do: Measure recall@5 and MRR for your 20–30 labelled questions.
4. **Explain aloud + log — 10 min.** *How do you evaluate a RAG system?* Update DAILY, DSA_LOG, APPLY/INTERVIEWS if anything moved.

---

<a id="day-187"></a>

## Day 187 · Friday · Fri 30 Apr 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Number of Islands, Kth Largest Element in an Array, Search Suggestions System.
   - Then one problem you have not seen, with no pattern hint: [Critical Connections in a Network (1192)](https://leetcode.com/problems/critical-connections-in-a-network/) · Hard *(extension)*
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *How do you use AI tools, and how do you verify their output?* · *What is actually hard about building a RAG service?* · *Why pgvector rather than a dedicated vector database?* · *How do you evaluate a RAG system?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Optional hard; otherwise repair.

*Optional extra design drill (20 min, only if the repair is done):* [LLD card: Snake and ladder](../DESIGNS.md#lld-snake-ladder); [LLD card: Role-based access control (RBAC)](../DESIGNS.md#lld-rbac)

---

<a id="day-188"></a>

## Day 188 · Saturday · Sat 01 May 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Re-solve one graph and one DP problem from memory.
   - Solve: [Course Schedule (207)](https://leetcode.com/problems/course-schedule/) · Medium; [Word Break (139)](https://leetcode.com/problems/word-break/) · Medium
3. **Design — 90 min.** Proximity service (Yelp/nearby) and Uber matching HLDs: geohash/quadtree, location updates, matching.
   - Use: [HLD card: Proximity / nearby search (Yelp, Google Maps nearby)](../DESIGNS.md#hld-proximity); [HLD card: Ride sharing and matching (Uber)](../DESIGNS.md#hld-uber); [GAP-05-024 — Design Google Maps / nearby places](../NOTES/08_SYSTEM_DESIGN.md#gap-05-024); [GAP-05-028 — Design ride matching](../NOTES/08_SYSTEM_DESIGN.md#gap-05-028); [GAP-05-009 — Design Uber](../NOTES/08_SYSTEM_DESIGN.md#gap-05-009)
4. **Lab / project — 90 min.** PROJECT M11 phase 3: retrieval baseline with 20–30 labelled questions; recall@k recorded in the README with method and environment.
   - Use: [M11 — AI increment (Weeks 25–28)](../PROJECT.md#project-m11); [RAG evaluation in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-eval)
5. **English — 20 min.** Record 2 minutes: 'what my RAG experiment showed'.

---

<a id="day-189"></a>

## Day 189 · Sunday · Sun 02 May 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *How do you use AI tools, and how do you verify their output?* · *What is actually hard about building a RAG service?* · *Why pgvector rather than a dedicated vector database?* · *How do you evaluate a RAG system?*
   - Solve cold (25 minutes each): [Search Suggestions System (1268)](https://leetcode.com/problems/search-suggestions-system/) · Medium; [Longest Increasing Path in a Matrix (329)](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard
   - Sketch in 10–15 minutes: Proximity service (Yelp/nearby) and Uber matching HLDs: geohash/quadtree, location updates, matching.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** Write up the retrieval experiment: what changed, what improved, what failed.
   - Use: [RAG evaluation in practice](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-eval)
4. **Behavioral — 45 min.** AI usage story: a real example of using an AI tool at work, how you verified it, where you did not use it.
   - Use: ["How do you use AI tools?" — answer framework](../NOTES/11_AI_LLM_RAG_MCP.md#add-ai-interview); [Your interview answer (draft it in Month 2, refine all the way through)](../NOTES/11_AI_LLM_RAG_MCP.md#s12-your-interview-answer-draft-it-in-month-2-refine-all-the-way)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

*Optional extra design drill (20 min each, pick one):* [LLD card: Hotel booking](../DESIGNS.md#lld-hotel-booking-lld); [LLD card: Web crawler](../DESIGNS.md#lld-web-crawler-lld)

---

[← Week 26](WEEK_26.md) · [The plan](../PLAN.md) · [Week 28 →](WEEK_28.md)
