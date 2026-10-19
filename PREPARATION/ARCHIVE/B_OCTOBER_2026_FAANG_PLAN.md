# Archive B — 11–12 October 2026 FAANG-Master-Plan (summary, schedule, audit, start guide)

> **Superseded — do not follow this as a plan.** It is kept word for word so that nothing from the old folders is lost. Everything useful in it has been merged into [the plan](../PLAN.md) and [the week files](../WEEKS/). Where it conflicts with the plan, the plan wins. Known errors in these old texts are listed in [CORRECTIONS.md](../CORRECTIONS.md#archive-known-errors).

## FAANG-Master-Plan/README.md

### 🚀 FAANG/MAANG 6–8 Month Master Plan & Automated Tracker

**Rebuilt 13 October 2026:** Use [the complete preparation collection](../FINAL-PLAN/START_HERE.md) for full notes and Q&A, every granular topic, the 6–8 month sequence and daily tracking. [Coverage report](../FINAL-PLAN/COVERAGE_REPORT.md) records preservation of original details. The older descriptions and schedules below remain available as reference history.

Welcome to your redesigned, zero-friction engineering transformation system.

---

#### 📂 What is Inside This Folder?

1. [00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM.md](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM.md)
   * The 2-hour weekday + weekend operating model.
   * Core philosophy: Build & Code > Read & Memorize.
   * High-level 32-week roadmap phases.
2. [01_PROJECT_BLUEPRINT_DISTRIBUTED_AI_ENGINE.md](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/01_PROJECT_BLUEPRINT_DISTRIBUTED_AI_ENGINE.md)
   * Complete specification for **`NexusQueue`**, your distributed task & AI engine.
   * When to build each phase (Weeks 11–20 weekends), architecture diagrams, tech stack, and load benchmark defense (5,000 RPS).
3. [02_GRANULAR_CURRICULUM_ENCYCLOPEDIA.md](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/02_GRANULAR_CURRICULUM_ENCYCLOPEDIA.md)
   * Granular micro-details for every DSA pattern (Arrays, Two Pointers, Sliding Window, Monotonic Stack, Trees, Graphs, DP).
   * 7 LLD machine coding anchor problems in C#.
   * 8 HLD distributed system anchor designs & SPOF elimination.
   * DevOps (Docker, K8s, CI/CD) and AI engineering (Embeddings, pgvector, Semantic Kernel RAG).
   * 6 core STAR behavioral stories.
4. [03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE.md](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE.md)
   * Exhaustive day-by-day plan mapping all 224 days (Days 1 to 224).
   * Exact topic, target problems/deliverables, and time allocation.
5. [TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv)
   * Ready-to-import CSV file containing all 224 days.

---

#### 📊 How to Import the Tracker into Google Sheets (Takes 60 Seconds)

1. Open [Google Sheets](https://sheets.new) in your browser.
2. Click **File** $\to$ **Import** $\to$ **Upload**.
3. Select [TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv](file:///d:/RAHUL/Interview/Learning/FAANG-Master-Plan/TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv).
4. Choose **"Replace current sheet"** and click **Import data**.
5. Select the entire **`Status_Done`** column (Column I, rows 2 to 225), click **Insert** in the top menu $\to$ **Checkbox**.
6. *(Optional Progress Stat)*: In a top cell, add `=COUNTIF(I2:I225, TRUE) / 224` and format as percentage `%` to see your live completion rate.

**Daily Logging:** At the end of your 2-hour session, open Google Sheets on your phone or laptop, tap the checkbox for today, and write a 1-sentence note. Total time spent tracking: **10 seconds!**

## FAANG-Master-Plan/00_EXECUTIVE_SUMMARY_AND_OPERATING_SYSTEM.md

### 🎯 FAANG/MAANG 6–8 Month Master Operating System

**Candidate:** Rahul Patel  
**Target Role:** SDE-2 / Backend Software Engineer II (Google L4, Amazon L5, Microsoft SDE-2, Meta E4, Uber L4, Atlassian)  
**Primary Stack:** C# / .NET 8 / ASP.NET Core / PostgreSQL / Redis / RabbitMQ / AWS / Docker / Kubernetes / AI (Semantic Kernel & pgvector)  
**Time Commitment:** 2 focused hours/day (Monday–Friday) + Deep Work blocks (Saturday & Sunday)  
**Timeline:** 32 Weeks (8 Months) | Launch Applications: Month 6 (Week 21)  

---

#### 1. The Core Philosophy: "Build & Code > Read & Memorize"

Most engineers fail FAANG interviews for two reasons:
1. **Passive Consumption:** They watch tutorials, read books, or memorize LeetCode solutions without writing the code from scratch under timed conditions.
2. **Textbook Trivia Trap:** They spend months reading CLR memory models or academic OS theory that FAANG interviewers never ask, while neglecting the actual evaluation criteria: **Live Coding (DSA), Low-Level Design (Machine Coding), High-Level Distributed Architecture (HLD), and Behavioral Leadership (STAR).**

##### Your Operating Rules:
* **The 25-Minute Coding Rule:** When practicing a DSA problem, never look at the solution before 25 minutes of hard independent thinking on paper/whiteboard first.
* **The Code-It-Out LLD Rule:** Never just draw UML diagrams for LLD. Write the actual C# classes, interfaces, and unit tests in your IDE.
* **The Hands-On Project Rule:** You don't just "read about" Kafka or Redis; you run them in Docker, produce failure conditions, measure latency, and write the code.
* **The 1-Click Logging Rule:** Tracking takes **under 2 minutes** at the end of each session. No bloated 30-minute spreadsheet management.

---

#### 2. The 2-Hour Weekday vs Weekend Operating Rhythm

##### ⏱️ Weekday Routine (Monday to Friday — Exactly 120 Minutes)
| Time | Duration | Activity | Purpose |
| :--- | :--- | :--- | :--- |
| **00:00 – 00:15** | 15 min | **Active Recall Drill** | Explain yesterday's pattern out loud with notes closed. Active retrieval stops the forgetting curve. |
| **00:15 – 01:45** | 90 min | **Single Focus: DSA Pattern Mastery** | Learn 1 specific sub-pattern mechanism $\to$ solve 1–2 curated LeetCode Medium problems in C# from scratch. |
| **01:45 – 01:55** | 10 min | **Complexity & Edge Case Review** | Explicitly state Time $O$ and Space $O$, identify edge cases (null, empty, duplicates, overflow). |
| **01:55 – 02:00** | 5 min | **1-Click Tracking** | Check the box in your Google Sheet tracker and write a 1-sentence takeaway. Done. |

---

##### ⏱️ Weekend Routine (Saturday & Sunday — 5 to 6 Hours Deep Work)
Weekends are where you build seniority and real engineering depth without weekday time pressure:

###### Saturday: Low-Level Design & DevOps Engineering (5 Hours)
* **Block 1 (3 Hours): LLD & Machine Coding in C#**
  * Object-Oriented Domain Modeling, SOLID refactoring, applying GoF Design Patterns.
  * Implement full working systems (Parking Lot, Elevator, Rate Limiter, LRU Cache) with clean interfaces and thread safety.
* **Block 2 (2 Hours): DevOps & Container Infrastructure**
  * Docker multi-stage builds, Docker Compose, Kubernetes manifests, GitHub Actions CI/CD pipelines.

###### Sunday: Distributed Systems (HLD), Project Build & Behavioral (5 Hours)
* **Block 1 (2.5 Hours): High-Level System Design (HLD)**
  * Deep dive into 1 anchor system (e.g., TinyURL, WhatsApp, Uber, Distributed Job Scheduler).
  * Capacity estimation, data modeling, API contracts, SPOF elimination, scaling trade-offs.
* **Block 2 (1.5 Hours): Distributed Project & AI Integration**
  * Hands-on coding of the **Distributed Job & AI Task Engine** (Queues, Redis locks, Idempotency, pgvector RAG).
* **Block 3 (1.0 Hour): Behavioral STAR Drills & Weekly Spaced Review**
  * Speak 1 STAR story out loud in clear technical English.
  * Cumulative self-test of concepts from Day 1, 3, 7, 14, 30.

---

#### 3. High-Level Timeline Across the 8 Months

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

## FAANG-Master-Plan/03_WEEK_BY_WEEK_DAY_BY_DAY_SCHEDULE.md

### 🗓️ Master 32-Week Day-by-Day Execution Schedule
*(Fully Integrated with CodeWithShubham DSA & CodeLLDWithShubham Mindmaps)*

**Rhythm:** Weekdays = 2 Hours (DSA Single Focus). Saturdays = LLD + DevOps. Sundays = HLD + AI/Project + STAR.

---

#### 📌 Phase 1: Algorithmic Mastery & LLD Foundations (Weeks 1 – 8)

##### Week 1: Arrays, Kadane, Prefix Sums & Dutch National Flag
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

##### Week 2: Two Pointers & String Fundamentals
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

##### Week 3: Sliding Window & String Pattern Matching (KMP, Rabin-Karp)
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

##### Week 4: Stack Patterns (Monotonic, Parentheses, Expressions) & Queue
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

##### Week 5: Binary Search (Arrays & Answer Space)
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

##### Week 6: Linked List Reversals & Floyd's Cycle Detection
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

##### Week 7: Binary Trees, Views & Tree DP
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

##### Week 8: BST, Heaps & Tries
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

#### 📌 Phase 2: Advanced DSA, HLD & Project Core Build (Weeks 9 – 16)

##### Week 9: Graphs — Traversals, Cycle Detection & Topological Sort
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

##### Week 10: Graphs — Shortest Paths (Dijkstra, Bellman-Ford) & DSU
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

##### Weeks 11–13: Dynamic Programming (1D, Knapsack, LCS, LIS) & Project Phase 1
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

##### Weeks 14–16: Grid DP, MCM, All 8 Sorting Algorithms, Range Queries & Project Phase 2
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

#### 📌 Phase 3: Project AI/Cloud, Anchor HLD Mastery & Timed DSA (Weeks 17 – 20)

##### Weeks 17–18: Project AI/RAG Pipeline & Anchor HLDs
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

##### Weeks 19–20: Kubernetes Deployment, Load Benchmark & HLD Capstone
* **Project Phase 4 & 5 Build (Weekends):**
  * Multi-stage Dockerfile (~90MB Alpine).
  * Kubernetes manifests with **KEDA autoscaling** on RabbitMQ queue depth.
  * Prometheus metrics export & Grafana dashboard for RPS, P95/P99 latency, and DLQ counts.
  * `k6` load test benchmark simulating 5,000 RPS. Document failure resilience in README.
* **Anchor HLD 8:**
  * **Design Hotel Booking System** (Distributed Saga transactions, avoiding double-bookings).
* **Behavioral:** Rehearse all 6 STAR stories out loud in clear technical English.

---

#### 📌 Phase 4: Interview Launch, Full Mocks & Referral Pipeline (Weeks 21 – 24)

* **Week 21 (Launch Applications):**
  * Update ATS resume with the load-tested `NexusQueue` project and GitHub link.
  * Launch referral outreach on LinkedIn for Amazon, Google, Microsoft, Meta, Uber, and top Indian unicorns.
* **Daily DSA Routine:** 45-minute timed mock coding sprints.
* **Weekly Weekend Routine:**
  * 2 live mock interviews per week (Pramp / peer mocks) covering 1 DSA + 1 System Design (HLD/LLD).
  * Amazon Leadership Principles deep dive (preparing 2 distinct stories for all 16 Leadership Principles).

---

#### 📌 Phase 5: Peak Conversion, Gap Repair & Multi-Offer Negotiation (Weeks 25 – 32)

* Active interview rounds and onsite loops.
* Daily 30-minute rapid review of the [Q-and-A/](file:///d:/RAHUL/Interview/Learning/Q-and-A) guides.
* Closing any specific feedback gaps from early interviews.
* Negotiating compensation, counter-offers, and sign-on bonuses.

## FAANG-Master-Plan/04_FOLDER_AUDIT_2026_10_12.md

### Preparation folder audit

Reviewed 12 October 2026. This is an assessment of the local preparation material, not an assessment of your ability. You confirmed during this review that you have not completed the preparation yet and that broad instructions such as “do arrays” do not tell you how to begin.

**Conclusion:** You already have broad topic coverage. The largest gaps are precise beginner instructions, consistent sequencing, realistic allocation of time, practical evidence, and accuracy checks. Adding more advanced topic names would make this worse. Use the new [start guide](./05_START_HERE_BASIC_TO_ADVANCED.md) as the proposed execution order; retain the existing documents as references.

#### Scope and evidence

I inventoried the workspace, extracted text from the Word documents and PDFs, read the planning Markdown and preparation-app source, and inspected all 12 workbook tabs and the 224-row CSV. I inspected the roadmap PDF visually because its main content is images, and inspected the generic HLD diagram. I reviewed the resumes for consistency with the proposed interview stories. This was a content and preparation audit, not a full line-by-line fact check of every answer, a document-layout audit, or a browser test of the app.

The Word temporary lock file beginning `~$` is not a study document. The external websites linked from the saved HTML/PDF references were not exhaustively crawled. Immigration and compensation claims in the career material were not revalidated in this audit; they should not be used as current advice.

| Material | Useful content | Finding |
|---|---|---|
| `CONTEXT.md` | Your original goals, practical experience, learning difficulties, time budget and honesty rules | Some status statements are dated August. Your confirmation today establishes a fresh preparation start. |
| `Study-Plan/THE_PLAN.docx` and monthly documents | Balanced .NET, CS, DSA, design, recall and communication | Better engineering breadth than the newer daily schedule, but still dense for a beginner and contains rigid interview claims. |
| `Q-and-A` | Explanations, invariants, trade-offs, advanced distributed concepts, revision | Useful after learning and attempting an example. Several answers need corrections; do not memorize verbatim. |
| `Devlopment/C#/Arrays.docx` | Array fundamentals, simple exercises and pattern progression | Closest existing document to the granularity you need. It needs a bounded sequence, daily exercises and a completion test. |
| `FAANG-Master-Plan/00...03` | DSA pattern catalog, machine-coding cases, project and timeline | Strong topic inventory, but weekday DSA displaces .NET/SQL; hard topics arrive too early; different files disagree. |
| `Study-Plan/TRACKER.xlsx` | 224 days, weak list, review ladder, designs, stories and applications | Daily completion cells are blank. DSA and WEAK contain examples but no further problem/weakness entries. This is setup, not evidence of mastery. |
| `TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv` | Actual day-level assignments | All 224 `Status_Done` values are FALSE. More detailed than the Markdown after Week 10, but inconsistent with it. |
| `prep-app` | Useful interface concept and local backup mechanism | Its supplied day array is empty; story examples contain unsupported details. See defects below. |
| Resume variants | Work-based material for behavioral and technical deep dives | Use verified contributions, with personal role and measurement method. The app's added incidents/metrics are not substantiated by these resumes. |
| PDFs, image, saved embeds and board JSON | Supplemental design lists, roadmap and architecture vocabulary | Both board JSON files contain `Request coercion failed`, not mindmap data. A claim to have fully imported every original branch is therefore unverified from these files. |

No C# solution/project, implemented DSA exercise collection, or distributed job platform source was found in this workspace inventory. That says nothing about code you keep elsewhere.

#### What is already covered

Do not buy or assemble another general curriculum to cover these again:

- DSA: arrays, strings, hashing, pointers, windows, stacks, queues, linked lists, binary search, trees, heaps, graphs, recursion, backtracking, DP, intervals, greedy, tries, bit operations and advanced range queries.
- C#/.NET: type semantics, OOP, generics, collections, LINQ, delegates, memory, GC, async, concurrency, runtime, ASP.NET Core, DI, EF Core and basic testing.
- CS/data: networking, HTTP/TLS/DNS, OS, transactions, indexing, query plans, replication, partitioning and caching.
- Distributed systems: outbox, sagas, idempotency, delivery semantics, fencing, consensus concepts, observability and recovery objectives.
- Career preparation: behavioral framework, English practice, project defense, applications, resume variants and interview review.
- Infrastructure and AI: Docker, CI/CD, AWS, some Kubernetes, AI-assisted development, MCP and RAG.

The distinction matters: **a topic being present in a reference is different from being scheduled, practiced, recalled and independently demonstrated.**

#### Priority findings

##### 1. Competing operating plans create uncertainty

The older daily routine allocates 65 minutes to .NET/CS and 40 minutes to DSA. The newer routine allocates 90 minutes to DSA and moves nearly everything else to weekends. Neither allocation should be followed alongside the other.

The newer project starts around Week 11; the older project build starts mainly around Week 16. The newer Markdown groups Weeks 11–16 into broad blocks despite its “day-by-day” title. Its CSV is more explicit: recursion/backtracking exercises appear on Days 88–89, after DP starts on Day 71. Greedy and bits are present on Days 92–95 even though the corresponding Markdown block does not describe them clearly. They are not entirely missing; the sequencing and synchronization are wrong.

**Recommendation:** one execution guide, one progress record, existing documents used only when the current topic calls for them. Teach recursion and backtracking before DP.

##### 2. The difficulty ramp does not match a fresh start

Week 1 assigns First Missing Positive. Week 4 assigns Largest Rectangle in Histogram and Maximal Rectangle together. These are poor compulsory early milestones for someone still learning how to traverse and reason about arrays.

**Recommendation:** basic operations → simple exercises → brute force → one pattern → variations → mixed problems → delayed re-solve. Move difficult extensions behind a readiness check.

##### 3. Security is present but incomplete

Authentication, JWT, CORS, secrets and cross-tenant checks exist. The inspected study material lacks a clear practical sequence for object/function authorization, CSRF versus CORS, SSRF, mass assignment, request limits, safe file handling, token validation/rotation and abuse prevention.

**Add:** a small threat model and negative tests to the project, including “tenant A cannot fetch tenant B's job even when it knows the ID.” This aligns with the [OWASP API security risk catalog](https://api-security.owasp.org/editions/2023/en/0x11-t10/).

##### 4. Engineering practice needs more executable exercises

Unit/integration testing and diagnostics are already named. Less developed areas include deterministic time-based tests, API/message contract evolution, safe migrations and rollback, real backup restoration, outbound HTTP lifetime/timeouts, and incident diagnosis from evidence.

**Add:** one focused lab for each, integrated into the same backend project. Do not create separate large projects for all of them.

##### 5. Important reliability concepts disappear from the newer project

The old project explicitly includes a transactional outbox, tenant isolation, fairness, heartbeats and recovery. The newer blueprint centers Redis locks and AI/Kubernetes, while its architecture shows a database write and a queue publish without an explicit outbox transaction.

**Recommendation:** restore durable submission and recovery before adding AI or autoscaling. The [AWS outbox guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) explains the dual-write problem and why consumers still need idempotency.

##### 6. Exactly-once claims need a precise boundary

The old project promises every job completes exactly once. Its suggested “insert processed ID first, then skip duplicates” is unsafe if that marker commits before the side effect and the worker crashes. Doing the side effect first has the opposite failure window.

For database-local effects, atomically commit the deduplication record and business change in one transaction. For external email/payment/API effects, require downstream idempotency support or document reconciliation and residual risk. A TTL cache or lock alone does not provide a universal exactly-once guarantee. [Redis's locking documentation](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) itself discusses failure assumptions and ownership-safe release.

Likewise, a killed-worker test can show behavior for that scenario; it cannot prove zero loss under every possible failure. State the tested failure model.

##### 7. Work stories and project numbers must be grounded in evidence

`prep-app/data.js` adds a 25-minute incident recovery, PgBouncer work, 99.99% uptime, zero failures and other detailed outcomes. I cannot substantiate these from the recorded experience. Treat these as unverified examples, never as facts about your work.

The newer project blueprint supplies a finished first-person story claiming 5,000 RPS and p99 below 45 ms before a project or measurement exists. These are neither observed results nor sensible universal pass criteria.

**Recommendation:** record actual benchmark environment, payload, offered load, successful throughput, queue age, latency and failures. Distinguish fast job acceptance from actual job completion. Build behavioral stories from your own recollection and evidence. [Amazon's official guide](https://www.amazon.jobs/content/en-gb/how-we-hire/sde-ii-interview-prep) asks for real past examples and appropriate metrics, alongside coding and design.

##### 8. The preparation app is not ready to run the plan

Confirmed by source inspection:

- `data.js` ends with `"days": []`.
- `index.html` loads `data.js` and `app.js`; no CSV import/population path was found.
- Mission rendering returns when no day data exists. The roadmap filters the same empty array.
- The header can still use 224 as a fallback denominator, which masks the missing schedule.
- Review reminders subtract 3/7/14/30 from the selected study-day number. They do not use the actual date a topic was learned or a failed-recall event.
- “Today” chooses the first unfinished item rather than resolving a start date against the calendar.

This was a static inspection; I did not modify or browser-test the app. Until repaired and verified, use a simple daily log or the existing workbook. Browser-local progress was not inspected.

#### Corrections to existing teaching material

| Location | Issue | Correct treatment |
|---|---|---|
| M2 Q&A, Q18 | Says putting CORS after routing breaks preflight | ASP.NET Core guidance places `UseCors` after `UseRouting` and before `UseAuthorization`; see [Microsoft](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0). |
| M1 Q&A and M8 revision | States interpolation boxes every value-type argument | Modern interpolated-string handlers can avoid boxing. Behavior depends on compiler, target and overload; see [Microsoft's C# 10 explanation](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/). |
| M1/M2 Q&A | Treats thread-pool injection as a fixed one/two threads per second | Heuristics vary by runtime and blocking behavior. Modern .NET has faster responses for recognized blocking; see [Microsoft diagnostics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/debug-threadpool-starvation). |
| M2 SQL material | Generic isolation behavior risks being applied identically to SQL Server and PostgreSQL | Teach engine-specific behavior: PostgreSQL Read Uncommitted behaves as Read Committed, and its Repeatable Read prevents phantoms. See [PostgreSQL](https://www.postgresql.org/docs/14/transaction-iso.html). |
| Monthly JWT prompts | “JWT cannot be revoked” is too absolute | A purely stateless verifier does not see revocation automatically. Denylists, session/version checks, introspection where applicable, and key/token lifecycle policies change that design. |
| New pattern encyclopedia | Claims all 23 GoF patterns, lists 5+10+7 = 22 | Interpreter is omitted; structural heading says 8 but lists 7. Strategy is behavioral and Builder is creational, contrary to labels in the schedule. Interpreter is low priority despite this completeness defect. |
| Project stack | New build hard-coded to .NET 8 | For a fresh project, prefer .NET 10 LTS after checking dependencies. .NET 8 support ends 10 November 2026, within the preparation period. See [support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core). |
| Older month docs 02, 04, 12 | Four references to deleted “Doc 00” remain | Resolve them to the appropriate parts of THE_PLAN during consolidation. |
| Workbook START C42 | Says five LLDs | THE_PLAN and the design list describe six. |

This is a targeted correction list, not a certification that every other statement is correct. Be especially cautious with absolute words such as always, never, guarantees, and every.

#### What to deprioritize

For general backend interview preparation, advanced segment/Fenwick trees, KMP/Z algorithms, bitmask DP, all GoF implementations, deep Kubernetes/KEDA and a large AI platform should not delay arrays, recursion, common graphs/DP, SQL, testing and design practice. They remain optional extensions or role-specific topics.

Aptitude should be conditional on a target assessment. Do not add it automatically on top of an already full two-hour day. Do not attempt to learn a second interview language just for prestige.

Do not assume exact cross-company level equivalence, a universal interview format, a mandatory public portfolio, or a fixed rejection cooldown. Confirm the role's process and tools with the recruiter. [Microsoft's technical interview guidance](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) emphasizes problem solving, coding, testing and role-relevant design; it does not require mastering every technology in this folder.

#### The practical decision

Start from the new granular guide. Use DSA as the largest weekly block; start small design and behavioral exercises early rather than waiting until DSA is “finished.” Preserve .NET depth and deliver one bounded backend project. Add AI after the core system is reliable. Review progress by independent performance, not calendar position or completed reading.

Existing plans, app, workbook and resumes were left unchanged. The two new Markdown files are proposed audit and execution documents, not silently applied changes to those originals.

## FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md — sections not stored in a notes chapter

Sections 3 (array stages), 4, 5, 6, 7, 8, 9, 10 and 11 of this guide are stored in NOTES and PROJECT.md. The rest is here.

### Your actionable six to eight month preparation guide

Prepared 12 October 2026 for Rahul. You confirmed that you have not completed the preparation yet. Your priority is DSA, system design, behavioral interviews, .NET from basics to advanced, Docker/CI/CD, and then the relevant AI material.

**Start with Day 1 below. You do not need to understand this entire guide before starting.** It defines the boundaries of each topic so “study arrays” becomes a set of concrete actions. Use the older Word documents as references when you reach their subject, not as additional assignments.

This is a backend/SDE-2 preparation curriculum, not a promise of a particular company or level. It covers a broad foundation with selected advanced depth. Mastering every corner of computer science in eight months is not a realistic objective.

#### 1. What you do today

Open a C# console project or the coding environment you already know. Do not spend the session configuring a new dashboard.

1. Create the array `[4, -2, 7, 7, 0]`.
2. Print its elements using a loop.
3. Write separate functions to calculate the sum, find the largest element and count occurrences of a target.
4. Predict what happens for an empty array before running the functions. Decide what your maximum function should return or throw for empty input.
5. Explain why accessing a known index is O(1), while finding a value in an unsorted array is O(n).
6. Copy the array variable to another variable, change one element through the second variable, and explain why the first sees the change. Then repeat using a cloned array.
7. Write one line: “I can do ___ independently; I still need help with ___.”

That is a complete first session. You do not need Two Sum, Kadane, Span, Kubernetes or system architecture today.

#### 2. Time and learning method

Assumption: 2 hours Monday–Friday and 5 focused hours on each weekend day, totaling **20 hours/week**. Breaks are outside focused time. If your sustainable weekend capacity is lower, use eight months and remove optional material. Do not borrow from sleep or assume commute time is required study time.

| Weekly allocation | Hours | What it buys |
|---|---:|---|
| DSA | 9 | Learning, independent solutions, mixed tests and re-solves |
| System design and LLD | 3 | Foundations initially; design and machine coding later |
| Behavioral and speaking | 1 | Real story collection, short explanations, mock answers |
| C#/.NET, SQL, CS and security | 3 | One focused topic and a small experiment |
| Project, Docker/CI/CD, later AI | 2 | A continuous bounded build; may borrow design time for implementation |
| Recall and weekly review | 1 | Old material tested without notes |
| Tracking and flexible time | 1 | Brief logging and inevitable overrun |

This allocation is a planning budget, not seven new daily obligations. Early project slots become small C# exercises. Later, project work can also provide the SQL, design and testing practice. Do not count the same hour twice or add every track on top of the budget.

##### The weekday two hours

| Minutes | Action |
|---|---|
| 0–10 | Recall an older concept or re-derive yesterday's approach without looking |
| 10–80 | DSA: one small lesson/exercise or one problem, including testing |
| 80–110 | One C#/.NET/SQL/CS topic and a tiny code experiment |
| 110–115 | Explain one decision aloud in simple English |
| 115–120 | Log the attempt, mistake and next review |

On Friday, use the same blocks for old mistakes and mixed practice rather than automatically adding new topics. If a problem occupies the full DSA slot, that is normal. “Two problems per day” is not a beginner requirement.

##### Every topic needs these six outputs

1. **Meaning:** define it in simple words.
2. **Mechanism:** draw or trace what changes step by step.
3. **Implementation:** write a small example without copying.
4. **Reasoning:** explain why it works and its cost or trade-offs.
5. **Failure case:** identify where the approach breaks or is inappropriate.
6. **Delayed recall:** repeat a small task after a gap.

For DSA, first clarify constraints, work a tiny example, propose brute force, locate repeated work, choose an improvement, code it, test it and state complexity. Learn an approach from a hint after 25–35 minutes of a serious stalled attempt; do not spend two hours staring. Close the explanation and reconstruct it yourself. Mark a hinted solution honestly.

Use AI for explanations, hints after an attempt, counterexamples and review of your reasoning. Independent attempts and mocks must be unassisted. An AI-generated solution is not a completed practice attempt.

##### One progress record

Use the existing workbook or a simple local note. The app needs repairs before it can run the schedule; see the audit. Record:

`Date | Topic/problem | Independent / hint / solution read | Main mistake | Complexity or trade-off | Next review | Code/note location`

Revisit weak items approximately after 1, 3, 7, 14 and 30 days, based on the **actual study date**. Prioritize failed recall; do not create an unmanageable queue by scheduling every trivial item five times. Limit daily recall to its time box and reserve Friday for the rest.

##### First fourteen days

Use the weekday timing above. Day numbers are study days starting from your actual start date. The 14-day plan deliberately moves slowly enough to establish the method.

| Day | DSA work | Supporting topic and concrete output |
|---|---|---|
| 1 | Today's seven steps from Section 1 | C#: array/reference copying demonstration |
| 2 | Linear search, minimum, maximum; trace loop bounds | Types, `int` vs `long`, integer division and overflow; show one example |
| 3 | Reverse an array using swaps; test 0, 1, odd and even lengths | Methods, parameters, return values; implement `Reverse` yourself |
| 4 | Check sorted order; second-largest distinct element | Conditions and edge cases; decide behavior when fewer than two distinct values exist |
| 5 | Reimplement Days 1–4 with no notes; repair the first failure | Value vs reference types; explain mutation versus reassignment |
| 6 — weekend | Trace insertion/deletion with shifting; List vs array; attempt Contains Duplicate with nested loops, then a set | 90 min DSA, 60 min C# collections, 45 min trace a simple API request, 30 min inventory real work stories, 45 min tiny console exercise/tests, 30 min review/buffer |
| 7 — weekend | Array checkpoint: small functions and two changed-input exercises | 90 min DSA assessment, 60 min repairs, 45 min HTTP client/server basics, 45 min assertions/tests, 30 min recorded explanation, 30 min rest/buffer |
| 8 | Frequency map using Dictionary; count each value | `TryGetValue`, missing keys, equality and hash codes at a practical level |
| 9 | Two Sum brute force; trace why one element cannot be reused | Set vs dictionary; write the input/output contract |
| 10 | Two Sum using a map; check before insert; duplicates such as `[3,3]` | C# loops and helper methods; state expected time and extra space |
| 11 | Move Zeroes using a reader/writer pointer | In-place changes; trace `[0,1,0,3,12]` and all-zero input |
| 12 | Re-solve a previously hinted task; mixed array question with no pattern label | Unit testing basics; turn five boundary cases into assertions |
| 13 — weekend | Remove Duplicates from Sorted Array; then Running Sum | 120 min DSA, 60 min C# classes/interfaces basics, 45 min model a small job submission API on paper, 30 min work-story outline, 45 min review/buffer |
| 14 — weekend | Re-solve Two Sum cold; implement range-sum queries from a prefix array | 120 min DSA/checkpoint, 60 min fix weakest prerequisite, 45 min persistence vs memory concept, 30 min explain a real work feature, 45 min next-week review/buffer |

If Days 9–10 take three sessions, shift the later tasks. Do not jump to the calendar's next algorithm while missing its prerequisite. If the simple exercises are already easy, demonstrate the checkpoint and advance rather than repeating them for a fixed number of days.

#### 12. Thirty-two week execution order

The tables above define each module; this table tells you when to use it. DSA stays the largest block. Behavioral and recall continue weekly even when not repeated in every row. A week means a unit of work, not proof that everything was learned in seven days.

| Week | DSA focus | Backend/design/build focus | End-of-week output |
|---|---|---|---|
| 1 | Array mechanics and costs | C# types, methods, reference semantics; API request basics | Array functions with boundary cases |
| 2 | Hashing, mutation, prefix basics | Collections/equality; simple tests; first real story | Two Sum and basic array tasks independently |
| 3 | Strings, two pointers, fixed windows | OOP/interfaces/composition; HTTP basics | Explain one pointer invariant and implement a small model |
| 4 | Variable windows, prefix plus map | LINQ/deferred execution, exceptions/resources | Month 1 assessment and weak-list repair |
| 5 | Binary search and sorting | Async/Task/cancellation; initial URL-shortener requirements | Binary search template plus cancellable I/O demo |
| 6 | Linked lists, stacks, queues | Concurrency/Channels; LLD logging exercise | Correct pointer updates and bounded producer/consumer |
| 7 | Recursion and backtracking | ASP.NET pipeline, DI, configuration; API skeleton | Subsets/permutations plus a tested endpoint |
| 8 | Tree traversals and BST | SQL queries/schema; first 30–45 minute design/mock | Tree invariant, query set, feedback record |
| 9 | Heaps and top-K | Indexes/plans; EF Core behavior | One query improvement measured |
| 10 | Graph BFS/DFS | Transactions/concurrency; rate-limiter design | Graph traversal plus reproduced database race |
| 11 | Topological order and DSU | OS/networking focused labs; job project data/API | Durable submission working |
| 12 | Dijkstra, intervals/greedy | Broker/worker; queue semantics; cumulative mock | End-to-end queued job plus mixed DSA assessment |
| 13 | DP recursion/memoization and 1D | Outbox and duplicate handling; notification design | Crash-before-publication test |
| 14 | Knapsack/counting DP | Durable idempotency and recovery; rate limiter LLD | Duplicate/crash test with correct transaction boundary |
| 15 | Grid/string DP, LIS | Authentication/authorization and API threats | Cross-tenant denial and invalid-input tests |
| 16 | Monotonic structures, bits, trie basics | Docker/Compose, CI; project review | Reproducible local build with test pipeline |
| 17 | Mixed patterns; repair weakest family | Retries/DLQ/replay/backpressure; chat design | Failure scenario report |
| 18 | Timed mixed coding | Deployment, logs/metrics/traces; feed design | Deployed bounded system and trace of one job |
| 19 | Unseen variations, selected harder follow-ups | Load test, backup restore, booking design | Honest benchmark and recovery report |
| 20 | Timed coding and re-solves | Project README/defense, LLD change request, real story review | Readiness checkpoint and reviewed resume content |
| 21 | Coding mock plus targeted repair | Design mock and recruiter/referral preparation | First suitable applications if readiness supports them |
| 22 | Mixed coding/assessment practice | Behavioral mock, role-specific design | Concrete follow-up repair from each mock |
| 23 | Two-round simulation | Code comprehension/debugging, SQL/API round as relevant | Work through unfamiliar code and test a fix |
| 24 | Cumulative assessment | Full project defense and interview loop practice | Six-month-core decision: apply, repair or extend |
| 25 | Weak-family repair | Kafka/streaming depth if relevant; schema evolution | Explain replay/order/failure trade-offs |
| 26 | Mixed mocks | Multi-region/failover and a recovery exercise | One prior design evolved under changed constraints |
| 27 | Timed maintenance | AI basics and small retrieval experiment | Small measured retrieval baseline |
| 28 | Mixed practice | Optional RAG/evaluation and MCP concepts | Evaluation results; no unsupported AI claims |
| 29 | Company/role-specific gaps | Optional search/location design or Kubernetes basics | Only the extension justified by a target role |
| 30 | Full mock loop | Behavioral follow-ups, experience depth | Prioritized last three weaknesses |
| 31 | Repair and interview practice | Active applications/interviews; role-fit questions | Evidence-backed interview review |
| 32 | Light maintenance and targeted practice | Consolidate, continue applications, evaluate fit | Sustainable continuation plan based on actual outcomes |

##### Six months versus eight months

Six calendar months provide about 26 weeks; eight provide about 35. The table deliberately uses 24 core weeks and 8 extension weeks, leaving roughly 2–3 weeks for illness, work pressure or difficult prerequisites.

If starting on **12 October 2026**, six calendar months ends **12 April 2027** and eight ends **12 June 2027**. The 32 scheduled weeks end **23 May 2027**, leaving buffer before the eight-month date. These are proposed dates; the existing workbook still has its August start and was not changed.

For six months, complete Weeks 1–24 plus repair buffer. Keep a small AI overview inside a project/review slot if wanted; defer the full RAG build, deep Kafka, Kubernetes, advanced range trees and most hard-DP extensions. Do not compress 32 weeks of assignments into 24 weeks unchanged.

For eight months, use Weeks 25–32 according to observed gaps. Interviews can run alongside them. A public project is useful evidence, but it is not a universal prerequisite for applying. Around Weeks 16–20, assess coding/design/experience readiness and opportunities; begin suitable applications when justified instead of waiting for every optional feature.

#### 13. Readiness checks

These are self-assessment guides, not official company pass marks. Use independent problems and feedback from another person when available.

| Point | Evidence to collect |
|---|---|
| Week 2 | Basic array functions, Two Sum reasoning, edge tests, reference/copy explanation |
| Week 4 | A fresh array/string task without a pattern hint; explain complexity and a C# example |
| Week 8 | Traversals/backtracking from scratch; one mock; small API and several SQL queries |
| Week 12 | Mixed array/tree/graph tasks; one coherent design with API/schema/failure discussion; queued project |
| Week 16 | Derive a basic DP recurrence; failure-safe project transaction boundary; test pipeline |
| Week 20 | Across several sessions, solve representative unseen medium tasks with tests in about 35–45 minutes; deliver a coherent 45-minute design and defend the project honestly |
| Week 24 | A complete mock loop, 8–10 real stories ready for probing, resume claims defensible, recurring weaknesses getting smaller |
| Week 32 | Interview feedback drives narrow repairs; no dependence on hints for familiar core families |

A missed checkpoint is a diagnosis, not a reason to restart. Spend a bounded repair week on the prerequisite. Drop extensions before core practice. If an unfamiliar medium takes longer, classify why: concept absent, wrong model, implementation bug, missing edge case, or communication difficulty. The repair depends on that cause.

#### 14. How to use the existing files without getting overwhelmed

- **Today:** Section 1, then the first 14-day table. Keep the array reference open only when needed.
- **Current week:** the row in Section 12, plus the corresponding topic checklist above.
- **Explanation needed:** open the relevant M1/M2/etc. Q&A or monthly Word guide. Check the audit's corrections before treating an answer as authoritative.
- **Weekly:** one mixed/no-notes check, one work-story update, and the three most important weak items.
- **Monthly:** use the readiness table and change the next month's allocation based on evidence.

You have enough material to begin. The next useful output is a small correct program you can explain, not another roadmap or a larger topic collection.

## FAANG-Master-Plan/TRACKER_IMPORT_FOR_GOOGLE_SHEETS.csv

Kept unchanged as [TRACKER_FAANG_OCT_2026.csv](TRACKER_FAANG_OCT_2026.csv).
