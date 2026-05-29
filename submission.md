# Submission — Screen Recording Walkthrough Script

## Opening

"Hi, my name is [Your Name] and this is my Pipeline Builder project. It is a visual workflow editor where users can create data processing pipelines by dragging and dropping nodes onto a canvas, connecting them together, and then running the pipeline to see results. Let me walk you through the application."

---

## Part 1: The Interface

"So when you first open the app, you see three main sections. At the top is the toolbar with all the available node types. In the middle is the canvas where you build your pipeline. And at the bottom there is the submit section with two buttons — Analyze and Run Pipeline."

"The toolbar has 9 different node types: Input, LLM, Output, Text, Math, Filter, Merge, Split, and Transform. Each one does something different."

---

## Part 2: Building a Pipeline

"Let me show you how to build a pipeline. I will drag an Input node onto the canvas."

"[Drag Input node from toolbar to canvas]"

"You can see the node appears on the canvas. It has a name field and a type dropdown. Let me name this 'username' and keep the type as Text."

"Now I will drag a Text node."

"[Drag Text node to canvas]"

"The Text node is special. It has a textarea where I can type text, and it supports variables. Watch — if I type double curly brackets and a variable name like this..."

"[Type '{{name}}' in the textarea]"

"You can see that a new handle appears on the left side of the node. This is a dynamic handle that lets other nodes connect data to this variable. The node also auto-resizes as I type more text."

"Now let me drag an LLM node."

"[Drag LLM node to canvas]"

"The LLM node has two inputs on the left — system and prompt — and one output on the right called response. This connects to Google's Gemini AI model."

"Finally, I will drag an Output node."

"[Drag Output node to canvas]"

"The Output node shows the final result of the pipeline."

---

## Part 3: Connecting Nodes

"Now I need to connect these nodes. I will drag from the Input node's output handle to the Text node's 'name' handle."

"[Drag connection from Input to Text]"

"You can see a line appears between them. This means data will flow from the Input to the Text node."

"Now I connect the Text node's output to the LLM node's prompt input."

"[Drag connection from Text to LLM]"

"And finally, the LLM's response to the Output node."

"[Drag connection from LLM to Output]"

"So now we have a complete pipeline: Input sends a name, Text creates a message using that name, LLM processes it with AI, and Output shows the result."

---

## Part 4: Running the Pipeline

"Let me run this pipeline. I will click Run Pipeline."

"[Click Run Pipeline]"

"You can see the output panel appears at the bottom. It shows that the pipeline executed successfully, and the result from the Output node is displayed. It also shows the execution time."

"If I expand the Node Outputs section, you can see what each node produced. The Input node output 'username', the Text node output 'Hello username, how are you?', the LLM node called Gemini and got an AI response, and the Output node shows the final result."

---

## Part 5: Analyzing the Pipeline

"There is also an Analyze button. Let me click it."

"[Click Analyze]"

"This sends the pipeline to the backend which counts the number of nodes and edges, and checks if the pipeline is a valid DAG — a Directed Acyclic Graph with no cycles. It shows an alert with the results."

---

## Part 6: More Node Types

"Let me show you some other nodes. Here is a Math node."

"[Drag Math node to canvas]"

"It has two inputs — A and B — and an output called result. You can choose the operation: add, subtract, multiply, or divide."

"Here is a Filter node."

"[Drag Filter node to canvas]"

"It has one input and two outputs — pass and fail. Based on the condition you set, data goes to either the pass or fail output."

"Here is a Transform node."

"[Drag Transform node to canvas]"

"It takes text input and transforms it — uppercase, lowercase, reverse, or trim."

---

## Part 7: The Design

"The design uses a clean, modern look. The toolbar is dark themed, the canvas has a light blue-gray background, and the nodes are white cards with rounded corners and subtle shadows."

"Each node type has its own handle color. Input nodes have green handles, LLM nodes have purple, Output nodes have red, and so on. This makes it easy to visually identify different node types."

"The output panel at the bottom is dark themed like a terminal, which feels natural for seeing results."

---

## Part 8: The Code

"Let me briefly discuss the code structure."

"The frontend is built with React and Vite. I used ReactFlow for the canvas, which handles all the drag-and-drop, connections, and viewport management. State is managed with Zustand, which is a lightweight state library."

"The key abstraction is the BaseNode component. Instead of rewriting the same structure for every node type — container, title, handles, content — I created a BaseNode that takes a title, handles array, and children. This means adding a new node only takes about 15 lines of code."

"I also created a useNodeState hook that combines useState, useEffect, and store syncing into one line. Before this, every node needed 3-4 lines per field to sync with the store. Now it is just one line."

"Node types are registered in a central nodeConfig file. This auto-generates the nodeTypes for ReactFlow and the toolbar buttons, so adding a new node only requires editing one config file."

"The backend is built with FastAPI in Python. It has two main endpoints: /pipelines/parse which validates the pipeline, and /pipelines/run which executes it."

"For execution, the backend uses Kahn's algorithm for topological sorting. This ensures nodes run in the correct order — a node only runs after all its inputs are ready. Then each node type has its own runner module that handles its specific logic."

"The LLM node uses the Google Gemini API through the official google-genai SDK. The API key and model name are stored in a .env file."

---

## Part 9: Closing

"So that is my Pipeline Builder project. It lets users visually create pipelines, connect nodes together, and run them to see results. The code is modular and easy to extend — adding a new node type requires just creating a component file and adding one entry to the config."

"Thank you for watching."

---

## Key Features to Highlight

1. **Drag-and-drop** — intuitive node placement
2. **Dynamic handles** — Text node creates handles for {{variables}}
3. **Auto-resize** — Text node grows with content
4. **Node abstraction** — BaseNode reduces code duplication
5. **Auto-registration** — nodeConfig makes adding nodes easy
6. **Real execution** — actually runs pipelines, not just visual
7. **AI integration** — Gemini API for LLM nodes
8. **DAG validation** — Kahn's algorithm checks for cycles
9. **Output panel** — shows results in a clean terminal-like UI
10. **Clean design** — modern, professional look

---

## Things to Show

- [ ] Open the app, show the toolbar and canvas
- [ ] Drag 4 nodes: Input, Text, LLM, Output
- [ ] Connect them in order
- [ ] Type a variable in Text node, show dynamic handle appearing
- [ ] Click Run Pipeline, show output panel with results
- [ ] Click Analyze, show the alert
- [ ] Show a Math node with operation dropdown
- [ ] Show a Filter node with pass/fail outputs
- [ ] Briefly show the code structure
- [ ] End with summary
