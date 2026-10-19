# Start from zero — programming basics and arrays

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

The absolute basics that every later topic assumes: types, loops, methods, arrays, references, complexity vocabulary. Weeks 1–2 live here.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- Beginner questions: small details before advanced topics
- Your own array notes (Devlopment/C#/Arrays.docx)

---


## Beginner questions: small details before advanced topics


*Source: FINAL-PLAN/NOTES/00_BEGINNER_QUESTIONS.md (48 cards written 13 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="basic-001"></a>

### BASIC-001 — What do I need before starting an array problem?

**Answer.** Know variables, types, assignment, comparisons, if/else, loops, methods, parameters and return values. Learn to read a statement and trace changing values by hand. A method should have a clear input/output contract; for example, finding a maximum must say what happens for an empty array. Start with print, sum, count, minimum and maximum before pattern problems.

**Practice.** Write Sum(int[] values), trace every iteration, then test empty, one item and negative values.

<a id="basic-002"></a>

### BASIC-002 — What is an array, and how do I create one in C#?

**Answer.** An array is a fixed-length indexed collection of elements of one declared type. int[] a = new int[3] creates three integers initially equal to zero; int[] b = {4, -2, 7} creates three specified values. Arrays are reference types, including arrays of integers. Length cannot be changed on the existing array; resizing creates another array and updates a reference.

**Practice.** Create an int array and a string array. Print their initial elements and Length.

<a id="basic-003"></a>

### BASIC-003 — What are an index, Length, zero-based indexing and an invalid index?

**Answer.** For an array of Length n, valid indices are 0 through n-1. a[0] accesses the first element, while a[n-1] accesses the last. Length is the number of slots, not the last index. Accessing a[-1] or a[n] throws IndexOutOfRangeException. An empty array has Length zero and no valid element index. Check for empty input before reading a[0].

**Practice.** Trace indices for lengths 0, 1 and 5. Write a boundary-safe last-element operation.

<a id="basic-004"></a>

### BASIC-004 — How do for, foreach, while and do/while traverse an array?

**Answer.** Use for when you need an index: for (int i=0; i<a.Length; i++) { ... }. foreach gives each value and is useful for reading. while checks its condition before the body. do/while executes once before checking, so empty arrays need an explicit guard. Updating a[i] requires an index; assigning a replacement to the foreach iteration variable is not how you replace a slot.

**Practice.** Implement sum using all four loops; make every version handle an empty array.


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Assigning to a `foreach` iteration variable is a compile error (CS1656), not just 'not how you replace a slot'.

<a id="basic-005"></a>

### BASIC-005 — What is the difference between accessing by index and searching by value?

**Answer.** When you already know index i, a[i] retrieves one slot in O(1) time. Given only a value, an unsorted array generally needs a scan to find it: O(n) worst-case time. Define whether search returns the first index, last index, all indices or a boolean. A conventional first-index method returns -1 when absent; that is a contract, not an array index to access.

**Practice.** Search [4,7,7,0] for 7, 0 and 9 and return the first index.

<a id="basic-006"></a>

### BASIC-006 — How do array updates, insertion and deletion work?

**Answer.** a[i] = value replaces an existing slot in O(1). An array has fixed physical length. Inserting into a logical sequence usually requires spare capacity plus shifting, or allocation and copying into a larger array. Deletion often shifts later elements and reduces a separate logical count. Both can cost O(n). List<T> manages a growable backing array; it still pays shifting costs for middle insertion/deletion.

**Practice.** Insert 25 into [10,20,30,40,50] using a new array and show every copy.

<a id="basic-007"></a>

### BASIC-007 — What is null compared with an empty array and a default element?

**Answer.** int[] a = null means no array object is referenced; accessing a.Length throws NullReferenceException. Array.Empty<int>() is a valid zero-length array. new int[3] contains three valid default values, all zero. For a reference-type element such as string, new string[3] contains null references. Nullable-reference analysis helps detect potential null use but does not change runtime storage.

**Practice.** Write and document whether your method rejects null or treats it as empty; test both separately.

<a id="basic-008"></a>

### BASIC-008 — What are aliasing, copying and cloning?

**Answer.** int[] b = a copies the reference; both variables reach the same array. Mutating b[0] changes what a[0] sees. (int[])a.Clone(), a.ToArray() or copying into a new array makes different slots. These are shallow copies: for an array of class instances, copied slots still point at the same objects. A deep copy must copy the contained mutable objects according to their meaning.

**Practice.** Run both int[] and Person[] copy examples; change a slot, then change an object field.

<a id="basic-009"></a>

### BASIC-009 — What happens when an array is passed to a method?

**Answer.** Ordinary parameter passing copies the array reference. The method can update elements in the shared object, so callers observe them. Assigning a = new int[5] inside the method changes only the local parameter. A ref int[] parameter can reassign the caller’s variable too. A reference type and passing a variable by reference are different concepts.

**Practice.** Compare Mutate(a), Reassign(a) and Reassign(ref a), predicting results before running.

<a id="basic-010"></a>

### BASIC-010 — What are 1D, rectangular 2D and jagged arrays?

**Answer.** int[] is one dimension. int[,] is a rectangular array; use GetLength(0) for rows and GetLength(1) for columns. Its Length is the total number of elements. int[][] is an array of arrays: rows can have different lengths or be null. Rectangular access uses grid[r,c]; jagged access uses grid[r][c]. Nested traversal of R rows and C columns costs O(RC).

**Practice.** Print a 2x3 rectangle and a jagged array with row lengths 1, 3 and 0.

<a id="basic-011"></a>

### BASIC-011 — How do I find maximum, minimum, sum, count and second largest?

**Answer.** Use one pass with maintained state. Initialize min/max from the first element after handling empty input; zero initialization fails on all-negative or all-positive cases. Sum may need long. Counting starts at zero. Second largest needs a precise rule: second distinct value versus the second position after sorting. Maintain two distinct candidates without letting duplicates overwrite the runner-up.

**Practice.** Test [-5,-2,-2], [3], [], [2,2] and [1,3,2]. Explain which cases have no second distinct value.

<a id="basic-012"></a>

### BASIC-012 — How do I check sortedness, first occurrence and last occurrence?

**Answer.** For nondecreasing order, reject if any a[i] < a[i-1]. Equal neighbors are allowed unless the contract requires strictly increasing order. Empty and one-element arrays are usually considered sorted. First occurrence can return immediately; last occurrence keeps updating a saved index. All three use one scan, O(n) time and O(1) auxiliary space.

**Practice.** Implement the three methods and test duplicates, absent target and descending input.

<a id="basic-013"></a>

### BASIC-013 — What is in-place modification and how do I reverse an array?

**Answer.** In-place changes the supplied array rather than returning a separate result array. Reversal swaps the first and last elements, then moves inward until left >= right. Each swap settles two positions. This is O(n) time and O(1) auxiliary space. Array.Reverse changes the array too. Always clarify whether the caller permits input mutation.

**Practice.** Reverse an empty array, one element, odd length and even length with two indices.

<a id="basic-014"></a>

### BASIC-014 — How are Dictionary and HashSet different?

**Answer.** HashSet<T> records membership: have I seen this value? Dictionary<K,V> maps a key to information: frequency, first index or another value. For counting, increment a dictionary entry per occurrence. In Two Sum, store a previous value and its index; test the complement before inserting the current value so one element is not reused. Expected O(1) lookup is not an unconditional worst-case guarantee.

**Practice.** Build a frequency map for [1,2,2,3,3,3]; use a set to detect a duplicate.

<a id="basic-015"></a>

### BASIC-015 — What are Array.Sort, Array.Reverse and mutation side effects?

**Answer.** Array.Sort orders the existing array; Array.Reverse reverses its existing order. Neither preserves the original arrangement unless you copy first. Sorting can simplify deduplication, two pointers and interval processing, but changes index positions and costs work. If an answer must return original indices, retain index metadata or use a strategy that preserves it. Do not replace reasoning with memorizing every API overload.

**Practice.** Sort a copy and prove the original array remains unchanged; then compare original-index Two Sum.

<a id="basic-016"></a>

### BASIC-016 — What are time complexity, auxiliary space, worst case and amortized cost?

**Answer.** Complexity describes growth as input grows, not exact milliseconds. A scan is O(n); pair enumeration is O(n²); halving a search range is O(log n). Auxiliary space is additional memory used beyond input/output conventions, including recursion frames. Worst case is the largest cost for an input size. Amortized cost bounds a sequence: List<T>.Add is amortized O(1), although an individual growth operation copies O(n) elements.

**Practice.** Trace operation counts for n=4 and n=8; explain why two consecutive loops are O(n), not O(n²).

<a id="basic-017"></a>

### BASIC-017 — What integer arithmetic and C# syntax mistakes should I prevent?

**Answer.** int has bounded range. Use long before multiplying large counts; assigning an already overflowed int expression to long cannot repair it. Integer division truncates toward zero. checked can detect integral overflow. Learn = versus ==, short-circuit &&/||, ++ placement, <= versus <, and % for remainders. For nonnegative binary-search indices, mid = lo + (hi-lo)/2 avoids overflowing lo+hi.

**Practice.** Compare (long)a*b with (long)(a*b) for large integers; trace 7/2 and -7/2.

<a id="basic-018"></a>

### BASIC-018 — What are a subarray, subsequence, subset and substring?

**Answer.** A subarray is a contiguous segment of an array; a substring is contiguous text. A subsequence preserves original order but may skip elements. A subset selects elements without an ordering requirement, though a representation may be sorted. The distinction determines whether a sliding window, sequence DP or combinatorial search applies. Empty selections may or may not be allowed; clarify that in the problem contract.

**Practice.** List subarrays and subsequences of [1,2,3] and show why [1,3] is not a subarray.

<a id="basic-019"></a>

### BASIC-019 — What must I understand before sliding windows and prefix sums?

**Answer.** A fixed window retains exactly k contiguous elements; update by adding the new item and removing the departing one. A variable window needs a valid movement rule, often monotonicity. Negative values break some sum-based shrink rules. Prefix sums store cumulative totals; with a zero prefix, sum of indices [l,r) is prefix[r]-prefix[l]. A prefix-frequency map can count target-sum subarrays even with negatives.

**Practice.** Solve maximum sum of k items, then test why a positive-only minimum-sum window fails with negatives.

<a id="basic-020"></a>

### BASIC-020 — What language basics must I cover beyond arrays?

**Answer.** Cover primitive types; implicit/explicit conversions; var versus dynamic versus object; operators and precedence; branches and switch; all loop forms; break/continue; methods, overloads and optional/named parameters; scope; null handling; and reading exception messages. Then classes, fields/properties, constructors and access modifiers. These basics remain required even if you have used the language professionally.

**Practice.** Write a small console program with two methods, input validation and a deliberate exception to inspect.

<a id="basic-021"></a>

### BASIC-021 — What are fields, properties, methods, constructors and object initializers?

**Answer.** Fields store state. Properties expose access logic, validation or a controlled view of state. Methods perform behavior. Constructors establish a valid initial state; chain with this(...) or base(...). An object initializer assigns accessible members after construction. Distinguish a parameterless constructor, a user-written copy constructor, and record copying; C# does not automatically supply an ordinary class copy constructor.

**Practice.** Create an Order with validated quantity, chained constructors and read-only identity.

<a id="basic-022"></a>

### BASIC-022 — What do all six C# access modifiers mean?

**Answer.** public allows access wherever the type is accessible. private limits access to the containing type. protected allows the containing type and derived types. internal allows the same assembly. protected internal allows the same assembly OR derived types elsewhere. private protected allows derived types within the same assembly. Access on a member cannot make an inaccessible containing type accessible.

**Practice.** Draw a same-assembly/other-assembly and derived/unrelated access table.


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] C# 11 added the `file` modifier for types (visible only in its source file). The six member access modifiers listed are still the ones to know.

<a id="basic-023"></a>

### BASIC-023 — What are const, readonly, static and enums?

**Answer.** const is a compile-time constant and is implicitly static. readonly fields can be assigned in their declaration or the relevant constructor; a readonly reference still permits mutation of its referenced object. static state belongs to a type rather than an instance and may need synchronization. An enum gives names to integral values; Flags enums represent bit combinations, usually powers of two. Validate enum values at input boundaries.

**Practice.** Compare a readonly array reference with immutable contents; combine and test two enum flags.

<a id="basic-024"></a>

### BASIC-024 — What are delegates, lambdas, closures and events?

**Answer.** A delegate is a typed callable reference. Func returns a value; Action returns void; Predicate<T> returns bool for an input. A lambda can capture an outer variable, extending its lifetime through closure state. An event restricts outside callers to subscription/unsubscription; the publisher raises it. Long-lived publishers can retain subscribers through delegates, so lifetime and unsubscription matter.

**Practice.** Capture a variable, mutate it before invoking the lambda, and explain the result.

<a id="basic-025"></a>

### BASIC-025 — What are nullable reference types and common modern C# constructs?

**Answer.** Nullable reference types provide compile-time analysis through annotations such as string?; they do not make string a different runtime type. Learn ?. and ??, pattern matching, switch expressions, tuples, records, init properties and required members where supported. Records provide value-oriented equality but do not automatically deep-freeze contained objects. Treat version-dependent syntax as a language/toolchain choice.

**Practice.** Model a nullable customer name and remove warnings by checking, not indiscriminate null-forgiving operators.

<a id="basic-026"></a>

### BASIC-026 — What exception and resource basics come before advanced async?

**Answer.** Understand try/catch/finally, exception types, exception filters and preserving the stack with throw;. Use using/await using for deterministic disposal of resources. Garbage collection reclaims managed memory; it does not mean a file or network resource is released at the desired time. Cancellation is cooperative and differs from a fault. Avoid exceptions for expected routine branching when a clear result contract works.

**Practice.** Open and dispose a file safely; distinguish bad input, cancellation and unexpected I/O failure.

<a id="basic-027"></a>

### BASIC-027 — What are .NET, C#, SDK, runtime, CLR, BCL, IL and JIT?

**Answer.** C# is a language. .NET supplies runtimes, libraries and tools for several languages. The SDK contains build/development tooling; the runtime executes applications. Compilers normally produce intermediate language and metadata; the runtime loads code, manages memory and often compiles IL with the JIT. BCL means foundational libraries. Modern .NET, older .NET Framework and historic .NET Core have different platform/version histories.

**Practice.** Explain the path from a .cs file to running code; inspect installed SDK and target framework.

<a id="basic-028"></a>

### BASIC-028 — What are async, concurrency and parallelism?

**Answer.** Concurrency means operations have overlapping lifetimes. Parallelism means work executes simultaneously. async/await allows a method to suspend while an awaited operation is incomplete; it does not inherently create a thread. I/O-bound work should generally use asynchronous APIs. CPU-bound work needs computation resources; Task.Run may be appropriate in some clients but does not add server capacity or fix a blocked server architecture.

**Practice.** Trace an async delay and two CPU loops; explain which needs CPU while waiting.

<a id="basic-029"></a>

### BASIC-029 — What happens between HTTP request and ASP.NET Core response?

**Answer.** Trace DNS, connection/TLS, HTTP method/path/headers/body, hosting server, middleware, endpoint routing, authentication, authorization, input binding/validation, application operation, database/outbound calls and response serialization. A middleware can run before and after the next middleware or short-circuit. Ordering affects behavior. CORS typically belongs after routing and before authorization when endpoint routing is used.

**Practice.** Trace POST /jobs through your API and identify where a 400, 401, 403 and 500 originate.

<a id="basic-030"></a>

### BASIC-030 — What are REST, HTTP methods, status codes and idempotency?

**Answer.** REST is an architectural style; an API is not automatically RESTful because it uses JSON. GET reads a resource; POST commonly creates or initiates; PUT replaces a resource at an identity; PATCH applies a partial change; DELETE removes. HTTP idempotency concerns the intended effect of repetition, not identical responses. A POST can implement idempotency using a client key, request fingerprint and stored outcome. Learn 200/201/202/204, 400/401/403/404/409/429 and relevant 5xx.

**Practice.** Design create-job and get-job endpoints including validation, duplicate keys and pending status.

<a id="basic-031"></a>

### BASIC-031 — What are dependency injection lifetimes and configuration?

**Answer.** Dependency injection supplies collaborators explicitly. Transient creates per resolution; scoped creates per scope, commonly a request; singleton lives for the container lifetime. A singleton must not capture a shorter-lived scoped dependency. Background services should create scopes for scoped work. Configuration combines providers; options bind settings to typed objects. Keep secrets outside source control and validate essential settings at startup.

**Practice.** Explain why a singleton holding DbContext is unsafe; resolve a scope inside a worker.

<a id="basic-032"></a>

### BASIC-032 — What web security basics must I learn?

**Answer.** Authentication establishes who is calling; authorization decides what they may do, including object/tenant ownership. A signed JWT protects token integrity, not confidentiality unless separately encrypted. Validate issuer, audience, expiry and signature. Learn cookie/session versus bearer-token flows, OAuth authorization versus OIDC authentication, password hashing, CSRF, XSS, SQL injection, SSRF and CORS. CORS is a browser cross-origin policy, not general API authorization.

**Practice.** Reject a valid token belonging to a different tenant when accessing a job.

<a id="basic-033"></a>

### BASIC-033 — What SQL basics do I need before indexes and isolation?

**Answer.** Cover tables/rows/columns, primary and foreign keys, constraints, CRUD, SELECT/WHERE/ORDER BY, INNER/LEFT joins, GROUP BY/HAVING, aggregates, DISTINCT, subqueries, CTEs and window functions. Learn NULL and three-valued logic: use IS NULL, not = NULL. Practice duplicates from joins and COUNT(*) versus COUNT(column). Then reason about plans and indexes rather than assuming every slow query needs an index.

**Practice.** Query customers without orders, monthly counts and top order per customer; explain NULL results.

<a id="basic-034"></a>

### BASIC-034 — What are normalization, denormalization and schema design?

**Answer.** Normalization reduces update anomalies through appropriate relationships and dependencies; understand 1NF, 2NF and 3NF with concrete examples. Denormalization stores duplicated or precomputed data for measured read needs, adding synchronization cost. Start from access patterns, invariants, keys, uniqueness and relationships. Money needs a deliberate exact representation; timestamps need a timezone convention. Do not treat either normalized or denormalized as universally superior.

**Practice.** Model orders/items/products and state what remains historically correct when a product price changes.

<a id="basic-035"></a>

### BASIC-035 — What networking vocabulary must come before a distributed design?

**Answer.** Learn client/server, IP address, port, DNS, packet, TCP connection, UDP datagram, TLS, HTTP request/response, headers and payload. Then latency versus bandwidth, timeouts, retries, connection reuse and proxies. A DNS lookup is separate from establishing a connection; TLS protects a connection but cannot repair compromised endpoints or incorrect application permissions.

**Practice.** Draw browser to DNS to gateway to API to database, labeling connections and security boundaries.

<a id="basic-036"></a>

### BASIC-036 — What operating-system vocabulary must come before concurrency?

**Answer.** Learn process, thread, stack, address space, virtual memory, scheduling, context switch and system call. Threads in a process share memory, so races arise when shared mutable state is accessed without coordination. A lock protects a defined invariant; it does not make every operation on an object safe. Learn deadlock, starvation and contention separately. Cancellation/timeouts do not automatically undo side effects.

**Practice.** Explain one lost-update race and one two-lock deadlock with an interleaving diagram.

<a id="basic-037"></a>

### BASIC-037 — What are recursion, a base case and a call stack?

**Answer.** A recursive function calls itself on a smaller or otherwise progressing state. A base case stops recursion. Each active call retains parameters/local state in a frame, so stack depth is part of space complexity. Progress must be provable; otherwise recursion may never terminate. Backtracking adds choose, explore and undo; DP reuses equivalent states when a valid recurrence exists.

**Practice.** Trace factorial(4), then generate subsets of three values and show each undo step.

<a id="basic-038"></a>

### BASIC-038 — What are Git, build, tests, CI and CD?

**Answer.** Git records changes and history: learn status, diff, staging, commit, branches, merge, conflict resolution and reverting. A build compiles/packages. CI validates changes automatically, including appropriate tests. Delivery prepares a deployable artifact; deployment releases it to an environment. Learn environment promotion, secrets, repeatable artifacts, approvals when required, rollout verification and rollback. A green pipeline does not prove production behavior is correct.

**Practice.** Create a build/test pipeline and deliberately fail a test to observe the release gate.

<a id="basic-039"></a>

### BASIC-039 — What are Docker image, container, Dockerfile, volume and network?

**Answer.** An image is a packaged filesystem/configuration template; a container is a running isolated process based on it. A Dockerfile describes image construction. Learn build context, layers, cache, multi-stage builds, ports, environment variables, logs, health checks and non-root execution. Volumes persist external data beyond a container lifecycle. Container networking resolves connected services; localhost inside a container refers to that container.

**Practice.** Run API plus database with Compose; recreate the API and verify database persistence.

<a id="basic-040"></a>

### BASIC-040 — What do Kubernetes and cloud basics add?

**Answer.** Kubernetes coordinates container workloads: pods, deployments, services, configuration/secrets, probes, resource requests/limits and rolling updates. Readiness controls traffic eligibility; liveness detects a need to restart; startup probes protect slow initialization. Cloud basics include regions/zones, identity permissions, networks, compute, object storage, managed databases, queues, monitoring and cost. Learn deployment failure behavior before adding extra infrastructure.

**Practice.** Describe what happens when a pod dies during a job and how the job is recovered.

<a id="basic-041"></a>

### BASIC-041 — What are logs, metrics, traces, health, SLI, SLO, RPO and RTO?

**Answer.** Logs describe events; metrics aggregate numeric behavior; traces connect steps of a request. Health checks must match their purpose. An SLI measures a service property such as successful requests or latency; an SLO is its target over a window. RPO is tolerated data-loss duration; RTO is targeted restoration duration. Backups need restore exercises. A dashboard is useful only when its signals help choose an action.

**Practice.** Instrument request latency and queue age; write an alert with an actionable recovery step.

<a id="basic-042"></a>

### BASIC-042 — What are HLD, LLD, requirements and nonfunctional requirements?

**Answer.** HLD explains components, data flow, scaling and failure behavior. LLD explains object/module contracts, state, interactions and code-level trade-offs. Functional requirements specify what users can do. Nonfunctional requirements cover latency, availability, scale, consistency, security and cost. Begin with a bounded use case and assumptions; do not draw components before knowing what the system must guarantee.

**Practice.** For ticket booking, write three functional requirements and three measurable or clearly stated constraints.

<a id="basic-043"></a>

### BASIC-043 — What are OOP, SOLID, UML and the missing Interpreter pattern?

**Answer.** OOP covers encapsulation, abstraction, inheritance and polymorphism. SOLID supplies five design principles; UML communicates relationships and interactions. Learn each GoF pattern through the problem it solves and its cost. The original encyclopedia lists 22 patterns: add Interpreter to the behavioral group, giving 5 creational, 7 structural and 11 behavioral. Interpreter represents a small grammar as expression objects evaluated against a context; complex grammars usually need proper parser tooling.

**Practice.** Implement a tiny AND/OR rule expression and compare it with a simple conditional.

<a id="basic-044"></a>

### BASIC-044 — What are queue delivery, idempotency and the outbox boundary?

**Answer.** At-least-once delivery permits duplicates. Idempotency makes repeated requests have the same intended effect. An outbox atomically stores business state and a publication record in one local database transaction; a publisher may still send duplicates. A consumer can atomically store its dedup record and database-local effect. An external payment/email requires a downstream idempotency contract or reconciliation. A marker written before or after an external effect alone does not close both crash windows.

**Practice.** Draw crashes before effect, after effect and before acknowledgment; show recovery for each.

<a id="basic-045"></a>

### BASIC-045 — What are tokens, context, embeddings, RAG and fine-tuning?

**Answer.** Tokens are model input/output units. Context is the information available during a request, within a bounded window. Embeddings turn content into vectors used for similarity retrieval. RAG retrieves relevant authorized content and supplies it to generation; it does not retrain model weights. Fine-tuning changes model behavior through training. Begin by proving retrieval quality, then test answer grounding, citations, latency and cost. Similar content is not necessarily correct evidence.

**Practice.** Find an exact identifier using keywords and semantics, then compare the retrieved results.

<a id="basic-046"></a>

### BASIC-046 — What are tool calling, MCP, structured output and prompt injection?

**Answer.** Tool calling lets a model request an operation that application code authorizes and executes. MCP standardizes exchange of tools, resources and prompts between hosts/clients and servers. Structured output constrains response shape but does not prove factual truth. Prompt injection puts adversarial instructions in untrusted content such as retrieved documents or tool results. Apply least privilege, validate arguments, preserve tenant boundaries and require appropriate authorization for side effects.

**Practice.** Treat a retrieved document saying “ignore permissions” as data; test that unauthorized tools remain unavailable.

<a id="basic-047"></a>

### BASIC-047 — How do I prepare behavioral answers when nothing is completed yet?

**Answer.** Start a factual work journal now: situation, responsibility, action, result and uncertainty. Use genuine professional examples you already remember; never invent numbers or present planned projects as completed. Build stories about ownership, failure, disagreement, ambiguity, customer impact, prioritization, mentoring and improvement. Use STAR, then prepare why, alternatives, your specific contribution and what you would change.

**Practice.** Write one real work event in five sentences; leave unknown results explicitly unknown.

<a id="basic-048"></a>

### BASIC-048 — How do I explain a technical answer in clear English?

**Answer.** Use a short structure: define the concept, explain the mechanism, give a concrete example, then give a trade-off or failure mode. Practice a two-minute version and a thirty-second version. If stuck on a word, use plain wording and a diagram. Ask clarification when requirements are ambiguous. Confidence should come from reconstructing the idea, not memorizing a polished paragraph.

**Practice.** Record “why dictionary lookup is fast” twice; remove vague claims and unnecessary terminology.

## Your own array notes (Devlopment/C#/Arrays.docx)


*Source: Devlopment/C#/Arrays.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

Level 1 — Array fundamentals
You should be completely comfortable with:
- What an array is
An array is a fixed-size, strongly typed collection that stores multiple elements of the same type. Each element is accessed using an index, and array indexing provides O(1) access by index. In C#, arrays are reference types, even when they contain value types.
- Indexing: arr[0]
You have value → find index
search through array → index
O(n)
You have value → find index
search through array → index
O(n)

- Length
- Traversing with for / foreach/while/do..while
- Reading and updating elements
- 1D arrays
- Basic 2D arrays
- Passing arrays to methods
- Array reference behavior in C#
Arrays are reference types in C#. The array object is stored on the managed heap, and the variable holds a reference to that array.
- Array.Sort(), Array.Reverse() — understand what they do, don't memorize every API

- You should know:
- 																Access by index       O(1)
- 																Search unsorted       O(n)
- 																Traverse              O(n)

<a id="arr-level-2-basic-array-problems"></a>

### Level 2 — Basic array problems
- Find maximum
- Find minimum
- Find second largest
- Reverse an array
- Search for an element
- Count occurrences
- Check if array is sorted
- Remove/handle duplicates
- Move zeros
- Find missing number
- Find duplicate number
- Merge two arrays

Don't just memorize solutions.
For every problem learn:
What is the brute force?
What is repeated work?
Can I reduce the work?
What data structure/pattern helps?
Time complexity?
Space complexity?
<a id="arr-level-3-the-important-patterns"></a>

### Level 3 — The important patterns ⭐
This is the most important part of Arrays for interviews.
You don't want to learn 100 random array problems.
You want to recognize patterns.
<a id="arr-1-two-pointers"></a>

##### 1. Two Pointers
Example problems:
Reverse array
Two Sum (sorted)
3Sum
Container With Most Water
Remove duplicates from sorted array
Mental idea:
left  →              ← right
[1, 2, 3, 4, 5, 6]
<a id="arr-2-sliding-window"></a>

##### 2. Sliding Window
Very important.
Example:
Find maximum sum of k consecutive elements
Longest substring without repeating characters
Minimum size subarray
Mental model:
[1 2 3 4 5 6 7]
 ↑-----↑
 window
Instead of recalculating the entire window every time, maintain the current window.

<a id="arr-3-hashing"></a>

##### 3. Hashing
This is where your recent Two Sum discussion fits.
C#:
Dictionary<int, int>
HashSet<int>
Typical problems:
Two Sum
Contains Duplicate
Group Anagrams
Frequency counting
Longest Consecutive Sequence
Mental question:
Can I remember something I've already seen so I don't have to search again?

<a id="arr-4-prefix-sum"></a>

##### 4. Prefix Sum
Very useful for range/sum problems.
Example:
nums = [2, 4, 1, 3]
Instead of repeatedly calculating:
2 + 4 + 1
2 + 4
4 + 1 + 3
...
build cumulative information.
Used in:
Range Sum
Subarray Sum
Subarray Sum Equals K

<a id="arr-5-binary-search"></a>

##### 5. Binary Search
Extremely important.
You should understand:
Search space
left
right
middle
and why it becomes:
O(log n)
Problems include:
Binary Search
Search Insert Position
First/Last Position
Search in Rotated Sorted Array
Later you'll also learn binary search on the answer, which is more advanced.

<a id="arr-level-4-important-array-techniques"></a>

### Level 4 — Important array techniques
After the above patterns:
<a id="arr-sorting"></a>

##### Sorting
Understand:
- Why sorting can help
- Built-in sorting
- Basic sorting concepts
- When sorting changes complexity
You don't need to spend weeks implementing every sorting algorithm.
But you should understand at least:
Bubble Sort
Selection Sort
Insertion Sort
Merge Sort
Quick Sort
More importantly, know roughly:
O(n²)
O(n log n)
and why.

<a id="arr-kadane-s-algorithm"></a>

##### Kadane's Algorithm
Important interview pattern for:
Maximum subarray sum
Example:
[-2,1,-3,4,-1,2,1,-5,4]
Answer:
4 + (-1) + 2 + 1 = 6
This is worth learning properly because it teaches you how to maintain useful state while traversing an array.

<a id="arr-intervals"></a>

##### Intervals
Examples:
Merge Intervals
Insert Interval
Meeting Rooms
This is technically its own pattern, but arrays are where you'll encounter it.

<a id="arr-level-5-advanced-array-problems"></a>

### Level 5 — Advanced array problems
Don't start these now.
Later:
- Monotonic Stack
- Difference Array
- Sweep Line
- Advanced prefix/suffix techniques
- Matrix problems
- 2D grid traversal
- Binary search on answer
- Advanced greedy techniques

<a id="arr-1-array-fundamentals"></a>

#### 1. Array fundamentals ⭐
Learn:
- What an array is
- Index
- Length
- Zero-based indexing
- Access
- Update
- Traversal
- 1D array
- 2D array
- Nested loops for 2D
- Passing array to a method
- Array reference behavior in C#
- Basic array creation
- Fixed size
- What happens when accessing an invalid index
Complexity:
arr[i]             O(1)
arr.Length         O(1)
traversal          O(n)
linear search      O(n)
<a id="arr-problems"></a>

##### Problems
Start extremely easy:
- Find largest element
- Find smallest element
- Find an element
- Count an element
- Check if sorted
Don't move on until these feel easy.

<a id="arr-2-array-operations-complexity"></a>

### 2. Array operations + complexity ⭐
Understand:
Access
Search
Insert
Delete
Update
For an array:
Access       O(1)
Search       O(n)
Update       O(1)
Insert       O(n)      // generally, if shifting is needed
Delete       O(n)      // generally, if shifting is needed
The important thing is why.
For example:
[10,20,30,40,50]
Insert 25 between 20 and 30.
You have to shift:
30 → right
40 → right
50 → right
That's why insertion can be O(n).

<a id="arr-3-basic-traversal-pattern"></a>

### 3. Basic traversal pattern ⭐
Learn to scan an array once while maintaining some information.
Problems:
- Maximum
- Minimum
- Sum
- Count
- Second largest
- Check sorted
- Find first occurrence
- Find last occurrence
This teaches:
One pass + maintain state
This is one of the most important basic DSA skills.

<a id="arr-4-in-place-modification"></a>

### 4. In-place modification ⭐
Learn the difference between:
Using extra array
and:
Changing the original array
Problems:
- Reverse Array
- Move Zeroes
- Remove Element
- Remove Duplicates from Sorted Array
This leads directly into two pointers.

<a id="arr-5-frequency-counting"></a>

### 5. Frequency counting ⭐⭐⭐
Learn:
How many times does each value appear?
Example:
[1,2,2,3,3,3]
Result:
1 → 1
2 → 2
3 → 3
Learn both:
Dictionary<int,int>
and:
HashSet<int>
Understand when each one is appropriate.
Problems:
- Contains Duplicate
- Valid Anagram
- Majority Element
- Frequency problems

<a id="arr-6-hashing"></a>

### 6. Hashing ⭐⭐⭐
This deserves its own section because it appears everywhere.
Mental model:
"I need fast lookup."
        ↓
Can I remember previous information?
        ↓
HashSet / Dictionary
Problems:
- Contains Duplicate
- Two Sum
- Group Anagrams
- Longest Consecutive Sequence
- Frequency counting
You already started Two Sum, so we'll revisit it after properly learning hashing.

<a id="arr-7-two-pointers"></a>

### 7. Two Pointers ⭐⭐⭐
Learn:
left
right
and how they move based on conditions.
Problems:
- Reverse String/Array
- Two Sum II
- Remove Duplicates
- Move Zeroes
- Container With Most Water
- 3Sum
Important question:
Why is moving a pointer safe?
Don't memorize pointer movements.
Understand why the movement eliminates impossible possibilities.

<a id="arr-8-sorting-arrays"></a>

### 8. Sorting + Arrays ⭐⭐⭐
Learn the basic idea of:
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
You don't need to spend enormous time implementing all of them.
You do need to understand:
Why sorting can make a problem easier.
And understand roughly:
O(n²)
O(n log n)
Problems:
- 3Sum
- Merge Sorted Array
- Sort Colors
- Meeting/interval problems later

<a id="arr-9-prefix-sum"></a>

### 9. Prefix Sum ⭐⭐⭐
Mental model:
Store previous cumulative information so I don't repeatedly calculate it.
Example:
nums = [2, 4, 1, 3]

prefix = [2, 6, 7, 10]
Then range calculations become much cheaper.
Problems:
- Range Sum Query
- Subarray Sum
- Subarray Sum Equals K

<a id="arr-10-sliding-window"></a>

### 10. Sliding Window ⭐⭐⭐
This is a must-know FAANG pattern.
Start with fixed-size window:
[1,2,3,4,5,6]
 ↑-----↑
Then variable-size window.
Learn:
- Fixed window
- Variable window
- Expand
- Shrink
- Maintain window state
Problems:
- Maximum sum of subarray of size K
- Longest Substring Without Repeating Characters
- Minimum Size Subarray Sum
- Permutation-related window problems

<a id="arr-11-binary-search"></a>

### 11. Binary Search ⭐⭐⭐
Do not just learn:
Array.BinarySearch()
You need to understand the algorithm yourself.
Learn:
left
right
mid
search space
elimination
Then:
- Basic binary search
- Search insert position
- First occurrence
- Last occurrence
- Lower bound
- Upper bound
- Rotated sorted array

<a id="arr-12-binary-search-on-answer"></a>

### 12. Binary Search on Answer ⭐⭐⭐
This is where things become more interview-level.
Instead of:
"Find this number."
You ask:
"What is the minimum/maximum possible answer?"
Then binary search the answer range.
Examples:
- Koko Eating Bananas
- Capacity to Ship Packages Within D Days
- Split Array Largest Sum
Don't learn this until normal binary search is solid.

<a id="arr-13-kadane-s-algorithm"></a>

### 13. Kadane's Algorithm ⭐⭐⭐
Learn the idea, not just the code.
Problem:
Maximum Subarray
Example:
[-2,1,-3,4,-1,2,1,-5,4]
Answer:
6
because:
4 + (-1) + 2 + 1 = 6
This teaches you how to maintain the best state so far.

<a id="arr-14-intervals"></a>

### 14. Intervals ⭐⭐⭐
Learn:
overlap
sort by start
merge
Problems:
- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms
This is a very common interview pattern.

<a id="arr-15-2d-arrays-matrix"></a>

### 15. 2D Arrays / Matrix ⭐⭐
Learn:
- Row/column traversal
- Nested loops
- Search
- Matrix modification
- Boundary handling
Problems:
- Search a 2D Matrix
- Set Matrix Zeroes
- Rotate Image
- Spiral Matrix

<a id="arr-16-subarray-thinking"></a>

### 16. Subarray thinking ⭐⭐⭐
You need to clearly understand:
subarray = contiguous
For:
[1,2,3]
valid subarrays include:
[1]
[2]
[3]
[1,2]
[2,3]
[1,2,3]
This becomes extremely important with:
- Prefix Sum
- Hashing
- Sliding Window
- Kadane

<a id="arr-17-monotonic-stack"></a>

### 17. Monotonic Stack ⭐⭐⭐
This is technically a stack pattern, but many important problems start from arrays.
Learn:
Increasing stack
Decreasing stack
Problems:
- Next Greater Element
- Daily Temperatures
- Largest Rectangle in Histogram
Don't learn this yet. It comes after Stack.

<a id="arr-18-advanced-array-techniques"></a>

### 18. Advanced array techniques
Later, after the core patterns:
- Prefix/suffix arrays
- Difference arrays
- Partitioning
- Dutch National Flag
- Cyclic sort
- Sweep line
- Advanced binary search
- Coordinate compression
- Advanced matrix problems

1. What is the input?
2. What is the output?
3. What are the constraints?
4. What is the brute force?
5. What is its complexity?
6. What work is repeated?
7. Can hashing remove it?
8. Can two pointers remove it?
9. Can a sliding window help?
10. Can prefix sum help?
11. Is the data sorted?
12. Would sorting help?
13. Is this a binary-search problem?
14. Is this a subarray problem?
15. Is this an interval problem?
16. Is this a matrix problem?
17. Can I do it in-place?
18. What are the edge cases?
19. Time complexity?
20. Space complexity?
