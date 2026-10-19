# Free resources

[← Start here](README.md) · [The plan](PLAN.md)

Rule: one primary source and one backup per topic. You are done with a resource when you can explain the topic with it closed — not when you finish it.

<a id="add-res-primary"></a>

## ➕ The short list (use these first)

| Topic | Primary | Backup |
|---|---|---|
| C# / .NET | [Microsoft Learn .NET docs](https://learn.microsoft.com/dotnet/) · [SharpLab](https://sharplab.io) | Stephen Toub, "How Async/Await Really Works in C#" ([.NET Blog](https://devblogs.microsoft.com/dotnet/)) · Stephen Cleary's blog |
| ASP.NET Core | [ASP.NET Core docs](https://learn.microsoft.com/aspnet/core/) (middleware order, DI, options, auth) | Andrew Lock's blog |
| EF Core | [EF Core docs](https://learn.microsoft.com/ef/core/) | — |
| DSA | Your notes + [NeetCode](https://neetcode.io) roadmap and videos | [Tech Interview Handbook](https://www.techinterviewhandbook.org) · [VisuAlgo](https://visualgo.net) |
| SQL | [PostgreSQL docs](https://www.postgresql.org/docs/current/) (esp. Transaction Isolation) | [Use The Index, Luke](https://use-the-index-luke.com) |
| Networking / OS | [High Performance Browser Networking](https://hpbn.co) | [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) |
| System design | [System Design Primer](https://github.com/donnemartin/system-design-primer) | DDIA (book) · Kleppmann's lecture notes |
| LLD / patterns | [Refactoring.Guru](https://refactoring.guru) | [Awesome Low Level Design](https://github.com/ashishps1/awesome-low-level-design) |
| Messaging | [RabbitMQ docs](https://www.rabbitmq.com/docs) · [Kafka design docs](https://kafka.apache.org/documentation/#design) | AWS SQS developer guide |
| Security | [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) | OWASP Cheat Sheet Series |
| Observability | [OpenTelemetry docs](https://opentelemetry.io/docs/) | .NET observability docs on Microsoft Learn |
| Docker / CI | [Docker docs](https://docs.docker.com) · [GitHub Actions docs](https://docs.github.com/actions) | — |
| AI / RAG / MCP | [.NET AI docs](https://learn.microsoft.com/dotnet/ai/) · [pgvector](https://github.com/pgvector/pgvector) · [MCP docs](https://modelcontextprotocol.io) | [MCP C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) |
| Behavioral | [Amazon Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles) · [Amazon SDE II prep](https://www.amazon.jobs/content/en-gb/how-we-hire/sde-ii-interview-prep) | [Microsoft interview tips](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) |
| .NET support dates | [.NET support policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) | — |

<a id="add-res-tmp"></a>

## ➕ Material from the old `tmp/` folder and old saved links

The original files are kept in [ARCHIVE/originals/](ARCHIVE/originals/) (moved there from `tmp/` on 19 Oct 2026, together with `Arrays.docx` and the old master-roadmap `.docx`); their content is already merged into the plan:

- **LLD problem list (50) and HLD problem list (32)** (CodeWithNishchal) → every problem is in [DESIGNS.md](DESIGNS.md) with a card and a day.
- **SPOF reference guide** → summarised as the [SPOF checklist](NOTES/08_SYSTEM_DESIGN.md#add-sd-spof).
- **Generic high-level design flow (PNG)** → redrawn as the [design flow](NOTES/08_SYSTEM_DESIGN.md#add-sd-flow).
- **RoadMap.pdf (80-day accelerator)** → its topics (essential math, matrices, ElasticSearch, ZooKeeper locks, 2PC/consensus, gossip, patterns in microservices, repository pattern, concurrency in LLD, code review simulation, capstone defense) are all covered by the week files and notes.
- **Design Patterns.pdf** → only a link: [DesignPatternsByCodeN](https://github.com/nishchal-muradia/DesignPatternsByCodeN).
- **System Design Roadmap.pdf** → only two Whimsical links: [HLD roadmap](https://whimsical.com/system-design-x-codewithnishchal-HgUy4s4neY4TJMR4eHMUDL) · [LLD roadmap](https://whimsical.com/lld-VDPw8YTocytiVvG7AFBjL9).
- **embed_*.html and board_*.json** (deleted 19 Oct 2026; still in git history) were saved Whimsical embed loaders and two failed exports ("Request coercion failed") with no content. The old `prep-app/` was also deleted (it had no schedule data); `PREPARATION/app/` replaces it. Whimsical slugs: `3XQEqE9s6dQ5B6mZ5S1AXE`, `C6Za1goSmwdNKYkqBc1B7X`.

<a id="add-res-mocks"></a>

## ➕ Mock interviews

Self-mocks (timer + recording) from Week 8; peer mocks when possible; Pramp now runs as part of Exponent (check the current free offer); paid services are optional. See [running mocks](NOTES/13_INTERVIEW_ROUNDS.md#add-int-mocks).


---

## Original free resource directory (Study-Plan doc 01)

*Source: Study-Plan/01_Free_Resource_Directory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="s01-free-resource-directory"></a>

### Free Resource Directory
Document 01 - Every resource here is free. Nothing in this plan requires a paid course.
Resources for the two parallel tracks live in their own documents: AI development, MCP and RAG in Document 12, and aptitude in Document 13. Behavioural resources are in Document 14.
<a id="s01-how-to-use-this-directory"></a>

### How to use this directory
The monthly documents name topics and reference this directory for where to learn them. Resist collecting more resources than these. Resource hunting is a very comfortable form of procrastination. One primary source per topic, one backup, then start.
A hard rule for every item below: you are not finished with a resource when you have watched or read it. You are finished when you can explain its content with it closed.
<a id="s01-1-c-and-net-depth"></a>

### 1. C# and .NET - depth

| Resource | What it is best for | Type |
|---|---|---|
| Microsoft Learn - .NET learn.microsoft.com/dotnet | The canonical reference. Language guide, runtime, ASP.NET Core, EF Core. Start every topic here | Docs |
| .NET Blog devblogs.microsoft.com/dotnet | Deep engineering posts from the team that builds it | Blog |
| How Async/Await Really Works (Stephen Toub, .NET Blog) | The single best article on async. Read it three times across the plan | Article |
| Deep .NET (YouTube, Microsoft Developer) | Toub and Hanselman on async, spans, GC, LINQ internals. Best deep-dive video series that exists | Video |
| SharpLab sharplab.io | Paste C#, see the compiler-generated code. Use it to actually see the async state machine and closures | Tool |
| source.dot.net | Browse the real .NET source. When docs are ambiguous, read the implementation | Tool |
| Book of the Runtime (BotR) in github.com/dotnet/runtime docs | CLR internals: type loader, GC design, JIT. Month 2 material | Docs |
| Stephen Cleary's blog blog.stephencleary.com | The authority on async pitfalls, deadlocks, ConfigureAwait | Blog |
| Konrad Kokosa tooslowexception.com | .NET memory and GC internals | Blog |
| Nick Chapsas (YouTube) | Modern C#, performance, testing, clean patterns. Free videos | Video |
| Milan Jovanovic (YouTube + blog) | .NET architecture, DDD, clean architecture, CQRS | Video |
| Tim Corey (YouTube) | Long-form fundamentals, well paced for filling gaps | Video |
| Exercism C# track exercism.org | ~150 free exercises with human mentoring. Excellent for language fluency | Practice |
| BenchmarkDotNet benchmarkdotnet.org | Prove your optimisation claims with numbers. Needed for the project | Tool |

<a id="s01-2-dsa-learning-and-practice"></a>

### 2. DSA - learning and practice

| Resource | What it is best for | Type |
|---|---|---|
| NeetCode neetcode.io | Free roadmap + NeetCode 150 + video for every problem. Your primary DSA spine | Practice |
| NeetCode YouTube | Explanations that build intuition rather than reciting code | Video |
| Grind 75 techinterviewhandbook.org/grind75 | Configurable ordered list by weeks available. Set it to your timeline | List |
| Blind 75 | The classic minimum set. ~85% overlap with NeetCode 150 | List |
| Tech Interview Handbook techinterviewhandbook.org | Free and genuinely excellent: algorithms, behavioural, resume, negotiation | Guide |
| Sean Prashad's Leetcode Patterns seanprashad.com/leetcode-patterns | Problems grouped by pattern with company tags. Free | List |
| LeetCode free tier leetcode.com | Where you actually solve. Free tier is sufficient - premium is not required | Practice |
| CSES Problem Set cses.fi/problemset | Free, high quality, strong on graphs and DP | Practice |
| VisuAlgo visualgo.net | Watch the data structure move. Use when a structure will not click | Tool |
| Big-O Cheat Sheet bigocheatsheet.com | Complexity reference for common operations | Reference |
| MIT OCW 6.006 | University-grade algorithms if you want theory beneath the patterns | Course |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] NeetCode 150 contains all of Blind 75 (not '~85% overlap').

<a id="s01-3-system-design"></a>

### 3. System design

| Resource | What it is best for | Type |
|---|---|---|
| System Design Primer github.com/donnemartin/system-design-primer | 270k+ stars. The most complete free system design resource. Primary | Repo |
| ByteByteGo (YouTube) | Short, clear, visual explanations of every core concept. Free videos | Video |
| Hello Interview hellointerview.com | Free written system design guides and a strong delivery framework | Guide |
| Gaurav Sen (YouTube) | Long-form design walkthroughs with reasoning shown | Video |
| Arpit Bhayani arpitbhayani.me + YouTube | Deep backend and distributed internals. Excellent for the "how does it really work" layer | Video |
| Jordan has no life (YouTube) | Distributed systems and DDIA concepts explained properly | Video |
| Martin Kleppmann's distributed systems lectures (YouTube, Cambridge) | Free lecture series + free PDF notes. The rigorous option | Course |
| MIT 6.5840 Distributed Systems | Raft, consistency, fault tolerance. Free lectures and labs | Course |
| Jepsen jepsen.io | Real analyses of how real databases break their consistency claims | Articles |
| The Twelve-Factor App 12factor.net | Short, and shapes how you build the project | Guide |
| Excalidraw excalidraw.com / draw.io app.diagrams.net | Diagramming for practice and for your project README | Tool |

<a id="s01-4-computer-science-fundamentals"></a>

### 4. Computer science fundamentals

| Resource | What it is best for | Type |
|---|---|---|
| Gate Smashers / Neso Academy (YouTube) | Operating systems and networking, clearly taught, exam-grade coverage. Free | Video |
| High Performance Browser Networking hpbn.co | Free full book by Ilya Grigorik. TCP, TLS, HTTP/2, WebSockets. Excellent | Book |
| Beej's Guide to Network Programming beej.us/guide/bgnet | Sockets from the ground up, free | Book |
| MDN HTTP docs developer.mozilla.org | Methods, status codes, headers, caching, CORS | Docs |
| Use The Index, Luke use-the-index-luke.com | Free book on SQL indexing and execution plans. Directly upgrades your day job | Book |
| PostgreSQL documentation | MVCC, isolation levels, EXPLAIN. Among the best DB docs written | Docs |
| SQLBolt sqlbolt.com / PG Exercises pgexercises.com | Interactive SQL practice, free | Practice |
| OSTEP pages.cs.wisc.edu/~remzi/OSTEP | Free operating systems textbook. Processes, threads, scheduling, concurrency | Book |

<a id="s01-5-lld-design-patterns-clean-code"></a>

### 5. LLD, design patterns, clean code

| Resource | What it is best for | Type |
|---|---|---|
| Refactoring Guru refactoring.guru | Design patterns and refactoring with C# examples. Clear and free | Guide |
| SourceMaking sourcemaking.com | Patterns and anti-patterns | Guide |
| Microsoft .NET architecture guides learn.microsoft.com/dotnet/architecture | Free e-books: microservices, DDD, containerised apps | Book |
| Awesome Low Level Design (GitHub) | LLD problem statements: parking lot, elevator, rate limiter, splitwise | Repo |

<a id="s01-6-devops-ci-cd-cloud"></a>

### 6. DevOps, CI/CD, cloud

| Resource | What it is best for | Type |
|---|---|---|
| GitHub Actions docs docs.github.com/actions | Your CI/CD spine for the project. Free minutes on public repos | Docs |
| Docker docs docs.docker.com | Dockerfile, compose, multi-stage builds, networking | Docs |
| Play with Docker labs.play-with-docker.com | Free browser Docker sandbox, no local install needed | Lab |
| AWS Free Tier aws.amazon.com/free | Where the project gets deployed. Set a billing alarm on day one | Cloud |
| AWS Skill Builder (free tier) | Free official courses on SQS, SES, EventBridge, ECS, RDS | Course |
| k6 k6.io | Free open source load testing. Required for the project's performance report | Tool |
| Prometheus + Grafana docs | Metrics and dashboards for the project's observability phase | Docs |
| Serilog serilog.net | Structured logging in .NET | Docs |
| Testcontainers for .NET | Integration tests against real Postgres and Redis in Docker | Tool |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] AWS changed its Free Tier for new accounts in July 2025 to a credit-based free plan. ECS, RDS and ElastiCache can cost money — set a billing alarm and a budget on day one and tear environments down after each lab.

<a id="s01-7-mock-interviews-the-free-path"></a>

### 7. Mock interviews - the free path
Mocks are the single highest-return activity from Month 5 onward, and the most avoided because they are uncomfortable. That discomfort is the point.

| Platform | Reality check | Cost |
|---|---|---|
| Pramp pramp.com | Peer-to-peer mocks, matched with another engineer, you interview each other. Free tier is now capped around 5 credits per month - budget them | Free (capped) |
| Google Interview Warmup grow.google/certificates/interview-warmup | Fully free, no paywall. Good for behavioural and speaking fluency | Free |
| interviewing.io | Paid mocks ($179+, more for FAANG engineers) - skip the paid tier. But their free recorded real interviews are genuinely valuable: watch how strong candidates narrate | Free content |
| Discord / Reddit study groups (r/leetcode, cscareerquestions) | Free peer mock partners. Quality varies; a consistent partner is worth a lot | Free |
| A friend or colleague | Underrated. Even a non-specialist can time you and detect rambling | Free |
| Self-recording | Phone camera, 45 minutes, one problem, narrate throughout. Watch it back once | Free |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated — verify] Pramp was folded into Exponent; check the current free peer-mock offer. interviewing.io prices change — check before relying on them.

<a id="s01-mock-schedule"></a>

##### Mock schedule

| Month | Mocks |
|---|---|
| M1-M4 | Self-recording only. Weekly. You are building content, not yet performing |
| M5 | 2 Pramp sessions. Expect them to go badly. That is data, not failure |
| M6 | 4-6 mocks: 2 DSA, 2 system design, 2 behavioural. Plus real interviews at smaller companies as calibration |
| M7 | Weekly full loop simulation: DSA + design + behavioural in one sitting |
| M8 | Targeted mocks only on your remaining weak areas |

<a id="s01-8-behavioural-and-company-research"></a>

### 8. Behavioural and company research

| Resource | What it is best for | Type |
|---|---|---|
| Amazon Leadership Principles amazon.jobs (our-workplace/leadership-principles) | Read Amazon's own wording. Do not learn them second-hand | Official |
| Amazon interviewing resources on amazon.jobs | Amazon publishes its own STAR guidance. Free and authoritative | Official |
| Tech Interview Handbook - behavioural | Free, structured question bank | Guide |
| Levels.fyi | Level calibration and compensation reality before you negotiate | Data |
| Glassdoor / LeetCode Discuss | Recent real interview reports. Filter by date - anything older than a year is stale | Reports |

<a id="s01-9-tools"></a>

### 9. Tools

| Tool | Use |
|---|---|
| Anki apps.ankiweb.net | Spaced repetition. Free on desktop and Android. Max 15 min/day |
| Obsidian or plain Word/Markdown | Master Notes. Do not over-engineer this; the notes matter, not the app |
| Excalidraw | System design diagrams, and diagrams for your project README |
| Phone voice recorder | The Explain-Aloud protocol. Already on your phone |
| A plain text editor (Notepad, VS Code with everything disabled) | Whiteboard-condition DSA practice from Month 3 |
| Git + GitHub | The project, and a green contribution graph as passive evidence |

<a id="s01-10-what-to-deliberately-ignore"></a>

### 10. What to deliberately ignore
Saying no is part of the strategy. Each of these is either paid, redundant, or an active time sink for your situation.

| Skip | Why |
|---|---|
| Paid courses (Educative, Interview Kickstart, AlgoExpert, Scaler) | Everything above covers the same ground free. Documented cases exist of free-only preparation reaching the same outcomes |
| LeetCode Premium | Useful but not necessary. Sean Prashad's list gives you company tags free |
| Learning a second language (Go, Rust, Python) | You interview in C#. Both companies accept it. Splitting focus is pure cost |
| Competitive programming (Codeforces contests) | Different skill. Interview DSA is easier and narrower |
| General spoken-English courses | Your gap is technical vocabulary under pressure, not grammar |
| Certifications (AZ-204, AWS SAA) | Neither Google nor Amazon weighs them meaningfully for SWE |
| Rebuilding your resume every month | Once in Month 1, polish in Month 6. It is not preparation |
| New framework tourism | Depth in .NET beats breadth across five stacks |

<a id="s01-a-note-on-books"></a>

### A note on books
Two books are worth owning if you ever choose to spend money, and only these two: Designing Data-Intensive Applications (Kleppmann) and System Design Interview Vol 1 (Alex Xu). Both have free substitutes listed above - Kleppmann's own lecture series and notes are free, and ByteByteGo's YouTube channel covers Xu's material. Do not buy anything before Month 3. By then you will know whether you actually need them.
