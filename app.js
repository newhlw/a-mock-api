const express = require("express");
const path = require("path");
const cors = require("cors");
const portfolioRoutes = require("./routes/portfolio");
const githubRoutes = require("./routes/github");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static React build
app.use(express.static(path.join(__dirname, "client", "dist")));

// API routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/github", githubRoutes);

// Fallback to React app for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
