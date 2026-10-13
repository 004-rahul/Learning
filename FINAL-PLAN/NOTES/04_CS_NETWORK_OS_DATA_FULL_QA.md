# Networking, operating systems, replication and data Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q03"></a>

## Q03 — M3_Networking_OS_and_Distributed_Data

Full source content: [Q-and-A/M3_Networking_OS_and_Distributed_Data.docx](../SOURCE_LIBRARY/Q-and-A/M3_Networking_OS_and_Distributed_Data.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="Q03-B0001"></a>

Month 3 Q&A - Networking, OS and Distributed Data

<a id="Q03-B0002"></a>

Weeks 9 to 12. The month that fills the degree-shaped gap. 44 questions.

<a id="Q03-B0003"></a>

Covers: Weeks 9-12. Networking, operating systems, replication and partitioning, caching, and messaging. Plus the first three system designs.

<a id="Q03-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q03-B0005"></a>

### How to use this on a bad week

<a id="Q03-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q03-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q03-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q03-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q03-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q03-B0011"></a>

| # | Question |
| --- | --- |
| 1 | What happens when you type a URL and press enter? |
| 2 | Why does TLS use both asymmetric and symmetric cryptography? |
| 3 | Why does async I/O not need a thread while waiting? |
| 4 | Why does consistent hashing beat modulo hashing? |
| 5 | Why is exactly-once delivery a myth, and what do you do instead? |

<a id="Q03-B0012"></a>

### What this file answers

<a id="Q03-B0013"></a>

Everything in the Month 3 checkpoint. This is the material a CS degree gives people and you were never taught - which is why it is also the material that most changes how senior you sound.

<a id="Q03-B0014"></a>

### PART A - Networking

<a id="Q03-Q001"></a>

<a id="Q03-B0015"></a>

### Q1. What happens when you type a URL and press enter?

<a id="Q03-B0016"></a>

Say this. DNS resolution turns the hostname into an IP - browser cache, OS cache, resolver, then root, TLD and authoritative servers if needed. Then a TCP three-way handshake to that IP, and a TLS handshake on top if it is HTTPS. Then the HTTP request goes out, usually to a load balancer, which picks a backend. The application handles it, probably hitting a cache and a database. The response comes back, the browser parses the HTML and fires more requests for CSS, JS and images, often from a CDN.

<a id="Q03-B0017"></a>

Why. Every layer exists to hide a failure or a cost from the layer above: DNS hides IP changes, TCP hides packet loss, TLS hides eavesdropping, the load balancer hides individual servers.

<a id="Q03-B0018"></a>

Watch out. This is the single most-asked systems question. Practise it as a five-minute narration and know where you would go deeper if pushed - the handshakes are the usual follow-up.

<a id="Q03-Q002"></a>

<a id="Q03-B0019"></a>

### Q2. Walk through DNS resolution.

<a id="Q03-B0020"></a>

Say this. Check the browser cache, then the OS cache, then ask the configured recursive resolver. If the resolver has nothing cached it asks a root server, which points to the TLD server for `.com`, which points to the authoritative nameserver for the domain, which returns the record. Everything is cached along the way for the TTL.

<a id="Q03-B0021"></a>

Why. The hierarchy exists so no single server has to know everything, and caching means the full walk almost never happens - most lookups are answered from a cache within a millisecond.

<a id="Q03-B0022"></a>

Watch out. TTL is why DNS changes are slow to take effect: you cannot recall a cached answer. Lowering the TTL before a planned migration is the standard trick.

<a id="Q03-Q003"></a>

<a id="Q03-B0023"></a>

### Q3. Explain the TCP three-way handshake, and what reliability costs.

<a id="Q03-B0024"></a>

Say this. SYN from the client with an initial sequence number, SYN-ACK from the server with its own, ACK from the client. Now both sides know the other is reachable and have agreed sequence numbers. The cost is one full round trip before any data flows - and with TLS on top, two or three.

<a id="Q03-B0025"></a>

Why. Reliability comes from sequence numbers plus acknowledgements plus retransmission: the sender keeps data until it is acknowledged and resends if not. That guarantees delivery and order, at the cost of latency and head-of-line blocking.

<a id="Q03-B0026"></a>

Watch out. This is why connection reuse matters so much. Keep-alive, connection pooling and HTTP/2 all exist to avoid paying the handshake repeatedly.

<a id="Q03-Q004"></a>

<a id="Q03-B0027"></a>

### Q4. Flow control or congestion control - what is the difference?

<a id="Q03-B0028"></a>

Say this. Flow control protects the receiver: the receive window says how much unacknowledged data it can buffer. Congestion control protects the network: slow start and congestion avoidance grow the sending rate gradually and back off on packet loss.

<a id="Q03-B0029"></a>

Why. They solve different overload problems. A fast sender can overwhelm a slow receiver even on a perfect network, and a network can be congested even when every receiver is fast.

<a id="Q03-B0030"></a>

Watch out. Slow start is why the first few hundred milliseconds of a connection are slower than the steady state - another reason to reuse connections.

<a id="Q03-Q005"></a>

<a id="Q03-B0031"></a>

### Q5. What is head-of-line blocking, and how did HTTP/2 and HTTP/3 address it?

<a id="Q03-B0032"></a>

Say this. One slow or lost item blocks everything behind it. In HTTP/1.1 a single connection handles one request at a time, so a slow response blocks the queue. HTTP/2 multiplexes many streams over one connection, which fixes it at the HTTP layer - but a lost TCP packet still stalls every stream, because TCP guarantees order. HTTP/3 moves to QUIC over UDP, where each stream is independently ordered, so loss affects only its own stream.

<a id="Q03-B0033"></a>

Why. HTTP/1.1 pipelining tried to fix this and failed because responses still had to come back in request order. Multiplexing works because responses carry stream IDs and can be interleaved.

<a id="Q03-B0034"></a>

Watch out. "HTTP/2 fixed head-of-line blocking" is only half true - it fixed it at the HTTP layer and left it at the TCP layer. Saying both halves is the strong answer.

<a id="Q03-Q006"></a>

<a id="Q03-B0035"></a>

### Q6. Why does TLS use both asymmetric and symmetric cryptography?

<a id="Q03-B0036"></a>

Say this. Asymmetric crypto lets two parties who have never met agree a shared secret and verify identity, but it is slow. Symmetric crypto is fast but needs a shared key. So TLS uses asymmetric during the handshake to authenticate the server and establish a session key, then switches to symmetric for the actual data.

<a id="Q03-B0037"></a>

Why. It is the only way to get both properties: you cannot bootstrap trust with symmetric crypto because there is no pre-shared key, and you cannot afford asymmetric for every byte.

<a id="Q03-B0038"></a>

Watch out. The certificate is what makes the asymmetric half meaningful - it binds the public key to a hostname, vouched for by a CA the client already trusts.

<a id="Q03-Q007"></a>

<a id="Q03-B0039"></a>

### Q7. What does HTTPS not protect?

<a id="Q03-B0040"></a>

Say this. It does not hide which server you are talking to - the IP is visible, and the hostname is visible in SNI unless encrypted client hello is in use. It does not hide traffic volume or timing. It does not protect you if the endpoint itself is malicious or compromised, and it does nothing about what happens to the data after it arrives.

<a id="Q03-B0041"></a>

Why. TLS secures the channel, not the parties. Confidentiality and integrity in transit is the entire promise.

<a id="Q03-B0042"></a>

Watch out. A good extra: it does not protect against a compromised or coerced certificate authority, which is why certificate pinning and transparency logs exist.

<a id="Q03-Q008"></a>

<a id="Q03-B0043"></a>

### Q8. Explain CORS and preflight.

<a id="Q03-B0044"></a>

Say this. A browser blocks a page on origin A from reading a response from origin B unless B opts in with `Access-Control-Allow-Origin`. For anything beyond a simple request - a custom header, or a method other than GET/POST/HEAD - the browser first sends an OPTIONS preflight asking what is permitted, and only sends the real request if the answer allows it.

<a id="Q03-B0045"></a>

Why. It is a browser-enforced policy protecting users, not a server security mechanism. The server is perfectly reachable by anything that is not a browser.

<a id="Q03-B0046"></a>

Watch out. Two common mistakes: CORS middleware registered after routing, so preflights never reach it; and wildcard origin with credentials, which the spec forbids outright.

<a id="Q03-Q009"></a>

<a id="Q03-B0047"></a>

### Q9. Why is scaling WebSockets harder than scaling HTTP?

<a id="Q03-B0048"></a>

Say this. HTTP is stateless, so any server can handle any request and a load balancer can send it anywhere. A WebSocket is a long-lived stateful connection pinned to one server. So a message for a user connected to server B is useless if it arrives at server A - you need a backplane like Redis so any server can publish to any connection, plus sticky sessions for the initial handshake.

<a id="Q03-B0049"></a>

Why. The connection is the state. Every scaling technique that relies on statelessness stops applying.

<a id="Q03-B0050"></a>

Watch out. You lived this with SignalR in VCDoctor. Mention the backplane and what happens to messages during a reconnect - that second part is what makes it a real answer.

<a id="Q03-B0051"></a>

### PART B - Operating systems

<a id="Q03-Q010"></a>

<a id="Q03-B0052"></a>

### Q10. Process or thread - what actually differs at the OS level?

<a id="Q03-B0053"></a>

Say this. A process has its own virtual address space, its own file handles and its own page tables. Threads inside a process share all of that and have only their own stack, registers and program counter. So creating a thread is far cheaper, and communication between threads is just shared memory - which is also why it is dangerous.

<a id="Q03-B0054"></a>

Why. Isolation is the point of a process. One crashing process cannot corrupt another; one crashing thread takes down the whole process.

<a id="Q03-B0055"></a>

Watch out. This connects directly to Month 1: a thread's stack is where your value-type locals live, which is why each thread reserves around a megabyte.

<a id="Q03-Q011"></a>

<a id="Q03-B0056"></a>

### Q11. Why is a context switch expensive?

<a id="Q03-B0057"></a>

Say this. The kernel saves the registers and stack pointer, switches page tables, and restores the other thread. That is maybe a microsecond of direct cost - but the real cost is indirect: the CPU caches and the TLB are now full of the wrong data, so the new thread runs slowly until they warm up again.

<a id="Q03-B0058"></a>

Why. Modern CPUs are fast only because of cache locality. A context switch destroys locality, and the recovery costs far more than the switch itself.

<a id="Q03-B0059"></a>

Watch out. This is the deep reason the thread pool exists and why more threads than cores makes things slower. It ties the OS layer to the .NET layer.

<a id="Q03-Q012"></a>

<a id="Q03-B0060"></a>

### Q12. What is virtual memory and why does it exist?

<a id="Q03-B0061"></a>

Say this. Every process sees a contiguous private address space; the OS maps those virtual addresses to physical pages through page tables, with the TLB caching recent translations. It exists for isolation - one process cannot address another's memory - and to allow the total memory in use to exceed physical RAM by paging to disk.

<a id="Q03-B0062"></a>

Why. It also allows lazy allocation: memory is reserved cheaply and only backed by physical pages when touched. That is why a process can reserve a gigabyte and use ten megabytes.

<a id="Q03-B0063"></a>

Watch out. A page fault is not an error. It is the normal mechanism for bringing a page in. Only a hard fault, requiring a disk read, is slow - and constant hard faults is thrashing.

<a id="Q03-Q013"></a>

<a id="Q03-B0064"></a>

### Q13. Where does the OS scheduler end and the .NET scheduler begin?

<a id="Q03-B0065"></a>

Say this. The OS schedules threads onto cores using preemptive time slices and priorities. The .NET thread pool schedules work items onto its threads, with a queue per thread and work stealing between them. So there are two layers: .NET decides which work item a pool thread picks up, the OS decides when that thread actually runs.

<a id="Q03-B0066"></a>

Why. The layering exists because a work item is much cheaper than a thread. .NET can queue a million work items; the OS cannot host a million threads.

<a id="Q03-B0067"></a>

Watch out. This is a good "do you understand the stack" question. Drawing it as two layers is worth doing once on paper - it makes the answer effortless.

<a id="Q03-Q014"></a>

<a id="Q03-B0068"></a>

### Q14. Mutex, semaphore or spinlock - and when is a spinlock catastrophic?

<a id="Q03-B0069"></a>

Say this. A mutex is mutual exclusion with ownership - one holder, and only the owner may release. A semaphore is a counter allowing N holders and has no ownership. A spinlock busy-waits in a loop instead of sleeping. A spinlock is catastrophic when the critical section is long or when there are more threads than cores: you burn a whole core doing nothing, and if the holder gets descheduled the spinner spins for an entire time slice.

<a id="Q03-B0070"></a>

Why. Sleeping costs a context switch - a microsecond or so. Spinning avoids it, so spinning wins only when the expected wait is shorter than that.

<a id="Q03-B0071"></a>

Watch out. "Spin for very short critical sections on a machine with spare cores; sleep otherwise" is the complete answer.

<a id="Q03-Q015"></a>

<a id="Q03-B0072"></a>

### Q15. Why does async I/O not need a thread while waiting?

<a id="Q03-B0073"></a>

Say this. Because the waiting is done by the OS and the hardware, not by your code. You register interest in a completion - through IOCP on Windows, epoll on Linux - and return the thread to the pool. When the device finishes, the OS queues a completion notification and a pool thread picks up the continuation.

<a id="Q03-B0074"></a>

Why. A blocking read parks a thread on a kernel wait, so the thread exists solely to remember where to resume. Async I/O stores that "where to resume" in a state machine object on the heap instead, which costs bytes rather than a thread.

<a id="Q03-B0075"></a>

Watch out. This is the moment Month 1 week 4 and Month 3 week 10 connect. "await maps down to IOCP" is the sentence that shows you understand async rather than just using it.

<a id="Q03-B0076"></a>

### PART C - Replication, partitioning and caching

<a id="Q03-Q016"></a>

<a id="Q03-B0077"></a>

### Q16. Why can a read replica serve stale data, and how do you hide that from a user?

<a id="Q03-B0078"></a>

Say this. Replication is asynchronous - the leader acknowledges the write before followers have applied it, so a read from a follower can miss a just-committed write. You hide it with read-your-writes consistency: route a user's reads to the leader for a short window after they write, or pin them to a replica known to be caught up, or track a version and wait for the replica to reach it.

<a id="Q03-B0079"></a>

Why. Synchronous replication would remove the staleness but make every write as slow as the slowest follower, and unavailable if a follower is down. The lag is the price of write availability.

<a id="Q03-B0080"></a>

Watch out. The user-visible symptom is "I saved it and it disappeared". That framing shows you have operated a system, not just read about one.

<a id="Q03-Q017"></a>

<a id="Q03-B0081"></a>

### Q17. What does quorum mean, and why R + W > N?

<a id="Q03-B0082"></a>

Say this. With N replicas, if you write to W and read from R, then R + W > N guarantees the read set and write set overlap by at least one node - so at least one node you read from has the latest write. Common choice is N=3, W=2, R=2.

<a id="Q03-B0083"></a>

Why. It is a pigeonhole argument. Any two subsets of a set of N whose sizes sum to more than N must share a member.

<a id="Q03-B0084"></a>

Watch out. Tuning R and W trades read latency against write latency. W=N gives fast reads and fragile writes; W=1, R=N is the reverse.

<a id="Q03-Q018"></a>

<a id="Q03-B0085"></a>

### Q18. What is split brain?

<a id="Q03-B0086"></a>

Say this. A network partition leaves two halves of a cluster each believing the other is dead, so both elect a leader and both accept writes. When the partition heals you have two divergent histories and no automatic way to reconcile them.

<a id="Q03-B0087"></a>

Why. It is prevented by requiring a majority quorum to elect a leader: only one side of a partition can hold a majority, so the minority side refuses to serve.

<a id="Q03-B0088"></a>

Watch out. This is why cluster sizes are odd numbers. Three or five nodes have an unambiguous majority; four does not.

<a id="Q03-Q019"></a>

<a id="Q03-B0089"></a>

### Q19. Why does consistent hashing beat modulo hashing?

<a id="Q03-B0090"></a>

Say this. With `hash(key) % N`, changing N changes the destination of almost every key - add one server and you have to move nearly all your data. Consistent hashing places both servers and keys on a ring and assigns each key to the next server clockwise, so adding a server only moves the keys between it and its predecessor - roughly 1/N of the data.

<a id="Q03-B0091"></a>

Why. The modulo binds every key to the current server count. The ring binds each key to a position, and positions do not change when membership does.

<a id="Q03-B0092"></a>

Watch out. Plain rings distribute unevenly, so real implementations use virtual nodes - each physical server occupies many ring positions, which smooths the distribution and makes rebalancing granular. Mention that; it is the follow-up.

<a id="Q03-Q020"></a>

<a id="Q03-B0093"></a>

### Q20. What does CAP actually say, and what is the common misreading?

<a id="Q03-B0094"></a>

Say this. It says that when a network partition occurs, you must choose between consistency and availability - you cannot have both. The misreading is "pick two of three", as if you could trade away partition tolerance. You cannot: partitions are a fact of networks, not a design choice. So the real choice is CP or AP, and only during a partition.

<a id="Q03-B0095"></a>

Why. When there is no partition you can have both, which is why PACELC extends it: else, in normal operation, you still trade latency against consistency.

<a id="Q03-B0096"></a>

Watch out. This is the single most commonly botched distributed-systems question, so getting it right is disproportionately valuable. Say "partition tolerance is not optional" explicitly.

<a id="Q03-Q021"></a>

<a id="Q03-B0097"></a>

### Q21. Strong, eventual, or causal consistency?

<a id="Q03-B0098"></a>

Say this. Strong means every read sees the latest write, as if there were one copy. Eventual means replicas converge if writes stop, with no ordering promise in the meantime. Causal is in between: operations that are causally related are seen in order by everyone, while unrelated ones may be seen in any order.

<a id="Q03-B0099"></a>

Why. Causal is usually what users actually need. A reply appearing before the message it replies to is unacceptable; two unrelated posts arriving in different orders is not.

<a id="Q03-B0100"></a>

Watch out. Anchor it: eventual consistency is fine for a view counter, unacceptable for an account balance. Concrete examples land far better than definitions.

<a id="Q03-Q022"></a>

<a id="Q03-B0101"></a>

### Q22. Why is Redis being single-threaded a feature?

<a id="Q03-B0102"></a>

Say this. Because every command is atomic with no locking, no context switches and no cache-line contention. That makes the implementation simple and the latency extremely predictable - and it is not the bottleneck anyway, since Redis is usually limited by network and memory bandwidth rather than CPU.

<a id="Q03-B0103"></a>

Why. Concurrency in a data structure server means locks, and locks mean contention and complexity. Removing concurrency removes an entire class of bugs and gives you atomicity for free.

<a id="Q03-B0104"></a>

Watch out. Modern Redis does use threads for I/O and background tasks - command execution is what stays single-threaded. And one slow command, like `KEYS *` on a large database, blocks everything. That is the real operational consequence.

<a id="Q03-Q023"></a>

<a id="Q03-B0105"></a>

### Q23. LRU, LFU or TTL?

<a id="Q03-B0106"></a>

Say this. LRU evicts what has not been touched recently and is the sensible default - it tracks recency, which usually predicts reuse. LFU evicts what is used least often, which is better when popularity is stable but worse when it shifts, because an old hot item lingers. TTL is not really an eviction policy - it is a correctness tool for bounding staleness.

<a id="Q03-B0107"></a>

Why. LRU adapts fast and can be fooled by a large scan that evicts everything useful. LFU resists that but adapts slowly.

<a id="Q03-B0108"></a>

Watch out. You usually want TTL plus LRU: TTL bounds how wrong the data can be, LRU bounds how much memory it uses. They answer different questions.

<a id="Q03-B0109"></a>

### PART D - Messaging (your strongest area - own it)

<a id="Q03-Q024"></a>

<a id="Q03-B0110"></a>

### Q24. Explain the delivery guarantees.

<a id="Q03-B0111"></a>

Say this. At-most-once: send and do not retry - you may lose messages. At-least-once: retry until acknowledged - you may get duplicates. Exactly-once: no duplicates and no loss, which is not achievable as a delivery guarantee. Almost every real queue, including SQS, gives at-least-once.

<a id="Q03-B0112"></a>

Why. The impossibility is simple: after sending, the sender either gets an acknowledgement or it does not. If it does not, it cannot distinguish "the message was lost" from "the acknowledgement was lost", so it must choose between resending and not - duplicate or loss.

<a id="Q03-B0113"></a>

Watch out. Say "duplicates are normal, not exceptional". That reframing is what leads to the right design instead of a hunt for a queue that promises exactly-once.

<a id="Q03-Q025"></a>

<a id="Q03-B0114"></a>

### Q25. So how do you get exactly-once processing?

<a id="Q03-B0115"></a>

Say this. At the consumer, not the transport. Make the handler idempotent: give each message a stable business or idempotency key, and write a deduplication record in the same transaction as the effect. If the record already exists, skip. Then a duplicate delivery is harmless.

<a id="Q03-B0116"></a>

Why. The transaction is the crucial part. If you write the effect and the dedup record separately, a crash between them leaves you either processing twice or losing the work - you have just moved the problem.

<a id="Q03-B0117"></a>

Instead of. If the effect is not transactional - sending an email, calling a third-party API - you cannot get atomicity, so you need an outbox pattern or a compensating action instead.

<a id="Q03-B0118"></a>

Watch out. This is exactly what you built in the job platform. Have the dedup table schema in your head - it is the most likely deep-dive of the whole project.

<a id="Q03-Q026"></a>

<a id="Q03-B0119"></a>

### Q26. What is a visibility timeout and what goes wrong with it?

<a id="Q03-B0120"></a>

Say this. When a consumer receives a message it becomes invisible to others for a set period rather than being deleted. If the consumer finishes and deletes it, done. If the consumer crashes, the timeout expires and the message reappears for someone else. What goes wrong: processing takes longer than the timeout, the message reappears, and a second consumer starts the same work while the first is still running.

<a id="Q03-B0121"></a>

Why. It is a lease, not a lock. The queue cannot know whether a silent consumer is slow or dead, so it must guess with a timer.

<a id="Q03-B0122"></a>

Instead of. Extend the visibility timeout with a heartbeat while working, and size the initial timeout from your p99 processing time, not the average.

<a id="Q03-B0123"></a>

Watch out. This is the same problem as a distributed lock lease, and it has the same fix - the connection is worth pointing out.

<a id="Q03-Q027"></a>

<a id="Q03-B0124"></a>

### Q27. Why do retries need jitter?

<a id="Q03-B0125"></a>

Say this. Without it, everything that failed at the same moment retries at the same moment. So a brief downstream blip produces a synchronised wave of retries that keeps the downstream down - a thundering herd. Jitter randomises each delay so the load spreads out.

<a id="Q03-B0126"></a>

Why. Exponential backoff alone fixes the rate but not the synchronisation. Both clients wait one second, then two, then four - together, every time.

<a id="Q03-B0127"></a>

Watch out. Also cap the total attempts and add a circuit breaker. Retries without a breaker amplify an outage instead of riding it out - retrying harder against a dying service is what turns a blip into an incident.

<a id="Q03-Q028"></a>

<a id="Q03-B0128"></a>

### Q28. What is a dead letter queue and what do you actually do with it?

<a id="Q03-B0129"></a>

Say this. After N failed attempts a message is moved to a separate queue instead of being retried forever. That stops one poison message blocking the pipeline and preserves it for inspection. Operationally: alert on DLQ depth, inspect the payload and the error, fix the cause, then replay.

<a id="Q03-B0130"></a>

Why. Without it, a message that can never succeed is retried indefinitely, consuming capacity and hiding the failure. The DLQ makes the failure visible and bounded.

<a id="Q03-B0131"></a>

Watch out. "A DLQ nobody monitors is a data loss mechanism with extra steps." Alerting on depth and having a replay path is the part most candidates never mention.

<a id="Q03-Q029"></a>

<a id="Q03-B0132"></a>

### Q29. SQS, RabbitMQ or Kafka?

<a id="Q03-B0133"></a>

Say this. SQS is a managed work queue - a message is consumed and deleted, scaling consumers is trivial, DLQ is built in, and there is no infrastructure to run. RabbitMQ is a broker with rich routing - exchanges, topics, per-message acknowledgement - when the routing logic is the hard part. Kafka is a durable partitioned log: consumers track their own offsets, messages remain after being read, so you get replay, multiple independent consumer groups, and ordering within a partition.

<a id="Q03-B0134"></a>

Why. The core distinction is queue versus log. A queue forgets; a log remembers. If you might need to reprocess history, or several unrelated consumers need the same stream, you need a log.

<a id="Q03-B0135"></a>

Instead of. For your email pipeline SQS was the right call - independent tasks, no replay requirement, already in the AWS estate, managed retry and DLQ. Say that; a justified simple choice beats an unjustified sophisticated one.

<a id="Q03-Q030"></a>

<a id="Q03-B0136"></a>

### Q30. Explain Kafka partitions, offsets and consumer groups.

<a id="Q03-B0137"></a>

Say this. A topic is split into partitions, each an append-only ordered log. Every message has an offset - its position. A consumer group has each partition assigned to exactly one consumer in the group, and each consumer commits its offset. So parallelism is bounded by partition count, and ordering is guaranteed within a partition but not across the topic.

<a id="Q03-B0138"></a>

Why. That design is why Kafka scales: no per-message bookkeeping, just a sequential file and a cursor per consumer. It is also why more consumers than partitions gains you nothing.

<a id="Q03-B0139"></a>

Watch out. If you need ordering per entity, partition by that entity's key - all events for one user land in one partition and stay ordered. That is the standard answer to "how do you keep ordering at scale".

<a id="Q03-Q031"></a>

<a id="Q03-B0140"></a>

### Q31. How do you guarantee ordering, and what does it cost?

<a id="Q03-B0141"></a>

Say this. Ordering only exists within a single sequential path - one FIFO queue, or one Kafka partition, or one consumer. So you get it by routing everything that must be ordered through one path, keyed by entity. It costs parallelism: that path is now a serial bottleneck, and a slow message blocks everything behind it.

<a id="Q03-B0142"></a>

Why. Order and parallelism are fundamentally in tension. Processing two things at once means you cannot promise which finishes first.

<a id="Q03-B0143"></a>

Watch out. The good design move is to narrow the ordering requirement - usually you need ordering per user or per document, not globally. Saying that turns an impossible requirement into an easy one.

<a id="Q03-Q032"></a>

<a id="Q03-B0144"></a>

### Q32. What is backpressure and why does it matter?

<a id="Q03-B0145"></a>

Say this. It is the downstream telling the upstream to slow down, rather than silently accumulating work. Without it, a fast producer and a slow consumer means an unbounded queue - growing memory, growing latency, and eventually a crash or an out-of-memory kill.

<a id="Q03-B0146"></a>

Why. A bounded buffer converts a memory problem into a latency problem, which is nearly always the better failure. You want to be slow, not dead.

<a id="Q03-B0147"></a>

Watch out. `Channel<T>` with a bounded capacity is the in-process version. Queue depth alarms and consumer autoscaling are the distributed version. Naming both shows range.

<a id="Q03-Q033"></a>

<a id="Q03-B0148"></a>

### Q33. What is the outbox pattern and what problem does it solve?

<a id="Q03-B0149"></a>

Say this. The dual-write problem: you need to update the database and publish an event, and there is no transaction spanning both. If the publish fails after the commit you have lost the event; if it succeeds and the commit fails you have published a lie. The outbox writes the event into a table in the same transaction as the data change, and a separate process reads that table and publishes.

<a id="Q03-B0150"></a>

Why. Now there is exactly one atomic operation. The publish becomes a retryable at-least-once step, which combined with idempotent consumers is correct.

<a id="Q03-B0151"></a>

Watch out. It gives at-least-once publishing, not exactly-once, so consumers still need idempotency. This is a Month 4 topic but it belongs with messaging - and it is a strong thing to have in your project.

<a id="Q03-B0152"></a>

### PART E - The first three system designs

<a id="Q03-Q034"></a>

<a id="Q03-B0153"></a>

### Q34. Design a URL shortener - what are the real decisions?

<a id="Q03-B0154"></a>

Say this. Requirements and scale first - read-heavy by a large factor, so optimise reads. Key generation is the core decision: a counter encoded in base62 is short, dense and guaranteed unique but is sequential and therefore guessable and a write hotspot; a hash of the URL is not sequential but needs collision handling. Then a key-value store, an aggressive cache on the read path since mappings never change, and a 301 or 302 depending on whether you want to count clicks.

<a id="Q03-B0155"></a>

Why. The read/write ratio drives everything. Immutable mappings mean cache invalidation is a non-problem, which is unusual and worth saying out loud.

<a id="Q03-B0156"></a>

Watch out. The trade-off to name: 301 is cacheable by browsers so it is fast but you lose analytics; 302 gives you every click but costs a round trip every time.

<a id="Q03-Q035"></a>

<a id="Q03-B0157"></a>

### Q35. Design a rate limiter - which algorithm and why?

<a id="Q03-B0158"></a>

Say this. Token bucket. Each key has a bucket refilling at a fixed rate up to a capacity; a request takes a token or gets 429 with Retry-After. It allows a controlled burst, which real traffic needs, and it is cheap - two numbers per key. Fixed window is simpler but allows double the limit across a boundary. Sliding window log is exact but stores a timestamp per request, so memory grows with traffic.

<a id="Q03-B0159"></a>

Why. The state must be shared across instances, so it lives in Redis, and the check-and-decrement must be atomic - a Lua script or an INCR with expiry - otherwise two instances both hand out the last token.

<a id="Q03-B0160"></a>

Watch out. The atomicity point is what separates a real answer from a textbook one. It is also exactly what you build in week 18.

<a id="Q03-Q036"></a>

<a id="Q03-B0161"></a>

### Q36. Design a notification service - what is the hard part?

<a id="Q03-B0162"></a>

Say this. Fan-out and deduplication. One event can produce many notifications across email, SMS and push, each with different providers, latencies and failure modes. So: an ingestion API, a queue per channel so a slow provider cannot block the others, per-user preference and quiet-hours checks, a dedup key so a retried event does not notify twice, retries with backoff, and a DLQ per channel.

<a id="Q03-B0163"></a>

Why. The channels have genuinely different characteristics, so a single shared queue means the slowest provider sets the pace for all of them. Separate queues isolate the failure.

<a id="Q03-B0164"></a>

Watch out. Templating and localisation are the other real complexity, and your multilingual work at Casepoint is a genuine credential there.

<a id="Q03-B0165"></a>

### PART F - The Month 3 self-test

<a id="Q03-B0166"></a>

Cover the answers. Anything you cannot say goes in the WEAK tab.

<a id="Q03-B0167"></a>

| # | Say it out loud, no notes |
| --- | --- |
| 1 | The full URL journey, five minutes, without stalling |
| 2 | The TCP handshake, and what reliability costs |
| 3 | Why TLS uses both asymmetric and symmetric cryptography |
| 4 | Head-of-line blocking, and what HTTP/2 fixed and what it did not |
| 5 | Why a context switch is expensive - cache and TLB |
| 6 | Virtual memory, page faults, and why a fault is not an error |
| 7 | How await maps down to IOCP, and why waiting needs no thread |
| 8 | Consistent hashing, virtual nodes, and why modulo fails |
| 9 | CAP stated correctly, including the common misreading |
| 10 | Why exactly-once delivery is impossible and what you do instead |
| 11 | Visibility timeout, and what goes wrong when processing is slow |
| 12 | Why retries need jitter, and why they need a circuit breaker too |
| 13 | SQS versus Kafka, with a real reason for each |
| 14 | The dual-write problem and how the outbox solves it |

<a id="Q03-B0168"></a>

Your advantage in this month. You have used SQS, EventBridge, Redis and SignalR in production. You are not learning Part D from zero - you are learning the vocabulary for things you have already built. Always anchor the answer to your own system: "we hit exactly this with duplicate deliveries in the email pipeline, and the fix was...". That is the answer no other candidate can give.
