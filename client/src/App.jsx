import React, { useState } from "react";
import Header from "./components/Header";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPreview from "./components/PortfolioPreview";

export default function App() {
  const [view, setView] = useState("form");
  const [portfolio, setPortfolio] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGenerate = (formData, ghData, ghRepos) => {
    setPortfolio(formData);
    setGithubData(ghData);
    setRepos(ghRepos);
    setView("preview");
  };

  const handleBack = () => {
    setView("form");
  };

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
            onBack={handleBack}
          />
        )}
        {view === "preview" && !portfolio && (
          <div className="empty-state">
            <h2>No portfolio yet</h2>
            <p>Fill in your details to generate your portfolio.</p>
            <button className="btn btn-primary" onClick={handleBack}>
              Create Portfolio
            </button>
          </div>
        )}
      </main>
    </>
  );
}
