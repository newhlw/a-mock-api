import React, { useState } from "react";
import Header from "./components/Header";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPreview from "./components/PortfolioPreview";

export default function App() {
  const [view, setView] = useState("form");
  const [portfolio, setPortfolio] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [aiBio, setAiBio] = useState(null);

  const handleGenerate = async (formData, ghData, ghRepos) => {
    setPortfolio(formData);
    setGithubData(ghData);
    setRepos(ghRepos);

    // Generate AI bio
    try {
      const res = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          github: ghData,
          linkedin: formData.linkedin,
          skills: formData.skills,
          repos: ghRepos,
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setAiBio(data.data);
      }
    } catch (err) {
      console.error("AI bio generation failed:", err);
    }

    setView("preview");
  };

  const handleBack = () => setView("form");

  return (
    <>
      <Header view={view} onNavigate={setView} />
      <main className="container">
        {view === "form" && (
          <PortfolioForm
            initialData={portfolio}
            onGenerate={handleGenerate}
            existingGithubData={githubData}
            existingRepos={repos}
          />
        )}
        {view === "preview" && portfolio && (
          <PortfolioPreview
            portfolio={portfolio}
            githubData={githubData}
            repos={repos}
            aiBio={aiBio}
            onBack={handleBack}
          />
        )}
        {view === "preview" && !portfolio && (
          <div className="empty-state">
            <h2>Nothing here yet</h2>
            <p>Create your portfolio to see the preview.</p>
            <button className="btn btn-primary" onClick={handleBack}>
              Get Started
            </button>
          </div>
        )}
      </main>
    </>
  );
}
