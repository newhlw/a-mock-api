Hello, I am Asish Kumar Dalal. Let me walk you through the project.
So when you open the user interface, there are 3 things: the pipeline builder, the canvas, and the analyze/run section with 2 buttons.
Let me actually build something so you can see how it works. We will start by adding 3 text boxes — one for text input, one for system prompt, and one for query. Let me copy it.
We will now put the LLM box and connect the edges. And now we will put the output node and connect its edge. Then, to verify it is a directed acyclic graph, we will run analyze, and it is saying the nodes are 4, edges are 3, and it is a valid DAG. So we now run the pipeline to show the result. As we can see, the function is working correctly.
Now let me show you how functional nodes work. The math node takes 2 inputs and multiplies them — with inputs 3 and 2. Let me give the inputs and connect the nodes. Here they are connected and the output is shown. If we run it, it will perform the multiplication. See, the result is shown.
Now I will give you a walkthrough of the code changes.
Backend changes:
We have changed the directed acyclic graph detection logic to use the correct algorithm — from DFS to  (Kahn's algorithm). The previous algorithm used DFS  techniques, whereas DFS uses backtracking and recursion, which is very time expensive and for certain depths it can cause stack overflow failures. The khan’salgorithm is faster and can also detect topological order during the run.


In the runner functions, for each node's execution, we get the previous node's output, and this is serialized by the topological order we get from Kahn's algorithm. There are runner  here — we get the runner and execute it. For the runners, we have made a dictionary. The dictionary stores runners by type. Here is one example of a runner — it calls the Gemini API and gets the result. And this is the math runner. That is all we have changed in the backend.

Frontend changes:
We have changed and refactored the node code and modularized it. We detected that the input nodes all  share the same basic structure, so we pulled the repeating code together into a base node component. Every editable field ina  node needed the same three changes  local state ,syncing with zustand and updating the store when something changes so i wrapped that in a custom hook useNodeState. And i have dones oem styling also.

