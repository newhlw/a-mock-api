import React from "react";

export default function PortfolioPreview({ portfolio, githubData, repos, onBack }) {
  return (
    <section className="portfolio-preview">
      <div style={{ marginBottom: "16px" }}>
        <button className="btn btn-secondary" onClick={onBack}>
          &larr; Back to Editor
        </button>
      </div>

      {/* Hero Section */}
      <div className="portfolio-hero">
        {githubData?.avatar && (
          <img
            src={githubData.avatar}
            alt={portfolio.name}
            className="portfolio-avatar"
          />
        )}
        <h1>{portfolio.name}</h1>
        <p className="title">{portfolio.title}</p>
        {portfolio.bio && <p className="bio">{portfolio.bio}</p>}
        <div className="portfolio-links">
          {portfolio.github && (
            <a
              href={`https://github.com/${portfolio.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {portfolio.linkedin && (
            <a
              href={portfolio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Skills */}
      {portfolio.skills?.length > 0 && (
        <div className="section-card">
          <h2>Skills</h2>
          <div className="skills-list">
            {portfolio.skills.map((skill) => (
              <span className="skill-badge" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* LinkedIn */}
      {portfolio.linkedin && (
        <div className="section-card">
          <h2>LinkedIn</h2>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="linkedin-card">
              <div className="linkedin-icon">in</div>
              <div className="linkedin-info">
                <h3>{portfolio.name}</h3>
                <p>
                  {portfolio.linkedinTitle || portfolio.title}
                </p>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* GitHub Repos */}
      {repos.length > 0 && (
        <div className="section-card">
          <h2>GitHub Repositories</h2>
          <div className="repos-grid">
            {repos.map((repo) => (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.name}
              >
                <div className="repo-card">
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "No description"}</p>
                  <div className="repo-meta">
                    {repo.language && <span>{repo.language}</span>}
                    <span>&#9733; {repo.stars}</span>
                    <span>Forks: {repo.forks}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Stats */}
      {githubData && (
        <div className="section-card">
          <h2>GitHub Stats</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#6c63ff" }}>
                {githubData.publicRepos}
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>Repositories</div>
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#6c63ff" }}>
                {githubData.followers}
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>Followers</div>
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#6c63ff" }}>
                {githubData.following}
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>Following</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
