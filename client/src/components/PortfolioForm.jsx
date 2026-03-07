import React, { useState } from "react";

export default function PortfolioForm({
  initialData,
  onGenerate,
  existingGithubData,
  existingRepos,
}) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      title: "",
      bio: "",
      github: "",
      linkedin: "",
      linkedinTitle: "",
    }
  );
  const [skills, setSkills] = useState(initialData?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [githubData, setGithubData] = useState(existingGithubData || null);
  const [repos, setRepos] = useState(existingRepos || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const fetchGitHub = async () => {
    if (!form.github) return;
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`/api/github/user/${form.github}`),
        fetch(`/api/github/repos/${form.github}`),
      ]);
      const userData = await userRes.json();
      const reposData = await reposRes.json();

      if (userData.status === 200) {
        setGithubData(userData.data);
        if (!form.name && userData.data.name) {
          setForm((f) => ({ ...f, name: userData.data.name }));
        }
        if (!form.bio && userData.data.bio) {
          setForm((f) => ({ ...f, bio: userData.data.bio }));
        }
      }
      if (reposData.status === 200) {
        setRepos(reposData.data);
      }
    } catch (err) {
      console.error("Failed to fetch GitHub data:", err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...form, skills }, githubData, repos);
  };

  return (
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Build Your Portfolio</h2>

        {/* GitHub Import */}
        <div className="github-import">
          <span className="github-import-label">Import from GitHub:</span>
          <input
            type="text"
            placeholder="Enter GitHub username"
            name="github"
            value={form.github}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-github"
            onClick={fetchGitHub}
            disabled={loading}
          >
            {loading ? (
              <span className="loading">
                <span className="spinner"></span> Fetching...
              </span>
            ) : (
              "Fetch Profile"
            )}
          </button>
        </div>

        {githubData && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              padding: "12px",
              background: "#f0fdf4",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#166534",
            }}
          >
            <img
              src={githubData.avatar}
              alt=""
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
            GitHub profile loaded: <strong>{githubData.login}</strong> (
            {githubData.publicRepos} repos, {githubData.followers} followers)
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Professional Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Full Stack Developer"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="A short description about yourself..."
            />
          </div>

          <div className="form-group full-width">
            <label>LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group full-width">
            <label>LinkedIn Headline</label>
            <input
              type="text"
              name="linkedinTitle"
              value={form.linkedinTitle}
              onChange={handleChange}
              placeholder="e.g. Software Engineer at Google"
            />
          </div>

          <div className="form-group full-width">
            <label>Skills</label>
            <div className="skills-input-row">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="skills-tags">
                {skills.map((s) => (
                  <span className="skill-tag" key={s}>
                    {s}
                    <button type="button" onClick={() => removeSkill(s)}>
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Generate Portfolio
          </button>
        </div>
      </form>
    </section>
  );
}
