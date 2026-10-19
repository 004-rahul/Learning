# The plan — one plan for 32 weeks

[← Start here](README.md) · [Week 1](WEEKS/WEEK_01.md) · [Notes](NOTES/README.md) · [Project](PROJECT.md) · [Problems](PROBLEMS.md) · [Designs](DESIGNS.md) · [Corrections](CORRECTIONS.md)

This is the only plan. It replaces the August Study-Plan, the 11 October FAANG plan and the 13 October FINAL-PLAN. Everything from those three plans is either inside this plan, inside the notes, or kept word for word in the [archive](ARCHIVE/) — nothing was thrown away. Where they disagreed, this plan decides.

## 1. Your goal (from CONTEXT.md, unchanged)

Turn practical C#/.NET experience into deep engineering understanding in 6–8 months, and use interviews at large product companies (and strong Indian product companies) as the validation layer. Become able to: explain C#/.NET and backend internals; solve unseen DSA problems; design scalable, reliable systems; explain your past work honestly; and communicate clearly in simple technical English. Start applying around month 6 if the evidence says you are ready; continue learning through months 7–8.

What this plan is **not**: a LeetCode-only plan, a memorisation course, a collection of random technologies, a second programming language, a CRUD project, tutorial watching, or huge notes you never revisit.

## 2. The shape of the 32 weeks

| Phase | Weeks | What happens | Ends with |
|---|---|---|---|
| 1 — Foundations | 1–8 | Arrays from zero → hashing → strings/two pointers → windows/prefix → binary search/sorting → linked lists/stacks/queues → recursion/backtracking → trees. C# from basics to async, concurrency, ASP.NET Core, EF Core. | Month 1 and Month 2 checkpoints |
| 2 — Core depth + project starts | 9–16 | Heaps → graphs → topological sort/DSU → shortest paths/intervals/greedy → DP → monotonic/bits/tries. SQL, isolation, networking, OS, messaging, distributed data, SOLID/patterns, security, Docker/CI. Project milestones M1–M6. | Month 3 and Month 4 checkpoints |
| 3 — Project completion + design depth | 17–20 | Mixed and timed coding. Distributed hard parts, observability, cloud, load testing, recovery. Project M7–M10. Design framework and behavioral structure. | **Week 20 gate** |
| 4 — Interview launch | 21–24 | Interview-rhythm weekdays (2 timed problems + a rotating block). Coding/design/LLD/behavioral delivery. Applications start if the gate passed. | **Week 24 six-month assessment** |
| 5 — Advanced + conversion | 25–32 | Kafka/streaming, consistency/multi-region, the AI increment (RAG/MCP), one role-specific extension, oral revision, mock loops, offers. | Month 7 and final checkpoints |

**Six months or eight?** Weeks 1–24 are the six-month core (about 480 focused hours). Weeks 25–32 add depth and support live interviews (about 160 more hours). If time runs short, do Weeks 1–24 well and treat 25–32 as optional depth — do not squeeze 32 weeks into 24.

## 3. The 32 weeks at a glance

| Week | Phase | DSA | Core | Saturday design | Checkpoint |
|---|---|---|---|---|---|
| [1](WEEKS/WEEK_01.md) | 1 | Array representation, traversal, costs | C# program basics, types, value vs reference, stack vs heap | How a web request works, on paper |  |
| [2](WEEKS/WEEK_02.md) | 1 | HashSet/Dictionary, frequency maps, Two Sum, reader/writer pointers, prefix sums | Structs, boxing, Equals/GetHashCode, collection internals, ref/out/in | API contract on paper |  |
| [3](WEEKS/WEEK_03.md) | 1 | Strings, frequency counting, opposite-end pointers, fixed windows | Strings, classes, inheritance, interfaces, composition, generics | URL shortener |  |
| [4](WEEKS/WEEK_04.md) | 1 | Variable windows, prefix sum + hash map, running optimum | IEnumerable/IQueryable, yield, deferred execution, delegates/closures, exceptions | URL shortener | Month 1 checkpoint |
| [5](WEEKS/WEEK_05.md) | 1 | Binary search (exact, bounds, rotated, on the answer), merge sort, quicksort | IDisposable, finalizers, GC generations, async/await, the state machine and its traps | URL shortener |  |
| [6](WEEKS/WEEK_06.md) | 1 | Pointer mutation, dummy nodes, fast/slow, stacks, queues | Threads, thread pool, races, locks, deadlock, SemaphoreSlim, Channel<T> | LLD |  |
| [7](WEEKS/WEEK_07.md) | 1 | Recursion, call stack, subsets, permutations, combinations, pruning | .NET Framework vs modern .NET, CLR/JIT, GC, Kestrel, middleware, DI, configuration | LLD |  |
| [8](WEEKS/WEEK_08.md) | 1 | Tree DFS/BFS, return values up the tree, BST invariant | HTTP/REST, JWT and auth basics, EF Core change tracking and N+1, caching, background services | FIRST DESIGN MOCK (45 minutes, timer on, talk aloud, ideally | Month 2 checkpoint |
| [9](WEEKS/WEEK_09.md) | 2 | Heap invariant, PriorityQueue, top-K, k-way merge, two heaps | Data modeling, storage, B-tree indexes, plans, SARGability, joins, window functions | LLD |  |
| [10](WEEKS/WEEK_10.md) | 2 | Graph representation, DFS, BFS, grids, multi-source BFS | ACID, isolation levels per engine, MVCC vs locking, deadlocks, migrations, backup | Distributed rate limiter HLD |  |
| [11](WEEKS/WEEK_11.md) | 2 | Directed cycles, Kahn's algorithm, DSU | URL journey, DNS, TCP, TLS, HTTP versions, CORS, WebSockets, OS basics | Job platform HLD v1 (your project) |  |
| [12](WEEKS/WEEK_12.md) | 2 | Dijkstra, MST, intervals, greedy with proofs | Schedulers, sync primitives, async I/O; queues, delivery guarantees, retries, DLQ, outbox | Notification service HLD | Month 3 checkpoint |
| [13](WEEKS/WEEK_13.md) | 2 | From recursion to memo to tabulation; 1-D DP | Replication, quorum, split brain, consistent hashing, CAP/PACELC, caching, scaling fundamentals | LLD |  |
| [14](WEEKS/WEEK_14.md) | 2 | 0/1 vs unbounded knapsack, loop order, grid DP | SOLID with real violations, Strategy/Observer/Decorator, repository debate, testability | LLD |  |
| [15](WEEKS/WEEK_15.md) | 2 | Two-string DP, LIS, stock state machines | AuthN vs AuthZ, object-level access, input validation, CORS vs CSRF, SSRF, secrets, threat model | LLD |  |
| [16](WEEKS/WEEK_16.md) | 2 | Monotonic stack/deque, bit tricks, tries | Docker images and Compose, Linux basics, Git workflow, CI, CD, health checks, safe migrations | LLD | Month 4 checkpoint |
| [17](WEEKS/WEEK_17.md) | 3 | Mixed sets without labels; repair the weakest family | Failure models, 2PC, Raft, leases and fencing, clocks, sagas, resilience patterns | Chat (WhatsApp/Slack) HLD |  |
| [18](WEEKS/WEEK_18.md) | 3 | Timed mediums with narration; first coding mocks | Logs/metrics/traces, OpenTelemetry, SLOs, percentiles, AWS basics, bottlenecks, tenant fairness | News feed HLD |  |
| [19](WEEKS/WEEK_19.md) | 3 | Harder follow-ups, unseen variations, advanced graph algorithms | Load testing, diagnostics, backup/restore, rollback, project defense | Ticket / hotel booking HLD |  |
| [20](WEEKS/WEEK_20.md) | 3 | Timed coding and re-solves | The design framework, estimation, classic designs' hard parts, behavioral structure, resume truth check | E-commerce checkout and inventory HLD (no overselling), then | Week 20 gate (Month 5) |
| [21](WEEKS/WEEK_21.md) | 4 | Two timed mediums a day, narrated | Coding-round script, LLD drill, design drill (web crawler), recruiter and applications | 45-minute design mock on a practised anchor (URL shortener o |  |
| [22](WEEKS/WEEK_22.md) | 4 | Timed mediums, plain editor, follow-up variations | No-IDE coding, complexity statements, LLD task scheduler, design drills, communication under pressure | LLD mock |  |
| [23](WEEKS/WEEK_23.md) | 4 | Amazon-leaning topics: arrays, strings, hashing, trees, graphs, heaps | Leadership Principles, timed LLD, OA-style sketch, interview analysis | Amazon-style LLD mock (with LP questions mixed in). |  |
| [24](WEEKS/WEEK_24.md) | 4 | Google-leaning topics: graphs, DP, recursion, follow-up variations, no IDE | Code comprehension, hiring committee, Google Docs and distributed cache designs, full loop | Full design mock (job platform, booking or notification). | Week 24 — six-month core assessment |
| [25](WEEKS/WEEK_25.md) | 5 | Repair the weakest family; advanced strings (extension) | Kafka in depth, stream processing, schema evolution | Ad-click aggregation HLD |  |
| [26](WEEKS/WEEK_26.md) | 5 | Mixed mocks; Fenwick/segment trees as an extension | Linearizability vs serializability, snapshot isolation, active-active, RPO/RTO, replication lag, time series and geo | Metrics and monitoring system HLD; then evolve the URL short |  |
| [27](WEEKS/WEEK_27.md) | 5 | Timed maintenance; one re-solve each of graph and DP | AI-assisted development, LLM basics, RAG pipeline, embeddings, hybrid search, evaluation | Proximity service (Yelp/nearby) and Uber matching HLDs |  |
| [28](WEEKS/WEEK_28.md) | 5 | Coding mocks; selected hard problems only in patterns you own | Grounded generation, prompt injection, tenant security, MCP, AI operations | Object storage (S3-like) and file storage/sync (Dropbox) HLD | Month 7 checkpoint |
| [29](WEEKS/WEEK_29.md) | 5 | Re-solve every failed problem; build a one-page pattern sheet | One role-specific extension (Kubernetes or deep .NET diagnostics); algorithm breadth; remaining patterns | Redo SD1–SD3 (URL shortener, rate limiter, notification) fro |  |
| [30](WEEKS/WEEK_30.md) | 5 | Coding rounds with follow-ups | 45-minute oral monologues: C#/.NET, databases, networking/OS, distributed systems | 45-minute design mock with a partner, then redo two weak des |  |
| [31](WEEKS/WEEK_31.md) | 5 | Least-practised core families; follow-up adaptation | Role-specific review, application follow-up, offer literacy, relocation only if relevant | Redo three designs with changed requirements. |  |
| [32](WEEKS/WEEK_32.md) | 5 | Light maintenance; one primitive from each weak family | C#/.NET/SQL recap, reliability/security recap, AI recap, negotiation, continuation plan | Final design mock on a random anchor design. | Week 32 — final checkpoint |

## 4. Your week (20 focused hours)

| Day | Minutes | Blocks |
|---|---|---|
| Monday–Thursday | 120 | 10 recall (notes closed) · 60 DSA · 40 core topic · 5 explain aloud · 5 log |
| Friday | 120 | 10 recall · 60 DSA repair (re-solves due + one unseen problem) · 40 re-explain the week · 10 log. **No new topics.** |
| Saturday | 300 | 10 recall · 90 DSA · 90 design (LLD/HLD) · 90 lab or project · 20 English recording |
| Sunday | 300 | 60 weekly test (no notes) · 60 spaced review + WEAK repair · 90 project/lab · 45 behavioral · 15 plan next week (+ checkpoint on month-end Sundays) |
| Commute (optional) | 10–20 | Re-read the day's linked answers and do one DSA commute drill. Reading never replaces the desk work. |

From Week 21 the weekdays switch to the interview rhythm: 10 recall · 60 timed DSA (two problems × 25 minutes, narrated) · 40 rotating block (coding delivery / LLD drill / design drill / applications or behavioral) · 10 log.

Weekly budget (approximately): DSA 8 h · design/LLD 2.5 h · C#/.NET/SQL/CS/security 3 h · project/labs 3.5 h · recall/tests 2 h · behavioral/English 1.5 h. If your weekend capacity is lower, keep the order and stretch the calendar — never borrow from sleep.

## 5. How to use one day

1. Open TRACKER.xlsx → DAILY → today's row → click the week file link (or open `WEEKS/WEEK_NN.md` and jump to *Day N*).
2. Do the blocks in order. Each block lists exactly what to read (one or two questions, linked) and exactly what to solve or build.
3. A day is **Done** only when its "Done when" is true. Copying a solution or reading an answer does not count.
4. Log in five minutes: DAILY status/minutes/recall, DSA_LOG (six fields), one JOURNAL line, and the explain question into REVIEW.

## 6. The method (why the plan works)

**For every concept — six outputs:** meaning (simple words) → mechanism (what happens step by step) → tiny example (written by you) → reasoning (why, cost, trade-off) → failure case (where it breaks or is wrong) → delayed recall (explain it again days later without notes). Notes use the six questions: What? Why does it exist? How does it work inside? Trade-offs? When to use? When not to use?

**For every DSA problem — the protocol:** restate → constraints → tiny example → brute force and its cost → the repeated work → pattern and invariant → code → dry run → edge tests → time/space with the reason → one variation. If stuck for 25–35 minutes, read a hint, close it, rebuild it yourself and mark it *Hint*. Log six fields: brute force, insight, invariant, time/space, pattern, one variation. Hinted or failed problems are re-solved from a blank file on days +1, +3, +7, +14. **Never use AI to solve DSA.** From Week 12, practise mixed sets without labels; from Week 9, do at least two problems a week in a plain editor. Full protocol: [DSA protocol](NOTES/01_DSA.md#add-dsa-protocol).

**For every design:** requirements (functional, non-functional, out of scope) → estimates → API → data model → high-level design → deep dives → bottlenecks and failures → consistency/security → trade-offs → what changes at 10×. 45-minute split: 5 / 5 / 8 / 12 / 10 / 5. Never memorise diagrams; redo designs with changed requirements. [Design template](NOTES/08_SYSTEM_DESIGN.md#add-sd-template) · [LLD method](NOTES/07_LLD_OOP_PATTERNS.md#add-lld-method).

**Explain aloud:** pass 1 = 2 minutes recorded; pass 2 = 30 seconds; pass 3 = interview version with a follow-up. Listen back once a week for clarity, not accent. [English routine](NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-routine) · [Phrase bank](NOTES/12_BEHAVIORAL_ENGLISH.md#add-eng-phrasebank).

## 7. The memory system (because you forget quickly)

- **Daily recall:** every session starts with 10 minutes explaining yesterday's question with notes closed.
- **Spaced review:** every explain question goes into REVIEW; the tracker calculates D+1, D+3, D+7, D+14 and D+30. A concept is "known" only when it passes D+30. A failed review resets it to D+1 and adds it to WEAK.
- **Re-solve ladder:** hinted/failed problems come back on D+1, D+3, D+7, D+14 (DSA_LOG calculates the dates).
- **Weekly test (Sunday, 60 minutes, no notes):** explain the week's four core questions, solve two problems cold, sketch the week's design, write three things you forgot into WEAK.
- **Monthly checkpoint (Weeks 4, 8, 12, 16, 20, 24, 28, 32):** the month's self-test from the original Q&A, a mixed coding test, a design from a blank page, and a written decision about what to repair. Index: [self-tests](NOTES/15_RAPID_REVISION_AND_SELF_TESTS.md#add-checkpoint-index).
- **WEAK list:** anything you could not explain or solve. Exit rule: two successful recalls at least 7 days apart. Fridays are for WEAK.
- **Measure what you can do,** not what you read: problems solved independently, concepts passing D+30, designs done from a blank page, stories recorded, project milestones passing their tests.

## 8. Rules that protect the plan

1. **Consistency beats intensity.** Never do zero. On a bad day do the 30-minute emergency version: 10 minutes recall + 15 minutes one problem + 5 minutes log.
2. **Falling behind:** 2–3 days → ignore and continue. A week → move forward and put the missed items on WEAK. Two weeks → move the start date in the tracker by two weeks. A month → repeat the current month, not the whole plan. **Never catch up by doubling.**
3. **Cut order when time is short** (cut from the top): aptitude → AI/RAG increment → Kubernetes/extensions → extra design drills → depth of new topics. Never cut: daily recall, daily DSA, Friday repair, Sunday test, the journal line.
4. **Burnout signs** (two or more for a week → take three days fully off): retaining nothing; Sunday tests getting worse; dread; choosing only easy topics; re-reading instead of recalling; worse sleep; stopped updating WEAK.
5. **Honesty rule:** never claim a number you did not measure, a story that did not happen, or a project feature that is not built. Every resume line must survive one follow-up. [Claim-safety rules](NOTES/12_BEHAVIORAL_ENGLISH.md#add-beh-rules).
6. **AI rule:** AI is fine for explanations after an attempt, reviewing your code and project boilerplate you understand. Never for DSA attempts or mocks.
7. **One project, one tracker, one plan.** Do not start a second project or rebuild the tracker.
8. **Order matters in DSA:** do not skip ahead to an impressive topic while its prerequisite is weak (recursion before trees and DP; binary search before binary search on the answer).
9. **Use .NET 10 LTS** for all new code. .NET 8 and .NET 9 reach end of support on 10 Nov 2026.
10. **Confirm interview formats with recruiters.** Company processes change; the notes describe common patterns, not promises.

## 9. Gates and readiness

| When | Evidence to collect |
|---|---|
| Week 2 | Basic array functions from memory, Two Sum reasoning, edge tests, alias vs copy explained |
| Week 4 | An unseen array/string problem without a pattern hint; complexity and a C# example explained |
| Week 8 | Traversals and backtracking from scratch; one design mock; a small API and several SQL queries |
| Week 12 | Mixed array/tree/graph tasks; one coherent design with API, schema and a failure case; queued project |
| Week 16 | A DP recurrence derived; a failure-safe transaction boundary in the project; a test pipeline |
| **Week 20 gate** | Unseen mediums in 35–45 minutes with tests; a coherent 45-minute design; the project working, measured and defended; 10–12 real stories recorded; resume claims defensible |
| **Week 24** | A complete mock loop; stories survive probing; recurring weaknesses shrinking; a written apply / repair / extend decision |
| Week 32 | No hints needed on familiar core families; interview feedback drives narrow repairs |

A missed checkpoint is a diagnosis, not a reason to restart. Classify the cause — concept missing, wrong mental model, implementation bug, missing edge case, or communication — and spend a bounded repair week on it.

## 10. Applications and career

- **Week 20:** update the resume with the real project (only if it is built and measured).
- **Week 21:** calibration applications to suitable mid-tier companies first (only if the Week 20 gate passed); referral outreach about one hour a week.
- **Week 23+:** stronger targets in order of verified priority. Big-tech re-application cooldowns vary — ask recruiters.
- **Relocation:** all route research in the career chapter is unverified (August 2026) and needs manual browser checks before any decision. The interview preparation does not depend on it. See the [career status box](NOTES/16_CAREER_APPLICATIONS_RELOCATION.md#add-career-status) and [career timeline](NOTES/16_CAREER_APPLICATIONS_RELOCATION.md#add-career-timeline).
- After every interview: a written analysis within 24 hours (INTERVIEWS sheet) with a root cause and a dated repair.

## 11. What is optional

Optional unless a target role needs it: aptitude (only if a company's online test includes it), advanced range structures (segment/Fenwick trees), KMP/Z/Rabin–Karp, bitmask and interval DP, SCC/bridges, Kubernetes/KEDA, the SQS port, the MCP tool, and every item marked *extension* or *extra pool*. They stay in the plan so nothing is lost; do them after the core is solid.

## 12. Where everything is

| You need | Open |
|---|---|
| Today's work | [WEEKS/](WEEKS/) (or TRACKER.xlsx → DAILY) |
| An answer to a question | [NOTES/](NOTES/README.md) — the week files link the exact question |
| Every DSA problem and its day | [PROBLEMS.md](PROBLEMS.md) — 312 problems |
| Every design and its day | [DESIGNS.md](DESIGNS.md) — 41 HLD + 49 LLD cards |
| The project | [PROJECT.md](PROJECT.md) |
| What was wrong in the old notes | [CORRECTIONS.md](CORRECTIONS.md) |
| Free resources | [RESOURCES.md](RESOURCES.md) |
| The old plans, word for word | [ARCHIVE/](ARCHIVE/) — reference only, never follow |
