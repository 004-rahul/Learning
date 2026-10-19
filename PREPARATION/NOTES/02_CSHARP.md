# C# — types, memory, OOP, collections, LINQ, exceptions, GC, async

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 1 Q&A (M1) in full plus the C#/.NET module map. Weeks 1–6 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART A - The type system and memory
- PART B - Object orientation
- PART C - Collections and LINQ
- PART D - Exceptions, lifetime, and the GC
- PART E - async and await (the most asked area at your level)
- C# and .NET module map with exercises (12 Oct guide)
- ➕ C# language basics that interviews assume
- ➕ Modern C# (C# 9 to C# 14) you must recognise
- ➕ Equality, comparison and hash codes in practice
- ➕ Generics: constraints, generic methods, variance, static abstract members
- ➕ Span<T>, Memory<T>, stackalloc and ArrayPool
- ➕ Practical async patterns
- ➕ Diagnostics: counters, traces, dumps and benchmarks
- ➕ .NET Framework vs .NET Core vs modern .NET: the one-page answer

---

<a id="m1-part-a"></a>

## PART A - The type system and memory

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m1-q1"></a>

#### Q1. What is the difference between a value type and a reference type?
Say this. A value type holds the data itself. A reference type holds a reference - an address - and the data lives elsewhere, on the heap. So when you assign or pass one, a value type copies the data and a reference type copies the address, which means both variables then point at the same object.
Why. This one difference explains almost every surprising behaviour in C#: why editing a struct in a list does nothing, why two objects with identical fields are not equal by default, and why passing a large struct around is expensive while passing a large class is not.
Watch out. Do not say "value types go on the stack". That is the answer that gets followed up and it is wrong - see the next question.
<a id="m1-q2"></a>

#### Q2. Where does a struct actually live - the stack or the heap?
Say this. It depends on where it is declared, not on what it is. A local variable of struct type usually lives on the stack. But a struct that is a field of a class lives inside that object, on the heap. A struct in an array lives in the array, on the heap. And a struct captured by a lambda moves to the heap with the closure.
Why. The stack holds the current method's frame. Anything that has to outlive the method - an object, an array, a closure - has to live on the heap, and a struct stored inside one of those goes with it. The type decides copy semantics; the storage location decides where the bytes sit.
Watch out. This is the classic follow-up to the previous question and most candidates get it wrong. Getting it right is a strong signal at your level.
<a id="m1-q3"></a>

#### Q3. What does a variable actually hold?
Say this. For a value type, the bytes of the value. For a reference type, an address - typically 8 bytes on 64-bit - pointing at an object on the heap. The variable itself is just a named slot of a fixed size.
Why. Once you picture it as "slot contains bytes" versus "slot contains address", assignment, parameter passing and equality all stop being surprising. Assignment always copies the slot; the question is only what was in it.
<a id="m1-q4"></a>

#### Q4. Why might passing a struct to a method not change the original?
Say this. Because the method gets a copy. The parameter is a new slot with the same bytes, so any change happens to the copy and is discarded when the method returns. To change the original you pass it by reference with `ref`.
Why. This is not special behaviour for structs - it is the ordinary rule. Reference types look different only because the copied thing is an address, so the method reaches the same object through its own copy of the pointer.
Watch out. A method that takes a class and does `x = new Thing()` also does not change the caller's variable - it reassigns the local copy of the address. Only mutating through the reference is visible outside.
<a id="m1-q5"></a>

#### Q5. When would you choose a struct over a class?
Say this. When it is small, immutable, short-lived and represents a single value - a point, a money amount, a date range. Roughly: 16 bytes or less, no identity, and you will create a lot of them. Everything else should be a class.
Why. Structs avoid a heap allocation and therefore avoid GC pressure, which matters when you create millions of them. But every copy costs a memcpy proportional to size, so a large struct passed around repeatedly is slower than a class, not faster.
Instead of. A class, which is the right default. The allocation is cheap and gen 0 collection is cheap; you reach for a struct only when measurement says allocation rate is the problem.
Watch out. Mutable structs are a bug factory. If you make a struct, make it readonly.
<a id="m1-q6"></a>

#### Q6. What is boxing, what does it cost, and name three places it happens by accident.
Say this. Boxing is wrapping a value type in a heap-allocated object so it can be treated as a reference type. It costs an allocation plus a copy, and later an unbox with a type check. Three accidental places: assigning a value type to `object`; using a non-generic collection or interface like `ArrayList` or `IComparable`; and calling a struct method that was not overridden, so it goes through `object` - `ToString`, `Equals` or `GetHashCode` on a struct that did not override them.
Why. A value type has no object header and no method table pointer, so it cannot be referred to as an object as-is. The runtime allocates a box containing a header plus a copy of the value, and hands you a reference to that.
Watch out. String interpolation and `string.Format` box every value-type argument. In a hot loop that is invisible allocation - one of the most common causes of GC pressure in real code.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] "String interpolation boxes every value-type argument" is outdated. Since C# 10 on .NET 6+, `$"..."` compiles to `DefaultInterpolatedStringHandler.AppendFormatted<T>`, which does not box; `ISpanFormattable` values are written straight into a buffer. Boxing still happens with `string.Format(string, object...)` and other `params object[]` APIs, when the target type is `FormattableString`/`IFormattable`, and on old target frameworks. A safe third 'accidental boxing' example: calling `GetType()` on a struct, or a non-overridden `ToString`/`Equals`/`GetHashCode` on a struct.

<a id="m1-q7"></a>

#### Q7. How do nullable value types work?
Say this. `int?` is `Nullable<int>`, which is itself a struct containing an `int` and a `bool`. So it is not a reference and it is not null in the pointer sense - `HasValue` is just a flag.
Why. That is why `int?` still cannot be dereferenced-null, why it costs 8 bytes rather than 4, and why boxing a `Nullable<T>` with no value produces an actual `null` reference rather than a box - the runtime special-cases it.
Watch out. Nullable arithmetic propagates null silently: `null + 5` is `null`, not an error. In SQL-facing code that is where quiet wrong answers come from.
<a id="m1-q8"></a>

#### Q8. Why are strings immutable, and what does that buy you?
Say this. Once created, a string's characters never change - every operation returns a new string. It buys three things: strings can be shared safely across threads with no locking, they can be interned and reused, and their hash code can be cached, which makes them fast dictionary keys.
Why. A mutable string used as a dictionary key would corrupt the dictionary the moment it changed, because the hash would no longer match the bucket. Immutability makes the hash permanently valid.
Watch out. Immutability is why concatenation in a loop is expensive - see the next question.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] .NET does not cache a string's hash code (Java does). `string.GetHashCode()` is recomputed on each call and is randomised per process, so never persist it. The real benefit of immutability for dictionary keys is that the hash can never change while the string sits in a bucket.

<a id="m1-q9"></a>

#### Q9. Why is string concatenation in a loop O(n squared), and what do you use instead?
Say this. Each `+=` allocates a brand new string and copies everything so far into it. Concatenating n times copies 1 + 2 + 3 ... + n characters, which is O(n squared). `StringBuilder` keeps a growable buffer and appends into it, so the whole loop is O(n) amortised.
Why. StringBuilder doubles its internal buffer when full, the same amortised trick `List<T>` uses, so the total copying is bounded by a constant factor of the final length.
Instead of. Plain `+` is fine for a fixed, small number of pieces - the compiler turns `a + b + c` into a single `string.Concat` call with one allocation. It is only the loop that is quadratic.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] The O(n) conclusion is right but the mechanism is not: .NET `StringBuilder` does not double one buffer like `List<T>`. It keeps a linked list of chunks; when full it adds a new chunk (chunks are capped at 8,000 chars) and never copies earlier text until `ToString()`.

<a id="m1-q10"></a>

#### Q10. Explain ref, out and in.
Say this. `ref` passes a reference to the caller's variable, which must already be initialised and can be read and written. `out` is the same but the variable need not be initialised and the method must assign it before returning. `in` passes by reference but read-only, which avoids copying a large struct without allowing mutation.
Why. All three pass the storage location rather than the value. The difference is purely a contract the compiler enforces about who initialises and who may write.
Watch out. `in` on a struct that is not `readonly` can be slower, not faster: the compiler makes a defensive copy on every member access to guarantee immutability. `in` plus `readonly struct` is the combination that actually pays.
<a id="m1-q11"></a>

#### Q11. What is actually in memory when you write `new Person()`?
Say this. On the heap: an object header (used for locking and a few flags), a method table pointer that identifies the type and enables virtual dispatch, then the fields laid out in order with padding for alignment. On 64-bit that overhead is 16 bytes before any of your data. The variable holds an 8-byte reference to it.
Why. The method table pointer is how virtual dispatch works and how `GetType()` works at all - the object knows its own type because it carries a pointer to the type's description.
Watch out. This is why an object with a single `int` field costs 24 bytes, not 4. When someone asks why a list of a million small objects is using so much memory, this is the answer.
<a id="m1-q12"></a>

#### Q12. When does a static constructor actually run?
Say this. Immediately before the first access to any static member of the type, or before the first instance is created - whichever comes first. The runtime guarantees it runs exactly once and is thread-safe.
Why. The runtime inserts a type-initialisation check; lazily triggering it on first use avoids paying for types you never touch. The thread-safety guarantee is why the static-constructor singleton is the safe one.
Watch out. You cannot predict *when*, only *before what*. An exception thrown from a static constructor becomes a `TypeInitializationException` and the type is permanently unusable for the rest of the process. That is a nasty production failure mode.

<a id="m1-part-b"></a>

## PART B - Object orientation

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m1-q13"></a>

#### Q13. Explain virtual, override and new, and how the runtime picks a method.
Say this. `virtual` says "this may be replaced". `override` replaces it. `new` hides it - a different method that happens to share a name. With `override`, a call through a base reference runs the derived version. With `new`, a call through a base reference runs the base version, because the choice is made at compile time from the reference type.
Why. A virtual call goes through the object's method table: the compiler emits "call slot 4 of whatever this object's type is", and the derived type's table has its own method in slot 4. A non-virtual call is resolved statically, so hiding cannot participate.
Watch out. `new` is almost always a mistake in real code, and it is a favourite interview question precisely because the behaviour surprises people.
<a id="m1-q14"></a>

#### Q14. Interface or abstract class - how do you actually decide?
Say this. Interface when you are describing a capability that unrelated types can have, when you need more than one, or when you want to keep the type free to inherit elsewhere. Abstract class when there is genuine shared implementation and state, and the types really are a family.
Why. C# has single inheritance but multiple interface implementation, so the practical question is: am I spending the one inheritance slot, and is there shared code worth spending it on?
Instead of. Default interface methods blur this, but they still cannot hold state. The moment you need shared fields, it is an abstract class.
Watch out. "Interfaces for contracts, abstract classes for shared code" is the sentence to say. Then give a real example from your own work rather than a shape or animal.
<a id="m1-q15"></a>

#### Q15. State the Equals/GetHashCode contract and what breaks without it.
Say this. If two objects are equal, they must return the same hash code. The reverse is not required - unequal objects may collide. If you override `Equals` without `GetHashCode`, hash-based collections break: you put a key in and cannot find it again, because lookup hashes to one bucket while equality says the item is elsewhere.
Why. A dictionary uses the hash to pick a bucket and only then uses equality within that bucket. Break the invariant and it searches the wrong bucket, so the item is simply invisible.
Watch out. Also: the hash code must not change while the object is a key. Computing a hash from mutable fields and then mutating the object loses the entry permanently - the classic "my dictionary lost my key" bug.
<a id="m1-q16"></a>

#### Q16. Why composition over inheritance?
Say this. Inheritance couples you to a base class's implementation permanently and the coupling is the strongest in the language. Composition lets you swap the collaborator, test it in isolation, and change behaviour at runtime. Inheritance is for genuine is-a relationships; composition is for everything else.
Why. A base class change can break every subclass in ways the compiler cannot catch - the fragile base class problem. A composed dependency has a narrow, explicit interface, so the blast radius is visible.
Watch out. Be ready for "when is inheritance right, then?" Good answers: a framework extension point, a genuine taxonomy with shared state, or a template-method algorithm.
<a id="m1-q17"></a>

#### Q17. What are covariance and contravariance, and why do out and in exist on generics?
Say this. Covariance (`out`) lets you use a more derived type where a less derived one is expected - `IEnumerable<string>` works as `IEnumerable<object>`. Contravariance (`in`) is the reverse for inputs - `Action<object>` works as `Action<string>`. `out` types appear only in output positions, `in` types only in input positions.
Why. The restriction is what makes it type-safe. If `IList<string>` were covariant to `IList<object>`, you could add an `int` to a list of strings. Because `IEnumerable<T>` only ever hands `T` out, there is no way to smuggle the wrong type in.
Watch out. Arrays are covariant and it is a known design mistake - `object[] a = new string[1]; a[0] = 1;` compiles and throws at runtime.
<a id="m1-q18"></a>

#### Q18. Why are .NET generics not Java erasure?
Say this. The .NET runtime keeps generic type information at runtime and generates specialised code per value-type argument. `List<int>` and `List<string>` are genuinely different types with different code. Java erases the parameter to `Object` and inserts casts.
Why. Specialising means `List<int>` stores raw ints with no boxing, which is both faster and smaller. Reference types share one implementation since all references are the same size.
Watch out. This is why you can write `typeof(T)` and `new T()` in C# and not in Java, and why C# needs no `List<Integer>`. Good answer to "have you used other languages?"

<a id="m1-part-c"></a>

## PART C - Collections and LINQ

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m1-q19"></a>

#### Q19. Why is dictionary lookup O(1), and what makes it degrade to O(n)?
Say this. The hash code picks a bucket in constant time, and with a good hash the buckets hold about one item each. It degrades when many keys hash to the same bucket, because then you are walking a chain - a bad or deliberately hostile `GetHashCode`, or a small number of distinct hash values.
Why. Cost is O(1) *average*, not worst case. The average depends entirely on hash distribution, which is why `GetHashCode` quality is a performance concern and not just correctness.
Watch out. A hash code that returns a constant is legal and turns your dictionary into a linked list. Interviewers love this because it is a real production incident, not a puzzle.
<a id="m1-q20"></a>

#### Q20. How does List<T> grow, and why is Add amortised O(1)?
Say this. When the internal array fills, it allocates a new array of double the size and copies everything. A single Add can therefore be O(n), but doubling means the copies get rarer geometrically, so the total cost of n Adds is O(n) - O(1) each on average.
Why. Doubling makes the total copying at most 2n. Growing by a fixed amount instead would make it O(n squared), which is exactly the string concatenation problem.
Watch out. If you know the size, pass capacity to the constructor. It removes every reallocation and every intermediate array - a free win in hot paths.
<a id="m1-q21"></a>

#### Q21. IEnumerable, ICollection, IList, IQueryable - what is the difference and why does it matter?
Say this. `IEnumerable<T>` is forward iteration only. `ICollection<T>` adds Count and mutation. `IList<T>` adds indexing. `IQueryable<T>` looks like `IEnumerable<T>` but builds an expression tree instead of executing, so a provider like EF Core can translate it into SQL.
Why. The one that matters in interviews is the last: the same LINQ query runs in memory on `IEnumerable` and translates to SQL on `IQueryable`. Cast to the wrong one and you accidentally pull the whole table into memory and filter there.
Watch out. `AsEnumerable()` or a `ToList()` in the middle of a query is exactly that bug. Any `Where` after it runs in your process, not the database.
<a id="m1-q22"></a>

#### Q22. What does yield return compile into?
Say this. The compiler generates a state machine class implementing `IEnumerator<T>`, with a field per local variable and an integer tracking where execution stopped. Each `MoveNext` call resumes at that point and runs to the next `yield`.
Why. Nothing in the method body runs until the first `MoveNext`. That is why an iterator that throws on a bad argument throws at enumeration time rather than at call time - a real source of confusing stack traces.
Watch out. It is the same machinery as `async`/`await`. Saying "both are compiler-generated state machines" connects two topics and reads as real understanding.
<a id="m1-q23"></a>

#### Q23. Explain deferred execution and give a bug it causes.
Say this. A LINQ query over `IEnumerable` describes work; it does not do it. It runs when you enumerate. The bug: assign a query to a variable, enumerate it twice, and everything runs twice - two database round trips, or two different results if the source changed in between.
Why. Operators return objects that wrap the source and the operation. `ToList` or `ToArray` are the points at which it actually executes and materialises.
Instead of. Materialise once with `ToList()` when you will use the result more than once. Keep it deferred when you are composing further filters that should reach the database.
Watch out. The subtler variant is capturing a loop variable in the query - the query sees the variable's final value, not the value at the time you wrote the line.
<a id="m1-q24"></a>

#### Q24. What does a closure allocate, and what is the captured-loop-variable trap?
Say this. The compiler creates a hidden class holding the captured variables and allocates one instance; the lambda becomes a method on it. The trap is capturing a loop variable: all the lambdas share one closure instance, so they all see the final value.
Why. The capture is by reference to the variable, not by value. In a `for` loop there is one variable for the whole loop, so one shared field. `foreach` in modern C# gives a fresh variable per iteration, which is why it was changed.
Watch out. Closures also extend object lifetime. A lambda registered on a long-lived event that captures `this` keeps the whole object alive - a very common .NET memory leak.

<a id="m1-part-d"></a>

## PART D - Exceptions, lifetime, and the GC

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m1-q25"></a>

#### Q25. What is the difference between throw and throw ex?
Say this. `throw;` rethrows the original exception and preserves the stack trace. `throw ex;` throws it again from the current line and resets the stack trace, destroying the information about where the problem actually happened.
Why. The trace is stored on the exception object and overwritten when it is thrown. `throw;` is a distinct IL instruction that does not touch it.
Instead of. If you must add context, wrap: `throw new ProcessingException("...", ex)`. That keeps the original as `InnerException` and adds your own frame.
Watch out. This is a two-second question that reveals whether you have ever debugged a production stack trace. Have an opinion about it.
<a id="m1-q26"></a>

#### Q26. Why do exception filters exist?
Say this. The `when` clause decides whether to catch before the stack unwinds. So you can log, inspect or conditionally decline an exception while the original stack is still intact.
Why. A `catch` block runs after unwinding, so by then the frames below you are gone. A filter runs during the first pass of exception handling, before that happens - which matters enormously when debugging.
Watch out. The trick `catch (Exception e) when (Log(e))` where `Log` returns false lets you log everything without catching anything. Genuinely useful, and a good thing to know.
<a id="m1-q27"></a>

#### Q27. What do exceptions actually cost, and why not use them for control flow?
Say this. Throwing is expensive - stack walking, filter evaluation, and it is not optimised because it is assumed rare. A try block that never throws costs essentially nothing. So the cost is in the throw, not in the guarding.
Why. The runtime treats exceptions as exceptional and optimises the happy path. Using them for expected outcomes - "not found", "invalid input" - means paying a large cost on a common path, and it makes the code harder to read because the flow is invisible.
Instead of. `TryParse`-style methods, a result type, or a nullable return for expected failures. Reserve exceptions for genuinely unexpected states.
<a id="m1-q28"></a>

#### Q28. Explain IDisposable and why a finalizer makes collection take two GC cycles.
Say this. `IDisposable` is deterministic cleanup for unmanaged resources - you call `Dispose`, usually via `using`. A finalizer is the safety net the GC calls if you did not. An object with a finalizer cannot be collected on the first pass: the GC puts it on the finalisation queue, a separate thread runs the finalizer, and only the next collection reclaims the memory.
Why. That is the whole reason the full dispose pattern calls `GC.SuppressFinalize(this)` - if you disposed properly, the finalizer is unnecessary and suppressing it lets the object die on the first pass.
Watch out. You almost never write a finalizer. Only a type directly holding an unmanaged handle needs one, and `SafeHandle` already does it better.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] "Two GC cycles" is the minimum. A finalizable object survives into an older generation, so it is reclaimed at the next collection *of that generation* — possibly much later. Prefer `SafeHandle` over writing finalizers.

<a id="m1-q29"></a>

#### Q29. Explain GC generations and the large object heap.
Say this. Gen 0 is new objects, gen 1 is a buffer, gen 2 is long-lived. Collections start with gen 0, which is cheap because most new objects are already dead and survivors are few. Gen 2 is expensive because it means walking everything. Objects over roughly 85 KB go on the large object heap, which is not compacted by default and therefore fragments.
Why. It rests on the generational hypothesis: most objects die young. Collecting only the young region most of the time makes the common case very cheap.
Watch out. The practical lesson is that GC tuning is almost never the fix. Allocation rate is. Reduce allocations - pooling, `Span<T>`, streaming instead of buffering - and the GC problem goes away.
<a id="m1-q30"></a>

#### Q30. Workstation GC or server GC?
Say this. Server GC for anything server-side: one heap and one collection thread per core, so collections run in parallel and throughput is much higher. Workstation GC for desktop apps, where low latency on one thread matters more than throughput.
Why. Server GC trades memory for throughput - more heaps means more total memory but far less pause time per collection under load.
Watch out. It is on by default for ASP.NET Core but not for a console app. A worker service processing a queue is a server workload; check that it is enabled.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] Server GC is no longer simply 'one heap per core'. .NET 7 moved from segments to regions; .NET 9 turned on DATAS (Dynamic Adaptation To Application Sizes) by default with Server GC, which starts with one heap and grows or shrinks the heap count with load. In containers the heap count follows the CPU limit. Worker Service projects do not enable Server GC by default — check the `.csproj`.


<a id="m1-part-e"></a>

## PART E - async and await (the most asked area at your level)

*Source: Q-and-A/M1_CSharp_and_Memory.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m1-q31"></a>

#### Q31. What does await actually do?
Say this. The compiler rewrites the method into a state machine. At an `await` on something not yet complete, the method returns to its caller and the thread goes back to the pool. A continuation is registered, and when the operation completes the state machine resumes from where it stopped.
Why. The key insight is that nothing is faster. `async` does not speed up the I/O - it stops a thread sitting idle while the I/O happens. That is what lets a server handle thousands of concurrent requests with a few dozen threads.
Watch out. If the awaited task is already complete, there is no state transition and no thread switch - it just continues synchronously. That fast path is why `ValueTask` exists.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] At an incomplete `await` the thread returns to its *caller*; it goes back to the thread pool only if it was a pool thread in the first place.

<a id="m1-q32"></a>

#### Q32. Walk me through the generated state machine.
Say this. The compiler produces a struct or class with an integer `_state`, a field for each local that survives an await, a `TaskAwaiter` field, and a `MoveNext` method containing your code as a switch over the state. Call it, and `MoveNext` runs until the first incomplete await, stores the state, hooks up a continuation, and returns.
Why. Locals become fields because the stack frame disappears when the method returns. Anything needed after resumption has to live somewhere that survives, so it is lifted onto the state machine object.
Watch out. Say you have read this in SharpLab. It is a Month 1 exercise for exactly this reason, and "I have seen the generated code" is a much stronger claim than the description.
<a id="m1-q33"></a>

#### Q33. Why is async void almost always wrong?
Say this. You cannot await it, so the caller cannot know when it finished. Worse, an exception inside it cannot be captured into a returned task, so it is raised on the synchronisation context and typically crashes the process instead of surfacing at a `catch`.
Why. The whole point of returning `Task` is that it carries both completion and failure back to the caller. `async void` throws that channel away.
Instead of. `async Task`. The single legitimate exception is an event handler, whose signature you do not control - and there you should wrap the body in try/catch yourself.
<a id="m1-q34"></a>

#### Q34. Why does calling .Result deadlock?
Say this. In a context with a synchronisation context - classic ASP.NET, or a UI app - the continuation must resume on that one specific thread. If you block that exact thread waiting on `.Result`, the continuation can never run, so the task never completes, so the block never ends. Each is waiting on the other.
Why. The continuation is by default posted back to the captured context. That is convenient for UI code and lethal when combined with blocking.
Instead of. `await` all the way up. If you genuinely cannot, `ConfigureAwait(false)` on the inner awaits removes the context capture and breaks the cycle.
Watch out. ASP.NET Core has no synchronisation context, so it does not deadlock this way - but blocking still consumes a pool thread, and under load that becomes thread starvation, which shows up as rising latency rather than a hang. Say both halves; most candidates only know the first.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] In classic ASP.NET the continuation needs the request context (one thread at a time), not one specific thread; a UI app needs the specific UI thread. In ASP.NET Core there is no such context, so the symptom is thread-pool starvation instead.

<a id="m1-q35"></a>

#### Q35. What does ConfigureAwait(false) do and when do you need it?
Say this. It says "do not capture the synchronisation context; resume anywhere". You need it in library code that might be called from a UI or legacy ASP.NET app, to avoid forcing continuations onto that context and to avoid the deadlock above.
Why. Capturing the context costs a thread hop on every await and creates the blocking hazard. A library has no reason to care which thread it resumes on.
Watch out. In an ASP.NET Core application you do not need it - there is no context to capture. Knowing when it is unnecessary is as good a signal as knowing when it is.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] `ConfigureAwait(false)` only breaks the deadlock if *every* await below the blocking call uses it, including in third-party code. That is fragile. The real fix is 'async all the way' — never block on async code.

<a id="m1-q36"></a>

#### Q36. Task or ValueTask?
Say this. `Task` by default. `ValueTask` when the method very often completes synchronously and sits in a hot path - it avoids allocating a Task object for the already-finished case. The cost is a much stricter contract: you may only await it once, and you must not block on it.
Why. `Task` is a class, so every call allocates. If 95% of calls hit a cache and return immediately, that allocation is pure waste, which is what `ValueTask` removes.
Instead of. Reach for `Task` unless a profiler pointed you here. `ValueTask` misuse - awaiting twice - is a real and hard-to-find bug.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Task is a class, so every call allocates' is too absolute: synchronously completed `async Task` methods return a cached completed task, and `Task<bool>`, small `Task<int>` values and default results are cached. ValueTask rules worth saying aloud: never await it twice, never await it concurrently, never read `.Result` before it completes — call `.AsTask()` if you need any of those.

<a id="m1-q37"></a>

#### Q37. How does CancellationToken work, and why is it not "killing a thread"?
Say this. It is cooperative. The token is a shared flag; the operation checks it at safe points and chooses to stop, throwing `OperationCanceledException`. Nothing is forcibly terminated.
Why. Aborting a thread mid-operation would leave locks held and state half-written, which is why `Thread.Abort` was removed from .NET Core entirely. Cooperative cancellation means the code stops at a point where its invariants hold.
Watch out. Pass the token all the way down - to the HTTP call, the database command, the queue receive. A token that is accepted and never checked is the most common mistake here.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] `Thread.Abort` still exists as an API but throws `PlatformNotSupportedException` on .NET Core/.NET 5+ (obsolete as SYSLIB0006). The point stands: cancellation is cooperative.

<a id="m1-q38"></a>

#### Q38. What is thread pool starvation and how would you spot it?
Say this. The pool has a limited number of threads and injects new ones slowly - roughly one or two per second. If work blocks threads faster than that, everything queues. You spot it as latency climbing while CPU stays low, and a growing thread pool queue length.
Why. The pool is tuned for short non-blocking work items. Blocking calls hold a thread doing nothing, and the injection rate is deliberately conservative to avoid thrashing.
Watch out. Low CPU plus high latency is the signature. If CPU were high it would be a different problem. Saying that distinction out loud is the answer that lands.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Outdated] The thread-injection rate is a runtime implementation detail, not a fixed 'one or two per second'. Threads are created immediately up to the minimum (default = processor count); above that, a hill-climbing/starvation algorithm throttles injection. .NET 6 replaced the native pool with a managed one and newer runtimes react faster when they detect sync-over-async blocking. Safe wording: "deliberately throttled above the minimum; the exact rate depends on the runtime version."

<a id="m1-q39"></a>

#### Q39. Concurrency or parallelism - what is the difference?
Say this. Concurrency is dealing with many things at once - interleaving, often on one thread, usually I/O-bound. Parallelism is doing many things at the same instant on multiple cores, usually CPU-bound. `async`/`await` is a concurrency tool; `Parallel.For` is a parallelism tool.
Why. Confusing them is what makes people wrap I/O in `Task.Run` - which adds a thread hop and solves nothing, because the thread was never the bottleneck.
Watch out. On a server, `Task.Run` around async I/O is almost always wrong: it consumes a pool thread to do work that needed no thread.
<a id="m1-q40"></a>

#### Q40. How is your email pipeline work an async and concurrency story?
Say this. The original was one long sequential job: process a message, wait, process the next. Most of the elapsed time was waiting rather than computing. Making it event-driven with SES, EventBridge and SQS let many consumers work independently, so the waiting overlapped instead of accumulating - which is why it went from seven to ten hours down to about ninety minutes.
Why. That is concurrency at the system level: the same total work, but the idle time is shared rather than serialised. It is the same principle as `await` inside one process, one layer up.
Watch out. Be ready for "so what was the bottleneck afterwards?" Have an answer - the new limit is downstream throughput or database contention, not the queue.


## C# and .NET module map with exercises (12 Oct guide)

<a id="f05-s5"></a>

### 5. C# and .NET from basic to advanced

*Source: FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md (12 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*


Use C# as both the interview language and project language. Keep frameworks separate from language fundamentals in your notes. For a new project, .NET 10 LTS is a sensible default; the [official support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) lists .NET 8 support ending 10 November 2026. Keep enough Framework knowledge to explain your real work.

| Module | Foundation → deeper coverage | Required small exercise |
|---|---|---|
| Language mechanics | Types, conversions, operators, control flow, methods, nullability, exceptions, `checked`; value/reference semantics; `ref/out/in`, nullable value types | Predict 6 assignment/parameter examples, run them, explain mismatches |
| Objects and contracts | Classes, structs, records, interfaces, abstract classes, encapsulation, inheritance, composition; virtual/override/new; equality/hash code | Model a job and handlers, then replace one handler without editing callers |
| Collections and generics | Array, List, Dictionary, HashSet, Stack, Queue, PriorityQueue; generic constraints; equality comparers; variance at explanation depth | Choose structures for five operations and justify costs; write a custom comparer |
| Delegates and LINQ | Delegates, lambdas, closures, events; IEnumerable/IEnumerator; yield; deferred execution, repeated enumeration, IQueryable boundary | Demonstrate closure capture and a query executing twice; rewrite a hot path clearly |
| Resource lifetime | `using`, IDisposable/IAsyncDisposable, finalization, unmanaged resources, ownership; exception propagation and `throw` vs `throw ex` | Dispose an owned resource correctly on success, exception and cancellation |
| Async | Task vs thread; I/O vs CPU work; async state machine; await; WhenAll/WhenAny; cancellation and timeouts; async void; sync-over-async | Build 3 concurrent I/O calls with cancellation, partial failures and bounded concurrency |
| Concurrency | Race, atomicity, visibility, lock ordering, Monitor, Interlocked, SemaphoreSlim; ConcurrentDictionary compound operations; bounded Channels | Reproduce a race, fix it, then build a bounded producer/consumer with graceful shutdown |
| Runtime and memory | CLR/CoreCLR, IL/JIT, SDK/runtime, GC roots/generations/LOH, boxing; allocation vs retention; server GC; stack location is not the definition of a value type | Observe allocations/counters and explain one retained object; benchmark rather than guess |
| ASP.NET Core | Hosting/Kestrel, middleware order, routing, binding, validation, error responses, DI lifetimes, options, configuration, structured logging | Build a small API from an understood template; reproduce/fix a captive dependency |
| HTTP clients and background work | IHttpClientFactory or correctly managed long-lived clients, connection reuse/DNS lifetime, timeout/cancellation, retry safety; BackgroundService scopes/shutdown | Call a slow fake dependency and stop cleanly without infinite retries |
| EF Core | DbContext lifetime, tracking, projections, eager/explicit/lazy loading, N+1, split queries, transactions, optimistic concurrency, migrations | Capture generated SQL, remove N+1, reproduce a conflicting update |
| Diagnostics and performance | dotnet-counters, traces/dumps, CPU vs allocation vs blocked work, thread-pool starvation, BenchmarkDotNet; Span/Memory/ArrayPool/ValueTask when warranted | Produce a before/after measurement for one real bottleneck and state limitations |
| Advanced options | Expression trees, reflection, source generators, AOT/trimming, assembly loading, unsafe code | Explain purpose/trade-offs. Implement only where the project or target role needs it |

Do not memorize runtime implementation trivia without a use case. You should explain why an API stalls, allocates heavily, deadlocks or produces duplicate effects before studying obscure JIT details.


<a id="add-cs-basics"></a>

## ➕ C# language basics that interviews assume

Interviewers rarely ask these directly. They show up inside other questions, for example "why is this total wrong?" or "why did this compile but fail at runtime?". Know each one in two sentences.

### Numeric types: int, long, decimal, double

| Type | Size | What it is | Use it for |
|---|---|---|---|
| `int` | 32-bit | Whole number, max about 2.1 billion | Counters, IDs that stay small |
| `long` | 64-bit | Whole number, max about 9.2 x 10^18 | Large IDs, money in minor units (paise, cents) |
| `double` | 64-bit | Binary floating point, about 15-17 digits | Measurements, science, ratios |
| `decimal` | 128-bit | Base-10 number, 28-29 digits | **Money**, prices, tax, anything a user adds up |

- **Mechanism.** `double` stores numbers in base 2. Many base-10 fractions (0.1, 0.2) have no exact base-2 form, so small errors appear. `decimal` stores base-10 digits, so 0.1 is exact.
- **Tiny example.**

```csharp
Console.WriteLine(0.1 + 0.2 == 0.3);    // False (double)
Console.WriteLine(0.1m + 0.2m == 0.3m); // True  (decimal)
```

- **Trade-off.** `decimal` is slower because the CPU has no native decimal maths. That is fine for money. Do not use it in a tight numeric loop.
- **Say this about payments.** "I store money as `decimal` in C# and `DECIMAL(19,4)` or similar in SQL, or as a `long` count of minor units. Never `double`."

### Conversions and casting

- **Implicit** conversion happens when no data can be lost: `int` to `long`, `int` to `double`.
- **Explicit** conversion (a cast) is needed when data can be lost: `long` to `int`, `double` to `int`.

```csharp
int i = 42;
long l = i;              // implicit, safe
double d = 9.99;
int n = (int)d;          // explicit: 9 (truncates toward zero, no rounding)
int r = (int)Math.Round(2.5);   // 2: Math.Round uses banker's rounding by default
int a = (int)Math.Round(2.5, MidpointRounding.AwayFromZero); // 3
```

- **Failure case.** `(int)` on a `double` cuts off the fraction. People expect rounding and get a smaller number. For money, decide the rounding rule (`ToEven` or `AwayFromZero`) with the business and write it down.
- **Reference casts.** `(Order)obj` throws `InvalidCastException` if the type is wrong. `obj as Order` returns `null`. Modern code uses a pattern: `if (obj is Order o) { ... }`.

### Integer division and remainder

```csharp
Console.WriteLine(7 / 2);     // 3   (int / int = int, fraction dropped)
Console.WriteLine(7 / 2.0);   // 3.5 (one side is double)
Console.WriteLine(-7 / 2);    // -3  (truncates toward zero)
Console.WriteLine(-7 % 2);    // -1  (sign follows the left side)
```

- **Failure case.** `int percent = done / total * 100;` is 0 for every value below 100%. Write `done * 100 / total`, or convert to `double` or `decimal` first.

### Overflow and `checked`

- **Definition.** Overflow happens when a result is too big for the type.
- **Mechanism.** By default, `int` and `long` arithmetic is *unchecked*: it silently wraps around. `checked` makes it throw `OverflowException`.

```csharp
int max = int.MaxValue;
int wrapped = max + 1;              // -2147483648, no error
int safe = checked(max + 1);        // throws OverflowException at runtime
```

- **Other types.** `decimal` always throws on overflow. `double` becomes `Infinity` and does not throw.
- **Trade-off.** `checked` costs a little speed. Use it where a wrong number is worse than an exception: money totals, quantities, sizes. You can turn it on for a whole project with `<CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>`.

### Operators and short-circuit

- `&&` and `||` **short-circuit**. The right side runs only if needed.
- `&` and `|` on `bool` always run both sides.
- `??` gives a default for null. `??=` assigns only if null. `?.` stops at null.

```csharp
if (order != null && order.Total > 0) { }   // safe: right side skipped when order is null
string name = customer?.Name ?? "unknown";
cache ??= new Dictionary<int, string>();
```

- **Failure case.** `if (order != null & order.Total > 0)` throws `NullReferenceException`, because both sides run.

### `switch` statement vs `switch` expression

- A **statement** runs code. Each case must end with `break`, `return` or `throw`. C# has no fall-through between cases that contain code.
- An **expression** returns a value. It is shorter and the compiler warns if it is not exhaustive.

```csharp
// statement
switch (status)
{
    case JobStatus.Queued: Log("waiting"); break;
    case JobStatus.Failed: Retry(); break;
    default: break;
}

// expression
string label = status switch
{
    JobStatus.Queued  => "Waiting",
    JobStatus.Running => "In progress",
    JobStatus.Failed  => "Failed",
    _                 => "Unknown"
};
```

- **Failure case.** If a switch expression has no matching arm at runtime, it throws `SwitchExpressionException`. Keep the `_` arm, or handle every value and treat the compiler warning as an error.

### `var` vs `dynamic` vs `object`

| | Type decided | Errors found | Notes |
|---|---|---|---|
| `var` | Compile time (inferred) | Compile time | Still strongly typed. Just shorter to write. |
| `object` | Compile time (`object`) | Compile time; you must cast | Value types get boxed. |
| `dynamic` | Runtime | **Runtime** (`RuntimeBinderException`) | No IntelliSense, no compile checks. |

- **Say this.** "`var` is not dynamic. `var x = 5;` is an `int` forever. I use `dynamic` almost never, maybe for COM interop or quick JSON experiments."

### Method overloading

- **Definition.** Same method name, different parameter lists. The return type alone is not enough.
- **Mechanism.** The compiler picks the overload at **compile time** from the static types of the arguments.

```csharp
void Print(object o) => Console.WriteLine("object");
void Print(string s) => Console.WriteLine("string");

object x = "hello";
Print(x);      // "object": the static type of x is object
Print("hi");   // "string"
```

- **Failure case.** People expect the runtime type to choose the overload. It does not. That is what `virtual` and `override` are for.

### Optional, named and `params` parameters

```csharp
void Send(string to, string subject = "(none)", bool urgent = false) { }

Send("a@b.com");                       // uses defaults
Send("a@b.com", urgent: true);         // named argument skips subject
```

- **Mechanism.** The default value is copied into the **caller's** compiled code.
- **Failure case.** If a library changes a default value, old callers keep the old value until they are recompiled. For public library APIs, prefer overloads.
- **`params`** lets the caller pass any number of arguments: `int Sum(params int[] values)`. Since C# 13, `params` can also be a span or collection type, such as `params ReadOnlySpan<int>`, which can avoid an array allocation.

### Scope

- A variable lives inside the `{ }` block where it is declared.
- C# does not let you reuse a local name in an inner block while the outer one is in scope. That is a compile error, which prevents shadowing bugs.
- `using var stream = ...;` disposes the object at the end of the enclosing block.

### `const` vs `readonly` vs `static readonly`

| | Set when | Allowed types | Watch out |
|---|---|---|---|
| `const` | Compile time | Numbers, `string`, `bool`, `char`, enums | Value is **copied into callers' assemblies**. Change it, and old callers keep the old value until rebuilt. |
| `readonly` (instance) | In the declaration or constructor | Any | One value per object. |
| `static readonly` | Once, at type initialisation | Any | Good for shared objects, for example `static readonly TimeSpan Timeout = TimeSpan.FromSeconds(30);` |

- **Failure case.** `readonly List<int> _items` stops you replacing the list. It does **not** stop `_items.Add(5)`. "Readonly field" is not the same as "immutable object". Use `IReadOnlyList<T>` or an immutable collection when you need that.

### Enums and `[Flags]`

- An enum is a named set of integer constants. The underlying type is `int` by default.
- **Failure case 1.** Any integer can be cast to an enum: `(JobStatus)42` is legal. Validate input from APIs and databases.
- **Failure case 2.** If you store an enum as an int in the database, never reorder or remove values. Give explicit numbers: `Queued = 1, Running = 2`. Keep `0` for "None" or "Unknown", because `0` is the default value.
- **`[Flags]`** is for combinations. Use powers of two.

```csharp
[Flags]
enum Permission { None = 0, Read = 1, Write = 2, Delete = 4, Admin = Read | Write | Delete }

var p = Permission.Read | Permission.Write;
bool canWrite = (p & Permission.Write) != 0;   // or p.HasFlag(Permission.Write)
Console.WriteLine(p);                           // "Read, Write"
```

<a id="add-cs-modern"></a>

## ➕ Modern C# (C# 9 to C# 14) you must recognise

You do not need every feature. You must recognise them in a code review or live-coding round, and say one sentence about each. .NET 10 ships with C# 14. Source: [What's new in C# 14](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-14).

### Records and `with` (C# 9; record structs C# 10)

- **Definition.** A record is a type built for data. The compiler generates value-based equality, `ToString`, deconstruction and support for `with`.

```csharp
public record JobDto(Guid Id, string Name, JobStatus Status);

var a = new JobDto(id, "Export", JobStatus.Queued);
var b = a with { Status = JobStatus.Running };   // copy with one change
Console.WriteLine(a == b);                        // False: Status differs
```

- **Mechanism.** `with` makes a **shallow** copy, then sets the listed properties.
- **Failure case.** A shallow copy shares inner objects. If the record holds a `List<T>`, both copies point to the same list.
- **Trade-off.** Records are great for DTOs, messages and value objects. Do not use records for EF Core entities. Entities have identity, and value equality confuses change tracking.

### `init` and `required` (C# 9, C# 11)

```csharp
public class CreateJobRequest
{
    public required string Name { get; init; }    // must be set, only in the initializer
    public int Priority { get; init; } = 5;
}

var req = new CreateJobRequest { Name = "Export" }; // OK
// var bad = new CreateJobRequest();               // compile error: Name is required
// req.Name = "x";                                 // compile error: init-only
```

- **Watch out.** `required` is checked by the compiler for C# callers. A JSON deserializer or reflection can still create an object without it. `System.Text.Json` honours `required` since .NET 7, but still validate API input.

### Pattern matching

```csharp
string Describe(object o) => o switch
{
    null                                  => "nothing",
    int n when n < 0                      => "negative int",             // type + guard
    int and >= 0 and < 10                 => "small int",                // relational (C# 9)
    Order { Status: OrderStatus.Paid }    => "paid order",               // property pattern
    Order { Customer.Country: "IN" }      => "Indian customer",          // extended property (C# 10)
    int[] [1, 2, ..]                      => "array starting 1, 2",      // list pattern (C# 11)
    int[] [var first, .., var last]       => $"from {first} to {last}",
    _                                     => "something else"
};
```

- **Mechanism.** The compiler turns patterns into ordinary type checks and comparisons. Arms are tested top to bottom.
- **Failure case.** Order matters. A general arm placed above a specific one hides it. The compiler reports this as an error when it can prove the later arm is unreachable.

### Switch expressions (C# 8)

Covered in the basics section above. Remember: they return a value and must cover every case.

### Nullable reference types (C# 8; on by default in new projects since .NET 6)

- **Definition.** With `<Nullable>enable</Nullable>`, `string` means "should not be null" and `string?` means "may be null". The compiler warns when you might dereference null.
- **Key point.** This is **compile-time only**. At runtime `string` and `string?` are the same type. Nothing stops a null coming from JSON, a database or old code.
- **Failure case.** `user!.Name` (the null-forgiving `!`) silences the warning. It does not prevent the exception. Use it only when you can prove the value is not null.

### Primary constructors for classes (C# 12)

```csharp
public class JobService(IJobRepository repo, ILogger<JobService> logger)
{
    public Task<Job?> GetAsync(Guid id) => repo.FindAsync(id);
}
```

- **Mechanism.** The parameters are in scope for the whole class. The compiler captures them in hidden fields when needed.
- **Failure case.** The captured parameters are **not readonly**. Code can reassign `repo` by mistake. They are also not properties. For records, primary constructor parameters *do* become public properties. For classes they do not.

### Collection expressions (C# 12)

```csharp
int[] a = [1, 2, 3];
List<int> b = [..a, 4, 5];          // spread
ReadOnlySpan<char> c = ['x', 'y'];
List<string> empty = [];
```

- One syntax for arrays, lists, spans and other collection types. The compiler picks an efficient way to build each target type.

### Raw string literals (C# 11)

```csharp
string json = """
    { "name": "Export", "path": "C:\temp" }
    """;
int id = 7;
string sql = $$"""
    SELECT * FROM Jobs WHERE Id = {{id}} AND Meta = '{"a":1}'
    """;
```

- No escaping needed. The indentation of the closing `"""` is removed from every line. With `$$`, interpolation uses `{{ }}`, so single braces stay as text.
- **Failure case.** Do not build SQL with interpolation in real code. The example shows syntax only. Use parameters, or EF Core's `FromSql`, which turns interpolated values into parameters.

### File-scoped namespaces and global usings (C# 10)

```csharp
namespace Jobs.Api;                 // applies to the whole file, one less indent level

// GlobalUsings.cs
global using System.Text.Json;
```

- `<ImplicitUsings>enable</ImplicitUsings>` in the `.csproj` adds common global usings for you, such as `System`, `System.Linq` and `System.Threading.Tasks`.

### Top-level statements (C# 9)

- `Program.cs` can contain statements directly, with no `class Program` and no `static void Main`. The compiler generates the `Main` method. That is why a modern ASP.NET Core `Program.cs` starts with `var builder = WebApplication.CreateBuilder(args);`.
- **Watch out.** Only one file per project can have top-level statements.

### C# 13 and C# 14 items to recognise

| Feature | Version | One line |
|---|---|---|
| `params` collections | C# 13 | `params ReadOnlySpan<T>` or `params List<T>`, not only arrays. |
| `System.Threading.Lock` + `lock` | C# 13 / .NET 9 | `lock` on a `Lock` object uses a faster, dedicated lock type. |
| `field` keyword | C# 14 | Use the compiler-generated backing field inside a property accessor: `set => field = value.Trim();` |
| Extension members | C# 14 | `extension(...)` blocks add extension **properties** and static extension members, not only methods. |
| Null-conditional assignment | C# 14 | `customer?.Order = GetOrder();` assigns only if `customer` is not null. |
| `nameof(List<>)` | C# 14 | `nameof` accepts unbound generic types. |
| Implicit span conversions | C# 14 | Arrays convert to `Span<T>`/`ReadOnlySpan<T>` more naturally, including as extension method receivers. |
| Lambda parameter modifiers | C# 14 | `(text, out result) => int.TryParse(text, out result)` without writing types. |
| Partial constructors and events | C# 14 | Mainly for source generators. |
| User-defined compound assignment | C# 14 | A type can define `+=` itself, to update in place (mainly for performance). |

All C# 14 items above are listed as shipped on the Microsoft Learn C# 14 page. Exact rules (for example, which conversions count as "implicit span conversions") are detailed there. (verify the details before quoting them in an interview)

<a id="add-cs-equality"></a>

## ➕ Equality, comparison and hash codes in practice

Part B, Q15 already covers the Equals/GetHashCode **contract**. This section is the practical side: which operator does what, and how to write it correctly.

### Reference equality vs value equality

- **Reference equality:** "Are these the same object in memory?" `ReferenceEquals(a, b)`.
- **Value equality:** "Do these hold the same data?"
- Classes use reference equality by default. Structs use value equality by default (field by field). Records use value equality (generated by the compiler).

### `==` vs `Equals`

| Type | `==` does | `Equals` does |
|---|---|---|
| Class (no overrides) | Reference compare | Reference compare |
| `string` | Value compare (overloaded) | Value compare |
| Record | Value compare (generated) | Value compare (generated) |
| Struct (no overrides) | **Compile error** unless you define `==` | Field-by-field. It can use reflection, so it is slow. |

- **Mechanism.** `==` is an operator. It is chosen at **compile time** from the static type. `Equals` is a virtual method. It is chosen at **runtime**.

```csharp
object a = "hi";
object b = new string("hi".ToCharArray());
Console.WriteLine(a == b);        // False: static type is object, so reference compare
Console.WriteLine(a.Equals(b));   // True: string.Equals runs at runtime
```

- **Failure case.** Comparing two strings typed as `object` with `==` gives the wrong answer. Use `Equals` or `string.Equals(x, y, StringComparison.Ordinal)`.

### Records' generated equality

- The compiler generates `Equals`, `GetHashCode`, `==`, `!=` and an `EqualityContract` property. Two records are equal only if their runtime types match **and** every field is equal.
- **Failure case.** The fields are compared with their own `Equals`. A `List<string>` field compares by reference, so two records with "the same" lists are not equal.

```csharp
record Tag(string Name, List<string> Aliases);
var x = new Tag("a", ["b"]);
var y = new Tag("a", ["b"]);
Console.WriteLine(x == y);   // False: different List instances
```

Fix: use an immutable collection with value semantics, or override `Equals` in the record yourself.

### `IEquatable<T>`

- **What.** A strongly typed `Equals(T other)`.
- **Why.** For structs, `Equals(object)` boxes the argument. `Dictionary<TKey,TValue>`, `HashSet<T>` and `List<T>.Contains` call `IEquatable<T>.Equals` when it exists, so there is no boxing.
- **Rule.** If you implement `IEquatable<T>`, also override `Equals(object)` and `GetHashCode` so they agree.

```csharp
public readonly struct Money : IEquatable<Money>
{
    public decimal Amount { get; }
    public string Currency { get; }
    public Money(decimal amount, string currency) => (Amount, Currency) = (amount, currency);

    public bool Equals(Money other) => Amount == other.Amount && Currency == other.Currency;
    public override bool Equals(object? obj) => obj is Money m && Equals(m);
    public override int GetHashCode() => HashCode.Combine(Amount, Currency);
    public static bool operator ==(Money l, Money r) => l.Equals(r);
    public static bool operator !=(Money l, Money r) => !l.Equals(r);
}
```

(In real code, `public readonly record struct Money(decimal Amount, string Currency);` generates all of this for you.)

### Writing `GetHashCode` with `HashCode.Combine`

- Combine exactly the fields that `Equals` compares. No more, no fewer.
- `HashCode.Combine` accepts up to 8 values. For more, use `var h = new HashCode(); h.Add(x); ... return h.ToHashCode();`.
- The result is **randomised per process**. Never store a hash code in a database or send it to another service.
- **Failure case.** If `Equals` ignores case (`"ABC"` equals `"abc"`) but `GetHashCode` uses `Name.GetHashCode()`, equal objects get different hashes and lookups fail. Use `StringComparer.OrdinalIgnoreCase.GetHashCode(Name)` in that case.

### `IComparable<T>`, `IComparer<T>`, `IEqualityComparer<T>`

| Interface | Question it answers | Where it lives | Used by |
|---|---|---|---|
| `IComparable<T>` | "Is this before or after that?" | Inside the type (its natural order) | `List<T>.Sort()`, `Array.Sort`, `OrderBy` with no comparer |
| `IComparer<T>` | Same question, but from outside | A separate object | `Sort(comparer)`, `SortedDictionary`, `PriorityQueue` |
| `IEqualityComparer<T>` | "Are these equal, and what is the hash?" from outside | A separate object | `Dictionary`, `HashSet`, `Distinct`, `GroupBy` |

```csharp
// Case-insensitive keys without changing the key type
var byEmail = new Dictionary<string, User>(StringComparer.OrdinalIgnoreCase);

// Sort jobs by priority, then by created time
var comparer = Comparer<Job>.Create((a, b) =>
{
    int c = b.Priority.CompareTo(a.Priority);          // high priority first
    return c != 0 ? c : a.CreatedAt.CompareTo(b.CreatedAt);
});
jobs.Sort(comparer);
```

- **Use an external comparer when** you cannot change the type, or the same type needs different orders in different places.
- **CompareTo contract.** Return negative, zero or positive. Never return `a - b` for `int` values: it can overflow and give the wrong sign. Use `a.CompareTo(b)`.

### Mutable keys

Part B, Q15 explains why a key's hash must not change while it is in a dictionary. The practical rules:

- Make key types immutable: `readonly struct`, records with `init` properties, or strings.
- If a class must be mutable, compute its hash only from an ID that never changes.
- Never put EF Core entities with database-generated IDs into a `HashSet` **before** saving. The ID changes from 0 to a real value on save, and the item becomes impossible to find.

<a id="add-cs-generics"></a>

## ➕ Generics: constraints, generic methods, variance, static abstract members

Part B, Q17 and Q18 cover variance and why .NET generics are not erased. This section adds constraints and newer features.

### Constraints

A constraint tells the compiler what `T` can do. Without one, you can only use `object` members on `T`.

| Constraint | Means | Lets you |
|---|---|---|
| `where T : class` | T is a reference type | Compare with `null`, use `as` |
| `where T : class?` | Reference type, nullable allowed | Same, in nullable-aware code |
| `where T : struct` | Non-nullable value type | Use `T?` as `Nullable<T>` |
| `where T : notnull` | Any non-nullable type | Safe dictionary keys (C# 8) |
| `where T : unmanaged` | A struct with no references inside | Use `stackalloc T[n]`, `sizeof(T)`, pointers |
| `where T : new()` | Has a public parameterless constructor | Write `new T()` |
| `where T : IJob` | Implements an interface | Call `IJob` members on `T` |
| `where T : BaseEntity` | Derives from a class | Call base class members |
| `where T : Enum` / `Delegate` | Enum / delegate type (C# 7.3) | Generic enum helpers |
| `where T : allows ref struct` | T may be a `ref struct` such as `Span<T>` (C# 13) | Generic code over spans. (Advanced; recognise only.) |

- **Order rule.** `class`/`struct`/`notnull`/`unmanaged` come first, then a base class, then interfaces, and `new()` comes last.

```csharp
public interface IEntity { Guid Id { get; } }

public sealed class InMemoryRepo<T> where T : class, IEntity
{
    private readonly Dictionary<Guid, T> _items = new();
    public void Add(T item) => _items[item.Id] = item;          // allowed: T is IEntity
    public T? Find(Guid id) => _items.GetValueOrDefault(id);    // allowed: T is a class
}
```

- **Trade-off.** `new()` forces the type to have a public parameterless constructor, so it cannot demand its dependencies. Prefer passing a `Func<T>` factory, or use DI.

### Generic methods

- A method can be generic even inside a non-generic class. The compiler usually infers `T` from the arguments.

```csharp
public static T MaxBy<T, TKey>(IEnumerable<T> items, Func<T, TKey> key) where TKey : IComparable<TKey>
{
    using var e = items.GetEnumerator();
    if (!e.MoveNext()) throw new InvalidOperationException("Empty sequence");
    T best = e.Current;
    TKey bestKey = key(best);
    while (e.MoveNext())
    {
        TKey k = key(e.Current);
        if (k.CompareTo(bestKey) > 0) (best, bestKey) = (e.Current, k);
    }
    return best;
}

var newest = MaxBy(jobs, j => j.CreatedAt);   // T = Job, TKey = DateTime, inferred
```

(LINQ already has `MaxBy` since .NET 6. This is just to show the shape.)

### Variance recap with one safe example

- `out T` (covariant): the interface only **returns** T. `IEnumerable<out T>`, `IReadOnlyList<out T>`, `Func<out TResult>`.
- `in T` (contravariant): the interface only **accepts** T. `IComparer<in T>`, `Action<in T>`.

```csharp
IReadOnlyList<string> names = ["a", "b"];
IReadOnlyList<object> objects = names;          // OK: covariant, read-only, safe

IComparer<object> byHash = Comparer<object>.Create((x, y) => x.GetHashCode().CompareTo(y.GetHashCode()));
IComparer<string> forStrings = byHash;          // OK: contravariant, a comparer of objects can compare strings
```

- **Failure case.** `List<string>` cannot become `List<object>`, because `List<T>` has `Add(T)`. You could then add an `int` to a list of strings. Variance only works on **interfaces and delegates**, and only for **reference types**: `IEnumerable<int>` is not `IEnumerable<object>`.

### Static abstract interface members (C# 11, .NET 7) - overview

- **Definition.** An interface can require a **static** member: a static method, property or operator.
- **Why.** Before this, generic code could not call `T.Parse(...)` or use `+` on `T`. This feature is the base of **generic math** (`INumber<T>`, `IAdditionOperators<...>`).

```csharp
public interface IParsableId<TSelf> where TSelf : IParsableId<TSelf>
{
    static abstract TSelf Parse(string text);
}

public readonly record struct JobId(Guid Value) : IParsableId<JobId>
{
    public static JobId Parse(string text) => new(Guid.Parse(text));
}

static T ReadId<T>(string text) where T : IParsableId<T> => T.Parse(text);   // static call on T

// Generic math with built-in interfaces
static T Sum<T>(IEnumerable<T> values) where T : INumber<T>
{
    T total = T.Zero;
    foreach (var v in values) total += v;
    return total;
}
```

- **Say this.** "It lets an interface describe static capabilities, so I can write one `Sum<T>` for `int`, `decimal` and `double`. The JIT specialises the code for each value type, so there is no boxing."
- **Trade-off.** It is powerful but rare in business code. Use it in libraries and shared utilities, not in every service.

<a id="add-cs-span"></a>

## ➕ Span<T>, Memory<T>, stackalloc and ArrayPool

Part D, Q29 says "reduce allocations with pooling and `Span<T>`". This section explains what those tools are and when they are worth it.

### `Span<T>` and `ReadOnlySpan<T>`

- **Definition.** A span is a **view** over a block of memory: part of an array, part of a string, stack memory or native memory. It holds a reference and a length. It does not copy data.
- **Mechanism.** Slicing a span makes a new view. No allocation.

```csharp
string line = "JOB-2026-000123,Export,Queued";
ReadOnlySpan<char> s = line.AsSpan();

int comma = s.IndexOf(',');
ReadOnlySpan<char> idPart = s[..comma];          // "JOB-2026-000123", no new string
int number = int.Parse(idPart[^6..]);            // parse "000123" directly from the span
```

The `string.Split` version allocates an array and three strings for every line. The span version allocates nothing.

### Why `Span<T>` cannot live on the heap

- `Span<T>` is a `ref struct`. It can point into the **stack**. If a span were stored on the heap, it could outlive the stack frame it points to, and then point at garbage memory.
- So the compiler forbids putting a span anywhere that might go to the heap:
  - no `Span<T>` field in a class (or in a normal struct);
  - no boxing to `object` or casting to an interface;
  - no capture in a lambda;
  - it cannot stay alive across an `await` (C# 13 allows span locals in async methods, but not across an `await`);
  - it cannot be a generic argument, unless the generic parameter says `allows ref struct` (C# 13).

### `Memory<T>` and `ReadOnlyMemory<T>`

- **Definition.** The heap-friendly cousin of `Span<T>`. It is a normal struct, so you can store it in a field, pass it to async methods, and keep it across `await`.
- Get a span from it when you do the actual work: `memory.Span`.

```csharp
public async Task<int> ReadHeaderAsync(Stream stream, Memory<byte> buffer, CancellationToken ct)
{
    int read = await stream.ReadAsync(buffer, ct);    // Memory<T> works across await
    return ParseLength(buffer.Span[..read]);          // switch to Span for the sync work
}
```

### `stackalloc`

- **Definition.** Allocates a small buffer on the **stack**. It is freed when the method returns. The GC is not involved.

```csharp
Span<byte> buffer = stackalloc byte[256];
bool ok = Guid.NewGuid().TryWriteBytes(buffer);
```

- **Failure case.** The stack is small (often about 1 MB per thread). A large or user-controlled size can cause a `StackOverflowException`, and that **kills the process**. You cannot catch it. Use a fixed, small size. For bigger sizes, rent from the pool:

```csharp
const int MaxStack = 512;
byte[]? rented = null;
Span<byte> buf = length <= MaxStack
    ? stackalloc byte[MaxStack]
    : (rented = ArrayPool<byte>.Shared.Rent(length));
try
{
    buf = buf[..length];
    // ... use buf ...
}
finally
{
    if (rented is not null) ArrayPool<byte>.Shared.Return(rented);
}
```

### `ArrayPool<T>`

- **Definition.** A shared pool of arrays. You **rent** an array and **return** it, instead of allocating a new one each time.
- **Why.** Large temporary buffers (over about 85 KB) go to the Large Object Heap, which is expensive to collect (Part D, Q29). Pooling avoids that churn.
- **Rules.**
  - `Rent(n)` can return an array **larger** than `n`. Always track the real length yourself.
  - Always `Return` in a `finally`.
  - Never use the array after returning it. Another caller may already have it.
  - The rented array is not cleared. If it held secrets (tokens, card data), return it with `Return(array, clearArray: true)`.
- **Failure case.** Forgetting to return is not a crash. The pool just allocates new arrays, so you lose the benefit silently. Using the array after return is worse: two requests share data.

### When this matters, and when it doesn't

| Matters | Doesn't matter |
|---|---|
| Hot paths that run millions of times: parsers, serializers, protocol handling, log processing | A normal CRUD endpoint that calls a database (the database round trip costs far more than a few small allocations) |
| A profiler or `dotnet-counters` shows a high allocation rate or frequent gen-0/gen-2 GCs | Code that runs a few times per request |
| Libraries used by many apps | Code where readability matters more than microseconds |

- **Say this.** "I reach for `Span` and `ArrayPool` only after measuring. In most of my services the database and network dominate. But for something like parsing large CSV exports line by line, spans removed most of the per-line string allocations." (Only say the last sentence if you have actually done it.)
- Many framework APIs already use spans inside: `int.Parse(ReadOnlySpan<char>)`, `System.Text.Json`, Kestrel. You often get the benefit for free by calling the span overloads.

<a id="add-cs-async-patterns"></a>

## ➕ Practical async patterns

Part E explains what `await` does. This section is about **using** it well in real services: several calls at once, limits, timeouts and clean shutdown.

### `Task.WhenAll` and partial failures

- **Definition.** `Task.WhenAll` returns one task that completes when **all** the given tasks complete.
- **Mechanism.** If some tasks fail, the combined task is faulted. Its `Exception` property is an `AggregateException` that holds **every** failure. But `await` rethrows only the **first** one.

```csharp
Task<A> t1 = GetAAsync(ct);
Task<B> t2 = GetBAsync(ct);
Task all = Task.WhenAll(t1, t2);
try
{
    await all;
}
catch
{
    // 'await' threw only the first exception. Look at all of them:
    foreach (var ex in all.Exception?.InnerExceptions ?? Enumerable.Empty<Exception>())
        logger.LogWarning(ex, "A dependency failed");
}
```

- **Inspect each task**, not just the exception. After `WhenAll` finishes, every task is complete, so these are safe and do not block:
  - `task.IsCompletedSuccessfully` then `task.Result`
  - `task.IsFaulted` then `task.Exception!.InnerException`
  - `task.IsCanceled`
- **Failure case.** `all.Exception` is `null` when tasks were only cancelled (no faults). That is why the code uses `?.`.
- **.NET 9+:** `Task.WhenEach(tasks)` lets you `await foreach` over tasks **as they finish**, which is useful to show partial results early.

### Worked example: call 3 slow services at once, 2-second timeout, handle one failure

Goal: build a dashboard from profile, orders and offers. The profile is required. Orders and offers are optional: if one fails or is slow, show the rest.

```csharp
public sealed record Dashboard(Profile Profile, Orders? Orders, Offers? Offers, IReadOnlyList<string> Problems);

public async Task<Dashboard> LoadDashboardAsync(Guid userId, CancellationToken requestToken)
{
    // 1. One token for this operation: cancelled if the caller cancels OR after 2 seconds.
    using var cts = CancellationTokenSource.CreateLinkedTokenSource(requestToken);
    cts.CancelAfter(TimeSpan.FromSeconds(2));
    CancellationToken ct = cts.Token;

    // 2. Start all three. Nothing is awaited yet, so they run concurrently.
    Task<Profile> profileTask = _profiles.GetAsync(userId, ct);
    Task<Orders>  ordersTask  = _orders.GetRecentAsync(userId, ct);
    Task<Offers>  offersTask  = _offers.GetActiveAsync(userId, ct);

    // 3. Wait for all of them. Do not let the first failure stop us from reading the others.
    try
    {
        await Task.WhenAll(profileTask, ordersTask, offersTask);
    }
    catch when (!requestToken.IsCancellationRequested)
    {
        // Ignore here. We inspect each task below.
    }

    // 4. If the *caller* cancelled (for example, the client disconnected), stop now.
    requestToken.ThrowIfCancellationRequested();

    var problems = new List<string>();
    Orders? orders = ValueOrNull(ordersTask, "orders", problems);
    Offers? offers = ValueOrNull(offersTask, "offers", problems);

    // 5. Required part: if it failed, fail the whole call (the API returns 503 or 504).
    if (!profileTask.IsCompletedSuccessfully)
        throw new DependencyUnavailableException("profile", profileTask.Exception?.InnerException);

    return new Dashboard(profileTask.Result, orders, offers, problems);
}

private T? ValueOrNull<T>(Task<T> task, string name, List<string> problems) where T : class
{
    if (task.IsCompletedSuccessfully) return task.Result;       // safe: already complete

    string reason = task.IsCanceled ? "timed out" : "failed";
    _logger.LogWarning(task.Exception?.InnerException, "{Dependency} {Reason}", name, reason);
    problems.Add($"{name} {reason}");
    return null;
}
```

Explain it in four sentences:
1. All three calls start before any `await`, so the total time is about the slowest call, not the sum.
2. A **linked token** joins the request's token with a 2-second timer. The token is passed down, so the HTTP calls really stop. They do not keep running in the background.
3. `await Task.WhenAll` throws only the first error, so I catch it and then check **each task's** status.
4. Required data fails the request. Optional data degrades to `null` with a logged reason.

`DependencyUnavailableException` is your own exception type. Map it to 503 or 504 in your exception handler.

### Bounded concurrency

Starting 10,000 HTTP calls at once can exhaust connections, hit the other service's rate limit, or overload your database. Limit how many run at the same time.

**Option 1: `SemaphoreSlim`**

```csharp
using var gate = new SemaphoreSlim(initialCount: 10);       // at most 10 at a time

var tasks = jobIds.Select(async id =>
{
    await gate.WaitAsync(ct);
    try   { return await _client.ProcessAsync(id, ct); }
    finally { gate.Release(); }                               // always release
});
Result[] results = await Task.WhenAll(tasks);
```

- **Trade-off.** It creates all the task objects up front. That is fine for thousands of items, not for millions. It also keeps going after a failure, which you may or may not want.

**Option 2: `Parallel.ForEachAsync` (.NET 6+)**

```csharp
var results = new ConcurrentBag<Result>();
await Parallel.ForEachAsync(jobIds,
    new ParallelOptions { MaxDegreeOfParallelism = 10, CancellationToken = ct },
    async (id, token) =>
    {
        results.Add(await _client.ProcessAsync(id, token));
    });
```

- It pulls items one by one, so it does not build all tasks first.
- **Watch out 1.** Always set `MaxDegreeOfParallelism` for I/O work. If you leave it as default, `ForEachAsync` uses the processor count, which may be too low for I/O or too high for a fragile dependency. (verify the default for your runtime version)
- **Watch out 2.** The first exception cancels the remaining work, and the method throws. If you want "process all, collect errors", catch inside the body.
- **Watch out 3.** The body runs concurrently. Use thread-safe collections, as shown.

**Option 3: a bounded `Channel<T>`** for producer/consumer pipelines (Part A of the .NET chapter, Q10).

### Timeouts: `CancelAfter` vs `WaitAsync`

| | What happens at the timeout | Use when |
|---|---|---|
| `cts.CancelAfter(t)` + pass the token | The operation is **asked to stop**. It throws `OperationCanceledException`. | The API accepts a `CancellationToken` (almost all modern APIs). |
| `task.WaitAsync(t)` (.NET 6+) | **You stop waiting.** It throws `TimeoutException`. The operation **keeps running** in the background. | The API has no token parameter. |

```csharp
// Old library with no CancellationToken:
Report r = await legacy.BuildReportAsync().WaitAsync(TimeSpan.FromSeconds(5), ct);
```

- **Failure case.** With `WaitAsync`, the abandoned work still uses connections and CPU. If it later fails, nobody observes the exception. Prefer real cancellation when you can.
- `HttpClient.Timeout` (default 100 seconds) is a separate, per-client timeout. Keep it, but use tokens for per-call limits.

### Linked tokens

```csharp
using var cts = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken, requestToken);
cts.CancelAfter(TimeSpan.FromSeconds(30));
```

- The linked token is cancelled when **any** source is cancelled, or when the timer fires.
- **Always dispose** a linked source. It registers a callback on each parent token. If the parent lives long (for example, the host's `stoppingToken`), forgetting to dispose leaks those registrations.
- **Telling causes apart.** After an `OperationCanceledException`, check `requestToken.IsCancellationRequested` (caller gave up) versus your own timeout (`cts.IsCancellationRequested` but not the caller's).

### `IAsyncEnumerable<T>` and `await foreach`

- **Definition.** An async stream: items arrive one at a time, and you `await` between them.

```csharp
public async IAsyncEnumerable<JobRow> ReadJobsAsync(
    [EnumeratorCancellation] CancellationToken ct = default)
{
    await foreach (var row in _db.Jobs.AsNoTracking().AsAsyncEnumerable().WithCancellation(ct))
        yield return row;
}

await foreach (var job in ReadJobsAsync(ct))
    await exporter.WriteAsync(job, ct);
```

- **Why.** Memory stays flat. You do not load 1 million rows into a `List` first.
- ASP.NET Core can return `IAsyncEnumerable<T>` from an endpoint, and `System.Text.Json` streams it to the client.
- **Failure case.** While you iterate an EF Core query, the database connection and reader stay open. Slow work per row (such as an HTTP call for each row) holds the connection for a long time. For slow per-row work, read a batch, close it, then process.
- `[EnumeratorCancellation]` makes the token passed through `WithCancellation(ct)` reach your method.

### Async disposal: `IAsyncDisposable` and `await using`

- Some cleanup needs I/O: flushing a stream, closing a network connection, committing a buffer. Doing that in a sync `Dispose` would block a thread.
- `IAsyncDisposable.DisposeAsync()` does it asynchronously. `await using` calls it for you, even if an exception is thrown.

```csharp
await using var conn = new NpgsqlConnection(connString);
await conn.OpenAsync(ct);
await using var tx = await conn.BeginTransactionAsync(ct);
// ... work ...
await tx.CommitAsync(ct);
```

- **Implementing it** (only if your class owns an async-disposable resource):

```csharp
public sealed class ExportWriter : IAsyncDisposable
{
    private readonly Stream _stream;
    public ExportWriter(Stream stream) => _stream = stream;

    public async ValueTask DisposeAsync()
    {
        await _stream.FlushAsync();
        await _stream.DisposeAsync();
    }
}
```

- **Failure case.** Writing `using var` (not `await using`) on a type that only implements `IAsyncDisposable` does not compile. On a type that implements both, plain `using` calls the **sync** `Dispose`, which may block or skip the async flush. The DI container calls `DisposeAsync` on scoped services when the scope is disposed asynchronously. ASP.NET Core does this for request scopes.

### Sync-over-async and how to remove it

**What it is.** Blocking a thread to wait for async work: `.Result`, `.Wait()`, `.GetAwaiter().GetResult()`, or `Task.Run(...).Result`. Part E, Q34 and Q38 explain the deadlock and thread-pool starvation it causes.

**How to find it.**
- Search the code for `.Result`, `.Wait(`, `GetAwaiter().GetResult()`.
- Under load, `dotnet-counters` shows a growing thread-pool queue and thread count while CPU stays low (see the diagnostics section below).
- A dump (`dotnet-dump`, `parallelstacks`) shows many threads waiting inside `Task.Wait` or `ManualResetEventSlim.Wait`.

**How to remove it, case by case.**

| Where the blocking is | Fix |
|---|---|
| In a method that could be async | Make it `async Task`, then make its callers async too. Go "async all the way" up to the controller or handler. |
| In a constructor | Constructors cannot be async. Use a static `CreateAsync` factory method, or do the async work later in an `InitializeAsync` method. |
| In DI registration, to load config or a token at startup | Do it in an `IHostedService.StartAsync`, or make the service lazy and async (`GetTokenAsync`). |
| Inside `lock` | Replace `lock` with `SemaphoreSlim.WaitAsync` (Part A of the .NET chapter, Q8). |
| An interface method that is sync | Add an async version (`Task<T> GetAsync(...)`), move callers over, then delete the sync one. |
| In `Main` of a console app | Use `static async Task Main` or top-level statements with `await`. |
| A third-party library only offers sync APIs | Leave it sync and call it from sync code. Do not wrap it in `Task.Run` on a server; that just moves the blocking to another pool thread. |

- **Say this.** "The fix is almost never `ConfigureAwait(false)` or `Task.Run`. The fix is to make the whole call chain async, starting from the bottom (the I/O call) and moving up."

<a id="add-cs-diagnostics"></a>

## ➕ Diagnostics: counters, traces, dumps and benchmarks

**Interview point:** do not guess, measure. Name the tool, what you look at, and what the numbers mean. All tools below are free .NET global tools (`dotnet tool install --global dotnet-counters`, and so on). With the .NET 10 SDK you can also run them once without installing: `dnx dotnet-counters ...`. Source: [dotnet-counters](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters).

### `dotnet-counters`: the first look (live numbers, low overhead)

```bash
dotnet-counters ps                                   # find the process id
dotnet-counters monitor -p 1234 --counters System.Runtime,Microsoft.AspNetCore.Hosting
```

What to read. On .NET 9 and later, the runtime publishes **metrics** with new names. On .NET 8 and earlier, the tool falls back to the older **EventCounters**.

| Question | .NET 9+ metric name | .NET 8 and earlier counter |
|---|---|---|
| Is work waiting for a pool thread? | `dotnet.thread_pool.queue.length` | `threadpool-queue-length` |
| Is the pool adding threads? | `dotnet.thread_pool.thread.count` | `threadpool-thread-count` |
| How fast do we allocate? | `dotnet.gc.heap.total_allocated` (watch how fast it grows) | `alloc-rate` |
| How big is the heap? | `dotnet.gc.last_collection.heap.size` (per generation) | `gc-heap-size`, `gen-2-size`, `loh-size` |
| How much time do GC pauses take? | `dotnet.gc.pause.time` | `time-in-gc` |
| CPU | `dotnet.process.cpu.time` | `cpu-usage` |
| Lock contention | `dotnet.monitor.lock_contentions` | `monitor-lock-contention-count` |

Names from [dotnet-counters](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters) and [well-known EventCounters](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/available-counters).

### `dotnet-trace`: where does the time go?

```bash
dotnet-trace collect -p 1234 --duration 00:00:00:30
```

- With no profile given, current versions collect `dotnet-common` plus `dotnet-sampled-thread-time`. The old `cpu-sampling` profile name was removed from `collect`. Other profiles: `gc-verbose` (GC plus allocation sampling), `gc-collect`, `database` (ADO.NET and EF Core commands). (verify with `dotnet-trace list-profiles` for your tool version)
- Output is a `.nettrace` file. Open it in Visual Studio or PerfView on Windows. Use `--format Speedscope` to view it at speedscope.app.
- It answers: "Which methods are on the stack most of the time?" and "Which types are allocated most?"

### `dotnet-dump`: what is every thread doing right now?

```bash
dotnet-dump collect -p 1234          # Full dump by default; large, contains memory
dotnet-dump analyze ./core_20261019_101500
> threadpool                          # pool state and queued work
> parallelstacks                      # merged stacks of all threads (like VS Parallel Stacks)
> clrstack -all                       # managed stack of every thread
> dumpasync                           # async state machines waiting on the heap
> syncblk                             # who holds which lock
> dumpheap -stat                      # object count and size by type
> gcroot <address>                    # why is this object still alive?
```

- **Watch out.** A full dump contains memory, so it can contain secrets and personal data. Treat it like production data. In a container with a memory limit, collecting a large dump can push the process over the limit.

### `dotnet-gcdump`: what is on the managed heap?

```bash
dotnet-gcdump collect -p 1234        # writes a .gcdump file
```

- Smaller than a full dump. It holds only the object graph: types, counts, sizes and references. Open it in Visual Studio or PerfView.
- Take two snapshots a few minutes apart and **compare** them. The types that keep growing are your leak suspects.
- **Watch out.** Collecting it triggers a full (gen 2) GC, which pauses the app. Do it on one instance, not the whole fleet at once.

### BenchmarkDotNet: compare two implementations properly

```csharp
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]                                    // adds an "Allocated" column
public class ParseBenchmarks
{
    private const string Line = "JOB-2026-000123,Export,Queued";

    [Benchmark(Baseline = true)]
    public int WithSplit() => int.Parse(Line.Split(',')[0][^6..]);

    [Benchmark]
    public int WithSpan()
    {
        ReadOnlySpan<char> s = Line;
        return int.Parse(s[..s.IndexOf(',')][^6..]);
    }
}

public static class Program
{
    public static void Main() => BenchmarkRunner.Run<ParseBenchmarks>();
}
```

- Run it in Release: `dotnet run -c Release`. A Debug build gives meaningless numbers.
- Read the **Mean** (time per call), the **Error/StdDev** (how stable it is), the **Ratio** against the baseline, and **Allocated** (bytes per call).
- **Why not a `Stopwatch` loop?** BenchmarkDotNet warms up the JIT, runs many iterations, removes outliers and prevents the compiler from deleting unused results. A hand-written loop often measures the JIT or nothing at all.
- **Trade-off.** A micro-benchmark shows one method in isolation. Confirm the gain in the real app with counters or a load test.

### Telling the three problems apart

| Symptom | CPU | Thread pool | GC / allocation | Next tool and what you expect to see |
|---|---|---|---|---|
| **CPU-bound** (too much computing) | High, near the core count | Queue small or normal | Normal | `dotnet-trace`: a few hot methods at the top of the stacks (a bad regex, JSON in a loop, an O(n squared) algorithm). |
| **Blocked** (sync-over-async, locks, slow I/O on pool threads) | **Low** | **Queue length grows, thread count climbs slowly** | Normal | `dotnet-dump` with `parallelstacks`/`clrstack -all`: many threads stuck in `.Result`, `Wait()`, `Monitor.Enter` or a sync DB call. `syncblk` for lock owners. |
| **Allocation-heavy** (GC pressure) | Medium to high, part of it spent in GC | Usually normal | **High allocation rate, frequent GCs, high GC pause time**, gen-2 or LOH growing | `dotnet-trace --profile gc-verbose` to find which types are allocated and where. For a leak (heap keeps growing), compare two `dotnet-gcdump` snapshots, then `gcroot`. |

- **Say this.** "First `dotnet-counters`, to classify the problem in one minute. Then the right deep tool: trace for CPU, dump for blocking, gcdump or a GC trace for memory. Then fix, and measure again before and after."

<a id="add-cs-framework-vs-modern"></a>

## ➕ .NET Framework vs .NET Core vs modern .NET: the one-page answer

The .NET chapter (Part B, Q12) has the short answer. This page adds the timeline, the concrete differences, and a version you can say in 60 seconds. Dates are from the [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core), checked 19 Oct 2026.

### Three names, one story

- **.NET Framework** is the original, **Windows-only** platform from 2002. It is installed into Windows, one machine-wide copy. The last version is **4.8.x** (4.8.1). It still gets security and reliability fixes, but **no new features**. Its support follows the Windows version it runs on. (verify the exact 4.8.1 lifecycle for a given Windows version)
- **.NET Core** (1.0 to 3.1) was a **rewrite**: cross-platform, open source, installed per app, much faster.
- **.NET 5 and later** is simply called **.NET**. It continues .NET Core. Microsoft dropped the word "Core" and skipped the number 4, to avoid confusion with Framework 4.x. This is the only line that gets new features.

### Timeline

| Version | Released | Type | End of support |
|---|---|---|---|
| .NET Framework 4.8 / 4.8.1 | 2019 / 2022 | Windows component | Follows the Windows lifecycle (verify) |
| .NET Core 1.0 | June 2016 | - | June 2019 |
| .NET Core 2.1 | May 2018 | LTS | Aug 2021 |
| .NET Core 3.1 | Dec 2019 | LTS | Dec 2022 |
| .NET 5 | Nov 2020 | Current (first "unified" release) | May 2022 |
| .NET 6 | Nov 2021 | LTS | Nov 2024 |
| .NET 7 | Nov 2022 | STS | May 2024 |
| .NET 8 | Nov 2023 | LTS | **10 Nov 2026** |
| .NET 9 | Nov 2024 | STS | **10 Nov 2026** |
| **.NET 10** | **11 Nov 2025** | **LTS (current)** | 14 Nov 2028 |
| .NET 11 | Expected Nov 2026 | STS (verify) | - |

- **LTS** (Long-Term Support): even numbers, supported for **3 years**.
- **STS** (Standard-Term Support): odd numbers, now supported for **2 years** (it used to be 18 months). That is why .NET 8 (LTS) and .NET 9 (STS) end on the same day.
- A new major version ships **every November**.
- **Practical rule:** new services should target **.NET 10**. Anything on .NET 8 or 9 should be planned for upgrade before 10 Nov 2026.

### What actually changed from Framework to modern .NET

| Area | .NET Framework (classic ASP.NET MVC / Web API) | Modern .NET (ASP.NET Core) |
|---|---|---|
| Operating systems | Windows only | Windows, Linux, macOS; runs well in Linux containers |
| Install model | One machine-wide version; upgrading Windows can change it for every app | **Side-by-side**: many runtime versions on one machine, or **self-contained** (the runtime ships inside the app) |
| Web server | IIS only, through `System.Web` | **Kestrel**, a built-in cross-platform server. IIS, Nginx or a load balancer can sit in front as a reverse proxy. |
| Request pipeline | `Global.asax`, HTTP modules and handlers | A **middleware pipeline** you build in `Program.cs` |
| Dependency injection | Not built in; teams added Unity, Autofac, Ninject | **Built in** (`IServiceCollection`), used by the whole framework |
| Configuration | `web.config` / `app.config`, `ConfigurationManager` | Layered providers: JSON, environment variables, secrets, command line; the options pattern |
| Logging | Third-party (log4net, NLog) | `ILogger` built in, with providers |
| Performance | Good for its time | Much faster: `Span<T>`, tiered JIT with Dynamic PGO, a faster Kestrel, many allocation reductions in each release |
| Project files | Long XML `.csproj`, `packages.config` | Short SDK-style `.csproj`, `dotnet` CLI |
| Source | Reference source only | Fully open source on GitHub |

**Not available in modern .NET** (these need a replacement, not a recompile):
- ASP.NET Web Forms → Razor Pages, MVC or Blazor.
- WCF **server** → gRPC, REST, or the community **CoreWCF** project. (A WCF *client* library exists.)
- Multiple **AppDomains** and **.NET Remoting** → separate processes, or `AssemblyLoadContext` for plugin loading.
- Code Access Security → OS and container security.
- `System.Web` (`HttpContext.Current`) → `IHttpContextAccessor` (use sparingly).
- Windows-only APIs (registry, WinForms, WPF) still work, but **only on Windows**.

### Migration in one paragraph

1. Move class libraries to **.NET Standard 2.0** or multi-target, so both old and new apps can use them.
2. Use the .NET Upgrade Assistant to convert project files and find incompatible APIs. (verify the current tool name and status)
3. Rebuild the web layer: controllers mostly port; `Global.asax`, filters, `web.config` and DI setup are rewritten in `Program.cs`.
4. Run old and new side by side behind a proxy and move routes one at a time (the "strangler fig" approach), instead of one big switch.

### The 60-second spoken version

> ".NET Framework is the original, Windows-only platform. It is installed once per machine, and version 4.8 is the end of the line: it gets fixes, not features.
>
> .NET Core was the rewrite: cross-platform, open source, and installed per application, so different apps can use different runtime versions side by side. From version 5, Microsoft dropped the word 'Core', so today it is just '.NET', and it is the only line that gets new features. A new version ships every November. Even numbers are LTS with three years of support, and odd numbers are STS with two years. Today .NET 10 is the current LTS, and .NET 8 and 9 both go out of support on 10 November 2026.
>
> The changes that matter to a backend developer are these: it runs on Linux and in containers; Kestrel replaces the dependency on IIS; dependency injection, configuration and logging are built in; the request pipeline is middleware instead of `Global.asax` and HTTP modules; and it is much faster.
>
> When migrating, most C# code moves easily. The hard parts are Windows-only and `System.Web` dependencies: Web Forms, WCF hosting, AppDomains and `HttpContext.Current`. Those need a redesign, not a recompile."

Then add one honest sentence from your own work: which project was on Framework, which on Core, and one thing you had to change. Do not invent a migration you did not do.
