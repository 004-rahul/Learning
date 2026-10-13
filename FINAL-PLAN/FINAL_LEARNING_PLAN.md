# Complete 6–8 month execution plan

Rebuilt 13 October 2026 after your clarification: preserve every small basic detail and every advanced branch, combine the actual notes and Q&A, and make daily progress easy to track. Starting completion: none. Target: backend/software engineering interviews at roughly your current experience level; individual companies determine role level and interview format.

## Use the complete collection

[Start here](START_HERE.md) · [Searchable full notes and Q&A](COMPLETE_NOTES.html) · [Daily CSV](DAILY_PROGRESS.csv) · [Every granular topic](FULL_TOPIC_INDEX.md) · [All question locations](QUESTION_INDEX.md) · [Source coverage](COVERAGE_REPORT.md).

The notes contain full source paragraphs, tables, explanations, problem lists, checkpoints and templates. They are organized by subject. Repeated explanations are preserved. Known errors have visible corrections. The checklist links to original detail rather than replacing it with a broad topic name.

## Final learning scope

| Track | Required breadth from basic to advanced | Complete notes |
|---|---|---|
| Programming and arrays | Types/variables, operators/conversions/overflow, conditions, loops, methods, contracts, creation/index/Length, empty/null/default elements, for/foreach/while/do-while, read/update/search, 1D/2D/jagged, pass/copy/reference, insertion/deletion costs, min/max/second-largest, sortedness, duplicates, in-place mutation | [Beginner answers](NOTES/00_BEGINNER_QUESTIONS.md), [all array material](NOTES/01_DSA_FULL_NOTES.md#QA) |
| DSA foundations | Time/space, worst/average/amortized, recursion stack, constraints, brute force, invariants, dry runs and edge cases | [Full DSA guide](NOTES/01_DSA_FULL_NOTES.md#QD) |
| DSA structures/patterns | Arrays/strings/hashing; two pointers, windows, prefix/suffix/difference arrays; binary search and answer search; stacks/queues/deques; linked lists; recursion/backtracking; trees/BST/traversals/views/construction; heaps/top-K/two-heaps; graphs/grids/cycles/topological/DSU/shortest paths/MST/bipartite/SCC; tries; greedy; all DP families; bits; intervals/sweep lines | [Full encyclopedia](NOTES/15_FULL_CURRICULUM_ENCYCLOPEDIA.md), [detailed checklist](FULL_TOPIC_INDEX.md) |
| Advanced DSA retained | KMP/Rabin-Karp/Z; all eight sorting algorithms; Dijkstra/Bellman-Ford/Floyd-Warshall; Kosaraju/Tarjan; bitwise trie; interval/MCM/tree/bitmask DP; segment tree/lazy propagation/Fenwick | [Every original branch](NOTES/15_FULL_CURRICULUM_ENCYCLOPEDIA.md#F02) |
| C# language and internals | OOP/constructors/chaining/access/enums/static; struct/class/records/nullable; value/reference/pass/copy/boxing; memory/GC/LOH/disposal; all collection internals; generics/variance/constraints; equality/hash; IEnumerable/IQueryable/iterators; LINQ/deferred execution; delegates/lambdas/closures/events; exceptions; async/state machines/cancellation/context/ValueTask; concurrency and diagnostics | [Complete C# answers](NOTES/02_CSHARP_FULL_QA.md), [supplemental checks](NOTES/18_SUPPLEMENTAL_EXPLANATIONS.md) |
| .NET and ASP.NET Core | Runtime/SDK/CLR/BCL/IL/JIT; hosting/middleware/routing/controllers/minimal APIs; DI lifetimes/options/config/secrets; binding/validation/errors; HTTP/REST/status/versioning/pagination; auth/authz/JWT/cookies/OAuth/OIDC/CORS; EF/tracking/translation/N+1/migrations; outbound HTTP, workers, retries and diagnostics | [Full .NET/SQL Q&A](NOTES/03_DOTNET_ASPNET_SQL_FULL_QA.md) |
| SQL/data | CRUD/joins/grouping/HAVING/NULL/CTEs/windows/subqueries; modeling/normalization/constraints; indexes/B-tree/composite/covering/plans; ACID/isolation/MVCC/locks/deadlocks; pooling; replication/sharding; expand-contract migration; backups/restore/CDC | [Complete Q&A](NOTES/03_DOTNET_ASPNET_SQL_FULL_QA.md), [foundation answers](NOTES/17_FOUNDATION_PROMPTS_AND_ANSWERS.md) |
| CS/network/OS | Processes/threads/address space/virtual memory/scheduling/context switch/system calls; races/synchronization/deadlock/starvation; DNS/IP/ports/TCP/UDP/TLS/HTTP/WebSockets; proxies/L4/L7/load balancing; latency/bandwidth/timeouts and connection reuse | [Full CS notes](NOTES/04_CS_NETWORK_OS_DATA_FULL_QA.md) |
| LLD/machine coding | OOP, five relationships, eight principles, SOLID, all five UML diagram types, all 23 GoF patterns including Interpreter; state machines; contracts/interfaces; concurrency/extensibility/tests; all 17 listed LLD practice designs | [LLD Q&A](NOTES/05_LLD_DISTRIBUTED_FULL_QA.md), [all design outlines](NOTES/17_FOUNDATION_PROMPTS_AND_ANSWERS.md) |
| HLD/distributed systems | Requirements/estimates/APIs/schema; scaling/statelessness/discovery/CDN/caching/invalidation/stampede; replication/sharding/hotkeys/CAP/PACELC/quorum/consensus/leases/fencing; queues/pubsub/streams/delivery; outbox/inbox/idempotency/sagas/CDC; logical clocks/skew; overload/backpressure/admission/shedding/degradation; recovery/observability; all 30 listed designs and 25 failure follow-ups | [HLD answers](NOTES/06_HLD_BEHAVIORAL_FULL_QA.md), [foundation answers](NOTES/17_FOUNDATION_PROMPTS_AND_ANSWERS.md) |
| Advanced distributed/streaming | Kafka partitions/groups/offsets/rebalance/ISR/acks/retention/compaction/batching/schema; Kafka transaction boundary; event/processing time/windows/watermarks/replay; approximate counting; linearizability/serializability; multi-region/RPO/RTO; time series/cardinality/geospatial/object durability | [Complete advanced Q&A](NOTES/08_ADVANCED_STREAMING_FULL_QA.md) |
| Engineering delivery/operations | Git and conflicts; unit/integration/contract/concurrency/failure/load tests; Linux basics; build/CI/CD/artifact promotion/secrets/rollback; Docker/Compose/images/networks/volumes/multistage; Kubernetes pods/deployments/services/probes/resources; cloud/IAM/zones/network/storage/queues; logs/metrics/traces/OpenTelemetry/SLI/SLO/runbooks | [Detailed supplemental checks](NOTES/18_SUPPLEMENTAL_EXPLANATIONS.md), [original lessons](NOTES/13_ALL_STUDY_LESSONS.md) |
| Security | Authentication versus authorization, tenant/object access, token validation/revocation options; input validation, parameterized SQL, injection/XSS/CSRF/SSRF, secrets, sensitive logs and AI permission boundaries | [Beginner answers](NOTES/00_BEGINNER_QUESTIONS.md), [full supplemental scope](NOTES/18_SUPPLEMENTAL_EXPLANATIONS.md) |
| AI/LLM/MCP/RAG | AI assistance/verification/context; tokens/context/embeddings/similarity/sampling/structured output/tool calls/streaming/cost; ingest/chunk/embed/store/retrieve/rerank/augment/generate/cite; vector indexes/hybrid/BM25/RRF; recall@k/MRR/faithfulness/failure taxonomy/metadata/tenant isolation; MCP host/client/server/tools/resources/prompts/transports/capabilities/security/idempotency | [Complete AI notes](NOTES/10_AI_MCP_RAG_FULL_NOTES.md), [advanced RAG Q&A](NOTES/08_ADVANCED_STREAMING_FULL_QA.md) |
| Behavioral/English/interview | Factual journal, STAR, all 16 listed leadership principles, ownership/failure/conflict/ambiguity/mentoring/quality/data/customer impact; all 30 extra prompts; why/alternatives/learning follow-ups; explanation aloud; timed coding/design; hints/stalls/code comprehension; mock feedback and applications | [Behavioral Q&A](NOTES/06_HLD_BEHAVIORAL_FULL_QA.md), [round delivery](NOTES/07_INTERVIEW_ROUNDS_FULL_QA.md), [full career source](NOTES/12_CAREER_BEHAVIORAL_FULL_NOTES.md) |
| Aptitude/estimation | Number systems/LCM/HCF/percentages/ratios/averages/profit-interest/time-work-speed/probability/combinations/data interpretation; logical/verbal/technical tracing; QPS/peak/storage/bandwidth/cache/servers/queues/availability | [All aptitude detail](NOTES/11_APTITUDE_FULL_NOTES.md), [added estimates](NOTES/17_FOUNDATION_PROMPTS_AND_ANSWERS.md) |
| Projects/resources/revision | Original job-platform and distributed AI-engine specs, all project details, resource directory, tracker templates, eight monthly checkpoints and complete rapid revision tables | [Projects/resources](NOTES/14_PROJECTS_AND_RESOURCES.md), [revision](NOTES/09_RAPID_REVISION_FULL_NOTES.md), [templates](NOTES/16_TRACKERS_AND_TEMPLATES.md) |

This table is navigation. The granular checklist and full notes define the detail; no topic is removed because it is basic, advanced or repeated.

## Study time and completion

The schedule assumes 120 focused minutes on each weekday and 300 on each weekend day: 20 hours/week. Take breaks outside or between focused blocks. There are 224 study days across 32 weeks, approximately eight months. The six-month attempt is the first 168 study days/24 weeks, approximately 480 hours; the full schedule is approximately 640 hours. Choose your own start date; Monday–Sunday labels show the intended rhythm.

| Day | Focused blocks |
|---|---|
| Mon–Thu | 10 minutes retrieval; 70 DSA; 30 backend/CS; 5 explain aloud; 5 log |
| Friday | Same total; repair weaker coding and backend work rather than advancing through a gap |
| Saturday | 90 DSA; 90 design/LLD; 90 project/lab; 30 flexible/review |
| Sunday | 90 coding/checkpoint; 60 lab repair; 45 behavioral; 45 recall; 60 flexible |

Read the exact Reading_IDs in free time for roughly 10–20 minutes, or use the existing recall/flexible time. Longer design outlines may need several sessions. Reading is additional access to the same material, not an assumption that you have unlimited extra hours. If the day’s queue is too large, carry it forward and mark Reading rather than Read. Keep coding independent during timed practice; review explanations after an honest attempt.

Detailed_Topics restores original small subtopics and encyclopedia branches to the tracker. It is a coverage queue inside the lesson/practice budget. Check every named subtopic in the granular checklist; unfinished topics carry forward. A date passing does not mark them mastered. Fully mastering every advanced branch and every practice design may require more than eight months; preserve those items and continue instead of silently removing them.

For each concept: definition → mechanism → tiny example → one failure/trade-off → explain without notes. For each DSA problem: contract/constraints → brute force → repeated work → pattern/invariant → implementation → edge cases → justified time/space → variation. Use the original six-field problem log and 1/3/7/14-day re-solve ladder for helped attempts. For designs: requirements → estimates → API/data → flow → bottleneck/failure → consistency/security → alternatives. The original templates remain available.

## Track daily progress

Status, Completed_On, Actual_Minutes, Recall_Result, Next_Review_On and Notes remain your coding/lab fields. Existing entries are preserved by Day ID. Reading_Status, Reading_Recall and Reading_Notes separately track answer reading. Reading_IDs and links locate exact cards; Full_Lesson_Links locates complete lessons; Detailed_Topics lists restored subtopics with source block IDs, searchable in the notes reader.

Status choices: Not started / In progress / Needs review / Done. Use Deferred only to record work genuinely postponed, with a reason and return date; it stays incomplete. Reading choices: Not started / Reading / Read / Needs review. Recall: Pass / Partial / Fail. No work has been marked completed for you.

Done requires the row’s coding/lab completion check; reading/watching/copying alone does not qualify. Before checking a topic, answer follow-ups and demonstrate the relevant exercise. CSV preserves data, not dropdowns/formatting or reminders. Import with comma delimiter in Excel/Sheets, wrap text, freeze the header and use filters. Keep private employer evidence local.

## Weekly sequence and required evidence

| Week | Main sequence | Required evidence |
|---:|---|---|
| 1 | Array foundations | Implement sum, search, reverse and maximum cold; explain alias vs copy and the cost of each function. |
| 2 | Hashing and prefix foundations | Solve Two Sum from scratch and implement a frequency map; explain check-before-insert and hash-table costs. |
| 3 | Strings and two pointers | Explain a pointer invariant and solve a simple string/fixed-window variation without a pattern hint. |
| 4 | Variable windows and prefix maps | Month 1 check: one unseen array/string problem, five edge tests, complexity, C# explanation and three named weak items. |
| 5 | Binary search and sorting | Binary-search code terminates correctly on boundary cases; explain a monotone predicate and async vs parallelism. |
| 6 | Linked lists stacks and queues | Reverse and merge lists cold; explain stack/queue invariants, race vs deadlock and bounded concurrency. |
| 7 | Recursion and backtracking | Generate subsets/permutations independently; show correct backtracking cleanup and request pipeline order. |
| 8 | Trees BST and SQL basics | Month 2 check: tree/BST problem, five SQL queries, one API demo and a mock feedback note. |
| 9 | Heaps and database performance | Explain top-K and k-way merge; demonstrate a durable job and one measured query improvement. |
| 10 | Graph traversal and transaction correctness | Choose BFS vs DFS correctly and show a database invariant surviving concurrent requests. |
| 11 | Dependencies connectivity and CS foundations | Topological ordering and DSU work; explain end-to-end request flow and durable submission. |
| 12 | Weighted paths intervals and queues | Month 3 check: mixed graph/interval task, working queued job and a clear design walkthrough. |
| 13 | DP foundations and durable publication | Derive basic DP states and show accepted jobs survive the tested publication crash window. |
| 14 | Knapsack DP and idempotent effects | Explain 0/1 vs unbounded DP and demonstrate one committed local effect under duplicate delivery. |
| 15 | Grid and string DP plus API security | Derive one 2D DP recurrence and demonstrate cross-tenant denial plus invalid-token/input behavior. |
| 16 | Monotonic structures bits tries and delivery | Month 4 check: DP/graph mixed attempt, reproducible containers, test pipeline and supported idempotency claim. |
| 17 | Mixed coding and recovery | Classify coding failures precisely and document worker-crash/DLQ behavior with reproducible steps. |
| 18 | Timed coding deployment and observability | Complete two reviewed coding attempts and trace one accepted job through a running system. |
| 19 | Unseen variations performance and recovery drills | Measured benchmark separates acceptance/completion, restore works, and booking invariant is clear. |
| 20 | Readiness and project defense | Month 5 gate: several independent coding attempts, coherent design, working project and defensible experience stories. |
| 21 | Applications and structured mock feedback | Application list and feedback-based repairs exist; readiness governs applications, not optional project features. |
| 22 | Interview performance and role-specific practice | SQL/API or assessment weakness is named and repaired; stories survive detailed follow-up. |
| 23 | Code comprehension and AI engineering judgment | Read/debug unfamiliar code and explain RAG/MCP concepts without pretending to have built them. |
| 24 | Six-month core assessment | Core gate: complete mock evidence, honest resume/stories and a prioritized next-step decision; no automatic pass by date. |
| 25 | Streaming and weakness repair | Explain replay/order/late data and verify one message compatibility scenario; DSA weakness improves. |
| 26 | Consistency multi-region and recovery | Distinguish consistency guarantees and describe a failure-safe regional ownership strategy with its cost. |
| 27 | Retrieval and AI | A bounded retrieval experiment has a corpus, labels, baseline and failure examples without weakening core practice. |
| 28 | RAG evaluation and MCP | Month 7 check: honest evaluation, negative security cases and no AI claims beyond implemented evidence. |
| 29 | Role-specific advanced coverage | Chosen extension has a concrete output and core interview performance remains stable; deferred extras stay deferred. |
| 30 | Full mock loops and final gap repair | Mock loop completed with top three gaps and specific repair tasks; no broad restart. |
| 31 | Active interviews and targeted maintenance | Feedback drives bounded repairs, applications have next actions and all interview claims remain defensible. |
| 32 | Consolidation and continuation | Evidence-based continuation: maintain strengths, name remaining gaps and continue applications without claiming guaranteed readiness. |


The original monthly tables remain in [all detailed study lessons](NOTES/13_ALL_STUDY_LESSONS.md). They supply small lesson items, builds and “must explain” checks. Their conflicting dates/allocations are historical; follow this CSV’s execution order. Recursion/backtracking precede DP.

Months 1–2 establish basics, structures, C#/.NET/API and SQL. Months 3–4 add CS, graphs/DP, LLD, distributed correctness and the working project. Months 5–6 emphasize mixed/timed coding, complete designs, behavioral practice, deployment/diagnostics, mocks and applications. Months 7–8 cover advanced streaming/consistency, AI/RAG/MCP, all advanced curriculum branches and unfinished details. Applications may start around month six when evidence supports them; preparation continues alongside feedback.

## Restore the complete project scope

Use both original project specifications as requirements/reference material. Build one coherent job platform rather than trying to operate two competing major projects. Retain every original requirement in the learning collection: durable job acceptance, state transitions, outbox/inbox, deduplication, retry/backoff/DLQ/replay, heartbeats/leases/fencing, fairness/tenant quotas, cancellation, status, auth/tenant isolation, tracing/metrics, failure tests, deployment and measured load results. AI jobs/RAG/MCP can use the same platform as a later increment.

Implement increments: basic accepted job and worker; transactional outbox plus durable publication; duplicate-safe local effects; lease/recovery/fairness; security and observability; deployment and failure/load evidence; then AI/RAG integration. Each increment must run and have a stated limitation. Benchmark values in old documents remain proposed targets until measured. For external email/payment, use downstream idempotency or reconciliation and state the guarantee boundary; a marker alone is unsafe. Keep the RAG support project bounded but retain every learning topic.

## Interview readiness and technical corrections

At each four-week checkpoint, test unfamiliar coding with relevant edge cases and justified complexity; explain backend/SQL mechanisms without notes; solve a design from a blank page and handle failure/scale changes; demonstrate the project and answer what can fail; and rehearse real behavioral stories with evidence. Use repeated mock results and actual feedback to decide application timing. Completing rows measures work done, not guaranteed hiring readiness.

Known corrections include CORS ordering, modern interpolation boxing, runtime-dependent ThreadPool behavior, PostgreSQL-specific isolation, precise JWT revocation designs, GoF counts/classification and bounded exactly-once claims. The full original wording stays visible. Use a supported runtime for new work; [official .NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) confirms .NET 10 LTS, while .NET 8 approaches end of support in November 2026. Recruiters confirm current interview tools/rounds; old career/relocation probabilities and thresholds are historical unverified material, retained for audit rather than current advice.

[Source coverage](COVERAGE_REPORT.md) explains exactly what was preserved and what it does not prove. [Official PostgreSQL isolation documentation](https://www.postgresql.org/docs/current/transaction-iso.html), [Kafka design documentation](https://kafka.apache.org/42/design/design/), [OpenTelemetry concepts](https://opentelemetry.io/docs/concepts/) and [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) support the added technical clarifications.
