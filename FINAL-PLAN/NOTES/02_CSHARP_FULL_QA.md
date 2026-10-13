# C#: complete memory, OOP, collections and async Q&A

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="Q01"></a>

## Q01 — M1_CSharp_and_Memory

Full source content: [Q-and-A/M1_CSharp_and_Memory.docx](../SOURCE_LIBRARY/Q-and-A/M1_CSharp_and_Memory.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.

> Read with these corrections: modern interpolation may avoid boxing; string hash caching and ThreadPool growth are implementation-specific; JWT revocation can use stateful checks; SQL isolation differs by engine. With endpoint routing, CORS belongs after routing and before authorization. Specific correction notes follow the affected statements where identified.


<a id="Q01-B0001"></a>

Month 1 Q&A - C#, Memory and Async

<a id="Q01-B0002"></a>

Weeks 1 to 4. The month that turns "I use C#" into "I understand C#". 42 questions.

<a id="Q01-B0003"></a>

Covers: Weeks 1-4. Type system, memory, OOP, collections, LINQ, delegates, exceptions, lifetime, async.

<a id="Q01-B0004"></a>

Read this on the train. You do not need a laptop, a compiler or two free hours - that is the whole point of these files. Each question has the answer you would say, the reason it is true, and the mistake to avoid. Read one question or twenty; it works either way.

<a id="Q01-B0005"></a>

### How to use this on a bad week

<a id="Q01-B0006"></a>

•  20 minutes on a train: read the five questions in the box below. Nothing else.

<a id="Q01-B0007"></a>

•  Reading is not learning. After each question, close the file and say the answer out loud once. On a train, mouth it silently - it still works. If you cannot, read it again and move on. You will meet it again.

<a id="Q01-B0008"></a>

•  Mark what you could not say. Put it in the WEAK tab of the tracker when you get home. That is the only homework.

<a id="Q01-B0009"></a>

•  This replaces nothing. The tracker still runs the plan. This is what you do with the hours the plan cannot use - the commute, the wait, the evening you are too tired to code.

<a id="Q01-B0010"></a>

### If you only have 20 minutes, read these five

<a id="Q01-B0011"></a>

| # | Question |
| --- | --- |
| 1 | What is the difference between a value type and a reference type? |
| 2 | Where does a struct actually live - stack or heap? |
| 3 | What is boxing and what does it cost? |
| 4 | What does await actually do? |
| 5 | Why does calling .Result deadlock? |

<a id="Q01-B0012"></a>

### What this file answers

<a id="Q01-B0013"></a>

Everything in the Month 1 checkpoint, plus the follow-up questions an interviewer asks after your first answer. If you can say all 42 of these out loud, Month 1 is done - regardless of how many days you managed to sit down.

<a id="Q01-B0014"></a>

### PART A - The type system and memory

<a id="Q01-Q001"></a>

<a id="Q01-B0015"></a>

### Q1. What is the difference between a value type and a reference type?

<a id="Q01-B0016"></a>

Say this. A value type holds the data itself. A reference type holds a reference - an address - and the data lives elsewhere, on the heap. So when you assign or pass one, a value type copies the data and a reference type copies the address, which means both variables then point at the same object.

<a id="Q01-B0017"></a>

Why. This one difference explains almost every surprising behaviour in C#: why editing a struct in a list does nothing, why two objects with identical fields are not equal by default, and why passing a large struct around is expensive while passing a large class is not.

<a id="Q01-B0018"></a>

Watch out. Do not say "value types go on the stack". That is the answer that gets followed up and it is wrong - see the next question.

<a id="Q01-Q002"></a>

<a id="Q01-B0019"></a>

### Q2. Where does a struct actually live - the stack or the heap?

<a id="Q01-B0020"></a>

Say this. It depends on where it is declared, not on what it is. A local variable of struct type usually lives on the stack. But a struct that is a field of a class lives inside that object, on the heap. A struct in an array lives in the array, on the heap. And a struct captured by a lambda moves to the heap with the closure.

<a id="Q01-B0021"></a>

Why. The stack holds the current method's frame. Anything that has to outlive the method - an object, an array, a closure - has to live on the heap, and a struct stored inside one of those goes with it. The type decides copy semantics; the storage location decides where the bytes sit.

<a id="Q01-B0022"></a>

Watch out. This is the classic follow-up to the previous question and most candidates get it wrong. Getting it right is a strong signal at your level.

<a id="Q01-Q003"></a>

<a id="Q01-B0023"></a>

### Q3. What does a variable actually hold?

<a id="Q01-B0024"></a>

Say this. For a value type, the bytes of the value. For a reference type, an address - typically 8 bytes on 64-bit - pointing at an object on the heap. The variable itself is just a named slot of a fixed size.

<a id="Q01-B0025"></a>

Why. Once you picture it as "slot contains bytes" versus "slot contains address", assignment, parameter passing and equality all stop being surprising. Assignment always copies the slot; the question is only what was in it.

<a id="Q01-Q004"></a>

<a id="Q01-B0026"></a>

### Q4. Why might passing a struct to a method not change the original?

<a id="Q01-B0027"></a>

Say this. Because the method gets a copy. The parameter is a new slot with the same bytes, so any change happens to the copy and is discarded when the method returns. To change the original you pass it by reference with `ref`.

<a id="Q01-B0028"></a>

Why. This is not special behaviour for structs - it is the ordinary rule. Reference types look different only because the copied thing is an address, so the method reaches the same object through its own copy of the pointer.

<a id="Q01-B0029"></a>

Watch out. A method that takes a class and does `x = new Thing()` also does not change the caller's variable - it reassigns the local copy of the address. Only mutating through the reference is visible outside.

<a id="Q01-Q005"></a>

<a id="Q01-B0030"></a>

### Q5. When would you choose a struct over a class?

<a id="Q01-B0031"></a>

Say this. When it is small, immutable, short-lived and represents a single value - a point, a money amount, a date range. Roughly: 16 bytes or less, no identity, and you will create a lot of them. Everything else should be a class.

<a id="Q01-B0032"></a>

Why. Structs avoid a heap allocation and therefore avoid GC pressure, which matters when you create millions of them. But every copy costs a memcpy proportional to size, so a large struct passed around repeatedly is slower than a class, not faster.

<a id="Q01-B0033"></a>

Instead of. A class, which is the right default. The allocation is cheap and gen 0 collection is cheap; you reach for a struct only when measurement says allocation rate is the problem.

<a id="Q01-B0034"></a>

Watch out. Mutable structs are a bug factory. If you make a struct, make it readonly.

<a id="Q01-Q006"></a>

<a id="Q01-B0035"></a>

### Q6. What is boxing, what does it cost, and name three places it happens by accident.

<a id="Q01-B0036"></a>

Say this. Boxing is wrapping a value type in a heap-allocated object so it can be treated as a reference type. It costs an allocation plus a copy, and later an unbox with a type check. Three accidental places: assigning a value type to `object`; using a non-generic collection or interface like `ArrayList` or `IComparable`; and calling a struct method that was not overridden, so it goes through `object` - `ToString`, `Equals` or `GetHashCode` on a struct that did not override them.

<a id="Q01-B0037"></a>

Why. A value type has no object header and no method table pointer, so it cannot be referred to as an object as-is. The runtime allocates a box containing a header plus a copy of the value, and hands you a reference to that.

<a id="Q01-B0038"></a>

Watch out. String interpolation and `string.Format` box every value-type argument. In a hot loop that is invisible allocation - one of the most common causes of GC pressure in real code.


> Study correction: Modern C# interpolated-string handlers can avoid boxing; behavior depends on overload/target/lowering. Do not claim every interpolation boxes. string.Format object-based arguments can box value types. [Official reference](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/)

<a id="Q01-Q007"></a>

<a id="Q01-B0039"></a>

### Q7. How do nullable value types work?

<a id="Q01-B0040"></a>

Say this. `int?` is `Nullable<int>`, which is itself a struct containing an `int` and a `bool`. So it is not a reference and it is not null in the pointer sense - `HasValue` is just a flag.

<a id="Q01-B0041"></a>

Why. That is why `int?` still cannot be dereferenced-null, why it costs 8 bytes rather than 4, and why boxing a `Nullable<T>` with no value produces an actual `null` reference rather than a box - the runtime special-cases it.

<a id="Q01-B0042"></a>

Watch out. Nullable arithmetic propagates null silently: `null + 5` is `null`, not an error. In SQL-facing code that is where quiet wrong answers come from.

<a id="Q01-Q008"></a>

<a id="Q01-B0043"></a>

### Q8. Why are strings immutable, and what does that buy you?

<a id="Q01-B0044"></a>

Say this. Once created, a string's characters never change - every operation returns a new string. It buys three things: strings can be shared safely across threads with no locking, they can be interned and reused, and their hash code can be cached, which makes them fast dictionary keys.


> Study correction: String immutability makes character contents stable; do not rely on a universal cached string hash implementation. Hash implementation/caching details are runtime-specific. [Official reference](https://learn.microsoft.com/en-us/dotnet/api/system.string.gethashcode)

<a id="Q01-B0045"></a>

Why. A mutable string used as a dictionary key would corrupt the dictionary the moment it changed, because the hash would no longer match the bucket. Immutability makes the hash permanently valid.

<a id="Q01-B0046"></a>

Watch out. Immutability is why concatenation in a loop is expensive - see the next question.

<a id="Q01-Q009"></a>

<a id="Q01-B0047"></a>

### Q9. Why is string concatenation in a loop O(n squared), and what do you use instead?

<a id="Q01-B0048"></a>

Say this. Each `+=` allocates a brand new string and copies everything so far into it. Concatenating n times copies 1 + 2 + 3 ... + n characters, which is O(n squared). `StringBuilder` keeps a growable buffer and appends into it, so the whole loop is O(n) amortised.

<a id="Q01-B0049"></a>

Why. StringBuilder doubles its internal buffer when full, the same amortised trick `List<T>` uses, so the total copying is bounded by a constant factor of the final length.

<a id="Q01-B0050"></a>

Instead of. Plain `+` is fine for a fixed, small number of pieces - the compiler turns `a + b + c` into a single `string.Concat` call with one allocation. It is only the loop that is quadratic.

<a id="Q01-Q010"></a>

<a id="Q01-B0051"></a>

### Q10. Explain ref, out and in.

<a id="Q01-B0052"></a>

Say this. `ref` passes a reference to the caller's variable, which must already be initialised and can be read and written. `out` is the same but the variable need not be initialised and the method must assign it before returning. `in` passes by reference but read-only, which avoids copying a large struct without allowing mutation.

<a id="Q01-B0053"></a>

Why. All three pass the storage location rather than the value. The difference is purely a contract the compiler enforces about who initialises and who may write.

<a id="Q01-B0054"></a>

Watch out. `in` on a struct that is not `readonly` can be slower, not faster: the compiler makes a defensive copy on every member access to guarantee immutability. `in` plus `readonly struct` is the combination that actually pays.

<a id="Q01-Q011"></a>

<a id="Q01-B0055"></a>

### Q11. What is actually in memory when you write `new Person()`?

<a id="Q01-B0056"></a>

Say this. On the heap: an object header (used for locking and a few flags), a method table pointer that identifies the type and enables virtual dispatch, then the fields laid out in order with padding for alignment. On 64-bit that overhead is 16 bytes before any of your data. The variable holds an 8-byte reference to it.

<a id="Q01-B0057"></a>

Why. The method table pointer is how virtual dispatch works and how `GetType()` works at all - the object knows its own type because it carries a pointer to the type's description.

<a id="Q01-B0058"></a>

Watch out. This is why an object with a single `int` field costs 24 bytes, not 4. When someone asks why a list of a million small objects is using so much memory, this is the answer.

<a id="Q01-Q012"></a>

<a id="Q01-B0059"></a>

### Q12. When does a static constructor actually run?

<a id="Q01-B0060"></a>

Say this. Immediately before the first access to any static member of the type, or before the first instance is created - whichever comes first. The runtime guarantees it runs exactly once and is thread-safe.

<a id="Q01-B0061"></a>

Why. The runtime inserts a type-initialisation check; lazily triggering it on first use avoids paying for types you never touch. The thread-safety guarantee is why the static-constructor singleton is the safe one.

<a id="Q01-B0062"></a>

Watch out. You cannot predict *when*, only *before what*. An exception thrown from a static constructor becomes a `TypeInitializationException` and the type is permanently unusable for the rest of the process. That is a nasty production failure mode.

<a id="Q01-B0063"></a>

### PART B - Object orientation

<a id="Q01-Q013"></a>

<a id="Q01-B0064"></a>

### Q13. Explain virtual, override and new, and how the runtime picks a method.

<a id="Q01-B0065"></a>

Say this. `virtual` says "this may be replaced". `override` replaces it. `new` hides it - a different method that happens to share a name. With `override`, a call through a base reference runs the derived version. With `new`, a call through a base reference runs the base version, because the choice is made at compile time from the reference type.

<a id="Q01-B0066"></a>

Why. A virtual call goes through the object's method table: the compiler emits "call slot 4 of whatever this object's type is", and the derived type's table has its own method in slot 4. A non-virtual call is resolved statically, so hiding cannot participate.

<a id="Q01-B0067"></a>

Watch out. `new` is almost always a mistake in real code, and it is a favourite interview question precisely because the behaviour surprises people.

<a id="Q01-Q014"></a>

<a id="Q01-B0068"></a>

### Q14. Interface or abstract class - how do you actually decide?

<a id="Q01-B0069"></a>

Say this. Interface when you are describing a capability that unrelated types can have, when you need more than one, or when you want to keep the type free to inherit elsewhere. Abstract class when there is genuine shared implementation and state, and the types really are a family.

<a id="Q01-B0070"></a>

Why. C# has single inheritance but multiple interface implementation, so the practical question is: am I spending the one inheritance slot, and is there shared code worth spending it on?

<a id="Q01-B0071"></a>

Instead of. Default interface methods blur this, but they still cannot hold state. The moment you need shared fields, it is an abstract class.

<a id="Q01-B0072"></a>

Watch out. "Interfaces for contracts, abstract classes for shared code" is the sentence to say. Then give a real example from your own work rather than a shape or animal.

<a id="Q01-Q015"></a>

<a id="Q01-B0073"></a>

### Q15. State the Equals/GetHashCode contract and what breaks without it.

<a id="Q01-B0074"></a>

Say this. If two objects are equal, they must return the same hash code. The reverse is not required - unequal objects may collide. If you override `Equals` without `GetHashCode`, hash-based collections break: you put a key in and cannot find it again, because lookup hashes to one bucket while equality says the item is elsewhere.

<a id="Q01-B0075"></a>

Why. A dictionary uses the hash to pick a bucket and only then uses equality within that bucket. Break the invariant and it searches the wrong bucket, so the item is simply invisible.

<a id="Q01-B0076"></a>

Watch out. Also: the hash code must not change while the object is a key. Computing a hash from mutable fields and then mutating the object loses the entry permanently - the classic "my dictionary lost my key" bug.

<a id="Q01-Q016"></a>

<a id="Q01-B0077"></a>

### Q16. Why composition over inheritance?

<a id="Q01-B0078"></a>

Say this. Inheritance couples you to a base class's implementation permanently and the coupling is the strongest in the language. Composition lets you swap the collaborator, test it in isolation, and change behaviour at runtime. Inheritance is for genuine is-a relationships; composition is for everything else.

<a id="Q01-B0079"></a>

Why. A base class change can break every subclass in ways the compiler cannot catch - the fragile base class problem. A composed dependency has a narrow, explicit interface, so the blast radius is visible.

<a id="Q01-B0080"></a>

Watch out. Be ready for "when is inheritance right, then?" Good answers: a framework extension point, a genuine taxonomy with shared state, or a template-method algorithm.

<a id="Q01-Q017"></a>

<a id="Q01-B0081"></a>

### Q17. What are covariance and contravariance, and why do out and in exist on generics?

<a id="Q01-B0082"></a>

Say this. Covariance (`out`) lets you use a more derived type where a less derived one is expected - `IEnumerable<string>` works as `IEnumerable<object>`. Contravariance (`in`) is the reverse for inputs - `Action<object>` works as `Action<string>`. `out` types appear only in output positions, `in` types only in input positions.

<a id="Q01-B0083"></a>

Why. The restriction is what makes it type-safe. If `IList<string>` were covariant to `IList<object>`, you could add an `int` to a list of strings. Because `IEnumerable<T>` only ever hands `T` out, there is no way to smuggle the wrong type in.

<a id="Q01-B0084"></a>

Watch out. Arrays are covariant and it is a known design mistake - `object[] a = new string[1]; a[0] = 1;` compiles and throws at runtime.

<a id="Q01-Q018"></a>

<a id="Q01-B0085"></a>

### Q18. Why are .NET generics not Java erasure?

<a id="Q01-B0086"></a>

Say this. The .NET runtime keeps generic type information at runtime and generates specialised code per value-type argument. `List<int>` and `List<string>` are genuinely different types with different code. Java erases the parameter to `Object` and inserts casts.

<a id="Q01-B0087"></a>

Why. Specialising means `List<int>` stores raw ints with no boxing, which is both faster and smaller. Reference types share one implementation since all references are the same size.

<a id="Q01-B0088"></a>

Watch out. This is why you can write `typeof(T)` and `new T()` in C# and not in Java, and why C# needs no `List<Integer>`. Good answer to "have you used other languages?"

<a id="Q01-B0089"></a>

### PART C - Collections and LINQ

<a id="Q01-Q019"></a>

<a id="Q01-B0090"></a>

### Q19. Why is dictionary lookup O(1), and what makes it degrade to O(n)?

<a id="Q01-B0091"></a>

Say this. The hash code picks a bucket in constant time, and with a good hash the buckets hold about one item each. It degrades when many keys hash to the same bucket, because then you are walking a chain - a bad or deliberately hostile `GetHashCode`, or a small number of distinct hash values.

<a id="Q01-B0092"></a>

Why. Cost is O(1) *average*, not worst case. The average depends entirely on hash distribution, which is why `GetHashCode` quality is a performance concern and not just correctness.

<a id="Q01-B0093"></a>

Watch out. A hash code that returns a constant is legal and turns your dictionary into a linked list. Interviewers love this because it is a real production incident, not a puzzle.

<a id="Q01-Q020"></a>

<a id="Q01-B0094"></a>

### Q20. How does List<T> grow, and why is Add amortised O(1)?

<a id="Q01-B0095"></a>

Say this. When the internal array fills, it allocates a new array of double the size and copies everything. A single Add can therefore be O(n), but doubling means the copies get rarer geometrically, so the total cost of n Adds is O(n) - O(1) each on average.

<a id="Q01-B0096"></a>

Why. Doubling makes the total copying at most 2n. Growing by a fixed amount instead would make it O(n squared), which is exactly the string concatenation problem.

<a id="Q01-B0097"></a>

Watch out. If you know the size, pass capacity to the constructor. It removes every reallocation and every intermediate array - a free win in hot paths.

<a id="Q01-Q021"></a>

<a id="Q01-B0098"></a>

### Q21. IEnumerable, ICollection, IList, IQueryable - what is the difference and why does it matter?

<a id="Q01-B0099"></a>

Say this. `IEnumerable<T>` is forward iteration only. `ICollection<T>` adds Count and mutation. `IList<T>` adds indexing. `IQueryable<T>` looks like `IEnumerable<T>` but builds an expression tree instead of executing, so a provider like EF Core can translate it into SQL.

<a id="Q01-B0100"></a>

Why. The one that matters in interviews is the last: the same LINQ query runs in memory on `IEnumerable` and translates to SQL on `IQueryable`. Cast to the wrong one and you accidentally pull the whole table into memory and filter there.

<a id="Q01-B0101"></a>

Watch out. `AsEnumerable()` or a `ToList()` in the middle of a query is exactly that bug. Any `Where` after it runs in your process, not the database.

<a id="Q01-Q022"></a>

<a id="Q01-B0102"></a>

### Q22. What does yield return compile into?

<a id="Q01-B0103"></a>

Say this. The compiler generates a state machine class implementing `IEnumerator<T>`, with a field per local variable and an integer tracking where execution stopped. Each `MoveNext` call resumes at that point and runs to the next `yield`.

<a id="Q01-B0104"></a>

Why. Nothing in the method body runs until the first `MoveNext`. That is why an iterator that throws on a bad argument throws at enumeration time rather than at call time - a real source of confusing stack traces.

<a id="Q01-B0105"></a>

Watch out. It is the same machinery as `async`/`await`. Saying "both are compiler-generated state machines" connects two topics and reads as real understanding.

<a id="Q01-Q023"></a>

<a id="Q01-B0106"></a>

### Q23. Explain deferred execution and give a bug it causes.

<a id="Q01-B0107"></a>

Say this. A LINQ query over `IEnumerable` describes work; it does not do it. It runs when you enumerate. The bug: assign a query to a variable, enumerate it twice, and everything runs twice - two database round trips, or two different results if the source changed in between.

<a id="Q01-B0108"></a>

Why. Operators return objects that wrap the source and the operation. `ToList` or `ToArray` are the points at which it actually executes and materialises.

<a id="Q01-B0109"></a>

Instead of. Materialise once with `ToList()` when you will use the result more than once. Keep it deferred when you are composing further filters that should reach the database.

<a id="Q01-B0110"></a>

Watch out. The subtler variant is capturing a loop variable in the query - the query sees the variable's final value, not the value at the time you wrote the line.

<a id="Q01-Q024"></a>

<a id="Q01-B0111"></a>

### Q24. What does a closure allocate, and what is the captured-loop-variable trap?

<a id="Q01-B0112"></a>

Say this. The compiler creates a hidden class holding the captured variables and allocates one instance; the lambda becomes a method on it. The trap is capturing a loop variable: all the lambdas share one closure instance, so they all see the final value.

<a id="Q01-B0113"></a>

Why. The capture is by reference to the variable, not by value. In a `for` loop there is one variable for the whole loop, so one shared field. `foreach` in modern C# gives a fresh variable per iteration, which is why it was changed.

<a id="Q01-B0114"></a>

Watch out. Closures also extend object lifetime. A lambda registered on a long-lived event that captures `this` keeps the whole object alive - a very common .NET memory leak.

<a id="Q01-B0115"></a>

### PART D - Exceptions, lifetime, and the GC

<a id="Q01-Q025"></a>

<a id="Q01-B0116"></a>

### Q25. What is the difference between throw and throw ex?

<a id="Q01-B0117"></a>

Say this. `throw;` rethrows the original exception and preserves the stack trace. `throw ex;` throws it again from the current line and resets the stack trace, destroying the information about where the problem actually happened.

<a id="Q01-B0118"></a>

Why. The trace is stored on the exception object and overwritten when it is thrown. `throw;` is a distinct IL instruction that does not touch it.

<a id="Q01-B0119"></a>

Instead of. If you must add context, wrap: `throw new ProcessingException("...", ex)`. That keeps the original as `InnerException` and adds your own frame.

<a id="Q01-B0120"></a>

Watch out. This is a two-second question that reveals whether you have ever debugged a production stack trace. Have an opinion about it.

<a id="Q01-Q026"></a>

<a id="Q01-B0121"></a>

### Q26. Why do exception filters exist?

<a id="Q01-B0122"></a>

Say this. The `when` clause decides whether to catch before the stack unwinds. So you can log, inspect or conditionally decline an exception while the original stack is still intact.

<a id="Q01-B0123"></a>

Why. A `catch` block runs after unwinding, so by then the frames below you are gone. A filter runs during the first pass of exception handling, before that happens - which matters enormously when debugging.

<a id="Q01-B0124"></a>

Watch out. The trick `catch (Exception e) when (Log(e))` where `Log` returns false lets you log everything without catching anything. Genuinely useful, and a good thing to know.

<a id="Q01-Q027"></a>

<a id="Q01-B0125"></a>

### Q27. What do exceptions actually cost, and why not use them for control flow?

<a id="Q01-B0126"></a>

Say this. Throwing is expensive - stack walking, filter evaluation, and it is not optimised because it is assumed rare. A try block that never throws costs essentially nothing. So the cost is in the throw, not in the guarding.

<a id="Q01-B0127"></a>

Why. The runtime treats exceptions as exceptional and optimises the happy path. Using them for expected outcomes - "not found", "invalid input" - means paying a large cost on a common path, and it makes the code harder to read because the flow is invisible.

<a id="Q01-B0128"></a>

Instead of. `TryParse`-style methods, a result type, or a nullable return for expected failures. Reserve exceptions for genuinely unexpected states.

<a id="Q01-Q028"></a>

<a id="Q01-B0129"></a>

### Q28. Explain IDisposable and why a finalizer makes collection take two GC cycles.

<a id="Q01-B0130"></a>

Say this. `IDisposable` is deterministic cleanup for unmanaged resources - you call `Dispose`, usually via `using`. A finalizer is the safety net the GC calls if you did not. An object with a finalizer cannot be collected on the first pass: the GC puts it on the finalisation queue, a separate thread runs the finalizer, and only the next collection reclaims the memory.

<a id="Q01-B0131"></a>

Why. That is the whole reason the full dispose pattern calls `GC.SuppressFinalize(this)` - if you disposed properly, the finalizer is unnecessary and suppressing it lets the object die on the first pass.

<a id="Q01-B0132"></a>

Watch out. You almost never write a finalizer. Only a type directly holding an unmanaged handle needs one, and `SafeHandle` already does it better.

<a id="Q01-Q029"></a>

<a id="Q01-B0133"></a>

### Q29. Explain GC generations and the large object heap.

<a id="Q01-B0134"></a>

Say this. Gen 0 is new objects, gen 1 is a buffer, gen 2 is long-lived. Collections start with gen 0, which is cheap because most new objects are already dead and survivors are few. Gen 2 is expensive because it means walking everything. Objects over roughly 85 KB go on the large object heap, which is not compacted by default and therefore fragments.

<a id="Q01-B0135"></a>

Why. It rests on the generational hypothesis: most objects die young. Collecting only the young region most of the time makes the common case very cheap.

<a id="Q01-B0136"></a>

Watch out. The practical lesson is that GC tuning is almost never the fix. Allocation rate is. Reduce allocations - pooling, `Span<T>`, streaming instead of buffering - and the GC problem goes away.

<a id="Q01-Q030"></a>

<a id="Q01-B0137"></a>

### Q30. Workstation GC or server GC?

<a id="Q01-B0138"></a>

Say this. Server GC for anything server-side: one heap and one collection thread per core, so collections run in parallel and throughput is much higher. Workstation GC for desktop apps, where low latency on one thread matters more than throughput.

<a id="Q01-B0139"></a>

Why. Server GC trades memory for throughput - more heaps means more total memory but far less pause time per collection under load.

<a id="Q01-B0140"></a>

Watch out. It is on by default for ASP.NET Core but not for a console app. A worker service processing a queue is a server workload; check that it is enabled.

<a id="Q01-B0141"></a>

### PART E - async and await (the most asked area at your level)

<a id="Q01-Q031"></a>

<a id="Q01-B0142"></a>

### Q31. What does await actually do?

<a id="Q01-B0143"></a>

Say this. The compiler rewrites the method into a state machine. At an `await` on something not yet complete, the method returns to its caller and the thread goes back to the pool. A continuation is registered, and when the operation completes the state machine resumes from where it stopped.

<a id="Q01-B0144"></a>

Why. The key insight is that nothing is faster. `async` does not speed up the I/O - it stops a thread sitting idle while the I/O happens. That is what lets a server handle thousands of concurrent requests with a few dozen threads.

<a id="Q01-B0145"></a>

Watch out. If the awaited task is already complete, there is no state transition and no thread switch - it just continues synchronously. That fast path is why `ValueTask` exists.

<a id="Q01-Q032"></a>

<a id="Q01-B0146"></a>

### Q32. Walk me through the generated state machine.

<a id="Q01-B0147"></a>

Say this. The compiler produces a struct or class with an integer `_state`, a field for each local that survives an await, a `TaskAwaiter` field, and a `MoveNext` method containing your code as a switch over the state. Call it, and `MoveNext` runs until the first incomplete await, stores the state, hooks up a continuation, and returns.

<a id="Q01-B0148"></a>

Why. Locals become fields because the stack frame disappears when the method returns. Anything needed after resumption has to live somewhere that survives, so it is lifted onto the state machine object.

<a id="Q01-B0149"></a>

Watch out. Say you have read this in SharpLab. It is a Month 1 exercise for exactly this reason, and "I have seen the generated code" is a much stronger claim than the description.

<a id="Q01-Q033"></a>

<a id="Q01-B0150"></a>

### Q33. Why is async void almost always wrong?

<a id="Q01-B0151"></a>

Say this. You cannot await it, so the caller cannot know when it finished. Worse, an exception inside it cannot be captured into a returned task, so it is raised on the synchronisation context and typically crashes the process instead of surfacing at a `catch`.

<a id="Q01-B0152"></a>

Why. The whole point of returning `Task` is that it carries both completion and failure back to the caller. `async void` throws that channel away.

<a id="Q01-B0153"></a>

Instead of. `async Task`. The single legitimate exception is an event handler, whose signature you do not control - and there you should wrap the body in try/catch yourself.

<a id="Q01-Q034"></a>

<a id="Q01-B0154"></a>

### Q34. Why does calling .Result deadlock?

<a id="Q01-B0155"></a>

Say this. In a context with a synchronisation context - classic ASP.NET, or a UI app - the continuation must resume on that one specific thread. If you block that exact thread waiting on `.Result`, the continuation can never run, so the task never completes, so the block never ends. Each is waiting on the other.

<a id="Q01-B0156"></a>

Why. The continuation is by default posted back to the captured context. That is convenient for UI code and lethal when combined with blocking.

<a id="Q01-B0157"></a>

Instead of. `await` all the way up. If you genuinely cannot, `ConfigureAwait(false)` on the inner awaits removes the context capture and breaks the cycle.

<a id="Q01-B0158"></a>

Watch out. ASP.NET Core has no synchronisation context, so it does not deadlock this way - but blocking still consumes a pool thread, and under load that becomes thread starvation, which shows up as rising latency rather than a hang. Say both halves; most candidates only know the first.

<a id="Q01-Q035"></a>

<a id="Q01-B0159"></a>

### Q35. What does ConfigureAwait(false) do and when do you need it?

<a id="Q01-B0160"></a>

Say this. It says "do not capture the synchronisation context; resume anywhere". You need it in library code that might be called from a UI or legacy ASP.NET app, to avoid forcing continuations onto that context and to avoid the deadlock above.

<a id="Q01-B0161"></a>

Why. Capturing the context costs a thread hop on every await and creates the blocking hazard. A library has no reason to care which thread it resumes on.

<a id="Q01-B0162"></a>

Watch out. In an ASP.NET Core application you do not need it - there is no context to capture. Knowing when it is unnecessary is as good a signal as knowing when it is.

<a id="Q01-Q036"></a>

<a id="Q01-B0163"></a>

### Q36. Task or ValueTask?

<a id="Q01-B0164"></a>

Say this. `Task` by default. `ValueTask` when the method very often completes synchronously and sits in a hot path - it avoids allocating a Task object for the already-finished case. The cost is a much stricter contract: you may only await it once, and you must not block on it.

<a id="Q01-B0165"></a>

Why. `Task` is a class, so every call allocates. If 95% of calls hit a cache and return immediately, that allocation is pure waste, which is what `ValueTask` removes.

<a id="Q01-B0166"></a>

Instead of. Reach for `Task` unless a profiler pointed you here. `ValueTask` misuse - awaiting twice - is a real and hard-to-find bug.

<a id="Q01-Q037"></a>

<a id="Q01-B0167"></a>

### Q37. How does CancellationToken work, and why is it not "killing a thread"?

<a id="Q01-B0168"></a>

Say this. It is cooperative. The token is a shared flag; the operation checks it at safe points and chooses to stop, throwing `OperationCanceledException`. Nothing is forcibly terminated.

<a id="Q01-B0169"></a>

Why. Aborting a thread mid-operation would leave locks held and state half-written, which is why `Thread.Abort` was removed from .NET Core entirely. Cooperative cancellation means the code stops at a point where its invariants hold.

<a id="Q01-B0170"></a>

Watch out. Pass the token all the way down - to the HTTP call, the database command, the queue receive. A token that is accepted and never checked is the most common mistake here.

<a id="Q01-Q038"></a>

<a id="Q01-B0171"></a>

### Q38. What is thread pool starvation and how would you spot it?

<a id="Q01-B0172"></a>

Say this. The pool has a limited number of threads and injects new ones slowly - roughly one or two per second. If work blocks threads faster than that, everything queues. You spot it as latency climbing while CPU stays low, and a growing thread pool queue length.

<a id="Q01-B0173"></a>

Why. The pool is tuned for short non-blocking work items. Blocking calls hold a thread doing nothing, and the injection rate is deliberately conservative to avoid thrashing.

<a id="Q01-B0174"></a>

Watch out. Low CPU plus high latency is the signature. If CPU were high it would be a different problem. Saying that distinction out loud is the answer that lands.

<a id="Q01-Q039"></a>

<a id="Q01-B0175"></a>

### Q39. Concurrency or parallelism - what is the difference?

<a id="Q01-B0176"></a>

Say this. Concurrency is dealing with many things at once - interleaving, often on one thread, usually I/O-bound. Parallelism is doing many things at the same instant on multiple cores, usually CPU-bound. `async`/`await` is a concurrency tool; `Parallel.For` is a parallelism tool.

<a id="Q01-B0177"></a>

Why. Confusing them is what makes people wrap I/O in `Task.Run` - which adds a thread hop and solves nothing, because the thread was never the bottleneck.

<a id="Q01-B0178"></a>

Watch out. On a server, `Task.Run` around async I/O is almost always wrong: it consumes a pool thread to do work that needed no thread.

<a id="Q01-Q040"></a>

<a id="Q01-B0179"></a>

### Q40. How is your email pipeline work an async and concurrency story?

<a id="Q01-B0180"></a>

Say this. The original was one long sequential job: process a message, wait, process the next. Most of the elapsed time was waiting rather than computing. Making it event-driven with SES, EventBridge and SQS let many consumers work independently, so the waiting overlapped instead of accumulating - which is why it went from seven to ten hours down to about ninety minutes.

<a id="Q01-B0181"></a>

Why. That is concurrency at the system level: the same total work, but the idle time is shared rather than serialised. It is the same principle as `await` inside one process, one layer up.

<a id="Q01-B0182"></a>

Watch out. Be ready for "so what was the bottleneck afterwards?" Have an answer - the new limit is downstream throughput or database contention, not the queue.

<a id="Q01-B0183"></a>

### PART F - The Month 1 self-test

<a id="Q01-B0184"></a>

Cover the answers. If you can say all twelve out loud, Month 1 is genuinely done. Anything you cannot goes in the WEAK tab.

<a id="Q01-B0185"></a>

| # | Say it out loud, no notes |
| --- | --- |
| 1 | Value vs reference types, and where a struct actually lives |
| 2 | What boxing is and three places it happens accidentally |
| 3 | What is physically in memory when you write new Person() |
| 4 | How the runtime picks which method to call, at method-table level |
| 5 | The Equals/GetHashCode contract and what breaks without it |
| 6 | Why dictionary lookup is O(1) and what degrades it |
| 7 | What yield return compiles into |
| 8 | Deferred execution, and a real bug it causes |
| 9 | Why throw ex is wrong |
| 10 | Why a finalizer makes collection take two GC cycles |
| 11 | The async state machine, from call to resumption |
| 12 | Why .Result deadlocks - both the sync-context half and the starvation half |

<a id="Q01-B0186"></a>

If you have had a bad month and only read this file, you are not behind in the way you think. The tracker measures days; interviews measure what you can say. Twelve answers you can give out loud is worth more than twenty days of reading you cannot reproduce.
