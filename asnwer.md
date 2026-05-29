"Hi, my name is Asish Kumar Dalal and this is my Pipeline Builder project. Let me Show the interface .
the interface:
"So when you first open the app, you see three main sections. At the top is the toolbar with all the available node types. In the middle is the canvas where you build your pipeline. And at the bottom there is the submit section with two buttons — Analyze and Run Pipeline."

"The toolbar has 9 different node types: Input, LLM, Output, Text, Math, Filter, Merge, Split, and Transform. Each one does something different."

BULIDING A PIPELINE.
Let me show you how to build this pipeline step by step.”

“First, I will drag a Text node onto the canvas.”

“Inside this node, I’ll type the system instruction:”

‘You are a helpful assistant.’

“Now I’ll drag another Text node below it.”

“In this second Text node, I’ll type the user question:”

‘Who wrote Sherlock Holmes?’

“Next, I’ll drag an LLM node onto the canvas.”

“Now I’ll connect both Text nodes to the LLM node.”

“The top Text node acts as the system prompt, and the bottom Text node acts as the user prompt.”

“At this point, the LLM can answer the question.”

“But let’s continue the conversation.”

“I’ll drag another Text node onto the canvas.”

“And inside it, I’ll type a follow-up prompt:”

‘what is some more novels of the writer?’

“Now I’ll drag a second LLM node.”

“I’ll connect the response from the first LLM into the second LLM.”

“Then I’ll connect the follow-up Text node into this second LLM as well.”

“This allows the second LLM to use the previous answer as context and continue the interaction.”

“Finally, I’ll drag an Output node onto the canvas.”

“And I’ll connect the second LLM’s output to the Output node.”
AND LET   Me run the pieline . and jsut it will take some time uu. you can see the result showing .


“Now the pipeline is complete. The first LLM answers the original question, and the second LLM expands on it by generating more information about the author’s novels.”

2nd part:
the math node is added input is two input nde and then poutput node is added and it worked.
SYSTEM DESiGN:
 system is split into two parts: a React frontend and a Python FastAPI backend.
 in frontend the key change was:
 1. BaseNode Abstraction — Why I made it

Every node had the same layout: container, title, handles, and content. I was repeating the same 40–50 lines for every node and only changing the middle part.

So I created a BaseNode component that handles the common UI. It takes a title, handles config, and children for custom content.

Why this approach? It’s the cleanest React composition pattern. HOCs and render props felt overcomplicated for this problem and made debugging harder.

Result: node files became much smaller and creating new nodes became way faster.

2. useNodeState Hook — Why I made it

Every editable field needed the same logic:

local state
syncing with Zustand
updating store on change

I was rewriting the same pattern everywhere.

So I wrapped it into a custom hook called useNodeState(id, fieldName, defaultValue) which works just like useState but automatically syncs with the store.

Why a custom hook? Because React hooks are the standard way to reuse stateful logic. It removes boilerplate and keeps behavior consistent across all nodes.

3. Auto-Registration (nodeConfig.js) — Why I made it

Originally, adding a new node meant editing multiple files:

create component
import it
register it in nodeTypes
add it to toolbar

Easy to forget something.

So I created a single nodeConfig.js file that stores all node metadata. From that config, I auto-generate both the ReactFlow nodeTypes and toolbar items.

Now adding a node only needs:

Create component
Add one config entry

Much cleaner and easier to scale.
and in backend:

5. Why I chose Kahn’s Algorithm instead of DFS

I needed a way to execute nodes in the correct order, where a node only runs after its inputs are ready. That’s basically a topological sort problem.

I chose Kahn’s Algorithm because it’s iterative and works really well for pipelines. DFS uses recursion, which can hit Python’s recursion limit on large graphs. Kahn’s algorithm uses a queue instead, so it scales better.

Another reason is that Kahn’s algorithm directly gives me the execution order, not just cycle detection. And if some nodes are left unprocessed, that automatically means there’s a cycle in the graph.

So overall it was simpler, safer, and matched the execution flow naturally.

6. Why I made modular runners

At first I could’ve put all execution logic inside main.py, but that would quickly turn into a huge file full of if-else checks for every node type.

Instead, I split each node type into its own runner file like text_runner.py, llm_runner.py, etc. Then I use a simple RUNNERS map to find the correct runner dynamically.

This keeps the backend much cleaner and easier to extend. Adding a new node usually just means creating one runner file and registering it once — I don’t need to keep modifying the core execution logic.

I avoided a big class hierarchy because most nodes are simple operations, so plain functions were a much cleaner fit.
