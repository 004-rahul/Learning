# Aptitude and estimation

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Doc 13 in full. Optional unless a target company uses an aptitude test; the estimation part is needed for system design.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- Aptitude and Quantitative Preparation
- An honest framing first
- Part 1 - Quantitative aptitude
- Part 2 - Logical reasoning
- Part 3 - Verbal
- Part 4 - Technical aptitude
- Part 5 - Estimation for system design (the part that matters most)
- Free resources
- Schedule
- The discipline for this track
- ➕ When aptitude matters, and a minimal plan

---


*Source: Study-Plan/13_Aptitude_and_Quantitative_Preparation.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="s13-aptitude-and-quantitative-preparation"></a>

## Aptitude and Quantitative Preparation
Document 13 - A parallel track. 15-20 minutes, two to three times a week.
<a id="s13-an-honest-framing-first"></a>

## An honest framing first
You asked for aptitude, so here it is - but you deserve an accurate picture of where it matters, because misallocating time here would be expensive.

| Where it matters | Reality |
|---|---|
| Google SWE loop | Classical aptitude is not tested. No quant round, no logical reasoning round |
| Amazon SDE loop | Classical aptitude is not tested in the technical loop. Amazon's assessments do include work-style and work-simulation components, which are not aptitude tests |
| Mid-tier and Indian product companies | Frequently tested. Online assessments commonly include quantitative aptitude, logical reasoning and verbal sections as a gate before the technical rounds |
| Service companies and mass recruiters | Heavily tested, often as the primary filter |
| System design (both targets) | Quantitative estimation matters a great deal. Back-of-envelope capacity estimation is step 2 of the nine-step framework |

So the strategy is: keep aptitude light and continuous, and treat estimation skill as the part that genuinely feeds your Google and Amazon preparation. In Month 6 your application ladder starts with mid-tier companies specifically to calibrate - and those are exactly the ones with aptitude gates. Being filtered out by a percentages question before anyone looks at your code would be an avoidable and irritating way to lose a calibration opportunity.
Time budget: 15-20 minutes, two to three times per week. Slot it into the last block of Tuesday and Thursday. It should never displace DSA or system design.

<a id="s13-part-1-quantitative-aptitude"></a>

## Part 1 - Quantitative aptitude

| Topic | What to drill |
|---|---|
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

<a id="s13-the-skill-that-actually-transfers"></a>

### The skill that actually transfers
Approximation and mental estimation. In a data interpretation section you rarely need exact answers - you need to eliminate three of four options quickly. That same skill is what step 2 of a system design demands. Practise deliberately: round aggressively, compute the order of magnitude first, only refine if the options are close.
<a id="s13-part-2-logical-reasoning"></a>

## Part 2 - Logical reasoning

| Topic | What to drill |
|---|---|
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

<a id="s13-part-3-verbal"></a>

## Part 3 - Verbal
Lightest priority of the three. Your stated goal is clear technical communication, and this section overlaps with that only partially.
•  Reading comprehension - the section worth practising, because it is also reading-speed practice for technical documentation.
•  Sentence correction and error spotting - subject-verb agreement, tenses, articles, prepositions. This is where your English gap is most likely to show in an assessment.
•  Para jumbles - sentence ordering. Trains coherent structuring, which helps your spoken explanations.
•  Vocabulary - lowest return. Do not build word lists; it is not a good use of your hours.

<a id="s13-part-4-technical-aptitude"></a>

## Part 4 - Technical aptitude
Common in online assessments, and directly relevant to interviews.
•  Output prediction - given a code snippet, what does it print. Pointer/reference semantics, operator precedence, integer overflow, short-circuit evaluation. You already own most of this after Month 1.
•  Complexity questions - identify the Big-O of a given loop nest or recursion. Directly from your DSA track.
•  Pseudocode tracing - dry-run a routine and produce the final state.
•  SQL output questions - joins, group by, null behaviour. Directly from Month 2 Week 8.
•  OS and networking multiple choice - directly from Month 3.
Note that four of five of these are already covered by your main track. Technical aptitude needs almost no separate study - just a few practice sets to get used to the multiple-choice format and the time pressure.
<a id="s13-part-5-estimation-for-system-design-the-part-that-matters-mo"></a>

## Part 5 - Estimation for system design (the part that matters most)
This is aptitude that Google and Amazon do test, inside the system design round. Memorise these.
<a id="s13-powers-of-two"></a>

### Powers of two

| Power | Approximate value | Name |
|---|---|---|
| 2^10 | 1 Thousand | 1 KB |
| 2^20 | 1 Million | 1 MB |
| 2^30 | 1 Billion | 1 GB |
| 2^40 | 1 Trillion | 1 TB |
| 2^50 | 1 Quadrillion | 1 PB |

<a id="s13-latency-numbers-to-reason-with"></a>

### Latency numbers to reason with

| Operation | Rough order of magnitude |
|---|---|
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| SSD random read | ~100 microseconds |
| Round trip within the same datacentre | ~500 microseconds |
| Disk seek (spinning) | ~10 ms |
| Round trip India to US | ~150 ms |

You do not need these to be exact. You need to know that memory is roughly a thousand times faster than SSD, that a cross-continent round trip dwarfs everything local, and that these ratios drive your caching and replication decisions.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] India ↔ US round trip is typically ~200–300 ms in practice (150 ms is optimistic). Same-datacenter round trip is often well under 500 µs on modern networks (~100–500 µs). Use these as orders of magnitude only.

<a id="s13-the-estimation-drills"></a>

### The estimation drills

| Given | Compute in under 2 minutes |
|---|---|
| 100M daily active users, 10 requests each | Average QPS, then peak QPS at 3x |
| 500M writes/day, 1 KB each | Daily storage, yearly storage, with replication factor 3 |
| 1M QPS reads, 10 KB responses | Bandwidth required |
| 10 TB of data, 1 TB per node | Node count, plus replication overhead |
| 100k concurrent WebSocket connections | Memory and connection budget per server, servers needed |

Practise one of these every time you do a system design. Say the numbers out loud - stating estimates confidently is a scored signal, and stating them hesitantly reads as guessing even when the number is right.

<a id="s13-free-resources"></a>

## Free resources

| Resource | For |
|---|---|
| IndiaBix indiabix.com | The standard free bank for quantitative, reasoning and verbal, with explanations |
| GeeksforGeeks - Aptitude | Topic-wise theory plus practice sets, plus their technical aptitude sections |
| PrepInsta (free sections) | Company-specific assessment patterns for Indian recruiters |
| Khan Academy | If any underlying maths is genuinely shaky - ratios, probability, algebra. Free and well built |
| Latency numbers every programmer should know | Widely available reference. Print it and keep it visible |
| System Design Primer - estimation section | Back-of-envelope worked examples |

<a id="s13-schedule"></a>

## Schedule

| Month | Aptitude work |
|---|---|
| M1-M2 | Tue/Thu last 15 min. Quantitative fundamentals: number system, percentages, ratios, averages, profit/loss, TSD, time and work |
| M3-M4 | Tue/Thu 15 min. Logical reasoning: series, syllogisms (diagram method), seating, puzzles, blood relations, directions. Plus estimation drills inside every system design |
| M5 | Tue/Thu 15 min. Data interpretation, which is the highest-frequency section. Plus verbal light touch |
| M6 Weeks 21-22 | Intensive: 30 min/day for two weeks. Full timed mock assessments before the mid-tier applications land. This is when it actually pays |
| M7-M8 | Maintenance only. One timed set per week if assessments are still coming in |

<a id="s13-the-discipline-for-this-track"></a>

## The discipline for this track
•  Always timed. Untimed aptitude practice is nearly worthless - the entire difficulty is speed.
•  Learn the shortcut method, not the school method. These sections are designed so the long method does not fit in the time.
•  Triage ruthlessly. In a real assessment, skipping two hard puzzles to secure eight easy questions is the correct play. Practise skipping - it is a trained skill and most people are bad at it.
•  Keep a separate small error log. Same principle as the Weak List: bias your revision towards what you got wrong.
•  Do not let this expand. If aptitude is eating more than 20 minutes on a weekday, it is stealing from work that matters more for your actual targets.

<a id="add-apt-when"></a>

## ➕ When aptitude matters, and a minimal plan

### First, check if you need it at all

Aptitude matters only if a company you are targeting puts it in its online assessment (OA).

- Many Indian service companies and mid-tier companies use aptitude sections in their OA. Check each company before you study. Ask the recruiter, or read the OA instructions email.
- Typical big-tech SDE-2 loops do not have a classical aptitude section. They test coding, design and behavior. Formats change, so confirm per company (verify).
- If none of your current targets has aptitude, skip this section. Use the time for DSA or system design.

Simple rule: **no aptitude test on your list = no aptitude study.** Estimation for system design is different. You need that for every design round (see Part 5 above).

### The 2-week plan (30 minutes a day, only if needed)

Start this about two weeks before the first OA that has aptitude. Every session is timed.

| Day | Focus (20 min practice + 10 min review of mistakes) |
|---|---|
| 1 | Percentages: change, successive change, percent vs point change |
| 2 | Ratio and proportion, mixtures, partnership |
| 3 | Averages and weighted averages; profit, loss and discount |
| 4 | Time and work, pipes and cisterns (LCM method) |
| 5 | Time, speed and distance; relative speed; boats and trains |
| 6 | Data interpretation set 1: tables and bar charts |
| 7 | Mixed timed set (20 questions, 20 minutes). Write the error log |
| 8 | Number system: unit digits, remainders, divisibility |
| 9 | Syllogisms (Venn method) and statement/conclusion |
| 10 | Seating arrangement and simple puzzles (grid method) |
| 11 | Series, coding-decoding, directions, blood relations |
| 12 | Data interpretation set 2: pie charts, line graphs, caselets |
| 13 | Full timed mock in the target company's format (if known) |
| 14 | Redo only the questions from your error log. Stop |

After day 14, do one timed set a week only while aptitude OAs are still coming.

### Top 10 shortcut techniques

1. **Percent change chains.** Use multipliers. +20% then -10% = 1.2 x 0.9 = 1.08, so +8%. Never add percentages.
2. **Ratio tables.** Write the ratio parts in a small table, then scale once. If A:B = 2:3 and the total is 50, one part = 10, so A = 20 and B = 30.
3. **Work-rate LCM method.** Take total work = LCM of the days. A does it in 10 days, B in 15. Work = 30 units. A = 3/day, B = 2/day. Together 5/day, so 6 days.
4. **Relative speed.** Same direction: subtract speeds. Opposite direction: add speeds. Train passing a pole: distance = train length. Passing a platform: train + platform length. Convert km/h to m/s by x 5/18.
5. **Approximation.** Round hard numbers first. 48.7% of 3,012 is about half of 3,000 = 1,500. Then pick the closest option. Calculate exactly only if two options are close.
6. **Unit digits.** Only the last digits matter. Powers repeat in cycles of 4. For 7^23: 23 mod 4 = 3, and 7^3 ends in 3, so the answer ends in 3.
7. **Venn diagrams for syllogisms.** Draw circles for each statement. Try to draw a picture where the conclusion is false. If you can, the conclusion does not follow.
8. **Seating grids.** Draw the seats first. Put fixed facts in first ("A is at the end"). Then try the two or three possible cases side by side. Cross out a case when it breaks a rule.
9. **Elimination.** Check the options against easy tests before solving: unit digit, odd/even, too big or too small, divisibility. Often two or three options die in seconds.
10. **Triage.** Read each question for 10 seconds. Mark it Easy, Medium or Skip. Do all Easy first, then Medium. Return to Skip only if time is left. A long puzzle worth the same marks as an easy percentage question is a bad trade.

### Timed-practice routine (for every session)

1. Set a timer. Use the real pace of the target test if you know it. If you do not know it, use about 1 minute per question.
2. Do the set with no pausing and no looking up formulas.
3. Mark every question: right, wrong, skipped, or guessed.
4. For each wrong or slow question, write one line in the error log: topic, the faster method, and why you missed it.
5. Next session, start with 3 questions from the error log before the new set.
6. Track only two numbers: accuracy % and average seconds per question. Do not chase new topics until both are stable.
7. Keep the cap. If aptitude takes more than 30 minutes a day, stop. It is taking time from work that matters more for your main targets.
