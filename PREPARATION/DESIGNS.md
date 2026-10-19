# Every system design and low-level design in one list

[Start here](README.md) · [The plan](PLAN.md) · [How to answer a design round](NOTES/08_SYSTEM_DESIGN.md#add-sd-template) · [How to answer an LLD round](NOTES/07_LLD_OOP_PATTERNS.md#add-lld-method)

41 system designs (HLD) and 49 low-level designs (LLD) — every design named in any old plan, the foundation prompts and the CodeWithNishchal lists (originals in [ARCHIVE/originals/](ARCHIVE/originals/)). Each card is a starting point, not an answer to memorise: close it and design from a blank page, then compare.

Source codes: A = August plan (SD1–18, LLD1–6) · B = October FAANG plan · C = 12 Oct guide anchors · Q = foundation prompts · N = CodeWithNishchal problem lists (old `tmp/`) · M = Q&A files.

## System designs (HLD)

| Design | Scheduled | Sources |
|---|---|---|
| [URL shortener (TinyURL)](#hld-url-shortener) | [Day 20](WEEKS/WEEK_03.md#day-20), [Day 27](WEEKS/WEEK_04.md#day-27), [Day 34](WEEKS/WEEK_05.md#day-34), [Day 55](WEEKS/WEEK_08.md#day-55), [Day 202](WEEKS/WEEK_29.md#day-202) | A:SD1 B:HLD1 C:1 Q:05-001 N:01 M:M3-Q34 |
| [Pastebin](#hld-pastebin) | [Day 117](WEEKS/WEEK_17.md#day-117) | N:28 |
| [Distributed rate limiter](#hld-rate-limiter) | [Day 69](WEEKS/WEEK_10.md#day-69), [Day 202](WEEKS/WEEK_29.md#day-202) | A:SD2 B:HLD2 C:3 Q:05-005 N:03 M:M3-Q35,M5-Q10 |
| [Notification service (email/SMS/push)](#hld-notification) | [Day 83](WEEKS/WEEK_12.md#day-83), [Day 146](WEEKS/WEEK_21.md#day-146), [Day 202](WEEKS/WEEK_29.md#day-202) | A:SD3 C:2 Q:05-004 N:08 M:M3-Q36 |
| [Distributed job scheduler / task queue (your project)](#hld-job-platform) | [Day 76](WEEKS/WEEK_11.md#day-76), [Day 167](WEEKS/WEEK_24.md#day-167), [Day 216](WEEKS/WEEK_31.md#day-216) | A:SD4 C:4 Q:05-019,05-025 N:06 |
| [File storage and sync (Dropbox / Google Drive)](#hld-dropbox) | [Day 195](WEEKS/WEEK_28.md#day-195) | A:SD5 C:8 Q:05-007 N:27 M:M5-Q9 |
| [News feed (Facebook / Twitter timeline)](#hld-news-feed) | [Day 125](WEEKS/WEEK_18.md#day-125), [Day 209](WEEKS/WEEK_30.md#day-209) | A:SD6 B:HLD5 C:6 Q:05-002 N:11,12 M:M5-Q5 |
| [E-commerce checkout, orders and inventory (Amazon)](#hld-ecommerce) | [Day 139](WEEKS/WEEK_20.md#day-139) | A:SD7 Q:05-013,05-014 N:31 M:M5-Q6 |
| [Payment system / wallet (PhonePe)](#hld-payment) | [Day 139](WEEKS/WEEK_20.md#day-139), [Day 216](WEEKS/WEEK_31.md#day-216) | A:SD8 Q:05-012 N:32 M:M5-Q7 |
| [Chat and messaging (WhatsApp / Slack)](#hld-chat) | [Day 118](WEEKS/WEEK_17.md#day-118), [Day 209](WEEKS/WEEK_30.md#day-209) | A:SD9 B:HLD4 C:5 Q:05-003 N:09,10 M:M5-Q8 |
| [Web crawler](#hld-web-crawler) | [Day 143](WEEKS/WEEK_21.md#day-143) | A:SD10 Q:05-015 N:02 |
| [Video upload and streaming (YouTube)](#hld-youtube) | [Day 150](WEEKS/WEEK_22.md#day-150), [Day 199](WEEKS/WEEK_29.md#day-199) | A:SD11 B:HLD6 Q:05-008,05-022 N:17 |
| [Search autocomplete / typeahead](#hld-typeahead) | [Day 150](WEEKS/WEEK_22.md#day-150), [Day 199](WEEKS/WEEK_29.md#day-199) | A:SD12 C:9 Q:05-016 N:29 |
| [Collaborative editor (Google Docs)](#hld-google-docs) | [Day 164](WEEKS/WEEK_24.md#day-164) | A:SD13 Q:05-021 |
| [Distributed cache (Redis-like)](#hld-distributed-cache) | [Day 165](WEEKS/WEEK_24.md#day-165) | A:SD14 B:HLD8 Q:05-006 N:04 |
| [Ad-click aggregation (stream processing)](#hld-ad-click-aggregation) | [Day 174](WEEKS/WEEK_25.md#day-174) | A:SD15 C:10 |
| [Metrics and monitoring system](#hld-metrics-monitoring) | [Day 181](WEEKS/WEEK_26.md#day-181) | A:SD16 C:10 Q:05-017 N:07 M:M7-Q18 |
| [Proximity / nearby search (Yelp, Google Maps nearby)](#hld-proximity) | [Day 188](WEEKS/WEEK_27.md#day-188), [Day 199](WEEKS/WEEK_29.md#day-199) | A:SD17 C:11 Q:05-024 N:22 M:M7-Q20 |
| [Object storage (S3-like)](#hld-object-storage) | [Day 195](WEEKS/WEEK_28.md#day-195) | A:SD18 M:M7-Q21 |
| [Ride sharing and matching (Uber)](#hld-uber) | [Day 188](WEEKS/WEEK_27.md#day-188) | B:HLD7 C:11 Q:05-009,05-028 N:20 |
| [Hotel booking (Booking.com)](#hld-hotel-booking) | [Day 132](WEEKS/WEEK_19.md#day-132), [Day 216](WEEKS/WEEK_31.md#day-216) | B:HLD8 C:7 N:23 |
| [Movie / event ticket booking (BookMyShow)](#hld-ticket-booking) | [Day 132](WEEKS/WEEK_19.md#day-132) | C:7 Q:05-011 N:25 |
| [Flight booking](#hld-flight-booking) | [Day 119](WEEKS/WEEK_17.md#day-119) | N:24 |
| [Restaurant reservation](#hld-restaurant-reservation) | [Day 124](WEEKS/WEEK_18.md#day-124) | N:26 |
| [Food delivery (Swiggy / Zomato)](#hld-food-delivery) | [Day 126](WEEKS/WEEK_18.md#day-126) | Q:05-010 N:21 |
| [Logging pipeline](#hld-logging-pipeline) | [Day 131](WEEKS/WEEK_19.md#day-131) | Q:05-018 N:07 |
| [Email delivery service](#hld-email-delivery) | [Day 133](WEEKS/WEEK_19.md#day-133) | Q:05-020 |
| [Photo sharing (Instagram)](#hld-instagram) | [Day 138](WEEKS/WEEK_20.md#day-138) | Q:05-023 N:13 |
| [Short-video feed (TikTok)](#hld-tiktok) | [Day 140](WEEKS/WEEK_20.md#day-140) | N:14 |
| [Pinterest](#hld-pinterest) | [Day 145](WEEKS/WEEK_21.md#day-145) | N:15 |
| [Community discussion and voting (Reddit)](#hld-reddit) | [Day 147](WEEKS/WEEK_21.md#day-147) | N:16 |
| [Video-on-demand streaming (Netflix)](#hld-netflix) | [Day 152](WEEKS/WEEK_22.md#day-152) | N:18 |
| [Music streaming (Spotify)](#hld-spotify) | [Day 154](WEEKS/WEEK_22.md#day-154) | N:19 |
| [Trending topics / top-K heavy hitters](#hld-trending-topics) | [Day 159](WEEKS/WEEK_23.md#day-159) | N:30 |
| [Content delivery network (CDN)](#hld-cdn) | [Day 161](WEEKS/WEEK_23.md#day-161) | N:05 |
| [Ad serving](#hld-ad-serving) | [Day 166](WEEKS/WEEK_24.md#day-166) | Q:05-026 |
| [Recommendation system](#hld-recommendations) | [Day 168](WEEKS/WEEK_24.md#day-168) | Q:05-027 |
| [Real-time leaderboard](#hld-leaderboard) | [Day 173](WEEKS/WEEK_25.md#day-173) | Q:05-029 |
| [Multi-region evolution of an earlier design](#hld-multi-region) | [Day 181](WEEKS/WEEK_26.md#day-181) | C:12 Q:05-030 M:M7-Q15 |
| [Distributed unique ID generator (Snowflake)](#hld-id-generator) | [Day 175](WEEKS/WEEK_25.md#day-175) | N:LLD42 |
| [Package tracking (Amazon-style OA sketch)](#hld-package-tracking) | [Day 158](WEEKS/WEEK_23.md#day-158) | A:week 23 |

## Low-level designs (LLD)

| Design | Scheduled | Sources |
|---|---|---|
| [Logging framework](#lld-logger) | [Day 41](WEEKS/WEEK_06.md#day-41), [Day 42](WEEKS/WEEK_06.md#day-42) | A:LLD2 B C Q:09-011 N:33 M:M4-Q25 |
| [Parking lot](#lld-parking-lot) | [Day 48](WEEKS/WEEK_07.md#day-48), [Day 55](WEEKS/WEEK_08.md#day-55), [Day 153](WEEKS/WEEK_22.md#day-153) | A:LLD1 B C Q:09-001 N:01 M:M4-Q24 |
| [LRU / LFU cache](#lld-lru-cache) | [Day 62](WEEKS/WEEK_09.md#day-62) | B C Q:09-013 N:31 |
| [Rate limiter / API throttling with a controllable clock](#lld-rate-limiter-lld) | [Day 97](WEEKS/WEEK_14.md#day-97), [Day 153](WEEKS/WEEK_22.md#day-153) | A:LLD4 B C Q:09-012 N:32,39 |
| [Split-expense service (Splitwise)](#lld-splitwise) | [Day 90](WEEKS/WEEK_13.md#day-90) | A:LLD5 B C N:11 |
| [Elevator system](#lld-elevator) | [Day 104](WEEKS/WEEK_15.md#day-104) | A:LLD3 B Q:09-002 N:05 |
| [Seat reservation with seat locking (BookMyShow)](#lld-seat-reservation) | [Day 111](WEEKS/WEEK_16.md#day-111) | B C Q:09-007 N:18,19 |
| [Task scheduler](#lld-task-scheduler) | [Day 149](WEEKS/WEEK_22.md#day-149) | A:LLD6 Q:09-014 N:37 |
| [Vending machine (state pattern)](#lld-vending-machine) | [Day 142](WEEKS/WEEK_21.md#day-142) | Q:09-004 N:02 |
| [ATM](#lld-atm) | [Day 156](WEEKS/WEEK_23.md#day-156) | Q:09-003 N:03 |
| [Tic-tac-toe](#lld-tic-tac-toe) | [Day 180](WEEKS/WEEK_26.md#day-180) | B N:09 |
| [Chess](#lld-chess) | [Day 182](WEEKS/WEEK_26.md#day-182) | B Q:09-008 N:10 |
| [Snake and ladder](#lld-snake-ladder) | [Day 187](WEEKS/WEEK_27.md#day-187) | Q:09-009 N:08 |
| [Library management system](#lld-library) | [Day 157](WEEKS/WEEK_23.md#day-157) | Q:09-005 N:04 |
| [Hotel booking](#lld-hotel-booking-lld) | [Day 189](WEEKS/WEEK_27.md#day-189) | Q:09-006 N:22 |
| [Notification system](#lld-notification-lld) | [Day 194](WEEKS/WEEK_28.md#day-194) | Q:09-010 N:34 |
| [Pub/sub message broker (in-memory)](#lld-pub-sub) | [Day 196](WEEKS/WEEK_28.md#day-196) | Q:09-015 |
| [In-memory file system](#lld-file-system) | [Day 201](WEEKS/WEEK_29.md#day-201) | Q:09-016 N:36 |
| [Food delivery app](#lld-food-delivery-lld) | [Day 203](WEEKS/WEEK_29.md#day-203) | Q:09-017 N:21 |
| [Traffic light controller](#lld-traffic-light) | [Day 208](WEEKS/WEEK_30.md#day-208) | N:06 |
| [Meeting room scheduler](#lld-meeting-scheduler) | [Day 210](WEEKS/WEEK_30.md#day-210) | N:07 |
| [Chat application](#lld-chat-lld) | [Day 215](WEEKS/WEEK_31.md#day-215) | N:12 |
| [Community discussion platform (Reddit-like)](#lld-reddit-lld) | [Day 217](WEEKS/WEEK_31.md#day-217) | N:13 |
| [LinkedIn (connections, feed)](#lld-linkedin-lld) | [Day 222](WEEKS/WEEK_32.md#day-222) | N:14 |
| [Calendar application](#lld-calendar) | [Day 224](WEEKS/WEEK_32.md#day-224) | N:15 |
| [Online voting system](#lld-voting) | [Day 117](WEEKS/WEEK_17.md#day-117) | N:16 |
| [URL shortener](#lld-url-shortener-lld) | [Day 119](WEEKS/WEEK_17.md#day-119) | N:17 |
| [Ride sharing (Uber)](#lld-uber-lld) | [Day 124](WEEKS/WEEK_18.md#day-124) | N:20 |
| [Airline management system](#lld-airline) | [Day 126](WEEKS/WEEK_18.md#day-126) | N:23 |
| [Restaurant management system](#lld-restaurant) | [Day 131](WEEKS/WEEK_19.md#day-131) | N:24 |
| [Car rental system](#lld-car-rental) | [Day 133](WEEKS/WEEK_19.md#day-133) | N:25 |
| [Amazon order management](#lld-order-management) | [Day 138](WEEKS/WEEK_20.md#day-138) | N:26 |
| [Live cricket score (CricBuzz)](#lld-cricbuzz) | [Day 140](WEEKS/WEEK_20.md#day-140) | N:27 |
| [Caller ID (Truecaller)](#lld-truecaller) | [Day 145](WEEKS/WEEK_21.md#day-145) | N:28 |
| [Stock exchange order matching](#lld-stock-exchange) | [Day 147](WEEKS/WEEK_21.md#day-147) | N:29 |
| [Learning management system](#lld-lms) | [Day 152](WEEKS/WEEK_22.md#day-152) | N:30 |
| [Payment system](#lld-payment-lld) | [Day 154](WEEKS/WEEK_22.md#day-154) | N:35 |
| [Search autocomplete (trie service)](#lld-autocomplete-lld) | [Day 159](WEEKS/WEEK_23.md#day-159) | N:38 |
| [Inventory management](#lld-inventory) | [Day 161](WEEKS/WEEK_23.md#day-161) | N:40 |
| [Feature flag system](#lld-feature-flags) | [Day 166](WEEKS/WEEK_24.md#day-166) | N:41 |
| [Distributed ID generator (Snowflake)](#lld-snowflake-id) | [Day 168](WEEKS/WEEK_24.md#day-168) | N:42 |
| [Circuit breaker](#lld-circuit-breaker) | [Day 173](WEEKS/WEEK_25.md#day-173) | N:43 |
| [Retry with backoff](#lld-retry-backoff) | [Day 175](WEEKS/WEEK_25.md#day-175) | N:44 |
| [Metrics and monitoring](#lld-metrics-lld) | [Day 180](WEEKS/WEEK_26.md#day-180) | N:45 |
| [Authentication system](#lld-auth-system) | [Day 182](WEEKS/WEEK_26.md#day-182) | N:46 |
| [Role-based access control (RBAC)](#lld-rbac) | [Day 187](WEEKS/WEEK_27.md#day-187) | N:47 |
| [Web crawler](#lld-web-crawler-lld) | [Day 189](WEEKS/WEEK_27.md#day-189) | N:48 |
| [Recommendation engine](#lld-recommendation-lld) | [Day 194](WEEKS/WEEK_28.md#day-194) | N:49 |
| [Event-driven producer-consumer](#lld-producer-consumer) | [Day 196](WEEKS/WEEK_28.md#day-196) | N:50 |

## HLD cards

<a id="hld-url-shortener"></a>

### URL shortener (TinyURL)

**Goal:** Turn a long URL into a short code, and redirect anyone who opens the short link to the long URL quickly.

**Functional:**
- Create a short link for a long URL (optional custom alias).
- Redirect a short code to the long URL.
- Optional expiry time and delete.
- Basic click count per link.

**Non functional:**
- Read-heavy: redirects far outnumber creates.
- Redirect latency low (tens of ms).
- High availability on the redirect path.
- Codes must be unique; a mapping never changes after creation.

**Estimates:** Assume 100M new links per month and a 100:1 read/write ratio. Writes: 100M / (30 x 86,400) is about 40 per second; reads about 4,000 per second on average, more at peak. Storage: assume 500 bytes per row x 100M x 12 x 5 years, about 3 TB before indexes and replicas. 7 base62 characters give 62^7, about 3.5 trillion codes, which is enough.

**Api:**
- POST /urls {longUrl, alias?, expiresAt?} -> {shortCode}
- GET /{code} -> 301 or 302 redirect
- DELETE /urls/{code}
- GET /urls/{code}/stats

**Data:** Table links(code PK, long_url, owner_id, created_at, expires_at). A key-value store or a sharded relational DB both work because every lookup is by primary key.

**Architecture:** Clients call stateless API servers behind a load balancer. On create, the server gets a unique ID from an ID service (counter ranges or Snowflake), base62-encodes it, and stores the row. On redirect, the server reads from Redis first, then the DB, and returns the redirect. Click events go to a queue for async counting.

**Hard parts:**
- Unique code generation: give each server a block of counter IDs, or hash plus collision retry with a unique constraint.
- Hot links: cache aggressively; mappings are immutable so invalidation is only needed on delete or expiry.
- Abuse: rate-limit creates and scan for malicious URLs.

**Tradeoffs:**
- 301 is cached by browsers (fast, fewer hits) but you lose click analytics; 302 counts every click but costs a round trip.
- Sequential IDs are dense and unique but guessable; hashed or shuffled IDs hide order but need collision handling.

**Follow ups:**
- How do you support custom aliases without collisions?
- How do you delete expired links?
- How would you count clicks at very high scale?

<a id="hld-pastebin"></a>

### Pastebin

**Goal:** Let users store a block of text and share it through a unique, hard-to-guess link that others can read.

**Functional:**
- Create a paste and get a unique URL.
- Read a paste by its URL.
- Optional expiry and visibility (public or unlisted).
- Delete a paste (owner only).

**Non functional:**
- Read-heavy, with low read latency.
- Pastes are durable until expiry.
- Highly available reads.
- Size limit per paste (assume 1 MB) to control cost.

**Estimates:** Assume 1M new pastes per day and 10 reads per paste. Writes are about 12 per second, reads about 120 per second on average. Assume an average size of 10 KB: 1M x 10 KB = 10 GB per day, about 3.6 TB per year before replication.

**Api:**
- POST /pastes {content, expiresAt?, visibility} -> {id, url}
- GET /pastes/{id}
- DELETE /pastes/{id}

**Data:** Metadata table (id, owner, size, created_at, expires_at, blob_key) in a relational or key-value DB. The text body goes to object storage because it can be large and is read as a whole.

**Architecture:** API servers write the body to object storage, then write the metadata row. Reads check a cache, then metadata, then fetch the body from object storage or a CDN. A background job deletes expired pastes and their blobs.

**Hard parts:**
- Unguessable IDs: use random IDs with enough entropy, not sequential counters.
- Large content: keep blobs out of the DB and serve through a CDN.
- Expiry cleanup: a lazy check on read plus a periodic sweeper.

**Tradeoffs:**
- Body in DB (simple, one write) versus object storage (cheaper, scales better, two writes).
- Eager deletion at expiry versus lazy deletion on read plus a sweeper.

**Follow ups:**
- How do you stop someone writing a metadata row without a blob, or a blob without metadata?
- How do you handle a paste that goes viral?
- How would you add syntax highlighting or private pastes?

<a id="hld-rate-limiter"></a>

### Distributed rate limiter

**Goal:** Limit how many requests a client (user, API key, IP or tenant) can make in a time period, across all API instances.

**Functional:**
- Configure limits per key and per endpoint.
- Allow or reject each request quickly.
- Return 429 with a Retry-After header on rejection.
- Support different tiers per tenant.

**Non functional:**
- Very low added latency (about 1 ms).
- Limits are global, not per instance.
- Highly available; decide fail-open or fail-closed if the store is down.
- Approximate accuracy is acceptable.

**Estimates:** Assume 1M active keys and 50,000 checks per second at peak. Token bucket state is about two numbers per key, so assume around 100 bytes per key with overhead: 1M x 100 B = 100 MB, which fits in one Redis node. Throughput, not memory, decides the shard count.

**Api:**
- Internal: Allow(key, cost) -> {allowed, remaining, retryAfter}
- Admin: PUT /limits/{tenant} {rate, burst}
- Response headers: X-RateLimit-Remaining, Retry-After

**Data:** Per-key state (tokens, last_refill) in Redis with a TTL. Limit rules live in a config DB and are cached in each gateway.

**Architecture:** The limiter runs as middleware in the API gateway. For each request it builds the key, runs one atomic Redis Lua script that refills and takes a token, and either forwards the request or returns 429. Rules are loaded from config and refreshed in the background.

**Hard parts:**
- Atomic check-and-decrement across instances: a Lua script or Redis Function, using Redis TIME to avoid client clock skew. INCR plus EXPIRE alone is only a fixed window.
- Hot keys: shard keys across Redis nodes; for very large tenants, use a local token pre-allocation with periodic sync.
- Redis outage: fail open with a local per-instance fallback limit, or fail closed for sensitive endpoints.

**Tradeoffs:**
- Token bucket allows bursts and is cheap; sliding window log is exact but stores every timestamp.
- Central Redis check (accurate, one network hop) versus local counters with sync (fast, less accurate).

**Follow ups:**
- What happens if Redis goes down?
- How do you limit per tenant and per user at the same time?
- Why is the built-in ASP.NET Core rate limiter not enough with many replicas?

<a id="hld-notification"></a>

### Notification service (email/SMS/push)

**Goal:** Send notifications to users over email, SMS and push, following their preferences, reliably and without duplicates.

**Functional:**
- Accept a send request from internal services (single or bulk).
- Apply user preferences, opt-outs and quiet hours.
- Render templates per language.
- Send through providers and track delivery status.
- Support scheduled sends.

**Non functional:**
- At-least-once delivery with deduplication.
- Channel isolation: a slow SMS provider must not delay push.
- Soft real time for urgent messages (seconds).
- Horizontally scalable for bursts.

**Estimates:** Assume 50M notifications per day, mostly push. Average is about 600 per second; assume a 5x peak, so 3,000 per second. Each provider has its own rate limit, so size workers per channel from the provider limit, not from the total.

**Api:**
- POST /notifications {userId, templateId, params, channels?, idempotencyKey}
- POST /notifications/bulk {segmentId, templateId}
- GET /notifications/{id}/status
- Provider webhook: POST /callbacks/{provider}

**Data:** Notification and delivery-attempt records in a relational DB or wide-column store (high write volume). Preferences and templates in a relational DB, cached. Dedup keys in Redis with a TTL plus a unique constraint.

**Architecture:** The API validates the request, stores it with its idempotency key, and publishes to a router. The router checks preferences, renders the template and puts one message on a separate queue per channel. Channel workers call providers with retries and backoff, record attempt status, and send failed messages to a per-channel DLQ.

**Hard parts:**
- Duplicates: an idempotency key per request and per channel; a retry must not send twice.
- Provider failure: retries with backoff, circuit breaker, and failover to a second provider.
- Bulk fan-out: expand large segments in batches and rate-limit so bulk does not starve urgent messages.

**Tradeoffs:**
- Provider accepted is not the same as user received; track both.
- One shared queue is simpler, but queues per channel isolate failures.

**Follow ups:**
- How do you prevent a double send after a worker crash?
- How do you handle quiet hours across time zones?
- How do you prioritise an OTP over a marketing message?

<a id="hld-job-platform"></a>

### Distributed job scheduler / task queue (your project)

**Goal:** Accept jobs from many tenants, run them reliably on a pool of workers, retry failures safely, and make each job's result take effect once, with fairness between tenants.

**Functional:**
- Submit a job (now or scheduled) with an idempotency key.
- Run jobs on workers; report status and result.
- Retry failed jobs with backoff and jitter; move poison jobs to a DLQ.
- Replay jobs from the DLQ after a fix.
- Cancel a job and query its status.

**Non functional:**
- No accepted job is lost (durable on submit).
- Each job's effect is applied once even with at-least-once delivery.
- Tenant fairness and isolation: one noisy tenant cannot starve others.
- Horizontal scaling of workers; recovery from worker crashes.

**Estimates:** Assume 200 tenants and 5M jobs per day, about 60 per second on average, 10x at peak. Assume an average job runs 2 seconds: by Little's law, 600 jobs per second x 2 s = 1,200 concurrent jobs at peak, so about 150 workers with 8 slots each, plus headroom.

**Api:**
- POST /jobs {tenantId, type, payload, runAt?, idempotencyKey} -> {jobId}
- GET /jobs/{id}
- POST /jobs/{id}/cancel
- POST /dlq/{id}/replay

**Data:** PostgreSQL is the source of truth: jobs (id, tenant, state, attempts, next_run_at, lease_owner, lease_until), job_results, outbox, and processed_jobs (dedup). PostgreSQL gives transactions, so the job state, outbox row and dedup record can change atomically.

**Architecture:** The API inserts the job and an outbox row in one PostgreSQL transaction. A relay reads the outbox and publishes to RabbitMQ. Workers consume, take a lease on the job row, send heartbeats to extend it, run the job, then commit the result and the dedup record in one transaction before acking. A scheduler re-queues jobs whose lease expired or whose retry time arrived; after max attempts the job goes to the DLQ for replay.

**Hard parts:**
- Exactly-once effect: delivery is at-least-once, so commit a dedup record (job id) in the same transaction as the result; a duplicate finds it and skips. External side effects still need downstream idempotency keys.
- Worker crash: lease plus heartbeat; on expiry another worker takes the job, and a fencing token or lease version stops the old worker from committing.
- Tenant fairness: per-tenant queues or quotas with weighted round-robin, and per-tenant concurrency limits so one tenant cannot fill all workers.

**Tradeoffs:**
- Outbox plus relay adds latency and a component, but avoids lost or phantom events from dual writes.
- Short lease means fast recovery but more false expiries on slow jobs; long lease means slow recovery.

**Follow ups:**
- What happens if a worker crashes after the external call but before commit?
- How do you stop one tenant submitting 1M jobs from hurting others?
- How do you replay the DLQ safely after a bug fix?

<a id="hld-dropbox"></a>

### File storage and sync (Dropbox / Google Drive)

**Goal:** Let users upload, store and sync files across devices, share them, and keep old versions.

**Functional:**
- Upload and download files, with resume for large files.
- Sync changes to all of a user's devices.
- Share files and folders with permissions.
- Keep file versions and resolve edit conflicts.

**Non functional:**
- Durability is the top priority: never lose a file.
- Efficient sync: transfer only changed chunks.
- High availability for metadata.
- Strong consistency for metadata per user or folder.

**Estimates:** Assume 50M users, 10 GB each on average, so 500 PB logical before deduplication and replication. Assume 2 changes per user per day: 100M metadata writes per day, about 1,200 per second. Bandwidth, not request count, is the main cost.

**Api:**
- POST /files/upload-session -> {sessionId, chunkUrls}
- PUT chunk to a pre-signed URL; POST /files/commit {sessionId, chunkHashes}
- GET /files/{id}/download
- GET /changes?cursor= (long poll or push)

**Data:** Blob chunks in object storage keyed by content hash. Metadata (files, versions, chunk lists, folders, shares) in a sharded relational DB, sharded by user or namespace, because it needs transactions.

**Architecture:** The client splits a file into chunks and hashes them. It asks the metadata service which chunks are missing, uploads only those to object storage through pre-signed URLs, then commits a new file version. The notification service tells the user's other devices, which fetch the change log from their cursor and download new chunks.

**Hard parts:**
- Chunking and dedup: store chunks by hash so identical chunks are stored once; content-defined chunking handles inserts near the start of a file.
- Conflicts: two devices edit the same version; keep both and create a conflicted copy.
- Upload consistency: commit metadata only after all chunks exist; a GC job removes orphan chunks.

**Tradeoffs:**
- Fixed-size chunks (cheap CPU) versus content-defined chunks (better dedup after edits).
- Push notifications to devices (fast, more connections) versus polling (simple, slower).

**Follow ups:**
- How does resumable upload work?
- How do you garbage-collect chunks safely?
- How do you handle permission revocation?

<a id="hld-news-feed"></a>

### News feed (Facebook / Twitter timeline)

**Goal:** Show each user a timeline of recent posts from the people they follow, fast, with cursor pagination.

**Functional:**
- Create a post.
- Follow and unfollow users.
- Read the home feed with pagination.
- Optional ranking instead of pure time order.

**Non functional:**
- Feed read latency low (assume under 200 ms).
- Read-heavy.
- Eventual consistency is fine: a post can appear a few seconds late.
- Highly available.

**Estimates:** Assume 300M DAU, each reads the feed 10 times and posts 0.5 times per day. Reads: 3B / 86,400 is about 35,000 per second. Posts: about 1,700 per second. Assume an average of 200 followers: fan-out on write is about 350,000 feed inserts per second, which shows why celebrities need special handling.

**Api:**
- POST /posts {text, mediaIds}
- GET /feed?cursor=&limit=
- POST /follow/{userId}
- DELETE /follow/{userId}

**Data:** Posts in a sharded store keyed by post id. Follow graph in a sharded DB (follower and followee tables). Precomputed feeds as lists of post ids in Redis per user, trimmed to the latest few hundred.

**Architecture:** A post is saved, then an event goes to a fan-out service. For normal authors, workers push the post id into each follower's cached feed. On read, the feed service takes the cached ids, merges in recent posts from followed celebrities, hydrates post details from the post cache, and returns a page with a cursor.

**Hard parts:**
- Celebrity problem: hybrid; fan-out on write for normal users, fan-out on read for authors with very many followers.
- Hot posts: cache post objects and counters; batch counter updates.
- Deletes and privacy: remove from caches lazily on read and filter blocked or deleted posts at hydration.

**Tradeoffs:**
- Fan-out on write (fast reads, heavy writes) versus fan-out on read (cheap writes, slow reads).
- Chronological (simple, predictable) versus ranked feed (more engagement, needs an ML pipeline).

**Follow ups:**
- What if one user has 10M followers?
- How do you handle a user who has not logged in for months?
- How does cursor pagination stay stable while new posts arrive?

<a id="hld-ecommerce"></a>

### E-commerce checkout, orders and inventory (Amazon)

**Goal:** Let customers browse products, check out a cart, pay, and receive an order, without overselling stock.

**Functional:**
- Browse and search products; manage a cart.
- Checkout: validate prices, reserve stock, take payment.
- Create and track orders.
- Cancel and refund.

**Non functional:**
- No overselling: inventory must be strongly consistent.
- Checkout must be idempotent; a retry must not create two orders.
- Browse is read-heavy and can be eventually consistent.
- High availability, especially during sales.

**Estimates:** Assume 10M orders per day, about 120 per second on average and 10x at peak sales. Browse traffic is assumed 100x orders, so reads dominate and need caching. Assume 2 KB per order: 20 GB per day of order data.

**Api:**
- POST /cart/items
- POST /checkout {cartId, idempotencyKey} -> {orderId, paymentUrl}
- GET /orders/{id}
- POST /orders/{id}/cancel

**Data:** Catalog in a document store plus a search index. Inventory and orders in a relational DB, because they need transactions and conditional updates. Cart in Redis or a key-value store.

**Architecture:** Checkout creates an order in PENDING state and reserves stock with a conditional update (available >= qty). It then calls the payment service. On payment success the order becomes CONFIRMED and the reservation becomes a sale; on failure or timeout the reservation is released. Steps run as a saga, with events published through an outbox.

**Hard parts:**
- Overselling: atomic conditional decrement or reservation rows with expiry; a sweeper releases expired holds.
- Payment after reservation expired: compensate (refund or re-reserve).
- Flash sales: queue or token-gate checkouts and pre-split hot stock into buckets.

**Tradeoffs:**
- Reserve at add-to-cart (good user experience, ties up stock) versus at checkout (more stock available, rare late failures).
- Saga with compensations versus a distributed transaction (2PC): sagas are more available but only eventually consistent.

**Follow ups:**
- What if payment succeeds but the order service crashes?
- How do you handle a price change during checkout?
- How do you scale inventory for a flash sale on one item?

<a id="hld-payment"></a>

### Payment system / wallet (PhonePe)

**Goal:** Move money correctly: charge users, credit wallets and merchants, and never charge twice or lose a transaction.

**Functional:**
- Create a payment and charge through a payment provider.
- Wallet top-up, transfer and balance query.
- Refunds.
- Handle provider webhooks and daily reconciliation.

**Non functional:**
- Correctness over latency: no double charge, no lost money.
- Strong consistency for balances and the ledger.
- Full audit trail (immutable).
- High availability, with security and compliance (PCI).

**Estimates:** Assume 20M transactions per day, about 230 per second on average and assume 5x at peak. Each transaction writes about 3 ledger rows (double-entry plus fees). The dataset is moderate; the hard part is correctness, not size.

**Api:**
- POST /payments {amount, currency, source, idempotencyKey}
- GET /payments/{id}
- POST /wallets/transfer {from, to, amount, idempotencyKey}
- POST /webhooks/provider (signed)

**Data:** Relational DB with ACID: payments (state machine), double-entry ledger entries (append-only), wallet balances, idempotency keys with stored responses. Money as integer minor units or decimal, never float.

**Architecture:** The payment service stores a payment intent in CREATED state with the idempotency key, then calls the provider with the same key. The result or a later webhook moves the state to SUCCEEDED or FAILED and writes balanced ledger entries in one transaction. A reconciliation job compares the ledger with provider reports every day.

**Hard parts:**
- Unknown outcomes after a timeout: do not retry blindly; query the provider with the idempotency key and reconcile.
- Duplicate or out-of-order webhooks: verify the signature, dedup by event id, and allow only valid state transitions.
- Wallet concurrency: row lock or optimistic version on the balance, and a check that the balance does not go negative, inside the ledger transaction.

**Tradeoffs:**
- Synchronous charge (simple user experience) versus async with webhooks (resilient to provider latency).
- Strong consistency limits throughput per wallet; sharding by wallet id helps but makes cross-shard transfers sagas.

**Follow ups:**
- What if payment succeeds but your service crashes?
- How does reconciliation find and fix mismatches?
- How do you make a transfer between two wallets atomic?

<a id="hld-chat"></a>

### Chat and messaging (WhatsApp / Slack)

**Goal:** Let users send messages one-to-one and in groups in real time, with offline delivery, ordering and receipts.

**Functional:**
- Send and receive 1:1 and group messages.
- Deliver to offline users when they reconnect.
- Delivery and read receipts; online presence.
- Message history on multiple devices.

**Non functional:**
- Low delivery latency (assume under 500 ms online).
- No message loss once the server acknowledges it.
- Ordering within a conversation.
- Very many concurrent connections.

**Estimates:** Assume 500M DAU sending 40 messages per day: 20B per day, about 230,000 per second on average. Assume 100 bytes per message: about 2 TB per day. Assume 100M concurrent connections at about 50,000 to 100,000 per gateway server, so roughly 1,000 to 2,000 gateways.

**Api:**
- WebSocket: send {conversationId, clientMsgId, body}
- WebSocket push: message {seq, ...}, receipt events
- GET /conversations/{id}/messages?afterSeq=
- POST /conversations (create group)

**Data:** Messages in a wide-column store (for example Cassandra) partitioned by conversation id and sorted by sequence number, because writes are huge and reads are by conversation. A session registry (user to gateway) in Redis.

**Architecture:** Clients keep a WebSocket to a gateway. A sent message goes to the chat service, which assigns a per-conversation sequence number, persists it, and acks the sender. It looks up recipients' gateways in the session registry and pushes the message. Offline recipients get a push notification (FCM or APNs) and pull messages after their last seq on reconnect.

**Hard parts:**
- Ordering: a per-conversation sequence number from a single owner or a counter, not wall clock time.
- Duplicates on retry: the client message id is used to dedup on the server.
- Large groups: fan out through a queue; very large groups use fan-out on read.

**Tradeoffs:**
- Store-then-deliver (durable, slightly slower) versus deliver-then-store (fast, can lose messages).
- End-to-end encryption improves privacy but makes server-side search and moderation impossible.

**Follow ups:**
- How do you sync history to a new device?
- How do you scale presence for millions of users?
- What happens when a gateway server dies?

<a id="hld-web-crawler"></a>

### Web crawler

**Goal:** Download web pages at large scale, find new links, and store the content for indexing, while being polite to every website.

**Functional:**
- Start from seed URLs and follow discovered links.
- Fetch pages, respect robots.txt and per-host rate limits.
- Deduplicate URLs and near-duplicate content.
- Store page content and metadata; re-crawl pages to keep them fresh.

**Non functional:**
- Scale to billions of pages.
- Politeness: never overload one host.
- Robust to traps, bad HTML and slow servers.
- Fault tolerant: a crashed worker must not lose its frontier.

**Estimates:** Assume 1B pages per month: about 400 pages per second. Assume 100 KB per page: 100 TB per month of raw content before compression. URL dedup set: assume 10B URLs x 8-byte hash = 80 GB, so use a sharded store or a Bloom filter.

**Api:**
- Internal: AddUrls(urls[])
- Internal: event PageFetched {url, contentHash, links[]}
- Admin: POST /seeds, GET /stats

**Data:** URL frontier in a durable queue partitioned by host. Seen-URL set in a sharded key-value store plus a Bloom filter. Page content in object storage; page metadata (last crawl, hash, status) in a wide-column store.

**Architecture:** The frontier holds URLs in per-host queues, with a priority for important or stale pages. Fetcher workers take a host queue, check robots.txt from a cache, wait for that host's politeness delay, fetch, and store the content. A parser extracts and normalises links, filters seen URLs, and adds new ones to the frontier.

**Hard parts:**
- Politeness: one host maps to one queue owned by one worker at a time, with a delay between requests.
- Dedup: normalise URLs, hash them, check the seen set; use a content hash (or SimHash) for duplicate pages.
- Crawler traps and safety: limit depth, URL length and redirects, and block private IPs (SSRF).

**Tradeoffs:**
- BFS gives broad coverage; a priority frontier gives fresher, more important pages.
- Bloom filter saves memory but has false positives, so a few new URLs are skipped.

**Follow ups:**
- How do you decide when to re-crawl a page?
- How do you handle JavaScript-rendered pages?
- How do you resume after a full crawler restart?

<a id="hld-youtube"></a>

### Video upload and streaming (YouTube)

**Goal:** Let users upload videos and let viewers watch them smoothly on any device and network.

**Functional:**
- Upload a video (large, resumable).
- Transcode into several resolutions and adaptive-bitrate segments.
- Stream video to viewers.
- Video metadata, search, views, likes and comments.

**Non functional:**
- Playback start fast; little rebuffering.
- Upload processing can be async (minutes are OK).
- Very high read bandwidth: the CDN carries most traffic.
- Durable storage of originals.

**Estimates:** Assume 500 hours of video uploaded per minute (an assumption for sizing). Assume 1 GB per hour after transcoding into all formats: 500 GB per minute, about 720 TB per day. Assume 1B views per day at 100 MB per view: 100 PB per day of egress, so the CDN is essential.

**Api:**
- POST /videos -> {videoId, uploadUrl}
- PUT chunks to the upload URL (resumable)
- GET /videos/{id} -> metadata + manifest URL
- GET /manifest/{id}.m3u8 (HLS or DASH)

**Data:** Original and transcoded segments in object storage. Video metadata and processing status in a sharded relational DB. View counters in a separate counter store. Search in a search index.

**Architecture:** The client uploads chunks to object storage through a pre-signed URL. An upload-complete event starts a transcoding pipeline: split into pieces, transcode in parallel on a worker fleet, package into HLS or DASH segments, then mark the video ready. Players fetch the manifest and segments from the CDN, which pulls from object storage on a miss.

**Hard parts:**
- Transcoding at scale: split the video, use a DAG of tasks on a worker queue, retry failed pieces only.
- Hot videos: CDN with multiple tiers; pre-warm popular content.
- View counts: batch increments through a stream, not one DB write per view.

**Tradeoffs:**
- Transcode every resolution up front (fast play, more storage) versus on demand for rare videos (cheaper, slow first play).
- Own CDN versus third-party CDN: cost and control versus speed to build.

**Follow ups:**
- How does adaptive bitrate streaming work?
- How do you handle a failed transcode?
- How do you count views without a hot database row?

<a id="hld-typeahead"></a>

### Search autocomplete / typeahead

**Goal:** Suggest the top completions for a prefix as the user types, in a few milliseconds.

**Functional:**
- Return the top K (assume 5 to 10) suggestions for a prefix.
- Rank by popularity, with some freshness.
- Update rankings from query logs.
- Filter offensive or blocked terms.

**Non functional:**
- Very low latency (assume under 50 ms end to end).
- Very high read QPS.
- Suggestions can be slightly stale (minutes or hours).
- Highly available.

**Estimates:** Assume 100M DAU, 10 searches each, and about 6 keystroke requests per search: 6B requests per day, about 70,000 per second on average. Assume 10M unique popular queries x 50 bytes plus top-K lists: a few GB, which fits in memory and can be replicated.

**Api:**
- GET /suggest?q=prefix&limit=10
- Internal: event QuerySubmitted {query, ts}

**Data:** An in-memory trie (or a prefix to top-K map) per serving node, built offline from aggregated query counts. Query logs go to a stream and a data store for aggregation.

**Architecture:** Search queries are logged to a stream. A batch or streaming job counts queries over a time window, applies decay and filters, and builds a trie in which each node stores its top-K completions. The serialized trie is shipped to serving nodes that answer prefix requests from memory. Browsers and CDNs can cache common short prefixes.

**Hard parts:**
- Fast top-K: precompute and store the top K at each trie node, so a lookup is O(prefix length).
- Freshness: rebuild periodically and merge a small real-time trending layer.
- Scale: shard by prefix range or replicate the whole trie; reduce calls with client debounce.

**Tradeoffs:**
- Precomputed top-K per node (fast reads, more memory, slower updates) versus computing at query time.
- Full rebuild (simple, stale) versus incremental updates (fresh, complex).

**Follow ups:**
- How do you personalise suggestions?
- How do you handle typos?
- How do you support many languages?

<a id="hld-google-docs"></a>

### Collaborative editor (Google Docs)

**Goal:** Let several users edit the same document at the same time and see each other's changes in real time, without losing anyone's edit.

**Functional:**
- Create, open and edit documents.
- Real-time collaborative editing.
- Show presence and cursors.
- Version history and permissions (view, comment, edit).

**Non functional:**
- Edits appear for others in about 100 to 200 ms.
- All users converge to the same document.
- No acknowledged edit is lost.
- Works through short disconnects.

**Estimates:** Assume 10M daily active editors and 1 operation per second each while typing, with about 10% typing at any moment: about 1M operations per second in total. Most documents have only 1 to 5 editors at once, so load spreads by document.

**Api:**
- WebSocket: op {docId, baseVersion, op}
- WebSocket push: op {version, op}, presence events
- GET /docs/{id}?version=
- POST /docs/{id}/share

**Data:** An operation log per document (append-only) plus periodic snapshots, in a durable store. Document metadata and permissions in a relational DB.

**Architecture:** Clients connect over WebSocket to a collaboration server. All sessions of one document are routed to the same server, which owns the document. A client sends an operation with its base version; the server transforms it against newer operations (OT), assigns the next version, appends it to the log, and broadcasts it. Snapshots are saved periodically so loading does not replay the whole log.

**Hard parts:**
- Concurrent edits: Operational Transformation with a central server, or CRDTs that merge without a central order.
- One owner per document: consistent hashing or a lease routes all editors of one document to one server.
- Offline edits: queue local operations and transform them on reconnect.

**Tradeoffs:**
- OT (needs a central server, simpler data) versus CRDT (works peer-to-peer and offline, more metadata).
- Snapshot often (fast load, more storage) versus rarely (long replay).

**Follow ups:**
- What happens if the document's server crashes?
- How do you implement version history?
- How do you show other users' cursors?

<a id="hld-distributed-cache"></a>

### Distributed cache (Redis-like)

**Goal:** Provide a fast, in-memory key-value cache spread over many nodes, to reduce load and latency on databases.

**Functional:**
- get, set and delete with a TTL.
- Eviction when memory is full (LRU or LFU).
- Add and remove nodes.
- Optional replication for availability.

**Non functional:**
- Sub-millisecond latency inside the data centre.
- Very high throughput.
- Highly available; data loss is acceptable (it is a cache).
- Scale out by adding nodes.

**Estimates:** Assume 1M requests per second and a hot set of 1 TB. Assume about 50 to 100 GB of usable memory per node: 1 TB / 64 GB is about 16 primaries, plus one replica each. Assume one node handles about 100,000 operations per second (measure it): about 10 nodes for throughput, so memory decides.

**Api:**
- GET key
- SET key value TTL
- DEL key
- Admin: add or remove node

**Data:** An in-memory hash map plus an LRU list per node. Keys are spread by consistent hashing with virtual nodes. Cluster membership is kept in a config service or by gossip.

**Architecture:** Clients or a proxy hash each key onto a ring to find its node. Each node serves get and set from memory and evicts by LRU and TTL. Each primary can have a replica that receives async updates and takes over on failure. The application uses cache-aside: read the cache, on miss read the DB and fill the cache.

**Hard parts:**
- Rebalancing: consistent hashing with virtual nodes moves only about 1/N of keys when a node joins or leaves.
- Hot keys: replicate hot keys to many nodes or add a small local cache in the application.
- Cache stampede: request coalescing (single flight), a lock on miss, or early random refresh before expiry.

**Tradeoffs:**
- Async replication (fast, can lose recent writes) versus sync replication (safer, slower).
- Client-side routing (one less hop) versus a proxy (simpler clients).

**Follow ups:**
- How do you keep the cache consistent with the DB?
- What happens when a node dies?
- How do you handle one extremely hot key?

<a id="hld-ad-click-aggregation"></a>

### Ad-click aggregation (stream processing)

**Goal:** Count ad clicks per ad per minute from a huge event stream, accurately enough for billing and fast enough for dashboards.

**Functional:**
- Ingest click events.
- Aggregate clicks per ad per minute (and other windows).
- Query aggregated counts for a time range.
- Filter duplicate and fraudulent clicks.

**Non functional:**
- High ingest rate with bursts.
- Accurate counts for billing: no loss, no double count.
- Results available within a few minutes.
- Fault tolerant with replay.

**Estimates:** Assume 1B clicks per day: about 12,000 per second on average; assume 5x at peak. Assume 100 bytes per raw event: 100 GB per day of raw data. Aggregates are small: assume 2M ads x 1,440 minutes per day.

**Api:**
- POST /clicks (from the ad server or a redirect service)
- GET /ads/{id}/clicks?from=&to=&granularity=minute
- GET /ads/top?window=1m&k=100

**Data:** Raw events in Kafka (retained for replay) and in cheap object storage. Aggregates in an OLAP or time-series store, keyed by (ad_id, minute).

**Architecture:** Clicks go to Kafka, partitioned by ad id. A stream processor (for example Flink) dedups by click id, assigns event-time tumbling windows of one minute with a watermark, and writes aggregates to the OLAP store. A daily batch job recomputes from raw events and reconciles with the streaming results.

**Hard parts:**
- Exactly-once counts: dedup by click id, use checkpoints, and write aggregates idempotently (upsert by window key).
- Late events: watermarks plus allowed lateness; very late events are fixed by the batch job.
- Hot ads: pre-aggregate locally before the shuffle, or split the key with a suffix.

**Tradeoffs:**
- Streaming only (fresh, harder to get exact) versus Lambda with batch correction (accurate, two code paths).
- Event time (correct windows) versus processing time (simpler, wrong under delay).

**Follow ups:**
- How do you avoid counting a click twice after a failure?
- How do you handle events that arrive an hour late?
- How do you serve the top 100 ads in the last minute?

<a id="hld-metrics-monitoring"></a>

### Metrics and monitoring system

**Goal:** Collect numeric metrics from many services, store them as time series, show dashboards, and raise alerts.

**Functional:**
- Collect metrics (pull or push) with labels.
- Store time series and query aggregates over time ranges.
- Dashboards.
- Alert rules with notifications.

**Non functional:**
- High write throughput.
- Query recent data fast.
- Alerting must keep working when other systems fail.
- Cost-controlled retention (downsampling).

**Estimates:** Assume 10,000 hosts x 500 series each = 5M active series, one sample every 10 seconds: 500,000 samples per second. Assume about 2 bytes per sample after compression: about 85 GB per day. Raw data kept 15 days; downsampled data kept for a year.

**Api:**
- GET /metrics on each target (pull)
- POST /write (push, batched)
- GET /query?expr=&start=&end=&step=
- Alert rule config: expr, for, severity

**Data:** A time-series DB: series are identified by metric name plus labels; data is stored in compressed time blocks (delta and XOR encoding). An inverted index from labels to series ids.

**Architecture:** Collectors scrape targets or receive pushes, then write to ingesters that buffer recent data in memory and flush compressed blocks to long-term storage. A query layer reads recent data from ingesters and older data from storage. An alert evaluator runs rules on a schedule and sends alerts to a notification manager that groups and dedups them.

**Hard parts:**
- High cardinality: labels like user id create millions of series; limit and reject them at ingest.
- Storage cost: compression, downsampling and tiered retention.
- Reliable alerting: run the alert system separately, and monitor the monitoring system itself.

**Tradeoffs:**
- Pull (easy to know a target is down) versus push (works for short-lived jobs, through firewalls).
- High resolution (precise) versus downsampled (cheap, loses spikes).

**Follow ups:**
- How do you stop a cardinality explosion?
- How do you avoid alert storms?
- How do you query a metric across many clusters?

<a id="hld-proximity"></a>

### Proximity / nearby search (Yelp, Google Maps nearby)

**Goal:** Find businesses or places near a location, quickly, with filters and ranking.

**Functional:**
- Search places within a radius of a point.
- Filter by category, rating and open now.
- View place details.
- Owners add or update places.

**Non functional:**
- Low search latency (assume under 200 ms).
- Read-heavy; place data changes slowly.
- Highly available.
- Updates may take minutes to appear.

**Estimates:** Assume 200M places and 100M DAU x 5 searches = 500M searches per day, about 6,000 per second on average. Assume 1 KB per place: 200 GB of data. The geo index (id plus coordinates) is only a few GB, so it fits in memory and can be replicated.

**Api:**
- GET /search?lat=&lng=&radius=&category=&cursor=
- GET /places/{id}
- POST /places, PUT /places/{id}

**Data:** Places in a relational DB (source of truth). A geo index in memory: geohash, quadtree or Google S2 cells mapping to place ids. A search engine with geo queries is also a valid choice.

**Architecture:** The location service turns the query point into a geohash cell, then looks up that cell and its 8 neighbours to get candidate ids. It computes exact distances, filters, ranks and pages the results, then hydrates details from a cache. Writes go to the DB, and the index is rebuilt or updated asynchronously.

**Hard parts:**
- Boundary problem: a nearby place can be in the next cell, so always search the neighbouring cells.
- Uneven density: a quadtree or adaptive precision splits dense city areas into smaller cells.
- Ranking: combine distance, rating and relevance; the geohash prefix alone is not exact distance.

**Tradeoffs:**
- Geohash (simple string prefix, easy to shard) versus quadtree (adapts to density, in-memory structure).
- Read replicas of the index (fast, a little stale) versus querying the source DB.

**Follow ups:**
- How do you expand the radius when there are few results?
- How would you support moving objects such as drivers?
- How do you shard the index globally?

<a id="hld-object-storage"></a>

### Object storage (S3-like)

**Goal:** Store and retrieve objects (files) of any size by bucket and key, very durably, at large scale, like S3.

**Functional:**
- PUT, GET and DELETE an object by bucket and key.
- Multipart upload for large objects.
- List objects by prefix.
- Bucket permissions and optional versioning.

**Non functional:**
- Extreme durability (target many nines).
- High availability.
- Scales to exabytes and billions of objects.
- Read-after-write consistency for new objects.

**Estimates:** Assume 100 PB of data and 10B objects. Metadata at about 1 KB per object = 10 TB, which must be sharded. With 3x replication, raw storage is 300 PB; with erasure coding (for example 8+4) it is about 150 PB.

**Api:**
- PUT /{bucket}/{key}
- GET /{bucket}/{key} (supports range reads)
- POST /{bucket}/{key}?uploads (multipart: initiate, upload parts, complete)
- GET /{bucket}?prefix=&continuation-token=

**Data:** Metadata (bucket, key, version, size, checksum, chunk locations) in a sharded, strongly consistent key-value store. Data stored as chunks on data nodes, with replication or erasure coding.

**Architecture:** A stateless API layer authenticates the request. For a PUT, it streams data to data nodes chosen by a placement service, waits for enough durable copies, then commits the metadata record; the object becomes visible only after that commit. A GET reads metadata, then reads the chunks. Background jobs check integrity, repair lost replicas and garbage-collect deleted data.

**Hard parts:**
- Durability: replicas or erasure coding across failure domains, checksums and background scrubbing and repair.
- Metadata scale: shard by bucket plus key hash; prefix listing needs range-friendly partitioning.
- Large uploads: multipart upload with per-part checksums and cleanup of abandoned uploads.

**Tradeoffs:**
- 3x replication (fast reads and repair, 3x cost) versus erasure coding (about 1.5x cost, slower repair).
- Strong consistency for metadata (simple clients) versus eventual (more available).

**Follow ups:**
- How do you detect and repair silent data corruption?
- How does multipart upload work?
- How would you add cross-region replication?

<a id="hld-uber"></a>

### Ride sharing and matching (Uber)

**Goal:** Match riders with nearby drivers in real time and manage each trip from request to payment.

**Functional:**
- Drivers send location updates.
- Rider requests a ride and sees an ETA and price.
- Match the rider with a nearby available driver who accepts.
- Track the trip live; complete it and pay.

**Non functional:**
- Matching within seconds.
- Very high rate of location writes.
- A driver must never be assigned to two trips.
- Highly available, partitioned by region.

**Estimates:** Assume 5M active drivers sending a location every 4 seconds: about 1.25M writes per second. Assume 20M trips per day: about 230 requests per second, more at peak. Only the latest location per driver is needed for matching: 5M x about 100 bytes = 500 MB in memory.

**Api:**
- POST /drivers/location {lat, lng, ts} (or over WebSocket)
- POST /rides {pickup, dropoff} -> {rideId}
- POST /rides/{id}/accept (driver)
- WebSocket: trip and location updates

**Data:** Latest driver locations in an in-memory geo index (Redis GEO or geohash or S2 cells), sharded by region. Trips in a relational DB with a state machine. Location history to a stream and cheap storage.

**Architecture:** Drivers stream locations to a location service that updates the geo index. A ride request goes to the matching service, which queries nearby available drivers, ranks them by ETA, and offers the ride to one driver at a time with a timeout. Acceptance moves the driver and the trip state with a conditional update. Trip updates go to the rider over WebSocket or push.

**Hard parts:**
- Double assignment: guard the driver's state with a conditional update (AVAILABLE to ASSIGNED) or a lock with a TTL.
- Location write load: keep only the latest location in memory and batch history writes.
- City and cell hotspots: partition by region and split dense cells.

**Tradeoffs:**
- Nearest driver (simple, fast) versus global batch matching (better overall ETA, more delay).
- Offer to one driver at a time (no conflicts, slower) versus several at once (faster, needs conflict handling).

**Follow ups:**
- How do you compute surge pricing?
- What happens if the driver does not respond?
- How do you handle a trip that crosses region boundaries?

<a id="hld-hotel-booking"></a>

### Hotel booking (Booking.com)

**Goal:** Let users search hotels by place and dates, and book rooms without overbooking.

**Functional:**
- Search hotels by location, dates and guests.
- Show room types, prices and availability.
- Book a room type for a date range and pay.
- Cancel a booking; hotels manage inventory and prices.

**Non functional:**
- No overbooking (strong consistency on inventory).
- Search is read-heavy and can be slightly stale.
- Booking must be idempotent.
- Highly available search.

**Estimates:** Assume 1M hotels and 50M searches per day: about 600 per second. Assume 1M bookings per day: about 12 per second. Inventory rows: hotels x room types x 365 days, assume 1M x 5 x 365, about 2B rows; partition by hotel.

**Api:**
- GET /search?city=&checkIn=&checkOut=&guests=
- GET /hotels/{id}/availability?checkIn=&checkOut=
- POST /bookings {hotelId, roomTypeId, checkIn, checkOut, idempotencyKey}
- POST /bookings/{id}/cancel

**Data:** Relational DB for inventory: room_inventory(hotel_id, room_type_id, date, total, booked), plus bookings and payments; sharded by hotel_id. A search index (with geo) for discovery, fed by CDC.

**Architecture:** Search hits the search index and a cache. A booking request starts a transaction that updates every night in the range with a conditional increment (booked + 1 <= total) and creates a booking in PENDING state. Payment then confirms the booking; a failure or timeout releases the nights.

**Hard parts:**
- Overbooking: a conditional update per night inside one transaction, or optimistic locking with a version column.
- Duplicate requests: an idempotency key stored with a unique constraint.
- Stale search results: accept staleness in search and check availability again at booking time.

**Tradeoffs:**
- Inventory per room type per date (simple, scalable) versus per physical room (needed for assigning a specific room).
- Hold during payment (good user experience) versus confirm only after payment (no blocked stock).

**Follow ups:**
- How do you allow controlled overbooking?
- How do you sync with external channel managers?
- How do you handle payment success after a hold expired?

<a id="hld-ticket-booking"></a>

### Movie / event ticket booking (BookMyShow)

**Goal:** Let users choose specific seats for a show or event and book them, without two people getting the same seat.

**Functional:**
- Browse movies, shows and events.
- View the seat map with live availability.
- Hold selected seats for a few minutes.
- Pay and confirm; cancel.

**Non functional:**
- A seat is never sold twice.
- Handles big spikes for popular releases.
- Seat map reads are fast; slight staleness is OK.
- Holds expire automatically.

**Estimates:** Assume 10,000 shows per day x 200 seats = 2M seats per day. Normal booking rate is low, but assume a hot release brings 1M users in 10 minutes for a few thousand seats; design for the spike, not the average.

**Api:**
- GET /shows/{id}/seats
- POST /shows/{id}/holds {seatIds} -> {holdId, expiresAt}
- POST /bookings {holdId, idempotencyKey}
- DELETE /holds/{id}

**Data:** Relational DB: seats(show_id, seat_id, status, hold_id, hold_expires_at, version), bookings and payments. Optionally Redis keys with a TTL as a fast hold layer, but the DB decides.

**Architecture:** A hold request runs one conditional update: set status HELD only where status is AVAILABLE (or the old hold has expired), for all chosen seats in one transaction. If fewer rows than requested were updated, roll back. Payment confirms the hold into a booking. A sweeper (or the expiry check in the update itself) frees expired holds. A virtual waiting room protects the system during spikes.

**Hard parts:**
- Double booking: a guarded atomic update or a unique constraint, never read-then-write.
- Hold expiry versus late payment: on payment after expiry, try to re-hold, or refund.
- Flash crowds: a waiting-room queue, rate limits and a cached seat map.

**Tradeoffs:**
- Pessimistic lock (SELECT FOR UPDATE: simple, contention) versus a conditional update (optimistic, scales better).
- Redis holds (fast) versus DB holds (one source of truth).

**Follow ups:**
- What if payment succeeds after the hold expired?
- How do you handle 1M users for one concert?
- How do you show near-real-time seat maps?

<a id="hld-flight-booking"></a>

### Flight booking

**Goal:** Let users search flights, choose fares and book seats, keeping seat inventory consistent with the airline's system.

**Functional:**
- Search flights by route and date (including connections).
- Show fares and seat availability.
- Book: hold, pay, issue a ticket.
- Cancel or change a booking.

**Non functional:**
- Search is very read-heavy and can use cached fares.
- Booking must be correct: no overselling beyond the airline's policy.
- Integration with external airline or GDS systems that are slow.
- Idempotent booking flow.

**Estimates:** Assume 100M searches per day (about 1,200 per second) and a look-to-book ratio of about 1,000 to 1 (assumption), so about 100,000 bookings per day. Search caching saves most of the expensive external calls.

**Api:**
- GET /flights/search?from=&to=&date=&pax=
- POST /bookings/hold {flightIds, fareClass, passengers, idempotencyKey}
- POST /bookings/{id}/pay
- POST /bookings/{id}/cancel

**Data:** Fare and schedule cache in a key-value store. Bookings (PNR), passengers, payments and tickets in a relational DB. Seat inventory is owned by the airline system; we keep a local copy for display.

**Architecture:** Search queries a cache of fares and availability, refreshed from the airlines, and falls back to live calls. Booking runs as a saga: hold the seat with the airline, take payment, issue the ticket, and compensate (release the hold or refund) on failure. Each step is recorded in the booking state machine.

**Hard parts:**
- Stale availability: re-check price and seat at hold time; show a price-change message if needed.
- Multi-step saga across external systems: idempotent steps, timeouts and compensation.
- Uncertain external results: reconcile the PNR status with the airline before retrying.

**Tradeoffs:**
- Aggressive caching (cheap, fast) versus fresh results (accurate, expensive external calls).
- Synchronous ticketing (user waits) versus async issue with a notification.

**Follow ups:**
- How do you search multi-leg connections?
- What if the airline call times out after payment?
- How do you handle a schedule change for many bookings?

<a id="hld-restaurant-reservation"></a>

### Restaurant reservation

**Goal:** Let diners find restaurants and book a table for a time slot, and let restaurants manage tables and slots.

**Functional:**
- Search restaurants by place, time and party size.
- Show available time slots.
- Book, modify and cancel a reservation.
- Restaurants manage tables, slots and walk-ins; send reminders.

**Non functional:**
- No double booking of a table and slot.
- Search can be eventually consistent.
- Reminders are reliable.
- Peak load around dinner times and holidays.

**Estimates:** Assume 100,000 restaurants x 20 tables x 10 slots per day = 20M table-slots per day. Assume 2M reservations per day: about 25 per second on average, with peaks in the evening. The data is small; correctness matters more than scale.

**Api:**
- GET /restaurants/search?city=&date=&time=&partySize=
- GET /restaurants/{id}/slots?date=&partySize=
- POST /reservations {restaurantId, slot, partySize, idempotencyKey}
- DELETE /reservations/{id}

**Data:** Relational DB: restaurants, tables (capacity), slots, and reservations with a unique constraint on (table_id, slot_start). A search index for discovery.

**Architecture:** The availability service finds slots where some table fits the party size. Booking picks the smallest suitable table and inserts a reservation; the unique constraint rejects a conflicting insert, and the service tries the next table. A scheduler sends reminders through the notification service. A no-show policy can require a card hold.

**Hard parts:**
- Double booking: a unique constraint or an exclusion constraint on table plus time range.
- Table assignment: a best-fit strategy, with the option to combine tables for large parties.
- Restaurant-side changes (closures, walk-ins) must update availability and notify affected diners.

**Tradeoffs:**
- Assign a table at booking time (precise) versus capacity pooling with assignment later (more flexible).
- Fixed slots (simple) versus flexible durations (better use of tables, harder overlap checks).

**Follow ups:**
- How do you handle a party of 12?
- How do you reduce no-shows?
- How would you add a waitlist?

<a id="hld-food-delivery"></a>

### Food delivery (Swiggy / Zomato)

**Goal:** Let customers order food from nearby restaurants, have the restaurant accept and cook it, and have a courier deliver it, with live tracking.

**Functional:**
- Browse nearby restaurants and menus.
- Place an order and pay.
- Restaurant accepts or rejects; courier is assigned.
- Live order and courier tracking; cancellation and refund.

**Non functional:**
- The order flow must be reliable and idempotent.
- Courier assignment within seconds to a minute.
- Browse is read-heavy and cacheable.
- High peaks at meal times.

**Estimates:** Assume 5M orders per day, with most of them in two peak hours: assume 40% in 2 hours, so about 280 orders per second at peak. Assume 500,000 active couriers sending a location every 5 seconds: about 100,000 writes per second.

**Api:**
- GET /restaurants?lat=&lng=
- POST /orders {restaurantId, items, addressId, idempotencyKey}
- POST /orders/{id}/accept (restaurant)
- WebSocket: order status and courier location

**Data:** Orders and payments in a relational DB with an explicit state machine. Menus in a document store plus cache. Courier locations in an in-memory geo index. Events through Kafka.

**Architecture:** The order service creates an order (PLACED) and starts payment. On payment success it notifies the restaurant. On acceptance, the dispatch service finds nearby couriers from the geo index and offers the job. Each state change (ACCEPTED, PREPARING, PICKED_UP, DELIVERED) is an event that updates tracking and notifications. Steps form a saga with compensations such as refunds.

**Hard parts:**
- Order state machine across services: idempotent commands, an outbox for events, and compensation on rejection.
- Courier assignment: geo query plus ranking by ETA and batching, with a guarded assignment.
- Peak load: cache menus, queue order intake, and scale dispatch per city.

**Tradeoffs:**
- Assign a courier early (shorter wait, idle courier) versus late (better use of couriers, risk of delay).
- Strong consistency for orders and payments versus eventual for menus and tracking.

**Follow ups:**
- What if the restaurant rejects after payment?
- How do you batch two orders for one courier?
- How do you compute an accurate ETA?

<a id="hld-logging-pipeline"></a>

### Logging pipeline

**Goal:** Collect logs from all services, store and index them, and let engineers search them quickly.

**Functional:**
- Collect logs from hosts and containers.
- Parse, enrich and redact sensitive data.
- Index logs for search by time, service and fields.
- Retention policies and alerts on log patterns.

**Non functional:**
- Very high ingest volume with bursts.
- Logging must never slow down or crash the application.
- Search over recent logs in seconds.
- Cost-effective long-term retention.

**Estimates:** Assume 5,000 services producing 10 TB of logs per day: about 115 MB per second on average, more at peak. Assume 7 days hot (indexed) storage = 70 TB plus replicas, and 90 days cold in object storage.

**Api:**
- Agent to collector: batched log events (structured JSON)
- GET /search?query=&from=&to=&service=
- Admin: retention and alert rules

**Data:** Kafka as the buffer. A search index (for example Elasticsearch or OpenSearch) for hot logs, with time-based indices. Object storage for cold, compressed logs.

**Architecture:** An agent on each host tails logs and sends batches to a collector, which writes to Kafka. Processors read Kafka, parse and enrich the events, redact secrets and PII, and write to the search index. A separate consumer archives raw logs to object storage. Search queries go to the index; old indices are deleted or moved to cold storage.

**Hard parts:**
- Backpressure: a local buffer in the agent with a size limit and Kafka in the middle; drop low-priority logs when full.
- Index cost: index only selected fields, use time-based indices and rollover.
- Secrets and PII in logs: redact in the pipeline and control search access.

**Tradeoffs:**
- Full-text index (powerful search, expensive) versus label-only index plus scanning (cheap, slower search).
- Drop logs under pressure (protects the app) versus block (no data loss, risks the app).

**Follow ups:**
- How do you trace one request across services?
- What happens if Kafka is down?
- How do you control log volume from a noisy service?

<a id="hld-email-delivery"></a>

### Email delivery service

**Goal:** Send transactional and bulk emails reliably, track delivery and bounces, and protect sender reputation.

**Functional:**
- Accept send requests (single and bulk) with templates.
- Send through SMTP or provider APIs.
- Track delivered, bounced, opened and complained events.
- Respect unsubscribes and suppression lists.

**Non functional:**
- No lost send requests (durable on accept).
- Avoid duplicates as far as possible.
- Throttle per receiving domain and per provider.
- Transactional emails are not delayed by bulk.

**Estimates:** Assume 100M emails per day: about 1,200 per second on average. Assume 10 KB average with templates rendered: 1 TB per day of content if stored. Provider rate limits decide the real throughput and the worker count.

**Api:**
- POST /emails {to, templateId, params, idempotencyKey, priority}
- POST /campaigns {segmentId, templateId}
- GET /emails/{id}/status
- Webhook: POST /events/{provider} (bounce, complaint)

**Data:** Email requests and status in a relational or wide-column DB. Suppression list in a key-value store. Templates in a DB, cached.

**Architecture:** The API stores the request with its idempotency key and enqueues it, with separate queues for transactional and bulk. Workers check the suppression list, render the template, and send through the provider with per-domain throttling. Provider webhooks update status; hard bounces and complaints are added to the suppression list.

**Hard parts:**
- Duplicate sends: idempotency key per request; SMTP has no exactly-once, so accept rare duplicates.
- Deliverability: SPF, DKIM and DMARC, warm-up of new IPs, and suppression of bounces and complaints.
- Priority isolation: separate queues and worker pools for OTPs versus marketing.

**Tradeoffs:**
- Own SMTP servers (control, high operations cost) versus a provider such as SES or SendGrid (simple, less control).
- Store full rendered emails (audit, cost) versus template plus params (cheap, re-render).

**Follow ups:**
- How do you handle a provider outage?
- How do you send 10M campaign emails without hurting OTP emails?
- How do you process bounces?

<a id="hld-instagram"></a>

### Photo sharing (Instagram)

**Goal:** Let users upload photos, follow others, and see a feed of photos from people they follow.

**Functional:**
- Upload photos with captions.
- Follow and unfollow users.
- View the home feed and user profiles.
- Like and comment.

**Non functional:**
- Read-heavy; feed latency low.
- Photos are durable.
- Eventual consistency for feed and counters is fine.
- Global users, so a CDN is needed.

**Estimates:** Assume 500M DAU, 2 uploads per 10 users per day = 100M photos per day, about 1,200 per second. Assume 2 MB per photo plus resized versions, about 3 MB: 300 TB per day. Feed reads: assume 500M x 10 = 5B per day, about 58,000 per second.

**Api:**
- POST /media/upload-url -> pre-signed URL
- POST /posts {mediaId, caption}
- GET /feed?cursor=
- POST /posts/{id}/like

**Data:** Photos in object storage behind a CDN. Post and user metadata in a sharded DB. Follow graph in a sharded store. Precomputed feeds in Redis. Like counters in a counter store.

**Architecture:** The client uploads the photo to object storage with a pre-signed URL. A media pipeline creates resized versions. Creating a post saves metadata and sends an event to a fan-out service that pushes the post id to followers' feeds (hybrid for celebrities). The feed service reads ids from the cache, hydrates posts, and the client loads images from the CDN.

**Hard parts:**
- Celebrity fan-out: hybrid push and pull, as in the news feed.
- Media processing: async with status; the post is visible once the main version is ready.
- Hot counters: shard counters or batch updates through a stream.

**Tradeoffs:**
- Push model (fast reads) versus pull model (cheap writes).
- Process images on upload (consistent quality) versus on the fly at the CDN edge (flexible, CPU at read time).

**Follow ups:**
- How do you design the Explore page?
- How do you delete a post from all feeds?
- How do you store and serve Stories that expire after 24 hours?

<a id="hld-tiktok"></a>

### Short-video feed (TikTok)

**Goal:** Serve an endless, personalised feed of short videos that starts playing instantly, and let creators upload videos.

**Functional:**
- Upload short videos.
- Personalised For You feed.
- Like, comment, share and follow.
- Record watch events for ranking.

**Non functional:**
- Video start very fast; prefetch the next videos.
- The recommendation pipeline handles huge event volume.
- Feed freshness: new behaviour affects the feed quickly.
- Global CDN delivery.

**Estimates:** Assume 1B DAU watching 100 videos per day: 100B views per day, about 1.2M per second. Assume 5 MB per short video viewed: about 500 PB per day of egress, so the CDN and prefetch matter. Assume 50M uploads per day for transcoding.

**Api:**
- GET /feed/foryou?cursor= -> list of video ids and manifest URLs
- POST /videos (upload, then transcode)
- POST /events/watch {videoId, watchTimeMs}
- POST /videos/{id}/like

**Data:** Videos in object storage and the CDN. Metadata in a sharded DB. Watch events into Kafka. User and video features in a feature store. Candidate indices (embeddings) in an ANN index.

**Architecture:** Uploads go through a transcoding pipeline like YouTube's. For the feed, a recommendation service generates candidates (followed creators, similar embeddings, trending), ranks them with a model using user features, filters seen and unsafe videos, and returns a page. The client prefetches the next few videos from the CDN. Watch events stream back to update features in near real time.

**Hard parts:**
- Low-latency ranking: two stages (cheap candidate retrieval, then heavy ranking of a few hundred).
- Cold start for new users and new videos: use trending and exploration traffic.
- Event volume: stream processing to update features within minutes.

**Tradeoffs:**
- Exploration (find new good videos) versus exploitation (show what is known to work).
- Precompute feeds (fast, stale) versus rank on request (fresh, more compute).

**Follow ups:**
- How do you avoid showing the same video twice?
- How does a new video get its first views?
- How would you design prefetching on mobile networks?

<a id="hld-pinterest"></a>

### Pinterest

**Goal:** Let users save images (pins) into boards, follow boards and users, and discover pins through a home feed and search.

**Functional:**
- Create a pin (image, link, description) and save it to a board.
- Follow users and boards.
- Home feed of followed content plus recommendations.
- Search pins and see related pins.

**Non functional:**
- Read-heavy; image delivery through a CDN.
- Feed latency low.
- Eventual consistency is fine.
- Huge number of pins (billions) and repins.

**Estimates:** Assume 100M DAU, 20 feed requests each: 2B per day, about 23,000 per second. Assume 10M new pins per day; many are repins pointing to the same image, so dedup the images by hash. Assume 200 KB per image: about 2 TB per day of new images at most.

**Api:**
- POST /pins {imageUrl or upload, boardId, description}
- POST /pins/{id}/save {boardId}
- GET /feed?cursor=
- GET /search?q=

**Data:** Images in object storage plus CDN, deduplicated by content hash. Pins, boards and users in a sharded relational DB (sharded by user). Follow graph in a graph-friendly store. Search index for text; embedding index for related pins.

**Architecture:** A new pin stores the image (if new) and metadata, then events update the followers' feeds, the search index and the embedding index. The home feed mixes pins from followed boards (fan-out) with recommended pins from candidate generators, then ranks them. Related pins come from visual and graph-based similarity.

**Hard parts:**
- Image dedup: hash images so a repin reuses the stored image.
- Board-level follows: fan-out from a board to followers of the board and of the user.
- Related pins: graph walks or embeddings computed offline, served from an index.

**Tradeoffs:**
- Following-only feed (simple, limited) versus recommendation-mixed feed (more engagement, complex).
- Sharding by user (local board and pin queries) versus by pin (even load).

**Follow ups:**
- How do you generate related pins?
- How do you handle a viral pin?
- How do you shard pins and boards?

<a id="hld-reddit"></a>

### Community discussion and voting (Reddit)

**Goal:** Let users post in communities, comment in threads, and vote, with ranked lists such as Hot and Top.

**Functional:**
- Create communities, posts and nested comments.
- Upvote and downvote posts and comments.
- Ranked listings: hot, new, top per community and on the front page.
- Moderation: remove content, ban users.

**Non functional:**
- Read-heavy; listings must be fast.
- Vote counts can be eventually consistent.
- One vote per user per item.
- Viral threads create hot spots.

**Estimates:** Assume 50M DAU, 1M posts and 10M comments per day, and 200M votes per day: about 2,300 votes per second on average. Reads assumed 100x writes. Comment trees for a viral post can reach tens of thousands of nodes.

**Api:**
- POST /r/{community}/posts
- POST /posts/{id}/comments {parentId, body}
- POST /votes {itemId, value: +1|-1|0}
- GET /r/{community}?sort=hot&cursor=

**Data:** Posts, comments and communities in a sharded relational DB. Votes in a table with a unique key (user_id, item_id). Score counters in a cache. Precomputed ranked listings in Redis sorted sets per community.

**Architecture:** A vote upserts the vote row (so one user has one vote) and emits an event. A counter service applies the score change and recomputes the hot score (score and time-decay formula). Listing workers update sorted sets per community. Comment trees are loaded by post id and built in memory, with top-level comments paged.

**Hard parts:**
- Vote integrity: a unique constraint per user and item; the change is the difference between the new and old vote.
- Hot ranking: the score depends on time, so recompute it on vote and in periodic batches.
- Large comment trees: load by post, sort by score, collapse deep or low-score branches.

**Tradeoffs:**
- Exact counts (DB writes on every vote) versus approximate counts (batched through a stream).
- Precomputed listings (fast reads) versus computing on read (always fresh).

**Follow ups:**
- How do you detect vote manipulation?
- How do you build the front page from many communities?
- How do you paginate a comment tree?

<a id="hld-netflix"></a>

### Video-on-demand streaming (Netflix)

**Goal:** Stream a catalogue of movies and shows to many devices with high quality and few interruptions, with personalised browsing.

**Functional:**
- Browse a personalised catalogue.
- Play a title with adaptive bitrate.
- Resume playback across devices.
- Profiles and watch history.

**Non functional:**
- Fast start and very little rebuffering.
- Huge egress concentrated at peak evening hours.
- Highly available control plane.
- The catalogue changes rarely, so it can be cached and pre-positioned.

**Estimates:** Assume 100M concurrent streams at peak x 5 Mbps = 500 Tbps of egress, which can only be served from CDN edges inside ISP networks. Catalogue: assume 20,000 titles x many encodings, which is petabytes, but it is fixed and can be pre-loaded at night.

**Api:**
- GET /home?profileId= (personalised rows)
- POST /play {titleId} -> {manifestUrl, licence}
- PUT /progress {titleId, positionSec}
- GET /titles/{id}

**Data:** Video files in object storage and copied to CDN edges. Catalogue and metadata in a replicated DB plus cache. Viewing history and progress in a wide-column store keyed by profile.

**Architecture:** The control plane (in the cloud) handles login, browsing, recommendations and playback authorisation. On play, it returns a manifest that points to the best nearby CDN edge. The player downloads segments and switches bitrate by bandwidth. Content is encoded offline into many bitrates and pushed to edges before peak hours. Progress updates are written periodically.

**Hard parts:**
- Egress at peak: an edge CDN close to users, filled in off-peak hours.
- Quality: per-title encoding ladders and adaptive bitrate in the player.
- Resilience: fallbacks such as a non-personalised home page when recommendations fail.

**Tradeoffs:**
- Pre-position content (predictable, uses storage) versus pull on demand (less storage, slow first viewer).
- More bitrate options (smooth quality) versus storage and encoding cost.

**Follow ups:**
- How do you choose which CDN edge serves a user?
- How do you limit the number of concurrent streams per account?
- How would you build Continue Watching?

<a id="hld-spotify"></a>

### Music streaming (Spotify)

**Goal:** Stream songs on demand, manage playlists and libraries, and recommend music.

**Functional:**
- Search and play songs.
- Create and share playlists; save to library.
- Play on many devices (one active stream per account).
- Recommendations and record play counts for royalties.

**Non functional:**
- Playback starts fast (assume under 300 ms).
- Read-heavy catalogue.
- Play events must not be lost (royalties).
- Offline download support.

**Estimates:** Assume 200M DAU, 2 hours per day, 3.5-minute songs: about 7B plays per day, about 80,000 per second. Assume 160 kbps per stream; at assume 20M concurrent streams that is 3.2 Tbps of egress. Assume 100M tracks x 5 MB x a few qualities: about 1.5 PB.

**Api:**
- GET /search?q=
- GET /tracks/{id}/stream -> CDN URL
- POST /playlists, PUT /playlists/{id}/tracks
- POST /events/play {trackId, msPlayed}

**Data:** Audio files in object storage behind a CDN. Catalogue metadata in a relational DB plus search index. Playlists in a document or wide-column store. Play events into Kafka, then a data warehouse.

**Architecture:** Clients call API services for search, metadata and playlists. Playback fetches an audio URL and streams chunks from the CDN; the client prefetches the next track. Play events go to Kafka for royalty reports, history and recommendation training. Recommendation jobs produce playlists offline and store them for fast reads.

**Hard parts:**
- Accurate play counts: durable event logging with client-side buffering and dedup by event id.
- Large shared playlists: version them and page tracks; concurrent edits use optimistic concurrency.
- Fast start: prefetch, cache popular tracks at the edge, and use low-latency codecs.

**Tradeoffs:**
- Stream only (simple) versus offline downloads (needs DRM and licence checks).
- Batch recommendations (cheap) versus real-time session-based ones (fresher).

**Follow ups:**
- How do you enforce one active device per account?
- How do you count streams for royalties correctly?
- How do you generate a weekly personalised playlist?

<a id="hld-trending-topics"></a>

### Trending topics / top-K heavy hitters

**Goal:** Find the top K most frequent items (hashtags, searches) in a recent time window, updated in near real time.

**Functional:**
- Ingest events such as hashtags or search terms.
- Compute top K for windows such as the last 5 minutes and the last hour.
- Serve the trending list per region.
- Filter spam and blocked terms.

**Non functional:**
- Very high event rate.
- Freshness within a minute or so.
- Approximate counts are acceptable.
- Fast reads of the top-K list.

**Estimates:** Assume 500M events per day: about 6,000 per second, assume 10x in peaks. Unique terms per hour can be millions; exact counting of all of them is costly, so use sketches.

**Api:**
- Event: TermSeen {term, region, ts}
- GET /trending?region=&window=5m&k=10

**Data:** Kafka for events. Windowed counts in stream processor state. Count-Min Sketch plus a min-heap for approximate top K. Results in Redis sorted sets per region and window.

**Architecture:** Events go to Kafka, partitioned by term. Stream workers keep sliding or tumbling window counts for each term, and a local top K per partition. A merger combines the partial top-K lists into a global top K per region and writes it to Redis, where the API reads it.

**Hard parts:**
- Memory for many unique terms: Count-Min Sketch plus a heap (heavy hitters), accepting small over-counts.
- Merging partitions: partition by term so each term's count is complete in one partition, then merge local top-K lists.
- Trending versus popular: compare the current rate with a baseline so always-popular terms do not always win.

**Tradeoffs:**
- Exact counts (accurate, memory-heavy) versus sketches (small memory, approximate).
- Sliding windows (smooth) versus tumbling windows (cheaper, jumpy).

**Follow ups:**
- How do you detect a sudden spike rather than steady popularity?
- How do you handle a hot term that overloads one partition?
- How do you remove spam terms?

<a id="hld-cdn"></a>

### Content delivery network (CDN)

**Goal:** Serve static and cacheable content from servers close to users, to cut latency and reduce load on the origin.

**Functional:**
- Cache content at edge locations (points of presence).
- Route users to a good nearby edge.
- Fetch from the origin on a miss; honour cache headers.
- Purge or invalidate content; TLS termination.

**Non functional:**
- Low latency worldwide.
- Very high availability and bandwidth.
- Protect the origin from traffic spikes.
- Absorb DDoS traffic.

**Estimates:** Assume 10M requests per second globally and a 95% hit ratio target: the origin then sees 500,000 requests per second, so tiered caching is needed to cut that further. Edge size depends on the hot set per region, assumed to be a few hundred TB.

**Api:**
- GET https://cdn.example.com/path (with Cache-Control and ETag)
- POST /purge {paths or tags}
- Config: origin, TTL rules, cache keys

**Data:** Edge servers keep content on SSD plus memory with LRU-style eviction. Configuration and purge commands are spread through a control plane.

**Architecture:** DNS-based geo routing or anycast sends the user to a nearby point of presence. The edge returns cached content, or asks a regional mid-tier cache, which asks the origin on a miss. Only one request per object goes to the origin (request collapsing). The control plane distributes config and purges to all edges.

**Hard parts:**
- Origin protection: tiered caching plus request collapsing, so a miss storm becomes one origin request.
- Invalidation: versioned URLs (best) or purge by tag or path, spread quickly to all edges.
- Routing: anycast or DNS with health and load signals, and failover when a point of presence fails.

**Tradeoffs:**
- Long TTL (high hit ratio, stale content) versus short TTL (fresh, more origin load).
- Push content to edges (predictable) versus pull on demand (simple, a slow first request).

**Follow ups:**
- How do you cache personalised or dynamic content?
- How do you invalidate content quickly worldwide?
- How does a CDN help against DDoS attacks?

<a id="hld-ad-serving"></a>

### Ad serving

**Goal:** For each ad slot request, pick the best eligible ad within a strict time limit, and track impressions, clicks and budgets.

**Functional:**
- Receive an ad request with context (page, user segment, location).
- Select eligible campaigns by targeting, budget and frequency caps.
- Rank them and return the winning ad.
- Log impressions and clicks; enforce budgets and pacing.

**Non functional:**
- Very low latency (assume under 50 to 100 ms total).
- Very high QPS.
- Budget accuracy good enough for billing; small overspend is tolerated.
- If anything fails, show a fallback ad, never an error.

**Estimates:** Assume 10B ad requests per day: about 115,000 per second average, assume 3x at peak. Logging assumed 200 bytes per impression: about 2 TB per day. Campaign data is small (assume 1M campaigns), so it can be cached in memory on every ad server.

**Api:**
- GET /ad?slotId=&context= -> {adId, creativeUrl, trackingUrls}
- GET /impression?token=
- GET /click?token= -> redirect
- Admin: campaigns, budgets, targeting

**Data:** Campaigns and targeting in a relational DB, loaded into an in-memory index on ad servers. Budget spend counters in a fast store (Redis) with periodic sync. Impression and click events in Kafka, then a warehouse.

**Architecture:** The ad server looks up candidates from an in-memory targeting index, filters by budget and frequency caps, scores them (bid x predicted click rate), and returns the winner with a signed tracking token. Impression and click events go to Kafka; a stream job updates spend counters and the pacing service, which tells ad servers how fast each campaign may spend.

**Hard parts:**
- Latency budget: everything in memory, timeouts on each dependency, and a fallback ad.
- Budget control: approximate local counters synced often, plus pacing, accepting small overspend.
- Click fraud and duplicates: signed tokens, dedup by token, and fraud filters before billing.

**Tradeoffs:**
- Exact central budget checks (accurate, slow) versus local approximate counters (fast, slight overspend).
- Bigger ranking model (better relevance) versus latency.

**Follow ups:**
- How do you implement frequency capping per user?
- How do you pace a daily budget across the day?
- What happens if the ML ranking service is slow?

<a id="hld-recommendations"></a>

### Recommendation system

**Goal:** Suggest relevant items (products, videos, posts) to each user, in real time, based on behaviour and item data.

**Functional:**
- Collect user behaviour events.
- Generate candidate items for a user.
- Rank candidates and return the top N.
- Handle cold start; filter items already seen or bought.

**Non functional:**
- Serving latency low (assume under 100 ms).
- Freshness: recent actions should influence results quickly.
- Graceful fallback: never block the main page.
- Offline pipelines handle large data.

**Estimates:** Assume 100M users and 10M items. Assume 50,000 recommendation requests per second at peak. Embeddings: 10M items x 128 floats x 4 bytes = about 5 GB, which fits in an in-memory ANN index per node.

**Api:**
- GET /recommendations?userId=&context=&limit=20
- POST /events {userId, itemId, type: view|click|buy}

**Data:** Events in Kafka and a data lake. Feature store (online in key-value, offline in the warehouse). Item and user embeddings in a vector or ANN index. Precomputed recommendations per user in a key-value store as a fallback.

**Architecture:** Offline, training jobs build models and embeddings from the data lake. Online, the service fetches user features, generates candidates from several sources (similar items, collaborative filtering, trending), ranks a few hundred with the model, applies business rules (diversity, filters), and returns the top N. Events stream back to update features.

**Hard parts:**
- Two-stage retrieval and ranking to meet latency.
- Cold start: popular or content-based items for new users and new items.
- Feedback loops and diversity: add exploration and avoid showing only one type of item.

**Tradeoffs:**
- Precomputed lists (cheap, stale) versus real-time ranking (fresh, costly).
- Optimise click rate (short-term) versus long-term satisfaction.

**Follow ups:**
- How do you evaluate a new model (offline metrics versus A/B test)?
- How do you handle a brand-new user?
- What do you return if the ranking service is down?

<a id="hld-leaderboard"></a>

### Real-time leaderboard

**Goal:** Keep a live ranking of players by score, and answer top-K and my-rank queries quickly.

**Functional:**
- Update a player's score after a game event.
- Get the top K players.
- Get a player's rank and the players near them.
- Support seasons, resets and regional or friends boards.

**Non functional:**
- Score updates visible within about a second.
- Fast reads.
- Score updates are idempotent (no double counting).
- The board can be rebuilt from durable data.

**Estimates:** Assume 50M players and 10,000 score updates per second at peak. A Redis sorted set entry is assumed about 100 bytes: 50M x 100 B = 5 GB, which fits in one node; top K and rank are O(log n).

**Api:**
- POST /scores {playerId, matchId, delta}
- GET /leaderboard?k=100
- GET /leaderboard/rank/{playerId}
- GET /leaderboard/around/{playerId}?n=5

**Data:** Durable score events and totals in a DB (source of truth). A Redis sorted set (ZSET) per board and season for ranking.

**Architecture:** Game servers send score events. The score service dedups by match id, updates the durable total, and then updates the sorted set (ZINCRBY or ZADD). Reads use ZREVRANGE for top K and ZREVRANK for a player's rank. If Redis is lost, the board is rebuilt from the DB.

**Hard parts:**
- Idempotent updates: dedup by event or match id before incrementing.
- Very large boards: shard by score range or region, or give approximate rank (percentile) for low-ranked players.
- Ties: a secondary key such as the earliest time reaching the score, encoded into the sort score.

**Tradeoffs:**
- Exact global rank (one big sorted set) versus sharded boards with approximate rank.
- Redis as the main store (fast, risk of loss) versus DB as source of truth with Redis as a view.

**Follow ups:**
- How do you handle a season reset?
- How do you build a friends leaderboard?
- How do you prevent cheating score updates?

<a id="hld-multi-region"></a>

### Multi-region evolution of an earlier design

**Goal:** Evolve an existing single-region design (for example the job platform or URL shortener) to run in several regions, for lower latency and survival of a full region outage.

**Functional:**
- Serve users from the nearest healthy region.
- Fail over when a region is down.
- Replicate data between regions.
- Keep data in its required region when the law demands it (residency).

**Non functional:**
- Defined RPO (data loss allowed) and RTO (recovery time).
- Clear consistency per operation (which ones must be strong).
- Low latency for local reads.
- Failover is tested regularly.

**Estimates:** Assume 3 regions with 100 to 150 ms latency between distant regions, so synchronous cross-region writes add at least one round trip per write. Each region needs spare capacity to absorb a failed region's traffic: with 3 regions, each runs at about 66% of the load it can handle at most.

**Api:**
- Same public API as before, behind global routing (GeoDNS or anycast).
- Internal replication streams (CDC or a log) between regions.
- Admin: failover and region drain commands.

**Data:** Choose per data type: home-region ownership (each user or tenant has one writable region), async replication to the others, or a globally consistent DB for the little data that truly needs it.

**Architecture:** Global routing sends users to a nearby region. Each record has a home region that accepts its writes; other regions serve reads from async replicas and forward writes home. On region failure, ownership moves to another region with fencing (an epoch number) so the old region cannot accept writes when it comes back.

**Hard parts:**
- Write conflicts: avoid them with a single owner per record; otherwise use conflict rules (last-writer-wins, CRDTs).
- Failover safety: fencing tokens or epochs to prevent split brain.
- Async replication loss: state the RPO; reconcile on recovery.

**Tradeoffs:**
- Active-passive (simple, idle capacity, slower failover) versus active-active (better latency and use, conflict handling).
- Sync replication (no loss, higher latency) versus async (fast, can lose recent writes).

**Follow ups:**
- What exactly happens to in-flight writes when a region dies?
- How do you test failover?
- How do you meet data-residency rules?

<a id="hld-id-generator"></a>

### Distributed unique ID generator (Snowflake)

**Goal:** Generate unique 64-bit IDs across many servers at high rate, without central coordination per ID, and roughly sorted by time.

**Functional:**
- Generate a unique ID on request.
- IDs are roughly time-ordered.
- IDs fit in 64 bits.
- Can extract the timestamp from an ID.

**Non functional:**
- Very high throughput and low latency.
- No single point of failure.
- Never produce duplicates, even after restarts.
- Works with many generator nodes.

**Estimates:** Snowflake layout: 1 sign bit, 41 bits of milliseconds since a custom epoch (about 69 years), 10 bits of machine id (1,024 nodes), 12 bits of sequence (4,096 IDs per millisecond per node). That gives about 4M IDs per second per node.

**Api:**
- NextId() -> long (library or service)
- GET /ids?count=100 (batch, if run as a service)

**Data:** No main data store. Each node needs a unique machine id, assigned by config or leased from a coordination service such as ZooKeeper or etcd.

**Architecture:** Each application node (or an ID service) builds IDs from the current time, its machine id and a per-millisecond sequence. If the sequence overflows within one millisecond, it waits for the next millisecond. The machine id is assigned at startup with a lease so two nodes never share it.

**Hard parts:**
- Clock moving backwards (NTP): refuse or wait until the clock passes the last timestamp; use a monotonic clock.
- Unique machine ids: a lease from a coordinator, re-checked on restart.
- Sequence overflow: block until the next millisecond.

**Tradeoffs:**
- Snowflake (64-bit, ordered, needs machine ids) versus UUID v4 (no coordination, 128-bit, random, bad for B-tree index locality).
- DB auto-increment or ticket server (simple, a bottleneck) versus Snowflake (scales, clock issues).

**Follow ups:**
- What happens if the clock goes back 5 ms?
- How do you assign machine ids in Kubernetes?
- Why not just use UUIDs (or UUID v7)?

<a id="hld-package-tracking"></a>

### Package tracking (Amazon-style OA sketch)

**Goal:** Record scan events for packages as they move through the delivery network, and show customers the current status and history.

**Functional:**
- Ingest scan events (picked up, at hub, out for delivery, delivered).
- Show current status and full history for a tracking number.
- Notify customers on key events.
- Estimate the delivery date.

**Non functional:**
- High write volume in bursts from scanners.
- Tracking reads are fast and very frequent.
- Events may arrive late or out of order.
- No scan event may be lost.

**Estimates:** Assume 20M packages per day x 10 scans = 200M events per day, about 2,300 per second, with peaks at shift changes. Assume 200 bytes per event: 40 GB per day. Reads: assume each package checked 5 times = 100M reads per day, about 1,200 per second.

**Api:**
- POST /scans {trackingId, eventType, location, scannedAt, scanId} (batched from devices)
- GET /track/{trackingId}
- Subscribe: POST /track/{trackingId}/subscribe

**Data:** Scan events in a wide-column store partitioned by tracking id and sorted by scan time (append-only). Current status in a key-value store or cache. Events also go to Kafka for notifications and ETA models.

**Architecture:** Scanner devices buffer events offline and upload batches to an ingest API, which writes to Kafka. Consumers dedup by scan id, store events, and update the current status only if the new event is later in the package's lifecycle. Tracking reads come from the cache. A notifier consumes key events and sends messages.

**Hard parts:**
- Out-of-order and late events: order by scan time and lifecycle stage, not arrival time.
- Duplicate scans from retries: dedup by scan id.
- Offline devices: local buffering and idempotent batch upload.

**Tradeoffs:**
- Store events only and compute status on read (simple) versus a materialised current status (fast reads, must handle ordering).
- Push notifications for every event (noisy) versus key milestones only.

**Follow ups:**
- How do you handle a delivered event that arrives before out for delivery?
- How do you compute the ETA?
- How do you scale for holiday peaks?

## LLD cards

<a id="lld-logger"></a>

### Logging framework

**Requirements:**
- Log messages with levels (Debug, Info, Warn, Error).
- Filter by a minimum level, early and cheaply.
- Write to several sinks (console, file, HTTP).
- Configurable format; structured properties.
- Logging must never block or crash the caller.

**Entities:** Logger (facade: Log(level, template, args)); LogEvent (time, level, message template, properties); ILogSink (Write(event)) with ConsoleSink, FileSink, HttpSink; IFormatter (text or JSON); AsyncSinkWrapper (bounded buffer plus background writer); LoggerConfig (min level, sinks).

**Patterns:** Strategy for formatters, Composite or a list for many sinks, Decorator for async buffering around a sink, Builder for configuration, Singleton lifetime through DI (not a static class).


**Concurrency:** Many threads log at once. Use a bounded channel (System.Threading.Channels) with one background consumer per sink, so sink writes are single-threaded. When the buffer is full, choose a policy: drop (and count drops) or block. Flush and drain on shutdown.

**Edge cases:**
- Sink is down: buffer with a limit, then drop; never throw to the caller.
- Shutdown: drain the buffer with a timeout.
- Bad format arguments: log the raw template instead of throwing.
- A sink that logs its own errors must not cause an infinite loop.

**Extension:** Add a new sink that sends Error logs to a chat channel, only at most once per minute for the same message.

<a id="lld-parking-lot"></a>

### Parking lot

**Requirements:**
- Several levels, each with spots of sizes small, medium and large.
- Park a vehicle in a suitable free spot and issue a ticket.
- Unpark with a ticket and calculate the fee.
- Show free spots per level and type.
- Different pricing rules (hourly, flat, weekend).

**Entities:** ParkingLot (levels, entry and exit); Level (spots, free lists per size); ParkingSpot (id, size, occupied vehicle); Vehicle (plate, size) with Car, Bike, Truck; Ticket (id, spot, entry time); ISpotAllocationStrategy (find a spot); IPricingStrategy (fee for a ticket); Payment.

**Patterns:** Strategy for spot allocation and pricing, Factory for vehicles or spots, Singleton lifetime for the lot through DI, Observer for display boards.

**States:** Spot: Free -> Occupied -> Free. Ticket: Active -> Paid -> Closed.

**Concurrency:** Two cars must not get the same spot. Keep a free-spot queue per size and take from it atomically (ConcurrentQueue, or a lock per level). In a DB, use a conditional update (occupied = false) to claim the spot.

**Edge cases:**
- Lot is full for that vehicle size.
- A bike can use a larger spot if the rule allows it.
- Lost ticket: charge a maximum daily fee.
- Duplicate exit with the same ticket.

**Extension:** Add electric vehicle charging spots that charge for electricity in addition to parking time.

<a id="lld-lru-cache"></a>

### LRU / LFU cache

**Requirements:**
- Get(key) and Put(key, value) in O(1).
- Fixed capacity; evict the least recently used entry when full.
- Optional TTL per entry.
- Option to switch to LFU eviction.

**Entities:** ICache<K,V> (Get, Put, Remove); LruCache<K,V> (Dictionary<K, LinkedListNode> plus a doubly linked list, most recent at the head); CacheEntry (key, value, expiresAt); IEvictionPolicy (LRU, LFU); IClock for testable expiry.

**Patterns:** Strategy for the eviction policy, Decorator to add TTL or metrics around a cache, Clock injection for tests.


**Concurrency:** Even a Get changes the list order, so a ReaderWriterLock does not help much. Use one lock around Get and Put (simple and correct), or shard the cache into N segments, each with its own lock, to reduce contention.

**Edge cases:**
- Capacity 0 or 1.
- Put on an existing key updates the value and moves it to the front.
- Expired entry is treated as a miss and removed.
- LFU tie: evict the least recently used among the least frequent.

**Extension:** Change eviction to LFU in O(1) using frequency buckets (a map from frequency to a linked list).

<a id="lld-rate-limiter-lld"></a>

### Rate limiter / API throttling with a controllable clock

**Requirements:**
- Decide allow or deny per key (user, API key, IP).
- Support token bucket and sliding window algorithms.
- Different limits per client tier.
- Testable with a controllable clock.
- Return how long to wait when denied.

**Entities:** IRateLimiter (TryAcquire(key) -> Decision); TokenBucketLimiter; SlidingWindowLimiter; TokenBucket (capacity, tokens, refillRate, lastRefill); IClock (Now) with SystemClock and FakeClock; IPolicyProvider (limits per key); IStateStore (in-memory or Redis).

**Patterns:** Strategy for the algorithm, Factory to build a limiter from a policy, Dependency injection of IClock so tests can move time forward.


**Concurrency:** Refill and take must be one atomic step per key. In memory, use a ConcurrentDictionary of buckets and lock each bucket. For a distributed limiter, run the refill and take in one Redis Lua script.

**Edge cases:**
- Burst exactly at capacity.
- Clock going backwards: ignore a negative elapsed time.
- Many idle keys: evict stale buckets to bound memory.
- Request cost greater than capacity: always deny.

**Extension:** Add per-tenant limits plus a global limit, and allow a request only if both allow it.

<a id="lld-splitwise"></a>

### Split-expense service (Splitwise)

**Requirements:**
- Users add expenses in a group.
- Split equally, by exact amounts, or by percentage.
- Show who owes whom and each balance.
- Record settlements.
- Simplify debts to fewer transfers.

**Entities:** User; Group (members, expenses); Expense (payer, amount, splits); Split (user, amount) with EqualSplit, ExactSplit, PercentSplit; ISplitStrategy (validate and compute shares); BalanceSheet (net balance per pair or per user); Settlement; DebtSimplifier.

**Patterns:** Strategy for split types, Factory to create the split from input, Observer to notify users of new expenses.


**Concurrency:** Two expenses added at the same time must both update balances. Lock per group or store balances in a DB transaction. Use decimal (or integer paise) for money, never double.

**Edge cases:**
- Rounding: 100 split three ways; give the extra paisa to one person deterministically.
- Percentages that do not add up to 100.
- A payer who is not in the group.
- Deleting or editing an expense must reverse its balance effects.

**Extension:** Support expenses in several currencies, converting to the group's base currency at the expense date.

<a id="lld-elevator"></a>

### Elevator system

**Requirements:**
- N elevators serve M floors.
- Hall calls (up or down) and car calls (target floor).
- Choose which elevator serves a call.
- Doors open and close safely; capacity limit.
- Emergency stop and maintenance mode.

**Entities:** ElevatorSystem (controller); ElevatorCar (current floor, direction, state, stop queues); Request (floor, direction or target); IScheduler (assign a request to a car) with NearestCar or LOOK strategies; Door; Display; Button.

**Patterns:** State for each car (Idle, MovingUp, MovingDown, DoorsOpen, Maintenance), Strategy for scheduling, Observer for displays, Command for requests.

**States:** Idle -> MovingUp or MovingDown -> Stopped (DoorsOpen) -> Idle or keep moving; any state -> Maintenance or Emergency. Never move while the doors are open.

**Concurrency:** Requests arrive from many buttons while cars move. Use a thread-safe request queue per car and one control loop per car that owns its state. The dispatcher assigns requests under a lock or through a message queue.

**Edge cases:**
- A request for the current floor while the doors are open.
- A request in the opposite direction while moving.
- Overweight: keep the doors open.
- All cars in maintenance.

**Extension:** Add a VIP or fire-service mode where one car goes directly to a floor and ignores other calls.

<a id="lld-seat-reservation"></a>

### Seat reservation with seat locking (BookMyShow)

**Requirements:**
- Show seats for a show with their status.
- Hold chosen seats for a few minutes.
- Confirm a hold into a booking after payment.
- Release expired holds automatically.
- Never let two users book the same seat.

**Entities:** Show; Seat (id, row, type, status); SeatHold (id, user, seats, expiresAt); Booking; ISeatRepository (TryHold, Confirm, Release); IPaymentGateway; HoldExpiryService; IClock.

**Patterns:** State for seat status, Strategy for pricing by seat type, Repository for persistence, Observer to push seat-map changes.

**States:** Seat: Available -> Held -> Booked; Held -> Available on expiry or cancel. Booking: Pending -> Confirmed or Failed -> Cancelled.

**Concurrency:** Holding several seats must be all or nothing. In memory, lock the show (or the seats in a fixed sorted order to avoid deadlock). In a DB, use one conditional update (status = Available or hold expired) and check the affected row count.

**Edge cases:**
- Two users select the same seat at the same time.
- Payment arrives after the hold expired.
- Duplicate confirm calls for the same hold.
- A user holds many seats to block others: limit seats per hold.

**Extension:** Add a waitlist so that when a hold expires the seat is offered first to the next waiting user.

<a id="lld-task-scheduler"></a>

### Task scheduler

**Requirements:**
- Schedule one-time and recurring tasks (delay or cron).
- Run due tasks on a worker pool.
- Retry failures with backoff.
- Cancel tasks; query status.
- Tasks must not run twice at the same time.

**Entities:** ITask (Execute); TaskDefinition (id, schedule, payload, retry policy); ITrigger (NextRunTime) with OneTimeTrigger and CronTrigger; Scheduler (priority queue by next run time); WorkerPool / Executor; IRetryPolicy; IClock; ITaskStore (persistence and claims).

**Patterns:** Command for tasks, Strategy for triggers and retry policies, Observer for status events, Producer-consumer between the scheduler and workers.

**States:** Scheduled -> Running -> Succeeded or Failed -> (Retrying -> Running) -> Dead; any waiting state -> Cancelled.

**Concurrency:** The scheduler thread waits on a min-heap of next run times and hands due tasks to workers through a bounded channel. With many scheduler nodes, claim each due task atomically in the store (a conditional update with a lease) so only one node runs it.

**Edge cases:**
- The next run arrives while the previous run is still going: skip, queue or allow overlap by policy.
- Missed runs after downtime: run once or catch up.
- Time zone and DST changes for cron schedules.
- Cancelling a task that is already running.

**Extension:** Add task dependencies: task B runs only after task A succeeds.

<a id="lld-vending-machine"></a>

### Vending machine (state pattern)

**Requirements:**
- Show products and prices; track stock.
- Accept coins and notes; track inserted money.
- Select a product, dispense it, return change.
- Cancel and refund.
- Admin restocks products and cash.

**Entities:** VendingMachine (context: current state, inventory, balance); IState with IdleState, HasMoneyState, DispensingState, OutOfServiceState; Inventory (slot -> product and count); Product; CashBox (coins for change); IChangeCalculator.

**Patterns:** State for the machine's behaviour, Strategy for change calculation, Singleton lifetime for the machine instance.

**States:** Idle -> (insert money) HasMoney -> (select valid product with enough money) Dispensing -> Idle; HasMoney -> (cancel) Idle with refund; any state -> OutOfService.

**Concurrency:** A physical machine has one user at a time, so a single lock around each operation is enough. Keep money and stock invariants: both change together or neither changes.

**Edge cases:**
- Selected product is out of stock.
- Not enough money inserted.
- Exact change cannot be given: refuse the sale or refund.
- Dispense fails after payment: refund the money.

**Extension:** Add card and UPI payment, where payment approval is asynchronous.

<a id="lld-atm"></a>

### ATM

**Requirements:**
- Insert card and verify the PIN.
- Check balance, withdraw cash, deposit.
- Enforce daily limits.
- Dispense cash with available notes.
- Print a receipt; handle bank errors.

**Entities:** ATM (context and state); IAtmState with Idle, CardInserted, Authenticated, Transaction states; Card; ICardReader; IBankGateway (Authenticate, Debit, Reverse); CashDispenser (note counts); IDispenseStrategy; Transaction (id, type, amount, status); ReceiptPrinter.

**Patterns:** State for the session flow, Strategy for note dispensing (fewest notes), Chain of Responsibility for note denominations, Adapter for the bank network.

**States:** Idle -> CardInserted -> (PIN ok) Authenticated -> (choose) Withdrawing -> Dispensing -> Authenticated or Idle (eject card); 3 wrong PINs -> card retained -> Idle.

**Concurrency:** One session per ATM, so local logic is single-threaded. The account balance lives in the bank; the debit must be idempotent with a transaction id, and the ATM reverses it if dispensing fails.

**Edge cases:**
- Bank debit succeeds but cash dispense fails: send a reversal.
- Bank times out: the result is unknown, so reconcile with the transaction id.
- ATM has no notes that make the requested amount.
- Card left in the machine: retain it after a timeout.

**Extension:** Add cardless withdrawal using a one-time code from the bank's mobile app.

<a id="lld-tic-tac-toe"></a>

### Tic-tac-toe

**Requirements:**
- Two players take turns on an N x N board.
- Validate moves (inside the board, cell empty, correct turn).
- Detect a win (row, column, diagonal) or a draw.
- Support human or computer players.

**Entities:** Game (board, players, current turn, status); Board (cells, Place, IsFull); Cell; Player (name, symbol) with HumanPlayer and BotPlayer; IWinChecker; IMoveStrategy for bots.

**Patterns:** Strategy for bot moves and win checking, Factory to create players, State or a simple enum for game status.

**States:** InProgress -> Won(player) or Draw.

**Concurrency:** Usually single-threaded. For an online version, process moves for one game one at a time (a lock per game or one actor per game).

**Edge cases:**
- Move on an occupied cell.
- Move after the game is over.
- Move by the wrong player.
- Check a win in O(1) per move using row, column and diagonal counters.

**Extension:** Support an N x N board where a player needs K in a row to win.

<a id="lld-chess"></a>

### Chess

**Requirements:**
- Two players, standard board and pieces.
- Validate moves for each piece type.
- Detect check, checkmate and stalemate.
- Special moves: castling, en passant, promotion.
- Move history and undo.

**Entities:** Game (board, players, turn, status, history); Board (8x8 squares, GetPiece, MovePiece); Position; Piece (color) with King, Queen, Rook, Bishop, Knight, Pawn, each giving its candidate moves; Move (from, to, piece, captured, special type); MoveValidator (checks that a move does not leave own king in check).

**Patterns:** Strategy or polymorphism for piece movement, Command for moves (supports undo), Memento for game snapshots, Factory for the initial set-up.

**States:** Active -> Check -> Active; Active -> Checkmate, Stalemate, Resigned or Draw (game over).

**Concurrency:** Game logic is single-threaded. For online play, apply moves for one game in sequence and reject moves that arrive for the wrong turn.

**Edge cases:**
- A move that leaves your own king in check is illegal.
- Castling through an attacked square.
- Pawn promotion choice.
- Draw by threefold repetition or the 50-move rule.

**Extension:** Add a chess clock where each player has a time limit and loses on timeout.

<a id="lld-snake-ladder"></a>

### Snake and ladder

**Requirements:**
- Board of 100 cells with snakes and ladders.
- Several players take turns rolling a die.
- Snakes move a player down; ladders move them up.
- First to reach exactly 100 wins.

**Entities:** Game (players queue, board, dice, winner); Board (size, jumps map from start to end); Jump (start, end) used for both snakes and ladders; Player (name, position); IDice (Roll) with RandomDice and FixedDice for tests.

**Patterns:** Strategy for dice (injectable for tests), Builder or Factory for board configuration, Observer to show moves.

**States:** NotStarted -> InProgress -> Finished.

**Concurrency:** Single-threaded game loop; no shared state concerns.

**Edge cases:**
- Roll that overshoots 100: stay in place.
- Snake head at the end of a ladder (chained jumps).
- Invalid config: a jump cycle, or a snake on cell 100.
- Rolling a 6 gives an extra turn (if the rule is chosen).

**Extension:** Allow two dice and a rule that three 6s in a row sends the player back to the start.

<a id="lld-library"></a>

### Library management system

**Requirements:**
- Search books by title, author or subject.
- Members borrow and return book copies.
- Limits on borrowed books and due dates.
- Fines for late returns.
- Reserve a book when no copy is free.

**Entities:** BookTitle (ISBN, title, authors); BookCopy (barcode, status); Member (limits, loans); Librarian; Loan (copy, member, due date, return date); Reservation (title, member, queue position); FinePolicy; Catalog (search).

**Patterns:** Strategy for fine calculation, Observer to notify a member when a reserved book is free, Repository for storage, Facade for library operations.

**States:** BookCopy: Available -> Loaned -> Available; Available -> Reserved (held for a member) -> Loaned; any -> Lost.

**Concurrency:** Two members must not borrow the same copy. Use a conditional status update or a lock per copy. Reservation queue order must be first come, first served.

**Edge cases:**
- Returning a book twice.
- Member at the borrowing limit or with unpaid fines.
- A reserved copy not collected in time goes to the next member.
- Renewing a book that someone has reserved.

**Extension:** Add e-books with a licence limit on how many members can borrow at the same time.

<a id="lld-hotel-booking-lld"></a>

### Hotel booking

**Requirements:**
- Search room availability for a date range.
- Book, modify and cancel a booking.
- Room types with different prices.
- Check-in and check-out.
- No overlapping bookings for the same room.

**Entities:** Hotel; RoomType (capacity, base price); Room (number, type); DateRange (overlap check); Booking (guest, room or room type, range, status); Guest; IPricingStrategy (seasonal, weekend); IAvailabilityRepository; Payment.

**Patterns:** Strategy for pricing, State for booking status, Repository for inventory, Factory for booking creation.

**States:** Booking: Held -> Confirmed -> CheckedIn -> CheckedOut; Held -> Expired; Confirmed -> Cancelled.

**Concurrency:** Two bookings for overlapping dates on the same room must not both succeed. Lock per room or room type, or use per-night inventory rows updated with a conditional update inside one transaction.

**Edge cases:**
- Check-out date equals another booking's check-in date (not an overlap).
- Cancellation fee depends on time before arrival.
- Early check-out or extension.
- Hold expires during payment.

**Extension:** Add a loyalty programme that gives a discount and free upgrades when available.

<a id="lld-notification-lld"></a>

### Notification system

**Requirements:**
- Send notifications through email, SMS and push.
- Respect user preferences and opt-outs.
- Use templates with parameters.
- Retry failures; avoid duplicates.
- Track delivery status.

**Entities:** NotificationService (orchestrator); NotificationRequest (user, template, params, channels, idempotency key); INotificationChannel (Send) with EmailChannel, SmsChannel, PushChannel; ITemplateRenderer; IPreferenceRepository; DeliveryAttempt (status, error); IRetryPolicy; provider adapters.

**Patterns:** Strategy for channels, Adapter for third-party providers, Template Method or Builder for messages, Observer for status updates, Decorator for retry and logging around a channel.

**States:** Delivery: Pending -> Sending -> Sent -> Delivered; Sending -> Failed -> Retrying -> Sent or Dead.

**Concurrency:** Sending runs on background workers. Dedup with the idempotency key stored atomically (unique constraint or ConcurrentDictionary.TryAdd). Each channel has its own queue so one slow provider does not block the others.

**Edge cases:**
- User has opted out of a channel.
- Missing template parameter.
- Provider timeout: the result is unknown, so avoid a blind resend.
- Same request submitted twice.

**Extension:** Add a WhatsApp channel and a fallback rule: if push fails, send SMS.

<a id="lld-pub-sub"></a>

### Pub/sub message broker (in-memory)

**Requirements:**
- Create topics; publish messages to a topic.
- Several subscribers per topic each get every message.
- Subscribe and unsubscribe at any time.
- Acknowledgements and redelivery on failure.
- A slow subscriber must not block the others.

**Entities:** Broker (topics registry); Topic (name, subscriptions); Message (id, payload, timestamp); Publisher; ISubscriber (OnMessage); Subscription (subscriber, own queue, offset, retry policy); DeadLetterQueue.

**Patterns:** Observer is the core idea, Mediator (the broker sits between publishers and subscribers), Producer-consumer per subscription, Strategy for delivery or retry policy.

**States:** Message per subscription: Queued -> Delivered -> Acked; Delivered -> (no ack or error) Retrying -> Dead.

**Concurrency:** Each subscription has its own bounded queue (Channel<T>) and its own consumer task, so subscribers are isolated. Copy the subscriber list on publish (copy-on-write or ImmutableList) so unsubscribe during publish is safe.

**Edge cases:**
- Subscriber throws an exception: retry, then move to the DLQ.
- Slow subscriber fills its queue: drop the oldest, block the publisher or disconnect, by policy.
- Unsubscribe while a message is being delivered.
- Duplicate delivery after a retry: subscribers must be idempotent.

**Extension:** Add message filtering so a subscriber only receives messages that match an attribute filter.

<a id="lld-file-system"></a>

### In-memory file system

**Requirements:**
- Create, read, write and delete files and directories.
- Navigate by path (mkdir -p, ls, cd).
- Move and rename.
- File sizes and directory size.
- Optional permissions.

**Entities:** FileSystemNode (name, parent, created, abstract); File (content, size); Directory (children dictionary by name); PathResolver (splits and normalises paths, handles . and ..); FileSystem (root, operations); IPermissionPolicy.

**Patterns:** Composite (Directory contains nodes; size is computed recursively), Iterator or Visitor for walks such as search or size, Proxy for permission checks.


**Concurrency:** Use a reader-writer lock: many readers, one writer. A move touches two directories, so lock them in a fixed order (for example by path) to avoid deadlock.

**Edge cases:**
- Moving a directory into its own subdirectory (cycle).
- Duplicate names in one directory.
- Deleting a non-empty directory without the recursive flag.
- Paths with //, trailing / or .. above the root.

**Extension:** Add a find command that searches by name pattern and minimum size.

<a id="lld-food-delivery-lld"></a>

### Food delivery app

**Requirements:**
- Browse restaurants and menus.
- Place an order with items and pay.
- Restaurant accepts and prepares; courier picks up and delivers.
- Track order status.
- Cancel with refund rules.

**Entities:** Customer; Restaurant (menu, open hours); MenuItem; Cart; Order (items, totals, status); OrderStateMachine; Courier (location, availability); ICourierAssignmentStrategy; IPaymentGateway; INotificationService.

**Patterns:** State for the order lifecycle, Strategy for courier assignment and pricing, Observer for status notifications, Factory for orders.

**States:** Placed -> Paid -> Accepted -> Preparing -> ReadyForPickup -> PickedUp -> Delivered; Placed or Paid -> Cancelled (refund); Paid -> RejectedByRestaurant (refund).

**Concurrency:** Status changes must follow allowed transitions; use a version number (optimistic concurrency) on the order. Courier assignment must not give one courier two orders at once: a conditional update on courier status.

**Edge cases:**
- Restaurant rejects after payment: automatic refund.
- Item becomes unavailable after the order.
- Customer cancels while food is being prepared.
- Courier cancels: reassign.

**Extension:** Add scheduled orders that are sent to the restaurant 45 minutes before the delivery time.

<a id="lld-traffic-light"></a>

### Traffic light controller

**Requirements:**
- Control lights for an intersection with several roads.
- Cycle Green -> Yellow -> Red with set durations.
- Never show green to conflicting directions.
- Pedestrian crossing requests.
- Emergency vehicle override.

**Entities:** Intersection (signals, controller); TrafficSignal (direction, current light); LightState (Green, Yellow, Red); SignalController (runs the cycle); IPhasePlan (order and durations of phases); PedestrianButton; EmergencyHandler; IClock or timer.

**Patterns:** State for each light, Strategy for timing plans (fixed or traffic-based), Observer for sensors and buttons, Singleton lifetime per intersection controller.

**States:** Signal: Red -> Green -> Yellow -> Red. Controller phases: NorthSouthGreen -> NorthSouthYellow -> AllRed -> EastWestGreen -> EastWestYellow -> AllRed; any -> EmergencyMode.

**Concurrency:** One controller thread owns all state changes; buttons and sensors only post events to its queue. This makes the safety rule (no conflicting greens) easy to keep.

**Edge cases:**
- Pedestrian button pressed many times.
- Emergency vehicles from two directions.
- Power failure or fault: flash red in all directions.
- Changing the timing plan in the middle of a cycle.

**Extension:** Add sensors that extend the green time when many cars are waiting.

<a id="lld-meeting-scheduler"></a>

### Meeting room scheduler

**Requirements:**
- Book a meeting room for a time interval.
- Find free rooms by time and capacity.
- Invite participants and notify them.
- Cancel and reschedule.
- No overlapping bookings in one room.

**Entities:** MeetingRoom (id, capacity, features); Interval (start, end, Overlaps); Meeting (organiser, participants, room, interval); RoomCalendar (sorted bookings per room); Scheduler (find and book); IRoomSelectionStrategy (smallest room that fits); INotifier.

**Patterns:** Strategy for room selection, Observer for notifications to participants, Repository for calendars.

**States:** Meeting: Scheduled -> Cancelled, or Scheduled -> Completed.

**Concurrency:** Two people booking the same room for overlapping times: check and insert under a lock per room. A sorted structure (SortedSet or interval tree) gives an O(log n) overlap check.

**Edge cases:**
- A meeting ending at 10:00 and another starting at 10:00 do not overlap.
- No room has enough capacity.
- Recurring meetings that conflict on some dates.
- Different time zones of participants.

**Extension:** Suggest the earliest time slot when all participants and a room are free.

<a id="lld-chat-lld"></a>

### Chat application

**Requirements:**
- One-to-one and group chats.
- Send messages; keep history in order.
- Delivery and read receipts.
- Online and offline status.
- Add or remove group members.

**Entities:** User; Conversation (id, members) with DirectChat and GroupChat; Message (id, clientId, sender, content, seq, timestamp); MessageStatus per recipient; ChatService (send, history); IMessageStore; IConnectionManager (online users and their sessions); PresenceService.

**Patterns:** Observer for delivering messages to online sessions, Mediator (the chat service routes between users), Strategy for message types (text, image), Factory for conversations.

**States:** Message per recipient: Sent -> Delivered -> Read.

**Concurrency:** Assign the sequence number per conversation atomically (Interlocked.Increment or a lock per conversation). Use the client message id to ignore duplicate sends. Sessions are kept in a ConcurrentDictionary.

**Edge cases:**
- User offline: store the message and deliver it on reconnect.
- Duplicate send after a network retry.
- Removed member must not receive new group messages.
- Same user with several devices.

**Extension:** Add message edit and delete-for-everyone within 15 minutes of sending.

<a id="lld-reddit-lld"></a>

### Community discussion platform (Reddit-like)

**Requirements:**
- Users create communities and posts.
- Nested comments.
- Upvote and downvote, one vote per user per item.
- Sort by hot, new and top.
- Moderators remove posts and ban users.

**Entities:** User; Community (moderators, rules); Post (author, community, score); Comment (parent, children, score); Vote (user, item, value); IVotable (shared by post and comment); IRankingStrategy (Hot, New, Top); ModerationService.

**Patterns:** Composite for comment trees, Strategy for ranking, Observer for notifications on replies, Chain of Responsibility for moderation or spam filters.

**States:** Post: Active -> Removed or Locked -> Archived.

**Concurrency:** Votes on a popular post come at the same time. Store one vote per (user, item) and update the score atomically by the difference (Interlocked.Add, or SQL score = score + delta).

**Edge cases:**
- User changes an upvote to a downvote (difference of -2).
- Voting on a deleted or locked post.
- Very deep comment nesting.
- Banned user tries to post.

**Extension:** Add awards that users buy and give to posts, with the cost taken from a coin balance.

<a id="lld-linkedin-lld"></a>

### LinkedIn (connections, feed)

**Requirements:**
- User profiles with experience and skills.
- Send, accept and reject connection requests.
- Post updates; see a feed from connections.
- Search people.
- See degrees of connection (1st, 2nd).

**Entities:** User; Profile (experience, education, skills); ConnectionRequest (from, to, status); ConnectionGraph (adjacency lists); Post; FeedService (builds the feed); IFeedRankingStrategy; SearchService; NotificationService.

**Patterns:** Observer for notifications, Strategy for feed ranking, Builder for profiles, Repository for the graph.

**States:** ConnectionRequest: Pending -> Accepted or Rejected or Withdrawn.

**Concurrency:** Two users send requests to each other at the same time: treat it as an accept, using one canonical key (smaller id, larger id) with a unique constraint. Feed building reads can run in parallel.

**Edge cases:**
- Request to an existing connection.
- Request to yourself.
- Blocked users.
- Second-degree search on a user with many connections: limit the BFS depth and size.

**Extension:** Add 'People you may know' based on the number of mutual connections.

<a id="lld-calendar"></a>

### Calendar application

**Requirements:**
- Create, update and delete events.
- Recurring events (daily, weekly, custom).
- Invite attendees who accept or decline.
- Reminders before events.
- Show a day, week or month view across time zones.

**Entities:** Calendar (owner, events); Event (title, start, end, time zone, organiser, attendees); RecurrenceRule (frequency, interval, until, exceptions); Invitation (attendee, response); Reminder; ICalendarRepository; ReminderScheduler; IClock.

**Patterns:** Strategy or Iterator for expanding recurrence rules into occurrences, Observer for invitation responses and reminders, Builder for complex events.

**States:** Invitation: Pending -> Accepted, Declined or Tentative.

**Concurrency:** Two people edit the same event: optimistic concurrency with a version number. Reminders fire from a scheduler that claims each reminder once.

**Edge cases:**
- DST changes in a recurring event (store the time zone, not just UTC).
- Editing one occurrence versus all future occurrences.
- All-day events across time zones.
- Overlapping events (allowed, but show a warning).

**Extension:** Add a 'find a time' feature that shows slots when all attendees are free.

<a id="lld-voting"></a>

### Online voting system

**Requirements:**
- Create an election with candidates and a time window.
- Registered voters vote once.
- Count results after the election closes.
- Audit trail.
- Voter privacy: a vote cannot be linked to the voter (if required).

**Entities:** Election (candidates, start, end, status); Candidate; Voter (id, eligibility); Ballot (election, candidate, receipt id); VoterRegistry (has voted flag per election); VotingService; TallyService; AuditLog.

**Patterns:** State for election status, Strategy for counting method (first past the post, ranked choice), Observer for result publication.

**States:** Election: Draft -> Open -> Closed -> Counted -> Published.

**Concurrency:** Exactly one vote per voter: mark the voter as voted and store the ballot in one transaction, with a unique constraint on (election, voter) in the registry. Store ballots separately from voter ids for privacy.

**Edge cases:**
- Double vote at the same time from two devices.
- Vote after the election closes.
- Ineligible voter.
- Tie between candidates.

**Extension:** Support ranked-choice voting with instant run-off counting.

<a id="lld-url-shortener-lld"></a>

### URL shortener

**Requirements:**
- Create a short code for a long URL.
- Resolve a code to the long URL.
- Custom alias and expiry.
- Count clicks.
- Delete a link.

**Entities:** UrlMapping (code, longUrl, owner, createdAt, expiresAt, clicks); IShortCodeGenerator with Base62CounterGenerator and RandomGenerator; IUrlRepository; UrlShortenerService (Shorten, Resolve); IClock; IUrlValidator.

**Patterns:** Strategy for code generation, Repository for storage, Decorator for caching the repository, Factory for mappings.

**States:** Link: Active -> Expired or Deleted.

**Concurrency:** Generating unique codes: an atomic counter (Interlocked.Increment) or random codes with an insert-if-absent (ConcurrentDictionary.TryAdd or a unique constraint) and retry on collision.

**Edge cases:**
- Custom alias already taken.
- Expired link returns 404 or 410.
- Invalid or malicious URL.
- Same long URL shortened twice: new code or reuse, by policy.

**Extension:** Add per-link analytics: clicks per day and per country.

<a id="lld-uber-lld"></a>

### Ride sharing (Uber)

**Requirements:**
- Riders request rides; drivers go online and offline.
- Match a ride with a nearby available driver.
- Driver accepts or declines.
- Trip lifecycle from start to end, with fare calculation.
- Ratings.

**Entities:** Rider; Driver (location, status, vehicle); Location; RideRequest; Trip (rider, driver, status, fare); IDriverMatchingStrategy (nearest, best rating); IFareStrategy (base, surge); ILocationIndex (nearby drivers); TripService; PaymentService.

**Patterns:** Strategy for matching and fare, State for trip status, Observer for location and status updates.

**States:** Trip: Requested -> DriverAssigned -> DriverArrived -> InProgress -> Completed; Requested or DriverAssigned -> Cancelled. Driver: Offline -> Available -> OnTrip -> Available.

**Concurrency:** One driver must not be assigned to two trips: compare-and-set on the driver status (Available to Assigned) under a lock per driver, or a conditional update in the DB.

**Edge cases:**
- No driver nearby.
- Driver does not respond in time: offer to the next driver.
- Rider cancels after the driver is assigned (cancellation fee).
- Driver's location update is stale.

**Extension:** Add pool rides where one driver carries two riders with routes that match.

<a id="lld-airline"></a>

### Airline management system

**Requirements:**
- Search flights by route and date.
- Book seats for passengers; choose seats.
- Cancel and refund.
- Manage flights, aircraft and crew.
- Check-in and boarding pass.

**Entities:** Airport; Flight (number, route, schedule); FlightInstance (date, aircraft, seat map, status); Seat (number, class, status); Booking or Reservation (PNR, passengers, seats, status); Passenger; Payment; Crew; IPricingStrategy; SearchService.

**Patterns:** Strategy for pricing and refunds, State for booking and flight status, Observer to notify passengers of delays, Builder for itineraries.

**States:** Booking: Pending -> Confirmed -> CheckedIn -> Boarded; Confirmed -> Cancelled. Flight: Scheduled -> Delayed -> Departed -> Landed, or Cancelled.

**Concurrency:** Seat selection: an atomic hold on the seat (conditional update or a lock per flight instance). Two passengers must not get the same seat.

**Edge cases:**
- Flight cancelled: rebook or refund all passengers.
- Overbooking policy.
- Multi-leg booking where one leg fails.
- Name change on a ticket.

**Extension:** Add a frequent flyer programme with miles earned and an upgrade request queue.

<a id="lld-restaurant"></a>

### Restaurant management system

**Requirements:**
- Manage tables and reservations.
- Take orders per table.
- Send order items to the kitchen.
- Generate the bill and take payment.
- Manage the menu and staff.

**Entities:** Restaurant; Table (capacity, status); Reservation; Menu and MenuItem; Order (table, items, status); OrderItem (item, quantity, notes, status); KitchenQueue; Bill (items, tax, tip, total); Payment; Waiter; Chef.

**Patterns:** Command for order items sent to the kitchen, Observer to tell the waiter when food is ready, Strategy for billing (discounts, split bill), State for table and order status.

**States:** Table: Free -> Reserved -> Occupied -> NeedsCleaning -> Free. OrderItem: Ordered -> Cooking -> Ready -> Served.

**Concurrency:** Several waiters add items to the same order; lock per order. The kitchen queue is a thread-safe producer-consumer queue.

**Edge cases:**
- Item runs out after it is ordered.
- Split the bill between guests.
- Cancel an item already being cooked.
- Walk-in when all tables are reserved.

**Extension:** Add online orders for takeaway that go into the same kitchen queue with a pickup time.

<a id="lld-car-rental"></a>

### Car rental system

**Requirements:**
- Search available cars by location, dates and type.
- Reserve a car for a date range.
- Pick up and return; calculate the bill (with extras and late fees).
- Cancel a reservation.
- Manage the fleet across branches.

**Entities:** Branch; Vehicle (type, plate, status, branch); Reservation (customer, vehicle or vehicle type, date range, status); Customer (licence); RentalAgreement (actual pickup and return, mileage); IPricingStrategy (daily, weekly, seasonal); AddOn (GPS, insurance); Invoice.

**Patterns:** Strategy for pricing, Decorator for add-ons on top of the base price, State for reservation and vehicle status, Factory for vehicle types.

**States:** Reservation: Booked -> PickedUp -> Returned -> Closed; Booked -> Cancelled or NoShow. Vehicle: Available -> Reserved -> Rented -> InMaintenance -> Available.

**Concurrency:** Two customers must not reserve the same car for overlapping dates: lock per vehicle (or per branch and type), check overlap, then insert.

**Edge cases:**
- Late return conflicts with the next reservation.
- Return to a different branch (one-way fee).
- Car damaged at return.
- Customer's licence expired.

**Extension:** Add a rule that reservations are by car type and the actual car is assigned at pickup.

<a id="lld-order-management"></a>

### Amazon order management

**Requirements:**
- Place an order from a cart.
- Reserve inventory and take payment.
- Track order status through shipping and delivery.
- Cancel, return and refund.
- Split one order into several shipments.

**Entities:** Order (id, customer, lines, totals, status); OrderLine (product, quantity, price); Shipment (lines, carrier, tracking id); IInventoryService (Reserve, Release, Commit); IPaymentService; OrderStateMachine; IOrderRepository; ReturnRequest.

**Patterns:** State for the order lifecycle, Saga or Command for the checkout steps with compensation, Observer for events (OrderPlaced, OrderShipped), Strategy for shipping options.

**States:** Created -> PaymentPending -> Paid -> Packed -> Shipped -> Delivered; Created or PaymentPending -> Cancelled; Paid -> Cancelled (refund); Delivered -> ReturnRequested -> Returned -> Refunded.

**Concurrency:** Inventory reservation must not oversell: conditional decrement (available >= quantity). Order status changes use optimistic concurrency (version). Place-order is idempotent with an idempotency key.

**Edge cases:**
- Payment fails after stock is reserved: release the stock.
- Partial stock: split the order or reject it.
- Cancel after shipping: becomes a return.
- Duplicate place-order request.

**Extension:** Add partial cancellation of one line in a multi-line order with a partial refund.

<a id="lld-cricbuzz"></a>

### Live cricket score (CricBuzz)

**Requirements:**
- Show live scores for many matches.
- Scorers enter ball-by-ball events.
- Compute scorecards (runs, wickets, overs, batting and bowling figures).
- Commentary feed.
- Push updates to subscribed users.

**Entities:** Match (teams, format, innings, status); Team; Player; Innings (batting team, overs, score); Over; Ball (bowler, batsman, runs, extras, wicket); ScoreCard (derived); IScoreUpdater (applies a ball); MatchSubscription; NotificationService.

**Patterns:** Observer for live updates to subscribers, Command for ball events (supports undo of a wrong entry), Strategy for match formats (T20, ODI, Test rules), Builder for scorecards.

**States:** Match: Scheduled -> Live -> InningsBreak -> Live -> Completed; Live -> Suspended (rain) -> Live; any -> Abandoned.

**Concurrency:** Ball events for one match are applied one by one in sequence order (a single writer per match). Many readers read the latest scorecard snapshot, which is replaced atomically.

**Edge cases:**
- Correcting a wrongly entered ball.
- Extras: wide and no-ball do not count as a legal delivery.
- Rain reduces overs (target revision).
- Super over after a tie.

**Extension:** Add a win-probability number updated after every ball.

<a id="lld-truecaller"></a>

### Caller ID (Truecaller)

**Requirements:**
- Look up a phone number to show the caller's name.
- Users report numbers as spam.
- Block numbers.
- Users can upload contacts (with consent) to improve name data.
- Users can update their own name.

**Entities:** PhoneNumber (normalised E.164); User (own number, profile); ContactEntry (owner, number, name); NameResolver (picks the best name from many sources); SpamReport (reporter, number, category); SpamScorer; BlockList (per user); LookupService.

**Patterns:** Strategy for name resolution and spam scoring, Chain of Responsibility for lookup sources (own profile, then verified business, then crowd-sourced), Decorator for caching lookups.


**Concurrency:** Spam report counts update at the same time from many users: atomic increments and one report per (reporter, number). Lookups are read-only and run in parallel.

**Edge cases:**
- The same number in many formats: normalise before storing.
- Fake mass reports by one user: limit and dedup.
- Number owner changes (recycled numbers).
- Privacy: a user asks to be removed.

**Extension:** Add verified business numbers with logos that override crowd-sourced names.

<a id="lld-stock-exchange"></a>

### Stock exchange order matching

**Requirements:**
- Place buy and sell orders (limit and market).
- Match orders by price-time priority.
- Generate trades.
- Cancel or modify open orders.
- Show the order book (best bid and ask).

**Entities:** Order (id, side, type, price, quantity, filled, timestamp, status); OrderBook per symbol (bids: max-ordered price levels, asks: min-ordered price levels, each a FIFO queue); MatchingEngine; Trade (buy order, sell order, price, quantity); IOrderValidator; TradeListener.

**Patterns:** Strategy for order types, Observer for trade and market-data events, Command for order requests.

**States:** Order: New -> PartiallyFilled -> Filled; New or PartiallyFilled -> Cancelled; New -> Rejected.

**Concurrency:** One matching thread per symbol (single writer) so matching is deterministic. Orders go into a queue per symbol; market data is published to readers from snapshots.

**Edge cases:**
- Market order with no liquidity on the other side.
- Partial fill across many price levels.
- Cancel arrives after the order was filled.
- Self-trade (same user on both sides).

**Extension:** Add stop-loss orders that become market orders when the last trade price crosses the stop price.

<a id="lld-lms"></a>

### Learning management system

**Requirements:**
- Instructors create courses with modules, lessons and quizzes.
- Students enrol and track progress.
- Quiz submission and grading.
- Certificates on completion.
- Roles: admin, instructor, student.

**Entities:** User with Student, Instructor, Admin roles; Course (modules); Module (lessons); Lesson (video, text); Quiz (questions); Question; Enrollment (student, course, progress, status); Submission (answers, score); IGradingStrategy; CertificateService.

**Patterns:** Composite for course structure, Strategy for grading (auto, manual), Observer for progress and completion events, Factory for question types.

**States:** Enrollment: Enrolled -> InProgress -> Completed -> Certified; Enrolled -> Dropped. Submission: Draft -> Submitted -> Graded.

**Concurrency:** Progress updates from several devices: idempotent "lesson completed" records keyed by (enrollment, lesson). A quiz attempt is submitted once (unique attempt id).

**Edge cases:**
- Course content changes after a student enrolls.
- Quiz submitted after the deadline.
- Re-attempt limits.
- Student enrolled twice.

**Extension:** Add prerequisites so a module unlocks only after the previous module's quiz is passed.

<a id="lld-payment-lld"></a>

### Payment system

**Requirements:**
- Make a payment with card, UPI or wallet.
- Idempotent: a retry must not charge twice.
- Refund fully or partly.
- Handle provider callbacks.
- Keep an audit trail.

**Entities:** Payment (id, amount, currency, method, status, idempotencyKey); IPaymentMethod / IPaymentProcessor with CardProcessor, UpiProcessor, WalletProcessor; IProviderGateway adapters; Refund; LedgerEntry; IdempotencyStore; PaymentService.

**Patterns:** Strategy for payment methods, Adapter for each provider's API, State for payment status, Factory to pick the processor, Template Method for the common flow (validate, call, record).

**States:** Created -> Processing -> Succeeded or Failed; Processing -> Unknown (timeout) -> Succeeded or Failed after reconciliation; Succeeded -> PartiallyRefunded -> Refunded.

**Concurrency:** Store the idempotency key atomically before calling the provider (unique constraint); a duplicate returns the stored result. Status transitions use optimistic concurrency. Money uses decimal or integer minor units.

**Edge cases:**
- Provider timeout: do not retry blindly; query status.
- Callback arrives before the API response.
- Refund more than the paid amount.
- Currency rounding.

**Extension:** Add a second provider and fail over to it when the first provider's error rate is high.

<a id="lld-autocomplete-lld"></a>

### Search autocomplete (trie service)

**Requirements:**
- Insert words or phrases with a frequency.
- Return the top K suggestions for a prefix.
- Update frequency when a query is selected.
- Case-insensitive matching.

**Entities:** TrieNode (children map, isWord, frequency, cached top-K list); Trie (Insert, Search prefix); AutocompleteService (Suggest, RecordSelection); IRankingStrategy (frequency, recency); ITextNormalizer.

**Patterns:** Strategy for ranking and normalisation, Decorator for a cache of hot prefixes, Builder to build the trie from data.


**Concurrency:** Reads are frequent and writes rare. Build a new trie (or a new version) in the background and swap the reference atomically (copy-on-write), so readers never lock.

**Edge cases:**
- Empty prefix.
- Prefix with no matches.
- Ties in frequency: sort alphabetically.
- Unicode and mixed case input.

**Extension:** Add typo tolerance: suggest words within edit distance 1 of the prefix.

<a id="lld-inventory"></a>

### Inventory management

**Requirements:**
- Track stock per product and warehouse.
- Reserve stock for orders, then commit or release.
- Restock and adjust stock.
- Low-stock alerts.
- Audit history of every change.

**Entities:** Product (SKU); Warehouse; StockItem (sku, warehouse, onHand, reserved, available = onHand - reserved); Reservation (id, order, items, expiresAt, status); StockMovement (audit record); InventoryService (Reserve, Commit, Release, Restock); IAllocationStrategy (which warehouse); LowStockNotifier.

**Patterns:** Strategy for warehouse allocation, Observer for low-stock alerts, Command for stock movements (audit and undo).

**States:** Reservation: Active -> Committed; Active -> Released or Expired.

**Concurrency:** Reserve with an atomic conditional update (reserved += qty only if available >= qty). For many SKUs in one order, lock them in sorted order to avoid deadlock. Reserve, commit and release are idempotent by reservation id.

**Edge cases:**
- Reservation expires while payment is in progress.
- Commit and release arrive for the same reservation.
- Negative stock after a manual adjustment.
- Order split across warehouses.

**Extension:** Add batch and expiry-date tracking so the oldest stock is allocated first (FEFO).

<a id="lld-feature-flags"></a>

### Feature flag system

**Requirements:**
- Turn features on or off without a deploy.
- Target by user, tenant, region or percentage.
- Evaluate flags fast in the application.
- Change flags at runtime with an audit log.
- Safe default if the flag service is down.

**Entities:** FeatureFlag (key, enabled, rules, default value, version); TargetingRule (conditions, result); EvaluationContext (userId, tenantId, attributes); IFlagEvaluator; IFlagStore (DB or remote); FlagCache (local copy refreshed in the background); AuditLog.

**Patterns:** Strategy for rule types (user list, percentage, attribute match), Chain of Responsibility to evaluate rules in order, Observer to push flag changes, Proxy or Decorator for caching.


**Concurrency:** Evaluation reads an immutable snapshot of all flags; a background refresh builds a new snapshot and swaps the reference atomically (Volatile.Write or Interlocked.Exchange). No locks on the hot path.

**Edge cases:**
- Flag service down: use the last known snapshot, then the coded default.
- Percentage rollout must be stable per user: hash (flagKey + userId).
- Unknown flag key.
- Rule order conflicts.

**Extension:** Add scheduled rollouts that increase the percentage from 5% to 100% over a week.

<a id="lld-snowflake-id"></a>

### Distributed ID generator (Snowflake)

**Requirements:**
- Generate unique 64-bit IDs.
- IDs are roughly sorted by time.
- Thousands of IDs per millisecond per node.
- No duplicates across nodes or restarts.

**Entities:** SnowflakeIdGenerator (epoch, machineId, lastTimestamp, sequence, NextId); IClock (current milliseconds); IMachineIdProvider (config or lease from a coordinator); IdParts (decode timestamp, machine, sequence).

**Patterns:** Singleton lifetime per process (through DI), Strategy for the machine id source, Clock injection for tests.


**Concurrency:** NextId reads and updates lastTimestamp and sequence together, so put them under one lock (simple, fast enough), or pack them into one long and use an Interlocked.CompareExchange loop.

**Edge cases:**
- Sequence overflow (4,096 in one ms): wait for the next millisecond.
- Clock moves backwards: wait or throw; never reuse a timestamp.
- Machine id outside 0 to 1,023.
- Two processes started with the same machine id.

**Extension:** Change the bit layout to 5 datacenter bits and 5 worker bits, keeping old IDs valid.

<a id="lld-circuit-breaker"></a>

### Circuit breaker

**Requirements:**
- Wrap calls to a remote dependency.
- Open the circuit after too many failures, and fail fast.
- After a cool-down, allow a few trial calls.
- Close again if the trials succeed.
- Configurable thresholds; testable with a fake clock.

**Entities:** CircuitBreaker (state, Execute(func)); ICircuitState with ClosedState, OpenState, HalfOpenState; CircuitBreakerOptions (failure threshold or ratio, window, open duration, half-open trial count); IFailureCounter (sliding window); IClock; CircuitOpenException.

**Patterns:** State for the three states, Proxy or Decorator around the client being protected, Strategy for the failure counting policy.

**States:** Closed -> (failures over threshold) Open -> (open duration passed) HalfOpen -> (trial succeeds) Closed, or (trial fails) Open.

**Concurrency:** Many threads call at once. State changes use Interlocked.CompareExchange so only one thread moves the state. In HalfOpen, allow only N trial calls with an atomic counter.

**Edge cases:**
- Which errors count: timeouts and 5xx yes, 4xx no.
- Slow calls (count a slow response as a failure).
- Low traffic: require a minimum number of calls before opening.
- Many threads all try the trial call at the same time.

**Extension:** Add a fallback function that returns cached data while the circuit is open.

<a id="lld-retry-backoff"></a>

### Retry with backoff

**Requirements:**
- Retry a failed operation a limited number of times.
- Wait with exponential backoff plus jitter between tries.
- Retry only transient errors.
- Respect an overall deadline and cancellation.
- Honour a Retry-After hint from the server.

**Entities:** RetryPolicy (maxAttempts, baseDelay, maxDelay, jitter type); IRetryClassifier (IsTransient(exception or result)); IBackoffStrategy with ExponentialBackoff, FixedBackoff; RetryExecutor (ExecuteAsync(func, CancellationToken)); IDelayProvider (to fake delays in tests).

**Patterns:** Strategy for backoff and classification, Decorator around a client (like Polly or HttpClient handlers), Template Method for the retry loop.


**Concurrency:** The policy is immutable and shared. Each call has its own attempt counter. Use Task.Delay with a CancellationToken, never Thread.Sleep. Jitter (random spread) stops many clients from retrying at the same moment.

**Edge cases:**
- Non-idempotent operation: do not retry unless it carries an idempotency key.
- Deadline is shorter than the next delay: stop now.
- Retry storms: combine with a circuit breaker or retry budget.
- Cancellation during the delay.

**Extension:** Add a retry budget so retries are at most 10% of all calls across the service.

<a id="lld-metrics-lld"></a>

### Metrics and monitoring

**Requirements:**
- Record counters, gauges and histograms with labels.
- Low overhead on the hot path.
- Aggregate in memory and export periodically.
- Support several exporters.
- Limit label cardinality.

**Entities:** MetricsRegistry (get or create metrics by name and labels); IMetric with Counter (Increment), Gauge (Set), Histogram (Observe into buckets); MetricKey (name plus sorted labels); IExporter with PrometheusExporter and PushExporter; ExportScheduler; CardinalityLimiter.

**Patterns:** Factory and Flyweight for metric instances (one object per key), Strategy for exporters, Observer or a scheduled pull for export, Singleton lifetime for the registry.


**Concurrency:** Use Interlocked.Increment or Add for counters and histogram buckets; the registry uses ConcurrentDictionary.GetOrAdd. Export reads a snapshot without stopping writers.

**Edge cases:**
- Too many unique label values: reject or merge into an 'other' label.
- Counter reset after a restart.
- Exporter fails: keep aggregating, do not block callers.
- Histogram values outside the bucket range.

**Extension:** Add a timer helper: using (metrics.Time("db_query")) { ... } that records the duration into a histogram.

<a id="lld-auth-system"></a>

### Authentication system

**Requirements:**
- Register and log in with a password.
- Store passwords safely.
- Issue access and refresh tokens; log out.
- Lock the account after many failed logins.
- Optional multi-factor authentication.

**Entities:** User (id, email, passwordHash, status); IPasswordHasher (PBKDF2, bcrypt or Argon2 with salt); ITokenService (create and validate JWT access tokens); RefreshToken (hash, expiry, revoked, rotation family); Session; LoginAttemptTracker; IMfaProvider (TOTP, SMS); AuthService.

**Patterns:** Strategy for hashing and MFA providers, Chain of Responsibility for the login checks (lockout, password, MFA), Facade for the auth service, Factory for tokens.

**States:** Account: PendingVerification -> Active -> Locked -> Active (after timeout or reset); Active -> Disabled.

**Concurrency:** Failed-login counters update atomically. Refresh token rotation: the token is used once; a reused old token means theft, so revoke the whole family. Use a conditional update on the token row.

**Edge cases:**
- Timing attacks: same response time and message for an unknown user and a wrong password.
- Refresh token reuse.
- Password reset token expiry and single use.
- Clock skew when validating token expiry.

**Extension:** Add 'Sign in with Google' using OpenID Connect, linking to an existing account by verified email.

<a id="lld-rbac"></a>

### Role-based access control (RBAC)

**Requirements:**
- Define roles with permissions.
- Assign roles to users (per tenant or resource scope).
- Check whether a user can do an action on a resource.
- Role hierarchy (admin includes editor).
- Audit changes to roles.

**Entities:** User; Role (name, permissions, parent roles); Permission (resource type, action); RoleAssignment (user, role, scope such as tenant or project); IAuthorizationService (HasPermission(user, action, resource)); PermissionCache; AuditLog.

**Patterns:** Composite for role hierarchy, Strategy or Policy for checks (role-based, owner-based), Proxy or Decorator to add authorisation in front of services, Decorator for caching.


**Concurrency:** Permission checks are very frequent and read-only: cache the flattened permissions per user and scope as an immutable set. Invalidate the cache when roles change (versioned cache key).

**Edge cases:**
- Cycle in the role hierarchy.
- Permission revoked but still cached.
- User has roles in two tenants: never mix scopes.
- Deny rules versus allow rules (decide which wins; usually deny).

**Extension:** Add attribute-based rules, for example editors can edit only documents in their own department.

<a id="lld-web-crawler-lld"></a>

### Web crawler

**Requirements:**
- Start from seed URLs and crawl up to a depth.
- Do not visit a URL twice.
- Respect robots.txt and a delay per host.
- Fetch pages in parallel with a limit.
- Extract links and store pages.

**Entities:** Crawler (orchestrator); UrlFrontier (queue of (url, depth)); VisitedSet; IFetcher (HTTP get with timeout); IParser (extract links); IUrlNormalizer; RobotsCache; HostRateLimiter (next allowed time per host); IPageStore.

**Patterns:** Producer-consumer between the frontier and workers, Strategy for parser and politeness policy, Template Method for the crawl step (fetch, parse, store, enqueue).


**Concurrency:** N worker tasks read from a Channel-based frontier. The visited set is a ConcurrentDictionary with TryAdd so only one worker claims a URL. A SemaphoreSlim limits total in-flight requests; the host limiter enforces per-host delays.

**Edge cases:**
- Same URL in different forms (trailing slash, fragment, case): normalise.
- Redirect loops and crawler traps: limit depth and redirects.
- Very large or non-HTML responses.
- Knowing when the crawl is finished (frontier empty and no work in flight).

**Extension:** Add a priority so pages from some domains or shorter depth are crawled first.

<a id="lld-recommendation-lld"></a>

### Recommendation engine

**Requirements:**
- Record user interactions (view, like, buy).
- Recommend top N items for a user.
- Support several algorithms (popular, similar items, collaborative).
- Exclude items already seen or bought.
- Fall back for new users.

**Entities:** User; Item (category, tags); Interaction (user, item, type, time); IRecommender (Recommend(user, n)) with PopularityRecommender, ContentBasedRecommender, ItemSimilarityRecommender; HybridRecommender (weights); IFilter (seen, out of stock); RecommendationService.

**Patterns:** Strategy for each algorithm, Composite for the hybrid recommender, Chain or Pipeline for filters, Decorator for caching results.


**Concurrency:** Similarity data is rebuilt in the background and swapped atomically. Interaction recording uses a thread-safe queue processed by a background worker.

**Edge cases:**
- New user with no history: return popular items.
- New item with no interactions: use content features.
- Fewer candidates than N.
- Too many items from one category: add diversity.

**Extension:** Add a 'because you watched X' explanation for each recommended item.

<a id="lld-producer-consumer"></a>

### Event-driven producer-consumer

**Requirements:**
- Producers publish events into a buffer.
- Several consumers process events in parallel.
- Bounded buffer with backpressure.
- Retry failures; send poison events to a dead-letter queue.
- Graceful shutdown that drains the buffer.

**Entities:** IEventProducer; IEventConsumer / IEventHandler<T>; EventEnvelope (id, type, payload, attempts); BoundedEventQueue (Channel<T> with capacity); ConsumerHost (starts N workers); IRetryPolicy; DeadLetterQueue; IdempotencyStore.

**Patterns:** Producer-consumer with a bounded buffer, Observer or Strategy to route event types to handlers, Command for events, Decorator for retry and logging around handlers.

**States:** Event: Queued -> Processing -> Done; Processing -> Retrying -> Done or DeadLettered.

**Concurrency:** Use System.Threading.Channels with BoundedChannelFullMode.Wait so producers slow down when the buffer is full. Consumers read with ReadAllAsync and a CancellationToken. Handlers must be idempotent (dedup by event id) because retries can repeat work.

**Edge cases:**
- Consumer crash in the middle of an event.
- Poison event that always fails.
- Shutdown with events still in the buffer.
- Events for the same key must stay in order: partition by key to one consumer.

**Extension:** Add per-key ordering by hashing each event's key to one of N single-reader channels.
