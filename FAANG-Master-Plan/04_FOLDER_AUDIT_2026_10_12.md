# Preparation folder audit

Reviewed 12 October 2026. This is an assessment of the local preparation material, not an assessment of your ability. You confirmed during this review that you have not completed the preparation yet and that broad instructions such as “do arrays” do not tell you how to begin.

**Conclusion:** You already have broad topic coverage. The largest gaps are precise beginner instructions, consistent sequencing, realistic allocation of time, practical evidence, and accuracy checks. Adding more advanced topic names would make this worse. Use the new [start guide](./05_START_HERE_BASIC_TO_ADVANCED.md) as the proposed execution order; retain the existing documents as references.

## Scope and evidence

I inventoried the workspace, extracted text from the Word documents and PDFs, read the planning Markdown and preparation-app source, and inspected all 12 workbook tabs and the 224-row CSV. I inspected the roadmap PDF visually because its main content is images, and inspected the generic HLD diagram. I reviewed the resumes for consistency with the proposed interview stories. This was a content and preparation audit, not a full line-by-line fact check of every answer, a document-layout audit, or a browser test of the app.

The Word temporary lock file beginning `~$` is not a study document. The external websites linked from the saved HTML/PDF references were not exhaustively crawled. Immigration and compensation claims in the career material were not revalidated in this audit; they should not be used as current advice.

| Material | Useful content | Finding |
|---|---|---|
| `CONTEXT.md` | Your original goals, practical experience, learning difficulties, time budget and honesty rules | Some status statements are dated August. Your confirmation today establishes a fresh preparation start. |
| `Study-Plan/THE_PLAN.docx` and monthly documents | Balanced .NET, CS, DSA, design, recall and communication | Better engineering breadth than the newer daily schedule, but still dense for a beginner and contains rigid interview claims. |
| `Q-and-A` | Explanations, invariants, trade-offs, advanced distributed concepts, revision | Useful after learning and attempting an example. Several answers need corrections; do not memorize verbatim. |
| `Devlopment/C#/Arrays.docx` | Array fundamentals, simple exercises and pattern progression | Closest existing document to the granularity you need. It needs a bounded sequence, daily exercises and a completion test. |
| `FAANG-Master-Plan/00...03` | DSA pattern catalog, machine-coding cases, project and timeline | Strong topic inventory, but weekday DSA displaces .NET/SQL; hard topics arrive too early; different files disagree. |
| `Study-Plan/TRACKER.xlsx` | 224 days, weak list, review ladder, designs, stories and applications | Daily completion cells are blank. DSA and WEAK contain examples but no further problem/weakness entries. This is setup, not evidence of mastery. |
| `TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv` | Actual day-level assignments | All 224 `Status_Done` values are FALSE. More detailed than the Markdown after Week 10, but inconsistent with it. |
| `prep-app` | Useful interface concept and local backup mechanism | Its supplied day array is empty; story examples contain unsupported details. See defects below. |
| Resume variants | Work-based material for behavioral and technical deep dives | Use verified contributions, with personal role and measurement method. The app's added incidents/metrics are not substantiated by these resumes. |
| PDFs, image, saved embeds and board JSON | Supplemental design lists, roadmap and architecture vocabulary | Both board JSON files contain `Request coercion failed`, not mindmap data. A claim to have fully imported every original branch is therefore unverified from these files. |

No C# solution/project, implemented DSA exercise collection, or distributed job platform source was found in this workspace inventory. That says nothing about code you keep elsewhere.

## What is already covered

Do not buy or assemble another general curriculum to cover these again:

- DSA: arrays, strings, hashing, pointers, windows, stacks, queues, linked lists, binary search, trees, heaps, graphs, recursion, backtracking, DP, intervals, greedy, tries, bit operations and advanced range queries.
- C#/.NET: type semantics, OOP, generics, collections, LINQ, delegates, memory, GC, async, concurrency, runtime, ASP.NET Core, DI, EF Core and basic testing.
- CS/data: networking, HTTP/TLS/DNS, OS, transactions, indexing, query plans, replication, partitioning and caching.
- Distributed systems: outbox, sagas, idempotency, delivery semantics, fencing, consensus concepts, observability and recovery objectives.
- Career preparation: behavioral framework, English practice, project defense, applications, resume variants and interview review.
- Infrastructure and AI: Docker, CI/CD, AWS, some Kubernetes, AI-assisted development, MCP and RAG.

The distinction matters: **a topic being present in a reference is different from being scheduled, practiced, recalled and independently demonstrated.**

## Priority findings

### 1. Competing operating plans create uncertainty

The older daily routine allocates 65 minutes to .NET/CS and 40 minutes to DSA. The newer routine allocates 90 minutes to DSA and moves nearly everything else to weekends. Neither allocation should be followed alongside the other.

The newer project starts around Week 11; the older project build starts mainly around Week 16. The newer Markdown groups Weeks 11–16 into broad blocks despite its “day-by-day” title. Its CSV is more explicit: recursion/backtracking exercises appear on Days 88–89, after DP starts on Day 71. Greedy and bits are present on Days 92–95 even though the corresponding Markdown block does not describe them clearly. They are not entirely missing; the sequencing and synchronization are wrong.

**Recommendation:** one execution guide, one progress record, existing documents used only when the current topic calls for them. Teach recursion and backtracking before DP.

### 2. The difficulty ramp does not match a fresh start

Week 1 assigns First Missing Positive. Week 4 assigns Largest Rectangle in Histogram and Maximal Rectangle together. These are poor compulsory early milestones for someone still learning how to traverse and reason about arrays.

**Recommendation:** basic operations → simple exercises → brute force → one pattern → variations → mixed problems → delayed re-solve. Move difficult extensions behind a readiness check.

### 3. Security is present but incomplete

Authentication, JWT, CORS, secrets and cross-tenant checks exist. The inspected study material lacks a clear practical sequence for object/function authorization, CSRF versus CORS, SSRF, mass assignment, request limits, safe file handling, token validation/rotation and abuse prevention.

**Add:** a small threat model and negative tests to the project, including “tenant A cannot fetch tenant B's job even when it knows the ID.” This aligns with the [OWASP API security risk catalog](https://api-security.owasp.org/editions/2023/en/0x11-t10/).

### 4. Engineering practice needs more executable exercises

Unit/integration testing and diagnostics are already named. Less developed areas include deterministic time-based tests, API/message contract evolution, safe migrations and rollback, real backup restoration, outbound HTTP lifetime/timeouts, and incident diagnosis from evidence.

**Add:** one focused lab for each, integrated into the same backend project. Do not create separate large projects for all of them.

### 5. Important reliability concepts disappear from the newer project

The old project explicitly includes a transactional outbox, tenant isolation, fairness, heartbeats and recovery. The newer blueprint centers Redis locks and AI/Kubernetes, while its architecture shows a database write and a queue publish without an explicit outbox transaction.

**Recommendation:** restore durable submission and recovery before adding AI or autoscaling. The [AWS outbox guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) explains the dual-write problem and why consumers still need idempotency.

### 6. Exactly-once claims need a precise boundary

The old project promises every job completes exactly once. Its suggested “insert processed ID first, then skip duplicates” is unsafe if that marker commits before the side effect and the worker crashes. Doing the side effect first has the opposite failure window.

For database-local effects, atomically commit the deduplication record and business change in one transaction. For external email/payment/API effects, require downstream idempotency support or document reconciliation and residual risk. A TTL cache or lock alone does not provide a universal exactly-once guarantee. [Redis's locking documentation](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) itself discusses failure assumptions and ownership-safe release.

Likewise, a killed-worker test can show behavior for that scenario; it cannot prove zero loss under every possible failure. State the tested failure model.

### 7. Work stories and project numbers must be grounded in evidence

`prep-app/data.js` adds a 25-minute incident recovery, PgBouncer work, 99.99% uptime, zero failures and other detailed outcomes. I cannot substantiate these from the recorded experience. Treat these as unverified examples, never as facts about your work.

The newer project blueprint supplies a finished first-person story claiming 5,000 RPS and p99 below 45 ms before a project or measurement exists. These are neither observed results nor sensible universal pass criteria.

**Recommendation:** record actual benchmark environment, payload, offered load, successful throughput, queue age, latency and failures. Distinguish fast job acceptance from actual job completion. Build behavioral stories from your own recollection and evidence. [Amazon's official guide](https://www.amazon.jobs/content/en-gb/how-we-hire/sde-ii-interview-prep) asks for real past examples and appropriate metrics, alongside coding and design.

### 8. The preparation app is not ready to run the plan

Confirmed by source inspection:

- `data.js` ends with `"days": []`.
- `index.html` loads `data.js` and `app.js`; no CSV import/population path was found.
- Mission rendering returns when no day data exists. The roadmap filters the same empty array.
- The header can still use 224 as a fallback denominator, which masks the missing schedule.
- Review reminders subtract 3/7/14/30 from the selected study-day number. They do not use the actual date a topic was learned or a failed-recall event.
- “Today” chooses the first unfinished item rather than resolving a start date against the calendar.

This was a static inspection; I did not modify or browser-test the app. Until repaired and verified, use a simple daily log or the existing workbook. Browser-local progress was not inspected.

## Corrections to existing teaching material

| Location | Issue | Correct treatment |
|---|---|---|
| M2 Q&A, Q18 | Says putting CORS after routing breaks preflight | ASP.NET Core guidance places `UseCors` after `UseRouting` and before `UseAuthorization`; see [Microsoft](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0). |
| M1 Q&A and M8 revision | States interpolation boxes every value-type argument | Modern interpolated-string handlers can avoid boxing. Behavior depends on compiler, target and overload; see [Microsoft's C# 10 explanation](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/). |
| M1/M2 Q&A | Treats thread-pool injection as a fixed one/two threads per second | Heuristics vary by runtime and blocking behavior. Modern .NET has faster responses for recognized blocking; see [Microsoft diagnostics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/debug-threadpool-starvation). |
| M2 SQL material | Generic isolation behavior risks being applied identically to SQL Server and PostgreSQL | Teach engine-specific behavior: PostgreSQL Read Uncommitted behaves as Read Committed, and its Repeatable Read prevents phantoms. See [PostgreSQL](https://www.postgresql.org/docs/14/transaction-iso.html). |
| Monthly JWT prompts | “JWT cannot be revoked” is too absolute | A purely stateless verifier does not see revocation automatically. Denylists, session/version checks, introspection where applicable, and key/token lifecycle policies change that design. |
| New pattern encyclopedia | Claims all 23 GoF patterns, lists 5+10+7 = 22 | Interpreter is omitted; structural heading says 8 but lists 7. Strategy is behavioral and Builder is creational, contrary to labels in the schedule. Interpreter is low priority despite this completeness defect. |
| Project stack | New build hard-coded to .NET 8 | For a fresh project, prefer .NET 10 LTS after checking dependencies. .NET 8 support ends 10 November 2026, within the preparation period. See [support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core). |
| Older month docs 02, 04, 12 | Four references to deleted “Doc 00” remain | Resolve them to the appropriate parts of THE_PLAN during consolidation. |
| Workbook START C42 | Says five LLDs | THE_PLAN and the design list describe six. |

This is a targeted correction list, not a certification that every other statement is correct. Be especially cautious with absolute words such as always, never, guarantees, and every.

## What to deprioritize

For general backend interview preparation, advanced segment/Fenwick trees, KMP/Z algorithms, bitmask DP, all GoF implementations, deep Kubernetes/KEDA and a large AI platform should not delay arrays, recursion, common graphs/DP, SQL, testing and design practice. They remain optional extensions or role-specific topics.

Aptitude should be conditional on a target assessment. Do not add it automatically on top of an already full two-hour day. Do not attempt to learn a second interview language just for prestige.

Do not assume exact cross-company level equivalence, a universal interview format, a mandatory public portfolio, or a fixed rejection cooldown. Confirm the role's process and tools with the recruiter. [Microsoft's technical interview guidance](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) emphasizes problem solving, coding, testing and role-relevant design; it does not require mastering every technology in this folder.

## The practical decision

Start from the new granular guide. Use DSA as the largest weekly block; start small design and behavioral exercises early rather than waiting until DSA is “finished.” Preserve .NET depth and deliver one bounded backend project. Add AI after the core system is reliable. Review progress by independent performance, not calendar position or completed reading.

Existing plans, app, workbook and resumes were left unchanged. The two new Markdown files are proposed audit and execution documents, not silently applied changes to those originals.
