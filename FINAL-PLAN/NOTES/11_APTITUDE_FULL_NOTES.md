# Complete quantitative, logical, verbal and estimation notes

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="S13"></a>

## S13 — 13_Aptitude_and_Quantitative_Preparation

Full source content: [Study-Plan/13_Aptitude_and_Quantitative_Preparation.docx](../SOURCE_LIBRARY/Study-Plan/13_Aptitude_and_Quantitative_Preparation.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S13-B0001"></a>

Aptitude and Quantitative Preparation

<a id="S13-B0002"></a>

Document 13 - A parallel track. 15-20 minutes, two to three times a week.

<a id="S13-B0003"></a>

### An honest framing first

<a id="S13-B0004"></a>

You asked for aptitude, so here it is - but you deserve an accurate picture of where it matters, because misallocating time here would be expensive.

<a id="S13-B0005"></a>

| Where it matters | Reality |
| --- | --- |
| Google SWE loop | Classical aptitude is not tested. No quant round, no logical reasoning round |
| Amazon SDE loop | Classical aptitude is not tested in the technical loop. Amazon's assessments do include work-style and work-simulation components, which are not aptitude tests |
| Mid-tier and Indian product companies | Frequently tested. Online assessments commonly include quantitative aptitude, logical reasoning and verbal sections as a gate before the technical rounds |
| Service companies and mass recruiters | Heavily tested, often as the primary filter |
| System design (both targets) | Quantitative estimation matters a great deal. Back-of-envelope capacity estimation is step 2 of the nine-step framework |

<a id="S13-B0006"></a>

So the strategy is: keep aptitude light and continuous, and treat estimation skill as the part that genuinely feeds your Google and Amazon preparation. In Month 6 your application ladder starts with mid-tier companies specifically to calibrate - and those are exactly the ones with aptitude gates. Being filtered out by a percentages question before anyone looks at your code would be an avoidable and irritating way to lose a calibration opportunity.

<a id="S13-B0007"></a>

Time budget: 15-20 minutes, two to three times per week. Slot it into the last block of Tuesday and Thursday. It should never displace DSA or system design.

<a id="S13-B0008"></a>

### Part 1 - Quantitative aptitude

<a id="S13-B0009"></a>

| Topic | What to drill |
| --- | --- |
| Number system | Divisibility rules, factors, LCM and HCF, remainders, unit digits, base conversion |
| Percentages | Increase/decrease, successive percentages, percentage change vs point change |
| Ratio and proportion | Direct and inverse, partnership, mixtures and alligation |
| Averages | Weighted averages, effect of adding or removing a term |
| Profit and loss | Cost/selling price, discount chains, marked price, false weights |
| Simple and compound interest | Formulae, half-yearly and quarterly compounding, the difference between SI and CI |
| Time, speed and distance | Relative speed, trains, boats and streams, average speed |
| Time and work | Work rates, combined work, efficiency, pipes and cisterns |
| Permutations and combinations | Arrangements, selections, circular arrangements, repetitions |
| Probability | Basic, conditional, complementary events, dice and cards |
| Mensuration | Areas, volumes, surface areas of standard shapes |
| Progressions | AP and GP, sums, nth term |
| Data interpretation | Tables, bar charts, pie charts, line graphs, caselets. Highest frequency section in most assessments |

<a id="S13-B0010"></a>

### The skill that actually transfers

<a id="S13-B0011"></a>

Approximation and mental estimation. In a data interpretation section you rarely need exact answers - you need to eliminate three of four options quickly. That same skill is what step 2 of a system design demands. Practise deliberately: round aggressively, compute the order of magnitude first, only refine if the options are close.

<a id="S13-B0012"></a>

### Part 2 - Logical reasoning

<a id="S13-B0013"></a>

| Topic | What to drill |
| --- | --- |
| Number and letter series | Pattern identification, missing terms |
| Analogies and classification | Relationship identification, odd one out |
| Coding-decoding | Letter shifts, substitution, symbol coding |
| Blood relations | Family tree diagramming |
| Direction sense | Displacement and final position |
| Syllogisms | Venn diagram method. Learn the diagram method, do not reason verbally - verbal reasoning on syllogisms is where people lose marks |
| Seating arrangement | Linear, circular, facing inward/outward. Grid method |
| Puzzles | Floor puzzles, scheduling, matrix puzzles. Highest time cost per question - triage these |
| Clocks and calendars | Angles, odd days, day-of-week calculation |
| Cubes and dice | Painted cubes, opposite faces |
| Statement and assumption/conclusion | Formal logic on prose |
| Data sufficiency | Judging whether the information suffices, without solving. Genuinely useful for interview requirement-clarification too |

<a id="S13-B0014"></a>

### Part 3 - Verbal

<a id="S13-B0015"></a>

Lightest priority of the three. Your stated goal is clear technical communication, and this section overlaps with that only partially.

<a id="S13-B0016"></a>

•  Reading comprehension - the section worth practising, because it is also reading-speed practice for technical documentation.

<a id="S13-B0017"></a>

•  Sentence correction and error spotting - subject-verb agreement, tenses, articles, prepositions. This is where your English gap is most likely to show in an assessment.

<a id="S13-B0018"></a>

•  Para jumbles - sentence ordering. Trains coherent structuring, which helps your spoken explanations.

<a id="S13-B0019"></a>

•  Vocabulary - lowest return. Do not build word lists; it is not a good use of your hours.

<a id="S13-B0020"></a>

### Part 4 - Technical aptitude

<a id="S13-B0021"></a>

Common in online assessments, and directly relevant to interviews.

<a id="S13-B0022"></a>

•  Output prediction - given a code snippet, what does it print. Pointer/reference semantics, operator precedence, integer overflow, short-circuit evaluation. You already own most of this after Month 1.

<a id="S13-B0023"></a>

•  Complexity questions - identify the Big-O of a given loop nest or recursion. Directly from your DSA track.

<a id="S13-B0024"></a>

•  Pseudocode tracing - dry-run a routine and produce the final state.

<a id="S13-B0025"></a>

•  SQL output questions - joins, group by, null behaviour. Directly from Month 2 Week 8.

<a id="S13-B0026"></a>

•  OS and networking multiple choice - directly from Month 3.

<a id="S13-B0027"></a>

Note that four of five of these are already covered by your main track. Technical aptitude needs almost no separate study - just a few practice sets to get used to the multiple-choice format and the time pressure.

<a id="S13-B0028"></a>

### Part 5 - Estimation for system design (the part that matters most)

<a id="S13-B0029"></a>

This is aptitude that Google and Amazon do test, inside the system design round. Memorise these.

<a id="S13-B0030"></a>

### Powers of two

<a id="S13-B0031"></a>

| Power | Approximate value | Name |
| --- | --- | --- |
| 2^10 | 1 Thousand | 1 KB |
| 2^20 | 1 Million | 1 MB |
| 2^30 | 1 Billion | 1 GB |
| 2^40 | 1 Trillion | 1 TB |
| 2^50 | 1 Quadrillion | 1 PB |

<a id="S13-B0032"></a>

### Latency numbers to reason with

<a id="S13-B0033"></a>

| Operation | Rough order of magnitude |
| --- | --- |
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| SSD random read | ~100 microseconds |
| Round trip within the same datacentre | ~500 microseconds |
| Disk seek (spinning) | ~10 ms |
| Round trip India to US | ~150 ms |

<a id="S13-B0034"></a>

You do not need these to be exact. You need to know that memory is roughly a thousand times faster than SSD, that a cross-continent round trip dwarfs everything local, and that these ratios drive your caching and replication decisions.

<a id="S13-B0035"></a>

### The estimation drills

<a id="S13-B0036"></a>

| Given | Compute in under 2 minutes |
| --- | --- |
| 100M daily active users, 10 requests each | Average QPS, then peak QPS at 3x |
| 500M writes/day, 1 KB each | Daily storage, yearly storage, with replication factor 3 |
| 1M QPS reads, 10 KB responses | Bandwidth required |
| 10 TB of data, 1 TB per node | Node count, plus replication overhead |
| 100k concurrent WebSocket connections | Memory and connection budget per server, servers needed |

<a id="S13-B0037"></a>

Practise one of these every time you do a system design. Say the numbers out loud - stating estimates confidently is a scored signal, and stating them hesitantly reads as guessing even when the number is right.

<a id="S13-B0038"></a>

### Free resources

<a id="S13-B0039"></a>

| Resource | For |
| --- | --- |
| IndiaBix indiabix.com | The standard free bank for quantitative, reasoning and verbal, with explanations |
| GeeksforGeeks - Aptitude | Topic-wise theory plus practice sets, plus their technical aptitude sections |
| PrepInsta (free sections) | Company-specific assessment patterns for Indian recruiters |
| Khan Academy | If any underlying maths is genuinely shaky - ratios, probability, algebra. Free and well built |
| Latency numbers every programmer should know | Widely available reference. Print it and keep it visible |
| System Design Primer - estimation section | Back-of-envelope worked examples |

<a id="S13-B0040"></a>

### Schedule

<a id="S13-B0041"></a>

| Month | Aptitude work |
| --- | --- |
| M1-M2 | Tue/Thu last 15 min. Quantitative fundamentals: number system, percentages, ratios, averages, profit/loss, TSD, time and work |
| M3-M4 | Tue/Thu 15 min. Logical reasoning: series, syllogisms (diagram method), seating, puzzles, blood relations, directions. Plus estimation drills inside every system design |
| M5 | Tue/Thu 15 min. Data interpretation, which is the highest-frequency section. Plus verbal light touch |
| M6 Weeks 21-22 | Intensive: 30 min/day for two weeks. Full timed mock assessments before the mid-tier applications land. This is when it actually pays |
| M7-M8 | Maintenance only. One timed set per week if assessments are still coming in |

<a id="S13-B0042"></a>

### The discipline for this track

<a id="S13-B0043"></a>

•  Always timed. Untimed aptitude practice is nearly worthless - the entire difficulty is speed.

<a id="S13-B0044"></a>

•  Learn the shortcut method, not the school method. These sections are designed so the long method does not fit in the time.

<a id="S13-B0045"></a>

•  Triage ruthlessly. In a real assessment, skipping two hard puzzles to secure eight easy questions is the correct play. Practise skipping - it is a trained skill and most people are bad at it.

<a id="S13-B0046"></a>

•  Keep a separate small error log. Same principle as the Weak List: bias your revision towards what you got wrong.

<a id="S13-B0047"></a>

•  Do not let this expand. If aptitude is eating more than 20 minutes on a weekday, it is stealing from work that matters more for your actual targets.
