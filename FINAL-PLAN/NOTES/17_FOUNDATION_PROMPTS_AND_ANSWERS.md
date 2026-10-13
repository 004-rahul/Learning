# Every foundation prompt with an added answer or practice outline

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

The first part preserves the complete original prompt list. The second supplies answers and design/behavioral starting outlines for every technical question, listed design and behavioral prompt. These outlines start practice; they are not complete implemented designs or invented personal stories.

<a id="QS"></a>

## QS — system-designdistributed-systems foundation

Full source content: [Q-and-A/system-designdistributed-systems foundation.docx](../SOURCE_LIBRARY/Q-and-A/system-designdistributed-systems%20foundation.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="QS-B0001"></a>

### 1. System Design fundamentals — add these

<a id="QS-B0002"></a>

- What is horizontal vs vertical scaling?

<a id="QS-B0003"></a>

- What is stateless vs stateful architecture?

<a id="QS-B0004"></a>

- When should you use a load balancer?

<a id="QS-B0005"></a>

- L4 vs L7 load balancer?

<a id="QS-B0006"></a>

- Reverse proxy vs API gateway?

<a id="QS-B0007"></a>

- What is service discovery?

<a id="QS-B0008"></a>

- Client-side vs server-side service discovery?

<a id="QS-B0009"></a>

- What is DNS and how does DNS-based load balancing work?

<a id="QS-B0010"></a>

- What is CDN and when should you use it?

<a id="QS-B0011"></a>

- What is caching and what are cache-aside, write-through, write-back and read-through?

<a id="QS-B0012"></a>

- What are cache invalidation strategies?

<a id="QS-B0013"></a>

- What is cache stampede/thundering herd and how do you prevent it?

<a id="QS-B0014"></a>

- What is consistent hashing and why is it useful?

<a id="QS-B0015"></a>

- What is database sharding?

<a id="QS-B0016"></a>

- What are good shard keys and bad shard keys?

<a id="QS-B0017"></a>

- What is hot partition/hot key and how do you handle it?

<a id="QS-B0018"></a>

- SQL vs NoSQL — when would you choose each?

<a id="QS-B0019"></a>

- When should you use a relational database vs document/key-value/wide-column database?

<a id="QS-B0020"></a>

- What is database indexing and what are the trade-offs?

<a id="QS-B0021"></a>

- What is replication vs partitioning?

<a id="QS-B0022"></a>

- What is leader-follower replication?

<a id="QS-B0023"></a>

- What is read-after-write consistency?

<a id="QS-B0024"></a>

- What is eventual consistency?

<a id="QS-B0025"></a>

- What is strong consistency?

<a id="QS-B0026"></a>

- What is quorum read/write?

<a id="QS-B0027"></a>

- What is CAP theorem, and what does it actually mean?

<a id="QS-B0028"></a>

- What is PACELC?

<a id="QS-B0029"></a>

- What is backpressure?

<a id="QS-B0030"></a>

- What is asynchronous vs synchronous communication?

<a id="QS-B0031"></a>

- Queue vs pub/sub vs event stream?

<a id="QS-B0032"></a>

- What is at-most-once, at-least-once and exactly-once delivery?

<a id="QS-B0033"></a>

- What is idempotency and how do you design an idempotent API?

<a id="QS-B0034"></a>

- What is API versioning?

<a id="QS-B0035"></a>

- Pagination: offset vs cursor-based?

<a id="QS-B0036"></a>

- How do you handle large API responses?

<a id="QS-B0037"></a>

- What is request hedging?

<a id="QS-B0038"></a>

- What is graceful degradation?

<a id="QS-B0039"></a>

- What is graceful shutdown?

<a id="QS-B0040"></a>

These are high-priority because they form the vocabulary needed to solve almost every system-design problem.

<a id="QS-B0041"></a>

### 2. Database internals — important gap

<a id="QS-B0042"></a>

Your current material talks about transactions and isolation, but I'd add:

<a id="QS-B0043"></a>

- What is a database transaction?

<a id="QS-B0044"></a>

- ACID — what does each property actually guarantee?

<a id="QS-B0045"></a>

- What are dirty reads, non-repeatable reads and phantom reads?

<a id="QS-B0046"></a>

- Read committed vs repeatable read vs serializable?

<a id="QS-B0047"></a>

- Optimistic vs pessimistic locking?

<a id="QS-B0048"></a>

- Row-level vs table-level locking?

<a id="QS-B0049"></a>

- What is MVCC?

<a id="QS-B0050"></a>

- What is a deadlock and how does a database handle it?

<a id="QS-B0051"></a>

- What is a B-tree index?

<a id="QS-B0052"></a>

- Why can too many indexes hurt writes?

<a id="QS-B0053"></a>

- Composite indexes — how does column order matter?

<a id="QS-B0054"></a>

- What is a covering index?

<a id="QS-B0055"></a>

- What is query execution planning?

<a id="QS-B0056"></a>

- What causes an N+1 query problem?

<a id="QS-B0057"></a>

- What is connection pooling?

<a id="QS-B0058"></a>

- What happens when the DB connection pool is exhausted?

<a id="QS-B0059"></a>

- Database migration strategies for zero-downtime deployments?

<a id="QS-B0060"></a>

- What is CDC (Change Data Capture)?

<a id="QS-B0061"></a>

- When would you use CDC instead of an application-level event?

<a id="QS-B0062"></a>

Priority: High for SDE-II.

<a id="QS-B0063"></a>

### 3. Distributed systems — missing important topics

<a id="QS-B0064"></a>

Month 7 covers a lot, but I'd still add:

<a id="QS-B0065"></a>

- What is a distributed system's failure model?

<a id="QS-B0066"></a>

- What is a network partition?

<a id="QS-B0067"></a>

- What is split-brain?

<a id="QS-B0068"></a>

- What is quorum?

<a id="QS-B0069"></a>

- Why does majority voting help?

<a id="QS-B0070"></a>

- What is leader/follower replication?

<a id="QS-B0071"></a>

- What happens when the leader dies?

<a id="QS-B0072"></a>

- What is leader lease vs leader election?

<a id="QS-B0073"></a>

- What is gossip protocol?

<a id="QS-B0074"></a>

- What is vector clock?

<a id="QS-B0075"></a>

- What is Lamport clock?

<a id="QS-B0076"></a>

- Why do distributed systems need logical clocks?

<a id="QS-B0077"></a>

- What is clock skew?

<a id="QS-B0078"></a>

- Why can't you rely on wall-clock timestamps for ordering?

<a id="QS-B0079"></a>

- What is monotonic clock?

<a id="QS-B0080"></a>

- What is distributed tracing?

<a id="QS-B0081"></a>

- What is OpenTelemetry?

<a id="QS-B0082"></a>

- What is backpressure in distributed systems?

<a id="QS-B0083"></a>

- How do you prevent cascading failures?

<a id="QS-B0084"></a>

- How do you handle partial failure?

<a id="QS-B0085"></a>

- What is graceful degradation?

<a id="QS-B0086"></a>

- What is load shedding?

<a id="QS-B0087"></a>

- What is admission control?

<a id="QS-B0088"></a>

- What is retry storm?

<a id="QS-B0089"></a>

- What is exponential backoff with jitter?

<a id="QS-B0090"></a>

- What is request hedging and when can it make things worse?

<a id="QS-B0091"></a>

The clock/time questions are especially worth adding because they often separate basic distributed-systems knowledge from deeper understanding.

<a id="QS-B0092"></a>

### 4. Kafka/streaming — only a few more

<a id="QS-B0093"></a>

Month 7 is already excellent here. I would only add:

<a id="QS-B0094"></a>

- Kafka partition vs consumer — how does parallelism work?

<a id="QS-B0095"></a>

- What happens when there are more consumers than partitions?

<a id="QS-B0096"></a>

- What happens when there are fewer consumers than partitions?

<a id="QS-B0097"></a>

- Kafka offset management — auto commit vs manual commit?

<a id="QS-B0098"></a>

- What happens if a consumer crashes after processing but before committing its offset?

<a id="QS-B0099"></a>

- How do you implement idempotent Kafka consumers?

<a id="QS-B0100"></a>

- Kafka retention vs log compaction?

<a id="QS-B0101"></a>

- Kafka producer batching and compression?

<a id="QS-B0102"></a>

- What is a poison message in streaming?

<a id="QS-B0103"></a>

- How do you handle schema evolution?

<a id="QS-B0104"></a>

- What is Schema Registry and why is it useful?

<a id="QS-B0105"></a>

- What is exactly-once processing when an external database is involved?

<a id="QS-B0106"></a>

- Kafka vs RabbitMQ vs SQS vs Pub/Sub — when would you choose each?

<a id="QS-B0107"></a>

These are enough. Don't turn Kafka into a separate six-week subject unless the target role specifically requires it.

<a id="QS-B0108"></a>

### 5. Classic system-design problems

<a id="QS-B0109"></a>

Your current list gives you concepts, but you should also have a small set of designs you can actually solve from a blank page.

<a id="QS-B0110"></a>

I'd add these to your design practice list:

<a id="QS-B0111"></a>

### Must know

<a id="QS-B0112"></a>

- Design URL shortener

<a id="QS-B0113"></a>

- Design Twitter/X news feed

<a id="QS-B0114"></a>

- Design WhatsApp/chat system

<a id="QS-B0115"></a>

- Design notification system

<a id="QS-B0116"></a>

- Design rate limiter

<a id="QS-B0117"></a>

- Design distributed cache

<a id="QS-B0118"></a>

- Design file storage / Dropbox

<a id="QS-B0119"></a>

- Design video streaming service

<a id="QS-B0120"></a>

- Design Uber

<a id="QS-B0121"></a>

- Design food delivery system

<a id="QS-B0122"></a>

- Design ticket booking system

<a id="QS-B0123"></a>

- Design payment system

<a id="QS-B0124"></a>

- Design e-commerce checkout

<a id="QS-B0125"></a>

- Design inventory/stock reservation

<a id="QS-B0126"></a>

- Design web crawler

<a id="QS-B0127"></a>

- Design search/autocomplete

<a id="QS-B0128"></a>

- Design metrics/monitoring system

<a id="QS-B0129"></a>

- Design logging system

<a id="QS-B0130"></a>

- Design job scheduler

<a id="QS-B0131"></a>

- Design email delivery system

<a id="QS-B0132"></a>

### Then a few harder ones

<a id="QS-B0133"></a>

- Design Google Docs / collaborative editing

<a id="QS-B0134"></a>

- Design YouTube

<a id="QS-B0135"></a>

- Design Instagram

<a id="QS-B0136"></a>

- Design Google Maps / nearby places

<a id="QS-B0137"></a>

- Design distributed task queue

<a id="QS-B0138"></a>

- Design ad-serving system

<a id="QS-B0139"></a>

- Design recommendation system

<a id="QS-B0140"></a>

- Design ride matching

<a id="QS-B0141"></a>

- Design real-time leaderboard

<a id="QS-B0142"></a>

- Design a multi-region globally distributed service

<a id="QS-B0143"></a>

You do not need 50–100 designs.

<a id="QS-B0144"></a>

For FAANG/MAANG, I'd rather see you become very good at 15–20 designs and understand the reusable patterns behind them.

<a id="QS-B0145"></a>

### 6. System-design estimation — add a few

<a id="QS-B0146"></a>

Your Month 5 numbers are good, but add:

<a id="QS-B0147"></a>

- How many requests can one server handle?

<a id="QS-B0148"></a>

- How do you estimate QPS from DAU?

<a id="QS-B0149"></a>

- How do you estimate peak QPS?

<a id="QS-B0150"></a>

- What peak-to-average ratio should you assume?

<a id="QS-B0151"></a>

- How do you estimate bandwidth?

<a id="QS-B0152"></a>

- How do you estimate storage growth?

<a id="QS-B0153"></a>

- How do you estimate cache size?

<a id="QS-B0154"></a>

- How do you estimate number of servers?

<a id="QS-B0155"></a>

- How do you estimate database capacity?

<a id="QS-B0156"></a>

- How do you estimate number of Kafka partitions?

<a id="QS-B0157"></a>

- How do you estimate queue depth?

<a id="QS-B0158"></a>

- How do you calculate availability?

<a id="QS-B0159"></a>

And know these concepts:

<a id="QS-B0160"></a>

- 99%

<a id="QS-B0161"></a>

- 99.9%

<a id="QS-B0162"></a>

- 99.99%


> Study correction: Availability percentages require a defined measurement window and evidence; planned targets are not personal achievements.

<a id="QS-B0163"></a>

- 99.999%

<a id="QS-B0164"></a>

and what downtime each allows.

<a id="QS-B0165"></a>

### 7. Behavioural — this is where I'd add more

<a id="QS-B0166"></a>

Your Month 5 behavioural section is good, but for Amazon specifically, you need broader coverage of the Leadership Principles.

<a id="QS-B0167"></a>

You should have stories for:

<a id="QS-B0168"></a>

- Customer Obsession

<a id="QS-B0169"></a>

- Ownership

<a id="QS-B0170"></a>

- Invent and Simplify

<a id="QS-B0171"></a>

- Are Right, A Lot

<a id="QS-B0172"></a>

- Learn and Be Curious

<a id="QS-B0173"></a>

- Hire and Develop the Best

<a id="QS-B0174"></a>

- Insist on the Highest Standards

<a id="QS-B0175"></a>

- Think Big

<a id="QS-B0176"></a>

- Bias for Action

<a id="QS-B0177"></a>

- Frugality

<a id="QS-B0178"></a>

- Earn Trust

<a id="QS-B0179"></a>

- Dive Deep

<a id="QS-B0180"></a>

- Have Backbone; Disagree and Commit

<a id="QS-B0181"></a>

- Deliver Results

<a id="QS-B0182"></a>

- Strive to be Earth's Best Employer

<a id="QS-B0183"></a>

- Success and Scale Bring Broad Responsibility

<a id="QS-B0184"></a>

But don't memorize 16 separate stories.

<a id="QS-B0185"></a>

Prepare around 8–10 strong stories that can map to multiple principles.

<a id="QS-B0186"></a>

For each story, prepare:

<a id="QS-B0187"></a>

- Situation

<a id="QS-B0188"></a>

- Task

<a id="QS-B0189"></a>

- What I did

<a id="QS-B0190"></a>

- Why I chose that approach

<a id="QS-B0191"></a>

- Alternatives I rejected

<a id="QS-B0192"></a>

- Conflict/disagreement

<a id="QS-B0193"></a>

- Technical decision

<a id="QS-B0194"></a>

- Failure/problem

<a id="QS-B0195"></a>

- Result with numbers

<a id="QS-B0196"></a>

- What I learned

<a id="QS-B0197"></a>

- What I'd do differently

<a id="QS-B0198"></a>

- Follow-up "why?" questions

<a id="QS-B0199"></a>

That's much more useful than collecting hundreds of behavioural questions.

<a id="QS-B0200"></a>

### 8. Behavioural questions you're still missing

<a id="QS-B0201"></a>

Add these:

<a id="QS-B0202"></a>

- Tell me about your biggest failure.

<a id="QS-B0203"></a>

- Tell me about a time you made a bad technical decision.

<a id="QS-B0204"></a>

- Tell me about a time you disagreed with your manager.

<a id="QS-B0205"></a>

- Tell me about a time you disagreed with a senior engineer.

<a id="QS-B0206"></a>

- Tell me about a time you changed someone's mind.

<a id="QS-B0207"></a>

- Tell me about a time someone changed your mind.

<a id="QS-B0208"></a>

- Tell me about a time you received difficult feedback.

<a id="QS-B0209"></a>

- Tell me about a time you gave difficult feedback.

<a id="QS-B0210"></a>

- Tell me about a time you took ownership of something outside your responsibility.

<a id="QS-B0211"></a>

- Tell me about a time you had an ambiguous problem.

<a id="QS-B0212"></a>

- Tell me about a time you had to make a decision with incomplete information.

<a id="QS-B0213"></a>

- Tell me about a time you moved quickly and made a mistake.

<a id="QS-B0214"></a>

- Tell me about a time you prevented a major problem.

<a id="QS-B0215"></a>

- Tell me about a time you improved a process.

<a id="QS-B0216"></a>

- Tell me about a time you simplified something.

<a id="QS-B0217"></a>

- Tell me about a time you had conflicting priorities.

<a id="QS-B0218"></a>

- Tell me about a time you missed a deadline.

<a id="QS-B0219"></a>

- Tell me about a time you delivered under extreme pressure.

<a id="QS-B0220"></a>

- Tell me about a time you influenced without authority.

<a id="QS-B0221"></a>

- Tell me about a time you mentored someone.

<a id="QS-B0222"></a>

- Tell me about a time you helped a struggling teammate.

<a id="QS-B0223"></a>

- Tell me about a time you had to raise the engineering quality bar.

<a id="QS-B0224"></a>

- Tell me about a time you used data to make a decision.

<a id="QS-B0225"></a>

- Tell me about a time you were wrong.

<a id="QS-B0226"></a>

- Tell me about your most technically difficult project.

<a id="QS-B0227"></a>

- Tell me about a project that failed.

<a id="QS-B0228"></a>

- Tell me about a project you are most proud of.

<a id="QS-B0229"></a>

- Tell me about a time you had to choose between speed and quality.

<a id="QS-B0230"></a>

- Tell me about a time you disagreed with a product/business requirement.

<a id="QS-B0231"></a>

- Tell me about a time you had to say no.

<a id="QS-B0232"></a>

### 9. One major thing missing: OO/LLD practice

<a id="QS-B0233"></a>

Month 4 gives you the theory, but for FAANG/MAANG SDE-II you should practice actual LLD problems.

<a id="QS-B0234"></a>

Add:

<a id="QS-B0235"></a>

- Design parking lot

<a id="QS-B0236"></a>

- Design elevator

<a id="QS-B0237"></a>

- Design ATM

<a id="QS-B0238"></a>

- Design vending machine

<a id="QS-B0239"></a>

- Design library

<a id="QS-B0240"></a>

- Design hotel booking

<a id="QS-B0241"></a>

- Design movie ticket booking

<a id="QS-B0242"></a>

- Design chess

<a id="QS-B0243"></a>

- Design snake and ladder

<a id="QS-B0244"></a>

- Design notification system

<a id="QS-B0245"></a>

- Design logger

<a id="QS-B0246"></a>

- Design rate limiter

<a id="QS-B0247"></a>

- Design cache

<a id="QS-B0248"></a>

- Design task scheduler

<a id="QS-B0249"></a>

- Design pub/sub system

<a id="QS-B0250"></a>

- Design file system

<a id="QS-B0251"></a>

- Design food delivery/order system

<a id="QS-B0252"></a>

And for each, practice:

<a id="QS-B0253"></a>

requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code

<a id="QS-B0254"></a>

### 10. One major missing skill: System Design follow-ups

<a id="QS-B0255"></a>

This is extremely important.

<a id="QS-B0256"></a>

Don't just practice:

<a id="QS-B0257"></a>

"Design WhatsApp."

<a id="QS-B0258"></a>

Practice the interviewer attacking your design:

<a id="QS-B0259"></a>

- What if traffic becomes 10×?

<a id="QS-B0260"></a>

- What if one server dies?

<a id="QS-B0261"></a>

- What if the database dies?

<a id="QS-B0262"></a>

- What if Redis dies?

<a id="QS-B0263"></a>

- What if Kafka is unavailable?

<a id="QS-B0264"></a>

- What if a request is duplicated?

<a id="QS-B0265"></a>

- What if messages arrive out of order?

<a id="QS-B0266"></a>

- What if one user has 10M followers?

<a id="QS-B0267"></a>

- What if one tenant sends 1M requests?

<a id="QS-B0268"></a>

- What if one region goes down?

<a id="QS-B0269"></a>

- What if the network partitions?

<a id="QS-B0270"></a>

- What if the cache is stale?

<a id="QS-B0271"></a>

- What if the cache is completely cold?

<a id="QS-B0272"></a>

- What if the queue grows indefinitely?

<a id="QS-B0273"></a>

- What if a worker crashes halfway through?

<a id="QS-B0274"></a>

- What if the same job is processed twice?

<a id="QS-B0275"></a>

- What if the downstream service is slow?

<a id="QS-B0276"></a>

- What if payment succeeds but your service crashes?

<a id="QS-B0277"></a>

- What if the database commits but the event isn't published?

<a id="QS-B0278"></a>

- What if the event is published but the database transaction fails?

<a id="QS-B0279"></a>

- What consistency guarantee do you provide?

<a id="QS-B0280"></a>

- What can you sacrifice during an outage?

<a id="QS-B0281"></a>

- Where is the bottleneck?

<a id="QS-B0282"></a>

- How would you monitor it?

<a id="QS-B0283"></a>

- What would you change at 10× scale?

<a id="GAP-01-001"></a>

### GAP-01-001 — What is horizontal vs vertical scaling?

**Answer / starting outline.** Vertical scaling gives one machine more resources; horizontal scaling adds machines. The former has hardware/failure-domain limits, while the latter needs traffic distribution and coordination. Example: add API replicas behind a balancer; shared session state and database capacity must still be addressed.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0002](#QS-B0002).

<a id="GAP-01-002"></a>

### GAP-01-002 — What is stateless vs stateful architecture?

**Answer / starting outline.** A stateless service instance does not require locally retained client session state to handle the next request. Durable state lives elsewhere. Stateful components retain identities, partitions or sessions that influence placement and recovery. Stateless APIs still depend on stateful databases; they are not systems without state.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0003](#QS-B0003).

<a id="GAP-01-003"></a>

### GAP-01-003 — When should you use a load balancer?

**Answer / starting outline.** Use a load balancer to distribute traffic across healthy instances and provide a stable endpoint. Select health checks and routing behavior deliberately. It does not cure a saturated database, and retries through a balancer can duplicate side effects.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0004](#QS-B0004).

<a id="GAP-01-004"></a>

### GAP-01-004 — L4 vs L7 load balancer?

**Answer / starting outline.** L4 routing operates on transport information such as addresses and ports. L7 routing understands application protocol fields such as HTTP paths and headers, enabling richer rules but adding processing and protocol responsibilities. TLS termination and connection persistence influence the choice.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0005](#QS-B0005).

<a id="GAP-01-005"></a>

### GAP-01-005 — Reverse proxy vs API gateway?

**Answer / starting outline.** A reverse proxy forwards requests to upstream servers and may terminate TLS or cache. An API gateway adds API-oriented concerns such as routing, authentication integration, quotas and aggregation. Products overlap; choose by required behavior rather than their label.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0006](#QS-B0006).

<a id="GAP-01-006"></a>

### GAP-01-006 — What is service discovery?

**Answer / starting outline.** Service discovery maps a logical service name to usable instances. Static configuration works at small stable scale; DNS, registries or orchestrator services handle changing membership. Discovery must address stale entries and unhealthy instances.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0007](#QS-B0007).

<a id="GAP-01-007"></a>

### GAP-01-007 — Client-side vs server-side service discovery?

**Answer / starting outline.** With client-side discovery, callers obtain instance locations and choose a destination. With server-side discovery, a proxy or balancer selects the instance. Clients gain routing control but more complexity; centralized routing simplifies clients while adding an infrastructure dependency.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0008](#QS-B0008).

<a id="GAP-01-008"></a>

### GAP-01-008 — What is DNS and how does DNS-based load balancing work?

**Answer / starting outline.** DNS maps names to records such as IP addresses. DNS-based balancing returns different destinations, sometimes considering geography or health. Resolvers cache responses according to TTL and their behavior, so failover is not instantaneous and individual request distribution is imprecise.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0009](#QS-B0009).

<a id="GAP-01-009"></a>

### GAP-01-009 — What is CDN and when should you use it?

**Answer / starting outline.** A CDN serves/cacheable content from locations near users, reducing origin traffic and user latency. Suitable data includes static assets and appropriately configured public responses. Cache keys, TTLs, invalidation and private-content permissions are essential; accidental caching of personalized data is a security bug.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0010](#QS-B0010).

<a id="GAP-01-010"></a>

### GAP-01-010 — What is caching and what are cache-aside, write-through, write-back and read-through?

**Answer / starting outline.** Cache-aside: application reads cache, then storage on a miss and populates cache. Read-through: cache performs that loading. Write-through: writes pass through cache to storage. Write-back: cache acknowledges before durable storage is updated, requiring durability/recovery. Choose using acceptable staleness, write load and failure consequences.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0011](#QS-B0011).

<a id="GAP-01-011"></a>

### GAP-01-011 — What are cache invalidation strategies?

**Answer / starting outline.** Strategies include TTL expiry, explicit deletion on writes, event-driven invalidation and versioned keys. Each has race windows or propagation delay. State acceptable staleness, define the source of truth, and consider stale fills arriving after invalidation.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0012](#QS-B0012).

<a id="GAP-01-012"></a>

### GAP-01-012 — What is cache stampede/thundering herd and how do you prevent it?

**Answer / starting outline.** A stampede occurs when many requests simultaneously miss or expire a popular entry and hit the origin. Mitigate with per-key request coalescing, jittered expiries, background refresh, stale-while-revalidate and origin concurrency limits. A lock requires failure and expiry handling.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0013](#QS-B0013).

<a id="GAP-01-013"></a>

### GAP-01-013 — What is consistent hashing and why is it useful?

**Answer / starting outline.** Consistent hashing maps keys and nodes onto a ring or related structure so membership changes remap a subset of keys rather than nearly all of them. Virtual nodes improve balance. It does not inherently fix hot keys, replication correctness or uneven item sizes.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0014](#QS-B0014).

<a id="GAP-01-014"></a>

### GAP-01-014 — What is database sharding?

**Answer / starting outline.** Sharding partitions data across independently managed storage nodes, commonly by a key. It scales storage/write capacity but complicates cross-shard joins, transactions, routing and rebalancing. Partitioning inside one database does not necessarily mean distributing across machines.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0015](#QS-B0015).

<a id="GAP-01-015"></a>

### GAP-01-015 — What are good shard keys and bad shard keys?

**Answer / starting outline.** A useful shard key distributes load and supports common access patterns. Tenant ID can preserve locality but a huge tenant creates a hotspot. Time alone may send all new writes to one partition. Consider cardinality, skew, range queries, growth and resharding before choosing.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0016](#QS-B0016).

<a id="GAP-01-016"></a>

### GAP-01-016 — What is hot partition/hot key and how do you handle it?

**Answer / starting outline.** A hot key/partition receives disproportionate traffic. Use caching, fan-out replicas, write aggregation, splitting/salting when semantics allow, dedicated capacity or tenant limits. Salting spreads writes but makes reads/aggregation more complex; measure skew before changing placement.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0017](#QS-B0017).

<a id="GAP-01-017"></a>

### GAP-01-017 — SQL vs NoSQL — when would you choose each?

**Answer / starting outline.** Choose relational storage when transactions, constraints and joins suit the data/access patterns. NoSQL covers several distinct models, not one trade-off. Choose a concrete document, key-value or wide-column store for its actual query/consistency/operational properties. Neither category automatically guarantees higher scale or weaker consistency.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0018](#QS-B0018).

<a id="GAP-01-018"></a>

### GAP-01-018 — When should you use a relational database vs document/key-value/wide-column database?

**Answer / starting outline.** Relational: structured relationships and transactional invariants. Document: aggregate-shaped records and queries matching those aggregates. Key-value: direct key access with simple values. Wide-column: partition-key and ordered-range access at scale. Test required queries, transaction boundaries, indexes and operational cost.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0019](#QS-B0019).

<a id="GAP-01-019"></a>

### GAP-01-019 — What is database indexing and what are the trade-offs?

**Answer / starting outline.** An index is an additional access structure that avoids scanning every row for supported predicates/orderings. It costs storage and maintenance on writes. Composite order, selectivity and query shape matter. The planner may still prefer a scan, so inspect the plan and representative measurements.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0020](#QS-B0020).

<a id="GAP-01-020"></a>

### GAP-01-020 — What is replication vs partitioning?

**Answer / starting outline.** Replication keeps copies of the same data for availability/read capacity. Partitioning splits data into subsets for size/load management. They often coexist: each shard may have replicas. Replication can lag; partitioning introduces placement and cross-partition operations.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0021](#QS-B0021).

<a id="GAP-01-021"></a>

### GAP-01-021 — What is leader-follower replication?

**Answer / starting outline.** A leader accepts writes and followers reproduce its changes. Synchronous and asynchronous acknowledgment choices trade latency against durability/failover guarantees. A failover process must avoid divergent leaders and define what happens to acknowledged but unreplicated writes.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0022](#QS-B0022).

<a id="GAP-01-022"></a>

### GAP-01-022 — What is read-after-write consistency?

**Answer / starting outline.** Read-after-write means a client can observe its completed write in subsequent reads under a stated scope. Route those reads to the leader, carry a replication position or use a stronger consistency path. A random asynchronous replica may serve older data.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0023](#QS-B0023).

<a id="GAP-01-023"></a>

### GAP-01-023 — What is eventual consistency?

**Answer / starting outline.** Eventual consistency says replicas converge if updates stop and the replication/conflict-resolution process succeeds. It does not give a maximum staleness duration without another bound. Define conflict rules and user behavior while replicas disagree.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0024](#QS-B0024).

<a id="GAP-01-024"></a>

### GAP-01-024 — What is strong consistency?

**Answer / starting outline.** Strong consistency is an overloaded term; specify the property. Linearizability makes each operation appear atomic between invocation and completion and respects real-time order. A consistent snapshot or serializable transaction is a different guarantee. Discuss which reads/writes and scope receive it.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0025](#QS-B0025).

<a id="GAP-01-025"></a>

### GAP-01-025 — What is quorum read/write?

**Answer / starting outline.** A quorum contacts enough replicas to meet a configured read/write rule. R+W>N ensures overlap for the same replica set, but overlap alone does not prove linearizability. Version selection, concurrent writes, membership changes and repair behavior determine the actual guarantee.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0026](#QS-B0026).

<a id="GAP-01-026"></a>

### GAP-01-026 — What is CAP theorem, and what does it actually mean?

**Answer / starting outline.** CAP concerns a network partition: a system cannot guarantee both linearizable consistency and availability as formally defined for all operations during the partition. It is not a general instruction to pick any two features permanently. State which operations reject, wait or serve potentially stale results.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0027](#QS-B0027).

<a id="GAP-01-027"></a>

### GAP-01-027 — What is PACELC?

**Answer / starting outline.** PACELC asks: during a partition, how do availability and consistency trade off; otherwise, how do latency and consistency trade off? Synchronously coordinating distant replicas adds normal-operation latency even when no partition exists.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0028](#QS-B0028).

<a id="GAP-01-028"></a>

### GAP-01-028 — What is backpressure?

**Answer / starting outline.** Backpressure communicates or enforces that a downstream stage cannot keep up, so upstream work slows or is bounded. Use bounded queues, concurrency limits and flow control. An unlimited in-memory queue hides saturation until memory/latency failure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0029](#QS-B0029).

<a id="GAP-01-029"></a>

### GAP-01-029 — What is asynchronous vs synchronous communication?

**Answer / starting outline.** Synchronous communication waits for a response in the current request flow; asynchronous messaging decouples submission from later processing. Async reduces temporal coupling but adds delivery, ordering, state/status and retry complexity. async/await in code does not by itself make a business workflow asynchronous.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0030](#QS-B0030).

<a id="GAP-01-030"></a>

### GAP-01-030 — Queue vs pub/sub vs event stream?

**Answer / starting outline.** A work queue distributes tasks among competing consumers. Pub/sub fans notifications to subscriptions. An event stream stores ordered records within partitions for replay and independent consumer progress. Products can support multiple styles; choose delivery, retention, ordering and replay requirements.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0031](#QS-B0031).

<a id="GAP-01-031"></a>

### GAP-01-031 — What is at-most-once, at-least-once and exactly-once delivery?

**Answer / starting outline.** At-most-once permits loss but avoids redelivery at the stated delivery layer. At-least-once permits redelivery and needs idempotent effects. Exactly-once requires a precise boundary and atomic coordination/deduplication. Delivery and business effects are different; an external side effect may not share the messaging transaction.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0032](#QS-B0032).

<a id="GAP-01-032"></a>

### GAP-01-032 — What is idempotency and how do you design an idempotent API?

**Answer / starting outline.** Use a client-provided idempotency key scoped to caller/operation, a request fingerprint, a unique constraint and stored outcome/state. Concurrent duplicates must converge on one operation. Reject key reuse with different payloads. Define expiry/replay behavior and coordinate dedup state with the effect wherever an atomic boundary exists.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0033](#QS-B0033).

<a id="GAP-01-033"></a>

### GAP-01-033 — What is API versioning?

**Answer / starting outline.** Version an API when a change breaks a supported client contract. Strategies include path, header or negotiated media type; maintain compatibility and a retirement policy. Adding fields is only safe if clients tolerate them. Version request/response semantics and events deliberately.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0034](#QS-B0034).

<a id="GAP-01-034"></a>

### GAP-01-034 — Pagination: offset vs cursor-based?

**Answer / starting outline.** Offset pagination skips a number of ordered rows; large offsets can be costly and concurrent changes can shift pages. Cursor/keyset pagination continues after a stable ordering key, often including a unique tie-breaker. It suits sequential feeds but complicates arbitrary page-number jumps.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0035](#QS-B0035).

<a id="GAP-01-035"></a>

### GAP-01-035 — How do you handle large API responses?

**Answer / starting outline.** Use pagination, projections, bounded page sizes, compression where useful and streaming for suitable workflows. Huge responses consume memory and bandwidth and make retry/cancellation expensive. Maintain authorization on every page and avoid silently truncating required results.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0036](#QS-B0036).

<a id="GAP-01-036"></a>

### GAP-01-036 — What is request hedging?

**Answer / starting outline.** Hedging sends a second equivalent request after a delay to reduce tail latency, then uses an acceptable result and cancels the other if possible. It adds load and may amplify overload. Restrict it to safely repeatable operations with a budget and measured tail-latency benefit.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0037](#QS-B0037).

<a id="GAP-01-037"></a>

### GAP-01-037 — What is graceful degradation?

**Answer / starting outline.** Graceful degradation preserves essential service functions when dependencies/capacity fail. Examples: serve an explicitly stale cached catalog or disable recommendations while checkout remains available. Choose degraded semantics in advance; never silently relax authorization or payment correctness.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0038](#QS-B0038).

<a id="GAP-01-038"></a>

### GAP-01-038 — What is graceful shutdown?

**Answer / starting outline.** Graceful shutdown stops admitting new work, signals cancellation as appropriate, drains in-flight requests/jobs within a bound and releases resources. Unfinished queue work must be safely redelivered. Readiness removal and acknowledgment timing matter; killing a worker after ack can lose work.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0039](#QS-B0039).

<a id="GAP-02-001"></a>

### GAP-02-001 — What is a database transaction?

**Answer / starting outline.** A transaction groups operations into a commit/rollback unit. Its atomicity and isolation apply to resources inside that transaction boundary. A database transaction does not automatically include an HTTP payment call or broker publish.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0043](#QS-B0043).

<a id="GAP-02-002"></a>

### GAP-02-002 — ACID — what does each property actually guarantee?

**Answer / starting outline.** Atomicity: all-or-nothing committed changes. Consistency: preserve defined constraints/invariants through valid transactions. Isolation: constrain concurrent interference according to the chosen level. Durability: committed changes survive failures covered by the database/configuration. Business correctness still depends on correctly defined operations.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0044](#QS-B0044).

<a id="GAP-02-003"></a>

### GAP-02-003 — What are dirty reads, non-repeatable reads and phantom reads?

**Answer / starting outline.** Dirty read sees uncommitted data. Non-repeatable read sees a previously read row change across reads. Phantom read sees a set of matching rows change. These definitions describe anomalies; engines implement isolation differently.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0045](#QS-B0045).

<a id="GAP-02-004"></a>

### GAP-02-004 — Read committed vs repeatable read vs serializable?

**Answer / starting outline.** Read committed generally gives committed data for each statement. Repeatable read preserves a stronger view, but implementation matters. PostgreSQL repeatable read prevents phantoms yet can permit serialization anomalies; its read uncommitted behaves as read committed. Serializable requires a result equivalent to a serial execution and can require transaction retries.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0046](#QS-B0046).

<a id="GAP-02-005"></a>

### GAP-02-005 — Optimistic vs pessimistic locking?

**Answer / starting outline.** Optimistic concurrency checks that a version/state has not changed before committing and retries/rejects conflicts. Pessimistic concurrency takes locks before making the change. Optimistic suits low conflicts; pessimistic can simplify high-contention invariants but adds waits and deadlock risk.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0047](#QS-B0047).

<a id="GAP-02-006"></a>

### GAP-02-006 — Row-level vs table-level locking?

**Answer / starting outline.** Row locks coordinate access to particular rows; table locks cover wider access. Actual lock modes, predicate/range locks and escalation vary by engine. Narrower locking often improves concurrency but consumes resources and is not a substitute for suitable isolation.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0048](#QS-B0048).

<a id="GAP-02-007"></a>

### GAP-02-007 — What is MVCC?

**Answer / starting outline.** MVCC retains multiple row versions so readers can obtain an appropriate snapshot without always blocking writers. Snapshot visibility depends on isolation and transaction state. Versions need cleanup; long transactions can delay reclamation and increase storage pressure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0049](#QS-B0049).

<a id="GAP-02-008"></a>

### GAP-02-008 — What is a deadlock and how does a database handle it?

**Answer / starting outline.** A database deadlock is a cycle of transactions waiting on one another’s locks. The engine detects or times out the situation and aborts a victim. Retry the whole affected transaction when safe, shorten transactions and use consistent lock ordering.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0050](#QS-B0050).

<a id="GAP-02-009"></a>

### GAP-02-009 — What is a B-tree index?

**Answer / starting outline.** A B-tree-family index keeps keys in an ordered balanced structure, supporting efficient key/range lookup. Tree height grows slowly, while actual performance depends on pages, cache, selectivity and heap/table visits. A hash index and a B-tree have different access properties.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0051](#QS-B0051).

<a id="GAP-02-010"></a>

### GAP-02-010 — Why can too many indexes hurt writes?

**Answer / starting outline.** Every indexed insert/delete and relevant update must maintain additional structures, increasing I/O, CPU and sometimes contention. Indexes consume storage/cache. Keep indexes justified by actual queries and check whether apparently redundant indexes enforce different constraints.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0052](#QS-B0052).

<a id="GAP-02-011"></a>

### GAP-02-011 — Composite indexes — how does column order matter?

**Answer / starting outline.** A composite index orders keys lexicographically, such as (TenantId, CreatedAt, Id). Leading-column equality and subsequent range/order predicates often fit well. Planner capabilities vary, so avoid treating the left-prefix heuristic as an absolute rule. Compare actual plans for required queries.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0053](#QS-B0053).

<a id="GAP-02-012"></a>

### GAP-02-012 — What is a covering index?

**Answer / starting outline.** A covering index supplies all columns a query needs through its keys/included data, potentially avoiding extra table fetches. Index-only behavior also depends on engine visibility rules. Including too much data increases size and write maintenance.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0054](#QS-B0054).

<a id="GAP-02-013"></a>

### GAP-02-013 — What is query execution planning?

**Answer / starting outline.** The optimizer chooses an execution plan using available indexes, statistics and estimated costs. EXPLAIN shows estimated operations; an execution-enabled plan adds actual behavior and may run the statement. Check estimated-versus-actual row counts, scans, joins, sorts and buffers on safe representative data.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0055](#QS-B0055).

<a id="GAP-02-014"></a>

### GAP-02-014 — What causes an N+1 query problem?

**Answer / starting outline.** N+1 occurs when loading N parent records causes an additional query per parent, commonly through lazy loading. Use a bounded projection, suitable join/eager loading or batch fetch. One giant join can cause cartesian explosion, so measure rows/bytes rather than merely reducing query count.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0056](#QS-B0056).

<a id="GAP-02-015"></a>

### GAP-02-015 — What is connection pooling?

**Answer / starting outline.** Connection pooling reuses established connections instead of opening one for each operation. Checkout duration and pool size bound concurrent database usage. Dispose/return connections promptly; a connection pool and database server capacity are different limits.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0057](#QS-B0057).

<a id="GAP-02-016"></a>

### GAP-02-016 — What happens when the DB connection pool is exhausted?

**Answer / starting outline.** Requests wait or fail when no pooled connection becomes available within the configured bound. Causes include leaked connections, long transactions and excessive concurrency. Investigate checkout time, database waits and pool metrics before increasing the limit and overloading the server.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0058](#QS-B0058).

<a id="GAP-02-017"></a>

### GAP-02-017 — Database migration strategies for zero-downtime deployments?

**Answer / starting outline.** Use expand-and-contract: add backward-compatible schema, deploy compatible code, backfill in bounded steps, switch reads/writes, then remove old schema after old code is gone. Plan locks, rollback and data compatibility. “Migration succeeded” does not mean mixed-version traffic is safe.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0059](#QS-B0059).

<a id="GAP-02-018"></a>

### GAP-02-018 — What is CDC (Change Data Capture)?

**Answer / starting outline.** CDC captures database changes, commonly from transaction logs, and sends them downstream. It can support replication, analytics or event pipelines. Handle snapshots, offsets, delete events, schema evolution and duplicates; row changes are not automatically meaningful domain events.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0060](#QS-B0060).

<a id="GAP-02-019"></a>

### GAP-02-019 — When would you use CDC instead of an application-level event?

**Answer / starting outline.** Use CDC for existing/legacy writers or comprehensive data-change propagation when application hooks are impractical. Application events express domain meaning more clearly. An outbox captured through CDC can combine domain events with transactional storage; both approaches need consumer/replay semantics.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0061](#QS-B0061).

<a id="GAP-03-001"></a>

### GAP-03-001 — What is a distributed system's failure model?

**Answer / starting outline.** Define what can fail: process crash, message loss/delay/duplication, network partition, disk loss, clock skew and possibly malicious behavior. Also define recovery and timeout assumptions. An algorithm proven under crash-only faults may not tolerate arbitrary malicious nodes.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0065](#QS-B0065).

<a id="GAP-03-002"></a>

### GAP-03-002 — What is a network partition?

**Answer / starting outline.** A network partition separates nodes that cannot communicate reliably even though they may be running. Timeouts cannot distinguish a failed node from a slow or partitioned one. Specify which side may serve which operations and how divergence is resolved.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0066](#QS-B0066).

<a id="GAP-03-003"></a>

### GAP-03-003 — What is split-brain?

**Answer / starting outline.** Split-brain means multiple nodes/groups act as authoritative for the same state when only one should. Avoid unsafe writes with majority-backed coordination, fencing at protected resources and a controlled failover protocol. A load balancer alone does not establish authority.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0067](#QS-B0067).

<a id="GAP-03-004"></a>

### GAP-03-004 — What is quorum?

**Answer / starting outline.** A quorum is a sufficiently large participating set under a coordination rule. Majority quorums overlap, which helps prevent conflicting decisions when voting/state rules are respected. It is not simply “ask many nodes and trust the largest value.”

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0068](#QS-B0068).

<a id="GAP-03-005"></a>

### GAP-03-005 — Why does majority voting help?

**Answer / starting outline.** Two majorities from the same fixed membership must share at least one node. If that node follows safe voting/recording rules, incompatible decisions can be prevented. Membership changes require a safe protocol; arbitrary sets of different members need not overlap.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0069](#QS-B0069).

<a id="GAP-03-006"></a>

### GAP-03-006 — What is leader/follower replication?

**Answer / starting outline.** The leader coordinates writes and followers reproduce them. Acknowledgment rules determine what survives failover. Reads from followers may be stale. Leadership, replication and durability must be considered together.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0070](#QS-B0070).

<a id="GAP-03-007"></a>

### GAP-03-007 — What happens when the leader dies?

**Answer / starting outline.** Followers detect missing heartbeats and a coordination protocol may elect a new leader. The old leader might still be alive behind a partition, so new authority must be fenced/validated. Recovery may lose unreplicated writes unless the acknowledgment guarantee rules that out.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0071](#QS-B0071).

<a id="GAP-03-008"></a>

### GAP-03-008 — What is leader lease vs leader election?

**Answer / starting outline.** Election chooses an authority through a protocol; a lease grants time-bounded authority under clock/timing assumptions. A lease holder can pause past expiry and continue acting unless protected resources reject stale tokens. A lease is not a complete consensus protocol.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0072](#QS-B0072).

<a id="GAP-03-009"></a>

### GAP-03-009 — What is gossip protocol?

**Answer / starting outline.** Gossip spreads membership/state by peers exchanging information with subsets of other peers. It scales dissemination without every node contacting all nodes each time. Convergence is gradual; gossip alone does not provide linearizable writes or immediate failure certainty.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0073](#QS-B0073).

<a id="GAP-03-010"></a>

### GAP-03-010 — What is vector clock?

**Answer / starting outline.** A vector clock keeps a component per participant to track causal history. One vector dominating another indicates causal order; incomparable vectors can represent concurrent updates. It helps detect conflicts but increases metadata and still requires a resolution policy.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0074](#QS-B0074).

<a id="GAP-03-011"></a>

### GAP-03-011 — What is Lamport clock?

**Answer / starting outline.** A Lamport clock is a logical counter advanced locally and on message receipt: set it above both local and received counters. If A causally precedes B, its clock is smaller. The reverse is not guaranteed, so it cannot by itself distinguish all concurrency.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0075](#QS-B0075).

<a id="GAP-03-012"></a>

### GAP-03-012 — Why do distributed systems need logical clocks?

**Answer / starting outline.** Logical clocks describe causal relationships without trusting synchronized wall clocks. Message delays and physical-clock changes make timestamps unreliable for strict causal order. Choose Lamport or vector metadata based on whether a total ordering convention or concurrency detection is needed.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0076](#QS-B0076).

<a id="GAP-03-013"></a>

### GAP-03-013 — What is clock skew?

**Answer / starting outline.** Clock skew is the difference between nodes’ clock readings at a real instant. Clock drift is differing rates over time. Synchronization reduces but does not eliminate error; designs should state tolerated uncertainty rather than assume exact agreement.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0077](#QS-B0077).

<a id="GAP-03-014"></a>

### GAP-03-014 — Why can't you rely on wall-clock timestamps for ordering?

**Answer / starting outline.** A later real-world event may carry an earlier wall timestamp due to skew or clock adjustment. For business order, use authoritative sequencing, logical clocks or defined conflict rules. A timestamp can still be useful metadata without being a complete ordering guarantee.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0078](#QS-B0078).

<a id="GAP-03-015"></a>

### GAP-03-015 — What is monotonic clock?

**Answer / starting outline.** A monotonic clock does not move backward within its defined scope and is appropriate for elapsed durations/timeouts. Wall time gives calendar timestamps. Do not compare unrelated monotonic-clock readings across machines or persist them as globally meaningful instants.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0079](#QS-B0079).

<a id="GAP-03-016"></a>

### GAP-03-016 — What is distributed tracing?

**Answer / starting outline.** Distributed tracing represents a request/workflow as related spans across services, linked by propagated context. It reveals which stage contributed latency/error. Sampling and asynchronous message context must be designed; traces do not replace metrics or correct logs.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0080](#QS-B0080).

<a id="GAP-03-017"></a>

### GAP-03-017 — What is OpenTelemetry?

**Answer / starting outline.** OpenTelemetry supplies APIs, SDKs, instrumentation and collection/export conventions for telemetry. It is not itself a storage/query dashboard. Instrument spans, useful metrics and correlated logs; export to a chosen backend and manage sampling, sensitive fields and cardinality.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0081](#QS-B0081).

<a id="GAP-03-018"></a>

### GAP-03-018 — What is backpressure in distributed systems?

**Answer / starting outline.** Distributed backpressure limits accepted or in-flight work when downstream capacity is insufficient. Propagate budgets where possible and use bounded queues/concurrency, rejection or slower producers. Queuing indefinitely converts a capacity problem into latency and resource failure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0082](#QS-B0082).

<a id="GAP-03-019"></a>

### GAP-03-019 — How do you prevent cascading failures?

**Answer / starting outline.** Prevent cascades with deadlines, bounded retries with jitter, circuit breakers where useful, bulkheads, admission control and graceful degradation. Retrying at every service layer can multiply traffic; use one coherent retry budget and preserve operation semantics.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0083](#QS-B0083).

<a id="GAP-03-020"></a>

### GAP-03-020 — How do you handle partial failure?

**Answer / starting outline.** A partial failure means one component/operation fails while others succeed. Record durable operation state, make retries idempotent, reconcile uncertain outcomes and use compensations where appropriate. Do not infer that a timeout means the remote side effect did not happen.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0084](#QS-B0084).

<a id="GAP-03-021"></a>

### GAP-03-021 — What is graceful degradation?

**Answer / starting outline.** Preserve useful bounded functionality under failures, such as serving known-stale read-only data. Communicate degraded state where relevant. Avoid silently weakening authorization, financial or inventory invariants.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0085](#QS-B0085).

<a id="GAP-03-022"></a>

### GAP-03-022 — What is load shedding?

**Answer / starting outline.** Load shedding rejects or drops selected work to keep the system viable during overload. Prefer explicit 429/503 or priority-aware rejection to unlimited queuing. Specify retry guidance and which work is never safely droppable.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0086](#QS-B0086).

<a id="GAP-03-023"></a>

### GAP-03-023 — What is admission control?

**Answer / starting outline.** Admission control decides whether to accept work based on available capacity, tenant quotas, priority or a concurrency budget. An accepted job should have a defined durable meaning. Rate limits bound arrival rate; concurrency limits bound simultaneous work.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0087](#QS-B0087).

<a id="GAP-03-024"></a>

### GAP-03-024 — What is retry storm?

**Answer / starting outline.** A retry storm is repeated correlated retry traffic that worsens an outage. Limit attempts, use deadlines and jitter, avoid stacked retry layers, and distinguish transient from permanent failures. Retrying unsafe effects requires an idempotency/reconciliation contract.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0088](#QS-B0088).

<a id="GAP-03-025"></a>

### GAP-03-025 — What is exponential backoff with jitter?

**Answer / starting outline.** Exponential backoff grows the wait between attempts, capped at a maximum. Jitter randomizes waits so clients do not retry together. Bound total elapsed time and attempts, honor useful retry signals, and do not retry invalid input or authorization failures.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0089](#QS-B0089).

<a id="GAP-03-026"></a>

### GAP-03-026 — What is request hedging and when can it make things worse?

**Answer / starting outline.** Hedging duplicates a slow request to reduce tail latency. It can worsen saturated systems by adding work, and duplicate side effects are unsafe without suitable semantics. Use measured delay thresholds, bounded volume and cancellation for operations safe to repeat.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0090](#QS-B0090).

<a id="GAP-04-001"></a>

### GAP-04-001 — Kafka partition vs consumer — how does parallelism work?

**Answer / starting outline.** Partitions are the unit of Kafka ordering and consumer-group assignment. In the conventional group model, a partition is assigned to one active consumer at a time; one consumer may own several partitions. Application processing concurrency must preserve any required partition/key ordering.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0094](#QS-B0094).

<a id="GAP-04-002"></a>

### GAP-04-002 — What happens when there are more consumers than partitions?

**Answer / starting outline.** In a conventional consumer group, extra consumers beyond the number of partitions have no assignment and add no partition-level parallelism. Other subscription/group modes may differ; state which model you mean.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0095](#QS-B0095).

<a id="GAP-04-003"></a>

### GAP-04-003 — What happens when there are fewer consumers than partitions?

**Answer / starting outline.** Some consumers own multiple partitions. Uneven partition load can cause skew even when partition counts look balanced. Tune processing, partition keys and assignments using measured work per partition.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0096](#QS-B0096).

<a id="GAP-04-004"></a>

### GAP-04-004 — Kafka offset management — auto commit vs manual commit?

**Answer / starting outline.** Auto commit periodically advances offsets under client configuration and polling behavior; it may not align with completion of business processing. Manual commit lets the application choose the boundary. Commit after safely completed effects for replayable processing, accounting for crashes and duplicates.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0097](#QS-B0097).

<a id="GAP-04-005"></a>

### GAP-04-005 — What happens if a consumer crashes after processing but before committing its offset?

**Answer / starting outline.** The record can be read again after restart because the committed offset did not advance. Make the business effect idempotent; committing first instead introduces a loss window if processing then fails.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0098](#QS-B0098).

<a id="GAP-04-006"></a>

### GAP-04-006 — How do you implement idempotent Kafka consumers?

**Answer / starting outline.** Identify events durably and atomically combine deduplication with database-local changes, using a unique key/transaction. Producer idempotence prevents a producer retry from duplicating log entries under its contract; it does not deduplicate arbitrary consumer effects.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0099](#QS-B0099).

<a id="GAP-04-007"></a>

### GAP-04-007 — Kafka retention vs log compaction?

**Answer / starting outline.** Retention removes old log segments according to configured time/size constraints. Compaction retains a recent value per key over time, with deletion/tombstone rules; it does not immediately remove every duplicate key. Choose based on replay history versus reconstructing current keyed state.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0100](#QS-B0100).

<a id="GAP-04-008"></a>

### GAP-04-008 — Kafka producer batching and compression?

**Answer / starting outline.** Batching groups producer records to improve throughput; waiting for fuller batches adds latency. Compression reduces bytes at CPU cost and often benefits from batching. Tune with realistic payloads and delivery/latency requirements rather than copying universal settings.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0101](#QS-B0101).

<a id="GAP-04-009"></a>

### GAP-04-009 — What is a poison message in streaming?

**Answer / starting outline.** A poison message repeatedly fails processing, such as invalid schema or unrecoverable business data. Isolate it with a bounded retry/dead-letter policy and record error context. Skipping or quarantining it can affect ordering/business completeness and needs an explicit policy.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0102](#QS-B0102).

<a id="GAP-04-010"></a>

### GAP-04-010 — How do you handle schema evolution?

**Answer / starting outline.** Use backward/forward compatibility rules, optional fields/defaults when suitable, versioned contracts and compatibility tests. Coordinate deployments and replay old records. Renaming/removing a field or changing its meaning can break readers even when parsing succeeds.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0103](#QS-B0103).

<a id="GAP-04-011"></a>

### GAP-04-011 — What is Schema Registry and why is it useful?

**Answer / starting outline.** A schema registry manages versions and compatibility rules for message schemas. Clients can serialize/identify schemas consistently. It does not validate all business semantics or guarantee that every consumer handles every version correctly.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0104](#QS-B0104).

<a id="GAP-04-012"></a>

### GAP-04-012 — What is exactly-once processing when an external database is involved?

**Answer / starting outline.** Kafka transactions can coordinate Kafka records and offsets, not automatically an independent database/API. For database-local effects, combine durable event deduplication/position with the change in one database transaction. External effects need their own idempotency/reconciliation contract and clearly bounded guarantees.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0105](#QS-B0105).

<a id="GAP-04-013"></a>

### GAP-04-013 — Kafka vs RabbitMQ vs SQS vs Pub/Sub — when would you choose each?

**Answer / starting outline.** Kafka suits retained partitioned streams and replay. RabbitMQ suits brokered routing/work queues with its delivery features. SQS is a managed queue with service-specific ordering/deduplication options. Managed Pub/Sub suits subscription fan-out with its service guarantees. Compare retention, ordering scope, throughput, latency, operational burden and cloud coupling.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0106](#QS-B0106).

<a id="GAP-05-001"></a>

### GAP-05-001 — Design URL shortener

**Answer / starting outline.** Design starting point: Create/resolve short links, expiry and abuse controls. Store a unique code with destination and owner; use a unique constraint or collision retry. Resolve through a cache and durable store. Discuss redirect choice, hot links, deletion and cache invalidation; avoid treating sequential IDs as secret authorization.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0112](#QS-B0112).

<a id="GAP-05-002"></a>

### GAP-05-002 — Design Twitter/X news feed

**Answer / starting outline.** Design starting point: Store users, follow edges and posts; produce paginated home timelines. Compare write-time fan-out with read-time merging and a hybrid for celebrities. Use an event pipeline for fan-out and stable cursor pagination. Discuss deletion/privacy propagation, stale feeds, queue backlog and hot authors.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0113](#QS-B0113).

<a id="GAP-05-003"></a>

### GAP-05-003 — Design WhatsApp/chat system

**Answer / starting outline.** Design starting point: Support authenticated conversations, durable messages, ordering scope, reconnect and delivery/read receipts. Use WebSocket gateways plus durable message storage and an offline delivery path. Sequence within a conversation, deduplicate client message IDs, and separate persisted from delivered/read status. Handle disconnected devices, gateway loss and multi-device synchronization.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0114](#QS-B0114).

<a id="GAP-05-004"></a>

### GAP-05-004 — Design notification system

**Answer / starting outline.** Design starting point: Define channels, preferences, templates, scheduling and delivery status. Accept notification intent durably, route through queues/workers and integrate providers with bounded retries. Use idempotency, per-user/tenant limits and dead letters. Distinguish provider acceptance from actual user delivery; discuss opt-outs and provider outages.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0115](#QS-B0115).

<a id="GAP-05-005"></a>

### GAP-05-005 — Design rate limiter

**Answer / starting outline.** Design starting point: Define scope, limits, bursts and rejection behavior. Compare fixed window, sliding window, token bucket and leaky bucket. Coordinate atomic counters/state across instances when global enforcement matters. State clock, hot-key and Redis outage behavior; test boundaries and concurrent callers rather than relying on non-atomic get-then-set.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0116](#QS-B0116).

<a id="GAP-05-006"></a>

### GAP-05-006 — Design distributed cache

**Answer / starting outline.** Design starting point: Define get/set/delete, expiry, eviction and consistency. Partition keys with a placement strategy, optionally replicate and rebalance. Discuss cache-aside fill races, stampedes, hot keys and node loss. Keep authoritative data elsewhere unless durability is explicitly designed. Measure hit ratio, latency, memory and origin pressure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0117](#QS-B0117).

<a id="GAP-05-007"></a>

### GAP-05-007 — Design file storage / Dropbox

**Answer / starting outline.** Design starting point: Support upload/download, metadata, permissions, versions and synchronization. Store blobs in object storage and metadata in a database; use multipart upload/checksums and resumable transfers. Separate upload initiation from finalization and reconcile abandoned uploads. Handle permission revocation, duplicate chunks, conflict versions and garbage collection.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0118](#QS-B0118).

<a id="GAP-05-008"></a>

### GAP-05-008 — Design video streaming service

**Answer / starting outline.** Design starting point: Ingest large uploads, asynchronously transcode into adaptive-bitrate segments and deliver through object storage/CDN. Store job/asset status and metadata. Handle retries, partial outputs, copyright/access policies, encoding failures and popularity spikes. Estimate storage growth, egress and startup/rebuffer latency separately.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0119](#QS-B0119).

<a id="GAP-05-009"></a>

### GAP-05-009 — Design Uber

**Answer / starting outline.** Design starting point: Model riders/drivers, location updates, trips and matching state. Use a geographic index to find candidates, then rank/assign with a guarded state transition. Location freshness and duplicate acceptance matter. Discuss GPS noise, busy drivers, region partitioning, cancellation, real-time communication and payment reconciliation.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0120](#QS-B0120).

<a id="GAP-05-010"></a>

### GAP-05-010 — Design food delivery system

**Answer / starting outline.** Design starting point: Model menus, orders, restaurant acceptance, courier assignment and payment. Use an explicit order state machine, idempotent commands and compensations where stages cannot be one transaction. Handle unavailable items, restaurant rejection, cancellation and courier reassignment. Search/location reads can tolerate different consistency from payment/order transitions.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0121](#QS-B0121).

<a id="GAP-05-011"></a>

### GAP-05-011 — Design ticket booking system

**Answer / starting outline.** Design starting point: Model shows/seats, temporary holds and confirmed bookings. Use database constraints or guarded atomic updates to prevent overselling; define hold expiry and payment reconciliation. A cache may accelerate discovery but must not authorize conflicting seat sales. Test simultaneous booking, expired holds and payment success followed by a crash.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0122](#QS-B0122).

<a id="GAP-05-012"></a>

### GAP-05-012 — Design payment system

**Answer / starting outline.** Design starting point: Model payment intents and state transitions with immutable audit history. Use provider idempotency keys, signed webhook verification and reconciliation of unknown outcomes. Separate payment, settlement and refund concepts. Protect sensitive data and tenant/object access. Explain retries, duplicate/out-of-order webhooks and why a local transaction cannot roll back an external charge.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0123](#QS-B0123).

<a id="GAP-05-013"></a>

### GAP-05-013 — Design e-commerce checkout

**Answer / starting outline.** Design starting point: Validate cart/prices, reserve inventory, initiate payment and finalize order with a state machine or saga. Record durable transitions and use idempotent operations. Discuss changed prices, tax/shipping calculation, failed payment, expired reservation and compensation. Avoid assuming every step shares one distributed transaction.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0124](#QS-B0124).

<a id="GAP-05-014"></a>

### GAP-05-014 — Design inventory/stock reservation

**Answer / starting outline.** Design starting point: Track available/reserved/sold stock per item/location, using atomic conditional updates or suitable locks/constraints. Holds have an identity, expiry and idempotent confirm/release operations. Define overselling policy, partition placement and reconciliation. Test competing buyers, release-versus-confirm races and worker crashes.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0125](#QS-B0125).

<a id="GAP-05-015"></a>

### GAP-05-015 — Design web crawler

**Answer / starting outline.** Design starting point: Maintain a frontier of URLs, normalized deduplication, fetch workers, per-host politeness and robots-policy handling. Parse discovered links and store content/metadata. Bound retries, content size and redirects; protect against SSRF and crawl traps. Discuss freshness scheduling, duplicate pages, host hotspots and failure recovery.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0126](#QS-B0126).

<a id="GAP-05-016"></a>

### GAP-05-016 — Design search/autocomplete

**Answer / starting outline.** Design starting point: Build an ingestion/indexing pipeline, query service and ranking path. Autocomplete may use a trie/prefix index with popularity signals; full search often uses an inverted index and filters. Define update freshness, tenant permissions, spelling/language handling and pagination. Measure relevance and tail latency; index replication does not remove ingestion lag.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0127](#QS-B0127).

<a id="GAP-05-017"></a>

### GAP-05-017 — Design metrics/monitoring system

**Answer / starting outline.** Design starting point: Ingest timestamped numeric samples, validate labels, partition/time-index storage and query aggregates. Apply retention/downsampling and alert evaluation. Cardinality, late data, counter resets and duplicate samples affect correctness/cost. Separate collection from visualization and monitor the monitoring pipeline itself.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0128](#QS-B0128).

<a id="GAP-05-018"></a>

### GAP-05-018 — Design logging system

**Answer / starting outline.** Design starting point: Collect structured events through buffered agents/queues, store/index with retention and expose authorized search. Bound event size and ingestion load; redact secrets/PII. Discuss dropped logs, backpressure, ordering limits and index freshness. Logs need correlation IDs but are not a substitute for a distributed trace.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0129](#QS-B0129).

<a id="GAP-05-019"></a>

### GAP-05-019 — Design job scheduler

**Answer / starting outline.** Design starting point: Persist job definitions, due times and execution attempts. Claim due work atomically using leases/fencing as needed, enqueue durably and retry idempotently. Distinguish schedule semantics from execution guarantees. Handle time zones/DST, duplicate triggers, missed runs, worker crashes, fairness and long-running jobs.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0130](#QS-B0130).

<a id="GAP-05-020"></a>

### GAP-05-020 — Design email delivery system

**Answer / starting outline.** Design starting point: Accept email intent durably, enforce preferences/rate limits and enqueue provider work. Track provider acceptance, delivery/bounce and suppression separately. Use templates and idempotency/reconciliation appropriate to provider capabilities. Discuss batch fairness, poison messages, provider throttling and retries that may send duplicate messages.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0131](#QS-B0131).

<a id="GAP-05-021"></a>

### GAP-05-021 — Design Google Docs / collaborative editing

**Answer / starting outline.** Design starting point: Support document versions, concurrent edits, presence and permissions. Compare operation transformation and CRDT approaches for conflict handling; define offline and reconnect semantics. Persist operations/snapshots and synchronize sessions. Discuss operation identity, causality, compaction and large documents; a basic last-write-wins row does not preserve collaborative intent.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0133](#QS-B0133).

<a id="GAP-05-022"></a>

### GAP-05-022 — Design YouTube

**Answer / starting outline.** Design starting point: Combine upload/transcoding/storage/CDN delivery with metadata, search, subscriptions and engagement services. Keep the design bounded by the requested flow. Use asynchronous processing states and independent read paths. Discuss hot videos, failed transcodes, recommendations freshness, moderation and egress cost.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0134](#QS-B0134).

<a id="GAP-05-023"></a>

### GAP-05-023 — Design Instagram

**Answer / starting outline.** Design starting point: Store media in object storage/CDN, metadata and graph relationships separately, and build a feed pipeline. Compare fan-out strategies, cursor pagination and ranking freshness. Handle celebrity hotspots, privacy changes, deletion propagation and media processing failures. Separate durable post acceptance from availability of all generated variants.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0135](#QS-B0135).

<a id="GAP-05-024"></a>

### GAP-05-024 — Design Google Maps / nearby places

**Answer / starting outline.** Design starting point: Partition spatial data and support viewport/nearest queries through a geographic index. Cache tiles and separate static map data from rapidly changing location/traffic data. Discuss coordinate precision, boundary searches, ranking, update freshness and global routing. A geohash prefix alone is not an exact nearest-neighbor proof.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0136](#QS-B0136).

<a id="GAP-05-025"></a>

### GAP-05-025 — Design distributed task queue

**Answer / starting outline.** Design starting point: Persist accepted tasks and delivery state, distribute work among consumers and define acknowledgments, retries and dead letters. Use leases/visibility timeouts with idempotent processing. Bound backlog and enforce tenant fairness. Test acknowledgment loss and duplicate workers; distinguish task delivery from external effect guarantees.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0137](#QS-B0137).

<a id="GAP-05-026"></a>

### GAP-05-026 — Design ad-serving system

**Answer / starting outline.** Design starting point: Accept a placement request, retrieve eligible campaigns and rank/select within a strict latency budget. Track budgets/pacing and log impressions/clicks asynchronously with deduplication. Discuss approximate counters versus billing accuracy, frequency caps, fraud, hot campaigns and fallback ads during dependency failure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0138](#QS-B0138).

<a id="GAP-05-027"></a>

### GAP-05-027 — Design recommendation system

**Answer / starting outline.** Design starting point: Ingest behavior, generate candidate items, rank and serve with cached/fallback results. Separate training/feature pipelines from online latency. Define freshness, cold start, diversity and privacy. Evaluate offline relevance and controlled online outcomes; failed recommendations should not usually block the core transaction.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0139](#QS-B0139).

<a id="GAP-05-028"></a>

### GAP-05-028 — Design ride matching

**Answer / starting outline.** Design starting point: Index available drivers by location, select candidates and atomically guard assignment state. Define matching objectives and fairness rather than merely choosing the nearest coordinate. Handle stale location, simultaneous offers, accept/timeout races, cancellation and regional overload. Trace one assignment through failure and recovery.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0140](#QS-B0140).

<a id="GAP-05-029"></a>

### GAP-05-029 — Design real-time leaderboard

**Answer / starting outline.** Design starting point: Ingest scored events, apply idempotent updates and support top-K and user-rank queries. A sorted-set or specialized ranking store can serve the hot view while durable events permit rebuild. Define ties, season resets, late corrections and cheating controls. Discuss hot partitions, replica lag and recovery.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0141](#QS-B0141).

<a id="GAP-05-030"></a>

### GAP-05-030 — Design a multi-region globally distributed service

**Answer / starting outline.** Design starting point: Begin with required operations and their consistency/latency/RPO/RTO. Choose active-passive or carefully defined active-active ownership, replication and conflict handling. Plan global routing, regional authority/fencing, data residency and failover tests. A multi-region diagram is incomplete without partition behavior and acknowledged-write durability.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0142](#QS-B0142).

<a id="GAP-06-001"></a>

### GAP-06-001 — How many requests can one server handle?

**Answer / starting outline.** No universal requests-per-second figure exists. Measure a representative request mix on known hardware/configuration at a target latency/error rate. Include CPU, memory, connection and downstream limits; simple health requests do not represent database-heavy work.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0147](#QS-B0147).

<a id="GAP-06-002"></a>

### GAP-06-002 — How do you estimate QPS from DAU?

**Answer / starting outline.** Average QPS = daily active users × average requests per active user per day / 86,400. Distinguish users from requests and reads from writes. State assumptions and include background/automated traffic where relevant.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0148](#QS-B0148).

<a id="GAP-06-003"></a>

### GAP-06-003 — How do you estimate peak QPS?

**Answer / starting outline.** Peak QPS = average QPS × an explicitly assumed/measured peak factor, or derive it from the busiest time window. Regional events and burst patterns may require a different model. Label the estimate rather than present it as observed traffic.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0149](#QS-B0149).

<a id="GAP-06-004"></a>

### GAP-06-004 — What peak-to-average ratio should you assume?

**Answer / starting outline.** There is no universal ratio. Begin with a stated scenario assumption and test alternatives, then replace it with measurements when available. Workload/region/time-of-day and launch events dominate the factor.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0150](#QS-B0150).

<a id="GAP-06-005"></a>

### GAP-06-005 — How do you estimate bandwidth?

**Answer / starting outline.** Bandwidth ≈ requests/second × average transferred bytes/request, separately for upload/download and internal replication. Include protocol overhead or a stated margin and distinguish bytes from bits; eight bits make a byte.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0151](#QS-B0151).

<a id="GAP-06-006"></a>

### GAP-06-006 — How do you estimate storage growth?

**Answer / starting outline.** Storage growth ≈ writes/day × stored bytes/write × retained days, plus indexes, replicas and overhead. Include deletions, compaction, retention and growth assumptions. Compression is a measured factor, not a guaranteed constant.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0152](#QS-B0152).

<a id="GAP-06-007"></a>

### GAP-06-007 — How do you estimate cache size?

**Answer / starting outline.** Cache size ≈ number of cached entries × average entry size, plus metadata/allocator overhead. Use measured hot-set size and target hit rate. Replicas add memory; TTL alone does not predict the active entry count under skew.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0153](#QS-B0153).

<a id="GAP-06-008"></a>

### GAP-06-008 — How do you estimate number of servers?

**Answer / starting outline.** Required instances ≈ peak load / usable per-instance capacity, rounded up, then account for headroom and failure-domain loss. Capacity must satisfy the target latency/error rate. Avoid double-counting safety margins.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0154](#QS-B0154).

<a id="GAP-06-009"></a>

### GAP-06-009 — How do you estimate database capacity?

**Answer / starting outline.** Estimate storage, read/write rates, connection/concurrency, transaction cost and index working set separately. Measure a representative schema/query mix and identify the bottleneck. Disk capacity alone does not describe database capacity.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0155](#QS-B0155).

<a id="GAP-06-010"></a>

### GAP-06-010 — How do you estimate number of Kafka partitions?

**Answer / starting outline.** Choose partitions using desired conventional consumer parallelism, measured throughput per partition, key skew and operational overhead. More partitions do not inherently preserve global order; keys control order scope. Validate broker/client limits for the deployed version.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0156](#QS-B0156).

<a id="GAP-06-011"></a>

### GAP-06-011 — How do you estimate queue depth?

**Answer / starting outline.** Over an interval, backlog grows by arrivals minus completions. In a stable system, Little’s law relates average items in system L = arrival rate λ × average time W. Queue-only depth uses queue waiting time; include in-flight work only if W covers it. For an outage, accumulate incoming work and calculate recovery rate.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0157](#QS-B0157).

<a id="GAP-06-012"></a>

### GAP-06-012 — How do you calculate availability?

**Answer / starting outline.** Time availability = available duration / total observed duration under a defined policy; request availability uses eligible successful requests / eligible requests. At 365 days/year, 99%, 99.9%, 99.99%, 99.999% allow about 3.65 days, 8.76 hours, 52.56 minutes and 5.256 minutes of annual downtime respectively. State window and exclusions.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0158](#QS-B0158).

<a id="GAP-08-001"></a>

### GAP-08-001 — Tell me about your biggest failure.

**Answer / starting outline.** Use a genuine personal example. Own a real failure, quantify only known impact, explain repair and the concrete prevention you introduced. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0202](#QS-B0202).

<a id="GAP-08-002"></a>

### GAP-08-002 — Tell me about a time you made a bad technical decision.

**Answer / starting outline.** Use a genuine personal example. Show the original technical assumptions, warning signals, why you chose it and how you corrected your decision. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0203](#QS-B0203).

<a id="GAP-08-003"></a>

### GAP-08-003 — Tell me about a time you disagreed with your manager.

**Answer / starting outline.** Use a genuine personal example. Describe the manager’s objective fairly, provide evidence, show the discussion and what you did after the decision. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0204](#QS-B0204).

<a id="GAP-08-004"></a>

### GAP-08-004 — Tell me about a time you disagreed with a senior engineer.

**Answer / starting outline.** Use a genuine personal example. Explain the senior engineer’s alternative fairly; show a test/design comparison and how you preserved cooperation. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0205](#QS-B0205).

<a id="GAP-08-005"></a>

### GAP-08-005 — Tell me about a time you changed someone's mind.

**Answer / starting outline.** Use a genuine personal example. Use evidence, a prototype or stakeholder goals; explain what changed in the decision rather than claiming persuasion skill. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0206](#QS-B0206).

<a id="GAP-08-006"></a>

### GAP-08-006 — Tell me about a time someone changed your mind.

**Answer / starting outline.** Use a genuine personal example. State your initial belief, the evidence that overturned it and the resulting change in your work. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0207](#QS-B0207).

<a id="GAP-08-007"></a>

### GAP-08-007 — Tell me about a time you received difficult feedback.

**Answer / starting outline.** Use a genuine personal example. Quote the substance of feedback, what you initially felt, what you changed and evidence of improvement. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0208](#QS-B0208).

<a id="GAP-08-008"></a>

### GAP-08-008 — Tell me about a time you gave difficult feedback.

**Answer / starting outline.** Use a genuine personal example. Describe specific observed behavior/impact, a respectful private conversation and the agreed support/follow-up. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0209](#QS-B0209).

<a id="GAP-08-009"></a>

### GAP-08-009 — Tell me about a time you took ownership of something outside your responsibility.

**Answer / starting outline.** Use a genuine personal example. Explain why the problem mattered, how you established boundaries and the outcome of taking responsibility. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0210](#QS-B0210).

<a id="GAP-08-010"></a>

### GAP-08-010 — Tell me about a time you had an ambiguous problem.

**Answer / starting outline.** Use a genuine personal example. Show how you clarified success criteria, reduced uncertainty and delivered a bounded first step. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0211](#QS-B0211).

<a id="GAP-08-011"></a>

### GAP-08-011 — Tell me about a time you had to make a decision with incomplete information.

**Answer / starting outline.** Use a genuine personal example. List what was known/unknown, reversibility, risk, decision deadline and what would trigger revision. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0212](#QS-B0212).

<a id="GAP-08-012"></a>

### GAP-08-012 — Tell me about a time you moved quickly and made a mistake.

**Answer / starting outline.** Use a genuine personal example. Admit the speed-related mistake, its impact, immediate response and a proportionate guardrail you added. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0213](#QS-B0213).

<a id="GAP-08-013"></a>

### GAP-08-013 — Tell me about a time you prevented a major problem.

**Answer / starting outline.** Use a genuine personal example. Describe the early signal, investigation, action and evidence; distinguish observed prevention from speculative disaster size. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0214](#QS-B0214).

<a id="GAP-08-014"></a>

### GAP-08-014 — Tell me about a time you improved a process.

**Answer / starting outline.** Use a genuine personal example. Explain the old friction, baseline evidence, proposed process, adoption and measured or observed change. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0215](#QS-B0215).

<a id="GAP-08-015"></a>

### GAP-08-015 — Tell me about a time you simplified something.

**Answer / starting outline.** Use a genuine personal example. Show removed complexity, preserved requirements, trade-offs and how maintenance/user outcomes improved. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0216](#QS-B0216).

<a id="GAP-08-016"></a>

### GAP-08-016 — Tell me about a time you had conflicting priorities.

**Answer / starting outline.** Use a genuine personal example. Explain competing goals, impact, prioritization criteria, communication and what was deliberately delayed. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0217](#QS-B0217).

<a id="GAP-08-017"></a>

### GAP-08-017 — Tell me about a time you missed a deadline.

**Answer / starting outline.** Use a genuine personal example. Own your part in the miss, show early/late communication, recovery and planning changes. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0218](#QS-B0218).

<a id="GAP-08-018"></a>

### GAP-08-018 — Tell me about a time you delivered under extreme pressure.

**Answer / starting outline.** Use a genuine personal example. State the real deadline, reduced scope, protected correctness and how you kept stakeholders informed. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0219](#QS-B0219).

<a id="GAP-08-019"></a>

### GAP-08-019 — Tell me about a time you influenced without authority.

**Answer / starting outline.** Use a genuine personal example. Show relationship building and evidence when you lacked direct authority; identify others’ contributions. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0220](#QS-B0220).

<a id="GAP-08-020"></a>

### GAP-08-020 — Tell me about a time you mentored someone.

**Answer / starting outline.** Use a genuine personal example. Explain the learner’s goal, specific support, feedback and progress without taking credit for their work. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0221](#QS-B0221).

<a id="GAP-08-021"></a>

### GAP-08-021 — Tell me about a time you helped a struggling teammate.

**Answer / starting outline.** Use a genuine personal example. Describe how you diagnosed the difficulty respectfully and adjusted support while preserving accountability. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0222](#QS-B0222).

<a id="GAP-08-022"></a>

### GAP-08-022 — Tell me about a time you had to raise the engineering quality bar.

**Answer / starting outline.** Use a genuine personal example. Show a concrete quality issue, a proportionate standard/test/review change and its adoption/effect. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0223](#QS-B0223).

<a id="GAP-08-023"></a>

### GAP-08-023 — Tell me about a time you used data to make a decision.

**Answer / starting outline.** Use a genuine personal example. Identify the data, its limitations, alternatives and how it changed the decision; include the measurement method. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0224](#QS-B0224).

<a id="GAP-08-024"></a>

### GAP-08-024 — Tell me about a time you were wrong.

**Answer / starting outline.** Use a genuine personal example. State precisely where you were wrong, why, how you recognized it and how future judgment changed. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0225](#QS-B0225).

<a id="GAP-08-025"></a>

### GAP-08-025 — Tell me about your most technically difficult project.

**Answer / starting outline.** Use a genuine personal example. Choose a technically complex real project; explain constraints, your decisions, alternatives and failure modes. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0226](#QS-B0226).

<a id="GAP-08-026"></a>

### GAP-08-026 — Tell me about a project that failed.

**Answer / starting outline.** Use a genuine personal example. Explain why the project failed and your contribution, distinguish external factors from excuses and state what you learned. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0227](#QS-B0227).

<a id="GAP-08-027"></a>

### GAP-08-027 — Tell me about a project you are most proud of.

**Answer / starting outline.** Use a genuine personal example. Connect your actual contribution with customer/business impact; prepare follow-ups on architecture and evidence. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0228](#QS-B0228).

<a id="GAP-08-028"></a>

### GAP-08-028 — Tell me about a time you had to choose between speed and quality.

**Answer / starting outline.** Use a genuine personal example. Describe the trade-off, risk, minimum quality bar and how you made the decision visible to stakeholders. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0229](#QS-B0229).

<a id="GAP-08-029"></a>

### GAP-08-029 — Tell me about a time you disagreed with a product/business requirement.

**Answer / starting outline.** Use a genuine personal example. Explain the business requirement fairly, show technical/customer concerns and a practical alternative or commitment. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0230](#QS-B0230).

<a id="GAP-08-030"></a>

### GAP-08-030 — Tell me about a time you had to say no.

**Answer / starting outline.** Use a genuine personal example. Explain what could not be accepted, why, the alternatives you offered and how you preserved trust. Structure: Situation → Task → your Actions and reasoning → Result → learning. Prepare alternatives and follow-ups. Leave unknown metrics unknown; this prompt cannot honestly be answered with an invented story.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0231](#QS-B0231).

<a id="GAP-09-001"></a>

### GAP-09-001 — Design parking lot

**Answer / starting outline.** LLD starting point: ParkingLot, Floor, Spot, Vehicle, Ticket and PricingPolicy. Separate spot assignment from pricing/payment. Guard spot allocation under concurrent arrivals; release only the ticket’s assigned spot. Test full capacity, wrong vehicle type, duplicate exit and lost-ticket rules. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0235](#QS-B0235).

<a id="GAP-09-002"></a>

### GAP-09-002 — Design elevator

**Answer / starting outline.** LLD starting point: ElevatorCar, Request, Scheduler, Door and explicit car states. Separate request scheduling from motion/door safety. Define direction, pickup rules, capacity and emergency behavior. Test requests arriving during movement and reject motion with an open door; compare scheduling strategies through interfaces. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0236](#QS-B0236).

<a id="GAP-09-003"></a>

### GAP-09-003 — Design ATM

**Answer / starting outline.** LLD starting point: ATM state machine, CardSession, AccountGateway, CashInventory and Transaction. Define authentication, limits and dispensing/reconciliation. Model uncertain bank response and cash-dispense failure explicitly. Never simulate financial correctness with only an in-memory balance subtraction. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0237](#QS-B0237).

<a id="GAP-09-004"></a>

### GAP-09-004 — Design vending machine

**Answer / starting outline.** LLD starting point: Machine, Inventory, Product, PaymentSession and states for idle/payment/selection/dispense. Enforce stock and money invariants, change/refund rules and failed dispense recovery. Test selecting unavailable stock, cancelling and concurrent requests. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0238](#QS-B0238).

<a id="GAP-09-005"></a>

### GAP-09-005 — Design library

**Answer / starting outline.** LLD starting point: BookTitle, BookCopy, Member, Loan and Reservation. Titles and physical copies are different entities. Define lending limits, due dates, fines and reservation order. Protect one-copy/one-active-loan and test renewal conflicts or returning twice. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0239](#QS-B0239).

<a id="GAP-09-006"></a>

### GAP-09-006 — Design hotel booking

**Answer / starting outline.** LLD starting point: Hotel, RoomType, physical Room, DateRange, Availability and Booking. Model per-night capacity/overlap rules and hold/confirm/cancel transitions. Use a repository contract that supports guarded reservations; test concurrent overlapping dates and cancellation. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0240](#QS-B0240).

<a id="GAP-09-007"></a>

### GAP-09-007 — Design movie ticket booking

**Answer / starting outline.** LLD starting point: Movie, Show, Seat, Hold, Booking and PaymentGateway. Isolate seat-state transitions and hold expiry from presentation logic. Test two buyers of one seat, payment after expiry and duplicate confirm. Reuse guarded atomic reservation rather than trusting a read-then-write check. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0241](#QS-B0241).

<a id="GAP-09-008"></a>

### GAP-09-008 — Design chess

**Answer / starting outline.** LLD starting point: Board, Piece, Position, Move and Game state. Separate movement rules from game-level turn/check/checkmate validation. Represent special moves and promotion deliberately. Test illegal moves, check exposure and undo; avoid a subclass for every possible board condition. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0242](#QS-B0242).

<a id="GAP-09-009"></a>

### GAP-09-009 — Design snake and ladder

**Answer / starting outline.** LLD starting point: Board, Cell, Jump, Player, Dice and Game. Specify finish rules, overshoot, turn order and jump chaining/cycles. Inject dice for deterministic tests. Keep the board configuration separate from the game loop. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0243](#QS-B0243).

<a id="GAP-09-010"></a>

### GAP-09-010 — Design notification system

**Answer / starting outline.** LLD starting point: NotificationRequest, Template, PreferenceRepository, ChannelSender and DeliveryAttempt. Use Strategy for genuinely varying channels and explicit delivery states. Test opt-outs, provider failures and duplicate submission; separate request orchestration from provider adapter code. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0244](#QS-B0244).

<a id="GAP-09-011"></a>

### GAP-09-011 — Design logger

**Answer / starting outline.** LLD starting point: LogEvent, Level, Formatter, Sink and Logger. Define filtering, synchronous/asynchronous delivery, bounded buffering and failure policy. Use composable sinks and thread-safe writes. Test shutdown drain, malformed formatting and sink failure without recursive logging loops. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0245](#QS-B0245).

<a id="GAP-09-012"></a>

### GAP-09-012 — Design rate limiter

**Answer / starting outline.** LLD starting point: Limiter, Policy, KeyResolver, Clock and AtomicStateStore. Implement one strategy first with a documented invariant. Inject time for boundary tests and use atomic state operations for shared limits. Test bursts, multiple callers and storage outage behavior. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0246](#QS-B0246).

<a id="GAP-09-013"></a>

### GAP-09-013 — Design cache

**Answer / starting outline.** LLD starting point: Cache<K,V>, Entry, Clock and EvictionPolicy. Define get/put/remove, capacity, TTL and concurrency. For LRU, combine a dictionary with a doubly linked list. Test replacing entries, expired values, capacity zero and concurrent access; state complexity precisely. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0247](#QS-B0247).

<a id="GAP-09-014"></a>

### GAP-09-014 — Design task scheduler

**Answer / starting outline.** LLD starting point: TaskDefinition, Trigger, Scheduler, ClaimStore and Executor. Distinguish selecting due jobs from executing them. Use durable claims/leases when distributed; inject time and test duplicate triggers, long jobs, cancellation and missed runs. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0248](#QS-B0248).

<a id="GAP-09-015"></a>

### GAP-09-015 — Design pub/sub system

**Answer / starting outline.** LLD starting point: Topic, Publisher, Subscription, Broker and Message. Define ordering, fan-out, acknowledgments, retention and subscriber isolation. A slow subscriber needs a bounded policy. Test duplicate delivery, unsubscription during publish and subscriber failure. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0249](#QS-B0249).

<a id="GAP-09-016"></a>

### GAP-09-016 — Design file system

**Answer / starting outline.** LLD starting point: Node, File, Directory, PathResolver and PermissionPolicy. Composite can represent directories and files through common operations, but file-only operations should remain clear. Define duplicate names, moving into descendants and access checks. Test path normalization and cycle prevention. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0250](#QS-B0250).

<a id="GAP-09-017"></a>

### GAP-09-017 — Design food delivery/order system

**Answer / starting outline.** LLD starting point: Order, Item, Restaurant, Courier, PaymentGateway and an OrderStateMachine. Put allowed transitions/invariants in domain logic and external integrations behind interfaces. Test rejection, cancellation races, failed payment and reassignment; define compensations where side effects have escaped. Follow requirements → entities → interfaces → relationships → core flows → concurrency → extensibility → edge cases → code.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0251](#QS-B0251).

<a id="GAP-10-001"></a>

### GAP-10-001 — What if traffic becomes 10×?

**Answer / starting outline.** At 10× traffic, quantify which resource saturates first. Load test the request mix, scale stateless replicas where useful, then address storage/queue/hot-key capacity. Keep invariants and recovery behavior explicit rather than adding every scaling technology.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0259](#QS-B0259).

<a id="GAP-10-002"></a>

### GAP-10-002 — What if one server dies?

**Answer / starting outline.** Remove the failed instance from routing, retry only safely repeatable work, and recover unacknowledged jobs through durable state/redelivery. Plan spare capacity and distinguish process failure from shared dependency failure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0260](#QS-B0260).

<a id="GAP-10-003"></a>

### GAP-10-003 — What if the database dies?

**Answer / starting outline.** Use a tested database failover/recovery plan, bounded connection retries and explicit degraded behavior. Determine whether acknowledged data can be lost. Reject operations whose invariants cannot be guaranteed; never accept durable work solely in memory.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0261](#QS-B0261).

<a id="GAP-10-004"></a>

### GAP-10-004 — What if Redis dies?

**Answer / starting outline.** If Redis is only a cache, bypass it within database capacity bounds or serve allowed stale data. If it coordinates correctness or rate limits, define an explicit fail-open/fail-closed policy. A single blanket fallback can violate invariants.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0262](#QS-B0262).

<a id="GAP-10-005"></a>

### GAP-10-005 — What if Kafka is unavailable?

**Answer / starting outline.** A durable outbox can accumulate publications while the broker is unavailable, with monitoring and storage/admission limits. Reads may continue if independent. Producers must know what “accepted” means; an unbounded backlog is not a complete availability strategy.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0263](#QS-B0263).

<a id="GAP-10-006"></a>

### GAP-10-006 — What if a request is duplicated?

**Answer / starting outline.** Use a caller/operation-scoped idempotency key, request fingerprint and durable result/state. Enforce a unique constraint under concurrent duplicates. Reusing a key with a different payload is an error; retention limits determine the deduplication window.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0264](#QS-B0264).

<a id="GAP-10-007"></a>

### GAP-10-007 — What if messages arrive out of order?

**Answer / starting outline.** Use entity version/sequence numbers and define whether to reject, buffer, reorder or reconcile late events. Broker ordering usually has a partition/key scope. A timestamp alone is insufficient for a complete cross-node ordering guarantee.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0265](#QS-B0265).

<a id="GAP-10-008"></a>

### GAP-10-008 — What if one user has 10M followers?

**Answer / starting outline.** A celebrity account creates fan-out and hot-read pressure. Consider hybrid fan-out: precompute ordinary feeds, merge high-fan-out authors at read time, cache popular data and bound page work. Address privacy/deletion propagation and freshness.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0266](#QS-B0266).

<a id="GAP-10-009"></a>

### GAP-10-009 — What if one tenant sends 1M requests?

**Answer / starting outline.** Enforce per-tenant admission/concurrency quotas, fair scheduling and isolated budgets. Large tenants may need dedicated shards or workers. Global rate limiting alone can let one tenant consume everyone’s capacity.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0267](#QS-B0267).

<a id="GAP-10-010"></a>

### GAP-10-010 — What if one region goes down?

**Answer / starting outline.** Fail over according to RPO/RTO and replica readiness; fence old writers, reroute traffic and plan recovery/reconciliation. Multi-region copies do not imply zero loss or transparent failover. Test the region-loss procedure.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0268](#QS-B0268).

<a id="GAP-10-011"></a>

### GAP-10-011 — What if the network partitions?

**Answer / starting outline.** State which operations remain available and which reject/wait to preserve consistency. Use safe authority/quorum rules and fence stale leaders. Healing a partition requires defined conflict/reconciliation behavior.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0269](#QS-B0269).

<a id="GAP-10-012"></a>

### GAP-10-012 — What if the cache is stale?

**Answer / starting outline.** Specify acceptable staleness, TTL/invalidation and read-after-write paths. Version keys or prevent stale refills where needed. Correctness-sensitive decisions should use authoritative data or a clearly justified consistent cache protocol.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0270](#QS-B0270).

<a id="GAP-10-013"></a>

### GAP-10-013 — What if the cache is completely cold?

**Answer / starting outline.** Warm gradually, coalesce per-key misses, serve allowed stale data and limit origin concurrency. A cold cache can cause a stampede; launching more API replicas may increase the database load rather than fix it.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0271](#QS-B0271).

<a id="GAP-10-014"></a>

### GAP-10-014 — What if the queue grows indefinitely?

**Answer / starting outline.** Bound backlog, shed/reject lower-priority arrivals, increase measured consumer capacity where safe and alert on queue age. Dead-letter permanent failures. Calculate drain time; a queue that grows indefinitely reflects a capacity/processing problem.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0272](#QS-B0272).

<a id="GAP-10-015"></a>

### GAP-10-015 — What if a worker crashes halfway through?

**Answer / starting outline.** Record durable job state, use leases/heartbeats for recovery and acknowledge only after the defined safe processing boundary. The replacement worker must tolerate duplicates. A lease expiring does not prove the old worker has stopped.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0273](#QS-B0273).

<a id="GAP-10-016"></a>

### GAP-10-016 — What if the same job is processed twice?

**Answer / starting outline.** Make database-local effects and deduplication atomic. External APIs require downstream idempotency or reconciliation. Test concurrent duplicate workers and crash windows; a standalone “processed” flag cannot guarantee exactly-once external effects.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0274](#QS-B0274).

<a id="GAP-10-017"></a>

### GAP-10-017 — What if the downstream service is slow?

**Answer / starting outline.** Apply deadlines, bounded concurrency, backpressure and retries only when safe. Use a circuit breaker/degraded path when appropriate. Queueing every slow call increases latency and can exhaust threads/connections.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0275](#QS-B0275).

<a id="GAP-10-018"></a>

### GAP-10-018 — What if payment succeeds but your service crashes?

**Answer / starting outline.** Record the payment’s external idempotency key/reference, query/reconcile status after uncertainty, and complete local state transitions idempotently. A timeout/crash does not prove payment failed. Avoid issuing a second unrelated charge.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0276](#QS-B0276).

<a id="GAP-10-019"></a>

### GAP-10-019 — What if the database commits but the event isn't published?

**Answer / starting outline.** Commit an outbox entry with the business change in the same database transaction, then publish asynchronously with retries. Consumers still need duplicate handling. Monitor stuck outbox records and define retention/recovery.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0277](#QS-B0277).

<a id="GAP-10-020"></a>

### GAP-10-020 — What if the event is published but the database transaction fails?

**Answer / starting outline.** Avoid publishing a business event before its associated database commit. Use a transactional outbox or another justified atomic boundary. If an invalid event already escaped, downstream consumers need explicit correction/reconciliation; an application rollback cannot retract an external message.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0278](#QS-B0278).

<a id="GAP-10-021"></a>

### GAP-10-021 — What consistency guarantee do you provide?

**Answer / starting outline.** Name the actual property and scope: for example, atomic job acceptance in one database, at-least-once delivery, deduplicated database-local effects and eventual status propagation. Do not promise stronger end-to-end behavior than your failure model supports.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0279](#QS-B0279).

<a id="GAP-10-022"></a>

### GAP-10-022 — What can you sacrifice during an outage?

**Answer / starting outline.** Choose essential operations and minimum valid responses in advance. You may relax freshness or disable recommendations; authorization, financial and inventory invariants often require rejection rather than unsafe degradation.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0280](#QS-B0280).

<a id="GAP-10-023"></a>

### GAP-10-023 — Where is the bottleneck?

**Answer / starting outline.** Use latency breakdowns, saturation/error/throughput metrics, profiles, plans and queue age to identify the bottleneck. A faster API layer cannot repair a saturated downstream service. Re-measure after each targeted change.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0281](#QS-B0281).

<a id="GAP-10-024"></a>

### GAP-10-024 — How would you monitor it?

**Answer / starting outline.** Monitor request success/tail latency, CPU/memory/GC, connections, database waits, broker lag/queue age and correctness signals such as duplicate conflicts. Correlate traces/logs and alerts with a runbook; avoid unbounded tenant/user labels.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0282](#QS-B0282).

<a id="GAP-10-025"></a>

### GAP-10-025 — What would you change at 10× scale?

**Answer / starting outline.** Re-estimate load and trace the current critical path. Change the resource actually limiting capacity, preserving ordering, consistency and tenant isolation. Compare options and operational cost, then validate the new failure modes.

**Practice.** Close the answer and explain the mechanism; draw one concrete flow, state a failure case and defend an alternative. For a design outline, develop APIs, data schema, estimates and failure recovery before treating it as a completed design.

Prompt retained at [QS-B0283](#QS-B0283).
