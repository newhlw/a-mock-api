import React from "react";

export default function PortfolioPreview({
  portfolio,
  githubData,
  repos,
  aiBio,
  onBack,
}) {
  return (
    <section className="portfolio">
      <div className="portfolio-back">
        <button onClick={onBack}>&larr; Back to editor</button>
      </div>

      {/* Hero */}
      <div className="p-hero">
        {githubData?.avatar && (
          <img
            src={githubData.avatar}
            alt={portfolio.name}
            className="p-avatar"
          />
        )}
        <div className="p-intro">
          <h1>{portfolio.name}</h1>
          <p className="p-headline">
            {aiBio?.headline || portfolio.title}
          </p>
          <div className="p-links">
            {portfolio.github && (
              <a
                href={`https://github.com/${portfolio.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-link"
              >
                <GithubIcon /> GitHub
              </a>
            )}
            {portfolio.linkedin && (
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* AI-generated bio */}
      {aiBio?.bio && (
        <div className="p-bio animate-in animate-in-delay-1">
          <div className="ai-badge">
            <SparkleIcon /> AI-generated
          </div>
          <p>{aiBio.bio}</p>
        </div>
      )}

      {/* Stats */}
      {githubData && (
        <div className="p-stats">
          <div className="p-stat animate-in animate-in-delay-2">
            <div className="p-stat-num">{githubData.publicRepos}</div>
            <div className="p-stat-label">Repos</div>
          </div>
          <div className="p-stat animate-in animate-in-delay-2">
            <div className="p-stat-num">{githubData.followers}</div>
            <div className="p-stat-label">Followers</div>
          </div>
          <div className="p-stat animate-in animate-in-delay-2">
            <div className="p-stat-num">{githubData.following}</div>
            <div className="p-stat-label">Following</div>
          </div>
          {aiBio?.summary?.totalStars > 0 && (
            <div className="p-stat animate-in animate-in-delay-2">
              <div className="p-stat-num">{aiBio.summary.totalStars}</div>
              <div className="p-stat-label">Stars</div>
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {portfolio.skills?.length > 0 && (
        <div className="p-section animate-in animate-in-delay-3">
          <div className="p-section-title">Skills</div>
          <div className="p-skills">
            {portfolio.skills.map((skill) => (
              <span className="p-skill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* LinkedIn */}
      {portfolio.linkedin && (
        <div className="p-section animate-in animate-in-delay-3">
          <div className="p-section-title">LinkedIn</div>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-linkedin">
              <div className="p-li-icon">in</div>
              <div className="p-li-text">
                <h3>{portfolio.name}</h3>
                <p>{portfolio.linkedinTitle || portfolio.title}</p>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Repos */}
      {repos.length > 0 && (
        <div className="p-section animate-in animate-in-delay-4">
          <div className="p-section-title">Repositories</div>
          <div className="p-repos">
            {repos.map((repo) => (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.name}
              >
                <div className="p-repo">
                  <div className="p-repo-left">
                    <h3>{repo.name}</h3>
                    <p>{repo.description || "No description"}</p>
                  </div>
                  <div className="p-repo-right">
                    {repo.language && (
                      <span className="p-repo-lang">{repo.language}</span>
                    )}
                    <span>&#9733; {repo.stars}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
      <path d="M8 0l2 5h5l-4 3.5 1.5 5L8 10.5 3.5 13.5 5 8.5 1 5h5z" />
    </svg>
  );
}
