const PREP_DATA = {
  "phases": [
    {
      "id": 1,
      "name": "Phase 1: DSA & LLD Foundations",
      "weeks": "Weeks 1–8",
      "days": "Days 1–56",
      "color": "#6366f1"
    },
    {
      "id": 2,
      "name": "Phase 2: Adv DSA, HLD & Project Core",
      "weeks": "Weeks 9–16",
      "days": "Days 57–112",
      "color": "#8b5cf6"
    },
    {
      "id": 3,
      "name": "Phase 3: Project AI/Cloud & HLD Mastery",
      "weeks": "Weeks 17–20",
      "days": "Days 113–140",
      "color": "#ec4899"
    },
    {
      "id": 4,
      "name": "Phase 4: Interview Launch & Timed Mocks",
      "weeks": "Weeks 21–24",
      "days": "Days 141–168",
      "color": "#f59e0b"
    },
    {
      "id": 5,
      "name": "Phase 5: Peak Conversion & Offer Loops",
      "weeks": "Weeks 25–32",
      "days": "Days 169–224",
      "color": "#10b981"
    }
  ],
  "dsaCategories": [
    {
      "id": "arrays",
      "name": "1. Arrays (Subarray, In-Place, Intervals)",
      "subPatterns": [
        "Kadane's Algorithm: Max Subarray, Max Product Subarray, Circular Subarray",
        "Prefix Sum: 1D Prefix Sum, 2D Matrix Prefix Sum, Subarray Sum Equals K",
        "Two Pointers: Converging Ends, 3Sum & 4Sum duplicate skipping, Container With Most Water, Trapping Rain Water",
        "Dutch National Flag: Sort 0, 1, 2 in a single pass (3-way partition)",
        "Sliding Window: Fixed Size, Variable Size, At Most K technique",
        "Intervals & Matrix: Merge Intervals, Insert Interval, Spiral Matrix, Rotate Image"
      ],
      "archetypes": [
        {
          "name": "Subarray Sum Equals K",
          "lc": 560,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
        },
        {
          "name": "First Missing Positive",
          "lc": 41,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/first-missing-positive/"
        },
        {
          "name": "Sort Colors",
          "lc": 75,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/sort-colors/"
        },
        {
          "name": "Merge Intervals",
          "lc": 56,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/merge-intervals/"
        }
      ]
    },
    {
      "id": "strings",
      "name": "2. Strings & Pattern Matching",
      "subPatterns": [
        "Two Pointers & Palindromes: Valid Palindrome, Longest Palindromic Substring",
        "Sliding Window: Longest Substring Without Repeating Characters, Minimum Window Substring",
        "KMP Algorithm: Longest Prefix Suffix (LPS array) in O(M) time, pattern match in O(N)",
        "Rabin-Karp Algorithm: Rolling hash pattern matching",
        "Z-Algorithm: Linear time Z-array string matching",
        "Frequency Maps: Group Anagrams (Prime hashing vs sorted keys)"
      ],
      "archetypes": [
        {
          "name": "Longest Substring Without Repeating Characters",
          "lc": 3,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
        },
        {
          "name": "Minimum Window Substring",
          "lc": 76,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/minimum-window-substring/"
        },
        {
          "name": "Find the Index of the First Occurrence in a String (KMP)",
          "lc": 28,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
        }
      ]
    },
    {
      "id": "stacks",
      "name": "3. Stack Patterns & Expressions",
      "subPatterns": [
        "Monotonic Stack: Next Greater Element I & II, Previous Smaller Element, Daily Temperatures",
        "Histogram Boundary Expansion: Largest Rectangle in Histogram, Trapping Rain Water",
        "Balanced Parentheses: Valid Parentheses, Minimum Remove to Make Valid Parentheses",
        "Min Stack: O(1) GetMin() with two stacks or value encoding",
        "Expression Evaluation: Infix to Postfix conversion, Evaluate Reverse Polish Notation (RPN)"
      ],
      "archetypes": [
        {
          "name": "Daily Temperatures",
          "lc": 739,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/daily-temperatures/"
        },
        {
          "name": "Largest Rectangle in Histogram",
          "lc": 84,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Evaluate Reverse Polish Notation",
          "lc": 150,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
        }
      ]
    },
    {
      "id": "queues",
      "name": "4. Queue & Deque Patterns",
      "subPatterns": [
        "Circular Queue: Ring buffer array with head and tail modulo pointers",
        "Monotonic Deque: Sliding Window Maximum in O(N) total time",
        "Queue using Stacks & Stack using Queues: Amortized O(1) push/pop"
      ],
      "archetypes": [
        {
          "name": "Sliding Window Maximum",
          "lc": 239,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/sliding-window-maximum/"
        },
        {
          "name": "Design Circular Queue",
          "lc": 622,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/design-circular-queue/"
        }
      ]
    },
    {
      "id": "linked-lists",
      "name": "5. Linked List Patterns",
      "subPatterns": [
        "Reversals: Iterative & Recursive, Reverse Linked List II, Reverse in k-Group",
        "Slow & Fast Pointers: Middle of List, Detect Cycle, Cycle Origin (Floyd's proof)",
        "Merging: Merge Two Sorted Lists, Merge K Sorted Lists (Min-Heap)",
        "Doubly Linked List: In-Memory LRU Cache & LFU Cache implementation in O(1)"
      ],
      "archetypes": [
        {
          "name": "Reverse Nodes in k-Group",
          "lc": 25,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        {
          "name": "Linked List Cycle II",
          "lc": 142,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
        },
        {
          "name": "LRU Cache",
          "lc": 146,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/lru-cache/"
        }
      ]
    },
    {
      "id": "recursion-backtracking",
      "name": "6. Recursion & Backtracking",
      "subPatterns": [
        "Subsets & Subsequences: Subsets I & II (duplicate skipping)",
        "Combinations: Combination Sum I, II, III",
        "Permutations: Permutations I & II",
        "Board & Matrix Search: Word Search, Rat in a Maze, N-Queens, Sudoku Solver"
      ],
      "archetypes": [
        {
          "name": "Subsets II",
          "lc": 90,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/subsets-ii/"
        },
        {
          "name": "Combination Sum",
          "lc": 39,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/combination-sum/"
        },
        {
          "name": "N-Queens",
          "lc": 51,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/n-queens/"
        }
      ]
    },
    {
      "id": "trees",
      "name": "7. Trees, Views & BST",
      "subPatterns": [
        "Traversals: Inorder, Preorder, Postorder (Iterative & Recursive), Level Order BFS, Zigzag, Boundary Traversal",
        "Tree Views: Top View, Bottom View, Left View, Right View",
        "Tree DP: Diameter of Tree, Maximum Path Sum, Lowest Common Ancestor (LCA)",
        "Tree Construction: From Inorder + Preorder, From Inorder + Postorder, Serialization",
        "Binary Search Tree (BST): Validate BST, Kth Smallest, Inorder Successor, LCA of BST"
      ],
      "archetypes": [
        {
          "name": "Binary Tree Maximum Path Sum",
          "lc": 124,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
        },
        {
          "name": "Lowest Common Ancestor",
          "lc": 236,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
        },
        {
          "name": "Validate Binary Search Tree",
          "lc": 98,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/validate-binary-search-tree/"
        }
      ]
    },
    {
      "id": "heaps",
      "name": "8. Heaps & Priority Queues",
      "subPatterns": [
        "Min-Heap & Max-Heap Basics: Array representation, heapify, PriorityQueue in C#",
        "Top-K Elements: Kth Largest Element, Top K Frequent Elements",
        "Two Heaps: Find Median from Data Stream (balancing Max-Heap & Min-Heap)",
        "K-Way Merge: Merge K Sorted Lists, Smallest Range from K Lists"
      ],
      "archetypes": [
        {
          "name": "Find Median from Data Stream",
          "lc": 295,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/find-median-from-data-stream/"
        },
        {
          "name": "Top K Frequent Elements",
          "lc": 347,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/top-k-frequent-elements/"
        }
      ]
    },
    {
      "id": "graphs",
      "name": "9. Graphs, Topo Sort, Shortest Path & DSU",
      "subPatterns": [
        "BFS & DFS: Number of Islands, Rotting Oranges, Clone Graph",
        "Cycle Detection: Directed (3-Coloring DFS), Undirected (BFS/DFS parent, DSU)",
        "Topological Sort (DAG): Kahn's Algorithm (in-degree queue), Course Schedule I & II, Alien Dictionary",
        "Shortest Paths: BFS (unweighted), Dijkstra (non-negative), Bellman-Ford (negative weights), Floyd-Warshall (all-pairs)",
        "Disjoint Set Union (DSU): Path compression, union by rank, Kruskal's MST, Redundant Connection",
        "Bipartite Graph: 2-coloring BFS/DFS",
        "Strongly Connected Components: Kosaraju's 2-pass algorithm, Tarjan's algorithm"
      ],
      "archetypes": [
        {
          "name": "Course Schedule II",
          "lc": 210,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/course-schedule-ii/"
        },
        {
          "name": "Network Delay Time (Dijkstra)",
          "lc": 743,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/network-delay-time/"
        },
        {
          "name": "Is Graph Bipartite?",
          "lc": 785,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/is-graph-bipartite/"
        },
        {
          "name": "Alien Dictionary",
          "lc": 269,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/alien-dictionary/"
        }
      ]
    },
    {
      "id": "trie",
      "name": "10. Trie (Prefix & Bitwise)",
      "subPatterns": [
        "Prefix Tree: Insert, Search, StartsWith",
        "Applications: Word Search II (Trie + Backtracking), Search Suggestions",
        "Bitwise Trie: Maximum XOR of Two Numbers in an Array in O(32N)"
      ],
      "archetypes": [
        {
          "name": "Implement Trie (Prefix Tree)",
          "lc": 208,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
        },
        {
          "name": "Maximum XOR of Two Numbers in an Array",
          "lc": 421,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
        }
      ]
    },
    {
      "id": "dp",
      "name": "11. Dynamic Programming Master Suite",
      "subPatterns": [
        "1D Linear DP: Climbing Stairs, House Robber I & II, Decode Ways",
        "0/1 Knapsack: Subset Sum, Partition Equal Subset, Target Sum (traverse backwards)",
        "Unbounded Knapsack: Coin Change I & II, Rod Cutting (traverse forwards)",
        "2D String DP: Longest Common Subsequence (LCS), Edit Distance, Shortest Common Supersequence",
        "Longest Increasing Subsequence (LIS): O(N^2) table and O(N log N) binary search patience sort",
        "Grid DP: Unique Paths I & II, Minimum Path Sum, Cherry Pickup",
        "Matrix Chain Multiplication (MCM) & Interval DP: Burst Balloons, Palindrome Partitioning II",
        "DP on Trees & Bitmask DP: TSP (Traveling Salesperson) for N <= 16"
      ],
      "archetypes": [
        {
          "name": "Coin Change",
          "lc": 322,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/coin-change/"
        },
        {
          "name": "Edit Distance",
          "lc": 72,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/edit-distance/"
        },
        {
          "name": "Longest Increasing Subsequence",
          "lc": 300,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
        },
        {
          "name": "Burst Balloons",
          "lc": 312,
          "diff": "Hard",
          "url": "https://leetcode.com/problems/burst-balloons/"
        }
      ]
    },
    {
      "id": "greedy",
      "name": "12. Greedy Algorithms",
      "subPatterns": [
        "Interval Scheduling: Activity selection, Non-overlapping intervals, Minimum arrows to burst balloons",
        "Array Greedy: Jump Game I & II, Gas Station (circular greedy sum)"
      ],
      "archetypes": [
        {
          "name": "Non-overlapping Intervals",
          "lc": 435,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/non-overlapping-intervals/"
        },
        {
          "name": "Gas Station",
          "lc": 134,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/gas-station/"
        }
      ]
    },
    {
      "id": "bit-manipulation",
      "name": "13. Bit Manipulation",
      "subPatterns": [
        "XOR Properties: Single Number I, II (bit counters modulo 3), III (lowest set bit diff & -diff)",
        "Bitwise Tricks: Brian Kernighan's bit count n & (n - 1), Power of 2 check, Reverse bits"
      ],
      "archetypes": [
        {
          "name": "Single Number III",
          "lc": 260,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/single-number-iii/"
        },
        {
          "name": "Counting Bits",
          "lc": 338,
          "diff": "Easy",
          "url": "https://leetcode.com/problems/counting-bits/"
        }
      ]
    },
    {
      "id": "sorting-algorithms",
      "name": "14. All 8 Sorting Algorithms",
      "subPatterns": [
        "Comparison Sorts: Bubble, Selection, Insertion, Merge Sort (O(N log N) stable), Quick Sort (Lomuto vs Hoare), Heap Sort",
        "Non-Comparison Sorts: Counting Sort (O(N+K)), Radix Sort (O(D*(N+K)))"
      ],
      "archetypes": [
        {
          "name": "Sort an Array",
          "lc": 912,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/sort-an-array/"
        }
      ]
    },
    {
      "id": "range-queries",
      "name": "15. Advanced Range Queries (Segment & Fenwick Trees)",
      "subPatterns": [
        "Segment Tree: Range Sum / Range Minimum Query and Point Updates in O(log N), Lazy Propagation",
        "Fenwick Tree (Binary Indexed Tree): Prefix Sums & Point Updates in O(log N) using two's complement i & -i"
      ],
      "archetypes": [
        {
          "name": "Range Sum Query - Mutable",
          "lc": 307,
          "diff": "Medium",
          "url": "https://leetcode.com/problems/range-sum-query-mutable/"
        }
      ]
    }
  ],
  "lldMindmap": {
    "oopsFundamentals": [
      {
        "name": "Classes & Objects",
        "desc": "Blueprints, heap vs stack memory allocation in C#, object lifecycles."
      },
      {
        "name": "Constructors",
        "desc": "Default, parameterized, copy, static constructors, chaining with this() and base()."
      },
      {
        "name": "Encapsulation",
        "desc": "Data hiding, getters/setters, properties with backing fields."
      },
      {
        "name": "Abstraction",
        "desc": "Hiding internal complexity, exposing essential contracts via interfaces and abstract classes."
      },
      {
        "name": "Inheritance",
        "desc": "is-a relationship, single class inheritance, virtual, override, and new keywords."
      },
      {
        "name": "Polymorphism",
        "desc": "Compile-time (overloading) vs Runtime dynamic dispatch (vtable overriding)."
      },
      {
        "name": "Abstract Classes",
        "desc": "Partial implementation, abstract methods, when to use vs interfaces."
      },
      {
        "name": "Access Modifiers",
        "desc": "public, private, protected, internal, protected internal, private protected."
      },
      {
        "name": "Static",
        "desc": "Static classes, methods, fields, constructors, thread safety in static singletons."
      },
      {
        "name": "Enums",
        "desc": "Strongly typed constants, flags enums ([Flags]), underlying numeric types."
      }
    ],
    "classRelationships": [
      {
        "name": "Association (-->)",
        "desc": "uses-a relationship between two independent classes (Order uses EmailService)."
      },
      {
        "name": "Dependency (..>)",
        "desc": "Weakest relationship; object passed as a method parameter or local variable."
      },
      {
        "name": "Aggregation (◇--)",
        "desc": "has-a relationship with WEAK ownership; child exists independently of parent (Department & Professors)."
      },
      {
        "name": "Composition (◆--)",
        "desc": "has-a relationship with STRONG ownership; child lifetime bound to parent (House & Rooms)."
      },
      {
        "name": "Realization (..▷)",
        "desc": "Interface implementation or abstract contract realization (Car implements IVehicle)."
      }
    ],
    "designPrinciples": [
      {
        "name": "DRY",
        "desc": "Don't Repeat Yourself: Single source of truth for business rules."
      },
      {
        "name": "KISS",
        "desc": "Keep It Simple, Stupid: Avoid premature complexity; prefer readable code."
      },
      {
        "name": "YAGNI",
        "desc": "You Aren't Gonna Need It: Implement only what is required now."
      },
      {
        "name": "Separation of Concerns",
        "desc": "Break software into distinct sections addressing separate concerns."
      },
      {
        "name": "Coupling",
        "desc": "Measure of interdependency. Strive for LOOSE coupling via interfaces."
      },
      {
        "name": "Cohesion",
        "desc": "Measure of internal responsibility focus. Strive for HIGH cohesion."
      },
      {
        "name": "Composition over Inheritance",
        "desc": "Prefer composing interfaces over deep fragile class inheritance."
      },
      {
        "name": "Law of Demeter",
        "desc": "Principle of Least Knowledge: Don't talk to strangers (avoid a.GetB().GetC().DoSomething())."
      }
    ],
    "solidPrinciples": [
      {
        "name": "SRP (Single Responsibility)",
        "desc": "A class should have only one reason to change."
      },
      {
        "name": "OCP (Open-Closed)",
        "desc": "Open for extension, closed for modification (use strategies/plugins)."
      },
      {
        "name": "LSP (Liskov Substitution)",
        "desc": "Subtypes must be substitutable for base types without breaking correctness."
      },
      {
        "name": "ISP (Interface Segregation)",
        "desc": "Clients should not depend on interfaces they do not use (role interfaces)."
      },
      {
        "name": "DIP (Dependency Inversion)",
        "desc": "Depend on abstractions, not on concrete implementations (Dependency Injection)."
      }
    ],
    "umlDiagrams": [
      {
        "name": "Class Diagram",
        "desc": "Classes, attributes, methods, access modifiers, and relationships (Inheritance, Composition, etc.)."
      },
      {
        "name": "Use Case Diagram",
        "desc": "Actors, system boundary, use cases, <<include>> and <<extend>>."
      },
      {
        "name": "Sequence Diagram",
        "desc": "Chronological interaction over time: lifelines, sync/async calls, return messages."
      },
      {
        "name": "Activity Diagram",
        "desc": "Workflow logic, decision diamonds, fork/join parallel branches."
      },
      {
        "name": "State Machine Diagram",
        "desc": "States, transitions, events, guards, actions (Elevator, Order processing)."
      }
    ],
    "all23DesignPatterns": {
      "creational": [
        {
          "name": "Singleton",
          "desc": "Ensures single instance with global access (thread-safe Lazy<T> in C#)."
        },
        {
          "name": "Builder",
          "desc": "Separates complex object construction from its representation (fluent builders)."
        },
        {
          "name": "Factory Method",
          "desc": "Defers object instantiation to subclasses via factory method."
        },
        {
          "name": "Abstract Factory",
          "desc": "Creates families of related objects without specifying concrete classes."
        },
        {
          "name": "Prototype",
          "desc": "Creates new objects by cloning an existing prototype instance."
        }
      ],
      "behavioral": [
        {
          "name": "Strategy",
          "desc": "Interchangeable algorithms at runtime (PaymentStrategy, PricingStrategy)."
        },
        {
          "name": "Iterator",
          "desc": "Sequential element access without exposing underlying collection structure."
        },
        {
          "name": "Command",
          "desc": "Encapsulates request as an object (supports queueing, undo/redo)."
        },
        {
          "name": "Observer",
          "desc": "One-to-many event notifications (Pub-Sub event driven)."
        },
        {
          "name": "State",
          "desc": "Alters object behavior when internal state changes (Elevator states)."
        },
        {
          "name": "Template Method",
          "desc": "Defines algorithm skeleton, deferring specific steps to subclasses."
        },
        {
          "name": "Chain of Responsibility",
          "desc": "Passes request along chain of handlers (ASP.NET Core Middleware)."
        },
        {
          "name": "Visitor",
          "desc": "Separates algorithm from object structure (tax calculation across products)."
        },
        {
          "name": "Mediator",
          "desc": "Encapsulates how objects interact to prevent direct dependencies (MediatR in .NET)."
        },
        {
          "name": "Memento",
          "desc": "Captures and restores object internal state (Undo checkpoints)."
        }
      ],
      "structural": [
        {
          "name": "Adapter",
          "desc": "Converts interface into another interface clients expect (wrapping legacy/3rd party APIs)."
        },
        {
          "name": "Facade",
          "desc": "Unified simple interface to a complex subsystem."
        },
        {
          "name": "Decorator",
          "desc": "Dynamically attaches responsibilities to objects (CachingDecorator, LoggingDecorator)."
        },
        {
          "name": "Composite",
          "desc": "Tree structures representing part-whole hierarchies (File System)."
        },
        {
          "name": "Proxy",
          "desc": "Placeholder controlling access to another object (Virtual, Remote, Protection Proxy)."
        },
        {
          "name": "Bridge",
          "desc": "Decouples abstraction from implementation so both vary independently."
        },
        {
          "name": "Flyweight",
          "desc": "Shares common fine-grained state to reduce memory footprint."
        }
      ]
    }
  },
  "lldAnchorProblems": [
    {
      "id": "parking-lot",
      "name": "Parking Lot System",
      "patterns": "Strategy, Factory, Singleton",
      "keyFeatures": "Vehicle hierarchy, spot allocation strategy, multi-floor pricing, thread-safe checkout."
    },
    {
      "id": "elevator-system",
      "name": "Elevator System",
      "patterns": "State Machine, Command, Observer",
      "keyFeatures": "Internal/External dispatching, SCAN/LOOK algorithm, request queue management."
    },
    {
      "id": "lru-cache",
      "name": "In-Memory LRU Cache",
      "patterns": "Doubly Linked List + HashMap",
      "keyFeatures": "O(1) get and put, ReaderWriterLockSlim for concurrent reads and exclusive writes."
    },
    {
      "id": "bookmyshow",
      "name": "BookMyShow (Movie Booking)",
      "patterns": "Optimistic Locking, Strategy",
      "keyFeatures": "Seat matrix, 10-minute temporary seat locking, concurrency race condition prevention."
    },
    {
      "id": "splitwise",
      "name": "Splitwise Expense App",
      "patterns": "Composite, Min-Cash Flow Graph",
      "keyFeatures": "Equal, exact, and percentage splits, debt balance sheet simplification."
    },
    {
      "id": "rate-limiter-lld",
      "name": "Rate Limiter (In-Code)",
      "patterns": "Strategy, Sliding Window",
      "keyFeatures": "Token Bucket, Leaky Bucket, Sliding Window Log classes with clean interfaces."
    },
    {
      "id": "tic-tac-toe",
      "name": "Tic-Tac-Toe / Chess",
      "patterns": "Board Modeling, Strategy",
      "keyFeatures": "Extensible board grid, move validation rules, O(1) win verification per move."
    }
  ],
  "hldAnchorSystems": [
    {
      "id": "tinyurl",
      "name": "Design URL Shortener (TinyURL)",
      "keyConcepts": "Base62 encoding, Key Generation Service (KGS), Cache-aside with Redis, 100:1 read-heavy scale."
    },
    {
      "id": "rate-limiter-hld",
      "name": "Design Distributed Rate Limiter",
      "keyConcepts": "Redis Lua scripts for atomicity, Token Bucket algorithm, distributed clock synchronization."
    },
    {
      "id": "whatsapp",
      "name": "Design WhatsApp / Real-Time Chat",
      "keyConcepts": "WebSockets vs Long Polling, Presence servers (heartbeats), delivery status pipeline, message store."
    },
    {
      "id": "twitter",
      "name": "Design Twitter / News Feed",
      "keyConcepts": "Fan-out on Write (Push) vs Fan-out on Read (Pull), Hybrid model for celebrity accounts."
    },
    {
      "id": "youtube",
      "name": "Design YouTube / Video Streaming",
      "keyConcepts": "Chunked upload, transcoding worker queue (FFmpeg), HLS/DASH adaptive bitrate, CDN edge caching."
    },
    {
      "id": "uber",
      "name": "Design Uber / Ride-Sharing",
      "keyConcepts": "Geospatial indexing (QuadTree vs Uber H3 hexagonal cells), location ping ingestion, matching service."
    },
    {
      "id": "hotel-booking",
      "name": "Design Hotel Booking System",
      "keyConcepts": "Distributed transactions, Saga Pattern (Orchestration), idempotency keys, avoiding double bookings."
    },
    {
      "id": "redis-clone",
      "name": "Design Distributed In-Memory Cache",
      "keyConcepts": "Consistent hashing, virtual nodes, replication, eviction policies (LRU/LFU), cache stampede fixes."
    }
  ],
  "projectMilestones": [
    {
      "phase": 1,
      "title": "Phase 1: Ingestion API & RabbitMQ Queues",
      "weeks": "Weeks 11–13",
      "deliverables": [
        "ASP.NET Core 8 Web API with Vertical Slice",
        "PostgreSQL EF Core schema for Jobs",
        "RabbitMQ exchange & queue bindings",
        "BackgroundService consumer worker"
      ]
    },
    {
      "phase": 2,
      "title": "Phase 2: Concurrency, Locks & DLQ",
      "weeks": "Weeks 14–16",
      "deliverables": [
        "Redis SETNX / RedLock distributed locks",
        "Idempotency-Key caching middleware",
        "Polly exponential backoff with jitter",
        "Dead-Letter Queue poison pill routing"
      ]
    },
    {
      "phase": 3,
      "title": "Phase 3: AI Task Pipeline & pgvector RAG",
      "weeks": "Weeks 17–18",
      "deliverables": [
        "Microsoft Semantic Kernel integration",
        "Document chunking & vector embeddings",
        "PostgreSQL pgvector extension with HNSW index",
        "Semantic similarity search endpoint"
      ]
    },
    {
      "phase": 4,
      "title": "Phase 4: Docker, K8s & Observability",
      "weeks": "Weeks 19–20",
      "deliverables": [
        "Multi-stage Dockerfile (~90MB Alpine)",
        "K8s manifests with KEDA queue autoscaling",
        "Prometheus metrics export & Grafana dashboard",
        "k6 load testing script reaching 5,000 RPS"
      ]
    }
  ],
  "behavioralStories": [
    {
      "id": 1,
      "title": "Email Processing Optimization (Performance)",
      "situation": "Large-scale eDiscovery email ingestion taking 7–10 hours, threatening client SLAs.",
      "task": "Architect and lead the backend refactoring to reduce execution time.",
      "action": "Decoupled pipeline using AWS SQS and EventBridge; parallelized processing workers and batched database queries.",
      "result": "Reduced processing time by ~80% down to 1–1.5 hours with zero message loss."
    },
    {
      "id": 2,
      "title": "Production Deadlock & Outage Incident",
      "situation": "High-concurrency tenant updates causing database connection pool exhaustion and 504 errors.",
      "task": "Diagnose root cause under production pressure and restore service.",
      "action": "Analyzed execution plans, introduced PgBouncer connection pooling, and optimized composite indexes.",
      "result": "Restored service in 25 minutes; added automated alerts before connection utilization exceeds 80%."
    },
    {
      "id": 3,
      "title": "Technical Disagreement on Architecture",
      "situation": "Team proposed synchronous REST calls between microservices for data export.",
      "task": "Evaluate trade-offs and propose a resilient alternative.",
      "action": "Demonstrated cascading failure risks and benchmarked async messaging via RabbitMQ with DLQs.",
      "result": "Team adopted async queueing; export service handled traffic surges with 99.99% uptime."
    },
    {
      "id": 4,
      "title": "Ownership & Going Above and Beyond",
      "situation": "Identified silent failures in background FOIA file conversion that went undetected for hours.",
      "task": "Proactively built an automated health check and retry monitor without being assigned.",
      "action": "Implemented structured logging with correlation IDs and an automated dead-letter alert.",
      "result": "Reduced unhandled file conversion failures to zero."
    },
    {
      "id": 5,
      "title": "Technical Failure & What I Learned",
      "situation": "An early caching implementation caused cache stampede (thundering herd) when a hot key expired.",
      "task": "Take responsibility and engineer a durable fix.",
      "action": "Implemented probabilistic early expiration and distributed mutex locking on cache refresh.",
      "result": "Completely eliminated database spikes during key expiration."
    },
    {
      "id": 6,
      "title": "Delivering Under Tight Deadlines",
      "situation": "Client requested an enterprise multilingual search feature 3 weeks before launch.",
      "task": "Scope MVP features and deliver without compromising code quality.",
      "action": "Ruthlessly prioritized core search filters, deferred non-critical analytics, and conducted daily standups.",
      "result": "Shipped on schedule with 100% test pass rate."
    }
  ],
  "days": []
};
