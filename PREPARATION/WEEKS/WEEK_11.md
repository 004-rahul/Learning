# Week 11 — Topological sort and DSU · networking · PROJECT M1

[Start here](../README.md) · [The plan](../PLAN.md) · [← Week 10](WEEK_10.md) [Week 12 →](WEEK_12.md)

**Phase 2 — Core depth and the project starts** · Days 71–77 · default dates Mon 04 Jan 2027 – Sun 10 Jan 2027 (if you start on another Monday, the tracker recalculates every date).

**DSA this week:** Directed cycles, Kahn's algorithm, DSU  
**Core this week:** URL journey, DNS, TCP, TLS, HTTP versions, CORS, WebSockets, OS basics

**Goal:** Detect cycles and produce a topological order, explain a request end to end, and get durable job submission working.

**Evidence by Sunday night (tick when it is true — reading is not enough):**

- [ ] Course Schedule I and II solved; DSU written from memory.
- [ ] The 5-minute 'what happens when you type a URL' narration done without notes.
- [ ] PROJECT M1: an accepted job can be read back after an API restart; illegal state transitions are rejected.
- [ ] Job platform HLD v1 written (requirements, API, schema, state machine).

| Day | Focus | DSA problems | Core / design / project |
|---|---|---|---|
| [71 Mon](#day-71) | Directed cycles | Course Schedule | What happens when you type a URL; DNS resolution |
| [72 Tue](#day-72) | Topological ordering | Course Schedule II | TCP handshake, flow vs congestion control, head-of-line blocking, HTTP/2 and HTTP/3 |
| [73 Wed](#day-73) | Disjoint set union | Implement DSU: find with path compression, union by rank/size, Redundant Connection, Number of Provinces | TLS, what HTTPS does not protect, CORS and preflight, WebSockets |
| [74 Thu](#day-74) | Connectivity by shared identity | Accounts Merge | OS: process vs thread, context switches, virtual memory |
| [75 Fri](#day-75) | Repair and retrieval | re-solves + 1 unseen | re-explain the week |
| [76 Sat](#day-76) | Deep work (5 h) | Alien Dictionary, Graph Valid Tree, Number of Connected Components in an Undirected Graph, Minimum Height Trees | design + lab/project |
| [77 Sun](#day-77) | Test, review, project, stories | — | weekly test, project, behavioral |

---

<a id="day-71"></a>

## Day 71 · Monday · Mon 04 Jan 2027
**Directed cycles** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *How do you change a schema without downtime?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Course Schedule with DFS colours (white/grey/black). Explain directed vs undirected cycle detection.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs); [12. Topological sort](../NOTES/01_DSA.md#dsa-12-topological-sort)
   - Solve: [Course Schedule (207)](https://leetcode.com/problems/course-schedule/) · Medium
   - Done when: A cycle is detected; a DAG returns true. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: What happens when you type a URL; DNS resolution.**
   - Read: [M3 Q1. What happens when you type a URL and press enter?](../NOTES/05_NETWORKING_OS.md#m3-q1); [M3 Q2. Walk through DNS resolution.](../NOTES/05_NETWORKING_OS.md#m3-q2); [BASIC-035 — What networking vocabulary must come before a distributed design?](../NOTES/00_START_FROM_ZERO.md#basic-035); ["What happens when you type a URL": the 5-minute script](../NOTES/05_NETWORKING_OS.md#add-netw-url-journey)
   - Do: Run nslookup / Resolve-DnsName on a site and on your company's domain; read the TTL.
4. **Explain aloud — 5 min.** *What happens when you type a URL and press enter? (5-minute version)* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: re-derive drill: say the DP state sentence for one solved DP problem.

---

<a id="day-72"></a>

## Day 72 · Tuesday · Tue 05 Jan 2027
**Topological ordering** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *What happens when you type a URL and press enter? (5-minute version)* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Course Schedule II with Kahn's algorithm: indegree queue; if the output is shorter than n there is a cycle.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs)
   - Solve: [Course Schedule II (210)](https://leetcode.com/problems/course-schedule-ii/) · Medium
   - Done when: Why the order may not be unique — you can say it. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: TCP handshake, flow vs congestion control, head-of-line blocking, HTTP/2 and HTTP/3.**
   - Read: [M3 Q3. Explain the TCP three-way handshake, and what reliability costs.](../NOTES/05_NETWORKING_OS.md#m3-q3); [M3 Q4. Flow control or congestion control - what is the difference?](../NOTES/05_NETWORKING_OS.md#m3-q4); [M3 Q5. What is head-of-line blocking, and how did HTTP/2 and HTTP/3 address it?](../NOTES/05_NETWORKING_OS.md#m3-q5); [Networking lab: commands to run and what to see](../NOTES/05_NETWORKING_OS.md#add-netw-lab)
   - Do: Use `curl -v` and `curl -w` timing on a site; label DNS, connect, TLS and first-byte times.
4. **Explain aloud — 5 min.** *Flow control or congestion control — what is the difference?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: pattern roll-call (name all patterns and one cue each).

---

<a id="day-73"></a>

## Day 73 · Wednesday · Wed 06 Jan 2027
**Disjoint set union** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Flow control or congestion control — what is the difference?* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Implement DSU with path compression and union by rank. Redundant Connection. Number of Provinces.
   - Read first (short): [13. Union-Find (disjoint set)](../NOTES/01_DSA.md#dsa-13-union-find-disjoint-set)
   - Solve: [Implement DSU: find with path compression, union by rank/size](../PROBLEMS.md#x-dsu-impl) · own exercise; [Redundant Connection (684)](https://leetcode.com/problems/redundant-connection/) · Medium; [Number of Provinces (547)](https://leetcode.com/problems/number-of-provinces/) · Medium
   - Done when: You can state the complexity correctly (O(α(n)) with both optimisations). Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: TLS, what HTTPS does not protect, CORS and preflight, WebSockets.**
   - Read: [M3 Q6. Why does TLS use both asymmetric and symmetric cryptography?](../NOTES/05_NETWORKING_OS.md#m3-q6); [M3 Q7. What does HTTPS not protect?](../NOTES/05_NETWORKING_OS.md#m3-q7); [M3 Q8. Explain CORS and preflight.](../NOTES/05_NETWORKING_OS.md#m3-q8); [M3 Q9. Why is scaling WebSockets harder than scaling HTTP?](../NOTES/05_NETWORKING_OS.md#m3-q9); [Load balancers, reverse proxies and API gateways](../NOTES/05_NETWORKING_OS.md#add-netw-lb-proxy); [SignalR, interview-ready](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-signalr)
   - Do: `openssl s_client -connect example.com:443 -servername example.com` — read the certificate chain. Trigger a CORS preflight from a browser page.
4. **Explain aloud — 5 min.** *Explain CORS and preflight (with the corrected middleware order).* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: problem → pattern: read only problem names from your DSA log and say pattern + insight.

---

<a id="day-74"></a>

## Day 74 · Thursday · Thu 07 Jan 2027
**Connectivity by shared identity** · 120 minutes

1. **Recall — 10 min, notes closed.** Explain aloud: *Explain CORS and preflight (with the corrected middleware order).* Then one item from the WEAK sheet.
2. **DSA — 60 min.** Accounts Merge with DSU (or DFS). Compare the two approaches.
   - Read first (short): [Graphs: representation, traversal, cycles, topological sort, DSU](../NOTES/01_DSA.md#add-dsa-graphs)
   - Solve: [Accounts Merge (721)](https://leetcode.com/problems/accounts-merge/) · Medium
   - Done when: Emails of one person end up in one sorted group. Log each problem in DSA_LOG with the six fields; if you needed a hint after 25–35 minutes, mark it *Hint* (it gets re-solved on days +1, +3, +7, +14).
3. **Core — 40 min: OS: process vs thread, context switches, virtual memory.**
   - Read: [M3 Q10. Process or thread - what actually differs at the OS level?](../NOTES/05_NETWORKING_OS.md#m3-q10); [M3 Q11. Why is a context switch expensive?](../NOTES/05_NETWORKING_OS.md#m3-q11); [M3 Q12. What is virtual memory and why does it exist?](../NOTES/05_NETWORKING_OS.md#m3-q12); [OS terms: one line each, plus an interview sentence](../NOTES/05_NETWORKING_OS.md#add-os-concepts)
   - Do: Watch threads, handles and page faults of your API in Task Manager / Resource Monitor while you load it.
4. **Explain aloud — 5 min.** *Why is a context switch expensive?* (definition → mechanism → example → trade-off).
5. **Log — 5 min.** TRACKER → DAILY row (status, minutes, recall), DSA_LOG, one JOURNAL line, add the explain question to REVIEW.

*Commute / free time (optional):* re-read today’s Read links, then do the DSA commute drill: invariant drill: state the invariant of this week's pattern aloud.

---

<a id="day-75"></a>

## Day 75 · Friday · Fri 08 Jan 2027
**Repair and retrieval — no new topics** · 120 minutes

1. **Recall — 10 min.** Explain Thursday’s question without notes.
2. **DSA repair — 60 min.** Re-solve, from a blank file, every problem this week marked *Hint* or *Failed* in DSA_LOG, plus any re-solves due today (D+1/3/7/14). If none are due, re-solve: Course Schedule, Course Schedule II, Implement DSU: find with path compression, union by rank/size.
   - Then one problem you have not seen, with no pattern hint: [Find Eventual Safe States (802)](https://leetcode.com/problems/find-eventual-safe-states/) · Medium
3. **Core repair — 40 min.** Re-explain the four core topics of the week without notes: *What happens when you type a URL and press enter? (5-minute version)* · *Flow control or congestion control — what is the difference?* · *Explain CORS and preflight (with the corrected middleware order).* · *Why is a context switch expensive?* Read the answer only after you try. Anything you could not explain goes on the WEAK sheet.
4. **Log — 10 min.** Update WEAK; plan which items to repair on Sunday.

*This week:* Re-solve Course Schedule II cold; re-narrate the URL journey.

---

<a id="day-76"></a>

## Day 76 · Saturday · Sat 09 Jan 2027
**Deep work** · 300 minutes

1. **Recall — 10 min.** One concept from this week and one from an earlier week.
2. **DSA — 90 min.** Alien Dictionary (premium — free on neetcode.io/LintCode), Graph Valid Tree (premium), Number of Connected Components (premium), Minimum Height Trees.
   - Solve: [Alien Dictionary (269)](https://leetcode.com/problems/alien-dictionary/) · Hard *(premium — free on neetcode.io/LintCode)*; [Graph Valid Tree (261)](https://leetcode.com/problems/graph-valid-tree/) · Medium *(premium — free on neetcode.io/LintCode)*; [Number of Connected Components in an Undirected Graph (323)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) · Medium *(premium — free on neetcode.io/LintCode)*; [Minimum Height Trees (310)](https://leetcode.com/problems/minimum-height-trees/) · Medium
3. **Design — 90 min.** Job platform HLD v1 (your project): requirements, acceptance vs completion latency, API, schema, durable state machine, what can fail. Write it as the project's first decision record.
   - Use: [HLD card: Distributed job scheduler / task queue (your project)](../DESIGNS.md#hld-job-platform); [1. What it is and why](../PROJECT.md#project-overview); [4. Architecture](../PROJECT.md#project-architecture); [6. Job state machine](../PROJECT.md#project-states)
4. **Lab / project — 90 min.** PROJECT M1 — small API with durable metadata: .NET 10 solution (Api, Worker, Contracts, Infrastructure, Tests), PostgreSQL via Docker Compose, POST/GET jobs, state machine with illegal transitions rejected, migrations.
   - Use: [M1 — Small API with durable metadata (Week 11)](../PROJECT.md#project-m1); [Docker for .NET 10](../NOTES/10_ENGINEERING_PRACTICE.md#add-docker); [Practical EF Core](../NOTES/03_DOTNET_CONCURRENCY_ASPNET.md#add-net-efcore)
5. **English — 20 min.** Record 2 minutes: 'what my project does and why it is not CRUD'.

---

<a id="day-77"></a>

## Day 77 · Sunday · Sun 10 Jan 2027
**Test, review, project, stories** · 300 minutes

1. **Weekly test — 60 min, no notes, timer on.**
   - Explain aloud (2 minutes each): *What happens when you type a URL and press enter? (5-minute version)* · *Flow control or congestion control — what is the difference?* · *Explain CORS and preflight (with the corrected middleware order).* · *Why is a context switch expensive?*
   - Solve cold (25 minutes each): [Course Schedule II (210)](https://leetcode.com/problems/course-schedule-ii/) · Medium; [Accounts Merge (721)](https://leetcode.com/problems/accounts-merge/) · Medium
   - Sketch in 10–15 minutes: Job platform HLD v1 (your project): requirements, acceptance vs completion latency, API, schema, durable state machine, what can fail.
   - Write three things you forgot → WEAK sheet.
2. **Spaced review — 60 min.** Everything due today in REVIEW and DSA_LOG (D+1/3/7/14/30); then the top three WEAK items.
3. **Project / lab — 90 min.** PROJECT M1 — finish and prove the acceptance test: restart the API and read the job back; integration test for an illegal transition.
   - Use: [M1 — Small API with durable metadata (Week 11)](../PROJECT.md#project-m1); [Testing strategy in .NET](../NOTES/10_ENGINEERING_PRACTICE.md#add-test-strategy)
4. **Behavioral — 45 min.** Explain one real work system's architecture in 2 minutes (components, flow, what you owned).
   - Use: [A template for explaining any technical concept](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-explain); [Claim-safety rules](../NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules)
5. **Plan — 15 min.** Read next week’s file; update the DASHBOARD sheet.

---

[← Week 10](WEEK_10.md) · [The plan](../PLAN.md) · [Week 12 →](WEEK_12.md)
