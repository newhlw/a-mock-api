"Hi, my name is Asish Kumar Dalal, and this is my Pipeline Builder project. Let me walk you through it."

The Interface
"So when you first open the app, you'll see three main sections. At the top there's a toolbar with all the node types you can use. The middle is the canvas — that's where you actually build your pipeline. And at the bottom there are two buttons — Analyze and Run Pipeline."
"The toolbar has 9 node types — Input, LLM, Output, Text, Math, Filter, Merge, Split, and Transform. Each one does something different, and I'll show you how they work together."

Building a Pipeline
"Okay so let me actually build something so you can see how it works."
"I'll start by dragging a Text node onto the canvas. Inside this I'll type the system instruction — just 'You are a helpful assistant.'"
"Now I'll drag a second Text node. This one will hold the actual user question — 'Who wrote Sherlock Holmes?'"
"Now I'll bring in an LLM node and connect both Text nodes to it. The top one becomes the system prompt, the bottom one becomes the user message. So at this point, the LLM already has everything it needs to answer the question."
"But let's take it a step further and continue the conversation."
"I'll drag in one more Text node and type a follow-up — 'What are some more novels by that writer?'"
"Then I'll add a second LLM node. I'll connect the first LLM's response into it, and also connect this new Text node. So the second LLM gets the previous answer as context and can continue from there naturally."
"And finally, I'll drag an Output node and connect the second LLM to it."
"Let me run it now — it'll take a moment..."
"And there you go! The first LLM answers the original question, and the second LLM picks up from that and gives more information about the author's novels. The whole conversation flows through the pipeline exactly as expected."

Math Node Demo
"Just to show another example quickly — I built a small pipeline using the Math node. Two Input nodes feed into it, and the result goes to an Output node. Ran it, and it worked perfectly."
now i will give the code wlathorugh about what i did and why.
System Design
"Now let me talk about how I chnaged the code to make it".
Frontend
1. BaseNode — Why I made it
"So every node in the app has the same basic structure — a container, a title, handles on the sides, and some content in the middle. I was literally copy-pasting 40 to 50 lines of code for every single node and only changing the middle part."
"That felt wrong. So I pulled all that repeated structure into one component called BaseNode. It takes a title, handle config, and whatever custom content that node needs."
"I considered HOCs and render props, but honestly they felt overcomplicated here and made debugging a pain. Plain composition was the cleanest fit. After this change, each node file became much smaller and adding new nodes got a lot faster."

2. useNodeState Hook — Why I made it
"Every editable field in a node needed the same three things — local state, syncing with Zustand, and updating the store when something changes. I was writing that same pattern over and over again in every node."
"So I wrapped it into a custom hook — useNodeState(id, fieldName, defaultValue). It works exactly like useState, but it automatically handles the store sync behind the scenes."
"Custom hooks are just the standard React way to reuse stateful logic. It removed a lot of boilerplate and kept the behaviour consistent everywhere."

3. Auto-Registration with nodeConfig.js — Why I made it
"Earlier, every time I added a new node I had to touch multiple files — create the component, import it, register it in nodeTypes, add it to the toolbar. And if I forgot even one step, things would break."
"So I created a single file called nodeConfig.js that stores all the node metadata in one place. From that config, both the ReactFlow nodeTypes and the toolbar items are generated automatically."
"Now adding a new node is just two steps — create the component, add one entry to the config. That's it. Much cleaner to scale."

Backend
4. Why I chose Kahn's Algorithm over DFS
"So the core challenge on the backend was — how do I make sure each node runs only after its inputs are ready? If node B depends on node A, I can't just run them in any random order."
"That's a topological sort problem. I had two options — DFS or Kahn's Algorithm."
"I went with Kahn's because DFS is recursive, and Python has a recursion limit. On a large graph that's just a crash waiting to happen. Kahn's uses a queue — it's iterative, so it scales much better."
"What I also really liked is that Kahn's directly gives me the execution order. And here's the bonus — if some nodes are still left unprocessed at the end, that automatically means there's a cycle in the graph. I get cycle detection basically for free."
"So overall it was simpler, safer, and just naturally matched how a pipeline should execute."

5. Why I made modular runners
"I could've put all the execution logic inside main.py. But that would've very quickly turned into a massive file with endless if-else checks for every node type. Not fun to read, not fun to maintain."
"Instead, I gave each node type its own runner file — text_runner.py, llm_runner.py, and so on. Then there's a simple RUNNERS map that looks up the right runner at execution time."
"Adding a new node now just means creating one runner file and registering it once. I never have to touch the core execution logic."
"I also deliberately avoided building a big class hierarchy — most nodes are simple operations, so plain functions were a much cleaner and more readable fit."

"So that's the project! The idea was to keep everything modular — both on the frontend and the backend — so it's easy to extend without things getting messy. Thanks for watching."
