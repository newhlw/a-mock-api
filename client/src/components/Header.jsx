import React from "react";

export default function Header({ view, onNavigate }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          Portfolio<span>Maker</span>
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={view === "form" ? "active" : ""}
              onClick={() => onNavigate("form")}
            >
              Editor
            </button>
          </li>
          <li>
            <button
              className={view === "preview" ? "active" : ""}
              onClick={() => onNavigate("preview")}
            >
              Preview
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
