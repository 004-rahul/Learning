# DSA: array basics, all patterns and complete problem lists

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="QD"></a>

## QD — DSA_MASTER_GUIDE

Full source content: [Q-and-A/DSA_MASTER_GUIDE.docx](../SOURCE_LIBRARY/Q-and-A/DSA_MASTER_GUIDE.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="QD-B0001"></a>

DSA Master Guide

<a id="QD-B0002"></a>

What to learn, in what order, why that order, and why each pattern beats the obvious alternative. Read it once now, then use Parts 4, 5 and 9 forever.

<a id="QD-B0003"></a>

The month documents tell you which problems to solve in which week. They do not tell you why that order, or why this pattern instead of the obvious one. That is the gap this file closes.

<a id="QD-B0004"></a>

The governing rule, before anything else. Do not chase problem count. Chase pattern recognition. 150 problems deeply understood beats 600 half-remembered, and it is not close. The target across the plan is roughly 300-350 problems, but that number is an output, not a goal. The actual goal is this: you read an unseen problem and within two minutes you can say "this is a monotonic stack problem, because it asks for the next greater element and each element only needs comparing to what is still unresolved."

<a id="QD-B0005"></a>

That sentence - pattern plus justification - is the entire skill. Everything below builds it.

<a id="QD-B0006"></a>

### How to use this file given your actual life

<a id="QD-B0007"></a>

•  Read Parts 1 to 3 once, this week, in any order. About 40 minutes.

<a id="QD-B0008"></a>

•  Part 4 (the decision table) is the one you re-read. Before every practice session, thirty seconds. It is what turns reading into recognition.

<a id="QD-B0009"></a>

•  Part 5 is the interview answer bank. "Why did you use a heap and not a sort?" lives there. Learn these; they are what separate a candidate who solved the problem from one who understood it.

<a id="QD-B0010"></a>

•  Part 9 is for your commute. Four hours a day of travel is not lost DSA time - it is the best pattern-recall time you have, because you cannot cheat by typing. That part tells you exactly what to do with it.

<a id="QD-B0011"></a>

### PART 1 - Why the order matters

<a id="QD-B0012"></a>

The order in this plan is not arbitrary and it is not difficulty-sorted. It is a dependency chain: each pattern is built out of a technique you learned earlier. Learn them out of order and you end up memorising solutions, because you are missing the piece that makes the next one obvious.

<a id="QD-B0013"></a>

| This is why X comes before Y | The dependency |
| --- | --- |
| Big-O before everything | Every later decision is "is this fast enough?". Without complexity you cannot even state the problem you are solving, let alone justify a choice |
| Hashing before two pointers | You need to have felt the O(n) space cost of a hash map before "two pointers gives you O(1) space" means anything. Otherwise two pointers is just a trick you saw |
| Two pointers before sliding window | A window is two pointers with a rule about when the left one moves. If the two-pointer invariant is not solid, window shrinking logic is guesswork |
| Sliding window before prefix sum | Prefix sum exists because the window technique breaks when negative numbers appear. You have to hit the wall to understand the fix |
| Stacks before monotonic stacks | A monotonic stack is an ordinary stack plus one invariant. Learning the invariant is easy once the data structure is automatic |
| Binary search before binary search on answer | The second is the first applied to a search space you invent rather than an array you are given. That leap is impossible without the mechanical version being effortless |
| Recursion before trees | A tree problem *is* a recursion problem. People who struggle with trees are almost always struggling with recursion |
| Trees before graphs | A tree is a graph with no cycles and one path between any two nodes. Graphs add the visited set, and that is the only new idea |
| Graphs before topological sort and union-find | Both are graph algorithms. Doing them first means learning BFS/DFS twice |
| Recursion and backtracking before DP | Every DP solution starts life as a recursive brute force. If you cannot write the recursion, you cannot find the recurrence, and DP becomes table-filling you do not understand |
| DP last | It needs recursion, complexity analysis, and the habit of defining state precisely. It is not the hardest topic - it is the most dependent one |

<a id="QD-B0014"></a>

The practical consequence for you. If you fall behind, do not skip forward to a later pattern because it looks more impressive. Skipping breaks the chain and the later pattern will not stick. Slow down and keep the order; the plan absorbs delay far better than it absorbs gaps.

<a id="QD-B0015"></a>

### PART 2 - The learning order, stage by stage

<a id="QD-B0016"></a>

| Stage | Weeks | Learn | Because it unlocks |
| --- | --- | --- | --- |
| 1. Foundations | 1-2 | Big-O, arrays, strings, hashing | The vocabulary for every later trade-off, and the hash map you will reach for constantly |
| 2. Linear scans | 3 | Two pointers, sliding window | The idea that you can often replace a nested loop with one pass and a moving boundary |
| 3. Structures | 4 | Stack, queue, binary search | LIFO/FIFO thinking, and the halving idea that later becomes binary search on answer |
| 4. Pointers | 5 | Linked lists, fast and slow pointers | In-place manipulation with O(1) space, and cycle detection |
| 5. Recursion | 6 | Recursion, divide and conquer, sorting algorithms | The call stack as a mental model - the prerequisite for trees, backtracking and DP |
| 6. Trees | 7-8 | Tree DFS, tree BFS, BST, heaps | Hierarchical recursion, level-order thinking, and the top-K pattern |
| 7. Graphs | 9-10 | Graph BFS/DFS, topological sort, union-find | Everything with relationships. Grids are graphs; dependencies are graphs |
| 8. Sorting as setup | 11 | Intervals, greedy | The habit of sorting first, and the exchange argument for proving greedy correct |
| 9. Interleaving | 12 | Mixed sets - no pattern hints | Recognition itself. Up to now the week told you the pattern. From here nobody does |
| 10. Search | 13 | Backtracking, monotonic stack, binary search on answer | Exhaustive search with pruning, and the two hardest-to-spot patterns |
| 11. DP | 14, 17 | Dynamic programming - 1D, 2D, knapsack, LIS, string DP | The last pattern family, and the one that needs all the others |
| 12. Performance | 18-24 | Everything, mixed, timed, narrated | Doing it in 25 minutes, out loud, with someone watching. A different skill entirely |
| 13. Repair | 25-32 | Company-tagged sets, selected hard, re-solve from memory | Closing named gaps rather than adding topics |

<a id="QD-B0017"></a>

Volume per month, for reference: roughly 40 easy in month 1, 45 easy-medium in month 2, then 50, 55, 50, 45, 40 and 30. Around 350 total. If you land at 200 with genuine pattern recognition you are in better shape than someone at 500 without it.

<a id="QD-B0018"></a>

### Week 12 is the most important line in that table. Up to week 12 you practise by topic, which means the week has already told you the answer. From week 12 you solve mixed sets. It will feel like a step backwards and your solve rate will drop. That drop is the measurement finally becoming honest - in an interview nobody says "this is a sliding window problem."

<a id="QD-B0019"></a>

### PART 3 - The fifteen patterns

<a id="QD-B0020"></a>

For each: what it is, the invariant that makes it correct, how to recognise it, and the complexity. The invariant is the part most people skip and it is the part interviewers probe - "why does that work?" is answered by naming the invariant.

<a id="QD-B0021"></a>

### 1. Two pointers

<a id="QD-B0022"></a>

|  |  |
| --- | --- |
| What | Two indices move through the data, usually from opposite ends or at different speeds, never resetting |
| Invariant | Everything outside the two pointers is already decided. Moving a pointer inward permanently eliminates a set of candidates you can prove cannot be the answer |
| Recognise | Sorted array; find a pair or triplet; palindrome check; partition in place; remove or merge in place |
| Complexity | O(n) time, O(1) space. If you must sort first, O(n log n) time |
| Canonical | Two Sum II, 3Sum, Container With Most Water, Valid Palindrome, Move Zeroes, Merge Sorted Array |
| The trap | You must be able to say why moving the left pointer is safe. In Container With Most Water you move the shorter side because keeping it can never beat the current area. If you cannot justify the move, you have memorised it |

<a id="QD-B0023"></a>

### 2. Sliding window

<a id="QD-B0024"></a>

|  |  |
| --- | --- |
| What | A contiguous range with a right edge that always advances and a left edge that advances only to restore a condition |
| Invariant | The window is always valid (or always minimal) after each step. Because neither edge ever moves backwards, total work is 2n |
| Recognise | The words contiguous subarray or substring, plus a constraint - at most K distinct, sum at least S, no repeating characters |
| Complexity | O(n) time. Space O(1) or O(k) for the window's frequency map |
| Canonical | Longest Substring Without Repeating Characters, Minimum Size Subarray Sum, Longest Repeating Character Replacement, Permutation in String, Max Consecutive Ones III |
| The trap | It requires monotonicity. With all-positive numbers, growing the window can only increase the sum, so shrinking is a valid response. Introduce negatives and that breaks - shrinking might be what you needed. Then it is prefix sum, not a window |

<a id="QD-B0025"></a>

### 3. Fast and slow pointers

<a id="QD-B0026"></a>

|  |  |
| --- | --- |
| What | Two pointers at different speeds, usually 1x and 2x, through a sequence or linked list |
| Invariant | If there is a cycle, the gap between them changes by exactly one each step, so they must eventually coincide. If there is no cycle, fast reaches the end first |
| Recognise | Detect a cycle; find the middle; find the start of a cycle; happy number |
| Complexity | O(n) time, O(1) space |
| Canonical | Linked List Cycle, Linked List Cycle II, Middle of the Linked List, Happy Number, Find the Duplicate Number |
| The trap | Finding the cycle start needs the second phase - reset one pointer to the head and advance both at 1x. Know why that works, not just that it does |

<a id="QD-B0027"></a>

### 4. Prefix sum and hashing

<a id="QD-B0028"></a>

|  |  |
| --- | --- |
| What | Precompute running totals so any range sum is one subtraction, and store what you have seen in a map |
| Invariant | sum(i..j) = prefix[j] - prefix[i-1]. So "does a subarray with sum k exist ending here?" becomes "have I seen prefix - k before?" - a single map lookup |
| Recognise | Subarray sums or counts, especially with negative numbers; "how many subarrays satisfy"; "seen before" lookups |
| Complexity | O(n) time, O(n) space |
| Canonical | Subarray Sum Equals K, Contiguous Array, Continuous Subarray Sum, Range Sum Query |
| The trap | Seed the map with {0: 1} before the loop, otherwise you miss subarrays starting at index 0. This single line is the most common bug in the pattern |

<a id="QD-B0029"></a>

### 5. Binary search, and binary search on the answer

<a id="QD-B0030"></a>

|  |  |
| --- | --- |
| What | Halve a sorted search space. The advanced form searches a range of possible answers rather than an array |
| Invariant | The answer is always inside [lo, hi]. Every step discards a half you have proven cannot contain it. For the answer form: the check must be monotonic - if x works, everything above x works |
| Recognise | Sorted input. Or the phrases minimum X such that, maximum X such that, "can we do it in D days", "smallest capacity that fits" |
| Complexity | O(log n), or O(n log(range)) for the answer form when each check is O(n) |
| Canonical | Binary Search, Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Koko Eating Bananas, Capacity To Ship Packages, Split Array Largest Sum |
| The trap | The off-by-one. Decide once and for all whether your interval is [lo, hi] or [lo, hi), and always write the same loop. Under time pressure you will not re-derive it |

<a id="QD-B0031"></a>

### 6. Monotonic stack

<a id="QD-B0032"></a>

|  |  |
| --- | --- |
| What | A stack kept sorted (increasing or decreasing). Before pushing, pop everything that breaks the order - and each pop resolves an answer |
| Invariant | Anything still on the stack is waiting for its answer. The element that pops it is its answer. Each element is pushed once and popped once, so the whole scan is O(n) despite the inner while loop |
| Recognise | Next greater or next smaller element; "how many days until warmer"; largest rectangle in a histogram; trapping rain water |
| Complexity | O(n) time, O(n) space |
| Canonical | Daily Temperatures, Next Greater Element I and II, Largest Rectangle in Histogram, Trapping Rain Water, Remove K Digits |
| The trap | People see the nested while loop and say O(n squared). Being able to explain the amortised argument - each element enters and leaves once - is the whole point of the question |

<a id="QD-B0033"></a>

### 7. Heap and top-K

<a id="QD-B0034"></a>

|  |  |
| --- | --- |
| What | A partially ordered tree giving O(1) access to the minimum or maximum and O(log n) insert and remove |
| Invariant | Every parent compares correctly against its children. That is weaker than a full sort, which is exactly why it is cheaper |
| Recognise | K largest or smallest; merge K sorted things; a running median or a stream; "top K frequent"; scheduling by priority |
| Complexity | Top-K is O(n log k), not O(n log n). Building a heap from an array is O(n) |
| Canonical | Kth Largest Element, K Closest Points, Top K Frequent Elements, Merge K Sorted Lists, Find Median from Data Stream, Task Scheduler |
| The trap | For k largest, use a min-heap of size k, not a max-heap. The root is then the weakest survivor and can be evicted in O(log k). Getting this backwards is the standard error |

<a id="QD-B0035"></a>

### 8. Intervals

<a id="QD-B0036"></a>

|  |  |
| --- | --- |
| What | Sort by start (sometimes by end), then sweep once, merging or counting |
| Invariant | After sorting by start, any interval that overlaps the current one must begin before the current one ends. So one comparison against the running end is sufficient - you never look backwards |
| Recognise | Ranges, meetings, bookings, "merge", "how many rooms", overlapping |
| Complexity | O(n log n) - dominated by the sort |
| Canonical | Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms I and II, Minimum Arrows to Burst Balloons |
| The trap | Sort by start to merge; sort by end for the maximum non-overlapping count. Choosing the wrong key gives a plausible wrong answer, which is worse than failing |

<a id="QD-B0037"></a>

### 9. Tree DFS

<a id="QD-B0038"></a>

|  |  |
| --- | --- |
| What | Recurse down one branch to the bottom, then back up. Pre-order does work on the way down; post-order does work on the way up |
| Invariant | When the recursive call on a child returns, that entire subtree is fully solved. So you can treat it as a solved value and combine |
| Recognise | Anything about paths, depth, subtree sums, validity, or comparing two trees |
| Complexity | O(n) time, O(h) space for the call stack - O(log n) balanced, O(n) degenerate |
| Canonical | Maximum Depth, Same Tree, Invert Binary Tree, Balanced Binary Tree, Diameter, Validate BST, Lowest Common Ancestor, Path Sum |
| The trap | Validate BST needs a min/max range passed down, not a parent comparison. Checking only against the immediate parent passes wrong trees, and interviewers test exactly that case |

<a id="QD-B0039"></a>

### 10. Tree BFS

<a id="QD-B0040"></a>

|  |  |
| --- | --- |
| What | A queue, processing level by level, recording the level size before you start it |
| Invariant | The queue contains exactly one complete level at the top of each iteration. That is why capturing `queue.Count` first lets you group by level |
| Recognise | The word level; minimum depth; right side view; zigzag; "nearest" in a tree |
| Complexity | O(n) time, O(w) space where w is the widest level |
| Canonical | Level Order Traversal, Zigzag Traversal, Right Side View, Minimum Depth, Average of Levels |
| The trap | For minimum depth, BFS beats DFS because you can stop at the first leaf. DFS must explore everything. Say that out loud - it shows you chose rather than defaulted |

<a id="QD-B0041"></a>

### 11. Graph BFS and DFS

<a id="QD-B0042"></a>

|  |  |
| --- | --- |
| What | Tree traversal plus a visited set, because a graph can revisit |
| Invariant | A node is processed exactly once. For BFS additionally: nodes are dequeued in non-decreasing distance from the source, which is why BFS gives shortest paths on unweighted graphs |
| Recognise | Grids (a grid is a graph), islands, connectivity, "can I reach", shortest path with equal-cost edges, flood fill |
| Complexity | O(V + E) |
| Canonical | Number of Islands, Clone Graph, Rotting Oranges, Word Ladder, Pacific Atlantic Water Flow, Surrounded Regions, Walls and Gates |
| The trap | Mark visited when you enqueue, not when you dequeue. Marking on dequeue lets the same node be queued many times and quietly degrades to a much worse complexity |

<a id="QD-B0043"></a>

### 12. Topological sort

<a id="QD-B0044"></a>

|  |  |
| --- | --- |
| What | Order a directed acyclic graph so every edge points forwards. Kahn's algorithm: repeatedly take a node with in-degree zero |
| Invariant | A node with in-degree zero has no unmet prerequisites, so it is always safe to emit next. If you run out of such nodes before emitting all of them, there is a cycle |
| Recognise | Dependencies, prerequisites, build order, course schedule, "is this possible" |
| Complexity | O(V + E) |
| Canonical | Course Schedule, Course Schedule II, Alien Dictionary, Minimum Height Trees, Sequence Reconstruction |
| The trap | Cycle detection is free - count how many you emitted. If it is fewer than the node count, there is a cycle. Many candidates write a separate cycle check they did not need |

<a id="QD-B0045"></a>

### 13. Union-Find (disjoint set)

<a id="QD-B0046"></a>

|  |  |
| --- | --- |
| What | Each element points at a parent; the root identifies the set. Union joins two sets, Find locates a root. With path compression and union by rank, both are effectively O(1) |
| Invariant | Two elements are in the same set exactly when they share a root. Path compression preserves that while flattening the tree |
| Recognise | Grouping, "are these connected", number of components, redundant connection, accounts merge, Kruskal's MST |
| Complexity | Near O(1) amortised per operation - inverse Ackermann, effectively constant |
| Canonical | Number of Provinces, Redundant Connection, Accounts Merge, Number of Islands II, Min Cost to Connect All Points |
| The trap | Without path compression it degrades to O(n) per operation. Implement both optimisations or say explicitly that you are skipping them and why |

<a id="QD-B0047"></a>

### 14. Backtracking

<a id="QD-B0048"></a>

|  |  |
| --- | --- |
| What | Choose, explore, un-choose. Build a candidate incrementally and abandon a branch as soon as it cannot lead to a solution |
| Invariant | The mutable state is identical before and after each recursive call. That is what the un-choose step guarantees, and it is why you can reuse one array instead of copying |
| Recognise | "All" or "every" - all subsets, all permutations, all combinations; N-Queens; word search; sudoku; partitioning |
| Complexity | Exponential by nature - O(2^n) for subsets, O(n!) for permutations. Pruning changes the constant, not the class |
| Canonical | Subsets, Subsets II, Permutations, Combination Sum, Word Search, Palindrome Partitioning, N-Queens |
| The trap | Duplicates. The fix is to sort first and skip an element equal to its predecessor at the same depth. Know this before you are asked Subsets II |

<a id="QD-B0049"></a>

### 15. Dynamic programming

<a id="QD-B0050"></a>

|  |  |
| --- | --- |
| What | Break into overlapping subproblems, solve each once, store the result. Either top-down with memoisation or bottom-up with a table |
| Invariant | The value stored at a state is final and correct, so it never needs recomputing. That requires optimal substructure - the best answer is built from best answers to subproblems |
| Recognise | Count the ways; maximum or minimum over a sequence of choices; "can it be done"; and crucially a brute-force recursion that recomputes the same arguments |
| Complexity | States times work per state. 1D O(n), 2D O(n*m), knapsack O(n*W) |
| Canonical | Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence, Word Break, Longest Common Subsequence, Edit Distance, Partition Equal Subset Sum, 0/1 Knapsack |
| The trap | State definition is the whole skill. If you cannot finish the sentence "dp[i] is the ... using the first i ...", you do not have a solution yet, and no amount of table-filling will produce one. Write that sentence before any code |

<a id="QD-B0051"></a>

### PART 4 - How to pick a pattern in two minutes

<a id="QD-B0052"></a>

Work top to bottom. The first row that matches is almost always right. Read this table before every practice session until it is automatic - it is the single most useful page in this file.

<a id="QD-B0053"></a>

| If the problem says or implies... | Reach for | The giveaway word |
| --- | --- | --- |
| Sorted input, and you want a pair or triplet | Two pointers | sorted, pair, sum |
| Contiguous subarray or substring with a constraint, all values positive | Sliding window | contiguous, longest, at most K |
| Subarray sum or count, negative values allowed | Prefix sum + hash map | sum equals k, how many subarrays |
| Next greater or next smaller element | Monotonic stack | next warmer, next greater, span |
| K largest, K closest, or a running median on a stream | Heap | top K, Kth, median, stream |
| Ranges, meetings, bookings, overlaps | Sort + interval sweep | merge, overlap, rooms |
| Minimum or maximum X such that a condition holds | Binary search on the answer | minimum capacity, can we in D days |
| A tree, and the question is about paths, depth or subtrees | Tree DFS | path, depth, subtree |
| A tree, and the question mentions levels or nearest | Tree BFS | level, minimum depth, view |
| A grid or graph, shortest path, all edges cost the same | BFS | shortest, fewest steps |
| A graph with weighted edges, shortest path | Dijkstra (heap + BFS) | cost, cheapest, delay |
| Prerequisites, dependencies, ordering | Topological sort | before, prerequisite, order |
| Grouping, "same set", components, merging accounts | Union-Find | connected, provinces, merge |
| Generate all subsets, permutations or combinations | Backtracking | all, every, enumerate |
| Count the ways, or optimise over a sequence of choices, with repeated subproblems | Dynamic programming | how many ways, min cost, can we reach |
| A cycle, or the middle, with O(1) space required | Fast and slow pointers | cycle, middle, no extra space |
| Prefix matching or autocomplete | Trie | prefix, starts with, dictionary |
| None of the above | State the brute force, then ask what is repeated or wasted | The optimisation always removes redundant work |

<a id="QD-B0054"></a>

The habit that makes this work. Before writing any code, say out loud: "the brute force is X and it costs Y; the waste is Z; the pattern that removes Z is P." Interviewers score that sentence very highly, and it is also the fastest route to the right answer.

<a id="QD-B0055"></a>

### PART 5 - Why this instead of that

<a id="QD-B0056"></a>

This is the part you asked for. Every row is a real interview follow-up - "why did you choose that?" - and the answer is a trade-off, never a preference.

<a id="QD-B0057"></a>

| Choice | Use the first when | Use the second when |
| --- | --- | --- |
| Two pointers vs hash map (find a pair) | The array is already sorted. O(n) time and O(1) space, and you get the values directly | The array is unsorted and you need indices. Sorting costs O(n log n) and destroys indices, so a hash map at O(n) time and O(n) space wins |
| Sliding window vs prefix sum | All values are positive, so growing the window only increases the sum - shrinking is a valid response. O(1) space | Negatives are possible. The window loses monotonicity, so shrinking is no longer safe. Prefix sum plus a map handles it at O(n) space |
| Binary search on answer vs greedy | You can cheaply check a candidate answer and the check is monotonic. You do not need to construct the answer, only test it | You can prove a local choice is globally optimal by an exchange argument. Greedy is O(n log n) and simpler when it is valid |
| BFS vs DFS | You need the shortest path, the minimum number of steps, or level grouping. Memory is O(width) | You need existence, connectivity, all paths, cycle detection or a topological order. Memory is O(depth), which is usually much smaller |
| BFS vs Dijkstra | Every edge has the same cost. BFS is O(V+E) and needs no heap | Edges have different weights. BFS is simply wrong here - it finds fewest edges, not lowest cost. Dijkstra is O((V+E) log V) |
| Dijkstra vs Bellman-Ford | All weights are non-negative. Much faster | Negative edges exist. Dijkstra breaks because it finalises a node too early. Bellman-Ford is O(V*E) and also detects negative cycles |
| Union-Find vs DFS (connectivity) | Edges arrive incrementally, or you must answer many "same component?" queries, or you are building an MST | The graph is fixed and you traverse once. DFS is O(V+E), simpler to write, and needs no extra structure |
| Kahn vs DFS (topological sort) | You want cycle detection for free (count what you emitted) or lexicographic control (swap the queue for a heap). Easier to explain aloud | You are already writing DFS, or you want the order as a by-product of post-order. Needs a recursion-stack colour check for cycles |
| Heap vs full sort | You need only the top K, or the data is a stream you cannot hold. O(n log k) | You need the entire ordering. O(n log n), and often faster in practice for small n because of cache behaviour |
| Heap vs quickselect (Kth largest) | You want a guaranteed bound, or it is a stream. O(n log k) worst case | It is an in-memory array and average case is acceptable. Quickselect is O(n) average, O(n squared) worst, and in-place. Mention it for credit; implement the heap |
| Greedy vs DP | A local optimum is provably global. Fast and simple | You can construct a counterexample to greedy. Coin change with arbitrary denominations is the classic - greedy fails on {1,3,4} for 6 |
| Memoisation vs tabulation | You already have the recursion, or the reachable state space is much smaller than the full table. Top-down is easier to derive | Recursion depth is a risk, or you want to compress space to one or two rows. Bottom-up allows the O(1)-space optimisations |
| Monotonic stack vs brute force | Always, for next-greater-type problems. O(n) because each element is pushed and popped once | Never in an interview - but be able to state the O(n squared) brute force first, because that is how you show the optimisation was a choice |
| Backtracking vs BFS (enumeration) | You need all solutions. O(depth) memory, and pruning is natural | You need the shortest sequence of moves. BFS over states finds it, at much higher memory cost |
| Fast/slow vs hash set (cycle detection) | Space matters. O(1) space | You also need to know which node repeated, or the code must be obvious. O(n) space |
| Trie vs hash map | Prefix queries - "all words starting with pre". A hash map simply cannot do this | Only exact lookups. A hash map is faster and much smaller |
| In-place reversal vs stack (linked list) | O(1) space is required, which it usually is | Clarity under time pressure matters more, and O(n) space is acceptable. Say which you chose and why |

<a id="QD-B0058"></a>

### PART 6 - The per-problem protocol

<a id="QD-B0059"></a>

Five minutes per problem, in the DSA tab of the tracker. This is the difference between practice and productive practice, and it is the single habit most people skip.

<a id="QD-B0060"></a>

| Field | What goes in it |
| --- | --- |
| Brute force | The obvious solution and its complexity. Always write this first - the optimisation only makes sense as a response to it |
| Optimised idea | The key insight in one sentence. If you cannot compress it to one sentence, you have not understood the problem - you have only made it pass |
| Why it works | The invariant. This is the field that gets you through follow-ups |
| Time / space | Both, with a reason. "O(n) because each element is pushed and popped at most once" |
| Pattern name | One of the fifteen. If it is none of them, you have found something worth studying properly |
| One variation | How would it change if the input were sorted, had duplicates, were a stream, or did not fit in memory? This is where interview follow-ups come from |

<a id="QD-B0061"></a>

The re-solve ladder. Any problem you could not solve unaided gets re-solved from scratch after 1, 3, 7 and 14 days - from memory, not from the solution. A problem you read the answer to and never re-solved is a problem you cannot do.

<a id="QD-B0062"></a>

Never use AI on DSA. Not once. It produces exactly the same illusion of competence as rereading, and it destroys the retrieval skill you are training. This is the one place in the whole plan where the tool actively hurts.

<a id="QD-B0063"></a>

### PART 7 - Complexity, stated properly

<a id="QD-B0064"></a>

•  State it unprompted. Finish every solution with "this is O(n) time and O(1) space because...". Waiting to be asked loses a point you could have taken.

<a id="QD-B0065"></a>

•  Justify, do not recite. "O(n) because each element is pushed and popped at most once" is an answer. "O(n)" alone is a guess that happened to be right.

<a id="QD-B0066"></a>

•  Amortised is not average. Amortised means the total across a sequence, guaranteed - like `List<T>.Add`. Average means expected over inputs - like a hash lookup. Interviewers notice when you use the right one.

<a id="QD-B0067"></a>

•  Count the hidden costs. Sorting inside a loop. String concatenation. `list.Contains` in a loop, which is O(n) each time and turns your O(n) scan into O(n squared). Slicing an array, which copies.

<a id="QD-B0068"></a>

•  Recursion costs space. O(depth) on the call stack. For a balanced tree that is O(log n); for a linked list or degenerate tree it is O(n), and it can genuinely stack-overflow.

<a id="QD-B0069"></a>

•  Do not say "n squared is fine for small n" unless you have asked about the constraints. Ask about the input size - that question alone reads as experience.

<a id="QD-B0070"></a>

| Common mistake | What people say | What is true |
| --- | --- | --- |
| Monotonic stack | O(n squared), there is a nested while | O(n) amortised - each element enters and leaves the stack once |
| Building a heap | O(n log n) | O(n) if you heapify an existing array; O(n log n) only if you insert one at a time |
| Top-K with a heap | O(n log n) | O(n log k), which matters enormously when k is small |
| Union-Find | O(log n) per operation | Effectively O(1) amortised with path compression and union by rank |
| Backtracking with pruning | Pruning makes it polynomial | Still exponential. Pruning changes the constant, not the class |
| HashSet lookup | O(1) | O(1) average. O(n) worst case with a bad hash - worth saying |

<a id="QD-B0071"></a>

### PART 8 - The problem list, in order

<a id="QD-B0072"></a>

Roughly 150 named problems, in the order the plan introduces them. This is the spine; the month documents add mixed sets on top. Log every one with the six fields.

<a id="QD-B0073"></a>

| Week | Pattern | Problems |
| --- | --- | --- |
| 1 | Big-O, arrays | Two Sum; Contains Duplicate; Best Time to Buy and Sell Stock; Maximum Subarray; Move Zeroes; Merge Sorted Array; Remove Duplicates from Sorted Array; Plus One; Running Sum; Squares of a Sorted Array |
| 2 | Strings, hashing | Valid Anagram; Group Anagrams; Valid Palindrome; Longest Common Prefix; First Unique Character; Ransom Note; Isomorphic Strings; Word Pattern; Top K Frequent Elements; Longest Consecutive Sequence |
| 3 | Two pointers, sliding window | Valid Palindrome II; Two Sum II; 3Sum; Container With Most Water; Remove Nth Node From End; Longest Substring Without Repeating Characters; Longest Repeating Character Replacement; Permutation in String; Max Consecutive Ones III; Minimum Size Subarray Sum |
| 4 | Stack, queue, binary search | Valid Parentheses; Min Stack; Evaluate Reverse Polish Notation; Daily Temperatures; Implement Queue using Stacks; Binary Search; Search Insert Position; First Bad Version; Find Minimum in Rotated Sorted Array; Search in Rotated Sorted Array |
| 5 | Linked lists | Reverse Linked List; Merge Two Sorted Lists; Linked List Cycle; Middle of the Linked List; Remove Nth Node From End; Reorder List; Palindrome Linked List; Add Two Numbers; Copy List with Random Pointer; LRU Cache |
| 6 | Recursion | Fibonacci (naive, memo, iterative - compare all three); Climbing Stairs; Pow(x,n); Reverse String recursively; Merge Sort; Quick Sort; Binary Search recursively; Subsets; Permutations; Letter Combinations of a Phone Number |
| 7 | Trees, BST | Maximum Depth; Same Tree; Invert Binary Tree; Balanced Binary Tree; Diameter of Binary Tree; Level Order Traversal; Validate BST; Lowest Common Ancestor of a BST; Kth Smallest in a BST; Construct Binary Tree from Preorder and Inorder |
| 8 | Heaps | Kth Largest Element; Last Stone Weight; K Closest Points to Origin; Task Scheduler; Merge K Sorted Lists; Find Median from Data Stream; Top K Frequent Words; Kth Largest in a Stream; Reorganize String; Sort Characters By Frequency |
| 9 | Graphs part 1 | Number of Islands; Clone Graph; Max Area of Island; Pacific Atlantic Water Flow; Surrounded Regions; Rotting Oranges; Walls and Gates; Word Ladder; Number of Connected Components; Graph Valid Tree |
| 10 | Graphs part 2 | Course Schedule; Course Schedule II; Alien Dictionary; Redundant Connection; Accounts Merge; Number of Provinces; Network Delay Time; Cheapest Flights Within K Stops; Min Cost to Connect All Points; Reconstruct Itinerary |
| 11 | Intervals, greedy | Merge Intervals; Insert Interval; Non-overlapping Intervals; Meeting Rooms; Meeting Rooms II; Minimum Arrows to Burst Balloons; Jump Game; Jump Game II; Gas Station; Partition Labels |
| 12 | MIXED - interleaving begins | 10 at random from everything above. Target: name the pattern within 2 minutes before writing any code |
| 13 | Backtracking | Subsets; Subsets II; Combination Sum; Combination Sum II; Permutations; Permutations II; Word Search; Palindrome Partitioning; Letter Combinations; N-Queens |
| 14 | DP part 1 | Climbing Stairs; Min Cost Climbing Stairs; House Robber; House Robber II; Coin Change; Coin Change II; Longest Increasing Subsequence; Word Break; Decode Ways; Maximum Product Subarray |
| 15-16 | Mixed medium | 12 per week, mixed, 3+ with no IDE. Plus re-solve every Weak List item |
| 17 | DP part 2 | Unique Paths; Unique Paths II; Longest Common Subsequence; Edit Distance; Partition Equal Subset Sum; Target Sum; Best Time to Buy and Sell Stock with Cooldown; Longest Palindromic Substring; Palindromic Substrings; 0/1 Knapsack |
| 18-20 | Mixed, all timed | 12 per week at 25 minutes each, narrated aloud in English, 4+ with no IDE |
| 21-24 | Timed + company-tagged | 2 medium per day. Amazon leans arrays, strings, hashing, trees, graphs, heaps. Google leans graphs, DP, recursion, and follow-up variations |
| 25-28 | Gap repair + hard | Company-tagged sets. Selected hard problems only in patterns you already own - hard problems in weak patterns teach nothing |
| 29-32 | Re-solve from memory | Every problem you ever failed, from memory, no hints. Then build your own one-page pattern sheet |

<a id="QD-B0074"></a>

### PART 9 - How to practise DSA with no laptop

<a id="QD-B0075"></a>

You travel four hours a day. That is not lost time - it is the best pattern recognition time you have, precisely because you cannot cheat by typing and running until it passes. Typing is the smallest part of the skill; recognition and justification are the rest, and both work perfectly on a train.

<a id="QD-B0076"></a>

Six drills. Pick one per journey. All of them need only your phone, or nothing at all.

<a id="QD-B0077"></a>

| Drill | Time | How |
| --- | --- | --- |
| 1. Pattern roll-call | 5 min | Name all fifteen patterns from memory, and one recognition cue for each. If you miss one, that is your Friday. Do this until it is boring, then keep doing it |
| 2. Problem to pattern | 15 min | Open your DSA log. Read only the problem name, cover everything else, and say the pattern plus the one-sentence insight. Twenty problems in fifteen minutes. This is the highest-value drill in this file - it trains exactly what an interview tests |
| 3. Invariant drill | 10 min | Pick a pattern. State the invariant that makes it correct, out loud, without notes. "Why does moving the shorter side never lose the answer?" If you cannot, you have memorised that pattern rather than understood it |
| 4. Complexity drill | 5 min | For each pattern, state time and space with the reason. Catch yourself saying O(n squared) for the monotonic stack |
| 5. Narration drill | 15 min | Pick a problem you solved. Explain the whole approach out loud as if to an interviewer: restate, brute force, the waste, the pattern, the walkthrough on a small example, the complexity, one variation. This is simultaneously DSA practice and English practice - the highest-efficiency overlap available to you |
| 6. Re-derive drill | 15 min | Pick a DP problem. Say the state definition sentence - "dp[i] is the ..." - and the recurrence, in your head. No table, no code. If the sentence does not come, that problem is not learned |

<a id="QD-B0078"></a>

What you cannot do on a train: first-time problem solving, and typing under a timer. Those need the desk. So spend desk time on new problems and timed solving, and commute time on recall, justification and narration. Splitting it that way means a four-hour commute makes your two desk hours more productive rather than competing with them.

<a id="QD-B0079"></a>

On weeks when work eats everything. Do drill 2 only, for fifteen minutes, on the way home. That is enough to keep the pattern set alive. A week of drill 2 costs you almost nothing and prevents the decay that makes people feel they have to restart.

<a id="QD-B0080"></a>

### PART 10 - The mistakes that keep people stuck

<a id="QD-B0081"></a>

| Mistake | What to do instead |
| --- | --- |
| Solving without logging the six fields | The log is the learning. Solving alone builds almost nothing durable |
| Reading the solution and moving on | Re-solve from scratch after 1, 3, 7 and 14 days, from memory. Otherwise you have read, not learned |
| Chasing a problem count | Chase the ability to name the pattern in two minutes. Count is an output |
| Practising by topic forever | From week 12, mixed sets only. Blocked practice feels better and teaches recognition of nothing |
| Skipping the brute force | State it first, always. The optimisation only means something as a response to a cost |
| Silent solving | Narrate from week 13. Interviews are narrated, and silent practice trains the wrong skill |
| Only ever practising in an IDE | Two problems a week in a plain text editor from week 9. Google interviews with no autocomplete and no compiler |
| Using AI to get unstuck | Never on DSA. Sit with it for 25 minutes, then read the solution and schedule a re-solve |
| Hard problems in weak patterns | Hard problems teach only in patterns you already own. Otherwise you are learning the answer, not the technique |
| Jumping to DP because it looks impressive | It is the most dependent topic, not the hardest. Without solid recursion it is table-filling you cannot debug |
| Not asking about input size | Ask. "What is n?" changes the right answer and reads as experience |
| Giving up on the follow-up | The variation column in your log is where follow-ups come from. Pre-answer them once and you are ready every time |

<a id="QD-B0082"></a>

The one-paragraph version. Learn the fifteen patterns in dependency order, because each is built from the last. For every problem write the brute force, the one-sentence insight, the invariant and one variation - five minutes that turn solving into learning. From week 12 practise mixed, so you train recognition rather than recall. Always be able to say why this pattern and not the obvious alternative, because that is the actual interview question. And use your commute for recall, justification and narration, which is most of the skill and needs no keyboard at all.

<a id="QA"></a>

## QA — Arrays

Full source content: [Devlopment/C#/Arrays.docx](../SOURCE_LIBRARY/Devlopment/C%23/Arrays.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="QA-B0001"></a>

### Level 1 — Array fundamentals

<a id="QA-B0002"></a>

You should be completely comfortable with:

<a id="QA-B0003"></a>

- What an array is

<a id="QA-B0004"></a>

An array is a fixed-size, strongly typed collection that stores multiple elements of the same type. Each element is accessed using an index, and array indexing provides O(1) access by index. In C#, arrays are reference types, even when they contain value types.

<a id="QA-B0005"></a>

- Indexing: arr[0]

<a id="QA-B0006"></a>

You have value → find index

<a id="QA-B0007"></a>

search through array → index

<a id="QA-B0008"></a>

O(n)
You have value → find index

<a id="QA-B0009"></a>

search through array → index

<a id="QA-B0010"></a>

O(n)

<a id="QA-B0011"></a>

- Length

<a id="QA-B0012"></a>

- Traversing with for / foreach/while/do..while

<a id="QA-B0013"></a>

- Reading and updating elements

<a id="QA-B0014"></a>

- 1D arrays

<a id="QA-B0015"></a>

- Basic 2D arrays

<a id="QA-B0016"></a>

- Passing arrays to methods

<a id="QA-B0017"></a>

- Array reference behavior in C#

<a id="QA-B0018"></a>

Arrays are reference types in C#. The array object is stored on the managed heap, and the variable holds a reference to that array.

<a id="QA-B0019"></a>

- Array.Sort(), Array.Reverse() — understand what they do, don't memorize every API


<a id="QA-B0020"></a>

- You should know:

<a id="QA-B0021"></a>

- 																Access by index       O(1)

<a id="QA-B0022"></a>

- 																Search unsorted       O(n)

<a id="QA-B0023"></a>

- 																Traverse              O(n)

<a id="QA-B0024"></a>

### Level 2 — Basic array problems

<a id="QA-B0025"></a>

- Find maximum

<a id="QA-B0026"></a>

- Find minimum

<a id="QA-B0027"></a>

- Find second largest

<a id="QA-B0028"></a>

- Reverse an array

<a id="QA-B0029"></a>

- Search for an element

<a id="QA-B0030"></a>

- Count occurrences

<a id="QA-B0031"></a>

- Check if array is sorted

<a id="QA-B0032"></a>

- Remove/handle duplicates

<a id="QA-B0033"></a>

- Move zeros

<a id="QA-B0034"></a>

- Find missing number

<a id="QA-B0035"></a>

- Find duplicate number

<a id="QA-B0036"></a>

- Merge two arrays

<a id="QA-B0037"></a>

Don't just memorize solutions.

<a id="QA-B0038"></a>

For every problem learn:

<a id="QA-B0039"></a>

What is the brute force?

<a id="QA-B0040"></a>

What is repeated work?

<a id="QA-B0041"></a>

Can I reduce the work?

<a id="QA-B0042"></a>

What data structure/pattern helps?

<a id="QA-B0043"></a>

Time complexity?

<a id="QA-B0044"></a>

Space complexity?

<a id="QA-B0045"></a>

### Level 3 — The important patterns ⭐

<a id="QA-B0046"></a>

This is the most important part of Arrays for interviews.

<a id="QA-B0047"></a>

You don't want to learn 100 random array problems.

<a id="QA-B0048"></a>

You want to recognize patterns.

<a id="QA-B0049"></a>

### 1. Two Pointers

<a id="QA-B0050"></a>

Example problems:

<a id="QA-B0051"></a>

Reverse array

<a id="QA-B0052"></a>

Two Sum (sorted)

<a id="QA-B0053"></a>

3Sum

<a id="QA-B0054"></a>

Container With Most Water

<a id="QA-B0055"></a>

Remove duplicates from sorted array

<a id="QA-B0056"></a>

Mental idea:

<a id="QA-B0057"></a>

left  →              ← right

<a id="QA-B0058"></a>

[1, 2, 3, 4, 5, 6]

<a id="QA-B0059"></a>

### 2. Sliding Window

<a id="QA-B0060"></a>

Very important.

<a id="QA-B0061"></a>

Example:

<a id="QA-B0062"></a>

Find maximum sum of k consecutive elements

<a id="QA-B0063"></a>

Longest substring without repeating characters

<a id="QA-B0064"></a>

Minimum size subarray

<a id="QA-B0065"></a>

Mental model:

<a id="QA-B0066"></a>

[1 2 3 4 5 6 7]

<a id="QA-B0067"></a>

 ↑-----↑

<a id="QA-B0068"></a>

 window

<a id="QA-B0069"></a>

Instead of recalculating the entire window every time, maintain the current window.

<a id="QA-B0070"></a>

### 3. Hashing

<a id="QA-B0071"></a>

This is where your recent Two Sum discussion fits.

<a id="QA-B0072"></a>

C#:

<a id="QA-B0073"></a>

Dictionary<int, int>

<a id="QA-B0074"></a>

HashSet<int>

<a id="QA-B0075"></a>

Typical problems:

<a id="QA-B0076"></a>

Two Sum

<a id="QA-B0077"></a>

Contains Duplicate

<a id="QA-B0078"></a>

Group Anagrams

<a id="QA-B0079"></a>

Frequency counting

<a id="QA-B0080"></a>

Longest Consecutive Sequence

<a id="QA-B0081"></a>

Mental question:

<a id="QA-B0082"></a>

Can I remember something I've already seen so I don't have to search again?

<a id="QA-B0083"></a>

### 4. Prefix Sum

<a id="QA-B0084"></a>

Very useful for range/sum problems.

<a id="QA-B0085"></a>

Example:

<a id="QA-B0086"></a>

nums = [2, 4, 1, 3]

<a id="QA-B0087"></a>

Instead of repeatedly calculating:

<a id="QA-B0088"></a>

2 + 4 + 1

<a id="QA-B0089"></a>

2 + 4

<a id="QA-B0090"></a>

4 + 1 + 3

<a id="QA-B0091"></a>

...

<a id="QA-B0092"></a>

build cumulative information.

<a id="QA-B0093"></a>

Used in:

<a id="QA-B0094"></a>

Range Sum

<a id="QA-B0095"></a>

Subarray Sum

<a id="QA-B0096"></a>

Subarray Sum Equals K

<a id="QA-B0097"></a>

### 5. Binary Search

<a id="QA-B0098"></a>

Extremely important.

<a id="QA-B0099"></a>

You should understand:

<a id="QA-B0100"></a>

Search space

<a id="QA-B0101"></a>

left

<a id="QA-B0102"></a>

right

<a id="QA-B0103"></a>

middle

<a id="QA-B0104"></a>

and why it becomes:

<a id="QA-B0105"></a>

O(log n)

<a id="QA-B0106"></a>

Problems include:

<a id="QA-B0107"></a>

Binary Search

<a id="QA-B0108"></a>

Search Insert Position

<a id="QA-B0109"></a>

First/Last Position

<a id="QA-B0110"></a>

Search in Rotated Sorted Array

<a id="QA-B0111"></a>

Later you'll also learn binary search on the answer, which is more advanced.

<a id="QA-B0112"></a>

### Level 4 — Important array techniques

<a id="QA-B0113"></a>

After the above patterns:

<a id="QA-B0114"></a>

### Sorting

<a id="QA-B0115"></a>

Understand:

<a id="QA-B0116"></a>

- Why sorting can help

<a id="QA-B0117"></a>

- Built-in sorting

<a id="QA-B0118"></a>

- Basic sorting concepts

<a id="QA-B0119"></a>

- When sorting changes complexity

<a id="QA-B0120"></a>

You don't need to spend weeks implementing every sorting algorithm.

<a id="QA-B0121"></a>

But you should understand at least:

<a id="QA-B0122"></a>

Bubble Sort

<a id="QA-B0123"></a>

Selection Sort

<a id="QA-B0124"></a>

Insertion Sort

<a id="QA-B0125"></a>

Merge Sort

<a id="QA-B0126"></a>

Quick Sort

<a id="QA-B0127"></a>

More importantly, know roughly:

<a id="QA-B0128"></a>

O(n²)

<a id="QA-B0129"></a>

O(n log n)

<a id="QA-B0130"></a>

and why.

<a id="QA-B0131"></a>

### Kadane's Algorithm

<a id="QA-B0132"></a>

Important interview pattern for:

<a id="QA-B0133"></a>

Maximum subarray sum

<a id="QA-B0134"></a>

Example:

<a id="QA-B0135"></a>

[-2,1,-3,4,-1,2,1,-5,4]

<a id="QA-B0136"></a>

Answer:

<a id="QA-B0137"></a>

4 + (-1) + 2 + 1 = 6

<a id="QA-B0138"></a>

This is worth learning properly because it teaches you how to maintain useful state while traversing an array.

<a id="QA-B0139"></a>

### Intervals

<a id="QA-B0140"></a>

Examples:

<a id="QA-B0141"></a>

Merge Intervals

<a id="QA-B0142"></a>

Insert Interval

<a id="QA-B0143"></a>

Meeting Rooms

<a id="QA-B0144"></a>

This is technically its own pattern, but arrays are where you'll encounter it.

<a id="QA-B0145"></a>

### Level 5 — Advanced array problems

<a id="QA-B0146"></a>

Don't start these now.

<a id="QA-B0147"></a>

Later:

<a id="QA-B0148"></a>

- Monotonic Stack

<a id="QA-B0149"></a>

- Difference Array

<a id="QA-B0150"></a>

- Sweep Line

<a id="QA-B0151"></a>

- Advanced prefix/suffix techniques

<a id="QA-B0152"></a>

- Matrix problems

<a id="QA-B0153"></a>

- 2D grid traversal

<a id="QA-B0154"></a>

- Binary search on answer

<a id="QA-B0155"></a>

- Advanced greedy techniques

<a id="QA-B0156"></a>

### 1. Array fundamentals ⭐

<a id="QA-B0157"></a>

Learn:

<a id="QA-B0158"></a>

- What an array is

<a id="QA-B0159"></a>

- Index

<a id="QA-B0160"></a>

- Length

<a id="QA-B0161"></a>

- Zero-based indexing

<a id="QA-B0162"></a>

- Access

<a id="QA-B0163"></a>

- Update

<a id="QA-B0164"></a>

- Traversal

<a id="QA-B0165"></a>

- 1D array

<a id="QA-B0166"></a>

- 2D array

<a id="QA-B0167"></a>

- Nested loops for 2D

<a id="QA-B0168"></a>

- Passing array to a method

<a id="QA-B0169"></a>

- Array reference behavior in C#

<a id="QA-B0170"></a>

- Basic array creation

<a id="QA-B0171"></a>

- Fixed size

<a id="QA-B0172"></a>

- What happens when accessing an invalid index

<a id="QA-B0173"></a>

Complexity:

<a id="QA-B0174"></a>

arr[i]             O(1)

<a id="QA-B0175"></a>

arr.Length         O(1)

<a id="QA-B0176"></a>

traversal          O(n)

<a id="QA-B0177"></a>

linear search      O(n)

<a id="QA-B0178"></a>

### Problems

<a id="QA-B0179"></a>

Start extremely easy:

<a id="QA-B0180"></a>

- Find largest element

<a id="QA-B0181"></a>

- Find smallest element

<a id="QA-B0182"></a>

- Find an element

<a id="QA-B0183"></a>

- Count an element

<a id="QA-B0184"></a>

- Check if sorted

<a id="QA-B0185"></a>

Don't move on until these feel easy.

<a id="QA-B0186"></a>

### 2. Array operations + complexity ⭐

<a id="QA-B0187"></a>

Understand:

<a id="QA-B0188"></a>

Access

<a id="QA-B0189"></a>

Search

<a id="QA-B0190"></a>

Insert

<a id="QA-B0191"></a>

Delete

<a id="QA-B0192"></a>

Update

<a id="QA-B0193"></a>

For an array:

<a id="QA-B0194"></a>

Access       O(1)

<a id="QA-B0195"></a>

Search       O(n)

<a id="QA-B0196"></a>

Update       O(1)

<a id="QA-B0197"></a>

Insert       O(n)      // generally, if shifting is needed

<a id="QA-B0198"></a>

Delete       O(n)      // generally, if shifting is needed

<a id="QA-B0199"></a>

The important thing is why.

<a id="QA-B0200"></a>

For example:

<a id="QA-B0201"></a>

[10,20,30,40,50]

<a id="QA-B0202"></a>

Insert 25 between 20 and 30.

<a id="QA-B0203"></a>

You have to shift:

<a id="QA-B0204"></a>

30 → right

<a id="QA-B0205"></a>

40 → right

<a id="QA-B0206"></a>

50 → right

<a id="QA-B0207"></a>

That's why insertion can be O(n).

<a id="QA-B0208"></a>

### 3. Basic traversal pattern ⭐

<a id="QA-B0209"></a>

Learn to scan an array once while maintaining some information.

<a id="QA-B0210"></a>

Problems:

<a id="QA-B0211"></a>

- Maximum

<a id="QA-B0212"></a>

- Minimum

<a id="QA-B0213"></a>

- Sum

<a id="QA-B0214"></a>

- Count

<a id="QA-B0215"></a>

- Second largest

<a id="QA-B0216"></a>

- Check sorted

<a id="QA-B0217"></a>

- Find first occurrence

<a id="QA-B0218"></a>

- Find last occurrence

<a id="QA-B0219"></a>

This teaches:

<a id="QA-B0220"></a>

One pass + maintain state

<a id="QA-B0221"></a>

This is one of the most important basic DSA skills.

<a id="QA-B0222"></a>

### 4. In-place modification ⭐

<a id="QA-B0223"></a>

Learn the difference between:

<a id="QA-B0224"></a>

Using extra array

<a id="QA-B0225"></a>

and:

<a id="QA-B0226"></a>

Changing the original array

<a id="QA-B0227"></a>

Problems:

<a id="QA-B0228"></a>

- Reverse Array

<a id="QA-B0229"></a>

- Move Zeroes

<a id="QA-B0230"></a>

- Remove Element

<a id="QA-B0231"></a>

- Remove Duplicates from Sorted Array

<a id="QA-B0232"></a>

This leads directly into two pointers.

<a id="QA-B0233"></a>

### 5. Frequency counting ⭐⭐⭐

<a id="QA-B0234"></a>

Learn:

<a id="QA-B0235"></a>

How many times does each value appear?

<a id="QA-B0236"></a>

Example:

<a id="QA-B0237"></a>

[1,2,2,3,3,3]

<a id="QA-B0238"></a>

Result:

<a id="QA-B0239"></a>

1 → 1

<a id="QA-B0240"></a>

2 → 2

<a id="QA-B0241"></a>

3 → 3

<a id="QA-B0242"></a>

Learn both:

<a id="QA-B0243"></a>

Dictionary<int,int>

<a id="QA-B0244"></a>

and:

<a id="QA-B0245"></a>

HashSet<int>

<a id="QA-B0246"></a>

Understand when each one is appropriate.

<a id="QA-B0247"></a>

Problems:

<a id="QA-B0248"></a>

- Contains Duplicate

<a id="QA-B0249"></a>

- Valid Anagram

<a id="QA-B0250"></a>

- Majority Element

<a id="QA-B0251"></a>

- Frequency problems

<a id="QA-B0252"></a>

### 6. Hashing ⭐⭐⭐

<a id="QA-B0253"></a>

This deserves its own section because it appears everywhere.

<a id="QA-B0254"></a>

Mental model:

<a id="QA-B0255"></a>

"I need fast lookup."

<a id="QA-B0256"></a>

        ↓

<a id="QA-B0257"></a>

Can I remember previous information?

<a id="QA-B0258"></a>

        ↓

<a id="QA-B0259"></a>

HashSet / Dictionary

<a id="QA-B0260"></a>

Problems:

<a id="QA-B0261"></a>

- Contains Duplicate

<a id="QA-B0262"></a>

- Two Sum

<a id="QA-B0263"></a>

- Group Anagrams

<a id="QA-B0264"></a>

- Longest Consecutive Sequence

<a id="QA-B0265"></a>

- Frequency counting

<a id="QA-B0266"></a>

You already started Two Sum, so we'll revisit it after properly learning hashing.

<a id="QA-B0267"></a>

### 7. Two Pointers ⭐⭐⭐

<a id="QA-B0268"></a>

Learn:

<a id="QA-B0269"></a>

left

<a id="QA-B0270"></a>

right

<a id="QA-B0271"></a>

and how they move based on conditions.

<a id="QA-B0272"></a>

Problems:

<a id="QA-B0273"></a>

- Reverse String/Array

<a id="QA-B0274"></a>

- Two Sum II

<a id="QA-B0275"></a>

- Remove Duplicates

<a id="QA-B0276"></a>

- Move Zeroes

<a id="QA-B0277"></a>

- Container With Most Water

<a id="QA-B0278"></a>

- 3Sum

<a id="QA-B0279"></a>

Important question:

<a id="QA-B0280"></a>

Why is moving a pointer safe?

<a id="QA-B0281"></a>

Don't memorize pointer movements.

<a id="QA-B0282"></a>

Understand why the movement eliminates impossible possibilities.

<a id="QA-B0283"></a>

### 8. Sorting + Arrays ⭐⭐⭐

<a id="QA-B0284"></a>

Learn the basic idea of:

<a id="QA-B0285"></a>

- Bubble Sort

<a id="QA-B0286"></a>

- Selection Sort

<a id="QA-B0287"></a>

- Insertion Sort

<a id="QA-B0288"></a>

- Merge Sort

<a id="QA-B0289"></a>

- Quick Sort

<a id="QA-B0290"></a>

You don't need to spend enormous time implementing all of them.

<a id="QA-B0291"></a>

You do need to understand:

<a id="QA-B0292"></a>

Why sorting can make a problem easier.

<a id="QA-B0293"></a>

And understand roughly:

<a id="QA-B0294"></a>

O(n²)

<a id="QA-B0295"></a>

O(n log n)

<a id="QA-B0296"></a>

Problems:

<a id="QA-B0297"></a>

- 3Sum

<a id="QA-B0298"></a>

- Merge Sorted Array

<a id="QA-B0299"></a>

- Sort Colors

<a id="QA-B0300"></a>

- Meeting/interval problems later

<a id="QA-B0301"></a>

### 9. Prefix Sum ⭐⭐⭐

<a id="QA-B0302"></a>

Mental model:

<a id="QA-B0303"></a>

Store previous cumulative information so I don't repeatedly calculate it.

<a id="QA-B0304"></a>

Example:

<a id="QA-B0305"></a>

nums = [2, 4, 1, 3]

<a id="QA-B0306"></a>

prefix = [2, 6, 7, 10]

<a id="QA-B0307"></a>

Then range calculations become much cheaper.

<a id="QA-B0308"></a>

Problems:

<a id="QA-B0309"></a>

- Range Sum Query

<a id="QA-B0310"></a>

- Subarray Sum

<a id="QA-B0311"></a>

- Subarray Sum Equals K

<a id="QA-B0312"></a>

### 10. Sliding Window ⭐⭐⭐

<a id="QA-B0313"></a>

This is a must-know FAANG pattern.

<a id="QA-B0314"></a>

Start with fixed-size window:

<a id="QA-B0315"></a>

[1,2,3,4,5,6]

<a id="QA-B0316"></a>

 ↑-----↑

<a id="QA-B0317"></a>

Then variable-size window.

<a id="QA-B0318"></a>

Learn:

<a id="QA-B0319"></a>

- Fixed window

<a id="QA-B0320"></a>

- Variable window

<a id="QA-B0321"></a>

- Expand

<a id="QA-B0322"></a>

- Shrink

<a id="QA-B0323"></a>

- Maintain window state

<a id="QA-B0324"></a>

Problems:

<a id="QA-B0325"></a>

- Maximum sum of subarray of size K

<a id="QA-B0326"></a>

- Longest Substring Without Repeating Characters

<a id="QA-B0327"></a>

- Minimum Size Subarray Sum

<a id="QA-B0328"></a>

- Permutation-related window problems

<a id="QA-B0329"></a>

### 11. Binary Search ⭐⭐⭐

<a id="QA-B0330"></a>

Do not just learn:

<a id="QA-B0331"></a>

Array.BinarySearch()

<a id="QA-B0332"></a>

You need to understand the algorithm yourself.

<a id="QA-B0333"></a>

Learn:

<a id="QA-B0334"></a>

left

<a id="QA-B0335"></a>

right

<a id="QA-B0336"></a>

mid

<a id="QA-B0337"></a>

search space

<a id="QA-B0338"></a>

elimination

<a id="QA-B0339"></a>

Then:

<a id="QA-B0340"></a>

- Basic binary search

<a id="QA-B0341"></a>

- Search insert position

<a id="QA-B0342"></a>

- First occurrence

<a id="QA-B0343"></a>

- Last occurrence

<a id="QA-B0344"></a>

- Lower bound

<a id="QA-B0345"></a>

- Upper bound

<a id="QA-B0346"></a>

- Rotated sorted array

<a id="QA-B0347"></a>

### 12. Binary Search on Answer ⭐⭐⭐

<a id="QA-B0348"></a>

This is where things become more interview-level.

<a id="QA-B0349"></a>

Instead of:

<a id="QA-B0350"></a>

"Find this number."

<a id="QA-B0351"></a>

You ask:

<a id="QA-B0352"></a>

"What is the minimum/maximum possible answer?"

<a id="QA-B0353"></a>

Then binary search the answer range.

<a id="QA-B0354"></a>

Examples:

<a id="QA-B0355"></a>

- Koko Eating Bananas

<a id="QA-B0356"></a>

- Capacity to Ship Packages Within D Days

<a id="QA-B0357"></a>

- Split Array Largest Sum

<a id="QA-B0358"></a>

Don't learn this until normal binary search is solid.

<a id="QA-B0359"></a>

### 13. Kadane's Algorithm ⭐⭐⭐

<a id="QA-B0360"></a>

Learn the idea, not just the code.

<a id="QA-B0361"></a>

Problem:

<a id="QA-B0362"></a>

Maximum Subarray

<a id="QA-B0363"></a>

Example:

<a id="QA-B0364"></a>

[-2,1,-3,4,-1,2,1,-5,4]

<a id="QA-B0365"></a>

Answer:

<a id="QA-B0366"></a>

6

<a id="QA-B0367"></a>

because:

<a id="QA-B0368"></a>

4 + (-1) + 2 + 1 = 6

<a id="QA-B0369"></a>

This teaches you how to maintain the best state so far.

<a id="QA-B0370"></a>

### 14. Intervals ⭐⭐⭐

<a id="QA-B0371"></a>

Learn:

<a id="QA-B0372"></a>

overlap

<a id="QA-B0373"></a>

sort by start

<a id="QA-B0374"></a>

merge

<a id="QA-B0375"></a>

Problems:

<a id="QA-B0376"></a>

- Merge Intervals

<a id="QA-B0377"></a>

- Insert Interval

<a id="QA-B0378"></a>

- Non-overlapping Intervals

<a id="QA-B0379"></a>

- Meeting Rooms

<a id="QA-B0380"></a>

This is a very common interview pattern.

<a id="QA-B0381"></a>

### 15. 2D Arrays / Matrix ⭐⭐

<a id="QA-B0382"></a>

Learn:

<a id="QA-B0383"></a>

- Row/column traversal

<a id="QA-B0384"></a>

- Nested loops

<a id="QA-B0385"></a>

- Search

<a id="QA-B0386"></a>

- Matrix modification

<a id="QA-B0387"></a>

- Boundary handling

<a id="QA-B0388"></a>

Problems:

<a id="QA-B0389"></a>

- Search a 2D Matrix

<a id="QA-B0390"></a>

- Set Matrix Zeroes

<a id="QA-B0391"></a>

- Rotate Image

<a id="QA-B0392"></a>

- Spiral Matrix

<a id="QA-B0393"></a>

### 16. Subarray thinking ⭐⭐⭐

<a id="QA-B0394"></a>

You need to clearly understand:

<a id="QA-B0395"></a>

subarray = contiguous

<a id="QA-B0396"></a>

For:

<a id="QA-B0397"></a>

[1,2,3]

<a id="QA-B0398"></a>

valid subarrays include:

<a id="QA-B0399"></a>

[1]

<a id="QA-B0400"></a>

[2]

<a id="QA-B0401"></a>

[3]

<a id="QA-B0402"></a>

[1,2]

<a id="QA-B0403"></a>

[2,3]

<a id="QA-B0404"></a>

[1,2,3]

<a id="QA-B0405"></a>

This becomes extremely important with:

<a id="QA-B0406"></a>

- Prefix Sum

<a id="QA-B0407"></a>

- Hashing

<a id="QA-B0408"></a>

- Sliding Window

<a id="QA-B0409"></a>

- Kadane

<a id="QA-B0410"></a>

### 17. Monotonic Stack ⭐⭐⭐

<a id="QA-B0411"></a>

This is technically a stack pattern, but many important problems start from arrays.

<a id="QA-B0412"></a>

Learn:

<a id="QA-B0413"></a>

Increasing stack

<a id="QA-B0414"></a>

Decreasing stack

<a id="QA-B0415"></a>

Problems:

<a id="QA-B0416"></a>

- Next Greater Element

<a id="QA-B0417"></a>

- Daily Temperatures

<a id="QA-B0418"></a>

- Largest Rectangle in Histogram

<a id="QA-B0419"></a>

Don't learn this yet. It comes after Stack.

<a id="QA-B0420"></a>

### 18. Advanced array techniques

<a id="QA-B0421"></a>

Later, after the core patterns:

<a id="QA-B0422"></a>

- Prefix/suffix arrays

<a id="QA-B0423"></a>

- Difference arrays

<a id="QA-B0424"></a>

- Partitioning

<a id="QA-B0425"></a>

- Dutch National Flag

<a id="QA-B0426"></a>

- Cyclic sort

<a id="QA-B0427"></a>

- Sweep line

<a id="QA-B0428"></a>

- Advanced binary search

<a id="QA-B0429"></a>

- Coordinate compression

<a id="QA-B0430"></a>

- Advanced matrix problems

<a id="QA-B0431"></a>

1. What is the input?

<a id="QA-B0432"></a>

2. What is the output?

<a id="QA-B0433"></a>

3. What are the constraints?

<a id="QA-B0434"></a>

4. What is the brute force?

<a id="QA-B0435"></a>

5. What is its complexity?

<a id="QA-B0436"></a>

6. What work is repeated?

<a id="QA-B0437"></a>

7. Can hashing remove it?

<a id="QA-B0438"></a>

8. Can two pointers remove it?

<a id="QA-B0439"></a>

9. Can a sliding window help?

<a id="QA-B0440"></a>

10. Can prefix sum help?

<a id="QA-B0441"></a>

11. Is the data sorted?

<a id="QA-B0442"></a>

12. Would sorting help?

<a id="QA-B0443"></a>

13. Is this a binary-search problem?

<a id="QA-B0444"></a>

14. Is this a subarray problem?

<a id="QA-B0445"></a>

15. Is this an interval problem?

<a id="QA-B0446"></a>

16. Is this a matrix problem?

<a id="QA-B0447"></a>

17. Can I do it in-place?

<a id="QA-B0448"></a>

18. What are the edge cases?

<a id="QA-B0449"></a>

19. Time complexity?

<a id="QA-B0450"></a>

20. Space complexity?
