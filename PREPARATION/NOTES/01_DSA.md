# Data structures and algorithms

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Patterns, invariants, the order to learn them in, the per-problem protocol, and every original DSA list. The day-by-day problems are in the week files and in PROBLEMS.md.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- ➕ How to use this chapter
- ➕ The per-problem protocol, step by step
- ➕ C# interview toolkit (.NET 10)
- ➕ Edge-case checklist
- ➕ Deriving complexity from code
- DSA Master Guide (Q-and-A/DSA_MASTER_GUIDE.docx)
- Array stages A–M and the DSA syllabus (12 Oct guide)
- DSA pattern encyclopedia (FAANG plan, Part 2)
- ➕ Pattern templates in C#: index
- ➕ Two pointers: templates
- ➕ Sliding window: templates
- ➕ Prefix sums, prefix + hash map, difference array
- ➕ Binary search: exact match, bounds, rotated arrays
- ➕ Binary search on the answer
- ➕ Stacks and queues
- ➕ Monotonic stack and monotonic deque
- ➕ Linked lists
- ➕ Recursion
- ➕ Backtracking
- ➕ Sorting algorithms
- ➕ Matrix and grid patterns
- ➕ Intervals
- ➕ Advanced array techniques
- ➕ Bits and math
- ➕ Trees: traversals, return values, state, construction
- ➕ Heaps and C# PriorityQueue
- ➕ Graphs: representation, traversal, cycles, topological sort, DSU
- ➕ Shortest paths: BFS, 0-1 BFS, Dijkstra, Bellman-Ford, Floyd–Warshall
- ➕ Minimum spanning tree: Kruskal and Prim
- ➕ Strongly connected components, bridges, articulation points (extension)
- ➕ Greedy: choice, proof, counterexample
- ➕ Dynamic programming families
- ➕ Trie (prefix tree)
- ➕ Advanced string matching: KMP, Z-algorithm, Rabin–Karp (extension)
- ➕ Range queries: prefix sums, Fenwick tree, segment tree (extension)

---

<a id="add-dsa-start"></a>

## ➕ How to use this chapter

This chapter has three parts.

1. **The ➕ sections at the top** (down to "Deriving complexity from code"). Read them once in week 1. Return to the protocol and the C# toolkit often.
2. **The original guides in the middle**: the fifteen patterns, the decision table ([Part 4](#dsa-part-4-how-to-pick-a-pattern-in-two-minutes)) and "why this instead of that" ([Part 5](#dsa-part-5-why-this-instead-of-that)). These explain *why*.
3. **The ➕ templates at the end** ([index](#add-dsa-templates)): one C# template per pattern, with bugs and classic problems. Open the matching one when you start a topic.

### The learning order

Each step uses the steps before it. [Part 1](#dsa-part-1-why-the-order-matters) explains why. The week files give the exact dates.

| Step | Topic | Read | Move on when you can... |
|---|---|---|---|
| 1 | Arrays, matrices, complexity | [Matrix](#add-dsa-matrix), [Edge cases](#add-dsa-edge-cases), [Complexity](#add-dsa-complexity) | write sum, max, reverse, search and sorted-check from memory, and test empty and one-element input |
| 2 | Hashing | [Toolkit](#add-dsa-csharp-toolkit) | choose HashSet or Dictionary and explain "O(1) expected" |
| 3 | Strings, two pointers | [Two pointers](#add-dsa-two-pointers) | explain why each pointer move is safe |
| 4 | Sliding window, prefix sums | [Window](#add-dsa-sliding-window), [Prefix](#add-dsa-prefix-hash) | say when a window is valid, and when you need prefix sums + a map instead |
| 5 | Binary search, sorting | [Binary search](#add-dsa-binary-search), [On the answer](#add-dsa-binary-search-answer), [Sorting](#add-dsa-sorting) | write lower bound with no infinite loop; write merge sort |
| 6 | Linked lists, stacks, queues | [Linked list](#add-dsa-linked-list), [Stack and queue](#add-dsa-stack-queue) | reverse a list and draw every pointer change |
| 7 | Recursion, backtracking | [Recursion](#add-dsa-recursion), [Backtracking](#add-dsa-backtracking) | trace three levels of calls and undo state correctly |
| 8 | Trees, BST | [Trees](#add-dsa-trees) | return a value from each subtree and combine the values |
| 9 | Heaps | [Heaps](#add-dsa-heaps) | keep the top k items with a size-k heap |
| 10 | Graphs (BFS, DFS) | [Graphs](#add-dsa-graphs) | mark visited at the right moment on a grid |
| 11 | Topological sort, DSU | [Graphs](#add-dsa-graphs), [Part 3 #12](#dsa-12-topological-sort), [#13](#dsa-13-union-find-disjoint-set) | find a cycle by counting Kahn's output |
| 12 | Shortest paths, intervals, greedy | [Shortest paths](#add-dsa-shortest-paths), [Intervals](#add-dsa-intervals), [Greedy](#add-dsa-greedy) | choose BFS or Dijkstra; choose the sort key for intervals |
| 13 | Dynamic programming | [DP families](#add-dsa-dp-families) | write "dp[i] means ..." before any code |
| 14 | Monotonic stack, bits, tries | [Monotonic](#add-dsa-monotonic), [Bits and math](#add-dsa-bits-math), [Trie](#add-dsa-trie) | explain why a monotonic stack is O(n) |
| 15 | Mixed sets | [Part 4](#dsa-part-4-how-to-pick-a-pattern-in-two-minutes) | name the pattern within two minutes with no topic label |
| 16 | Advanced extensions | [Advanced arrays](#add-dsa-advanced-arrays), [MST](#add-dsa-mst), [SCC](#add-dsa-scc), [Strings](#add-dsa-strings-advanced), [Range queries](#add-dsa-range-queries) | only after steps 1–15 are solid |

### What "I know this pattern" means

All three must be true:

1. **You solve an unseen variation without a hint.** Not a problem you have seen before. A new problem from the same family.
2. **You explain the invariant.** One sentence: what is always true, and why each step keeps it true.
3. **You state time and space with a reason.** For example: "O(n), because each index enters and leaves the window once."

These are **not** proof: solving the same problem fast twice (you may only remember it), understanding a solution when you read it, or typing the code from memory.

**How to test yourself.** Pick one unseen problem from the family. Hide the topic label. Use a 35-minute timer. Then explain the solution aloud. If any of the three tests fails, the pattern stays "learning".

<a id="add-dsa-protocol"></a>

## ➕ The per-problem protocol, step by step

[Part 6](#dsa-part-6-the-per-problem-protocol) lists the log fields. This section gives the full order of work, the hint rule and a worked example.

### The eleven steps

1. **Restate** the problem in your own words: the input, the output and the main rule.
2. **Ask for constraints.** How large is n? What is the value range? Negatives? Duplicates? Is it sorted? Is an answer always present? May I change the input?
3. **Work a tiny example** by hand (3–5 elements). Write the expected output.
4. **Write the brute force and its cost.** Say it even if it is slow.
5. **Find the repeated work.** What does the brute force compute again and again?
6. **Choose a pattern and say its invariant.** For example: "Before index i, the map holds every earlier value."
7. **Code.** Use clear names. Handle the empty case first.
8. **Dry-run** your code on the tiny example. Track each variable in a small table. Do not run it yet.
9. **Edge tests.** Use the [edge-case checklist](#add-dsa-edge-cases). Pick the 3–4 rows that apply.
10. **State time and space with a reason.**
11. **Give one variation.** For example: "If the input were sorted, I would use two pointers and O(1) space."

In an interview, say steps 1–6 aloud before you type.

### The hint rule

- First make a **serious attempt**: steps 1–5 written down, and at least two patterns tried.
- After **25–35 minutes** with no new progress, read **one hint only**. Do not read the full solution.
- **Close the hint.** Rebuild the solution yourself, starting again from step 6.
- **Mark the log entry "Hint".** It goes on the re-solve ladder.
- If one hint is not enough, take the next hint in the same way. If you must read the full solution, close it, write the code yourself from memory, and mark the entry "Solution".
- **Never use AI to solve DSA.** Not for a hint, not to find your bug, not to explain the answer.

### The log and the re-solve ladder

Six fields for every problem (the same as Part 6):

| Brute force | Insight | Invariant | Time / space | Pattern | One variation |
|---|---|---|---|---|---|

Add two markers: **status** (Solo, Hint or Solution) and **the date you actually did it**.

**Re-solve ladder.** Every Hint or Solution problem is re-solved from a blank file on day **+1, +3, +7 and +14**. Count from the date you actually solved it, not the date in the plan.

- Example: solved with a hint on Mon 19 Oct 2026. Re-solve on Tue 20 Oct, Thu 22 Oct, Mon 26 Oct and Mon 2 Nov.
- If a re-solve fails, restart the ladder from that day.
- A problem leaves the ladder after a clean day-14 re-solve.

### Worked example: Two Sum

*Given `int[] nums` and `int target`, return the indexes of two different elements whose sum is `target`.*

**1. Restate.** "I return two different indexes i and j with nums[i] + nums[j] == target."

**2. Constraints.** Ask: How large is n? Are negatives allowed? Is there exactly one answer? Can I use the same index twice? What do I return if there is no answer? Assume: one answer exists, n can be large, negatives are allowed, the same index cannot be used twice.

**3. Tiny examples.** `[2, 7, 11, 15]`, target 9 → `[0, 1]`. `[3, 2, 4]`, target 6 → `[1, 2]` (not `[0, 0]`).

**4. Brute force.** Check every pair i < j. O(n²) time, O(1) space.

**5. Repeated work.** For each i, the inner loop searches for the value `target - nums[i]`. It searches the same earlier values again and again.

**6. Pattern and invariant.** Hash map of values seen so far (value → index). Invariant: when we reach index i, the map holds every value at indexes 0..i−1. So if the partner is on the left, one lookup finds it.

**7. Code.**

```csharp
public int[] TwoSum(int[] nums, int target)
{
    var seen = new Dictionary<int, int>();       // value -> index
    for (int i = 0; i < nums.Length; i++)
    {
        int need = target - nums[i];
        if (seen.TryGetValue(need, out int j))
            return [j, i];
        seen[nums[i]] = i;                       // insert AFTER the check
    }
    return [];                                   // contract: no pair found
}
```

**8. Dry run** on `[3, 2, 4]`, target 6:

| i | nums[i] | need | map before | action |
|---|---|---|---|---|
| 0 | 3 | 3 | {} | not found; add 3→0 |
| 1 | 2 | 4 | {3:0} | not found; add 2→1 |
| 2 | 4 | 2 | {3:0, 2:1} | found 2 at index 1 → return [1, 2] |

At i = 0, need = 3, and 3 is not in the map yet. This is why we check before we insert. If we inserted first, we would return `[0, 0]`.

**9. Edge tests.** `[3, 3]`, 6 → `[0, 1]` (duplicates work because we check before we overwrite). `[-1, -2, -3]`, -5 → `[1, 2]` (negatives). `[1, 2]`, 10 → `[]` (no answer). Values near `int.MaxValue`: `target - nums[i]` can overflow, so ask about the range.

**10. Complexity.** O(n) expected time: one pass, and each lookup and insert is O(1) expected. O(n) space for the map.

**11. Variation.** Sorted input → two pointers, O(1) space ([Two pointers](#add-dsa-two-pointers)).

**The log entry:**

| Field | Entry |
|---|---|
| Brute force | All pairs; O(n²) time, O(1) space |
| Insight | Look up the partner `target - x` in a map of earlier values |
| Invariant | At index i the map holds all values at 0..i−1; check before insert, so one element is never used twice |
| Time / space | O(n) expected time (one pass, O(1) expected per lookup); O(n) space |
| Pattern | Hashing: complement lookup |
| One variation | Sorted input → two pointers, O(1) space |
| Status / date | Solo, 19 Oct 2026 |

<a id="add-dsa-csharp-toolkit"></a>

## ➕ C# interview toolkit (.NET 10)

The tables give API → what it does → cost. Costs are for the normal case. "Expected" means average over hash behaviour.

Your interview platform may run an older C# version. Collection expressions such as `int[] a = [1, 2];` need C# 12 or later (verify on the platform).

### Arrays

| API | What it does | Cost |
|---|---|---|
| `new int[n]` | n slots, all 0 | O(n) to allocate and zero |
| `Array.Fill(a, -1)` | set every slot to -1 | O(n) |
| `Array.Sort(a)` | sort in place; unstable | O(n log n) |
| `Array.Sort(a, (x, y) => y.CompareTo(x))` | sort with a `Comparison<T>` (here: descending) | O(n log n) |
| `Array.Sort(iv, (p, q) => p[0].CompareTo(q[0]))` | sort an `int[][]` by its first column | O(n log n) |
| `Array.BinarySearch(a, x)` | index of x in a **sorted** array; negative if missing | O(log n) |
| `Array.Copy(src, 0, dst, 0, len)` | copy a range | O(len) |
| `(int[])a.Clone()` | new array, **shallow** copy | O(n) |
| `Array.Reverse(a)` | reverse in place | O(n) |
| `a[^1]`, `a[1..4]` | last element; a **new** 3-item array (a copy) | O(1); O(k) |

- **BinarySearch return value.** If the value is missing, the result is negative and `~result` is the index of the first element larger than the value (or `Length`). With duplicates, the docs say it returns one matching index, **not necessarily the first**. For the first occurrence, write your own [lower bound](#add-dsa-binary-search).

```csharp
int i = Array.BinarySearch(sorted, 5);
int insertAt = i >= 0 ? i : ~i;      // where 5 is, or where it would go
```

- **Shallow copy.** `var b = (int[][])grid.Clone();` copies only the row references. `b[0]` and `grid[0]` are the same row, so changing `b[0][0]` also changes `grid[0][0]`.
- **Reverse on arrays.** Use `Array.Reverse(a)`. In C# 14, `a.Reverse()` on an array may bind to an in-place span method, not to LINQ (verify).

### Rectangular `int[,]` vs jagged `int[][]`

| | `int[,] g = new int[r, c]` | `int[][] g = new int[r][]` |
|---|---|---|
| Shape | always rectangular | each row is a separate array; rows start as `null` |
| Access | `g[i, j]` | `g[i][j]` |
| Sizes | `g.GetLength(0)`, `g.GetLength(1)` | `g.Length`, `g[i].Length` |
| In interviews | rare | common; LeetCode C# grids are `int[][]` and `char[][]` (verify) |

Create a jagged grid: `var g = new int[r][]; for (int i = 0; i < r; i++) g[i] = new int[c];`

### `List<T>`

| API | What it does | Cost |
|---|---|---|
| `list.Add(x)` | append | amortised O(1); a resize copies O(n) |
| `list[i]`, `list.Count` | read by index; size | O(1) |
| `list.RemoveAt(list.Count - 1)` | remove the last item (use a List as a stack) | O(1) |
| `list.Insert(i, x)`, `list.RemoveAt(i)` | shift the later items | O(n − i) |
| `list.Contains(x)`, `list.Remove(x)`, `list.IndexOf(x)` | linear scan | O(n) |
| `list.Sort()`, `list.Sort((a, b) => ...)` | sort in place; unstable | O(n log n) |
| `list.BinarySearch(x)` | same `~` rule as arrays; list must be sorted | O(log n) |
| `new List<int>(path)` | copy | O(n) |

### `Dictionary<K,V>` and `HashSet<T>`

| API | What it does | Cost |
|---|---|---|
| `d[k] = v` | add or overwrite | O(1) expected |
| `d[k]` (read) | throws `KeyNotFoundException` if k is missing | O(1) expected |
| `d.TryGetValue(k, out var v)` | safe read; returns bool | O(1) expected |
| `d.GetValueOrDefault(k)` | the value, or `default` (0 for int) | O(1) expected |
| `d.ContainsKey(k)` | is the key there? | O(1) expected |
| `d.TryAdd(k, v)`, `d.Remove(k)` | add only if missing; remove. Both return bool | O(1) expected |
| `foreach (var (k, v) in d)` | all pairs; **no guaranteed order** | O(n) |
| `set.Add(x)` | returns **false** if x was already there | O(1) expected |
| `set.Contains(x)`, `set.Remove(x)` | membership; remove | O(1) expected |

```csharp
count[c] = count.GetValueOrDefault(c) + 1;      // counter idiom
if (!seen.Add(x)) return true;                  // duplicate found
int[] freq = new int[26]; freq[ch - 'a']++;     // lowercase letters only: simpler and faster
```

### `Stack<T>`, `Queue<T>`, `LinkedList<T>`

| API | What it does | Cost |
|---|---|---|
| `st.Push(x)`, `st.Pop()`, `st.Peek()` | last in, first out | O(1) (Push amortised) |
| `st.TryPop(out var x)`, `st.TryPeek(out var x)` | safe when empty | O(1) |
| `q.Enqueue(x)`, `q.Dequeue()`, `q.Peek()` | first in, first out | O(1) (Enqueue amortised) |
| `q.TryDequeue(out var x)` | safe when empty | O(1) |
| `ll.AddFirst(x)`, `ll.AddLast(x)` | add at an end; returns the `LinkedListNode<T>` | O(1) |
| `ll.Remove(node)` | remove a node you already hold | O(1) |
| `ll.Remove(value)` | search, then remove | O(n) |
| `ll.First`, `ll.Last`, `ll.RemoveFirst()`, `ll.RemoveLast()` | the two ends | O(1) |

- `Pop`, `Peek` and `Dequeue` on an empty collection throw `InvalidOperationException`. Check `Count` or use the `Try...` methods.
- .NET has **no built-in deque**. Use `LinkedList<T>` (both ends O(1)) or an array with head and tail indexes.

### `PriorityQueue<TElement, TPriority>`

| API | What it does | Cost |
|---|---|---|
| `pq.Enqueue(item, priority)` | add | O(log n) |
| `pq.Dequeue()` | remove and return the item with the **lowest** priority | O(log n) |
| `pq.Peek()`, `pq.TryPeek(out var item, out var pri)` | look at the minimum | O(1) |
| `pq.TryDequeue(out var item, out var pri)` | safe remove; also gives the priority | O(log n) |
| `pq.EnqueueDequeue(item, pri)` | add, then remove the minimum; useful for a size-k heap | O(log n) |
| `pq.Remove(...)` | remove one given element (.NET 9+, verify) | O(n) |
| `pq.Count` | size | O(1) |

- **Min-heap by default.** The docs say the lowest priority comes out first.
- **Equal priorities have no FIFO guarantee** (docs). If order matters, add a tie-breaker, for example a priority of `(dist, seq)`.
- **Max-heap:** pass a reversed comparer: `new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)))`. Or enqueue with priority `-x`. Negation fails for `int.MinValue`, because `-int.MinValue` overflows.
- **No decrease-key.** To "lower" a priority, enqueue the item again with the new priority. When you dequeue, skip stale entries:

```csharp
while (pq.TryDequeue(out int node, out int d))
{
    if (d > dist[node]) continue;    // stale: a better entry was already processed
    // ... process node ...
}
```

- `pq.UnorderedItems` is **not** in priority order.

### `SortedSet<T>` and `SortedDictionary<K,V>`

Both keep keys in sorted order (a balanced tree inside).

| API | What it does | Cost |
|---|---|---|
| `ss.Add(x)`, `ss.Remove(x)`, `ss.Contains(x)` | add, remove, test | O(log n) |
| `ss.Min`, `ss.Max` | smallest, largest | O(log n) |
| `ss.GetViewBetween(lo, hi)` | a live view of values in [lo, hi]; no copy (docs) | O(log n) to create (verify); `Count` on a view may scan (verify) |
| `sd[k] = v`, `sd.TryGetValue(k, out var v)`, `sd.Remove(k)` | sorted map operations | O(log n) |
| `foreach` over either one | sorted order | O(n) |

- `SortedSet` keeps no duplicates. For a multiset, use `SortedDictionary<int, int>` (value → count).
- Smallest value ≥ x: `var v = ss.GetViewBetween(x, int.MaxValue);` then `v.Min` if `v.Count > 0`.
- `Min` on an empty set returns `default` (0 for int), not an error. Check `Count` first.

### Strings and chars

| API | What it does | Cost |
|---|---|---|
| `s[i]`, `s.Length` | read a char; length | O(1) |
| `s + t`, `s += c` | makes a **new** string each time | O(length); in a loop O(n²) total |
| `sb.Append(x)` (`StringBuilder`) | add to a growable buffer | amortised O(1) per char |
| `sb.ToString()` | build the final string | O(n) |
| `sb.Length--` | remove the last char (useful in backtracking) | O(1) |
| `s.ToCharArray()`, `new string(arr)` | to a mutable `char[]` and back | O(n) |
| `s.Substring(i, len)`, `s[i..j]` | copy a part | O(len) |
| `s.AsSpan(i, len)` | a view; no copy | O(1) |
| `string.Join(",", items)` | join with a separator | O(total length) |
| `char.IsLetterOrDigit(c)`, `char.IsDigit(c)` | classify a char | O(1) |
| `char.ToLower(c)`, `char.ToLowerInvariant(c)` | lower case; Invariant ignores the current culture | O(1) |
| `c - 'a'`, `(char)('a' + k)`, `c - '0'` | letter ↔ 0..25; digit char → int | O(1) |

Strings are immutable. To change characters, edit a `char[]`, then call `new string(arr)`. Anagram key: `var arr = s.ToCharArray(); Array.Sort(arr); string key = new string(arr);` costs O(L log L).

### Numbers and overflow

| Item | Fact |
|---|---|
| `int.MaxValue` / `int.MinValue` | 2,147,483,647 (2³¹ − 1) / −2,147,483,648 |
| `long.MaxValue` | about 9.22 × 10¹⁸ |
| Silent overflow | by default int arithmetic wraps: for `x = int.MaxValue`, `x + 1` gives `int.MinValue` (unless the project turns on overflow checking) |
| `checked(a * b)` | throws `OverflowException` instead of wrapping |
| `(long)a * b` | cast **before** you multiply; `(long)(a * b)` is too late |
| `Math.Max`, `Math.Min`, `Math.Abs` | O(1); `Math.Abs(int.MinValue)` throws `OverflowException` |
| Integer division and `%` | truncate toward zero: `-7 / 2 == -3`, `-7 % 3 == -1` |
| "Infinity" | `int.MaxValue + 1` overflows; use `int.MaxValue / 2` or `long` |

### Keys, comparers and ranges

| Item | Example | Note |
|---|---|---|
| Tuple key | `var seen = new HashSet<(int r, int c)>(); seen.Add((r, c));` | value tuples compare by value |
| Record key | `record struct Point(int R, int C);` then `Dictionary<Point, int>` | value equality is generated; never change a key after you insert it |
| Array key | `HashSet<int[]>` | **wrong**: arrays compare by reference; use a tuple or string key |
| Comparer object | `Comparer<int>.Create((a, b) => b.CompareTo(a))` | an `IComparer<int>` for PriorityQueue, SortedSet, Sort |
| Two-key sort | `list.Sort((a, b) => a.x != b.x ? a.x.CompareTo(b.x) : b.y.CompareTo(a.y));` | x ascending, then y descending |
| Bad comparer | `(a, b) => a - b` | overflows for large values; use `CompareTo` |
| `Enumerable.Range(start, count)` | `Enumerable.Range(1, 5)` gives 1..5 | the second argument is the **count**, not the end |

### LINQ: useful, but count its cost

| Call | Cost | Note |
|---|---|---|
| `OrderBy(x => x)` | O(n log n) | stable sort (docs); never call it inside a loop |
| `list.Contains(x)` | O(n) | inside a loop it becomes O(n²); use a HashSet |
| `ToList()`, `ToArray()` | O(n) | always a copy |
| `Count()` on a plain `IEnumerable` | O(n) | the `.Count` / `.Length` property is O(1) |
| `Distinct()` | O(n) expected, O(n) space | builds a hash set inside |
| `Sum()` on ints | O(n) | throws `OverflowException` if the int sum overflows |
| `Max()`, `Min()` | O(n) | throws on an empty int sequence |
| Deferred execution | — | a query runs again each time you enumerate it |

In interviews, write the core algorithm with loops. Use LINQ only for small setup steps, and say its cost.

### Recursion depth

- Each call uses one stack frame. Depth d means O(d) stack space.
- The thread stack has a fixed size. It is often about 1 MB on Windows, and other systems differ (verify). Recursion 100,000 levels deep (for example on a long linked list or a path-shaped tree) can overflow it.
- The docs say you cannot catch `StackOverflowException` with try/catch. The process ends.
- C# does not guarantee tail-call optimisation. Do not rely on it.
- Fixes: rewrite the code with an explicit `Stack<T>`. Or, only when you control the process, run the work on a thread with a bigger stack: `var t = new Thread(Run, 256 * 1024 * 1024); t.Start(); t.Join();`

<a id="add-dsa-edge-cases"></a>

## ➕ Edge-case checklist

Use it at step 9 of the protocol. Pick the rows that apply and say aloud which ones you test.

| Case | Example input | What usually breaks |
|---|---|---|
| Empty | `[]`, `""`, `root == null` | reading `a[0]`; `Max()` on empty; a wrong starting value |
| One or two elements | `[5]`, `[1, 2]` | loops that start at 1; pair problems; `while (l < r)` exits at once |
| Duplicates | `[2, 2, 2, 3]` | first/last occurrence; repeated triplets in 3Sum; set vs count |
| Negatives | `[-3, -1, -2]` | sliding-window sum rules; a max that starts at 0 |
| Zeros | `[0, 0, 1]` | products; division by zero; prefix sums that repeat |
| Overflow | values near `int.MaxValue`; 10⁵ values of 10⁹ | sums, products, `a - b` comparers, `(lo + hi) / 2` |
| All equal | `[7, 7, 7]` | Lomuto quicksort becomes O(n²); "strictly greater" checks |
| Sorted / reverse sorted | `[1, 2, 3, 4]`, `[4, 3, 2, 1]` | a fixed-pivot quicksort becomes O(n²); monotonic stack never pops or always pops |
| Very large n | n = 10⁵ or 10⁶ | O(n²) is too slow; recursion depth; memory |
| Off-by-one at boundaries | answer at index 0 or n−1; k = 1; k = n | `<` vs `<=`; window size `r - l + 1`; last group not added |
| Answer missing | target not present | return -1 or `[]` as the contract says; index past the end |
| Cycles | a linked list cycle; a graph cycle | infinite loop without a visited set or fast/slow pointers |
| Disconnected graph | two islands; a node with no edges | BFS from one node only; you must loop over all nodes |
| Null nodes | `head.next == null`, a missing child | `NullReferenceException` on `node.next.next` |
| Characters | spaces, upper case, digits, symbols | `c - 'a'` falls outside 0..25 |
| Grid shape | 1×1, 1×n, n×1, not square | spiral, rotate, row/column bounds |

<a id="add-dsa-complexity"></a>

## ➕ Deriving complexity from code

[Part 7](#dsa-part-7-complexity-stated-properly) gives the rules for *stating* complexity. This section shows how to *compute* it.

### Five rules

1. **Blocks one after another add.** A loop over n, then a loop over m: O(n + m).
2. **Nested loops multiply** when the inner loop runs fully for each outer step: O(n · m).
3. **Halving gives log.** `while (n > 0) n /= 2;` runs O(log n) times.
4. **Count total moves, not loop shape.** If a pointer only moves forward, it moves at most n times in total, even inside a nested `while`.
5. **Recursion: number of calls × work per call.** Space is the maximum depth.

```csharp
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)    // runs n-1, n-2, ..., 0 times
        Check(i, j);                    // O(1)
```

Total = (n−1) + (n−2) + ... + 0 = n(n−1)/2 → O(n²).

```csharp
int r = 0;
for (int l = 0; l < n; l++)
    while (r < n && Ok(l, r)) r++;     // r never moves back
```

`r` moves at most n times in total, so this is O(n), not O(n²).

### Common recurrences

| Recurrence | Example | Result |
|---|---|---|
| T(n) = T(n−1) + O(1) | sum of a list, recursively | O(n) time, O(n) stack |
| T(n) = T(n/2) + O(1) | binary search | O(log n) |
| T(n) = 2T(n/2) + O(n) | merge sort | log n levels × O(n) per level = O(n log n) |
| T(n) = T(n−1) + T(n−2) + O(1) | naive Fibonacci | exponential (at most O(2ⁿ)); with memo O(n) |
| b choices, depth d | backtracking | up to bᵈ leaves |

### Common costs

| Cost | Operations |
|---|---|
| O(1) | array index; Dictionary/HashSet lookup (expected); Stack/Queue push and pop |
| O(log n) | binary search; heap push/pop; SortedSet add/remove |
| O(n) | one scan; a copy; `ToList`; `List.Contains`; building a string of length n |
| O(n log n) | sorting |
| O(n²) | all pairs |
| O(V + E) | BFS or DFS on a graph; O(R·C) on a grid |
| O(2ⁿ) / O(n!) | all subsets / all permutations (times n to copy each one) |

### What n tells you

This is a rough guide, not a measured fact. Judges are often said to allow about 10⁷–10⁸ simple steps per second; the real limit depends on the judge and the language. Use n to guess the target:

| n up to about | Likely target |
|---|---|
| 10–12 | O(n!) |
| 20 | O(2ⁿ) or O(n · 2ⁿ) |
| 500 | O(n³) |
| 5,000 | O(n²) |
| 10⁵–10⁶ | O(n log n) or O(n) |
| 10⁹ or more | O(log n) or O(1): binary search on the answer, or math |

### Worst, average and amortised

| Word | Meaning | Example |
|---|---|---|
| Worst case | the most work for any input of size n | quicksort with bad pivots: O(n²) |
| Average (expected) | the mean over inputs or over random choices | Dictionary lookup O(1) expected; quicksort with a random pivot O(n log n) expected |
| Amortised | total cost of a sequence ÷ number of operations; holds for every sequence | `List.Add` is O(1) amortised |

Why `List.Add` is amortised O(1): the backing array grows geometrically (it doubles in the current implementation). For n adds, the copies cost at most 1 + 2 + 4 + ... + n < 2n. So the total is O(n), which is O(1) per add, even though one add can cost O(n).

### Space: what counts

- **Auxiliary space** is the extra memory you allocate. Usually say "excluding the output".
- **Recursion stack** is O(maximum depth). **Copies inside recursion** add depth × copy size.
- **Sorting in place** still uses a small stack: introsort uses about O(log n).

### Hidden costs (in addition to Part 7)

| Hidden cost | Why | Fix |
|---|---|---|
| `s.Substring`, `s[i..j]`, `a[i..j]` in a loop | each one copies | pass indexes, or use `AsSpan` |
| `string +=` in a loop | a new string each time → O(n²) | `StringBuilder` |
| String keys in a map | hashing costs O(L) per key | count it: O(n · L) |
| `list.Insert(0, x)`, `list.RemoveAt(0)` | shifts every item | `Queue`, `LinkedList`, or build reversed and reverse once |
| `queue.Contains(x)` | O(n) scan | keep a separate `HashSet` |
| LINQ inside a loop | the query runs again each time | compute it once, outside the loop |
| `new int[n]` inside a loop | O(n) to allocate and zero each time | allocate once; reset only what you used |


## DSA Master Guide (Q-and-A/DSA_MASTER_GUIDE.docx)


*Source: Q-and-A/DSA_MASTER_GUIDE.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="dsa-dsa-master-guide"></a>

### DSA Master Guide
What to learn, in what order, why that order, and why each pattern beats the obvious alternative. Read it once now, then use Parts 4, 5 and 9 forever.
The month documents tell you which problems to solve in which week. They do not tell you why that order, or why this pattern instead of the obvious one. That is the gap this file closes.
The governing rule, before anything else. Do not chase problem count. Chase pattern recognition. 150 problems deeply understood beats 600 half-remembered, and it is not close. The target across the plan is roughly 300-350 problems, but that number is an output, not a goal. The actual goal is this: you read an unseen problem and within two minutes you can say "this is a monotonic stack problem, because it asks for the next greater element and each element only needs comparing to what is still unresolved."
That sentence - pattern plus justification - is the entire skill. Everything below builds it.
<a id="dsa-how-to-use-this-file-given-your-actual-life"></a>

#### How to use this file given your actual life
•  Read Parts 1 to 3 once, this week, in any order. About 40 minutes.
•  Part 4 (the decision table) is the one you re-read. Before every practice session, thirty seconds. It is what turns reading into recognition.
•  Part 5 is the interview answer bank. "Why did you use a heap and not a sort?" lives there. Learn these; they are what separate a candidate who solved the problem from one who understood it.
•  Part 9 is for your commute. Four hours a day of travel is not lost DSA time - it is the best pattern-recall time you have, because you cannot cheat by typing. That part tells you exactly what to do with it.
<a id="dsa-part-1-why-the-order-matters"></a>

### PART 1 - Why the order matters
The order in this plan is not arbitrary and it is not difficulty-sorted. It is a dependency chain: each pattern is built out of a technique you learned earlier. Learn them out of order and you end up memorising solutions, because you are missing the piece that makes the next one obvious.

| This is why X comes before Y | The dependency |
|---|---|
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

The practical consequence for you. If you fall behind, do not skip forward to a later pattern because it looks more impressive. Skipping breaks the chain and the later pattern will not stick. Slow down and keep the order; the plan absorbs delay far better than it absorbs gaps.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Prefix sums exist because the window technique breaks with negatives' is a teaching framing. Prefix sums exist for range queries in general.

<a id="dsa-part-2-the-learning-order-stage-by-stage"></a>

### PART 2 - The learning order, stage by stage

| Stage | Weeks | Learn | Because it unlocks |
|---|---|---|---|
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

Volume per month, for reference: roughly 40 easy in month 1, 45 easy-medium in month 2, then 50, 55, 50, 45, 40 and 30. Around 350 total. If you land at 200 with genuine pattern recognition you are in better shape than someone at 500 without it.
Week 12 is the most important line in that table. Up to week 12 you practise by topic, which means the week has already told you the answer. From week 12 you solve mixed sets. It will feel like a step backwards and your solve rate will drop. That drop is the measurement finally becoming honest - in an interview nobody says "this is a sliding window problem."
<a id="dsa-part-3-the-fifteen-patterns"></a>

### PART 3 - The fifteen patterns
For each: what it is, the invariant that makes it correct, how to recognise it, and the complexity. The invariant is the part most people skip and it is the part interviewers probe - "why does that work?" is answered by naming the invariant.
<a id="dsa-1-two-pointers"></a>

#### 1. Two pointers

|  |  |
|---|---|
| What | Two indices move through the data, usually from opposite ends or at different speeds, never resetting |
| Invariant | Everything outside the two pointers is already decided. Moving a pointer inward permanently eliminates a set of candidates you can prove cannot be the answer |
| Recognise | Sorted array; find a pair or triplet; palindrome check; partition in place; remove or merge in place |
| Complexity | O(n) time, O(1) space. If you must sort first, O(n log n) time |
| Canonical | Two Sum II, 3Sum, Container With Most Water, Valid Palindrome, Move Zeroes, Merge Sorted Array |
| The trap | You must be able to say why moving the left pointer is safe. In Container With Most Water you move the shorter side because keeping it can never beat the current area. If you cannot justify the move, you have memorised it |

<a id="dsa-2-sliding-window"></a>

#### 2. Sliding window

|  |  |
|---|---|
| What | A contiguous range with a right edge that always advances and a left edge that advances only to restore a condition |
| Invariant | The window is always valid (or always minimal) after each step. Because neither edge ever moves backwards, total work is 2n |
| Recognise | The words contiguous subarray or substring, plus a constraint - at most K distinct, sum at least S, no repeating characters |
| Complexity | O(n) time. Space O(1) or O(k) for the window's frequency map |
| Canonical | Longest Substring Without Repeating Characters, Minimum Size Subarray Sum, Longest Repeating Character Replacement, Permutation in String, Max Consecutive Ones III |
| The trap | It requires monotonicity. With all-positive numbers, growing the window can only increase the sum, so shrinking is a valid response. Introduce negatives and that breaks - shrinking might be what you needed. Then it is prefix sum, not a window |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] 'All values positive' is too narrow. Positivity matters only for sum/product constraints. The real precondition for shrinking a window is that validity is *monotone in window size* (if a window is invalid, every larger window containing it is too). Distinct-count and character-frequency windows have no sign at all.

<a id="dsa-3-fast-and-slow-pointers"></a>

#### 3. Fast and slow pointers

|  |  |
|---|---|
| What | Two pointers at different speeds, usually 1x and 2x, through a sequence or linked list |
| Invariant | If there is a cycle, the gap between them changes by exactly one each step, so they must eventually coincide. If there is no cycle, fast reaches the end first |
| Recognise | Detect a cycle; find the middle; find the start of a cycle; happy number |
| Complexity | O(n) time, O(1) space |
| Canonical | Linked List Cycle, Linked List Cycle II, Middle of the Linked List, Happy Number, Find the Duplicate Number |
| The trap | Finding the cycle start needs the second phase - reset one pointer to the head and advance both at 1x. Know why that works, not just that it does |

<a id="dsa-4-prefix-sum-and-hashing"></a>

#### 4. Prefix sum and hashing

|  |  |
|---|---|
| What | Precompute running totals so any range sum is one subtraction, and store what you have seen in a map |
| Invariant | sum(i..j) = prefix[j] - prefix[i-1]. So "does a subarray with sum k exist ending here?" becomes "have I seen prefix - k before?" - a single map lookup |
| Recognise | Subarray sums or counts, especially with negative numbers; "how many subarrays satisfy"; "seen before" lookups |
| Complexity | O(n) time, O(n) space |
| Canonical | Subarray Sum Equals K, Contiguous Array, Continuous Subarray Sum, Range Sum Query |
| The trap | Seed the map with {0: 1} before the loop, otherwise you miss subarrays starting at index 0. This single line is the most common bug in the pattern |

<a id="dsa-5-binary-search-and-binary-search-on-the-answer"></a>

#### 5. Binary search, and binary search on the answer

|  |  |
|---|---|
| What | Halve a sorted search space. The advanced form searches a range of possible answers rather than an array |
| Invariant | The answer is always inside [lo, hi]. Every step discards a half you have proven cannot contain it. For the answer form: the check must be monotonic - if x works, everything above x works |
| Recognise | Sorted input. Or the phrases minimum X such that, maximum X such that, "can we do it in D days", "smallest capacity that fits" |
| Complexity | O(log n), or O(n log(range)) for the answer form when each check is O(n) |
| Canonical | Binary Search, Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Koko Eating Bananas, Capacity To Ship Packages, Split Array Largest Sum |
| The trap | The off-by-one. Decide once and for all whether your interval is [lo, hi] or [lo, hi), and always write the same loop. Under time pressure you will not re-derive it |

<a id="dsa-6-monotonic-stack"></a>

#### 6. Monotonic stack

|  |  |
|---|---|
| What | A stack kept sorted (increasing or decreasing). Before pushing, pop everything that breaks the order - and each pop resolves an answer |
| Invariant | Anything still on the stack is waiting for its answer. The element that pops it is its answer. Each element is pushed once and popped once, so the whole scan is O(n) despite the inner while loop |
| Recognise | Next greater or next smaller element; "how many days until warmer"; largest rectangle in a histogram; trapping rain water |
| Complexity | O(n) time, O(n) space |
| Canonical | Daily Temperatures, Next Greater Element I and II, Largest Rectangle in Histogram, Trapping Rain Water, Remove K Digits |
| The trap | People see the nested while loop and say O(n squared). Being able to explain the amortised argument - each element enters and leaves once - is the whole point of the question |

<a id="dsa-7-heap-and-top-k"></a>

#### 7. Heap and top-K

|  |  |
|---|---|
| What | A partially ordered tree giving O(1) access to the minimum or maximum and O(log n) insert and remove |
| Invariant | Every parent compares correctly against its children. That is weaker than a full sort, which is exactly why it is cheaper |
| Recognise | K largest or smallest; merge K sorted things; a running median or a stream; "top K frequent"; scheduling by priority |
| Complexity | Top-K is O(n log k), not O(n log n). Building a heap from an array is O(n) |
| Canonical | Kth Largest Element, K Closest Points, Top K Frequent Elements, Merge K Sorted Lists, Find Median from Data Stream, Task Scheduler |
| The trap | For k largest, use a min-heap of size k, not a max-heap. The root is then the weakest survivor and can be evicted in O(log k). Getting this backwards is the standard error |

<a id="dsa-8-intervals"></a>

#### 8. Intervals

|  |  |
|---|---|
| What | Sort by start (sometimes by end), then sweep once, merging or counting |
| Invariant | After sorting by start, any interval that overlaps the current one must begin before the current one ends. So one comparison against the running end is sufficient - you never look backwards |
| Recognise | Ranges, meetings, bookings, "merge", "how many rooms", overlapping |
| Complexity | O(n log n) - dominated by the sort |
| Canonical | Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms I and II, Minimum Arrows to Burst Balloons |
| The trap | Sort by start to merge; sort by end for the maximum non-overlapping count. Choosing the wrong key gives a plausible wrong answer, which is worse than failing |

<a id="dsa-9-tree-dfs"></a>

#### 9. Tree DFS

|  |  |
|---|---|
| What | Recurse down one branch to the bottom, then back up. Pre-order does work on the way down; post-order does work on the way up |
| Invariant | When the recursive call on a child returns, that entire subtree is fully solved. So you can treat it as a solved value and combine |
| Recognise | Anything about paths, depth, subtree sums, validity, or comparing two trees |
| Complexity | O(n) time, O(h) space for the call stack - O(log n) balanced, O(n) degenerate |
| Canonical | Maximum Depth, Same Tree, Invert Binary Tree, Balanced Binary Tree, Diameter, Validate BST, Lowest Common Ancestor, Path Sum |
| The trap | Validate BST needs a min/max range passed down, not a parent comparison. Checking only against the immediate parent passes wrong trees, and interviewers test exactly that case |

<a id="dsa-10-tree-bfs"></a>

#### 10. Tree BFS

|  |  |
|---|---|
| What | A queue, processing level by level, recording the level size before you start it |
| Invariant | The queue contains exactly one complete level at the top of each iteration. That is why capturing `queue.Count` first lets you group by level |
| Recognise | The word level; minimum depth; right side view; zigzag; "nearest" in a tree |
| Complexity | O(n) time, O(w) space where w is the widest level |
| Canonical | Level Order Traversal, Zigzag Traversal, Right Side View, Minimum Depth, Average of Levels |
| The trap | For minimum depth, BFS beats DFS because you can stop at the first leaf. DFS must explore everything. Say that out loud - it shows you chose rather than defaulted |

<a id="dsa-11-graph-bfs-and-dfs"></a>

#### 11. Graph BFS and DFS

|  |  |
|---|---|
| What | Tree traversal plus a visited set, because a graph can revisit |
| Invariant | A node is processed exactly once. For BFS additionally: nodes are dequeued in non-decreasing distance from the source, which is why BFS gives shortest paths on unweighted graphs |
| Recognise | Grids (a grid is a graph), islands, connectivity, "can I reach", shortest path with equal-cost edges, flood fill |
| Complexity | O(V + E) |
| Canonical | Number of Islands, Clone Graph, Rotting Oranges, Word Ladder, Pacific Atlantic Water Flow, Surrounded Regions, Walls and Gates |
| The trap | Mark visited when you enqueue, not when you dequeue. Marking on dequeue lets the same node be queued many times and quietly degrades to a much worse complexity |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] 'Mark visited on enqueue' is right for BFS. Dijkstra is the opposite: a node is final when it is *popped*; skip stale heap entries whose distance is larger than the best known.

<a id="dsa-12-topological-sort"></a>

#### 12. Topological sort

|  |  |
|---|---|
| What | Order a directed acyclic graph so every edge points forwards. Kahn's algorithm: repeatedly take a node with in-degree zero |
| Invariant | A node with in-degree zero has no unmet prerequisites, so it is always safe to emit next. If you run out of such nodes before emitting all of them, there is a cycle |
| Recognise | Dependencies, prerequisites, build order, course schedule, "is this possible" |
| Complexity | O(V + E) |
| Canonical | Course Schedule, Course Schedule II, Alien Dictionary, Minimum Height Trees, Sequence Reconstruction |
| The trap | Cycle detection is free - count how many you emitted. If it is fewer than the node count, there is a cycle. Many candidates write a separate cycle check they did not need |

<a id="dsa-13-union-find-disjoint-set"></a>

#### 13. Union-Find (disjoint set)

|  |  |
|---|---|
| What | Each element points at a parent; the root identifies the set. Union joins two sets, Find locates a root. With path compression and union by rank, both are effectively O(1) |
| Invariant | Two elements are in the same set exactly when they share a root. Path compression preserves that while flattening the tree |
| Recognise | Grouping, "are these connected", number of components, redundant connection, accounts merge, Kruskal's MST |
| Complexity | Near O(1) amortised per operation - inverse Ackermann, effectively constant |
| Canonical | Number of Provinces, Redundant Connection, Accounts Merge, Number of Islands II, Min Cost to Connect All Points |
| The trap | Without path compression it degrades to O(n) per operation. Implement both optimisations or say explicitly that you are skipping them and why |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Interview-critical] 'Without path compression it degrades to O(n)' is wrong: union by rank alone gives O(log n) per operation; only *no* optimisation gives O(n). With both path compression and union by rank it is O(α(n)), effectively constant.

<a id="dsa-14-backtracking"></a>

#### 14. Backtracking

|  |  |
|---|---|
| What | Choose, explore, un-choose. Build a candidate incrementally and abandon a branch as soon as it cannot lead to a solution |
| Invariant | The mutable state is identical before and after each recursive call. That is what the un-choose step guarantees, and it is why you can reuse one array instead of copying |
| Recognise | "All" or "every" - all subsets, all permutations, all combinations; N-Queens; word search; sudoku; partitioning |
| Complexity | Exponential by nature - O(2^n) for subsets, O(n!) for permutations. Pruning changes the constant, not the class |
| Canonical | Subsets, Subsets II, Permutations, Combination Sum, Word Search, Palindrome Partitioning, N-Queens |
| The trap | Duplicates. The fix is to sort first and skip an element equal to its predecessor at the same depth. Know this before you are asked Subsets II |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Including the cost of copying each answer, subsets are O(n·2ⁿ) and permutations O(n·n!). Say 'the worst case stays exponential' rather than 'pruning only changes the constant' — pruning can cut real running time dramatically.

<a id="dsa-15-dynamic-programming"></a>

#### 15. Dynamic programming

|  |  |
|---|---|
| What | Break into overlapping subproblems, solve each once, store the result. Either top-down with memoisation or bottom-up with a table |
| Invariant | The value stored at a state is final and correct, so it never needs recomputing. That requires optimal substructure - the best answer is built from best answers to subproblems |
| Recognise | Count the ways; maximum or minimum over a sequence of choices; "can it be done"; and crucially a brute-force recursion that recomputes the same arguments |
| Complexity | States times work per state. 1D O(n), 2D O(n*m), knapsack O(n*W) |
| Canonical | Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence, Word Break, Longest Common Subsequence, Edit Distance, Partition Equal Subset Sum, 0/1 Knapsack |
| The trap | State definition is the whole skill. If you cannot finish the sentence "dp[i] is the ... using the first i ...", you do not have a solution yet, and no amount of table-filling will produce one. Write that sentence before any code |

<a id="dsa-part-4-how-to-pick-a-pattern-in-two-minutes"></a>

### PART 4 - How to pick a pattern in two minutes
Work top to bottom. The first row that matches is almost always right. Read this table before every practice session until it is automatic - it is the single most useful page in this file.

| If the problem says or implies... | Reach for | The giveaway word |
|---|---|---|
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

The habit that makes this work. Before writing any code, say out loud: "the brute force is X and it costs Y; the waste is Z; the pattern that removes Z is P." Interviewers score that sentence very highly, and it is also the fastest route to the right answer.
<a id="dsa-part-5-why-this-instead-of-that"></a>

### PART 5 - Why this instead of that
This is the part you asked for. Every row is a real interview follow-up - "why did you choose that?" - and the answer is a trade-off, never a preference.

| Choice | Use the first when | Use the second when |
|---|---|---|
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

<a id="dsa-part-6-the-per-problem-protocol"></a>

### PART 6 - The per-problem protocol
Five minutes per problem, in the DSA tab of the tracker. This is the difference between practice and productive practice, and it is the single habit most people skip.

| Field | What goes in it |
|---|---|
| Brute force | The obvious solution and its complexity. Always write this first - the optimisation only makes sense as a response to it |
| Optimised idea | The key insight in one sentence. If you cannot compress it to one sentence, you have not understood the problem - you have only made it pass |
| Why it works | The invariant. This is the field that gets you through follow-ups |
| Time / space | Both, with a reason. "O(n) because each element is pushed and popped at most once" |
| Pattern name | One of the fifteen. If it is none of them, you have found something worth studying properly |
| One variation | How would it change if the input were sorted, had duplicates, were a stream, or did not fit in memory? This is where interview follow-ups come from |

The re-solve ladder. Any problem you could not solve unaided gets re-solved from scratch after 1, 3, 7 and 14 days - from memory, not from the solution. A problem you read the answer to and never re-solved is a problem you cannot do.
Never use AI on DSA. Not once. It produces exactly the same illusion of competence as rereading, and it destroys the retrieval skill you are training. This is the one place in the whole plan where the tool actively hurts.
<a id="dsa-part-7-complexity-stated-properly"></a>

### PART 7 - Complexity, stated properly
•  State it unprompted. Finish every solution with "this is O(n) time and O(1) space because...". Waiting to be asked loses a point you could have taken.
•  Justify, do not recite. "O(n) because each element is pushed and popped at most once" is an answer. "O(n)" alone is a guess that happened to be right.
•  Amortised is not average. Amortised means the total across a sequence, guaranteed - like `List<T>.Add`. Average means expected over inputs - like a hash lookup. Interviewers notice when you use the right one.
•  Count the hidden costs. Sorting inside a loop. String concatenation. `list.Contains` in a loop, which is O(n) each time and turns your O(n) scan into O(n squared). Slicing an array, which copies.
•  Recursion costs space. O(depth) on the call stack. For a balanced tree that is O(log n); for a linked list or degenerate tree it is O(n), and it can genuinely stack-overflow.
•  Do not say "n squared is fine for small n" unless you have asked about the constraints. Ask about the input size - that question alone reads as experience.

| Common mistake | What people say | What is true |
|---|---|---|
| Monotonic stack | O(n squared), there is a nested while | O(n) amortised - each element enters and leaves the stack once |
| Building a heap | O(n log n) | O(n) if you heapify an existing array; O(n log n) only if you insert one at a time |
| Top-K with a heap | O(n log n) | O(n log k), which matters enormously when k is small |
| Union-Find | O(log n) per operation | Effectively O(1) amortised with path compression and union by rank |
| Backtracking with pruning | Pruning makes it polynomial | Still exponential. Pruning changes the constant, not the class |
| HashSet lookup | O(1) | O(1) average. O(n) worst case with a bad hash - worth saying |


> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] The Union-Find row: 'O(log n)' is actually correct when only union by rank is used; it is O(α(n)) with both optimisations. See the correction under pattern 13.

<a id="dsa-part-8-the-problem-list-in-order"></a>

### PART 8 - The problem list, in order
Roughly 150 named problems, in the order the plan introduces them. This is the spine; the month documents add mixed sets on top. Log every one with the six fields.

| Week | Pattern | Problems |
|---|---|---|
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


> ⚠️ **Correction (final version, 19 Oct 2026):** [Structure] This list has 140 entries (~134 unique, not 'roughly 150'); Remove Nth Node, Climbing Stairs, Subsets, Permutations and Letter Combinations repeat. It also leaves out problems for binary search on the answer, monotonic stack beyond Daily Temperatures, prefix sum + hashing, tree BFS variants, tries, bit manipulation and fast/slow extras. The final plan's [PROBLEMS.md](../PROBLEMS.md) fixes the order (Remove Nth Node now comes after linked lists) and adds the missing families. Premium-only on LeetCode: Meeting Rooms I/II, Walls and Gates, Alien Dictionary, Graph Valid Tree, Number of Connected Components — use the free versions on neetcode.io or LintCode.

<a id="dsa-part-9-how-to-practise-dsa-with-no-laptop"></a>

### PART 9 - How to practise DSA with no laptop
You travel four hours a day. That is not lost time - it is the best pattern recognition time you have, precisely because you cannot cheat by typing and running until it passes. Typing is the smallest part of the skill; recognition and justification are the rest, and both work perfectly on a train.
Six drills. Pick one per journey. All of them need only your phone, or nothing at all.

| Drill | Time | How |
|---|---|---|
| 1. Pattern roll-call | 5 min | Name all fifteen patterns from memory, and one recognition cue for each. If you miss one, that is your Friday. Do this until it is boring, then keep doing it |
| 2. Problem to pattern | 15 min | Open your DSA log. Read only the problem name, cover everything else, and say the pattern plus the one-sentence insight. Twenty problems in fifteen minutes. This is the highest-value drill in this file - it trains exactly what an interview tests |
| 3. Invariant drill | 10 min | Pick a pattern. State the invariant that makes it correct, out loud, without notes. "Why does moving the shorter side never lose the answer?" If you cannot, you have memorised that pattern rather than understood it |
| 4. Complexity drill | 5 min | For each pattern, state time and space with the reason. Catch yourself saying O(n squared) for the monotonic stack |
| 5. Narration drill | 15 min | Pick a problem you solved. Explain the whole approach out loud as if to an interviewer: restate, brute force, the waste, the pattern, the walkthrough on a small example, the complexity, one variation. This is simultaneously DSA practice and English practice - the highest-efficiency overlap available to you |
| 6. Re-derive drill | 15 min | Pick a DP problem. Say the state definition sentence - "dp[i] is the ..." - and the recurrence, in your head. No table, no code. If the sentence does not come, that problem is not learned |

What you cannot do on a train: first-time problem solving, and typing under a timer. Those need the desk. So spend desk time on new problems and timed solving, and commute time on recall, justification and narration. Splitting it that way means a four-hour commute makes your two desk hours more productive rather than competing with them.
On weeks when work eats everything. Do drill 2 only, for fifteen minutes, on the way home. That is enough to keep the pattern set alive. A week of drill 2 costs you almost nothing and prevents the decay that makes people feel they have to restart.
<a id="dsa-part-10-the-mistakes-that-keep-people-stuck"></a>

### PART 10 - The mistakes that keep people stuck

| Mistake | What to do instead |
|---|---|
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

The one-paragraph version. Learn the fifteen patterns in dependency order, because each is built from the last. For every problem write the brute force, the one-sentence insight, the invariant and one variation - five minutes that turn solving into learning. From week 12 practise mixed, so you train recognition rather than recall. Always be able to say why this pattern and not the obvious alternative, because that is the actual interview question. And use your commute for recall, justification and narration, which is most of the skill and needs no keyboard at all.


## Array stages A–M and the DSA syllabus (12 Oct guide)

<a id="f05-s3"></a>

### 3. Exactly what “do arrays” means

*Source: FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md (12 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*


The following is a full array progression. It spans several weeks and overlaps with hashing, sorting and binary search. **It is not a single week's workload.** A linked interview problem is a representative exercise; you do not need to finish every optional extension before moving on.

| Stage | Learn precisely | Write or solve | Ready to move on when |
|---|---|---|---|
| A. Representation | Fixed size, indexes 0..n-1, Length, element access, traversal, reference semantics, alias vs copy | Print, sum, maximum, minimum, frequency, clone demonstration | You implement these and handle empty/one-element inputs |
| B. Costs and mutation | O(1) indexing, O(n) search; shifting for insertion/deletion; logical length; array vs List; input mutation | Linear search, check sorted, second-largest distinct value, manual insertion/deletion with spare capacity | You can show the shifted indexes and explain the cost |
| C. Simple transformations | Swap, reverse, reader/writer pointer, preserving order | Reverse array; [Move Zeroes](https://leetcode.com/problems/move-zeroes/); [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | No elements are accidentally overwritten; explain the processed prefix |
| D. Hash-assisted arrays | HashSet membership, Dictionary frequencies/complements; duplicates and expected lookup cost | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/); [Two Sum](https://leetcode.com/problems/two-sum/) | Solve brute force first, then explain the memory-for-time trade-off |
| E. Opposite-end pointers | Sorted-input assumption, safe pointer movement, duplicate handling | [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/); [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/); later [3Sum](https://leetcode.com/problems/3sum/) | Explain why the discarded candidates cannot solve the problem |
| F. Prefix/suffix | Running totals, range sums, prefix/suffix products, seed value, overflow | [Running Sum](https://leetcode.com/problems/running-sum-of-1d-array/); [Range Sum Query](https://leetcode.com/problems/range-sum-query-immutable/); later [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Derive a range-sum formula, including a range starting at zero |
| G. Windows | Fixed-size add/remove; variable-size invariant; frequencies; valid shrinking condition | [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/); [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Explain why the positive-sum window rule does not generalize directly to negative numbers |
| H. Prefix plus map | Count previous prefix sums, order of checking/updating, prefix zero | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Correctly handle negative numbers, zero and repeated prefix sums |
| I. Running optimum | Local vs global state; restart or extend | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/); [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Derive the update and handle all-negative maximum-subarray input |
| J. Ordered search | Sorted search space, bounds, invariant, termination | [Binary Search](https://leetcode.com/problems/binary-search/); first/last occurrence | Correct for missing values, duplicates and one-element input |
| K. Sort and sweep | Sorting cost, interval endpoints, overlap, tie handling | [Merge Intervals](https://leetcode.com/problems/merge-intervals/); [Insert Interval](https://leetcode.com/problems/insert-interval/) | Explain whether touching endpoints overlap under the problem definition |
| L. Matrices | Row/column indexing, rectangular vs jagged arrays, boundaries, transpose | Matrix sum, transpose; [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/); later [Rotate Image](https://leetcode.com/problems/rotate-image/) | Correct on one row, one column and non-square input where supported |
| M. Advanced selected | Three-way partition, cyclic placement, max/min product state, monotonic structures | Sort Colors; Maximum Product Subarray; later Trapping Rain Water / First Missing Positive | Core stages are dependable; advanced tasks are not blocking basic progress |

Before declaring the early array foundation complete, independently write sum, maximum, reverse, search, sorted check and frequency count; solve a duplicate/membership problem; explain alias versus copy; state complexity; and test boundary cases. This is the first checkpoint, not a requirement to solve every hard array problem.


<a id="f05-s4"></a>

### 4. DSA syllabus after arrays

*Source: FAANG-Master-Plan/05_START_HERE_BASIC_TO_ADVANCED.md (12 Oct 2026). Original wording kept below; ⚠️ boxes are corrections added in the final version.*


**Core** means learn, implement, test and solve variations. **Extension** means learn only after the core checkpoint or when a target role warrants it. Named problems below are suggestions, not claims about future interview questions. Search the exact titles on your preferred practice platform.

| Topic and order | Core concepts and starter exercises | Next problems and selected extensions | Demonstration |
|---|---|---|---|
| Complexity, throughout | Input size, O(1)/log n/n/n log n/n²; nested loops; auxiliary space; recursion stack; library-operation costs | Amortized vs expected cost; output-sensitive complexity | Derive the cost of your actual code, including sorting and copies |
| Strings and hashing | Immutable strings, char vs string, frequency counts, StringBuilder, ordinal equality; Valid Anagram, Valid Palindrome | Group Anagrams, Longest Consecutive Sequence, longest palindrome by center expansion | Handle duplicates, case assumptions and empty input; avoid repeated concatenation |
| Two pointers and windows | Read/write pointers; sorted pair search; fixed/variable windows | Longest Substring Without Repeating Characters, Permutation in String, 3Sum; Minimum Window Substring later | State the invariant and why each pointer moves |
| Binary search | Exact match, lower/upper bound, midpoint, closed/half-open intervals | First/Last Position, rotated search, Koko Eating Bananas, Ship Packages | Define a monotone predicate before binary-searching an answer |
| Sorting and selection | Implement merge sort; understand quicksort partitioning; comparator correctness, stable vs unstable, heap basics | Kth Largest using heap then quickselect; counting sort when range is bounded | Explain average/worst-case costs and extra memory; all eight sorts are not equally important |
| Linked lists | Node/reference model, head/tail, sentinel, mutation, reverse and merge | Middle, Remove Nth from End, Cycle, Reorder List; k-group reversal later | Draw references before mutation; handle loss of head and null |
| Stack and queue | Push/pop, enqueue/dequeue, LIFO/FIFO, Stack/Queue APIs | Valid Parentheses, Min Stack, Evaluate RPN, Queue Using Stacks | Correct behavior under empty operations; amortized queue explanation |
| Monotonic structures | Store indexes; increasing/decreasing invariants; each item pushed/popped once | Daily Temperatures, Next Greater Element; Sliding Window Maximum, Largest Rectangle later | Explain the linear-time amortized argument |
| Recursion | Base case, progress, call stack, return value, local vs shared state; sum, reverse, simple tree traversal | Divide-and-conquer and recursion-to-loop trade-offs | Trace three levels and explain when a frame returns |
| Backtracking | Choose/explore/unchoose, copies vs shared state, pruning, duplicate handling | Subsets, Permutations, Combination Sum, Word Search; N-Queens optional | Restore state correctly and bound the search tree |
| Trees | Recursive/iterative traversals, depth, BFS levels, paths, subtree return values | Max Depth, Same Tree, Invert Tree, Level Order, Diameter, LCA; serialization later | Solve an unseen tree combination without memorizing a traversal template |
| BST | Global ordering invariant, range validation, search, inorder order | Validate BST, Kth Smallest, LCA of BST | Explain why checking immediate children alone is insufficient |
| Heaps | Heap invariant; min/max; C# PriorityQueue; stable ordering not assumed | Kth Largest, Top K Frequent, Merge K Sorted Lists; Median from Data Stream later | Explain why a min-heap of size k keeps the largest k |
| Graph traversal | Adjacency list/matrix, directed/undirected, visited, disconnected graphs, grid edges | Number of Islands, Clone Graph, Rotting Oranges, Pacific Atlantic | Choose BFS vs DFS; mark visited at the correct moment |
| Graph dependencies | Directed cycles, indegree, topological order | Course Schedule I/II; Alien Dictionary later | Detect cycles and explain why an order may not be unique |
| Connectivity and weighted paths | DSU/path compression/rank; BFS for unweighted paths; Dijkstra for nonnegative weights | Redundant Connection, Accounts Merge, Network Delay Time | Explain when Dijkstra is unsuitable; track stale heap entries |
| Graph extensions | MST/Kruskal, Bellman-Ford, bipartite coloring | Cheapest Flights with state constraints; Floyd-Warshall/SCC only if useful | State what the graph/state actually represents |
| Intervals and greedy | Sorting by start vs finish; overlap rules; exchange argument | Merge/Insert Intervals, Non-overlapping Intervals, Jump Game, Gas Station, Partition Labels | Give a correctness argument or find a counterexample to a tempting rule |
| DP foundations | Start with recursion; define state, transition, base case, order and result; memoization vs tabulation | Climbing Stairs, House Robber, Decode Ways, Unique Paths | Derive a recurrence without seeing a completed table |
| DP core families | 0/1 vs unbounded choices; loop direction; count vs optimize; grid and string states | Coin Change I/II, Partition Equal Subset Sum, Word Break, LCS, LIS | Explain why a dimension exists and when it can be compressed |
| DP extensions | Edit Distance, stock state machines, tree DP, interval DP | Burst Balloons, bitmask DP only after core competence | Discuss complexity before choosing a large state space |
| Tries | Nodes/edges, terminal markers, prefix search, memory trade-off | Implement Trie, Search Suggestions; Word Search II later | Distinguish a complete word from an existing prefix |
| Bits and basic math | AND/OR/XOR/shifts; signed integers; parity; powers; GCD; modulo | Single Number, Counting Bits, Missing Number; exponentiation | Explain cancellation and overflow rather than memorizing tricks |
| Randomized/range extensions | Quickselect randomness; reservoir sampling and Fisher–Yates at overview depth | Fenwick/segment trees, KMP/Rabin–Karp/Z, advanced string/graph algorithms | Optional for general backend prep; do not let these displace core practice |
| Mixed interview practice | Unknown pattern, changing constraints, dry-run tests, code readability, narration | Two-stage prompts: solve, then alter memory/input/stream requirements | A correct independent solution with clear reasoning under a reasonable timer |

**Working quantity:** roughly 150–200 distinct well-chosen problems plus 80–120 meaningful re-solves is a planning range for 32 weeks, not a hiring threshold. Adjust downward if building prerequisites takes longer. Solving the same remembered problem quickly is not evidence of unseen-problem skill.

Use a selection test instead: can you solve a fresh variation without being told the pattern, explain why your solution works, test it and adapt it? Repeatedly failing one family means repair that family rather than increasing total count.



## DSA pattern encyclopedia (FAANG plan, Part 2)


*Source: FAANG-Master-Plan/02_GRANULAR_CURRICULUM_ENCYCLOPEDIA.md. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="f02-dsa-part-2-data-structures-algorithms-dsa-complete-breakdown"></a>

### ⚡ PART 2: Data Structures & Algorithms (DSA) Complete Breakdown

<a id="f02-dsa-1-array-patterns"></a>

#### 1. Array Patterns
* **Kadane’s Algorithm:** Max Subarray Sum, Max Product Subarray (tracking `min` & `max`), Circular Subarray Sum (Max of normal subarray vs `TotalSum - MinSubarray`).
* **Prefix Sum:** 1D Prefix Sum, 2D Prefix Sum (Matrix range queries), Subarray Sum Equals K (`Map<sum - k, count>`).
* **Two Pointers:** Opposite Ends, Fast and Slow (Reader-Writer), 3Sum (duplicate skipping logic), 4Sum, Container With Most Water, Trapping Rain Water.
* **Dutch National Flag:** 3-way partition (`low`, `mid`, `high`) sorting 0, 1, 2 in $O(N)$ single pass.
* **Sliding Window:** Fixed size, Variable size, At Most $K$ difference technique.
* **Intervals & Matrix:** Merge Intervals, Insert Interval, Non-Overlapping Intervals, Spiral Matrix, Rotate Image.

---

<a id="f02-dsa-2-string-patterns"></a>

#### 2. String Patterns
* **Two Pointers / Palindromes:** Valid Palindrome, Longest Palindromic Substring (expand around center vs DP).
* **Sliding Window on Strings:** Longest Substring Without Repeating Characters, Minimum Window Substring, Find All Anagrams in a String.
* **Pattern Matching Algorithms:**
  * **KMP (Knuth-Morris-Pratt):** Precomputing the Longest Prefix Suffix (LPS) array in $O(M)$ time to search patterns in $O(N)$ time without backtracking.
  * **Rabin-Karp:** Rolling hash matching.
  * **Z-Algorithm:** Constructing the Z-array in $O(N)$ linear time.
* **String Hashing & Frequency:** Group Anagrams (Prime hashing vs sorted key).

---

<a id="f02-dsa-3-stack-patterns"></a>

#### 3. Stack Patterns
* **Monotonic Stack:** Next Greater Element I & II, Previous Smaller Element, Largest Rectangle in Histogram ($O(N)$ height expansion), Daily Temperatures.
* **Balanced Parentheses:** Valid Parentheses, Minimum Remove to Make Valid Parentheses, Longest Valid Parentheses.
* **Min Stack:** $O(1)$ `GetMin()` using auxiliary min-stack or value encoding (`2 * val - min`).
* **Expression Evaluation:** Infix to Postfix conversion, Evaluating Reverse Polish Notation (RPN), Basic Calculator I & II.

---

<a id="f02-dsa-4-queue-patterns"></a>

#### 4. Queue Patterns
* **Circular Queue:** Ring buffer array implementation with `head` and `tail` pointers.
* **Monotonic Deque:** Sliding Window Maximum ($O(N)$ double-ended queue).
* **Queue using Stacks & Stack using Queues:** Amortized $O(1)$ push/pop mechanisms.

---

<a id="f02-dsa-5-linked-list-patterns"></a>

#### 5. Linked List Patterns
* **Reversals:** Iterative reversal, Recursive reversal, Reverse Linked List II (between $m$ and $n$), Reverse Nodes in k-Group.
* **Fast & Slow Pointers:** Middle of Linked List, Detect Cycle, Find Cycle Origin (Floyd’s Tortoise and Hare proof).
* **Merging:** Merge Two Sorted Lists, Merge K Sorted Lists (Min-Heap approach in $O(N \log K)$).
* **Pointer Mutation:** Remove Nth Node From End of List, Reorder List, Palindrome Linked List.
* **Doubly Linked List:** Implementing an LRU Cache & LFU Cache in $O(1)$ time.

---

<a id="f02-dsa-6-recursion-backtracking-patterns"></a>

#### 6. Recursion & Backtracking Patterns
* **Subsets & Subsequences:** Subsets I (distinct elements), Subsets II (handling duplicates with sorting and skip loop).
* **Combinations:** Combination Sum I, II, III.
* **Permutations:** Permutations I, Permutations II (swap in-place vs visited array).
* **Board & Matrix Backtracking:** Word Search, Rat in a Maze, N-Queens (validating diagonals and columns), Sudoku Solver.

---

<a id="f02-dsa-7-tree-patterns"></a>

#### 7. Tree Patterns
* **Traversals:** Inorder, Preorder, Postorder (Recursive + Iterative using Stack), Level Order (BFS), Zigzag Level Order, Boundary Traversal.
* **Tree Views:** Top View (Horizontal distance tracking), Bottom View, Left View, Right View.
* **Tree DP (Bottom-Up):** Maximum Depth, Diameter of Binary Tree, Balanced Binary Tree, Binary Tree Maximum Path Sum, Lowest Common Ancestor (LCA).
* **Construction & Serialization:** Construct from Inorder + Preorder, Construct from Inorder + Postorder, Serialize and Deserialize Binary Tree.
* **Binary Search Tree (BST):** Validate BST (passing down valid range bounds), Kth Smallest Element, Inorder Successor, LCA of BST, Convert Sorted Array to BST.

---

<a id="f02-dsa-8-heap-priority-queue-patterns"></a>

#### 8. Heap / Priority Queue Patterns
* **Min-Heap & Max-Heap Basics:** Array representation (`parent = (i-1)/2`, `left = 2i+1`, `right = 2i+2`), Heapify operations.
* **Top-K Elements:** Kth Largest Element in an Array, Top K Frequent Elements.
* **Two Heaps Pattern:** Find Median from Data Stream (balancing sizes of Max-Heap and Min-Heap).
* **K-Way Merge:** Merge K Sorted Lists, Smallest Range Covering Elements from K Lists.

---

<a id="f02-dsa-9-graph-patterns"></a>

#### 9. Graph Patterns
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

---

<a id="f02-dsa-10-trie-patterns"></a>

#### 10. Trie Patterns
* **Prefix Tree:** Insert, Search, StartsWith in $O(L)$ time.
* **Applications:** Word Search II (Trie + Backtracking grid search), Search Suggestions System.
* **Bitwise Trie:** Maximum XOR of Two Numbers in an Array ($O(32N)$ time).

---

<a id="f02-dsa-11-dynamic-programming-patterns"></a>

#### 11. Dynamic Programming Patterns
* **1D Linear State:** Fibonacci, Climbing Stairs, House Robber I & II, Decode Ways.
* **0/1 Knapsack:** Subset Sum, Partition Equal Subset Sum, Target Sum (traversing capacity backwards).
* **Unbounded Knapsack:** Coin Change I & II, Rod Cutting (traversing capacity forwards).
* **Longest Common Subsequence (LCS):** LCS, Edit Distance, Longest Palindromic Subsequence, Shortest Common Supersequence.
* **Longest Increasing Subsequence (LIS):** $O(N^2)$ DP table and $O(N \log N)$ Binary Search using Patience Sorting / Tails array.
* **Grid DP:** Unique Paths I & II, Minimum Path Sum, Cherry Pickup.
* **Interval DP & MCM:** Matrix Chain Multiplication, Burst Balloons, Palindrome Partitioning II.
* **DP on Trees & Bitmask DP:** Tree independent sets, Traveling Salesperson Problem (TSP) on small $N \le 16$.

---

<a id="f02-dsa-12-greedy-patterns"></a>

#### 12. Greedy Patterns
* **Interval Scheduling:** Activity Selection, Non-overlapping Intervals, Minimum Number of Arrows to Burst Balloons.
* **Array Greedy:** Jump Game I (maximum reachable index) & Jump Game II, Gas Station (circular greedy balance).

---

<a id="f02-dsa-13-bit-manipulation-patterns"></a>

#### 13. Bit Manipulation Patterns
* **XOR Invariants:** $a \oplus a = 0$, $a \oplus 0 = a$. Single Number I, II (bit counters modulo 3), and III (isolating lowest set bit `diff & -diff`).
* **Bitwise Tricks:** Checking if $K$-th bit is set, Brian Kernighan’s Algorithm for counting set bits (`n = n & (n - 1)`), Checking Power of 2 (`n > 0 && (n & (n - 1)) == 0`), Reverse Bits.

---

<a id="f02-dsa-14-all-8-sorting-algorithms"></a>

#### 14. All 8 Sorting Algorithms
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

---

<a id="f02-dsa-15-advanced-range-queries-segment-fenwick-trees"></a>

#### 15. Advanced Range Queries (Segment & Fenwick Trees)
* **Segment Tree:**
  * Complete binary tree over an array supporting Range Sum / Range Minimum Query and Point Updates in $O(\log N)$ time.
  * Lazy Propagation for Range Updates in $O(\log N)$.
* **Fenwick Tree (Binary Indexed Tree - BIT):**
  * Space-efficient array-based tree using two's complement lowest set bit (`i & -i`) for Prefix Sum queries and Point Updates in $O(\log N)$ time with minimal code.

<a id="add-dsa-templates"></a>

## ➕ Pattern templates in C#: index

Each section below has the same parts: **idea**, **invariant**, **use when** (recognition cues), a short **C# template**, **cost**, **common bugs** and **classic problems**. The pattern tables in [Part 3](#dsa-part-3-the-fifteen-patterns) explain *why* each pattern works. These sections add the code.

The templates target .NET 10 (C# 14). They use LeetCode-style signatures and skip input validation unless it matters. Before a template, read the [protocol](#add-dsa-protocol). Use the [toolkit](#add-dsa-csharp-toolkit) for API costs.

| Pattern | Template | Short table in Part 3 |
|---|---|---|
| Two pointers (opposite ends, reader/writer, same direction) | [Two pointers](#add-dsa-two-pointers) | [#1](#dsa-1-two-pointers) |
| Sliding window (fixed, variable) | [Sliding window](#add-dsa-sliding-window) | [#2](#dsa-2-sliding-window) |
| Prefix sums, prefix + hash map, difference array | [Prefix and hash](#add-dsa-prefix-hash) | [#4](#dsa-4-prefix-sum-and-hashing) |
| Binary search: exact, bounds, rotated | [Binary search](#add-dsa-binary-search) | [#5](#dsa-5-binary-search-and-binary-search-on-the-answer) |
| Binary search on the answer | [On the answer](#add-dsa-binary-search-answer) | [#5](#dsa-5-binary-search-and-binary-search-on-the-answer) |
| Stack and queue basics | [Stack and queue](#add-dsa-stack-queue) | — |
| Monotonic stack and deque | [Monotonic](#add-dsa-monotonic) | [#6](#dsa-6-monotonic-stack) |
| Linked lists, fast/slow pointers, LRU | [Linked list](#add-dsa-linked-list) | [#3](#dsa-3-fast-and-slow-pointers) |
| Recursion | [Recursion](#add-dsa-recursion) | — |
| Backtracking | [Backtracking](#add-dsa-backtracking) | [#14](#dsa-14-backtracking) |
| Sorting algorithms, quickselect | [Sorting](#add-dsa-sorting) | — |
| Matrix and grid | [Matrix](#add-dsa-matrix) | — |
| Intervals | [Intervals](#add-dsa-intervals) | [#8](#dsa-8-intervals) |
| Dutch flag, cyclic sort, compression, Kadane, sampling | [Advanced arrays](#add-dsa-advanced-arrays) | — |
| Bits and math | [Bits and math](#add-dsa-bits-math) | — |
| Trees, BST, traversals | [Trees](#add-dsa-trees) (separate part) | [#9](#dsa-9-tree-dfs), [#10](#dsa-10-tree-bfs) |
| Heaps, top-K, two heaps | [Heaps](#add-dsa-heaps) (separate part) | [#7](#dsa-7-heap-and-top-k) |
| Graph BFS/DFS, topological sort, union-find | [Graphs](#add-dsa-graphs) (separate part) | [#11](#dsa-11-graph-bfs-and-dfs)–[#13](#dsa-13-union-find-disjoint-set) |
| Shortest paths | [Shortest paths](#add-dsa-shortest-paths) (separate part) | — |
| Minimum spanning tree | [MST](#add-dsa-mst) (separate part) | — |
| Strongly connected components | [SCC](#add-dsa-scc) (separate part) | — |
| Greedy | [Greedy](#add-dsa-greedy) (separate part) | — |
| Dynamic programming families | [DP families](#add-dsa-dp-families) (separate part) | [#15](#dsa-15-dynamic-programming) |
| Trie | [Trie](#add-dsa-trie) (separate part) | — |
| KMP, Rabin–Karp, Z | [Advanced strings](#add-dsa-strings-advanced) (separate part) | — |
| Fenwick and segment trees | [Range queries](#add-dsa-range-queries) (separate part) | — |

<a id="add-dsa-two-pointers"></a>

## ➕ Two pointers: templates

**Idea.** Two indexes move through the data and never go back. Each move removes candidates that cannot be the answer.

| Shape | Pointers | Typical use |
|---|---|---|
| Opposite ends | `l = 0`, `r = n - 1`, move toward each other | pair sum in a sorted array, palindrome, container |
| Reader / writer | `read` visits every item; `write` marks the end of the kept part | remove in place, move zeroes, remove duplicates |
| Same direction, two inputs | `i` in array a, `j` in array b | merge two sorted arrays, is-subsequence |

**Invariant.**
- Opposite ends: every pair that uses an index outside [l, r] is already ruled out.
- Reader / writer: `a[0..write-1]` holds exactly the kept items, in their original order.
- Two inputs: the output so far is the merge of `a[0..i-1]` and `b[0..j-1]`.

**Use when.** The input is sorted and you need a pair or triplet. Or the problem says "in place" with O(1) extra space. Or you compare from both ends. Or there are two sorted inputs.

```csharp
// Opposite ends: Two Sum II (sorted input, 1-based answer)
int l = 0, r = a.Length - 1;
while (l < r)
{
    int sum = a[l] + a[r];
    if (sum == target) return [l + 1, r + 1];
    if (sum < target) l++;     // a[l] is too small even with the largest partner
    else r--;                  // a[r] is too big even with the smallest partner
}
return [];

// Reader / writer: Remove Duplicates from Sorted Array
int write = 0;
for (int read = 0; read < a.Length; read++)
    if (write == 0 || a[read] != a[write - 1])
        a[write++] = a[read];
return write;                  // new logical length

// Same direction from the back: Merge Sorted Array (a has room for m + n items)
int i = m - 1, j = n - 1, w = m + n - 1;
while (j >= 0)
    a[w--] = (i >= 0 && a[i] > b[j]) ? a[i--] : b[j--];
```

**3Sum duplicate skipping** (sort first):

```csharp
for (int i = 0; i < a.Length - 2; i++)
{
    if (i > 0 && a[i] == a[i - 1]) continue;         // same first value as before
    int l = i + 1, r = a.Length - 1;
    while (l < r)
    {
        int s = a[i] + a[l] + a[r];
        if (s < 0) l++;
        else if (s > 0) r--;
        else
        {
            res.Add(new List<int> { a[i], a[l], a[r] });
            l++; r--;
            while (l < r && a[l] == a[l - 1]) l++;   // skip the same second value
        }
    }
}
```

**Cost.** One pass is O(n) time and O(1) space. 3Sum is O(n²): a sort plus n passes.

**Common bugs.**
- Two pointers on unsorted input for a pair sum. Sort first (you lose the indexes) or use a hash map.
- `while (l <= r)` when the pair needs two different indexes.
- 3Sum: checking `a[i] == a[i + 1]` instead of `a[i] == a[i - 1]`. This skips a value before you use it, so `[-1, -1, 2]` is lost.
- `a[l] + a[r]` overflows for large values; use `long`.

**Classic problems.** Two Sum II; 3Sum; Container With Most Water; Move Zeroes.

<a id="add-dsa-sliding-window"></a>

## ➕ Sliding window: templates

**Idea.** Keep a contiguous window `[l, r]`. Move `r` forward one step at a time. Move `l` forward only to repair the window. Neither pointer ever moves back.

**The real precondition.** Validity must be **monotone in window size**. The correction box under [Part 3 #2](#dsa-2-sliding-window) explains this. In short:
- **Longest valid window:** if a window is valid, every smaller window inside it is valid. So when the window breaks, shrinking from the left is the only repair, and no answer is lost.
- **Shortest valid window:** if a window is valid, every bigger window that contains it is valid. So once it is valid, you shrink it to find the shortest.

"All numbers positive" is only one way to get this. Non-negative numbers also work (zeros are fine). "No repeated characters" is monotone and has no numbers at all. "Sum equals k" with negative numbers is **not** monotone, so use [prefix sums + a hash map](#add-dsa-prefix-hash).

**Invariant.** Fixed size: the window holds exactly k items, and the running state (a sum or counts) matches them. Variable size: after each step, `l` is the smallest index for which `[l, r]` is valid.

**Use when.** The problem says contiguous subarray or substring, asks for longest, shortest or count, and the state can be updated in O(1) when one item enters or leaves.

```csharp
// Fixed size k: maximum window sum
long sum = 0, best = long.MinValue;
for (int r = 0; r < a.Length; r++)
{
    sum += a[r];                         // item enters
    if (r >= k) sum -= a[r - k];         // item leaves
    if (r >= k - 1) best = Math.Max(best, sum);
}

// Variable, LONGEST valid: Longest Substring Without Repeating Characters
var count = new Dictionary<char, int>();
int left = 0, longest = 0;
for (int r = 0; r < s.Length; r++)
{
    count[s[r]] = count.GetValueOrDefault(s[r]) + 1;
    while (count[s[r]] > 1)              // invalid: shrink until valid again
    {
        count[s[left]]--;
        left++;
    }
    longest = Math.Max(longest, r - left + 1);   // record AFTER shrinking
}

// Variable, SHORTEST valid: Minimum Size Subarray Sum (non-negative values)
int lo = 0, shortest = int.MaxValue; long total = 0;
for (int r = 0; r < a.Length; r++)
{
    total += a[r];
    while (total >= target)              // valid: record, then try smaller
    {
        shortest = Math.Min(shortest, r - lo + 1);   // record INSIDE the loop
        total -= a[lo++];
    }
}
return shortest == int.MaxValue ? 0 : shortest;
```

**Counting windows.** For "at most K distinct", every valid window ending at r adds `r - l + 1` subarrays. For "exactly K", use `AtMost(K) - AtMost(K - 1)`.

**Cost.** O(n) time, because `l` and `r` each move at most n times. Space is O(1), or O(alphabet) for the counts.

**Common bugs.**
- `if` instead of `while` when shrinking. One step may not be enough.
- Recording the answer in the wrong place: longest → after the shrink loop; shortest → inside it.
- Window length is `r - l + 1`, not `r - l`.
- Using `count.Count` as "distinct" but not removing keys whose count reaches 0.
- Using a window on a condition that is not monotone.

**Classic problems.** Longest Substring Without Repeating Characters; Minimum Size Subarray Sum; Permutation in String; Minimum Window Substring.

<a id="add-dsa-prefix-hash"></a>

## ➕ Prefix sums, prefix + hash map, difference array

**Idea.** Store running totals once. Then any range sum is one subtraction, and "is there an earlier prefix with value p?" is one map lookup.

**Prefix sums (half-open form).** `pre` has n + 1 slots and `pre[0] = 0`. The sum of `a[l..r]` (inclusive) is `pre[r + 1] - pre[l]`. The extra 0 at the front removes the special case for l = 0.

```csharp
var pre = new long[a.Length + 1];
for (int i = 0; i < a.Length; i++) pre[i + 1] = pre[i] + a[i];
long RangeSum(int l, int r) => pre[r + 1] - pre[l];       // inclusive l..r
```

2D version: `P[r + 1][c + 1] = g[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c]`.

**Prefix + hash map** (count subarrays with sum k; negatives allowed).
**Invariant:** before index i is processed, `seen[p]` is the number of earlier prefixes with sum p. A subarray that ends at i has sum k exactly when an earlier prefix equals `cur - k`.

```csharp
var seen = new Dictionary<long, int> { [0] = 1 };   // seed: the empty prefix
long cur = 0; int found = 0;
foreach (int x in a)
{
    cur += x;
    found += seen.GetValueOrDefault(cur - k);         // look up FIRST
    seen[cur] = seen.GetValueOrDefault(cur) + 1;      // then record
}
```

Variants:
- **Longest** subarray with sum k: store the **first index** of each prefix (seed `{0: -1}`) and never overwrite it.
- **Contiguous Array** (equal 0s and 1s): map 0 → −1 and 1 → +1, then look for sum 0.
- **Divisible by k:** use the key `((cur % k) + k) % k`, because C# `%` can be negative.

**Prefix products** (Product of Array Except Self, no division):

```csharp
var res = new int[n];
res[0] = 1;
for (int i = 1; i < n; i++) res[i] = res[i - 1] * a[i - 1];   // product of the left side
int right = 1;
for (int i = n - 1; i >= 0; i--) { res[i] *= right; right *= a[i]; }
```

**Difference array.** Use it for many range updates followed by one read. "Add v to every `a[l..r]`" becomes `diff[l] += v; diff[r + 1] -= v;`. One prefix sum over `diff` then gives the final values. Each update is O(1); the rebuild is O(n).

```csharp
var diff = new long[n + 1];
foreach (var (l, r, v) in updates) { diff[l] += v; diff[r + 1] -= v; }
var result = new long[n];
long run = 0;
for (int i = 0; i < n; i++) { run += diff[i]; result[i] = run; }   // values, starting from zeros
```

**Use when.** Many range-sum queries; "count subarrays with sum k" and negatives are allowed; "seen before" lookups; many range updates.

**Cost.** Build O(n), query O(1). Prefix + map is O(n) expected time and O(n) space.

**Common bugs.**
- Missing the seed `{0: 1}`. You miss subarrays that start at index 0.
- Recording before the lookup. With k = 0 this counts an empty subarray.
- `int` prefix sums overflow; use `long`.
- Mixing inclusive and half-open ranges (off by one).

**Classic problems.** Range Sum Query – Immutable; Subarray Sum Equals K; Product of Array Except Self; Corporate Flight Bookings.

<a id="add-dsa-binary-search"></a>

## ➕ Binary search: exact match, bounds, rotated arrays

**Idea.** Keep a range that must contain the answer. Each step looks at the middle and throws away half of the range.

**Pick one style and always use it.** Under time pressure you will not re-derive the details.

| Style | Loop | Moves | Use for |
|---|---|---|---|
| Closed `[lo, hi]` | `while (lo <= hi)` | `lo = mid + 1`, `hi = mid - 1` | exact match |
| Half-open `[lo, hi)` | `while (lo < hi)` | `lo = mid + 1`, `hi = mid` | lower bound, upper bound, first true |

```csharp
// Closed: exact match. Invariant: if target exists, it is inside [lo, hi].
int lo = 0, hi = a.Length - 1;
while (lo <= hi)
{
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;   // the answer is right of mid
    else hi = mid - 1;                   // the answer is left of mid
}
return -1;

// Half-open: lower bound = first index with a[i] >= target (or Length)
int LowerBound(int[] a, int target)
{
    int lo = 0, hi = a.Length;           // hi = Length: "insert at the end" is possible
    while (lo < hi)
    {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < target) lo = mid + 1;   // mid is too small: drop it
        else hi = mid;                        // mid may be the answer: keep it
    }
    return lo;
}
```

**Invariant (lower bound).** Everything before `lo` is `< target`. Everything from `hi` onward is `>= target`. When `lo == hi`, that is the boundary.

- **Upper bound** (first index with `a[i] > target`): change `a[mid] < target` to `a[mid] <= target`.
- **First occurrence** = `LowerBound(t)`, if that index is in range and holds t.
- **Last occurrence** = `UpperBound(t) - 1`, if it holds t.
- **Count of t** = `UpperBound(t) - LowerBound(t)`. **Search Insert Position** = `LowerBound(t)`.

**How to avoid infinite loops.**
- The range must shrink on every step. `lo = mid + 1` and `hi = mid - 1` always shrink it.
- `hi = mid` is safe only with `while (lo < hi)` and a mid that rounds down.
- If you write `lo = mid`, round mid **up**: `mid = lo + (hi - lo + 1) / 2`. Otherwise, with lo = 3 and hi = 4, mid stays 3 for ever.
- Always test on arrays of 1 and 2 elements.

**Rotated sorted array (distinct values).** At least one half, `[lo..mid]` or `[mid..hi]`, is sorted. Check whether the target lies inside the sorted half. If yes, search there; if no, search the other half.

```csharp
int lo = 0, hi = a.Length - 1;
while (lo <= hi)
{
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[lo] <= a[mid])                                   // left half is sorted
    {
        if (a[lo] <= target && target < a[mid]) hi = mid - 1;
        else lo = mid + 1;
    }
    else                                                   // right half is sorted
    {
        if (a[mid] < target && target <= a[hi]) lo = mid + 1;
        else hi = mid - 1;
    }
}
return -1;

// Minimum of a rotated array: compare with hi
int left = 0, right = a.Length - 1;
while (left < right)
{
    int mid = left + (right - left) / 2;
    if (a[mid] > a[right]) left = mid + 1;   // the minimum is right of mid
    else right = mid;                         // mid may be the minimum
}
return a[left];
```

With duplicates, `a[mid] == a[right]` gives no information. Then use `right--`, and the worst case becomes O(n).

**Use when.** The input is sorted (or sorted in parts), or you need "first / last position", "insert position", "count of x".

**Cost.** O(log n) time, O(1) space.

**Common bugs.**
- `(lo + hi) / 2` can overflow when the values are large (rare for array indexes, real for answer search).
- Mixing styles: `while (lo <= hi)` with `hi = mid` loops for ever.
- Lower bound with `hi = a.Length - 1` cannot return "insert at the end".
- Expecting `Array.BinarySearch` to return the first duplicate.
- Rotated search: `a[lo] < a[mid]` instead of `<=` fails when `lo == mid`.

**Classic problems.** Binary Search; Find First and Last Position of Element in Sorted Array; Search in Rotated Sorted Array; Find Minimum in Rotated Sorted Array.

<a id="add-dsa-binary-search-answer"></a>

## ➕ Binary search on the answer

**Idea.** You do not search an array. You search the range of possible answers. You need a check `Can(x)`: "is x good enough?".

**Monotone predicate.** As x grows, `Can(x)` goes false, false, ..., true, true and never turns back to false. The answer to "minimum x such that Can(x)" is the first true. For "maximum x such that ...", the pattern is true ... true, false ... false, and you want the last true.

**Steps.**
1. Write `Can(x)` in plain words, then as O(n) code.
2. Prove it is monotone: "if speed k works, any faster speed also works."
3. Pick bounds: `lo` = the smallest possible answer; `hi` = a value that surely works.
4. Run a lower-bound search for the first true.

```csharp
long lo = minPossible, hi = surelyWorks;      // the answer is inside [lo, hi]
while (lo < hi)
{
    long mid = lo + (hi - lo) / 2;
    if (Can(mid)) hi = mid;                   // mid works; maybe smaller works too
    else lo = mid + 1;                        // mid fails; the answer is bigger
}
return lo;
```

**Koko Eating Bananas.** x = eating speed. `Can(k)`: the sum of `ceil(p / k)` over all piles is ≤ h. `lo = 1` (not 0: that divides by zero). `hi = max(piles)`.

```csharp
bool Can(int[] piles, int h, long k)
{
    long hours = 0;
    foreach (int p in piles) hours += (p + k - 1) / k;    // ceiling division
    return hours <= h;
}
```

**Capacity To Ship Packages Within D Days.** x = ship capacity. `Can(c)`: load packages in order; start a new day when the next package does not fit; check that days ≤ D. `lo = max(weights)` (the biggest package must fit). `hi = sum(weights)` (everything in one day).

**Split Array Largest Sum.** The same check: "can I split the array into at most k parts, each with sum ≤ x?". `lo = max`, `hi = sum`. Same code, different story. Say this in the interview.

**Use when.** The problem asks for "minimum X such that ..." or "maximum X such that ...", checking one candidate is easy, and a bigger (or smaller) candidate is always at least as good.

**Cost.** O(n · log(hi − lo)) time when `Can` is O(n). O(1) extra space.

**Common bugs.**
- `lo` too small (speed 0 divides by zero) or `hi` too small (the answer is outside the range).
- A predicate that is not monotone. Binary search then gives a wrong answer with no error.
- `int` overflow in the sum of hours or in `hi = sum`. Use `long`.
- `hi = mid - 1` when mid works. You can lose the answer.
- Counting days from 0 instead of 1.

**Classic problems.** Koko Eating Bananas; Capacity To Ship Packages Within D Days; Split Array Largest Sum; Minimum Number of Days to Make m Bouquets.

<a id="add-dsa-stack-queue"></a>

## ➕ Stacks and queues

**Idea.** A **stack** is last in, first out. Use it when the newest open item must be handled first: brackets, undo, the call stack, "the most recent unmatched item". A **queue** is first in, first out. Use it for arrival order and for BFS levels.

**Invariant (brackets).** The stack holds the brackets that are open and not yet closed, in order. The top is the one that must close next.

**Use when.** Matching pairs; nested structure; evaluating expressions; "most recent"; processing in arrival order.

```csharp
// Valid Parentheses: push the EXPECTED closer
bool IsValid(string s)
{
    var st = new Stack<char>();
    foreach (char c in s)
    {
        if (c == '(') st.Push(')');
        else if (c == '[') st.Push(']');
        else if (c == '{') st.Push('}');
        else if (st.Count == 0 || st.Pop() != c) return false;
    }
    return st.Count == 0;                   // leftovers are unclosed brackets
}

// Evaluate Reverse Polish Notation
int EvalRPN(string[] tokens)
{
    var st = new Stack<int>();
    foreach (string t in tokens)
    {
        if (t is "+" or "-" or "*" or "/")
        {
            int b = st.Pop(), a = st.Pop(); // b was pushed last: it is the RIGHT operand
            st.Push(t switch { "+" => a + b, "-" => a - b, "*" => a * b, _ => a / b });
        }
        else st.Push(int.Parse(t));
    }
    return st.Pop();
}
```

C# `/` on ints truncates toward zero, which is the usual rule in RPN problems.

**Min Stack.** Push pairs (value, minimum so far). Every operation is O(1).

```csharp
public class MinStack
{
    private readonly Stack<(int val, int min)> st = new();
    public void Push(int x) => st.Push((x, st.Count == 0 ? x : Math.Min(x, st.Peek().min)));
    public void Pop() => st.Pop();
    public int Top() => st.Peek().val;
    public int GetMin() => st.Peek().min;
}
```

**Queue using two stacks.**

```csharp
public class MyQueue
{
    private readonly Stack<int> inbox = new(), outbox = new();
    public void Push(int x) => inbox.Push(x);
    public int Pop() { Move(); return outbox.Pop(); }
    public int Peek() { Move(); return outbox.Peek(); }
    public bool Empty() => inbox.Count == 0 && outbox.Count == 0;
    private void Move()
    {
        if (outbox.Count > 0) return;                    // refill only when empty
        while (inbox.Count > 0) outbox.Push(inbox.Pop());
    }
}
```

**Why it is amortised O(1).** Each element is pushed to `inbox` once, moved once, and popped from `outbox` once. So n operations cost O(n) in total, which is O(1) each. One single `Pop` can still cost O(n). The rule "move only when `outbox` is empty" keeps the order correct.

**Circular queue (ring buffer).** An array of size k, a `head` index and a `count`. The tail index is `(head + count) % k`. Every operation is O(1), with no shifting.

**Cost.** Push, pop and peek are O(1) (amortised when the storage grows). Space is O(n).

**Common bugs.**
- `Pop` or `Peek` on an empty stack throws `InvalidOperationException`. Check `Count` first.
- RPN: the wrong operand order for `-` and `/`.
- Brackets: forgetting the final `st.Count == 0` check, so `"(("` passes.
- Queue via stacks: moving items while `outbox` is not empty breaks the order.

**Classic problems.** Valid Parentheses; Min Stack; Evaluate Reverse Polish Notation; Implement Queue using Stacks.

<a id="add-dsa-monotonic"></a>

## ➕ Monotonic stack and monotonic deque

**Idea.** A stack of **indexes** whose values stay sorted. When a new value breaks the order, pop. The new value is the answer for each index you pop.

| You want | Keep stack values | Pop while | Answer |
|---|---|---|---|
| Next greater | decreasing | `a[st.Peek()] < a[i]` | for each popped index: i |
| Next smaller | increasing | `a[st.Peek()] > a[i]` | for each popped index: i |
| Previous smaller | increasing | `a[st.Peek()] >= a[i]` | for i: the top after popping (or none) |
| Previous greater | decreasing | `a[st.Peek()] <= a[i]` | for i: the top after popping (or none) |

**Invariant.** The stack holds indexes that are still waiting for their answer. Their values are in order from bottom to top.

**Use when.** "Next greater / smaller", "how many days until warmer", spans, the largest rectangle, or the maximum of every window.

```csharp
// Daily Temperatures: distance to the next greater value (0 = none)
int[] NextGreaterDistance(int[] a)
{
    var res = new int[a.Length];
    var st = new Stack<int>();                        // indexes
    for (int i = 0; i < a.Length; i++)
    {
        while (st.Count > 0 && a[st.Peek()] < a[i])
        {
            int j = st.Pop();
            res[j] = i - j;                           // a[i] is j's next greater
        }
        st.Push(i);
    }
    return res;
}
```

**Circular array** (Next Greater Element II): loop i from 0 to 2n − 1, use `i % n`, and push only while i < n.

**Largest Rectangle in Histogram.** The widest rectangle that uses bar j's full height runs from the previous smaller bar to the next smaller bar. Keep an increasing stack. When bar i pops bar j, the right limit is i and the left limit is the new top (or −1).

```csharp
int LargestRectangle(int[] h)
{
    var st = new Stack<int>();
    int best = 0;
    for (int i = 0; i <= h.Length; i++)
    {
        int cur = i == h.Length ? 0 : h[i];           // a final 0 pops everything
        while (st.Count > 0 && h[st.Peek()] >= cur)
        {
            int height = h[st.Pop()];
            int left = st.Count == 0 ? -1 : st.Peek();
            best = Math.Max(best, height * (i - left - 1));
        }
        st.Push(i);
    }
    return best;
}
```

**Monotonic deque: Sliding Window Maximum.** Keep indexes with decreasing values. The front is the index of the maximum in the current window. .NET has no deque, so use `LinkedList<int>`.

```csharp
int[] MaxSlidingWindow(int[] a, int k)
{
    var res = new int[a.Length - k + 1];
    var dq = new LinkedList<int>();                                        // indexes
    for (int i = 0; i < a.Length; i++)
    {
        if (dq.Count > 0 && dq.First!.Value <= i - k) dq.RemoveFirst();    // left the window
        while (dq.Count > 0 && a[dq.Last!.Value] <= a[i]) dq.RemoveLast(); // can never be max again
        dq.AddLast(i);
        if (i >= k - 1) res[i - k + 1] = a[dq.First!.Value];
    }
    return res;
}
```

**Why it is O(n), not O(n²).** Each index is pushed once and popped at most once. The inner `while` only pops. Over the whole run there are at most n pops, so the total work is at most 2n, even though there is a loop inside a loop.

**Cost.** O(n) time, O(n) space.

**Common bugs.**
- Storing values instead of indexes. You need indexes for distances and window checks.
- `<` versus `<=` with duplicates. This changes "strictly greater" answers and rectangle widths.
- Forgetting the items left on the stack at the end. The histogram needs the final 0; for next greater they stay "none".
- Deque: removing the old front with `< i - k` instead of `<= i - k`.

**Classic problems.** Daily Temperatures; Next Greater Element II; Largest Rectangle in Histogram; Sliding Window Maximum.

<a id="add-dsa-linked-list"></a>

## ➕ Linked lists

**Node class** (LeetCode defines it for you):

```csharp
public class ListNode
{
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null) { this.val = val; this.next = next; }
}
```

**Two rules.** Draw boxes and arrows before you change any pointer. Save `next` before you overwrite it.

**Dummy node.** Put a dummy node before `head` when the head itself may change (delete the head, merge, insert at the front). Return `dummy.next` at the end. This removes the special case.

**Reverse (iterative).** Invariant: `prev` is the head of the reversed part; `cur` is the head of the part that is not reversed yet.

```csharp
ListNode Reverse(ListNode head)
{
    ListNode prev = null, cur = head;
    while (cur != null)
    {
        ListNode next = cur.next;    // 1. save
        cur.next = prev;             // 2. flip
        prev = cur;                  // 3. move prev
        cur = next;                  // 4. move cur
    }
    return prev;                     // the new head
}

// Recursive: O(n) stack, so it can overflow on a very long list
ListNode ReverseRec(ListNode head)
{
    if (head == null || head.next == null) return head;
    ListNode newHead = ReverseRec(head.next);   // the rest is now reversed
    head.next.next = head;                      // the node after head points back
    head.next = null;                           // otherwise a 2-node cycle remains
    return newHead;
}
```

**Fast and slow pointers.**

```csharp
ListNode slow = head, fast = head;
while (fast != null && fast.next != null)
{
    slow = slow.next;
    fast = fast.next.next;
    // Cycle check: if (slow == fast) there is a cycle.
}
// No cycle: slow is the middle (the SECOND middle when the length is even).
```

**Cycle start (Floyd).** After the pointers meet, move one pointer back to `head`. Move both one step at a time. They meet at the cycle start.
Why: let a = steps from head to the cycle start, b = steps from the start to the meeting point, c = cycle length. Slow walked a + b. Fast walked 2(a + b). The extra distance a + b is a whole number of loops: a + b = m·c. So a = m·c − b. Walking a steps from the meeting point ends at the cycle start, and walking a steps from head also ends there.

**Merge two sorted lists.**

```csharp
var dummy = new ListNode(); var tail = dummy;
while (l1 != null && l2 != null)
{
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }   // <= keeps it stable
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
}
tail.next = l1 ?? l2;
return dummy.next;
```

**Remove the nth node from the end.** Give `fast` a lead of n + 1 steps from the dummy. Move both until `fast` is null. Then `slow.next` is the node to remove.

```csharp
var dummy = new ListNode(0, head);
ListNode fast = dummy, slow = dummy;
for (int i = 0; i <= n; i++) fast = fast.next;          // gap of n + 1
while (fast != null) { fast = fast.next; slow = slow.next; }
slow.next = slow.next.next;
return dummy.next;
```

**Reverse in k-groups (idea).** Use a dummy and keep `groupPrev` = the node before the current group. For each group: check that k nodes exist (if not, stop); reverse those k nodes with the iterative loop; connect `groupPrev` to the new group head; connect the new group tail (the old first node) to the next group; set `groupPrev` to that tail.

**LRU cache = Dictionary + doubly linked list.** The dictionary finds a node in O(1). The list moves a node to the front and removes the last node in O(1). C# `LinkedList<T>` is doubly linked, and `Remove(node)` is O(1).

```csharp
public class LRUCache
{
    private readonly int cap;
    private readonly Dictionary<int, LinkedListNode<(int key, int val)>> map = new();
    private readonly LinkedList<(int key, int val)> order = new();   // front = most recent

    public LRUCache(int capacity) => cap = capacity;

    public int Get(int key)
    {
        if (!map.TryGetValue(key, out var node)) return -1;
        order.Remove(node);
        order.AddFirst(node);                                          // now most recent
        return node.Value.val;
    }

    public void Put(int key, int value)
    {
        if (map.TryGetValue(key, out var node)) order.Remove(node);
        else if (map.Count == cap)
        {
            map.Remove(order.Last!.Value.key);                         // evict least recent
            order.RemoveLast();
        }
        map[key] = order.AddFirst((key, value));
    }
}
```

The list stores the key because, when you evict the last node, you need its key to delete it from the dictionary.

**Use when.** In-place pointer changes; O(1) extra space; cycle or middle; ordered eviction (LRU).

**Cost.** Most list operations are O(n) time and O(1) space. LRU is O(1) per operation.

**Common bugs.**
- Overwriting `cur.next` before saving it. The rest of the list is lost.
- `fast.next.next` without checking `fast.next != null`.
- No dummy node, then a wrong special case for deleting the head.
- Recursive reverse without `head.next = null`: a 2-node cycle remains.
- LRU: not storing the key in the node, or not moving the node on `Get`.

**Classic problems.** Reverse Linked List; Linked List Cycle II; Remove Nth Node From End of List; LRU Cache.

<a id="add-dsa-recursion"></a>

## ➕ Recursion

[BASIC-037](00_START_FROM_ZERO.md#basic-037) defines recursion and the base case. This section shows how to design and trace it.

**Three parts of every recursive function.**
1. **Base case:** the smallest input, answered directly.
2. **Progress:** each call works on a smaller input, so it must reach the base case.
3. **Trust:** assume the call on the smaller input is correct, and build your answer from its result. Do not trace every level in your head while you design.

**Call stack.** Each call gets its own frame with its own parameters and locals. A frame stays on the stack until its call returns.

```csharp
int Sum(int[] a, int i) => i == a.Length ? 0 : a[i] + Sum(a, i + 1);
```

Trace of `Sum([3, 1, 2], 0)`:

| Call | Waits for | Returns |
|---|---|---|
| Sum(a, 0) | 3 + Sum(a, 1) | 6 |
| Sum(a, 1) | 1 + Sum(a, 2) | 3 |
| Sum(a, 2) | 2 + Sum(a, 3) | 2 |
| Sum(a, 3) | base case | 0 |

Calls go down the table; results come back up. The maximum depth is n + 1 frames, so the space is O(n).

**Recursion tree.** Draw one node per call; its children are the calls it makes. **Time = number of nodes × work per node. Space = height of the tree.**

```
F(5)
├── F(4)
│   ├── F(3)
│   │   ├── F(2) ...
│   │   └── F(1)
│   └── F(2) ...
└── F(3)          <- the same work again
    ├── F(2) ...
    └── F(1)
```

Naive Fibonacci computes F(3) twice and F(2) three times. The number of nodes grows exponentially (at most O(2ⁿ)). The height is n, so the space is O(n).

**Memoisation.** Store each answer the first time; return it the next time.

```csharp
long Fib(int n, long[] memo)            // fill memo with -1 first: Array.Fill(memo, -1)
{
    if (n < 2) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = Fib(n - 1, memo) + Fib(n - 2, memo);
}
```

Now each F(k) is computed once: O(n) time, O(n) memo and O(n) stack. This is top-down DP; see [DP families](#add-dsa-dp-families).

**Divide and conquer.** Split the input, solve the parts, combine. Merge sort, quicksort and fast power are examples.

```csharp
double MyPow(double x, long n)          // long: -int.MinValue does not fit in int
{
    if (n < 0) return 1 / MyPow(x, -n);
    if (n == 0) return 1;
    double half = MyPow(x, n / 2);      // call ONCE and reuse
    return n % 2 == 0 ? half * half : half * half * x;
}
```

**Recursion or loop?**

| | Recursion | Loop |
|---|---|---|
| Good for | trees, divide and conquer, backtracking | linear scans, simple repeats |
| Space | O(depth) stack | O(1), unless you keep your own stack |
| Risk | stack overflow when the depth is large | none from depth |

For linear recursion (sum of a list, reverse a list), a loop is safer in production. For a balanced tree, recursion is fine (the depth is about log n). To convert, use an explicit `Stack<T>` that holds what each frame held.

**Stack-depth limits in C#.** The stack is limited, `StackOverflowException` cannot be caught, and tail calls are not guaranteed. Details and fixes are in the [toolkit](#add-dsa-csharp-toolkit) under "Recursion depth".

**Cost.** Time = nodes × work per node. Space = maximum depth (plus any memo).

**Common bugs.**
- A missing or wrong base case: infinite recursion, then a crash.
- No progress: calling again with the same argument.
- Calling the same subproblem twice, such as `MyPow(x, n / 2) * MyPow(x, n / 2)`. This makes it O(n) instead of O(log n).
- Ignoring the return value of the recursive call.
- Sharing a mutable list between calls without undoing changes (see backtracking).

**Classic problems.** Pow(x, n); Fibonacci Number; Climbing Stairs; Reverse Linked List (recursive version).

<a id="add-dsa-backtracking"></a>

## ➕ Backtracking

**Idea.** Build an answer one choice at a time. After you explore a choice, undo it and try the next one. The search forms a tree: each node is a partial answer.

**Invariant.** The shared state (the path, `used[]`, the board) is exactly the same before and after each recursive call. The undo step guarantees this.

**Use when.** The problem says "all", "every", "generate" or "list all", and n is small. Also placement puzzles (N-Queens, Sudoku) and word search in a grid.

**Shape (pseudocode):**

```
Backtrack(state):
    if state is complete: record a COPY of it; return
    for each choice:
        if choice is not valid: skip            // prune
        apply choice                            // choose
        Backtrack(state)                        // explore
        undo choice                             // unchoose
```

**Subsets (start-index form).**

```csharp
IList<IList<int>> Subsets(int[] nums)
{
    var res = new List<IList<int>>();
    var path = new List<int>();
    void Go(int start)
    {
        res.Add(new List<int>(path));             // every node is a subset: add a COPY
        for (int i = start; i < nums.Length; i++)
        {
            path.Add(nums[i]);                    // choose
            Go(i + 1);                            // explore: only later items
            path.RemoveAt(path.Count - 1);        // unchoose
        }
    }
    Go(0);
    return res;
}
```

- **Combinations** (k items from 1..n): the same shape, but record only when `path.Count == k`. Prune when too few items remain: `for (int i = start; i <= n - (k - path.Count) + 1; i++)`.
- **Combination Sum** (reuse allowed): recurse with `Go(i, remain - c[i])`, so `i`, not `i + 1`. Sort first, and `break` when `c[i] > remain`, because every later candidate is bigger.

**Permutations (`used[]` form).**

```csharp
void Go()                                         // res, path, used, nums come from the outer method
{
    if (path.Count == nums.Length) { res.Add(new List<int>(path)); return; }
    for (int i = 0; i < nums.Length; i++)
    {
        if (used[i]) continue;
        used[i] = true; path.Add(nums[i]);
        Go();
        used[i] = false; path.RemoveAt(path.Count - 1);
    }
}
```

**Duplicate skipping.** Sort first. At the same depth (inside the same `for` loop), skip a value equal to the one before it.
- **Subsets II, Combination Sum II:** `if (i > start && nums[i] == nums[i - 1]) continue;`. Use `i > start`, not `i > 0`. The first item at this depth is always allowed; only a second equal value at the **same depth** repeats a branch.
- **Permutations II:** `if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;`. This uses equal values only in left-to-right order.

**Pruning.** Stop a branch as soon as it cannot succeed: sorted candidates plus `break`; not enough items left; a column or diagonal already taken (N-Queens). Pruning can save a lot of time, but the worst case stays exponential.

**Grid search with visited restore (Word Search).**

```csharp
bool Dfs(char[][] b, string w, int r, int c, int k)
{
    if (k == w.Length) return true;
    if (r < 0 || c < 0 || r >= b.Length || c >= b[0].Length || b[r][c] != w[k]) return false;
    char saved = b[r][c];
    b[r][c] = '#';                                // visited on THIS path only
    bool found = Dfs(b, w, r + 1, c, k + 1) || Dfs(b, w, r - 1, c, k + 1)
              || Dfs(b, w, r, c + 1, k + 1) || Dfs(b, w, r, c - 1, k + 1);
    b[r][c] = saved;                              // restore after all four directions
    return found;
}
```

Here "visited" belongs to one path and is undone. In graph BFS/DFS, "visited" is permanent. Do not mix the two.

**Cost.** Subsets O(n · 2ⁿ) (2ⁿ subsets, O(n) to copy each). Permutations O(n · n!). Word Search about O(R · C · 3^L): after the first step, each step has at most 3 new directions. Space is O(n) for the path and the stack, plus the output.

**Common bugs.**
- `res.Add(path)` without a copy. Every result becomes the same list, which is empty at the end.
- Forgetting to undo the path, `used[]` or the board cell.
- `i > 0` instead of `i > start` in Subsets II. Valid subsets are lost.
- Combination Sum: passing `i + 1` (no reuse) or `0` (the same set in different orders).
- Restoring the board cell before all four directions are tried.

**Classic problems.** Subsets II; Permutations; Combination Sum; Word Search.

<a id="add-dsa-sorting"></a>

## ➕ Sorting algorithms

**The eight algorithms.**

| Algorithm | Best | Average | Worst | Extra space | Stable | When it matters |
|---|---|---|---|---|---|---|
| Bubble (with early exit) | O(n) | O(n²) | O(n²) | O(1) | Yes | teaching only |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No | few swaps (at most n − 1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes | small or nearly sorted input; used inside introsort for small parts |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | guaranteed and stable; linked lists; counting inversions |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) stack (expected) | No | fast in memory; the base of quickselect |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No | guaranteed bound with O(1) extra space |
| Counting | O(n + k) | O(n + k) | O(n + k) | O(n + k) | Yes (back-to-front version) | small integer range k |
| Radix (LSD) | O(d(n + b)) | O(d(n + b)) | O(d(n + b)) | O(n + b) | Yes | fixed-width integers or strings; d digits in base b |

**Stable** means equal keys keep their input order. It matters when you sort by a second key after a first key. Example: sort people by name, then stable-sort by age. People with the same age stay in name order.

**Merge sort.**

```csharp
void MergeSort(int[] a, int[] tmp, int lo, int hi)          // sorts a[lo..hi)
{
    if (hi - lo < 2) return;
    int mid = lo + (hi - lo) / 2;
    MergeSort(a, tmp, lo, mid);
    MergeSort(a, tmp, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];   // <= keeps it stable
    while (i < mid) tmp[k++] = a[i++];
    while (j < hi) tmp[k++] = a[j++];
    Array.Copy(tmp, lo, a, lo, hi - lo);
}
// Call: MergeSort(a, new int[a.Length], 0, a.Length);
```

**Quicksort partition: Lomuto vs Hoare.**

| | Lomuto | Hoare |
|---|---|---|
| Pointers | one scan index j and one boundary i | two indexes that move toward each other |
| Pivot | usually the last element | usually the first or middle element |
| After partition | the pivot is at its final index p; recurse on (lo, p − 1) and (p + 1, hi) | returns a split index j; recurse on (lo, j) and (j + 1, hi); the pivot may not be at its final place |
| Swaps | more | fewer |
| All-equal input | O(n²) | splits near the middle |
| Ease | easier to write | easier to get wrong |

```csharp
// Lomuto with a random pivot (inclusive lo..hi)
int Partition(int[] a, int lo, int hi)
{
    int r = Random.Shared.Next(lo, hi + 1);       // a random pivot avoids the sorted-input worst case
    (a[r], a[hi]) = (a[hi], a[r]);
    int pivot = a[hi], i = lo;                     // invariant: a[lo..i-1] < pivot
    for (int j = lo; j < hi; j++)
        if (a[j] < pivot) { (a[i], a[j]) = (a[j], a[i]); i++; }
    (a[i], a[hi]) = (a[hi], a[i]);                 // pivot to its final place
    return i;
}

void QuickSort(int[] a, int lo, int hi)
{
    if (lo >= hi) return;
    int p = Partition(a, lo, hi);
    QuickSort(a, lo, p - 1);
    QuickSort(a, p + 1, hi);
}

// Hoare with a middle pivot: recurse on (lo, j) and (j + 1, hi)
int HoarePartition(int[] a, int lo, int hi)
{
    int pivot = a[lo + (hi - lo) / 2], i = lo - 1, j = hi + 1;
    while (true)
    {
        do i++; while (a[i] < pivot);
        do j--; while (a[j] > pivot);
        if (i >= j) return j;
        (a[i], a[j]) = (a[j], a[i]);
    }
}
```

**Quickselect** (the k-th smallest, 0-based k). Partition, then continue only on the side that contains index k. It is O(n) on average and O(n²) in the worst case, and it changes the array.

```csharp
int QuickSelect(int[] a, int k)
{
    int lo = 0, hi = a.Length - 1;
    while (true)
    {
        int p = Partition(a, lo, hi);              // Lomuto with a random pivot
        if (p == k) return a[p];
        if (p < k) lo = p + 1; else hi = p - 1;
    }
}
// k-th largest = QuickSelect(a, a.Length - k)
```

**Counting sort** (values 0..k): count each value, then write the values back in order. For records, turn the counts into prefix sums and place items from back to front; that version is stable. **Radix sort**: sort by the last digit, then the next digit, and so on, using a stable counting sort for each pass. Negative numbers need special handling.

**.NET built-in sorts.**
- `Array.Sort` and `List<T>.Sort`: the docs describe an introspective sort (introsort). It uses insertion sort when a partition has 16 or fewer elements, heapsort when the partitioning goes too deep (more than about 2 · log n levels), and quicksort otherwise. The docs say it is **unstable** and O(n log n). (Checked against the .NET 10 docs on 19 Oct 2026; verify the exact wording if the version changes.)
- `Enumerable.OrderBy` / `ThenBy`: a **stable** sort (docs). It allocates a new sequence.
- To make `Array.Sort` stable, sort `(value, originalIndex)` pairs and compare the index last.

**Comparer rules.** A comparer must be consistent: if `cmp(a, b) < 0` then `cmp(b, a) > 0`, and `cmp(a, a) == 0`. A broken comparer can give a wrong order or an exception.

**Common bugs.**
- `(a, b) => a - b` as a comparer: it overflows.
- Merge sort with `<` instead of `<=`: the sort is no longer stable.
- Quicksort with a fixed first or last pivot on sorted input: O(n²) and very deep recursion.
- Lomuto on many duplicates: O(n²). Use a three-way partition ([Dutch flag](#add-dsa-advanced-arrays)) or Hoare.
- Counting sort with a huge range k: huge memory.

**Classic problems.** Sort an Array; Kth Largest Element in an Array; Sort Colors; Largest Number (custom comparer).

<a id="add-dsa-matrix"></a>

## ➕ Matrix and grid patterns

**Idea.** A matrix is rows × columns. Most problems are a careful traversal with correct boundaries. Rows = `g.Length`, columns = `g[0].Length` (jagged arrays; check `g.Length == 0` first). A full traversal is O(R · C).

**Invariant (spiral).** `top`, `bottom`, `left` and `right` mark the ring that is not printed yet. Every cell outside them is already printed.

**Use when.** Grids, images, boards, "rotate", "spiral", "in place", "sorted rows and columns".

**Directions, bounds and flattening.**

```csharp
int[] dr = [-1, 1, 0, 0], dc = [0, 0, -1, 1];      // up, down, left, right
for (int d = 0; d < 4; d++)
{
    int nr = r + dr[d], nc = c + dc[d];
    if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
    // use g[nr][nc]
}
// Flatten: id = r * cols + c;  back: r = id / cols, c = id % cols
```

**Spiral order.**

```csharp
var res = new List<int>();
int top = 0, bottom = m.Length - 1, left = 0, right = m[0].Length - 1;
while (top <= bottom && left <= right)
{
    for (int c = left; c <= right; c++) res.Add(m[top][c]);
    top++;
    for (int r = top; r <= bottom; r++) res.Add(m[r][right]);
    right--;
    if (top <= bottom)                                  // a row is still left
        for (int c = right; c >= left; c--) res.Add(m[bottom][c]);
    bottom--;
    if (left <= right)                                  // a column is still left
        for (int r = bottom; r >= top; r--) res.Add(m[r][left]);
    left++;
}
```

**Rotate 90° clockwise in place (n × n).** Transpose (swap `g[i][j]` and `g[j][i]` for j > i), then reverse each row. For counter-clockwise: transpose, then reverse the order of the rows.

```csharp
int n = g.Length;
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)                     // j > i: swap each pair once
        (g[i][j], g[j][i]) = (g[j][i], g[i][j]);
foreach (int[] row in g) Array.Reverse(row);
```

Check on `[[1,2],[3,4]]`: transpose → `[[1,3],[2,4]]`; reverse rows → `[[3,1],[4,2]]`. That is the clockwise rotation.

**Set Matrix Zeroes in O(1) extra space.** Use row 0 and column 0 as marker storage.

```csharp
int R = g.Length, C = g[0].Length;
bool row0 = Array.IndexOf(g[0], 0) >= 0, col0 = false;
for (int r = 0; r < R; r++) if (g[r][0] == 0) col0 = true;
for (int r = 1; r < R; r++)
    for (int c = 1; c < C; c++)
        if (g[r][c] == 0) { g[r][0] = 0; g[0][c] = 0; }    // mark
for (int r = 1; r < R; r++)
    for (int c = 1; c < C; c++)
        if (g[r][0] == 0 || g[0][c] == 0) g[r][c] = 0;     // apply
if (row0) Array.Fill(g[0], 0);                             // row 0 and column 0 LAST
if (col0) for (int r = 0; r < R; r++) g[r][0] = 0;
```

**Search a 2D matrix.**
- **Each row is sorted and each row starts after the previous row ends** (Search a 2D Matrix): treat it as one sorted array of R · C items. Binary search on `id` and read `g[id / C][id % C]`. O(log(R · C)).
- **Rows sorted and columns sorted** (Search a 2D Matrix II): start at the top-right corner. If the value is bigger than the target, move left (the rest of that column is bigger). If it is smaller, move down. O(R + C).

```csharp
int r = 0, c = g[0].Length - 1;
while (r < g.Length && c >= 0)
{
    if (g[r][c] == target) return true;
    if (g[r][c] > target) c--; else r++;
}
return false;
```

**Rectangular vs jagged.** See the [toolkit](#add-dsa-csharp-toolkit) table and [BASIC-010](00_START_FROM_ZERO.md#basic-010). LeetCode C# grid problems use `int[][]` and `char[][]` (verify on your platform).

**Cost.** O(R · C) for a full traversal. Extra space as noted above.

**Common bugs.**
- Mixing up `g[r][c]` and `g[c][r]`, or using the row count as the column bound on a non-square grid.
- Transposing every (i, j) pair: each pair is swapped twice, so nothing changes. Start j at i + 1.
- Spiral without the `top <= bottom` and `left <= right` checks: a single row or column is printed twice.
- Set Matrix Zeroes: clearing row 0 or column 0 too early destroys the markers.
- Reading `g[0].Length` on an empty grid.

**Classic problems.** Spiral Matrix; Rotate Image; Set Matrix Zeroes; Search a 2D Matrix II.

<a id="add-dsa-intervals"></a>

## ➕ Intervals

**Overlap definition.** Read the problem; touching endpoints differ between problems.
- **Closed** intervals `[a, b]` and `[c, d]` overlap when `a <= d && c <= b`. Touching (`[1, 3]` and `[3, 5]`) counts as overlap. Merge Intervals and Minimum Arrows use this rule.
- **Half-open** intervals `[a, b)` (meetings: the end time is free) overlap when `a < d && c < b`. A meeting that ends at 10 and one that starts at 10 do not conflict. Meeting Rooms and Non-overlapping Intervals use this rule.

**Sort key.**

| Goal | Sort by | Why |
|---|---|---|
| Merge, insert | start | after sorting, only the last merged interval can overlap the next one |
| Most non-overlapping, fewest removals, fewest arrows | end | taking the interval that ends first leaves the most room (exchange argument) |
| Rooms needed, most overlap at one time | start + a min-heap of ends, or a sweep over events | |

**Invariant (merge).** After sorting by start, the result list is merged and sorted, and only its last interval can overlap the next input interval.

**Use when.** Ranges, meetings, bookings, "merge", "overlap", "how many rooms".

```csharp
// Merge Intervals
int[][] Merge(int[][] iv)
{
    Array.Sort(iv, (x, y) => x[0].CompareTo(y[0]));
    var res = new List<int[]>();
    foreach (var cur in iv)
    {
        if (res.Count > 0 && cur[0] <= res[^1][1])          // overlaps the last one (touching counts)
            res[^1][1] = Math.Max(res[^1][1], cur[1]);
        else
            res.Add([cur[0], cur[1]]);                      // a copy: do not change the input
    }
    return res.ToArray();
}

// Insert Interval (input sorted and non-overlapping): three phases
int[][] Insert(int[][] iv, int[] nw)
{
    var res = new List<int[]>();
    int i = 0, n = iv.Length, s = nw[0], e = nw[1];
    while (i < n && iv[i][1] < s) res.Add(iv[i++]);         // ends before the new one starts
    while (i < n && iv[i][0] <= e)                          // overlaps the new one
    {
        s = Math.Min(s, iv[i][0]);
        e = Math.Max(e, iv[i][1]);
        i++;
    }
    res.Add([s, e]);
    while (i < n) res.Add(iv[i++]);                         // starts after the new one ends
    return res.ToArray();
}

// Non-overlapping Intervals: sort by END, keep greedily, return removals
int EraseOverlap(int[][] iv)
{
    Array.Sort(iv, (x, y) => x[1].CompareTo(y[1]));
    int kept = 0; long lastEnd = long.MinValue;
    foreach (var x in iv)
        if (x[0] >= lastEnd) { kept++; lastEnd = x[1]; }    // touching is allowed here
    return iv.Length - kept;
}
```

**Meeting Rooms II with a min-heap of end times.** The heap holds the end times of meetings that use a room now. Its size never goes down, so the final size is the most rooms used at one time.

```csharp
Array.Sort(iv, (x, y) => x[0].CompareTo(y[0]));
var ends = new PriorityQueue<int, int>();
foreach (var m in iv)
{
    if (ends.Count > 0 && ends.Peek() <= m[0]) ends.Dequeue();   // a room is free again
    ends.Enqueue(m[1], m[1]);
}
return ends.Count;
```

**Line sweep.** Make events: +1 at each start, −1 at each end. Sort by time. At the same time, process −1 before +1 (half-open meetings). The highest running total is the number of rooms.

```csharp
var ev = new List<(int t, int d)>();
foreach (var m in iv) { ev.Add((m[0], 1)); ev.Add((m[1], -1)); }
ev.Sort();                                   // by t, then d: -1 comes before +1
int cur = 0, best = 0;
foreach (var (t, d) in ev) { cur += d; best = Math.Max(best, cur); }
```

**Cost.** O(n log n) for the sort. The sweep is O(n); the heap version is O(n log n).

**Common bugs.**
- The wrong overlap rule (`<` vs `<=`) for this problem.
- Sorting by start when the greedy needs end, or the reverse.
- The comparer `x[0] - y[0]`: it overflows when values are near the int limits.
- Changing the input intervals while the caller still uses them.
- Insert Interval: forgetting the last phase, or forgetting to add the merged new interval.

**Classic problems.** Merge Intervals; Insert Interval; Non-overlapping Intervals; Meeting Rooms II (premium on LeetCode; free versions exist on other sites).

<a id="add-dsa-advanced-arrays"></a>

## ➕ Advanced array techniques

Learn these after the core array patterns. Each one is short, and each one has a clear cue.

### Dutch national flag (three-way partition)

**Idea.** Sort an array of 0s, 1s and 2s in one pass, in place.
**Invariant.** `a[0..low-1]` = 0; `a[low..mid-1]` = 1; `a[mid..high]` = not checked yet; `a[high+1..]` = 2.

```csharp
int low = 0, mid = 0, high = a.Length - 1;
while (mid <= high)
{
    if (a[mid] == 0) { (a[low], a[mid]) = (a[mid], a[low]); low++; mid++; }
    else if (a[mid] == 1) mid++;
    else { (a[mid], a[high]) = (a[high], a[mid]); high--; }   // do NOT mid++: the new a[mid] is unchecked
}
```

**Cost.** O(n) time, O(1) space. It is also the base of three-way quicksort for many duplicates.
**Common bugs.** `mid++` after swapping with `high`; `while (mid < high)` skips the last item.
**Classic problems.** Sort Colors.

### Cyclic sort (missing and duplicate numbers)

**Use when.** There are n items and the values lie in 1..n (or 0..n). Value v belongs at index v − 1.

```csharp
int i = 0;
while (i < a.Length)
{
    int home = a[i] - 1;
    if (a[i] >= 1 && a[i] <= a.Length && a[home] != a[i])
        (a[i], a[home]) = (a[home], a[i]);           // send a[i] to its home
    else i++;
}
// Now a[j] != j + 1 means j + 1 is missing (and a[j] is a duplicate when values are 1..n).
```

**Invariant.** Every swap puts one value at its final home, so there are at most n swaps.
**Cost.** O(n) time, O(1) extra space.
**Common bugs.** An infinite loop when a duplicate is already at home (the `a[home] != a[i]` check prevents it); values outside 1..n (zero, negative, too large) must be skipped.
**Classic problems.** Missing Number; Find All Numbers Disappeared in an Array; Find All Duplicates in an Array; First Missing Positive.

### Coordinate compression

**Use when.** Values are huge (for example up to 10⁹), only their order matters, and you need them as array indexes (a counting array or a Fenwick tree).

```csharp
int[] sorted = a.Distinct().Order().ToArray();     // O(n log n); Order() needs .NET 7+
var rank = new Dictionary<int, int>();
for (int i = 0; i < sorted.Length; i++) rank[sorted[i]] = i;   // value -> 0..m-1
```

**Common bugs.** Forgetting to remove duplicates, so the ranks have gaps.
**Classic problems.** Rank Transform of an Array; Count of Smaller Numbers After Self (with a [Fenwick tree](#add-dsa-range-queries)).

### Kadane's algorithm (maximum subarray)

**Idea.** The best subarray that ends at index i either extends the best one that ends at i − 1, or starts again at i.
**Invariant.** `cur` = the best sum of a subarray that ends at i; `best` = the best sum seen so far.

```csharp
int cur = a[0], best = a[0];                  // start from a[0], NOT from 0
for (int i = 1; i < a.Length; i++)
{
    cur = Math.Max(a[i], cur + a[i]);         // extend or restart
    best = Math.Max(best, cur);
}
```

**All-negative input** `[-3, -1, -2]`: the answer is −1. If you start `best` at 0, you return 0, which is wrong because an empty subarray is not allowed.

**Maximum product subarray.** A negative number swaps the largest and the smallest product, so keep both.

```csharp
int hi = a[0], lo = a[0], bestProd = a[0];
for (int i = 1; i < a.Length; i++)
{
    int x = a[i];
    if (x < 0) (hi, lo) = (lo, hi);           // a negative flips max and min
    hi = Math.Max(x, hi * x);
    lo = Math.Min(x, lo * x);
    bestProd = Math.Max(bestProd, hi);
}
```

A zero restarts both values on its own, because `Math.Max(x, ...)` can pick x. If the problem does not promise that products fit in an int, use `long`.
**Cost.** O(n) time, O(1) space.
**Classic problems.** Maximum Subarray; Maximum Product Subarray; Best Time to Buy and Sell Stock.

### Reservoir sampling (overview)

**Problem.** Pick k random items from a stream of unknown length. Each item must have the same chance. Use only O(k) memory.
**Rule for k = 1.** Keep the i-th item (1-based) with probability 1/i.

```csharp
int seenCount = 0, chosen = 0;
foreach (int x in stream)
{
    seenCount++;
    if (Random.Shared.Next(seenCount) == 0) chosen = x;     // probability 1 / seenCount
}
```

**Why it is fair (k = 1).** Item i is chosen with probability 1/i. It then survives step j with probability (j − 1)/j. The product is 1/i · i/(i+1) · ... · (n−1)/n = 1/n.
**For k items.** Keep the first k. For item i > k, pick j at random in [0, i); if j < k, replace slot j.
**Classic problems.** Linked List Random Node; Random Pick Index.

### Fisher–Yates shuffle (overview)

```csharp
for (int i = a.Length - 1; i > 0; i--)
{
    int j = Random.Shared.Next(i + 1);        // 0..i inclusive
    (a[i], a[j]) = (a[j], a[i]);
}
```

Every order has the same probability. **Bug:** using `Next(a.Length)` for every i gives a biased shuffle. .NET 8 and later have `Random.Shared.Shuffle(array)`, which the docs describe as an O(n) in-place shuffle.
**Classic problems.** Shuffle an Array.

<a id="add-dsa-bits-math"></a>

## ➕ Bits and math

### Operators

| Operator | C# | Example (4-bit view) | Use |
|---|---|---|---|
| AND | `a & b` | 1100 & 1010 = 1000 | test or clear bits |
| OR | `a \| b` | 1100 \| 1010 = 1110 | set bits |
| XOR | `a ^ b` | 1100 ^ 1010 = 0110 | toggle bits; cancel pairs |
| NOT | `~a` | ~0000 = 1111 (that is −1 for int) | invert every bit |
| Left shift | `a << k` | 0011 << 1 = 0110 | multiply by 2ᵏ |
| Right shift | `a >> k` | keeps the sign for int | divide by 2ᵏ, rounding toward −∞ (`-7 >> 1 == -4`, but `-7 / 2 == -3`) |
| Unsigned right shift | `a >>> k` | fills with 0 (C# 11+) | treat an int as unsigned |

**C# shift detail.** For `int`, only the low 5 bits of the shift count are used, so `1 << 32 == 1`, not 0. For `long`, the low 6 bits are used. Write `1L << k` when k can be 31 or more.

### Bit tricks

| Task | Code | Why it works |
|---|---|---|
| Is bit i set? | `((x >> i) & 1) == 1` | moves bit i to position 0 |
| Set bit i | `x \| (1 << i)` | OR with a single 1 |
| Clear bit i | `x & ~(1 << i)` | AND with all 1s except bit i |
| Toggle bit i | `x ^ (1 << i)` | XOR flips one bit |
| Clear the lowest set bit | `x & (x - 1)` | x − 1 flips the lowest 1 and every 0 below it |
| Power of two? | `x > 0 && (x & (x - 1)) == 0` | a power of two has exactly one 1 |
| Keep only the lowest set bit | `x & -x` | −x = ~x + 1, which keeps only the lowest 1 |
| Count set bits | `while (x != 0) { x &= x - 1; cnt++; }` or `BitOperations.PopCount((uint)x)` | the loop runs once per 1 bit |

Example: x = 12 = 1100. x − 1 = 1011. `x & (x - 1)` = 1000. `x & -x` = 0100.

### XOR cancellation

`a ^ a = 0`, `a ^ 0 = a`, and the order does not matter. So XOR over a list cancels every value that appears twice.
- **Single Number:** XOR everything; what is left is the single value. O(n) time, O(1) space.
- **Missing Number** (values 0..n): XOR all indexes 0..n and all values; what is left is the missing value.
- **Single Number III** (two singles a and b): XOR everything to get `x = a ^ b`. `x & -x` picks one bit where a and b differ. Split the numbers by that bit and XOR each group.

### Masks and subsets

For n items (n up to about 20), every integer from 0 to 2ⁿ − 1 is a subset: bit i set means item i is chosen.

```csharp
for (int mask = 0; mask < (1 << n); mask++)
{
    var subset = new List<int>();
    for (int i = 0; i < n; i++)
        if (((mask >> i) & 1) == 1) subset.Add(nums[i]);
}
```

This is O(n · 2ⁿ). A mask is also a common DP state; see [DP families](#add-dsa-dp-families).

### Two's complement in C#

- `int` is a 32-bit two's complement number, and `-x == ~x + 1`.
- The range is −2³¹ to 2³¹ − 1: there is one more negative value than positive. So `-int.MinValue` wraps back to `int.MinValue` (unchecked), and `Math.Abs(int.MinValue)` throws.
- A cast to `uint` keeps the same bits: for `int m = -1`, `(uint)m == uint.MaxValue`.
- Counting bits with `x >>= 1` on a negative int never ends, because `>>` keeps the sign bit. Use `>>>` or cast to `uint`.

### GCD and LCM

```csharp
long Gcd(long a, long b) { while (b != 0) (a, b) = (b, a % b); return Math.Abs(a); }
long Lcm(long a, long b) => a / Gcd(a, b) * b;      // divide first to reduce overflow; handle 0 separately
```

Euclid's rule: gcd(a, b) = gcd(b, a mod b). It takes O(log min(a, b)) steps.

### Sieve of Eratosthenes

```csharp
var composite = new bool[n + 1];
for (int i = 2; i <= n / i; i++)                    // i * i <= n, written without overflow
    if (!composite[i])
        for (int j = i * i; j <= n; j += i) composite[j] = true;
// The primes are every i in 2..n with !composite[i].
```

Start at i · i, because smaller multiples were already crossed out by smaller primes. O(n log log n) time, O(n) space.

### Fast power (binary exponentiation)

```csharp
long ModPow(long b, long e, long m)
{
    long result = 1;
    b = ((b % m) + m) % m;                           // also handles a negative base
    while (e > 0)
    {
        if ((e & 1) == 1) result = result * b % m;  // this bit of e is set
        b = b * b % m;                               // b^(2^k)
        e >>= 1;
    }
    return result;
}
```

O(log e) multiplications. Each product is below m². For m = 1,000,000,007, m² is about 10¹⁸, which is below `long.MaxValue` (about 9.22 × 10¹⁸), so `long` is safe. For a larger m, use `BigInteger.ModPow` or `UInt128` (.NET 7+).

### Modulo arithmetic and overflow

- (a + b) mod m = ((a mod m) + (b mod m)) mod m. The same holds for ×. Reduce after every step.
- Subtraction: `((a - b) % m + m) % m`, because C# `%` keeps the sign of the left side (`-7 % 3 == -1`).
- Division is not direct. If m is prime, a / b mod m = a · b^(m−2) mod m (Fermat's little theorem; overview only).
- Overflow checklist: a sum of many ints → `long`; a product of two ints → cast to `long` first; "infinity + x" → `long` or a smaller infinity; midpoint → `lo + (hi - lo) / 2`.

**Common bugs.**
- `1 << i` for i ≥ 31: use `1L << i`.
- Precedence: `x & 1 == 0` does not compile in C# (it means `x & (1 == 0)`). Write `(x & 1) == 0`.
- A negative `%` result used as an array index.
- A bit-count loop with `>>` on a negative number never ends.

**Classic problems.** Single Number; Counting Bits; Power of Two; Count Primes.

<a id="add-dsa-trees"></a>

## ➕ Trees: traversals, return values, state, construction

Part 3 (#9 Tree DFS and #10 Tree BFS) gives the one-line summary. This section adds the code and the reasons behind it.

### Node model

A binary tree node holds a value and two child references. A `null` child means "no child here". Every tree function handles `null` first.

```csharp
public class TreeNode
{
    public int val;
    public TreeNode? left, right;
    public TreeNode(int val = 0, TreeNode? left = null, TreeNode? right = null)
    { this.val = val; this.left = left; this.right = right; }
}
```

Height `h` is the length of the longest root-to-leaf path. In a balanced tree, `h` is about `log n`. In a skewed tree (every node has one child, like a linked list), `h = n`.

### Traversal orders

| Order | Visit order | Typical use |
|---|---|---|
| Pre-order | node, left, right | Copy or serialize a tree; pass state down |
| In-order | left, node, right | A BST gives sorted order; Kth Smallest |
| Post-order | left, right, node | Compute a value from the children (height, diameter) |
| Level-order | one level at a time | Levels, views, minimum depth |

Recursive form. Only the position of the "visit" line changes.

```csharp
void InOrder(TreeNode? n, List<int> res)
{
    if (n == null) return;
    InOrder(n.left, res);
    res.Add(n.val);            // pre-order: put this line first; post-order: put it last
    InOrder(n.right, res);
}
```

Iterative forms. Interviewers ask for these to check that you understand the call stack.

```csharp
List<int> PreOrderIter(TreeNode? root)
{
    var res = new List<int>(); if (root == null) return res;
    var st = new Stack<TreeNode>(); st.Push(root);
    while (st.Count > 0)
    {
        var n = st.Pop(); res.Add(n.val);
        if (n.right != null) st.Push(n.right);   // push right first, so left pops first
        if (n.left != null) st.Push(n.left);
    }
    return res;
}

List<int> InOrderIter(TreeNode? root)
{
    var res = new List<int>(); var st = new Stack<TreeNode>(); var cur = root;
    while (cur != null || st.Count > 0)
    {
        while (cur != null) { st.Push(cur); cur = cur.left; }   // go left as far as possible
        cur = st.Pop(); res.Add(cur.val);                        // visit
        cur = cur.right;                                         // then the right subtree
    }
    return res;
}

List<int> PostOrderIter(TreeNode? root)
{
    var res = new List<int>(); if (root == null) return res;
    var st = new Stack<TreeNode>(); st.Push(root);
    while (st.Count > 0)
    {
        var n = st.Pop(); res.Add(n.val);        // produces node, right, left
        if (n.left != null) st.Push(n.left);
        if (n.right != null) st.Push(n.right);
    }
    res.Reverse();                               // now left, right, node
    return res;
}
```

Why iterative in-order is correct: the stack holds the nodes whose left subtree is still in progress. A node is popped (visited) only after its whole left subtree is finished.

### BFS by levels

```csharp
List<List<int>> LevelOrder(TreeNode? root)
{
    var res = new List<List<int>>(); if (root == null) return res;
    var q = new Queue<TreeNode>(); q.Enqueue(root);
    while (q.Count > 0)
    {
        int size = q.Count;                      // freeze the level size first
        var level = new List<int>(size);
        for (int i = 0; i < size; i++)
        {
            var n = q.Dequeue(); level.Add(n.val);
            if (n.left != null) q.Enqueue(n.left);
            if (n.right != null) q.Enqueue(n.right);
        }
        res.Add(level);
    }
    return res;
}
```

The bug to avoid: `for (int i = 0; i < q.Count; i++)`. The count changes inside the loop, so levels mix.

### Return values up the tree (post-order)

Idea: each call returns one fact about its own subtree. The parent combines the facts from its two children. When the best answer can "bend" at a node, keep it in a field (`best`).

```csharp
int best;                                   // reset before each test case

// Height, and diameter as a side effect (diameter counted in edges).
int Height(TreeNode? n)
{
    if (n == null) return 0;
    int l = Height(n.left), r = Height(n.right);
    best = Math.Max(best, l + r);            // longest path that bends at n
    return 1 + Math.Max(l, r);               // the parent can extend only one side
}

// Balanced check in O(n): return the height, or -1 for "not balanced".
int Check(TreeNode? n)
{
    if (n == null) return 0;
    int l = Check(n.left);  if (l < 0) return -1;
    int r = Check(n.right); if (r < 0) return -1;
    return Math.Abs(l - r) > 1 ? -1 : 1 + Math.Max(l, r);
}

// Binary Tree Maximum Path Sum. Set best = int.MinValue first.
int Gain(TreeNode? n)
{
    if (n == null) return 0;
    int l = Math.Max(0, Gain(n.left));       // a negative branch is dropped
    int r = Math.Max(0, Gain(n.right));
    best = Math.Max(best, n.val + l + r);    // path that bends here
    return n.val + Math.Max(l, r);           // path that continues upward
}
```

The rule to remember: the **return value** is a path that can still go up, so it uses one side only. The **global best** is a path that bends at this node, so it can use both sides. Mixing these two is the most common bug.

Why Balanced uses the -1 trick: calling a separate `Height()` at every node costs O(n) per node, so O(n²) on a skewed tree. Returning height and validity together is O(n).

### Passing state down (pre-order)

Idea: the parent gives the child some information (remaining sum, allowed range). The child uses it and passes an updated copy further down.

```csharp
bool HasPathSum(TreeNode? n, int remaining)
{
    if (n == null) return false;
    remaining -= n.val;
    if (n.left == null && n.right == null) return remaining == 0;   // check only at a leaf
    return HasPathSum(n.left, remaining) || HasPathSum(n.right, remaining);
}

// Validate BST. Call: IsValid(root, long.MinValue, long.MaxValue)
bool IsValid(TreeNode? n, long lo, long hi)
{
    if (n == null) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return IsValid(n.left, lo, n.val) && IsValid(n.right, n.val, hi);
}
```

Tiny failure case for the parent-only check: root 5, its left child 3, and 3's right child 6. Each parent-child pair looks fine, but 6 sits in the left subtree of 5. The range check catches it, because the range for that node is (3, 5).

Why `long` bounds: a node can hold `int.MinValue` or `int.MaxValue`. With `int` bounds, a valid tree is rejected. Nullable bounds (`int? lo, int? hi`) also work.

### Lowest common ancestor (LCA)

```csharp
// Any binary tree. Assumes p and q both exist in the tree. O(n).
TreeNode? Lca(TreeNode? n, TreeNode p, TreeNode q)
{
    if (n == null || n == p || n == q) return n;
    var l = Lca(n.left, p, q);
    var r = Lca(n.right, p, q);
    if (l != null && r != null) return n;    // p and q are on different sides
    return l ?? r;
}

// BST: use the ordering. O(h), no recursion needed.
TreeNode LcaBst(TreeNode root, TreeNode p, TreeNode q)
{
    var cur = root;
    while (true)
    {
        if (p.val < cur.val && q.val < cur.val) cur = cur.left!;
        else if (p.val > cur.val && q.val > cur.val) cur = cur.right!;
        else return cur;                      // the paths split here
    }
}
```

The binary-tree version must search both sides, because it knows nothing about where values are. The BST version follows one path. If the problem does not promise that both nodes exist, count how many of `p` and `q` you actually found before you trust the answer.

### Build from preorder + inorder

Idea: `preorder[0]` is the root. Its position in `inorder` splits the left subtree from the right subtree. A dictionary gives that position in O(1).

```csharp
int pre;
Dictionary<int, int> pos = new();

TreeNode? BuildTree(int[] preorder, int[] inorder)
{
    pre = 0; pos.Clear();
    for (int i = 0; i < inorder.Length; i++) pos[inorder[i]] = i;
    return Build(preorder, 0, inorder.Length - 1);
}

TreeNode? Build(int[] preorder, int lo, int hi)     // inorder range [lo, hi]
{
    if (lo > hi) return null;
    var root = new TreeNode(preorder[pre++]);
    int mid = pos[root.val];
    root.left = Build(preorder, lo, mid - 1);        // left first: preorder is node, left, right
    root.right = Build(preorder, mid + 1, hi);
    return root;
}
```

Bugs: building the right subtree before the left one; duplicate values (the map breaks, so the problem must promise unique values). For postorder + inorder, read the postorder from the end and build right before left.

### Serialize and deserialize

Idea: write a preorder walk with a marker (`#`) for every null child. The markers make the shape unique. Without them, one preorder list can match many trees.

```csharp
string Serialize(TreeNode? root)
{
    var sb = new System.Text.StringBuilder();
    void Go(TreeNode? n)
    {
        if (n == null) { sb.Append("#,"); return; }
        sb.Append(n.val).Append(',');
        Go(n.left); Go(n.right);
    }
    Go(root);
    return sb.ToString();
}

TreeNode? Deserialize(string data)
{
    var q = new Queue<string>(data.Split(',', StringSplitOptions.RemoveEmptyEntries));
    TreeNode? Go()
    {
        string s = q.Dequeue();
        if (s == "#") return null;
        var n = new TreeNode(int.Parse(s));
        n.left = Go(); n.right = Go();
        return n;
    }
    return Go();
}
```

A level-order format (like LeetCode's display) also works. Pick one and explain the format first.

### Views

- **Right view**: in level-order BFS, take the last node of each level (`i == size - 1`).
- **Left view**: take the first node of each level (`i == 0`).
- **Top and bottom view**: give each node a horizontal distance `hd`. The root is 0, a left child is `hd - 1`, a right child is `hd + 1`. Top view keeps the **first** node seen at each `hd`. Bottom view keeps the **last** one.

```csharp
List<int> TopView(TreeNode? root)
{
    var res = new List<int>(); if (root == null) return res;
    var first = new Dictionary<int, int>();
    var q = new Queue<(TreeNode node, int hd)>(); q.Enqueue((root, 0));
    int minHd = 0, maxHd = 0;
    while (q.Count > 0)
    {
        var (n, hd) = q.Dequeue();
        first.TryAdd(hd, n.val);                 // bottom view: first[hd] = n.val;
        minHd = Math.Min(minHd, hd); maxHd = Math.Max(maxHd, hd);
        if (n.left != null) q.Enqueue((n.left, hd - 1));
        if (n.right != null) q.Enqueue((n.right, hd + 1));
    }
    for (int h = minHd; h <= maxHd; h++) res.Add(first[h]);
    return res;
}
```

Use BFS here, not plain DFS. DFS can reach a deep node at some `hd` before a shallow node at the same `hd`, so "first seen" would be wrong.

### Recursion depth on skewed trees

Recursive DFS uses O(h) stack. On a skewed tree with 100,000 nodes, `h` is 100,000. The default stack is small (about 1 MB for the main thread on Windows). In .NET a `StackOverflowException` cannot be caught. The process ends.

Fixes:
1. Write the traversal with an explicit `Stack<T>` (see above).
2. Run the work on a thread with a larger stack: `var t = new Thread(() => Solve(), 256 * 1024 * 1024); t.Start(); t.Join();`

In an interview, saying "recursion is fine for a balanced tree, but for a skewed tree of 10^5 nodes I would use an explicit stack" shows experience.

### Summary

- **Recognise**: "path", "depth", "subtree", "ancestor", "level", "view", "serialize", "BST".
- **Complexity**: O(n) time for every traversal. Space O(h) for DFS, O(w) for BFS (w = widest level).
- **Common bugs**: no `null` base case; a field like `best` not reset between test cases; diameter in nodes instead of edges; path-sum check at a non-leaf node; `int` bounds in BST validation; O(n²) Balanced check.
- **Classic problems**: Binary Tree Maximum Path Sum; Serialize and Deserialize Binary Tree; Lowest Common Ancestor of a Binary Tree; Binary Tree Right Side View; Construct Binary Tree from Preorder and Inorder Traversal.

---

<a id="add-dsa-heaps"></a>

## ➕ Heaps and C# PriorityQueue

Part 3 #7 gives the summary and the "min-heap for top-K largest" rule. This section adds the mechanism and C# code.

### Heap invariant and array layout

A **min-heap** is a complete binary tree where every parent is less than or equal to its children. So the minimum is always at the root. Nothing is promised about the order between siblings. That is why a heap is cheaper than a full sort.

The tree is stored in an array with no pointers. For index `i`: parent `(i - 1) / 2`, children `2i + 1` and `2i + 2`.

- **Push**: add at the end, then **sift up** (swap with the parent while smaller). O(log n).
- **Pop**: move the last item to the root, then **sift down** (swap with the smaller child while larger). O(log n).

```csharp
void SiftDown(int[] a, int i, int n)
{
    while (true)
    {
        int s = i, l = 2 * i + 1, r = l + 1;
        if (l < n && a[l] < a[s]) s = l;
        if (r < n && a[r] < a[s]) s = r;
        if (s == i) return;
        (a[i], a[s]) = (a[s], a[i]);
        i = s;
    }
}

void Heapify(int[] a)                        // O(n)
{
    for (int i = a.Length / 2 - 1; i >= 0; i--) SiftDown(a, i, a.Length);
}
```

### Why heapify is O(n), not O(n log n)

A node can sift down only as far as its height. Half of the nodes are leaves (height 0, no work). A quarter have height 1. An eighth have height 2. The total work is n/4·1 + n/8·2 + n/16·3 + … which is less than n. Inserting items one by one is different: each insert can sift up the full height, so it costs O(n log n).

### C# `PriorityQueue<TElement, TPriority>`

```csharp
var pq = new PriorityQueue<string, int>();          // MIN-heap on priority
pq.Enqueue("email", 5);
pq.Enqueue("deploy", 1);
string next = pq.Dequeue();                         // "deploy" (smallest priority)
if (pq.TryPeek(out var item, out int prio)) { /* look without removing */ }
while (pq.TryDequeue(out var e, out int p)) { /* drain safely */ }

// Max-heap: reverse the comparer.
var maxPq = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));

// Build from existing data in O(n) (the constructor heapifies).
int[] nums = { 5, 1, 9 };
var built = new PriorityQueue<int, int>(nums.Select(x => (x, x)));
```

Facts to remember:
- It is a **min-heap** by default.
- **Not stable.** Two items with equal priority come out in no fixed order. If order matters, use a tuple priority such as `(cost, insertIndex)`.
- **No decrease-key.** You cannot lower the priority of an item already inside. Newer .NET versions (9 and later) have a `Remove` method, but it scans the heap in O(n). The standard solution is **lazy deletion**: push a new entry with the better priority, and when you pop an entry that is out of date, skip it. The Dijkstra code in the shortest-paths section shows this.
- `UnorderedItems` is **not** sorted. Do not iterate it expecting priority order.
- `Peek()` and `Dequeue()` on an empty queue throw `InvalidOperationException`. Use `TryPeek` / `TryDequeue`.
- Max-heap by negation (`Enqueue(x, -x)`) works, but `-int.MinValue` overflows. The comparer is safer.

### Top-K with a size-k min-heap

```csharp
int FindKthLargest(int[] nums, int k)
{
    var pq = new PriorityQueue<int, int>();
    foreach (int x in nums)
    {
        pq.Enqueue(x, x);
        if (pq.Count > k) pq.Dequeue();          // remove the smallest of the k + 1
    }
    return pq.Peek();                            // smallest of the k largest
}
```

Why a **min**-heap for the K **largest**: the heap holds the best k items seen so far. To decide if a new item belongs, compare it with the **weakest** member, and the weakest of the "large" items is the smallest. A min-heap keeps exactly that item at the root, so eviction is O(log k). Cost: O(n log k) time, O(k) memory, and it works on a stream. A max-heap of all n items also works, but it needs O(n) memory and cannot handle an endless stream.

### K-way merge

Idea: keep one "current head" from each of the k sorted lists in a min-heap. Pop the smallest, output it, push the next item from the same list.

```csharp
public class ListNode { public int val; public ListNode? next; public ListNode(int v = 0) { val = v; } }

ListNode? MergeKLists(ListNode?[] lists)
{
    var pq = new PriorityQueue<ListNode, int>();
    foreach (var h in lists) if (h != null) pq.Enqueue(h, h.val);
    var dummy = new ListNode(); var tail = dummy;
    while (pq.TryDequeue(out var node, out _))
    {
        tail.next = node; tail = node;
        if (node.next != null) pq.Enqueue(node.next, node.next.val);
    }
    return dummy.next;
}
```

Invariant: the heap holds the smallest unused item of every non-empty list, so its root is the smallest unused item overall. Cost: O(N log k), where N is the total number of items.

### Two heaps for a running median

Keep the smaller half in a **max-heap** (`low`) and the larger half in a **min-heap** (`high`).

Invariant: every item in `low` ≤ every item in `high`, and `low.Count` is equal to `high.Count` or one more.

```csharp
class MedianFinder
{
    readonly PriorityQueue<int, int> low = new(Comparer<int>.Create((a, b) => b.CompareTo(a)));
    readonly PriorityQueue<int, int> high = new();

    public void AddNum(int x)
    {
        low.Enqueue(x, x);
        int m = low.Dequeue(); high.Enqueue(m, m);        // largest of low moves to high
        if (high.Count > low.Count) { int h = high.Dequeue(); low.Enqueue(h, h); }
    }

    public double FindMedian() =>
        low.Count > high.Count ? low.Peek() : (low.Peek() + (double)high.Peek()) / 2.0;
}
```

AddNum is O(log n). FindMedian is O(1). The `(double)` cast avoids `int` overflow when adding two large values.

### Scheduling (Task Scheduler)

Idea: at each time step, run the available task with the **most** copies left (greedy). A task that just ran waits in a cooldown queue until it may run again.

```csharp
int LeastInterval(char[] tasks, int n)
{
    var cnt = new int[26];
    foreach (char t in tasks) cnt[t - 'A']++;
    var pq = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
    foreach (int c in cnt) if (c > 0) pq.Enqueue(c, c);
    var wait = new Queue<(int left, int readyAt)>();
    int time = 0;
    while (pq.Count > 0 || wait.Count > 0)
    {
        time++;
        if (pq.Count > 0)
        {
            int left = pq.Dequeue() - 1;
            if (left > 0) wait.Enqueue((left, time + n));
        }
        if (wait.Count > 0 && wait.Peek().readyAt == time)
        {
            var w = wait.Dequeue(); pq.Enqueue(w.left, w.left);
        }
    }
    return time;
}
```

Why the most frequent first: the task with the most copies is the one that can force idle time at the end. Running it early spreads its copies out. (There is also an O(n) formula: `max(tasks.Length, (maxCount - 1) * (n + 1) + numberOfTasksWithMaxCount)`.)

### Heap vs sort vs quickselect

| | Size-k heap | Full sort | Quickselect |
|---|---|---|---|
| Time | O(n log k) | O(n log n) | O(n) average, O(n²) worst |
| Extra memory | O(k) | Small (`Array.Sort` is an in-place introsort) | O(1), but it reorders the input |
| Works on a stream | Yes | No | No |
| Output sorted | No (pop k times for sorted order) | Yes | No |
| Choose it when | k is small, or data arrives over time | You need everything in order | One-off, in memory, average case is acceptable |

### Summary

- **Recognise**: "K largest / smallest / closest / most frequent", "stream", "median", "merge K sorted", "next task by priority", "always take the cheapest so far".
- **Common bugs**: max-heap for K largest; forgetting the default is a min-heap; trusting `UnorderedItems` order; `Peek()` on empty; equal priorities assumed stable; negating `int.MinValue`; forgetting to skip stale entries.
- **Classic problems**: Kth Largest Element in an Array; Top K Frequent Elements; Merge K Sorted Lists; Find Median from Data Stream; Task Scheduler.

---

<a id="add-dsa-graphs"></a>

## ➕ Graphs: representation, traversal, cycles, topological sort, DSU

Part 3 (#11 Graph BFS and DFS, #12 Topological sort, #13 Union-Find) gives the summary. This section adds the templates.

### Representation

| | Adjacency list | Adjacency matrix |
|---|---|---|
| Memory | O(V + E) | O(V²) |
| "Is there an edge u–v?" | O(degree of u) | O(1) |
| Visit all neighbours of u | O(degree of u) | O(V) |
| Use when | Most problems (sparse graphs) | Dense graphs, small V, Floyd–Warshall |

- **Undirected**: add the edge in both directions.
- **Directed**: add it only from `u` to `v`.
- **Weighted**: store `(to, weight)` pairs.

```csharp
List<int>[] Build(int n, int[][] edges, bool directed)
{
    var g = new List<int>[n];
    for (int i = 0; i < n; i++) g[i] = new List<int>();
    foreach (var e in edges)
    {
        g[e[0]].Add(e[1]);
        if (!directed) g[e[1]].Add(e[0]);
    }
    return g;
}
// Weighted: var g = new List<(int to, int w)>[n];  g[u].Add((v, w));
// Labels that are strings: var g = new Dictionary<string, List<string>>();
```

### BFS (mark visited on enqueue)

```csharp
int[] BfsDist(List<int>[] g, int src)
{
    var dist = new int[g.Length]; Array.Fill(dist, -1);    // -1 = not visited
    var q = new Queue<int>();
    q.Enqueue(src); dist[src] = 0;                          // mark when you enqueue
    while (q.Count > 0)
    {
        int u = q.Dequeue();
        foreach (int v in g[u])
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.Enqueue(v); }
    }
    return dist;
}
```

Why on enqueue: if you mark on dequeue, the same node can be added to the queue by many neighbours before it is processed.

### DFS (recursive and iterative)

```csharp
void Dfs(List<int>[] g, int u, bool[] seen)
{
    seen[u] = true;
    foreach (int v in g[u]) if (!seen[v]) Dfs(g, v, seen);
}

void DfsIter(List<int>[] g, int s, bool[] seen)
{
    var st = new Stack<int>(); st.Push(s);
    while (st.Count > 0)
    {
        int u = st.Pop();
        if (seen[u]) continue;            // a node can be pushed twice; skip it on pop
        seen[u] = true;
        foreach (int v in g[u]) if (!seen[v]) st.Push(v);
    }
}
```

The iterative version visits nodes in a different order from the recursive one. That is fine for reachability and components. It is **not** fine for post-order uses (topological sort, Tarjan), where you need the recursive order or a more careful iterative version.

### Grids as graphs

Each cell is a node. Its neighbours are the 4 (or 8) cells around it. Check bounds **before** you read the cell.

```csharp
static readonly int[] DR = { -1, 1, 0, 0 }, DC = { 0, 0, -1, 1 };
// 8 directions: add (-1,-1), (-1,1), (1,-1), (1,1).

int NumIslands(char[][] grid)
{
    int rows = grid.Length, cols = grid[0].Length, count = 0;
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
        {
            if (grid[r][c] != '1') continue;
            count++;                                    // a new component starts here
            var q = new Queue<(int r, int c)>();
            q.Enqueue((r, c)); grid[r][c] = '0';        // mark on enqueue
            while (q.Count > 0)
            {
                var (cr, cc) = q.Dequeue();
                for (int d = 0; d < 4; d++)
                {
                    int nr = cr + DR[d], nc = cc + DC[d];
                    if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] != '1') continue;
                    grid[nr][nc] = '0'; q.Enqueue((nr, nc));
                }
            }
        }
    return count;
}
```

This changes the input. Ask the interviewer if that is allowed. If not, use a `bool[rows, cols] visited`. On large grids, prefer BFS: a 1000 × 1000 grid can make recursive DFS one million calls deep.

### Connected components

Loop over every node. If it is not visited, start a BFS/DFS from it and add 1 to the count. The outer loop is what handles a disconnected graph.

### Cycle detection

**Undirected, DFS with parent.** Seeing a visited neighbour that is not the node you came from means a cycle.

```csharp
bool HasCycleUndirected(List<int>[] g, int u, int parent, bool[] seen)
{
    seen[u] = true;
    foreach (int v in g[u])
    {
        if (!seen[v]) { if (HasCycleUndirected(g, v, u, seen)) return true; }
        else if (v != parent) return true;
    }
    return false;
}
```

The parent trick fails if the graph can have two parallel edges between the same pair. Then track the edge id instead of the parent node.

**Undirected, DSU.** For each edge `(a, b)`: if `Find(a) == Find(b)` already, this edge closes a cycle. (This is Redundant Connection.)

**Directed, three colours.** 0 = white (not visited), 1 = grey (on the current DFS path), 2 = black (finished).

```csharp
bool HasCycleDirected(List<int>[] g, int u, int[] color)
{
    color[u] = 1;
    foreach (int v in g[u])
    {
        if (color[v] == 1) return true;                       // back edge to the current path
        if (color[v] == 0 && HasCycleDirected(g, v, color)) return true;
    }
    color[u] = 2;
    return false;
}
```

Why a plain `visited` flag is not enough in a directed graph: edges A→B, A→C, C→B. B is visited from A first. Later C reaches B again. B is visited, but there is no cycle. Only a grey node (still on the path) means a cycle.

### Topological sort: Kahn's algorithm

```csharp
List<int>? TopoKahn(int n, List<int>[] g)
{
    var indeg = new int[n];
    for (int u = 0; u < n; u++) foreach (int v in g[u]) indeg[v]++;
    var q = new Queue<int>();
    for (int u = 0; u < n; u++) if (indeg[u] == 0) q.Enqueue(u);
    var order = new List<int>(n);
    while (q.Count > 0)
    {
        int u = q.Dequeue(); order.Add(u);
        foreach (int v in g[u]) if (--indeg[v] == 0) q.Enqueue(v);
    }
    return order.Count == n ? order : null;                    // null = there is a cycle
}
```

For the smallest order in dictionary sense, replace the queue with a min-heap.

### Topological sort: DFS post-order

```csharp
// Call for every white node. If all return true, reverse 'post' to get the order.
bool TopoDfs(List<int>[] g, int u, int[] color, List<int> post)
{
    color[u] = 1;
    foreach (int v in g[u])
    {
        if (color[v] == 1) return false;                       // cycle
        if (color[v] == 0 && !TopoDfs(g, v, color, post)) return false;
    }
    color[u] = 2;
    post.Add(u);                                               // add after all its children
    return true;
}
```

Why reversed post-order works: a node finishes only after every node reachable from it has finished. So in the reversed list, it appears before all of them.

The direction trap: in Course Schedule, `[a, b]` means "to take a you must first take b". The edge is `b → a`. Drawing it backwards gives a reversed order.

### Disjoint Set Union (DSU)

```csharp
class Dsu
{
    readonly int[] parent, size;
    public int Components { get; private set; }

    public Dsu(int n)
    {
        parent = new int[n]; size = new int[n]; Components = n;
        for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    }

    public int Find(int x) => parent[x] == x ? x : parent[x] = Find(parent[x]);   // path compression

    public bool Union(int a, int b)
    {
        int ra = Find(a), rb = Find(b);
        if (ra == rb) return false;                    // already in the same set
        if (size[ra] < size[rb]) (ra, rb) = (rb, ra);   // union by size: small tree under big tree
        parent[rb] = ra; size[ra] += size[rb];
        Components--;
        return true;
    }
}
```

Cost per operation (this matches the correction box under Part 3 #13):

| Optimisations used | Cost per operation |
|---|---|
| None | O(n) worst case (the tree can become a chain) |
| Union by rank/size only | O(log n) worst case (tree height stays ≤ log n) |
| Path compression only | O(log n) amortised |
| Both | O(α(n)) amortised. α is the inverse Ackermann function; it is at most 4 for any input you will ever see |

Union by size also keeps the tree height at most log n, so the recursive `Find` cannot go very deep.

### Multi-source BFS

Put **all** sources in the queue at distance 0 before the loop starts. Then run normal BFS. Each cell gets the distance to its **nearest** source. It works because it is the same as one imaginary super-source connected to every real source with a 0-length edge.

Examples: Rotting Oranges (all rotten oranges start together), 01 Matrix (all zeros start), Walls and Gates (all gates start).

The bug: running a separate BFS from each source. That is O(k · V) instead of O(V).

### Bipartite check

A graph is bipartite if you can colour every node with one of two colours so that every edge joins different colours. This is true exactly when the graph has no odd-length cycle.

```csharp
bool IsBipartite(int[][] graph)
{
    int n = graph.Length; var color = new int[n];          // 0 = none, 1 or -1
    for (int s = 0; s < n; s++)                              // every component
    {
        if (color[s] != 0) continue;
        color[s] = 1;
        var q = new Queue<int>(); q.Enqueue(s);
        while (q.Count > 0)
        {
            int u = q.Dequeue();
            foreach (int v in graph[u])
            {
                if (color[v] == 0) { color[v] = -color[u]; q.Enqueue(v); }
                else if (color[v] == color[u]) return false;
            }
        }
    }
    return true;
}
```

### Summary

- **Recognise**: "connected", "reachable", "islands", "network", "prerequisites", "groups", "friends of friends", "two teams", a grid with moves.
- **Complexity**: BFS/DFS/topological sort O(V + E). Grid O(rows × cols). DSU O(α(n)) per operation.
- **Common bugs**: marking visited on dequeue; missing the outer loop for disconnected graphs; wrong edge direction; reading a grid cell before the bounds check; using `List.Contains` as a visited set (O(n) each); deep recursion on large grids; using undirected cycle logic on a directed graph.
- **Classic problems**: Number of Islands; Course Schedule II; Redundant Connection; Rotting Oranges; Is Graph Bipartite?

---

<a id="add-dsa-shortest-paths"></a>

## ➕ Shortest paths: BFS, 0-1 BFS, Dijkstra, Bellman-Ford, Floyd–Warshall

### Plain BFS (unweighted)

If every edge has the same cost, BFS from the graph section already gives shortest distances. Nodes come out of the queue in order of distance, so the first time you reach a node is the shortest way.

### 0-1 BFS

Use it when every weight is 0 or 1. Use a double-ended queue. A 0-edge goes to the **front** (same distance). A 1-edge goes to the **back** (distance + 1). .NET has no built-in deque, so `LinkedList<T>` is used here.

```csharp
int[] ZeroOneBfs(List<(int to, int w)>[] g, int src)
{
    var dist = new int[g.Length]; Array.Fill(dist, int.MaxValue); dist[src] = 0;
    var dq = new LinkedList<int>(); dq.AddFirst(src);
    while (dq.Count > 0)
    {
        int u = dq.First!.Value; dq.RemoveFirst();
        foreach (var (v, w) in g[u])
        {
            if (dist[u] + w >= dist[v]) continue;
            dist[v] = dist[u] + w;
            if (w == 0) dq.AddFirst(v); else dq.AddLast(v);
        }
    }
    return dist;
}
```

Cost: O(V + E). Typical problem: a grid where following an arrow is free and changing it costs 1.

### Dijkstra (non-negative weights)

```csharp
int[] Dijkstra(List<(int to, int w)>[] g, int src)
{
    var dist = new int[g.Length]; Array.Fill(dist, int.MaxValue); dist[src] = 0;
    var pq = new PriorityQueue<int, int>(); pq.Enqueue(src, 0);
    while (pq.TryDequeue(out int u, out int d))
    {
        if (d > dist[u]) continue;                 // stale entry: a better one was already used
        foreach (var (v, w) in g[u])
        {
            int nd = d + w;
            if (nd < dist[v]) { dist[v] = nd; pq.Enqueue(v, nd); }   // push a duplicate, no decrease-key
        }
    }
    return dist;
}
```

**Finalise on pop.** When `u` is popped with `d == dist[u]`, its distance is final. Every other entry in the heap has priority ≥ `d`. Weights are ≥ 0, so any path through those entries is also ≥ `d`. Nothing can beat `d` later.

**Skip stale entries.** Because there is no decrease-key, a node may be in the heap several times. Only the entry that matches `dist[u]` is real. The `continue` line skips the others. Without it the answer is still correct, but the work grows.

**Why negative edges break it.** Edges: A→B (2), A→C (3), C→B (−2). Dijkstra pops B at distance 2 and calls it final. The true distance is 3 − 2 = 1. The textbook version (with a "done" set) returns 2, which is wrong. The lazy version above may re-open B and fix it, but then a node can be processed many times and the time bound is lost (it can become exponential). With a negative cycle it never finishes properly.

**Cost**: O((V + E) log V) with a binary heap.

Note: `nd = d + w` cannot overflow here, because only reached nodes (finite `d`) are popped. Never compute `int.MaxValue + w`.

### Bellman-Ford (negative edges, negative cycles)

Idea: relax every edge, V − 1 times. After round `i`, every shortest path that uses at most `i` edges is correct. A shortest simple path has at most V − 1 edges. If one more round still improves something, there is a negative cycle.

```csharp
// edges[i] = [u, v, w]. Returns null if a negative cycle is reachable from src.
long[]? BellmanFord(int n, int[][] edges, int src)
{
    var dist = new long[n]; Array.Fill(dist, long.MaxValue); dist[src] = 0;
    for (int round = 0; round < n - 1; round++)
    {
        bool changed = false;
        foreach (var e in edges)
            if (dist[e[0]] != long.MaxValue && dist[e[0]] + e[2] < dist[e[1]])
            { dist[e[1]] = dist[e[0]] + e[2]; changed = true; }
        if (!changed) break;                       // early exit
    }
    foreach (var e in edges)
        if (dist[e[0]] != long.MaxValue && dist[e[0]] + e[2] < dist[e[1]]) return null;
    return dist;
}
```

**"At most K edges" variant (Cheapest Flights Within K Stops).** K stops means at most K + 1 edges. Run K + 1 rounds. In each round, read from the **previous** round's array and write into a copy.

```csharp
int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k)
{
    var dist = new int[n]; Array.Fill(dist, int.MaxValue); dist[src] = 0;
    for (int i = 0; i <= k; i++)
    {
        var next = (int[])dist.Clone();
        foreach (var f in flights)
            if (dist[f[0]] != int.MaxValue && dist[f[0]] + f[2] < next[f[1]])
                next[f[1]] = dist[f[0]] + f[2];
        dist = next;
    }
    return dist[dst] == int.MaxValue ? -1 : dist[dst];
}
```

The bug: updating `dist` in place. Then one round can chain several edges, and the "at most K" limit breaks. Plain Dijkstra on this problem is also wrong, because the cheapest path may use too many stops. (Dijkstra over the state `(node, stopsUsed)` does work.)

**Cost**: O(V · E), or O(K · E) for the K-edges version.

### Floyd–Warshall (all pairs)

Idea: `d[i, j]` = shortest distance from i to j using only nodes `0..k` as middle points. Add one middle node `k` at a time. `k` must be the **outer** loop.

```csharp
const int INF = int.MaxValue / 2;
// Before the call: d[i, i] = 0, d[i, j] = weight of the edge, INF if no edge.
void FloydWarshall(int[,] d, int n)
{
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
        {
            if (d[i, k] == INF) continue;
            for (int j = 0; j < n; j++)
                if (d[k, j] != INF && d[i, k] + d[k, j] < d[i, j])
                    d[i, j] = d[i, k] + d[k, j];
        }
}
```

After it runs, `d[i, i] < 0` for some i means a negative cycle. Cost O(V³) time, O(V²) memory. Practical only for a few hundred nodes.

### Decision table

| Graph | Use | Time |
|---|---|---|
| All edges cost the same | BFS | O(V + E) |
| Weights are only 0 or 1 | 0-1 BFS | O(V + E) |
| A DAG (any weights, even negative) | Relax edges in topological order | O(V + E) |
| Non-negative weights, one source | Dijkstra | O((V + E) log V) |
| Negative edges, "at most K edges", or detect a negative cycle | Bellman-Ford | O(V · E) or O(K · E) |
| All pairs, V is small | Floyd–Warshall | O(V³) |

### Eulerian path with Hierholzer (Reconstruct Itinerary), overview

An **Eulerian path** uses every **edge** exactly once. In a directed graph it exists when all edges are in one connected piece, at most one node has (out − in) = 1 (the start), and at most one has (in − out) = 1 (the end). All other nodes have in = out.

Hierholzer: walk from the start and delete each edge as you use it. When a node has no unused edges left, add it to the route. Reverse the route at the end.

```csharp
IList<string> FindItinerary(IList<IList<string>> tickets)
{
    var g = new Dictionary<string, PriorityQueue<string, string>>();
    foreach (var t in tickets)
    {
        if (!g.TryGetValue(t[0], out var pq))
            g[t[0]] = pq = new PriorityQueue<string, string>(StringComparer.Ordinal);
        pq.Enqueue(t[1], t[1]);               // smallest destination first
    }
    var route = new List<string>();
    void Visit(string a)
    {
        while (g.TryGetValue(a, out var pq) && pq.Count > 0) Visit(pq.Dequeue());
        route.Add(a);                          // added when stuck (post-order)
    }
    Visit("JFK");
    route.Reverse();
    return route;
}
```

Why post-order: a greedy walk can get stuck early in a dead end. That dead end must be the **last** part of the route. Adding nodes only when stuck puts dead ends at the end of the reversed list. Cost: O(E log E).

Note `StringComparer.Ordinal`: the default string comparison in .NET is culture-sensitive. Use ordinal for "smallest in lexical order".

### Summary

- **Recognise**: "cheapest", "minimum time", "delay", "fewest steps", "within K stops", "every pair", "use every ticket once".
- **Common bugs**: BFS on weighted edges; Dijkstra with negative edges; no stale-entry check; `int.MaxValue + w` overflow; in-place updates in the K-stops version; `k` not the outer loop in Floyd–Warshall.
- **Classic problems**: Network Delay Time; Cheapest Flights Within K Stops; Path With Minimum Effort; Find the City With the Smallest Number of Neighbors at a Threshold Distance; Reconstruct Itinerary.

---

<a id="add-dsa-mst"></a>

## ➕ Minimum spanning tree: Kruskal and Prim

**Idea.** A spanning tree connects all V nodes with V − 1 edges and no cycle. A **minimum** spanning tree (MST) has the smallest total weight. It is not the same as a shortest-path tree: an MST minimises the total cable length, not the distance from one source.

**Cut property (why both algorithms are correct).** Split the nodes into any two groups. The cheapest edge that crosses between the groups belongs to some MST. If an MST did not use it, you could add it. That makes a cycle, and the cycle must cross the split again with an edge that costs the same or more. Remove that edge, and the total does not get worse. Kruskal and Prim only ever add a "cheapest crossing edge", so they never make a wrong choice.

### Kruskal (sort edges + DSU)

```csharp
// edges[i] = [u, v, w]. Uses the Dsu class from the graph section.
int Kruskal(int n, int[][] edges)
{
    Array.Sort(edges, (a, b) => a[2].CompareTo(b[2]));
    var dsu = new Dsu(n); int total = 0, used = 0;
    foreach (var e in edges)
        if (dsu.Union(e[0], e[1]))             // false = would make a cycle, skip it
        {
            total += e[2];
            if (++used == n - 1) break;
        }
    return used == n - 1 ? total : -1;          // -1 = the graph is not connected
}
```

Cost: O(E log E) for the sort. Best when you already have an edge list.

### Prim (heap)

```csharp
int Prim(List<(int to, int w)>[] g)
{
    int n = g.Length, total = 0, taken = 0;
    var inTree = new bool[n];
    var pq = new PriorityQueue<int, int>(); pq.Enqueue(0, 0);
    while (pq.TryDequeue(out int u, out int w))
    {
        if (inTree[u]) continue;                // stale entry
        inTree[u] = true; total += w; taken++;
        foreach (var (v, wv) in g[u]) if (!inTree[v]) pq.Enqueue(v, wv);
    }
    return taken == n ? total : -1;
}
```

Cost: O(E log V). For a **dense** graph (every pair of points is an edge, as in Min Cost to Connect All Points), a simple O(V²) Prim with an array of "cheapest edge into the tree" is better than building all V² edges.

### When used

"Connect all cities / points / computers at minimum total cost", clustering (stop Kruskal when k groups are left), and any problem that says "minimum cost to make everything connected".

- **Common bugs**: forgetting to check that the graph is connected; treating MST as shortest path; Prim without the `inTree` skip; building O(V²) edges and sorting them when O(V²) Prim is enough.
- **Classic problems**: Min Cost to Connect All Points; Connecting Cities With Minimum Cost; Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree.

---

<a id="add-dsa-scc"></a>

## ➕ Strongly connected components, bridges, articulation points (extension)

Extension: learn this after the core graph topics. It appears less often in general backend interviews.

**Idea.** In a directed graph, a **strongly connected component** (SCC) is a largest group of nodes where every node can reach every other node. If you shrink each SCC into one node, the result is always a DAG.

### Kosaraju (two passes)

1. DFS on the graph. Record nodes in the order they **finish**.
2. Build the reversed graph (flip every edge).
3. Take nodes from the latest finish to the earliest. Each DFS on the reversed graph from an unvisited node collects exactly one SCC.

Why: the node that finishes last is in a "source" SCC. In the reversed graph that SCC has no exit edges, so the DFS cannot leak into another SCC.

```csharp
List<List<int>> Kosaraju(List<int>[] g)
{
    int n = g.Length; var seen = new bool[n]; var order = new List<int>();
    void Dfs1(int u) { seen[u] = true; foreach (int v in g[u]) if (!seen[v]) Dfs1(v); order.Add(u); }
    for (int u = 0; u < n; u++) if (!seen[u]) Dfs1(u);

    var rg = new List<int>[n];
    for (int u = 0; u < n; u++) rg[u] = new List<int>();
    for (int u = 0; u < n; u++) foreach (int v in g[u]) rg[v].Add(u);

    Array.Fill(seen, false);
    var sccs = new List<List<int>>();
    void Dfs2(int u, List<int> comp) { seen[u] = true; comp.Add(u); foreach (int v in rg[u]) if (!seen[v]) Dfs2(v, comp); }
    for (int i = n - 1; i >= 0; i--)
    {
        int u = order[i];
        if (seen[u]) continue;
        var comp = new List<int>(); Dfs2(u, comp); sccs.Add(comp);
    }
    return sccs;
}
```

### Tarjan (one pass)

Each node gets `disc` (the time it was discovered) and `low` (the smallest `disc` it can reach through its subtree plus one back edge to a node still on the stack). If `low[u] == disc[u]`, then `u` is the root of an SCC: pop the stack down to `u`.

```csharp
List<List<int>> Tarjan(List<int>[] g)
{
    int n = g.Length, timer = 0;
    var disc = new int[n]; var low = new int[n]; var onStack = new bool[n];
    Array.Fill(disc, -1);
    var st = new Stack<int>(); var res = new List<List<int>>();
    void Dfs(int u)
    {
        disc[u] = low[u] = timer++; st.Push(u); onStack[u] = true;
        foreach (int v in g[u])
        {
            if (disc[v] == -1) { Dfs(v); low[u] = Math.Min(low[u], low[v]); }
            else if (onStack[v]) low[u] = Math.Min(low[u], disc[v]);
        }
        if (low[u] == disc[u])
        {
            var comp = new List<int>(); int x;
            do { x = st.Pop(); onStack[x] = false; comp.Add(x); } while (x != u);
            res.Add(comp);
        }
    }
    for (int u = 0; u < n; u++) if (disc[u] == -1) Dfs(u);
    return res;
}
```

### Bridges and articulation points (undirected), overview

- A **bridge** is an edge whose removal disconnects the graph. Tree edge `u → v` is a bridge when `low[v] > disc[u]`: nothing in v's subtree can reach u or above without this edge.
- An **articulation point** is a node whose removal disconnects the graph. A non-root `u` is one when some child `v` has `low[v] >= disc[u]`. The DFS root is one when it has two or more DFS children.

```csharp
IList<IList<int>> CriticalConnections(int n, IList<IList<int>> connections)
{
    var g = new List<int>[n];
    for (int i = 0; i < n; i++) g[i] = new List<int>();
    foreach (var c in connections) { g[c[0]].Add(c[1]); g[c[1]].Add(c[0]); }
    var disc = new int[n]; var low = new int[n]; Array.Fill(disc, -1);
    int timer = 0; var res = new List<IList<int>>();
    void Dfs(int u, int parent)
    {
        disc[u] = low[u] = timer++;
        foreach (int v in g[u])
        {
            if (v == parent) continue;                     // do not use the edge we came by
            if (disc[v] == -1)
            {
                Dfs(v, u);
                low[u] = Math.Min(low[u], low[v]);
                if (low[v] > disc[u]) res.Add(new List<int> { u, v });
            }
            else low[u] = Math.Min(low[u], disc[v]);
        }
    }
    Dfs(0, -1);                                            // the problem promises one connected graph
    return res;
}
```

- **Complexity**: O(V + E) for all of these.
- **Recognise**: "critical connection", "single point of failure", "groups where everyone reaches everyone", "condense cycles, then use the DAG".
- **Common bugs**: `>=` and `>` mixed up between articulation points and bridges; skipping by parent node when parallel edges exist (skip by edge id instead); deep recursion on large graphs (convert to iterative or use a bigger thread stack).
- **Classic problems**: Critical Connections in a Network; Strongly Connected Components (Kosaraju) as a textbook exercise; Articulation Points as a textbook exercise.

---

<a id="add-dsa-greedy"></a>

## ➕ Greedy: choice, proof, counterexample

**What greedy is.** At each step, take the choice that looks best right now, and never undo it. It is fast and simple. It is correct only when you can prove that the local best choice is part of some global best answer.

### The exchange argument

How to prove a greedy rule:
1. Take any optimal answer.
2. Look at the first place where it differs from the greedy answer.
3. Show you can swap its choice for the greedy choice and the answer does not get worse.
4. Repeat. The optimal answer becomes the greedy answer without losing value, so greedy is optimal.

Example, interval scheduling by end time: greedy picks the interval that ends first. Take an optimal set. Its first interval ends at time e, and greedy's first ends at time g ≤ e. Replace the optimal's first interval with greedy's. Everything after it starts at or after e ≥ g, so nothing new overlaps. The count is the same, so the greedy choice is safe.

### The counterexample habit

Before you code a greedy rule, spend one minute trying to break it with a tiny input.

Coin change with coins {1, 3, 4} and amount 6. Greedy takes the largest coin first: 4 + 1 + 1 = 3 coins. The best answer is 3 + 3 = 2 coins. Greedy fails, so this problem needs DP. (Greedy happens to work for some coin systems, such as {1, 2, 5, 10}, but that is a property of those coins, not a general rule.)

### Interval scheduling by end time

```csharp
// Maximum number of non-overlapping intervals.
// Non-overlapping Intervals asks for the minimum to remove: intervals.Length - result.
int MaxNonOverlapping(int[][] iv)
{
    Array.Sort(iv, (a, b) => a[1].CompareTo(b[1]));     // sort by END
    int count = 0; long lastEnd = long.MinValue;
    foreach (var x in iv)
        if (x[0] >= lastEnd) { count++; lastEnd = x[1]; } // touching ends do not overlap here
    return count;
}
```

Sorting by start fails: one long interval that starts first can block many short ones.

### Jump game: track the reach

```csharp
bool CanJump(int[] nums)
{
    int reach = 0;                                   // farthest index reachable so far
    for (int i = 0; i < nums.Length; i++)
    {
        if (i > reach) return false;                 // we cannot even stand on i
        reach = Math.Max(reach, i + nums[i]);
    }
    return true;
}

int MinJumps(int[] nums)                             // Jump Game II
{
    int jumps = 0, curEnd = 0, far = 0;
    for (int i = 0; i < nums.Length - 1; i++)
    {
        far = Math.Max(far, i + nums[i]);
        if (i == curEnd) { jumps++; curEnd = far; }  // this "level" is done; jump
    }
    return jumps;
}
```

Invariant: `reach` is the farthest index reachable using positions 0..i. Jump Game II is BFS by levels in disguise: `[start, curEnd]` is every index reachable with `jumps` jumps.

### Gas station

```csharp
int CanCompleteCircuit(int[] gas, int[] cost)
{
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.Length; i++)
    {
        int d = gas[i] - cost[i];
        total += d; tank += d;
        if (tank < 0) { start = i + 1; tank = 0; }   // no start in [start..i] can work
    }
    return total >= 0 ? start : -1;
}
```

Reason: if you start at `s` and run out at `i`, then any start between `s` and `i` also fails. You reached each of those stations with tank ≥ 0, so starting there with an empty tank is no better. So move the start to `i + 1`. If the total gas ≥ the total cost, a solution exists, and it is the last start you chose.

### Partition labels

```csharp
IList<int> PartitionLabels(string s)
{
    var last = new int[26];
    for (int i = 0; i < s.Length; i++) last[s[i] - 'a'] = i;
    var res = new List<int>(); int start = 0, end = 0;
    for (int i = 0; i < s.Length; i++)
    {
        end = Math.Max(end, last[s[i] - 'a']);       // this part must reach at least here
        if (i == end) { res.Add(end - start + 1); start = i + 1; }
    }
    return res;
}
```

Cut as early as possible: when `i` reaches the farthest last-occurrence of every letter seen so far, no letter in this part appears later.

### Summary

- **Recognise**: "maximum number of non-overlapping", "minimum number of jumps / arrows / rooms", sorting gives a natural order, a choice never needs undoing, n up to 10^5 so O(n²) DP is too slow.
- **Complexity**: usually O(n), or O(n log n) with the sort.
- **Common bugs**: no proof and no counterexample check; wrong sort key (start vs end); wrong rule for touching endpoints; using greedy where DP is needed.
- **Classic problems**: Non-overlapping Intervals; Jump Game II; Gas Station; Partition Labels; Minimum Number of Arrows to Burst Balloons.

---

<a id="add-dsa-dp-families"></a>

## ➕ Dynamic programming families

Part 3 #15 and Part 5 give the summary. This section gives one template per family. Learn the families in this order.

### Deriving DP from recursion

Do these five steps, in this order, every time. Write them as comments before any code.

1. **State sentence**: "dp[x] is the … for …". If you cannot finish it, stop.
2. **Transition**: how dp[x] is built from smaller states.
3. **Base case**: the smallest states, known directly.
4. **Order**: compute a state only after the states it needs.
5. **Answer**: which cell (or which max over cells) is the result.

Worked example, Coin Change (fewest coins):
- Brute force: `F(a) = 1 + min(F(a - c))` over every coin `c`. It recomputes `F(a)` many times.
- State: `dp[a]` is the fewest coins that make amount `a` exactly.
- Transition: `dp[a] = min(dp[a - c] + 1)` for each coin `c ≤ a`.
- Base: `dp[0] = 0`.
- Order: `a` from 1 up to `amount`.
- Answer: `dp[amount]`, or −1 if it is still "infinity".

```csharp
// Top-down (memo): the recursion plus a cache.
int CoinChangeMemo(int[] coins, int amount)
{
    var memo = new int?[amount + 1];                 // null = not computed yet
    int F(int a)
    {
        if (a == 0) return 0;
        if (memo[a] is int m) return m;
        int best = int.MaxValue;
        foreach (int c in coins)
            if (c <= a) { int sub = F(a - c); if (sub != int.MaxValue) best = Math.Min(best, sub + 1); }
        memo[a] = best;
        return best;
    }
    int r = F(amount);
    return r == int.MaxValue ? -1 : r;
}

// Bottom-up (tabulation): the same states in a loop.
int CoinChange(int[] coins, int amount)
{
    var dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);                      // safe "infinity": larger than any real answer
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        foreach (int c in coins)
            if (c <= a) dp[a] = Math.Min(dp[a], dp[a - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}
```

### Memo vs tabulation; space compression

- **Memo** follows the recursion. It is easier to derive and only computes the states it reaches. Its risk is recursion depth (memo with n = 10^5 can overflow the stack).
- **Tabulation** needs you to choose the loop order. It has no recursion and allows space compression.
- **Space compression**: if row `i` only needs row `i - 1`, keep one or two rows. If `dp[i]` only needs `dp[i-1]` and `dp[i-2]`, keep two variables.
- Cost of compression: you lose the full table, so you cannot rebuild the actual path or choices. If the problem asks for the items, keep the full table.
- Use `int?[]` (or −1 when −1 is impossible) for memo. Using 0 as "not computed" fails when 0 is a real answer.

### 1D DP

- Climbing Stairs: `dp[i]` is the number of ways to reach step i. `dp[i] = dp[i-1] + dp[i-2]`, `dp[0] = dp[1] = 1`.
- House Robber: `dp[i]` is the most money from houses 0..i. `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`: skip house i, or rob it.

```csharp
int Rob(int[] nums)
{
    int prev2 = 0, prev1 = 0;                        // best up to i-2, best up to i-1
    foreach (int x in nums)
    {
        int cur = Math.Max(prev1, prev2 + x);
        prev2 = prev1; prev1 = cur;
    }
    return prev1;
}
```

House Robber II (houses in a circle): answer = max(Rob(0..n-2), Rob(1..n-1)), with n = 1 handled separately.

Problems: Climbing Stairs; Min Cost Climbing Stairs; House Robber; House Robber II; Decode Ways.

### 0/1 knapsack vs unbounded knapsack

State: `dp[c]` is the best value with capacity `c`.

```csharp
// 0/1: each item at most once. Loop capacity BACKWARDS.
int Knapsack01(int[] wt, int[] val, int W)
{
    var dp = new int[W + 1];
    for (int i = 0; i < wt.Length; i++)
        for (int c = W; c >= wt[i]; c--)
            dp[c] = Math.Max(dp[c], dp[c - wt[i]] + val[i]);
    return dp[W];
}

// Unbounded: each item any number of times. Same line, loop FORWARDS.
int KnapsackUnbounded(int[] wt, int[] val, int W)
{
    var dp = new int[W + 1];
    for (int i = 0; i < wt.Length; i++)
        for (int c = wt[i]; c <= W; c++)
            dp[c] = Math.Max(dp[c], dp[c - wt[i]] + val[i]);
    return dp[W];
}
```

Why the direction matters: going backwards, `dp[c - wt[i]]` has not been updated for item i yet, so it still means "without item i". Item i is counted at most once. Going forwards, `dp[c - wt[i]]` may already include item i, so it can be used again.

Tiny check: one item, weight 2, value 3, W = 4. Forwards gives 6 (item used twice). Backwards gives 3.

Complexity: O(n · W) time, O(W) space. This is "pseudo-polynomial": it depends on the value of W, not only on the number of items.

Problems: 0/1 Knapsack; Coin Change (unbounded, minimise); Ones and Zeroes (two capacities).

### Counting: combinations vs permutations (loop order)

```csharp
// Combinations ({1,2} and {2,1} are the same): COINS outer, amount inner. Coin Change II.
int CountCombinations(int[] coins, int amount)
{
    var dp = new int[amount + 1]; dp[0] = 1;         // one way to make 0: take nothing
    foreach (int c in coins)
        for (int a = c; a <= amount; a++) dp[a] += dp[a - c];
    return dp[amount];
}

// Permutations (order matters): AMOUNT outer, items inner. Combination Sum IV.
int CountPermutations(int[] nums, int target)
{
    var dp = new int[target + 1]; dp[0] = 1;
    for (int a = 1; a <= target; a++)
        foreach (int x in nums) if (x <= a) dp[a] += dp[a - x];
    return dp[target];
}
```

Coins {1, 2}, amount 3: combinations = 2 ({1,1,1}, {1,2}); permutations = 3 (1+1+1, 1+2, 2+1).

Why: with coins outer, coins are added in a fixed order, so every multiset is counted once. With amount outer, every item can be the last step for every amount, so every order is counted.

Counts grow fast. Use `long` or the modulus the problem gives.

### Grid DP

State: `dp[r][c]` is the answer for paths that end at cell (r, c). The transition reads from the cell above and the cell to the left.

```csharp
int MinPathSum(int[][] grid)
{
    int m = grid.Length, n = grid[0].Length;
    var dp = new int[n];                             // one row is enough
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
        {
            if (r == 0 && c == 0) dp[c] = grid[0][0];
            else if (r == 0) dp[c] = dp[c - 1] + grid[r][c];
            else if (c == 0) dp[c] = dp[c] + grid[r][c];
            else dp[c] = Math.Min(dp[c], dp[c - 1]) + grid[r][c];   // dp[c] = above, dp[c-1] = left
        }
    return dp[n - 1];
}
```

For Unique Paths, replace min with `+` and start with 1. With obstacles, an obstacle cell has 0 ways. Bug: forgetting that the first row and the first column have only one way in.

Problems: Unique Paths; Unique Paths II; Minimum Path Sum; Maximal Square.

### Two-string DP (LCS, edit distance)

State: `dp[i, j]` is the answer for the first `i` characters of `a` and the first `j` of `b`. Use an `(n+1) × (m+1)` table. Row 0 and column 0 mean "empty prefix", which makes the base cases easy.

- **LCS**: if `a[i-1] == b[j-1]`, `dp[i,j] = dp[i-1,j-1] + 1`; else `max(dp[i-1,j], dp[i,j-1])`. Base: 0.
- **Edit distance**: if equal, `dp[i-1,j-1]`; else `1 + min(replace dp[i-1,j-1], delete dp[i-1,j], insert dp[i,j-1])`. Base: `dp[i,0] = i`, `dp[0,j] = j`.

```csharp
int MinDistance(string a, string b)
{
    int n = a.Length, m = b.Length;
    var dp = new int[n + 1, m + 1];
    for (int i = 0; i <= n; i++) dp[i, 0] = i;       // delete all i characters
    for (int j = 0; j <= m; j++) dp[0, j] = j;       // insert all j characters
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i, j] = a[i - 1] == b[j - 1]
                ? dp[i - 1, j - 1]
                : 1 + Math.Min(dp[i - 1, j - 1], Math.Min(dp[i - 1, j], dp[i, j - 1]));
    return dp[n, m];
}
```

O(n · m) time. Space can drop to two rows. With one row, save the old diagonal value in a variable before you overwrite it. Bug: indexing `a[i]` instead of `a[i-1]` in the shifted table.

Problems: Longest Common Subsequence; Edit Distance; Longest Palindromic Subsequence (LCS of s and its reverse); Distinct Subsequences.

### Longest increasing subsequence

```csharp
// O(n²). dp[i] is the length of the LIS that ENDS at index i.
int LisQuadratic(int[] a)
{
    var dp = new int[a.Length]; int best = 0;
    for (int i = 0; i < a.Length; i++)
    {
        dp[i] = 1;
        for (int j = 0; j < i; j++) if (a[j] < a[i]) dp[i] = Math.Max(dp[i], dp[j] + 1);
        best = Math.Max(best, dp[i]);                // the answer is the max over all i
    }
    return best;
}

// O(n log n). tails[k] = smallest possible last value of an increasing subsequence of length k+1.
int LisFast(int[] a)
{
    var tails = new List<int>();
    foreach (int x in a)
    {
        int i = tails.BinarySearch(x);
        if (i < 0) i = ~i;                           // first index with tails[i] >= x
        if (i == tails.Count) tails.Add(x); else tails[i] = x;
    }
    return tails.Count;
}
```

Why `tails` works: `tails` is always sorted. A smaller last value is never worse, because it leaves more room for later items. Each `x` either extends the longest list or makes some length end with a smaller value. Note: `tails` is not a real subsequence. Only its length is correct. For "non-decreasing", search for the first value **greater than** x instead.

Problems: Longest Increasing Subsequence; Number of Longest Increasing Subsequence; Russian Doll Envelopes.

### Partition / subset sum

Idea: "can some items add up to exactly T?" is 0/1 knapsack with `bool` values.

```csharp
bool CanPartition(int[] nums)
{
    int total = nums.Sum();
    if (total % 2 == 1) return false;                // an odd total cannot split equally
    int target = total / 2;
    var dp = new bool[target + 1]; dp[0] = true;     // dp[s]: some subset sums to s
    foreach (int x in nums)
        for (int s = target; s >= x; s--)            // backwards: each number once
            dp[s] |= dp[s - x];
    return dp[target];
}
```

Target Sum reduces to the same thing: if P is the sum of the "+" numbers, then P = (total + target) / 2. Count subsets with that sum (`int` counts instead of `bool`). First check that `total + target` is even and not negative.

Problems: Partition Equal Subset Sum; Target Sum; Last Stone Weight II.

### Interval DP / matrix chain

State: `dp[i, j]` is the best answer for the range i..j. Fill by **increasing length**, because a range needs its smaller sub-ranges. Try every split point `k` in the range. Usually O(n³).

Burst Balloons: pad the array with 1 at both ends. Let `k` be the **last** balloon burst strictly between `i` and `j`. When `k` bursts, its neighbours are `i` and `j`, and the left and right parts are independent.

```csharp
int MaxCoins(int[] nums)
{
    int n = nums.Length + 2;
    var v = new int[n]; v[0] = v[n - 1] = 1;
    for (int i = 0; i < nums.Length; i++) v[i + 1] = nums[i];
    var dp = new int[n, n];                          // dp[i,j]: best coins from bursting everything strictly between i and j
    for (int len = 2; len < n; len++)
        for (int i = 0; i + len < n; i++)
        {
            int j = i + len;
            for (int k = i + 1; k < j; k++)
                dp[i, j] = Math.Max(dp[i, j], dp[i, k] + dp[k, j] + v[i] * v[k] * v[j]);
        }
    return dp[0, n - 1];
}
```

Why "last" and not "first": if `k` bursts first, the neighbours of the other balloons change, and the two sides are no longer independent. Matrix chain multiplication has the same shape: `dp[i,j] = min over k of dp[i,k] + dp[k+1,j] + cost of joining the two parts`.

Problems: Burst Balloons; Minimum Cost to Cut a Stick; Palindrome Partitioning II.

### Tree DP

Idea: post-order. Each node returns a small tuple that describes its subtree for each "state" of the node.

House Robber III: for each node, return (best if I rob this node, best if I skip it).

```csharp
int RobTree(TreeNode? root) { var (rob, skip) = Go(root); return Math.Max(rob, skip); }

(int rob, int skip) Go(TreeNode? n)
{
    if (n == null) return (0, 0);
    var l = Go(n.left); var r = Go(n.right);
    int rob = n.val + l.skip + r.skip;                           // children must be skipped
    int skip = Math.Max(l.rob, l.skip) + Math.Max(r.rob, r.skip); // children are free
    return (rob, skip);
}
```

O(n): each node is visited once. The naive version that also recurses into grandchildren computes the same subtrees again and again.

Problems: House Robber III; Binary Tree Cameras; Binary Tree Maximum Path Sum.

### Bitmask DP (n ≤ 16–20)

Idea: when the state is "which items are already used", store that set as the bits of an integer. Bit j is 1 when item j is used. There are 2^n sets, so n must be small.

TSP-style: `dp[mask, i]` is the minimum cost to visit exactly the cities in `mask`, ending at city i.

```csharp
int Tsp(int[,] cost, int n)
{
    const int INF = int.MaxValue / 2;
    var dp = new int[1 << n, n];
    for (int m = 0; m < (1 << n); m++) for (int i = 0; i < n; i++) dp[m, i] = INF;
    dp[1, 0] = 0;                                    // start at city 0; visited set = {0}
    for (int mask = 1; mask < (1 << n); mask++)      // a superset is always a larger number
        for (int i = 0; i < n; i++)
        {
            if ((mask & (1 << i)) == 0 || dp[mask, i] >= INF) continue;
            for (int j = 0; j < n; j++)
            {
                if ((mask & (1 << j)) != 0) continue;
                int next = mask | (1 << j);
                dp[next, j] = Math.Min(dp[next, j], dp[mask, i] + cost[i, j]);
            }
        }
    int full = (1 << n) - 1, best = INF;
    for (int i = 0; i < n; i++) best = Math.Min(best, dp[full, i] + cost[i, 0]);
    return best;
}
```

O(2^n · n²) time, O(2^n · n) memory. With n = 16 that is 2^16 · 16² ≈ 16.8 million steps, which is fine. Each extra city doubles the work.

Problems: Shortest Path Visiting All Nodes (BFS over `(node, mask)`); Partition to K Equal Sum Subsets; Find the Shortest Superstring.

### State-machine DP (stock with cooldown)

Idea: draw the states you can be in each day and the arrows between them. Each state is one variable.

States: `hold` (own a stock), `sold` (sold today, so tomorrow is cooldown), `rest` (no stock, free to buy).

```csharp
int MaxProfitCooldown(int[] prices)
{
    int hold = int.MinValue / 2, sold = 0, rest = 0;
    foreach (int p in prices)
    {
        int prevSold = sold;
        sold = hold + p;                             // sell today
        hold = Math.Max(hold, rest - p);             // keep holding, or buy (only from rest)
        rest = Math.Max(rest, prevSold);             // do nothing; yesterday's sale ends cooldown
    }
    return Math.Max(sold, rest);
}
```

Every right-hand side must use **yesterday's** values. The order of the lines above makes that true. If unsure, copy all old values into temporaries first. With a fee, sell gives `hold + p - fee`. With "at most k transactions", add k as a dimension.

Problems: Best Time to Buy and Sell Stock with Cooldown; Best Time to Buy and Sell Stock with Transaction Fee; Best Time to Buy and Sell Stock IV.

### How to recognise DP: checklist

- The question asks for a **count**, a **minimum/maximum**, or **yes/no**, not a list of every solution.
- The answer is a sequence of choices (take or skip, go right or down, cut here or not).
- Your brute-force recursion calls itself again with the **same arguments**.
- A greedy rule has a counterexample.
- The input size fits the state size. As a rough rule of thumb, keep states × work per state at about 10^7–10^8 or less. Bitmask DP needs n around 20 or less.
- The words "number of ways", "minimum cost", "longest", "can you reach / form / partition".

### Common DP mistakes

1. No state sentence, so the table has no clear meaning.
2. Wrong base case: counting needs `dp[0] = 1` (one way to make nothing); min-cost needs `dp[0] = 0` and "infinity" elsewhere.
3. Knapsack loop in the wrong direction (0/1 must go backwards).
4. Loops nested the wrong way for combinations vs permutations.
5. 0 used as "not computed" in a memo when 0 is a real answer.
6. "Infinity" overflow: `int.MaxValue + 1` becomes negative. Use `amount + 1` or `int.MaxValue / 2`.
7. Answer in the wrong place: LIS O(n²) needs the max over all `dp[i]`, not `dp[n-1]`.
8. Off-by-one in `(n+1)`-sized tables: `dp[i]` matches `a[i-1]`.
9. Space compression that overwrites a value you still need (the LCS diagonal).
10. A missing dimension in the state (holding or not; transactions left).
11. Deep recursion in memo for large n; switch to tabulation.

---

<a id="add-dsa-trie"></a>

## ➕ Trie (prefix tree)

**Idea.** A tree where each edge is one character. The path from the root to a node spells a prefix. A flag on the node says "a full word ends here".

**Correctness reason.** Every word with the same prefix shares the same path. So one walk of length L answers "does any word start with this prefix?" in O(L), no matter how many words there are.

### Node structure in C#

```csharp
class Trie
{
    class Node
    {
        public Node?[] Next = new Node?[26];         // lowercase a–z only
        public bool IsWord;                          // a complete word ends here
    }
    readonly Node root = new();

    public void Insert(string w)
    {
        var cur = root;
        foreach (char ch in w) cur = cur.Next[ch - 'a'] ??= new Node();
        cur.IsWord = true;
    }

    Node? Walk(string s)
    {
        var cur = root;
        foreach (char ch in s)
        {
            cur = cur.Next[ch - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }

    public bool Search(string w) => Walk(w)?.IsWord == true;   // the full word
    public bool StartsWith(string p) => Walk(p) != null;       // any prefix
}
```

**Array of 26 vs `Dictionary<char, Node>`.**

| | `Node?[26]` | `Dictionary<char, Node>` |
|---|---|---|
| Speed | Fast: direct index | Slower: hashing at each step |
| Memory per node | Fixed: 26 references × 8 bytes = 208 bytes for the array alone on 64-bit, even when empty | Grows with the real number of children |
| Alphabet | Small and known (a–z) | Large or unknown (Unicode, mixed case) |

**Word-end marker vs prefix.** After inserting "apple", the path for "app" exists, but `IsWord` is false at its last node. `Search("app")` must return false. `StartsWith("app")` returns true. Forgetting `IsWord` is the classic bug.

### Search suggestions

Sort the products with `StringComparer.Ordinal`, then insert them in that order. Each node keeps the first 3 words that pass through it. Those are the 3 smallest words with that prefix.

```csharp
class SNode { public SNode?[] Next = new SNode?[26]; public List<string> Top = new(); }

IList<IList<string>> SuggestedProducts(string[] products, string searchWord)
{
    Array.Sort(products, StringComparer.Ordinal);
    var root = new SNode();
    foreach (var p in products)
    {
        var cur = root;
        foreach (char ch in p)
        {
            cur = cur.Next[ch - 'a'] ??= new SNode();
            if (cur.Top.Count < 3) cur.Top.Add(p);
        }
    }
    var res = new List<IList<string>>(); SNode? node = root;
    foreach (char ch in searchWord)
    {
        node = node?.Next[ch - 'a'];
        res.Add(node == null ? new List<string>() : node.Top);
    }
    return res;
}
```

A simpler alternative: sort, then for each prefix binary-search the first word ≥ prefix and take up to 3 that start with it. Mention both.

### Word Search II (idea)

Searching each word separately repeats the same grid walks. Instead:
1. Put all words in a trie. Store the full word at its end node (`string? Word` instead of `bool IsWord`).
2. Start a DFS from every cell, and move in the trie together with the grid.
3. If the trie has no child for the current letter, stop. No word continues this way. This is the pruning.
4. When a node holds a word, add it and set the node's word to `null`, so it is not added twice.
5. Mark the cell (for example with `'#'`) before going deeper, and restore it after.

The code is the Word Search backtracking template with one change: the DFS carries the current trie node instead of an index into one word.

### Bitwise trie for maximum XOR

Store each number as a path of bits from the highest bit to the lowest. To make `x XOR y` as large as possible, at each bit try to go to the **opposite** bit, because a 1 in a high bit beats everything below it.

```csharp
class BitNode { public BitNode?[] Kid = new BitNode?[2]; }

int FindMaximumXOR(int[] nums)                       // nums are non-negative
{
    var root = new BitNode(); int best = 0;
    foreach (int x in nums)
    {
        var node = root;
        for (int b = 30; b >= 0; b--) node = node.Kid[(x >> b) & 1] ??= new BitNode();

        node = root; int cur = 0;
        for (int b = 30; b >= 0; b--)
        {
            int want = ((x >> b) & 1) ^ 1;           // the opposite bit gives a 1 in the XOR
            if (node.Kid[want] != null) { cur |= 1 << b; node = node.Kid[want]!; }
            else node = node.Kid[want ^ 1]!;
        }
        best = Math.Max(best, cur);
    }
    return best;
}
```

O(31 · n) time.

### Summary

- **Recognise**: "prefix", "starts with", "autocomplete", "dictionary of words", "many words on one grid", "maximum XOR".
- **Complexity**: insert and search O(L) for a word of length L. Memory O(total characters × node size).
- **Memory trade-off**: a trie can use far more memory than a `HashSet<string>`. If you only need exact lookups, use the hash set (see Part 5).
- **Common bugs**: `Search` returns true for a prefix; `ch - 'a'` with uppercase or other characters gives a bad index; duplicate results in Word Search II; not restoring the board cell; culture-sensitive sorting of words.
- **Classic problems**: Implement Trie (Prefix Tree); Design Add and Search Words Data Structure; Search Suggestions System; Word Search II; Maximum XOR of Two Numbers in an Array.

---

<a id="add-dsa-strings-advanced"></a>

## ➕ Advanced string matching: KMP, Z-algorithm, Rabin–Karp (extension)

Extension; learn after core. In an interview, first say the simple answer: `text.IndexOf(p, StringComparison.Ordinal)`, or a brute-force check at every position, which is O(n · m). Offer one of these only when asked for guaranteed linear time or for many repeated searches.

### KMP and the LPS array

**Idea.** When a mismatch happens, the pattern has already matched some characters. Do not start again from zero. Jump to the longest part of the pattern that is still matched.

`lps[i]` = the length of the longest **proper** prefix of `p[0..i]` that is also a suffix of `p[0..i]`. Example: `p = "AABAAA"` gives `lps = [0, 1, 0, 1, 2, 2]`.

```csharp
int[] BuildLps(string p)
{
    var lps = new int[p.Length]; int len = 0;        // len = length of the current matched prefix
    for (int i = 1; i < p.Length; i++)
    {
        while (len > 0 && p[i] != p[len]) len = lps[len - 1];   // fall back
        if (p[i] == p[len]) len++;
        lps[i] = len;
    }
    return lps;
}

int KmpSearch(string text, string p)                 // first index, or -1
{
    if (p.Length == 0) return 0;
    var lps = BuildLps(p); int j = 0;                // j = characters of p matched so far
    for (int i = 0; i < text.Length; i++)
    {
        while (j > 0 && text[i] != p[j]) j = lps[j - 1];
        if (text[i] == p[j]) j++;
        if (j == p.Length) return i - p.Length + 1;  // for all matches: record, then j = lps[j - 1]
    }
    return -1;
}
```

**Why O(n + m):** `j` goes up by at most 1 per character of the text. Each fallback makes `j` smaller. So the total number of fallbacks cannot be more than the total number of increases.

**Common bug:** starting the LPS loop at `i = 0`. Then the pattern matches itself and every value is wrong.

### Z-algorithm

`z[i]` = the length of the longest substring starting at `i` that matches a prefix of `s`. To search, build `s = p + sep + text`, where `sep` is a character that is in neither string. Any `z[i] == p.Length` is a match.

```csharp
int[] ZArray(string s)
{
    int n = s.Length; var z = new int[n]; int l = 0, r = 0;   // [l, r) = rightmost box that matches a prefix
    for (int i = 1; i < n; i++)
    {
        if (i < r) z[i] = Math.Min(r - i, z[i - l]);           // reuse what the box already proves
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;  // then extend by comparing
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}
```

**Why O(n):** each successful comparison in the `while` loop moves `r` to the right, and `r` never moves left.

### Rabin–Karp (rolling hash)

**Idea.** Treat a string as a number in base B, modulo a large prime M. Compare the hash of the pattern with the hash of each text window. Slide the window in O(1): remove the left character, add the right one.

```csharp
int RabinKarp(string text, string p)
{
    int n = text.Length, m = p.Length;
    if (m == 0) return 0;
    if (m > n) return -1;
    const long Mod = 1_000_000_007, B = 131;
    long hp = 0, ht = 0, pow = 1;                    // pow = B^(m-1) mod Mod
    for (int i = 0; i < m; i++)
    {
        hp = (hp * B + p[i]) % Mod;
        ht = (ht * B + text[i]) % Mod;
        if (i > 0) pow = pow * B % Mod;
    }
    for (int i = 0; ; i++)
    {
        if (hp == ht && string.CompareOrdinal(text, i, p, 0, m) == 0) return i;   // verify
        if (i + m >= n) return -1;
        ht = (ht - text[i] * pow % Mod + Mod) % Mod;   // remove the left character
        ht = (ht * B + text[i + m]) % Mod;             // add the right character
    }
}
```

**Collisions.** Two different strings can have the same hash. So always check the characters when the hashes match, or use two different moduli (double hashing). Expected time is O(n + m). With many collisions it degrades towards O(n · m).

**Modulus.** Use a large prime. Keep values in `long` so `hash * B` does not overflow. Add `Mod` before `%` after a subtraction, because `%` in C# can return a negative number. Do not rely on plain 64-bit overflow as the modulus; there are known inputs that make many strings collide.

**Where rolling hash is strongest:** comparing many substrings of the same length (Repeated DNA Sequences), and "binary search on the length + hash" (Longest Duplicate Substring).

- **Classic problems**: Find the Index of the First Occurrence in a String; Repeated Substring Pattern; Shortest Palindrome (KMP); Repeated DNA Sequences; Longest Duplicate Substring.

---

<a id="add-dsa-range-queries"></a>

## ➕ Range queries: prefix sums, Fenwick tree, segment tree (extension)

Extension: learn after the core. In general backend interviews, most range questions are solved with prefix sums, sorting or a heap. Fenwick and segment trees appear mainly in harder problems. Your syllabus already marks them optional.

### Which structure

| Structure | Build | Range query | Point update | Range update | Use when |
|---|---|---|---|---|---|
| Prefix sums | O(n) | O(1) | O(n) (rebuild) | — | The array never changes |
| Difference array | O(n) | Read once at the end | — | O(1) | Many range additions, one final read |
| Fenwick tree (BIT) | O(n log n) | O(log n) (sums) | O(log n) | — | Sums with updates; shortest code |
| Segment tree | O(n) | O(log n) | O(log n) | — | Sum, min, max, gcd with updates |
| Segment tree + lazy | O(n) | O(log n) | O(log n) | O(log n) | Range updates **and** range queries |

### Fenwick tree (Binary Indexed Tree)

**Idea.** `t[i]` (1-based) stores the sum of a block of elements that ends at `i`. The block length is `i & -i`, the lowest set bit of `i`. Example: `i = 12` is `1100` in binary, the lowest set bit is 4, so `t[12]` covers elements 9..12.

- **Query** (prefix sum up to i): add `t[i]`, then remove the lowest set bit (`i -= i & -i`). Each step jumps to the block before.
- **Update** (add to element i): add to `t[i]`, then `i += i & -i`. Each step reaches the next block that also covers i.

Both loops take O(log n) steps.

```csharp
class Fenwick
{
    readonly long[] t;
    public Fenwick(int n) { t = new long[n + 1]; }

    public void Add(int i, long delta)               // i is 0-based
    {
        for (i++; i < t.Length; i += i & -i) t[i] += delta;
    }

    public long Prefix(int i)                        // sum of [0..i], 0-based
    {
        long s = 0;
        for (i++; i > 0; i -= i & -i) s += t[i];
        return s;
    }

    public long Range(int l, int r) => Prefix(r) - (l > 0 ? Prefix(l - 1) : 0);
}
```

To **set** a value (not add), keep a copy of the array and call `Add(i, newValue - old[i])`. A Fenwick tree works for sums (and other operations you can undo by subtraction). For range minimum, use a segment tree.

### Segment tree (range query, point update)

**Idea.** A binary tree over the array. Each node stores the answer (here, the sum) for one range. The root covers everything; each child covers half of its parent's range. A query splits into O(log n) nodes whose ranges exactly cover the requested range.

```csharp
class SegmentTree                                    // range sum, point assign
{
    readonly int n; readonly long[] tree;

    public SegmentTree(int[] a)
    {
        n = a.Length; tree = new long[4 * n];        // 4n is always enough
        if (n > 0) Build(a, 1, 0, n - 1);
    }

    void Build(int[] a, int node, int lo, int hi)
    {
        if (lo == hi) { tree[node] = a[lo]; return; }
        int mid = (lo + hi) / 2;
        Build(a, 2 * node, lo, mid);
        Build(a, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public void Update(int idx, long val) => Update(1, 0, n - 1, idx, val);
    void Update(int node, int lo, int hi, int idx, long val)
    {
        if (lo == hi) { tree[node] = val; return; }
        int mid = (lo + hi) / 2;
        if (idx <= mid) Update(2 * node, lo, mid, idx, val);
        else Update(2 * node + 1, mid + 1, hi, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public long Query(int l, int r) => Query(1, 0, n - 1, l, r);   // inclusive [l, r]
    long Query(int node, int lo, int hi, int l, int r)
    {
        if (r < lo || hi < l) return 0;              // no overlap (for min, return long.MaxValue)
        if (l <= lo && hi <= r) return tree[node];   // full overlap
        int mid = (lo + hi) / 2;
        return Query(2 * node, lo, mid, l, r) + Query(2 * node + 1, mid + 1, hi, l, r);
    }
}
```

### Lazy propagation (idea only)

For "add x to every element in [l, r]", updating each leaf is O(n). Instead, when a node's range is fully inside [l, r], update that node's value and store a **pending** "add x" tag on it. Do not touch its children yet. Push the tag down to the children only when a later query or update needs to go inside that node. Range update and range query both stay O(log n).

### When interviews actually ask these

Most range questions in general SDE-2 loops are prefix-sum questions. A mutable range sum ("values change between queries") is the usual entry point for Fenwick or segment trees. "Count of smaller numbers after self" style problems use a Fenwick tree over sorted value ranks. If you cannot recall the structure, say the O(n)-per-query baseline first, then name the structure and its costs.

### Summary

- **Recognise**: "many range queries **and** updates mixed together", "count of smaller elements after self", "sum of a range while values change".
- **Common bugs**: mixing 0-based and 1-based indexes in Fenwick; the wrong neutral value for no-overlap (0 for sum, `long.MaxValue` for min); a segment tree array smaller than 4n; using a Fenwick tree for min/max with arbitrary updates; `int` overflow in sums.
- **Classic problems**: Range Sum Query - Immutable (prefix sums); Range Sum Query - Mutable; Corporate Flight Bookings (difference array); Count of Smaller Numbers After Self; Count of Range Sum.
