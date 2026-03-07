const express = require("express");
const router = express.Router();

// Fetch GitHub user profile
router.get("/user/:username", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(req.params.username)}`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: "GitHub user not found" });
    }
    const data = await response.json();
    res.json({
      status: 200,
      data: {
        login: data.login,
        name: data.name,
        avatar: data.avatar_url,
        bio: data.bio,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        profileUrl: data.html_url,
        location: data.location,
        company: data.company,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
});

// Fetch GitHub user repos
router.get("/repos/:username", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(req.params.username)}/repos?sort=updated&per_page=10`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: "Could not fetch repos" });
    }
    const data = await response.json();
    const repos = data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));
    res.json({ status: 200, data: repos });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

module.exports = router;
