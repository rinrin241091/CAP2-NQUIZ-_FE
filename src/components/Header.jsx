import React, { useState } from "react";
import "../assets/styles/Header.css"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handlePinChange = (e) => {
    setPinValue(e.target.value);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="home-nquiz">Home NQUIZ</div>
      </div>
      <div className="main-header">
        <div className="logo">NQUIZ</div>

        <div className="pin-container">
          <label>New Corner Enter PIN:</label>
          <input
            type="text"
            placeholder="1234567"
            value={pinValue}
            onChange={handlePinChange}
            className="pin-input"
          />
        </div>

        <div className="header-buttons">
          <button
            className={`search-btn ${isSearchActive ? "active" : ""}`}
            onClick={toggleSearch}
            aria-label="Search"
          >
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button className="settings-btn" aria-label="Settings">
            ⚙️
          </button>
          <button className="sign-in-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>

        {isSearchActive && (
          <div className="search-overlay">
            <div className="search-modal">
              <input
                type="text"
                placeholder="Search quizzes..."
                className="search-input"
                autoFocus
              />
              <button
                className="close-search-btn"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
