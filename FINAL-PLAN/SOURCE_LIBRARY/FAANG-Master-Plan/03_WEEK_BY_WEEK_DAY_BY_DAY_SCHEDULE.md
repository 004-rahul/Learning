# 🗓️ Master 32-Week Day-by-Day Execution Schedule
*(Fully Integrated with CodeWithShubham DSA & CodeLLDWithShubham Mindmaps)*

**Rhythm:** Weekdays = 2 Hours (DSA Single Focus). Saturdays = LLD + DevOps. Sundays = HLD + AI/Project + STAR.

---

## 📌 Phase 1: Algorithmic Mastery & LLD Foundations (Weeks 1 – 8)

### Week 1: Arrays, Kadane, Prefix Sums & Dutch National Flag
* **Day 1 (Mon):** Array Basics & Memory Model. Cache locality, stack/heap, C# `Span<T>`. Solve: *Concatenation of Array (LC 1929)*, *Contains Duplicate (LC 217)*.
* **Day 2 (Tue):** In-Place Sign Flagging (values in range $[1, n]$). Solve: *Find All Numbers Disappeared (LC 448)*, *Set Matrix Zeroes (LC 73)*.
* **Day 3 (Wed):** 1D Prefix Sum & 2D Matrix Prefix Sum. Subarray Sum Equals K (`Map<sum - k, count>`). Solve: *Running Sum (LC 1480)*, *Subarray Sum Equals K (LC 560)*.
* **Day 4 (Thu):** Kadane’s Algorithm Suite. Max Subarray, Max Product Subarray (track min & max), Circular Subarray. Solve: *Maximum Subarray (LC 53)*, *Maximum Product Subarray (LC 152)*.
* **Day 5 (Fri):** Dutch National Flag (3-way partition: `low`, `mid`, `high`). Solve: *Sort Colors (LC 75)*, *First Missing Positive (LC 41)*.
* **Day 6 (Sat) — LLD Block (5 hrs):**
  * **OOP Fundamentals (Mindmap Branch 1):** Classes & Objects, Constructors, Encapsulation, Abstraction, Inheritance, Polymorphism, Access Modifiers, Static, Enums.
  * **Design Principles (Mindmap Branch 3):** DRY, KISS, YAGNI, Separation of Concerns, Coupling, Cohesion, Composition over Inheritance, Law of Demeter.
  * **Creational Patterns:** Implement **Strategy Pattern** & **Factory Method Pattern** in C#.
* **Day 7 (Sun) — HLD & Review Block (5 hrs):**
  * System Design Core: DNS, Load Balancers (L4 vs L7), Stateless App Servers.
  * Verbal STAR Drill: Story 1 (Email processing optimization 7–10h $\to$ 1–1.5h using AWS SQS/SES).
  * Week 1 Spaced Repetition test with notes closed.

---

### Week 2: Two Pointers & String Fundamentals
* **Day 8 (Mon):** Converging Two Pointers (Opposite Ends). Sorting prerequisite. Solve: *Two Sum II (LC 167)*, *Valid Palindrome (LC 125)*.
* **Day 9 (Tue):** 3Sum & 4Sum Extension. Solve: *3Sum (LC 15)* (mastering duplicate pointer skipping `while (nums[left] == nums[left+1]) left++`).
* **Day 10 (Wed):** Greedy Two Pointers. Solve: *Container With Most Water (LC 11)*, *Trapping Rain Water (LC 42 - Two Pointers approach)*.
* **Day 11 (Thu):** Fast & Slow Pointers (Reader-Writer). Solve: *Remove Duplicates from Sorted Array (LC 26)*, *Move Zeroes (LC 283)*.
* **Day 12 (Fri):** Right-to-Left In-Place Writer & Sorted Squares. Solve: *Merge Sorted Array (LC 88)*, *Squares of a Sorted Array (LC 977)*.
* **Day 13 (Sat) — LLD Block (5 hrs):**
  * **Class Relationships (Mindmap Branch 2):** Association (`-->`), Dependency (`..>`), Aggregation (`◇--`), Composition (`◆--`), Realization (`..▷`).
  * **SOLID Principles (Mindmap Branch 4):** SRP, OCP, LSP, ISP, DIP in C#.
  * **Behavioral Patterns:** Observer Pattern & Thread-Safe Singleton (`Lazy<T>` vs double-check lock).
  * Machine Coding: **Design In-Memory Logging Framework** in C# with sinks (Console, File, Cloud).
* **Day 14 (Sun) — HLD & Review Block (5 hrs):**
  * HLD Caching Deep Dive: Cache-Aside, Write-Through, Write-Back, Eviction policies (LRU, LFU).
  * Verbal STAR Drill: Story 2 (Production deadlock / outage incident).

---

### Week 3: Sliding Window & String Pattern Matching (KMP, Rabin-Karp)
* **Day 15 (Mon):** Fixed Size Sliding Window. Solve: *Maximum Average Subarray I (LC 643)*, *Find All Anagrams (LC 438)*.
* **Day 16 (Tue):** Variable Window (Dynamic Expansion & Contraction). Solve: *Longest Substring Without Repeating Characters (LC 3)*.
* **Day 17 (Wed):** Variable Window Target Sum. Solve: *Minimum Size Subarray Sum (LC 209)*, *Fruit Into Baskets (LC 904)*.
* **Day 18 (Thu):** Frequency Map Window & Anagrams. Solve: *Longest Repeating Character Replacement (LC 424)*, *Group Anagrams (LC 49)*.
* **Day 19 (Fri):** Advanced String Pattern Matching: **KMP Algorithm** (LPS Array construction) & **Rabin-Karp** rolling hash. Solve: *Find the Index of the First Occurrence in a String (LC 28)*.
* **Day 20 (Sat) — LLD Block (5 hrs):**
  * **UML Diagrams (Mindmap Branch 5):** Class Diagram, Use Case Diagram, Sequence Diagram, Activity Diagram, State Machine Diagram.
  * **Structural Patterns:** Adapter Pattern, Facade Pattern, Decorator Pattern in C#.
  * Machine Coding: **Design Parking Lot System (Part 1)** (Classes, Spot hierarchy, Strategy pattern for allocation).
* **Day 21 (Sun) — HLD & Review Block (5 hrs):**
  * Anchor HLD 1: **Design URL Shortener (TinyURL)** (Base62, Key Generation Service, Redis cache-aside).
  * Spaced Repetition test for Weeks 1–3.

---

### Week 4: Stack Patterns (Monotonic, Parentheses, Expressions) & Queue
* **Day 22 (Mon):** Monotonic Decreasing Stack. Solve: *Daily Temperatures (LC 739)*, *Next Greater Element I (LC 496)*.
* **Day 23 (Tue):** Circular Array Next Greater Element. Solve: *Next Greater Element II (LC 503)*, *Online Stock Span (LC 901)*.
* **Day 24 (Wed):** Histogram Boundary Expansion. Solve: *Largest Rectangle in Histogram (LC 84)*, *Maximal Rectangle (LC 85)*.
* **Day 25 (Thu):** Expression Evaluation & Min Stack. Solve: *Min Stack (LC 155)*, *Evaluate Reverse Polish Notation (LC 150)*, Infix to Postfix conversion.
* **Day 26 (Fri):** Queue Patterns: Circular Queue & Monotonic Deque. Solve: *Design Circular Queue (LC 622)*, *Sliding Window Maximum (LC 239)*.
* **Day 27 (Sat) — LLD Block (5 hrs):**
  * Machine Coding: **Design Parking Lot System (Part 2)** (Multi-floor pricing, thread-safe checkout, unit tests).
  * Behavioral Pattern: **Builder Pattern** (Fluent construction of complex domain entities).
* **Day 28 (Sun) — HLD & Review Block (5 hrs):**
  * Anchor HLD 2: **Design Distributed Rate Limiter** (Token Bucket, Leaky Bucket, Sliding Window Log, Redis Lua scripts).
  * Spaced Repetition Checkpoint (Cumulative test of Weeks 1–4).

---

### Week 5: Binary Search (Arrays & Answer Space)
* **Day 29 (Mon):** Standard Templates, Lower & Upper Bound. Solve: *Binary Search (LC 704)*, *First and Last Position (LC 34)*.
* **Day 30 (Tue):** Rotated Sorted Array. Solve: *Search in Rotated Sorted Array (LC 33)*, *Find Minimum in Rotated (LC 153)*.
* **Day 31 (Wed):** 2D Matrix Binary Search. Solve: *Search a 2D Matrix (LC 74)*, *Search a 2D Matrix II (LC 240)*.
* **Day 32 (Thu):** Binary Search on Answer Space (Capacity/Time). Solve: *Koko Eating Bananas (LC 875)*, *Capacity to Ship Packages (LC 1011)*.
* **Day 33 (Fri):** Min-Max Answer Space Optimization. Solve: *Split Array Largest Sum (LC 410)*.
* **Day 34 (Sat) — LLD Block (5 hrs):**
  * **State Pattern & Command Pattern** in C#.
  * Machine Coding: **Design Elevator System (Part 1)** (State machine: `MovingUp`, `MovingDown`, `Idle`; Dispatcher interface).
* **Day 35 (Sun) — HLD & Review Block (5 hrs):**
  * Queues & Streaming: AWS SQS vs RabbitMQ vs Apache Kafka (Partitions, Consumer Groups, Offsets, At-least-once delivery).
  * Verbal STAR Drill: Story 3 (Technical disagreement on architecture).

---

### Week 6: Linked List Reversals & Floyd's Cycle Detection
* **Day 36 (Mon):** Reversal & Sentinel Pointers. Solve: *Reverse Linked List (LC 206)*, *Middle of Linked List (LC 876)*.
* **Day 37 (Tue):** Merge & Pointer Mutation. Solve: *Merge Two Sorted Lists (LC 21)*, *Remove Nth Node From End (LC 19)*.
* **Day 38 (Wed):** Floyd’s Tortoise & Hare Cycle Detection. Solve: *Linked List Cycle (LC 141)*, *Linked List Cycle II (LC 142)*.
* **Day 39 (Thu):** Cycle Detection on Functional Array. Solve: *Find the Duplicate Number (LC 287)*.
* **Day 40 (Fri):** Complex Reversals. Solve: *Reverse Nodes in k-Group (LC 25)*, *Reverse Linked List II (LC 92)*.
* **Day 41 (Sat) — LLD & DevOps Block (5 hrs):**
  * Machine Coding: **Design Elevator System (Part 2)** (LOOK / SCAN dispatching algorithm, concurrency safety).
  * DevOps: Writing multi-stage `Dockerfile` for ASP.NET Core apps.
* **Day 42 (Sun) — HLD & Review Block (5 hrs):**
  * Sharding, Partitioning & Consistent Hashing with Virtual Nodes.
  * Anchor HLD 3: **Design Distributed In-Memory Cache (Redis Clone)**.
  * Verbal STAR Drill: Story 4 (Ownership & proactive initiative).

---

### Week 7: Binary Trees, Views & Tree DP
* **Day 43 (Mon):** Traversals: Inorder, Preorder, Postorder (Iterative with stack & Recursive), Level Order BFS. Solve: *Binary Tree Level Order Traversal (LC 102)*, *Zigzag Level Order (LC 103)*.
* **Day 44 (Tue):** Boundary Traversal & Tree Views: Top View, Bottom View, Left View, Right View. Solve: *Boundary of Binary Tree*, *Binary Tree Right Side View (LC 199)*.
* **Day 45 (Wed):** Tree DP: Diameter & Global Maxima. Solve: *Diameter of Binary Tree (LC 543)*, *Binary Tree Maximum Path Sum (LC 124)*.
* **Day 46 (Thu):** Lowest Common Ancestor. Solve: *Lowest Common Ancestor of Binary Tree (LC 236)*.
* **Day 47 (Fri):** Tree Construction & Serialization. Solve: *Construct Binary Tree from Preorder and Inorder (LC 105)*, *Serialize and Deserialize Binary Tree (LC 297)*.
* **Day 48 (Sat) — LLD Block (5 hrs):**
  * Machine Coding: **Design In-Memory LRU Cache** in C# (Doubly Linked List + Dictionary + `ReaderWriterLockSlim`).
* **Day 49 (Sun) — HLD & Review Block (5 hrs):**
  * Anchor HLD 4: **Design WhatsApp / Real-Time Chat System** (WebSockets, Connection Managers, Presence service, Message store).
  * Review all trees and linked lists.

---

### Week 8: BST, Heaps & Tries
* **Day 50 (Mon):** BST Properties, Invariants & Validation. Solve: *Validate BST (LC 98)*, *Kth Smallest Element in BST (LC 230)*.
* **Day 51 (Tue):** BST Search, Inorder Successor & LCA. Solve: *LCA of BST (LC 235)*, *Inorder Successor in BST (LC 285)*.
* **Day 52 (Wed):** Heaps & Priority Queues (Top-K Pattern in C#). Solve: *Kth Largest Element in Array (LC 215)*, *Top K Frequent Elements (LC 347)*.
* **Day 53 (Thu):** Two Heaps Pattern (Running Median). Solve: *Find Median from Data Stream (LC 295)*.
* **Day 54 (Fri):** Trie: Prefix Tree & Bitwise Trie. Solve: *Implement Trie (LC 208)*, *Maximum XOR of Two Numbers in an Array (LC 421)*.
* **Day 55 (Sat) — LLD Block (5 hrs):**
  * Machine Coding: **Design Tic-Tac-Toe / Chess Board** in C# (Board modeling, rules validation, $O(1)$ win checking).
* **Day 56 (Sun) — Milestone Checkpoint (5 hrs):**
  * Phase 1 Cumulative Test (Timed 2-hour coding test: 3 unseen LeetCode Mediums).

---

## 📌 Phase 2: Advanced DSA, HLD & Project Core Build (Weeks 9 – 16)

### Week 9: Graphs — Traversals, Cycle Detection & Topological Sort
* **Day 57 (Mon):** Matrix BFS/DFS Traversals. Solve: *Number of Islands (LC 200)*, *Max Area of Island (LC 695)*.
* **Day 58 (Tue):** Multi-Source BFS. Solve: *Rotting Oranges (LC 994)*, *01 Matrix (LC 542)*.
* **Day 59 (Wed):** Cycle Detection in Directed Graph (3-Coloring DFS). Solve: *Course Schedule (LC 207)*.
* **Day 60 (Thu):** Topological Sort (Kahn’s Algorithm In-Degree Queue). Solve: *Course Schedule II (LC 210)*.
* **Day 61 (Fri):** Advanced Topo Sort (DAG). Solve: *Alien Dictionary (LC 269)*.
* **Day 62 (Sat) — LLD Block (5 hrs):**
  * Machine Coding: **Design Rate Limiter in Code** in C# (Token Bucket, Leaky Bucket, Sliding Window Log classes with clean interfaces).
* **Day 63 (Sun) — HLD & Review Block (5 hrs):**
  * Anchor HLD 5: **Design Twitter / News Feed** (Fan-out on Write vs Fan-out on Read, Redis feed caching, timeline generation).
  * Verbal STAR Drill: Story 5 (Technical failure & recovery).

---

### Week 10: Graphs — Shortest Paths (Dijkstra, Bellman-Ford) & DSU
* **Day 64 (Mon):** Disjoint Set Union (Path Compression & Union by Rank). Solve: *Number of Connected Components (LC 323)*.
* **Day 65 (Tue):** DSU Cycle Detection & Redundancy. Solve: *Redundant Connection (LC 684)*.
* **Day 66 (Wed):** Kruskal’s Minimum Spanning Tree (MST). Solve: *Min Cost to Connect All Points (LC 1584)*.
* **Day 67 (Thu):** Shortest Path Algorithms: Dijkstra’s with Min-Heap & Bellman-Ford (negative cycle detection). Solve: *Network Delay Time (LC 743)*.
* **Day 68 (Fri):** Bipartite Graph Coloring & Modified Shortest Paths. Solve: *Is Graph Bipartite? (LC 785)*, *Cheapest Flights Within K Stops (LC 787)*.
* **Day 69 (Sat) — LLD Block (5 hrs):**
  * Machine Coding: **Design BookMyShow (Part 1)** (Cinema, Screen, Movie, Show, Seat domain models in C#).
* **Day 70 (Sun) — HLD & Resilience (5 hrs):**
  * Review all 14 Single Points of Failure (SPOF) categories from `spof_system_design.pdf` (Circuit breakers, bulkheads, timeouts, connection pools).

---

### Weeks 11–13: Dynamic Programming (1D, Knapsack, LCS, LIS) & Project Phase 1
* **DSA Focus (Weekdays):**
  * 1D Linear State: *Climbing Stairs (LC 70)*, *House Robber I & II (LC 198, 213)*, *Decode Ways (LC 91)*.
  * 0/1 Knapsack: *Partition Equal Subset Sum (LC 416)*, *Target Sum (LC 494)*.
  * Unbounded Knapsack: *Coin Change I & II (LC 322, 518)*.
  * 2D Strings: *Longest Common Subsequence (LC 1143)*, *Edit Distance (LC 72)*.
  * LIS: *Longest Increasing Subsequence (LC 300)* in $O(N \log N)$ patience sort.
* **Project Phase 1 Build (Weekends):**
  * Initialize `NexusQueue` ASP.NET Core 8 Web API.
  * PostgreSQL EF Core schema for `Jobs` table.
  * RabbitMQ exchange and queue bindings.
  * Background worker consumer service.

---

### Weeks 14–16: Grid DP, MCM, All 8 Sorting Algorithms, Range Queries & Project Phase 2
* **DSA Focus (Weekdays):**
  * Grid DP: *Unique Paths I & II (LC 62, 63)*, *Minimum Path Sum (LC 64)*.
  * Matrix Chain Multiplication & Interval DP: *Burst Balloons (LC 312)*.
  * All 8 Sorting Algorithms: Merge Sort, Quick Sort (Lomuto vs Hoare partition), Heap Sort, Counting Sort.
  * Advanced Range Queries: Segment Tree & Fenwick Tree (Binary Indexed Tree). Solve: *Range Sum Query - Mutable (LC 307)*.
* **Project Phase 2 Build (Weekends):**
  * Redis distributed locking (`SETNX` / RedLock).
  * Idempotency middleware caching responses by `Idempotency-Key`.
  * Polly retry policies with exponential backoff and jitter.
  * Dead-Letter Queue (DLQ) routing for poison pills.
* **LLD Machine Coding (Weekends):**
  * Complete **BookMyShow Part 2** (10-min seat locking with concurrency).
  * Complete **Splitwise** (Equal/Exact splits, Min Cash Flow debt simplification graph algorithm).

---

## 📌 Phase 3: Project AI/Cloud, Anchor HLD Mastery & Timed DSA (Weeks 17 – 20)

### Weeks 17–18: Project AI/RAG Pipeline & Anchor HLDs
* **DSA Focus (Weekdays):** Daily timed LeetCode Medium sprint (maintaining speed across all patterns).
* **Project Phase 3 Build (Weekends):**
  * Microsoft Semantic Kernel integration in C#.
  * Document text chunking & vector embeddings generation.
  * PostgreSQL `pgvector` extension with HNSW index for cosine similarity search.
  * Expose semantic search query endpoint.
* **Anchor HLDs:**
  * Anchor HLD 6: **Design YouTube / Video Streaming Pipeline**.
  * Anchor HLD 7: **Design Uber / Ride-Sharing System** (QuadTree/H3 geospatial indexing).

---

### Weeks 19–20: Kubernetes Deployment, Load Benchmark & HLD Capstone
* **Project Phase 4 & 5 Build (Weekends):**
  * Multi-stage Dockerfile (~90MB Alpine).
  * Kubernetes manifests with **KEDA autoscaling** on RabbitMQ queue depth.
  * Prometheus metrics export & Grafana dashboard for RPS, P95/P99 latency, and DLQ counts.
  * `k6` load test benchmark simulating 5,000 RPS. Document failure resilience in README.
* **Anchor HLD 8:**
  * **Design Hotel Booking System** (Distributed Saga transactions, avoiding double-bookings).
* **Behavioral:** Rehearse all 6 STAR stories out loud in clear technical English.

---

## 📌 Phase 4: Interview Launch, Full Mocks & Referral Pipeline (Weeks 21 – 24)

* **Week 21 (Launch Applications):**
  * Update ATS resume with the load-tested `NexusQueue` project and GitHub link.
  * Launch referral outreach on LinkedIn for Amazon, Google, Microsoft, Meta, Uber, and top Indian unicorns.
* **Daily DSA Routine:** 45-minute timed mock coding sprints.
* **Weekly Weekend Routine:**
  * 2 live mock interviews per week (Pramp / peer mocks) covering 1 DSA + 1 System Design (HLD/LLD).
  * Amazon Leadership Principles deep dive (preparing 2 distinct stories for all 16 Leadership Principles).

---

## 📌 Phase 5: Peak Conversion, Gap Repair & Multi-Offer Negotiation (Weeks 25 – 32)

* Active interview rounds and onsite loops.
* Daily 30-minute rapid review of the [Q-and-A/](file:///d:/RAHUL/Interview/Learning/Q-and-A) guides.
* Closing any specific feedback gaps from early interviews.
* Negotiating compensation, counter-offers, and sign-on bonuses.
