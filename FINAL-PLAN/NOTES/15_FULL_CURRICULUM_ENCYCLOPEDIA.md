# Every original curriculum branch: basics through advanced

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="F02"></a>

## F02 — 02_GRANULAR_CURRICULUM_ENCYCLOPEDIA

Full source content: [FAANG-Master-Plan/02_GRANULAR_CURRICULUM_ENCYCLOPEDIA.md](../SOURCE_LIBRARY/FAANG-Master-Plan/02_GRANULAR_CURRICULUM_ENCYCLOPEDIA.md). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.

> Curriculum correction: the source lists 22 GoF patterns. Add Interpreter: 5 creational, 7 structural, 11 behavioral. Builder is creational; Strategy is behavioral. All eight sorting algorithms and all advanced branches below remain in the curriculum.


<a id="F02-B0001"></a>

# 📖 Master Curriculum Encyclopedia (CodeWithShubham & CodeLLDWithShubham Integration)

<a id="F02-B0002"></a>

This encyclopedia integrates **every single branch, sub-pattern, design pattern, and algorithm** from your reference mindmaps:
* **CodeLLDWithShubham Mindmap:** OOP Fundamentals, 5 Class Relationships, 8 Design Principles, 5 SOLID Principles, 5 UML Diagrams, and all 23 Gang of Four (GoF) Design Patterns.
* **DSA Patterns (CodeWithShubham) Mindmap:** Arrays, Strings (KMP, Rabin-Karp), Stacks, Queues, Linked Lists, Recursion & Backtracking, Trees (Views, Traversals, BST), Heaps, Graphs (Shortest Paths, Topo Sort, DSU, Bipartite), Trie, DP (1D, Knapsack, LCS, LIS, Grid, MCM), Greedy, Bit Manipulation, all 8 Sorting Algorithms, and Range Queries (Segment & Fenwick Trees).

<a id="F02-B0003"></a>

---

<a id="F02-B0004"></a>

## 🏛️ PART 1: Low-Level Design (LLD) Complete Breakdown

<a id="F02-B0005"></a>

### 1. OOP Fundamentals
* **Classes & Objects:** Blueprints, memory instantiation on heap vs stack in C#, object lifecycle.
* **Constructors:** Default, parameterized, copy constructors, static constructors in C#, constructor chaining (`this()`, `base()`).
* **Encapsulation:** Data hiding, information hiding, getters/setters, properties with backing fields.
* **Abstraction:** Hiding implementation complexity, exposing essential contracts via interfaces and abstract base classes.
* **Inheritance:** `is-a` relationship, single vs multiple interface inheritance in C#, `virtual`, `override`, `new` keywords.
* **Polymorphism:**
  * Compile-time (Static): Method overloading, operator overloading.
  * Runtime (Dynamic): Method overriding via virtual method table (vtable).
* **Abstract Classes:** Partial implementation, abstract methods, when to use vs interfaces.
* **Access Modifiers:** `public`, `private`, `protected`, `internal`, `protected internal`, `private protected`.
* **Static:** Static classes, static methods, static constructors, static fields (thread safety considerations).
* **Enums:** Strongly typed constants, flags enums (`[Flags]`), underlying types (`byte`, `int`).

<a id="F02-B0006"></a>

---

<a id="F02-B0007"></a>

### 2. Class Relationships (UML Notations & Semantics)
* **Association (`-->`):** General `uses-a` relationship between two independent classes (e.g., `Order` uses `EmailService`).
* **Dependency (`..>`):** Weakest relationship; one class depends on another as a method parameter or local variable (temporary interaction).
* **Aggregation (`◇--`):** `has-a` relationship with **weak ownership** (Whole-Part). The child can exist independently of the parent (e.g., `Department` has `Professors`; if department dissolves, professors still exist).
* **Composition (`◆--`):** `has-a` relationship with **strong ownership**. The child's lifetime is bound to the parent's lifetime (e.g., `House` and `Rooms`; destroying the house destroys the rooms).
* **Realization (`..▷`):** Interface implementation or abstract contract realization (`class Car : IVehicle`).

<a id="F02-B0008"></a>

---

<a id="F02-B0009"></a>

### 3. Core Design Principles
* **DRY (Don't Repeat Yourself):** Extract reusable logic; single source of truth for business rules.
* **KISS (Keep It Simple, Stupid):** Avoid premature optimization; prefer simple, readable code over clever one-liners.
* **YAGNI (You Aren't Gonna Need It):** Implement only what is currently required; avoid building speculative features.
* **Separation of Concerns (SoC):** Break software into distinct sections where each section addresses a separate concern (e.g., Presentation vs Business Logic vs Data Access).
* **Coupling (Loose vs Tight):** Measure of dependency between modules. Aim for loose coupling via interfaces.
* **Cohesion (High vs Low):** Measure of how strongly related the responsibilities inside a single class are. Aim for high cohesion (a class does one cohesive job).
* **Composition Over Inheritance:** Prefer composing objects with interfaces rather than inheriting deep hierarchies (avoids fragile base class problem).
* **Law of Demeter (Principle of Least Knowledge):** A method of an object should only call methods belonging to: its own class, parameters passed in, objects it instantiated, or its direct member fields. Don't chain calls like `a.GetB().GetC().DoSomething()`.

<a id="F02-B0010"></a>

---

<a id="F02-B0011"></a>

### 4. SOLID Principles (The 5 Pillars)
1. **SRP (Single Responsibility Principle):** A class should have only one reason to change. Separate domain entities from persistence, formatting, and validation.
2. **OCP (Open-Closed Principle):** Software entities should be open for extension, but closed for modification. Implement new behavior by adding new classes/strategies, not modifying existing tested code.
3. **LSP (Liskov Substitution Principle):** Subtypes must be substitutable for their base types without altering program correctness (e.g., classic Rectangle vs Square violation).
4. **ISP (Interface Segregation Principle):** Clients should not be forced to depend on interfaces they do not use. Split fat interfaces into smaller, cohesive role interfaces (`IReadable`, `IWritable` rather than `IReadWriteAdminSuperService`).
5. **DIP (Dependency Inversion Principle):** High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions (Dependency Injection).

<a id="F02-B0012"></a>

---

<a id="F02-B0013"></a>

### 5. UML Diagrams for Interviews
* **Class Diagram:** Visualizing classes, fields, methods, access modifiers (`+`, `-`, `#`), and relationships (Inheritance, Composition, Aggregation, Dependency).
* **Use Case Diagram:** Actors, system boundaries, use cases, `<<include>>` and `<<extend>>` relationships.
* **Sequence Diagram:** Chronological interaction between objects over time; lifelines, synchronous messages, asynchronous calls, return messages, activation bars.
* **Activity Diagram:** Workflow and business logic flowchart; decision diamonds, fork/join parallel nodes.
* **State Machine Diagram:** States, transitions, events, guards, actions (critical for designing Elevators, Vending Machines, Order fulfillment).

<a id="F02-B0014"></a>

---

<a id="F02-B0015"></a>

### 6. All 23 Gang of Four (GoF) Design Patterns

<a id="F02-B0016"></a>

#### A. Creational Patterns (5)
1. **Singleton:** Ensures a class has only one instance, with a global access point. In C#: Thread-safe double-checked locking or `Lazy<T>`.
2. **Builder:** Separates the construction of a complex object from its representation (e.g., fluent query builder, complex document generator).
3. **Factory Method:** Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
4. **Abstract Factory:** Creates families of related or dependent objects without specifying their concrete classes (e.g., DarkTheme vs LightTheme UI components).
5. **Prototype:** Creates new objects by cloning an existing instance (in C#: `ICloneable` or memberwise clone).

<a id="F02-B0017"></a>

#### B. Behavioral Patterns (10)
1. **Strategy:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime (e.g., Payment strategies, Pricing rules).
2. **Iterator:** Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation (`IEnumerator<T>` in C#).
3. **Command:** Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undo/redo.
4. **Observer:** Defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically (Event-driven architectures).
5. **State:** Allows an object to alter its behavior when its internal state changes (e.g., Elevator: `IdleState`, `MovingUpState`, `MovingDownState`).
6. **Template Method:** Defines the skeleton of an algorithm in a method, deferring some steps to subclasses without changing algorithm structure.
7. **Chain of Responsibility:** Passes a request along a chain of handlers. Each handler decides either to process the request or pass it to the next handler (e.g., ASP.NET Core Middleware pipeline).
8. **Visitor:** Separates an algorithm from the object structure on which it operates (e.g., Tax calculation across different product types).
9. **Mediator:** Defines an object that encapsulates how a set of objects interact, preventing direct dependencies between them (e.g., MediatR library in .NET, Air Traffic Controller).
10. **Memento:** Captures and externalizes an object's internal state so the object can be restored to this state later (Undo/Redo checkpoints).

<a id="F02-B0018"></a>

#### C. Structural Patterns (8)
1. **Adapter:** Converts the interface of a class into another interface clients expect (wrapping legacy APIs or third-party SDKs).
2. **Facade:** Provides a simplified, unified high-level interface to a complex subsystem.
3. **Decorator:** Attaches additional responsibilities to an object dynamically without subclass explosion (e.g., CachingDecorator, LoggingDecorator around repositories).
4. **Composite:** Composes objects into tree structures to represent part-whole hierarchies. Lets clients treat individual objects and compositions uniformly (e.g., File System folders and files).
5. **Proxy:** Provides a surrogate or placeholder for another object to control access to it (e.g., Virtual Proxy for lazy loading, Remote Proxy, Protection Proxy).
6. **Bridge:** Decouples an abstraction from its implementation so that the two can vary independently (e.g., `Shape` and `Color` hierarchies).
7. **Flyweight:** Reduces memory footprint by sharing common state among multiple fine-grained objects (e.g., Character glyph rendering in text editors, game particle systems).

<a id="F02-B0019"></a>

---

<a id="F02-B0020"></a>

## ⚡ PART 2: Data Structures & Algorithms (DSA) Complete Breakdown

<a id="F02-B0021"></a>

### 1. Array Patterns
* **Kadane’s Algorithm:** Max Subarray Sum, Max Product Subarray (tracking `min` & `max`), Circular Subarray Sum (Max of normal subarray vs `TotalSum - MinSubarray`).
* **Prefix Sum:** 1D Prefix Sum, 2D Prefix Sum (Matrix range queries), Subarray Sum Equals K (`Map<sum - k, count>`).
* **Two Pointers:** Opposite Ends, Fast and Slow (Reader-Writer), 3Sum (duplicate skipping logic), 4Sum, Container With Most Water, Trapping Rain Water.
* **Dutch National Flag:** 3-way partition (`low`, `mid`, `high`) sorting 0, 1, 2 in $O(N)$ single pass.
* **Sliding Window:** Fixed size, Variable size, At Most $K$ difference technique.
* **Intervals & Matrix:** Merge Intervals, Insert Interval, Non-Overlapping Intervals, Spiral Matrix, Rotate Image.

<a id="F02-B0022"></a>

---

<a id="F02-B0023"></a>

### 2. String Patterns
* **Two Pointers / Palindromes:** Valid Palindrome, Longest Palindromic Substring (expand around center vs DP).
* **Sliding Window on Strings:** Longest Substring Without Repeating Characters, Minimum Window Substring, Find All Anagrams in a String.
* **Pattern Matching Algorithms:**
  * **KMP (Knuth-Morris-Pratt):** Precomputing the Longest Prefix Suffix (LPS) array in $O(M)$ time to search patterns in $O(N)$ time without backtracking.
  * **Rabin-Karp:** Rolling hash matching.
  * **Z-Algorithm:** Constructing the Z-array in $O(N)$ linear time.
* **String Hashing & Frequency:** Group Anagrams (Prime hashing vs sorted key).

<a id="F02-B0024"></a>

---

<a id="F02-B0025"></a>

### 3. Stack Patterns
* **Monotonic Stack:** Next Greater Element I & II, Previous Smaller Element, Largest Rectangle in Histogram ($O(N)$ height expansion), Daily Temperatures.
* **Balanced Parentheses:** Valid Parentheses, Minimum Remove to Make Valid Parentheses, Longest Valid Parentheses.
* **Min Stack:** $O(1)$ `GetMin()` using auxiliary min-stack or value encoding (`2 * val - min`).
* **Expression Evaluation:** Infix to Postfix conversion, Evaluating Reverse Polish Notation (RPN), Basic Calculator I & II.

<a id="F02-B0026"></a>

---

<a id="F02-B0027"></a>

### 4. Queue Patterns
* **Circular Queue:** Ring buffer array implementation with `head` and `tail` pointers.
* **Monotonic Deque:** Sliding Window Maximum ($O(N)$ double-ended queue).
* **Queue using Stacks & Stack using Queues:** Amortized $O(1)$ push/pop mechanisms.

<a id="F02-B0028"></a>

---

<a id="F02-B0029"></a>

### 5. Linked List Patterns
* **Reversals:** Iterative reversal, Recursive reversal, Reverse Linked List II (between $m$ and $n$), Reverse Nodes in k-Group.
* **Fast & Slow Pointers:** Middle of Linked List, Detect Cycle, Find Cycle Origin (Floyd’s Tortoise and Hare proof).
* **Merging:** Merge Two Sorted Lists, Merge K Sorted Lists (Min-Heap approach in $O(N \log K)$).
* **Pointer Mutation:** Remove Nth Node From End of List, Reorder List, Palindrome Linked List.
* **Doubly Linked List:** Implementing an LRU Cache & LFU Cache in $O(1)$ time.

<a id="F02-B0030"></a>

---

<a id="F02-B0031"></a>

### 6. Recursion & Backtracking Patterns
* **Subsets & Subsequences:** Subsets I (distinct elements), Subsets II (handling duplicates with sorting and skip loop).
* **Combinations:** Combination Sum I, II, III.
* **Permutations:** Permutations I, Permutations II (swap in-place vs visited array).
* **Board & Matrix Backtracking:** Word Search, Rat in a Maze, N-Queens (validating diagonals and columns), Sudoku Solver.

<a id="F02-B0032"></a>

---

<a id="F02-B0033"></a>

### 7. Tree Patterns
* **Traversals:** Inorder, Preorder, Postorder (Recursive + Iterative using Stack), Level Order (BFS), Zigzag Level Order, Boundary Traversal.
* **Tree Views:** Top View (Horizontal distance tracking), Bottom View, Left View, Right View.
* **Tree DP (Bottom-Up):** Maximum Depth, Diameter of Binary Tree, Balanced Binary Tree, Binary Tree Maximum Path Sum, Lowest Common Ancestor (LCA).
* **Construction & Serialization:** Construct from Inorder + Preorder, Construct from Inorder + Postorder, Serialize and Deserialize Binary Tree.
* **Binary Search Tree (BST):** Validate BST (passing down valid range bounds), Kth Smallest Element, Inorder Successor, LCA of BST, Convert Sorted Array to BST.

<a id="F02-B0034"></a>

---

<a id="F02-B0035"></a>

### 8. Heap / Priority Queue Patterns
* **Min-Heap & Max-Heap Basics:** Array representation (`parent = (i-1)/2`, `left = 2i+1`, `right = 2i+2`), Heapify operations.
* **Top-K Elements:** Kth Largest Element in an Array, Top K Frequent Elements.
* **Two Heaps Pattern:** Find Median from Data Stream (balancing sizes of Max-Heap and Min-Heap).
* **K-Way Merge:** Merge K Sorted Lists, Smallest Range Covering Elements from K Lists.

<a id="F02-B0036"></a>

---

<a id="F02-B0037"></a>

### 9. Graph Patterns
* **Representations:** Adjacency Matrix vs Adjacency List.
* **BFS & DFS:** Number of Islands, Max Area of Island, Rotting Oranges (Multi-source BFS), Clone Graph.
* **Cycle Detection:**
  * Undirected: BFS/DFS with parent pointer, or Disjoint Set Union (DSU).
  * Directed: 3-Coloring DFS (0 = Unvisited, 1 = Visiting in current path, 2 = Completely visited).
* **Topological Sort (DAG):** Kahn’s Algorithm (In-degree queue), Course Schedule I & II, Alien Dictionary.
* **Shortest Path Algorithms:**
  * Unweighted: Standard BFS ($O(V + E)$).
  * Non-Negative Weighted: Dijkstra’s with Min-Heap ($O((V + E) \log V)$).
  * Negative Weights: Bellman-Ford (detecting negative cycles in $O(V \cdot E)$).
  * All-Pairs Shortest Path: Floyd-Warshall ($O(V^3)$).
* **Disjoint Set Union (DSU / Union-Find):** Path Compression + Union by Rank ($O(\alpha(N))$), Number of Connected Components, Redundant Connection, Kruskal’s Minimum Spanning Tree (MST).
* **Bipartite Graph:** 2-Coloring via BFS/DFS (Is Graph Bipartite?).
* **Strongly Connected Components (SCC):** Kosaraju’s Algorithm (2-pass DFS with transposed graph) & Tarjan’s Algorithm.

<a id="F02-B0038"></a>

---

<a id="F02-B0039"></a>

### 10. Trie Patterns
* **Prefix Tree:** Insert, Search, StartsWith in $O(L)$ time.
* **Applications:** Word Search II (Trie + Backtracking grid search), Search Suggestions System.
* **Bitwise Trie:** Maximum XOR of Two Numbers in an Array ($O(32N)$ time).

<a id="F02-B0040"></a>

---

<a id="F02-B0041"></a>

### 11. Dynamic Programming Patterns
* **1D Linear State:** Fibonacci, Climbing Stairs, House Robber I & II, Decode Ways.
* **0/1 Knapsack:** Subset Sum, Partition Equal Subset Sum, Target Sum (traversing capacity backwards).
* **Unbounded Knapsack:** Coin Change I & II, Rod Cutting (traversing capacity forwards).
* **Longest Common Subsequence (LCS):** LCS, Edit Distance, Longest Palindromic Subsequence, Shortest Common Supersequence.
* **Longest Increasing Subsequence (LIS):** $O(N^2)$ DP table and $O(N \log N)$ Binary Search using Patience Sorting / Tails array.
* **Grid DP:** Unique Paths I & II, Minimum Path Sum, Cherry Pickup.
* **Interval DP & MCM:** Matrix Chain Multiplication, Burst Balloons, Palindrome Partitioning II.
* **DP on Trees & Bitmask DP:** Tree independent sets, Traveling Salesperson Problem (TSP) on small $N \le 16$.

<a id="F02-B0042"></a>

---

<a id="F02-B0043"></a>

### 12. Greedy Patterns
* **Interval Scheduling:** Activity Selection, Non-overlapping Intervals, Minimum Number of Arrows to Burst Balloons.
* **Array Greedy:** Jump Game I (maximum reachable index) & Jump Game II, Gas Station (circular greedy balance).

<a id="F02-B0044"></a>

---

<a id="F02-B0045"></a>

### 13. Bit Manipulation Patterns
* **XOR Invariants:** $a \oplus a = 0$, $a \oplus 0 = a$. Single Number I, II (bit counters modulo 3), and III (isolating lowest set bit `diff & -diff`).
* **Bitwise Tricks:** Checking if $K$-th bit is set, Brian Kernighan’s Algorithm for counting set bits (`n = n & (n - 1)`), Checking Power of 2 (`n > 0 && (n & (n - 1)) == 0`), Reverse Bits.

<a id="F02-B0046"></a>

---

<a id="F02-B0047"></a>

### 14. All 8 Sorting Algorithms
* **Comparison Sorts:**
  * **Bubble Sort:** $O(N^2)$ adjacent swaps with early-exit flag.
  * **Selection Sort:** $O(N^2)$ finding minimum element in unsorted partition.
  * **Insertion Sort:** $O(N^2)$ shifting elements; near $O(N)$ for almost-sorted arrays.
  * **Merge Sort:** $O(N \log N)$ divide-and-conquer; stable; requires $O(N)$ auxiliary memory.
  * **Quick Sort:** $O(N \log N)$ average, $O(N^2)$ worst case; in-place; partitioning schemes (Lomuto vs Hoare).
  * **Heap Sort:** $O(N \log N)$ in-place using Max-Heap; unstable.
* **Non-Comparison Sorts:**
  * **Counting Sort:** $O(N + K)$ non-comparison sorting for bounded integer keys.
  * **Radix Sort:** $O(D \cdot (N + K))$ digit-by-digit sorting using Counting Sort as a stable subroutine.

<a id="F02-B0048"></a>

---

<a id="F02-B0049"></a>

### 15. Advanced Range Queries (Segment & Fenwick Trees)
* **Segment Tree:**
  * Complete binary tree over an array supporting Range Sum / Range Minimum Query and Point Updates in $O(\log N)$ time.
  * Lazy Propagation for Range Updates in $O(\log N)$.
* **Fenwick Tree (Binary Indexed Tree - BIT):**
  * Space-efficient array-based tree using two's complement lowest set bit (`i & -i`) for Prefix Sum queries and Point Updates in $O(\log N)$ time with minimal code.
