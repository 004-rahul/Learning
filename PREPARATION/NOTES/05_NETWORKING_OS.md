# Networking and operating systems

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 3 Q&A parts A–B (M3). Weeks 11–12 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART A - Networking
- PART B - Operating systems
- ➕ "What happens when you type a URL": the 5-minute script
- ➕ Networking lab: commands to run and what to see
- ➕ HTTP essentials for API design
- ➕ Load balancers, reverse proxies and API gateways
- ➕ OS labs in .NET
- ➕ OS terms: one line each, plus an interview sentence

---

<a id="m3-part-a"></a>

## PART A - Networking

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m3-q1"></a>

#### Q1. What happens when you type a URL and press enter?
Say this. DNS resolution turns the hostname into an IP - browser cache, OS cache, resolver, then root, TLD and authoritative servers if needed. Then a TCP three-way handshake to that IP, and a TLS handshake on top if it is HTTPS. Then the HTTP request goes out, usually to a load balancer, which picks a backend. The application handles it, probably hitting a cache and a database. The response comes back, the browser parses the HTML and fires more requests for CSS, JS and images, often from a CDN.
Why. Every layer exists to hide a failure or a cost from the layer above: DNS hides IP changes, TCP hides packet loss, TLS hides eavesdropping, the load balancer hides individual servers.
Watch out. This is the single most-asked systems question. Practise it as a five-minute narration and know where you would go deeper if pushed - the handshakes are the usual follow-up.
<a id="m3-q2"></a>

#### Q2. Walk through DNS resolution.
Say this. Check the browser cache, then the OS cache, then ask the configured recursive resolver. If the resolver has nothing cached it asks a root server, which points to the TLD server for `.com`, which points to the authoritative nameserver for the domain, which returns the record. Everything is cached along the way for the TTL.
Why. The hierarchy exists so no single server has to know everything, and caching means the full walk almost never happens - most lookups are answered from a cache within a millisecond.
Watch out. TTL is why DNS changes are slow to take effect: you cannot recall a cached answer. Lowering the TTL before a planned migration is the standard trick.
<a id="m3-q3"></a>

#### Q3. Explain the TCP three-way handshake, and what reliability costs.
Say this. SYN from the client with an initial sequence number, SYN-ACK from the server with its own, ACK from the client. Now both sides know the other is reachable and have agreed sequence numbers. The cost is one full round trip before any data flows - and with TLS on top, two or three.
Why. Reliability comes from sequence numbers plus acknowledgements plus retransmission: the sender keeps data until it is acknowledged and resends if not. That guarantees delivery and order, at the cost of latency and head-of-line blocking.
Watch out. This is why connection reuse matters so much. Keep-alive, connection pooling and HTTP/2 all exist to avoid paying the handshake repeatedly.
<a id="m3-q4"></a>

#### Q4. Flow control or congestion control - what is the difference?
Say this. Flow control protects the receiver: the receive window says how much unacknowledged data it can buffer. Congestion control protects the network: slow start and congestion avoidance grow the sending rate gradually and back off on packet loss.
Why. They solve different overload problems. A fast sender can overwhelm a slow receiver even on a perfect network, and a network can be congested even when every receiver is fast.
Watch out. Slow start is why the first few hundred milliseconds of a connection are slower than the steady state - another reason to reuse connections.
<a id="m3-q5"></a>

#### Q5. What is head-of-line blocking, and how did HTTP/2 and HTTP/3 address it?
Say this. One slow or lost item blocks everything behind it. In HTTP/1.1 a single connection handles one request at a time, so a slow response blocks the queue. HTTP/2 multiplexes many streams over one connection, which fixes it at the HTTP layer - but a lost TCP packet still stalls every stream, because TCP guarantees order. HTTP/3 moves to QUIC over UDP, where each stream is independently ordered, so loss affects only its own stream.
Why. HTTP/1.1 pipelining tried to fix this and failed because responses still had to come back in request order. Multiplexing works because responses carry stream IDs and can be interleaved.
Watch out. "HTTP/2 fixed head-of-line blocking" is only half true - it fixed it at the HTTP layer and left it at the TCP layer. Saying both halves is the strong answer.
<a id="m3-q6"></a>

#### Q6. Why does TLS use both asymmetric and symmetric cryptography?
Say this. Asymmetric crypto lets two parties who have never met agree a shared secret and verify identity, but it is slow. Symmetric crypto is fast but needs a shared key. So TLS uses asymmetric during the handshake to authenticate the server and establish a session key, then switches to symmetric for the actual data.
Why. It is the only way to get both properties: you cannot bootstrap trust with symmetric crypto because there is no pre-shared key, and you cannot afford asymmetric for every byte.
Watch out. The certificate is what makes the asymmetric half meaningful - it binds the public key to a hostname, vouched for by a CA the client already trusts.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] TLS 1.3 uses only ephemeral (EC)DHE key exchange, giving forward secrecy. The certificate's key *signs* the handshake (authentication); it does not encrypt the session key.

<a id="m3-q7"></a>

#### Q7. What does HTTPS not protect?
Say this. It does not hide which server you are talking to - the IP is visible, and the hostname is visible in SNI unless encrypted client hello is in use. It does not hide traffic volume or timing. It does not protect you if the endpoint itself is malicious or compromised, and it does nothing about what happens to the data after it arrives.
Why. TLS secures the channel, not the parties. Confidentiality and integrity in transit is the entire promise.
Watch out. A good extra: it does not protect against a compromised or coerced certificate authority, which is why certificate pinning and transparency logs exist.
<a id="m3-q8"></a>

#### Q8. Explain CORS and preflight.
Say this. A browser blocks a page on origin A from reading a response from origin B unless B opts in with `Access-Control-Allow-Origin`. For anything beyond a simple request - a custom header, or a method other than GET/POST/HEAD - the browser first sends an OPTIONS preflight asking what is permitted, and only sends the real request if the answer allows it.
Why. It is a browser-enforced policy protecting users, not a server security mechanism. The server is perfectly reachable by anything that is not a browser.
Watch out. Two common mistakes: CORS middleware registered after routing, so preflights never reach it; and wildcard origin with credentials, which the spec forbids outright.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] Two fixes. (1) Order: `UseCors` goes after `UseRouting` and before `UseAuthorization` — see the correction under M2 Q18. (2) The most common preflight trigger is missing: any `Content-Type` other than `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain` triggers a preflight, so every JSON POST is preflighted; so does an `Authorization` header.

<a id="m3-q9"></a>

#### Q9. Why is scaling WebSockets harder than scaling HTTP?
Say this. HTTP is stateless, so any server can handle any request and a load balancer can send it anywhere. A WebSocket is a long-lived stateful connection pinned to one server. So a message for a user connected to server B is useless if it arrives at server A - you need a backplane like Redis so any server can publish to any connection, plus sticky sessions for the initial handshake.
Why. The connection is the state. Every scaling technique that relies on statelessness stops applying.
Watch out. You lived this with SignalR in VCDoctor. Mention the backplane and what happens to messages during a reconnect - that second part is what makes it a real answer.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] For SignalR, sticky sessions are needed when negotiation/fallback transports are used; they are not needed for WebSockets-only clients with `SkipNegotiation`, or with Azure SignalR Service.


<a id="m3-part-b"></a>

## PART B - Operating systems

*Source: Q-and-A/M3_Networking_OS_and_Distributed_Data.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m3-q10"></a>

#### Q10. Process or thread - what actually differs at the OS level?
Say this. A process has its own virtual address space, its own file handles and its own page tables. Threads inside a process share all of that and have only their own stack, registers and program counter. So creating a thread is far cheaper, and communication between threads is just shared memory - which is also why it is dangerous.
Why. Isolation is the point of a process. One crashing process cannot corrupt another; one crashing thread takes down the whole process.
Watch out. This connects directly to Month 1: a thread's stack is where your value-type locals live, which is why each thread reserves around a megabyte.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Thread stack size is platform-dependent (see M2 Q3) and is reserved for call depth, not for value-type locals.

<a id="m3-q11"></a>

#### Q11. Why is a context switch expensive?
Say this. The kernel saves the registers and stack pointer, switches page tables, and restores the other thread. That is maybe a microsecond of direct cost - but the real cost is indirect: the CPU caches and the TLB are now full of the wrong data, so the new thread runs slowly until they warm up again.
Why. Modern CPUs are fast only because of cache locality. A context switch destroys locality, and the recovery costs far more than the switch itself.
Watch out. This is the deep reason the thread pool exists and why more threads than cores makes things slower. It ties the OS layer to the .NET layer.
<a id="m3-q12"></a>

#### Q12. What is virtual memory and why does it exist?
Say this. Every process sees a contiguous private address space; the OS maps those virtual addresses to physical pages through page tables, with the TLB caching recent translations. It exists for isolation - one process cannot address another's memory - and to allow the total memory in use to exceed physical RAM by paging to disk.
Why. It also allows lazy allocation: memory is reserved cheaply and only backed by physical pages when touched. That is why a process can reserve a gigabyte and use ten megabytes.
Watch out. A page fault is not an error. It is the normal mechanism for bringing a page in. Only a hard fault, requiring a disk read, is slow - and constant hard faults is thrashing.
<a id="m3-q13"></a>

#### Q13. Where does the OS scheduler end and the .NET scheduler begin?
Say this. The OS schedules threads onto cores using preemptive time slices and priorities. The .NET thread pool schedules work items onto its threads, with a queue per thread and work stealing between them. So there are two layers: .NET decides which work item a pool thread picks up, the OS decides when that thread actually runs.
Why. The layering exists because a work item is much cheaper than a thread. .NET can queue a million work items; the OS cannot host a million threads.
Watch out. This is a good "do you understand the stack" question. Drawing it as two layers is worth doing once on paper - it makes the answer effortless.
<a id="m3-q14"></a>

#### Q14. Mutex, semaphore or spinlock - and when is a spinlock catastrophic?
Say this. A mutex is mutual exclusion with ownership - one holder, and only the owner may release. A semaphore is a counter allowing N holders and has no ownership. A spinlock busy-waits in a loop instead of sleeping. A spinlock is catastrophic when the critical section is long or when there are more threads than cores: you burn a whole core doing nothing, and if the holder gets descheduled the spinner spins for an entire time slice.
Why. Sleeping costs a context switch - a microsecond or so. Spinning avoids it, so spinning wins only when the expected wait is shorter than that.
Watch out. "Spin for very short critical sections on a machine with spare cores; sleep otherwise" is the complete answer.
<a id="m3-q15"></a>

#### Q15. Why does async I/O not need a thread while waiting?
Say this. Because the waiting is done by the OS and the hardware, not by your code. You register interest in a completion - through IOCP on Windows, epoll on Linux - and return the thread to the pool. When the device finishes, the OS queues a completion notification and a pool thread picks up the continuation.
Why. A blocking read parks a thread on a kernel wait, so the thread exists solely to remember where to resume. Async I/O stores that "where to resume" in a state machine object on the heap instead, which costs bytes rather than a thread.
Watch out. This is the moment Month 1 week 4 and Month 3 week 10 connect. "await maps down to IOCP" is the sentence that shows you understand async rather than just using it.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Waiting needs no thread' is true for sockets (IOCP on Windows, epoll on Linux). Regular file I/O on Linux is not truly async in .NET (epoll does not support regular files, so the work runs on pool threads); on Windows `FileStream` needs `FileOptions.Asynchronous`. The claim holds for network I/O, not universally.


<a id="add-netw-url-journey"></a>

## ➕ "What happens when you type a URL": the 5-minute script

Q1 gives the summary, and Q2, Q3, Q5 and Q6 go deep on DNS, TCP, HTTP/2–3 and TLS. This is the **spoken version**: numbered steps you can say in about five minutes, ending in your own stack (Kestrel and ASP.NET Core). Practise it aloud with a timer. Example: `https://app.example.com/jobs`.

### The full script

1. **The browser parses the URL.** Scheme `https`, host `app.example.com`, path `/jobs`. If the site is on the browser's HSTS list, the browser uses HTTPS even if I typed `http`.
2. **Browser cache.** If a fresh copy of the page is cached (`Cache-Control: max-age` not expired), the browser shows it with no network at all. If the copy is stale but has an `ETag`, it will ask the server "has it changed?" later.
3. **DNS.** The browser needs an IP address. It checks its own DNS cache, then the operating system cache (and the hosts file). If there is no answer, the OS asks the **recursive resolver** (from the ISP or company, or 1.1.1.1 / 8.8.8.8). If the resolver has nothing cached, it asks a **root server**, which points to the **TLD servers** for `.com`, which point to the **authoritative server** for `example.com`, which returns the record. Often it is a CNAME to a CDN or load balancer name, then an A (IPv4) or AAAA (IPv6) record. Every answer is cached for its **TTL**.
4. **TCP handshake.** The browser opens a connection to that IP on port 443: SYN, SYN-ACK, ACK. That costs one round trip. The client uses a random local (ephemeral) port.
5. **TLS 1.3 handshake.** The client sends **ClientHello**: TLS versions, cipher suites, a key share, the hostname in **SNI**, and **ALPN** (for example "h2, http/1.1"). The server replies with **ServerHello** and its key share; both sides now compute the same session keys. The server sends its certificate and a signature, encrypted. The client checks the certificate chain up to a trusted root CA, the hostname, and the dates. One round trip in total. ALPN picks HTTP/2.
6. **HTTP request.** `GET /jobs` with headers: host, cookies or an `Authorization` header, `Accept`, `Accept-Encoding: gzip, br`. On HTTP/2 this is one stream on the connection.
7. **Load balancer / reverse proxy.** The IP usually belongs to a CDN edge, a load balancer or a reverse proxy, not to my server. It often **terminates TLS**, routes by host and path, picks a **healthy** backend, and adds `X-Forwarded-For` and `X-Forwarded-Proto` so the app knows the real client IP and scheme.
8. **Kestrel.** The ASP.NET Core web server accepts the connection, parses the HTTP request and creates an `HttpContext`.
9. **Middleware pipeline.** The request passes through middleware in order: forwarded headers, exception handler, HTTPS redirection, routing, CORS, authentication (who are you?), authorization (are you allowed?), rate limiting, then the endpoint.
10. **The application.** Model binding and validation, then my service code. It checks a cache first (for example Redis, cache-aside). On a miss it queries the database through EF Core, using a pooled connection. While waiting for I/O, `await` gives the thread back to the pool.
11. **Response.** The app returns a status code, headers (`Content-Type`, `Cache-Control`, `ETag`) and a body, compressed. It goes back through the middleware in reverse order, through the load balancer, encrypted by TLS, over TCP.
12. **Rendering.** The browser parses the HTML into the DOM and the CSS into the CSSOM. Scripts can block parsing unless they are `defer` or `async`. Then layout, paint and composite. It finds CSS, JS and images and requests them, usually from a CDN and over the same HTTP/2 connection. The connection stays open (keep-alive) for the next request.

Closing line: "Each layer hides a problem: DNS hides IP changes, TCP hides packet loss, TLS hides eavesdropping, the load balancer hides individual servers, and caches hide distance and load."

### The 30-second version

"The browser checks its cache, then resolves the name with DNS: local caches, then a recursive resolver, which walks root, TLD and authoritative servers, with TTL caching. It opens a TCP connection and does a TLS 1.3 handshake, which verifies the certificate and agrees keys. It sends the HTTP request, which reaches a load balancer that terminates TLS and forwards it to a healthy server. Kestrel runs the middleware pipeline, auth and routing, my code reads from cache or database, and the response goes back the same way. The browser parses, renders, and fetches the remaining assets over the same connection."

### Likely follow-up questions

| Question | Short answer |
|---|---|
| Why is the second visit faster? | DNS is cached, the connection is reused (keep-alive), TLS can resume a session, and static files come from cache or get a `304 Not Modified`. |
| How is the certificate checked? | The chain must lead to a root CA the client trusts, the hostname must match the certificate's SAN list, and it must be in its valid dates and not revoked. |
| What changes with HTTP/3? | QUIC over UDP. Transport and TLS handshakes are combined (1 RTT, 0-RTT on resume), and a lost packet only stalls its own stream. The browser learns about HTTP/3 from the `Alt-Svc` header or a DNS HTTPS record. |
| Where does the client IP get lost? | At the proxy: the app sees the proxy's IP. Read `X-Forwarded-For` with `UseForwardedHeaders`, and trust only known proxies (else anyone can fake it). |
| How do you debug "the page is slow"? | Browser devtools timing: DNS, connect, TLS, waiting (TTFB = server time), download. A large TTFB means look at the server: logs, traces, slow queries. |
| What is TTFB? | Time to first byte: from sending the request to receiving the first byte of the response. Mostly server and network latency. |
| Where can caching happen? | Browser, CDN, reverse proxy, application cache (Redis or in-memory), and the database buffer pool. |
| 502 vs 504? | 502: the proxy got a bad or no response (the app crashed or closed the connection). 504: the proxy gave up waiting (the app was too slow). |
| What if DNS changes? | Clients keep the old answer until its TTL expires. Lower the TTL days before a migration. |
| 0-RTT risks? | Early data can be replayed by an attacker, so only allow it for idempotent requests (like GET). |

<a id="add-netw-lab"></a>

## ➕ Networking lab: commands to run and what to see

Run each command, then write one sentence about what you saw. Use a public site such as `example.com` for read-only checks and your own local app for anything that sends many requests.

**PowerShell gotcha:** in Windows PowerShell 5.1, `curl` is an alias for `Invoke-WebRequest`. Type **`curl.exe`** to get the real curl (built into Windows 10/11). `openssl` comes with Git for Windows (run it from Git Bash). `dig` is easiest in WSL or a container: `docker run --rm -it alpine sh -c "apk add bind-tools && sh"`.

### 1. DNS

```powershell
nslookup example.com                          # which resolver answered, and the IPs
nslookup -type=NS example.com                 # the authoritative nameservers
Resolve-DnsName example.com -Type A           # PowerShell: shows TTL in seconds
Resolve-DnsName www.github.com                # follow a CNAME chain
Resolve-DnsName example.com -Server 1.1.1.1   # ask a specific resolver
ipconfig /displaydns                          # the OS DNS cache
ipconfig /flushdns                            # empty it
```

```bash
dig example.com +short          # just the answer
dig example.com                 # look at the TTL; run twice: the TTL counts down (cached)
dig +trace example.com          # walk root -> .com -> authoritative yourself
dig example.com HTTPS           # HTTPS record (may advertise h3)
```

Observe: the TTL going down on repeated queries is the resolver cache. `+trace` shows the exact hierarchy from step 3 of the script.

### 2. curl: verbose and timing breakdown

```powershell
curl.exe -v https://example.com -o NUL
```

Observe, in order: the IP it tries, "Connected", the TLS handshake lines, the ALPN result (h2 or http/1.1), the certificate subject and issuer, the request headers (lines starting with `>`) and the response headers (`<`). On Windows, curl.exe uses Schannel for TLS, so the TLS lines look different from Linux.

```powershell
curl.exe -s -o NUL -w "dns:     %{time_namelookup}\nconnect: %{time_connect}\ntls:     %{time_appconnect}\nttfb:    %{time_starttransfer}\ntotal:   %{time_total}\nhttp:    %{http_version}\nip:      %{remote_ip}\n" https://example.com
```

The times are **cumulative from the start**, in seconds. So: TCP time = `connect − dns`; TLS time = `tls − connect`; server time ≈ `ttfb − tls`. Run it 3 times and compare. Then compare an HTTP and an HTTPS site to see the TLS cost.

Connection reuse in one curl process:

```powershell
curl.exe -s -o NUL -o NUL -w "new connections: %{num_connects}\n" https://example.com https://example.com
```

The second transfer prints `0`: it reused the first connection. This is keep-alive.

### 3. openssl s_client: look at TLS directly (Git Bash)

```bash
openssl s_client -connect example.com:443 -servername example.com -brief </dev/null
openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
openssl s_client -connect example.com:443 -servername example.com -tls1_2 -brief </dev/null
```

Observe: protocol (TLSv1.3), cipher, verification result, the certificate's names (SAN) and expiry dates. Try without `-servername` on a host behind a shared IP: you may get a different, default certificate. That shows why SNI exists. Fun extra: run without `</dev/null`, then type `GET / HTTP/1.1`, `Host: example.com` and an empty line. HTTP/1.1 is just text inside the TLS tunnel.

### 4. Path and reachability

```powershell
tracert -d example.com                         # hops; -d skips reverse DNS (faster)
ping -n 5 example.com                          # RTT min/avg/max and loss
Test-NetConnection example.com -Port 443       # is TCP 443 open? (TcpTestSucceeded)
```

```bash
traceroute -n example.com ; mtr -n example.com ; ping -c 5 example.com ; nc -vz example.com 443
```

Observe: `* * *` on a hop only means that router does not answer probes. It is not always a problem. A big jump in latency at one hop is often a long physical distance. Many cloud hosts block ICMP, so "ping fails" does not mean "server down". `Test-NetConnection -Port` is the better check for a web server.

### 5. Sockets: ESTABLISHED and TIME_WAIT

```powershell
netstat -ano | findstr ":443"                  # your connections and the owning PID
Get-NetTCPConnection -State Established | Group-Object RemotePort | Sort-Object Count -Descending
Get-NetTCPConnection -State TimeWait | Measure-Object
```

```bash
ss -tanp                                       # all TCP sockets with process
ss -tan state time-wait | wc -l
ss -s                                          # summary
```

Mini-lab with your own app (`dotnet new web`, run it on `http://localhost:5000`):

```csharp
// BAD: a new HttpClient per request. Each disposed client closes its connection.
for (var i = 0; i < 300; i++)
{
    using var client = new HttpClient();
    await client.GetStringAsync("http://localhost:5000/");
}
// GOOD: one shared client (or IHttpClientFactory). Connections are pooled and reused.
var shared = new HttpClient();
for (var i = 0; i < 300; i++) await shared.GetStringAsync("http://localhost:5000/");
```

Count `TimeWait` after each loop. The bad loop leaves many TIME_WAIT sockets: the side that closes first keeps the socket for a while so late packets are not confused with a new connection. At high volume this can use up local ports (`SocketException`). The good loop shows a few ESTABLISHED connections and almost no TIME_WAIT.

### 6. Browser devtools

F12 → Network. Tick "Disable cache" for a cold test, untick it for a warm test. Click a request → **Timing**: Queueing, Stalled, DNS Lookup, Initial connection, SSL, Request sent, **Waiting for server response (TTFB)**, Content Download. Right-click the column header and add **Protocol** (h2, h3) and **Connection ID** (the same ID = a reused connection). Reload: cached files show "(memory cache)" or status 304.

### 7. Wireshark basics

1. Capture on your Wi-Fi or Ethernet adapter. Visit a site once.
2. Filter `tcp.flags.syn == 1 && tcp.port == 443`: you see SYN and SYN-ACK. Right-click → Follow → TCP Stream to see the whole conversation, starting with the handshake.
3. Filter `tls.handshake.type == 1`: the **ClientHello**. Expand it: `server_name` (SNI: the hostname is visible), `supported_versions`, `key_share`, ALPN.
4. Filter `tls.handshake.type == 2`: the ServerHello. After it, everything is "Application Data": encrypted.
5. Filter `dns` for DNS queries and `quic` for HTTP/3.

Extra: set the environment variable `SSLKEYLOGFILE=C:\temp\keys.log`, start the browser, and give that file to Wireshark (Preferences → Protocols → TLS → (Pre)-Master-Secret log filename). Wireshark can then decrypt your own traffic, so you can see the HTTP/2 frames. Capturing `localhost` traffic on Windows needs the Npcap loopback adapter.

<a id="add-netw-http"></a>

## ➕ HTTP essentials for API design

### Methods: safe and idempotent

- **Safe** = does not change server state.
- **Idempotent** = doing it twice has the same *effect* as doing it once. The *response* may differ: a second DELETE can return 404, and that is fine.

| Method | Safe | Idempotent | Typical use |
|---|---|---|---|
| GET | Yes | Yes | Read a resource or list |
| HEAD | Yes | Yes | Like GET, headers only |
| OPTIONS | Yes | Yes | CORS preflight, capabilities |
| PUT | No | Yes | Replace the whole resource at a known URL |
| DELETE | No | Yes | Remove a resource |
| POST | No | **No** | Create, or start an action (submit a job) |
| PATCH | No | Not guaranteed | Partial update |

Why it matters: clients, proxies and retry policies (Polly, the .NET resilience handler) may safely retry idempotent methods after a timeout. Retrying a POST can create two jobs, unless you add an **Idempotency-Key** (below).

### Status codes you must know

| Code | Meaning | Use it when |
|---|---|---|
| 200 OK | Success with a body | GET, or an action that returns data |
| 201 Created | A resource was created | POST created it; add a `Location` header with its URL |
| 202 Accepted | Accepted, not done yet | Long work goes to a queue. Return a status URL: `Location: /jobs/123`. Your job platform uses this. |
| 204 No Content | Success, no body | DELETE, or a PUT that returns nothing |
| 301 Moved Permanently | New URL forever | Old URLs; browsers cache it. 308 is the same but keeps the method. |
| 302 Found | Temporary redirect | Login redirects. 307 is the same but keeps the method. |
| 304 Not Modified | Your cached copy is still valid | Answer to a conditional GET (`If-None-Match`). No body. |
| 400 Bad Request | Malformed or invalid input | Bad JSON, missing fields. ASP.NET Core's `[ApiController]` returns 400 ProblemDetails for validation. |
| 401 Unauthorized | Not authenticated | No token or a bad token. Send `WWW-Authenticate`. |
| 403 Forbidden | Authenticated but not allowed | Valid user, wrong tenant or role |
| 404 Not Found | No such resource | Also used instead of 403 to hide that something exists (another tenant's job) |
| 409 Conflict | Conflicts with the current state | Duplicate (unique constraint), invalid state change ("cancel a finished job") |
| 412 Precondition Failed | `If-Match` did not match | Optimistic concurrency: someone else changed it first |
| 422 Unprocessable Content | Well-formed but breaks a business rule | Some teams use 400 for this. Pick one and be consistent. |
| 429 Too Many Requests | Rate limit hit | Add `Retry-After`. ASP.NET Core's rate limiter returns **503 by default**; set `RejectionStatusCode = 429`. |
| 500 Internal Server Error | A bug or unhandled error | Never leak a stack trace; log it with a trace id |
| 502 Bad Gateway | The proxy got a bad or no answer from upstream | App crashed, closed the connection, or a keep-alive timeout mismatch |
| 503 Service Unavailable | Temporarily cannot serve | Overload, maintenance, dependency down. Add `Retry-After`. |
| 504 Gateway Timeout | The proxy gave up waiting | The upstream was too slow; check timeouts on each layer |

### Headers

| Header | What it does |
|---|---|
| `Cache-Control` | `max-age=60` (fresh for 60 s), `no-cache` (may store, but must revalidate first), `no-store` (never store; use for private data), `private` (browser only, not CDN), `public`, `s-maxage` (for shared caches), `immutable` (for fingerprinted files like `app.3f9a.js`). |
| `ETag` / `If-None-Match` | The server sends `ETag: "v7"`. Next time the client sends `If-None-Match: "v7"`. If unchanged → `304`, no body. Saves bandwidth. |
| `If-Match` | Concurrency for writes: `PUT /jobs/123` with `If-Match: "v7"`. If the current version is not v7 → `412`. Map the ETag to your `version` / `rowversion` column. |
| `Authorization` | `Bearer <token>` (JWT or opaque). Only send it over HTTPS. Do not log it. |
| `Content-Type` / `Accept` | What the body is (`application/json`) / what the client wants back. |
| `Retry-After` | With 429 or 503: seconds (or a date) to wait. Good clients respect it. |
| `Idempotency-Key` | The client sends a unique key with a POST. The server stores the key with the result; a retry with the same key returns the stored result and creates nothing new. An IETF draft (verify status); Stripe-style APIs use it. In your schema: `jobs.idempotency_key` with a unique constraint and `ON CONFLICT`. |
| `Location` | URL of the created resource (201) or of the status endpoint (202), or the redirect target. |
| `Vary` | Which request headers change the response (`Accept-Encoding`, `Accept-Language`), so caches keep separate copies. |

### Keep-alive and connection reuse

- HTTP/1.1 keeps connections open by default; `Connection: close` ends one. One request at a time per connection, so browsers open about six connections per host.
- HTTP/2 uses one connection with many parallel streams.
- In .NET, `SocketsHttpHandler` pools connections per host. Use `IHttpClientFactory` or one long-lived `HttpClient`. Set `PooledConnectionLifetime` (for example 2–5 minutes) so a long-lived client still notices DNS changes.
- Kestrel closes idle keep-alive connections after `KeepAliveTimeout` (default 130 seconds; verify). See the timeout alignment rule in the next section.

### HTTP/1.1 vs HTTP/2 vs HTTP/3

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Transport | TCP | TCP | QUIC over UDP |
| Format | Text | Binary frames | Binary frames |
| Parallel requests | One at a time per connection | Many streams on one connection | Many independent streams |
| Head-of-line blocking | At HTTP and TCP level | Fixed at HTTP level; still at TCP level | Only the stream that lost a packet waits |
| Header compression | None | HPACK | QPACK |
| New connection cost (with TLS 1.3) | TCP 1 RTT + TLS 1 RTT | Same | 1 RTT combined; 0-RTT on resume |
| Changing network (Wi-Fi → 4G) | New connection | New connection | Connection migration (connection IDs) |
| Kestrel | Yes | Yes (needs TLS for browsers) | Yes; needs MsQuic (built into recent Windows; `libmsquic` on Linux) (verify) |

### WebSockets vs Server-Sent Events vs long polling

| | WebSockets | Server-Sent Events (SSE) | Long polling |
|---|---|---|---|
| Direction | Both ways | Server → client only | Client asks, server answers when it has news |
| Transport | Upgrade from HTTP to its own protocol | A normal HTTP response that stays open (`text/event-stream`) | Normal HTTP requests that wait |
| Browser API | `WebSocket` | `EventSource`, auto-reconnect with `Last-Event-ID` | `fetch` in a loop |
| Proxies and firewalls | Need Upgrade support and long idle timeouts | Easy: plain HTTP | Easiest |
| Cost | Lowest per message | Low | A new request per message |
| Good for | Chat, collaborative editing, games | Notifications, job progress, live feeds | Fallback when nothing else works |

Notes: on HTTP/1.1, browsers allow only about six connections per host, so many SSE tabs can starve each other; HTTP/2 removes that limit. SignalR picks WebSockets, then SSE, then long polling automatically (scaling is in Q9). .NET 10 adds a built-in SSE result for minimal APIs (`TypedResults.ServerSentEvents`; verify). For your job platform, SSE is a good fit for "job progress" pages.

<a id="add-netw-lb-proxy"></a>

## ➕ Load balancers, reverse proxies and API gateways

### Three names, overlapping jobs

| | Reverse proxy | Load balancer | API gateway |
|---|---|---|---|
| Core job | Sits in front of servers and forwards requests for them | Spreads traffic over many healthy instances | Single front door for many APIs |
| Typical extras | TLS termination, compression, caching, path routing | Health checks, algorithms, draining | Authentication, rate limits, API keys, request/response changes, quotas |
| Examples | Nginx, YARP, IIS ARR | Azure Load Balancer, AWS NLB/ALB, HAProxy | Azure API Management, Kong, a YARP-based gateway |

An L7 load balancer is also a reverse proxy, and a gateway usually load-balances too. In an interview, name the **job**, not the product.

### L4 vs L7

| | Layer 4 (transport) | Layer 7 (application) |
|---|---|---|
| Sees | IP addresses, ports, TCP/UDP | Full HTTP: host, path, headers, cookies |
| Balances | **Connections** | **Requests** |
| TLS | Passes it through (cannot read HTTP) | Usually terminates it |
| Routing by path or header | No | Yes (`/api` → API pool, `/static` → CDN) |
| Overhead | Very low | Higher (parses every request) |
| Examples | Azure Load Balancer, AWS NLB | Azure Application Gateway, AWS ALB, Nginx, YARP |

Important trap: an L4 balancer balances connections, but HTTP/2 and gRPC clients keep **one long connection** and send everything on it. So one backend gets all the traffic of that client. Use an L7 balancer for gRPC, or make clients recycle connections.

### Algorithms

- **Round robin** (and weighted round robin): each server in turn. Simple; fine when requests cost about the same.
- **Least connections / least outstanding requests:** send to the least busy server. Better when request cost varies a lot (a report vs a health ping).
- **Consistent hashing:** hash a key (user id, tenant id, cache key) onto a ring of servers. The same key goes to the same server, and adding or removing a server moves only a small share of keys. Used for cache affinity and sharding.
- **Power of two choices:** pick two servers at random and send to the less busy one. Cheap and works well at scale.

### Health checks

- **Active:** the LB calls `/health/ready` every few seconds. After N failures it removes the instance; after M successes it adds it back.
- **Passive:** the LB watches real traffic (errors, timeouts) and ejects bad instances (outlier detection).
- **Liveness vs readiness** (ASP.NET Core `MapHealthChecks` with tags): *liveness* = "the process works" (restart me if not); *readiness* = "I can take traffic now" (dependencies OK, warm-up done). Do not put the database in the liveness check: a database blip would restart every instance at once.

### Sticky sessions

The LB sends a user to the same instance every time, usually with a cookie. Needed when state lives in one server's memory: in-memory session, or SignalR with negotiation (see Q9). Costs: uneven load, the session is lost when that instance dies, and scale-in is harder. Better: stateless servers plus shared state (Redis, the database), and shared ASP.NET Core Data Protection keys so any instance can read cookies.

### TLS termination

| Mode | How | Trade-off |
|---|---|---|
| Terminate at the LB | LB decrypts; plain HTTP to backends on a private network | Simple certificates; LB can route by path. Traffic inside is unencrypted. |
| Re-encrypt (TLS bridging) | LB decrypts, inspects, encrypts again to the backend | Encrypted end to end, with L7 features. More CPU and certificates. |
| Passthrough | L4 only; the backend terminates TLS | True end-to-end encryption; no L7 routing. |

When TLS ends at the LB, the app sees `http`. Use `app.UseForwardedHeaders()` (with `X-Forwarded-Proto` and `X-Forwarded-For`, and the proxy listed in `KnownProxies` / `KnownNetworks`) **early in the pipeline**. Otherwise you get redirect loops from `UseHttpsRedirection`, wrong links, and the wrong client IP in logs and rate limits.

### Timeouts: align every layer

Two rules:

1. **Request timeouts get shorter as you go inward:** client > load balancer > app request timeout > database command timeout. The inner layer then fails first, returns a clear error, and stops its work. If the LB times out first, the client gets a 504 while the app keeps working on a request nobody is waiting for.
2. **Idle (keep-alive) timeouts are the opposite:** the backend's idle timeout must be **longer** than the LB's. Then the LB always closes an idle connection first. If the backend closes first, the LB may send a new request on a connection that is just closing, and the user gets a random 502. Kestrel's default `KeepAliveTimeout` (130 s) is longer than many LB defaults (often 60 s), but check your LB (verify).

### Deploys and long-lived connections

- **Connection draining** (deregistration delay): during a deploy the LB stops sending *new* requests to the old instance and waits up to a set time for in-flight requests to finish.
- **Graceful shutdown in .NET:** on SIGTERM, `IHostApplicationLifetime.ApplicationStopping` fires, Kestrel stops accepting, and in-flight requests get `HostOptions.ShutdownTimeout` to finish (30 s by default since .NET 8; verify). In Kubernetes, add a short `preStop` sleep so the endpoint is removed from the LB *before* the app stops, and keep `terminationGracePeriodSeconds` longer than the shutdown timeout.
- **WebSockets, SSE and SignalR never "finish".** Draining just waits and then cuts them. Clients must reconnect, with backoff and **random jitter**, or thousands reconnect at the same second (thundering herd). Messages sent during the gap can be lost, so the client must re-sync state after reconnect (SignalR: `withAutomaticReconnect`, then reload the data).
- **HTTP/2 GOAWAY:** the server tells the client "finish what is in flight, open new requests on a new connection". It makes HTTP/2 deploys smooth.
- **Pinned keep-alive connections:** after a scale-out, new instances get little traffic until clients open new connections. `PooledConnectionLifetime` on the client side fixes it.

<a id="add-os-lab"></a>

## ➕ OS labs in .NET

Goal from the proof table: tell **CPU saturation** from **blocked I/O / thread starvation** from **memory pressure** by looking at a running program. Record what *you* see; do not copy numbers from anywhere.

### Tools

```powershell
dotnet tool install --global dotnet-counters
dotnet tool install --global dotnet-dump
dotnet tool install --global dotnet-stack
dotnet-counters ps                                  # list .NET processes and PIDs
dotnet-counters monitor -n OsLab --counters System.Runtime
```

In `System.Runtime`, watch: CPU usage, working set, GC heap size, **ThreadPool Thread Count**, **ThreadPool Queue Length**, and ThreadPool completed work items. Counter names differ slightly between .NET versions (verify). In Task Manager → Details, right-click the header → Select columns → add **Threads**, **Page faults** and **PF Delta**.

Create one console project for labs 1, 3, 4 and 5: `dotnet new console -n OsLab`. For each lab, replace `Program.cs` with that lab's code and run `dotnet run -c Release -- <argument>`.

### Lab 1: 1,000 threads vs 1,000 tasks

```csharp
using System.Diagnostics;

var mode = args.Length > 0 ? args[0] : "threads";
Console.WriteLine($"PID {Environment.ProcessId}, mode {mode}");
var sw = Stopwatch.StartNew();

if (mode == "threads")
{
    for (int i = 0; i < 1000; i++)
        new Thread(() => Thread.Sleep(Timeout.Infinite)) { IsBackground = true }.Start();
}
else if (mode == "tasks")
{
    for (int i = 0; i < 1000; i++)
        _ = Task.Delay(Timeout.Infinite);           // a timer, no thread while waiting
}
else if (mode == "blocking-tasks")
{
    for (int i = 0; i < 1000; i++)
        _ = Task.Run(() => Thread.Sleep(Timeout.Infinite));   // each task BLOCKS a pool thread
}

var p = Process.GetCurrentProcess();
for (int s = 0; s < 10; s++)
{
    p.Refresh();
    Console.WriteLine($"{sw.Elapsed.TotalSeconds,5:F1}s  OS threads={p.Threads.Count,5}  " +
                      $"working set={p.WorkingSet64 >> 20} MB  private={p.PrivateMemorySize64 >> 20} MB");
    Thread.Sleep(1000);
}
Console.ReadLine();
```

Run `threads`, then `tasks`, then `blocking-tasks`. Observe:

- `threads`: about 1,000 OS threads at once, and more memory. Each thread reserves a stack; only the touched part uses RAM, so memory grows less than "1,000 × stack size".
- `tasks`: only a few threads. A waiting task is a small object on the heap.
- `blocking-tasks`: the thread count **grows slowly**, second by second. The pool adds threads gradually when work is blocked. This is what starvation looks like, and the bridge to Lab 2.

### Lab 2: thread-pool starvation with sync-over-async

Web app (`dotnet new web -n StarveApi`), `Program.cs`:

```csharp
var app = WebApplication.CreateBuilder(args).Build();
app.MapGet("/async", async () => { await Task.Delay(500); return "ok"; });
app.MapGet("/sync-over-async", () => { Task.Delay(500).Wait(); return "ok"; });  // BAD: blocks a pool thread
app.Run("http://localhost:5000");
```

Load client (`dotnet new console -n Load`):

```csharp
using System.Diagnostics;
var url = args[0]; var n = int.Parse(args[1]);
using var http = new HttpClient { Timeout = TimeSpan.FromMinutes(2) };
var sw = Stopwatch.StartNew();
await Task.WhenAll(Enumerable.Range(0, n).Select(_ => http.GetAsync(url)));
Console.WriteLine($"{n} requests in {sw.ElapsedMilliseconds} ms");
```

Steps:

1. Start the API (`dotnet run -c Release`) and in a second terminal `dotnet-counters monitor -n StarveApi --counters System.Runtime`.
2. `dotnet run -c Release -- http://localhost:5000/async 500`. Each request waits 500 ms, so the batch finishes in roughly that time plus overhead. Thread count stays low.
3. `dotnet run -c Release -- http://localhost:5000/sync-over-async 500`. Watch **ThreadPool Queue Length** jump and the thread count climb slowly. The total time is much longer, though each request "only" waits 500 ms.
4. While it is slow, run `dotnet-stack report -n StarveApi`: many threads are stuck in `Task.Wait`.

Explain: `.Wait()` and `.Result` hold a pool thread for the whole wait. When all pool threads are blocked, new work (including the continuations that would *unblock* them) waits in the queue. `ThreadPool.SetMinThreads` hides the symptom; the fix is `await` all the way down.

### Lab 3: CPU-bound vs I/O-bound

```csharp
if (args[0] == "cpu")
{
    // Busy work on every core for 20 seconds.
    Parallel.For(0, Environment.ProcessorCount, _ =>
    {
        var end = DateTime.UtcNow.AddSeconds(20); double x = 0;
        while (DateTime.UtcNow < end) x += Math.Sqrt(x + 1);
    });
}
else if (args[0] == "io")
{
    // 200 concurrent requests to the Lab 2 API; each waits 500 ms on the "server".
    using var http = new HttpClient();
    for (int round = 0; round < 20; round++)
        await Task.WhenAll(Enumerable.Range(0, 200).Select(_ => http.GetAsync("http://localhost:5000/async")));
}
```

Observe in Task Manager (Performance tab, CPU per core) and dotnet-counters:

| Program | CPU | Threads | Latency source |
|---|---|---|---|
| `cpu` | All cores near 100% | About one per core | Not enough CPU: more threads will **not** help |
| `io` | Low | Few | Waiting on network: more concurrency helps, more CPU will not |
| Lab 2 sync-over-async | Low | Growing | Blocked threads: starvation, not real work |

This table is your diagnosis method: high CPU → profile the hot code; low CPU + slow → find what everyone is waiting for (I/O, locks, the pool).

### Lab 4: deadlock with two locks

```csharp
var lockA = new object();
var lockB = new object();
var t1 = new Thread(() => { lock (lockA) { Thread.Sleep(100); lock (lockB) Console.WriteLine("t1 done"); } });
var t2 = new Thread(() => { lock (lockB) { Thread.Sleep(100); lock (lockA) Console.WriteLine("t2 done"); } });
t1.Start(); t2.Start();
bool ok = t1.Join(3000) & t2.Join(3000);
Console.WriteLine(ok ? "finished" : $"DEADLOCK. PID {Environment.ProcessId}. Press Enter to exit.");
Console.ReadLine();
```

Observe: CPU is about 0%. A deadlock **waits**; it does not spin. That is how you tell it from a livelock or a busy loop. Diagnose it:

```powershell
dotnet-dump collect -p <PID>
dotnet-dump analyze <dump file>
> syncblk          # which thread owns each lock, and how many waiters
> clrstack -all    # each thread's stack: both are inside Monitor.Enter
```

(Visual Studio: Debug → Break All → Parallel Stacks shows the same picture.) Fix: one global lock order (always A, then B), or `Monitor.TryEnter(lockB, timeout)` and back off. It is the same rule as the database deadlock lab in the SQL chapter.

### Lab 5: working set and page faults

```csharp
using System.Diagnostics;
var p = Process.GetCurrentProcess();
void Show(string label)
{
    p.Refresh();
    Console.WriteLine($"{label,-26} working set={p.WorkingSet64 >> 20} MB  private={p.PrivateMemorySize64 >> 20} MB");
}
Show("start");
var big = GC.AllocateUninitializedArray<byte>(1 << 30);   // 1 GB, not written yet
Show("after allocating 1 GB");
Console.ReadLine();
for (long i = 0; i < big.Length; i += 4096) big[i] = 1;  // touch one byte in every 4 KB page
Show("after touching every page");
Console.ReadLine();
```

Observe: *private* (committed) memory grows at allocation, but the *working set* (pages really in RAM) usually grows only when you touch the pages. Watch **PF Delta** jump during the touch loop: each first touch of a page is a page fault, and the OS maps a page then. These are soft faults (no disk read), so they are cheap. If your runtime writes to the memory at allocation, the jump comes earlier; explain what you saw. Linux: `ps -o rss,min_flt,maj_flt -p <PID>` shows minor and major (disk) faults.

Optional, memory pressure: run the program in a container with a limit, `docker run --memory=512m ...`. The process is killed (exit code 137, OOMKilled) when it goes over. That is the third symptom type: memory grows, the GC runs often, then the process dies.

<a id="add-os-concepts"></a>

## ➕ OS terms: one line each, plus an interview sentence

Q10–Q15 explain several of these in depth. Use this table for fast revision: cover the right two columns and say them aloud.

| Term | Meaning in one line | Interview-ready sentence |
|---|---|---|
| Process | A running program with its own address space, handles and at least one thread | "A process is the unit of isolation: if one crashes, others are safe." |
| Thread | A path of execution inside a process; has its own stack and registers | "Threads share the process memory, which makes them cheap to talk between and easy to break with races." |
| Address space | The range of virtual addresses a process can use | "Each process sees its own private address space; the OS maps it to physical RAM." |
| Stack vs heap | Stack: per-thread, last-in-first-out frames for calls. Heap: shared memory for objects with a dynamic lifetime | "The stack is fast and freed automatically when a method returns; the heap needs a GC or manual freeing." |
| Context switch | The CPU stops one thread and starts another, saving and restoring state | "The direct cost is small; the real cost is cold caches and TLB afterwards, so too many threads slow you down." |
| Scheduler | The OS part that decides which ready thread runs on which core, and for how long | "The OS scheduler is preemptive; the .NET thread pool is a second scheduler on top of it." |
| System call | A request from a program to the kernel (read a file, open a socket) | "A syscall switches from user mode to kernel mode, so chatty code that makes many small syscalls is slow." |
| User / kernel mode | CPU privilege levels: apps run restricted, the kernel has full access | "User mode protects the system from app bugs; only the kernel touches hardware directly." |
| Virtual memory | Each process uses virtual addresses that the OS maps to physical pages | "Virtual memory gives isolation and lets the OS load pages lazily or move them to disk." |
| Page | The fixed unit of memory mapping, usually 4 KB | "Memory is managed in pages, so touching one byte brings in a whole page." |
| Page fault | Access to a page that is not mapped in RAM yet, handled by the OS | "Soft faults are normal and cheap; hard faults need a disk read, and many of them mean thrashing." |
| TLB | A CPU cache of recent virtual-to-physical address translations | "A TLB miss costs a page-table walk; that is one reason context switches and huge random memory access are slow." |
| File descriptor / handle | A small number or reference the kernel gives you for an open file, socket or pipe | "Sockets are handles too, so leaking connections can hit the per-process handle limit." |
| Blocking vs non-blocking I/O | Blocking: the thread sleeps until data is ready. Non-blocking: the call returns at once and you are told later | "Blocking I/O costs a thread per wait; non-blocking I/O lets a few threads serve thousands of connections." |
| epoll / IOCP | OS mechanisms that tell a program which of many sockets are ready (epoll, Linux) or which I/O has completed (IOCP, Windows) | "async/await in .NET sits on IOCP on Windows and epoll on Linux, so waiting needs no thread." |
| Mutex | A lock with an owner: one holder at a time, only the owner releases | "A mutex protects a critical section; in C# `lock` is the in-process version." |
| Semaphore | A counter that allows up to N holders, no owner | "I use `SemaphoreSlim` to limit concurrency, for example 10 parallel calls to a slow API." |
| Spinlock | A lock that busy-waits in a loop instead of sleeping | "Spin only for very short waits on a multi-core machine; otherwise you burn CPU." |
| Condition variable | Lets a thread sleep until another thread signals that a condition may be true | "Always re-check the condition in a loop after waking up; wake-ups can be spurious." |
| Deadlock | Threads wait for each other in a cycle and none can continue | "It needs all four conditions: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break one, usually circular wait with a fixed lock order." |
| Starvation | A thread or task never gets the resource it needs, while others do | "Thread-pool starvation is when all pool threads are blocked, so even ready work waits in the queue." |
| Livelock | Threads keep reacting to each other and changing state, but make no progress | "Unlike a deadlock, the CPU is busy; random backoff (jitter) breaks it." |
| Priority inversion | A high-priority thread waits for a lock held by a low-priority thread, which a medium-priority thread keeps preempting | "The fix is priority inheritance: the lock holder temporarily gets the waiter's priority." |
