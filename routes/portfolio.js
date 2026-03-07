const express = require("express");
const router = express.Router();

// In-memory storage for portfolios
const portfolios = new Map();

// Generate a simple ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Create a portfolio
router.post("/", (req, res) => {
  const { name, title, bio, github, linkedin, skills, projects } = req.body;

  if (!name || !title) {
    return res.status(400).json({ error: "Name and title are required" });
  }

  const id = generateId();
  const portfolio = {
    id,
    name,
    title,
    bio: bio || "",
    github: github || "",
    linkedin: linkedin || "",
    skills: skills || [],
    projects: projects || [],
    createdAt: new Date().toISOString(),
  };

  portfolios.set(id, portfolio);
  res.status(201).json({ status: 201, data: portfolio });
});

// Get a portfolio by ID
router.get("/:id", (req, res) => {
  const portfolio = portfolios.get(req.params.id);
  if (!portfolio) {
    return res.status(404).json({ error: "Portfolio not found" });
  }
  res.json({ status: 200, data: portfolio });
});

// Update a portfolio
router.put("/:id", (req, res) => {
  const portfolio = portfolios.get(req.params.id);
  if (!portfolio) {
    return res.status(404).json({ error: "Portfolio not found" });
  }

  const updated = { ...portfolio, ...req.body, id: portfolio.id };
  portfolios.set(req.params.id, updated);
  res.json({ status: 200, data: updated });
});

// List all portfolios
router.get("/", (req, res) => {
  const all = Array.from(portfolios.values());
  res.json({ status: 200, data: all });
});

module.exports = router;
