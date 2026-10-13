# All eight months of detailed lessons, exercises and checkpoints

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="F00"></a>

## F00 — 00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM

Full source content: [FAANG-Master-Plan/00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM.md](../SOURCE_LIBRARY/FAANG-Master-Plan/00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM.md). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="F00-B0001"></a>

# 🎯 FAANG/MAANG 6–8 Month Master Operating System

<a id="F00-B0002"></a>

**Candidate:** Rahul Patel  
**Target Role:** SDE-2 / Backend Software Engineer II (Google L4, Amazon L5, Microsoft SDE-2, Meta E4, Uber L4, Atlassian)  
**Primary Stack:** C# / .NET 8 / ASP.NET Core / PostgreSQL / Redis / RabbitMQ / AWS / Docker / Kubernetes / AI (Semantic Kernel & pgvector)  
**Time Commitment:** 2 focused hours/day (Monday–Friday) + Deep Work blocks (Saturday & Sunday)  
**Timeline:** 32 Weeks (8 Months) | Launch Applications: Month 6 (Week 21)  

<a id="F00-B0003"></a>

---

<a id="F00-B0004"></a>

## 1. The Core Philosophy: "Build & Code > Read & Memorize"

<a id="F00-B0005"></a>

Most engineers fail FAANG interviews for two reasons:
1. **Passive Consumption:** They watch tutorials, read books, or memorize LeetCode solutions without writing the code from scratch under timed conditions.
2. **Textbook Trivia Trap:** They spend months reading CLR memory models or academic OS theory that FAANG interviewers never ask, while neglecting the actual evaluation criteria: **Live Coding (DSA), Low-Level Design (Machine Coding), High-Level Distributed Architecture (HLD), and Behavioral Leadership (STAR).**

<a id="F00-B0006"></a>

### Your Operating Rules:
* **The 25-Minute Coding Rule:** When practicing a DSA problem, never look at the solution before 25 minutes of hard independent thinking on paper/whiteboard first.
* **The Code-It-Out LLD Rule:** Never just draw UML diagrams for LLD. Write the actual C# classes, interfaces, and unit tests in your IDE.
* **The Hands-On Project Rule:** You don't just "read about" Kafka or Redis; you run them in Docker, produce failure conditions, measure latency, and write the code.
* **The 1-Click Logging Rule:** Tracking takes **under 2 minutes** at the end of each session. No bloated 30-minute spreadsheet management.

<a id="F00-B0007"></a>

---

<a id="F00-B0008"></a>

## 2. The 2-Hour Weekday vs Weekend Operating Rhythm

<a id="F00-B0009"></a>

### ⏱️ Weekday Routine (Monday to Friday — Exactly 120 Minutes)
| Time | Duration | Activity | Purpose |
| :--- | :--- | :--- | :--- |
| **00:00 – 00:15** | 15 min | **Active Recall Drill** | Explain yesterday's pattern out loud with notes closed. Active retrieval stops the forgetting curve. |
| **00:15 – 01:45** | 90 min | **Single Focus: DSA Pattern Mastery** | Learn 1 specific sub-pattern mechanism $\to$ solve 1–2 curated LeetCode Medium problems in C# from scratch. |
| **01:45 – 01:55** | 10 min | **Complexity & Edge Case Review** | Explicitly state Time $O$ and Space $O$, identify edge cases (null, empty, duplicates, overflow). |
| **01:55 – 02:00** | 5 min | **1-Click Tracking** | Check the box in your Google Sheet tracker and write a 1-sentence takeaway. Done. |

<a id="F00-B0010"></a>

---

<a id="F00-B0011"></a>

### ⏱️ Weekend Routine (Saturday & Sunday — 5 to 6 Hours Deep Work)
Weekends are where you build seniority and real engineering depth without weekday time pressure:

<a id="F00-B0012"></a>

#### Saturday: Low-Level Design & DevOps Engineering (5 Hours)
* **Block 1 (3 Hours): LLD & Machine Coding in C#**
  * Object-Oriented Domain Modeling, SOLID refactoring, applying GoF Design Patterns.
  * Implement full working systems (Parking Lot, Elevator, Rate Limiter, LRU Cache) with clean interfaces and thread safety.
* **Block 2 (2 Hours): DevOps & Container Infrastructure**
  * Docker multi-stage builds, Docker Compose, Kubernetes manifests, GitHub Actions CI/CD pipelines.

<a id="F00-B0013"></a>

#### Sunday: Distributed Systems (HLD), Project Build & Behavioral (5 Hours)
* **Block 1 (2.5 Hours): High-Level System Design (HLD)**
  * Deep dive into 1 anchor system (e.g., TinyURL, WhatsApp, Uber, Distributed Job Scheduler).
  * Capacity estimation, data modeling, API contracts, SPOF elimination, scaling trade-offs.
* **Block 2 (1.5 Hours): Distributed Project & AI Integration**
  * Hands-on coding of the **Distributed Job & AI Task Engine** (Queues, Redis locks, Idempotency, pgvector RAG).
* **Block 3 (1.0 Hour): Behavioral STAR Drills & Weekly Spaced Review**
  * Speak 1 STAR story out loud in clear technical English.
  * Cumulative self-test of concepts from Day 1, 3, 7, 14, 30.

<a id="F00-B0014"></a>

---

<a id="F00-B0015"></a>

## 3. High-Level Timeline Across the 8 Months

<a id="F00-B0016"></a>

```
┌────────────────────────────────────────────────────────────────────────┐
│                        32-WEEK TIMELINE ROADMAP                        │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ WEEKS 1 – 8        │ WEEKS 9 – 16       │ WEEKS 17 – 32                │
│ DSA Core Patterns  │ Advanced DSA +     │ Project Load Test +          │
│ + LLD Machine      │ HLD + Project      │ Full Mocks +                 │
│   Coding           │   Phase 1 Build    │   FAANG Application Launch   │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

<a id="F00-B0017"></a>

* **Weeks 1–8 (Phase 1): DSA Core Patterns & LLD Foundations**
  * Master Linear Structures, Two Pointers, Sliding Window, Monotonic Stacks, Trees, Heaps, and Core OOP Patterns.
* **Weeks 9–16 (Phase 2): Advanced DSA, HLD & Project Core Build**
  * Master Graphs, Dynamic Programming, Distributed Systems principles, and build Phase 1 of the Distributed Job Platform.
* **Weeks 17–20 (Phase 3): Project Advanced Features (AI/RAG), DevOps & HLD Anchor Mastery**
  * Dockerize & deploy the project to AWS/K8s, integrate pgvector & Semantic Kernel, and master 7 HLD anchor systems.
* **Weeks 21–24 (Phase 4): Interview Launch & Full Mock Loops**
  * Launch referrals at Amazon, Google, Microsoft, Meta, Uber. Daily timed LeetCode sprints + 2 mock interviews/week.
* **Weeks 25–32 (Phase 5): Conversion, Debugging Gaps & Multi-Offer Negotiation**
  * Active hiring loops, closing specific gaps, and negotiating competitive compensation packages.


<a id="F03"></a>

## F03 — 03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE

Full source content: [FAANG-Master-Plan/03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE.md](../SOURCE_LIBRARY/FAANG-Master-Plan/03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE.md). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="F03-B0001"></a>

# 🗓️ Master 32-Week Day-by-Day Execution Schedule
*(Fully Integrated with CodeWithShubham DSA & CodeLLDWithShubham Mindmaps)*

<a id="F03-B0002"></a>

**Rhythm:** Weekdays = 2 Hours (DSA Single Focus). Saturdays = LLD + DevOps. Sundays = HLD + AI/Project + STAR.

<a id="F03-B0003"></a>

---

<a id="F03-B0004"></a>

## 📌 Phase 1: Algorithmic Mastery & LLD Foundations (Weeks 1 – 8)

<a id="F03-B0005"></a>

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

<a id="F03-B0006"></a>

---

<a id="F03-B0007"></a>

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

<a id="F03-B0008"></a>

---

<a id="F03-B0009"></a>

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

<a id="F03-B0010"></a>

---

<a id="F03-B0011"></a>

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

<a id="F03-B0012"></a>

---

<a id="F03-B0013"></a>

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

<a id="F03-B0014"></a>

---

<a id="F03-B0015"></a>

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

<a id="F03-B0016"></a>

---

<a id="F03-B0017"></a>

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

<a id="F03-B0018"></a>

---

<a id="F03-B0019"></a>

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

<a id="F03-B0020"></a>

---

<a id="F03-B0021"></a>

## 📌 Phase 2: Advanced DSA, HLD & Project Core Build (Weeks 9 – 16)

<a id="F03-B0022"></a>

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

<a id="F03-B0023"></a>

---

<a id="F03-B0024"></a>

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

<a id="F03-B0025"></a>

---

<a id="F03-B0026"></a>

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

<a id="F03-B0027"></a>

---

<a id="F03-B0028"></a>

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

<a id="F03-B0029"></a>

---

<a id="F03-B0030"></a>

## 📌 Phase 3: Project AI/Cloud, Anchor HLD Mastery & Timed DSA (Weeks 17 – 20)

<a id="F03-B0031"></a>

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

<a id="F03-B0032"></a>

---

<a id="F03-B0033"></a>

### Weeks 19–20: Kubernetes Deployment, Load Benchmark & HLD Capstone
* **Project Phase 4 & 5 Build (Weekends):**
  * Multi-stage Dockerfile (~90MB Alpine).
  * Kubernetes manifests with **KEDA autoscaling** on RabbitMQ queue depth.
  * Prometheus metrics export & Grafana dashboard for RPS, P95/P99 latency, and DLQ counts.
  * `k6` load test benchmark simulating 5,000 RPS. Document failure resilience in README.
* **Anchor HLD 8:**
  * **Design Hotel Booking System** (Distributed Saga transactions, avoiding double-bookings).
* **Behavioral:** Rehearse all 6 STAR stories out loud in clear technical English.


> Study correction: Treat benchmark figures in source plans as proposed targets/examples, not measured achievements. Record hardware, workload, errors, percentile latency and date before claiming a result.

<a id="F03-B0034"></a>

---

<a id="F03-B0035"></a>

## 📌 Phase 4: Interview Launch, Full Mocks & Referral Pipeline (Weeks 21 – 24)

<a id="F03-B0036"></a>

* **Week 21 (Launch Applications):**
  * Update ATS resume with the load-tested `NexusQueue` project and GitHub link.
  * Launch referral outreach on LinkedIn for Amazon, Google, Microsoft, Meta, Uber, and top Indian unicorns.
* **Daily DSA Routine:** 45-minute timed mock coding sprints.
* **Weekly Weekend Routine:**
  * 2 live mock interviews per week (Pramp / peer mocks) covering 1 DSA + 1 System Design (HLD/LLD).
  * Amazon Leadership Principles deep dive (preparing 2 distinct stories for all 16 Leadership Principles).

<a id="F03-B0037"></a>

---

<a id="F03-B0038"></a>

## 📌 Phase 5: Peak Conversion, Gap Repair & Multi-Offer Negotiation (Weeks 25 – 32)

<a id="F03-B0039"></a>

* Active interview rounds and onsite loops.
* Daily 30-minute rapid review of the [Q-and-A/](file:///d:/RAHUL/Interview/Learning/Q-and-A) guides.
* Closing any specific feedback gaps from early interviews.
* Negotiating compensation, counter-offers, and sign-on bonuses.


<a id="ST"></a>

## ST — THE_PLAN

Full source content: [Study-Plan/THE_PLAN.docx](../SOURCE_LIBRARY/Study-Plan/THE_PLAN.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="ST-B0001"></a>

The Plan

<a id="ST-B0002"></a>

Software engineer transformation, 32 weeks. Week 1 starts Monday 24 August 2026. Read Part 1 today; everything after it can wait.

<a id="ST-B0003"></a>

This is one of two files you use to run the plan. This one tells you why and what. TRACKER.xlsx tells you what to do today. You open the tracker every day and this document about once a week. There is also a Q-and-A folder for reading on your commute - see Part 1.

<a id="ST-B0004"></a>

It replaces four separate documents that all said slightly different things about how to start, which is why the plan felt bigger than it is. There is now one answer to every question about how this works, and it is in here.

<a id="ST-B0005"></a>

### PART 1 - START HERE

<a id="ST-B0006"></a>

### The whole plan in ten lines

<a id="ST-B0007"></a>

•  Two hours on weekdays. Full days at weekends. Eight months.

<a id="ST-B0008"></a>

•  Start every session by explaining yesterday out loud with notes closed.

<a id="ST-B0009"></a>

•  Learn one .NET or CS topic, then do DSA. Every single day.

<a id="ST-B0010"></a>

•  Write what you got wrong in the WEAK tab. Friday is only for that tab.

<a id="ST-B0011"></a>

•  Sunday: test yourself with no notes. Write down 3 things you forgot.

<a id="ST-B0012"></a>

•  Review each concept again on day 1, 3, 7, 14 and 30.

<a id="ST-B0013"></a>

•  Write one line in the JOURNAL tab every working day. This becomes your interview stories.

<a id="ST-B0014"></a>

•  Weeks 13 to 19: build one serious distributed project and deploy it.

<a id="ST-B0015"></a>

•  Week 21: start applying. Keep studying while you interview.

<a id="ST-B0016"></a>

•  Measure only what you can explain, solve or build from memory.

<a id="ST-B0017"></a>

That is the plan. Everything else in this document exists so that you never have to decide what to do on a Tuesday. The thinking is already done. You just show up.

<a id="ST-B0018"></a>

### What to do today - the setup day

<a id="ST-B0019"></a>

Today is not a study day. It takes about an hour.

<a id="ST-B0020"></a>

| # | Do this | Detail |
| --- | --- | --- |
| 1 | Open TRACKER.xlsx | Read the START tab, top to bottom. It is one screen |
| 2 | Check the start date | The yellow cell on the START tab. Change it if you want to begin a different Monday - everything else moves with it |
| 3 | Write your first journal line | JOURNAL tab. Even "Day 0 - set up the study system" counts. The habit matters more than the content |
| 4 | Install Anki (free) | Create one deck. Do not add cards yet - cards come after you understand something |
| 5 | Create a LeetCode account | And bookmark neetcode.io |
| 6 | Create one document called Master Notes | One page per concept, using the six questions in Part 4. Keep pages short |
| 7 | Decide your two hours | Same time every weekday. Write it down and treat it as a meeting you cannot move |
| 8 | Read tomorrow's row | DAILY tab, the first row. That is your Monday |

<a id="ST-B0021"></a>

### Your day, simply

<a id="ST-B0022"></a>

| Minutes | What |
| --- | --- |
| First 10 | Talk out loud about yesterday's topic. No notes. Badly is fine. Never skip this - it is the single highest-leverage habit in the plan |
| Next 65 | Today's topic from the DAILY tab. Write short notes |
| Next 40 | One or two DSA problems. Log all six fields in the DSA tab |
| Last 5 | Update the WEAK tab. Write your journal line. Note tomorrow's topic |

<a id="ST-B0023"></a>

Tuesday and Thursday: add 15 minutes of aptitude at the end. That is the only variation.

<a id="ST-B0024"></a>

Why the session opens with recall rather than reading. Rereading produces a feeling of knowing that is not knowing. Retrieval produces the actual thing. This one reordering is the most valuable change in the whole schedule.

<a id="ST-B0025"></a>

### Your week

<a id="ST-B0026"></a>

| Day | Load | Focus |
| --- | --- | --- |
| Mon | 2h | New .NET / C# depth + DSA |
| Tue | 2h | .NET / C# or CS fundamentals + DSA + 15 min aptitude |
| Wed | 2h | Backend / database / networking + DSA |
| Thu | 2h | CS or system design + DSA + 15 min aptitude |
| Fri | 2h | WEAK tab only. No new topics. Active recall and the week's interview questions |
| Sat | Full | Deep topic block + project build + DSA set + speaking practice |
| Sun | Full | Project + no-notes weekly test + spaced review + plan next week |

<a id="ST-B0027"></a>

Friday being new-material-free is not a rest day. It is the consolidation day, and it is the reason week 20 will not feel like starting over. Protect it.

<a id="ST-B0028"></a>

### The two files, and the library behind them

<a id="ST-B0029"></a>

| File | How you use it |
| --- | --- |
| TRACKER.xlsx | Every day. The DAILY tab has one row per day for all 224 days: today's topic, what else to do, what you must be able to explain, and a Done box. Everything else in the workbook is a tab you fill in as you go |
| THE_PLAN.docx (this file) | Once a week, on Sunday, for fifteen minutes. Plus re-read Part 4 at month 3 and month 6, when the method starts to slip |

<a id="ST-B0030"></a>

Behind those two sit fourteen reference documents. You do not read them front to back. The tracker tells you when to open one. They are a library, and a library is not a workload - nobody reads a dictionary cover to cover.

<a id="ST-B0031"></a>

| Document | Opens | What it is for |
| --- | --- | --- |
| 01 Free Resource Directory | As needed | Every free resource mapped to every topic. A lookup, never a read-through |
| 02-09 Month 1 to Month 8 | As needed | The long-form version of what is already in the DAILY tab. Open one when a day needs more detail than the row gives you |
| 10 Project Spec | Week 15 | The distributed job platform. Read it in week 15, build from week 16 |
| 11 Trackers and Templates | Reference only | The templates it describes are already built into TRACKER.xlsx. You do not need to make them. Open it only if you want the reasoning |
| 12 AI, MCP and RAG | Weeks 6, 11, 15 | Three Saturday blocks, then the build in weeks 25-28 |
| 13 Aptitude | Tue and Thu | The 15-minute drills. Intensive in weeks 21-22 |
| 14 Career, Interviews and Relocation | Week 20 | Target companies, visa routes, salary, negotiation and every interview question. The one that matters most from week 20 onward |

<a id="ST-B0032"></a>

### The Q-and-A folder - for the hours the plan cannot use

<a id="ST-B0033"></a>

There is a separate folder called Q-and-A with nine files. They exist for a specific problem: you work full time, you may have to work extra, and you travel four hours a day. The tracker needs you at a desk with two clear hours. These files need nothing but your eyes.

<a id="ST-B0034"></a>

| File | What it is |
| --- | --- |
| M1 to M8 | One file per month. Every question the month's checkpoint asks, with the answer you would say in an interview, the reason it is true, the alternative and why it loses, and the trap people fall into. 222 questions in total |
| DSA_MASTER_GUIDE | The DSA plan the month documents never gave you: which patterns to learn, in what order and why that order, and a head-to-head table of why each pattern beats the obvious alternative. Plus six drills you can do on a train with no laptop |

<a id="ST-B0035"></a>

How they fit with the tracker. The tracker is what you do; the Q-and-A files are what you read. They are the same material from the other side: the tracker row says "explain why .Result deadlocks", and the M1 file contains that answer written out. So a week where you never sat down is not a lost week - it is a week you spent on recall instead of building, and recall is half the skill.

<a id="ST-B0036"></a>

Each file opens with the five questions to read if you only have twenty minutes. Start there on a bad week. Every file also ends with a self-test: cover the answers, say them out loud, and put anything you cannot say into the WEAK tab.

<a id="ST-B0037"></a>

One rule that matters: reading is not learning. After each question, look away and say the answer. On a train, mouth it silently - it still works. Recognition is what reading gives you; recall is what an interview asks for, and only saying it out loud builds that.

<a id="ST-B0038"></a>

### PART 2 - THE 32-WEEK CALENDAR

<a id="ST-B0039"></a>

One row per week. Read one row every Sunday - the row for the week ahead. That is all the planning this system needs. The same table lives in the WEEKS tab of the tracker, where you can tick it off.

<a id="ST-B0040"></a>

Do not read ahead. Reading ahead feels productive and changes nothing - you will have forgotten it by the time it matters, which is the exact problem this plan is built to solve.

<a id="ST-B0041"></a>

| Wk | Dates | Mth | This week is about | Done by Sunday |
| --- | --- | --- | --- | --- |
| 1 | 24-30 Aug 26 | M1 | The type system and memory | 10 problems logged. First Sunday test done |
| 2 | 31 Aug - 6 Sep 26 | M1 | Object orientation, properly | 10 problems. Weak List growing. Toy comparisons built |
| 3 | 7-13 Sep 26 | M1 | Collections, LINQ, delegates | 10 problems. Toy hash map built |
| 4 | 14-20 Sep 26 | M1 | Exceptions, lifetime, and async - the most important week of M1 | Month 1 checkpoint passed. ~40 problems total |
| 5 | 21-27 Sep 26 | M2 | Concurrency and parallelism | Producer-consumer built. 10 problems |
| 6 | 28 Sep - 4 Oct 26 | M2 | The runtime and the ASP.NET Core platform | Minimal API built from an empty project. AI answer drafted |
| 7 | 5-11 Oct 26 | M2 | Web API, security, and EF Core | N+1 reproduced and fixed. Redis cache-aside working |
| 8 | 12-18 Oct 26 | M2 | SQL and database internals - highest immediate job value in the plan | Month 2 checkpoint. Dirty read and deadlock reproduced |
| 9 | 19-25 Oct 26 | M3 | Networking | Full URL journey explained aloud |
| 10 | 26 Oct - 1 Nov 26 | M3 | Operating systems | 10 problems. Two-layer scheduler diagram drawn |
| 11 | 2-8 Nov 26 | M3 | Distributed data and caching | Consistent hashing implemented. Unfamiliar codebase read cold |
| 12 | 9-15 Nov 26 | M3 | Messaging, and SYSTEM DESIGN BEGINS | Month 3 checkpoint. 3 designs timed. Mixed DSA sets begin |
| 13 | 16-22 Nov 26 | M4 | SOLID and object-oriented design | 3 LLDs done from a blank page |
| 14 | 23-29 Nov 26 | M4 | Design patterns - only the ones that matter | Caching decorator built. 2 more LLDs |
| 15 | 30 Nov - 6 Dec 26 | M4 | Distributed systems - the hard parts | READ DOC 10 THIS WEEK. Project designed before it is built |
| 16 | 7-13 Dec 26 | M4 | PROJECT PHASE 1 - the walking skeleton | Month 4 checkpoint. Project runs end to end |
| 17 | 14-20 Dec 26 | M5 | PROJECT PHASE 2 - reliability | Phase 2 done. 5 STAR stories written |
| 18 | 21-27 Dec 26 | M5 | PROJECT PHASE 3 - production concerns | Phase 3 done. Dashboard live. 10 stories total |
| 19 | 28 Dec - 3 Jan 27 | M5 | PROJECT PHASE 4 - ship it | Project DEPLOYED with real p95/p99 numbers. 15 stories total |
| 20 | 4-10 Jan 27 | M5 | System design depth and behavioural - THE GATE TO APPLYING | MONTH 5 CHECKPOINT - the gate. All 20 stories recorded |
| 21 | 11-17 Jan 27 | M6 | APPLICATIONS LAUNCH - calibration week | Pipeline live. Applications tracked in the APPLY tab |
| 22 | 18-24 Jan 27 | M6 | Volume and calibration | 2 external mocks done. Tier 1 applications out |
| 23 | 25-31 Jan 27 | M6 | AMAZON WEEK - preparation | Amazon application in. Full LP matrix complete |
| 24 | 1-7 Feb 27 | M6 | GOOGLE WEEK - preparation | Month 6 checkpoint. Google application in |
| 25 | 8-14 Feb 27 | M7 | Gap repair and advanced messaging | 1 gap closed. RAG skeleton built |
| 26 | 15-21 Feb 27 | M7 | Reliability, scale and the deeper design questions | Vector search working. Another gap closed |
| 27 | 22-28 Feb 27 | M7 | Company-specific depth | 3 weakest stories re-recorded. RAG generating with citations |
| 28 | 1-7 Mar 27 | M7 | Consolidation and the hard round | Month 7 checkpoint. RAG deployed with measured numbers |
| 29 | 8-14 Mar 27 | M8 | Retrieval intensive | One-page pattern sheet written by you |
| 30 | 15-21 Mar 27 | M8 | Oral revision and design volume | 45-minute monologues recorded across all areas |
| 31 | 22-28 Mar 27 | M8 | Peak simulation | Onsite fatigue simulated. Both projects defended |
| 32 | 29 Mar - 4 Apr 27 | M8 | CONVERSION - offers and negotiation | Final checkpoint. A number you can state calmly |

<a id="ST-B0042"></a>

The shape of it. Weeks 1-12 are almost entirely learning. Week 13 adds designing. Weeks 16-19 are the project and they are the heaviest stretch in the plan. Week 20 is the gate: you do not apply before passing it. Weeks 21-32 shift from accumulating to performing, and the weekly rhythm changes to match - far less new material, far more timed practice.

<a id="ST-B0043"></a>

If a month feels different from the last one, that is by design, not drift.

<a id="ST-B0044"></a>

### PART 3 - MANAGING YOURSELF

<a id="ST-B0045"></a>

This is the difference between people who finish an eight-month plan and people who stop in month three. It is not about intelligence or effort. It is about management.

<a id="ST-B0046"></a>

### Rule 1 - Consistency beats intensity, and it is not close

<a id="ST-B0047"></a>

Six days of 90 minutes beats one day of nine hours. Every time. Your brain consolidates during the gaps between sessions, so one long session wastes most of its own effort.

<a id="ST-B0048"></a>

Practical version: never do zero. A 20-minute day keeps the habit alive. A zero day makes tomorrow's zero day easier, and that is how plans die - not in one dramatic collapse but in a quiet run of zeros.

<a id="ST-B0049"></a>

### Rule 2 - The 30-minute emergency day

<a id="ST-B0050"></a>

Some days you will be exhausted from work, or something happens at home. Do not skip. Do the emergency version instead:

<a id="ST-B0051"></a>

| Minutes | What |
| --- | --- |
| 10 | Recall yesterday out loud |
| 15 | One DSA problem |
| 5 | Journal line and WEAK tab |

<a id="ST-B0052"></a>

Thirty minutes. It keeps the streak, keeps the review ladder intact, and costs you almost nothing. Use this instead of skipping, always.

<a id="ST-B0053"></a>

### Rule 3 - What to cut when you are short

<a id="ST-B0054"></a>

When you cannot do everything, cut in this exact order. Top of the list goes first.

<a id="ST-B0055"></a>

| Cut | This | Why it is safe |
| --- | --- | --- |
| 1 | Aptitude | 15 minutes, and Google and Amazon do not test it |
| 2 | The AI and RAG track | Useful, not load-bearing. It is timeboxed for exactly this reason |
| 3 | Anki | Nice to have. The WEAK tab does the essential job |
| 4 | Deep weekend blocks | Shorten them. Do not delete the weekend entirely |
| 5 | New topic depth | Learn it shallower this week, deepen it in the next review cycle |
| Never | Daily recall, daily DSA, Friday WEAK tab, Sunday test, journal line | These five are the plan. Everything else is decoration |

<a id="ST-B0056"></a>

Keep those five, cut anything else, and the plan still works. That is the honest minimum.

<a id="ST-B0057"></a>

### Rule 4 - Protect your energy, not just your time

<a id="ST-B0058"></a>

•  Do DSA when you are freshest, not last. If you are sharper in the morning, move DSA to before work. The order in this document is a default, not a law.

<a id="ST-B0059"></a>

•  Never study immediately after a hard workday without a break. Even 20 minutes of walking or eating first materially changes the quality of the session.

<a id="ST-B0060"></a>

•  Sleep is part of the plan. Memory consolidation happens during sleep. Cutting sleep to study is spending the thing that makes studying work.

<a id="ST-B0061"></a>

•  Take one full evening off per week. Not as a reward - as maintenance. Choose it in advance so it does not become guilt.

<a id="ST-B0062"></a>

### Rule 5 - The Sunday fifteen minutes

<a id="ST-B0063"></a>

•  Open the WEEKS tab. Find your week number. Read that one row.

<a id="ST-B0064"></a>

•  Open the WEAK tab. Pick the three worst items for Friday.

<a id="ST-B0065"></a>

•  Look at last week honestly. Did you do five days or three?

<a id="ST-B0066"></a>

•  That is all the planning the whole system needs.

<a id="ST-B0067"></a>

Do not spend a Sunday redesigning your notes app. Reorganising your system is the most seductive form of procrastination available to engineers.

<a id="ST-B0068"></a>

### Rule 6 - When you fall behind

<a id="ST-B0069"></a>

You will. Everyone does. What matters is the response.

<a id="ST-B0070"></a>

| Situation | Correct response |
| --- | --- |
| Missed 2-3 days | Ignore it. Carry on from today. Do not catch up |
| Missed a week | Skip forward to the current week. Put the missed topics in the WEAK tab. The review ladder will catch them |
| Missed two weeks | Same as above, plus move the start-date cell in the tracker forward two weeks. The plan is 6-8 months, not exactly 8. It absorbs this |
| Missed a month | Restart the current month. Do not restart the plan |
| Feeling behind constantly | You are doing too much per day. Cut using Rule 3. A smaller plan you complete beats a bigger plan you abandon |

<a id="ST-B0071"></a>

Never try to catch up by doubling. Doubling causes the burnout that turns a lost week into a lost plan. Just resume at normal pace.

<a id="ST-B0072"></a>

### Rule 7 - Burnout warning signs

<a id="ST-B0073"></a>

If two or more are true for a week, take three days completely off. Not reduced - off.

<a id="ST-B0074"></a>

•  You are studying but retaining nothing, and the Sunday tests are getting worse not better.

<a id="ST-B0075"></a>

•  You are dreading the session rather than being neutral about it.

<a id="ST-B0076"></a>

•  You are choosing easy topics repeatedly to feel productive.

<a id="ST-B0077"></a>

•  You are rereading instead of recalling because recalling feels too hard.

<a id="ST-B0078"></a>

•  Sleep is getting worse.

<a id="ST-B0079"></a>

•  You have stopped updating the WEAK tab - usually the first thing people quietly abandon.

<a id="ST-B0080"></a>

Three days off costs you three days. Burnout costs you the plan. This is a management decision, not a willpower failure.

<a id="ST-B0081"></a>

### Rule 8 - Track three numbers only

<a id="ST-B0082"></a>

Once a month, in the DASHBOARD tab:

<a id="ST-B0083"></a>

| Number | Why this one |
| --- | --- |
| Days studied this month, out of available days | Consistency is the only real predictor |
| WEAK tab items cleared | Proves you are repairing, not just consuming |
| Concepts that passed the Day 30 review | Proves it is actually sticking |

<a id="ST-B0084"></a>

Nothing else. Not hours, not videos, not pages. If those three numbers are healthy, you are on track regardless of how you feel.

<a id="ST-B0085"></a>

### PART 4 - WHY THIS METHOD (re-read at month 3 and month 6)

<a id="ST-B0086"></a>

You told me you forget things quickly. That is not a personal defect; it is how memory works for everyone. What follows is why the schedule is shaped the way it is. If you ever find yourself drifting back into watching tutorials, this is the part to re-read.

<a id="ST-B0087"></a>

### Retrieval practice - the core mechanism

<a id="ST-B0088"></a>

Karpicke and Roediger's work is the foundation. Learners who studied material and were then tested on it, versus learners who simply reread it, remembered roughly 50% more one week later - despite spending *less* total time with the material.

<a id="ST-B0089"></a>

The rule: never end a study session by reading. End it by closing everything and explaining aloud from memory. If you cannot explain it without notes, you have not learned it - you have only met it.

<a id="ST-B0090"></a>

### Spacing - the schedule

<a id="ST-B0091"></a>

Cepeda and colleagues reviewed 254 studies covering more than 14,000 observations. Distributing practice over time consistently beats massing it into one session, at equal total study time.

<a id="ST-B0092"></a>

Your ladder for every concept: Day 1, Day 3, Day 7, Day 14, Day 30. A concept is not "done" when you first understand it. It is done when it survives the Day 30 retrieval with no notes. The REVIEW tab calculates all five dates for you - you type when you learned it.

<a id="ST-B0093"></a>

### Interleaving - the ordering

<a id="ST-B0094"></a>

Mixing topics within a session beats blocked practice on both retention and transfer. That is why your day is never two hours of one subject: it is .NET plus DSA, or CS plus DSA. It feels harder and less satisfying than blocking. That difficulty is the mechanism working.

<a id="ST-B0095"></a>

Applied to DSA: from week 12, stop solving problems grouped by pattern. Solve mixed sets. In a real interview nobody tells you "this is a sliding window problem" - recognising the pattern *is* the skill.

<a id="ST-B0096"></a>

### The six questions - your note format

<a id="ST-B0097"></a>

For every concept that matters, answer these in writing, in your own words. This is the format for your Master Notes.

<a id="ST-B0098"></a>

| Question | Why it matters |
| --- | --- |
| What is it? | One sentence a junior developer would understand |
| Why does it exist? | What problem forced its invention. Concepts without problems are unmemorable |
| How does it work internally? | The mechanism. This is the level Google and Amazon probe |
| What are the trade-offs? | Nothing is free. Name the cost |
| When would I use it? | A real scenario, ideally from your own work |
| When would I NOT use it? | The question that separates deep from shallow knowledge |

<a id="ST-B0099"></a>

That last question is the one most candidates cannot answer, and it is the one that most reliably signals real understanding.

<a id="ST-B0100"></a>

### The explain-aloud protocol - technical depth and English, together

<a id="ST-B0101"></a>

This solves two problems at once. Every day, one topic, three passes:

<a id="ST-B0102"></a>

•  Pass 1 - two minutes, unrestricted. Explain the day's concept aloud as if to a colleague. Record it on your phone.

<a id="ST-B0103"></a>

•  Pass 2 - thirty seconds. The same concept compressed. Forces you to find the core.

<a id="ST-B0104"></a>

•  Pass 3 - interview version. Answer as if asked "what is X and why does it matter?"

<a id="ST-B0105"></a>

Listen back once a week only. Listen for: did I say something wrong, did I ramble, did I use a word I do not understand. Do not listen for accent or grammar. Your target is clear technical communication, not native fluency, and that is the correct target.

<a id="ST-B0106"></a>

Do not study grammar as a separate subject - it is the lowest-return use of your hours. And do not spend money on spoken-English courses: your bottleneck is technical vocabulary under pressure, and that only improves by explaining technical things repeatedly.

<a id="ST-B0107"></a>

### Progress versus the feeling of progress

<a id="ST-B0108"></a>

| Not progress | Progress |
| --- | --- |
| Watched a 3-hour .NET video | Explained the CLR loading process from memory, correctly |
| Read the LeetCode solution | Re-solved it from scratch 3 days later without hints |
| Read a system design article | Drew the design on paper in 45 min and named 3 bottlenecks |
| Reread notes on async/await | Wrote a deadlock, explained why, then fixed it |

<a id="ST-B0109"></a>

Anki rules, so it does not become a time sink: 15 minutes a day maximum. One card = one idea. Write cards only for things you already understand - Anki is for retention, not learning. Prefer "why" and "when not" cards over definitions. Never copy someone else's deck; writing the card is half the value.

<a id="ST-B0110"></a>

### PART 5 - HOW THESE INTERVIEWS ACTUALLY WORK

<a id="ST-B0111"></a>

### Where you actually land

<a id="ST-B0112"></a>

This matters more than any other single fact here, because it determines what you are scored on. With 4.5+ years of backend experience you are a Google L4 (SWE II) candidate, possibly L5 if your project and depth land well. At Amazon you are an SDE II candidate.

<a id="ST-B0113"></a>

First consequence: system design is not optional for you. A fresher can pass on DSA alone. You cannot. Amazon SDE II always includes system design and usually low-level design. That is why this plan gives design equal weight to DSA rather than treating it as a late add-on.

<a id="ST-B0114"></a>

Second consequence: your experience is being scored. At SDE II and L4+, interviewers probe your actual work. Vague answers about your own projects are disqualifying in a way they are not for a fresher. That is good news - it is the one area where you already have real material.

<a id="ST-B0115"></a>

### Google - the loop

<a id="ST-B0116"></a>

| Stage | What happens | What is scored |
| --- | --- | --- |
| Resume screen | Recruiter or automated filter | Relevance, level fit, clarity |
| Online assessment | Timed coding, typically 2 problems | Correctness, speed, edge cases |
| Technical phone screen | 45 min, shared doc, one interviewer | Coding, thinking aloud, communication |
| Onsite loop | 4-6 rounds back to back | 2-3 coding rounds, 1 system design, 1 Googliness |
| Hiring committee | Packet reviewed by people who never met you | Consistency of written feedback |

<a id="ST-B0117"></a>

The detail that changes how you practise: in Google coding rounds there is no syntax highlighting, no autocomplete, and no way to run your code. You write in a shared document. That is a specific skill, and from week 12 the plan has you solving two problems a week in a plain text editor for exactly this reason.

<a id="ST-B0118"></a>

The 2026 change worth knowing. In May 2026 Google announced a pilot replacing one traditional coding round with an open-ended code comprehension round for junior and mid-level roles on selected teams - you are shown unfamiliar code and asked to read, explain, debug and extend it. This is an advantage for you. Reading unfamiliar production code is exactly what you do at Casepoint on a legacy platform, and candidates grounded purely in LeetCode are weak at it. The plan builds it deliberately in weeks 11, 24 and 27.

<a id="ST-B0119"></a>

### Amazon - the loop

<a id="ST-B0120"></a>

| Stage | What happens | What is scored |
| --- | --- | --- |
| Online assessment | DSA, plus for SDE II+ a 20-min system design sketch | Code correctness plus architecture sense |
| Phone screen | Coding plus 1-2 Leadership Principle questions | DSA and early LP signal |
| Loop | DSA, LLD, HLD, with LP woven into every round | Technical plus an LP score per round |
| Bar Raiser | A trained interviewer from outside the hiring team | The long-term bar. Has veto power |

<a id="ST-B0121"></a>

The single most important Amazon fact: you can pass every coding round and still be rejected for weak Leadership Principle answers. All 16 principles are active scoring criteria, and roughly six appear in about 85% of interviews. You need 15-20 detailed stories, each adaptable to several principles. Document 14 has all of it; the STORIES tab tracks the coverage.

<a id="ST-B0122"></a>

### Your gaps, honestly

<a id="ST-B0123"></a>

| Area | Your state | What has to change |
| --- | --- | --- |
| Backend building | Strong | Nothing. This is your foundation and your credibility |
| .NET depth | Shallow-to-mid | You use it correctly but cannot explain internals. Weeks 1-8 |
| DSA | Near zero | The largest single time investment. Starts day 1 and never stops |
| System design | Near zero | Required at your level. Starts week 12, heavy weeks 15-24 |
| LLD / OOD | Weak | Amazon tests this explicitly. Weeks 13-14 |
| CS fundamentals | Weak | OS, networking, DB internals. Weeks 9-12 |
| Behavioural | Unstructured | Excellent raw material, no structure. Weeks 17-20 |
| Communication | Beginner+ | Daily practice woven into every day, never a separate subject |
| Portfolio project | None | The distributed job platform. Weeks 15-19 |
| Retention | Poor by your own account | The single biggest risk. Addressed by Part 4 |

<a id="ST-B0124"></a>

Seven of ten rows need real work. That is why the timeline is eight months and not three. But note the first row and the seventh: you are not starting from zero, you are converting practical experience into explainable engineering depth. That is a much shorter distance than it currently feels.

<a id="ST-B0125"></a>

### PART 6 - DSA STRATEGY

<a id="ST-B0126"></a>

The governing rule: do not chase problem count. Chase pattern recognition. 150 problems deeply understood beats 600 half-remembered, and it is not close. Target across the 32 weeks is roughly 300-350 problems, but the number is an output, not a goal. What matters is that you can look at an unseen problem and within two minutes say "this is a monotonic stack problem" and justify it.

<a id="ST-B0127"></a>

### The six fields - log every problem

<a id="ST-B0128"></a>

This takes five minutes and it is the difference between practice and productive practice. The DSA tab has a column for each.

<a id="ST-B0129"></a>

| Field | Content |
| --- | --- |
| Brute force | The obvious solution and its complexity |
| Optimised idea | The key insight in one sentence. If you cannot write it in one sentence, you have not understood the problem - you have only made it pass |
| Why it works | The invariant or property being exploited |
| Time / space | Both, with justification |
| Pattern name | Which of the 15 patterns below this is |
| One variation | How would this change if the input were sorted, had duplicates, or were a stream |

<a id="ST-B0130"></a>

Re-solve rule: any problem you could not solve unaided gets re-solved from scratch after 1, 3, 7 and 14 days. From memory, not from the solution.

<a id="ST-B0131"></a>

### The fifteen patterns - this is the actual syllabus

<a id="ST-B0132"></a>

| Pattern | Recognise it when |
| --- | --- |
| Two pointers | Sorted array, pair/triplet sums, in-place partition |
| Sliding window | Contiguous subarray or substring with a constraint |
| Fast and slow pointers | Cycle detection, middle of list, happy number |
| Prefix sum / hashing | Subarray sums, counting, "seen before" lookups |
| Binary search on answer | Monotonic predicate, "minimum X such that..." |
| Monotonic stack | Next greater or smaller element, histogram, daily temperatures |
| Heap / top-K | K largest, merge K lists, running median |
| Intervals | Merge, insert, meeting rooms, sweep line |
| Tree DFS | Path problems, subtree aggregation, validate BST |
| Tree BFS | Level order, min depth, right side view |
| Graph BFS/DFS | Connectivity, shortest unweighted path, islands |
| Topological sort | Dependencies, course schedule, build order |
| Union-Find | Dynamic connectivity, number of components, redundant edge |
| Backtracking | Permutations, combinations, subsets, N-Queens, word search |
| Dynamic programming | Overlapping subproblems. 1D, 2D, knapsack, LIS, string DP |

<a id="ST-B0133"></a>

The whiteboard rule. From week 9, solve at least two problems a week in a plain text editor with no autocomplete, no compiler, and no running the code. Candidates who only ever practise in an IDE discover this weakness during the interview, which is the worst possible time.

<a id="ST-B0134"></a>

Never use AI assistance on DSA. It creates the same illusion of competence as rereading, and it destroys the exact skill you are training.

<a id="ST-B0135"></a>

### PART 7 - SYSTEM DESIGN STRATEGY

<a id="ST-B0136"></a>

Never memorise a diagram. Memorise the process. An interviewer can tell instantly which one you did. Use these nine steps in this order, every single time - all 18 designs.

<a id="ST-B0137"></a>

| # | Step | What you actually say and do |
| --- | --- | --- |
| 1 | Clarify requirements | Functional and non-functional. Ask about scale, latency, consistency. Never start designing before this |
| 2 | Estimate scale | DAU, QPS read vs write, storage per year, bandwidth. Rough numbers, stated aloud |
| 3 | Define the API | Endpoints, parameters, response shapes. Makes the abstract concrete |
| 4 | Data model | Entities, relationships, choice of store, and why that store |
| 5 | High-level architecture | Boxes and arrows. Client, load balancer, service, cache, queue, database |
| 6 | Identify bottlenecks | Where does this break first as traffic grows tenfold |
| 7 | Scale it | Cache, queue, replicate, shard, CDN. Each with a justification |
| 8 | Failure handling | What if a node dies, the queue backs up, the database fails over |
| 9 | Trade-offs | State what you gave up. This is the round-winning step |

<a id="ST-B0138"></a>

Step 9 is where the senior signal lives. Anyone can draw boxes. Saying "I chose eventual consistency here, which means a user may briefly see a stale count - acceptable for a view counter, unacceptable for an account balance" is what gets you hired.

<a id="ST-B0139"></a>

On your first designs: they will feel bad. You will run out of things to say at minute 20, or spend 30 minutes on requirements and never draw the architecture. Both are normal and both are fixed by repetition, not by reading more. The one thing to enforce from design one is the order of the nine steps. Candidates who improvise the order ramble; candidates who follow a framework sound senior even when the design is imperfect. The framework is the skill.

<a id="ST-B0140"></a>

All 18 designs and 6 LLDs are listed in the DESIGNS tab with the week each is due, a column for how long it took, and a column for the trade-off you named out loud. Fill that last column every time - it is the one that builds the skill.

<a id="ST-B0141"></a>

Your unfair advantage: you have already used SQS, EventBridge, RabbitMQ, Redis and SignalR in production. You are not learning these from zero - you are learning the theory beneath things you have already touched. Always anchor a new concept to the specific system you built with it. That is why your retention will be better here than in DSA.

<a id="ST-B0142"></a>

### PART 8 - CHECKPOINTS AND THE WAYS THIS FAILS

<a id="ST-B0143"></a>

### The eight checkpoints

<a id="ST-B0144"></a>

Check honestly at each month end. If you miss a checkpoint, do not move on - repair first. A cracked foundation at month 2 becomes a failed interview at month 6. The full question list for each is at the end of that month's document.

<a id="ST-B0145"></a>

| Month | You must be able to... |
| --- | --- |
| M1 | Explain value vs reference types, stack vs heap, boxing, and deferred execution - no notes. Solve easy array, string and hashing problems unaided |
| M2 | Explain the async/await state machine, the thread pool, and the ASP.NET Core request pipeline. Read a SQL execution plan. Solve easy-medium trees and linked lists |
| M3 | Explain end to end what happens when a browser requests a URL. Explain isolation levels and which anomalies each permits. Complete one system design in 45 minutes |
| M4 | Apply SOLID in a real design. Explain idempotency, DLQ and at-least-once delivery. Project phase 1 running end to end |
| M5 | THE GATE. Project deployed and load tested. 20 STAR stories written and spoken. 9 system designs done cold. Do not apply before this passes |
| M6 | Applying. Timed medium DSA consistently. A 45-minute design conversation without freezing. Project explained in 5 minutes |
| M7 | Converting interviews. Every rejection analysed into a specific named gap, and repaired |
| M8 | Consolidating. 10-15 designs from a blank page. All missed DSA problems re-solved from memory |

<a id="ST-B0146"></a>

### The ways this specifically fails

<a id="ST-B0147"></a>

| Risk | Countermeasure |
| --- | --- |
| Reverting to rereading when tired | The session must open with retrieval. Non-negotiable, even at 10 minutes |
| DSA anxiety causing avoidance | DSA is every day, never skipped, never batched into weekends |
| Skipping system design because DSA feels more urgent | It is 50% of your level's bar. Thursday is design day and it is protected |
| Building the project as CRUD because it is comfortable | The distributed behaviour is the project. If it cannot survive a worker being killed mid-job, handle the same message twice, and show load-test numbers, it will not do its job in an interview |
| Tutorial consumption feeling like progress | The metric is what you produced from memory, never what you watched |
| Behavioural left until the end | The journal line starts today, not in week 17 |
| Burnout around weeks 9-16 | The plan has deliberate lighter weeks. Take them. Eight sustainable months beats three heroic ones |
| Applying too early and burning good companies | Week 21 is the earliest, and only after the week 20 gate. Use smaller companies first as calibration |
| Rebuilding the tracker instead of using it | It is already built. Reorganising your system is procrastination wearing a productive hat |

<a id="ST-B0148"></a>

### The one-paragraph version

<a id="ST-B0149"></a>

Study by retrieving, not rereading. Review on the 1/3/7/14/30 ladder. Mix topics rather than blocking them. Answer six questions about every concept, especially "when would I not use this". Do DSA every single day for patterns rather than count. Treat system design as equal in weight to DSA, because at your level it is. Convert your real Casepoint and Zibma work into 20 quantified STAR stories, starting the journal today. Build one genuinely distributed project and be able to defend every trade-off in it. Speak English aloud about technical topics daily rather than studying English separately. Measure progress only by what you can produce from memory under time pressure. Start applying in week 21 and keep learning through week 32.

<a id="ST-B0150"></a>

And on any day you are confused about what to do: recall yesterday, learn one thing, solve one problem, write down what you got wrong. Do those four and you are on plan.

<a id="S02"></a>

## S02 — 02_Month_01_CSharp_Core_and_DSA_Foundations

Full source content: [Study-Plan/02_Month_01_CSharp_Core_and_DSA_Foundations.docx](../SOURCE_LIBRARY/Study-Plan/02_Month_01_CSharp_Core_and_DSA_Foundations.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S02-B0001"></a>

Month 1 - C# Core and DSA Foundations

<a id="S02-B0002"></a>

Document 02 - Weeks 1 to 4. Turning "I use C#" into "I understand C#".

<a id="S02-B0003"></a>

### Month 1 goal

<a id="S02-B0004"></a>

You have written C# for four and a half years. This month is not about learning syntax - it is about learning what the syntax *does*. By the end you should be able to explain memory layout, dispatch, collections and async at a level most candidates with your experience cannot.

<a id="S02-B0005"></a>

Simultaneously, DSA starts on day one and never stops. This month is deliberately easy problems only. The purpose is building the daily habit and the logging protocol, not difficulty.

<a id="S02-B0006"></a>

### What "Month 1 complete" means

<a id="S02-B0007"></a>

•  Explain value vs reference types, stack vs heap, and boxing - no notes, aloud, correctly.

<a id="S02-B0008"></a>

•  Explain why Dictionary<K,V> lookup is O(1) and when it degrades.

<a id="S02-B0009"></a>

•  Explain deferred execution and demonstrate a bug caused by it.

<a id="S02-B0010"></a>

•  Explain the async/await state machine using a SharpLab screenshot as your prop.

<a id="S02-B0011"></a>

•  ~40 easy DSA problems solved, logged in the six-field format, with the re-solve ladder running.

<a id="S02-B0012"></a>

•  Work journal running daily since Day 1. Anki deck started. Weak List populated.

<a id="S02-B0013"></a>

### Daily shape (weekdays)

<a id="S02-B0014"></a>

| Block | Content |
| --- | --- |
| 0:00-0:10 | Recall yesterday aloud, no notes |
| 0:10-1:15 | Core topic below |
| 1:15-1:55 | DSA |
| 1:55-2:00 | Anki, Weak List, work journal line |

<a id="S02-B0015"></a>

### Week 1 - The type system and memory

<a id="S02-B0016"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Value types vs reference types. Stack vs heap. What a variable actually holds. Assignment and copy semantics | Write a demo where copying a struct and copying a class give different results | Why passing a struct to a method may not change the original |
| Tue | struct vs class decision. Boxing and unboxing. Nullable value types. default values. Where structs actually live (they are not "always on the stack") | Use SharpLab to see the IL box instruction appear | What boxing costs and three places it happens accidentally |
| Wed | Strings: immutability, string interning, StringBuilder, why concatenation in a loop is O(n squared) | Benchmark string concat vs StringBuilder over 100k iterations | Why strings are immutable and what that buys you |
| Thu | ref, out, in parameters. Pass by value vs pass by reference for both type categories. readonly, const, static | Write the four-case matrix (value/ref type x by value/by ref) and predict each result before running | The difference between a reference type and passing by reference |
| Fri | No new material. Weak List review. Explain all four days aloud, recorded | Re-solve any DSA problem you needed help with | Everything above, cold |
| Sat | Deep block: object layout in memory, object header, method table pointer, why a reference costs 8 bytes on x64. Intro to GC generations | Read Book of the Runtime intro sections. Draw the heap layout by hand | What is physically in memory when you write new Person() |
| Sun | Weekly test (see Doc 11). Then plan Week 2 | Record a 2-minute explanation of stack vs heap | - |

<a id="S02-B0017"></a>

### Week 1 DSA - Big-O and arrays

<a id="S02-B0018"></a>

Concepts: Big-O notation, time vs space, amortised analysis, why List<T>.Add is amortised O(1).

<a id="S02-B0019"></a>

Problems: Two Sum, Contains Duplicate, Best Time to Buy and Sell Stock, Maximum Subarray, Move Zeroes, Merge Sorted Array, Remove Duplicates from Sorted Array, Plus One, Running Sum of 1d Array, Squares of a Sorted Array.

<a id="S02-B0020"></a>

### Week 2 - Object orientation, properly

<a id="S02-B0021"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Classes, constructors, constructor chaining, object initialisers, access modifiers, static classes and members, static constructor timing | Write a class with three constructors chained; predict initialisation order before running | When a static constructor actually runs |
| Tue | Inheritance. virtual, override, new (shadowing), abstract, sealed. Virtual dispatch and the method table | Demo where new vs override produce different behaviour through a base reference | How the runtime picks which method to call, at the method-table level |
| Wed | Interfaces. Explicit interface implementation. Default interface methods. Interface vs abstract class - the real decision criteria | Implement IComparable<T> and IEquatable<T> on your own type | When to choose an interface over an abstract class, with a concrete reason |
| Thu | Composition over inheritance. Encapsulation. object members: Equals, GetHashCode, ToString. The Equals/GetHashCode contract | Override both correctly, then deliberately break the contract and watch a Dictionary lose your key | Why breaking that contract corrupts hash-based collections |
| Fri | No new material. Weak List. Recorded recall of the week | Re-solve Week 1 problems you flagged | - |
| Sat | Deep block: polymorphism internals, covariance and contravariance in generics (in/out), generic constraints, why generics in .NET are not Java erasure | Write a generic repository with constraints. Inspect the JIT-specialised code | Why List<int> and List<string> are genuinely different types at runtime |
| Sun | Weekly test. Plan Week 3 | 2-minute recording: interface vs abstract class | - |

<a id="S02-B0022"></a>

### Week 2 DSA - strings, hashing

<a id="S02-B0023"></a>

Concepts: hash tables, collision handling, HashSet vs Dictionary, frequency counting.

<a id="S02-B0024"></a>

Problems: Valid Anagram, Group Anagrams, Valid Palindrome, Longest Common Prefix, First Unique Character in a String, Ransom Note, Isomorphic Strings, Word Pattern, Top K Frequent Elements, Longest Consecutive Sequence.

<a id="S02-B0025"></a>

### Week 3 - Collections, LINQ, delegates

<a id="S02-B0026"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Collection internals: List<T> growth doubling, Dictionary<K,V> buckets and collision chains, HashSet<T>, Queue/Stack, SortedDictionary vs Dictionary | Implement a toy hash map with separate chaining, ~60 lines | Why dictionary lookup is O(1) average and what makes it degrade to O(n) |
| Tue | IEnumerable vs ICollection vs IList vs IQueryable. yield return and how the compiler builds an iterator state machine | Write an iterator with yield, then view the generated class in SharpLab | What yield return compiles into |
| Wed | LINQ: deferred vs immediate execution, ToList/ToArray as materialisation points, multiple enumeration bugs, IQueryable expression trees and EF translation | Reproduce the classic bug: a deferred query enumerated twice hitting the DB twice | Why the same LINQ query behaves differently on IEnumerable and IQueryable |
| Thu | Delegates, Func/Action/Predicate, lambdas, closures and captured variables, events, the EventHandler pattern | The captured-loop-variable trap. See the generated closure class in SharpLab | What a closure allocates and why it can leak |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: IEnumerable vs IAsyncEnumerable, custom iterators, LINQ operator implementation. Write your own Where and Select | Implement MyWhere<T> and MySelect<T,R> using yield return | How LINQ chains without allocating intermediate lists |
| Sun | Weekly test. Plan Week 4 | 2-minute recording: deferred execution | - |


> Study correction: Growth factor is an implementation detail, not the collection contract; know the amortized copying argument. [Official reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.capacity)

<a id="S02-B0027"></a>

### Week 3 DSA - two pointers and sliding window

<a id="S02-B0028"></a>

Concepts: the two-pointer invariant, when a window can shrink, why these are O(n) not O(n squared).

<a id="S02-B0029"></a>

Problems: Valid Palindrome II, Two Sum II (sorted input), 3Sum, Container With Most Water, Remove Nth Node From End of List, Longest Substring Without Repeating Characters, Longest Repeating Character Replacement, Permutation in String, Max Consecutive Ones III, Minimum Size Subarray Sum.

<a id="S02-B0030"></a>

### Week 4 - Exceptions, lifetime, and async

<a id="S02-B0031"></a>

This is the most important week of Month 1. You specifically named async/await as something you use without understanding. That ends here.

<a id="S02-B0032"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Exceptions: try/catch/finally, exception filters (when), custom exception types, rethrow (throw vs throw ex), the real cost of exceptions, when not to use them for control flow | Demonstrate throw ex destroying the stack trace | Why throw; and throw ex; differ, and what filters run before |
| Tue | Object lifetime: IDisposable, using statement and declaration, the full dispose pattern, finalizers and why you almost never write one, GC generations 0/1/2 and LOH | Implement the dispose pattern properly on a class holding a file handle | Why a finalizer makes object collection take two GC cycles |
| Wed | async/await part 1. Task and Task<T>, what await actually does, the compiler-generated state machine, MoveNext, continuations | Paste an async method into SharpLab and read the generated state machine. This is the single highest-value hour of the month | What the compiler does to an async method, step by step |
| Thu | async/await part 2 - the pitfalls. async void, .Result/.Wait() deadlocks, ConfigureAwait(false), synchronisation context, Task.Run misuse, CancellationToken, ValueTask | Reproduce a real deadlock with .Result in a context that has a sync context, then fix it three different ways | Why .Result deadlocks, in terms of the synchronisation context |
| Fri | No new material. Weak List + recorded recall of the whole month | Re-solve flagged problems | - |
| Sat | Deep block: read Stephen Toub's "How Async/Await Really Works" end to end. Then re-explain Wednesday and Thursday with the article closed | Write a summary of the article in your own words in the six-question frame | Async at article depth |
| Sun | Month 1 cumulative test. Everything from Week 1 forward. Then plan Month 2 | Record the async explanation. Compare it to your Week 1 recording - this is your evidence of progress | - |

<a id="S02-B0033"></a>

### Week 4 DSA - stack, queue, binary search

<a id="S02-B0034"></a>

Concepts: LIFO/FIFO applications, monotonic stack preview, binary search invariants and the off-by-one trap.

<a id="S02-B0035"></a>

Problems: Valid Parentheses, Min Stack, Evaluate Reverse Polish Notation, Daily Temperatures, Implement Queue using Stacks, Binary Search, Search Insert Position, First Bad Version, Find Minimum in Rotated Sorted Array, Search in Rotated Sorted Array.

<a id="S02-B0036"></a>

### Month 1 checkpoint

<a id="S02-B0037"></a>

Answer each honestly. Any "no" goes on the Weak List and is repaired in the first week of Month 2 before new material.

<a id="S02-B0038"></a>

| Question | Yes/No |
| --- | --- |
| Can I explain stack vs heap and where a struct actually lives, without notes? |  |
| Can I name three places boxing happens accidentally? |  |
| Can I explain virtual dispatch at the method-table level? |  |
| Can I state the Equals/GetHashCode contract and what breaks without it? |  |
| Can I explain why dictionary lookup degrades, and what causes it? |  |
| Can I explain what yield return compiles into? |  |
| Can I explain deferred execution and give a real bug it causes? |  |
| Can I draw the async state machine from memory? |  |
| Can I explain precisely why .Result deadlocks? |  |
| Have I solved ~40 problems with all six log fields filled in? |  |
| Is my re-solve ladder actually running (1/3/7/14 days)? |  |
| Have I written a work journal line every working day? |  |

<a id="S02-B0039"></a>

### Common Month 1 mistakes

<a id="S02-B0040"></a>

•  Skipping the SharpLab sessions because they feel optional. They are the difference between knowing async and understanding it.

<a id="S02-B0041"></a>

•  Solving DSA without filling the log. The log is where pattern recognition is built. Solving alone builds nothing durable.

<a id="S02-B0042"></a>

•  Treating Friday as a day off. Friday consolidation is why Month 3 will not feel like starting over.

<a id="S02-B0043"></a>

•  Not starting the work journal. You will regret this in Month 5, when you need 20 stories and remember four.

<a id="S02-B0044"></a>

### Parallel tracks - Month 1

<a id="S02-B0045"></a>

| Track | Slot | This month |
| --- | --- | --- |
| Behavioural (Doc 14) | 2 min daily | Start the work journal on Day 1. One line per working day: problem, decision, outcome. Nothing else - no rehearsal, no story writing yet. You are collecting raw material |
| Aptitude (Doc 13) | Tue + Thu, last 15 min | Quantitative fundamentals: number system and divisibility, LCM/HCF, percentages and successive percentages, ratio and proportion, averages. Always timed |
| AI / MCP / RAG (Doc 12) | - | Nothing this month. Starts Month 2 |
| English (Doc 00 B5) | Daily, inside the session | The three-pass Explain-Aloud protocol on the day's topic. Two minutes, thirty seconds, interview version |

<a id="S02-B0046"></a>

One warning about the AI track being absent: do not use AI assistance on DSA this month or any month. Doc 12 explains why - it produces the same illusion of competence as rereading, and it destroys the exact retrieval skill you are building.

<a id="S03"></a>

## S03 — 03_Month_02_Advanced_DotNet_SQL_Concurrency

Full source content: [Study-Plan/03_Month_02_Advanced_DotNet_SQL_Concurrency.docx](../SOURCE_LIBRARY/Study-Plan/03_Month_02_Advanced_DotNet_SQL_Concurrency.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S03-B0001"></a>

Month 2 - Advanced .NET, ASP.NET Core, SQL and Concurrency

<a id="S03-B0002"></a>

Document 03 - Weeks 5 to 8. The month that makes you dangerous in a .NET interview.

<a id="S03-B0003"></a>

### Month 2 goal

<a id="S03-B0004"></a>

Month 1 was the language. Month 2 is the runtime and the platform. This is where you close the gap you named explicitly: not being able to explain .NET Framework versus modern .NET, and having used concurrency without being able to describe it.

<a id="S03-B0005"></a>

This month also contains the deepest SQL week in the plan. Your day job involves query optimisation at Casepoint, which means this week has the highest immediate return on investment of anything in the eight months.

<a id="S03-B0006"></a>

### What "Month 2 complete" means

<a id="S03-B0007"></a>

•  Explain the difference between Task and Thread, and what the thread pool actually does, including work stealing.

<a id="S03-B0008"></a>

•  Explain .NET Framework vs .NET Core vs modern .NET, and what the CLR, runtime, SDK and BCL each are.

<a id="S03-B0009"></a>

•  Trace an HTTP request through the ASP.NET Core pipeline from Kestrel to your controller and back.

<a id="S03-B0010"></a>

•  Read a SQL execution plan and explain why an index was or was not used.

<a id="S03-B0011"></a>

•  State all four ACID properties, all isolation levels, and which anomaly each permits.

<a id="S03-B0012"></a>

•  ~45 DSA problems including trees, linked lists and heaps. First timed sessions.

<a id="S03-B0013"></a>

### Week 5 - Concurrency and parallelism

<a id="S03-B0014"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Process vs thread. Thread vs Task. The thread pool: why it exists, injection rate, starvation, work-stealing queues. Concurrency vs parallelism - not the same thing | Force thread pool starvation with blocking calls, watch it recover slowly | Why creating 1000 threads is worse than 1000 tasks |
| Tue | Race conditions. lock and what Monitor does underneath. Interlocked. Atomicity. Memory barriers and why volatile rarely means what people think | Write a counter with a race, prove it with 10k iterations, fix it three ways (lock, Interlocked, concurrent collection) | What a race condition is, at the CPU/memory-model level |
| Wed | Deadlocks: the four Coffman conditions. Lock ordering. SemaphoreSlim, ReaderWriterLockSlim, Mutex. Async coordination (never lock around await) | Write a two-lock deadlock deliberately. Then fix it by lock ordering | Why you cannot await inside a lock, and what to use instead |
| Thu | CancellationToken end to end. Concurrent collections (ConcurrentDictionary, BlockingCollection, Channel<T>). Producer-consumer. Parallel.For, PLINQ and when they hurt | Build a producer-consumer pipeline with Channel<T> and graceful cancellation | How cooperative cancellation works and why it is not "killing a thread" |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: connect this to your real work. SignalR connection handling, SQS consumer concurrency, and how your Casepoint email pipeline behaves under parallel consumers. Write it up | Draw your actual email-processing architecture and mark every concurrency decision in it | Your own production system, in concurrency vocabulary |
| Sun | Weekly test. Plan Week 6 | 2-min recording: thread pool starvation | - |

<a id="S03-B0015"></a>

### Week 5 DSA - linked lists

<a id="S03-B0016"></a>

Concepts: pointer manipulation, dummy head nodes, fast/slow pointers, in-place reversal.

<a id="S03-B0017"></a>

Problems: Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle, Middle of the Linked List, Remove Nth Node From End, Reorder List, Palindrome Linked List, Add Two Numbers, Copy List with Random Pointer, LRU Cache (design + list).

<a id="S03-B0018"></a>

### Week 6 - The runtime and the ASP.NET Core platform

<a id="S03-B0019"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | .NET Framework vs .NET Core vs modern .NET (.NET 5-10). CLR vs CoreCLR. Runtime vs SDK vs BCL. JIT, tiered compilation, ReadyToRun, AOT. Assemblies, IL, metadata | Write the comparison table yourself before reading one. Then correct it | The question you named as a gap: Framework vs modern .NET, cleanly, in 60 seconds |
| Tue | Garbage collection properly: generations, ephemeral segments, LOH, workstation vs server GC, concurrent/background GC, GC roots, when finalization runs | Force gen 2 collections and observe with GC.GetTotalMemory and counters | Why gen 0 collection is cheap and gen 2 is not |
| Wed | ASP.NET Core hosting: Program.cs, generic host, Kestrel, reverse proxy, the middleware pipeline, Use/Run/Map, ordering rules, short circuiting | Write three custom middleware components and prove ordering matters by reordering them | The full journey of a request from socket to controller action and back |
| Thu | Dependency injection: the container, Transient vs Scoped vs Singleton, captive dependency problem, IServiceScopeFactory. Configuration providers and precedence. IOptions pattern. Structured logging and log levels | Deliberately inject a Scoped service into a Singleton and observe the failure | Why a Scoped service inside a Singleton is a bug, and what actually happens |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: build a minimal ASP.NET Core app from an empty project - no scaffolding, no templates. Every line typed and understood | A working API with custom middleware, DI, config, structured logging | Every line of your own Program.cs |
| Sun | Weekly test. Plan Week 7 | 2-min recording: the request pipeline | - |

<a id="S03-B0020"></a>

### Week 6 DSA - recursion and backtracking foundations

<a id="S03-B0021"></a>

Concepts: base case and recursive case, the call stack, recursion to iteration, memoisation preview.

<a id="S03-B0022"></a>

Problems: Fibonacci (naive, memo, iterative - compare all three), Climbing Stairs, Pow(x,n), Reverse String recursively, Merge Sort implementation, Quick Sort implementation, Binary Search recursively, Subsets, Permutations, Letter Combinations of a Phone Number.

<a id="S03-B0023"></a>

### Week 7 - Web API, security, and EF Core

<a id="S03-B0024"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | REST properly: resources, verbs, status codes, idempotency of HTTP methods, HATEOAS (and why it is rare), versioning strategies, content negotiation, model binding and validation | Take an existing API you wrote and critique its REST design in writing | Which HTTP methods are idempotent and why it matters for retries |
| Tue | Authentication vs authorisation. Cookies vs tokens. JWT structure: header, payload, signature. Signing vs encryption, claims, expiry, refresh tokens, why you cannot "log out" a JWT. OAuth2 and OIDC flows at a conceptual level | Decode a JWT by hand at jwt.io. Then implement JWT auth with refresh tokens | Why a JWT cannot be revoked, and the three ways teams work around it |
| Wed | EF Core internals: change tracker, tracking vs AsNoTracking, the unit of work, SaveChanges batching, lazy vs eager vs explicit loading, the N+1 problem, Include and split queries, migrations | Reproduce an N+1, capture the SQL, then fix it. Measure both | How the change tracker knows what to update |
| Thu | Caching in ASP.NET Core: IMemoryCache, IDistributedCache, Redis, response caching, cache-aside pattern, invalidation strategies, stampede and how to prevent it. Background work: IHostedService, BackgroundService | Add Redis cache-aside to your Week 6 API with correct invalidation | The three hard cases of caching: invalidation, stampede, staleness |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: testing. xUnit, arrange-act-assert, mocking with NSubstitute or Moq, integration tests with WebApplicationFactory, Testcontainers against real Postgres | Write unit tests and one integration test for your Week 6 API | Unit vs integration vs end-to-end, and what each is actually for |
| Sun | Weekly test. Plan Week 8 | 2-min recording: JWT and why it cannot be revoked | - |


> Study correction: A self-contained token has no automatic central revocation lookup; applications can add deny lists, token/session versions, introspection or short expiry with refresh controls. State your actual design. [Official reference](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

<a id="S03-B0025"></a>

### Week 7 DSA - trees and BST

<a id="S03-B0026"></a>

Concepts: traversals (pre/in/post/level), recursion on trees, BST invariant, tree construction.

<a id="S03-B0027"></a>

Problems: Maximum Depth of Binary Tree, Same Tree, Invert Binary Tree, Balanced Binary Tree, Diameter of Binary Tree, Binary Tree Level Order Traversal, Validate BST, Lowest Common Ancestor of a BST, Kth Smallest Element in a BST, Construct Binary Tree from Preorder and Inorder.

<a id="S03-B0028"></a>

### Week 8 - SQL and database internals

<a id="S03-B0029"></a>

The highest immediate-value week in the plan. This applies to your job on Monday morning.

<a id="S03-B0030"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | How a database stores data: pages, heaps, clustered vs non-clustered indexes, B-tree structure, why an index is a sorted structure, covering indexes, included columns, index selectivity | Create a 1M-row table. Query with and without an index. Measure both | Why an index makes reads faster and writes slower, physically |
| Tue | Execution plans. Reading them. Seek vs scan vs lookup. Key lookup and bookmark lookup cost. Statistics and cardinality estimation. SARGability - why a function on a column kills your index | Take three slow queries from your actual work and read their plans | Why WHERE YEAR(created) = 2026 cannot use an index, and how to rewrite it |
| Wed | Joins: nested loops, merge join, hash join - when the optimiser picks each. Execution order of a SQL statement (FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT). Window functions. CTEs vs subqueries vs temp tables | Write queries that force each join type; compare plans | Why the optimiser chose a hash join over nested loops |
| Thu | Transactions and ACID. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable, Snapshot. The anomalies: dirty read, non-repeatable read, phantom read. Locking, lock escalation, deadlocks. MVCC in PostgreSQL vs locking in SQL Server | Reproduce a dirty read and a phantom read in two sessions. Then reproduce a deadlock | Isolation levels mapped to anomalies, from memory, as a table |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: normalisation (1NF to 3NF) and deliberate denormalisation. Partitioning. Read replicas. Connection pooling. SQL Server vs PostgreSQL differences you actually hit. Read "Use The Index, Luke" | Design a schema for a job-processing system - this becomes your project schema | When you would denormalise on purpose, with a real example |
| Sun | Month 2 cumulative test - covers Months 1 and 2. Plan Month 3 | 2-min recording: isolation levels | - |

<a id="S03-B0031"></a>

### Week 8 DSA - heaps and priority queues, first timed sessions

<a id="S03-B0032"></a>

Concepts: heap property, sift up/down, PriorityQueue<T,TP> in .NET, top-K pattern, two-heap median.

<a id="S03-B0033"></a>

Problems: Kth Largest Element in an Array, Last Stone Weight, K Closest Points to Origin, Task Scheduler, Merge K Sorted Lists, Find Median from Data Stream, Top K Frequent Words, Kth Largest Element in a Stream, Reorganize String, Sort Characters By Frequency.

<a id="S03-B0034"></a>

New rule from this week onward: at least two problems per week solved under strict 25-minute timer, narrated aloud in English, no IDE assistance.

<a id="S03-B0035"></a>

### Month 2 checkpoint

<a id="S03-B0036"></a>

| Question | Yes/No |
| --- | --- |
| Can I explain the thread pool, including starvation and work stealing? |  |
| Can I explain why await inside lock is illegal and what to use instead? |  |
| Can I answer ".NET Framework vs .NET Core" in 60 clean seconds? |  |
| Can I describe GC generations and why gen 2 is expensive? |  |
| Can I trace a request from Kestrel to controller and back, naming each stage? |  |
| Can I explain the captive dependency problem? |  |
| Can I explain why a JWT cannot be revoked? |  |
| Can I explain the N+1 problem and show the SQL it generates? |  |
| Can I read an execution plan and explain a seek vs a scan? |  |
| Can I explain SARGability with an example? |  |
| Can I write the isolation-level/anomaly table from memory? |  |
| Have I done at least 4 timed, narrated, no-IDE DSA sessions? |  |
| Is my work journal still running daily? |  |


> Study correction: A self-contained token has no automatic central revocation lookup; applications can add deny lists, token/session versions, introspection or short expiry with refresh controls. State your actual design. [Official reference](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

<a id="S03-B0037"></a>

### Reality check at the two-month mark

<a id="S03-B0038"></a>

Two months in, roughly 85 problems solved and the .NET depth genuinely improving. This is the point where most people quietly stop logging problems, stop the Friday consolidation, and start just watching videos. Check yourself honestly. If the Weak List has not grown in two weeks, you are not testing yourself hard enough - a healthy Weak List always has items on it.

<a id="S03-B0039"></a>

### Parallel tracks - Month 2

<a id="S03-B0040"></a>

| Track | Slot | This month |
| --- | --- | --- |
| AI-assisted development (Doc 12) | One Saturday afternoon block | Track A. Where AI genuinely helps and where it reliably hurts. The verification discipline. Review-mode usage. Then draft your answer to "how do you use AI tools?" using a real example from your Casepoint work. Refine it every month afterwards |
| Aptitude (Doc 13) | Tue + Thu, last 15 min | Profit and loss, simple and compound interest, time-speed-distance, time and work, pipes and cisterns. Always timed, shortcut methods only |
| Behavioural (Doc 14) | 2 min daily | Journal continues. Start deliberately noticing two situation types: a disagreement with someone senior, and hard feedback you received. These are your thinnest LP areas and you cannot manufacture them later |
| English | Daily | Explain-Aloud on the week's topic. Week 5's concurrency vocabulary and Week 8's SQL vocabulary are both high-value interview language |

<a id="S03-B0041"></a>

The AI block is deliberately one afternoon, not a recurring commitment. You already use these tools daily at work - what you need is a considered engineering position on them, not more tool practice.

<a id="S04"></a>

## S04 — 04_Month_03_CS_Fundamentals_Networking_OS

Full source content: [Study-Plan/04_Month_03_CS_Fundamentals_Networking_OS.docx](../SOURCE_LIBRARY/Study-Plan/04_Month_03_CS_Fundamentals_Networking_OS.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S04-B0001"></a>

Month 3 - CS Fundamentals, Networking, OS and First System Designs

<a id="S04-B0002"></a>

Document 04 - Weeks 9 to 12. The month that fills the degree-shaped gap.

<a id="S04-B0003"></a>

### Month 3 goal

<a id="S04-B0004"></a>

You have a BCA, not a CS degree, and you have said CS fundamentals are a gap. This is the month that closes it. Networking, operating systems, distributed data and messaging - the four areas that separate "developer" from "engineer" in an interview room.

<a id="S04-B0005"></a>

System design also starts this month. Not because you are ready, but because you need six months of practice, not two. Your first design will be bad. That is expected and planned for.

<a id="S04-B0006"></a>

### What "Month 3 complete" means

<a id="S04-B0007"></a>

•  Explain, end to end and in order, exactly what happens when a browser requests a URL.

<a id="S04-B0008"></a>

•  Explain process vs thread vs coroutine at the OS level, including context switching cost.

<a id="S04-B0009"></a>

•  Explain CAP, eventual consistency, replication and partitioning without hand-waving.

<a id="S04-B0010"></a>

•  Explain at-least-once delivery, idempotency and DLQs - grounded in your own SQS work.

<a id="S04-B0011"></a>

•  Complete three system designs, each in 45 minutes, using the nine-step framework.

<a id="S04-B0012"></a>

•  ~50 DSA problems, now medium difficulty, covering graphs and intervals.

<a id="S04-B0013"></a>

### Week 9 - Networking

<a id="S04-B0014"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | The full URL journey. DNS resolution (recursive resolver, root, TLD, authoritative, caching, TTL), ARP, IP routing, the OSI and TCP/IP models mapped to reality | Run nslookup, tracert, ping against a real domain and narrate each hop | "What happens when you type a URL and press enter" - the classic question, in full |
| Tue | TCP: three-way handshake, sequence numbers, ACKs, retransmission, flow control (receive window), congestion control (slow start, congestion avoidance), head-of-line blocking, connection teardown and TIME_WAIT. UDP and when it wins | Capture a handshake in Wireshark or via netstat. Identify each packet | Why TCP is reliable and what that reliability costs in latency |
| Wed | TLS: the handshake, certificates and chain of trust, CA validation, symmetric vs asymmetric in the same protocol, session resumption, what HTTPS actually protects and what it does not | Inspect a real certificate chain in your browser. Read each field | Why TLS uses asymmetric crypto to establish symmetric keys, rather than just using one |
| Thu | HTTP: 1.1 vs 2 vs 3, persistent connections, pipelining, multiplexing, QUIC. Methods, status codes, headers, caching headers (Cache-Control, ETag, conditional requests), cookies, CORS, content negotiation | Reproduce a CORS failure and fix it correctly, understanding preflight | Why HTTP/2 multiplexing solved a problem HTTP/1.1 pipelining did not |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: WebSockets and SignalR. The upgrade handshake, framing, ping/pong, scaling stateful connections, backplane (Redis), sticky sessions, fallbacks. Connect to your VCDoctor SignalR work | Draw how you would scale your VCDoctor messaging to 100k concurrent users | Why WebSocket scaling is harder than HTTP scaling |
| Sun | Weekly test. Plan Week 10 | 2-min recording: the URL journey | - |

<a id="S04-B0015"></a>

### Week 9 DSA - graphs part 1

<a id="S04-B0016"></a>

Concepts: representations (adjacency list vs matrix), BFS vs DFS, visited sets, connected components, grid-as-graph.

<a id="S04-B0017"></a>

Problems: Number of Islands, Clone Graph, Max Area of Island, Pacific Atlantic Water Flow, Surrounded Regions, Rotting Oranges, Walls and Gates, Word Ladder, Number of Connected Components in an Undirected Graph, Graph Valid Tree.

<a id="S04-B0018"></a>

### Week 10 - Operating systems

<a id="S04-B0019"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Process vs thread at the OS level. Address space, PCB, context switching and its real cost. User mode vs kernel mode, system calls. Process lifecycle | Measure context switch cost: 1000 threads doing trivial work vs a bounded pool | Why context switching is expensive, in terms of cache and TLB |
| Tue | Memory: virtual memory, paging, page tables, TLB, page faults, swapping, memory-mapped files. Stack vs heap at the OS level - and how that relates to what you learned in Month 1 | Trigger and observe page faults. Read your own process's memory counters | The difference between virtual and physical memory, and why virtual memory exists |
| Wed | Scheduling: preemptive vs cooperative, time slices, priorities, starvation, round robin, MLFQ. Then map it: how does the .NET thread pool scheduler relate to the OS scheduler | Draw both schedulers as a two-layer diagram | Where the OS scheduler ends and the .NET scheduler begins |
| Thu | Synchronisation at OS level: mutex vs semaphore vs spinlock, futex, atomic instructions (CAS), the deadlock conditions again from the OS side, priority inversion. IPC: pipes, shared memory, sockets | Implement a spinlock with Interlocked.CompareExchange and explain when it beats a lock | When a spinlock is correct and when it is catastrophic |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: file systems and I/O. Blocking vs non-blocking I/O, sync vs async I/O, select/epoll/IOCP, and how this underpins async in .NET. This closes the loop with Month 1 Week 4 | Explain how await on a file read maps down to IOCP and back | Why async I/O does not need a thread while waiting |
| Sun | Weekly test. Plan Week 11 | 2-min recording: virtual memory | - |

<a id="S04-B0020"></a>

### Week 10 DSA - graphs part 2

<a id="S04-B0021"></a>

Concepts: topological sort (Kahn's and DFS), cycle detection in directed graphs, union-find with path compression, Dijkstra.

<a id="S04-B0022"></a>

Problems: Course Schedule, Course Schedule II, Alien Dictionary, Redundant Connection, Accounts Merge, Number of Provinces, Network Delay Time, Cheapest Flights Within K Stops, Min Cost to Connect All Points, Reconstruct Itinerary.

<a id="S04-B0023"></a>

### Week 11 - Distributed data and caching

<a id="S04-B0024"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Replication: leader-follower, replication lag, read-your-writes, multi-leader, leaderless, quorum (R + W > N). Failover and split brain | Draw the read-after-write problem and three fixes | Why a read replica can serve stale data, and how you would hide that from a user |
| Tue | Partitioning and sharding: by key range, by hash, consistent hashing and virtual nodes, hot partitions, rebalancing, secondary indexes in a sharded world | Implement consistent hashing in C#, ~80 lines, with virtual nodes | Why consistent hashing beats modulo hashing when a node is added |
| Wed | CAP and consistency: what CAP actually says (and the common misreading), PACELC, strong vs eventual vs causal consistency, linearizability. Conflict resolution: last-write-wins, vector clocks, CRDTs at a concept level | Write, in your own words, why "pick two" is a misleading summary of CAP | CAP correctly - most candidates get this wrong and it is noticeable |
| Thu | Caching in depth: cache-aside, read-through, write-through, write-behind, refresh-ahead. Eviction (LRU, LFU, TTL). Cache stampede, thundering herd, negative caching. Redis internals: single-threaded model, data structures, persistence (RDB/AOF), cluster mode | Implement LRU cache from scratch (this is also a LeetCode problem - do both) | Why Redis being single-threaded is a feature, not a limitation |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: SQL vs NoSQL honestly. Document, key-value, wide-column, graph stores. When each wins. Then: read unfamiliar code. Pick an open-source .NET repo, read a subsystem cold for 90 minutes, and write what it does | Written explanation of a subsystem you had never seen | How you approach unfamiliar code - this is Google's 2026 code-comprehension round |
| Sun | Weekly test. Plan Week 12 | 2-min recording: consistent hashing | - |

<a id="S04-B0025"></a>

### Week 11 DSA - intervals and greedy

<a id="S04-B0026"></a>

Concepts: sorting as a preprocessing step, sweep line, exchange argument for greedy correctness.

<a id="S04-B0027"></a>

Problems: Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms, Meeting Rooms II, Minimum Number of Arrows to Burst Balloons, Jump Game, Jump Game II, Gas Station, Partition Labels.

<a id="S04-B0028"></a>

### Week 12 - Messaging, and system design begins

<a id="S04-B0029"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Queues and messaging. Point-to-point vs pub/sub. Producer/consumer. Acknowledgements, visibility timeout, at-most-once vs at-least-once vs "exactly-once". Why exactly-once delivery is a myth and exactly-once processing is not | Write up your Casepoint SQS/EventBridge pipeline in this vocabulary | Delivery guarantees, and why idempotency is the real answer |
| Tue | Reliability patterns: retries, exponential backoff, jitter, poison messages, dead letter queues, idempotency keys, deduplication windows, ordering guarantees and FIFO queues, backpressure | Design the retry and DLQ policy for your project. Write it down with numbers | Why retries without jitter cause a thundering herd |
| Wed | SQS vs RabbitMQ vs Kafka: the actual differences. Kafka concepts - partitions, offsets, consumer groups, log compaction, ordering within a partition. When you would choose each | A one-page comparison table you wrote yourself, then verified | When you would pick Kafka over SQS, with a real reason |
| Thu | SYSTEM DESIGN 1: URL shortener. Use all nine steps from Doc 00 Part E. Requirements, scale estimate, API, key generation (counter vs hash vs base62), DB choice, cache, redirect path, analytics | 45 minutes, on paper or Excalidraw, timed. Then compare against System Design Primer | Your design, including three trade-offs you consciously made |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | SYSTEM DESIGN 2: rate limiter. Token bucket, leaky bucket, fixed window, sliding window log, sliding window counter. Distributed rate limiting with Redis. Where it sits in the architecture | 45 min timed, then implement token bucket in C# | Which algorithm you would choose and why, including the memory cost of each |
| Sun | Month 3 cumulative test. SYSTEM DESIGN 3: notification service (email/SMS/push, fan-out, retries, user preferences, deduplication) | 45 min timed. Then plan Month 4 | - |

<a id="S04-B0030"></a>

### Week 12 DSA - mixed set (interleaving begins)

<a id="S04-B0031"></a>

From this week, stop practising by topic. Solve mixed sets where you do not know the pattern in advance. This is the interleaving principle from Doc 00 Section B3, and it is what makes pattern recognition real.

<a id="S04-B0032"></a>

Problems: a random mix of 10 from everything covered in Months 1-3. Use LeetCode's random selection or shuffle your own list. Target: identify the pattern within 2 minutes before writing any code.

<a id="S04-B0033"></a>

### Month 3 checkpoint

<a id="S04-B0034"></a>

| Question | Yes/No |
| --- | --- |
| Can I narrate the full URL journey, in order, for 5 minutes without stalling? |  |
| Can I explain the TCP handshake and congestion control? |  |
| Can I explain why TLS uses both asymmetric and symmetric cryptography? |  |
| Can I explain virtual memory and page faults? |  |
| Can I explain how async I/O avoids blocking a thread, down to IOCP? |  |
| Can I explain consistent hashing and why modulo hashing fails? |  |
| Can I state CAP correctly, including what the common misreading gets wrong? |  |
| Can I explain at-least-once delivery and why idempotency is the answer? |  |
| Have I completed 3 system designs in 45 minutes each, timed? |  |
| Did I read an unfamiliar codebase cold and explain it in writing? |  |
| Am I now solving mixed DSA sets rather than topic-blocked sets? |  |

<a id="S04-B0035"></a>

### On your first system designs

<a id="S04-B0036"></a>

They will feel bad. You will run out of things to say at minute 20, or you will spend 30 minutes on requirements and never draw the architecture. Both are normal and both are fixed by repetition, not by reading more.

<a id="S04-B0037"></a>

The one thing to enforce from design one: always follow the nine steps in order. Candidates who improvise the order ramble. Candidates who follow a framework sound senior even when their design is imperfect. The framework is the skill.

<a id="S04-B0038"></a>

### Parallel tracks - Month 3

<a id="S04-B0039"></a>

| Track | Slot | This month |
| --- | --- | --- |
| LLM fundamentals (Doc 12) | One Saturday afternoon block | Track B. Tokens and context windows, embeddings and vector similarity, temperature, structured output, tool calling, streaming, cost and latency, why hallucination happens. Backend-relevant only - this is not an ML curriculum |
| Aptitude (Doc 13) | Tue + Thu, last 15 min | Logical reasoning begins: number and letter series, syllogisms using the Venn diagram method (never verbal reasoning), coding-decoding, blood relations, direction sense |
| Estimation (Doc 13 Part 5) | Inside every system design | From Week 12, every design starts with a real back-of-envelope estimate spoken aloud. Memorise the powers-of-two table and the latency numbers this month |
| Behavioural (Doc 14) | 2 min daily | Journal continues. By month end you should have ~60 entries. Skim them once and mark the ones that could become stories |
| English | Daily | Week 9's networking vocabulary is the densest technical English in the plan. Explain the URL journey aloud repeatedly - it doubles as a very common interview question |

<a id="S04-B0040"></a>

Note how the estimation track and the system design track converge this month. That is intentional: capacity estimation is the one piece of "aptitude" that Google and Amazon genuinely test, inside the design round.

<a id="S05"></a>

## S05 — 05_Month_04_LLD_Distributed_Systems_Project_Phase1

Full source content: [Study-Plan/05_Month_04_LLD_Distributed_Systems_Project_Phase1.docx](../SOURCE_LIBRARY/Study-Plan/05_Month_04_LLD_Distributed_Systems_Project_Phase1.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S05-B0001"></a>

Month 4 - Low Level Design, Distributed Systems, Project Phase 1

<a id="S05-B0002"></a>

Document 05 - Weeks 13 to 16. Design skills, and the project starts.

<a id="S05-B0003"></a>

### Month 4 goal

<a id="S05-B0004"></a>

Two things happen this month. First, low-level design - Amazon tests this explicitly as its own round, and it is the round where strong coders most often stumble because they have never practised turning a vague prompt into classes under time pressure.

<a id="S05-B0005"></a>

Second, the project begins. From Week 16 to Week 19 the project is the centre of gravity of your weekends. It is the thing that will make you memorable in an interview and the thing that will carry half your behavioural stories.

<a id="S05-B0006"></a>

### What "Month 4 complete" means

<a id="S05-B0007"></a>

•  Apply SOLID to a real design and explain each principle with a violation you have personally seen.

<a id="S05-B0008"></a>

•  Design Parking Lot, Elevator and a Rate Limiter in C# from a blank page in 45 minutes.

<a id="S05-B0009"></a>

•  Explain consensus, leader election, distributed locks, outbox and saga at a level you could defend.

<a id="S05-B0010"></a>

•  Project Phase 1 running end to end: submit a job over HTTP, it lands in Postgres, a worker picks it up from a queue and completes it.

<a id="S05-B0011"></a>

•  ~55 DSA problems including backtracking and DP introduction, all in mixed sets.

<a id="S05-B0012"></a>

### Week 13 - SOLID and object-oriented design

<a id="S05-B0013"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | S and O. Single Responsibility - what "one reason to change" actually means. Open/Closed - extension without modification, via abstraction. Both illustrated with real violations | Find a real SRP violation in code you have written. Refactor it | SRP without reciting the definition - use your own example |
| Tue | L, I and D. Liskov Substitution and the classic Rectangle/Square problem. Interface Segregation. Dependency Inversion - and the difference between DI the principle and DI the container | Write a Liskov violation that compiles fine and breaks at runtime | Why Dependency Inversion is not the same thing as using a DI container |
| Wed | LLD 1: Parking Lot. Requirements clarification, entities, class diagram, interfaces, edge cases (full lot, vehicle sizes, pricing strategies), then code the core in C# | 45 min timed, blank page to working classes | Your class choices and one alternative you rejected |
| Thu | LLD 2: Logger. Levels, sinks, formatters, async writing, thread safety, buffering, extension points. Then compare your design against Serilog's actual architecture | 45 min timed, then read Serilog's source | Where your design differs from a real library and why |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: clean code and testability. Why untestable code is usually badly designed code. Coupling and cohesion. LLD 3: Elevator system (multiple lifts, scheduling strategy, state machine) | 45 min timed LLD + write tests for your parking lot | How testability and good design are the same conversation |
| Sun | Weekly test. Plan Week 14 | 2-min recording: Liskov with your own example | - |

<a id="S05-B0014"></a>

### Week 13 DSA - backtracking

<a id="S05-B0015"></a>

Concepts: the choose/explore/unchoose template, pruning, state restoration, complexity of exponential search.

<a id="S05-B0016"></a>

Problems: Subsets, Subsets II, Combination Sum, Combination Sum II, Permutations, Permutations II, Word Search, Palindrome Partitioning, Letter Combinations of a Phone Number, N-Queens.

<a id="S05-B0017"></a>

### Week 14 - Design patterns (only the ones that matter)

<a id="S05-B0018"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Strategy and Factory (simple factory, factory method, abstract factory). Where each genuinely applies. Strategy vs a switch - when the switch is actually better | Refactor a real switch in your code to Strategy. Then judge honestly whether it improved | When Strategy is over-engineering |
| Tue | Observer and the .NET event model. IObservable/IObserver. Pub/sub as Observer at system scale. Memory leaks from unsubscribed handlers | Write an Observer, then leak memory with it, then fix the leak | How event handlers cause memory leaks in .NET |
| Wed | Adapter, Decorator, Facade, Proxy. Decorator vs inheritance. Middleware as a Decorator chain - connect back to Month 2 Week 6 | Implement a caching Decorator over a repository interface | Why ASP.NET Core middleware is the Decorator pattern |
| Thu | Builder, Singleton (and why it is usually a mistake), Repository and Unit of Work (and the argument that EF Core already is both). Anti-patterns: God object, anemic domain model, service locator | Write the argument for and against wrapping EF Core in a repository | Why Singleton is considered an anti-pattern by many, and when it is still right |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Deep block: LLD 4: design a rate limiter as classes (not as a system). Then LLD 5: Splitwise / expense sharing. Both timed | Two 45-min LLDs | - |
| Sun | Weekly test. Plan Week 15 | 2-min recording: Decorator vs inheritance | - |

<a id="S05-B0019"></a>

### Week 14 DSA - dynamic programming, part 1

<a id="S05-B0020"></a>

Concepts: overlapping subproblems, optimal substructure, memoisation vs tabulation, state definition. State definition is the whole skill - if you cannot state what dp[i] means in one sentence, you do not have a solution.

<a id="S05-B0021"></a>

Problems: Climbing Stairs, Min Cost Climbing Stairs, House Robber, House Robber II, Coin Change, Coin Change II, Longest Increasing Subsequence, Word Break, Decode Ways, Maximum Product Subarray.

<a id="S05-B0022"></a>

### Week 15 - Distributed systems, the hard parts

<a id="S05-B0023"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Consensus. Why distributed agreement is hard. Two-phase commit and why it blocks. Raft conceptually: leader election, log replication, terms, commit index. Where consensus actually appears in systems you use | Watch a Raft visualisation. Then explain leader election from memory | Why 2PC is avoided in modern systems |
| Tue | Distributed locks and why they are dangerous. Redis-based locking, the fencing token problem, lease expiry and clock skew. Read Kleppmann's critique of Redlock | Write the failure scenario where a distributed lock silently allows two holders | Why a distributed lock cannot be made safe with timeouts alone |
| Wed | Transactional outbox and saga. Dual-write problem. Choreography vs orchestration. Compensating transactions. Idempotent consumers. Exactly-once *processing* via dedup tables | Design the outbox for your project. Draw the failure modes | The dual-write problem and how outbox solves it |
| Thu | Resilience: circuit breaker (closed/open/half-open), bulkhead, timeout, retry budget, graceful degradation, load shedding. Polly in .NET. Observability: structured logs, metrics (RED and USE), distributed tracing, correlation IDs, SLI/SLO/error budget | Add Polly circuit breaker and correlation IDs to your Month 2 API | Why retries without a circuit breaker can amplify an outage |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | SYSTEM DESIGN 4: distributed job processing system. This is your own project, designed properly before you build it. Requirements, scale, API, schema, queue, worker model, failure handling | 45 min timed. This output becomes Doc 10's implementation plan | Your project's architecture and its trade-offs |
| Sun | Weekly test. SYSTEM DESIGN 5: file storage (Dropbox-like) - chunking, dedup, sync, metadata service | 45 min timed. Plan Week 16 | - |

<a id="S05-B0024"></a>

### Week 15 DSA - mixed medium set

<a id="S05-B0025"></a>

12 problems, mixed, no pattern hints. Timed. Narrated aloud. At least 3 in a plain text editor with no IDE.

<a id="S05-B0026"></a>

### Week 16 - Project Phase 1

<a id="S05-B0027"></a>

Full specification is in Document 10. This week is the walking skeleton: the smallest thing that is genuinely end to end.

<a id="S05-B0028"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Project: solution structure, API project, worker project, shared contracts. Docker Compose with Postgres and Redis | Repo initialised, compose up works | Your project layout and why you split it that way |
| Tue | Project: job submission endpoint, validation, job entity, EF Core schema, migrations. Job states and the state machine | POST /jobs persists a job with status Pending | Your job state machine and its illegal transitions |
| Wed | Project: enqueue on submit, worker consumes, status transitions to Running then Completed. Job status endpoint | End-to-end: submit, watch it process, query status | Why the queue is not just an in-memory list |
| Thu | Project: structured logging with Serilog, correlation IDs flowing from API through the queue to the worker, health check endpoints | Trace one job end to end using only your logs | How you would debug a stuck job in production |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Project: write the README - architecture diagram, design decisions, trade-offs. Written from the start, not bolted on at the end | README with an Excalidraw diagram committed | - |
| Sun | Month 4 cumulative test. Plan Month 5 | 5-minute recorded project walkthrough | Your project, out loud, to a stranger |

<a id="S05-B0029"></a>

### Week 16 DSA - mixed medium set

<a id="S05-B0030"></a>

12 problems, mixed. Plus re-solve every problem currently on the Weak List.

<a id="S05-B0031"></a>

### Month 4 checkpoint

<a id="S05-B0032"></a>

| Question | Yes/No |
| --- | --- |
| Can I explain each SOLID principle with a violation I personally encountered? |  |
| Can I go from a blank page to working classes in a 45-minute LLD? |  |
| Can I explain when a design pattern is over-engineering? |  |
| Can I explain why 2PC is avoided and what replaced it? |  |
| Can I explain why distributed locks are unsafe with timeouts alone? |  |
| Can I explain the dual-write problem and the outbox pattern? |  |
| Can I explain circuit breaker states and why retries alone amplify outages? |  |
| Does my project run end to end - submit, queue, worker, status? |  |
| Can I define dp[i] in one sentence for every DP problem I solved? |  |
| Have I completed 5 system designs total, all timed? |  |

<a id="S05-B0033"></a>

### A warning about the project

<a id="S05-B0034"></a>

The single most likely way this project fails is that it becomes a CRUD API with a nice README. The distributed behaviour is the project. If by the end of Month 5 your job platform cannot survive a worker being killed mid-job, cannot handle the same message twice, and has never been load tested, it will not do its job in an interview.

<a id="S05-B0035"></a>

Doc 10 makes the required behaviours explicit. Build against that list, not against what is comfortable.

<a id="S05-B0036"></a>

### Parallel tracks - Month 4

<a id="S05-B0037"></a>

| Track | Slot | This month |
| --- | --- | --- |
| RAG theory (Doc 12) | One Saturday afternoon block | Track C. The full pipeline - ingest, chunk, embed, store, retrieve, rerank, augment, generate, cite. Chunking as the main quality lever. Hybrid search. The four-way failure taxonomy. Evaluation metrics. No building yet |
| MCP concepts (Doc 12) | Same block, second half | Host/client/server architecture. Tools vs resources vs prompts and the three-way control distinction. Transports and JSON-RPC. Security and prompt injection via tool output |
| Aptitude (Doc 13) | Tue + Thu, last 15 min | Seating arrangements (linear and circular), puzzles with triage practice, clocks and calendars, cubes and dice, data sufficiency |
| Behavioural (Doc 14) | 2 min daily | Journal continues. First story pass: go through all entries and shortlist 25 candidates. You will cut to 20 next month |
| English | Daily | From this month, think aloud in English while solving DSA. Silent solving trains the wrong skill |

<a id="S05-B0038"></a>

Notice that RAG theory lands the same month you start building a queue-and-worker platform. That is deliberate - RAG ingestion at scale is a queue-and-worker problem, so the Month 7 build reuses the architecture you are creating right now.

<a id="S06"></a>

## S06 — 06_Month_05_Project_Completion_System_Design_Behavioural

Full source content: [Study-Plan/06_Month_05_Project_Completion_System_Design_Behavioural.docx](../SOURCE_LIBRARY/Study-Plan/06_Month_05_Project_Completion_System_Design_Behavioural.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S06-B0001"></a>

Month 5 - Project Completion, Advanced System Design, Behavioural

<a id="S06-B0002"></a>

Document 06 - Weeks 17 to 20. The month you become interview-ready.

<a id="S06-B0003"></a>

### Month 5 goal

<a id="S06-B0004"></a>

Three deliverables, all of which must be finished before you start applying in Month 6.

<a id="S06-B0005"></a>

•  A deployed, load-tested, failure-tested project with a written performance report.

<a id="S06-B0006"></a>

•  15-20 STAR stories, written and rehearsed aloud, mapped to Amazon's 16 Leadership Principles.

<a id="S06-B0007"></a>

•  CI/CD you built yourself and can explain, not a copied template.

<a id="S06-B0008"></a>

This is the heaviest month. Weekends are project days and they need to be real full days.

<a id="S06-B0009"></a>

### Week 17 - Project Phase 2: reliability

<a id="S06-B0010"></a>

Everything this week is a distributed-systems concept from Month 4, made real. That is the point - you are converting theory into something you can demonstrate.

<a id="S06-B0011"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Retries with exponential backoff and jitter. Retry budgets, max attempts, distinguishing transient from permanent failures | Retry policy implemented with configurable backoff. Prove jitter spreads the load | Why jitter matters, with the thundering-herd scenario |
| Tue | Dead letter queue. Poison message detection, DLQ inspection endpoint, replay from DLQ, alerting on DLQ depth | Kill a job deliberately, watch it reach the DLQ after N attempts, then replay it | What you do operationally when the DLQ starts filling |
| Wed | Idempotency. Idempotency keys on submission, deduplication table, idempotent workers, handling duplicate delivery from the queue | Deliver the same message twice on purpose. Prove the job executes once | Why at-least-once delivery makes idempotency mandatory, not optional |
| Thu | Job priority and concurrency control. Priority queues, per-tenant fairness, worker concurrency limits, preventing one tenant starving others | Submit 100 low-priority and 5 high-priority jobs. Prove ordering | How you prevent a noisy tenant from starving everyone else |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Project: failure simulation. Kill a worker mid-job. Kill Postgres. Fill the queue. Introduce network delay. Document every behaviour observed | A written failure-modes table in your README | What happens to an in-flight job when its worker dies - and how you know |
| Sun | Weekly test. Behavioural: extract your first 5 STAR stories from the work journal | 5 written stories | Plan Week 18 |

<a id="S06-B0012"></a>

### Week 17 DSA - dynamic programming, part 2

<a id="S06-B0013"></a>

Problems: Unique Paths, Unique Paths II, Longest Common Subsequence, Edit Distance, Partition Equal Subset Sum, Target Sum, Best Time to Buy and Sell Stock with Cooldown, Longest Palindromic Substring, Palindromic Substrings, 0/1 Knapsack (classic form).

<a id="S06-B0014"></a>

### Week 18 - Project Phase 3: production concerns

<a id="S06-B0015"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Redis in the project: caching job status reads, cache-aside with correct invalidation, TTL strategy. Measure the hit rate | Cache added, hit rate measured and reported | Your cache invalidation strategy and its failure mode |
| Tue | Rate limiting: per-API-key token bucket in Redis, 429 responses with Retry-After, distributed correctness across multiple API instances | Rate limiter working across 2+ API replicas | Why a naive per-instance rate limiter is wrong when you scale out |
| Wed | Authentication and authorisation: API keys or JWT, per-tenant isolation, ensuring tenant A cannot read tenant B's jobs. Secrets handling - never in source | Auth enforced. Write a test that proves cross-tenant access fails | Your tenant isolation model and how you tested it |
| Thu | Metrics and observability: Prometheus metrics (jobs submitted, completed, failed, queue depth, processing duration histogram), Grafana dashboard, health checks (liveness vs readiness) | A dashboard you can screenshot for your README | The difference between liveness and readiness, and why it matters to a load balancer |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Project: integration tests with Testcontainers against real Postgres and Redis. Test the idempotency and retry paths specifically | A test suite that runs in CI | Why you test against real Postgres rather than an in-memory provider |
| Sun | Weekly test. Behavioural: 5 more STAR stories (10 total) | 2-min recording: your rate limiter design | Plan Week 19 |

<a id="S06-B0016"></a>

### Week 18 DSA - mixed medium set, timed

<a id="S06-B0017"></a>

12 problems, mixed, all timed at 25 minutes, all narrated aloud in English. At least 4 in a plain text editor.

<a id="S06-B0018"></a>

### Week 19 - Project Phase 4: ship it

<a id="S06-B0019"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | Docker: multi-stage builds for API and worker, image size optimisation, non-root user, .dockerignore, health checks in the image | Both images build and run. Sizes reported before and after optimisation | Why multi-stage builds matter, with your own before/after numbers |
| Tue | CI/CD with GitHub Actions: build, test, lint on every PR. Matrix builds. Caching. Branch protection. Then the CD half - build and push images on merge | A green pipeline on a real PR | Your pipeline stages and what each one protects against |
| Wed | AWS deployment: ECS or EC2, RDS Postgres, ElastiCache Redis, SQS as the real queue, IAM roles and least privilege, billing alarm set on day one | Deployed and reachable | Your deployment topology, drawn |
| Thu | Load testing with k6: baseline, ramp, sustained load, spike. Measure p50/p95/p99 latency and throughput. Find the breaking point, then explain *why* it broke | A results table with real numbers | Your bottleneck, identified and evidenced - not guessed |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Project: the performance and architecture report. Numbers, graphs, bottleneck analysis, what you would do next with more time. Then scale workers and re-measure to prove horizontal scaling works | A written report in the repo | Your project's scaling characteristics, with evidence |
| Sun | Weekly test. Behavioural: 5 more stories (15 total) | Final README polish: diagrams, decisions, trade-offs, how to run it | Plan Week 20 |

<a id="S06-B0020"></a>

### Week 19 DSA - mixed medium set

<a id="S06-B0021"></a>

12 problems, mixed and timed. Begin re-solving Month 1-2 problems from memory to test long-term retention.

<a id="S06-B0022"></a>

### Week 20 - System design depth and behavioural

<a id="S06-B0023"></a>

| Day | Core topic | Build / Do | Must be able to explain |
| --- | --- | --- | --- |
| Mon | SYSTEM DESIGN 6: news feed (Twitter/Instagram). Fan-out on write vs fan-out on read, the celebrity problem, feed ranking, pagination with cursors | 45 min timed | Why neither pure fan-out strategy works at scale |
| Tue | SYSTEM DESIGN 7: ecommerce order processing. Inventory reservation, saga across services, payment integration, eventual consistency in a money context | 45 min timed | How you avoid overselling inventory without a distributed transaction |
| Wed | SYSTEM DESIGN 8: payment workflow. Idempotency of charges, reconciliation, webhook handling, retries against a third party, PCI boundary awareness. Draw on your Stripe/PayPal/CCAvenue experience | 45 min timed | Why payment systems are idempotency-obsessed |
| Thu | SYSTEM DESIGN 9: chat system (WhatsApp-like). Connection management, message delivery and ordering, read receipts, offline delivery, group fan-out. Draw on your SignalR and FCM experience | 45 min timed | How you deliver a message to a device that is offline |
| Fri | No new material. Weak List + recorded recall | Re-solve flagged problems | - |
| Sat | Behavioural intensive. Final 5 stories (20 total). Map every story to multiple LPs using the Doc 11 matrix. Identify LPs with no story and manufacture nothing - find real ones | Complete story matrix, no gaps | - |
| Sun | Month 5 cumulative test. Rehearse all 20 stories aloud, recorded. Resume update. Then plan the Month 6 application strategy | Recordings of all 20 stories | Every story in under 3 minutes |

<a id="S06-B0024"></a>

### Week 20 DSA - mixed medium set

<a id="S06-B0025"></a>

12 problems. Plus a full re-solve pass over every Weak List item.

<a id="S06-B0026"></a>

### Month 5 checkpoint - the gate to applying

<a id="S06-B0027"></a>

This is the most important checkpoint in the plan. Do not start applying to Google or Amazon until these are genuinely true.

<a id="S06-B0028"></a>

| Question | Yes/No |
| --- | --- |
| Is the project deployed and publicly reachable? |  |
| Does it survive a worker being killed mid-job, with the job recovered? |  |
| Does it handle duplicate message delivery without double-processing? |  |
| Are there retries with backoff and jitter, and a working DLQ with replay? |  |
| Is there a rate limiter that is correct across multiple instances? |  |
| Is there a metrics dashboard and are there health checks? |  |
| Has it been load tested with real p95/p99 numbers written down? |  |
| Do I know my bottleneck and can I evidence it? |  |
| Is CI/CD green, and did I build it rather than copy it? |  |
| Is the README complete with architecture diagram and trade-offs? |  |
| Do I have 15-20 STAR stories written and rehearsed aloud? |  |
| Is every high-frequency Amazon LP covered by at least two stories? |  |
| Do I have a Have Backbone / Disagree and Commit story that is genuinely mine? |  |
| Have I completed 9 system designs, all timed at 45 minutes? |  |
| Can I explain my project completely in 5 minutes, and in depth for 30? |  |

<a id="S06-B0029"></a>

### If several answers are "no"

<a id="S06-B0030"></a>

Do not apply yet. Spend the first two weeks of Month 6 repairing, then apply. The plan has eight months precisely so this is affordable. Applying to Amazon with a half-built project and four rehearsed stories converts a strong candidate into a rejection and a 6-12 month cooldown, which is a far more expensive outcome than a two-week delay.

<a id="S06-B0031"></a>

### Parallel tracks - Month 5

<a id="S06-B0032"></a>

| Track | Slot | This month |
| --- | --- | --- |
| AI / MCP / RAG (Doc 12) | None. Deliberately. | This month belongs to the project and the story bank. Protect it. The RAG build is Month 7 and it is timeboxed there for exactly this reason |
| Aptitude (Doc 13) | Tue + Thu, last 15 min | Data interpretation - tables, bar and pie charts, caselets. Highest-frequency section in real assessments. Plus light verbal: sentence correction and reading comprehension |
| Behavioural (Doc 14) | Promoted to a core track | This is no longer parallel - it is one of the month's three deliverables. Five stories per week across Weeks 17-20, the full LP matrix in Week 20, all 20 recorded by month end |
| English | Daily + weekly | Every STAR story rehearsed aloud and recorded. This is simultaneously your English practice and your behavioural practice - the highest-efficiency overlap in the plan |

<a id="S06-B0033"></a>

The behavioural work is scheduled inside the weekly tables above (Sundays of Weeks 17-19, and all of Week 20's Saturday and Sunday). Document 14 has the extraction template, the LP matrix and the follow-up probes.

<a id="S07"></a>

## S07 — 07_Month_06_Interview_Launch

Full source content: [Study-Plan/07_Month_06_Interview_Launch.docx](../SOURCE_LIBRARY/Study-Plan/07_Month_06_Interview_Launch.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S07-B0001"></a>

Month 6 - Interview Launch

<a id="S07-B0002"></a>

Document 07 - Weeks 21 to 24. Applications start. Learning does not stop.

<a id="S07-B0003"></a>

### Month 6 goal

<a id="S07-B0004"></a>

The mode changes this month. Months 1-5 were accumulation; Month 6 is performance under observation. The skills are largely built - what is untested is whether you can deploy them in 45 minutes, in English, with someone watching.

<a id="S07-B0005"></a>

Two rules for this month. First, applications go out in Week 21, not at the end of the month - pipelines take weeks and you want interviews landing in Months 7-8, not Month 9. Second, you keep studying while interviewing. Candidates who stop learning the moment they start applying stall.

<a id="S07-B0006"></a>

### The application ladder

<a id="S07-B0007"></a>

Do not apply to Google and Amazon first. Interview skill is built by interviewing, and your first two loops will be your worst regardless of preparation. Sequence deliberately:

<a id="S07-B0008"></a>

| Week | Target | Purpose |
| --- | --- | --- |
| 21 | 8-10 mid-tier product companies | Calibration. Expect to be uncomfortable. Every one is a free mock |
| 22 | 5-8 strong product companies (Indian unicorns, good SaaS, global product firms) | Real practice with real stakes |
| 23 | Amazon | Referral if possible. SDE II |
| 24 | Google | Referral strongly preferred. L4/L5 |
| Throughout | 2-3 applications per week, continuously | Keep the pipeline alive. Never let it empty |

<a id="S07-B0009"></a>

Referrals matter more than anything else in this table. Use LinkedIn - you have a profile already. Find engineers at these companies who share your background (C#/.NET, Surat/Gujarat, VNSGU, prior employers). A short, specific message asking for a referral converts far better than a cold application. Budget an hour a week for this; it has a higher expected return than an hour of LeetCode at this stage.

<a id="S07-B0010"></a>

### Weekly structure for Month 6

<a id="S07-B0011"></a>

The weekday shape changes. DSA gets more time and everything is timed.

<a id="S07-B0012"></a>

| Block | Time | Content |
| --- | --- | --- |
| Block 1 | 0:00-0:10 | Recall: one concept from the Weak List, aloud |
| Block 2 | 0:10-1:10 | Timed DSA: 2 medium problems, 25 min each, narrated in English |
| Block 3 | 1:10-1:50 | Rotating: system design / LLD / behavioural rehearsal / weak-area repair |
| Block 4 | 1:50-2:00 | Log, Weak List, applications and follow-ups |

<a id="S07-B0013"></a>

### Week 21 - Launch

<a id="S07-B0014"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Resume final polish. Rewrite bullets as impact + metric + technology. Add the project with its numbers | Resume finalised; LinkedIn updated to match | A resume you would not change again |
| Tue | Apply to 8-10 mid-tier companies. Referral outreach: 10 LinkedIn messages | Applications submitted, tracked in a sheet | A live pipeline |
| Wed | Timed DSA + SYSTEM DESIGN 10: web crawler (politeness, dedup, frontier, distributed workers) | 45 min timed design | - |
| Thu | Timed DSA + behavioural: rehearse 6 stories cold, randomised order | Recordings | Stories under 3 min each |
| Fri | Weak List repair only. Whatever is weakest gets the whole session | - | Shorter Weak List |
| Sat | Full mock loop, self-administered: 2 DSA (25 min each) + 1 system design (45 min) + 3 behavioural, back to back, no breaks | Recorded. Then watch it back once | Honest self-assessment |
| Sun | Weekly test. Review the mock. Identify the 3 biggest gaps and schedule them | Gap list | Plan Week 22 |

<a id="S07-B0015"></a>

### Week 22 - Volume and calibration

<a id="S07-B0016"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Timed DSA + SYSTEM DESIGN 11: video platform (YouTube) - upload, transcoding pipeline, CDN, recommendations at a high level | 45 min timed | - |
| Tue | Timed DSA + LLD practice: design a task scheduler in C#, 45 min | Working classes | - |
| Wed | Timed DSA + SYSTEM DESIGN 12: typeahead / autocomplete - tries, ranking, caching, updates | 45 min timed | - |
| Thu | Timed DSA + behavioural: the hard ones. Failure, conflict, disagreement with a senior, a decision you got wrong | Recordings | - |
| Fri | Weak List repair. Any real interviews this week get analysed in writing | Written analysis | - |
| Sat | Pramp mock 1 (DSA) + Pramp mock 2 (system design). Use your free credits deliberately | Feedback captured | Named weaknesses |
| Sun | Weekly test. Apply to 5-8 strong product companies | Applications out | Plan Week 23 |

<a id="S07-B0017"></a>

### Week 23 - Amazon week

<a id="S07-B0018"></a>

Amazon-specific preparation. Their loop is the most predictable of the two, which makes targeted preparation genuinely effective.

<a id="S07-B0019"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | LP intensive 1. Re-read Amazon's own wording for all 16. Map your 20 stories to the matrix. Find LPs with thin coverage | Complete matrix | No LP with zero stories |
| Tue | LP intensive 2. The six high-frequency LPs get two rehearsed stories each. Practise the follow-up probes: "what was the data?", "what would you do differently?", "what did *you* do, not the team?" | Recordings | Depth on probing |
| Wed | Amazon-style DSA: their tagged patterns lean towards arrays, strings, hashing, trees, graphs, heaps. Timed set of 4 | 4 problems | - |
| Thu | Amazon LLD round preparation. They ask you to code a design. Practise 2 timed LLDs with working C# | 2 LLDs | - |
| Fri | Amazon HLD. Design a package tracking system in 20 minutes (their OA format), then a full 45-minute version | Both | - |
| Sat | Full Amazon-format mock: DSA + LLD + HLD + LP, in one sitting. This is a long session by design | Recorded | Endurance tested |
| Sun | Weekly test. Apply to Amazon. Referral first if you have one | Application submitted | Plan Week 24 |

<a id="S07-B0020"></a>

### The Bar Raiser mindset

<a id="S07-B0021"></a>

Assume one interviewer will push harder than the rest, will not accept your first answer, and will keep asking "why" until you reach the limit of your knowledge. That is the job of the Bar Raiser, and reaching your limit is not a failure. Saying "I do not know, but here is how I would find out" scores far better than confidently inventing something. Inventing is the one thing that reliably fails the round.

<a id="S07-B0022"></a>

### Week 24 - Google week

<a id="S07-B0023"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Whiteboard conditions. All DSA this week in a plain text editor: no autocomplete, no compiler, no running the code. Google interviews this way | 4 problems, no IDE | Comfort without tooling |
| Tue | Google-style DSA: they lean towards graphs, DP, recursion, and problems with strong follow-up variations. Practise the follow-up: "now make it work on a stream", "now it does not fit in memory" | 4 problems + variations | - |
| Wed | Code comprehension preparation. Take an unfamiliar open-source .NET repo. Read a subsystem for 45 minutes and explain it aloud: what it does, how, what you would change, where the bugs might be | Recorded explanation | Readiness for the 2026 pilot round |
| Thu | SYSTEM DESIGN 13: Google Docs (collaborative editing, OT/CRDT at a concept level) + 14: distributed cache (consistent hashing, eviction, replication) | Two 45-min designs | - |
| Fri | Googliness preparation. Collaboration, ambiguity, disagreement, receiving critical feedback, mentoring, what you do when you are wrong | Recordings | - |
| Sat | Full Google-format mock: 2 coding (no IDE) + 1 system design + 1 behavioural | Recorded | - |
| Sun | Month 6 cumulative test. Apply to Google. Review the whole month honestly | Application submitted | Plan Month 7 |

<a id="S07-B0024"></a>

### Month 6 checkpoint

<a id="S07-B0025"></a>

| Question | Yes/No |
| --- | --- |
| Am I solving medium problems in under 25 minutes, consistently, narrating throughout? |  |
| Can I hold a 45-minute system design conversation without freezing or running dry? |  |
| Have I done at least 4 external mocks (Pramp or peer)? |  |
| Can I code on a blank text editor without autocomplete without it slowing me down badly? |  |
| Are all 20 stories rehearsed, randomised, and under 3 minutes each? |  |
| Do I have a real answer for every high-frequency Amazon LP? |  |
| Have I applied to Amazon and Google? |  |
| Is my pipeline still active - 2-3 applications per week going out? |  |
| Have I analysed every real interview in writing? |  |

<a id="S07-B0026"></a>

### How to analyse an interview (do this within 24 hours, always)

<a id="S07-B0027"></a>

| Field | Record |
| --- | --- |
| Company, role, round | Facts |
| Questions asked | As close to verbatim as you can remember |
| What went well | Be specific, not "it was okay" |
| What went badly | The precise moment you stalled |
| Root cause | Knowledge gap? Pattern not recognised? Communication? Nerves? Time management? |
| Named repair action | A concrete topic or drill, scheduled on a date |
| Weak List additions | Every gap goes on the list |

<a id="S07-B0028"></a>

Root cause is the field that matters. "I failed the DSA round" is useless. "I did not recognise it as a monotonic stack problem and burned 20 minutes on brute force" is a repairable, scheduled action. Vague post-mortems are why people interview for a year without improving.

<a id="S07-B0029"></a>

### A note on rejection

<a id="S07-B0030"></a>

You will be rejected this month, probably several times, possibly by Amazon or Google. That is the expected outcome of the calibration strategy, not evidence the plan failed. Both companies allow reapplication after a cooldown, typically 6-12 months, and Months 7-8 exist to convert the pipeline you are building now. Every rejection that produces a named, repaired gap has done its job.

<a id="S07-B0031"></a>

### Parallel tracks - Month 6

<a id="S07-B0032"></a>

| Track | Slot | This month |
| --- | --- | --- |
| Aptitude (Doc 13) | Weeks 21-22: intensive, 30 min/day | This is the month it actually pays. Your mid-tier applications land in Weeks 21-22, and those companies gate on aptitude before anyone reads your code. Full timed mock assessments - quantitative, reasoning, verbal, technical. Weeks 23-24: maintenance only |
| AI / MCP / RAG (Doc 12) | 20 min, once | Rehearse your "how do you use AI tools?" answer aloud. It is a live question at both targets. No building this month |
| Behavioural (Doc 14) | Woven into every week | Randomised, cold, unwarned. Never in a fixed order - rehearsed sequences sound memorised, and memorised sounds inauthentic |
| English | Every mock | All DSA narrated aloud in English. Every mock recorded. Listen for wrong statements and rambling, not accent |

<a id="S07-B0033"></a>

Why the aptitude intensive sits in Weeks 21-22 specifically: being filtered out by a percentages question before a human ever sees your code would be an avoidable way to lose a calibration interview. Two focused weeks removes that risk permanently, and after that it never needs this much attention again.

<a id="S08"></a>

## S08 — 08_Month_07_Interview_Conversion

Full source content: [Study-Plan/08_Month_07_Interview_Conversion.docx](../SOURCE_LIBRARY/Study-Plan/08_Month_07_Interview_Conversion.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S08-B0001"></a>

Month 7 - Interview Conversion and Advanced Gaps

<a id="S08-B0002"></a>

Document 08 - Weeks 25 to 28. Turning interviews into offers.

<a id="S08-B0003"></a>

### Month 7 goal

<a id="S08-B0004"></a>

By now you have interviewed. Some went badly. This month is about systematic repair, not more accumulation. The discipline is: every rejection produces a named gap, every named gap gets a scheduled drill, every drill gets verified.

<a id="S08-B0005"></a>

This month also contains the second project - a small RAG service (Document 12). It is deliberately small, it is built in weekend blocks, and it exists because AI-assisted engineering is now a live interview topic and you already have Copilot and Claude on your resume.

<a id="S08-B0006"></a>

### Month 7 priorities in order

<a id="S08-B0007"></a>

•  Repair named gaps from real interviews. Highest priority, always.

<a id="S08-B0008"></a>

•  Advanced distributed systems - the topics that separate SDE II from SDE I.

<a id="S08-B0009"></a>

•  Weekly full mock loops - endurance, not just correctness.

<a id="S08-B0010"></a>

•  The RAG service - weekends only, timeboxed.

<a id="S08-B0011"></a>

•  Keep the pipeline alive - 2-3 applications per week, without exception.

<a id="S08-B0012"></a>

### Week 25 - Gap repair and advanced messaging

<a id="S08-B0013"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Gap repair block. Take your interview analysis log. Rank gaps by frequency. Attack the top one for the full session | Written proof you closed it | One gap closed |
| Tue | Kafka in depth: partitions, offsets, consumer groups and rebalancing, ordering guarantees within a partition, log compaction, exactly-once semantics and transactions, replication and ISR | Compare against your SQS experience in writing | When Kafka beats SQS, concretely |
| Wed | Timed DSA (2 medium) + SYSTEM DESIGN 15: ad click aggregation - stream processing, windowing, late events, approximate counting | 45 min timed | - |
| Thu | Stream processing concepts: event time vs processing time, watermarks, tumbling/sliding/session windows, exactly-once in streams, backfill and replay | Notes in the six-question frame | Why event time is harder than processing time |
| Fri | Gap repair + Weak List | - | - |
| Sat | Full mock loop (2 DSA + 1 design + 1 behavioural, back to back) + RAG project: Phase 1 (Doc 12) | Recorded mock; RAG skeleton | - |
| Sun | Weekly test. Interview analysis for the week. Applications out | - | Plan Week 26 |

<a id="S08-B0014"></a>

### Week 26 - Reliability, scale and the deeper design questions

<a id="S08-B0015"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Gap repair block | - | One gap closed |
| Tue | Advanced consistency: linearizability vs serializability (they are not the same), snapshot isolation, write skew, causal consistency, read-your-writes and monotonic reads | Write the distinction in your own words | Linearizability vs serializability - a question that separates candidates |
| Wed | Timed DSA + SYSTEM DESIGN 16: metrics and monitoring system - time series storage, cardinality, downsampling, alerting | 45 min timed | - |
| Thu | Multi-region and disaster recovery: active-active vs active-passive, RPO/RTO, data residency, geo-routing, cross-region replication lag | Notes | How you would make your job platform multi-region |
| Fri | Gap repair + Weak List | - | - |
| Sat | Full mock loop + RAG project: Phase 2 | - | - |
| Sun | Weekly test. Interview analysis. Applications out | - | Plan Week 27 |

<a id="S08-B0016"></a>

### Week 27 - Company-specific depth

<a id="S08-B0017"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Gap repair block | - | - |
| Tue | Amazon-tagged DSA set. Use Sean Prashad's company tags. 4 problems timed | 4 problems | - |
| Wed | Google-tagged DSA set, no IDE, plus the follow-up variations Google favours | 4 problems | - |
| Thu | SYSTEM DESIGN 17: nearby friends / proximity service - geohashing, quadtrees, location updates at scale | 45 min timed | - |
| Fri | Gap repair + Weak List. Behavioural: re-record your three weakest stories | Recordings | - |
| Sat | Full mock loop + RAG project: Phase 3 | - | - |
| Sun | Weekly test. Interview analysis. Applications out | - | Plan Week 28 |

<a id="S08-B0018"></a>

### Week 28 - Consolidation and the hard round

<a id="S08-B0019"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Gap repair block | - | - |
| Tue | Selected hard DSA. Only patterns you already own - hard problems in patterns you are weak at teach nothing. 2 problems | 2 problems | - |
| Wed | Timed DSA + SYSTEM DESIGN 18: object storage (S3-like) - durability, erasure coding, consistency model, metadata scale | 45 min timed | - |
| Thu | Deep project defence. Have someone (or a recording) interrogate your project for 30 minutes: every design decision, every alternative rejected, every number | Recording | Your project under hostile questioning |
| Fri | Gap repair + Weak List | - | - |
| Sat | Full mock loop + RAG project: Phase 4 (complete, deployed, README) | RAG service live | - |
| Sun | Month 7 cumulative test. Full interview analysis review - are gaps actually closing? | - | Plan Month 8 |

<a id="S08-B0020"></a>

### Month 7 checkpoint

<a id="S08-B0021"></a>

| Question | Yes/No |
| --- | --- |
| Has every interview produced a written analysis with a named root cause? |  |
| Are gaps actually closing, or is the same gap recurring? |  |
| Can I explain Kafka's model and when it beats SQS? |  |
| Can I distinguish linearizability from serializability? |  |
| Have I done 4 full mock loops this month? |  |
| Can my project survive 30 minutes of hostile questioning? |  |
| Is the RAG service built and deployed? |  |
| Is the pipeline still active? |  |

<a id="S08-B0022"></a>

### The recurring-gap rule

<a id="S08-B0023"></a>

If the same gap appears in your analysis log three times, your repair method is wrong, not your effort. Change the method: if you keep failing graph problems, stop solving graph problems and instead spend a session implementing BFS, DFS, topological sort and union-find from scratch, from memory, until they are automatic. Repetition of failure is not practice.

<a id="S08-B0024"></a>

### Parallel tracks - Month 7

<a id="S08-B0025"></a>

| Track | Slot | This month |
| --- | --- | --- |
| RAG service (Doc 12) | Four Saturday blocks, Weeks 25-28 | The build. Phase 1 ingest and chunking, Phase 2 embeddings and vector search with pgvector, Phase 3 grounded generation with citations, Phase 4 hybrid search plus an evaluation set with measured recall@k. Timeboxed - if it competes with interview preparation, cut its scope, not your preparation |
| MCP (Doc 12) | Optional, only if Phase 4 finishes early | A small MCP server exposing your job platform as tools: submit, status, DLQ inspect. Genuinely impressive, and genuinely optional |
| Aptitude (Doc 13) | Maintenance | One timed set per week, only while assessments are still arriving. Otherwise drop it entirely |
| Behavioural (Doc 14) | Weekly | Re-record your three weakest stories each week. Drill the follow-up probes specifically - this is where the Bar Raiser round is decided |
| English | Every mock loop | Four full mock loops this month, all narrated, all recorded |

<a id="S08-B0026"></a>

Why pgvector rather than a dedicated vector database: you know Postgres deeply by now, it removes an entire piece of infrastructure, and the trade-off reasoning behind that choice is itself a good interview answer. Document 12 covers this.

<a id="S09"></a>

## S09 — 09_Month_08_Peak_Performance_and_Offers

Full source content: [Study-Plan/09_Month_08_Peak_Performance_and_Offers.docx](../SOURCE_LIBRARY/Study-Plan/09_Month_08_Peak_Performance_and_Offers.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S09-B0001"></a>

Month 8 - Peak Performance and Offer Conversion

<a id="S09-B0002"></a>

Document 09 - Weeks 29 to 32. Consolidate, convert, negotiate.

<a id="S09-B0003"></a>

### Month 8 goal

<a id="S09-B0004"></a>

Consolidate rather than accumulate. The instinct at this stage is to keep adding topics because adding feels safe. It is the wrong instinct. Your risk now is not missing knowledge - it is failing to retrieve knowledge you already have, under pressure, in a 45-minute window.

<a id="S09-B0005"></a>

Everything this month is retrieval, timing, and delivery.

<a id="S09-B0006"></a>

### The four workstreams

<a id="S09-B0007"></a>

| Stream | Content |
| --- | --- |
| Retrieval | Re-solve every missed DSA problem from memory. Redo 10-15 system designs from a blank page |
| Oral revision | Full spoken revision of C#, .NET, DB, OS, networking, distributed systems. No notes |
| Interview execution | Weekly full loops. Randomised behavioural. Real interviews continuing |
| Conversion | Offer handling, negotiation, level calibration |

<a id="S09-B0008"></a>

### Week 29 - Retrieval intensive

<a id="S09-B0009"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Re-solve missed problems. Pull every problem you ever failed. Solve from memory, no hints. Track which still fail | List of still-failing problems | The real weak set |
| Tue | Continue re-solve. Then build your personal pattern sheet: one page, 15 patterns, recognition cues, template code | One-page pattern sheet | Your own reference, written by you |
| Wed | Oral revision: C# and .NET. Speak for 45 minutes covering memory, OOP, collections, LINQ, async, GC, runtime. No notes. Recorded | Recording | Gaps exposed by silence |
| Thu | Oral revision: databases and SQL. Indexes, plans, transactions, isolation, locking, replication, sharding. No notes | Recording | - |
| Fri | Weak List. Repair whatever the oral revisions exposed | - | - |
| Sat | System designs from scratch, timed: redo 3 of your earliest designs (URL shortener, rate limiter, notification service). Compare to your Month 3 versions | Three designs | Visible proof of growth |
| Sun | Weekly test. Applications and follow-ups | - | Plan Week 30 |

<a id="S09-B0010"></a>

### Week 30 - Oral revision and design volume

<a id="S09-B0011"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Oral revision: networking and OS. URL journey, TCP, TLS, HTTP versions, processes, threads, memory, scheduling. No notes | Recording | - |
| Tue | Oral revision: distributed systems. Queues, delivery guarantees, idempotency, consistency, replication, sharding, consensus, resilience | Recording | - |
| Wed | Timed DSA + redo 2 system designs from scratch | - | - |
| Thu | Randomised behavioural. Have someone pick stories at random, or use a shuffled list. No warning, no preparation time | Recording | Stories that survive randomisation |
| Fri | Weak List repair | - | - |
| Sat | Full mock loop. Then redo 3 more system designs | - | - |
| Sun | Weekly test. Applications | - | Plan Week 31 |

<a id="S09-B0012"></a>

### Week 31 - Peak simulation

<a id="S09-B0013"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Timed DSA, hard set, patterns you own | - | - |
| Tue | Redo 3 system designs from scratch, timed, no notes | - | - |
| Wed | Project defence, second pass. 30 minutes hostile questioning on both projects | Recording | - |
| Thu | Randomised behavioural + Googliness + LP mixed | Recording | - |
| Fri | Weak List. Final gap repair | - | - |
| Sat | Two full mock loops in one day. This simulates onsite fatigue, which is a real and under-practised factor | Recordings | Endurance |
| Sun | Weekly test. Applications | - | Plan Week 32 |

<a id="S09-B0014"></a>

### Week 32 - Conversion

<a id="S09-B0015"></a>

| Day | Focus | Do | Output |
| --- | --- | --- | --- |
| Mon | Light DSA (maintenance, not growth). Review the pattern sheet | - | - |
| Tue | Negotiation preparation. Levels.fyi research for your target companies, locations and level. Know the bands before any conversation | Written numbers | A range you can state calmly |
| Wed | Offer-handling scripts. How to ask for time, how to communicate competing offers honestly, how to discuss level rather than only money | Written scripts | Composure under offer pressure |
| Thu | Light revision across all areas. Do not cram | - | - |
| Fri | Weak List final pass | - | - |
| Sat | Full mock loop if interviews are still live; rest if they are not | - | - |
| Sun | Final cumulative test. Then plan what comes next - whether that is more interviews, or the first 90 days of a new job | - | - |

<a id="S09-B0016"></a>

### Negotiation - the short version

<a id="S09-B0017"></a>

This is the highest hourly-rate work in the entire eight months, and most engineers do it badly by being unprepared for a conversation they knew was coming.

<a id="S09-B0018"></a>

•  Never give the first number. "I would rather understand the full scope and level first - what range is budgeted for this role?"

<a id="S09-B0019"></a>

•  Never share your current salary unless legally required. It anchors you to your past, not to the role's value.

<a id="S09-B0020"></a>

•  Negotiate the level, not just the pay. L4 versus L5, or SDE I versus SDE II, is worth more over a career than any single-year adjustment.

<a id="S09-B0021"></a>

•  Get it in writing before you resign anything.

<a id="S09-B0022"></a>

•  Competing offers are the strongest lever, honestly used. Never invent one - it is checkable and it ends conversations.

<a id="S09-B0023"></a>

•  Be pleasant throughout. These are your future colleagues, and the person negotiating with you usually wants you to accept.

<a id="S09-B0024"></a>

### If you have no offer by the end of Month 8

<a id="S09-B0025"></a>

This is a real possibility and it is not failure. Hiring pipelines at Google and Amazon routinely run months, and market conditions vary independently of your ability.

<a id="S09-B0026"></a>

What you have at this point: deep .NET knowledge, working DSA pattern recognition, system design competence, two deployed projects, twenty rehearsed stories, and demonstrated study discipline over eight months. None of that expires. The correct response is to continue the Month 7 loop - repair, mock, apply - at a sustainable maintenance level while you keep working. Most people who reach this point and continue convert within the following few months.

<a id="S09-B0027"></a>

The failure mode to avoid is concluding that the eight months were wasted and stopping. You would be stopping at exactly the point where the accumulated work starts paying.

<a id="S09-B0028"></a>

### Final checkpoint

<a id="S09-B0029"></a>

| Question | Yes/No |
| --- | --- |
| Can I re-solve every previously-missed problem from memory? |  |
| Do I have a one-page pattern sheet I wrote myself? |  |
| Can I speak for 45 minutes on each major area with no notes? |  |
| Have I redone 10-15 system designs from a blank page? |  |
| Can both projects survive 30 minutes of hostile questioning? |  |
| Do my stories survive randomised, unwarned questioning? |  |
| Do I know my target compensation bands and level criteria? |  |
| Can I state a number calmly without flinching? |  |

<a id="S09-B0030"></a>

### Parallel tracks - Month 8

<a id="S09-B0031"></a>

| Track | Slot | This month |
| --- | --- | --- |
| AI / MCP / RAG (Doc 12) | Rehearsal only | Practise explaining the RAG service in 5 minutes: architecture, the chunking decision, hybrid search, and your evaluation numbers. The numbers are what make it memorable - almost no candidate measures. Build nothing new |
| Aptitude (Doc 13) | Only if assessments are live | Otherwise dropped. It has done its job |
| Behavioural (Doc 14) | Weekly, fully randomised | Someone else picks the story, with no warning. If nobody is available, shuffle a numbered list |
| English | Continuous | Oral revision weeks (29-30) are 45-minute unbroken technical monologues. That is the most demanding English practice in the entire plan, and by now you should be able to do it |

<a id="S09-B0032"></a>

### What you will have built, in total

<a id="S09-B0033"></a>

| Artefact | Evidence it provides |
| --- | --- |
| Distributed job processing platform | Distributed systems reasoning, failure handling, scaling with measured numbers |
| RAG service with evaluation | AI systems literacy grounded in backend engineering, plus measurement discipline |
| ~300-350 logged DSA problems | Pattern recognition, with a re-solve history proving retention |
| 18+ timed system designs | Design fluency under a clock |
| 20 rehearsed STAR stories | Behavioural readiness across all 16 LPs |
| Master Notes across every topic | A permanent knowledge base you can revise from for years |
| 8 months of daily journal entries | The raw material for every future behavioural interview |

<a id="S09-B0034"></a>

That portfolio does not expire when this plan ends. Whatever happens in Month 8, you are a materially different engineer from the one who started - and the artefacts stay yours.

<a id="RM"></a>

## RM — Software_Engineer_6_8_Month_Master_Roadmap

Full source content: [Software_Engineer_6_8_Month_Master_Roadmap.docx](../SOURCE_LIBRARY/Software_Engineer_6_8_Month_Master_Roadmap.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="RM-B0001"></a>

6–8 Month Software Engineer Transformation Roadmap

<a id="RM-B0002"></a>

Primary stack: C# / .NET / ASP.NET Core | Goal: Deep engineering knowledge + top product-company interview readiness

<a id="RM-B0003"></a>

### How to use this course

<a id="RM-B0004"></a>

This is not an interview-cramming plan. The goal is to turn practical development experience into deep software-engineering understanding. Interviews are the final validation: DSA, system design, low-level design, behavioral communication, and technical depth.

<a id="RM-B0005"></a>

- Monday–Friday: 2 focused hours/day.

<a id="RM-B0006"></a>

- Saturday–Sunday: full study/build days; use them for project work, deeper topics, tests, and revision.

<a id="RM-B0007"></a>

- Every concept follows: Learn → Understand → Explain → Code → Recall → Apply → Revise.

<a id="RM-B0008"></a>

- Use active recall instead of rereading. Close the notes and explain concepts from memory.

<a id="RM-B0009"></a>

- Revision cadence: Day 1, Day 3, Day 7, Day 14, Day 30.

<a id="RM-B0010"></a>

- Maintain one Master Notes document and one Roadmap/Revision Tracker. Do not write giant notes; capture the mental model, why, internals, example, pitfalls, and questions.

<a id="RM-B0011"></a>

### Target outcome by Month 6

<a id="RM-B0012"></a>

- Strong C# and modern .NET fundamentals rather than framework-only usage.

<a id="RM-B0013"></a>

- Interview-ready DSA with pattern recognition and complexity analysis.

<a id="RM-B0014"></a>

- Solid CS fundamentals: networking, operating systems, databases, concurrency.

<a id="RM-B0015"></a>

- Ability to design backend systems and explain trade-offs.

<a id="RM-B0016"></a>

- Ability to discuss distributed systems, queues, caching, retries, idempotency, scaling, and failures.

<a id="RM-B0017"></a>

- One serious distributed backend project that demonstrates engineering depth.

<a id="RM-B0018"></a>

- Behavioral stories based on real work experience.

<a id="RM-B0019"></a>

- Clear, simple technical English—not perfect English.

<a id="RM-B0020"></a>

- Begin applications in Month 6; use Months 6–8 for interview conversion and deeper specialization.

<a id="RM-B0021"></a>

### Your weekly operating system

<a id="RM-B0022"></a>

| Day | Time | Primary work |
| --- | --- | --- |
| Mon | 2h | C#/.NET deep learning + DSA |
| Tue | 2h | C#/.NET/CS + DSA |
| Wed | 2h | Backend/DB/Networking + DSA |
| Thu | 2h | CS/System Design + DSA |
| Fri | 2h | Revision + active recall + weekly interview questions |
| Sat | Full day | Deep topic + project + DSA + speaking |
| Sun | Full day | Project + weekly test + revision + planning |

<a id="RM-B0023"></a>

### Month 1 — C# + .NET Foundations + DSA Basics

<a id="RM-B0024"></a>

### Week 1: C# types, value/reference types, stack/heap mental model, classes, objects, constructors, access modifiers. DSA: Big-O, arrays.

<a id="RM-B0025"></a>

### Week 2: OOP, inheritance, polymorphism, abstraction, interfaces, composition. DSA: strings, HashMap/HashSet.

<a id="RM-B0026"></a>

### Week 3: Collections, IEnumerable/ICollection/IList/IQueryable, LINQ, deferred execution, delegates, lambdas. DSA: two pointers, sliding window.

<a id="RM-B0027"></a>

### Week 4: async/await, Task, exceptions, IDisposable, using, dependency injection basics. DSA: stack, queue, binary search.

<a id="RM-B0028"></a>

- Outcome: explain what you use in C# instead of only knowing syntax. Build small console/API exercises.

<a id="RM-B0029"></a>

### Month 2 — Advanced C# + ASP.NET Core + SQL

<a id="RM-B0030"></a>

### Week 5: Task vs Thread, thread pool, concurrency vs parallelism, lock, race conditions, deadlocks, CancellationToken.

<a id="RM-B0031"></a>

### Week 6: .NET Framework vs modern .NET, CLR/runtime/SDK, ASP.NET Core hosting, Kestrel, middleware, request pipeline, configuration, logging.

<a id="RM-B0032"></a>

### Week 7: Web API architecture, controllers, services, DI lifetimes, authentication/authorization, JWT, EF Core, tracking vs no-tracking.

<a id="RM-B0033"></a>

### Week 8: SQL deeply: indexes, execution plans, joins, transactions, ACID, isolation levels, locks, deadlocks, normalization/denormalization.

<a id="RM-B0034"></a>

- DSA: linked lists, recursion, trees, BST, heap. Start timed easy/medium problems.

<a id="RM-B0035"></a>

### Month 3 — CS Fundamentals + Networking + Concurrency + System Design Basics

<a id="RM-B0036"></a>

### Week 9: HTTP, DNS, TCP, TLS, REST, HTTP methods/status codes, connection lifecycle, WebSockets and SignalR.

<a id="RM-B0037"></a>

### Week 10: OS fundamentals: process, thread, memory, scheduling, synchronization, deadlock.

<a id="RM-B0038"></a>

### Week 11: Databases: storage/index concepts, transactions, isolation, replication basics, SQL vs NoSQL, caching basics.

<a id="RM-B0039"></a>

### Week 12: queues and asynchronous systems: SQS/RabbitMQ concepts, producer/consumer, acknowledgements, retries, DLQ, idempotency, ordering.

<a id="RM-B0040"></a>

- System Design starts: URL shortener, rate limiter, notification service. DSA continues with graphs/BFS/DFS and intervals.

<a id="RM-B0041"></a>

### Month 4 — LLD + Distributed Systems + Project Build

<a id="RM-B0042"></a>

### Week 13: SOLID and object-oriented design. Implement Parking Lot and Logger in C#.

<a id="RM-B0043"></a>

### Week 14: design patterns: Strategy, Factory, Observer, Adapter, Decorator, Builder. Apply them only where useful.

<a id="RM-B0044"></a>

### Week 15: distributed systems: load balancing, caching, replication, sharding, partitioning, eventual consistency, CAP concepts.

<a id="RM-B0045"></a>

### Week 16: Project Phase 1 — Distributed Job Processing Platform: requirements, architecture, API, PostgreSQL schema, queue, worker model.

<a id="RM-B0046"></a>

- DSA: medium-heavy practice. System design: file storage, chat, job processing.

<a id="RM-B0047"></a>

### Month 5 — Advanced System Design + Project + Behavioral

<a id="RM-B0048"></a>

### Week 17: Project Phase 2 — retries, exponential backoff, DLQ, idempotency, priority, worker scaling.

<a id="RM-B0049"></a>

### Week 18: Project Phase 3 — Redis, rate limiting, authentication, structured logging, metrics, health checks.

<a id="RM-B0050"></a>

### Week 19: Project Phase 4 — Docker, CI/CD, AWS deployment, load testing, failure testing, performance measurement.

<a id="RM-B0051"></a>

### Week 20: system design: notification platform, ecommerce/order processing, payment workflow, feed, large-scale messaging.

<a id="RM-B0052"></a>

- Behavioral: build STAR stories from real work: performance optimization, production issue, disagreement, ownership, failure, difficult requirement, collaboration.

<a id="RM-B0053"></a>

### Month 6 — Interview Launch Month

<a id="RM-B0054"></a>

- DSA: timed medium problems, pattern revision, weak-area repair. Add selected hard problems only where useful.

<a id="RM-B0055"></a>

- System Design: 2–3 timed designs/week. Practice requirements, API, data model, high-level architecture, scaling, failure handling, trade-offs.

<a id="RM-B0056"></a>

- LLD: 1–2 designs/week in C#.

<a id="RM-B0057"></a>

- Behavioral: 8–12 polished STAR stories; practice speaking without memorized scripts.

<a id="RM-B0058"></a>

- Resume/project: polish GitHub README, architecture diagrams, benchmarks, trade-offs, tests, deployment, and project explanation.

<a id="RM-B0059"></a>

- Start applications. Use early interviews as calibration; keep studying while interviewing.

<a id="RM-B0060"></a>

### Month 7 — Interview Conversion + Advanced Gaps

<a id="RM-B0061"></a>

- Analyze every interview: DSA pattern missed, CS gap, communication gap, design gap.

<a id="RM-B0062"></a>

- Target company-specific interview patterns while preserving fundamentals.

<a id="RM-B0063"></a>

- Advanced distributed systems: Kafka concepts, consumer groups, partitioning, ordering, outbox, saga, circuit breaker, observability.

<a id="RM-B0064"></a>

- Do weekly full mock loops: DSA + system design/LLD + behavioral.

<a id="RM-B0065"></a>

- Continue project improvements only when they create a strong engineering story.

<a id="RM-B0066"></a>

### Month 8 — Peak Performance / Optional Extension

<a id="RM-B0067"></a>

- Consolidate rather than endlessly adding topics.

<a id="RM-B0068"></a>

- DSA: repeat missed problems from memory; maintain a personal pattern sheet.

<a id="RM-B0069"></a>

- System design: 10–15 canonical designs from scratch.

<a id="RM-B0070"></a>

- CS: oral revision of C#, .NET, DB, OS, networking, distributed systems.

<a id="RM-B0071"></a>

- Behavioral: randomized question practice.

<a id="RM-B0072"></a>

- Applications/interviews continue. Use the month to close specific weaknesses rather than follow a fixed syllabus.

<a id="RM-B0073"></a>

### Master topic map

<a id="RM-B0074"></a>

C#: Types; memory; OOP; interfaces; generics; collections; LINQ; delegates/events; exceptions; IDisposable; async/await; Task; threading; concurrency; GC; reflection/attributes basics; performance.

<a id="RM-B0075"></a>

.NET / ASP.NET Core: Framework vs modern .NET; CLR/runtime/SDK; hosting; Kestrel; middleware; request pipeline; DI; configuration; logging; Web API; authentication; authorization; JWT; EF Core; background services; caching; testing.

<a id="RM-B0076"></a>

DSA: Big-O; arrays; strings; hashing; two pointers; sliding window; stack/queue; binary search; linked lists; recursion; trees; heaps; graphs; intervals; greedy; backtracking; dynamic programming.

<a id="RM-B0077"></a>

Databases: SQL; indexes; query plans; joins; transactions; ACID; isolation; locks; deadlocks; normalization; denormalization; replication; partitioning; SQL vs NoSQL.

<a id="RM-B0078"></a>

Networking: DNS; TCP; TLS; HTTP/HTTPS; REST; WebSockets; SignalR; load balancers; connection lifecycle.

<a id="RM-B0079"></a>

Distributed systems: Queues; pub/sub; caching; retries; DLQ; idempotency; ordering; consistency; replication; sharding; partitioning; rate limiting; circuit breakers; distributed locks; outbox/saga concepts; observability.

<a id="RM-B0080"></a>

System Design: Requirements; APIs; data model; architecture; bottlenecks; scaling; cache; queue; database choice; failure handling; monitoring; trade-offs.

<a id="RM-B0081"></a>

LLD: SOLID; composition; interfaces; Strategy; Factory; Observer; Adapter; Decorator; Builder; clean code; testability.

<a id="RM-B0082"></a>

Engineering practice: Git; code review; testing; Docker; CI/CD; security; performance profiling; logging; metrics; deployment.

<a id="RM-B0083"></a>

Communication: Self-introduction; explain a technical concept simply; clarify requirements; think aloud; STAR behavioral stories; concise English.

<a id="RM-B0084"></a>

### Memory system — mandatory

<a id="RM-B0085"></a>

- Keep a one-page concept note for each major topic.

<a id="RM-B0086"></a>

- After learning, close the material and explain it from memory.

<a id="RM-B0087"></a>

- Use Day 1 / 3 / 7 / 14 / 30 retrieval reviews.

<a id="RM-B0088"></a>

- Every Sunday, take a no-notes weekly test.

<a id="RM-B0089"></a>

- Every month, take a cumulative test covering old topics.

<a id="RM-B0090"></a>

- Keep a 'Forgotten / Weak' list. Anything you miss returns to the next review cycle.

<a id="RM-B0091"></a>

- For important concepts, implement a tiny example and explain one real production use case.

<a id="RM-B0092"></a>

- Do not measure progress by videos watched. Measure: problems solved, concepts recalled, designs completed, project milestones, and mock performance.

<a id="RM-B0093"></a>

### DSA rule

<a id="RM-B0094"></a>

Do not chase a problem count. Aim for pattern recognition. For every problem record: brute force, optimized idea, why it works, time complexity, space complexity, and one variation. Re-solve missed problems after 1, 3, 7, and 14 days.

<a id="RM-B0095"></a>

### System Design rule

<a id="RM-B0096"></a>

Never memorize a diagram. For every design: clarify requirements → estimate scale → define APIs → choose data model → propose architecture → identify bottlenecks → add cache/queue/scaling → discuss failures and consistency → explain trade-offs.

<a id="RM-B0097"></a>

### Project: Distributed Job Processing Platform

<a id="RM-B0098"></a>

- ASP.NET Core API for submitting and querying jobs.

<a id="RM-B0099"></a>

- PostgreSQL for durable job metadata.

<a id="RM-B0100"></a>

- Queue for asynchronous processing.

<a id="RM-B0101"></a>

- Multiple workers for horizontal scaling.

<a id="RM-B0102"></a>

- Redis for caching/rate limiting where appropriate.

<a id="RM-B0103"></a>

- Retries with backoff and dead-letter handling.

<a id="RM-B0104"></a>

- Idempotency and duplicate-message handling.

<a id="RM-B0105"></a>

- Priority and worker concurrency controls.

<a id="RM-B0106"></a>

- Authentication/authorization.

<a id="RM-B0107"></a>

- Structured logs, metrics, health checks and failure simulation.

<a id="RM-B0108"></a>

- Docker + CI/CD + AWS deployment.

<a id="RM-B0109"></a>

- Load testing and a written performance/architecture report.

<a id="RM-B0110"></a>

### Weekly test template

<a id="RM-B0111"></a>

- Explain 5 concepts without notes.

<a id="RM-B0112"></a>

- Solve 2 DSA problems under time pressure.

<a id="RM-B0113"></a>

- Explain 1 system design for 10–15 minutes.

<a id="RM-B0114"></a>

- Implement 1 small C# example from memory.

<a id="RM-B0115"></a>

- Speak for 2 minutes about one technical topic in English.

<a id="RM-B0116"></a>

- Write down 3 things you forgot and schedule them for review.

<a id="RM-B0117"></a>

### Definition of 'ready to apply'

<a id="RM-B0118"></a>

You do not need to know everything. Begin applying in Month 6 when you can consistently solve common medium DSA patterns, explain core C#/.NET/DB/networking concepts, complete a 45-minute system design conversation, explain your project deeply, and answer behavioral questions using real experience. Months 6–8 are intentionally both learning and interview periods.

<a id="RM-B0119"></a>

### Compact version of the plan

<a id="RM-B0120"></a>

6–8 months | 2 hours Mon–Fri + full weekends. M1: C#/.NET foundations + DSA basics. M2: advanced C#/.NET + SQL + concurrency. M3: OS + networking + databases + queues + first system design. M4: LLD + distributed systems + start serious project. M5: finish/deploy project + advanced system design + behavioral. M6: interview launch + timed DSA/design + mocks + applications. M7: analyze interviews + advanced distributed systems + company-specific preparation. M8: optional consolidation and interview conversion. Use active recall and 1/3/7/14/30-day spaced reviews throughout.
