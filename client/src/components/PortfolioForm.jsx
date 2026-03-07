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
        <h2>Build your portfolio</h2>
        <p className="form-subtitle">
          Connect your GitHub, add your details, and let AI write your bio.
        </p>

        {/* GitHub Import */}
        <div className="github-import">
          <span className="gh-label">GitHub</span>
          <input
            type="text"
            placeholder="username"
            name="github"
            value={form.github}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-sm"
            onClick={fetchGitHub}
            disabled={loading}
          >
            {loading ? (
              <span className="loading">
                <span className="spinner" /> Fetching
              </span>
            ) : (
              "Import"
            )}
          </button>
        </div>

        {githubData && (
          <div className="gh-success">
            <img src={githubData.avatar} alt="" />
            <span>
              <strong>{githubData.login}</strong> &mdash; {githubData.publicRepos} repos,{" "}
              {githubData.followers} followers
            </span>
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Title</label>
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
            <label>LinkedIn URL</label>
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
              placeholder="Software Engineer at Google"
            />
          </div>

          <div className="form-group full-width">
            <label>Skills</label>
            <div className="skills-row">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill, press Enter"
              />
              <button type="button" className="btn btn-sm" onClick={addSkill}>
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="skills-tags">
                {skills.map((s) => (
                  <span className="skill-tag" key={s}>
                    {s}
                    <button type="button" onClick={() => removeSkill(s)}>
                      &times;
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
