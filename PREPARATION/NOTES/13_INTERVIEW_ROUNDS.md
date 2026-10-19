# Interview rounds and delivery

[← Start here](../README.md) · [The plan](../PLAN.md) · [All notes](README.md)

Month 6 Q&A (M6) in full: coding rounds, design rounds, the loops, communication under pressure. Weeks 20–24 use this chapter.

Use it like this: read one question, close it, explain it aloud from memory, then check. Reading is not the same as knowing. ⚠️ boxes mark corrections to the original text. Sections marked ➕ were added in the final version to fill gaps.

**In this chapter:**

- PART A - Inside a coding round
- PART B - Inside a design round
- PART C - The loops themselves
- PART D - Communication under pressure
- PART E - The Month 6 checklist
- ➕ What the interview process usually looks like
- ➕ The coding round script (45 minutes)
- ➕ The system design round script (45–60 minutes)
- ➕ The LLD / machine-coding round script
- ➕ How a behavioral round flows
- ➕ Running mocks
- ➕ Interview day checklist and after-interview analysis
- ➕ Questions to ask the recruiter and the interviewers
- ➕ The application pipeline method

---

<a id="m6-part-a"></a>

## PART A - Inside a coding round

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m6-q1"></a>

#### Q1. What do you do in the first five minutes of a coding round?
Say this. Restate the problem in your own words and get agreement. Ask about input size, ranges, duplicates, empty input, and whether the input is sorted. Work through one small example by hand. Then state the brute force and its complexity. Only then start on the optimisation.
Why. Every one of those is scored. Clarifying questions demonstrate you do not build the wrong thing; the worked example catches misunderstandings before you have written code; the brute force means your optimisation is visibly a choice.
Watch out. Starting to code in the first minute is the most common self-inflicted wound. It reads as pattern-matching rather than problem-solving, even when the answer is right.
<a id="m6-q2"></a>

#### Q2. How do you think aloud without rambling?
Say this. Narrate decisions, not keystrokes. "I need fast lookup of what I have already seen, so a hash set" is a decision. "Now I am writing a for loop" is a keystroke. When you go quiet to think, say so - "give me twenty seconds to think about the edge case" - and then be quiet.
Why. Silence with no explanation reads as being stuck. Constant low-value narration is hard to follow. Announcing your silence solves both.
Watch out. Practise this from week 13, out loud, alone. It feels ridiculous and it is the difference between knowing the answer and being seen to know it.
<a id="m6-q3"></a>

#### Q3. You are stuck with fifteen minutes left. What do you actually do?
Say this. Say where you are stuck, precisely - that alone often produces a hint. Then take the brute-force solution and write it, stating that you are securing a working answer first and will optimise if time allows. A working O(n squared) beats an unfinished O(n).
Why. The interviewer needs something to evaluate. An elegant half-solution scores below a complete inelegant one, and stating your reasoning for the fallback shows time management.
Watch out. Do not go silent and keep trying. Fifteen minutes of quiet struggling produces no signal and no code, which is the worst possible outcome.
<a id="m6-q4"></a>

#### Q4. The interviewer offers a hint. How do you take it?
Say this. Take it immediately and gratefully, then think out loud about what it implies. "So you are suggesting I look at what I would need at each step - that points at keeping a running set rather than rescanning." Then act on it.
Why. Hints are part of the process; the interviewer wants you to succeed and is calibrating how much help you need. Refusing a hint or ignoring it costs far more than accepting it.
Watch out. Never argue with a hint or push past it silently. Both read badly, and the hint is usually the intended path.
<a id="m6-q5"></a>

#### Q5. How do you handle "can you make it faster?" when you think it is optimal?
Say this. Say why you believe it is optimal - "we have to look at every element at least once, so O(n) is a lower bound for time" - and then ask whether they mean space, or a different constraint. Often the question is about space or about a follow-up variation.
Why. Sometimes it is a genuine hint that a better bound exists; sometimes it is a test of whether you can defend your reasoning. Asking converts the ambiguity into information.
Watch out. Do not immediately assume you are wrong and start flailing. Confidence with a stated reason is what is being tested here.
<a id="m6-q6"></a>

#### Q6. How do you code with no autocomplete and no compiler?
Say this. Write the signature first, then the skeleton with clear names, then fill in the body. Say aloud what you would normally look up - "I think the method is TryGetValue, I would confirm the exact name". Then dry-run one small example line by line, out loud, with real values.
Why. Google interviews in a shared document. The skill being tested is whether you can hold the code in your head and verify it by reasoning rather than by running it.
Watch out. Two problems a week in a plain text editor from week 9. Candidates who only ever practise in an IDE discover this weakness during the interview, which is the worst possible time.
<a id="m6-q7"></a>

#### Q7. What is the code comprehension round and why is it good news for you?
Say this. You are shown unfamiliar code and asked to read it, explain what it does, find bugs and extend it. Google piloted it from 2026 for junior and mid-level roles in place of one coding round. It is good news because reading unfamiliar production code on a large legacy platform is literally your day job at Casepoint - and candidates grounded purely in LeetCode are weak at it.
Why. It tests something interviews historically missed and that real work is mostly made of. Your four and a half years are an advantage here rather than a neutral fact.
Watch out. Practise it: pick an open-source .NET repo, read a subsystem cold for 45 minutes, and explain aloud what it does, how, what you would change and where bugs might hide. Weeks 11, 24 and 27 have this scheduled.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Unverified] The claim that Google piloted a code-comprehension round from 2026 for junior/mid roles could not be verified. Practise code reading anyway (it helps every round), but confirm the actual round types with your recruiter.

<a id="m6-q8"></a>

#### Q8. How do you state complexity so it counts?
Say this. Unprompted, at the end, with a justification. "This is O(n) time because each element is pushed and popped at most once, and O(n) space for the stack in the worst case." Then, if relevant, note the trade you made.
Why. Waiting to be asked loses a point you could have taken. A bare "O(n)" with no reason is indistinguishable from a guess that happened to be right.
Watch out. Amortised is not average. Amortised is a guarantee across a sequence; average is expected over inputs. Using the right one is noticed.

<a id="m6-part-b"></a>

## PART B - Inside a design round

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m6-q9"></a>

#### Q9. How do you open a system design round?
Say this. Do not design anything for the first five minutes. Ask what the system must do, who uses it, roughly how many, what the read-to-write ratio is, what latency matters, and what is out of scope. Then say the scope back: "so I am designing X for Y users, optimising for Z, and I am excluding W."
Why. Designing before scoping is the fastest way to spend forty minutes on the wrong system. The scoping statement also gives the interviewer a chance to redirect you cheaply.
Watch out. "What would you like me to focus on?" is a legitimate and strong question. Most design prompts are deliberately too large for the time available.
<a id="m6-q10"></a>

#### Q10. What do you do when the interviewer says "now scale it to ten times"?
Say this. Find the component that breaks first and say so before changing anything. Usually the database on writes, or a single-instance component holding state. Then apply one fix at a time with a reason - read replicas for read load, a cache for hot keys, sharding when a single writer is the limit, a queue to absorb bursts - and say what each costs.
Why. Naming the bottleneck first shows analysis. Reciting a list of scaling techniques shows memorisation, and interviewers can tell the difference instantly.
Watch out. Every scaling move has a cost: replicas bring staleness, caches bring invalidation, sharding brings cross-shard queries and rebalancing. Say the cost each time.
<a id="m6-q11"></a>

#### Q11. How do you handle a topic inside a design you genuinely do not know?
Say this. Name the boundary and reason from what you do know. "I have not run Cassandra in production, so I will not claim specifics - but the property I need here is a wide-column store with high write throughput and tunable consistency, and I would validate that assumption before committing."
Why. Design rounds test judgement under uncertainty, which is the actual job. Confident invention is the failing answer; reasoning from properties is the passing one.
Watch out. This is more common at your level than people expect, because designs deliberately wander into unfamiliar territory. Having a script for it removes the panic.
<a id="m6-q12"></a>

#### Q12. What separates a passing design from a strong one?
Say this. The trade-offs, stated unprompted, with the alternative named. Anyone can draw boxes. A strong candidate says "I am choosing eventual consistency for the feed count, which means a user may briefly see a stale number - acceptable here, and I would not accept it for an account balance."
Why. That sentence proves you know there was a decision, you know what you gave up, and you know when the answer would be different. That is seniority in one sentence.
Watch out. If you have five minutes left and nothing else to add, spend them on trade-offs. It is the highest-scoring thing you can say.

<a id="m6-part-c"></a>

## PART C - The loops themselves

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m6-q13"></a>

#### Q13. What is the Bar Raiser looking for?
Say this. An interviewer from outside the hiring team, trained to protect the long-term hiring bar, with veto power. They will push harder than anyone else, not accept your first answer, and keep asking why until you reach the edge of your knowledge. They are calibrating depth and honesty.
Why. They are deliberately not incentivised to fill this role, so they are the check against a team hiring out of urgency.
Watch out. Reaching your limit is the design of the round, not a failure. "I do not know, but here is how I would find out" scores well. Inventing something reliably fails.
<a id="m6-q14"></a>

#### Q14. How is Amazon's loop different from Google's in practice?
Say this. Amazon weaves Leadership Principles into every round, so behavioural is roughly half your score and you can pass every coding round and still be rejected. It also tests LLD explicitly - you code a design. Google weights coding more heavily, makes system design a formal round, has a distinct Googliness round, and decides via a hiring committee that never met you.
Why. The committee is why Google feedback is written for an absent reader: consistency across rounds matters more than any single strong impression.
Watch out. Practical consequence: for Amazon, over-prepare the stories. For Google, over-practise coding without an IDE and narrating clearly.
<a id="m6-q15"></a>

#### Q15. What does the hiring committee mean for how you should answer?
Say this. Your interviewers write notes, and people who never met you read those notes. So make yourself easy to write down: state the approach clearly, name the complexity, give a number in your behavioural answers. Anything that only works through charm or tone does not survive transcription.
Why. The packet is the candidate as far as the committee is concerned. Vague brilliance reads as vague.
Watch out. This is why "seven to ten hours down to ninety minutes, about 80%" is so much stronger than "I significantly improved performance". One of those gets written down verbatim.
<a id="m6-q16"></a>

#### Q16. Why apply to mid-tier companies first?
Say this. Because interview skill is built by interviewing, and your first two loops will be your worst regardless of preparation. Spending them on companies you do not desperately want converts them from losses into free mocks - and Amazon and Google both have 6-12 month cooldowns after a rejection.
Why. The cooldown is the whole argument. A calibration interview costs you an afternoon; a wasted Amazon attempt costs you a year.
Watch out. Mid-tier companies in India commonly gate on aptitude before a human reads your code, which is why the aptitude intensive sits in weeks 21-22 and nowhere else.

> ⚠️ **Correction (final version, 19 Oct 2026):** [Nuance] Re-application cooldowns (often quoted as 6–12 months) vary by company, team and outcome. Ask the recruiter.

<a id="m6-q17"></a>

#### Q17. What aptitude do you actually need, and what can you skip?
Say this. Data interpretation is the highest-frequency section, so drill that most. Then percentages, ratios, averages, profit and loss, time-speed-distance, time and work. Skip deep verbal reasoning. Google and Amazon do not test classical aptitude at all - this is purely to get through mid-tier gates.
Why. The transferable skill is approximation: in data interpretation you rarely need an exact answer, you need to eliminate three of four options fast. That is the same skill as step 2 of a system design.
Watch out. Two focused weeks removes this risk permanently. After that it never needs this much attention again - and if you are short on time, aptitude is the first thing to cut.
<a id="m6-q18"></a>

#### Q18. How do you analyse an interview afterwards?
Say this. Within 24 hours, in writing: company, round, questions as close to verbatim as you can remember, what went well specifically, the precise moment you stalled, and the root cause. Then a named repair action with a date.
Why. The root cause is the only field that matters. "I failed the DSA round" is useless. "I did not recognise it as a monotonic stack problem and burned twenty minutes on brute force" is repairable and schedulable.
Watch out. If the same root cause appears three times, your repair method is wrong, not your effort. Change the method - stop solving graph problems and instead implement BFS, DFS, topological sort and union-find from scratch until they are automatic.

<a id="m6-part-d"></a>

## PART D - Communication under pressure

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*

<a id="m6-q19"></a>

#### Q19. Your English stalls mid-answer. What do you do?
Say this. Stop, and restart the sentence. Do not try to rescue a sentence that has gone wrong - short sentences are clearer and much harder to lose your thread in. "Let me say that more simply" is a perfectly professional thing to say and buys you the reset.
Why. Interviewers are assessing whether they can understand your technical reasoning, not your grammar. A short correct sentence beats a long tangled one every time.
Watch out. Build a phrase bank you can deploy without thinking: "Let me clarify the requirements first", "The trade-off here is", "My initial approach would be brute force, then I would optimise by", "Let me walk through an example to validate this".
<a id="m6-q20"></a>

#### Q20. How long should an answer be?
Say this. Answer, then stop. Most answers are 30 to 90 seconds; a STAR story is under three minutes. The most common mistake is continuing to talk after you have finished, because silence feels like failure. Silence is the interviewer's job to fill, not yours.
Why. Over-talking dilutes a good answer and often walks you into a weaker area you were not asked about.
Watch out. Practise the stop. Record yourself and listen for where the answer actually ended versus where you stopped talking - the gap is usually large.
<a id="m6-q21"></a>

#### Q21. How do you recover an answer that has gone badly?
Say this. Name it and reset. "I do not think I explained that well - the core point is..." then give the one-sentence version. Interviewers respect the self-correction; it reads as self-awareness rather than weakness.
Why. They are scoring your reasoning, not your first attempt at expressing it. A clean recovery is itself a positive signal.
Watch out. Do not apologise repeatedly or comment on your own nerves. One reset, then move on.
<a id="m6-q22"></a>

#### Q22. What do you do in the last five minutes when they ask if you have questions?
Say this. Always have four or five ready, and ask them. Having none signals you are not evaluating them, which weakens your position. Ask about the stack and what is changing, how ownership is divided, what success looks like in six months, and the biggest technical challenge the team faces right now.
Why. It is also your only chance to gather information for a decision you may have to make under time pressure later.
Watch out. For a role you might transfer out of, slip in the mobility question casually: "how many people have moved from the India office to an overseas team in the last couple of years?" That answer tells you the truth - Doc 14 has the full list.
<a id="m6-q23"></a>

#### Q23. How do you handle a panel or back-to-back onsite fatigue?
Say this. Treat each round as independent and reset deliberately between them - water, two minutes of quiet, do not replay the previous round. Round four is scored the same as round one, and a candidate who fades is a candidate who scores worse in the afternoon.
Why. Fatigue is a real and under-practised variable. It is why week 31 has two full mock loops in one day.
Watch out. If a previous round went badly, do not mention it in the next one. Each interviewer scores independently and does not know.
<a id="m6-q24"></a>

#### Q24. What is the single highest-value habit this month?
Say this. Writing the analysis after every interview within 24 hours, with a named root cause. It is what turns interviews into a learning loop rather than a lottery. People who interview for a year without improving are almost always the people who never wrote the analysis.
Why. Without a root cause there is no repair, so the same failure recurs with a different question attached and it feels like bad luck.
Watch out. The INTERVIEWS tab of the tracker has the exact columns. Fill it in on the train home, while it is still fresh - that is a perfect use of your commute.

<a id="m6-part-e"></a>

## PART E - The Month 6 checklist

*Source: Q-and-A/M6_Interview_Rounds_and_Delivery.docx. Original wording kept below; ⚠️ boxes are corrections added in the final version.*


| # | True? |
|---|---|
| 1 | Solving medium problems in under 25 minutes, consistently, narrating throughout |
| 2 | Can hold a 45-minute design conversation without freezing or running dry |
| 3 | At least 4 external mocks done |
| 4 | Can code in a plain text editor without it slowing me down badly |
| 5 | All 20 stories rehearsed, randomised, under 3 minutes each |
| 6 | A real answer for every high-frequency Amazon principle |
| 7 | Applied to Amazon and Google |
| 8 | Pipeline still active - 2-3 applications a week going out |
| 9 | Every real interview analysed in writing with a named root cause |

On rejection. You will be rejected this month, probably several times, possibly by Amazon or Google. That is the expected outcome of the calibration strategy, not evidence the plan failed. Both allow reapplication after a cooldown, and months 7 and 8 exist to convert the pipeline you are building now. Every rejection that produces a named, repaired gap has done its job.

<a id="add-int-process"></a>

## ➕ What the interview process usually looks like

**Important:** formats change by company, team, location and year. Everything below is a common *pattern*, not a promise. Confirm the exact rounds for your loop with the recruiter every time.

### The usual stages for a backend SDE-2-level role

| Stage | What usually happens | What it checks |
|---|---|---|
| Recruiter screen | 15–30 min call. Your background, role fit, notice period, salary range, location. | Basic fit, communication, logistics. |
| Online assessment (OA) | Timed coding problems on a platform. Some companies add MCQs, debugging, aptitude, or work-style questions. Not every company uses an OA. | Can you solve problems alone under time pressure? |
| Technical phone/video screen | One interviewer, often 45–60 min. Usually one or two coding problems in a shared editor. Sometimes a few questions about your projects. | Coding plus communication. Decides if you go to the loop. |
| Onsite or virtual loop | Several back-to-back interviews, often on one day or spread over a few days. | The full picture. |
| — Coding | One or more rounds of DSA problems. | Problem solving, clean code, testing, complexity. |
| — System design | Design a service at a high level. At SDE-2 level this is commonly expected (verify per company). | Scoping, trade-offs, scaling, data modelling. |
| — LLD / machine coding | Design classes for a small system, sometimes write working code in 60–90 min. Common at many Indian product companies; at others it appears as "object-oriented design" (verify). | OOP, clean structure, extensibility. |
| — Behavioral | Past-experience questions. At Amazon these follow the Leadership Principles and also appear inside technical rounds. | Ownership, conflict, impact, honesty. |
| — Hiring manager | Mix of behavioral, project depth and team fit. Sometimes includes design. | Would they want you on their team? |
| Debrief / committee | Interviewers compare notes. Some companies use a separate committee. | You are not present. |
| Offer / team match | Compensation discussion; some companies match you to a team after passing. | — |

### Official prep pages (read them, they change)

- Amazon SDE II interview prep: https://www.amazon.jobs/content/en-gb/how-we-hire/sde-ii-interview-prep — describes Amazon's own process for SDE II, including the assessment, the interview loop, system design and the Leadership Principles. Read the current page before your loop (verify details there, not here).
- Microsoft technical interviewing tips: https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html — Microsoft's advice on what technical interviews assess (problem solving, design, coding, testing) and how to prepare.
- For other companies: search the company's careers site for "interview prep" or "how we hire". Use candidate reports (forums, Glassdoor, LeetCode Discuss) only as hints. They are often old and from other levels or countries.

### What to do with this

1. When a recruiter contacts you, ask for the exact list of rounds (see the recruiter questions section).
2. Write the list in your tracker for that company.
3. Map each round to your prep: coding → DSA chapter; design → system design chapter; LLD → LLD chapter; behavioral → stories.
4. If a round type is new to you (for example machine coding), do at least one timed mock of that exact type before the real one.

<a id="add-int-coding-script"></a>

## ➕ The coding round script (45 minutes)

This is a minute-by-minute plan with the sentences to say. Part A above explains *why* each step matters. Here you learn *what to say*. Practise these sentences aloud until they are automatic. Simple sentences are perfect.

Assumption: a 45-minute round with about 5 minutes of introductions and 5 minutes of your questions at the end. If the round is 60 minutes, give the extra time to optimise, code and test.

### Minute by minute

| Time | Step | What you do |
|---|---|---|
| 0–2 | Intro | Short hello. Your 30-second background only if asked. |
| 2–6 | Clarify | Restate the problem. Ask about input, size, edge cases. |
| 6–9 | Examples | Walk one normal example and one edge case by hand. |
| 9–12 | Brute force | Say the simple solution and its complexity. Do not code it yet. |
| 12–18 | Optimise | Find the better approach. Get the interviewer's agreement. |
| 18–32 | Code | Write clean code while explaining decisions. |
| 32–38 | Test | Dry-run with the examples. Fix bugs. Check edge cases. |
| 38–40 | Complexity | State time and space with reasons. |
| 40–45 | Follow-up / questions | Answer a follow-up, or ask your questions. |

### Sentences for each step

**Intro (0–2)**
- "Hi, nice to meet you. I am Rahul. I am a backend engineer working mostly in C# and .NET."
- "Shall I start with the problem?"

**Clarify (2–6)**
- "Let me repeat the problem to check I understood it. We get ___, and we need to return ___. Is that right?"
- "What is the size of the input? Roughly how many elements?"
- "Can the input be empty? Can it have duplicates? Negative numbers?"
- "Is the input sorted?"
- "If there is no valid answer, what should I return?"
- "Can I change the input, or should I keep it unchanged?"
- "Which language should I use? I prefer C#, if that is OK."

**Examples (6–9)**
- "Let me try a small example by hand. Input ___. The answer should be ___ because ___."
- "Now an edge case: an empty array. I think we return ___. Do you agree?"

**Brute force (9–12)**
- "The simple way is to check every pair. That is O(n squared) time and O(1) space."
- "That works, but it is slow for large input. Let me think about something faster."

**Optimise (12–18)**
- "The slow part is ___. I am repeating the same work."
- "If I store what I have already seen in a hash set, I can check in O(1). That gives O(n) time and O(n) space."
- "Give me 20 seconds to think about this." (then be quiet and think)
- "Does this approach sound good to you before I start coding?"

**Code (18–32)**
- "I will start with the method signature."
- "I am using a dictionary here because I need fast lookup by key."
- "This loop moves the right pointer; the left pointer moves only when the window becomes invalid."
- "I am not sure of the exact method name. I think it is `TryGetValue`. In real work I would check it."
- "I will write a small helper for this part to keep the main method clean."

**Test (32–38)**
- "Now let me test it with the example. i = 0, value 3. The set is empty, so I add 3..."
- "Let me check the edge cases: empty input, one element, all the same values."
- "I found a bug. Here the index should be `i - 1`, not `i`. Let me fix it."

**Complexity (38–40)**
- "Time is O(n), because each element goes in and out of the set at most once."
- "Space is O(n) for the set in the worst case."
- "If memory were tight, I could sort first and use two pointers: O(n log n) time and O(1) extra space."

### How to handle hints

1. Stop and listen fully. Do not talk over the interviewer.
2. Repeat the hint in your words: "So you are saying I can use the fact that the array is sorted?"
3. Say what it means for your solution: "That means I can use binary search instead of a linear scan."
4. Thank them briefly and continue: "Thanks, that helps. Let me update the approach."
5. Do not argue. If you think your way also works, say it once: "I think my approach also works. Shall I continue with it, or would you like me to try yours?"

### How to handle being stuck

- Say exactly where you are stuck: "I can find the answer for one window, but I do not see how to update it quickly when the window moves."
- Go back to a small example and do it by hand. Patterns often appear on paper.
- Try the usual tools in order: sort, hash map, two pointers, sliding window, stack, heap, BFS/DFS, binary search, DP.
- Time rule: if you have no better idea by minute 20, code the brute force. Say: "I will code the brute force first so we have a working solution. Then I will try to optimise if time allows."

### How to handle bugs

- Do not panic, and do not delete everything. Most bugs are off-by-one, a missing edge case, or a wrong variable.
- Say: "The output is wrong for this input. Let me trace it." Then trace with real values, line by line.
- When you find it: "Found it. I did not handle the last element after the loop. I will add that."
- If the interviewer points out a bug: "You are right, thank you. Let me fix it." Then re-test that case.

### If you finish early

- "I have some time left. Shall I discuss a follow-up, like very large input that does not fit in memory, or many queries on the same data?"
- Improve names, add input validation, or discuss how you would unit-test it.

<a id="add-int-design-script"></a>

## ➕ The system design round script (45–60 minutes)

Times below are for about 45 minutes of design time. For 60 minutes, add the extra time to the deep dive. Part B above explains the ideas. Here are the steps and sentences.

### Minute by minute

| Time | Step | Output on the whiteboard |
|---|---|---|
| 0–5 | Requirements | A list: functional, non-functional, out of scope |
| 5–9 | Estimates | A few numbers: QPS, storage, read/write ratio |
| 9–13 | API | 3–5 endpoints with inputs and outputs |
| 13–17 | Data model | Main tables/entities and the key access patterns |
| 17–27 | High-level design | Boxes and arrows for the main flow |
| 27–40 | Deep dive | 1–2 hard parts in detail |
| 40–45 | Bottlenecks, failures, trade-offs, summary | A short list of risks and choices |

### Sentences for each step

**Requirements (0–5)**
- "Before I design anything, I want to agree on the scope."
- "Who are the users, and what are the two or three most important things they do?"
- "Roughly how many users, and how many requests per day?"
- "Is it read-heavy or write-heavy?"
- "What matters more here: low latency, strong consistency, or high availability?"
- "Is ___ in scope, or can I leave it out?"
- "So, to summarise: I am designing ___ for about ___ users. The main flows are ___ and ___. I will focus on ___ and leave out ___. Is that OK?"
- "Which part would you like me to focus on most?"

**Estimates (5–9)**
- "Let me do a quick estimate. 10 million daily users times 20 requests is 200 million a day. A day has about 100,000 seconds, so about 2,000 requests per second on average. Peak maybe 3 times that, so about 6,000."
- "Each record is about 1 KB, so 1 million writes a day is about 1 GB a day, about 365 GB a year before replication."
- "These numbers tell me a single database can handle the writes, but reads need caching."

**API (9–13)**
- "Here are the main APIs. `POST /jobs` takes ___ and returns a job id. `GET /jobs/{id}` returns the status."
- "Writes take an idempotency key, so a client retry does not create a duplicate."

**Data model (13–17)**
- "The main entities are ___ and ___. The most common query is 'get ___ by ___', so I will index on ___."
- "I will start with PostgreSQL because I need transactions here. If scale needs it, I would partition by ___."

**High-level design (17–27)**
- "Let me draw the main flow first. The client calls the API through a load balancer. The API service is stateless, so we can add more instances."
- "The API writes to the database and puts a message on a queue. Workers read from the queue and do the slow work."
- "Let me walk one request through the whole system from start to end."

**Deep dive (27–40)**
- "I think the hardest part is ___. Shall I go deeper there, or would you prefer another area?"
- "There are two options. Option A is ___; it is simple, but ___. Option B is ___; it scales better, but it costs ___. For this system I choose ___ because ___."
- "If a worker crashes in the middle of a job, the message becomes visible again after a timeout, and another worker picks it up. That is why the job handler must be idempotent."

**Bottlenecks, failures, trade-offs (40–45)**
- "The first thing to break at 10 times the load is ___. I would fix it with ___, and the cost is ___."
- "If the cache goes down, reads go to the database. I would protect the database with rate limiting and request coalescing."
- "The main trade-off I made is ___. I accepted ___ because ___."
- "To summarise: ___. If I had more time, I would look at ___."

### When the interviewer interrupts or changes the requirements

- Do not defend the old design. Say: "Good point. That changes ___. Let me update the design."
- If you do not understand the question: "Sorry, can you say that in another way? Do you mean ___ or ___?"
- If you do not know a technology: use the boundary sentence from Q11 above, then reason from the property you need.

### Common mistakes to avoid

- Drawing boxes before agreeing on scope.
- Naming technologies without a reason ("Kafka, Redis, Cassandra") — every box needs a "because".
- Spending 20 minutes on one small detail and never reaching failures and trade-offs.
- Going silent while drawing. Narrate: "Now I am adding a cache in front of the database for the read path."

<a id="add-int-lld-script"></a>

## ➕ The LLD / machine-coding round script

Two common forms (verify which one with the recruiter):
- **LLD discussion (45–60 min):** classes, relationships and key methods on a whiteboard or in an editor. Little or no running code.
- **Machine coding (60–120 min):** you write working code for a small system (for example a parking lot, rate limiter, library system, or splitting expenses). Sometimes reviewed later in a separate discussion.

### Plan for a 90-minute machine-coding round

| Time | Step |
|---|---|
| 0–10 | Clarify requirements; write them as a short list in the editor as comments |
| 10–20 | Entities, relationships, main interfaces; agree with the interviewer if present |
| 20–70 | Code in layers: models → core service logic → simple in-memory storage → a small driver/demo |
| 70–80 | Run it with a demo scenario and edge cases; fix bugs |
| 80–90 | Explain design choices, patterns used, and how to extend it |

For a 45–60 min LLD discussion, compress: clarify 5–7 min, entities and classes 15 min, key flows and code for 1–2 methods 15–20 min, extension and trade-offs 10 min.

### Sentences for each step

**Clarify**
- "Let me list the features I will build. Please tell me if anything is missing or not needed."
- "Should the data be in memory, or do you want a database?"
- "Is it single-threaded, or do I need to handle many users at the same time?"
- "Do you want a working demo from a `Main` method, or tests?"
- "I will first build the core features, and add ___ only if time allows."

**Entities and design**
- "The main entities are ___, ___ and ___. A ___ has many ___."
- "I will put the pricing rule behind an interface, `IPricingStrategy`, so we can add new rules without changing the main class. That is the Strategy pattern."
- "The service class holds the business logic. The repository holds the storage. That keeps them easy to test and change."

**Coding**
- "I will start with the models, then the service, then a small demo."
- "I am keeping the storage in memory behind an `IRepository` interface, so later we can swap in a database."
- "Here I validate the input and throw a clear exception if the slot is already taken."
- "For thread safety, I will lock around this check-and-update, because two users could book the same slot at the same moment."

**Run and test**
- "Let me run the demo: create a parking lot with 2 slots, park 3 cars. The third should fail with 'no slot available'."
- "Now the edge case: remove a car that is not parked. It should return a clear error."

**Explain and extend**
- "If we need a new vehicle type, we add one class and one rule. Nothing else changes."
- "If this became a real service, I would move storage to a database, add an API layer and handle concurrency with database constraints."

### What interviewers usually look for

- Working code for the core features (in machine coding, working code beats a perfect half-design).
- Clear names, small classes, single responsibility.
- Interfaces where change is likely; no patterns added "just to show".
- Correct handling of errors and edge cases.
- Being able to extend it quickly when they add a new requirement.

### Common mistakes

- Designing 15 classes and finishing none. Build the core first, then extend.
- Putting all logic in `Main` or one giant class.
- Ignoring concurrency when the interviewer said "many users".
- Not running the code before time ends.

<a id="add-int-behavioral-script"></a>

## ➕ How a behavioral round flows

### The usual flow (45–60 min)

| Time | What happens |
|---|---|
| 0–5 | Intro. Often "Tell me about yourself" or "Walk me through your current role". |
| 5–40 | 2–4 main questions. Each one gets 5–10 minutes: your story, then several follow-up questions. |
| 40–45+ | Your questions for them. |

Key point: the **follow-ups** are where you are really scored. Your first 2–3 minutes give the story. The next 5 minutes test whether it is real, whether *you* did it, and how deep your thinking was.

### Your answer shape

- **Situation (1–2 sentences):** "In my team at ___, we had ___."
- **Task (1 sentence):** "I was responsible for ___."
- **Action (most of the time):** "First I ___. Then I ___. I chose ___ because ___." Use "I", not "we", for your own actions.
- **Result (1–2 sentences, with a number if real):** "As a result, ___. I measured it by ___."
- **Learning (1 sentence):** "What I learned was ___, and since then I ___."

Stop after the result and learning. Let them ask.

### Common follow-up probes and how to handle them

| Probe | What they want | How to answer |
|---|---|---|
| "What exactly did *you* do?" | Your personal part, not the team's | Give 2–3 concrete actions with "I". If others did parts, say so honestly. |
| "Why did you choose that approach?" | Your reasoning | Name the options you considered and why you picked one. |
| "What would you do differently?" | Self-awareness | One real thing, specific, not "nothing". |
| "How did you measure the result?" | Whether the number is real | Explain the source: logs, dashboards, ticket counts. If you estimated, say "approximately, based on ___". |
| "What did your manager / the other person say?" | Whether the story is real and how you handle people | Describe their real view, even if they disagreed. |
| "What if they had said no?" | Judgement and flexibility | Explain your fallback plan or how you would escalate. |
| "Tell me about a time it did not go well." | Honesty, learning | Use a real failure. Own your part. Focus on what changed after. |
| "Can you give another example?" | Your story did not show the trait clearly | Switch to a different story. Do not stretch the same one. |

### Sentences that help

- "Let me think for a moment about the best example." (5 seconds of silence is fine)
- "I have two examples. One is about ___, one is about ___. Which would be more useful?"
- "To be honest, I was not the lead on that part. My part was ___."
- "I do not remember the exact number. It was roughly ___, and I can explain how we measured it."
- "Is that the level of detail you want, or should I go deeper into ___?"

### Rules

- Never invent or borrow a story. Deep follow-ups expose made-up details quickly.
- Keep each first answer under 3 minutes (see Q20).
- If you are asked about something you have never done ("Tell me about leading a team of 10"), say so and give the closest real example: "I have not led a team of 10. The closest is when I led ___ with two other engineers."
- Prepare each story so it can answer several questions (conflict, ownership, failure, deadline). Your story bank is in the behavioral chapter.

<a id="add-int-mocks"></a>

## ➕ Running mocks

A mock is a full practice interview under real conditions: a timer, a fresh problem, talking aloud, no help. Solving problems alone is not the same skill. Mocks train the delivery.

### Three kinds of mock

**1. Self-mock (free, any time)**
- Pick a problem you have not seen. Use a random pick from your list so you cannot prepare.
- Set a 45-minute timer. Use a plain editor (no autocomplete) for at least half of them.
- Record your screen and voice (any free screen recorder, or a video call recorded to yourself).
- Follow the coding script above step by step, out loud, as if someone is listening.
- Afterwards, watch the first 10 minutes and the last 10 minutes at 1.5x speed. Fill the feedback form below about yourself.
- For design: pick a prompt, talk for 45 minutes, draw on a free whiteboard tool, record it.

**2. Peer mocks (free)**
- **Pramp** was folded into **Exponent** (tryexponent.com). Peer mock sessions were still offered there in 2026, but free limits and terms change. Check the current free offering before planning around it (verify).
- Friends or ex-colleagues preparing for interviews. Swap: you interview them for 45 minutes, they interview you for 45 minutes.
- Online communities (LeetCode Discuss, Discord or Telegram study groups) often have people looking for mock partners.
- Being the interviewer is also useful practice. You see what clear and unclear answers look like.

**3. Paid mocks (optional)**
- Paid platforms offer mocks with experienced interviewers, sometimes from big tech. They can give sharper feedback, especially for system design.
- They are optional. Free self-mocks and peer mocks cover most of the benefit. If you pay for any, spend it on system design or a final loop simulation, close to real interviews. Check current prices and reviews yourself (verify).

### Mock feedback form (10 criteria)

Score each 1–4: 1 = weak, 2 = needs work, 3 = good, 4 = strong. Add one line of evidence for every score below 3. Use the same form for self, peer and paid mocks so scores are comparable.

| # | Criterion | What "4" looks like |
|---|---|---|
| 1 | Clarifying questions | Restated the problem; asked about size, edge cases, output format before solving |
| 2 | Examples | Worked a normal example and an edge case by hand |
| 3 | Approach | Stated brute force, then found a better approach with a clear reason |
| 4 | Communication | Explained decisions, not keystrokes; announced silences; easy to follow |
| 5 | Code quality | Clean names, small helpers, correct language use, no messy fixes |
| 6 | Correctness | Code worked for the main case and edge cases |
| 7 | Testing | Dry-ran with real values; found and fixed own bugs |
| 8 | Complexity | Stated time and space with justification, without being asked |
| 9 | Time management | Working solution before time ran out; no long stuck periods |
| 10 | Handling hints / pressure | Used hints quickly; stayed calm; recovered after mistakes |

For design mocks, replace 5–8 with: requirements and scope, estimates, high-level design, deep dive and trade-offs.

At the bottom of the form write:
- **Biggest single problem:** ___
- **One thing to keep doing:** ___

### Turning feedback into repair tasks

Feedback is useless until it becomes a task with a date.

1. Take every criterion scored 1 or 2.
2. Find the root cause, not the symptom. "Bad at testing" is a symptom. "I stop after writing code because I feel time pressure" is a root cause.
3. Write one repair task per root cause: specific, small, with a date. Examples of the *shape* of a repair task:
   - "For the next 5 problems, dry-run with real values before saying 'done'. By (date)."
   - "Practise the clarify sentences aloud before each problem for a week."
   - "Re-solve 3 sliding-window problems in a plain editor by (date)."
4. Add the topic to your Weak List if the problem was a knowledge gap.
5. In the next mock, check the same criteria first. If a score did not improve after two mocks, change the repair method, not just the effort (see Q18).

### Mock schedule

| Weeks | Frequency | Mix |
|---|---|---|
| Week 8 | First mock | One coding self-mock, recorded. Expect it to feel bad; that is the point. |
| Weeks 12, 16, 20 | Monthly | Alternate coding and design. Add at least one peer mock by week 16. |
| Weeks 21–32 | Weekly | Rotate: coding, design, LLD/machine coding, behavioral. At least every second one with a peer. Before a real loop, one full loop simulation (several rounds in one day). |

Log every mock in the tracker: date, type, scores, biggest problem, repair task.

### Practical tips

- Use a problem you have **not** solved before. A memorised problem gives false confidence.
- Turn off AI assistants and autocomplete during mocks. Real interviews usually do not allow them (verify per company).
- Practise in the same setup as the real interview: same headset, same camera position, same type of editor.
- Ask peers for direct feedback: "What was the one moment you were most worried about me?"

<a id="add-int-day"></a>

## ➕ Interview day checklist and after-interview analysis

### The day before

- [ ] Confirm the time **in your time zone**. Many invites from abroad show the company's zone. Convert it and put it in your calendar with a reminder 60 and 15 minutes before.
- [ ] Confirm the platform and link (video tool, shared editor, whiteboard tool). Open the link once to check it works.
- [ ] Ask (or re-read the email): which language, which editor, can code be run, are notes allowed, are AI tools allowed. If not stated, assume no notes and no AI.
- [ ] Prepare your 30-second intro and 3 questions for the end.
- [ ] Charge laptop and headset. Install updates now, not tomorrow morning.
- [ ] Sleep. Do not start new topics the evening before.

### One hour before

- [ ] **Environment:** quiet room, door closed, family or flatmates informed. Phone on silent and out of reach.
- [ ] **Internet:** check speed. Keep a phone hotspot ready as backup.
- [ ] **Mic and camera:** test in the actual video tool. Face clearly lit from the front, plain background, camera at eye level.
- [ ] **Editor:** if you choose the editor, open it with a blank C# file, font size large. Turn off AI assistants unless the company explicitly allows them.
- [ ] **Water** within reach. A pen and blank paper for drawing examples (if paper is allowed; ask if unsure).
- [ ] **Notes:** only if the company allows them. If not, put them away so you are not tempted to look.
- [ ] Close all other apps and notifications (chat, email, updates).

### 20 minutes before: 10-minute warm-up

- Solve one **easy** problem you have solved before (for example two-sum or valid parentheses), out loud, in 10 minutes, using the full script: clarify, example, approach, code, test, complexity.
- The goal is not learning. The goal is to start your brain and your English before the real round.
- For a design round: do a 2-minute estimate out loud instead.
- Then stop. Drink water. Join the call 2–3 minutes early.

### During the day (multiple rounds)

- Between rounds: water, stand up, two minutes quiet. Do not replay the last round (see Q23).
- Write 3–4 words about each round's questions in the break, so you can write the full analysis later.

### After the interview: analysis within 24 hours

Write this the same day if possible. Part C (Q18) explains why the root cause is the key field. Use this template, one per round:

| Field | What to write |
|---|---|
| Company | Name and role |
| Date | Date of the interview |
| Round | Type (OA / phone screen / coding / design / LLD / behavioral / manager) and interviewer level if known |
| Questions verbatim | The questions as close to the exact words as you remember, including follow-ups |
| What went well | Specific moments, e.g. "clarified the duplicate case early" |
| What went badly | Specific moments, e.g. "stuck 12 minutes on updating the window" |
| Root cause | The real reason, e.g. "did not recognise the monotonic-stack pattern" or "did not test before saying done" |
| Repair (with date) | One concrete task and the date it will be done |
| Weak-list additions | Topics or patterns to add to your Weak List |
| Feeling and result | Your guess (pass/unsure/fail) and later the real result, to learn how well you judge yourself |

Then:
- Do the repair task on the date you wrote.
- Do not post the exact questions publicly if the company asked you not to share them (check any agreement you accepted).
- Send a short thank-you to the recruiter if you have their email. It is polite, not required.

<a id="add-int-recruiter"></a>

## ➕ Questions to ask the recruiter and the interviewers

### Questions for the recruiter (ask early, write the answers in your tracker)

Recruiters want you to succeed. Most will answer these clearly. Ask by email if the call is fast, so you have the answers in writing.

**Process**
1. "Can you tell me the exact rounds in this process, in order, and how long each one is?"
2. "Is there an online assessment? What does it include: coding only, or also MCQs, aptitude or work-style questions?"
3. "Which rounds are coding, system design, low-level design or machine coding, and behavioral?"
4. "What is the typical timeline from now to a decision?"

**Tools and format**
5. "Can I use C# in all coding rounds?"
6. "Which editor or platform is used? Can I run the code, or is it a plain shared document?"
7. "What is the policy on AI tools during the interview? Are they allowed in any round?"
8. "Are notes allowed during any round?"

**Role**
9. "Which level is this role? How does it map to SDE-2?" (Level names differ between companies.)
10. "Is this for a specific team, or is there team matching after the interviews? What does the team work on?"
11. "Is there any preparation material you recommend?"

**If relevant**
12. "Does this role, or the company, support relocation or internal transfers to other countries? Is that something to discuss now or after an offer?"

Also tell the recruiter early if you need any accommodation, or if you have another offer with a deadline. Both can change the timeline.

### Six good questions to ask interviewers at the end

Part D (Q22) already lists questions about the stack, ownership, six-month success and the biggest challenge. Here are six more, so you have variety across a loop. Ask different ones to different interviewers.

1. "What does a normal week look like for an engineer on this team: how much is new features, maintenance, on-call and meetings?"
2. "How does code get from a pull request to production here? How long does that usually take?"
3. "How does the team handle on-call and production incidents? What happens after an incident?"
4. "How are technical decisions made, for example choosing a new database or library? Who has the final say?"
5. "What do new engineers usually find hardest in their first three months here?"
6. "What is something you would like to change about how the team works?"

Tips:
- Listen to the answer and ask one short follow-up. It shows interest and gives you real information.
- Do not ask about salary or leave policy with technical interviewers. Keep that for the recruiter.
- If time is short, ask one question, not five.

<a id="add-int-applications"></a>

## ➕ The application pipeline method

Treat applications like a sales pipeline: a list of targets, steady activity every week, and tracking. Part C (Q16) explains why lower-stakes companies come first. Here is the method.

### Step 1: build a tiered target list

Make a list of 30–60 companies. Put each one in a tier.

| Tier | Who | Purpose | When |
|---|---|---|---|
| Tier 3: calibration | Companies you would accept, but they are not your dream | Real interview practice; learn formats | First |
| Tier 2: strong targets | Good product companies where you would be happy | Real offers | Middle |
| Tier 1: dream targets | Amazon, Google, Microsoft and similar | Your main goal | After calibration, when mocks are consistently good |

For each company record: tier, role link, location, level, known rounds (verify with recruiter), referral contact, status.

### Step 2: referrals

A referral usually gets your resume read by a person faster. It does not guarantee an interview.

How to ask:
1. Find people at the company: ex-colleagues, college alumni, LinkedIn connections, people from communities you are active in.
2. Pick a specific job posting first. People can refer you to a role much more easily than to "any job".
3. Send a short, polite message. Make it easy for them: give the job link, your resume, and 2–3 lines about fit.
4. If they do not reply in about a week, send one polite follow-up. Then stop.
5. Thank them whatever happens, and tell them the result later.

Message template (fill every placeholder with real facts):

> Hi [Name],
>
> I hope you are well. I am [your name], a backend engineer with [X] years in C# and .NET at [current company]. [One line of connection, e.g. "We worked together at ___" / "I am also from ___ college" / "I read your post about ___"].
>
> I am applying for [role title] at [company]: [job link]. My background fits because [one real reason, e.g. "I build and run ___"].
>
> Would you be comfortable referring me? I have attached my resume. If it helps, I can also send a short summary for the referral form.
>
> Thank you either way,
> [Your name]
> [LinkedIn link]

### Step 3: tracking

Use one sheet (your tracker's applications tab). One row per application.

| Column | Example of what to write |
|---|---|
| Company / role / link | ___ |
| Tier | 1 / 2 / 3 |
| Source | Referral / direct / recruiter reached out |
| Date applied | ___ |
| Current stage | Applied / OA / screen / loop / offer / rejected / no reply |
| Next action and date | "Follow up with recruiter on ___" |
| Rounds (confirmed) | From the recruiter |
| Notes | Recruiter name, salary range discussed, deadlines |

Weekly review (15 minutes, same day each week): update stages, send due follow-ups, add new applications to keep the target number for the current month (see the plan).

### Step 4: calibrate with lower-stakes interviews first

- Start with Tier 3. Your first real interviews will have nerves and surprises that mocks do not show.
- After each one, write the analysis (template above) and do the repairs.
- Move to Tier 1 when: your mock scores are mostly 3–4, you have done at least one or two real loops, and your repeated root causes are fixed.
- Keep a few Tier 2/3 processes running while doing Tier 1. More options mean less pressure in each interview.

### Step 5: follow-up timing

- After applying with no response: there is usually nothing to do. Apply elsewhere. A referral contact can sometimes check status after 1–2 weeks.
- After a recruiter call: if they promised a next step and nothing comes, follow up politely after about one week.
- After an interview: if the recruiter gave a date and it passes, follow up 1–2 working days later. If no date was given, about one week.
- Short follow-up: "Hi [Name], thank you again for the interview on [date]. I wanted to check if there is any update on the next steps. I am still very interested in the role."
- If you get another offer with a deadline, tell your other recruiters quickly and politely. Some can speed up.

### Step 6: handling rejection

- Expect rejections. They are normal, even for strong candidates.
- Reply politely. You may apply again later, and recruiters remember.
- Ask once for feedback: "Is there any feedback you can share that would help me improve?" Many companies cannot share details. Do not push.
- Do your own analysis within 24 hours anyway. Your notes are more useful than most feedback.
- Then take one evening off, and go back to the plan the next day.

### Re-application timing

- Many large companies have a waiting period before you can interview again for a similar role. The length is company-specific and can depend on the role, team and how far you got. Ask the recruiter directly: "If this does not work out, when could I apply again?" (verify per company; also see the correction under Q16).
- Write the re-application date in your tracker so you do not apply too early or forget.
- Use the gap to fix the root causes from your analysis, so the next attempt is clearly stronger.
