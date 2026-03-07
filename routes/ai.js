const express = require("express");
const router = express.Router();

// AI-powered portfolio bio generator
// Constructs a compelling professional narrative from GitHub + LinkedIn data
router.post("/generate-bio", (req, res) => {
  const { name, title, github, linkedin, skills, repos } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const bio = generateBio({ name, title, github, linkedin, skills, repos });
  const headline = generateHeadline({ name, title, skills, repos });
  const summary = generateSummary({ name, title, github, skills, repos });

  res.json({
    status: 200,
    data: { bio, headline, summary },
  });
});

function generateBio({ name, title, github, linkedin, skills, repos }) {
  const firstName = name.split(" ")[0];
  const topLangs = extractTopLanguages(repos);
  const repoCount = repos?.length || 0;
  const totalStars = repos?.reduce((sum, r) => sum + (r.stars || 0), 0) || 0;

  const intros = [
    `${firstName} is a ${title || "developer"} who turns ideas into clean, functional code.`,
    `Meet ${firstName} — a ${title || "developer"} passionate about building things that matter.`,
    `${firstName} is a ${title || "developer"} focused on crafting elegant solutions to complex problems.`,
  ];

  const intro = intros[Math.floor(Math.random() * intros.length)];

  let techLine = "";
  if (topLangs.length > 0) {
    techLine = ` With deep experience in ${topLangs.join(", ")}, ${firstName} builds software that is both performant and maintainable.`;
  } else if (skills?.length > 0) {
    const top = skills.slice(0, 3).join(", ");
    techLine = ` Skilled in ${top}, ${firstName} brings a versatile toolkit to every project.`;
  }

  let statsLine = "";
  if (repoCount > 3 && totalStars > 0) {
    statsLine = ` Their open-source work spans ${repoCount}+ repositories and has earned ${totalStars} stars from the community.`;
  } else if (repoCount > 0) {
    statsLine = ` They actively contribute to open source with ${repoCount}+ public repositories.`;
  }

  let closers = [
    " Always learning, always shipping.",
    " Driven by curiosity and a bias for action.",
    " Believes great software starts with empathy and ends with polish.",
  ];
  const closer = closers[Math.floor(Math.random() * closers.length)];

  return `${intro}${techLine}${statsLine}${closer}`;
}

function generateHeadline({ name, title, skills, repos }) {
  const topLangs = extractTopLanguages(repos);
  const firstName = name.split(" ")[0];

  if (title && topLangs.length > 0) {
    return `${title} · ${topLangs.slice(0, 2).join(" & ")}`;
  }
  if (title) {
    return title;
  }
  if (skills?.length > 0) {
    return `Developer · ${skills.slice(0, 2).join(" & ")}`;
  }
  return "Software Developer";
}

function generateSummary({ name, title, github, skills, repos }) {
  const topLangs = extractTopLanguages(repos);
  const allTech = [...new Set([...topLangs, ...(skills || [])])].slice(0, 6);

  return {
    tagline: title || "Developer",
    technologies: allTech,
    projectCount: repos?.length || 0,
    totalStars: repos?.reduce((sum, r) => sum + (r.stars || 0), 0) || 0,
  };
}

function extractTopLanguages(repos) {
  if (!repos || repos.length === 0) return [];
  const langCount = {};
  repos.forEach((r) => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([lang]) => lang);
}

module.exports = router;
