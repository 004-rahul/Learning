# Complete AI, MCP and RAG learning notes

[Start here](../START_HERE.md) · [All questions](../QUESTION_INDEX.md) · [Every topic](../FULL_TOPIC_INDEX.md)

Read one question/section, close it, and explain it from memory. Reading alone does not mark a coding/design exercise complete. Every original source block has a stable ID for coverage and links. Original schedules are retained as historical context; use the revised daily tracker for execution.

<a id="S12"></a>

## S12 — 12_AI_Assisted_Development_MCP_and_RAG

Full source content: [Study-Plan/12_AI_Assisted_Development_MCP_and_RAG.docx](../SOURCE_LIBRARY/Study-Plan/12_AI_Assisted_Development_MCP_and_RAG.docx). Original wording is retained below. For conflicting statements, use the visible correction and the current execution plan.


<a id="S12-B0001"></a>

AI-Assisted Development, MCP and RAG

<a id="S12-B0002"></a>

Document 12 - A parallel track. Weekend blocks from Month 2, project in Month 7.

<a id="S12-B0003"></a>

### Why this is in the plan

<a id="S12-B0004"></a>

Three reasons, in order of importance.

<a id="S12-B0005"></a>

•  It is already on your resume. You list GitHub Copilot and Claude AI under AI-Assisted Development. An interviewer will ask about it, and "it helps me code faster" is a weak answer from a candidate at your level. You need a real position on where these tools help, where they hurt, and how you verify their output.

<a id="S12-B0006"></a>

•  "How do you use AI tools?" is now a standard question at both Google and Amazon. It probes engineering judgement, not tool familiarity. The wrong answers are equally "I do not use them" and "I use them for everything".

<a id="S12-B0007"></a>

•  RAG and MCP are the two concepts that come up most when backend engineers are asked about AI systems. Both are fundamentally backend problems - retrieval, ranking, caching, latency, protocols - which plays directly to your strengths.

<a id="S12-B0008"></a>

One thing this document is not: a machine learning curriculum. You are not becoming an ML engineer. You are becoming a backend engineer who can build and reason about systems that use models.

<a id="S12-B0009"></a>

### The hard rule about AI while studying

<a id="S12-B0010"></a>

Never use AI assistance while practising DSA, and never while doing a timed system design. It feels productive and it destroys the exact skill you are training.

<a id="S12-B0011"></a>

Retrieval practice only works when retrieval is actually happening. An AI-completed solution produces the same illusion of fluency as rereading - Doc 00 Section B1 explains why that fails. Use AI freely for the project, for explaining concepts you are stuck on after you have attempted them, and for reviewing code you already wrote. Never for producing an answer you are supposed to be generating from memory.

<a id="S12-B0012"></a>

### Track A - AI-assisted development as an engineering practice

<a id="S12-B0013"></a>

### What to learn

<a id="S12-B0014"></a>

| Topic | Substance |
| --- | --- |
| Where AI genuinely helps | Boilerplate, test scaffolding, unfamiliar API syntax, first-draft documentation, explaining unfamiliar code, refactoring with clear intent, regex, SQL translation |
| Where AI reliably hurts | Novel algorithms, security-sensitive code, anything requiring current library versions, subtle concurrency, business rules it cannot see, and any case where you cannot evaluate the output |
| The verification discipline | You own every line you commit. Read it, understand it, test it. "Copilot wrote it" is not a defence in code review or in production |
| Context engineering | Why these tools fail on large codebases, how to give them the right context, why a focused prompt with the relevant file beats a vague prompt with none |
| Review-mode usage | The highest-value pattern for a senior engineer: write it yourself, then ask the model to critique it. Inverts the risk |
| Failure modes | Hallucinated APIs, plausible-but-wrong concurrency, outdated patterns, confident nonsense on niche topics, silent security holes |

<a id="S12-B0015"></a>

### Your interview answer (draft it in Month 2, refine all the way through)

<a id="S12-B0016"></a>

Structure it as: what you use it for, what you deliberately do not use it for, and how you verify. A concrete example from your Casepoint work carries far more weight than a general opinion. Something like: used it to generate test scaffolding and to explain an unfamiliar legacy module quickly, did not use it for the retry and concurrency logic in the email pipeline because the failure modes needed reasoning it could not do, and everything it produced went through the same review and test bar as hand-written code.

<a id="S12-B0017"></a>

That answer signals judgement. "I use it for everything, it doubles my speed" signals the opposite.

<a id="S12-B0018"></a>

### Track B - LLM fundamentals (only what a backend engineer needs)

<a id="S12-B0019"></a>

| Concept | What to understand |
| --- | --- |
| Tokens | Text is split into tokens, not words. Pricing, limits and truncation are all token-based |
| Context window | The working memory of a request. Everything - system prompt, history, retrieved documents - competes for it |
| Embeddings | Text mapped to a vector such that semantic similarity becomes geometric distance. This is the foundation of RAG |
| Vector similarity | Cosine similarity, dot product, Euclidean. Why cosine is usually chosen |
| Temperature and sampling | Determinism vs variety. Why you use low temperature for extraction and classification |
| System vs user messages | Role separation and why instructions in the system message behave differently |
| Structured output | Forcing JSON conforming to a schema. The single most useful feature for backend integration |
| Function/tool calling | The model requests that your code run a function and returns the result into its reasoning. The mechanism underneath agents |
| Streaming | Token-by-token responses, and what that means for your API design and timeouts |
| Cost and latency | Per-token pricing, prompt caching, why prompt size is a performance problem |
| Hallucination | Why models produce confident wrong answers, and why grounding via retrieval is the mitigation |

<a id="S12-B0020"></a>

### Track C - RAG (Retrieval Augmented Generation)

<a id="S12-B0021"></a>

### The concept in one paragraph

<a id="S12-B0022"></a>

A model only knows what it was trained on and what you put in its context. RAG solves "answer questions about my data" by retrieving the most relevant chunks of your data at query time and putting them into the prompt as grounding. It is not fine-tuning and it is not training. It is a search problem followed by a prompting problem - which is why it is a backend engineer's territory.

<a id="S12-B0023"></a>

### The pipeline, stage by stage

<a id="S12-B0024"></a>

| Stage | What happens and what can go wrong |
| --- | --- |
| Ingest | Load documents - PDF, DOCX, HTML, code. Extraction quality sets a ceiling on everything downstream. Bad PDF parsing is the most common silent RAG failure |
| Chunk | Split into passages. Fixed size, recursive, semantic, or structure-aware. Chunk size and overlap are the highest-leverage tuning knobs. Too small loses context, too large dilutes the embedding |
| Embed | Each chunk to a vector via an embedding model. Same model must be used at query time |
| Store | Vectors plus metadata in a vector store. Index type (HNSW, IVF) trades recall against speed and memory |
| Retrieve | Embed the query, find top-K nearest chunks. K is a tuning decision |
| Rerank | Optionally re-score candidates with a stronger model. Usually the biggest single quality improvement after chunking |
| Augment | Build the prompt: instructions, retrieved context, question. Manage the context budget |
| Generate | Model answers from the provided context, and is instructed to say when the context is insufficient |
| Cite | Return sources. Non-negotiable for trust, and it makes the system debuggable |

<a id="S12-B0025"></a>

### The concepts that separate real understanding from tutorial knowledge

<a id="S12-B0026"></a>

•  Hybrid search. Pure vector search fails on exact identifiers, product codes and rare terms. Combining BM25 keyword search with vector search, fused via Reciprocal Rank Fusion, is standard practice and a strong thing to know.

<a id="S12-B0027"></a>

•  Chunking strategy is the main quality lever. More than model choice, in most systems.

<a id="S12-B0028"></a>

•  Evaluation. Retrieval metrics (recall@k, MRR) versus generation metrics (faithfulness, answer relevance). If you cannot measure it, you cannot improve it - and most RAG demos have no evaluation at all.

<a id="S12-B0029"></a>

•  The failure taxonomy. Retrieval missed the chunk; the chunk was retrieved but the answer was not in it; the answer was there and the model ignored it; the model added something not in the context. These have completely different fixes, and being able to name which one you are looking at is the mark of someone who has actually built one.

<a id="S12-B0030"></a>

•  Metadata filtering. Tenant, date, document type. In a multi-tenant system this is a security boundary, not a feature - and you already understand tenant isolation from your job platform.

<a id="S12-B0031"></a>

•  Cost and latency. Embedding at ingest is a batch cost; retrieval plus generation is per-query latency. Caching, prompt caching and reranking budgets are real engineering decisions.

<a id="S12-B0032"></a>

### Why you specifically are well-placed here

<a id="S12-B0033"></a>

RAG is a retrieval and ranking system with a model on the end. Chunking is a data-processing pipeline. Ingestion at scale is a queue and worker problem - which is literally the project you are building in Months 4-5. Multi-tenancy, caching, rate limiting and observability all transfer directly. You are not learning this from zero.

<a id="S12-B0034"></a>

### Track D - MCP (Model Context Protocol)

<a id="S12-B0035"></a>

### What it is

<a id="S12-B0036"></a>

An open protocol that standardises how applications provide context and capabilities to LLMs. Before it, every AI application wrote bespoke integration code for every tool and data source - an N times M problem. MCP turns that into N plus M: a tool exposes one MCP server, and any MCP-capable host can use it.

<a id="S12-B0037"></a>

The analogy that lands in an interview: MCP is to AI-tool integration what ODBC was to database drivers, or what the Language Server Protocol was to editor tooling. The value is not clever technology; it is that one integration works everywhere.

<a id="S12-B0038"></a>

### Architecture

<a id="S12-B0039"></a>

| Concept | What it is |
| --- | --- |
| Host | The application the user interacts with - an IDE, a desktop assistant, an agent runtime. Contains one or more clients |
| Client | Maintains a one-to-one connection with a server, handles the protocol |
| Server | Exposes capabilities. Usually a small process you write, wrapping an API, database or filesystem |
| Tools | Functions the model can invoke - model-controlled. This is the primary primitive. "Create a ticket", "run a query" |
| Resources | Data the host can read - application-controlled. Files, records, documents |
| Prompts | Reusable templates the user can invoke - user-controlled. Slash commands, essentially |
| Transport | stdio for local processes; HTTP-based transport for remote servers. Messages are JSON-RPC |
| Capability negotiation | Client and server declare what they support during initialisation |

<a id="S12-B0040"></a>

Note the three-way control distinction - model-controlled, application-controlled, user-controlled. It is the design idea most people miss, and naming it demonstrates you read the specification rather than a blog post.

<a id="S12-B0041"></a>

### The engineering questions worth having opinions on

<a id="S12-B0042"></a>

•  Security. An MCP server is remote code execution with extra steps. Authentication, authorisation, scoping, and the fact that tool descriptions are untrusted input to a model. Prompt injection via tool output is a real attack surface.

<a id="S12-B0043"></a>

•  Tool design. Too many tools confuse the model; too few make it useless. Descriptions are effectively prompts and should be written as such.

<a id="S12-B0044"></a>

•  Idempotency and side effects. A model may call your tool twice. You have already solved this pattern in your job platform.

<a id="S12-B0045"></a>

•  Error handling. Errors are read by a model, so they should be actionable in natural language, not stack traces.

<a id="S12-B0046"></a>

•  Observability. Logging what the model called, with what arguments, and what came back. Debugging agents is largely a logging problem.

<a id="S12-B0047"></a>

### The build - a RAG service in .NET (Month 7)

<a id="S12-B0048"></a>

Deliberately small. Four weekend blocks in Weeks 25-28. It is a supporting artefact, not a rival to your main project. If it starts competing with interview preparation, cut its scope, not your preparation.

<a id="S12-B0049"></a>

### Why this stack

<a id="S12-B0050"></a>

Use PostgreSQL with pgvector rather than a dedicated vector database. You already know Postgres deeply after Month 2 Week 8, it removes an entire piece of infrastructure, and "I used pgvector because operationally I would rather not run a second datastore for this scale" is exactly the kind of trade-off reasoning that scores well. It is also a genuinely common production choice.

<a id="S12-B0051"></a>

### Phases

<a id="S12-B0052"></a>

| Phase | Scope |
| --- | --- |
| 1 (Wk 25) | ASP.NET Core API. Document ingest endpoint. Text extraction. Chunking with configurable size and overlap. Store chunks in Postgres. Reuse your job platform's worker pattern for async ingestion |
| 2 (Wk 26) | Embeddings generation. pgvector column and index. Vector similarity search. POST /query returning top-K chunks with scores. No model call yet - prove retrieval works before adding generation |
| 3 (Wk 27) | Generation with grounded prompting and citations. Structured JSON output. Streaming response. "I do not know" behaviour when context is insufficient |
| 4 (Wk 28) | Hybrid search (BM25 + vector, fused). A small evaluation set of ~20 question/answer pairs with recall@k measured. Metadata filtering for multi-tenancy. Caching. README with architecture, trade-offs and evaluation results |
| Optional | An MCP server exposing your job platform as tools - submit a job, check status, inspect the DLQ. Small, and it demonstrates both protocols working together |

<a id="S12-B0053"></a>

### What makes it interview-worthy

<a id="S12-B0054"></a>

Not that it exists - RAG demos are common. What makes it worth discussing is the evaluation set and the honest numbers. Almost nobody measures. Being able to say "hybrid search improved recall@5 from 0.62 to 0.81 on my evaluation set, and reranking added another 0.06 at 200ms latency cost" puts you in a very small group.

<a id="S12-B0055"></a>

### Free resources

<a id="S12-B0056"></a>

| Resource | For |
| --- | --- |
| Microsoft Learn - AI for .NET developers learn.microsoft.com/dotnet/ai | The canonical .NET path. Microsoft.Extensions.AI, vector data abstractions, tutorials |
| Semantic Kernel docs and GitHub | Microsoft's orchestration framework for .NET. Agents, plugins, memory |
| Kernel Memory (GitHub) | Microsoft's open-source RAG service. Read the source - it is a well-built reference implementation |
| Model Context Protocol modelcontextprotocol.io | The official specification. Read the spec, not summaries of it |
| MCP C# SDK github.com/modelcontextprotocol/csharp-sdk | Build MCP servers in .NET |
| Anthropic documentation docs.anthropic.com | Prompting, tool use, structured output, context management. Applies broadly |
| pgvector github.com/pgvector/pgvector | Vector search in the database you already know |
| Anthropic and OpenAI cookbooks (GitHub) | Working patterns for RAG, evaluation and tool use |
| Free tiers | Most providers have free or low-cost tiers sufficient for a study project. Local embedding models via ONNX avoid API cost entirely |

<a id="S12-B0057"></a>

### Schedule

<a id="S12-B0058"></a>

| When | What |
| --- | --- |
| M2 Sat (one block) | Track A. Draft your "how do you use AI tools" answer |
| M3 Sat (one block) | Track B. LLM fundamentals. Tokens, embeddings, tool calling, structured output |
| M4 Sat (one block) | Track C theory. The RAG pipeline and the failure taxonomy |
| M5 | Nothing. Month 5 belongs to the main project and behavioural. Protect it |
| M7 Sat x4 | The RAG build, phases 1-4 |
| M8 | Rehearse explaining it. Optional MCP server if time genuinely allows |
