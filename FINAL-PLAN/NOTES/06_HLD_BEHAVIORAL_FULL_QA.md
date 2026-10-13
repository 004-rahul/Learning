# System design and behavioral Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q05"></a>

## Q05 — M5_System_Design_and_Behavioural

Full source content: [Q-and-A/M5_System_Design_and_Behavioural.docx](../SOURCE_LIBRARY/Q-and-A/M5_System_Design_and_Behavioural.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="Q05-B0001"></a>

Month 5 Q&A - System Design and Behavioural

<a id="Q05-B0002"></a>

Weeks 17 to 20. The month you become interview-ready. 34 questions.

<a id="Q05-B0003"></a>

Covers: Weeks 17-20. Project phases 2 to 4, the estimation numbers, the classic designs, and the behavioural structure.

<a id="Q05-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q05-B0005"></a>

### How to use this on a bad week

<a id="Q05-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q05-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q05-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q05-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q05-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q05-B0011"></a>

| # | Question |
| --- | --- |
| 1 | The nine steps of a system design, in order |
| 2 | The estimation numbers you must know cold |
| 3 | Why does neither pure fan-out strategy work at scale? |
| 4 | How do you avoid overselling inventory without a distributed transaction? |
| 5 | Why does Action get 55% of a STAR answer? |

<a id="Q05-B0012"></a>

### What this file answers

<a id="Q05-B0013"></a>

Everything in the Month 5 checkpoint - which is the gate to applying. Part A is the numbers to memorise; Part D is the behavioural structure that decides roughly half your Amazon score.

<a id="Q05-B0014"></a>

### PART A - The design framework and the numbers

<a id="Q05-Q001"></a>

<a id="Q05-B0015"></a>

### Q1. What are the nine steps, in order?

<a id="Q05-B0016"></a>

Say this. Clarify requirements. Estimate scale. Define the API. Choose the data model. Draw the high-level architecture. Identify bottlenecks. Scale it. Handle failure. State the trade-offs.

<a id="Q05-B0017"></a>

Why. The order is the skill. Candidates who improvise the order ramble and run out of time; candidates who follow a framework sound senior even when the design is imperfect - because the interviewer can follow them.

<a id="Q05-B0018"></a>

Watch out. Step 9 is where the round is won. Anyone can draw boxes. "I chose eventual consistency here, so a user may see a stale count - fine for a view counter, unacceptable for an account balance" is what gets you hired.

<a id="Q05-Q002"></a>

<a id="Q05-B0019"></a>

### Q2. How do you budget the 45 minutes?

<a id="Q05-B0020"></a>

Say this. Five minutes on requirements and scope. Five on scale estimation. Five on the API. Five on the data model. Ten on the architecture. Ten on bottlenecks, scaling and failure. Five on trade-offs and questions. Watch the clock and say what you are skipping.

<a id="Q05-B0021"></a>

Why. Running out of time before you draw anything is the single most common failure. Announcing "I have about ten minutes left so I will focus on the write path" is itself a senior signal.

<a id="Q05-B0022"></a>

Watch out. If the interviewer pushes you into a detail early, answer briefly and then say "I want to come back to that once the high-level shape is down" - and then actually come back.

<a id="Q05-Q003"></a>

<a id="Q05-B0023"></a>

### Q3. What estimation numbers must you know cold?

<a id="Q05-B0024"></a>

Say this. Powers of two: 2^10 is a thousand, 2^20 a million, 2^30 a billion. So a 32-bit int holds about 4 billion, and 4 KB is a page. Time: 86,400 seconds in a day, so 1 million requests a day is about 12 per second, and 100 million a day is about 1,200 per second. Latency: memory access nanoseconds, SSD read tens of microseconds, network round trip within a datacentre about half a millisecond, cross-continent 100-150 milliseconds, disk seek a few milliseconds.

<a id="Q05-B0025"></a>

Why. You need them so you can compute out loud without stalling. The interviewer is watching whether you can reason about magnitude, not whether you are precise.

<a id="Q05-B0026"></a>

Watch out. Round aggressively and say you are rounding. "Call it a thousand a second, so ten servers at a hundred each with headroom" is exactly the right register.

<a id="Q05-Q004"></a>

<a id="Q05-B0027"></a>

### Q4. How do you estimate storage for a design?

<a id="Q05-B0028"></a>

Say this. Rows per day times bytes per row times retention. Be explicit about the row: an ID is 8 bytes, a timestamp 8, a short string 50-100, a UUID 16. Then add indexes, which are often the same size again, and replication, which multiplies by the replica count.

<a id="Q05-B0029"></a>

Why. People forget indexes and replication and then under-estimate by three to five times. Mentioning both unprompted is a strong signal.

<a id="Q05-B0030"></a>

Watch out. Then sanity check it. "That is 2 TB a year, which one machine can hold, so I do not need sharding yet" is a conclusion. A number with no conclusion is not an estimate.

<a id="Q05-B0031"></a>

### PART B - The classic designs, and the one hard part of each

<a id="Q05-Q005"></a>

<a id="Q05-B0032"></a>

### Q5. Why does neither pure fan-out strategy work for a news feed?

<a id="Q05-B0033"></a>

Say this. Fan-out on write precomputes each follower's feed when you post - reads are then trivial, but a celebrity with ten million followers causes ten million writes for one post. Fan-out on read assembles the feed at request time - writes are trivial, but every read now queries every followee, which is slow for the common case. So real systems do both: fan-out on write for normal users, and merge celebrity posts in at read time.

<a id="Q05-B0034"></a>

Why. The distributions are extreme. Most users have few followers and read often; a few have enormous follower counts. One strategy cannot be right for both ends.

<a id="Q05-B0035"></a>

Watch out. Naming this as the celebrity problem and giving the hybrid answer is the expected senior response.

<a id="Q05-Q006"></a>

<a id="Q05-B0036"></a>

### Q6. How do you avoid overselling inventory without a distributed transaction?

<a id="Q05-B0037"></a>

Say this. Reserve rather than deduct. On add-to-cart or checkout, create a reservation row with a short expiry, using a conditional update - decrement available stock only if available is greater than zero, in one atomic statement. Payment success converts the reservation to a sale; expiry releases it. A background job sweeps expired reservations.

<a id="Q05-B0038"></a>

Why. The atomic conditional update is the whole trick: the database is already a consensus system for a single row, so you use it rather than coordinating across services.

<a id="Q05-B0039"></a>

Watch out. Be ready for "what if payment succeeds after the reservation expired?" Answer: a compensating action - refund, or re-reserve if stock allows - and say explicitly that you accept rare oversell over a distributed transaction. That is the saga trade.

<a id="Q05-Q007"></a>

<a id="Q05-B0040"></a>

### Q7. Why are payment systems obsessed with idempotency?

<a id="Q05-B0041"></a>

Say this. Because a retry must not charge twice and the network cannot tell you whether the first attempt succeeded. So every charge carries a client-generated idempotency key; the provider stores it and returns the original result for any repeat. Your side does the same for your own writes.

<a id="Q05-B0042"></a>

Why. Money is the one domain where at-least-once with a non-idempotent handler is immediately and visibly wrong to the customer.

<a id="Q05-B0043"></a>

Watch out. Also: reconciliation. You compare your ledger against the provider's daily and investigate differences, because eventually something will diverge. And webhooks must be idempotent for the same reason - providers retry them.

<a id="Q05-Q008"></a>

<a id="Q05-B0044"></a>

### Q8. How do you deliver a message to a device that is offline?

<a id="Q05-B0045"></a>

Say this. Persist first, deliver second. The message is written to storage with a per-conversation sequence number, then pushed to whatever devices are connected. An offline device, on reconnect, sends the last sequence number it has and pulls everything after it. A push notification via FCM or APNs wakes the app so it reconnects sooner.

<a id="Q05-B0046"></a>

Why. The connection is a fast path, not the source of truth. Once storage is authoritative, offline delivery is just a resume-from-cursor problem.

<a id="Q05-B0047"></a>

Watch out. You did this with SignalR and FCM in VCDoctor - multi-device signalling is exactly the hard part. Use that, and mention per-device cursors, since two devices are at different positions.

<a id="Q05-Q009"></a>

<a id="Q05-B0048"></a>

### Q9. What is the hard part of a file storage design?

<a id="Q05-B0049"></a>

Say this. Chunking and deduplication. Split each file into fixed-size chunks, hash each chunk, and store chunks by hash - so an identical chunk is stored once no matter how many files or users contain it. Metadata maps a file to an ordered list of chunk hashes. Sync then only transfers chunks the server does not already have.

<a id="Q05-B0050"></a>

Why. It makes resumable upload trivial, makes a small edit to a large file cheap, and gives deduplication for free - all from one decision.

<a id="Q05-B0051"></a>

Watch out. The trade-off: fixed-size chunking breaks when you insert bytes near the start, because every subsequent boundary shifts. Content-defined chunking with a rolling hash fixes that at higher CPU cost.

<a id="Q05-Q010"></a>

<a id="Q05-B0052"></a>

### Q10. Compare the rate limiting algorithms.

<a id="Q05-B0053"></a>

Say this. Fixed window - a counter per interval. Simplest, but allows double the limit across a boundary. Sliding window log - store every timestamp. Exact, but memory grows with traffic. Sliding window counter - weight the previous window. Good approximation, cheap. Token bucket - refills at a rate up to a capacity. Allows a controlled burst and is usually the right default. Leaky bucket - drains at a constant rate, smoothing output.

<a id="Q05-B0054"></a>

Why. They differ in how much burst they permit and how much state they cost. Token bucket wins in practice because real traffic is bursty and rejecting a legitimate burst is worse than allowing it.

<a id="Q05-B0055"></a>

Watch out. Whichever you pick, the state must be shared across instances and updated atomically. A per-instance limiter multiplies your limit by the number of instances - a real bug, not a theoretical one.

<a id="Q05-B0056"></a>

### PART C - Your project, in production terms

<a id="Q05-Q011"></a>

<a id="Q05-B0057"></a>

### Q11. How do you stop one tenant starving the others?

<a id="Q05-B0058"></a>

Say this. Per-tenant fairness rather than a single global queue. Either a queue per tenant with round-robin consumption, or weighted fair queueing, plus a per-tenant concurrency cap and a rate limit at the API. Without that, a tenant submitting a hundred thousand jobs owns the whole worker pool.

<a id="Q05-B0059"></a>

Why. A single FIFO queue is fair in arrival order, which is not the same as fair between tenants. A bulk submitter legitimately gets everything.

<a id="Q05-B0060"></a>

Watch out. This is the multi-tenant version of the bulkhead pattern, and it is a genuinely good thing to have in your project because most demo projects miss it.

<a id="Q05-Q012"></a>

<a id="Q05-B0061"></a>

### Q12. How do you prove tenant isolation rather than assert it?

<a id="Q05-B0062"></a>

Say this. A test that tries to read tenant B's job as tenant A and asserts a 404 or 403. Then enforce it in one place - a query filter or repository layer that always applies the tenant predicate - rather than remembering it at every call site.

<a id="Q05-B0063"></a>

Why. Isolation implemented per-endpoint will be forgotten on the twelfth endpoint. Implemented once as a filter, it cannot be forgotten.

<a id="Q05-B0064"></a>

Watch out. Prefer 404 over 403 for another tenant's resource - 403 confirms the ID exists, which leaks information.

<a id="Q05-Q013"></a>

<a id="Q05-B0065"></a>

### Q13. Liveness or readiness - what is the difference and why does it matter?

<a id="Q05-B0066"></a>

Say this. Liveness answers "is this process healthy, or should it be restarted?" Readiness answers "can it serve traffic right now?" A pod warming a cache or waiting for a database is alive but not ready. Getting them backwards is dangerous: if liveness checks a database, a database blip restarts every instance simultaneously.

<a id="Q05-B0067"></a>

Why. Liveness controls the restart decision; readiness controls the load balancer. Coupling liveness to a shared dependency turns a dependency outage into a total outage.

<a id="Q05-B0068"></a>

Watch out. Liveness should check almost nothing - "is the event loop responsive". Readiness checks dependencies. That distinction is the answer.

<a id="Q05-Q014"></a>

<a id="Q05-B0069"></a>

### Q14. What do p50, p95 and p99 tell you, and why not the average?

<a id="Q05-B0070"></a>

Say this. p99 means 99% of requests were faster than this. The average hides the tail: a system with a 50 ms average can have a 3-second p99, and that 1% is who complains. At scale 1% is a lot of people, and a page making twenty calls will hit the p99 on most page loads.

<a id="Q05-B0071"></a>

Why. Averages are dominated by the bulk; latency problems live in the tail. Percentiles are the only honest measure.

<a id="Q05-B0072"></a>

Watch out. Never average percentiles across servers - it is mathematically meaningless. And measure p99 of what the user experiences, not of one internal call.

<a id="Q05-Q015"></a>

<a id="Q05-B0073"></a>

### Q15. Why do multi-stage Docker builds matter?

<a id="Q05-B0074"></a>

Say this. You build with the SDK in one stage and copy only the published output into a runtime-only final image. The compiler, sources, NuGet cache and intermediate files never reach the shipped image - typically a several-hundred-megabyte image becomes under a hundred.

<a id="Q05-B0075"></a>

Why. Smaller images pull faster, start faster, and have a smaller attack surface because there is no compiler or shell tooling to exploit.

<a id="Q05-B0076"></a>

Watch out. Have your own before-and-after numbers from week 19, and mention running as a non-root user - it is a one-line change interviewers notice.

<a id="Q05-Q016"></a>

<a id="Q05-B0077"></a>

### Q16. What does your CI pipeline protect against, stage by stage?

<a id="Q05-B0078"></a>

Say this. Restore and build catches "it does not compile on a clean machine". Unit tests catch logic regressions. Integration tests against real Postgres and Redis catch wiring and SQL problems a mock would hide. Lint and analysers catch a class of bug and enforce consistency. Branch protection stops any of it being bypassed. Then the CD half builds and pushes an image only from a green build.

<a id="Q05-B0079"></a>

Why. Each stage is a category of failure caught at the cheapest point. The value is in what it prevents reaching production, not in the pipeline itself.

<a id="Q05-B0080"></a>

Watch out. "I built it rather than copying a template" matters here - be able to explain why each stage exists, because a copied pipeline is obvious under one follow-up.

<a id="Q05-Q017"></a>

<a id="Q05-B0081"></a>

### Q17. How do you actually find a bottleneck under load?

<a id="Q05-B0082"></a>

Say this. Ramp the load in steps rather than jumping to the maximum. Watch where p95 turns sharply upward - that is saturation. At that point look at what is queuing: connection pool waits, queue depth, CPU, disk. Change one thing, re-measure, confirm the curve moved. Then stop, because the next bottleneck is always somewhere else.

<a id="Q05-B0083"></a>

Why. A step ramp shows you the curve; a single big number tells you only pass or fail. The bend in the curve is the information.

<a id="Q05-B0084"></a>

Watch out. "I scaled workers from one to four and throughput went up 3.2x, so it scales horizontally but not linearly - the database became the limit" is a genuinely excellent sentence. Have your version of it.

<a id="Q05-B0085"></a>

### PART D - Behavioural structure

<a id="Q05-Q018"></a>

<a id="Q05-B0086"></a>

### Q18. Why does Action get 55% of a STAR answer?

<a id="Q05-B0087"></a>

Say this. Because Action is what is scored. Situation and Task are context the interviewer needs to understand the Action, and Result is the evidence it worked. What they are assessing is what you decided, what you rejected, and why - and all of that lives in Action.

<a id="Q05-B0088"></a>

Why. The rubric asks "what did this person do and how did they think". Three minutes of company background gives the interviewer nothing to write down.

<a id="Q05-B0089"></a>

Watch out. Two sentences of Situation. Genuinely two. Then your ownership in one, then the bulk on Action, then a number.

<a id="Q05-Q019"></a>

<a id="Q05-B0090"></a>

### Q19. Why does saying "we" cost you the answer?

<a id="Q05-B0091"></a>

Say this. Because the interviewer is hiring you, not your team. "We decided to redesign the pipeline" is unscoreable - it could mean you led it or you watched. "I proposed the event-driven design, and the team pushed back on cost, so I built a small prototype to show the numbers" is scoreable.

<a id="Q05-B0092"></a>

Why. The signal they need is attribution. Without "I", there is nothing to attribute.

<a id="Q05-B0093"></a>

Watch out. Use "we" deliberately where the work genuinely was collaborative. The contrast makes the "I" credible rather than boastful - all-"I" reads as taking credit.

<a id="Q05-Q020"></a>

<a id="Q05-B0094"></a>

### Q20. What makes a Have Backbone story work?

<a id="Q05-B0095"></a>

Say this. A real disagreement with someone more senior, argued with data rather than opinion, and then - this is the half people omit - full commitment to whatever was decided, including when you lost. "I disagreed, I made my case with numbers, the decision went the other way, and I implemented it properly and it worked out" is a complete answer.

<a id="Q05-B0096"></a>

Why. The principle has two clauses. Candidates prepare the disagreement and forget the commit, which reads as someone who argues and then sulks.

<a id="Q05-B0097"></a>

Watch out. This is the most under-prepared principle and you need a genuine example. Start noticing these moments at work now and writing them down the same day - you will not remember them in week 17.

<a id="Q05-Q021"></a>

<a id="Q05-B0098"></a>

### Q21. What makes an Earn Trust story work?

<a id="Q05-B0099"></a>

Say this. A time you were wrong, or received hard feedback, and responded well. Not a disguised success - an actual mistake, what it cost, what you did about it, and what changed in how you work.

<a id="Q05-B0100"></a>

Why. The principle is testing self-criticism. A candidate who cannot describe being wrong is either not self-aware or not honest, and interviewers read it as the second.

<a id="Q05-B0101"></a>

Watch out. Candidates instinctively avoid stories that make them look bad, which is exactly backwards here. The story that makes you look human is the one that scores.

<a id="Q05-Q022"></a>

<a id="Q05-B0102"></a>

### Q22. How do you answer "what would you do differently?"

<a id="Q05-B0103"></a>

Say this. Give a real answer with a reason, and make it a design decision rather than a personal failing. "I would have added the dead letter queue in the first iteration instead of the third - we spent two weeks debugging failures that a DLQ would have made visible in an hour."

<a id="Q05-B0104"></a>

Why. It is the maturity signal. Every real project has something you would change, and a candidate who says "nothing" has either not reflected or is not being honest.

<a id="Q05-B0105"></a>

Watch out. Have one prepared for every story. It is asked constantly and improvising it produces either a non-answer or an unflattering one.

<a id="Q05-Q023"></a>

<a id="Q05-B0106"></a>

### Q23. The interviewer keeps asking "why" until you run out. What do you do?

<a id="Q05-B0107"></a>

Say this. Say so, and say how you would find out. "I do not know the exact figure - what I remember is the order of magnitude, and I would confirm it from the CloudWatch metrics." Reaching the edge of your knowledge is the design of the Bar Raiser round, not a failure.

<a id="Q05-B0108"></a>

Why. They are calibrating depth, and they cannot do that without finding the edge. Inventing a number is the one response that reliably fails, because it is often detectable and it destroys trust in everything you said before.

<a id="Q05-B0109"></a>

Watch out. "I do not know, but here is how I would find out" scores well. "I do not know" and silence does not. The second half is the whole answer.

<a id="Q05-Q024"></a>

<a id="Q05-B0110"></a>

### Q24. How do you quantify a story when you do not have exact numbers?

<a id="Q05-B0111"></a>

Say this. Use the order of magnitude and say that is what you are doing. "It was in the region of a hundred thousand records - I do not have the exact figure to hand." That is honest, memorable, and far better than a precise-sounding invention.

<a id="Q05-B0112"></a>

Why. Interviewers forget adjectives and remember numbers. "Significantly faster" is forgotten in a minute; "seven to ten hours down to about ninety minutes" is remembered after the loop.

<a id="Q05-B0113"></a>

Watch out. Your strongest numbers: 80% reduction, seven-to-ten hours to ninety minutes, 100,000+ records, one worker versus four. Know them cold and pause after saying them.

<a id="Q05-Q025"></a>

<a id="Q05-B0114"></a>

### Q25. Which of your stories is the flagship, and what does that mean for preparation?

<a id="Q05-B0115"></a>

Say this. The email pipeline. It means it will be probed hardest and asked most often, so it needs the deepest preparation: what was actually slow and how you measured it, why SQS rather than an alternative, how you handled duplicate delivery, what surprised you, what you would do differently, and what the new bottleneck became.

<a id="Q05-B0116"></a>

Why. A weak follow-up on your best story is worse than not telling it, because it suggests the headline number was not really yours.

<a id="Q05-B0117"></a>

Watch out. Prepare it as a set of eight answers, not one story. Then it survives any order of questioning.

<a id="Q05-B0118"></a>

### PART E - The Month 5 gate

<a id="Q05-B0119"></a>

This is the most important checkpoint in the plan. Do not start applying to your top targets until these are genuinely true. The plan is eight months precisely so a two-week delay here is affordable - and applying with a half-built project converts a strong candidate into a rejection plus a 6-12 month cooldown, which is far more expensive.

<a id="Q05-B0120"></a>

| # | True? |
| --- | --- |
| 1 | The project is deployed and publicly reachable |
| 2 | It survives a worker being killed mid-job, with the job recovered |
| 3 | It handles duplicate delivery without double-processing, and I can demonstrate it |
| 4 | Retries with backoff and jitter, and a working DLQ with replay |
| 5 | A rate limiter that is correct across multiple instances |
| 6 | A metrics dashboard and health checks |
| 7 | Load tested, with real p95/p99 numbers written down |
| 8 | I know my bottleneck and can evidence it with a number |
| 9 | CI/CD green, and I built it rather than copying it |
| 10 | README complete with an architecture diagram and stated trade-offs |
| 11 | 15-20 STAR stories written and rehearsed aloud |
| 12 | Every high-frequency Amazon principle covered by at least two stories |
| 13 | A Have Backbone story that is genuinely mine |
| 14 | 9 system designs completed, all timed at 45 minutes |
| 15 | I can explain the project in 5 minutes, and defend it for 30 |

<a id="Q05-B0121"></a>

If several are "no" - spend the first two weeks of month 6 repairing, then apply. That is the plan working as designed, not the plan failing.
